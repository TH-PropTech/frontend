'use client'

import * as React from 'react'

export function EscrowLineChart(): React.ReactElement {
  const [hoveredPoint, setHoveredPoint] = React.useState<number | null>(null)

  const lineChartData = [
    { label: 'T2', value: '1.20 ETH', x: 40, y: 140, details: '12 giao dịch' },
    { label: 'T3', value: '1.80 ETH', x: 110, y: 120, details: '18 giao dịch' },
    { label: 'T4', value: '1.50 ETH', x: 180, y: 130, details: '15 giao dịch' },
    { label: 'T5', value: '2.90 ETH', x: 250, y: 90, details: '24 giao dịch' },
    { label: 'T6', value: '3.40 ETH', x: 320, y: 75, details: '30 giao dịch' },
    { label: 'T7', value: '4.50 ETH', x: 390, y: 45, details: '41 giao dịch' },
    { label: 'CN', value: '4.85 ETH', x: 460, y: 35, details: '48 giao dịch' },
  ]

  return (
    <div className="bg-surface border border-line rounded-xl p-5 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-bold text-fg font-body uppercase tracking-wider">
            Xu hướng Quỹ cọc Escrow
          </h4>
          <span className="text-[9px] font-bold text-accent-2 bg-accent-2/10 px-2 py-0.5 rounded border border-accent-2/20">
            +304.2%
          </span>
        </div>
        <p className="text-[11px] text-muted mt-1">
          Tổng tích lũy cọc ký quỹ qua Smart Contract.
        </p>
      </div>

      <div className="relative mt-4 min-h-[160px] flex items-center justify-center">
        <svg
          className="w-full h-full max-h-[160px]"
          viewBox="0 0 500 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="escrow-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
              <stop
                offset="100%"
                stopColor="var(--primary)"
                stopOpacity="0.00"
              />
            </linearGradient>
          </defs>
          <line
            x1="40"
            y1="35"
            x2="460"
            y2="35"
            stroke="var(--line)"
            strokeWidth="0.5"
            strokeDasharray="4,4"
          />
          <line
            x1="40"
            y1="85"
            x2="460"
            y2="85"
            stroke="var(--line)"
            strokeWidth="0.5"
            strokeDasharray="4,4"
          />
          <line
            x1="40"
            y1="140"
            x2="460"
            y2="140"
            stroke="var(--line)"
            strokeWidth="1"
          />

          <text x="30" y="40" fill="var(--muted)" fontSize="8" textAnchor="end">
            5.0 ETH
          </text>
          <text x="30" y="90" fill="var(--muted)" fontSize="8" textAnchor="end">
            2.5 ETH
          </text>
          <text
            x="30"
            y="143"
            fill="var(--muted)"
            fontSize="8"
            textAnchor="end"
          >
            0 ETH
          </text>

          <path
            d="M 40,140 L 40,140 L 110,120 L 180,130 L 250,90 L 320,75 L 390,45 L 460,35 L 460,140 Z"
            fill="url(#escrow-grad)"
          />
          <path
            d="M 40,140 L 110,120 L 180,130 L 250,90 L 320,75 L 390,45 L 460,35"
            stroke="var(--primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {hoveredPoint !== null && lineChartData[hoveredPoint] && (
            <line
              x1={lineChartData[hoveredPoint].x}
              y1="20"
              x2={lineChartData[hoveredPoint].x}
              y2="140"
              stroke="var(--primary)"
              strokeWidth="1.2"
              strokeDasharray="2,2"
            />
          )}

          {lineChartData.map((pt, idx) => (
            <g
              key={idx}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredPoint(idx)}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <circle cx={pt.x} cy={pt.y} r="10" fill="transparent" />
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredPoint === idx ? '5' : '3.5'}
                fill={
                  hoveredPoint === idx ? 'var(--primary)' : 'var(--surface)'
                }
                stroke="var(--primary)"
                strokeWidth="2"
              />
            </g>
          ))}

          {lineChartData.map((pt, idx) => (
            <text
              key={idx}
              x={pt.x}
              y="156"
              fill={hoveredPoint === idx ? 'var(--primary)' : 'var(--muted)'}
              fontSize="9"
              fontWeight={hoveredPoint === idx ? 'bold' : 'normal'}
              textAnchor="middle"
            >
              {pt.label}
            </text>
          ))}

          {hoveredPoint !== null && lineChartData[hoveredPoint] && (
            <g
              transform={`translate(${lineChartData[hoveredPoint].x > 250 ? lineChartData[hoveredPoint].x - 105 : lineChartData[hoveredPoint].x + 10}, ${lineChartData[hoveredPoint].y - 30})`}
            >
              <rect
                width="95"
                height="40"
                rx="6"
                fill="var(--surface)"
                stroke="var(--line)"
                strokeWidth="1"
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.05))"
              />
              <text
                x="8"
                y="15"
                fill="var(--muted)"
                fontSize="8"
                fontWeight="bold"
              >
                {lineChartData[hoveredPoint].label} (Tích lũy)
              </text>
              <text
                x="8"
                y="25"
                fill="var(--fg)"
                fontSize="10"
                fontWeight="bold"
              >
                {lineChartData[hoveredPoint].value}
              </text>
              <text
                x="8"
                y="33"
                fill="var(--primary)"
                fontSize="7"
                fontWeight="semibold"
              >
                {lineChartData[hoveredPoint].details}
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
