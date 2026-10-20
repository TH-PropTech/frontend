'use client'

import * as React from 'react'
import type { RevenuePoint } from '../../model/landlord-cashflow'

const compactVnd = (v: number): string =>
  v >= 1_000_000
    ? `${Math.round((v / 1_000_000) * 10) / 10}M`
    : v >= 1_000
      ? `${Math.round(v / 1_000)}K`
      : String(v)

/** Biểu đồ doanh thu ròng tích lũy theo tháng, vẽ từ dữ liệu backend. */
export function LandlordRevenueChart({
  series,
}: {
  series: RevenuePoint[]
}): React.ReactElement {
  const max = Math.max(0, ...series.map(p => p.value))
  if (max <= 0) {
    return (
      <p className="text-xs text-muted">
        Chưa có doanh thu nào được chuyển về tài khoản của bạn.
      </p>
    )
  }
  const top = max * 1.15
  const y = (v: number): number => 160 - (v / top) * 120
  const xs = series.map(
    (_, i) => 65 + (300 / Math.max(1, series.length - 1)) * i
  )
  const ys = series.map(p => y(p.value))
  const line = xs.map((x, i) => `${i ? 'L' : 'M'} ${x} ${ys[i]}`).join(' ')

  return (
    <svg className="w-full h-full max-w-lg" viewBox="0 0 400 200">
      <line x1="45" y1="20" x2="45" y2="160" stroke="#E5E9F0" strokeWidth="2" />
      <line
        x1="45"
        y1="160"
        x2="380"
        y2="160"
        stroke="#E5E9F0"
        strokeWidth="2"
      />
      {[0.5, 1].map(f => (
        <g key={f}>
          <line
            x1="45"
            x2="380"
            y1={y(max * f)}
            y2={y(max * f)}
            stroke="#E5E9F0"
            strokeDasharray="4"
          />
          <text
            x="35"
            y={y(max * f) + 5}
            textAnchor="end"
            fill="#A49389"
            className="text-[9px] font-mono"
          >
            {compactVnd(max * f)}
          </text>
        </g>
      ))}
      <text
        x="35"
        y="165"
        textAnchor="end"
        fill="#A49389"
        className="text-[9px] font-mono"
      >
        0
      </text>
      <path
        d={`${line} L ${xs[xs.length - 1]} 160 L ${xs[0]} 160 Z`}
        fill="rgba(198, 90, 58, 0.1)"
      />
      <path d={line} fill="none" stroke="#C65A3A" strokeWidth="3" />
      {series.map((p, i) => (
        <g key={p.label}>
          <circle cx={xs[i]} cy={ys[i]} r="4" fill="#C65A3A" />
          <text
            x={xs[i]}
            y={(ys[i] ?? 0) - 10}
            textAnchor="middle"
            fill="#C65A3A"
            className="text-[9px] font-bold"
          >
            {compactVnd(p.value)}
          </text>
          <text
            x={xs[i]}
            y="178"
            textAnchor="middle"
            fill="#A49389"
            className="text-[9px] font-mono"
          >
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
