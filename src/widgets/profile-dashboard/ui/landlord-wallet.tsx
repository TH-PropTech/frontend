'use client'

import { useState } from 'react'
import { Landmark, Wallet as WalletIcon } from 'lucide-react'
import { useWallet } from '@/entities/wallet'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { formatVnd } from './wallet-error'
import { WalletLinkForm } from './wallet-link-form'
import { WalletInvoices, WalletStatement } from './wallet-statement'

function Stat({
  label,
  value,
}: {
  label: string
  value: string
}): React.ReactElement {
  return (
    <div className="rounded-xl border border-border bg-surface-raised p-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="font-display text-base font-bold text-fg">{value}</p>
    </div>
  )
}

export function LandlordWallet(): React.ReactElement {
  const wallet = useWallet()
  const [editing, setEditing] = useState(false)
  const data = wallet.data
  const linked = data?.status === 'linked'

  return (
    <Card className="space-y-5 border border-border bg-surface p-6 shadow-sm">
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span
            className="rounded-xl bg-primary-soft p-2 text-primary"
            aria-hidden="true"
          >
            <WalletIcon className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-lg font-bold text-fg">
              Ví nhận tiền
            </h2>
            <p className="text-sm text-muted">
              Tiền thuê khách trả được chuyển vào ví. Phí sàn được trừ từ số dư
              khi bạn thanh toán hóa đơn.
            </p>
          </div>
        </div>
        {data?.simulation ? <Badge variant="outline">Giả lập</Badge> : null}
      </header>

      {wallet.isLoading ? (
        <p className="text-sm text-muted" aria-live="polite">
          Đang tải ví…
        </p>
      ) : null}
      {wallet.isError ? (
        <p role="alert" className="text-sm text-danger">
          Không thể tải thông tin ví.
        </p>
      ) : null}

      {data && (!linked || editing) ? (
        <WalletLinkForm onLinked={() => setEditing(false)} />
      ) : null}

      {data && linked ? (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Stat label="Số dư khả dụng" value={formatVnd(data.balance)} />
            <Stat label="Tổng đã nhận" value={formatVnd(data.totalReceived)} />
            <Stat
              label="Phí sàn đã trả"
              value={formatVnd(data.totalFeesPaid)}
            />
          </div>
          <div className="flex items-center justify-between gap-3 rounded-xl border border-border p-3">
            <p className="flex items-center gap-2 text-sm text-fg">
              <Landmark className="h-4 w-4 text-primary" aria-hidden="true" />
              {data.bank?.name} · {data.accountNumberMasked} ·{' '}
              {data.accountHolder}
            </p>
            {!editing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditing(true)}
              >
                Đổi tài khoản
              </Button>
            ) : null}
          </div>
          <WalletInvoices balance={data.balance} />
          <WalletStatement />
        </>
      ) : null}
    </Card>
  )
}
