import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { MoveInSettlementView } from '@/features/contracts/api/contracts-api'
import { ApiClientError } from '@/shared/api/api-client'
import { MoveInSettlementPanel } from './move-in-settlement-panel'
import * as api from '../api/move-in-settlement-api'

vi.mock('../api/move-in-settlement-api', () => ({
  initSettlementPayment: vi.fn(),
  updateHandover: vi.fn(),
  confirmHandover: vi.fn(),
  reportHandoverDiscrepancy: vi.fn(),
  getHandoverTemplate: vi.fn(),
}))

const HASH = 'f'.repeat(64)
const baseHandover: NonNullable<MoveInSettlementView['handover']> = {
  revision: 2,
  handedOverAt: '2026-10-01T00:00:00.000Z',
  meterReadings: { electricity: 100, water: 25 },
  keyCount: 2,
  inventoryReference: null,
  inventoryItems: [
    { name: 'Sofa', quantity: 1, condition: 'good', note: null },
    { name: 'Ghế', quantity: 4, condition: 'damaged', note: 'Gãy chân' },
  ],
  discrepancies: [],
  responseDueAt: '2026-10-04T00:00:00.000Z',
  completionReason: null,
  notes: 'Bàn giao kèm 2 thẻ thang máy',
  handoverHash: HASH,
  tenantConfirmation: null,
  landlordConfirmation: { at: '2026-10-01T00:00:00.000Z', hash: HASH },
  completedAt: null,
}

const settlement: MoveInSettlementView = {
  id: 'settle-1',
  status: 'pending',
  total: 44_000_000,
  dueAt: '2026-10-01T00:00:00.000Z',
  statementHash: 'statement-hash',
  lines: [{ kind: 'FIRST_RENT', amount: 14_000_000, paymentId: 'pay-1' }],
  handover: baseHandover,
}

const renderPanel = (
  view: MoveInSettlementView,
  role: 'tenant' | 'landlord',
  onRefresh = vi.fn(),
  depositConfirmed = true
): ReturnType<typeof render> =>
  render(
    <MoveInSettlementPanel
      settlement={view}
      role={role}
      depositConfirmed={depositConfirmed}
      onRefresh={onRefresh}
      onOpenInvoices={vi.fn()}
    />
  )

