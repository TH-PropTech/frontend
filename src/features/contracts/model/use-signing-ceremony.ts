'use client'

import { useState, useCallback } from 'react'
import {
  initiateContractOtp,
  verifyContractOtp,
  issueSigningGrant,
  signContract,
} from '../api/contracts-api'

export type CeremonyStep =
  | 'INTRO'
  | 'FACE_VERIFY'
  | 'SMART_OTP'
  | 'ANIMATING'
  | 'SUCCESS'

export interface UseSigningCeremonyOptions {
  contractId: string
  onSuccess?: (() => void) | undefined
}

export function useSigningCeremony({
  contractId,
  onSuccess,
}: UseSigningCeremonyOptions) {
  const [step, setStep] = useState<CeremonyStep>('INTRO')
  const [biometricEvidenceId, setBiometricEvidenceId] = useState<string | null>(
    null
  )
  const [otpSessionId, setOtpSessionId] = useState<string | null>(null)
  const [otpChallenge, setOtpChallenge] = useState<string | null>(null)
  const [otpCodeHint, setOtpCodeHint] = useState<string | null>(null)
  const [signingGrantId, setSigningGrantId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const reset = useCallback(() => {
    setStep('INTRO')
    setBiometricEvidenceId(null)
    setOtpSessionId(null)
    setOtpChallenge(null)
    setOtpCodeHint(null)
    setSigningGrantId(null)
    setLoading(false)
    setError(null)
  }, [])

  const startCeremony = useCallback(() => {
    setError(null)
    setStep('FACE_VERIFY')
  }, [])

  const handleFaceVerified = useCallback(
    async (evidenceId: string) => {
      try {
        setLoading(true)
        setError(null)
        setBiometricEvidenceId(evidenceId)

        // Khởi tạo phiên Smart OTP
        const otpRes = await initiateContractOtp(contractId)
        setOtpSessionId(otpRes.sessionId)
        setOtpChallenge(otpRes.challenge)
        if (otpRes.otpCode) {
          setOtpCodeHint(otpRes.otpCode)
        }
        setStep('SMART_OTP')
      } catch (err: unknown) {
        const msg =
          err instanceof Error
            ? err.message
            : 'Không thể khởi tạo phiên xác thực OTP'
        setError(msg)
      } finally {
        setLoading(false)
      }
    },
    [contractId]
  )

  const handleOtpVerified = useCallback(
    async (otpCode: string) => {
      if (!otpSessionId || !biometricEvidenceId) {
        setError('Thiếu bằng chứng xác thực cần thiết')
        return
      }
      try {
        setLoading(true)
        setError(null)

        // 1. Xác thực chữ ký OTP
        const verResult = await verifyContractOtp(contractId, {
          sessionId: otpSessionId,
          otpCode,
        })
        if (!verResult.success) {
          setError(verResult.message || 'Mã OTP không hợp lệ')
          return
        }

        // 2. Cấp Signing Grant
        const grant = await issueSigningGrant(contractId, {
          biometricGrantId: biometricEvidenceId,
          otpSessionId,
        })
        setSigningGrantId(grant.grantId)

        // 3. Thực hiện ký hợp đồng bằng Grant
        await signContract(contractId, grant.grantId)

        // 4. Chuyển sang hiệu ứng ký số
        setStep('ANIMATING')
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Ký hợp đồng thất bại'
        setError(msg)
      } finally {
        setLoading(false)
      }
    },
    [contractId, otpSessionId, biometricEvidenceId]
  )

  const handleAnimationComplete = useCallback(() => {
    setStep('SUCCESS')
    onSuccess?.()
  }, [onSuccess])

  return {
    step,
    biometricEvidenceId,
    otpSessionId,
    otpChallenge,
    otpCodeHint,
    signingGrantId,
    loading,
    error,
    startCeremony,
    handleFaceVerified,
    handleOtpVerified,
    handleAnimationComplete,
    reset,
    setStep,
  }
}
