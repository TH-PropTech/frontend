'use client'

import { CreditCard } from 'lucide-react'
import { useWallet } from '@/entities/wallet'
import { Button } from '@/shared/ui/button'

/** Ô ví ở đầu trang profile của chủ nhà: số liệu thật từ ví, không dùng dữ liệu mẫu. */
export function LandlordHeaderWallet({
  onManage,
}: {
  onManage: () => void
}): React.ReactElement {
  const wallet = useWallet()
  const data = wallet.data
  const linked = data?.status === 'linked'

  return (
    <div className="flex flex-col gap-3 md:items-end">
      {linked ? (
        <div className="min-w-[240px] space-y-1.5 rounded-2xl border border-border bg-surface-muted/40 p-3 text-left md:text-right">
          <div className="flex items-center gap-2 md:justify-end">
            <span className="inline-block h-2 w-2 rounded-full bg-success" />
            <span className="block truncate font-mono text-xs font-bold text-fg">
              {data.bank?.name} - {data.accountNumberMasked}
            </span>
          </div>
          <p className="text-[11px] text-muted">
            <strong className="text-fg">Đã liên kết nhận tiền</strong>
          </p>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xs text-muted">
          <CreditCard className="h-4 w-4 text-subtle" />
          <span>
            {wallet.isLoading
              ? 'Đang tải ví…'
              : 'Chưa liên kết tài khoản ngân hàng nhận tiền'}
          </span>
        </div>
      )}
      <Button
        onClick={onManage}
        variant={linked ? 'secondary' : 'primary'}
        className="flex h-9 items-center gap-1.5 self-start rounded-full px-5 text-xs font-bold shadow-sm md:self-end"
      >
        <CreditCard className="h-3.5 w-3.5" />
        {linked ? 'Quản lý ví' : 'Liên kết ngân hàng nhận tiền'}
      </Button>
    </div>
  )
}
