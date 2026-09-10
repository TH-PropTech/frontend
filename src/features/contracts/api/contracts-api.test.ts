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
})
