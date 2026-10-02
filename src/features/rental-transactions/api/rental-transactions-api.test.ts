import { describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api'
import {
  getRentalTransactionTimeline,
  getStuckRentalTransactions,
  recoverRentalTransaction,
} from './rental-transactions-api'

describe('rental transactions api', () => {
  it('loads participant timeline and staff stuck queue', async () => {
    const get = vi.spyOn(apiClient, 'get').mockResolvedValue([])
    await getRentalTransactionTimeline('application/1')
    await getStuckRentalTransactions()
    expect(get).toHaveBeenNthCalledWith(
      1,
      '/rental-transactions/application%2F1/timeline'
    )
    expect(get).toHaveBeenNthCalledWith(2, '/rental-transactions/admin/stuck')
    get.mockRestore()
  })

  it('sends a reasoned recovery action', async () => {
    const post = vi
      .spyOn(apiClient, 'post')
      .mockResolvedValue({ action: 'RETRY_LEDGER' })
    await recoverRentalTransaction('contract-1', {
      action: 'RETRY_LEDGER',
      reason: 'Retry after confirming the outbox dependency is ready.',
    })
    expect(post).toHaveBeenCalledWith(
      '/rental-transactions/contract-1/recover',
      expect.objectContaining({ action: 'RETRY_LEDGER' })
    )
    post.mockRestore()
  })
})
