'use client'

import type { ReactElement } from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { Landmark, AlertTriangle } from 'lucide-react'
import {
  useContractPayoutSummary,
  type ContractPayoutSummaryItem,
} from '@/entities/payout'
import {
  getContractPayoutItemStatusLabel,
  isContractPayoutItemReceived,
} from '@/features/contracts'

export interface LandlordReceiptsPanelProps {
  contractId: string
  /** Panel chỉ dành cho chủ nhà/nhân viên — tenant không được gọi API này. */
  viewerRole: 'tenant' | 'landlord' | 'staff' | 'admin'
}

function formatVnd(amount: number): string {
  return `${amount.toLocaleString('vi-VN')} VND`
}

function ReceiptRow({
  item,
}: {
  item: ContractPayoutSummaryItem
}): ReactElement {
  const received = isContractPayoutItemReceived(item.status)
  return (
    <li
      data-testid="landlord-receipt-item"
      className="flex items-center justify-between gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 text-xs"
    >
      <div className="min-w-0">
        <p className="font-semibold text-[var(--fg)]">{item.label}</p>
        <p className="text-[var(--muted)]">
          Gửi {formatVnd(item.sentAmount)} · Nhận{' '}
          {formatVnd(item.receivedAmount)}
        </p>
      </div>
      <span
        className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
          received
            ? 'bg-[var(--success)]/10 text-[var(--success)]'
            : item.status === 'failed'
              ? 'bg-[var(--danger)]/10 text-[var(--danger)]'
              : 'bg-[var(--surface-muted)] text-[var(--muted)]'
        }`}
      >
        {getContractPayoutItemStatusLabel(item.status)}
      </span>
    </li>
  )
}

/**
 * Panel "Chủ nhà nhận tiền": cọc, kỳ thuê và trạng thái ví đích, theo
 * `GET /payouts/contracts/:contractId/summary`. Chỉ render (và chỉ gọi API) khi
 * người xem là chủ nhà hoặc nhân viên/admin — khách thuê không thấy khoản này.
 */
export function LandlordReceiptsPanel({
  contractId,
  viewerRole,
}: LandlordReceiptsPanelProps): ReactElement | null {
  const canView =
    viewerRole === 'landlord' ||
    viewerRole === 'staff' ||
    viewerRole === 'admin'
  const { data, isLoading, error } = useContractPayoutSummary(
    contractId,
    canView
  )

  if (!canView) return null

  return (
    <section
      data-testid="landlord-receipts-panel"
      className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5 shadow-sm"
    >
      <div className="flex items-center gap-2">
        <Landmark
          className="h-4 w-4 text-[var(--primary)]"
          aria-hidden="true"
        />
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--fg)]">
          Chủ nhà nhận tiền
        </h3>
      </div>

      {isLoading ? (
        <p className="mt-3 text-xs text-[var(--muted)]">Đang tải...</p>
      ) : error || !data ? (
        <p className="mt-3 text-xs text-[var(--danger)]">
          Không thể tải thông tin khoản nhận lúc này.
        </p>
      ) : (
        <>
          {!data.wallet.linked ? (
            <div
              data-testid="landlord-wallet-link-prompt"
              className="mt-3 flex items-start gap-2 rounded-lg border border-[var(--warning)] bg-[var(--surface-muted)] p-3 text-xs"
            >
              <AlertTriangle
                className="mt-0.5 h-4 w-4 shrink-0 text-[var(--warning)]"
                aria-hidden="true"
              />
              <div>
                <p className="font-semibold text-[var(--fg)]">
                  Bạn chưa liên kết ví nhận tiền
                </p>
                <p className="mt-0.5 leading-relaxed text-[var(--muted)]">
                  Liên kết ví để nhận các khoản đang chờ. Khoản đang chờ ví chưa
                  được xem là đã nhận.
                </p>
                <Link
                  href={'/profile?tab=wallet' as Route}
                  className="mt-1.5 inline-block text-[var(--primary)] underline"
                >
                  Liên kết ví ngay
                </Link>
              </div>
            </div>
          ) : null}

          {data.items.length === 0 ? (
            <p className="mt-3 text-xs text-[var(--muted)]">
              Chưa có khoản nào cho hợp đồng này.
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {data.items.map(item => (
                <ReceiptRow key={`${item.kind}-${item.ref}`} item={item} />
              ))}
            </ul>
          )}

          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[var(--border)] pt-3 text-xs">
            <div>
              <p className="text-[var(--muted)]">Đã nhận</p>
              <p className="font-bold text-[var(--success)]">
                {formatVnd(data.totals.received)}
              </p>
            </div>
            <div>
              <p className="text-[var(--muted)]">Đang chờ</p>
              <p className="font-bold text-[var(--fg)]">
                {formatVnd(data.totals.pending)}
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
