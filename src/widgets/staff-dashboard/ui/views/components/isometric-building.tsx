'use client'

import * as React from 'react'

export interface IsometricBuildingLabels {
  contractLabel?: string | undefined
  vrLabel?: string | undefined
  kycLabel?: string | undefined
}

export interface IsometricBuildingProps {
  labels?: IsometricBuildingLabels
}

export function IsometricBuilding({
  labels,
}: IsometricBuildingProps = {}): React.ReactElement {
  return (
    <svg
      className="w-full max-w-[480px] aspect-[1.2/1]"
      viewBox="-60 0 580 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Orange Gradients */}
        <linearGradient id="orange-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fffdf9" />
          <stop offset="100%" stopColor="#f5e3dc" />
        </linearGradient>
        <linearGradient id="orange-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e37253" />
          <stop offset="100%" stopColor="#c65a3a" />
        </linearGradient>
        <linearGradient id="orange-right" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c65a3a" />
          <stop offset="100%" stopColor="#9f3f2a" />
        </linearGradient>

        {/* Green Gradients */}
        <linearGradient id="green-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fffdf9" />
          <stop offset="100%" stopColor="#e8f0df" />
        </linearGradient>
        <linearGradient id="green-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#82ad5f" />
          <stop offset="100%" stopColor="#6b8e4e" />
        </linearGradient>
        <linearGradient id="green-right" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6b8e4e" />
          <stop offset="100%" stopColor="#526f3b" />
        </linearGradient>

        {/* Gold Gradients */}
        <linearGradient id="gold-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fffdf9" />
          <stop offset="100%" stopColor="#fcebd4" />
        </linearGradient>
        <linearGradient id="gold-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7cd99" />
          <stop offset="100%" stopColor="#f2b66d" />
        </linearGradient>
        <linearGradient id="gold-right" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f2b66d" />
          <stop offset="100%" stopColor="#c79354" />
        </linearGradient>

        {/* Base Gradients */}
        <linearGradient id="base-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fffdf9" />
          <stop offset="100%" stopColor="#f4eee7" />
        </linearGradient>
        <linearGradient id="base-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e3d8d0" />
          <stop offset="100%" stopColor="#c9b8ae" />
        </linearGradient>
        <linearGradient id="base-right" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c9b8ae" />
          <stop offset="100%" stopColor="#a49389" />
        </linearGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse
        cx="280"
        cy="340"
        rx="150"
        ry="35"
        fill="#2b211e"
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
          stroke="#e3d8d0"
          strokeWidth="1.5"
        />
        {/* Left face */}
        <path
          d="M 160, 320 L 280, 370 L 280, 385 L 160, 335 Z"
          fill="url(#base-left)"
          stroke="#c9b8ae"
          strokeWidth="1"
        />
        {/* Right face */}
        <path
          d="M 280, 370 L 400, 320 L 400, 335 L 280, 385 Z"
          fill="url(#base-right)"
          stroke="#a49389"
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
          stroke="#c65a3a"
          strokeWidth="0.75"
          className="transition-all duration-200 group-hover:opacity-90"
        />
        {/* Right Face */}
        <path
          d="M 280, 260 L 370, 215 L 370, 255 L 280, 300 Z"
          fill="url(#orange-right)"
          stroke="#9f3f2a"
          strokeWidth="0.75"
          className="transition-all duration-200 group-hover:opacity-90"
        />
        {/* Top Face */}
        <path
          d="M 280, 170 L 370, 215 L 280, 260 L 190, 215 Z"
          fill="url(#orange-top)"
          stroke="#c65a3a"
          strokeWidth="1.5"
          className="transition-all duration-200 group-hover:opacity-95"
        />

        {/* Grid details on top face */}
        <path
          d="M 280, 190 L 340, 220 M 280, 210 L 310, 225 M 280, 230 L 280, 250"
          stroke="#c65a3a"
          strokeWidth="0.5"
          strokeOpacity="0.4"
        />

        {/* Left Leader Line & Tag */}
        <path
          d="M 190, 235 L 130, 205 L 90, 205"
          stroke="#c65a3a"
          strokeWidth="1.2"
          strokeDasharray="3,3"
          className="transition-all duration-200 opacity-60 group-hover:opacity-100"
        />
        <circle cx="190" cy="235" r="2.5" fill="#c65a3a" />
        <text
          x="83"
          y="198"
          fill="var(--fg)"
          fontSize="10"
          fontWeight="bold"
          textAnchor="end"
          className="transition-all duration-200 group-hover:fill-primary"
        >
          SMART CONTRACT
        </text>
        {labels?.contractLabel ? (
          <text
            x="83"
            y="210"
            fill="var(--primary)"
            fontSize="8.5"
            fontWeight="semibold"
            textAnchor="end"
          >
            {labels.contractLabel}
          </text>
        ) : null}
      </g>

      {/* ═══════════════════════════════════════
         LAYER 2: VR SPATIAL LAYER (Middle Cube)
         ═══════════════════════════════════════ */}
      <g className="cursor-pointer group">
        {/* Left Face */}
        <path
          d="M 210, 140 L 280, 175 L 280, 210 L 210, 175 Z"
          fill="url(#green-left)"
          stroke="#6b8e4e"
          strokeWidth="0.75"
          className="transition-all duration-200 group-hover:opacity-90"
        />
        {/* Right Face */}
        <path
          d="M 280, 175 L 350, 140 L 350, 175 L 280, 210 Z"
          fill="url(#green-right)"
          stroke="#526f3b"
          strokeWidth="0.75"
          className="transition-all duration-200 group-hover:opacity-90"
        />
        {/* Top Face */}
        <path
          d="M 280, 105 L 350, 140 L 280, 175 L 210, 140 Z"
          fill="url(#green-top)"
          stroke="#6b8e4e"
          strokeWidth="1.5"
          className="transition-all duration-200 group-hover:opacity-95"
        />

        {/* Glowing VR Dot */}
        <circle
          cx="280"
          cy="140"
          r="4.5"
          fill="#6b8e4e"
          className="animate-pulse"
        />

        {/* Right Leader Line & Tag */}
        <path
          d="M 350, 158 L 410, 125 L 440, 125"
          stroke="#6b8e4e"
          strokeWidth="1.2"
          strokeDasharray="3,3"
          className="transition-all duration-200 opacity-60 group-hover:opacity-100"
        />
        <circle cx="350" cy="158" r="2.5" fill="#6b8e4e" />
        <text
          x="447"
          y="117"
          fill="var(--fg)"
          fontSize="10"
          fontWeight="bold"
          textAnchor="start"
          className="transition-all duration-200 group-hover:fill-accent-2"
        >
          VR 360 ROOM
        </text>
        {labels?.vrLabel ? (
          <text
            x="447"
            y="130"
            fill="#6b8e4e"
            fontSize="8.5"
            fontWeight="semibold"
            textAnchor="start"
          >
            {labels.vrLabel}
          </text>
        ) : null}
      </g>

      {/* ═══════════════════════════════════════
         LAYER 3: KYC CENTER LAYER (Top Cube)
         ═══════════════════════════════════════ */}
      <g className="cursor-pointer group">
        {/* Left Face */}
        <path
          d="M 230, 75 L 280, 100 L 280, 130 L 230, 105 Z"
          fill="url(#gold-left)"
          stroke="#f2b66d"
          strokeWidth="0.75"
          className="transition-all duration-200 group-hover:opacity-90"
        />
        {/* Right Face */}
        <path
          d="M 280, 100 L 330, 75 L 330, 105 L 280, 130 Z"
          fill="url(#gold-right)"
          stroke="#c79354"
          strokeWidth="0.75"
          className="transition-all duration-200 group-hover:opacity-90"
        />
        {/* Top Face */}
        <path
          d="M 280, 50 L 330, 75 L 280, 100 L 230, 75 Z"
          fill="url(#gold-top)"
          stroke="#f2b66d"
          strokeWidth="1.5"
          className="transition-all duration-200 group-hover:opacity-95"
        />

        {/* Antenna broadcast */}
        <line
          x1="280"
          y1="50"
          x2="280"
          y2="20"
          stroke="#f2b66d"
          strokeWidth="1.5"
        />
        <circle
          cx="280"
          cy="18"
          r="3.5"
          fill="#f2b66d"
          className="animate-ping"
          style={{ animationDuration: '3s' }}
        />
        <circle cx="280" cy="18" r="2.5" fill="#f2b66d" />

        {/* Left Leader Line & Tag */}
        <path
          d="M 230, 90 L 160, 60 L 90, 60"
          stroke="#f2b66d"
          strokeWidth="1.2"
          strokeDasharray="3,3"
          className="transition-all duration-200 opacity-60 group-hover:opacity-100"
        />
        <circle cx="230" cy="90" r="2.5" fill="#f2b66d" />
        <text
          x="83"
          y="52"
          fill="var(--fg)"
          fontSize="10"
          fontWeight="bold"
          textAnchor="end"
          className="transition-all duration-200 group-hover:fill-accent-2"
        >
          KYC HUB
        </text>
        {labels?.kycLabel ? (
          <text
            x="83"
            y="65"
            fill="#c79354"
            fontSize="8.5"
            fontWeight="semibold"
            textAnchor="end"
          >
            {labels.kycLabel}
          </text>
        ) : null}
      </g>
    </svg>
  )
}
