import { beforeEach, describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api'
import {
  downloadContractArtifact,
  issueSigningGrant,
  lockContractContent,
  saveContractContent,
  signContract,
  verifyContractIntegrity,
} from './contracts-api'

vi.mock('@/shared/api', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    getBlob: vi.fn(),
  },
}))

describe('contracts API', () => {
  beforeEach(() => vi.clearAllMocks())

  it('keeps participant actions on ownership-scoped endpoints', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ isValid: true })
    vi.mocked(apiClient.post).mockResolvedValue({ grantId: 'grant-1' })
    vi.mocked(apiClient.put).mockResolvedValue({ _id: 'contract-1' })
    vi.mocked(apiClient.getBlob).mockResolvedValue(new Blob(['pdf']))

    await verifyContractIntegrity('contract-1')
    await issueSigningGrant('contract-1', {
      biometricGrantId: 'bio-1',
      otpSessionId: 'otp-1',
    })
    await signContract('contract-1', 'grant-1')
    await downloadContractArtifact('contract-1')
    await saveContractContent('contract-1', { sections: [] }, 2)
    await lockContractContent('contract-1', 3)

    expect(apiClient.get).toHaveBeenCalledWith('/contracts/contract-1/verify')
    expect(apiClient.post).toHaveBeenCalledWith(
      '/contracts/contract-1/signing-grant',
      { biometricGrantId: 'bio-1', otpSessionId: 'otp-1' }
    )
    expect(apiClient.put).toHaveBeenCalledWith('/contracts/contract-1/sign', {
      signingGrantId: 'grant-1',
    })
    expect(apiClient.getBlob).toHaveBeenCalledWith(
      '/contracts/contract-1/pdf?format=pdf'
    )
    expect(apiClient.put).toHaveBeenCalledWith(
      '/contracts/contract-1/content',
      {
        content: { sections: [] },
        expectedRevision: 2,
      }
    )
    expect(apiClient.post).toHaveBeenCalledWith(
      '/contracts/contract-1/lock-content',
      {
        expectedRevision: 3,
      }
    )
  })

  it('supports enriched contract workspace and signing endpoints', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({ contract: { id: 'c1' } })
    vi.mocked(apiClient.get).mockResolvedValueOnce([{ id: 'evt-1' }])
    vi.mocked(apiClient.post).mockResolvedValueOnce({ sessionId: 's1' })
    vi.mocked(apiClient.post).mockResolvedValueOnce({ success: true })
    vi.mocked(apiClient.post).mockResolvedValueOnce({
      verified: true,
      biometricEvidenceId: 'bio-1',
    })

    const {
      getContractView,
      getContractAuditEvents,
      initiateContractOtp,
      verifyContractOtp,
      verifySigner,
    } = await import('./contracts-api')

    const view = await getContractView('c1')
    expect(apiClient.get).toHaveBeenCalledWith('/contracts/c1/view')
    expect(view.contract.id).toBe('c1')

    const events = await getContractAuditEvents('c1')
    expect(apiClient.get).toHaveBeenCalledWith('/contracts/c1/audit-events')
    expect(events).toHaveLength(1)

    const otpInit = await initiateContractOtp('c1', 'device-1')
    expect(apiClient.post).toHaveBeenCalledWith('/contracts/c1/otp-challenge', {
      deviceId: 'device-1',
    })
    expect(otpInit.sessionId).toBe('s1')

    const otpVer = await verifyContractOtp('c1', {
      sessionId: 's1',
      otpCode: '123456',
    })
    expect(apiClient.post).toHaveBeenCalledWith('/contracts/c1/verify-otp', {
      sessionId: 's1',
      otpCode: '123456',
    })
    expect(otpVer.success).toBe(true)

    const file = new Blob(['image'], { type: 'image/jpeg' })
    const signerResult = await verifySigner('c1', file)
    expect(apiClient.post).toHaveBeenCalledWith(
      '/contracts/c1/verify-signer',
      expect.any(FormData)
    )
    expect(signerResult.verified).toBe(true)
    expect(signerResult.biometricEvidenceId).toBe('bio-1')
  })
})
