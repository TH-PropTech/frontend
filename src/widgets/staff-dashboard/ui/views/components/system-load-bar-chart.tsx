'use client'

import * as React from 'react'

export function SystemLoadBarChart(): React.ReactElement {
  const [hoveredBar, setHoveredBar] = React.useState<number | null>(null)

  const barChartData = [
    { hour: '04h', transactions: 12, height: 35 },
    { hour: '08h', transactions: 24, height: 70 },
    { hour: '12h', transactions: 32, height: 95 },
    { hour: '16h', transactions: 18, height: 55 },
    { hour: '20h', transactions: 29, height: 85 },
    { hour: '24h', transactions: 15, height: 45 },
  ]

  return (
    <div className="bg-surface border border-line rounded-xl p-5 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-bold text-fg font-body uppercase tracking-wider">
            Tải lượng & Giao dịch mạng
          </h4>
          <span className="text-[9px] font-bold text-muted bg-fg/5 px-2 py-0.5 rounded border border-line">
            24 giờ qua
          </span>
        </div>
        <p className="text-[11px] text-muted mt-1">
          Cường độ giao dịch qua Smart Contract theo giờ.
        </p>
      </div>

      <div className="relative mt-4 min-h-[160px] flex items-center justify-center">
        <svg
          className="w-full h-full max-h-[160px]"
          viewBox="0 0 320 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bar-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="#e37253" />
            </linearGradient>
          </defs>
          <line
            x1="30"
            y1="35"
            x2="290"
            y2="35"
            stroke="var(--line)"
            strokeWidth="0.5"
            strokeDasharray="4,4"
          />
          <line
            x1="30"
            y1="85"
            x2="290"
            y2="85"
            stroke="var(--line)"
            strokeWidth="0.5"
            strokeDasharray="4,4"
          />
          <line
            x1="30"
            y1="135"
            x2="290"
            y2="135"
            stroke="var(--line)"
            strokeWidth="1"
          />

          {/* Bars rendering */}
          {barChartData.map((bar, idx) => {
            const barWidth = 22
            const gap = 20
            const startX = 40 + idx * (barWidth + gap)
            const y = 135 - bar.height
            return (
              <g
                key={idx}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredBar(idx)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Background hover guide path */}
                {hoveredBar === idx && (
                  <rect
                    x={startX - 4}
                    y="20"
                    width={barWidth + 8}
                    height="115"
                    fill="var(--fg)"
                    fillOpacity="0.03"
                    rx="4"
                  />
                )}
                {/* The bar */}
                <rect
                  x={startX}
                  y={y}
                  width={barWidth}
                  height={bar.height}
                  fill="url(#bar-grad)"
                  fillOpacity={hoveredBar === idx ? '1' : '0.8'}
                  rx="3"
                  className="transition-all duration-200"
                />
                {/* x-axis Label */}
                <text
                  x={startX + barWidth / 2}
                  y="152"
                  fill={hoveredBar === idx ? 'var(--primary)' : 'var(--muted)'}
                  fontSize="9"
                  fontWeight={hoveredBar === idx ? 'bold' : 'normal'}
                  textAnchor="middle"
                >
                  {bar.hour}
                </text>
              </g>
            )
          })}

          {/* Tooltip */}
          {hoveredBar !== null && barChartData[hoveredBar] && (
            <g
              transform={`translate(${barChartData[hoveredBar].transactions > 20 ? 110 : 160}, 15)`}
            >
              <rect
                width="90"
                height="25"
                rx="4"
                fill="var(--surface)"
                stroke="var(--line)"
                strokeWidth="1"
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.05))"
              />
              <text
                x="45"
                y="16"
                fill="var(--fg)"
                fontSize="9"
                fontWeight="bold"
                textAnchor="middle"
              >
                {barChartData[hoveredBar].transactions} Tx giao dịch
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
