import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { DepositPaymentPanel } from './deposit-payment-panel'
import type { ContractDepositView } from '@/features/contracts/api/contracts-api'
import * as paymentsApi from '../api/payments-api'

vi.mock('../api/payments-api', () => ({
  consentDepositAgreement: vi.fn(),
  initDepositPayment: vi.fn(),
}))

describe('DepositPaymentPanel', () => {
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

    expect(paymentsApi.initDepositPayment).toHaveBeenCalledWith('dpa-123')
    await waitFor(() => {
      expect(screen.getByText('Mở cổng thanh toán')).toBeInTheDocument()
    })
    expect(screen.getByText('Nội dung:')).toBeInTheDocument()
    expect(screen.getByText(/Hạn:/)).toBeInTheDocument()
    expect(screen.getByText('Mô phỏng')).toBeInTheDocument()
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
})
