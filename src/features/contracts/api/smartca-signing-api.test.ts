import { describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api'
import {
  createSmartCaSigningSession,
  getSmartCaSigningSession,
} from './contracts-api'

describe('SmartCA signing API', () => {
  it('creates a signer-bound session and reads normalized status', async () => {
    const post = vi.spyOn(apiClient, 'post').mockResolvedValue({
      contractId: 'contract-1',
      signerId: 'tenant-1',
      signerRole: 'tenant',
      artifactHash: 'a'.repeat(64),
      providerTransactionId: 'sca-1',
      status: 'pending',
      expiresAt: '2030-01-01T00:00:00.000Z',
    })
    const get = vi.spyOn(apiClient, 'get').mockResolvedValue({
      contractId: 'contract-1',
      signerId: 'tenant-1',
      signerRole: 'tenant',
      artifactHash: 'a'.repeat(64),
      providerTransactionId: 'sca-1',
      status: 'signed',
      expiresAt: '2030-01-01T00:00:00.000Z',
    })

    await expect(
      createSmartCaSigningSession('contract-1')
    ).resolves.toMatchObject({ status: 'pending' })
    await expect(
      getSmartCaSigningSession('contract-1', 'session-1')
    ).resolves.toMatchObject({ status: 'signed' })
    expect(post).toHaveBeenCalledWith(
      '/contracts/contract-1/smartca/signing-sessions',
      {}
    )
    expect(get).toHaveBeenCalledWith(
      '/contracts/contract-1/smartca/signing-sessions/session-1'
    )
    post.mockRestore()
    get.mockRestore()
  })
})
