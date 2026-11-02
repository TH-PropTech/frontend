import * as React from 'react'
import { Activity, Blocks, Boxes, KeyRound, ShieldCheck } from 'lucide-react'
import { ledgerEventLabel } from '@/shared/lib/ledger-event-labels'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'
import {
  explorerReasonLabel,
  identityRoleLabel,
  runStatusView,
  runtimeStateView,
  type StateView,
} from '../model/labels'
import { formatAge, formatDateTime, truncateMiddle } from '../model/format'
import { runStatusSchema, type AuditOverview } from '../model/schemas'
import { PanelEmpty } from './panel-states'
import { StateBadge } from './state-badge'

const CONNECTION_LABELS: Record<
  AuditOverview['runtime']['connectionState'],
  string
> = {
  connected: 'Đã kết nối',
  disabled: 'Đã tắt',
  unavailable: 'Không khả dụng',
}

const WORKER_VIEWS: Record<AuditOverview['worker']['state'], StateView> = {
  ready: { label: 'Sẵn sàng', tone: 'success' },
  degraded: { label: 'Suy giảm', tone: 'warning' },
}

const EXPLORER_VIEWS: Record<AuditOverview['explorer']['state'], StateView> = {
  ready: { label: 'Sẵn sàng', tone: 'success' },
  degraded: { label: 'Suy giảm', tone: 'warning' },
  disabled: { label: 'Đã tắt', tone: 'neutral' },
}

function SectionCard({
  title,
  icon,
  children,
  label,
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  label?: string
}): React.ReactElement {
  return (
    <Card
      className="border-border bg-surface"
      role="region"
      aria-label={label ?? title}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm text-fg">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">{children}</CardContent>
    </Card>
  )
}

function Row({
  label,
  children,
  testId,
}: {
  label: string
  children: React.ReactNode
  testId?: string
}): React.ReactElement {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs font-semibold text-muted">{label}</span>
      <span data-testid={testId} className="text-right font-medium text-fg">
        {children}
      </span>
    </div>
  )
}

export function RuntimeCard({
  overview,
}: {
  overview: AuditOverview
}): React.ReactElement {
  const { runtime } = overview
  return (
    <SectionCard
      title="Trạng thái ghi lưu vết"
      icon={<ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />}
    >
      <StateBadge view={runtimeStateView(runtime.state)} />
      {runtime.state === 'simulation' ? (
        <p className="text-xs text-warning">
          Dữ liệu mô phỏng — không phải bằng chứng thật trên sổ cái.
        </p>
      ) : null}
      <Row label="Kết nối">{CONNECTION_LABELS[runtime.connectionState]}</Row>
      {runtime.errorCodes.length > 0 ? (
        <ul className="flex flex-wrap gap-1.5" aria-label="Mã cảnh báo">
          {runtime.errorCodes.map(code => (
            <li
              key={code}
              className="rounded bg-surface-muted px-1.5 py-0.5 font-mono text-[11px] text-muted"
            >
              {code}
            </li>
          ))}
        </ul>
      ) : null}
    </SectionCard>
  )
}

export function LedgerCard({
  overview,
}: {
  overview: AuditOverview
}): React.ReactElement {
  const { ledger, runtime } = overview
  const simulated = runtime.mode === 'simulation'
  return (
    <SectionCard
      title="Sổ cái"
      icon={<Blocks className="h-4 w-4 text-primary" aria-hidden="true" />}
    >
      <Row label="Số khối trên sổ cái" testId="ledger-height">
        {simulated
          ? 'Không có khối thật trong chế độ mô phỏng'
          : ledger.height === null
            ? 'Không khả dụng'
            : `#${ledger.height}`}
      </Row>
      {!simulated && ledger.currentBlockHash ? (
        <Row label="Mã băm khối hiện tại">
          <span
            data-testid="ledger-block-hash"
            title={ledger.currentBlockHash}
            className="font-mono text-xs"
          >
            {truncateMiddle(ledger.currentBlockHash)}
          </span>
        </Row>
      ) : null}
      {!simulated && ledger.observedAt ? (
        <Row label="Quan sát lúc" testId="ledger-observed-at">
          {formatDateTime(ledger.observedAt)}
        </Row>
      ) : null}
    </SectionCard>
  )
}

export function ServicesCard({
  overview,
}: {
  overview: AuditOverview
}): React.ReactElement {
  const { worker, explorer } = overview
  const reason = explorerReasonLabel(explorer.reason)
  return (
    <SectionCard
      title="Dịch vụ ghi sổ"
      icon={<Activity className="h-4 w-4 text-primary" aria-hidden="true" />}
    >
      <Row label="Tiến trình ghi sổ" testId="worker-state">
        <StateBadge view={WORKER_VIEWS[worker.state]} />
      </Row>
      {explorer.state === 'disabled' ? null : (
        <Row label="Explorer" testId="explorer-state">
          {explorer.available ? (
            <StateBadge view={EXPLORER_VIEWS[explorer.state]} />
          ) : (
            (reason ?? <StateBadge view={EXPLORER_VIEWS[explorer.state]} />)
          )}
        </Row>
      )}
    </SectionCard>
  )
}

const OUTBOX_COUNTS = [
  { key: 'pending', label: 'Đang chờ' },
  { key: 'processing', label: 'Đang xử lý' },
  { key: 'retryable', label: 'Chờ thử lại' },
  { key: 'succeeded', label: 'Thành công' },
  { key: 'terminalFailure', label: 'Thất bại hẳn' },
] as const

const OUTBOX_TEST_IDS = {
  pending: 'outbox-pending',
  processing: 'outbox-processing',
  retryable: 'outbox-retryable',
  succeeded: 'outbox-succeeded',
  terminalFailure: 'outbox-terminal',
} as const

