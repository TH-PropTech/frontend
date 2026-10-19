'use client'

import * as React from 'react'
import { RefreshCw } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import { Textarea } from '@/shared/ui/textarea'
import { OptionSelect } from '@/shared/ui/option-select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'
import {
  getAdminPayments,
  markPayoutSettledExternally,
  recheckAdminPayment,
  type AdminPaymentGateway,
  type AdminPaymentRow,
  type AdminPaymentsFilter,
} from '../api/payment-history-api'

const PROVIDER_OPTIONS = [
  { value: 'vnpay', label: 'VNPay (sandbox)' },
  { value: 'momo', label: 'MoMo (sandbox)' },
  { value: 'zalopay', label: 'ZaloPay (sandbox)' },
  { value: 'mocbank', label: 'Ví Mộc' },
  { value: 'mock-bank', label: 'Mock Bank' },
]

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Chờ thanh toán' },
  { value: 'processing', label: 'Đang xử lý' },
  { value: 'succeeded', label: 'Thành công' },
  { value: 'failed', label: 'Thất bại' },
  { value: 'expired', label: 'Hết hạn' },
]

const PAYOUT_STATUS_OPTIONS = [
  { value: 'awaiting-wallet', label: 'Chờ ví chủ nhà' },
  { value: 'pending', label: 'Đang chuyển' },
  { value: 'paid-out', label: 'Đã chuyển' },
  { value: 'failed', label: 'Chuyển lỗi' },
]

const PROVIDER_LABELS: Record<string, string> = Object.fromEntries(
  PROVIDER_OPTIONS.map(o => [o.value, o.label])
)

const INFO_ANOMALIES = new Set(['awaiting-reconciliation'])

const GATEWAY_STATUS_LABELS: Record<string, string> = {
  succeeded: 'thành công',
  pending: 'đang xử lý',
  failed: 'thất bại',
  not_found: 'không thấy giao dịch',
  unavailable: 'không phản hồi',
}

const ANOMALY_LABELS: Record<string, string> = {
  'attempt-succeeded-payment-not-paid':
    'Cổng báo thành công nhưng hóa đơn chưa paid',
  'paid-without-payout': 'Đã thu tiền nhưng chưa có bản ghi chuyển cho chủ nhà',
  'payout-failed': 'Chuyển tiền cho chủ nhà thất bại',
  'payout-stuck': 'Chuyển tiền treo quá lâu',
  'attempt-stuck-processing': 'Giao dịch kẹt ở trạng thái đang xử lý',
  'gateway-not-confirmed': 'Cổng không xác nhận giao dịch đã thanh toán',
  'gateway-paid-not-settled': 'Cổng đã thu tiền nhưng chưa chuyển cho chủ nhà',
  'gateway-amount-mismatch': 'Số tiền ở cổng lệch với hệ thống',
  'awaiting-reconciliation': 'Đã thu qua cổng, chờ đối soát',
}

const money = (n: number): string => `${n.toLocaleString('vi-VN')} đ`

const dateTime = (iso: string | null): string =>
  iso ? new Date(iso).toLocaleString('vi-VN') : '—'

function attemptStatusBadge(
  status: AdminPaymentRow['attemptStatus']
): React.ReactElement {
  const map: Record<string, string> = {
    succeeded: 'bg-emerald-100 text-emerald-800',
    failed: 'bg-red-100 text-red-800',
    expired: 'bg-zinc-200 text-zinc-700',
    processing: 'bg-amber-100 text-amber-800',
    pending: 'bg-sky-100 text-sky-800',
  }
  return (
    <Badge className={map[status] ?? ''} variant="outline">
      {status}
    </Badge>
  )
}

function reconcileBadge(
  gateway: AdminPaymentGateway | undefined
): React.ReactElement {
  if (!gateway) {
    return <span className="text-[11px] text-[var(--muted)]">—</span>
  }
  if (gateway.kind === 'internal') {
    return (
      <Badge className="bg-zinc-200 text-zinc-700" variant="outline">
        Nội bộ
      </Badge>
    )
  }
  const map: Record<string, [string, string]> = {
    unverified: ['Chờ đối soát với cổng', 'bg-amber-100 text-amber-800'],
    verified: ['Đã khớp với cổng', 'bg-emerald-100 text-emerald-800'],
    mismatch: ['Lệch với cổng', 'bg-red-100 text-red-800'],
    unavailable: ['Cổng không phản hồi', 'bg-zinc-200 text-zinc-700'],
    not_applicable: ['—', 'bg-zinc-200 text-zinc-700'],
  }
  const [label, cls] = map[gateway.reconcileStatus] ?? ['—', '']
  return (
    <Badge className={cls} variant="outline">
      {label}
    </Badge>
  )
}

