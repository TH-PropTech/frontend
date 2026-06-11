'use client'

import * as React from 'react'

export function IsometricHouseGlowing(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 400 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto block w-full max-w-sm drop-shadow-xl animate-pulse-subtle"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C65A3A" />
          <stop offset="100%" stopColor="#F2B66D" />
        </linearGradient>
        <linearGradient id="glow-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C65A3A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#C65A3A" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Base platform grid (glowing lines) */}
      <polygon
        points="120,165 200,125 280,165 200,205"
        fill="url(#glow-grad)"
        opacity="0.4"
      />
      <polygon
        points="120,165 200,125 280,165 200,205"
        stroke="url(#gold-grad)"
        strokeWidth="0.8"
        strokeDasharray="3 3"
        opacity="0.6"
      />

      {/* Left Building (Isometric Block) */}
      <polygon
        points="140,110 170,125 170,165 140,150"
        fill="#2b211e"
        stroke="url(#gold-grad)"
        strokeWidth="0.8"
        opacity="0.8"
      />
      <polygon
        points="170,125 200,110 200,150 170,165"
        fill="#1a1410"
        stroke="url(#gold-grad)"
        strokeWidth="0.8"
        opacity="0.8"
      />
      <polygon
        points="140,110 170,95 200,110 170,125"
        fill="url(#gold-grad)"
        opacity="0.25"
        stroke="url(#gold-grad)"
        strokeWidth="0.8"
      />
      <line
        x1="152"
        y1="122"
        x2="152"
        y2="142"
        stroke="#F2B66D"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <line
        x1="160"
        y1="126"
        x2="160"
        y2="146"
        stroke="#F2B66D"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Center Hero Building (Tall Isometric Block) */}
      <polygon
        points="175,70 205,85 205,165 175,150"
        fill="#3d2e26"
        stroke="url(#gold-grad)"
        strokeWidth="1"
      />
      <polygon
        points="205,85 235,70 235,150 205,165"
        fill="#2b211e"
        stroke="url(#gold-grad)"
        strokeWidth="1"
      />
      <polygon
        points="175,70 205,55 235,70 205,85"
        fill="url(#gold-grad)"
        opacity="0.35"
        stroke="url(#gold-grad)"
        strokeWidth="1"
      />
      {/* Windows */}
      <line
        x1="213"
        y1="95"
        x2="213"
        y2="135"
        stroke="#FFFDF9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 5"
        opacity="0.75"
      />
      <line
        x1="222"
        y1="90"
        x2="222"
        y2="130"
        stroke="#FFFDF9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 5"
        opacity="0.75"
      />

      {/* Right Building (Small Isometric Block) */}
      <polygon
        points="210,120 240,135 240,165 210,150"
        fill="#2b211e"
        stroke="url(#gold-grad)"
        strokeWidth="0.8"
        opacity="0.8"
      />
      <polygon
        points="240,135 270,120 270,150 240,165"
        fill="#1a1410"
        stroke="url(#gold-grad)"
        strokeWidth="0.8"
        opacity="0.8"
      />
      <polygon
        points="210,120 240,105 270,120 240,135"
        fill="url(#gold-grad)"
        opacity="0.25"
        stroke="url(#gold-grad)"
        strokeWidth="0.8"
      />
      <line
        x1="248"
        y1="138"
        x2="248"
        y2="153"
        stroke="#F2B66D"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <line
        x1="256"
        y1="134"
        x2="256"
        y2="149"
        stroke="#F2B66D"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Connection Nodes (Blockchain details) */}
      <circle cx="205" cy="55" r="2.5" fill="#FFFDF9" />
      <circle cx="170" cy="95" r="2" fill="#F2B66D" />
      <circle cx="240" cy="105" r="2" fill="#F2B66D" />
      <line
        x1="205"
        y1="55"
        x2="170"
        y2="95"
        stroke="#FFFDF9"
        strokeWidth="0.6"
        strokeDasharray="2 2"
        opacity="0.4"
      />
      <line
        x1="205"
        y1="55"
        x2="240"
        y2="105"
        stroke="#FFFDF9"
        strokeWidth="0.6"
        strokeDasharray="2 2"
        opacity="0.4"
      />
    </svg>
  )
}
