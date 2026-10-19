import { describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PaymentHistoryView } from './payment-history-view'
import * as api from '../api/payment-history-api'
import type { AdminPaymentRow } from '../api/payment-history-api'

vi.mock('../api/payment-history-api', async () => {
  const actual = await vi.importActual<typeof api>('../api/payment-history-api')
  return {
    ...actual,
    getAdminPayments: vi.fn(),
    recheckAdminPayment: vi.fn(),
  }
})

const ROW: AdminPaymentRow = {
  txRef: 'TX-1',
  provider: 'momo',
  attemptStatus: 'succeeded',
  amount: 5_000_000,
  paymentType: 'rent',
  contractId: 'c-1',
  createdAt: '2026-01-10T00:00:00.000Z',
  payer: { id: 't1', name: 'Nguyễn Văn A', email: 'a@x.com' },
  landlord: { id: 'l1', name: 'Trần Thị B', email: 'b@x.com' },
  payeeRole: 'landlord',
  paymentStatus: 'paid',
  paidAt: '2026-01-10T00:01:00.000Z',
  payout: {
    status: 'paid-out',
    relayRef: 'MOCBANK-1',
    failureReason: null,
    paidOutAt: '2026-01-10T00:02:00.000Z',
  },
  anomalies: [],
}

describe('PaymentHistoryView', () => {
  it('lists a transaction with payer, landlord, provider status and payout status', async () => {
    vi.mocked(api.getAdminPayments).mockResolvedValue({
      items: [ROW],
      total: 1,
      page: 1,
      limit: 20,
    })

    render(<PaymentHistoryView />)

    expect(await screen.findByTestId('payment-row-TX-1')).toBeInTheDocument()
    const row = screen.getByTestId('payment-row-TX-1')
    expect(within(row).getByText('Nguyễn Văn A')).toBeInTheDocument()
    expect(within(row).getByText('Trần Thị B')).toBeInTheDocument()
    expect(within(row).getByText('succeeded')).toBeInTheDocument()
    expect(within(row).getByText('paid-out')).toBeInTheDocument()
  })

  it('shows reconciliation anomalies when present', async () => {
    vi.mocked(api.getAdminPayments).mockResolvedValue({
      items: [{ ...ROW, payout: null, anomalies: ['paid-without-payout'] }],
      total: 1,
      page: 1,
      limit: 20,
    })

    render(<PaymentHistoryView />)

    expect(
      await screen.findByText(
        'Đã thu tiền nhưng chưa có bản ghi chuyển cho chủ nhà'
      )
    ).toBeInTheDocument()
  })

  it('refreshes one row via Kiểm tra lại without reloading the whole page', async () => {
    const user = userEvent.setup()
    vi.mocked(api.getAdminPayments).mockResolvedValue({
      items: [ROW],
      total: 1,
      page: 1,
      limit: 20,
    })
    vi.mocked(api.recheckAdminPayment).mockResolvedValue({
      ...ROW,
      attemptStatus: 'failed',
    })

    render(<PaymentHistoryView />)
    await screen.findByTestId('payment-row-TX-1')
    const callsBeforeClick = vi.mocked(api.getAdminPayments).mock.calls.length

    await user.click(screen.getByRole('button', { name: /kiểm tra lại/i }))

    expect(api.recheckAdminPayment).toHaveBeenCalledWith('TX-1')
    expect(
      await within(screen.getByTestId('payment-row-TX-1')).findByText('failed')
    ).toBeInTheDocument()
    expect(api.getAdminPayments).toHaveBeenCalledTimes(callsBeforeClick)
  })

  it('shows an error message when the list fails to load', async () => {
    vi.mocked(api.getAdminPayments).mockRejectedValue(
      new Error('Không thể tải lịch sử thanh toán.')
    )

    render(<PaymentHistoryView />)

    expect(
      await screen.findByText('Không thể tải lịch sử thanh toán.')
    ).toBeInTheDocument()
  })

  it('shows an empty state when there are no transactions', async () => {
    vi.mocked(api.getAdminPayments).mockResolvedValue({
      items: [],
      total: 0,
      page: 1,
      limit: 20,
    })

    render(<PaymentHistoryView />)

    expect(
      await screen.findByText('Chưa có giao dịch nào khớp bộ lọc.')
    ).toBeInTheDocument()
  })
})
