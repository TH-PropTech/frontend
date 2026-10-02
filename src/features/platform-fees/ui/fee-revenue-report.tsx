'use client'

import * as React from 'react'
import { RefreshCw } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  getPlatformFeeRevenue,
  type PlatformFeeRevenue,
} from '../api/platform-fees-api'

function formatVnd(amount: number): string {
  return `${new Intl.NumberFormat('vi-VN').format(amount)} ₫`
}

export interface FeeRevenueReportProps {
  initialData?: PlatformFeeRevenue | null
}

export function FeeRevenueReport({
  initialData = null,
}: FeeRevenueReportProps): React.ReactElement {
  const [data, setData] = React.useState<PlatformFeeRevenue | null>(initialData)
  const [loading, setLoading] = React.useState(initialData === null)
  const [error, setError] = React.useState<string | null>(null)

  const load = React.useCallback(async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      setData(await getPlatformFeeRevenue())
    } catch (cause: unknown) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Không thể tải báo cáo doanh thu.'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    if (initialData !== null) return
    let active = true
    const fetchRevenue = async (): Promise<void> => {
      try {
        const next = await getPlatformFeeRevenue()
        if (active) setData(next)
      } catch (cause: unknown) {
        if (active) {
          setError(
            cause instanceof Error
              ? cause.message
              : 'Không thể tải báo cáo doanh thu.'
          )
        }
      } finally {
        if (active) setLoading(false)
      }
    }
    void fetchRevenue()
    return () => {
      active = false
    }
  }, [initialData])

  return (
    <section
      data-testid="fee-revenue-report"
      className="space-y-4 rounded-xl border border-line bg-surface p-5"
    >
      <header className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-fg">
            Doanh thu phí nền tảng
          </h2>
          <p className="mt-1 text-xs text-muted">
            Chỉ Staff/Admin mới xem được tổng hợp hóa đơn.
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          loading={loading}
          onClick={() => void load()}
          aria-label="Làm mới báo cáo doanh thu"
        >
          <RefreshCw className="h-4 w-4" />
          Làm mới
        </Button>
      </header>

      {error ? (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}
      {loading && !data ? (
        <p role="status" className="text-sm text-muted">
          Đang tải báo cáo...
        </p>
      ) : data ? (
        <dl className="grid gap-3 sm:grid-cols-4">
          <div className="rounded-lg border border-line bg-surface-muted/30 p-3">
            <dt className="text-xs text-muted">Đã thu</dt>
            <dd className="mt-1 font-semibold text-success">
              {formatVnd(data.paid)}
            </dd>
          </div>
          <div className="rounded-lg border border-line bg-surface-muted/30 p-3">
            <dt className="text-xs text-muted">Chưa thu</dt>
            <dd className="mt-1 font-semibold text-warning">
              {formatVnd(data.unpaid)}
            </dd>
          </div>
          <div className="rounded-lg border border-line bg-surface-muted/30 p-3">
            <dt className="text-xs text-muted">Đã miễn</dt>
            <dd className="mt-1 font-semibold text-muted">
              {formatVnd(data.waived)}
            </dd>
          </div>
          <div className="rounded-lg border border-line bg-surface-muted/30 p-3">
            <dt className="text-xs text-muted">Số hóa đơn</dt>
            <dd className="mt-1 font-semibold text-fg">{data.invoices}</dd>
          </div>
        </dl>
      ) : (
        <p role="status" className="text-sm text-muted">
          Chưa có dữ liệu doanh thu.
        </p>
      )}
    </section>
  )
}
