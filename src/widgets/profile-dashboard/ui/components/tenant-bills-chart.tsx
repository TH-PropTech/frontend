'use client'

import * as React from 'react'
import type { CostBreakdownItem } from '../../model/cost-breakdown'
import { Info } from 'lucide-react'

interface TenantBillsChartProps {
  breakdown?: CostBreakdownItem[]
}

const BAR_COLORS = ['#C65A3A', '#D08770', '#5E81AC', '#A3BE8C', '#88C0D0']

function fmtAmount(amount: number): string {
  if (amount >= 1_000_000) {
    const m = amount / 1_000_000
    return `${Number.isInteger(m) ? m : m.toFixed(1)}M`
  }
  if (amount >= 1_000) {
    const k = amount / 1_000
    return `${Number.isInteger(k) ? k : k.toFixed(0)}k`
  }
  return `${amount.toLocaleString('vi-VN')}`
}

export function TenantBillsChart({
  breakdown = [],
}: TenantBillsChartProps): React.ReactElement {
  if (breakdown.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-center p-6 text-muted">
        <Info className="h-6 w-6 text-subtle" />
        <p className="text-xs font-medium text-fg">
          Chưa có dữ liệu phân bổ chi phí hàng tháng
        </p>
        <p className="text-[11px] text-muted max-w-xs">
          Biểu đồ chi phí sẽ tự động xuất hiện khi hợp đồng hoặc các hóa đơn
          định kỳ phát sinh.
        </p>
      </div>
    )
  }

  const maxAmount = Math.max(...breakdown.map(b => b.amount), 1)
  const chartHeight = 110 // available bar height in SVG
  const baseY = 160
  const chartWidth = 400
  const barWidth = Math.min(
    50,
    Math.floor((chartWidth - 80) / breakdown.length) - 15
  )
  const spacing = Math.floor((chartWidth - 80) / breakdown.length)

  return (
    <svg className="w-full h-full max-w-lg" viewBox="0 0 400 200">
      {/* Grid lines */}
      <line x1="40" y1="20" x2="40" y2="160" stroke="#E5E9F0" strokeWidth="2" />
      <line
        x1="40"
        y1="160"
        x2="380"
        y2="160"
        stroke="#E5E9F0"
        strokeWidth="2"
      />
      <line
        x1="40"
        y1="55"
        x2="380"
        y2="55"
        stroke="#E5E9F0"
        strokeWidth="1"
        strokeDasharray="4"
      />
      <line
        x1="40"
        y1="90"
        x2="380"
        y2="90"
        stroke="#E5E9F0"
        strokeWidth="1"
        strokeDasharray="4"
      />
      <line
        x1="40"
        y1="125"
        x2="380"
        y2="125"
        stroke="#E5E9F0"
        strokeWidth="1"
        strokeDasharray="4"
      />

      {/* Y-axis labels */}
      <text
        x="32"
        y="58"
        textAnchor="end"
        fill="#A49389"
        className="text-[10px] font-mono"
      >
        {fmtAmount(maxAmount)}
      </text>
      <text
        x="32"
        y="93"
        textAnchor="end"
        fill="#A49389"
        className="text-[10px] font-mono"
      >
        {fmtAmount(maxAmount / 2)}
      </text>
      <text
        x="32"
        y="164"
        textAnchor="end"
        fill="#A49389"
        className="text-[10px] font-mono"
      >
        0
      </text>

      {/* Dynamic bars */}
      {breakdown.map((item, idx) => {
        const height = Math.max(
          6,
          Math.round((item.amount / maxAmount) * chartHeight)
        )
        const x = 55 + idx * spacing
        const y = baseY - height
        const color = BAR_COLORS[idx % BAR_COLORS.length]

        return (
          <g key={item.key}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={height}
              rx="4"
              fill={color}
              className="hover:opacity-90 transition-opacity cursor-pointer"
            >
              <title>{`${item.label}: ${item.amount.toLocaleString('vi-VN')} VND`}</title>
            </rect>
            <text
              x={x + barWidth / 2}
              y={y - 8}
              textAnchor="middle"
              fill={color}
              className="text-[10px] font-bold"
            >
              {fmtAmount(item.amount)}
            </text>
            <text
              x={x + barWidth / 2}
              y="180"
              textAnchor="middle"
              fill="#2E3440"
              className="text-[10px] font-semibold"
            >
              {item.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
