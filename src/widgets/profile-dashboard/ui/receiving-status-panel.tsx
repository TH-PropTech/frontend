'use client'

import * as React from 'react'
import { Loader2, RefreshCw } from 'lucide-react'
import {
  useReceivingStatus,
  useReportPayoutIssue,
  type ReceivingAccountState,
  type ReceivingIssue,
  type ReceivingIssueStatus,
  type WalletBrand,
} from '@/entities/wallet'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import { Skeleton } from '@/shared/ui/skeleton'
import { appToast } from '@/shared/ui/app-toast'
import { describeWalletError, formatVnd } from './wallet-error'

const BRAND_LABELS: Record<WalletBrand, string> = {
  mocbank: 'Ví Mộc',
  momo: 'Momo (mô phỏng)',
  zalopay: 'ZaloPay (mô phỏng)',
}

const STATE_CLASS: Record<ReceivingAccountState, string> = {
  active: 'border-success/30 bg-success-soft/20 text-success',
  not_found: 'border-danger/30 bg-danger-soft/20 text-danger',
  unreachable: 'border-warning/30 bg-warning/10 text-warning',
  brand_mismatch: 'border-danger/30 bg-danger-soft/20 text-danger',
}

const ISSUE_LABELS: Record<ReceivingIssueStatus, string> = {
  'awaiting-wallet': 'Chờ ví',
  pending: 'Đang chuyển',
  failed: 'Lỗi',
}

const ISSUE_CLASS: Record<ReceivingIssueStatus, string> = {
  'awaiting-wallet': 'border-warning/30 bg-warning/10 text-warning',
  pending: 'border-info/30 text-info',
  failed: 'border-danger/30 bg-danger-soft/20 text-danger',
}

