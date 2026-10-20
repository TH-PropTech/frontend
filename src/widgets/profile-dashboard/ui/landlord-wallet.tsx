'use client'

import { useState } from 'react'
import { Landmark, Wallet as WalletIcon } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useWallet, type WalletBrand } from '@/entities/wallet'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { WalletLinkForm } from './wallet-link-form'
import { ReceivingStatusPanel } from './receiving-status-panel'
import { WalletInvoices, WalletStatement } from './wallet-statement'
import { useCan } from '@/shared/lib/permissions'

const BRAND_LABELS: Record<WalletBrand, string> = {
  mocbank: 'Ví Mộc',
  momo: 'Momo',
  zalopay: 'ZaloPay',
}

export function LandlordWallet(): React.ReactElement {
  const can = useCan()
  const canLink = can('create', 'Wallet')
  const wallet = useWallet()
  const [editing, setEditing] = useState(false)
  const [adding, setAdding] = useState(false)
  const data = wallet.data
  const linked = data?.status === 'linked'
  const extraAccounts = data?.extraAccounts ?? []

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
              Tiền thuê khách trả được chuyển thẳng tới tài khoản ngân hàng liên
              kết. Phí sàn được trả qua cổng thanh toán, sàn không giữ số dư.
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
        canLink ? (
          <WalletLinkForm onLinked={() => setEditing(false)} />
        ) : (
          <p role="status" className="text-sm text-muted">
            Bạn chưa được cấp quyền liên kết ví. Vui lòng liên hệ quản trị viên.
          </p>
        )
      ) : null}

      {data && linked ? (
        <>
          <div className="flex flex-col gap-3 rounded-xl border border-border p-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm text-fg">
              <Landmark className="h-4 w-4 text-primary" aria-hidden="true" />
              {data.bank?.name} · {data.accountNumberMasked} ·{' '}
              {data.accountHolder}
            </p>
            {!editing && canLink ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditing(true)}
              >
                Đổi ví
              </Button>
            ) : null}
          </div>
          {data.accountNumber ? (
            <div className="flex flex-col items-center gap-2 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-center">
              <QRCodeSVG value={data.accountNumber} size={112} />
              <div className="text-center sm:text-left">
                <p className="text-xs text-muted">
                  Khách/đối tác quét mã để chuyển vào ví này
                </p>
                <p className="font-mono text-sm font-bold text-fg">
                  {data.accountNumber}
                </p>
              </div>
            </div>
          ) : null}
          <p className="text-xs text-muted">
            Tài khoản mô phỏng trong Ví Mộc — dùng để minh chứng ví nhận tiền
            của chủ nhà.
          </p>
          {extraAccounts.map(account => (
            <div
              key={account.brand}
              data-testid={`wallet-extra-${account.brand}`}
              className="space-y-3 rounded-xl border border-border p-3"
            >
              <p className="flex items-center gap-2 text-sm text-fg">
                <Landmark className="h-4 w-4 text-primary" aria-hidden="true" />
                {BRAND_LABELS[account.brand]} · {account.accountNumberMasked} ·{' '}
                {account.accountHolder}
              </p>
              {account.accountNumber ? (
                <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
                  <QRCodeSVG value={account.accountNumber} size={96} />
                  <p className="font-mono text-sm font-bold text-fg">
                    {account.accountNumber}
                  </p>
                </div>
              ) : null}
            </div>
          ))}
          {adding ? (
            <div className="space-y-2 rounded-xl border border-border p-3">
              <WalletLinkForm
                defaultBrand="momo"
                onLinked={() => setAdding(false)}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAdding(false)}
              >
                Hủy
              </Button>
            </div>
          ) : canLink ? (
            <Button variant="outline" size="sm" onClick={() => setAdding(true)}>
              Thêm ví khác
            </Button>
          ) : null}
          <ReceivingStatusPanel />
          <WalletInvoices />
          <WalletStatement />
        </>
      ) : null}
    </Card>
  )
}