describe('MoveInSettlementPanel', () => {
  beforeEach(() => vi.clearAllMocks())

  it('creates a settlement payment request and lets tenant confirm a recorded handover', async () => {
    vi.mocked(api.confirmHandover).mockResolvedValue(settlement)
    vi.mocked(api.initSettlementPayment).mockResolvedValue({
      txRef: 'STL-1',
      deepLink: 'mockbank://pay?txRef=STL-1',
      expiresAt: '2026-10-01T00:00:00.000Z',
      status: 'pending',
    })
    const onOpenInvoices = vi.fn()
    const onRefresh = vi.fn()
    render(
      <MoveInSettlementPanel
        settlement={settlement}
        role="tenant"
        depositConfirmed
        onRefresh={onRefresh}
        onOpenInvoices={onOpenInvoices}
      />
    )

    expect(screen.getByText(/44\.000\.000/)).toBeInTheDocument()
    fireEvent.click(
      screen.getByRole('button', { name: 'Tạo yêu cầu thanh toán' })
    )
    await waitFor(() =>
      expect(api.initSettlementPayment).toHaveBeenCalledWith('settle-1')
    )
    expect(onOpenInvoices).toHaveBeenCalledOnce()
    expect(
      screen.getByRole('link', { name: 'Mở cổng thanh toán' })
    ).toHaveAttribute('href', 'mockbank://pay?txRef=STL-1')
    fireEvent.click(screen.getByRole('button', { name: 'Xác nhận biên bản' }))
    await waitFor(() =>
      expect(api.confirmHandover).toHaveBeenCalledWith(
        'settle-1',
        HASH,
        'tenant'
      )
    )
    expect(onRefresh).toHaveBeenCalledOnce()
  })

  it('lets landlord record a handover with inventory lines after settlement is paid', async () => {
    vi.mocked(api.updateHandover).mockResolvedValue(settlement)
    renderPanel({ ...settlement, status: 'paid', handover: null }, 'landlord')
    fireEvent.change(screen.getByLabelText('Thời gian bàn giao'), {
      target: { value: '2026-10-01T10:00' },
    })
    fireEvent.change(screen.getByLabelText('Chỉ số điện'), {
      target: { value: '100' },
    })
    fireEvent.change(screen.getByLabelText('Chỉ số nước'), {
      target: { value: '25' },
    })
    fireEvent.change(screen.getByLabelText('Số chìa khóa'), {
      target: { value: '2' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Thêm tài sản' }))
    fireEvent.click(screen.getByRole('button', { name: 'Thêm tài sản' }))
    expect(screen.getAllByTestId('inventory-row')).toHaveLength(2)
    fireEvent.click(screen.getByRole('button', { name: 'Xóa dòng 2' }))
    fireEvent.change(screen.getByLabelText('Tên tài sản'), {
      target: { value: ' Tủ lạnh ' },
    })
    fireEvent.change(screen.getByLabelText('Tình trạng'), {
      target: { value: 'damaged' },
    })
    fireEvent.click(
      screen.getByRole('button', { name: 'Ghi biên bản bàn giao' })
    )
    await waitFor(() =>
      expect(api.updateHandover).toHaveBeenCalledWith(
        'settle-1',
        expect.objectContaining({
          electricity: 100,
          water: 25,
          keyCount: 2,
          handedOverAt: new Date('2026-10-01T10:00').toISOString(),
          inventoryItems: [
            { name: 'Tủ lạnh', quantity: 1, condition: 'damaged' },
          ],
        })
      )
    )
  })

  it('does not offer the record form to the landlord before the settlement is paid nor the deposit confirmed', () => {
    renderPanel({ ...settlement, handover: null }, 'landlord', undefined, false)
    expect(
      screen.queryByRole('button', { name: 'Ghi biên bản bàn giao' })
    ).not.toBeInTheDocument()
  })

  it('offers the record form to the landlord once the deposit is confirmed, even before the settlement is paid', () => {
    renderPanel({ ...settlement, handover: null }, 'landlord', undefined, true)
    expect(
      screen.getByRole('button', { name: 'Ghi biên bản bàn giao' })
    ).toBeInTheDocument()
  })

  it('shows the tenant the full record, deadline and both actions before responding', () => {
    renderPanel(settlement, 'tenant')
    const record = screen.getByTestId('handover-record')
    for (const text of [
      'Chỉ số điện',
      'Chỉ số nước',
      'Số chìa khóa',
      'Sofa × 1 · Tốt',
      'Ghế × 4 · Hư hỏng · Gãy chân',
      'Bàn giao kèm 2 thẻ thang máy',
      'Hạn phản hồi của khách thuê',
    ]) {
      expect(record).toHaveTextContent(text)
    }
    expect(
      screen.getByRole('button', { name: 'Xác nhận biên bản' })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Báo sai lệch' })).toBeEnabled()
  })

  it('blocks an empty discrepancy and sends a trimmed note against the current hash', async () => {
    vi.mocked(api.reportHandoverDiscrepancy).mockResolvedValue(settlement)
    const onRefresh = vi.fn()
    renderPanel(settlement, 'tenant', onRefresh)
    fireEvent.click(screen.getByRole('button', { name: 'Báo sai lệch' }))
    const submit = screen.getByRole('button', {
      name: 'Gửi phản hồi sai lệch',
    })
    expect(submit).toBeDisabled()
    fireEvent.change(screen.getByLabelText('Nội dung sai lệch'), {
      target: { value: '   ' },
    })
    expect(submit).toBeDisabled()
    fireEvent.change(screen.getByLabelText('Nội dung sai lệch'), {
      target: { value: '  Chỉ số nước thực tế là 125 ' },
    })
    fireEvent.click(submit)
    await waitFor(() =>
      expect(api.reportHandoverDiscrepancy).toHaveBeenCalledWith(
        'settle-1',
        HASH,
        'Chỉ số nước thực tế là 125'
      )
    )
    expect(onRefresh).toHaveBeenCalledOnce()
  })

  it('hides confirm/report once the tenant reported a discrepancy for the current revision', () => {
    renderPanel(
      {
        ...settlement,
        handover: {
          ...baseHandover,
          discrepancies: [
            { revision: 2, note: 'Nước 125', at: '2026-10-02T00:00:00.000Z' },
          ],
        },
      },
      'tenant'
    )
    expect(screen.getByTestId('handover-record')).toHaveTextContent('Bản 2')
    expect(
      screen.queryByRole('button', { name: 'Xác nhận biên bản' })
    ).not.toBeInTheDocument()
    expect(
      screen.getByText('Đã gửi phản hồi. Chờ chủ nhà sửa biên bản.')
    ).toBeInTheDocument()
  })

  it('does not ask the landlord to confirm again after recording, but offers a revision', () => {
    renderPanel({ ...settlement, status: 'paid' }, 'landlord')
    expect(
      screen.queryByRole('button', { name: 'Xác nhận biên bản' })
    ).not.toBeInTheDocument()
    expect(
      screen.getByText('Sửa biên bản (tạo bản mới, khách thuê xác nhận lại)')
    ).toBeInTheDocument()
  })

  it('lets the landlord confirm a staff-recorded revision', () => {
    renderPanel(
      {
        ...settlement,
        status: 'paid',
        handover: { ...baseHandover, landlordConfirmation: null },
      },
      'landlord'
    )
    expect(
      screen.getByRole('button', { name: 'Xác nhận biên bản' })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Báo sai lệch' })
    ).not.toBeInTheDocument()
  })

  it('shows the completion reason for a deadline completion', () => {
    renderPanel(
      {
        ...settlement,
        status: 'paid',
        handover: {
          ...baseHandover,
          completedAt: '2026-10-04T01:00:00.000Z',
          completionReason: 'tenant-no-response',
        },
      },
      'tenant'
    )
    expect(
      screen.getByText(
        /Khách thuê không phản hồi sai lệch trong hạn 3 ngày theo Điều 9\.1\./
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByText(/Hạn phản hồi của khách thuê/)
    ).not.toBeInTheDocument()
  })

  it('maps backend error codes to Vietnamese messages', async () => {
    vi.mocked(api.confirmHandover).mockRejectedValue(
      new ApiClientError('Conflict', 409, {
        code: 'HTTP_409',
        message: 'Conflict',
        details: { code: 'HANDOVER_REVISION_STALE' },
      })
    )
    renderPanel(settlement, 'tenant')
    fireEvent.click(screen.getByRole('button', { name: 'Xác nhận biên bản' }))
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Biên bản vừa được cập nhật. Vui lòng tải lại và xem bản mới nhất.'
    )
  })

  it('never leaks internal codes, English role names or the hash outside the technical section', () => {
    const { container } = renderPanel(
      {
        ...settlement,
        lines: [
          { kind: 'FIRST_RENT', amount: 1, paymentId: 'p1' },
          { kind: 'DEPOSIT_TOPUP', amount: 1, paymentId: 'p2' },
          { kind: 'TENANT_SERVICE_FEE', amount: 1, paymentId: 'p3' },
          { kind: 'SOME_NEW_KIND_X', amount: 1, paymentId: 'p4' },
        ],
      },
      'tenant'
    )
    const details = container.querySelector('details')
    expect(details).not.toHaveAttribute('open')
    expect(details).toHaveTextContent(HASH)
    details?.remove()
    const text = container.textContent ?? ''
    expect(text).not.toMatch(/[A-Z]{3,}(_[A-Z0-9]+){2,}/)
    expect(text).not.toMatch(/[A-Z]{3,}_[A-Z]{3,}/)
    expect(text).not.toMatch(/Tenant|Landlord|pending|hash/i)
    expect(text).not.toContain(HASH)
    expect(text).toContain('Chờ thanh toán')
    expect(text).toContain('Tiền thuê kỳ đầu')
    expect(text).toContain('Khoản khác')
  })
})
