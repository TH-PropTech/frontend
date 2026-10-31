'use client'

import * as React from 'react'
import {
  getLandlordWallets,
  type LandlordWalletItem,
} from '../api/admin-wallets-api'
import { AdminCard } from '@/shared/ui/admin-card'
import { AdminErrorState } from '@/shared/ui/admin-error-state'
import { Button } from '@/shared/ui/button'

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
  const [page, setPage] = React.useState(1)
  const [total, setTotal] = React.useState(0)
  const limit = 20

  const load = React.useCallback(
    async (targetPage = page): Promise<void> => {
      setLoading(true)
      setError(null)
      try {
        const res = await getLandlordWallets(targetPage, limit)
        setItems(res.items)
        setTotal(res.total)
      } catch (cause: unknown) {
        setError(
          cause instanceof Error
            ? cause.message
            : 'Không thể tải danh sách ví chủ nhà.'
        )
      } finally {
        setLoading(false)
      }
    },
    [page, limit]
  )

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      void load(page)
    }, 0)
    return () => window.clearTimeout(timer)
  }, [load, page])

  const totalPages = Math.ceil(total / limit)

  if (loading) return <p className="text-sm text-muted">Đang tải...</p>
  if (error)
    return (
      <AdminErrorState
        title="Lỗi tải danh sách ví"
        message={error}
        onRetry={() => void load(page)}
      />
    )
  if (!items.length)
    return <p className="text-sm text-muted">Chưa có chủ nhà nào.</p>

  const linkedCount = items.filter(i => i.wallet.status === 'linked').length

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-muted">
        <p>
          {linkedCount}/{items.length} chủ nhà trong trang đã liên kết ví
          {total > items.length && ` (Tổng: ${total})`}
        </p>
      </div>
      <AdminCard className="divide-y divide-line/60">
        {items.map(item => (
          <div
            key={item.userId}
            className="p-4 flex flex-wrap items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <strong className="block truncate text-sm">{item.name}</strong>
              <div className="text-xs text-muted truncate">{item.email}</div>
            </div>
            <div className="text-right text-xs">
              {item.wallet.status === 'linked' ? (
                <>
                  <span className="inline-block px-2 py-0.5 rounded bg-success/10 text-success font-bold text-[10px]">
                    Đã liên kết
                  </span>
                  <div className="text-muted mt-1">
                    {item.wallet.bank?.name} · {item.wallet.accountNumberMasked}
                  </div>
                </>
              ) : (
                <span className="inline-block px-2 py-0.5 rounded bg-warning/10 text-warning font-bold text-[10px]">
                  Chưa liên kết
                </span>
              )}
            </div>
          </div>
        ))}
      </AdminCard>

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-muted">
            Trang {page} / {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
            >
              Trước
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            >
              Sau
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
