'use client'

import * as React from 'react'
import { Check, Copy, ExternalLink, Loader2, ShieldAlert } from 'lucide-react'
import {
  getContractLedgerEvidence,
  type ContractLedgerEvidence,
  type LedgerEvidenceEvent,
} from '../api/contracts-api'
import {
  deriveGovernanceReference,
  layerStateLabel,
  ledgerEventPresentation,
} from '../lib/ledger-evidence-view'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui/sheet'

export interface LedgerEvidenceDrawerProps {
  contractId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

function formatRecordedAt(value: string | null): string {
  if (!value) return 'Chưa ghi nhận'
  return new Date(value).toLocaleString('vi-VN')
}

function eventLabel(event: LedgerEvidenceEvent): string {
  if (event.status === 'failed-terminal') return 'Thất bại terminal'
  if (event.status === 'failed-retryable') return 'Có thể retry'
  if (event.status === 'confirmed') return 'Đã xác nhận'
  if (event.status === 'processing') return 'Đang xử lý'
  return 'Đang chờ'
}

function EvidenceRow({ event }: { event: LedgerEvidenceEvent }) {
  const [copied, setCopied] = React.useState(false)
  const presentation = ledgerEventPresentation(event)

  const copyTx = async () => {
    if (!event.txId) return
    try {
      await navigator.clipboard.writeText(event.txId)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch (error) {
      console.warn('Unable to copy ledger transaction id', error)
    }
  }

  return (
    <li
      data-testid="ledger-evidence-event"
      className="rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-3 text-xs space-y-2"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-semibold text-[var(--fg)]">
          {presentation.title}
        </span>
        <span className="text-[var(--muted)]">{eventLabel(event)}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-[11px] text-[var(--muted)]">
        <span>
          Aggregate: {presentation.aggregateLabel}:{event.aggregateRef}
        </span>
        <span>{formatRecordedAt(event.recordedAt)}</span>
        <span>
          Chế độ:{' '}
          {event.networkMode === 'simulation' ? 'Thử nghiệm' : 'Lưu vết thật'}
        </span>
        {presentation.blockLabel ? (
          <span>Block: {presentation.blockLabel}</span>
        ) : null}
      </div>
      <div className="flex items-center gap-2">
        <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-[var(--fg)]">
          {event.txId ?? 'Chưa có mã giao dịch'}
        </span>
        {event.txId ? (
          <button
            type="button"
            data-testid="copy-ledger-tx"
            aria-label="Sao chép mã giao dịch"
            className="rounded border border-[var(--border)] p-1 text-[var(--muted)] hover:text-[var(--fg)]"
            onClick={() => void copyTx()}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        ) : null}
        {event.explorerUrl ? (
          <a
            href={event.explorerUrl}
            target="_blank"
            rel="noreferrer"
            data-testid="ledger-explorer-link"
            className="rounded border border-[var(--border)] p-1 text-[var(--primary)]"
            aria-label="Mở Explorer"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : null}
      </div>
    </li>
  )
}

export function LedgerEvidenceDrawer({
  contractId,
  open,
  onOpenChange,
}: LedgerEvidenceDrawerProps): React.ReactElement {
  const [data, setData] = React.useState<ContractLedgerEvidence | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!open) return
    let active = true
    const loadEvidence = async () => {
      await Promise.resolve()
      if (!active) return
      setIsLoading(true)
      setError(null)
      try {
        const result = await getContractLedgerEvidence(contractId)
        if (active) setData(result)
      } catch {
        if (active) setError('Không thể tải bằng chứng sổ cái')
      } finally {
        if (active) setIsLoading(false)
      }
    }
    void loadEvidence()
    return () => {
      active = false
    }
  }, [contractId, open])

  const governanceReference = data
    ? deriveGovernanceReference(data.events)
    : null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        data-testid="ledger-evidence-drawer"
        className="w-full overflow-y-auto sm:max-w-lg"
      >
        <SheetHeader>
          <SheetTitle>Bằng chứng sổ cái</SheetTitle>
          <SheetDescription>
            Dòng thời gian đã làm sạch theo contract và các aggregate liên quan.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-5 space-y-3">
          {isLoading ? (
            <div
              data-testid="ledger-evidence-loading"
              className="flex items-center gap-2 text-xs text-[var(--muted)]"
            >
              <Loader2 className="h-4 w-4 animate-spin" /> Đang tải evidence...
            </div>
          ) : error ? (
            <div
              data-testid="ledger-evidence-error"
              className="flex items-center gap-2 rounded border border-[var(--danger)] p-3 text-xs text-[var(--danger)]"
            >
              <ShieldAlert className="h-4 w-4" /> {error}
            </div>
          ) : data?.events.length ? (
            <>
              <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                <span>
                  {data.networkMode === 'simulation'
                    ? 'Chế độ mô phỏng'
                    : 'Lưu vết thật'}
                </span>
                <span>{data.events.length} sự kiện</span>
              </div>
              <div
                data-testid="ledger-governance-reference"
                className="rounded-lg border border-[var(--border)] bg-[var(--surface-raised)] p-3 text-xs text-[var(--muted)]"
              >
                <span className="font-semibold text-[var(--fg)]">
                  Mã bản quy định áp dụng:{' '}
                  {governanceReference?.snapshotRef ?? '—'}
                </span>
                <span className="ml-2">
                  {layerStateLabel(
                    governanceReference?.state ?? 'not-recorded'
                  )}
                </span>
              </div>
              <ul className="space-y-2">
                {data.events.map(event => (
                  <EvidenceRow key={event.id} event={event} />
                ))}
              </ul>
            </>
          ) : (
            <p
              data-testid="ledger-evidence-empty"
              className="text-xs text-[var(--muted)]"
            >
              Chưa có bằng chứng sổ cái.
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
