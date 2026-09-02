'use client'

import * as React from 'react'

export function SystemLoadBarChart(): React.ReactElement {
  const [hoveredBar, setHoveredBar] = React.useState<number | null>(null)

  const barChartData = [
    { hour: '04:00', transactions: 12, height: 45, x: 70 },
    { hour: '08:00', transactions: 24, height: 85, x: 155 },
    { hour: '12:00', transactions: 32, height: 115, x: 240 },
    { hour: '16:00', transactions: 18, height: 65, x: 325 },
    { hour: '20:00', transactions: 29, height: 100, x: 410 },
    { hour: '24:00', transactions: 15, height: 55, x: 495 },
  ]

  const BAR_WIDTH = 40

  return (
    <div className="bg-surface border border-border rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-bold text-fg font-body uppercase tracking-wider">
            Tải lượng & Giao dịch mạng
          </h4>
          <span className="text-[10px] font-bold text-muted bg-fg/5 px-2.5 py-1 rounded-full border border-border">
            24 giờ qua
          </span>
        </div>
        <p className="text-[11px] text-muted mt-1 font-body">
          Cường độ giao dịch qua Smart Contract theo khung giờ trong ngày.
        </p>
      </div>

      <div className="relative mt-4 w-full h-48 sm:h-56 lg:h-64 flex items-center justify-center">
        <svg
          className="w-full h-full"
          viewBox="0 0 600 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="bar-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1="40"
            y1="35"
            x2="560"
            y2="35"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4,4"
          />
          <line
            x1="40"
            y1="92"
            x2="560"
            y2="92"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4,4"
          />
          <line
            x1="40"
            y1="150"
            x2="560"
            y2="150"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* Bars */}
          {barChartData.map((bar, idx) => {
            const startX = bar.x - BAR_WIDTH / 2
            const y = 150 - bar.height
            const isHov = hoveredBar === idx

            return (
              <g
                key={idx}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredBar(idx)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Background hover column */}
                {isHov && (
                  <rect
                    x={startX - 6}
                    y="25"
                    width={BAR_WIDTH + 12}
                    height="128"
                    fill="var(--fg)"
                    fillOpacity="0.04"
                    rx="8"
                  />
                )}

                {/* Main bar */}
                <rect
                  x={startX}
                  y={y}
                  width={BAR_WIDTH}
                  height={bar.height}
                  fill="url(#bar-grad)"
                  fillOpacity={isHov ? '1' : '0.85'}
                  rx="6"
                  className="transition-all duration-200"
                />

                {/* X Axis Label */}
                <text
                  x={bar.x}
                  y="174"
                  fill={isHov ? 'var(--primary)' : 'var(--muted)'}
                  fontSize="11"
                  fontWeight={isHov ? 'bold' : '500'}
                  textAnchor="middle"
                  fontFamily="var(--font-body)"
                >
                  {bar.hour}
                </text>
              </g>
            )
          })}

          {/* Tooltip */}
          {hoveredBar !== null && barChartData[hoveredBar] && (
            <g
              transform={`translate(${barChartData[hoveredBar].x - 60}, ${Math.max(
                150 - barChartData[hoveredBar].height - 40,
                10
              )})`}
            >
              <rect
                width="120"
                height="32"
                rx="6"
                fill="var(--fg)"
                opacity="0.95"
              />
              <text
                x="60"
                y="20"
                fill="var(--on-control)"
                fontSize="11"
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="var(--font-display)"
              >
                {barChartData[hoveredBar].transactions} giao dịch
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
