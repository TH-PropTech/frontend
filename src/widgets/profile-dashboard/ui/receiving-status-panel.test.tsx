import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ReceivingStatusPanel } from './receiving-status-panel'

const mocks = vi.hoisted(() => ({
  useReceivingStatus: vi.fn(),
  useReportPayoutIssue: vi.fn(),
  refreshNow: vi.fn(),
  refetch: vi.fn(),
  mutate: vi.fn(),
  toastSuccess: vi.fn(),
  toastError: vi.fn(),
}))

vi.mock('@/entities/wallet', () => ({
  useReceivingStatus: mocks.useReceivingStatus,
  useReportPayoutIssue: mocks.useReportPayoutIssue,
}))

vi.mock('@/shared/ui/app-toast', () => ({
  appToast: { success: mocks.toastSuccess, error: mocks.toastError },
}))

const account = {
  brand: 'mocbank',
  accountNumberMasked: '****6789',
  accountHolder: 'NGUYEN VAN A',
  state: 'active',
  message: 'Ví hoạt động',
}

const ready = {
  checkedAt: '2026-10-19T03:05:00.000Z',
  hasLinkedWallet: true,
  accounts: [account],
  lastReceived: {
    payoutId: 'p0',
    contractId: 'c0',
    amount: 5000000,
    paidOutAt: '2026-10-01T00:00:00.000Z',
    reference: 'REF-1',
  },
  counts: { awaitingWallet: 0, pending: 0, failed: 0 },
  issues: [],
}

const issue = {
  payoutId: 'p1',
  contractId: 'c1',
  amount: 3000000,
  status: 'failed',
  reasonCode: 'WALLET_NOT_FOUND',
  reason: 'Ví nhận không tồn tại',
  createdAt: '2026-10-10T00:00:00.000Z',
  reportedAt: null,
}

function setStatus(value: Record<string, unknown>): void {
  mocks.useReceivingStatus.mockReturnValue({
    isLoading: false,
    isError: false,
    refreshNow: mocks.refreshNow,
    refetch: mocks.refetch,
    ...value,
  })
}

describe('ReceivingStatusPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.refreshNow.mockResolvedValue(undefined)
    mocks.useReportPayoutIssue.mockReturnValue({
      mutate: mocks.mutate,
      isPending: false,
    })
  })

  it('shows ready state with last received', () => {
    setStatus({ data: ready })
    render(<ReceivingStatusPanel />)
    expect(screen.getByText('Sẵn sàng nhận tiền')).toBeInTheDocument()
    expect(screen.getByText(/Ví Mộc · \*\*\*\*6789/)).toBeInTheDocument()
    expect(screen.getByText('Ví hoạt động')).toBeInTheDocument()
    expect(
      screen.getByText(/Lần nhận gần nhất: 5\.000\.000 VND/)
    ).toBeInTheDocument()
    expect(screen.getByText(/REF-1/)).toBeInTheDocument()
    expect(
      screen.getByText(/Kiểm tra lúc \d\d:\d\d \d\d\/\d\d/)
    ).toBeInTheDocument()
  })

  it('shows attention state with issues', () => {
    setStatus({
      data: {
        ...ready,
        lastReceived: null,
        counts: { awaitingWallet: 0, pending: 0, failed: 1 },
        issues: [issue],
        accounts: [
          { ...account, state: 'not_found', message: 'Không tìm thấy ví' },
        ],
      },
    })
    render(<ReceivingStatusPanel />)
    expect(screen.getByText('Cần chú ý')).toBeInTheDocument()
    expect(screen.getByText('Chưa nhận khoản nào')).toBeInTheDocument()
    expect(screen.getByText('Ví nhận không tồn tại')).toBeInTheDocument()
    expect(screen.getByText('Không tìm thấy ví')).toBeInTheDocument()
    expect(screen.getByText('Lỗi: 1')).toBeInTheDocument()
  })

  it('shows no-wallet state and tolerates missing arrays', () => {
    setStatus({
      data: { checkedAt: '2026-10-19T03:05:00.000Z', hasLinkedWallet: false },
    })
    render(<ReceivingStatusPanel />)
    expect(screen.getByText('Chưa liên kết ví')).toBeInTheDocument()
    expect(screen.getByText('Chưa nhận khoản nào')).toBeInTheDocument()
    expect(screen.getByText('Chờ ví: 0')).toBeInTheDocument()
  })

  it('shows skeleton while loading', () => {
    setStatus({ isLoading: true })
    render(<ReceivingStatusPanel />)
    expect(screen.getByTestId('receiving-status-skeleton')).toBeInTheDocument()
  })

  it('shows error with retry', () => {
    setStatus({ isError: true })
    render(<ReceivingStatusPanel />)
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Không thể tải trạng thái nhận tiền'
    )
    fireEvent.click(screen.getByRole('button', { name: 'Thử lại' }))
    expect(mocks.refetch).toHaveBeenCalled()
  })

  it('refresh button forces a fresh check', () => {
    setStatus({ data: ready })
    render(<ReceivingStatusPanel />)
    fireEvent.click(screen.getByRole('button', { name: /Kiểm tra lại/ }))
    expect(mocks.refreshNow).toHaveBeenCalledTimes(1)
  })

  it('reports an issue with a note', () => {
    setStatus({ data: { ...ready, issues: [issue] } })
    render(<ReceivingStatusPanel />)
    fireEvent.click(screen.getByRole('button', { name: 'Báo cho sàn' }))
    fireEvent.change(screen.getByLabelText(/Ghi chú/), {
      target: { value: '  chưa nhận được  ' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Gửi báo cáo' }))
    expect(mocks.mutate).toHaveBeenCalledWith(
      { payoutId: 'p1', note: 'chưa nhận được' },
      expect.any(Object)
    )
    const opts = mocks.mutate.mock.calls[0]![1] as {
      onSuccess: () => void
      onError: (e: unknown) => void
    }
    opts.onSuccess()
    expect(mocks.toastSuccess).toHaveBeenCalled()
    opts.onError(new Error('x'))
    expect(mocks.toastError).toHaveBeenCalled()
  })

  it('omits empty note and disables button once reported', () => {
    setStatus({ data: { ...ready, issues: [issue] } })
    const { unmount } = render(<ReceivingStatusPanel />)
    fireEvent.click(screen.getByRole('button', { name: 'Báo cho sàn' }))
    fireEvent.click(screen.getByRole('button', { name: 'Gửi báo cáo' }))
    expect(mocks.mutate).toHaveBeenCalledWith(
      { payoutId: 'p1' },
      expect.any(Object)
    )
    unmount()

    setStatus({
      data: {
        ...ready,
        issues: [{ ...issue, reportedAt: '2026-10-11T02:30:00.000Z' }],
      },
    })
    render(<ReceivingStatusPanel />)
    expect(screen.getByRole('button', { name: /Đã báo lúc/ })).toBeDisabled()
    expect(
      screen.queryByRole('button', { name: 'Báo cho sàn' })
    ).not.toBeInTheDocument()
  })
})
