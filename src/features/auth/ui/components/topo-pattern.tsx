'use client'

import * as React from 'react'

export function TopoPattern(): React.ReactElement {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="topo"
          x="0"
          y="0"
          width="300"
          height="300"
          patternUnits="userSpaceOnUse"
        >
          {/* Contour rings */}
          <ellipse
            cx="150"
            cy="150"
            rx="140"
            ry="120"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.15"
          />
          <ellipse
            cx="150"
            cy="150"
            rx="110"
            ry="90"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.12"
          />
          <ellipse
            cx="150"
            cy="150"
            rx="80"
            ry="65"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.10"
          />
          <ellipse
            cx="150"
            cy="150"
            rx="50"
            ry="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.4"
            opacity="0.08"
          />
          <ellipse
            cx="150"
            cy="150"
            rx="25"
            ry="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.3"
            opacity="0.06"
          />
          {/* Offset contour group */}
          <ellipse
            cx="60"
            cy="60"
            rx="55"
            ry="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.10"
          />
          <ellipse
            cx="60"
            cy="60"
            rx="30"
            ry="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.4"
            opacity="0.07"
          />
          <ellipse
            cx="250"
            cy="250"
            rx="50"
            ry="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.10"
          />
          <ellipse
            cx="250"
            cy="250"
            rx="25"
            ry="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.3"
            opacity="0.07"
          />
          {/* Horizontal contour lines */}
          <path
            d="M0 75 Q75 55 150 75 T300 75"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.4"
            opacity="0.08"
          />
          <path
            d="M0 225 Q75 205 150 225 T300 225"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.4"
            opacity="0.08"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#topo)" />
    </svg>
  )
}
