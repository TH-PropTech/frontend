'use client'

import * as React from 'react'

export interface TrendDataPoint {
  label: string
  bookings: number
  approved: number
}

interface BookingTrendLineChartProps {
  data: TrendDataPoint[]
  title?: string
}

export function BookingTrendLineChart({
  data,
  title = 'Xu hướng lịch hẹn',
}: BookingTrendLineChartProps): React.ReactElement {
  const [hovered, setHovered] = React.useState<number | null>(null)

  const W = 600
  const H = 200
  const PAD_LEFT = 40
  const PAD_RIGHT = 30
  const PAD_TOP = 25
  const PAD_BOTTOM = 35
  const chartW = W - PAD_LEFT - PAD_RIGHT
  const chartH = H - PAD_TOP - PAD_BOTTOM

  const maxVal = Math.max(...data.map(d => Math.max(d.bookings, d.approved)), 1)

  const toX = (i: number): number =>
    PAD_LEFT + (data.length > 1 ? (i / (data.length - 1)) * chartW : chartW / 2)
  const toY = (v: number): number => PAD_TOP + chartH - (v / maxVal) * chartH

  // Build SVG polyline paths
  const bookingsPath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(d.bookings)}`)
    .join(' ')
  const approvedPath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(d.approved)}`)
    .join(' ')

  // Area fill paths
  const bookingsArea =
    bookingsPath +
    ` L ${toX(data.length - 1)} ${PAD_TOP + chartH} L ${PAD_LEFT} ${PAD_TOP + chartH} Z`
  const approvedArea =
    approvedPath +
    ` L ${toX(data.length - 1)} ${PAD_TOP + chartH} L ${PAD_LEFT} ${PAD_TOP + chartH} Z`

  const yTicks = [0, Math.round(maxVal / 2), maxVal]

  return (
    <div className="bg-surface border border-border rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-xs font-bold text-fg font-body uppercase tracking-wider">
          {title}
        </h4>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-1 rounded"
              style={{ background: 'var(--primary)' }}
            />
            <span className="text-muted">Tổng lịch hẹn</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-1 rounded"
              style={{ background: 'var(--success)' }}
            />
            <span className="text-muted">Xác nhận</span>
          </span>
        </div>
      </div>
      <p className="text-[11px] text-muted mb-3 font-body">
        Diễn biến lịch hẹn đặt xem nhà theo thời gian.
      </p>

      {data.length === 0 ? (
        <div className="flex-1 min-h-[180px] flex items-center justify-center">
          <p className="text-xs text-muted font-body">Không có dữ liệu</p>
        </div>
      ) : (
        <div className="w-full h-48 sm:h-56 lg:h-64 flex items-center justify-center">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="grad-bookings" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--primary)"
                  stopOpacity="0.2"
                />
                <stop
                  offset="100%"
                  stopColor="var(--primary)"
                  stopOpacity="0"
                />
              </linearGradient>
              <linearGradient id="grad-approved" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--success)"
                  stopOpacity="0.2"
                />
                <stop
                  offset="100%"
                  stopColor="var(--success)"
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>

            {/* Y grid lines + labels */}
            {yTicks.map((tick, tickIdx) => {
              const y = toY(tick)
              return (
                <g key={`ytick-${tickIdx}`}>
                  <line
                    x1={PAD_LEFT}
                    y1={y}
                    x2={W - PAD_RIGHT}
                    y2={y}
                    stroke="var(--border)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={PAD_LEFT - 8}
                    y={y + 4}
                    textAnchor="end"
                    fontSize="10"
                    fill="var(--muted)"
                    fontFamily="var(--font-body)"
                  >
                    {tick}
                  </text>
                </g>
              )
            })}

            {/* Area fills */}
            <path d={bookingsArea} fill="url(#grad-bookings)" />
            <path d={approvedArea} fill="url(#grad-approved)" />

            {/* Lines */}
            <path
              d={bookingsPath}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={approvedPath}
              fill="none"
              stroke="var(--success)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points + hover */}
            {data.map((d, i) => {
              const x = toX(i)
              const yB = toY(d.bookings)
              const yA = toY(d.approved)
              const isHov = hovered === i

              return (
                <g key={d.label}>
                  {/* Hover area */}
                  <rect
                    x={x - 20}
                    y={PAD_TOP}
                    width={40}
                    height={chartH}
                    fill="transparent"
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className="cursor-pointer"
                  />
                  {/* Bookings dot */}
                  <circle
                    cx={x}
                    cy={yB}
                    r={isHov ? 6 : 4}
                    fill="var(--primary)"
                    stroke="var(--surface)"
                    strokeWidth="2"
                    className="transition-all duration-150"
                  />
                  {/* Approved dot */}
                  <circle
                    cx={x}
                    cy={yA}
                    r={isHov ? 6 : 4}
                    fill="var(--success)"
                    stroke="var(--surface)"
                    strokeWidth="2"
                    className="transition-all duration-150"
                  />
                  {/* Tooltip */}
                  {isHov && (
                    <g>
                      <rect
                        x={Math.min(
                          Math.max(x - 40, PAD_LEFT),
                          W - PAD_RIGHT - 80
                        )}
                        y={PAD_TOP - 5}
                        width={80}
                        height={40}
                        rx={6}
                        fill="var(--fg)"
                        opacity={0.95}
                      />
                      <text
                        x={
                          Math.min(
                            Math.max(x - 40, PAD_LEFT),
                            W - PAD_RIGHT - 80
                          ) + 40
                        }
                        y={PAD_TOP + 12}
                        textAnchor="middle"
                        fontSize="10"
                        fill="var(--on-control)"
                        fontFamily="var(--font-display)"
                        fontWeight="bold"
                      >
                        {d.bookings} hẹn
                      </text>
                      <text
                        x={
                          Math.min(
                            Math.max(x - 40, PAD_LEFT),
                            W - PAD_RIGHT - 80
                          ) + 40
                        }
                        y={PAD_TOP + 27}
                        textAnchor="middle"
                        fontSize="9"
                        fill="var(--on-control)"
                        fontFamily="var(--font-body)"
                      >
                        {d.approved} xác nhận
                      </text>
                    </g>
                  )}
                  {/* X label */}
                  <text
                    x={x}
                    y={H - 8}
                    textAnchor="middle"
                    fontSize="11"
                    fill={isHov ? 'var(--primary)' : 'var(--muted)'}
                    fontWeight={isHov ? 'bold' : '500'}
                    fontFamily="var(--font-body)"
                  >
                    {d.label}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      )}
    </div>
  )
}
