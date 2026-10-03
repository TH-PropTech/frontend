'use client'

import * as React from 'react'
import { Eye } from 'lucide-react'
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
import { useAuditEvents } from '../api/fabric-audit-hooks'
import { serializeAuditSearch, type AuditFilters } from '../model/audit-filters'
import { formatDateTime, truncateMiddle } from '../model/format'
import { deliveryStateView, verificationStateView } from '../model/labels'
import type { AuditEventSummary } from '../model/schemas'
import { AuditFilterForm } from './audit-filter-form'
import { CopyButton } from './copy-button'
import { PageNav } from './page-nav'
import { PanelEmpty, PanelError, PanelLoading } from './panel-states'
import { StateBadge } from './state-badge'

export interface AuditEventsPanelProps {
  filters: AuditFilters
  onFiltersChange: (filters: AuditFilters) => void
  onSelectEvent: (eventId: string) => void
}

/** Fabric block numbers are authentic only for live commits; simulation never shows one. */
function BlockCell({
  event,
}: {
  event: AuditEventSummary
}): React.ReactElement {
  if (event.networkMode === 'simulation') {
    return <span className="text-warning">Mô phỏng</span>
  }
  return (
    <span>{event.blockNumber === null ? '—' : `#${event.blockNumber}`}</span>
  )
}

function EventRow({
  event,
  onSelect,
}: {
  event: AuditEventSummary
  onSelect: (eventId: string) => void
}): React.ReactElement {
  return (
    <TableRow>
      <TableCell className="whitespace-nowrap text-muted">
        {formatDateTime(event.recordedAt ?? event.createdAt)}
      </TableCell>
      <TableCell>
        <div className="font-medium text-fg">
          {ledgerEventLabel(event.eventType)}
        </div>
        <div className="text-[11px] text-muted">
          {ledgerAggregateLabel(event.aggregateType)} · {event.aggregateRef}
        </div>
      </TableCell>
      <TableCell className="font-mono text-xs">
        {truncateMiddle(event.contractId, 6, 6)}
      </TableCell>
      <TableCell>
        <StateBadge view={deliveryStateView(event.status)} />
        {event.failureCode ? (
          <div className="mt-1 font-mono text-[11px] text-danger">
            {event.failureCode}
          </div>
        ) : null}
      </TableCell>
      <TableCell>
        <StateBadge view={verificationStateView(event.verificationState)} />
      </TableCell>
      <TableCell className="whitespace-nowrap">
        <BlockCell event={event} />
      </TableCell>
      <TableCell>
        {event.txId ? (
          <span className="inline-flex items-center gap-1">
            <span className="font-mono text-xs" title={event.txId}>
              {truncateMiddle(event.txId, 8, 6)}
            </span>
            <CopyButton value={event.txId} label="Sao chép mã giao dịch" />
          </span>
        ) : (
          <span className="text-muted">—</span>
        )}
      </TableCell>
      <TableCell>
        <Button
          size="sm"
          variant="ghost"
          aria-label="Xem chi tiết sự kiện"
          onClick={() => onSelect(event.id)}
        >
          <Eye className="h-3.5 w-3.5" aria-hidden="true" /> Chi tiết
        </Button>
      </TableCell>
    </TableRow>
  )
}

export function AuditEventsPanel({
  filters,
  onFiltersChange,
  onSelectEvent,
}: AuditEventsPanelProps): React.ReactElement {
  const events = useAuditEvents(filters)
  // A fresh mount per externally applied filter set resets the draft (e.g. browser back).
  const formKey = serializeAuditSearch({ filters: { ...filters, page: 1 } })

  const goToPage = (page: number): void => onFiltersChange({ ...filters, page })

  let body: React.ReactElement
  if (events.isPending) {
    body = <PanelLoading label="Đang tải sự kiện bằng chứng" />
  } else if (events.isError) {
    body = (
      <PanelError error={events.error} onRetry={() => void events.refetch()} />
    )
  } else if (events.data.items.length === 0) {
    body = <PanelEmpty>Không có sự kiện nào khớp bộ lọc hiện tại.</PanelEmpty>
  } else {
    const { items, page, total, totalPages } = events.data
    body = (
      <Card
        className={
          events.isPlaceholderData
            ? 'border-border bg-surface opacity-60'
            : 'border-border bg-surface'
        }
        aria-busy={events.isPlaceholderData}
      >
        <Table aria-label="Sự kiện bằng chứng sổ cái">
          <TableHeader>
            <TableRow>
              <TableHead>Thời gian</TableHead>
              <TableHead>Sự kiện</TableHead>
              <TableHead>Hợp đồng</TableHead>
              <TableHead>Chuyển sổ cái</TableHead>
              <TableHead>Xác minh</TableHead>
              <TableHead>Khối</TableHead>
              <TableHead>Mã giao dịch</TableHead>
              <TableHead>
                <span className="sr-only">Hành động</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(event => (
              <EventRow key={event.id} event={event} onSelect={onSelectEvent} />
            ))}
          </TableBody>
        </Table>
        <PageNav
          label="Phân trang sự kiện"
          page={page}
          totalPages={totalPages}
          total={total}
          noun="sự kiện"
          onPage={goToPage}
        />
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <AuditFilterForm
        key={formKey}
        filters={filters}
        onApply={onFiltersChange}
      />
      {body}
    </div>
  )
}