function reconcileCell(
  gateway: AdminPaymentGateway | undefined
): React.ReactElement {
  return (
    <>
      {reconcileBadge(gateway)}
      {gateway?.gatewayStatus ? (
        <div className="text-[11px] text-[var(--muted)]">
          Cổng: {GATEWAY_STATUS_LABELS[gateway.gatewayStatus]}
        </div>
      ) : null}
      {gateway?.checkedAt ? (
        <div className="text-[11px] text-[var(--muted)]">
          Kiểm tra lúc {dateTime(gateway.checkedAt)}
        </div>
      ) : null}
      {gateway?.providerTransactionId ? (
        <div
          className="max-w-[140px] truncate font-mono text-[11px]"
          title={gateway.providerTransactionId}
        >
          {gateway.providerTransactionId}
        </div>
      ) : null}
    </>
  )
}

function payoutStatusBadge(
  payout: AdminPaymentRow['payout']
): React.ReactElement {
  if (!payout) {
    return <span className="text-[11px] text-[var(--muted)]">—</span>
  }
  if (payout.settlement === 'external') {
    return (
      <span className="text-[11px] text-[var(--muted)]">
        {payout.status === 'paid-out'
          ? 'Đã chuyển cho chủ nhà ngoài hệ thống'
          : 'Tiền nhận tại merchant của cổng — chuyển cho chủ nhà ngoài hệ thống'}
      </span>
    )
  }
  const map: Record<string, string> = {
    'paid-out': 'bg-emerald-100 text-emerald-800',
    failed: 'bg-red-100 text-red-800',
    pending: 'bg-amber-100 text-amber-800',
    'awaiting-wallet': 'bg-zinc-200 text-zinc-700',
  }
  return (
    <Badge className={map[payout.status] ?? ''} variant="outline">
      {payout.status}
    </Badge>
  )
}

