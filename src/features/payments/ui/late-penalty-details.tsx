'use client'

import * as React from 'react'
import { Button } from '@/shared/ui/button'
import { Textarea } from '@/shared/ui/textarea'
import { getPaymentTypeLabel } from '@/features/contracts/lib/contract-labels'
import { waivePenalty, type PaymentItem } from '../api/payments-api'

const MAX_REASON_LENGTH = 500

const formatVnd = (amount: number): string => amount.toLocaleString('vi-VN')

/** Lãi tạm tính của hóa đơn tiền thuê đang quá hạn; chỉ để xem, số chốt tính khi thanh toán. */
export function AccruedInterestNote({
  payment,
}: {
  payment: PaymentItem
}): React.ReactElement | null {
  if (payment.type !== 'rent' || payment.status !== 'overdue') return null
  if (!payment.daysLate) return null
  return (
    <p data-testid="accrued-interest" className="text-xs text-warning">
      Trễ {payment.daysLate} ngày
      {payment.accruedLateInterest
        ? ` · Lãi tạm tính ${formatVnd(payment.accruedLateInterest)} đ`
        : ''}
      . Số tiền được chốt khi thanh toán.
    </p>
  )
}

/** Hóa đơn lãi chậm trả: nhãn loại, cách tính và (nếu có) lý do chủ nhà miễn. */
export function PenaltyBreakdown({
  payment,
}: {
  payment: PaymentItem
}): React.ReactElement | null {
  if (payment.type !== 'penalty') return null
  const detail = payment.latePenalty
  return (
    <div data-testid="penalty-breakdown" className="space-y-0.5">
      <span className="inline-flex rounded-full bg-warning/10 px-2 py-0.5 text-[11px] font-semibold text-warning">
        {getPaymentTypeLabel('penalty')}
      </span>
      {detail ? (
        <p className="text-xs text-muted">
          Gốc {formatVnd(detail.baseAmount)} đ × {detail.ratePerYear}%/năm ×{' '}
          {detail.daysLate} ngày trễ / 365. Trả trực tiếp cho chủ nhà; nền tảng
          không thu hộ.
        </p>
      ) : null}
      {payment.status === 'waived' && payment.waiveReason ? (
        <p className="text-xs text-muted">
          Chủ nhà đã miễn: {payment.waiveReason}
        </p>
      ) : null}
    </div>
  )
}

interface WaivePenaltyControlProps {
  payment: PaymentItem
  onWaived: () => void
}

/** Chủ nhà miễn một khoản lãi chưa trả; bắt buộc ghi lý do. */
export function WaivePenaltyControl({
  payment,
  onWaived,
}: WaivePenaltyControlProps): React.ReactElement | null {
  const [open, setOpen] = React.useState(false)
  const [reason, setReason] = React.useState('')
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  if (
    payment.type !== 'penalty' ||
    (payment.status !== 'unpaid' && payment.status !== 'overdue')
  ) {
    return null
  }

  const submit = async (): Promise<void> => {
    setBusy(true)
    setError(null)
    try {
      await waivePenalty(payment._id, reason.trim())
      setOpen(false)
      setReason('')
      onWaived()
    } catch (waiveError) {
      setError(
        waiveError instanceof Error
          ? waiveError.message
          : 'Không miễn được khoản lãi.'
      )
    } finally {
      setBusy(false)
    }
  }

  if (!open) {
    return (
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onClick={() => setOpen(true)}
      >
        Miễn khoản phạt
      </Button>
    )
  }

  return (
    <div className="w-full space-y-2 sm:w-72">
      <label
        htmlFor={`waive-reason-${payment._id}`}
        className="text-xs font-semibold text-fg"
      >
        Lý do miễn
      </label>
      <Textarea
        id={`waive-reason-${payment._id}`}
        value={reason}
        maxLength={MAX_REASON_LENGTH}
        onChange={event => setReason(event.target.value)}
        placeholder="Ví dụ: khách thuê gặp khó khăn tạm thời"
      />
      {error ? <p className="text-xs text-danger">{error}</p> : null}
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          disabled={busy || reason.trim().length === 0}
          onClick={() => void submit()}
        >
          Xác nhận miễn
        </Button>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          disabled={busy}
          onClick={() => setOpen(false)}
        >
          Hủy
        </Button>
      </div>
    </div>
  )
}
