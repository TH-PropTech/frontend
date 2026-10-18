'use client'

import * as React from 'react'
import {
  getLandlordWallets,
  getPlatformWallet,
  type LandlordWalletItem,
  type PlatformEscrowWallet,
} from '../api/admin-wallets-api'

const money = (n: number): string =>
  new Intl.NumberFormat('vi-VN').format(n) + ' ₫'

type Tab = 'landlords' | 'platform'

export function AdminWalletsView(): React.ReactElement {
  const [tab, setTab] = React.useState<Tab>('landlords')

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-fg font-marketing">
          Ví & Liên kết thanh toán
        </h2>
        <p className="text-xs text-muted mt-1">
          Theo dõi chủ nhà đã/chưa liên kết ví nhận tiền và ví giải ngân ký quỹ
          của sàn tại Ví Mộc.
        </p>
      </div>

      <div className="flex gap-2 border-b border-line">
        <button
          type="button"
          onClick={() => setTab('landlords')}
          className={`px-3 py-2 text-sm font-semibold border-b-2 -mb-px ${
            tab === 'landlords'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted hover:text-fg'
          }`}
        >
          Ví chủ nhà
        </button>
        <button
          type="button"
          onClick={() => setTab('platform')}
          className={`px-3 py-2 text-sm font-semibold border-b-2 -mb-px ${
            tab === 'platform'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted hover:text-fg'
          }`}
        >
          Ví giải ngân sàn
        </button>
      </div>

      {tab === 'landlords' ? <LandlordWalletsTab /> : <PlatformWalletTab />}
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
      <div className="bg-surface border border-line rounded-xl divide-y divide-line/60">
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
      </div>
    </div>
  )
}

function PlatformWalletTab(): React.ReactElement {
  const [wallet, setWallet] = React.useState<PlatformEscrowWallet | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const load = React.useCallback(async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      setWallet(await getPlatformWallet())
    } catch (cause: unknown) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Không thể tải ví giải ngân của sàn. Có thể Ví Mộc chưa cấu hình (MOCBANK_MERCHANT_ID/SECRET).'
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
  if (!wallet) return <p className="text-sm text-muted">Không có dữ liệu.</p>

  return (
    <div className="bg-surface border border-line rounded-xl p-5 space-y-3 max-w-md">
      <div>
        <span className="text-[10px] font-bold text-muted uppercase tracking-wider">
          Số dư khả dụng
        </span>
        <p className="text-2xl font-bold text-fg">
          {money(wallet.availableBalance)}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-line/60">
        <div>
          <span className="text-muted block">Đang giữ (chưa settle)</span>
          <strong>{money(wallet.heldBalance)}</strong>
        </div>
        <div>
          <span className="text-muted block">Trạng thái</span>
          <strong>{wallet.status}</strong>
        </div>
        <div className="col-span-2">
          <span className="text-muted block">Số tài khoản ký quỹ</span>
          <strong className="font-mono">{wallet.accountNumber}</strong>
        </div>
      </div>
    </div>
  )
}
