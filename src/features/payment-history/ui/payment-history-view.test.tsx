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
    markPayoutSettledExternally: vi.fn(),
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
    expect(within(row).getByText('Thành công')).toBeInTheDocument()
    expect(within(row).getByText('Đã chuyển')).toBeInTheDocument()
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
      await within(screen.getByTestId('payment-row-TX-1')).findByText(
        'Thất bại'
      )
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

  const EXT: AdminPaymentRow = {
    ...ROW,
    provider: 'zalopay',
    gateway: {
      kind: 'external',
      reconcileStatus: 'unverified',
      gatewayStatus: null,
      providerTransactionId: 'ZP-999',
      checkedAt: null,
    },
    payout: {
      id: 'po-1',
      settlement: 'external',
      status: 'pending',
      relayRef: null,
      failureReason: null,
      paidOutAt: null,
    },
    anomalies: ['awaiting-reconciliation'],
  }

  const listOf = (items: AdminPaymentRow[]): void => {
    vi.mocked(api.getAdminPayments).mockResolvedValue({
      items,
      total: items.length,
      page: 1,
      limit: 20,
    })
  }

  it('shows unverified external row with provider id and info anomaly', async () => {
    listOf([EXT])
    render(<PaymentHistoryView />)
    const row = await screen.findByTestId('payment-row-TX-1')
    expect(within(row).getByText('Chờ đối soát với cổng')).toBeInTheDocument()
    expect(within(row).getByText('ZP-999')).toBeInTheDocument()
    expect(within(row).getByText('ZaloPay (sandbox)')).toBeInTheDocument()
    expect(
      within(row).getByText('Đã thu qua cổng, chờ đối soát')
    ).toBeInTheDocument()
  })

  it('shows verified and mismatch badges with gateway status and check time', async () => {
    listOf([
      {
        ...EXT,
        txRef: 'TX-V',
        gateway: {
          ...EXT.gateway!,
          reconcileStatus: 'verified',
          gatewayStatus: 'succeeded',
          checkedAt: '2026-01-11T00:00:00.000Z',
        },
      },
      {
        ...EXT,
        txRef: 'TX-M',
        anomalies: ['gateway-amount-mismatch'],
        gateway: {
          ...EXT.gateway!,
          reconcileStatus: 'mismatch',
          gatewayStatus: 'failed',
        },
      },
    ])
    render(<PaymentHistoryView />)
    const v = await screen.findByTestId('payment-row-TX-V')
    expect(within(v).getByText('Đã khớp với cổng')).toBeInTheDocument()
    expect(within(v).getByText(/Cổng: thành công/)).toBeInTheDocument()
    expect(within(v).getByText(/Kiểm tra lúc/)).toBeInTheDocument()
    const m = screen.getByTestId('payment-row-TX-M')
    expect(within(m).getByText('Lệch với cổng')).toBeInTheDocument()
    expect(
      within(m).getByText('Số tiền ở cổng lệch với hệ thống')
    ).toBeInTheDocument()
  })

  it('labels the other new anomaly codes', async () => {
    listOf([
      {
        ...EXT,
        anomalies: ['gateway-not-confirmed', 'gateway-paid-not-settled'],
      },
    ])
    render(<PaymentHistoryView />)
    expect(
      await screen.findByText('Cổng không xác nhận giao dịch đã thanh toán')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Cổng đã thu tiền nhưng chưa chuyển cho chủ nhà')
    ).toBeInTheDocument()
  })

  it('shows internal badge for Ví Mộc rows', async () => {
    listOf([
      {
        ...ROW,
        gateway: {
          kind: 'internal',
          reconcileStatus: 'not_applicable',
          gatewayStatus: null,
          providerTransactionId: null,
          checkedAt: null,
        },
      },
    ])
    render(<PaymentHistoryView />)
    expect(await screen.findByText('Nội bộ')).toBeInTheDocument()
  })

  it('shows off-system payout text and mark button only for pending external payouts', async () => {
    listOf([
      EXT,
      {
        ...EXT,
        txRef: 'TX-2',
        payout: { ...EXT.payout!, status: 'paid-out' },
      },
    ])
    render(<PaymentHistoryView />)
    const row = await screen.findByTestId('payment-row-TX-1')
    expect(
      within(row).getByText(/chuyển cho chủ nhà ngoài hệ thống/)
    ).toBeInTheDocument()
    expect(
      within(row).getByRole('button', {
        name: 'Đánh dấu đã chuyển ngoài hệ thống',
      })
    ).toBeInTheDocument()
    expect(
      within(screen.getByTestId('payment-row-TX-2')).queryByRole('button', {
        name: 'Đánh dấu đã chuyển ngoài hệ thống',
      })
    ).toBeNull()
  })

  it('confirm dialog calls the API with the note and refreshes the row', async () => {
    const user = userEvent.setup()
    listOf([EXT])
    vi.mocked(api.markPayoutSettledExternally).mockResolvedValue({
      id: 'po-1',
      status: 'paid-out',
    })
    vi.mocked(api.recheckAdminPayment).mockResolvedValue({
      ...EXT,
      payout: { ...EXT.payout!, status: 'paid-out' },
    })
    render(<PaymentHistoryView />)
    await screen.findByTestId('payment-row-TX-1')
    await user.click(
      screen.getByRole('button', { name: 'Đánh dấu đã chuyển ngoài hệ thống' })
    )
    await user.type(screen.getByLabelText('Ghi chú'), 'ck 123')
    await user.click(screen.getByRole('button', { name: 'Xác nhận' }))
    expect(api.markPayoutSettledExternally).toHaveBeenCalledWith(
      'po-1',
      'ck 123'
    )
    expect(
      await within(screen.getByTestId('payment-row-TX-1')).findByText(
        'Đã chuyển cho chủ nhà ngoài hệ thống'
      )
    ).toBeInTheDocument()
  })

  it('renders rows without gateway info', async () => {
    listOf([ROW])
    render(<PaymentHistoryView />)
    expect(await screen.findByTestId('payment-row-TX-1')).toBeInTheDocument()
  })
})
