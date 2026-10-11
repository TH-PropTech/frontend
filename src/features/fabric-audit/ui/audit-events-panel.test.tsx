import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ApiClientError } from '@/shared/api'
import {
  DEFAULT_AUDIT_FILTERS,
  toAuditEventsQuery,
  type AuditFilters,
} from '../model/audit-filters'
import {
  buildEventSummary,
  buildEventsPage,
} from '../test-fixtures/fabric-audit.fixtures'
import { chooseOption, pickDate } from '@/shared/lib/test/ui-pickers'
import { ledgerEventLabel } from '@/shared/lib/ledger-event-labels'
import { deliveryStateView, verificationStateView } from '../model/labels'
import { renderWithQuery } from '../test-fixtures/render-with-query'
import { AuditEventsPanel } from './audit-events-panel'

const api = vi.hoisted(() => ({ listAuditEvents: vi.fn() }))
vi.mock('../api/fabric-audit-api', () => api)

function renderPanel(
  overrides: Partial<{
    filters: AuditFilters
    onFiltersChange: (filters: AuditFilters) => void
    onSelectEvent: (id: string) => void
  }> = {}
) {
  const props = {
    filters: DEFAULT_AUDIT_FILTERS,
    onFiltersChange: vi.fn(),
    onSelectEvent: vi.fn(),
    ...overrides,
  }
  renderWithQuery(<AuditEventsPanel {...props} />)
  return props
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('AuditEventsPanel states', () => {
  it('shows a loading status while events load', () => {
    api.listAuditEvents.mockReturnValue(new Promise(() => undefined))
    renderPanel()
    expect(
      screen.getByRole('status', { name: 'Đang tải sự kiện bằng chứng' })
    ).toBeInTheDocument()
  })

  it('shows an error with retry', async () => {
    const user = userEvent.setup()
    api.listAuditEvents.mockRejectedValueOnce(
      new ApiClientError('bad', 400, {
        code: 'HTTP_400',
        message: 'bad',
        details: { code: 'AUDIT_FILTER_INVALID' },
      })
    )
    renderPanel()
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Bộ lọc không hợp lệ'
    )
    api.listAuditEvents.mockResolvedValue(buildEventsPage())
    await user.click(screen.getByRole('button', { name: 'Thử lại' }))
    expect(await screen.findByRole('table')).toBeInTheDocument()
  })

  it('renders an explicit empty state instead of an error', async () => {
    api.listAuditEvents.mockResolvedValue(buildEventsPage([]))
    renderPanel()
    expect(
      await screen.findByText('Không có sự kiện nào khớp bộ lọc hiện tại.')
    ).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})

describe('AuditEventsPanel table', () => {
  it('requests events using the URL-derived filters (server-side filtering)', async () => {
    api.listAuditEvents.mockResolvedValue(buildEventsPage())
    const filters: AuditFilters = {
      ...DEFAULT_AUDIT_FILTERS,
      contractId: 'contract-1',
      eventType: 'handover.completed',
      state: 'failed',
      from: '2026-09-01',
      page: 2,
    }
    renderPanel({ filters })
    await screen.findByRole('table')
    expect(api.listAuditEvents).toHaveBeenCalledWith(
      toAuditEventsQuery(filters)
    )
  })

  it('renders pending, terminal failure and confirmed rows with readable states', async () => {
    api.listAuditEvents.mockResolvedValue(
      buildEventsPage([
        buildEventSummary({
          id: '66f0000000000000000000a1',
          status: 'pending',
          verificationState: 'not-recorded',
          txId: null,
          blockNumber: null,
          recordedAt: null,
        }),
        buildEventSummary({
          id: '66f0000000000000000000a2',
          eventType: 'move-in.settled',
          status: 'failed',
          verificationState: 'not-recorded',
          failureCode: 'TERMINAL_CONFLICT',
          txId: null,
          blockNumber: null,
        }),
        buildEventSummary({ id: '66f0000000000000000000a3' }),
      ])
    )
    renderPanel()
    const table = await screen.findByRole('table', {
      name: 'Sự kiện bằng chứng sổ cái',
    })
    const rows = within(table).getAllByRole('row').slice(1)
    expect(rows).toHaveLength(3)
    expect(rows[0]).toHaveTextContent('Đang chờ')
    expect(rows[1]).toHaveTextContent('Quyết toán nhận nhà')
    expect(rows[1]).toHaveTextContent('Thất bại (terminal)')
    expect(rows[1]).toHaveTextContent('TERMINAL_CONFLICT')
    expect(rows[2]).toHaveTextContent('Đã xác nhận')
    expect(rows[2]).toHaveTextContent('Đã xác minh')
  })

  it('shows the Fabric block only for live evidence, never for simulation', async () => {
    api.listAuditEvents.mockResolvedValue(
      buildEventsPage([
        buildEventSummary({
          id: '66f0000000000000000000a1',
          blockNumber: 10492,
        }),
        buildEventSummary({
          id: '66f0000000000000000000a2',
          networkMode: 'simulation',
          verificationState: 'unavailable',
          blockNumber: 999,
          explorerUrl: null,
        }),
      ])
    )
    renderPanel()
    const table = await screen.findByRole('table')
    const rows = within(table).getAllByRole('row').slice(1)
    expect(rows[0]).toHaveTextContent('#10492')
    expect(rows[1]).toHaveTextContent('Mô phỏng')
    expect(rows[1]).not.toHaveTextContent('#999')
  })

  it('copies the transaction id', async () => {
    const user = userEvent.setup()
    const writeText = vi.spyOn(navigator.clipboard, 'writeText')
    api.listAuditEvents.mockResolvedValue(buildEventsPage())
    renderPanel()
    await user.click(
      await screen.findByRole('button', { name: 'Sao chép mã giao dịch' })
    )
    expect(writeText).toHaveBeenCalledWith(
      'tx-0123456789abcdef0123456789abcdef'
    )
    expect(await screen.findByText('Đã sao chép')).toBeInTheDocument()
  })

  it('opens the event detail from a row', async () => {
    const user = userEvent.setup()
    api.listAuditEvents.mockResolvedValue(buildEventsPage())
    const { onSelectEvent } = renderPanel()
    await user.click(
      await screen.findByRole('button', { name: 'Xem chi tiết sự kiện' })
    )
    expect(onSelectEvent).toHaveBeenCalledWith('66f0000000000000000000a1')
  })
})

describe('AuditEventsPanel pagination', () => {
  it('shows the page position and moves between pages', async () => {
    const user = userEvent.setup()
    api.listAuditEvents.mockResolvedValue(
      buildEventsPage([buildEventSummary()], {
        total: 45,
        page: 2,
        totalPages: 3,
      })
    )
    const filters = { ...DEFAULT_AUDIT_FILTERS, page: 2 }
    const { onFiltersChange } = renderPanel({ filters })

    expect(
      await screen.findByText('Trang 2 / 3 · 45 sự kiện')
    ).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Trang sau' }))
    expect(onFiltersChange).toHaveBeenLastCalledWith({ ...filters, page: 3 })
    await user.click(screen.getByRole('button', { name: 'Trang trước' }))
    expect(onFiltersChange).toHaveBeenLastCalledWith({ ...filters, page: 1 })
  })

  it('disables navigation at the first and last page', async () => {
    api.listAuditEvents.mockResolvedValue(
      buildEventsPage([buildEventSummary()], {
        total: 1,
        page: 1,
        totalPages: 1,
      })
    )
    renderPanel()
    await screen.findByRole('table')
    expect(screen.getByRole('button', { name: 'Trang trước' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Trang sau' })).toBeDisabled()
  })
})

describe('AuditEventsPanel filters', () => {
  it('applies the draft filters, resets to page 1 and trims text', async () => {
    const user = userEvent.setup()
    api.listAuditEvents.mockResolvedValue(buildEventsPage())
    const { onFiltersChange } = renderPanel({
      filters: { ...DEFAULT_AUDIT_FILTERS, page: 4 },
    })
    await screen.findByRole('table')

    await user.type(screen.getByLabelText('Mã hợp đồng'), ' contract-9 ')
    await chooseOption(
      user,
      screen.getByLabelText('Loại sự kiện'),
      ledgerEventLabel('handover.completed')
    )
    await chooseOption(
      user,
      screen.getByLabelText('Trạng thái chuyển'),
      deliveryStateView('failed').label
    )
    await chooseOption(
      user,
      screen.getByLabelText('Xác minh'),
      verificationStateView('mismatch').label
    )
    await pickDate(user, screen.getByLabelText('Từ ngày'), '2026-09-01')
    await pickDate(user, screen.getByLabelText('Đến ngày'), '2026-09-30')
    await user.type(screen.getByLabelText('Mã giao dịch (TxID)'), 'tx-9')
    await user.click(screen.getByRole('button', { name: 'Áp dụng bộ lọc' }))

    expect(onFiltersChange).toHaveBeenCalledWith({
      contractId: 'contract-9',
      eventType: 'handover.completed',
      state: 'failed',
      verificationState: 'mismatch',
      from: '2026-09-01',
      to: '2026-09-30',
      txId: 'tx-9',
      page: 1,
      limit: 20,
    })
  })

  it('blocks an inverted date range with an inline message', async () => {
    const user = userEvent.setup()
    api.listAuditEvents.mockResolvedValue(buildEventsPage())
    const { onFiltersChange } = renderPanel()
    await screen.findByRole('table')
    await pickDate(user, screen.getByLabelText('Từ ngày'), '2026-09-30')
    await pickDate(user, screen.getByLabelText('Đến ngày'), '2026-09-01')
    await user.click(screen.getByRole('button', { name: 'Áp dụng bộ lọc' }))
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Ngày bắt đầu phải trước'
    )
    expect(onFiltersChange).not.toHaveBeenCalled()
  })

  it('reflects the active filters in the form and clears them', async () => {
    const user = userEvent.setup()
    api.listAuditEvents.mockResolvedValue(buildEventsPage())
    const { onFiltersChange } = renderPanel({
      filters: { ...DEFAULT_AUDIT_FILTERS, state: 'failed', contractId: 'c-1' },
    })
    await screen.findByRole('table')
    expect(screen.getByLabelText('Trạng thái chuyển')).toHaveTextContent(
      deliveryStateView('failed').label
    )
    expect(screen.getByLabelText('Mã hợp đồng')).toHaveValue('c-1')

    await user.click(screen.getByRole('button', { name: 'Xóa bộ lọc' }))
    expect(onFiltersChange).toHaveBeenCalledWith(DEFAULT_AUDIT_FILTERS)
    await waitFor(() =>
      expect(screen.getByLabelText('Mã hợp đồng')).toHaveValue('')
    )
  })
})
