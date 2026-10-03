'use client'

import * as React from 'react'
import {
  useCancelReconciliationRun,
  useReconciliationRuns,
  useResumeReconciliationRun,
} from '../api/fabric-audit-hooks'
import type { FabricAuditCapability } from '../model/capabilities'
import { describeFabricAuditError } from '../model/error-messages'
import type {
  RepairFindingResponse,
  ReconciliationFinding,
} from '../model/schemas'
import {
  InlineError,
  PanelEmpty,
  PanelError,
  PanelLoading,
} from './panel-states'
import { PageNav } from './page-nav'
import { ReconciliationRunDetail } from './reconciliation-run-detail'
import { ReconciliationRunsTable } from './reconciliation-runs-table'
import { ReconciliationStartForm } from './reconciliation-start-form'
import { RepairFindingDialog } from './repair-finding-dialog'

const RUNS_PAGE_SIZE = 20

export interface ReconciliationPanelProps {
  capability: FabricAuditCapability
}

export function ReconciliationPanel({
  capability,
}: ReconciliationPanelProps): React.ReactElement {
  const [page, setPage] = React.useState(1)
  const [selectedRunId, setSelectedRunId] = React.useState<string | null>(null)
  const [repairing, setRepairing] =
    React.useState<ReconciliationFinding | null>(null)
  const [actionError, setActionError] = React.useState<string | null>(null)
  const [notice, setNotice] = React.useState<string | null>(null)
  const runs = useReconciliationRuns({ page, limit: RUNS_PAGE_SIZE })
  const resume = useResumeReconciliationRun()
  const cancel = useCancelReconciliationRun()

  const transition = async (
    action: typeof resume,
    runId: string
  ): Promise<void> => {
    setActionError(null)
    setNotice(null)
    try {
      await action.mutateAsync(runId)
    } catch (cause) {
      setActionError(describeFabricAuditError(cause))
    }
  }

  const repaired = (result: RepairFindingResponse): void => {
    setRepairing(null)
    setNotice(
      result.alreadyRepaired
        ? `Phát hiện này đã được sửa trước đó (tác vụ ${result.outboxId}).`
        : `Đã tạo tác vụ sửa ${result.outboxId}. Worker sẽ ghi sổ cái và cập nhật kết quả.`
    )
  }

  const busyRunId =
    (resume.isPending ? resume.variables : undefined) ??
    (cancel.isPending ? cancel.variables : undefined) ??
    null

  let list: React.ReactElement
  if (runs.isPending) {
    list = <PanelLoading label="Đang tải các lần đối soát" />
  } else if (runs.isError) {
    list = <PanelError error={runs.error} onRetry={() => void runs.refetch()} />
  } else if (runs.data.items.length === 0) {
    list = <PanelEmpty>Chưa có lần đối soát nào.</PanelEmpty>
  } else {
    list = (
      <div>
        <ReconciliationRunsTable
          runs={runs.data.items}
          selectedRunId={selectedRunId}
          canOperate={capability.canOperate}
          busyRunId={busyRunId}
          onSelect={setSelectedRunId}
          onResume={runId => void transition(resume, runId)}
          onCancel={runId => void transition(cancel, runId)}
        />
        {runs.data.totalPages > 1 ? (
          <PageNav
            label="Phân trang lần đối soát"
            page={runs.data.page}
            totalPages={runs.data.totalPages}
            total={runs.data.total}
            noun="lần đối soát"
            onPage={setPage}
          />
        ) : null}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {capability.canOperate ? (
        <ReconciliationStartForm />
      ) : (
        <p className="rounded-xl border border-border bg-surface-muted p-3 text-xs text-muted">
          Chế độ chỉ xem: nhân viên có thể xem lần đối soát và phát hiện nhưng
          không thể bắt đầu, tiếp tục, hủy hoặc sửa.
        </p>
      )}
      {actionError ? <InlineError message={actionError} /> : null}
      {notice ? (
        <p role="status" className="text-sm font-medium text-success">
          {notice}
        </p>
      ) : null}
      {list}
      {selectedRunId ? (
        <ReconciliationRunDetail
          runId={selectedRunId}
          canOperate={capability.canOperate}
          onRepair={setRepairing}
        />
      ) : null}
      {capability.canOperate ? (
        <RepairFindingDialog
          finding={repairing}
          onClose={() => setRepairing(null)}
          onRepaired={repaired}
        />
      ) : null}
    </div>
  )
}
