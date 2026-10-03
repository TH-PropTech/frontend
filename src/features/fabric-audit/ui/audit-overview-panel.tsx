'use client'

import * as React from 'react'
import { RefreshCw } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { useAuditOverview } from '../api/fabric-audit-hooks'
import { formatDateTime } from '../model/format'
import {
  CoverageTable,
  IdentityCard,
  LedgerCard,
  OutboxCard,
  ReconciliationSummary,
  RuntimeCard,
  ServicesCard,
} from './audit-overview-sections'
import { PanelError, PanelLoading } from './panel-states'

export interface AuditOverviewPanelProps {
  onShowFailedEvents?: () => void
  onOpenReconciliation?: () => void
}

export function AuditOverviewPanel({
  onShowFailedEvents,
  onOpenReconciliation,
}: AuditOverviewPanelProps): React.ReactElement {
  const overview = useAuditOverview()

  if (overview.isPending) {
    return <PanelLoading label="Đang tải tổng quan Audit Center" rows={4} />
  }
  if (overview.isError) {
    return (
      <PanelError
        error={overview.error}
        onRetry={() => void overview.refetch()}
      />
    )
  }

  const data = overview.data
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-muted">
          Cập nhật lúc {formatDateTime(data.generatedAt)}
        </p>
        <Button
          size="sm"
          variant="outline"
          loading={overview.isFetching}
          onClick={() => void overview.refetch()}
        >
          <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" /> Làm mới
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <RuntimeCard overview={data} />
        <LedgerCard overview={data} />
        <ServicesCard overview={data} />
      </div>
      <OutboxCard overview={data} onShowFailedEvents={onShowFailedEvents} />
      <div className="grid gap-4 md:grid-cols-2">
        <IdentityCard overview={data} />
        <ReconciliationSummary
          overview={data}
          onOpenReconciliation={onOpenReconciliation}
        />
      </div>
      <CoverageTable overview={data} />
    </div>
  )
}
