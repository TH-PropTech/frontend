import { useCallback, useEffect, useRef, useState } from 'react'
import {
  cancelSmartCaSigningSession,
  pollSmartCaSigningSession,
  submitSmartCaV2Sign,
  type SmartCaSigningSession,
} from '../api/contracts-api'
import { describeSmartCaV2Error } from '../lib/smartca-v2-error'

const TERMINAL_STATUSES: ReadonlySet<SmartCaSigningSession['status']> = new Set(
  ['signed', 'rejected', 'expired', 'cancelled']
)

function createIdempotencyKey(): string {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID()
  }
  const random = new Uint32Array(4)
  globalThis.crypto.getRandomValues(random)
  return `smartca-v2-${Array.from(random, value => value.toString(16)).join('-')}`
}

export type UseSmartCaV2SigningResult = {
  password: string
  setPassword: (value: string) => void
  otp: string
  setOtp: (value: string) => void
  session: SmartCaSigningSession | null
  submitting: boolean
  checking: boolean
  cancelling: boolean
  error: string | null
  submit: () => Promise<void>
  checkStatus: () => Promise<void>
  cancel: () => Promise<void>
}

/**
 * Luồng ký VNPT SmartCA v2: người dùng tự nhập mật khẩu + OTP SmartCA (lấy
 * từ app VNPT SmartCA hoặc ứng dụng sinh OTP đã liên kết), backend ký và xác
 * nhận ngay trong cùng một lượt gọi (`sign` rồi `confirm` phía VNPT). Không
 * cần realtime events như v1 vì kết quả thường về ngay trong response.
 */
export function useSmartCaV2Signing(
  contractId: string,
  onSigned?: () => void
): UseSmartCaV2SigningResult {
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [session, setSession] = useState<SmartCaSigningSession | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [checking, setChecking] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const idempotencyKeyRef = useRef(createIdempotencyKey())
  const onSignedRef = useRef(onSigned)
  useEffect(() => {
    onSignedRef.current = onSigned
  }, [onSigned])

  const applySession = useCallback((next: SmartCaSigningSession): void => {
    setSession(next)
    if (next.status === 'signed') onSignedRef.current?.()
    if (TERMINAL_STATUSES.has(next.status) && next.status !== 'signed') {
      idempotencyKeyRef.current = createIdempotencyKey()
    }
  }, [])

  const submit = useCallback(async (): Promise<void> => {
    if (!password || !otp) return
    setSubmitting(true)
    setError(null)
    try {
      const result = await submitSmartCaV2Sign(contractId, {
        smartCaPassword: password,
        smartCaOtp: otp,
        idempotencyKey: idempotencyKeyRef.current,
      })
      applySession(result)
    } catch (caught: unknown) {
      setError(
        caught instanceof Error
          ? describeSmartCaV2Error(caught.message)
          : 'Không thể gửi yêu cầu ký VNPT SmartCA.'
      )
    } finally {
      // Mật khẩu và OTP chỉ dùng một lần, không giữ lại trong state.
      setPassword('')
      setOtp('')
      setSubmitting(false)
    }
  }, [applySession, contractId, otp, password])

  const checkStatus = useCallback(async (): Promise<void> => {
    if (!session || TERMINAL_STATUSES.has(session.status)) return
    setChecking(true)
    setError(null)
    try {
      applySession(await pollSmartCaSigningSession(contractId, session.id))
    } catch (caught: unknown) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'Không thể kiểm tra kết quả ký VNPT SmartCA.'
      )
    } finally {
      setChecking(false)
    }
  }, [applySession, contractId, session])

  const cancel = useCallback(async (): Promise<void> => {
    if (!session) return
    setCancelling(true)
    setError(null)
    try {
      applySession(await cancelSmartCaSigningSession(contractId, session.id))
    } catch (caught: unknown) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'Không thể hủy phiên ký VNPT SmartCA.'
      )
    } finally {
      setCancelling(false)
    }
  }, [applySession, contractId, session])

  return {
    password,
    setPassword,
    otp,
    setOtp,
    session,
    submitting,
    checking,
    cancelling,
    error,
    submit,
    checkStatus,
    cancel,
  }
}
