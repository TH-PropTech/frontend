'use client'

import * as React from 'react'
import { Wrench } from 'lucide-react'
import {
  ledgerAggregateLabel,
  ledgerEventLabel,
} from '@/shared/lib/ledger-event-labels'
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
import { truncateMiddle } from '../model/format'
import { findingCategoryLabel, findingStatusView } from '../model/labels'
import type { ReconciliationFinding } from '../model/schemas'
import { StateBadge } from './state-badge'

function HashLine({
  label,
  value,
}: {
  label: string
  value: string | null
}): React.ReactElement | null {
  if (!value) return null
  return (
    <div className="font-mono text-[11px] text-muted" title={value}>
      {label}: {truncateMiddle(value, 8, 6)}
    </div>
  )
}

function FindingAction({
  finding,
  canOperate,
  onRepair,
}: {
  finding: ReconciliationFinding
  canOperate: boolean
  onRepair: (finding: ReconciliationFinding) => void
}): React.ReactElement | null {
  if (finding.status === 'repair-pending') {
    return (
      <div className="text-xs text-muted">
        Tác vụ phục hồi:{' '}
        <span className="font-mono">{finding.recoveryOutboxId ?? '—'}</span>
      </div>
    )
  }
  if (finding.status === 'resolved' || finding.status === 'accepted-risk') {
    return finding.resolution ? (
      <div className="text-xs text-muted">{finding.resolution.reason}</div>
    ) : null
  }
  if (!finding.repairable) {
    return (
      <p className="text-xs text-muted">
        Chỉ điều tra — không có hành động sửa an toàn.
      </p>
    )
  }
  if (!canOperate) {
    return <p className="text-xs text-muted">Chỉ quản trị viên được sửa.</p>
  }
  return (
    <Button
      size="sm"
      variant="outline"
      aria-label="Sửa phát hiện"
      onClick={() => onRepair(finding)}
    >
      <Wrench className="h-3.5 w-3.5" aria-hidden="true" /> Sửa
    </Button>
  )
}

export interface ReconciliationFindingsTableProps {
  findings: readonly ReconciliationFinding[]
  canOperate: boolean
  onRepair: (finding: ReconciliationFinding) => void
}

export function ReconciliationFindingsTable({
  findings,
  canOperate,
  onRepair,
}: ReconciliationFindingsTableProps): React.ReactElement {
  return (
    <Card className="border-border bg-surface">
      <Table aria-label="Phát hiện đối soát">
        <TableHeader>
          <TableRow>
            <TableHead>Nhóm</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Sự kiện</TableHead>
            <TableHead>Hash</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {findings.map(finding => (
            <TableRow key={finding.id}>
              <TableCell className="font-medium text-fg">
                {findingCategoryLabel(finding.category)}
              </TableCell>
              <TableCell>
                <StateBadge view={findingStatusView(finding.status)} />
              </TableCell>
              <TableCell>
                <div>{ledgerEventLabel(finding.eventType)}</div>
                <div className="text-[11px] text-muted">
                  {ledgerAggregateLabel(finding.aggregateType)} ·{' '}
                  {truncateMiddle(finding.aggregateId, 4, 6)}
                </div>
              </TableCell>
              <TableCell>
                <HashLine label="Kỳ vọng" value={finding.expectedHash} />
                <HashLine label="Quan sát" value={finding.observedHash} />
              </TableCell>
              <TableCell>
                <FindingAction
                  finding={finding}
                  canOperate={canOperate}
                  onRepair={onRepair}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