export function OutboxCard({
  overview,
  onShowFailedEvents,
}: {
  overview: AuditOverview
  onShowFailedEvents?: (() => void) | undefined
}): React.ReactElement {
  const { outbox } = overview
  const pendingAge = formatAge(outbox.oldestPendingAgeSeconds)
  const failureAge = formatAge(outbox.oldestTerminalFailureAgeSeconds)
  return (
    <SectionCard
      title="Hàng đợi ghi sổ cái"
      icon={<Boxes className="h-4 w-4 text-primary" aria-hidden="true" />}
    >
      <dl className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {OUTBOX_COUNTS.map(({ key, label }) => (
          <div
            key={key}
            className="rounded-lg border border-border bg-surface-muted p-2"
          >
            <dt className="text-[11px] font-semibold text-muted">{label}</dt>
            <dd
              data-testid={OUTBOX_TEST_IDS[key]}
              className={
                key === 'terminalFailure' && outbox[key] > 0
                  ? 'text-lg font-bold text-danger'
                  : 'text-lg font-bold text-fg'
              }
            >
              {outbox[key]}
            </dd>
          </div>
        ))}
      </dl>
      {pendingAge ? (
        <p className="text-xs text-muted">
          Mục chờ lâu nhất:{' '}
          <span data-testid="outbox-pending-age">{pendingAge}</span>
        </p>
      ) : null}
      {outbox.terminalFailure > 0 ? (
        <div className="flex flex-wrap items-center justify-between gap-2">
          {failureAge ? (
            <p className="text-xs text-danger">
              Lỗi cũ nhất:{' '}
              <span data-testid="outbox-terminal-age">{failureAge}</span>
            </p>
          ) : null}
          {onShowFailedEvents ? (
            <Button size="sm" variant="outline" onClick={onShowFailedEvents}>
              Xem sự kiện thất bại
            </Button>
          ) : null}
        </div>
      ) : null}
    </SectionCard>
  )
}

export function IdentityCard({
  overview,
}: {
  overview: AuditOverview
}): React.ReactElement {
  const { identityWarnings } = overview
  return (
    <SectionCard
      title="Chứng chỉ ghi sổ"
      icon={<KeyRound className="h-4 w-4 text-primary" aria-hidden="true" />}
    >
      {identityWarnings.length === 0 ? (
        <p className="text-xs text-muted">
          Không có cảnh báo hết hạn chứng chỉ.
        </p>
      ) : (
        <ul className="space-y-2">
          {identityWarnings.map(warning => (
            <li
              key={warning.role}
              data-testid="identity-warning"
              className="flex items-center justify-between gap-2 text-xs"
            >
              <span className="font-semibold text-fg">
                {identityRoleLabel(warning.role)}
              </span>
              <span
                className={
                  warning.state === 'expired' ? 'text-danger' : 'text-warning'
                }
              >
                {warning.state === 'expired' ? 'đã hết hạn' : 'sắp hết hạn'}
                {warning.expiresAt
                  ? ` · ${formatDateTime(warning.expiresAt)}`
                  : ''}
              </span>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  )
}

export function CoverageTable({
  overview,
}: {
  overview: AuditOverview
}): React.ReactElement {
  if (overview.coverage.length === 0) {
    return (
      <PanelEmpty>Chưa có sự kiện bằng chứng nào được ghi nhận.</PanelEmpty>
    )
  }
  return (
    <Card className="border-border bg-surface">
      <Table aria-label="Độ phủ bằng chứng">
        <TableHeader>
          <TableRow>
            <TableHead>Loại sự kiện</TableHead>
            <TableHead className="text-right">Tổng</TableHead>
            <TableHead className="text-right">Đang chờ</TableHead>
            <TableHead className="text-right">Đã xác nhận</TableHead>
            <TableHead className="text-right">Thất bại</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {overview.coverage.map(row => (
            <TableRow key={row.eventType}>
              <TableCell className="font-medium text-fg">
                {ledgerEventLabel(row.eventType)}
              </TableCell>
              <TableCell className="text-right">{row.total}</TableCell>
              <TableCell className="text-right">{row.pending}</TableCell>
              <TableCell className="text-right">{row.confirmed}</TableCell>
              <TableCell
                className={
                  row.failed > 0
                    ? 'text-right font-semibold text-danger'
                    : 'text-right'
                }
              >
                {row.failed}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}

export function ReconciliationSummary({
  overview,
  onOpenReconciliation,
}: {
  overview: AuditOverview
  onOpenReconciliation?: (() => void) | undefined
}): React.ReactElement {
  const { latestRun, openFindings } = overview.reconciliation
  const status = latestRun ? runStatusSchema.safeParse(latestRun.status) : null
  return (
    <SectionCard
      title="Đối soát gần nhất"
      icon={<ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />}
    >
      {latestRun ? (
        <>
          <Row label="Trạng thái">
            {status?.success ? (
              <StateBadge view={runStatusView(status.data)} />
            ) : (
              latestRun.status
            )}
          </Row>
          <Row label="Đã kiểm tra">{latestRun.counters.examined}</Row>
          <Row label="Phát hiện / không thể xác minh">
            {latestRun.counters.findings} / {latestRun.counters.unverifiable}
          </Row>
        </>
      ) : (
        <p className="text-xs text-muted">Chưa có lần đối soát nào.</p>
      )}
      <Row label="Phát hiện đang mở" testId="reconciliation-open-findings">
        {openFindings}
      </Row>
      {onOpenReconciliation ? (
        <Button size="sm" variant="outline" onClick={onOpenReconciliation}>
          Mở đối soát
        </Button>
      ) : null}
    </SectionCard>
  )
}