export function PaymentHistoryView(): React.ReactElement {
  const [filter, setFilter] = React.useState<AdminPaymentsFilter>({
    page: 1,
    limit: 20,
  })
  const [rows, setRows] = React.useState<AdminPaymentRow[]>([])
  const [total, setTotal] = React.useState(0)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [rechecking, setRechecking] = React.useState<string | null>(null)
  const [settleTarget, setSettleTarget] =
    React.useState<AdminPaymentRow | null>(null)
  const [settleNote, setSettleNote] = React.useState('')
  const [settling, setSettling] = React.useState(false)
  const [settleError, setSettleError] = React.useState<string | null>(null)

  const load = React.useCallback(async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const page = await getAdminPayments(filter)
      setRows(page.items)
      setTotal(page.total)
    } catch (cause: unknown) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Không thể tải lịch sử thanh toán.'
      )
    } finally {
      setLoading(false)
    }
  }, [filter])

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      void load()
    }, 0)
    return () => window.clearTimeout(timer)
  }, [load])

  const handleRecheck = async (txRef: string): Promise<void> => {
    setRechecking(txRef)
    try {
      const fresh = await recheckAdminPayment(txRef)
      setRows(prev => prev.map(row => (row.txRef === txRef ? fresh : row)))
    } catch {
      // giữ nguyên hàng cũ; nút vẫn cho thử lại
    } finally {
      setRechecking(null)
    }
  }

  const handleSettle = async (): Promise<void> => {
    const target = settleTarget
    const payoutId = target?.payout?.id
    if (!target || !payoutId) return
    setSettling(true)
    setSettleError(null)
    try {
      await markPayoutSettledExternally(
        payoutId,
        settleNote.trim() || undefined
      )
      setSettleTarget(null)
      setSettleNote('')
      try {
        const fresh = await recheckAdminPayment(target.txRef)
        setRows(prev =>
          prev.map(row => (row.txRef === target.txRef ? fresh : row))
        )
      } catch {
        await load()
      }
    } catch (cause: unknown) {
      setSettleError(
        cause instanceof Error ? cause.message : 'Không thể đánh dấu đã chuyển.'
      )
    } finally {
      setSettling(false)
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / (filter.limit ?? 20)))

  const setFilterField = <K extends 'provider' | 'status' | 'payoutStatus'>(
    key: K,
    value: string
  ): void => {
    setFilter(f => {
      const next: AdminPaymentsFilter = { ...f, page: 1 }
      if (value) {
        next[key] = value as NonNullable<AdminPaymentsFilter[K]>
      } else {
        delete next[key]
      }
      return next
    })
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-fg font-marketing">
          Lịch sử thanh toán & đối soát
        </h2>
        <p className="text-xs text-muted mt-1">
          Mọi giao dịch qua VNPay/MoMo/ZaloPay/Mock Bank/Ví Mộc trên toàn sàn.
          &quot;Kiểm tra lại&quot;: cổng thật được hỏi trực tiếp qua API tra
          cứu, Ví Mộc/nội bộ đọc từ hệ thống.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <OptionSelect
          label="Cổng"
          value={filter.provider ?? ''}
          onChange={v => setFilterField('provider', v)}
          options={PROVIDER_OPTIONS}
          allLabel="Tất cả cổng"
        />
        <OptionSelect
          label="Trạng thái cổng"
          value={filter.status ?? ''}
          onChange={v => setFilterField('status', v)}
          options={STATUS_OPTIONS}
          allLabel="Tất cả trạng thái"
        />
        <OptionSelect
          label="Trạng thái chuyển tiền"
          value={filter.payoutStatus ?? ''}
          onChange={v => setFilterField('payoutStatus', v)}
          options={PAYOUT_STATUS_OPTIONS}
          allLabel="Tất cả"
        />
      </div>

      {loading ? (
        <p role="status" className="text-sm text-muted">
          Đang tải...
        </p>
      ) : error ? (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : !rows.length ? (
        <p role="status" className="text-sm text-muted">
          Chưa có giao dịch nào khớp bộ lọc.
        </p>
      ) : (
        <div className="rounded-xl border border-line bg-surface overflow-hidden">
          <Table data-testid="payment-history-table">
            <TableHeader>
              <TableRow>
                <TableHead>Thời gian</TableHead>
                <TableHead>Mã GD</TableHead>
                <TableHead>Cổng</TableHead>
                <TableHead>Số tiền</TableHead>
                <TableHead>Người trả</TableHead>
                <TableHead>Chủ nhà nhận</TableHead>
                <TableHead>Trạng thái cổng</TableHead>
                <TableHead>Đối soát</TableHead>
                <TableHead>Trạng thái chuyển tiền</TableHead>
                <TableHead>Bất thường</TableHead>
                <TableHead aria-label="Hành động" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map(row => (
                <TableRow
                  key={row.txRef}
                  data-testid={`payment-row-${row.txRef}`}
                >
                  <TableCell>{dateTime(row.createdAt)}</TableCell>
                  <TableCell className="font-mono text-[11px]">
                    {row.txRef}
                  </TableCell>
                  <TableCell>
                    {PROVIDER_LABELS[row.provider] ?? row.provider}
                  </TableCell>
                  <TableCell>{money(row.amount)}</TableCell>
                  <TableCell>{row.payer?.name ?? '—'}</TableCell>
                  <TableCell>
                    {row.payeeRole === 'platform'
                      ? 'Sàn thu phí'
                      : (row.landlord?.name ?? '—')}
                  </TableCell>
                  <TableCell>{attemptStatusBadge(row.attemptStatus)}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {reconcileCell(row.gateway)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {payoutStatusBadge(row.payout)}
                      {row.payout?.settlement === 'external' &&
                      row.payout.status === 'pending' &&
                      row.payout.id ? (
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            setSettleError(null)
                            setSettleTarget(row)
                          }}
                        >
                          Đánh dấu đã chuyển ngoài hệ thống
                        </Button>
                      ) : null}
                    </div>
                  </TableCell>
                  <TableCell>
                    {row.anomalies.length ? (
                      <ul className="space-y-0.5">
                        {row.anomalies.map(code => (
                          <li
                            key={code}
                            className={
                              INFO_ANOMALIES.has(code)
                                ? 'text-[11px] text-[var(--info,#0369a1)]'
                                : 'text-[11px] text-[var(--warning)]'
                            }
                          >
                            {ANOMALY_LABELS[code] ?? code}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-[11px] text-[var(--muted)]">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      title={
                        row.gateway?.kind === 'external'
                          ? 'Hỏi lại cổng thanh toán'
                          : 'Đọc lại từ hệ thống'
                      }
                      loading={rechecking === row.txRef}
                      onClick={() => void handleRecheck(row.txRef)}
                    >
                      <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                      Kiểm tra lại
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {!loading && rows.length > 0 ? (
        <div className="flex items-center justify-between text-xs text-muted">
          <span>
            Trang {filter.page ?? 1}/{totalPages} · {total} giao dịch
          </span>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled={(filter.page ?? 1) <= 1}
              onClick={() =>
                setFilter(f => ({ ...f, page: Math.max(1, (f.page ?? 1) - 1) }))
              }
            >
              Trước
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled={(filter.page ?? 1) >= totalPages}
              onClick={() =>
                setFilter(f => ({ ...f, page: (f.page ?? 1) + 1 }))
              }
            >
              Sau
            </Button>
          </div>
        </div>
      ) : null}

      <Dialog
        open={settleTarget !== null}
        onOpenChange={open => {
          if (!open && !settling) setSettleTarget(null)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận đã chuyển ngoài hệ thống</DialogTitle>
            <DialogDescription>
              Xác nhận tiền của giao dịch {settleTarget?.txRef} đã được chuyển
              cho chủ nhà ngoài hệ thống.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            aria-label="Ghi chú"
            placeholder="Ghi chú (không bắt buộc)"
            value={settleNote}
            onChange={e => setSettleNote(e.target.value)}
          />
          {settleError ? (
            <p role="alert" className="text-sm text-danger">
              {settleError}
            </p>
          ) : null}
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              disabled={settling}
              onClick={() => setSettleTarget(null)}
            >
              Hủy
            </Button>
            <Button
              type="button"
              loading={settling}
              onClick={() => void handleSettle()}
            >
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
