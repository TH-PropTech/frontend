'use client'

import type { ReactElement } from 'react'
import { useNow } from '../model/use-now'
import { CheckCircle2, Clock } from 'lucide-react'
import type { MoveOutHandover } from '../api/move-out-types'
import {
  formatDateTime,
  getCompletionReasonLabel,
  getConditionLabel,
  getHandoverStatusLabel,
} from '../lib/move-out-labels'

export interface MoveOutHandoverViewProps {
  handover: MoveOutHandover
}

const confirmation = (done: boolean): string =>
  done ? 'Đã xác nhận' : 'Chưa xác nhận'

/** Chỉ đọc: nội dung biên bản, hạn phản hồi, phản đối và chi tiết kỹ thuật. */
export function MoveOutHandoverView({
  handover,
}: MoveOutHandoverViewProps): ReactElement {
  const now = useNow()
  const isOpen = handover.status === 'recorded'
  const facts = [
    {
      label: 'Thời điểm trả nhà',
      value: formatDateTime(handover.handedBackAt),
    },
    { label: 'Chỉ số điện', value: String(handover.meterReadings.electricity) },
    { label: 'Chỉ số nước', value: String(handover.meterReadings.water) },
    { label: 'Số chìa khóa trả lại', value: String(handover.keyCount) },
  ]
  return (
    <div className="space-y-3 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <strong className="text-sm text-[var(--fg)]">
          Biên bản trả nhà (bản {handover.revision})
        </strong>
        <span className="shrink-0 whitespace-nowrap rounded-full bg-[var(--surface-muted)] px-2.5 py-1 text-[11px] font-semibold text-[var(--warning)]">
          {getHandoverStatusLabel(handover.status)}
        </span>
      </div>
      <dl className="grid grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-2">
        {facts.map(fact => (
          <div key={fact.label}>
            <dt className="text-[var(--muted)]">{fact.label}</dt>
            <dd className="font-semibold text-[var(--fg)]">{fact.value}</dd>
          </div>
        ))}
      </dl>
      <div>
        <p className="font-semibold text-[var(--fg)]">Đồ đạc, thiết bị</p>
        {handover.inventoryItems.length === 0 ? (
          <p className="text-[var(--muted)]">Không có dòng nào.</p>
        ) : (
          <ul className="mt-1 space-y-1">
            {handover.inventoryItems.map((item, index) => (
              <li key={`${item.name}-${index}`} className="min-w-0 break-words">
                {item.name} × {item.quantity}
                {item.conditionAtMoveIn
                  ? ` · lúc nhận: ${getConditionLabel(item.conditionAtMoveIn)}`
                  : ''}
                {` · lúc trả: ${getConditionLabel(item.condition)}`}
                {item.note ? ` · ${item.note}` : ''}
              </li>
            ))}
          </ul>
        )}
      </div>
      {handover.notes ? (
        <p className="break-words">
          <span className="text-[var(--muted)]">Ghi chú chung: </span>
          {handover.notes}
        </p>
      ) : null}
      <p>
        Khách thuê: {confirmation(Boolean(handover.tenantConfirmation))} · Chủ
        nhà: {confirmation(Boolean(handover.landlordConfirmation))}
      </p>
      {isOpen && handover.responseDueAt ? (
        <p className="inline-flex items-start gap-1 text-[var(--warning)]">
          <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
          Hạn phản hồi của khách thuê: {formatDateTime(handover.responseDueAt)}.
          {new Date(handover.responseDueAt).getTime() < now
            ? ' Đã quá hạn, biên bản sẽ được xem là đã đồng ý.'
            : ' Quá hạn không phản hồi thì được xem là đã đồng ý.'}
        </p>
      ) : null}
      {handover.discrepancies.length > 0 ? (
        <div>
          <p className="font-semibold text-[var(--fg)]">Phản đối của khách</p>
          <ul className="mt-1 space-y-1">
            {handover.discrepancies.map((item, index) => (
              <li key={`${item.at}-${index}`} className="break-words">
                Bản {item.revision} · {formatDateTime(item.at)}: {item.note}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {handover.dispute ? (
        <p className="break-words text-[var(--danger)]">
          Yêu cầu tranh chấp ({formatDateTime(handover.dispute.at)}):{' '}
          {handover.dispute.note}. Nền tảng không phân xử; hai bên tự thỏa thuận
          hoặc nhờ cơ quan có thẩm quyền.
        </p>
      ) : null}
      {handover.status === 'completed' ? (
        <p className="inline-flex items-start gap-1 text-[var(--success)]">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          {getCompletionReasonLabel(handover.completionReason)}
        </p>
      ) : null}
      <details>
        <summary className="min-h-11 cursor-pointer py-2 text-[var(--muted)]">
          Chi tiết kỹ thuật
        </summary>
        <p className="break-all font-mono text-[var(--muted)]">
          Mã xác thực nội dung biên bản: {handover.handoverHash}
        </p>
      </details>
    </div>
  )
}
