import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ApiClientError } from '@/shared/api'
import { buildOverview } from '../test-fixtures/fabric-audit.fixtures'
import { renderWithQuery } from '../test-fixtures/render-with-query'
import { AuditOverviewPanel } from './audit-overview-panel'

const api = vi.hoisted(() => ({ getAuditOverview: vi.fn() }))
vi.mock('../api/fabric-audit-api', () => api)

function overviewWith(overrides: Record<string, unknown>) {
  api.getAuditOverview.mockResolvedValue(buildOverview(overrides))
}

beforeEach(() => vi.clearAllMocks())

describe('AuditOverviewPanel states', () => {
  it('shows a loading status while the overview loads', () => {
    api.getAuditOverview.mockReturnValue(new Promise(() => undefined))
    renderWithQuery(<AuditOverviewPanel />)
    expect(
      screen.getByRole('status', { name: 'Đang tải tổng quan Audit Center' })
    ).toBeInTheDocument()
  })

  it('shows an actionable error and retries', async () => {
    const user = userEvent.setup()
    api.getAuditOverview.mockRejectedValueOnce(
      new ApiClientError('Forbidden', 403, null)
    )
    renderWithQuery(<AuditOverviewPanel />)

    expect(await screen.findByRole('alert')).toHaveTextContent('quyền')

    overviewWith({})
    await user.click(screen.getByRole('button', { name: 'Thử lại' }))
    expect(
      await screen.findByText('Đang ghi lên sổ cái thật')
    ).toBeInTheDocument()
    expect(api.getAuditOverview).toHaveBeenCalledTimes(2)
  })

  it('shows an explicit empty state when no evidence has been recorded', async () => {
    overviewWith({ coverage: [] })
    renderWithQuery(<AuditOverviewPanel />)
    expect(
      await screen.findByText('Chưa có sự kiện bằng chứng nào được ghi nhận.')
    ).toBeInTheDocument()
  })
})

describe('AuditOverviewPanel runtime truthfulness', () => {
  it('labels live Fabric with the connection state and hides technical versions', async () => {
    overviewWith({})
    renderWithQuery(<AuditOverviewPanel />)
    expect(
      await screen.findByText('Đang ghi lên sổ cái thật')
    ).toBeInTheDocument()
    expect(screen.getByText('Đã kết nối')).toBeInTheDocument()
    expect(screen.queryByText(/ABI v2/)).not.toBeInTheDocument()
  })

  it('labels simulation and never presents a block as Fabric proof', async () => {
    overviewWith({
      runtime: {
        ...buildOverview().runtime,
        mode: 'simulation',
        state: 'simulation',
        connectionState: 'disabled',
      },
      // A misbehaving server must still not surface a "block" in simulation.
      ledger: {
        height: 77,
        currentBlockHash: 'd'.repeat(64),
        observedAt: null,
      },
    })
    renderWithQuery(<AuditOverviewPanel />)

    expect(await screen.findByText('Chế độ mô phỏng')).toBeInTheDocument()
    expect(
      screen.getByText(/không phải bằng chứng thật trên sổ cái/)
    ).toBeInTheDocument()
    expect(screen.queryByText('#77')).not.toBeInTheDocument()
    expect(screen.queryByText(/dddddddd/)).not.toBeInTheDocument()
    expect(screen.getByTestId('ledger-height')).toHaveTextContent(
      'Không có khối thật'
    )
  })

  it('distinguishes degraded from unavailable and disabled connection', async () => {
    overviewWith({
      runtime: {
        ...buildOverview().runtime,
        state: 'degraded',
        ready: false,
        errorCodes: ['FABRIC_IDENTITY_EXPIRING'],
      },
    })
    const { unmount } = renderWithQuery(<AuditOverviewPanel />)
    expect(await screen.findByText('Suy giảm')).toBeInTheDocument()
    expect(screen.getByText('FABRIC_IDENTITY_EXPIRING')).toBeInTheDocument()
    unmount()

    overviewWith({
      runtime: {
        ...buildOverview().runtime,
        state: 'unavailable',
        ready: false,
        connectionState: 'disabled',
      },
    })
    renderWithQuery(<AuditOverviewPanel />)
    expect(await screen.findByText('Không khả dụng')).toBeInTheDocument()
    expect(screen.getByText('Đã tắt')).toBeInTheDocument()
  })
})

describe('AuditOverviewPanel ledger', () => {
  it('shows ledger height, current block hash and observation time', async () => {
    overviewWith({})
    renderWithQuery(<AuditOverviewPanel />)
    expect(await screen.findByTestId('ledger-height')).toHaveTextContent(
      '#10492'
    )
    expect(screen.getByTestId('ledger-block-hash')).toHaveAttribute(
      'title',
      'c'.repeat(64)
    )
    expect(screen.getByTestId('ledger-observed-at')).toBeInTheDocument()
  })

  it('shows an unavailable height without changing the readiness label', async () => {
    overviewWith({
      ledger: { height: null, currentBlockHash: null, observedAt: null },
    })
    renderWithQuery(<AuditOverviewPanel />)
    expect(await screen.findByTestId('ledger-height')).toHaveTextContent(
      'Không khả dụng'
    )
    expect(screen.getByText('Đang ghi lên sổ cái thật')).toBeInTheDocument()
    expect(screen.queryByTestId('ledger-observed-at')).not.toBeInTheDocument()
  })
})

