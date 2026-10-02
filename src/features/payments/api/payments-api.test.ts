import { beforeEach, describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api'
import {
  getLinkedWallet,
  getPaymentsByContract,
  initInvoicePayment,
  initRentPayment,
  linkWallet,
} from './payments-api'

vi.mock('@/shared/api', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
  },
}))

describe('payments API', () => {
  beforeEach(() => vi.clearAllMocks())

  it('uses read-only schedule and provider-link boundaries', async () => {
    vi.mocked(apiClient.get).mockResolvedValue([])
    vi.mocked(apiClient.post).mockResolvedValue({ status: 'pending' })

    await getPaymentsByContract('contract-1')
    await initRentPayment('payment-1')
    await initInvoicePayment('invoice-1')
    await getLinkedWallet()
    await linkWallet()

    expect(apiClient.get).toHaveBeenCalledWith(
      '/payments?contractId=contract-1'
    )
    expect(apiClient.post).toHaveBeenCalledWith('/bank/rent/init', {
      paymentId: 'payment-1',
    })
    expect(apiClient.post).toHaveBeenCalledWith('/bank/invoice/init', {
      paymentId: 'invoice-1',
    })
    expect(apiClient.post).toHaveBeenCalledWith('/bank/wallet/link', {})
  })
})
