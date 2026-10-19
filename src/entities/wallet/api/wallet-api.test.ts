import { beforeEach, describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api'
import { linkWallet } from './wallet-api'

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
