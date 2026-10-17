import { beforeEach, describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api'
import {
  readPaymentReturnParam,
  stripPaymentReturnParam,
  getPaymentProviders,
  getGatewayPaymentResult,
  getPaymentsByContract,
  initDepositPayment,
  initInvoicePayment,
  initRentPayment,
  isExternalGateway,
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

    expect(apiClient.get).toHaveBeenCalledWith(
      '/payments?contractId=contract-1'
    )
    expect(apiClient.post).toHaveBeenCalledWith('/bank/rent/init', {
      paymentId: 'payment-1',
      clientChannel: 'web',
    })
    expect(apiClient.post).toHaveBeenCalledWith('/bank/invoice/init', {
      paymentId: 'invoice-1',
      clientChannel: 'web',
    })
  })

  it('sends the chosen gateway with the web channel on every init', async () => {
    vi.mocked(apiClient.post).mockResolvedValue({ status: 'pending' })

    await initDepositPayment('deposit-1', { provider: 'zalopay' })
    await initRentPayment('payment-1', { provider: 'momo' })
    await initInvoicePayment('invoice-1', { provider: 'vnpay' })

    expect(apiClient.post).toHaveBeenCalledWith('/bank/deposit/init', {
      depositAgreementId: 'deposit-1',
      provider: 'zalopay',
      clientChannel: 'web',
    })
    expect(apiClient.post).toHaveBeenCalledWith('/bank/rent/init', {
      paymentId: 'payment-1',
      provider: 'momo',
      clientChannel: 'web',
    })
    expect(apiClient.post).toHaveBeenCalledWith('/bank/invoice/init', {
      paymentId: 'invoice-1',
      provider: 'vnpay',
      clientChannel: 'web',
    })
  })

  it('sends momoMethod only for MoMo', async () => {
    vi.mocked(apiClient.post).mockResolvedValue({ status: 'pending' })

    await initRentPayment('payment-1', { provider: 'momo', momoMethod: 'card' })
    await initRentPayment('payment-2', {
      provider: 'vnpay',
      momoMethod: 'card',
    })

    expect(apiClient.post).toHaveBeenCalledWith('/bank/rent/init', {
      paymentId: 'payment-1',
      provider: 'momo',
      momoMethod: 'card',
      clientChannel: 'web',
    })
    expect(apiClient.post).toHaveBeenCalledWith('/bank/rent/init', {
      paymentId: 'payment-2',
      provider: 'vnpay',
      clientChannel: 'web',
    })
  })

  it('loads the enabled gateway list', async () => {
    vi.mocked(apiClient.get).mockResolvedValue([])

    await getPaymentProviders()

    expect(apiClient.get).toHaveBeenCalledWith('/bank/providers')
  })

  it('loads a gateway result by server reference', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ targetPaid: true })

    await getGatewayPaymentResult('MOMO-1')

    expect(apiClient.get).toHaveBeenCalledWith('/bank/attempts/MOMO-1/result')
  })

  it('treats mocbank as an external gateway but not mock-bank', () => {
    expect(isExternalGateway({ provider: 'mocbank' })).toBe(true)
    expect(isExternalGateway({ provider: 'mock-bank' })).toBe(false)
    expect(isExternalGateway({})).toBe(false)
  })

  it('reads the payment return hint and strips it from the URL', () => {
    window.history.replaceState(
      null,
      '',
      '/contracts/c-1?payment=succeeded&provider=momo&tab=1'
    )

    expect(readPaymentReturnParam()).toBe('succeeded')
    stripPaymentReturnParam()
    expect(window.location.search).toBe('?tab=1')
    expect(readPaymentReturnParam()).toBeNull()
  })
})
