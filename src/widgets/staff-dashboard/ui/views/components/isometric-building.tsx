'use client'

import * as React from 'react'

export function IsometricBuilding(): React.ReactElement {
  return (
    <svg
      className="w-full max-w-[480px] aspect-[1.2/1]"
      viewBox="-60 0 580 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Orange / Primary Gradients */}
        <linearGradient id="orange-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--surface)" />
          <stop offset="100%" stopColor="var(--primary-soft)" />
        </linearGradient>
        <linearGradient id="orange-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--primary-hover)" />
        </linearGradient>
        <linearGradient id="orange-right" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary-hover)" />
          <stop offset="100%" stopColor="var(--primary-hover)" />
        </linearGradient>

        {/* Green / Success Gradients */}
        <linearGradient id="green-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--surface)" />
          <stop offset="100%" stopColor="var(--success-soft)" />
        </linearGradient>
        <linearGradient id="green-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--success)" />
          <stop offset="100%" stopColor="var(--success)" />
        </linearGradient>
        <linearGradient id="green-right" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--success)" />
          <stop offset="100%" stopColor="var(--success)" />
        </linearGradient>

        {/* Gold / Accent Gradients */}
        <linearGradient id="gold-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--surface)" />
          <stop offset="100%" stopColor="var(--accent-soft)" />
        </linearGradient>
        <linearGradient id="gold-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
        <linearGradient id="gold-right" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--warning)" />
        </linearGradient>

        {/* Base Gradients */}
        <linearGradient id="base-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--surface)" />
          <stop offset="100%" stopColor="var(--surface-muted)" />
        </linearGradient>
        <linearGradient id="base-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--border)" />
          <stop offset="100%" stopColor="var(--border-strong)" />
        </linearGradient>
        <linearGradient id="base-right" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--border-strong)" />
          <stop offset="100%" stopColor="var(--subtle)" />
        </linearGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse
        cx="280"
        cy="340"
        rx="150"
        ry="35"
        fill="var(--fg)"
        fillOpacity="0.05"
      />

      {/* ═══════════════════════════════════════
         BASE FOUNDATION LAYER
         ═══════════════════════════════════════ */}
      <g className="transition-all duration-300">
        {/* Top face */}
        <path
          d="M 280, 270 L 400, 320 L 280, 370 L 160, 320 Z"
          fill="url(#base-top)"
          stroke="var(--border)"
          strokeWidth="1.5"
        />
        {/* Left face */}
        <path
          d="M 160, 320 L 280, 370 L 280, 385 L 160, 335 Z"
          fill="url(#base-left)"
          stroke="var(--border-strong)"
          strokeWidth="1"
        />
        {/* Right face */}
        <path
          d="M 280, 370 L 400, 320 L 400, 335 L 280, 385 Z"
          fill="url(#base-right)"
          stroke="var(--subtle)"
          strokeWidth="1"
        />
      </g>

      {/* ═══════════════════════════════════════
         LAYER 1: SMART LEASE LAYER (Bottom Cube)
         ═══════════════════════════════════════ */}
      <g className="cursor-pointer group">
        {/* Left Face */}
        <path
          d="M 190, 215 L 280, 260 L 280, 300 L 190, 255 Z"
          fill="url(#orange-left)"
          stroke="var(--primary)"
          strokeWidth="0.75"
          className="transition-all duration-200 group-hover:opacity-90"
        />
        {/* Right Face */}
        <path
          d="M 280, 260 L 370, 215 L 370, 255 L 280, 300 Z"
          fill="url(#orange-right)"
          stroke="var(--primary-hover)"
          strokeWidth="0.75"
          className="transition-all duration-200 group-hover:opacity-90"
        />
        {/* Top Face */}
        <path
          d="M 280, 170 L 370, 215 L 280, 260 L 190, 215 Z"
          fill="url(#orange-top)"
          stroke="var(--primary)"
          strokeWidth="1.5"
          className="transition-all duration-200 group-hover:opacity-95"
        />

        {/* Grid details on top face */}
        <path
          d="M 280, 190 L 340, 220 M 280, 210 L 310, 225 M 280, 230 L 280, 250"
          stroke="var(--primary)"
          strokeWidth="0.5"
          strokeOpacity="0.4"
        />

        {/* Left Leader Line & Tag */}
        <path
          d="M 190, 235 L 130, 205 L 90, 205"
          stroke="var(--primary)"
          strokeWidth="1.2"
          strokeDasharray="3,3"
          className="transition-all duration-200 opacity-60 group-hover:opacity-100"
        />
        <circle cx="190" cy="235" r="2.5" fill="var(--primary)" />
        <text
          x="83"
          y="198"
          fill="var(--fg)"
          fontSize="10"
          fontWeight="bold"
          textAnchor="end"
          className="transition-all duration-200 group-hover:fill-primary"
        >
          HỢP ĐỒNG ĐIỆN TỬ
        </text>
        <text
          x="83"
          y="210"
          fill="var(--primary)"
          fontSize="8.5"
          fontWeight="semibold"
          textAnchor="end"
        >
          Lưu vết chống sửa đổi
        </text>
      </g>

      {/* ═══════════════════════════════════════
         LAYER 2: VR SPATIAL LAYER (Middle Cube)
         ═══════════════════════════════════════ */}
      <g className="cursor-pointer group">
        {/* Left Face */}
        <path
          d="M 210, 140 L 280, 175 L 280, 210 L 210, 175 Z"
          fill="url(#green-left)"
          stroke="var(--success)"
          strokeWidth="0.75"
          className="transition-all duration-200 group-hover:opacity-90"
        />
        {/* Right Face */}
        <path
          d="M 280, 175 L 350, 140 L 350, 175 L 280, 210 Z"
          fill="url(#green-right)"
          stroke="var(--success)"
          strokeWidth="0.75"
          className="transition-all duration-200 group-hover:opacity-90"
        />
        {/* Top Face */}
        <path
          d="M 280, 105 L 350, 140 L 280, 175 L 210, 140 Z"
          fill="url(#green-top)"
          stroke="var(--success)"
          strokeWidth="1.5"
          className="transition-all duration-200 group-hover:opacity-95"
        />

        {/* Glowing VR Dot */}
        <circle
          cx="280"
          cy="140"
          r="4.5"
          fill="var(--success)"
          className="animate-pulse"
        />

        {/* Right Leader Line & Tag */}
        <path
          d="M 350, 158 L 410, 125 L 440, 125"
          stroke="var(--success)"
          strokeWidth="1.2"
          strokeDasharray="3,3"
          className="transition-all duration-200 opacity-60 group-hover:opacity-100"
        />
        <circle cx="350" cy="158" r="2.5" fill="var(--success)" />
        <text
          x="447"
          y="117"
          fill="var(--fg)"
          fontSize="10"
          fontWeight="bold"
          textAnchor="start"
          className="transition-all duration-200 group-hover:fill-accent-2"
        >
          KHÔNG GIAN VR 360
        </text>
        <text
          x="447"
          y="130"
          fill="var(--success)"
          fontSize="8.5"
          fontWeight="semibold"
          textAnchor="start"
        >
          Không gian đa chiều
        </text>
      </g>

      {/* ═══════════════════════════════════════
         LAYER 3: KYC CENTER LAYER (Top Cube)
         ═══════════════════════════════════════ */}
      <g className="cursor-pointer group">
        {/* Left Face */}
        <path
          d="M 230, 75 L 280, 100 L 280, 130 L 230, 105 Z"
          fill="url(#gold-left)"
          stroke="var(--accent)"
          strokeWidth="0.75"
          className="transition-all duration-200 group-hover:opacity-90"
        />
        {/* Right Face */}
        <path
          d="M 280, 100 L 330, 75 L 330, 105 L 280, 130 Z"
          fill="url(#gold-right)"
          stroke="var(--warning)"
          strokeWidth="0.75"
          className="transition-all duration-200 group-hover:opacity-90"
        />
        {/* Top Face */}
        <path
          d="M 280, 50 L 330, 75 L 280, 100 L 230, 75 Z"
          fill="url(#gold-top)"
          stroke="var(--accent)"
          strokeWidth="1.5"
          className="transition-all duration-200 group-hover:opacity-95"
        />

        {/* Antenna broadcast */}
        <line
          x1="280"
          y1="50"
          x2="280"
          y2="20"
          stroke="var(--accent)"
          strokeWidth="1.5"
        />
        <circle
          cx="280"
          cy="18"
          r="3.5"
          fill="var(--accent)"
          className="animate-ping"
          style={{ animationDuration: '3s' }}
        />
        <circle cx="280" cy="18" r="2.5" fill="var(--accent)" />

        {/* Left Leader Line & Tag */}
        <path
          d="M 230, 90 L 160, 60 L 90, 60"
          stroke="var(--accent)"
          strokeWidth="1.2"
          strokeDasharray="3,3"
          className="transition-all duration-200 opacity-60 group-hover:opacity-100"
        />
        <circle cx="230" cy="90" r="2.5" fill="var(--accent)" />
        <text
          x="83"
          y="52"
          fill="var(--fg)"
          fontSize="10"
          fontWeight="bold"
          textAnchor="end"
          className="transition-all duration-200 group-hover:fill-accent-2"
        >
          XÁC THỰC KYC
        </text>
        <text
          x="83"
          y="65"
          fill="var(--warning)"
          fontSize="8.5"
          fontWeight="semibold"
          textAnchor="end"
        >
          Xác thực danh tính
        </text>
      </g>
    </svg>
  )
}
