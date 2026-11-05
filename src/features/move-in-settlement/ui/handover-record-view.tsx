'use client'

import { useState, type FormEvent, type ReactElement } from 'react'
import { AlertTriangle, CheckCircle2, Clock, FileDown } from 'lucide-react'
import { toast } from 'sonner'
import type { MoveInSettlementView } from '@/features/contracts/api/contracts-api'
import { Button } from '@/shared/ui/button'
import { downloadHandoverPdf } from '../api/move-in-settlement-api'
import {
  ITEM_CONDITION_LABELS,
  getCompletionReasonLabel,
} from '../lib/move-in-labels'

type Handover = NonNullable<MoveInSettlementView['handover']>

export interface HandoverRecordViewProps {
  settlementId: string
  handover: Handover
  role: 'tenant' | 'landlord'
  busy: boolean
  onConfirm: () => void
  onReportDiscrepancy: (note: string) => void
}

const formatDateTime = (value: string): string =>
  new Date(value).toLocaleString('vi-VN')

const confirmationLabel = (confirmed: boolean): string =>
  confirmed ? 'Đã xác nhận' : 'Chưa xác nhận'

export function HandoverRecordView({
  settlementId,
  handover,
  role,
  busy,
  onConfirm,
  onReportDiscrepancy,
}: HandoverRecordViewProps): ReactElement {
  const [isReporting, setIsReporting] = useState(false)
  const [note, setNote] = useState('')
  const [downloading, setDownloading] = useState(false)
  const items = handover.inventoryItems ?? []
  const checklist = handover.checklist ?? []
  const discrepancies = handover.discrepancies ?? []
  const hasOpenDiscrepancy = discrepancies.some(
    item => item.revision === handover.revision
  )
  const isCompleted = Boolean(handover.completedAt)
  const ownConfirmed = Boolean(
    role === 'tenant'
      ? handover.tenantConfirmation
      : handover.landlordConfirmation
  )
  const canTenantRespond =
    role === 'tenant' && !isCompleted && !ownConfirmed && !hasOpenDiscrepancy
  // Chủ nhà tự ghi đã được tính là xác nhận; chỉ còn nút khi nhân viên ghi hộ.
  const canLandlordConfirm =
    role === 'landlord' && !isCompleted && !ownConfirmed

  const facts = [
    {
      label: 'Thời điểm bàn giao',
      value: formatDateTime(handover.handedOverAt),
    },
    { label: 'Chỉ số điện', value: String(handover.meterReadings.electricity) },
    { label: 'Chỉ số nước', value: String(handover.meterReadings.water) },
    { label: 'Số chìa khóa', value: String(handover.keyCount) },
  ]

  const submitDiscrepancy = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (!note.trim()) return
    onReportDiscrepancy(note.trim())
  }

  const handleDownloadPdf = async (): Promise<void> => {
    setDownloading(true)
    try {
      const blob = await downloadHandoverPdf(settlementId)
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = `bien-ban-ban-giao-${settlementId}.pdf`
      anchor.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Không thể tải PDF biên bản bàn giao.'
      )
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div
      data-testid="handover-record"
      className="space-y-3 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-3 text-xs"
    >
      <strong className="text-sm text-[var(--fg)]">
        Biên bản bàn giao (bản {handover.revision})
      </strong>
      <dl className="grid grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-2">
        {facts.map(fact => (
          <div key={fact.label}>
            <dt className="text-[var(--muted)]">{fact.label}</dt>
            <dd className="font-semibold text-[var(--fg)]">{fact.value}</dd>
          </div>
        ))}
      </dl>
      <div>
        <p className="font-semibold text-[var(--fg)]">
          Danh mục thiết bị, nội thất
        </p>
        {items.length === 0 ? (
          <p className="text-[var(--muted)]">Không có dòng nào.</p>
        ) : (
          <ul className="mt-1 space-y-1">
            {items.map((item, index) => (
              <li key={`${item.name}-${index}`} className="break-words">
                {item.name} × {item.quantity} ·{' '}
                {ITEM_CONDITION_LABELS[item.condition]}
                {item.note ? ` · ${item.note}` : ''}
              </li>
            ))}
          </ul>
        )}
      </div>
      {checklist.length > 0 ? (
        <div>
          <p className="font-semibold text-[var(--fg)]">
            Các mục kiểm tra khi bàn giao
          </p>
          <ul className="mt-1 space-y-1" data-testid="handover-checklist">
            {checklist.map(entry => (
              <li key={entry.id} className="break-words">
                {entry.checked ? '✓' : '○'} {entry.label}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {handover.notes ? (
        <p className="break-words">
          <span className="text-[var(--muted)]">Ghi chú chung: </span>
          {handover.notes}
        </p>
      ) : null}
      <p>
        Khách thuê: {confirmationLabel(Boolean(handover.tenantConfirmation))} ·
        Chủ nhà: {confirmationLabel(Boolean(handover.landlordConfirmation))}
      </p>
      {!isCompleted && handover.responseDueAt ? (
        <p className="inline-flex items-start gap-1 text-[var(--warning)]">
          <Clock className="h-4 w-4 shrink-0" />
          Hạn phản hồi của khách thuê: {formatDateTime(handover.responseDueAt)}.
          Quá hạn không phản hồi, biên bản tự hoàn tất theo Điều 9.1.
        </p>
      ) : null}
      {discrepancies.length > 0 ? (
        <div>
          <p className="font-semibold text-[var(--fg)]">Phản hồi sai lệch</p>
          <ul className="mt-1 space-y-1">
            {discrepancies.map((item, index) => (
              <li key={`${item.at}-${index}`} className="break-words">
                Bản {item.revision} · {formatDateTime(item.at)}: {item.note}
              </li>
            ))}
          </ul>
          {hasOpenDiscrepancy && !isCompleted ? (
            <p className="mt-1 text-[var(--warning)]">
              {role === 'landlord'
                ? 'Vui lòng sửa biên bản theo phản hồi để khách thuê xác nhận lại.'
                : 'Đã gửi phản hồi. Chờ chủ nhà sửa biên bản.'}
            </p>
          ) : null}
        </div>
      ) : null}
      {isCompleted ? (
        <div className="space-y-2">
          <p className="inline-flex items-start gap-1 text-[var(--success)]">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            Bàn giao hoàn tất.{' '}
            {getCompletionReasonLabel(handover.completionReason)}
          </p>
          <Button
            type="button"
            variant="secondary"
            className="min-h-11"
            disabled={downloading}
            onClick={() => void handleDownloadPdf()}
          >
            <FileDown className="h-4 w-4" />
            {downloading ? 'Đang tải...' : 'Tải PDF biên bản'}
          </Button>
        </div>
      ) : null}
      {canTenantRespond || canLandlordConfirm ? (
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            className="min-h-11"
            disabled={busy}
            onClick={onConfirm}
          >
            Xác nhận biên bản
          </Button>
          {canTenantRespond ? (
            <Button
              type="button"
              variant="secondary"
              className="min-h-11"
              aria-expanded={isReporting}
              onClick={() => setIsReporting(open => !open)}
            >
              <AlertTriangle className="h-4 w-4" />
              Báo sai lệch
            </Button>
          ) : null}
        </div>
      ) : null}
      {canTenantRespond && isReporting ? (
        <form onSubmit={submitDiscrepancy} className="space-y-2">
          <label className="block">
            Nội dung sai lệch
            <textarea
              required
              maxLength={1000}
              value={note}
              onChange={event => setNote(event.target.value)}
              className="mt-1 min-h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2"
            />
          </label>
          <Button
            type="submit"
            variant="secondary"
            className="min-h-11"
            disabled={busy || !note.trim()}
          >
            Gửi phản hồi sai lệch
          </Button>
        </form>
      ) : null}
      <details>
        <summary className="cursor-pointer text-[var(--muted)]">
          Chi tiết kỹ thuật
        </summary>
        <p className="mt-1 break-all font-mono text-[var(--muted)]">
          Mã xác thực nội dung biên bản: {handover.handoverHash}
        </p>
      </details>
    </div>
  )
}
