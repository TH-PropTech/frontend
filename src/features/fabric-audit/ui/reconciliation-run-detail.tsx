'use client'

import * as React from 'react'
import {
  useReconciliationFindings,
  useReconciliationRun,
} from '../api/fabric-audit-hooks'
import { formatDateTime } from '../model/format'
import {
  findingCategoryLabel,
  findingStatusView,
  runErrorLabel,
  runStatusView,
} from '../model/labels'
import {
  FINDING_CATEGORIES,
  FINDING_STATUSES,
  type FindingCategory,
  type FindingStatus,
  type ReconciliationFinding,
} from '../model/schemas'
import { PageNav } from './page-nav'
import { PanelEmpty, PanelError, PanelLoading } from './panel-states'
import { ReconciliationFindingsTable } from './reconciliation-findings-table'
import { StateBadge } from './state-badge'

const FINDINGS_PAGE_SIZE = 20
const SELECT_CLASS =
  'rounded-md border border-border bg-surface px-3 py-2 text-sm text-fg outline-none hover:border-border-strong focus:border-primary focus:ring-2 focus:ring-primary-soft'

function FilterSelect({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  options: readonly { value: string; label: string }[]
}): React.ReactElement {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-medium text-fg">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={event => onChange(event.target.value)}
        className={SELECT_CLASS}
      >
        <option value="">Tất cả</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export interface ReconciliationRunDetailProps {
  runId: string
  canOperate: boolean
  onRepair: (finding: ReconciliationFinding) => void
}

export function ReconciliationRunDetail({
  runId,
  canOperate,
  onRepair,
}: ReconciliationRunDetailProps): React.ReactElement {
  const [category, setCategory] = React.useState<FindingCategory | ''>('')
  const [status, setStatus] = React.useState<FindingStatus | ''>('')
  const [page, setPage] = React.useState(1)
  const run = useReconciliationRun(runId)
  const findings = useReconciliationFindings(runId, {
    page,
    limit: FINDINGS_PAGE_SIZE,
    category: category || undefined,
    status: status || undefined,
  })

  const runError = run.data ? runErrorLabel(run.data.lastErrorCode) : null

  let findingsBody: React.ReactElement
  if (findings.isPending) {
    findingsBody = <PanelLoading label="Đang tải phát hiện đối soát" />
  } else if (findings.isError) {
    findingsBody = (
      <PanelError
        testId="findings-error"
        error={findings.error}
        onRetry={() => void findings.refetch()}
      />
    )
  } else if (findings.data.items.length === 0) {
    findingsBody = <PanelEmpty>Không có phát hiện nào.</PanelEmpty>
  } else {
    findingsBody = (
      <div>
        <ReconciliationFindingsTable
          findings={findings.data.items}
          canOperate={canOperate}
          onRepair={onRepair}
        />
        {findings.data.totalPages > 1 ? (
          <PageNav
            label="Phân trang phát hiện"
            page={findings.data.page}
            totalPages={findings.data.totalPages}
            total={findings.data.total}
            noun="phát hiện"
            onPage={setPage}
          />
        ) : null}
      </div>
    )
  }

  return (
    <section
      aria-label="Chi tiết lần đối soát"
      className="space-y-3 rounded-xl border border-border bg-surface p-4"
    >
      {run.isPending ? (
        <PanelLoading label="Đang tải lần đối soát" rows={1} />
      ) : run.isError ? (
        <PanelError error={run.error} onRetry={() => void run.refetch()} />
      ) : (
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <StateBadge view={runStatusView(run.data.status)} />
            <span className="text-xs text-muted">
              Bắt đầu {formatDateTime(run.data.startedAt)} · Kết thúc{' '}
              {formatDateTime(run.data.completedAt)}
            </span>
          </div>
          <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(
              [
                ['Đã kiểm tra', run.data.counters.examined],
                ['Khớp', run.data.counters.consistent],
                ['Phát hiện', run.data.counters.findings],
                ['Chưa thể xác minh', run.data.counters.unverifiable],
              ] as const
            ).map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-border bg-surface-muted p-2"
              >
                <dt className="text-[11px] font-semibold text-muted">
                  {label}
                </dt>
                <dd className="text-lg font-bold text-fg">{value}</dd>
              </div>
            ))}
          </dl>
          {runError ? (
            <p data-testid="run-error" className="text-xs text-warning">
              {runError}
            </p>
          ) : null}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <FilterSelect
          id="finding-category"
          label="Nhóm phát hiện"
          value={category}
          onChange={value => {
            setCategory(value as FindingCategory | '')
            setPage(1)
          }}
          options={FINDING_CATEGORIES.map(value => ({
            value,
            label: findingCategoryLabel(value),
          }))}
        />
        <FilterSelect
          id="finding-status"
          label="Trạng thái phát hiện"
          value={status}
          onChange={value => {
            setStatus(value as FindingStatus | '')
            setPage(1)
          }}
          options={FINDING_STATUSES.map(value => ({
            value,
            label: findingStatusView(value).label,
          }))}
        />
      </div>
      {findingsBody}
    </section>
  )
}
