'use client'

import * as React from 'react'
import { Eye, Play, Square } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'
import { formatDateTime } from '../model/format'
import { runStatusView } from '../model/labels'
import { canCancelRun, canResumeRun } from '../model/run-actions'
import type { ReconciliationRun } from '../model/schemas'
import { StateBadge } from './state-badge'

function scopeSummary(run: ReconciliationRun): string {
  const parts: string[] = []
  if (run.scope.from && run.scope.to) {
    parts.push(
      `${formatDateTime(run.scope.from)} → ${formatDateTime(run.scope.to)}`
    )
  }
  if (run.scope.contractCount > 0) {
    parts.push(`${run.scope.contractCount} hợp đồng`)
  }
  if (run.scope.eventTypes?.length) {
    parts.push(`${run.scope.eventTypes.length} loại sự kiện`)
  }
  return parts.join(' · ') || '—'
}

export interface ReconciliationRunsTableProps {
  runs: readonly ReconciliationRun[]
  selectedRunId: string | null
  canOperate: boolean
  busyRunId: string | null
  onSelect: (runId: string) => void
  onResume: (runId: string) => void
  onCancel: (runId: string) => void
}

export function ReconciliationRunsTable({
  runs,
  selectedRunId,
  canOperate,
  busyRunId,
  onSelect,
  onResume,
  onCancel,
}: ReconciliationRunsTableProps): React.ReactElement {
  return (
    <Card className="border-border bg-surface">
      <Table aria-label="Các lần đối soát">
        <TableHeader>
          <TableRow>
            <TableHead>Tạo lúc</TableHead>
            <TableHead>Phạm vi</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Đã kiểm tra</TableHead>
            <TableHead className="text-right">Phát hiện</TableHead>
            <TableHead>
              <span className="sr-only">Hành động</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {runs.map(run => (
            <TableRow
              key={run.id}
              data-state={run.id === selectedRunId ? 'selected' : undefined}
            >
              <TableCell className="whitespace-nowrap text-muted">
                {formatDateTime(run.createdAt)}
              </TableCell>
              <TableCell className="text-xs">{scopeSummary(run)}</TableCell>
              <TableCell>
                <StateBadge view={runStatusView(run.status)} />
              </TableCell>
              <TableCell className="text-right">
                {run.counters.examined}
              </TableCell>
              <TableCell className="text-right">
                {run.counters.findings}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap justify-end gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label="Xem chi tiết lần đối soát"
                    onClick={() => onSelect(run.id)}
                  >
                    <Eye className="h-3.5 w-3.5" aria-hidden="true" /> Chi tiết
                  </Button>
                  {canOperate && canResumeRun(run) ? (
                    <Button
                      size="sm"
                      variant="outline"
                      aria-label="Tiếp tục lần đối soát"
                      loading={busyRunId === run.id}
                      onClick={() => onResume(run.id)}
                    >
                      <Play className="h-3.5 w-3.5" aria-hidden="true" /> Tiếp
                      tục
                    </Button>
                  ) : null}
                  {canOperate && canCancelRun(run) ? (
                    <Button
                      size="sm"
                      variant="outline"
                      aria-label="Hủy lần đối soát"
                      loading={busyRunId === run.id}
                      onClick={() => onCancel(run.id)}
                    >
                      <Square className="h-3.5 w-3.5" aria-hidden="true" /> Hủy
                    </Button>
                  ) : null}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