const NOTE_MAX = 500

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function formatDateTime(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return `${pad(d.getHours())}:${pad(d.getMinutes())} ${pad(d.getDate())}/${pad(d.getMonth() + 1)}`
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`
}

export function ReceivingStatusPanel(): React.ReactElement {
  const status = useReceivingStatus()
  const [refreshing, setRefreshing] = React.useState(false)
  const [reporting, setReporting] = React.useState<ReceivingIssue | null>(null)
  const [note, setNote] = React.useState('')
  const report = useReportPayoutIssue()

  const data = status.data
  const accounts = data?.accounts ?? []
  const issues = data?.issues ?? []
  const counts = data?.counts ?? { awaitingWallet: 0, pending: 0, failed: 0 }
  const lastReceived = data?.lastReceived ?? null

  const handleRefresh = async (): Promise<void> => {
    setRefreshing(true)
    try {
      await status.refreshNow()
    } catch {
      appToast.error('Không thể kiểm tra lại, vui lòng thử lại.')
    } finally {
      setRefreshing(false)
    }
  }

  const closeDialog = (): void => {
    setReporting(null)
    setNote('')
  }

  const submitReport = (): void => {
    if (!reporting) return
    const trimmed = note.trim()
    report.mutate(
      {
        payoutId: reporting.payoutId,
        ...(trimmed ? { note: trimmed } : {}),
      },
      {
        onSuccess: () => {
          appToast.success('Đã báo cho sàn, quản trị viên sẽ kiểm tra.')
          closeDialog()
        },
        onError: error => appToast.error(describeWalletError(error)),
      }
    )
  }

  let health: { label: string; className: string } | null = null
  if (data) {
    if (!data.hasLinkedWallet) {
      health = {
        label: 'Chưa liên kết ví',
        className: 'border-border text-muted',
      }
    } else if (accounts.some(a => a.state !== 'active') || issues.length > 0) {
      health = {
        label: 'Cần chú ý',
        className: 'border-warning/30 bg-warning/10 text-warning',
      }
    } else {
      health = {
        label: 'Sẵn sàng nhận tiền',
        className: 'border-success/30 bg-success-soft/20 text-success',
      }
    }
  }

  return (
    <section
      aria-label="Trạng thái nhận tiền"
      className="space-y-4 rounded-xl border border-border p-4"
    >
      <header className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-base font-bold text-fg">
            Trạng thái nhận tiền
          </h3>
          {health ? (
            <Badge variant="outline" className={health.className}>
              {health.label}
            </Badge>
          ) : null}
        </div>
        <div className="flex items-center gap-3">
          {data?.checkedAt ? (
            <span className="text-xs text-muted">
              Kiểm tra lúc {formatDateTime(data.checkedAt)}
            </span>
          ) : null}
          <Button
            variant="outline"
            size="sm"
            onClick={() => void handleRefresh()}
            disabled={refreshing}
          >
            {refreshing ? (
              <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
            ) : (
              <RefreshCw className="mr-1 h-3.5 w-3.5" />
            )}
            Kiểm tra lại
          </Button>
        </div>
      </header>

      {status.isLoading ? (
        <div data-testid="receiving-status-skeleton" className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : null}

      {status.isError ? (
        <div role="alert" className="space-y-2 text-sm text-danger">
          <p>Không thể tải trạng thái nhận tiền.</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => void status.refetch()}
          >
            Thử lại
          </Button>
        </div>
      ) : null}

      {data ? (
        <>
          {accounts.length > 0 ? (
            <ul className="space-y-2">
              {accounts.map(account => (
                <li
                  key={`${account.brand}-${account.accountNumberMasked}`}
                  className="flex flex-col gap-1 rounded-lg border border-border p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <p className="text-sm text-fg">
                    {BRAND_LABELS[account.brand]} ·{' '}
                    {account.accountNumberMasked}
                    {account.accountHolder ? ` · ${account.accountHolder}` : ''}
                  </p>
                  <Badge
                    variant="outline"
                    className={STATE_CLASS[account.state]}
                    data-state={account.state}
                  >
                    {account.message}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : null}

          <p className="text-sm text-fg">
            {lastReceived ? (
              <>
                Lần nhận gần nhất: {formatVnd(lastReceived.amount)} ·{' '}
                {formatDate(lastReceived.paidOutAt)}
                {lastReceived.reference ? ` · ${lastReceived.reference}` : ''}
              </>
            ) : (
              'Chưa nhận khoản nào'
            )}
          </p>

          <div className="flex flex-wrap gap-2 text-xs">
            <Badge variant="outline">Chờ ví: {counts.awaitingWallet}</Badge>
            <Badge variant="outline">Đang chuyển: {counts.pending}</Badge>
            <Badge variant="outline">Lỗi: {counts.failed}</Badge>
          </div>

          {issues.length > 0 ? (
            <ul className="space-y-2" aria-label="Khoản chưa nhận được">
              {issues.map(issue => (
                <li
                  key={issue.payoutId}
                  className="space-y-2 rounded-lg border border-border p-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-fg">
                      {formatVnd(issue.amount)} · {formatDate(issue.createdAt)}
                    </p>
                    <Badge
                      variant="outline"
                      className={ISSUE_CLASS[issue.status]}
                    >
                      {ISSUE_LABELS[issue.status]}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted">{issue.reason}</p>
                  {issue.reportedAt ? (
                    <Button variant="outline" size="sm" disabled>
                      Đã báo lúc {formatDateTime(issue.reportedAt)}
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setReporting(issue)}
                    >
                      Báo cho sàn
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          ) : null}
        </>
      ) : null}

      <Dialog
        open={!!reporting}
        onOpenChange={open => {
          if (!open) closeDialog()
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Báo cho sàn</DialogTitle>
            <DialogDescription>
              Quản trị viên sẽ kiểm tra khoản{' '}
              {reporting ? formatVnd(reporting.amount) : ''} này.
            </DialogDescription>
          </DialogHeader>
          <label className="space-y-1 text-sm text-fg">
            <span>Ghi chú (không bắt buộc)</span>
            <textarea
              value={note}
              maxLength={NOTE_MAX}
              onChange={e => setNote(e.target.value)}
              className="min-h-24 w-full rounded-md border border-border bg-white p-2 text-sm"
            />
            <span className="block text-right text-xs text-muted">
              {note.length}/{NOTE_MAX}
            </span>
          </label>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              Hủy
            </Button>
            <Button onClick={submitReport} disabled={report.isPending}>
              Gửi báo cáo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
