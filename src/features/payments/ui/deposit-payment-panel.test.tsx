import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { DepositPaymentPanel } from './deposit-payment-panel'
import type { ContractDepositView } from '@/features/contracts/api/contracts-api'
import * as paymentsApi from '../api/payments-api'

vi.mock('../api/payments-api', async importOriginal => {
  const actual = await importOriginal<typeof import('../api/payments-api')>()
  return {
    consentDepositAgreement: vi.fn(),
    initDepositPayment: vi.fn(),
    getPaymentProviders: vi.fn().mockResolvedValue([
      {
        provider: 'mock-bank',
        label: 'Mock Bank (sandbox)',
        simulation: true,
      },
    ]),
    isExternalGateway: actual.isExternalGateway,
  }
})

describe('DepositPaymentPanel', () => {
  const originalLocation = window.location

  const mockPendingDeposit: ContractDepositView = {
    agreementId: 'dpa-123',
    status: 'pending',
    amount: 15000000,
    consentGiven: true,
    paidAt: null,
    txHash: null,
  }

  const mockUnconsentedDeposit: ContractDepositView = {
    agreementId: 'dpa-123',
    status: 'draft',
    amount: 15000000,
    consentGiven: false,
    contentRevision: 3,
    contentHash: 'deposit-content-hash',
    paidAt: null,
    txHash: null,
  }

  const mockPaidDeposit: ContractDepositView = {
    agreementId: 'dpa-123',
    status: 'paid',
    amount: 15000000,
    paidAt: '2026-03-14T02:00:00Z',
    txHash: '0xmockdepositpay123',
    paymentProofUrl: 'https://receipt.test/deposit-1',
  }

  afterEach(() => {
    vi.clearAllMocks()
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    })
  })

  it('renders empty notice when deposit is null', () => {
    render(
      <DepositPaymentPanel deposit={null} isTenant={true} contractId="c1" />
    )
    expect(screen.getByTestId('deposit-empty')).toBeInTheDocument()
  })

  it('renders paid state with amount, paidAt, and txHash', () => {
    render(
      <DepositPaymentPanel
        deposit={mockPaidDeposit}
        isTenant={true}
        contractId="c1"
      />
    )
    expect(screen.getByTestId('deposit-status-paid')).toBeInTheDocument()
    expect(screen.getByText('0xmockdepositpay123')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Xem biên nhận thanh toán' })
    ).toHaveAttribute('href', 'https://receipt.test/deposit-1')
    expect(screen.getByText(/15\.000\.000/)).toBeInTheDocument()
  })

  it('renders pending state and allows tenant to initiate payment', async () => {
    vi.mocked(paymentsApi.initDepositPayment).mockResolvedValue({
      provider: 'mock-bank',
      txRef: 'ref-1',
      amount: 15000000,
      description: 'Deposit',
      qrCode: 'qr',
      deepLink: 'https://mockbank.test/pay',
      expiresAt: '2026-03-14T03:00:00Z',
      status: 'pending',
    })

    render(
      <DepositPaymentPanel
        deposit={mockPendingDeposit}
        isTenant={true}
        contractId="c1"
      />
    )

    expect(screen.getByTestId('deposit-status-pending')).toBeInTheDocument()
    const payBtn = screen.getByLabelText('Thanh toán cọc ngay')
    fireEvent.click(payBtn)

    expect(paymentsApi.initDepositPayment).toHaveBeenCalledWith('dpa-123', {
      provider: 'mock-bank',
    })
    await waitFor(() => {
      expect(screen.getByText('Mở cổng thanh toán')).toBeInTheDocument()
    })
    expect(screen.getByText('Nội dung:')).toBeInTheDocument()
    expect(screen.getByText(/Hạn:/)).toBeInTheDocument()
    expect(screen.getByText('Mô phỏng')).toBeInTheDocument()
  })

  it('uses a clear amount-to-action hierarchy with an accessible primary action', () => {
    render(
      <DepositPaymentPanel
        deposit={mockPendingDeposit}
        isTenant={true}
        contractId="c1"
      />
    )

    expect(screen.getByTestId('deposit-payment-panel')).toHaveClass('gap-5')
    expect(screen.getByTestId('deposit-amount-card')).toHaveClass(
      'bg-[var(--primary-soft)]'
    )
    expect(screen.queryByText(/e-Consent/i)).not.toBeInTheDocument()
    expect(screen.getByLabelText('Thanh toán cọc ngay')).toHaveClass(
      'min-h-11',
      'text-[var(--on-control)]'
    )
  })

  it('redirects the current tab to a returned VNPay URL', async () => {
    vi.mocked(paymentsApi.initDepositPayment).mockResolvedValue({
      provider: 'vnpay',
      txRef: 'VNPAY-1',
      amount: 15000000,
      description: 'Deposit',
      qrCode: 'qr',
      deepLink: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?x=1',
      expiresAt: '2026-03-14T03:00:00Z',
      status: 'pending',
    })
    const assign = vi.fn()
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { assign },
    })

    render(
      <DepositPaymentPanel
        deposit={mockPendingDeposit}
        isTenant={true}
        contractId="c1"
      />
    )
    fireEvent.click(screen.getByLabelText('Thanh toán cọc ngay'))

    await waitFor(() => {
      expect(assign).toHaveBeenCalledWith(
        'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?x=1'
      )
    })
  })

  it('lets the tenant consent before showing the Mock Bank payment action', async () => {
    vi.mocked(paymentsApi.consentDepositAgreement).mockResolvedValue(undefined)
    const onPaymentSuccess = vi.fn()

    render(
      <DepositPaymentPanel
        deposit={mockUnconsentedDeposit}
        isTenant={true}
        contractId="c1"
        onPaymentSuccess={onPaymentSuccess}
      />
    )

    expect(screen.getByLabelText('Đồng ý thỏa thuận cọc')).toBeInTheDocument()
    expect(
      screen.queryByLabelText('Thanh toán cọc ngay')
    ).not.toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Đồng ý thỏa thuận cọc'))

    await waitFor(() => {
      expect(paymentsApi.consentDepositAgreement).toHaveBeenCalledWith(
        'dpa-123',
        3,
        'deposit-content-hash'
      )
    })
    expect(onPaymentSuccess).toHaveBeenCalledTimes(1)
  })

  it('shows the consent failure and keeps payment unavailable', async () => {
    vi.mocked(paymentsApi.consentDepositAgreement).mockRejectedValue(
      new Error('DEPOSIT_CONSENT_REQUIRED')
    )

    render(
      <DepositPaymentPanel
        deposit={mockUnconsentedDeposit}
        isTenant={true}
        contractId="c1"
      />
    )

    fireEvent.click(screen.getByLabelText('Đồng ý thỏa thuận cọc'))

    expect(
      await screen.findByText('DEPOSIT_CONSENT_REQUIRED')
    ).toBeInTheDocument()
    expect(
      screen.queryByLabelText('Thanh toán cọc ngay')
    ).not.toBeInTheDocument()
  })

  it('asks the workspace to refresh after a failed consent without retrying', async () => {
    vi.mocked(paymentsApi.consentDepositAgreement).mockRejectedValue(
      new Error('DEPOSIT_CONSENT_REQUIRED')
    )
    const onRefresh = vi.fn()
    const onPaymentSuccess = vi.fn()

    render(
      <DepositPaymentPanel
        deposit={mockUnconsentedDeposit}
        isTenant={true}
        contractId="c1"
        onRefresh={onRefresh}
        onPaymentSuccess={onPaymentSuccess}
      />
    )

    fireEvent.click(screen.getByLabelText('Đồng ý thỏa thuận cọc'))

    await waitFor(() => expect(onRefresh).toHaveBeenCalledTimes(1))
    expect(onPaymentSuccess).not.toHaveBeenCalled()
    expect(paymentsApi.consentDepositAgreement).toHaveBeenCalledTimes(1)
  })

  it('shows waiting message for landlord when deposit is pending', () => {
    render(
      <DepositPaymentPanel
        deposit={mockPendingDeposit}
        isTenant={false}
        contractId="c1"
      />
    )

    expect(
      screen.getByText(/Đang chờ Bên thuê hoàn tất nộp tiền đặt cọc/i)
    ).toBeInTheDocument()
    expect(
      screen.queryByLabelText('Thanh toán cọc ngay')
    ).not.toBeInTheDocument()
  })

  it('does not offer tenant consent to the landlord', () => {
    render(
      <DepositPaymentPanel
        deposit={mockUnconsentedDeposit}
        isTenant={false}
        contractId="c1"
      />
    )

    expect(
      screen.queryByLabelText('Đồng ý thỏa thuận cọc')
    ).not.toBeInTheDocument()
  })

  it('does not offer consent without current agreement metadata', () => {
    render(
      <DepositPaymentPanel
        deposit={{
          ...mockUnconsentedDeposit,
          contentRevision: null,
          contentHash: null,
        }}
        isTenant={true}
        contractId="c1"
      />
    )

    expect(
      screen.queryByLabelText('Đồng ý thỏa thuận cọc')
    ).not.toBeInTheDocument()
  })

  // ---------------------------------------------------------------------------
  // isActiveStep visual state tests
  // ---------------------------------------------------------------------------
  describe('isActiveStep prop', () => {
    it('adds ring highlight class when isActiveStep=true', () => {
      render(
        <DepositPaymentPanel
          deposit={mockPendingDeposit}
          isTenant={true}
          contractId="c1"
          isActiveStep={true}
        />
      )
      const wrapper = screen.getByTestId('deposit-payment-panel-wrapper')
      expect(wrapper.className).toContain('ring-2')
      expect(wrapper.className).toContain('ring-[var(--primary)]')
    })

    it('adds opacity-50 and pointer-events-none when isActiveStep=false', () => {
      render(
        <DepositPaymentPanel
          deposit={mockPendingDeposit}
          isTenant={true}
          contractId="c1"
          isActiveStep={false}
        />
      )
      const wrapper = screen.getByTestId('deposit-payment-panel-wrapper')
      expect(wrapper.className).toContain('opacity-50')
      expect(wrapper.className).toContain('pointer-events-none')
    })

    it('adds no extra class when isActiveStep is undefined', () => {
      render(
        <DepositPaymentPanel
          deposit={mockPendingDeposit}
          isTenant={true}
          contractId="c1"
        />
      )
      const wrapper = screen.getByTestId('deposit-payment-panel-wrapper')
      expect(wrapper.className).not.toContain('ring-2')
      expect(wrapper.className).not.toContain('opacity-50')
      expect(wrapper.className).not.toContain('pointer-events-none')
    })
  })

  describe('gateway picker', () => {
    const gateways = [
      { provider: 'vnpay' as const, label: 'VNPAY', simulation: false },
      { provider: 'momo' as const, label: 'MoMo', simulation: false },
      { provider: 'zalopay' as const, label: 'ZaloPay', simulation: false },
      {
        provider: 'mocbank' as const,
        label: 'Ví Mộc (sandbox)',
        simulation: false,
      },
    ]

    it('sends the chosen gateway and redirects to its payment page', async () => {
      vi.mocked(paymentsApi.getPaymentProviders).mockResolvedValueOnce(gateways)
      vi.mocked(paymentsApi.initDepositPayment).mockResolvedValue({
        provider: 'momo',
        txRef: 'MOMO-1',
        amount: 15000000,
        description: 'Deposit',
        qrCode: 'qr',
        deepLink: 'https://test-payment.momo.vn/pay?t=1',
        expiresAt: '2026-03-14T03:00:00Z',
        status: 'pending',
      })
      const assign = vi.fn()
      Object.defineProperty(window, 'location', {
        configurable: true,
        value: { assign },
      })

      render(
        <DepositPaymentPanel
          deposit={mockPendingDeposit}
          isTenant={true}
          contractId="c1"
        />
      )
      const momo = await screen.findByRole('radio', { name: 'MoMo' })
      fireEvent.click(momo)
      fireEvent.click(screen.getByLabelText('Thanh toán cọc ngay'))

      await waitFor(() => {
        expect(paymentsApi.initDepositPayment).toHaveBeenCalledWith('dpa-123', {
          provider: 'momo',
          momoMethod: 'wallet',
        })
        expect(assign).toHaveBeenCalledWith(
          'https://test-payment.momo.vn/pay?t=1'
        )
      })
      expect(screen.queryByText(/ngân hàng mô phỏng/)).toBeNull()
    })

    it('redirects to the Ví Mộc page returned as deepLink', async () => {
      vi.mocked(paymentsApi.getPaymentProviders).mockResolvedValueOnce(gateways)
      vi.mocked(paymentsApi.initDepositPayment).mockResolvedValue({
        provider: 'mocbank',
        txRef: 'MOCBANK-1',
        amount: 15000000,
        description: 'Deposit',
        qrCode: 'qr',
        deepLink: 'https://bank.example/pay/1',
        expiresAt: '2026-03-14T03:00:00Z',
        status: 'pending',
      })
      const assign = vi.fn()
      Object.defineProperty(window, 'location', {
        configurable: true,
        value: { assign },
      })

      render(
        <DepositPaymentPanel
          deposit={mockPendingDeposit}
          isTenant={true}
          contractId="c1"
        />
      )
      fireEvent.click(
        await screen.findByRole('radio', { name: 'Ví Mộc (sandbox)' })
      )
      fireEvent.click(screen.getByLabelText('Thanh toán cọc ngay'))

      await waitFor(() => {
        expect(paymentsApi.initDepositPayment).toHaveBeenCalledWith('dpa-123', {
          provider: 'mocbank',
        })
        expect(assign).toHaveBeenCalledWith('https://bank.example/pay/1')
      })
    })

    it('shows the server error when the gateway is not enabled or unavailable', async () => {
      vi.mocked(paymentsApi.getPaymentProviders).mockResolvedValueOnce(gateways)
      vi.mocked(paymentsApi.initDepositPayment).mockRejectedValue(
        new Error('PAYMENT_GATEWAY_UNAVAILABLE')
      )

      render(
        <DepositPaymentPanel
          deposit={mockPendingDeposit}
          isTenant={true}
          contractId="c1"
        />
      )
      // getByRole dùng accessible-name, bỏ qua huy hiệu chữ aria-hidden cạnh tên cổng.
      await screen.findByRole('radio', { name: 'VNPAY' })
      fireEvent.click(screen.getByLabelText('Thanh toán cọc ngay'))

      expect(
        await screen.findByText('PAYMENT_GATEWAY_UNAVAILABLE')
      ).toBeInTheDocument()
    })

    it('hides the picker when only Mock Bank is enabled', async () => {
      render(
        <DepositPaymentPanel
          deposit={mockPendingDeposit}
          isTenant={true}
          contractId="c1"
        />
      )

      await waitFor(() =>
        expect(paymentsApi.getPaymentProviders).toHaveBeenCalled()
      )
      expect(screen.queryByTestId('payment-provider-picker')).toBeNull()
      expect(screen.getByText(/Mock Bank/)).toBeInTheDocument()
    })
  })
})
