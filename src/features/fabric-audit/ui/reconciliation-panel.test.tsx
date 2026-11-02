import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ApiClientError } from '@/shared/api'
import {
  resolveFabricAuditCapability,
  type FabricAuditCapability,
} from '../model/capabilities'
import {
  buildFinding,
  buildFindingsPage,
  buildRun,
  buildRunsPage,
} from '../test-fixtures/fabric-audit.fixtures'
import { chooseOption, pickDate } from '@/shared/lib/test/ui-pickers'
import { findingCategoryLabel } from '../model/labels'
import { renderWithQuery } from '../test-fixtures/render-with-query'
import { ReconciliationPanel } from './reconciliation-panel'

const api = vi.hoisted(() => ({
  listReconciliationRuns: vi.fn(),
  getReconciliationRun: vi.fn(),
  listReconciliationFindings: vi.fn(),
  startReconciliationRun: vi.fn(),
  resumeReconciliationRun: vi.fn(),
  cancelReconciliationRun: vi.fn(),
  repairReconciliationFinding: vi.fn(),
}))
vi.mock('../api/fabric-audit-api', () => api)

const ADMIN = resolveFabricAuditCapability(['admin'])
const STAFF = resolveFabricAuditCapability(['staff'])
const RUN_ID = '66f000000000000000000001'

function renderPanel(capability: FabricAuditCapability) {
  return renderWithQuery(<ReconciliationPanel capability={capability} />)
}

function domainError(code: string, status: number): ApiClientError {
  return new ApiClientError('raw', status, {
    code: `HTTP_${status}`,
    message: 'raw',
    details: { code },
  })
}

beforeEach(() => {
  vi.clearAllMocks()
  api.listReconciliationRuns.mockResolvedValue(buildRunsPage())
  api.getReconciliationRun.mockResolvedValue(buildRun())
  api.listReconciliationFindings.mockResolvedValue(buildFindingsPage())
})

describe('ReconciliationPanel run list', () => {
  it('shows a loading status, then the runs with status and counters', async () => {
    api.listReconciliationRuns.mockReturnValue(new Promise(() => undefined))
    const { unmount } = renderPanel(STAFF)
    expect(
      screen.getByRole('status', { name: 'Đang tải các lần đối soát' })
    ).toBeInTheDocument()
    unmount()

    api.listReconciliationRuns.mockResolvedValue(buildRunsPage())
    renderPanel(STAFF)
    const table = await screen.findByRole('table', { name: 'Các lần đối soát' })
    const row = within(table).getAllByRole('row')[1]
    expect(row).toHaveTextContent('Hoàn tất, có phát hiện')
    expect(row).toHaveTextContent('50')
    expect(row).toHaveTextContent('2')
  })

  it('shows an error with retry and an explicit empty state', async () => {
    const user = userEvent.setup()
    api.listReconciliationRuns.mockRejectedValueOnce(new Error('boom'))
    renderPanel(STAFF)
    expect(await screen.findByRole('alert')).toHaveTextContent('Không thể')
    api.listReconciliationRuns.mockResolvedValue(buildRunsPage([]))
    await user.click(screen.getByRole('button', { name: 'Thử lại' }))
    expect(
      await screen.findByText('Chưa có lần đối soát nào.')
    ).toBeInTheDocument()
  })
})

describe('ReconciliationPanel audit-only mode (staff)', () => {
  it('hides every operator action and says the view is read-only', async () => {
    api.listReconciliationRuns.mockResolvedValue(
      buildRunsPage([
        buildRun({ id: 'r-running', status: 'running' }),
        buildRun({ id: 'r-failed', status: 'failed' }),
      ])
    )
    renderPanel(STAFF)
    await screen.findByRole('table', { name: 'Các lần đối soát' })
    expect(screen.getByText(/Chế độ chỉ xem/)).toBeInTheDocument()
    expect(
      screen.queryByRole('form', { name: 'Bắt đầu đối soát' })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /Bắt đầu đối soát/ })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /Tiếp tục/ })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /Hủy/ })
    ).not.toBeInTheDocument()
  })

  it('still shows findings and evidence but no repair action', async () => {
    const user = userEvent.setup()
    renderPanel(STAFF)
    await user.click(
      await screen.findByRole('button', { name: 'Xem chi tiết lần đối soát' })
    )
    const findings = await screen.findByRole('table', {
      name: 'Phát hiện đối soát',
    })
    expect(
      within(findings).getByText('Lỗi chuyển không thể thử lại')
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /Sửa phát hiện/ })
    ).not.toBeInTheDocument()
  })
})

