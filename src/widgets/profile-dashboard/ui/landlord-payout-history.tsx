'use client'

import {
  ArrowDownToLine,
  CircleAlert,
  CircleCheck,
  Clock3,
  Wallet,
} from 'lucide-react'
import { useLandlordPayouts, type PayoutStatus } from '@/entities/payout'
import { Badge } from '@/shared/ui/badge'
import { Card } from '@/shared/ui/card'

const STATUS_CONFIG: Record<
  PayoutStatus,
  { label: string; className: string }
> = {
  'awaiting-wallet': {
    label: 'Chờ liên kết tài khoản ngân hàng',
    className: 'border-warning/30 bg-warning/10 text-warning',
  },
  pending: {
    label: 'Đang chuyển',
    className: 'border-info/30 bg-info/10 text-info',
  },
  'paid-out': {
    label: 'Đã chuyển về tài khoản ngân hàng liên kết',
    className: 'border-success/30 bg-success-soft text-success',
  },
  failed: {
    label: 'Chuyển thất bại',
    className: 'border-danger/30 bg-danger/10 text-danger',
  },
}

function formatAmount(amount: number): string {
  return `${amount.toLocaleString('vi-VN')} VND`
}

export function LandlordPayoutHistory(): React.ReactElement {
  const payouts = useLandlordPayouts()

  return (
    <Card className="space-y-4 border border-border bg-surface p-6 shadow-sm">
      <header className="flex items-start gap-3">
        <span
          className="rounded-xl bg-primary-soft p-2 text-primary"
          aria-hidden="true"
        >
          <Wallet className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-display text-lg font-bold text-fg">
            Lịch sử nhận tiền
          </h2>
          <p className="text-sm text-muted">
            Các khoản nền tảng đã chuyển về tài khoản ngân hàng liên kết của
            bạn.
          </p>
        </div>
      </header>

      {payouts.isLoading ? (
        <p className="text-sm text-muted" aria-live="polite">
          Đang tải lịch sử nhận tiền…
        </p>
      ) : null}
      {payouts.isError ? (
        <p role="alert" className="flex items-center gap-2 text-sm text-danger">
          <CircleAlert className="h-4 w-4" aria-hidden="true" />
          Không thể tải lịch sử nhận tiền.
        </p>
      ) : null}
      {!payouts.isLoading &&
      !payouts.isError &&
      payouts.data?.items.length === 0 ? (
        <p className="text-sm text-muted">Chưa có khoản nhận tiền nào.</p>
      ) : null}
      {!payouts.isLoading && !payouts.isError && payouts.data?.items.length ? (
        <ul className="space-y-2" aria-label="Lịch sử payout">
          {payouts.data.items.map(payout => {
            const status = STATUS_CONFIG[payout.status]
            return (
              <li
                key={payout._id}
                className="flex flex-col gap-3 rounded-xl border border-border bg-surface-raised p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <ArrowDownToLine
                    className="h-4 w-4 text-primary"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-fg">
                      Nhận {formatAmount(payout.receivedAmount)}
                    </p>
                    <p className="text-xs text-muted">
                      Nền tảng chuyển {formatAmount(payout.sentAmount)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={status.className}>
                    {payout.status === 'paid-out' ? (
                      <CircleCheck
                        className="mr-1 h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    ) : (
                      <Clock3 className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    {status.label}
                  </Badge>
                </div>
              </li>
            )
          })}
        </ul>
      ) : null}
    </Card>
  )
}
