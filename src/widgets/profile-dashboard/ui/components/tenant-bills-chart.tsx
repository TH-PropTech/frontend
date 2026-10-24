'use client'

import * as React from 'react'

export function TenantBillsChart(): React.ReactElement {
  return (
    <svg className="w-full h-full max-w-lg" viewBox="0 0 400 200">
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

      <text
        x="30"
        y="60"
        textAnchor="end"
        fill="#A49389"
        className="text-[11px] font-mono"
      >
        18M
      </text>
      <text
        x="30"
        y="95"
        textAnchor="end"
        fill="#A49389"
        className="text-[11px] font-mono"
      >
        5M
      </text>
      <text
        x="30"
        y="130"
        textAnchor="end"
        fill="#A49389"
        className="text-[11px] font-mono"
      >
        1M
      </text>
      <text
        x="30"
        y="165"
        textAnchor="end"
        fill="#A49389"
        className="text-[11px] font-mono"
      >
        0
      </text>

      <rect
        x="70"
        y="55"
        width="45"
        height="105"
        rx="4"
        fill="#C65A3A"
        className="hover:opacity-90 transition-opacity cursor-pointer"
      />
      <text
        x="92.5"
        y="45"
        textAnchor="middle"
        fill="#C65A3A"
        className="text-[11px] font-bold"
      >
        18.0M
      </text>
      <text
        x="92.5"
        y="180"
        textAnchor="middle"
        fill="#2E3440"
        className="text-[11px] font-semibold"
      >
        Tiền nhà
      </text>

      <rect
        x="150"
        y="145"
        width="45"
        height="15"
        rx="4"
        fill="#EBCB8B"
        className="hover:opacity-90 transition-opacity cursor-pointer"
      />
      <text
        x="172.5"
        y="135"
        textAnchor="middle"
        fill="#D08770"
        className="text-[11px] font-bold"
      >
        850k
      </text>
      <text
        x="172.5"
        y="180"
        textAnchor="middle"
        fill="#2E3440"
        className="text-[11px] font-semibold"
      >
        Tiền điện
      </text>

      <rect
        x="230"
        y="155"
        width="45"
        height="5"
        rx="4"
        fill="#88C0D0"
        className="hover:opacity-90 transition-opacity cursor-pointer"
      />
      <text
        x="252.5"
        y="145"
        textAnchor="middle"
        fill="#5E81AC"
        className="text-[11px] font-bold"
      >
        250k
      </text>
      <text
        x="252.5"
        y="180"
        textAnchor="middle"
        fill="#2E3440"
        className="text-[11px] font-semibold"
      >
        Tiền nước
      </text>

      <rect
        x="310"
        y="152"
        width="45"
        height="8"
        rx="4"
        fill="#A3BE8C"
        className="hover:opacity-90 transition-opacity cursor-pointer"
      />
      <text
        x="332.5"
        y="142"
        textAnchor="middle"
        fill="#5E81AC"
        className="text-[11px] font-bold"
      >
        450k
      </text>
      <text
        x="332.5"
        y="180"
        textAnchor="middle"
        fill="#2E3440"
        className="text-[11px] font-semibold"
      >
        Phí QL
      </text>
    </svg>
  )
}