describe('ReconciliationPanel start run (admin)', () => {
  it('rejects an unbounded request locally without calling the API', async () => {
    const user = userEvent.setup()
    renderPanel(ADMIN)
    await screen.findByRole('table', { name: 'Các lần đối soát' })
    await user.click(screen.getByRole('button', { name: 'Bắt đầu đối soát' }))
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Cần nhập đủ khoảng thời gian'
    )
    expect(api.startReconciliationRun).not.toHaveBeenCalled()
  })

  it('rejects a range longer than 92 days', async () => {
    const user = userEvent.setup()
    renderPanel(ADMIN)
    await screen.findByRole('table', { name: 'Các lần đối soát' })
    await pickDate(user, screen.getByLabelText('Từ ngày'), '2026-01-01')
    await pickDate(user, screen.getByLabelText('Đến ngày'), '2026-06-01')
    await user.click(screen.getByRole('button', { name: 'Bắt đầu đối soát' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('tối đa 92 ngày')
    expect(api.startReconciliationRun).not.toHaveBeenCalled()
  })

  it('starts a bounded run, sends event types and refreshes the run list', async () => {
    const user = userEvent.setup()
    api.startReconciliationRun.mockResolvedValue(buildRun({ status: 'queued' }))
    renderPanel(ADMIN)
    await screen.findByRole('table', { name: 'Các lần đối soát' })
    expect(api.listReconciliationRuns).toHaveBeenCalledTimes(1)

    await pickDate(user, screen.getByLabelText('Từ ngày'), '2026-09-01')
    await pickDate(user, screen.getByLabelText('Đến ngày'), '2026-09-30')
    await user.click(
      screen.getByRole('checkbox', { name: 'Bàn giao nhận nhà' })
    )
    await user.click(screen.getByRole('button', { name: 'Bắt đầu đối soát' }))

    await waitFor(() =>
      expect(api.startReconciliationRun).toHaveBeenCalledWith({
        from: '2026-09-01T00:00:00.000Z',
        to: '2026-09-30T23:59:59.999Z',
        eventTypes: ['handover.completed'],
      })
    )
    await waitFor(() =>
      expect(api.listReconciliationRuns.mock.calls.length).toBeGreaterThan(1)
    )
    expect(
      await screen.findByText('Đã bắt đầu lần đối soát mới.')
    ).toBeInTheDocument()
  })

  it('starts a contract-scoped run from pasted identifiers', async () => {
    const user = userEvent.setup()
    api.startReconciliationRun.mockResolvedValue(buildRun({ status: 'queued' }))
    renderPanel(ADMIN)
    await screen.findByRole('table', { name: 'Các lần đối soát' })
    await user.type(
      screen.getByLabelText('Mã hợp đồng (ObjectId)'),
      '66f000000000000000000001, 66f000000000000000000002'
    )
    await user.click(screen.getByRole('button', { name: 'Bắt đầu đối soát' }))
    await waitFor(() =>
      expect(api.startReconciliationRun).toHaveBeenCalledWith({
        contractIds: ['66f000000000000000000001', '66f000000000000000000002'],
      })
    )
  })

  it('maps a stable server error (scope locked) to a readable message', async () => {
    const user = userEvent.setup()
    api.startReconciliationRun.mockRejectedValue(
      domainError('RECONCILIATION_SCOPE_LOCKED', 409)
    )
    renderPanel(ADMIN)
    await screen.findByRole('table', { name: 'Các lần đối soát' })
    await pickDate(user, screen.getByLabelText('Từ ngày'), '2026-09-01')
    await pickDate(user, screen.getByLabelText('Đến ngày'), '2026-09-30')
    await user.click(screen.getByRole('button', { name: 'Bắt đầu đối soát' }))
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Đã có một lần đối soát đang chạy'
    )
  })

  it('shows the API 403 for a user whose token no longer has operator rights', async () => {
    const user = userEvent.setup()
    api.startReconciliationRun.mockRejectedValue(
      new ApiClientError('Forbidden', 403, {
        code: 'HTTP_403',
        message: 'Forbidden',
      })
    )
    renderPanel(ADMIN)
    await screen.findByRole('table', { name: 'Các lần đối soát' })
    await pickDate(user, screen.getByLabelText('Từ ngày'), '2026-09-01')
    await pickDate(user, screen.getByLabelText('Đến ngày'), '2026-09-30')
    await user.click(screen.getByRole('button', { name: 'Bắt đầu đối soát' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('không có quyền')
  })
})

describe('ReconciliationPanel resume and cancel (admin)', () => {
  it('offers resume only for resumable runs and refreshes after it', async () => {
    const user = userEvent.setup()
    api.listReconciliationRuns.mockResolvedValue(
      buildRunsPage([
        buildRun({
          id: 'r-failed',
          status: 'failed',
          lastErrorCode: 'RECONCILIATION_RUN_FAILED',
        }),
        buildRun({ id: 'r-done', status: 'completed' }),
      ])
    )
    api.resumeReconciliationRun.mockResolvedValue(
      buildRun({ id: 'r-failed', status: 'running' })
    )
    renderPanel(ADMIN)
    await screen.findByRole('table', { name: 'Các lần đối soát' })

    const resumeButtons = screen.getAllByRole('button', {
      name: 'Tiếp tục lần đối soát',
    })
    expect(resumeButtons).toHaveLength(1)
    await user.click(resumeButtons[0] as HTMLElement)

    await waitFor(() =>
      expect(api.resumeReconciliationRun).toHaveBeenCalledWith('r-failed')
    )
    await waitFor(() =>
      expect(api.listReconciliationRuns.mock.calls.length).toBeGreaterThan(1)
    )
  })

  it('offers cancel only for queued or running runs', async () => {
    const user = userEvent.setup()
    api.listReconciliationRuns.mockResolvedValue(
      buildRunsPage([
        buildRun({ id: 'r-running', status: 'running' }),
        buildRun({ id: 'r-done', status: 'completed' }),
      ])
    )
    api.cancelReconciliationRun.mockResolvedValue(
      buildRun({ id: 'r-running', status: 'cancelled' })
    )
    renderPanel(ADMIN)
    await screen.findByRole('table', { name: 'Các lần đối soát' })

    const cancelButtons = screen.getAllByRole('button', {
      name: 'Hủy lần đối soát',
    })
    expect(cancelButtons).toHaveLength(1)
    await user.click(cancelButtons[0] as HTMLElement)
    await waitFor(() =>
      expect(api.cancelReconciliationRun).toHaveBeenCalledWith('r-running')
    )
  })

  it('shows a stable not-resumable error inline', async () => {
    const user = userEvent.setup()
    api.listReconciliationRuns.mockResolvedValue(
      buildRunsPage([buildRun({ id: 'r-failed', status: 'failed' })])
    )
    api.resumeReconciliationRun.mockRejectedValue(
      domainError('RECONCILIATION_RUN_NOT_RESUMABLE', 409)
    )
    renderPanel(ADMIN)
    await user.click(
      await screen.findByRole('button', { name: 'Tiếp tục lần đối soát' })
    )
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'không thể tiếp tục'
    )
  })
})

describe('ReconciliationPanel run detail and findings', () => {
  async function openDetail(): Promise<void> {
    const user = userEvent.setup()
    await user.click(
      await screen.findByRole('button', { name: 'Xem chi tiết lần đối soát' })
    )
    await screen.findByRole('table', { name: 'Phát hiện đối soát' })
  }

  it('loads the run and its findings with category and status', async () => {
    api.getReconciliationRun.mockResolvedValue(
      buildRun({
        status: 'completed-with-findings',
        lastErrorCode: 'ORPHAN_SCAN_BUDGET_EXHAUSTED',
        checkpointPhase: 'contract.activated',
      })
    )
    renderPanel(STAFF)
    await openDetail()

    expect(api.getReconciliationRun).toHaveBeenCalledWith(RUN_ID)
    expect(api.listReconciliationFindings).toHaveBeenCalledWith(
      RUN_ID,
      expect.objectContaining({ page: 1, limit: 20 })
    )
    expect(screen.getByTestId('run-error')).toHaveTextContent(
      'ngân sách quét mồ côi'
    )
    const findings = screen.getByRole('table', { name: 'Phát hiện đối soát' })
    expect(within(findings).getByText('Đang mở')).toBeInTheDocument()
  })

  it('filters findings by category on the server', async () => {
    const user = userEvent.setup()
    renderPanel(STAFF)
    await openDetail()
    await chooseOption(
      user,
      screen.getByLabelText('Nhóm phát hiện'),
      findingCategoryLabel('hash_schema_mismatch')
    )
    await waitFor(() =>
      expect(api.listReconciliationFindings).toHaveBeenLastCalledWith(
        RUN_ID,
        expect.objectContaining({ category: 'hash_schema_mismatch' })
      )
    )
  })

  it('shows an empty findings state', async () => {
    api.listReconciliationFindings.mockResolvedValue(buildFindingsPage([]))
    renderPanel(STAFF)
    await userEvent
      .setup()
      .click(
        await screen.findByRole('button', { name: 'Xem chi tiết lần đối soát' })
      )
    expect(
      await screen.findByText('Không có phát hiện nào.')
    ).toBeInTheDocument()
  })

  it('shows an error state for findings with retry', async () => {
    const user = userEvent.setup()
    api.listReconciliationFindings.mockRejectedValueOnce(new Error('boom'))
    renderPanel(STAFF)
    await user.click(
      await screen.findByRole('button', { name: 'Xem chi tiết lần đối soát' })
    )
    const alert = await screen.findByTestId('findings-error')
    api.listReconciliationFindings.mockResolvedValue(buildFindingsPage())
    await user.click(within(alert).getByRole('button', { name: 'Thử lại' }))
    expect(
      await screen.findByRole('table', { name: 'Phát hiện đối soát' })
    ).toBeInTheDocument()
  })

  it('explains non-repairable hash mismatches and offers no repair', async () => {
    api.listReconciliationFindings.mockResolvedValue(
      buildFindingsPage([
        buildFinding({
          category: 'hash_schema_mismatch',
          repairable: false,
          observedHash: 'f'.repeat(64),
        }),
      ])
    )
    renderPanel(ADMIN)
    await openDetail()
    expect(screen.getByText(/Chỉ điều tra/)).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /Sửa phát hiện/ })
    ).not.toBeInTheDocument()
  })

  it('shows the recovery outbox link and repair audit for a repair-pending finding', async () => {
    api.listReconciliationFindings.mockResolvedValue(
      buildFindingsPage([
        buildFinding({
          status: 'repair-pending',
          repairable: false,
          recoveryOutboxId: 'outbox-77',
          repair: {
            actorId: 'admin-1',
            reason: 'Retry after dependency recovered',
            requestedAt: '2026-10-02T01:00:00.000Z',
          },
        }),
      ])
    )
    renderPanel(ADMIN)
    await openDetail()
    const table = screen.getByRole('table', { name: 'Phát hiện đối soát' })
    expect(within(table).getByText('Đang sửa')).toBeInTheDocument()
    expect(screen.getByText(/outbox-77/)).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /Sửa phát hiện/ })
    ).not.toBeInTheDocument()
  })
})

