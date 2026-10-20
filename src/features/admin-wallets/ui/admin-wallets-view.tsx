'use client'

import * as React from 'react'
import {
  getLandlordWallets,
  type LandlordWalletItem,
} from '../api/admin-wallets-api'
import { AdminCard } from '@/shared/ui/admin-card'

export function AdminWalletsView(): React.ReactElement {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-fg font-marketing">
          Ví & Liên kết thanh toán
        </h2>
        <p className="text-xs text-muted mt-1">
          Theo dõi chủ nhà đã/chưa liên kết ví nhận tiền.
        </p>
      </div>

      <LandlordWalletsTab />
    </div>
  )
}

function LandlordWalletsTab(): React.ReactElement {
  const [items, setItems] = React.useState<LandlordWalletItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const load = React.useCallback(async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const page = await getLandlordWallets(1, 50)
      setItems(page.items)
    } catch (cause: unknown) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Không thể tải danh sách ví chủ nhà.'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      void load()
    }, 0)
    return () => window.clearTimeout(timer)
  }, [load])

  if (loading) return <p className="text-sm text-muted">Đang tải...</p>
  if (error) return <p className="text-sm text-red-600">{error}</p>
  if (!items.length)
    return <p className="text-sm text-muted">Chưa có chủ nhà nào.</p>

  const linkedCount = items.filter(i => i.wallet.status === 'linked').length

  return (
    <div className="space-y-3">
      <p className="text-xs text-subtle">
        {linkedCount}/{items.length} chủ nhà đã liên kết ví
      </p>
      <AdminCard className="divide-y divide-line/60">
        {items.map(item => (
          <div
            key={item.userId}
            className="p-4 flex flex-wrap items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <strong className="block truncate text-sm">{item.name}</strong>
              <div className="text-xs muted truncate">{item.email}</div>
            </div>
            <div className="text-right text-xs">
              {item.wallet.status === 'linked' ? (
                <>
                  <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    Đã liên kết
                  </span>
                  <div className="text-subtle mt-1">
                    {item.wallet.bank?.name} · {item.wallet.accountNumberMasked}
                  </div>
                </>
              ) : (
                <span className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">
                  Chưa liên kết
                </span>
              )}
            </div>
          </div>
        ))}
      </AdminCard>
    </div>
  )
}
