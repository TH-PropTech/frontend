'use client'

import * as React from 'react'

export function EscrowLineChart(): React.ReactElement {
  const [hoveredPoint, setHoveredPoint] = React.useState<number | null>(null)

  const lineChartData = [
    {
      label: 'Thứ 2',
      value: '1.20 tỷ VNĐ',
      x: 50,
      y: 150,
      details: '12 giao dịch cọc',
    },
    {
      label: 'Thứ 3',
      value: '1.80 tỷ VNĐ',
      x: 133,
      y: 130,
      details: '18 giao dịch cọc',
    },
    {
      label: 'Thứ 4',
      value: '1.50 tỷ VNĐ',
      x: 216,
      y: 140,
      details: '15 giao dịch cọc',
    },
    {
      label: 'Thứ 5',
      value: '2.90 tỷ VNĐ',
      x: 300,
      y: 95,
      details: '24 giao dịch cọc',
    },
    {
      label: 'Thứ 6',
      value: '3.40 tỷ VNĐ',
      x: 383,
      y: 80,
      details: '30 giao dịch cọc',
    },
    {
      label: 'Thứ 7',
      value: '4.50 tỷ VNĐ',
      x: 466,
      y: 45,
      details: '41 giao dịch cọc',
    },
    {
      label: 'Chủ Nhật',
      value: '4.85 tỷ VNĐ',
      x: 550,
      y: 35,
      details: '48 giao dịch cọc',
    },
  ]

  return (
    <div className="bg-surface border border-border rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-bold text-fg font-body uppercase tracking-wider">
            Xu hướng Quỹ cọc Escrow (Hyperledger Fabric)
          </h4>
          <span className="text-[10px] font-bold text-success bg-success/10 px-2.5 py-1 rounded-full border border-success/20">
            +304.2%
          </span>
        </div>
        <p className="text-[11px] text-muted mt-1 font-body">
          Tổng tích lũy cọc ký quỹ VNĐ được khóa trong Smart Contract
          Hyperledger Fabric.
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
            <linearGradient id="escrow-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
              <stop
                offset="100%"
                stopColor="var(--primary)"
                stopOpacity="0.0"
              />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1="50"
            y1="35"
            x2="550"
            y2="35"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4,4"
          />
          <line
            x1="50"
            y1="92"
            x2="550"
            y2="92"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4,4"
          />
          <line
            x1="50"
            y1="150"
            x2="550"
            y2="150"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* Y Axis Labels */}
          <text
            x="40"
            y="39"
            fill="var(--muted)"
            fontSize="10"
            textAnchor="end"
            fontFamily="var(--font-body)"
          >
            5.0 tỷ
          </text>
          <text
            x="40"
            y="96"
            fill="var(--muted)"
            fontSize="10"
            textAnchor="end"
            fontFamily="var(--font-body)"
          >
            2.5 tỷ
          </text>
          <text
            x="40"
            y="154"
            fill="var(--muted)"
            fontSize="10"
            textAnchor="end"
            fontFamily="var(--font-body)"
          >
            0 VNĐ
          </text>

          {/* Area fill */}
          <path
            d="M 50,150 L 50,150 L 133,130 L 216,140 L 300,95 L 383,80 L 466,45 L 550,35 L 550,150 Z"
            fill="url(#escrow-grad)"
          />

          {/* Line path */}
          <path
            d="M 50,150 L 133,130 L 216,140 L 300,95 L 383,80 L 466,45 L 550,35"
            stroke="var(--primary)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Vertical guide line on hover */}
          {hoveredPoint !== null && lineChartData[hoveredPoint] && (
            <line
              x1={lineChartData[hoveredPoint].x}
              y1="25"
              x2={lineChartData[hoveredPoint].x}
              y2="150"
              stroke="var(--primary)"
              strokeWidth="1.5"
              strokeDasharray="3,3"
            />
          )}

          {/* Data points */}
          {lineChartData.map((pt, idx) => (
            <g
              key={idx}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredPoint(idx)}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <circle cx={pt.x} cy={pt.y} r="14" fill="transparent" />
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredPoint === idx ? '6' : '4'}
                fill={
                  hoveredPoint === idx ? 'var(--primary)' : 'var(--surface)'
                }
                stroke="var(--primary)"
                strokeWidth="2.5"
              />
            </g>
          ))}

          {/* X Axis Labels */}
          {lineChartData.map((pt, idx) => (
            <text
              key={idx}
              x={pt.x}
              y="174"
              fill={hoveredPoint === idx ? 'var(--primary)' : 'var(--muted)'}
              fontSize="11"
              fontWeight={hoveredPoint === idx ? 'bold' : '500'}
              textAnchor="middle"
              fontFamily="var(--font-body)"
            >
              {pt.label}
            </text>
          ))}

          {/* Tooltip */}
          {hoveredPoint !== null && lineChartData[hoveredPoint] && (
            <g
              transform={`translate(${
                lineChartData[hoveredPoint].x > 350
                  ? lineChartData[hoveredPoint].x - 130
                  : lineChartData[hoveredPoint].x + 12
              }, ${Math.max(lineChartData[hoveredPoint].y - 35, 10)})`}
            >
              <rect
                width="120"
                height="45"
                rx="8"
                fill="var(--fg)"
                opacity="0.95"
              />
              <text
                x="10"
                y="16"
                fill="var(--on-control)"
                fontSize="9"
                fontWeight="bold"
                fontFamily="var(--font-body)"
              >
                {lineChartData[hoveredPoint].label} (Cọc Escrow)
              </text>
              <text
                x="10"
                y="29"
                fill="var(--on-control)"
                fontSize="12"
                fontWeight="bold"
                fontFamily="var(--font-display)"
              >
                {lineChartData[hoveredPoint].value}
              </text>
              <text
                x="10"
                y="39"
                fill="var(--primary)"
                fontSize="8"
                fontWeight="600"
                fontFamily="var(--font-body)"
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
