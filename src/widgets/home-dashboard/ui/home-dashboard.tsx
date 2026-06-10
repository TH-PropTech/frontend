'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Route } from 'next'
import { HomeHeader } from './home-header'
import { Button } from '@/shared/ui/button'

export function HomeDashboard(): React.ReactElement {
  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-primary/20 selection:text-primary">
      {/* Absolute Dynamic Header */}
      <HomeHeader />

      {/* Main Content Areas */}
      <main className="w-full">
        {/* 1. Hero Section */}
        <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pb-24 pt-32 rounded-b-[40px] shadow-[0_24px_50px_-10px_rgba(43,33,30,0.16)] border-b border-white/5">
          {/* Parallax / Animated Background Frame */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/c10c12b6-901f-4f31-ba98-50fd2e28df00.png"
              alt="TH-PropTech Hero Background"
              fill
              priority
              className="object-cover brightness-[0.55] saturate-[0.85] transition-transform duration-1000"
            />
            {/* Warm brown gradient overlays from prototype */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2b211e]/82 via-[#2b211e]/60 to-[#2b211e]/20" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#2b211e]/20 to-[#2b211e]/30" />
          </div>

          {/* Hero Content Inner */}
          <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
            <div className="max-w-3xl space-y-6 text-white animate-in fade-in slide-in-from-bottom-8 duration-700">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/85">
                Trustworthy PropTech SaaS
              </span>
              <h1 className="font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl md:text-[62px] text-white">
                Tìm căn hộ phù hợp,
                <br />
                minh bạch từng bước.
              </h1>
              <p className="max-w-xl font-body text-base md:text-lg text-white/85 leading-relaxed">
                TH-PropTech giúp khách thuê lọc căn hộ, đặt lịch xem, theo dõi
                đặt cọc, hợp đồng và thanh toán trong một luồng vận hành rõ
                trạng thái.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href={'/properties' as Route}>
                  <Button
                    variant="primary"
                    size="lg"
                    className="rounded-full shadow-[0_14px_32px_rgba(198,90,58,0.25)] bg-[#c65a3a] hover:bg-[#9f3f2a] text-white font-bold transition-all hover:-translate-y-0.5"
                  >
                    Tìm căn hộ ngay
                  </Button>
                </Link>
                <Link href={'/vr' as Route}>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="rounded-full border border-white/45 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 font-bold transition-all hover:-translate-y-0.5"
                  >
                    Khám phá VR 3D
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Platform Overview Section */}
        <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
          <div className="mb-16 text-center">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#c65a3a]">
              HỆ SINH THÁI TH-PROPTECH
            </span>
            <h2 className="mt-3 font-marketing text-3xl font-bold text-fg sm:text-4xl">
              Nền tảng thuê nhà thế hệ mới
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-sm text-muted">
              Kết hợp công nghệ tìm kiếm thông minh, hình ảnh VR 3D trực quan và
              minh bạch giao dịch trên nền tảng số.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Properties Search */}
            <div className="group relative rounded-3xl border border-border bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[260px]">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-[#c65a3a]/10 flex items-center justify-center text-[#c65a3a]">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </div>
                <h3 className="font-marketing text-xl font-bold text-fg">
                  Tìm kiếm & Lọc căn hộ thông minh
                </h3>
                <p className="font-body text-xs text-muted leading-relaxed">
                  Lọc nhanh căn hộ theo khu vực, mức giá, diện tích và loại hình
                  mong muốn. Hình ảnh thực tế, thông tin đầy đủ, cập nhật thời
                  gian thực.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href={'/properties' as Route}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#c65a3a] group-hover:translate-x-1 transition-transform"
                >
                  Xem danh sách căn hộ
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Card 2: VR Tour */}
            <div className="group relative rounded-3xl border border-border bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[260px]">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-[#c65a3a]/10 flex items-center justify-center text-[#c65a3a]">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                    />
                  </svg>
                </div>
                <h3 className="font-marketing text-xl font-bold text-fg">
                  Không gian 3D tương tác thực tế ảo
                </h3>
                <p className="font-body text-xs text-muted leading-relaxed">
                  Tham quan phòng từ xa thông qua công nghệ 360 VR Tour. Xem chi
                  tiết cấu trúc phòng, cách bài trí nội thất trực quan trước khi
                  đi xem thực tế.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href={'/vr' as Route}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#c65a3a] group-hover:translate-x-1 transition-transform"
                >
                  Trải nghiệm VR ngay
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Card 3: Blockchain Process */}
            <div className="group relative rounded-3xl border border-border bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[260px]">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-[#c65a3a]/10 flex items-center justify-center text-[#c65a3a]">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751A11.956 11.956 0 0112 2.714Z"
                    />
                  </svg>
                </div>
                <h3 className="font-marketing text-xl font-bold text-fg">
                  Hành trình thuê bảo mật với Blockchain
                </h3>
                <p className="font-body text-xs text-muted leading-relaxed">
                  Bảo mật thông tin hợp đồng và đặt cọc bằng công nghệ
                  Blockchain. Ghi nhận vĩnh viễn hóa đơn thanh toán và nhật ký
                  thuê trên sổ cái chống sửa đổi.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href={'/process' as Route}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#c65a3a] group-hover:translate-x-1 transition-transform"
                >
                  Tìm hiểu quy trình minh bạch
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Card 4: Contact Consultation */}
            <div className="group relative rounded-3xl border border-border bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[260px]">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-[#c65a3a]/10 flex items-center justify-center text-[#c65a3a]">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="font-marketing text-xl font-bold text-fg">
                  Đăng ký tư vấn trực tiếp
                </h3>
                <p className="font-body text-xs text-muted leading-relaxed">
                  Để lại thông tin và yêu cầu chi tiết về căn hộ mong muốn. Đội
                  ngũ tư vấn chuyên nghiệp của TH-PropTech sẽ lập tức phản hồi
                  và đồng hành cùng bạn.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href={'/contact' as Route}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#c65a3a] group-hover:translate-x-1 transition-transform"
                >
                  Đăng ký tư vấn ngay
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
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
