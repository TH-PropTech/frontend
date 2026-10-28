'use client'

import { useState, type ReactElement } from 'react'
import Image from 'next/image'
import { Clock } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import type { DepositStatement, LineResponseInput } from '../api/move-out-types'
import {
  formatDateTime,
  formatMoney,
  getAcceptedReasonLabel,
  getStatementStatusLabel,
} from '../lib/move-out-labels'
import { useNow } from '../model/use-now'
import { FIELD_CLASS } from './note-action'

export interface DeductionStatementViewProps {
  statement: DepositStatement
  /** Khách thuê đang được phản hồi: hiện lựa chọn đồng ý hoặc phản đối từng dòng. */
  canRespond: boolean
  busy: boolean
  onRespond: (responses: LineResponseInput[]) => void
}

type Draft = { decision: 'accept' | 'reject'; note: string }

export function deductionTotal(statement: DepositStatement): number {
  return statement.lines.reduce((sum, line) => sum + line.amount, 0)
}

export function DeductionStatementView({
  statement,
  canRespond,
  busy,
  onRespond,
}: DeductionStatementViewProps): ReactElement {
  const now = useNow()
  const [drafts, setDrafts] = useState<Record<string, Draft>>({})
  const total = deductionTotal(statement)
  const isExpired =
    statement.status === 'awaiting-tenant' &&
    statement.responseDueAt !== null &&
    new Date(statement.responseDueAt).getTime() < now
  const missingNote = statement.lines.some(line => {
    const draft = drafts[line.id]
    return draft?.decision === 'reject' && !draft.note.trim()
  })
  const allChosen = statement.lines.every(line => drafts[line.id])

  const setDraft = (lineId: string, patch: Partial<Draft>): void =>
    setDrafts(current => ({
      ...current,
      [lineId]: { decision: 'accept', note: '', ...current[lineId], ...patch },
    }))

  const handleRespond = (): void =>
    onRespond(
      statement.lines.map(line => {
        const draft = drafts[line.id] ?? { decision: 'accept', note: '' }
        const note = draft.note.trim()
        return {
          lineId: line.id,
          decision: draft.decision,
          ...(note ? { note } : {}),
        }
      })
    )

  return (
    <div className="space-y-3 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <strong className="text-sm text-[var(--fg)]">Bảng khấu trừ cọc</strong>
        <span className="shrink-0 whitespace-nowrap rounded-full bg-[var(--surface-muted)] px-2.5 py-1 text-[11px] font-semibold text-[var(--warning)]">
          {getStatementStatusLabel(statement.status)}
        </span>
      </div>
      {statement.lines.length === 0 ? (
        <p className="text-[var(--muted)]">Không có khoản khấu trừ nào.</p>
      ) : (
        <ul className="space-y-2">
          {statement.lines.map((line, index) => (
            <li
              key={line.id}
              data-testid="deduction-line"
              className="space-y-2 rounded-lg border border-[var(--border)] p-3"
            >
              <div className="flex flex-wrap justify-between gap-2">
                <span className="min-w-0 break-words font-semibold text-[var(--fg)]">
                  {index + 1}. {line.reason}
                </span>
                <strong className="shrink-0 whitespace-nowrap">
                  {formatMoney(line.amount)}
                </strong>
              </div>
              {line.evidenceUrls.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {line.evidenceUrls.map(url => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Xem ảnh chứng từ"
                    >
                      <Image
                        src={url}
                        alt="Ảnh chứng từ khoản khấu trừ"
                        width={64}
                        height={64}
                        unoptimized
                        className="h-16 w-16 rounded-md border border-[var(--border)] object-cover"
                      />
                    </a>
                  ))}
                </div>
              ) : null}
              {line.tenantResponse ? (
                <p
                  className={
                    line.tenantResponse.decision === 'accept'
                      ? 'text-[var(--success)]'
                      : 'break-words text-[var(--danger)]'
                  }
                >
                  {line.tenantResponse.decision === 'accept'
                    ? 'Khách thuê đồng ý khoản này.'
                    : `Khách thuê phản đối: ${line.tenantResponse.note ?? ''}`}
                </p>
              ) : null}
              {canRespond ? (
                <fieldset className="space-y-2">
                  <legend className="sr-only">
                    Phản hồi khoản {index + 1}
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {(['accept', 'reject'] as const).map(decision => (
                      <label
                        key={decision}
                        className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[var(--border)] px-3"
                      >
                        <input
                          type="radio"
                          name={`decision-${line.id}`}
                          checked={drafts[line.id]?.decision === decision}
                          onChange={() => setDraft(line.id, { decision })}
                        />
                        {decision === 'accept' ? 'Đồng ý' : 'Phản đối'}
                      </label>
                    ))}
                  </div>
                  {drafts[line.id]?.decision === 'reject' ? (
                    <label className="block">
                      Lý do phản đối khoản {index + 1}
                      <textarea
                        required
                        maxLength={1000}
                        value={drafts[line.id]?.note ?? ''}
                        onChange={event =>
                          setDraft(line.id, { note: event.target.value })
                        }
                        className={FIELD_CLASS}
                      />
                    </label>
                  ) : null}
                </fieldset>
              ) : null}
            </li>
          ))}
        </ul>
      )}
      <p className="font-semibold text-[var(--fg)]">
        Tiền cọc {formatMoney(statement.depositAmount)} · Khấu trừ{' '}
        {formatMoney(total)} · Cọc hoàn{' '}
        {formatMoney(Math.max(0, statement.depositAmount - total))}
      </p>
      {statement.status === 'awaiting-tenant' && statement.responseDueAt ? (
        <p className="inline-flex items-start gap-1 text-[var(--warning)]">
          <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
          Hạn phản hồi: {formatDateTime(statement.responseDueAt)}.
          {isExpired
            ? ' Đã quá hạn, nội dung được xem là khách đã đồng ý.'
            : ' Quá hạn không phản hồi thì được xem là đã đồng ý.'}
        </p>
      ) : null}
      {getAcceptedReasonLabel(statement.acceptedReason) ? (
        <p className="text-[var(--success)]">
          {getAcceptedReasonLabel(statement.acceptedReason)}
        </p>
      ) : null}
      {statement.dispute ? (
        <p className="break-words text-[var(--danger)]">
          Yêu cầu tranh chấp: {statement.dispute.note}. Nền tảng không phân xử;
          hai bên tự thỏa thuận hoặc nhờ cơ quan có thẩm quyền.
        </p>
      ) : null}
      {canRespond && !isExpired ? (
        <Button
          type="button"
          className="min-h-11"
          disabled={busy || missingNote || !allChosen}
          onClick={handleRespond}
        >
          Gửi phản hồi
        </Button>
      ) : null}
      {canRespond && isExpired ? (
        <p role="alert" className="text-[var(--danger)]">
          Đã quá hạn phản hồi nên không thể gửi thêm.
        </p>
      ) : null}
    </div>
  )
}
