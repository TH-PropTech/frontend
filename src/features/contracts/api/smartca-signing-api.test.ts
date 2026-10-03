import { afterEach, describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api'
import {
  cancelSmartCaSigningSession,
  createSmartCaSigningSession,
  getSmartCaCertificates,
  getSmartCaSigningSession,
  pollSmartCaSigningSession,
} from './contracts-api'

describe('SmartCA signing API', () => {
  afterEach(() => vi.restoreAllMocks())

  it('lists sanitized certificates for the selected contract', async () => {
    const get = vi.spyOn(apiClient, 'get').mockResolvedValue({
      certificates: [
        {
          serialNumber: 'SERIAL-001',
          subject: 'CN=Test Tenant',
          issuer: 'CN=VNPT Test CA',
          validFrom: '2026-01-01T00:00:00.000Z',
          validTo: '2099-01-01T00:00:00.000Z',
        },
      ],
    })

    await expect(getSmartCaCertificates('contract-1')).resolves.toEqual({
      certificates: [expect.objectContaining({ serialNumber: 'SERIAL-001' })],
    })
    expect(get).toHaveBeenCalledWith(
      '/contracts/contract-1/smartca/certificates'
    )
  })

  it('creates a v1 session without any credential field in the request body', async () => {
    const post = vi.spyOn(apiClient, 'post').mockResolvedValue({
      id: 'session-1',
      contractId: 'contract-1',
      signerId: 'tenant-1',
      signerRole: 'tenant',
      artifactHash: 'a'.repeat(64),
      providerTransactionId: 'sca-1',
      status: 'pending',
      documentId: 'contract-contract-1-r1',
      expiresAt: '2030-01-01T00:00:00.000Z',
    })
    const input = {
      idempotencyKey: 'request-1',
      certificateSerial: 'SERIAL-001',
    }

    await expect(
      createSmartCaSigningSession('contract-1', input)
    ).resolves.toMatchObject({
      status: 'pending',
      documentId: expect.any(String),
    })
    expect(post).toHaveBeenCalledWith(
      '/contracts/contract-1/smartca/signing-sessions',
      input
    )
    expect(input).not.toHaveProperty('smartCaPassword')
    expect(input).not.toHaveProperty('smartCaOtp')
  })

  it('polls a pending session via the poll endpoint', async () => {
    const post = vi.spyOn(apiClient, 'post').mockResolvedValue({
      id: 'session-1',
      contractId: 'contract-1',
      signerId: 'tenant-1',
      signerRole: 'tenant',
      artifactHash: 'a'.repeat(64),
      providerTransactionId: 'sca-1',
      status: 'signed',
      expiresAt: '2030-01-01T00:00:00.000Z',
    })

    await expect(
      pollSmartCaSigningSession('contract-1', 'session-1')
    ).resolves.toMatchObject({ status: 'signed' })
    expect(post).toHaveBeenCalledWith(
      '/contracts/contract-1/smartca/signing-sessions/session-1/poll',
      {}
    )
  })

  it('cancels a pending session via the cancel endpoint', async () => {
    const post = vi.spyOn(apiClient, 'post').mockResolvedValue({
      id: 'session-1',
      contractId: 'contract-1',
      signerId: 'tenant-1',
      signerRole: 'tenant',
      artifactHash: 'a'.repeat(64),
      providerTransactionId: 'sca-1',
      status: 'cancelled',
      expiresAt: '2030-01-01T00:00:00.000Z',
    })

    await expect(
      cancelSmartCaSigningSession('contract-1', 'session-1')
    ).resolves.toMatchObject({ status: 'cancelled' })
    expect(post).toHaveBeenCalledWith(
      '/contracts/contract-1/smartca/signing-sessions/session-1/cancel',
      {}
    )
  })

  it('reads a sanitized session without secret or raw signature fields', async () => {
    const get = vi.spyOn(apiClient, 'get').mockResolvedValue({
      id: 'session-1',
      contractId: 'contract-1',
      signerId: 'tenant-1',
      signerRole: 'tenant',
      artifactHash: 'a'.repeat(64),
      providerTransactionId: 'sca-1',
      status: 'signed',
      signatureHash: 'signature-hash',
      expiresAt: '2030-01-01T00:00:00.000Z',
    })

    const session = await getSmartCaSigningSession('contract-1', 'session-1')

    expect(session).toMatchObject({ status: 'signed' })
    expect(session).not.toHaveProperty('smartCaPassword')
    expect(session).not.toHaveProperty('smartCaOtp')
    expect(session).not.toHaveProperty('sad')
    expect(session).not.toHaveProperty('signatureValueRef')
    expect(get).toHaveBeenCalledWith(
      '/contracts/contract-1/smartca/signing-sessions/session-1'
    )
  })
})
