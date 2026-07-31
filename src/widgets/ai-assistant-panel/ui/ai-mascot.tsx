'use client'

import * as React from 'react'

interface AiMascotProps {
  className?: string
  size?: number
  isAnimated?: boolean
}

export function AiMascot({
  className = '',
  size = 48,
  isAnimated = false,
}: AiMascotProps): React.ReactElement {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${
        isAnimated ? 'animate-bounce' : ''
      } ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer ambient glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#C65A3A]/40 via-orange-400/30 to-[#E28766]/50 blur-md transform scale-110 animate-pulse" />

      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative w-full h-full drop-shadow-xl"
      >
        <defs>
          {/* Main Body Gradient */}
          <linearGradient id="bodyGrad" x1="20" y1="20" x2="100" y2="110">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F5E8E4" />
            <stop offset="100%" stopColor="#D9BFB7" />
          </linearGradient>

          {/* Roof Helmet Accent Gradient */}
          <linearGradient id="roofGrad" x1="30" y1="10" x2="90" y2="45">
            <stop offset="0%" stopColor="#E28766" />
            <stop offset="50%" stopColor="#C65A3A" />
            <stop offset="100%" stopColor="#A04024" />
          </linearGradient>

          {/* Screen Visor Gradient */}
          <linearGradient id="screenGrad" x1="30" y1="40" x2="90" y2="85">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          {/* Eye Glow Gradient */}
          <linearGradient id="eyeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* Ears Metallic Gradient */}
          <linearGradient id="earGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E28766" />
            <stop offset="100%" stopColor="#8C2D13" />
          </linearGradient>

          {/* Soft Shadow */}
          <filter
            id="shadowFilter"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="4"
              floodColor="#C65A3A"
              floodOpacity="0.3"
            />
          </filter>
        </defs>

        {/* --- Floating Antenna (PropTech Beacon) --- */}
        <line
          x1="60"
          y1="22"
          x2="60"
          y2="10"
          stroke="#C65A3A"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle
          cx="60"
          cy="8"
          r="5"
          fill="#E28766"
          className="animate-ping opacity-75"
        />
        <circle cx="60" cy="8" r="4" fill="#C65A3A" />
        <circle cx="60" cy="8" r="2" fill="#FFFFFF" />

        {/* --- Side Headphones/Ears (Building Key shape style) --- */}
        <rect
          x="14"
          y="52"
          width="10"
          height="24"
          rx="5"
          fill="url(#earGrad)"
        />
        <rect
          x="96"
          y="52"
          width="10"
          height="24"
          rx="5"
          fill="url(#earGrad)"
        />

        {/* --- Main Robot Head Shell (Soft Curved Box) --- */}
        <rect
          x="22"
          y="22"
          width="76"
          height="76"
          rx="26"
          fill="url(#bodyGrad)"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          filter="url(#shadowFilter)"
        />

        {/* --- House Roof Cap / Helmet (Real Estate Identity) --- */}
        <path
          d="M 28 32 Q 60 14 92 32 L 92 38 Q 60 22 28 38 Z"
          fill="url(#roofGrad)"
        />
        <path
          d="M 60 16 L 85 32 L 35 32 Z"
          fill="url(#roofGrad)"
          opacity="0.4"
        />

        {/* --- High Tech Screen Visor --- */}
        <rect
          x="32"
          y="42"
          width="56"
          height="42"
          rx="16"
          fill="url(#screenGrad)"
          stroke="#C65A3A"
          strokeWidth="1.5"
        />

        {/* Screen Glass Reflection Highlight */}
        <path
          d="M 36 46 Q 60 44 80 48 C 76 54 44 54 36 46 Z"
          fill="#FFFFFF"
          opacity="0.15"
        />

        {/* --- Cute Animated Expressive Eyes --- */}
        <g className="animate-pulse">
          {/* Left Eye: Happy Arc / Glowing Oval */}
          <ellipse cx="48" cy="62" rx="5.5" ry="7.5" fill="url(#eyeGrad)" />
          <circle cx="46.5" cy="59.5" r="2.5" fill="#FFFFFF" />
          <circle cx="50" cy="64.5" r="1" fill="#FFFFFF" />

          {/* Right Eye: Happy Arc / Glowing Oval */}
          <ellipse cx="72" cy="62" rx="5.5" ry="7.5" fill="url(#eyeGrad)" />
          <circle cx="70.5" cy="59.5" r="2.5" fill="#FFFFFF" />
          <circle cx="74" cy="64.5" r="1" fill="#FFFFFF" />
        </g>

        {/* Cute Cheeks Rosy Glow */}
        <circle cx="42" cy="71" r="3.5" fill="#E28766" opacity="0.6" />
        <circle cx="78" cy="71" r="3.5" fill="#E28766" opacity="0.6" />

        {/* Friendly Smiling Mouth */}
        <path
          d="M 54 71 Q 60 76 66 71"
          stroke="#38BDF8"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* --- Chest Badge / TH PropTech Emblem --- */}
        <circle cx="60" cy="94" r="5" fill="#C65A3A" />
        <path d="M 60 91 L 63 94 L 60 97 L 57 94 Z" fill="#FFFFFF" />
      </svg>
    </div>
  )
}
