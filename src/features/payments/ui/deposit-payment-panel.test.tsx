import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { DepositPaymentPanel } from './deposit-payment-panel'
import type { ContractDepositView } from '@/features/contracts/api/contracts-api'
import * as paymentsApi from '../api/payments-api'

vi.mock('../api/payments-api', () => ({
  initDepositPayment: vi.fn(),
}))

describe('DepositPaymentPanel', () => {
  const mockPendingDeposit: ContractDepositView = {
    agreementId: 'dpa-123',
    status: 'pending',
    amount: 15000000,
    paidAt: null,
    txHash: null,
  }

  const mockPaidDeposit: ContractDepositView = {
    agreementId: 'dpa-123',
    status: 'paid',
    amount: 15000000,
    paidAt: '2026-03-14T02:00:00Z',
    txHash: '0xmockdepositpay123',
  }

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
      expect(
        screen.getByText('Mở cổng thanh toán Mock Bank')
      ).toBeInTheDocument()
    })
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
})
