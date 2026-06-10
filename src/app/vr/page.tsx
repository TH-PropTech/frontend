'use client'

import * as React from 'react'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { VRShowcase } from '@/widgets/home-dashboard/ui/vr-showcase'

export default function VRPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-primary/20 selection:text-primary">
      <HomeHeader />

      <main className="w-full">
        {/* Header Hero Section */}
        <section className="relative flex flex-col items-center justify-center bg-gradient-to-b from-[#f4eee7]/60 to-[#faf7f2] pb-24 pt-32 text-center rounded-b-[40px] border-b border-border">
          <div className="mx-auto w-full max-w-6xl px-6 md:px-10 z-10">
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
      <footer className="border-t border-border bg-surface py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row md:px-10">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <span className="font-display text-sm font-bold text-fg">
              © TH-PropTech · 2026
            </span>
            <span className="font-body text-[11px] text-muted">
              Khóa luận tốt nghiệp ngành KTPM · Đại học HUTECH
            </span>
          </div>
          <span className="text-center font-mono text-[11px] text-muted sm:text-right">
            Tư vấn thuê căn hộ · Trạng thái giao dịch · Bằng chứng Blockchain
          </span>
        </div>
      </footer>
    </div>
  )
}
