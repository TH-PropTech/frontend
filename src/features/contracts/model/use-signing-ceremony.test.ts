import { renderHook, act } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { useSigningCeremony } from './use-signing-ceremony'
import * as contractsApi from '../api/contracts-api'

vi.mock('../api/contracts-api', () => ({
  initiateContractOtp: vi.fn(),
  verifyContractOtp: vi.fn(),
  issueSigningGrant: vi.fn(),
  signContract: vi.fn(),
}))

describe('useSigningCeremony', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('starts at INTRO and transitions to FACE_VERIFY', () => {
    const { result } = renderHook(() =>
      useSigningCeremony({ contractId: 'c1' })
    )
    expect(result.current.step).toBe('INTRO')

    act(() => {
      result.current.startCeremony()
    })
    expect(result.current.step).toBe('FACE_VERIFY')
  })

  it('handles face verification and transitions to SMART_OTP', async () => {
    vi.mocked(contractsApi.initiateContractOtp).mockResolvedValue({
      sessionId: 'otp-sess-1',
      challenge: 'CHAL-8888',
      expiredAt: '2026-03-14T04:00:00Z',
      otpCode: '123456',
    })

    const { result } = renderHook(() =>
      useSigningCeremony({ contractId: 'c1' })
    )

    await act(async () => {
      await result.current.handleFaceVerified('bio-evidence-1')
    })

    expect(result.current.step).toBe('SMART_OTP')
    expect(result.current.biometricEvidenceId).toBe('bio-evidence-1')
    expect(result.current.otpSessionId).toBe('otp-sess-1')
    expect(result.current.otpChallenge).toBe('CHAL-8888')
    expect(result.current.otpCodeHint).toBe('123456')
  })

  it('handles OTP verification, grants, and signs contract transitioning to ANIMATING', async () => {
    vi.mocked(contractsApi.initiateContractOtp).mockResolvedValue({
      sessionId: 'otp-sess-1',
      challenge: 'CHAL-8888',
      expiredAt: '2026-03-14T04:00:00Z',
    })
    vi.mocked(contractsApi.verifyContractOtp).mockResolvedValue({
      success: true,
      message: 'Verified',
    })
    vi.mocked(contractsApi.issueSigningGrant).mockResolvedValue({
      grantId: 'sg-999',
      expiresAt: '2026-03-14T04:05:00Z',
    })
    vi.mocked(contractsApi.signContract).mockResolvedValue({
      _id: 'c1',
    } as unknown as contractsApi.ContractItem)

    const { result } = renderHook(() =>
      useSigningCeremony({ contractId: 'c1' })
    )

    await act(async () => {
      await result.current.handleFaceVerified('bio-evidence-1')
    })

    await act(async () => {
      await result.current.handleOtpVerified('123456')
    })

    expect(contractsApi.verifyContractOtp).toHaveBeenCalledWith('c1', {
      sessionId: 'otp-sess-1',
      otpCode: '123456',
    })
    expect(contractsApi.issueSigningGrant).toHaveBeenCalledWith('c1', {
      biometricGrantId: 'bio-evidence-1',
      otpSessionId: 'otp-sess-1',
    })
    expect(contractsApi.signContract).toHaveBeenCalledWith('c1', 'sg-999')
    expect(result.current.step).toBe('ANIMATING')
  })

  it('completes animation and triggers onSuccess transitioning to SUCCESS', () => {
    const onSuccess = vi.fn()
    const { result } = renderHook(() =>
      useSigningCeremony({ contractId: 'c1', onSuccess })
    )

    act(() => {
      result.current.handleAnimationComplete()
    })

    expect(result.current.step).toBe('SUCCESS')
    expect(onSuccess).toHaveBeenCalledTimes(1)
  })
})
