'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { Logo } from '@/shared/ui/logo'

type Theme = 'dark' | 'light'

/* ── SVG Icons ── */
function IconBuilding(): React.ReactElement {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
    </svg>
  )
}

function IconShield(): React.ReactElement {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function IconBot(): React.ReactElement {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M2 14h2M20 14h2M9 13v2M15 13v2" />
    </svg>
  )
}

/* ── Topo Pattern SVG ── */
function TopoPattern(): React.ReactElement {
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

/* ── Skyline SVG ── */
function SkylineIllustration(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 400 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto block w-full max-w-sm drop-shadow-sm"
      aria-hidden="true"
    >
      <rect x="32" y="200" width="360" height="2" rx="1" fill="var(--border)" />
      {/* Building 1 */}
      <rect
        x="52"
        y="60"
        width="55"
        height="140"
        rx="4"
        fill="var(--surface)"
        stroke="var(--border)"
        strokeWidth="1.2"
      />
      <rect
        x="62"
        y="74"
        width="12"
        height="14"
        rx="2"
        fill="var(--primary-soft)"
      />
      <rect
        x="62"
        y="98"
        width="12"
        height="14"
        rx="2"
        fill="var(--primary-soft)"
      />
      <rect
        x="62"
        y="122"
        width="12"
        height="14"
        rx="2"
        fill="var(--primary-soft)"
      />
      <rect
        x="62"
        y="146"
        width="12"
        height="14"
        rx="2"
        fill="var(--primary-soft)"
      />
      <rect
        x="62"
        y="170"
        width="12"
        height="14"
        rx="2"
        fill="var(--accent-soft)"
      />
      <rect
        x="85"
        y="74"
        width="12"
        height="14"
        rx="2"
        fill="var(--primary-soft)"
      />
      <rect
        x="85"
        y="98"
        width="12"
        height="14"
        rx="2"
        fill="var(--primary-soft)"
      />
      <rect
        x="85"
        y="122"
        width="12"
        height="14"
        rx="2"
        fill="var(--accent-soft)"
      />
      <rect
        x="85"
        y="146"
        width="12"
        height="14"
        rx="2"
        fill="var(--primary-soft)"
      />
      <rect
        x="85"
        y="170"
        width="12"
        height="14"
        rx="2"
        fill="var(--primary-soft)"
      />
      {/* Building 2 — hero */}
      <rect
        x="127"
        y="30"
        width="70"
        height="170"
        rx="5"
        fill="var(--surface)"
        stroke="var(--border-strong)"
        strokeWidth="1.5"
      />
      <rect
        x="127"
        y="30"
        width="70"
        height="8"
        rx="5"
        fill="var(--primary)"
        opacity="0.85"
      />
      <rect
        x="139"
        y="50"
        width="14"
        height="16"
        rx="2.5"
        fill="var(--primary-soft)"
      />
      <rect
        x="139"
        y="78"
        width="14"
        height="16"
        rx="2.5"
        fill="var(--primary-soft)"
      />
      <rect
        x="139"
        y="106"
        width="14"
        height="16"
        rx="2.5"
        fill="var(--accent-soft)"
      />
      <rect
        x="139"
        y="134"
        width="14"
        height="16"
        rx="2.5"
        fill="var(--primary-soft)"
      />
      <rect
        x="171"
        y="50"
        width="14"
        height="16"
        rx="2.5"
        fill="var(--accent-soft)"
      />
      <rect
        x="171"
        y="78"
        width="14"
        height="16"
        rx="2.5"
        fill="var(--primary-soft)"
      />
      <rect
        x="171"
        y="106"
        width="14"
        height="16"
        rx="2.5"
        fill="var(--primary-soft)"
      />
      <rect
        x="171"
        y="134"
        width="14"
        height="16"
        rx="2.5"
        fill="var(--primary-soft)"
      />
      <rect
        x="152"
        y="166"
        width="20"
        height="34"
        rx="3"
        fill="var(--primary)"
        opacity="0.25"
      />
      {/* Building 3 */}
      <rect
        x="217"
        y="80"
        width="60"
        height="120"
        rx="4"
        fill="var(--surface)"
        stroke="var(--border)"
        strokeWidth="1.2"
      />
      <rect
        x="227"
        y="94"
        width="11"
        height="13"
        rx="2"
        fill="var(--accent-soft)"
      />
      <rect
        x="227"
        y="116"
        width="11"
        height="13"
        rx="2"
        fill="var(--primary-soft)"
      />
      <rect
        x="227"
        y="138"
        width="11"
        height="13"
        rx="2"
        fill="var(--primary-soft)"
      />
      <rect
        x="227"
        y="160"
        width="11"
        height="13"
        rx="2"
        fill="var(--primary-soft)"
      />
      <rect
        x="256"
        y="94"
        width="11"
        height="13"
        rx="2"
        fill="var(--primary-soft)"
      />
      <rect
        x="256"
        y="116"
        width="11"
        height="13"
        rx="2"
        fill="var(--primary-soft)"
      />
      <rect
        x="256"
        y="138"
        width="11"
        height="13"
        rx="2"
        fill="var(--accent-soft)"
      />
      <rect
        x="256"
        y="160"
        width="11"
        height="13"
        rx="2"
        fill="var(--primary-soft)"
      />
      {/* Building 4 */}
      <rect
        x="297"
        y="120"
        width="50"
        height="80"
        rx="4"
        fill="var(--surface)"
        stroke="var(--border)"
        strokeWidth="1.2"
      />
      <rect
        x="307"
        y="134"
        width="10"
        height="12"
        rx="2"
        fill="var(--primary-soft)"
      />
      <rect
        x="307"
        y="156"
        width="10"
        height="12"
        rx="2"
        fill="var(--accent-soft)"
      />
      <rect
        x="327"
        y="134"
        width="10"
        height="12"
        rx="2"
        fill="var(--accent-soft)"
      />
      <rect
        x="327"
        y="156"
        width="10"
        height="12"
        rx="2"
        fill="var(--primary-soft)"
      />
      <rect
        x="314"
        y="176"
        width="16"
        height="24"
        rx="2.5"
        fill="var(--primary)"
        opacity="0.2"
      />
      {/* Trees */}
      <circle cx="372" cy="180" r="12" fill="var(--success)" opacity="0.2" />
      <rect
        x="370"
        y="190"
        width="4"
        height="10"
        rx="1"
        fill="var(--success)"
        opacity="0.3"
      />
      <circle cx="42" cy="185" r="10" fill="var(--success)" opacity="0.18" />
      <rect
        x="40"
        y="193"
        width="4"
        height="7"
        rx="1"
        fill="var(--success)"
        opacity="0.25"
      />
    </svg>
  )
}