describe('AuditOverviewPanel identity expiry', () => {
  it('warns per identity role with the expiry time and no certificate content', async () => {
    overviewWith({
      identityWarnings: [
        {
          role: 'operator',
          state: 'expiring',
          expiresAt: '2026-10-20T00:00:00.000Z',
        },
        {
          role: 'writer',
          state: 'expired',
          expiresAt: '2026-09-01T00:00:00.000Z',
        },
      ],
    })
    renderWithQuery(<AuditOverviewPanel />)

    const warnings = await screen.findAllByTestId('identity-warning')
    expect(warnings).toHaveLength(2)
    expect(warnings[0]).toHaveTextContent('Vận hành')
    expect(warnings[0]).toHaveTextContent('sắp hết hạn')
    expect(warnings[1]).toHaveTextContent('Ghi sổ')
    expect(warnings[1]).toHaveTextContent('đã hết hạn')
    expect(document.body.textContent).not.toMatch(/BEGIN CERTIFICATE/)
  })

  it('states that there is no warning when every identity is healthy', async () => {
    overviewWith({ identityWarnings: [] })
    renderWithQuery(<AuditOverviewPanel />)
    expect(
      await screen.findByText('Không có cảnh báo hết hạn chứng chỉ.')
    ).toBeInTheDocument()
  })
})

describe('AuditOverviewPanel delivery and recovery', () => {
  it('shows outbox counts and the oldest terminal failure age', async () => {
    overviewWith({})
    renderWithQuery(<AuditOverviewPanel />)
    const outbox = await screen.findByRole('region', {
      name: 'Hàng đợi ghi sổ cái',
    })
    expect(within(outbox).getByTestId('outbox-pending')).toHaveTextContent('3')
    expect(within(outbox).getByTestId('outbox-processing')).toHaveTextContent(
      '1'
    )
    expect(within(outbox).getByTestId('outbox-retryable')).toHaveTextContent(
      '2'
    )
    expect(within(outbox).getByTestId('outbox-succeeded')).toHaveTextContent(
      '40'
    )
    expect(within(outbox).getByTestId('outbox-terminal')).toHaveTextContent('1')
    expect(within(outbox).getByTestId('outbox-terminal-age')).toHaveTextContent(
      '1 ngày'
    )
    expect(within(outbox).getByTestId('outbox-pending-age')).toHaveTextContent(
      '1 giờ'
    )
  })

  it('links terminal failures to the filtered event list', async () => {
    const user = userEvent.setup()
    const onShowFailedEvents = vi.fn()
    overviewWith({})
    renderWithQuery(
      <AuditOverviewPanel onShowFailedEvents={onShowFailedEvents} />
    )
    await user.click(
      await screen.findByRole('button', { name: 'Xem sự kiện thất bại' })
    )
    expect(onShowFailedEvents).toHaveBeenCalledTimes(1)
  })

  it('does not offer the failure link when nothing failed terminally', async () => {
    overviewWith({
      outbox: {
        ...buildOverview().outbox,
        terminalFailure: 0,
        oldestTerminalFailureAt: null,
        oldestTerminalFailureAgeSeconds: null,
      },
    })
    renderWithQuery(<AuditOverviewPanel onShowFailedEvents={vi.fn()} />)
    await screen.findByTestId('outbox-terminal')
    expect(
      screen.queryByRole('button', { name: 'Xem sự kiện thất bại' })
    ).not.toBeInTheDocument()
    expect(screen.queryByTestId('outbox-terminal-age')).not.toBeInTheDocument()
  })

  it('shows worker health, Explorer availability and the unavailable reason', async () => {
    overviewWith({
      worker: {
        state: 'degraded',
        oldestPendingAt: '2026-10-02T07:00:00.000Z',
      },
      explorer: {
        enabled: false,
        state: 'disabled',
        available: false,
        reason: 'EXPLORER_NOT_CONFIGURED',
      },
    })
    renderWithQuery(<AuditOverviewPanel />)
    expect(await screen.findByTestId('worker-state')).toHaveTextContent(
      'Suy giảm'
    )
    expect(screen.queryByTestId('explorer-state')).not.toBeInTheDocument()
  })

  it('shows the Explorer reason when it is enabled but unavailable', async () => {
    overviewWith({
      explorer: {
        enabled: true,
        state: 'degraded',
        available: false,
        reason: 'EXPLORER_DEGRADED',
      },
    })
    renderWithQuery(<AuditOverviewPanel />)
    expect(await screen.findByTestId('explorer-state')).toHaveTextContent(
      'Explorer đang suy giảm'
    )
  })

  it('shows coverage per event type with readable labels', async () => {
    overviewWith({})
    renderWithQuery(<AuditOverviewPanel />)
    const table = await screen.findByRole('table', {
      name: 'Độ phủ bằng chứng',
    })
    expect(within(table).getByText('Kích hoạt hợp đồng')).toBeInTheDocument()
    expect(within(table).getByText('Bàn giao nhận nhà')).toBeInTheDocument()
  })

  it('summarizes the latest reconciliation and opens the reconciliation view', async () => {
    const user = userEvent.setup()
    const onOpenReconciliation = vi.fn()
    overviewWith({})
    renderWithQuery(
      <AuditOverviewPanel onOpenReconciliation={onOpenReconciliation} />
    )
    expect(
      await screen.findByTestId('reconciliation-open-findings')
    ).toHaveTextContent('2')
    expect(screen.getByText('Hoàn tất, có phát hiện')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Mở đối soát' }))
    expect(onOpenReconciliation).toHaveBeenCalledTimes(1)
  })

  it('states when no reconciliation has ever run', async () => {
    overviewWith({ reconciliation: { latestRun: null, openFindings: 0 } })
    renderWithQuery(<AuditOverviewPanel />)
    await waitFor(() =>
      expect(screen.getByText('Chưa có lần đối soát nào.')).toBeInTheDocument()
    )
  })
})
