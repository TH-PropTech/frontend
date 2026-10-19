import { beforeEach, describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api'
import { getReceivingStatus, linkWallet, reportPayoutIssue } from './wallet-api'

vi.mock('@/shared/api', () => ({
  apiClient: { get: vi.fn(), post: vi.fn() },
}))

describe('wallet API linkWallet', () => {
  beforeEach(() => vi.clearAllMocks())

  it('omits brand when not provided', async () => {
    await linkWallet({ accountNumber: '810000006789' })
    expect(apiClient.post).toHaveBeenCalledWith('/wallet/link', {
      accountNumber: '810000006789',
    })
  })

  it('posts brand when provided', async () => {
    await linkWallet({ accountNumber: '810000006789', brand: 'momo' })
    expect(apiClient.post).toHaveBeenCalledWith('/wallet/link', {
      accountNumber: '810000006789',
      brand: 'momo',
    })
  })
})

describe('wallet API receiving status', () => {
  beforeEach(() => vi.clearAllMocks())

  it('passes refresh flag', async () => {
    await getReceivingStatus()
    expect(apiClient.get).toHaveBeenCalledWith(
      '/wallet/receiving-status?refresh=false'
    )
    await getReceivingStatus(true)
    expect(apiClient.get).toHaveBeenLastCalledWith(
      '/wallet/receiving-status?refresh=true'
    )
  })

  it('reports an issue with optional note', async () => {
    await reportPayoutIssue('p1')
    expect(apiClient.post).toHaveBeenCalledWith('/payouts/p1/report-issue', {})
    await reportPayoutIssue('p1', 'chưa nhận')
    expect(apiClient.post).toHaveBeenLastCalledWith(
      '/payouts/p1/report-issue',
      { note: 'chưa nhận' }
    )
  })
})