const FEATURES = [
  {
    icon: <IconBuilding />,
    text: 'Trải nghiệm căn hộ thực tế qua VR 360\u00b0',
  },
  { icon: <IconShield />, text: 'Hợp đồng ghi nhận Blockchain' },
  { icon: <IconBot />, text: 'Trợ lý AI tư vấn 24/7' },
]

export function AuthBrandingPanel(): React.ReactElement {
  const [theme, setTheme] = React.useState<Theme>('dark')

  const toggleTheme = (): void => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  const isDark = theme === 'dark'

  return (
    <div className="sticky top-0 hidden w-[52%] h-screen overflow-hidden lg:block">
      {/* ═══ DARK THEME ═══ */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{
          opacity: isDark ? 1 : 0,
          pointerEvents: isDark ? 'auto' : 'none',
        }}
      >
        {/* Dark gradient base */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(160deg, #1a1410 0%, #2b211e 35%, #3d2e26 65%, #4a3228 100%)',
          }}
        />

        {/* Topo pattern */}
        <div className="absolute inset-0 text-white">
          <TopoPattern />
        </div>

        {/* Warm accent glow spots */}
        <div
          className="absolute -right-20 top-1/4 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(198,90,58,0.15) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute -left-16 bottom-1/4 h-[400px] w-[400px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(242,182,109,0.10) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute left-1/3 top-0 h-[300px] w-[300px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(107,142,78,0.06) 0%, transparent 60%)',
          }}
        />

        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ═══ LIGHT THEME ═══ */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{
          opacity: isDark ? 0 : 1,
          pointerEvents: isDark ? 'none' : 'auto',
        }}
      >
        <div className="absolute inset-0 bg-[var(--surface-muted)]" />

        {/* Architectural grid pattern */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.035]"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="arch-grid"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path d="M0 40h80M40 0v80" stroke="#2b211e" strokeWidth="0.5" />
              <rect
                x="10"
                y="10"
                width="20"
                height="20"
                fill="none"
                stroke="#2b211e"
                strokeWidth="0.3"
              />
              <rect
                x="50"
                y="50"
                width="20"
                height="20"
                fill="none"
                stroke="#2b211e"
                strokeWidth="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#arch-grid)" />
        </svg>

        {/* Warm gradient accents */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 80% 90%, rgba(198,90,58,0.10) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 50% at 10% 20%, rgba(242,182,109,0.08) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* ═══ CONTENT (shared, adapts to theme) ═══ */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6 lg:p-8 xl:p-10">
        {/* Logo */}
        <div className="flex items-center justify-between">
          <Link
            href={'/' as Route}
            className="hover:opacity-85 transition-opacity"
          >
            <Logo size="lg" variant={isDark ? 'white' : 'default'} />
          </Link>

          {/* Background style toggle (Layers icon) */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 ${
              isDark
                ? 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                : 'bg-fg/5 text-muted hover:bg-fg/10 hover:text-fg'
            }`}
            title={
              isDark
                ? 'Chuyển sang nền ô lưới đô thị'
                : 'Chuyển sang nền địa hình Blockchain'
            }
            aria-label="Đổi phong cách bản đồ nền"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </button>
        </div>

        {/* Center area */}
        <div className="flex flex-col items-center gap-4 lg:gap-6">
          {/* Fixed height container to prevent layout shifting/page scrolling */}
          <div className="relative flex h-[160px] lg:h-[180px] w-full items-center justify-center">
            {/* Skyline — light only */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-all duration-700"
              style={{
                opacity: isDark ? 0 : 1,
                transform: isDark ? 'scale(0.95)' : 'scale(1)',
                pointerEvents: isDark ? 'none' : 'auto',
              }}
            >
              <SkylineIllustration />
            </div>

            {/* Large decorative house icon — dark only */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-all duration-700"
              style={{
                opacity: isDark ? 1 : 0,
                transform: isDark ? 'scale(1)' : 'scale(0.95)',
                pointerEvents: isDark ? 'auto' : 'none',
              }}
            >
              <svg
                viewBox="0 0 400 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto block w-full max-w-sm drop-shadow-xl animate-pulse-subtle"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="gold-grad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#C65A3A" />
                    <stop offset="100%" stopColor="#F2B66D" />
                  </linearGradient>
                  <linearGradient
                    id="glow-grad"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
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
            </div>
          </div>

          {/* Headline */}
          <div className="flex flex-col items-center gap-2 lg:gap-3 text-center">
            <h1
              className={`font-display text-[1.8rem] lg:text-[2.2rem] font-bold leading-[1.15] tracking-tight xl:text-[2.4rem] transition-colors duration-500 ${
                isDark ? 'text-white' : 'text-fg'
              }`}
            >
              Thuê căn hộ{' '}
              <span
                className={isDark ? 'text-[var(--accent)]' : 'text-primary'}
              >
                minh bạch
              </span>
              <br />
              &amp;{' '}
              <span
                className={isDark ? 'text-[var(--accent)]' : 'text-primary'}
              >
                tin cậy
              </span>
            </h1>
            <p
              className={`max-w-sm text-sm leading-relaxed transition-colors duration-500 ${
                isDark ? 'text-white/60' : 'text-muted'
              }`}
            >
              Tìm kiếm, đặt lịch xem, đặt cọc và ký hợp đồng — tất cả được ghi
              nhận trên Blockchain.
            </p>
          </div>
        </div>

        {/* Feature highlights + trust */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            {FEATURES.map(item => (
              <div
                key={item.text}
                className={`flex items-center gap-3 rounded-lg border px-4 py-2 transition-all duration-500 ${
                  isDark
                    ? 'border-white/10 bg-white/5 backdrop-blur-sm'
                    : 'border-border/60 bg-surface/80 backdrop-blur-sm'
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors duration-500 ${
                    isDark
                      ? 'bg-[var(--accent)]/15 text-[var(--accent)]'
                      : 'bg-primary-soft text-primary'
                  }`}
                >
                  {item.icon}
                </div>
                <span
                  className={`text-sm font-medium transition-colors duration-500 ${
                    isDark ? 'text-white/85' : 'text-fg'
                  }`}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Trust line */}
          <div className="flex items-center gap-2 px-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--success)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span
              className={`text-xs transition-colors duration-500 ${isDark ? 'text-white/50' : 'text-muted'}`}
            >
              Được tin dùng bởi hàng nghìn khách thuê tại TP.HCM
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
