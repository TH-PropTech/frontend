'use client'

import * as React from 'react'
import { AdminCard } from '@/shared/ui/admin-card'

export interface StatusSlice {
  label: string
  value: number
  color: string
  softColor: string
}

interface BookingStatusDoughnutProps {
  data: StatusSlice[]
  title?: string
}

export function BookingStatusDoughnut({
  data,
  title = 'Tỷ lệ trạng thái',
}: BookingStatusDoughnutProps): React.ReactElement {
  const [hovered, setHovered] = React.useState<number | null>(null)

  const total = data.reduce((s, d) => s + d.value, 0)

  // Build SVG arcs
  const SIZE = 150
  const STROKE = 24
  const R = (SIZE - STROKE) / 2
  const C = SIZE / 2

  const arcs: { d: string; color: string; slice: StatusSlice; idx: number }[] =
    []
  let cumulative = 0

  for (let i = 0; i < data.length; i++) {
    const slice = data[i]
    if (!slice || slice.value === 0) continue
    const fraction = total > 0 ? slice.value / total : 0
    const startAngle = (cumulative / (total || 1)) * 360 - 90
    const endAngle = ((cumulative + slice.value) / (total || 1)) * 360 - 90
    const start = polarToCartesian(C, C, R, startAngle)
    const end = polarToCartesian(C, C, R, endAngle)
    const largeArc = endAngle - startAngle > 180 ? 1 : 0
    const d = `M ${start.x} ${start.y} A ${R} ${R} 0 ${largeArc} 1 ${end.x} ${end.y}`
    arcs.push({ d, color: slice.color, slice, idx: i })
    cumulative += slice.value
    void fraction
  }

  return (
    <AdminCard className="p-5 sm:p-6 flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-fg font-body uppercase tracking-wider mb-1">
          {title}
        </h4>
        <p className="text-[11px] text-muted mb-4 font-body">
          Phân bổ lịch hẹn theo trạng thái nghiệp vụ.
        </p>
      </div>

      {total === 0 ? (
        <div className="flex-1 min-h-[160px] flex items-center justify-center">
          <p className="text-xs text-muted font-body">Không có dữ liệu</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
          {/* SVG Doughnut */}
          <div className="relative shrink-0">
            <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
              {/* Background track */}
              <circle
                cx={C}
                cy={C}
                r={R}
                fill="none"
                stroke="var(--border)"
                strokeWidth={STROKE}
              />
              {arcs.map(arc => (
                <path
                  key={arc.idx}
                  d={arc.d}
                  fill="none"
                  stroke={arc.color}
                  strokeWidth={hovered === arc.idx ? STROKE + 4 : STROKE}
                  strokeLinecap="round"
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => setHovered(arc.idx)}
                  onMouseLeave={() => setHovered(null)}
                />
              ))}
              {/* Center label */}
              <text
                x={C}
                y={C - 2}
                textAnchor="middle"
                fontSize="22"
                fontWeight="bold"
                fill="var(--fg)"
                fontFamily="var(--font-display)"
              >
                {hovered !== null ? (data[hovered]?.value ?? total) : total}
              </text>
              <text
                x={C}
                y={C + 16}
                textAnchor="middle"
                fontSize="10"
                fill="var(--muted)"
                fontFamily="var(--font-body)"
                fontWeight="600"
              >
                {hovered !== null ? (data[hovered]?.label ?? 'tổng') : 'tổng'}
              </text>
            </svg>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-2.5 min-w-0 w-full sm:w-auto">
            {data.map((slice, i) => {
              const pct =
                total > 0 ? Math.round((slice.value / total) * 100) : 0
              return (
                <div
                  key={slice.label}
                  className="flex items-center gap-2 cursor-pointer group text-xs"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-sm shrink-0 transition-transform group-hover:scale-125"
                    style={{ background: slice.color }}
                  />
                  <span
                    className={`font-semibold font-body transition-colors ${hovered === i ? 'text-fg font-bold' : 'text-muted'}`}
                  >
                    {slice.label}
                  </span>
                  <span
                    className="ml-auto font-bold font-display pl-2"
                    style={{ color: slice.color }}
                  >
                    {pct}%
                  </span>
                  <span className="text-[11px] text-muted">
                    ({slice.value})
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </AdminCard>
  )
}

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number
): { x: number; y: number } {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  }
}
