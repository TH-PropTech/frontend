'use client'

import * as React from 'react'
import type { ApartmentItem } from '@/entities/properties'
import {
  buildEstimatedCost,
  buildPackageCost,
  type CostSegment,
  type InitialCost,
} from '../../lib/initial-cost'

interface CostBreakdownPanelProps {
  property: ApartmentItem
  /** Giá thuê/tháng (VND) từ tin đăng, dùng khi tin không có gói thuê. */
  monthlyRent: number
  formatCurrency: (val: number) => string
  onExplain: (data: {
    title: string
    description: string
    formula?: string
    visualExample?: string
    steps?: string[]
  }) => void
}

const SEGMENT_COLOR: Record<CostSegment['key'], string> = {
  holding: 'bg-warning',
  security: 'bg-primary',
  deposit: 'bg-primary',
  prepaid: 'bg-success',
}

export function CostBreakdownPanel({
  property,
  monthlyRent,
  formatCurrency,
  onExplain,
}: CostBreakdownPanelProps): React.ReactElement {
  const packages = React.useMemo(
    () =>
      (property.rentalPackages ?? [])
        .filter(pkg => pkg.status === 'active')
        .sort((a, b) => a.durationMonths - b.durationMonths),
    [property.rentalPackages]
  )
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const selected =
    packages.find(pkg => pkg.packageId === selectedId) ?? packages[0] ?? null

  const cost: InitialCost = selected
    ? buildPackageCost(selected)
    : buildEstimatedCost(monthlyRent)

  const explain = (): void =>
    onExplain({
      title: 'Cách tính chi phí ban đầu',
      description: cost.estimated
        ? 'Tin này chưa có gói thuê nên hệ thống ước tính từ giá niêm yết: cọc 2 tháng và tiền thuê tháng đầu. Số thật sẽ chốt khi chọn gói và ký hợp đồng.'
        : 'Số tiền lấy trực tiếp từ gói thuê chủ nhà thiết lập: cọc (gồm cọc giữ chỗ và phần cọc bổ sung) cộng tiền thuê trả trước theo chính sách của gói. Khoản cọc được hoàn trả khi chấm dứt hợp đồng theo điều khoản.',
      visualExample: cost.segments
        .map(segment => `${segment.label}: ${formatCurrency(segment.amount)}`)
        .join(' · ')
        .concat(` → Tổng: ${formatCurrency(cost.total)}`),
      steps: cost.segments.map(
        segment => `${segment.label}: ${formatCurrency(segment.amount)}`
      ),
    })

  return (
    <div className="bg-white border border-border rounded-3xl p-4 md:p-5 shadow-sm space-y-4">
      <h3 className="font-marketing text-xl font-bold text-fg flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-left">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          Phân bổ chi phí ban đầu khi ký hợp đồng
        </div>
        <button
          onClick={explain}
          className="text-muted-foreground hover:text-primary transition-colors cursor-pointer p-1"
          title="Xem giải thích cách tính"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="12" cy="8.2" r="1.2" fill="currentColor" />
            <line
              x1="12"
              y1="11.5"
              x2="12"
              y2="16.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </h3>
      <p className="font-body text-sm text-muted-foreground font-medium leading-relaxed text-left">
        {cost.estimated
          ? 'Ước tính từ giá niêm yết vì tin chưa có gói thuê.'
          : 'Nguồn tiền cần chuẩn bị ban đầu theo gói thuê đã chọn; khoản cọc được hoàn trả khi chấm dứt hợp đồng.'}
      </p>

      {packages.length > 1 && (
        <div
          role="radiogroup"
          aria-label="Chọn gói thuê"
          className="flex flex-wrap gap-2"
        >
          {packages.map(pkg => {
            const active = pkg.packageId === selected?.packageId
            return (
              <button
                key={pkg.packageId}
                role="radio"
                aria-checked={active}
                onClick={() => setSelectedId(pkg.packageId)}
                className={`rounded-full border px-3 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
                  active
                    ? 'border-primary bg-primary text-white'
                    : 'border-border bg-white text-fg hover:border-primary/50'
                }`}
              >
                {pkg.durationMonths} tháng
              </button>
            )
          })}
        </div>
      )}

      <div className="border border-border rounded-2xl p-6 bg-surface-muted/20 gap-6 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:flex-1 gap-5 flex flex-col">
          <div className="h-6 w-full rounded-full border border-border bg-white overflow-hidden flex shadow-inner">
            {cost.segments.map(segment => (
              <div
                key={segment.key}
                style={{ width: `${(segment.amount / cost.total) * 100}%` }}
                className={`h-full ${SEGMENT_COLOR[segment.key]}`}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-2 text-left">
            {cost.segments.map(segment => (
              <div
                key={segment.key}
                className="flex items-center gap-3 bg-white border border-border/60 rounded-2xl p-3.5 shadow-sm"
              >
                <span
                  className={`h-3.5 w-3.5 rounded-full shrink-0 ${SEGMENT_COLOR[segment.key]}`}
                />
                <div className="flex-1 min-w-0">
                  <span className="font-body text-[11px] font-bold text-muted-foreground block uppercase">
                    {segment.label}
                  </span>
                  <span className="font-mono text-sm text-fg font-extrabold block mt-0.5">
                    {formatCurrency(segment.amount)} (
                    {Math.round((segment.amount / cost.total) * 100)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-auto lg:min-w-[240px] border-t lg:border-t-0 lg:border-l border-border pt-5 lg:pt-0 lg:pl-8 flex flex-col justify-center text-left">
          <span className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider block">
            Tổng chi phí thanh toán ban đầu
          </span>
          <span className="text-3xl font-display font-black text-primary mt-1.5">
            {formatCurrency(cost.total)}
          </span>
        </div>
      </div>
    </div>
  )
}
