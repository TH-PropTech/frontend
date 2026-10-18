import { describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api'
import {
  initSettlementPayment,
  reportHandoverDiscrepancy,
} from './move-in-settlement-api'

vi.mock('@/shared/api', () => ({
  apiClient: { post: vi.fn() },
}))

describe('initSettlementPayment', () => {
  it('creates the aggregated settlement payment request', async () => {
    vi.mocked(apiClient.post).mockResolvedValue({
      txRef: 'STL-1',
      deepLink: 'mockbank://pay?txRef=STL-1',
      expiresAt: '2026-10-01T00:00:00.000Z',
      status: 'pending',
    })

    await initSettlementPayment('settlement-1')

    expect(apiClient.post).toHaveBeenCalledWith('/bank/settlement/init', {
      settlementId: 'settlement-1',
    })
  })
})

describe('reportHandoverDiscrepancy', () => {
  it('posts the note against the current handover hash', async () => {
    vi.mocked(apiClient.post).mockResolvedValue({})

    await reportHandoverDiscrepancy('settlement-1', 'hash-1', 'Nước 125')

    expect(apiClient.post).toHaveBeenCalledWith(
      '/move-in-settlements/settlement-1/handover/discrepancy',
      { handoverHash: 'hash-1', note: 'Nước 125' }
    )
  })

  it('propagates API errors to the caller', async () => {
    vi.mocked(apiClient.post).mockRejectedValue(new Error('boom'))

    await expect(
      reportHandoverDiscrepancy('settlement-1', 'hash-1', 'x')
    ).rejects.toThrow('boom')
  })
})
