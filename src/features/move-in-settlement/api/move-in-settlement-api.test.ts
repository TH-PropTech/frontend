import { describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api'
import { initSettlementPayment } from './move-in-settlement-api'

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
