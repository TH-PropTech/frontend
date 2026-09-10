'use client'

import * as React from 'react'
import { BellRing, RefreshCw } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  getOverduePayments,
  processPaymentReminders,
  type PaymentItem,
} from '../api/payments-api'

export function OverdueRemindersPanel(): React.ReactElement {
  const [items, setItems] = React.useState<PaymentItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [processing, setProcessing] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [result, setResult] = React.useState<{
    overdue: number
    reminders: number
  } | null>(null)

  const refresh = React.useCallback(async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      setItems(await getOverduePayments())
    } catch (refreshError) {
      setError(
        refreshError instanceof Error
          ? refreshError.message
          : 'Không tải được hóa đơn quá hạn.'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    const scheduleRefresh = window.setTimeout(() => {
      void refresh()
    }, 0)

    return () => window.clearTimeout(scheduleRefresh)
  }, [refresh])

  const process = async (): Promise<void> => {
    setProcessing(true)
    setError(null)
    try {
      setResult(await processPaymentReminders())
      await refresh()
    } catch (processError) {
      setError(
        processError instanceof Error
          ? processError.message
          : 'Không xử lý được nhắc hạn.'
      )
    } finally {
      setProcessing(false)
    }
  }

  return (
    <section className="space-y-3 rounded-2xl border border-border bg-surface p-5">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-fg">Quá hạn & nhắc thanh toán</h3>
          <p className="text-xs text-muted">
            Mỗi hóa đơn chỉ nhận một nhắc cho mỗi ngày Việt Nam.
          </p>
        </div>
        <BellRing className="h-4 w-4 text-warning" />
      </header>
      {loading ? <p className="text-sm text-muted">Đang tải…</p> : null}
      {!loading && items.length === 0 ? (
        <p className="text-sm text-muted">Không có hóa đơn quá hạn.</p>
      ) : null}
      {!loading && items.length > 0 ? (
        <ul className="space-y-2">
          {items.map(item => (
            <li
              key={item._id}
              className="rounded-xl border border-border p-3 text-sm text-fg"
            >
              {item.description} · {item.amount.toLocaleString('vi-VN')} đ
            </li>
          ))}
        </ul>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => void refresh()}
        >
          <RefreshCw className="h-4 w-4" /> Làm mới
        </Button>
        <Button
          type="button"
          size="sm"
          loading={processing}
          onClick={() => void process()}
        >
          Chạy nhắc hạn
        </Button>
      </div>
      {result ? (
        <p className="text-xs text-info">
          Đã rà {result.overdue} hóa đơn, gửi {result.reminders} nhắc.
        </p>
      ) : null}
      {error ? <p className="text-sm text-danger">{error}</p> : null}
    </section>
  )
}