describe('ReconciliationPanel repair confirmation (admin)', () => {
  async function openRepairDialog() {
    const user = userEvent.setup()
    await user.click(
      await screen.findByRole('button', { name: 'Xem chi tiết lần đối soát' })
    )
    await user.click(
      await screen.findByRole('button', { name: 'Sửa phát hiện' })
    )
    return {
      user,
      dialog: await screen.findByRole('dialog', {
        name: 'Xác nhận sửa phát hiện',
      }),
    }
  }

  it('requires a reason of at least 5 characters before calling the API', async () => {
    renderPanel(ADMIN)
    const { user, dialog } = await openRepairDialog()
    await user.type(within(dialog).getByLabelText('Lý do'), '  ab ')
    await user.click(
      within(dialog).getByRole('button', { name: 'Xác nhận sửa' })
    )
    expect(within(dialog).getByRole('alert')).toHaveTextContent('5')
    expect(api.repairReconciliationFinding).not.toHaveBeenCalled()
  })

  it('submits the trimmed reason, then refreshes findings and runs', async () => {
    api.repairReconciliationFinding.mockResolvedValue({
      finding: buildFinding({ status: 'repair-pending' }),
      outboxId: 'outbox-1',
      alreadyRepaired: false,
    })
    renderPanel(ADMIN)
    const { user, dialog } = await openRepairDialog()
    const findingsCallsBefore = api.listReconciliationFindings.mock.calls.length
    const runsCallsBefore = api.listReconciliationRuns.mock.calls.length

    await user.type(
      within(dialog).getByLabelText('Lý do'),
      '  Retry after the dependency recovered  '
    )
    await user.click(
      within(dialog).getByRole('button', { name: 'Xác nhận sửa' })
    )

    await waitFor(() =>
      expect(api.repairReconciliationFinding).toHaveBeenCalledWith(
        '66f000000000000000000f01',
        'Retry after the dependency recovered'
      )
    )
    await waitFor(() =>
      expect(api.listReconciliationFindings.mock.calls.length).toBeGreaterThan(
        findingsCallsBefore
      )
    )
    expect(api.listReconciliationRuns.mock.calls.length).toBeGreaterThan(
      runsCallsBefore
    )
    expect(await screen.findByText(/Đã tạo tác vụ sửa/)).toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('reports that a finding was already repaired (idempotent)', async () => {
    api.repairReconciliationFinding.mockResolvedValue({
      finding: buildFinding({ status: 'repair-pending' }),
      outboxId: 'outbox-1',
      alreadyRepaired: true,
    })
    renderPanel(ADMIN)
    const { user, dialog } = await openRepairDialog()
    await user.type(
      within(dialog).getByLabelText('Lý do'),
      'Retry again to be safe'
    )
    await user.click(
      within(dialog).getByRole('button', { name: 'Xác nhận sửa' })
    )
    expect(await screen.findByText(/đã được sửa trước đó/)).toBeInTheDocument()
  })

  it('keeps the dialog open and maps a stale-precondition error', async () => {
    api.repairReconciliationFinding.mockRejectedValue(
      domainError('LEDGER_FINDING_PRECONDITION_STALE', 409)
    )
    renderPanel(ADMIN)
    const { user, dialog } = await openRepairDialog()
    await user.type(
      within(dialog).getByLabelText('Lý do'),
      'Retry after recovery'
    )
    await user.click(
      within(dialog).getByRole('button', { name: 'Xác nhận sửa' })
    )
    expect(await within(dialog).findByRole('alert')).toHaveTextContent(
      'Điều kiện nghiệp vụ đã thay đổi'
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('cancels without calling the API', async () => {
    renderPanel(ADMIN)
    const { user, dialog } = await openRepairDialog()
    await user.click(within(dialog).getByRole('button', { name: 'Hủy' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(api.repairReconciliationFinding).not.toHaveBeenCalled()
  })
})
