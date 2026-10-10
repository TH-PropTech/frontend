'use client'

import * as React from 'react'

interface AiMascotProps {
  className?: string
  /** Rendered height in px (width follows the aspect ratio). */
  size?: number
  /** Idle bounce, blink and waving arm. Transform-only, so it stays cheap. */
  isAnimated?: boolean
  /** Crop to the head only, for small avatars. */
  headOnly?: boolean
}

const FULL_VIEWBOX = '0 0 120 150'
const HEAD_VIEWBOX = '10 0 100 104'

const MASCOT_CSS = `
.aim-part { transform-box: fill-box; }
.aim-bounce { animation: aim-bounce 2.4s ease-in-out infinite; }
.aim-wave { transform-origin: 20% 90%; animation: aim-wave 2.8s ease-in-out infinite; }
.aim-blink { transform-origin: 50% 50%; animation: aim-blink 4.5s infinite; }
.aim-ping { transform-origin: 50% 50%; animation: aim-ping 2s ease-in-out infinite; }
@keyframes aim-bounce { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-3px) } }
@keyframes aim-wave { 0%,50%,100% { transform: rotate(0) } 58% { transform: rotate(-30deg) } 68% { transform: rotate(6deg) } 78% { transform: rotate(-30deg) } 88% { transform: rotate(0) } }
@keyframes aim-blink { 0%,92%,100% { transform: scaleY(1) } 95% { transform: scaleY(0.1) } }
@keyframes aim-ping { 0%,100% { transform: scale(1); opacity: .75 } 50% { transform: scale(1.5); opacity: .25 } }
@media (prefers-reduced-motion: reduce) {
  .aim-bounce,.aim-wave,.aim-blink,.aim-ping { animation: none }
}
`

export function AiMascot({
  className = '',
  size = 48,
  isAnimated = false,
  headOnly = false,
}: AiMascotProps): React.ReactElement {
  const viewBox = headOnly ? HEAD_VIEWBOX : FULL_VIEWBOX
  const [, , vw, vh] = viewBox.split(' ').map(Number) as [
    number,
    number,
    number,
    number,
  ]
  const cls = (name: string): string =>
    isAnimated ? `aim-part ${name}` : 'aim-part'

  return (
    <svg
      viewBox={viewBox}
      width={(size * vw) / vh}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Trợ lý ảo TH-PropTech"
      className={`select-none overflow-visible ${className}`}
    >
      {isAnimated && <style>{MASCOT_CSS}</style>}
      <defs>
        {/* Main Body Gradient */}
        <linearGradient id="bodyGrad" x1="20" y1="20" x2="100" y2="110">
          <stop offset="0%" stopColor="#FFE6DA" />
          <stop offset="50%" stopColor="#F9CDB9" />
          <stop offset="100%" stopColor="#EFA98F" />
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
        <filter id="shadowFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="4"
            stdDeviation="4"
            floodColor="#C65A3A"
            floodOpacity="0.3"
          />
        </filter>
      </defs>

      <g className={cls('aim-bounce')}>
        {!headOnly && (
          <>
            {/* Legs + feet */}
            <rect
              x="46"
              y="118"
              width="9"
              height="20"
              rx="4.5"
              fill="#A04024"
            />
            <rect
              x="65"
              y="118"
              width="9"
              height="20"
              rx="4.5"
              fill="#A04024"
            />
            <ellipse cx="48" cy="140" rx="9" ry="5" fill="#C65A3A" />
            <ellipse cx="72" cy="140" rx="9" ry="5" fill="#C65A3A" />

            {/* Left arm */}
            <path
              d="M44 106 Q30 110 26 126"
              stroke="#E28766"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <circle
              cx="26"
              cy="128"
              r="5"
              fill="#FFE6DA"
              stroke="#E28766"
              strokeWidth="2"
            />

            {/* Torso */}
            <rect
              x="42"
              y="94"
              width="36"
              height="30"
              rx="13"
              fill="url(#roofGrad)"
            />
            <path d="M60 103 L65 109 L60 115 L55 109 Z" fill="#FFFFFF" />

            {/* Right arm (waving) */}
            <g className={cls('aim-wave')}>
              <path
                d="M76 106 Q92 104 96 88"
                stroke="#E28766"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <circle
                cx="96"
                cy="85"
                r="5"
                fill="#FFE6DA"
                stroke="#E28766"
                strokeWidth="2"
              />
            </g>
          </>
        )}

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
          className={cls('aim-ping')}
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
          stroke="#C65A3A"
          strokeWidth="2.5"
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
        <g className={cls('aim-blink')}>
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
      </g>
    </svg>
  )
}
