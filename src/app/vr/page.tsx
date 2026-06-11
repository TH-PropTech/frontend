'use client'

import * as React from 'react'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { VRShowcase } from '@/widgets/home-dashboard/ui/vr-showcase'
import { Footer } from '@/shared/ui/footer'

export default function VRPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-primary/20 selection:text-primary">
      <HomeHeader />

      <main className="w-full">
        {/* Header Hero Section (Warm Cream Design with Topography Overlay) */}
        <section className="relative flex flex-col items-center justify-center bg-gradient-to-b from-[#f5ece2] via-[#faf6f1] to-bg pb-24 pt-32 text-center rounded-b-[40px] border-b border-border">
          {/* Topography SVG Background (extremely lightweight, vector-rendered) */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none select-none overflow-hidden"
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
              backfaceVisibility: 'hidden',
            }}
          >
            <svg
              className="w-full h-full min-w-[1440px] min-h-[300px]"
              viewBox="0 0 1440 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M-100 80 C 300 10, 600 150, 1000 60 C 1200 30, 1500 100, 1600 80"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M-100 110 C 300 40, 600 180, 1000 90 C 1200 60, 1500 130, 1600 110"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M-100 140 C 300 70, 600 210, 1000 120 C 1200 90, 1500 160, 1600 140"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M-100 170 C 300 100, 600 240, 1000 150 C 1200 120, 1500 190, 1600 170"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M-100 200 C 300 130, 600 270, 1000 180 C 1200 150, 1500 220, 1600 200"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />

              <path
                d="M 100 250 C 400 150, 700 290, 1100 210 C 1300 180, 1500 250, 1600 230"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M 100 280 C 400 180, 700 320, 1100 240 C 1300 210, 1500 280, 1600 260"
                stroke="#c65a3a"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>

          <div className="absolute -left-32 -top-32 w-96 h-96 bg-[#c65a3a]/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-[#f2b66d]/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="mx-auto w-full max-w-6xl px-6 md:px-10 z-10 relative">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#c65a3a] mb-2 block">
              CÔNG NGHỆ KHÔNG GIAN
            </span>
            <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl text-[#2b211e]">
              Tương tác không gian 3D thực tế
            </h1>
            <p className="mx-auto mt-2 max-w-xl font-body text-sm text-[#7a6a61]">
              Chủ động xoay góc nhìn, kiểm tra nội thất và cấu trúc phòng trước
              khi quyết định đặt lịch xem phòng trực tiếp.
            </p>
          </div>
        </section>

        {/* VR Showcase Container */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-10">
          <div className="rounded-3xl border border-border bg-white p-4 shadow-[0_20px_50px_rgba(43,33,30,0.08)]">
            <VRShowcase />
          </div>
        </section>
      </main>

      {/* Page Footer */}
      <Footer />
    </div>
  )
}
