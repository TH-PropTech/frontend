'use client'

import { useQuery } from '@tanstack/react-query'
import { BarChart3, CircleAlert, RotateCcw } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  getPriceBenchmark,
  type PriceBenchmarkCriteria,
  type PriceBenchmarkResult,
} from '../api/price-benchmark-api'

const CLASSIFICATION_LABELS: Record<
  PriceBenchmarkResult['classification'],
  string
> = {
  below_market: 'Thấp hơn khoảng thị trường',
  fair_range: 'Trong khoảng thị trường',
  above_market: 'Cao hơn khoảng thị trường',
  not_enough_data: 'Chưa đủ dữ liệu so sánh',
}

const CONFIDENCE_LABELS: Record<PriceBenchmarkResult['confidence'], string> = {
  low: 'Độ tin cậy thấp',
  medium: 'Độ tin cậy trung bình',
  high: 'Độ tin cậy cao',
  insufficient: 'Chưa thể đánh giá độ tin cậy',
}

const currency = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
})

export function PriceBenchmarkCard({
  criteria,
}: {
  criteria: PriceBenchmarkCriteria
}): React.ReactElement {
  const benchmark = useQuery({
    queryKey: ['price-benchmark', criteria],
    queryFn: () => getPriceBenchmark(criteria),
    enabled: Boolean(criteria.district) && criteria.priceMonthly > 0,
  })

  if (benchmark.isLoading)
    return <div className="h-36 animate-pulse rounded-3xl bg-surface-muted" />
  if (benchmark.isError || !benchmark.data) {
    return (
      <div className="rounded-3xl border border-danger/30 bg-danger/10 p-6">
        <p className="text-sm font-semibold text-danger">
          Không tải được benchmark giá.
        </p>
        <Button
          className="mt-3"
          size="sm"
          variant="outline"
          onClick={() => benchmark.refetch()}
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Thử lại
        </Button>
      </div>
    )
  }

  const data = benchmark.data
  return (
    <section
      className="rounded-3xl border border-border bg-surface p-6 shadow-sm"
      aria-labelledby="benchmark-title"
    >
      <div className="flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-primary" aria-hidden="true" />
        <h3 id="benchmark-title" className="text-base font-bold text-fg">
          So sánh giá thuê
        </h3>
      </div>
      <p className="mt-3 text-sm font-semibold text-fg">
        {CLASSIFICATION_LABELS[data.classification]}
      </p>
      <p className="mt-1 text-xs text-muted">
        {data.sampleCount} tin phù hợp · {CONFIDENCE_LABELS[data.confidence]}
      </p>
      {data.range ? (
        <div className="mt-4 rounded-2xl bg-surface-muted p-4">
          <p className="text-xs text-muted">
            Khoảng P25–P75 sau khi loại ngoại lệ
          </p>
          <p className="mt-1 text-sm font-bold text-fg">
            {currency.format(data.range.min)} –{' '}
            {currency.format(data.range.max)}
          </p>
          <p className="mt-1 text-xs text-subtle">
            Trung vị {data.median === null ? '—' : currency.format(data.median)}
          </p>
        </div>
      ) : (
        <p className="mt-4 flex items-start gap-2 rounded-2xl bg-surface-muted p-4 text-xs text-muted">
          <CircleAlert
            className="h-4 w-4 shrink-0 text-warning"
            aria-hidden="true"
          />
          Cần ít nhất 5 tin sau khi loại ngoại lệ để hiển thị khoảng giá.
        </p>
      )}
    </section>
  )
}
