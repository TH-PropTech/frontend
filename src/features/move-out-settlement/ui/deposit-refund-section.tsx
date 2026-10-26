'use client'

import { useState, type FormEvent, type ReactElement } from 'react'
import { AlertTriangle, Banknote } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import type { DepositStatement, RefundInput } from '../api/move-out-types'
import {
  REFUND_DECLARATION_NOTICE,
  formatDate,
  formatDateTime,
  formatMoney,
  getCloseReasonLabel,
} from '../lib/move-out-labels'
import { useNow } from '../model/use-now'
import { deductionTotal } from './deduction-statement-view'
import { FIELD_CLASS } from './note-action'

export interface DepositRefundSectionProps {
  statement: DepositStatement
  role: 'tenant' | 'landlord'
  busy: boolean
  /** Khóa riêng nút nhận tiền của khách; mặc định theo `busy`. */
  ackBusy?: boolean
  onRecord: (input: RefundInput) => void
  onAcknowledge: (refundId: string) => void
}

const REFUNDABLE = new Set(['accepted', 'disputed', 'refund-recorded'])

export function DepositRefundSection({
  statement,
  role,
  busy,
  ackBusy = busy,
  onRecord,
  onAcknowledge,
}: DepositRefundSectionProps): ReactElement | null {
  const now = useNow()
  const [amount, setAmount] = useState('')
  const [transactionRef, setTransactionRef] = useState('')
  const [paidAt, setPaidAt] = useState('')
  const [note, setNote] = useState('')

  const payable = Math.max(
    0,
    statement.depositAmount - deductionTotal(statement)
  )
  const refunded = statement.refunds.reduce((sum, r) => sum + r.amount, 0)
  const remaining = Math.max(0, payable - refunded)
  const showForm =
    role === 'landlord' && REFUNDABLE.has(statement.status) && remaining > 0
  const isOverdue =
    Boolean(statement.refundOverdueAt) ||
    (statement.refundDueAt !== null &&
      remaining > 0 &&
      REFUNDABLE.has(statement.status) &&
      new Date(statement.refundDueAt).getTime() < now)

  if (!REFUNDABLE.has(statement.status) && statement.status !== 'closed') {
    return null
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const trimmedNote = note.trim()
    onRecord({
      amount: Number(amount),
      transactionRef: transactionRef.trim(),
      paidAt: new Date(paidAt).toISOString(),
      ...(trimmedNote ? { note: trimmedNote } : {}),
    })
  }

  return (
    <section
      data-testid="deposit-refund"
      aria-label="Hoàn cọc"
      className="space-y-3 border-t border-[var(--border)] pt-4 text-xs"
    >
      <h3 className="text-sm font-bold text-[var(--fg)]">Hoàn cọc</h3>
      <p className="text-[var(--muted)]">{REFUND_DECLARATION_NOTICE}</p>
      <p className="font-semibold text-[var(--fg)]">
        Cọc phải hoàn {formatMoney(payable)} · Đã khai báo{' '}
        {formatMoney(refunded)} · Còn lại {formatMoney(remaining)}
      </p>
      {statement.refundDueAt && remaining > 0 ? (
        <p className="text-[var(--muted)]">
          Hạn hoàn cọc: {formatDate(statement.refundDueAt)}
        </p>
      ) : null}
      {isOverdue ? (
        <p
          role="alert"
          className="inline-flex items-start gap-1 text-[var(--danger)]"
        >
          <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
          Quá hạn hoàn cọc. Hệ thống đã nhắc hai bên và ghi lại sự kiện này.
        </p>
      ) : null}
      {statement.refunds.length === 0 ? (
        <p className="text-[var(--muted)]">
          Chưa có khoản hoàn nào được khai báo.
        </p>
      ) : (
        <ul className="space-y-2">
          {statement.refunds.map(refund => (
            <li
              key={refund.id}
              data-testid="refund-item"
              className="space-y-1 rounded-lg border border-[var(--border)] p-3"
            >
              <p className="break-words">
                <strong>{formatMoney(refund.amount)}</strong> · ngày{' '}
                {formatDate(refund.paidAt)} · mã giao dịch ngân hàng{' '}
                {refund.transactionRef}
              </p>
              {refund.note ? (
                <p className="break-words">{refund.note}</p>
              ) : null}
              {refund.tenantAcknowledgedAt ? (
                <p className="text-[var(--success)]">
                  Khách thuê đã xác nhận nhận tiền lúc{' '}
                  {formatDateTime(refund.tenantAcknowledgedAt)}.
                </p>
              ) : role === 'tenant' ? (
                <Button
                  type="button"
                  className="min-h-11"
                  disabled={ackBusy}
                  onClick={() => onAcknowledge(refund.id)}
                >
                  Tôi đã nhận
                </Button>
              ) : (
                <p className="text-[var(--warning)]">
                  Chờ khách thuê xác nhận đã nhận.
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
      {getCloseReasonLabel(statement.closeReason) ? (
        <p className="text-[var(--success)]">
          {getCloseReasonLabel(statement.closeReason)}
        </p>
      ) : null}
      {showForm ? (
        <form
          onSubmit={handleSubmit}
          aria-label="Khai báo đã hoàn cọc"
          className="grid gap-3 sm:grid-cols-2"
        >
          <label>
            Số tiền đã hoàn (đ)
            <input
              required
              type="number"
              min="1"
              max={remaining}
              step="1"
              value={amount}
              onChange={event => setAmount(event.target.value)}
              className={FIELD_CLASS}
            />
          </label>
          <label>
            Ngày hoàn
            <input
              required
              type="datetime-local"
              value={paidAt}
              onChange={event => setPaidAt(event.target.value)}
              className={FIELD_CLASS}
            />
          </label>
          <label className="sm:col-span-2">
            Mã giao dịch ngân hàng
            <input
              required
              maxLength={100}
              value={transactionRef}
              onChange={event => setTransactionRef(event.target.value)}
              className={FIELD_CLASS}
            />
          </label>
          <label className="sm:col-span-2">
            Ghi chú
            <textarea
              maxLength={500}
              value={note}
              onChange={event => setNote(event.target.value)}
              className={FIELD_CLASS}
            />
          </label>
          <Button
            type="submit"
            className="min-h-11 sm:col-span-2"
            disabled={busy || !transactionRef.trim()}
          >
            <Banknote className="h-4 w-4" aria-hidden="true" />
            Tôi đã hoàn cọc
          </Button>
        </form>
      ) : null}
    </section>
  )
}
