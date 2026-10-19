import { describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api'
import {
  getAdminPayments,
  markPayoutSettledExternally,
  recheckAdminPayment,
} from './payment-history-api'

describe('payment history api', () => {
  it('builds the query string only from provided filters', async () => {
    const get = vi
      .spyOn(apiClient, 'get')
      .mockResolvedValue({ items: [], total: 0, page: 1, limit: 20 })

    await getAdminPayments({ page: 2, limit: 10, provider: 'momo' })

    expect(get).toHaveBeenCalledWith(
      '/admin/payments?page=2&limit=10&provider=momo'
    )
    get.mockRestore()
  })

  it('omits the query string entirely when no filter is set', async () => {
    const get = vi
      .spyOn(apiClient, 'get')
      .mockResolvedValue({ items: [], total: 0, page: 1, limit: 20 })

    await getAdminPayments({})

    expect(get).toHaveBeenCalledWith('/admin/payments')
    get.mockRestore()
  })

  it('posts a recheck for one txRef', async () => {
    const post = vi
      .spyOn(apiClient, 'post')
      .mockResolvedValue({ txRef: 'TX-1' })

    await recheckAdminPayment('TX 1')

    expect(post).toHaveBeenCalledWith('/admin/payments/TX%201/recheck', {})
    post.mockRestore()
  })

  it('marks a payout settled externally with an optional note', async () => {
    const post = vi
      .spyOn(apiClient, 'post')
      .mockResolvedValue({ id: 'p1', status: 'paid-out' })

    await markPayoutSettledExternally('p1', 'ck 123')
    expect(post).toHaveBeenCalledWith('/payouts/p1/mark-settled-externally', {
      note: 'ck 123',
    })
    await markPayoutSettledExternally('p1')
    expect(post).toHaveBeenLastCalledWith(
      '/payouts/p1/mark-settled-externally',
      {}
    )
    post.mockRestore()
  })
})
