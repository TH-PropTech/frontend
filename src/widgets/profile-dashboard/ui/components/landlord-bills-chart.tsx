'use client'

import * as React from 'react'

export function LandlordBillsChart(): React.ReactElement {
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
      <line
        x1="45"
        y1="50"
        x2="380"
        y2="50"
        stroke="#E5E9F0"
        strokeWidth="1"
        strokeDasharray="4"
      />
      <line
        x1="45"
        y1="100"
        x2="380"
        y2="100"
        stroke="#E5E9F0"
        strokeWidth="1"
        strokeDasharray="4"
      />

      <text
        x="35"
        y="55"
        textAnchor="end"
        fill="#A49389"
        className="text-[9px] font-mono"
      >
        20M
      </text>
      <text
        x="35"
        y="105"
        textAnchor="end"
        fill="#A49389"
        className="text-[9px] font-mono"
      >
        10M
      </text>
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
        d="M 65 160 L 65 60 L 125 60 L 185 62 L 245 60 L 305 60 L 365 72 L 365 160 Z"
        fill="rgba(198, 90, 58, 0.1)"
      />
      <path
        d="M 65 60 L 125 60 L 185 62 L 245 60 L 305 60 L 365 72"
        fill="none"
        stroke="#C65A3A"
        strokeWidth="3"
      />

      <circle cx="65" cy="60" r="4" fill="#C65A3A" />
      <circle cx="125" cy="60" r="4" fill="#C65A3A" />
      <circle cx="185" cy="62" r="4" fill="#C65A3A" />
      <circle cx="245" cy="60" r="4" fill="#C65A3A" />
      <circle cx="305" cy="60" r="4" fill="#C65A3A" />
      <circle cx="365" cy="72" r="4" fill="#C65A3A" />

      <text
        x="65"
        y="45"
        textAnchor="middle"
        fill="#C65A3A"
        className="text-[9px] font-bold"
      >
        18M
      </text>
      <text
        x="125"
        y="45"
        textAnchor="middle"
        fill="#C65A3A"
        className="text-[9px] font-bold"
      >
        18M
      </text>
      <text
        x="185"
        y="47"
        textAnchor="middle"
        fill="#C65A3A"
        className="text-[9px] font-bold"
      >
        17.7M
      </text>
      <text
        x="245"
        y="45"
        textAnchor="middle"
        fill="#C65A3A"
        className="text-[9px] font-bold"
      >
        18M
      </text>
      <text
        x="305"
        y="45"
        textAnchor="middle"
        fill="#C65A3A"
        className="text-[9px] font-bold"
      >
        18M
      </text>
      <text
        x="365"
        y="57"
        textAnchor="middle"
        fill="#C65A3A"
        className="text-[9px] font-bold"
      >
        15.5M
      </text>

      <text
        x="65"
        y="178"
        textAnchor="middle"
        fill="#2E3440"
        className="text-[9px] font-bold"
      >
        Th1
      </text>
      <text
        x="125"
        y="178"
        textAnchor="middle"
        fill="#2E3440"
        className="text-[9px] font-bold"
      >
        Th2
      </text>
      <text
        x="185"
        y="178"
        textAnchor="middle"
        fill="#2E3440"
        className="text-[9px] font-bold"
      >
        Th3
      </text>
      <text
        x="245"
        y="178"
        textAnchor="middle"
        fill="#2E3440"
        className="text-[9px] font-bold"
      >
        Th4
      </text>
      <text
        x="305"
        y="178"
        textAnchor="middle"
        fill="#2E3440"
        className="text-[9px] font-bold"
      >
        Th5
      </text>
      <text
        x="365"
        y="178"
        textAnchor="middle"
        fill="#2E3440"
        className="text-[9px] font-bold"
      >
        Th6
      </text>
    </svg>
  )
}
