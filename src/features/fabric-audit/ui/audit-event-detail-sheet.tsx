'use client'

import * as React from 'react'
import { ExternalLink } from 'lucide-react'
import {
  ledgerAggregateLabel,
  ledgerEventLabel,
} from '@/shared/lib/ledger-event-labels'
import { Button } from '@/shared/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui/sheet'
import { useAuditEvent } from '../api/fabric-audit-hooks'
import { formatDateTime, safeExternalUrl } from '../model/format'
import {
  dependencyStateView,
  deliveryStateView,
  explorerReasonLabel,
  runErrorLabel,
  verificationStateView,
} from '../model/labels'
import type { AuditEventDetail } from '../model/schemas'
import { CopyButton } from './copy-button'
import { PanelError, PanelLoading } from './panel-states'
import { StateBadge } from './state-badge'

function Field({
  label,
  testId,
  children,
}: {
  label: string
  testId?: string
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div className="space-y-1">
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted">
        {label}
      </dt>
      <dd data-testid={testId} className="break-words text-sm text-fg">
        {children}
      </dd>
    </div>
  )
}

/** The Explorer link is rendered only when the server marks it available and the URL is http(s). */
function ExplorerAction({
  explorer,
}: {
  explorer: AuditEventDetail['explorer']
}): React.ReactElement {
  const url = explorer.available ? safeExternalUrl(explorer.url) : null
  if (url) {
    return (
      <Button asChild variant="outline" size="sm">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          Mở trong Explorer
        </a>
      </Button>
    )
  }
  return (
    <div className="space-y-1">
      <Button variant="outline" size="sm" disabled>
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        Mở trong Explorer
      </Button>
      <p className="text-xs text-muted">
        {explorerReasonLabel(explorer.reason) ??
          'Liên kết Explorer không khả dụng'}
      </p>
    </div>
  )
}

function EventBody({ event }: { event: AuditEventDetail }): React.ReactElement {
  const simulated = event.networkMode === 'simulation'
  const verificationReason = runErrorLabel(event.verification.reason)
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-base font-bold text-fg">
          {ledgerEventLabel(event.eventType)}
        </h3>
        <p className="text-xs text-muted">
          {ledgerAggregateLabel(event.aggregateType)} · {event.aggregateRef}
        </p>
        <div className="flex flex-wrap gap-2">
          <StateBadge view={deliveryStateView(event.status)} />
          {simulated ? (
            <StateBadge
              view={{
                label: 'Mô phỏng — không phải bằng chứng Fabric',
                tone: 'warning',
              }}
            />
          ) : null}
        </div>
      </div>

      <dl className="space-y-3">
        <Field label="Xác minh" testId="detail-verification">
          <StateBadge view={verificationStateView(event.verification.status)} />
          {verificationReason ? (
            <span className="mt-1 block text-xs text-muted">
              {verificationReason}
            </span>
          ) : null}
        </Field>
        <Field label="Mã giao dịch (TxID)">
          {event.txId ? (
            <span className="inline-flex items-center gap-1">
              <span className="font-mono text-xs">{event.txId}</span>
              <CopyButton value={event.txId} label="Sao chép mã giao dịch" />
            </span>
          ) : (
            <span className="text-muted">Chưa có mã giao dịch</span>
          )}
        </Field>
        {!simulated && event.blockNumber !== null ? (
          <Field label="Khối sổ cái" testId="detail-block">
            #{event.blockNumber}
          </Field>
        ) : null}
        <Field label="Ghi nhận lúc">{formatDateTime(event.recordedAt)}</Field>
        <Field label="Hash payload" testId="detail-payload-hash">
          <span className="font-mono text-xs">{event.payloadHash}</span>
        </Field>
        <Field label="Số lần thử">{event.attempts}</Field>
        {event.failureCode ? (
          <Field label="Lỗi đã làm sạch" testId="detail-failure">
            <span className="font-mono text-xs text-danger">
              {event.failureCode}
            </span>
          </Field>
        ) : null}
      </dl>

      <section aria-label="Phụ thuộc" className="space-y-2">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted">
          Phụ thuộc
        </h4>
        {event.dependencies.length === 0 ? (
          <p className="text-xs text-muted">Không có sự kiện phụ thuộc.</p>
        ) : (
          <ul className="space-y-1.5">
            {event.dependencies.map(dependency => (
              <li
                key={dependency.key}
                data-testid="detail-dependency"
                className="flex items-center justify-between gap-2 rounded-lg border border-border bg-surface-muted px-3 py-2"
              >
                <span className="break-all font-mono text-[11px]">
                  {dependency.key}
                </span>
                <StateBadge view={dependencyStateView(dependency.state)} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <ExplorerAction explorer={event.explorer} />
    </div>
  )
}

export interface AuditEventDetailSheetProps {
  eventId: string | null
  onClose: () => void
}

export function AuditEventDetailSheet({
  eventId,
  onClose,
}: AuditEventDetailSheetProps): React.ReactElement {
  const event = useAuditEvent(eventId)

  let body: React.ReactElement | null = null
  if (eventId !== null) {
    if (event.isPending) {
      body = <PanelLoading label="Đang tải chi tiết sự kiện" rows={4} />
    } else if (event.isError) {
      body = (
        <PanelError error={event.error} onRetry={() => void event.refetch()} />
      )
    } else {
      body = <EventBody event={event.data} />
    }
  }

  return (
    <Sheet open={eventId !== null} onOpenChange={open => !open && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Chi tiết sự kiện bằng chứng</SheetTitle>
          <SheetDescription>
            Thông tin đã được làm sạch; không chứa chứng chỉ hay dữ liệu cá
            nhân.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-5">{body}</div>
      </SheetContent>
    </Sheet>
  )
}
