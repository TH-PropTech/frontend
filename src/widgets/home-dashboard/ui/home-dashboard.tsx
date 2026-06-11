'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Route } from 'next'
import { HomeHeader } from './home-header'
import { Button } from '@/shared/ui/button'
import { Footer } from '@/shared/ui/footer'

export function HomeDashboard(): React.ReactElement {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null)

  return (
    <div className="relative min-h-screen bg-bg text-fg selection:bg-primary/20 selection:text-primary">
      {/* Topography SVG Background (fixed background overlay, extremely lightweight & hardware accelerated) */}
      <div
        className="fixed inset-0 opacity-[0.08] pointer-events-none select-none overflow-hidden z-[1]"
        style={{
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
        }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Top Left Curves */}
          <path
            d="M-100 100 C 300 20, 600 180, 1000 80 C 1200 40, 1500 120, 1600 100"
            stroke="#c65a3a"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-100 130 C 300 50, 600 210, 1000 110 C 1200 70, 1500 150, 1600 130"
            stroke="#c65a3a"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-100 160 C 300 80, 600 240, 1000 140 C 1200 100, 1500 180, 1600 160"
            stroke="#c65a3a"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-100 190 C 300 110, 600 270, 1000 170 C 1200 130, 1500 210, 1600 190"
            stroke="#c65a3a"
            strokeWidth="1.2"
            fill="none"
          />

          {/* Mid Right Curves */}
          <path
            d="M-50 450 C 400 320, 700 480, 1100 380 C 1300 340, 1500 420, 1600 400"
            stroke="#c65a3a"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-50 480 C 400 350, 700 510, 1100 410 C 1300 370, 1500 450, 1600 430"
            stroke="#c65a3a"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-50 510 C 400 380, 700 540, 1100 440 C 1300 400, 1500 480, 1600 460"
            stroke="#c65a3a"
            strokeWidth="1.2"
            fill="none"
          />

          {/* Bottom Left Curves */}
          <path
            d="M-100 700 C 300 620, 600 780, 1000 680 C 1200 640, 1500 720, 1600 700"
            stroke="#c65a3a"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-100 730 C 300 650, 600 810, 1000 710 C 1200 670, 1500 750, 1600 730"
            stroke="#c65a3a"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-100 760 C 300 680, 600 840, 1000 740 C 1200 700, 1500 780, 1600 760"
            stroke="#c65a3a"
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      </div>

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

        {/* 2.5. Featured Apartments Section */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-10">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                CĂN HỘ NỔI BẬT
              </span>
              <h2 className="mt-3 font-marketing text-3xl font-bold text-fg">
                Khám phá căn hộ đề xuất thực tế
              </h2>
            </div>
            <Link
              href={'/properties' as Route}
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline md:mt-0"
            >
              Xem tất cả căn hộ
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: '1',
                title: 'Căn hộ Sunrise City - Tháp V5',
                price: '14.5 Tr/tháng',
                location: 'Quận 7, TP. Hồ Chí Minh',
                beds: 2,
                baths: 2,
                area: '76 m²',
                tag: 'Blockchain Verified',
                vr: true,
                bg: 'from-amber-100 to-orange-100',
              },
              {
                id: '2',
                title: 'Vinhomes Central Park - Park 6',
                price: '18.0 Tr/tháng',
                location: 'Bình Thạnh, TP. Hồ Chí Minh',
                beds: 3,
                baths: 2,
                area: '98 m²',
                tag: 'Hot Deal',
                vr: true,
                bg: 'from-orange-100 to-red-100',
              },
              {
                id: '3',
                title: 'Masteri Thảo Điền - T5',
                price: '16.2 Tr/tháng',
                location: 'Quận 2, TP. Hồ Chí Minh',
                beds: 2,
                baths: 1,
                area: '68 m²',
                tag: 'Mới Đăng',
                vr: false,
                bg: 'from-amber-100/70 to-yellow-100/70',
              },
            ].map(apartment => (
              <div
                key={apartment.id}
                className="group overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-md"
              >
                {/* Mockup image placeholder using themed gradient */}
                <div
                  className={`relative h-48 w-full bg-gradient-to-br ${apartment.bg} flex items-center justify-center`}
                >
                  <span className="font-marketing text-lg font-bold text-primary/70">
                    {apartment.title.split(' - ')[0]}
                  </span>
                  <div className="absolute left-4 top-4 flex gap-2">
                    <span className="rounded-full bg-primary/90 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-white">
                      {apartment.tag}
                    </span>
                    {apartment.vr && (
                      <span className="rounded-full bg-[#2b211e]/85 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-white flex items-center gap-1">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                        </span>
                        360° VR
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-display text-base font-bold text-fg group-hover:text-primary transition-colors line-clamp-1">
                      {apartment.title}
                    </h3>
                  </div>

                  <p className="font-body text-xs text-muted flex items-center gap-1.5">
                    <svg
                      className="h-4 w-4 shrink-0 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                    {apartment.location}
                  </p>

                  <div className="grid grid-cols-3 gap-2 border-y border-border py-3 text-center">
                    <div>
                      <span className="block font-display text-xs font-bold text-fg">
                        {apartment.beds} PN
                      </span>
                      <span className="font-body text-[10px] text-muted">
                        Phòng ngủ
                      </span>
                    </div>
                    <div className="border-x border-border">
                      <span className="block font-display text-xs font-bold text-fg">
                        {apartment.baths} WC
                      </span>
                      <span className="font-body text-[10px] text-muted">
                        Phòng tắm
                      </span>
                    </div>
                    <div>
                      <span className="block font-display text-xs font-bold text-fg">
                        {apartment.area}
                      </span>
                      <span className="font-body text-[10px] text-muted">
                        Diện tích
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="block font-body text-[10px] text-muted">
                        Giá thuê
                      </span>
                      <span className="font-display text-lg font-bold text-primary">
                        {apartment.price}
                      </span>
                    </div>
                    <Link href={`/properties/${apartment.id}` as Route}>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-full border-border text-fg hover:bg-bg hover:text-primary transition-colors text-xs font-bold"
                      >
                        Chi tiết
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2.6. Comparison Section */}
        <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
          <div className="mb-16 text-center">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
              SO SÁNH MÔ HÌNH
            </span>
            <h2 className="mt-3 font-marketing text-3xl font-bold text-fg sm:text-4xl">
              Sự khác biệt vượt trội từ TH-PropTech
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-sm text-muted">
              So sánh trải nghiệm giữa quy trình thuê nhà kiểu cũ và giải pháp
              số hóa thế hệ mới.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-border bg-white shadow-sm">
            <table className="w-full min-w-[600px] border-collapse text-left font-body text-sm">
              <thead>
                <tr className="border-b border-border bg-surface text-fg font-display font-bold">
                  <th className="p-5">Tính năng so sánh</th>
                  <th className="p-5 text-muted text-xs">
                    Thuê nhà truyền thống
                  </th>
                  <th className="p-5 text-primary text-xs">
                    Giải pháp TH-PropTech
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-fg">
                {[
                  {
                    feat: 'Minh bạch thông tin',
                    old: 'Hình ảnh ảo, diện tích sai lệch, thông tin giá cả mập mờ qua trung gian.',
                    new: 'Thông tin căn hộ kiểm duyệt, đo đạc diện tích thực, cam kết giá thuê gốc.',
                  },
                  {
                    feat: 'Trải nghiệm xem nhà',
                    old: 'Tốn công sức đi lại xem thực tế nhiều nơi, lịch hẹn không đồng bộ.',
                    new: 'Tham quan trước qua 360° VR Tour trực quan, đặt lịch xem nhà trực tuyến tự động.',
                  },
                  {
                    feat: 'Bảo mật đặt cọc & hợp đồng',
                    old: 'Dễ xảy ra tranh chấp cọc giấy, hợp đồng dễ bị thay đổi điều khoản đơn phương.',
                    new: 'Ghi nhận hash giao dịch đặt cọc và hợp đồng vĩnh viễn trên Blockchain, chống sửa đổi.',
                  },
                  {
                    feat: 'Hỗ trợ tìm kiếm & gợi ý',
                    old: 'Tự tìm mò mẫm qua các group rác hoặc phụ thuộc môi giới chi phí cao.',
                    new: 'Gợi ý thông minh (AI Recommendation) cá nhân hóa dựa trên dữ liệu nhu cầu thực tế.',
                  },
                  {
                    feat: 'Quản lý lịch sử thanh toán',
                    old: 'Biên lai giấy dễ thất lạc, khó đối soát lịch sử đóng tiền hàng tháng.',
                    new: 'Hệ thống hóa đơn điện tử tự động, đối soát nhanh gọn, lưu trữ vĩnh viễn.',
                  },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-bg/20 transition-colors">
                    <td className="p-5 font-bold text-fg text-xs">
                      {row.feat}
                    </td>
                    <td className="p-5 text-muted/80 text-xs">{row.old}</td>
                    <td className="p-5 text-fg font-medium bg-primary-soft/10 text-xs">
                      <span className="flex items-center gap-2 text-primary">
                        <svg
                          className="h-4 w-4 shrink-0 text-success"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        {row.new}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 2.7. Apartment Types */}
        <section className="border-y border-border bg-surface py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <div className="mb-16 text-center">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                LOẠI HÌNH CĂN HỘ
              </span>
              <h2 className="mt-3 font-marketing text-3xl font-bold text-fg sm:text-4xl">
                Đa dạng lựa chọn theo nhu cầu
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-body text-sm text-muted">
                Từ căn hộ Studio nhỏ gọn cho sinh viên đến Penthouse cao cấp
                dành cho gia đình.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
              {[
                {
                  type: 'Studio',
                  desc: '25–35 m²',
                  price: 'Từ 5 Tr',
                  icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
                },
                {
                  type: '1 Phòng ngủ',
                  desc: '40–55 m²',
                  price: 'Từ 8 Tr',
                  icon: 'M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819',
                },
                {
                  type: '2 Phòng ngủ',
                  desc: '60–80 m²',
                  price: 'Từ 12 Tr',
                  icon: 'M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21',
                },
                {
                  type: '3 Phòng ngủ',
                  desc: '85–120 m²',
                  price: 'Từ 16 Tr',
                  icon: 'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z',
                },
                {
                  type: 'Duplex',
                  desc: '100–150 m²',
                  price: 'Từ 22 Tr',
                  icon: 'M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z',
                },
                {
                  type: 'Penthouse',
                  desc: '150+ m²',
                  price: 'Từ 35 Tr',
                  icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
                },
              ].map(item => (
                <Link
                  key={item.type}
                  href={'/properties' as Route}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-6 text-center shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={item.icon}
                      />
                    </svg>
                  </div>
                  <h3 className="font-display text-sm font-bold text-fg">
                    {item.type}
                  </h3>
                  <span className="font-body text-[10px] text-muted">
                    {item.desc}
                  </span>
                  <span className="font-display text-xs font-bold text-primary">
                    {item.price}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 3. How It Works — Rental Process Timeline */}
        <section className="border-y border-border bg-surface py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <div className="mb-16 text-center">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                QUY TRÌNH THUÊ CĂN HỘ
              </span>
              <h2 className="mt-3 font-marketing text-3xl font-bold text-fg sm:text-4xl">
                Minh bạch từng bước, rõ ràng từng giai đoạn
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-body text-sm text-muted">
                Toàn bộ hành trình thuê căn hộ được số hóa và ghi nhận trên hệ
                thống. Bạn luôn biết mình đang ở bước nào và cần làm gì tiếp
                theo.
              </p>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-6 top-0 hidden h-full w-px bg-border md:left-1/2 md:block"
                aria-hidden="true"
              />

              {[
                {
                  step: '01',
                  title: 'Tìm kiếm & Lọc căn hộ',
                  desc: 'Sử dụng bộ lọc thông minh theo khu vực, mức giá, diện tích, số phòng và tiện ích. Hệ thống AI gợi ý căn hộ phù hợp nhất dựa trên hồ sơ và lịch sử tìm kiếm của bạn.',
                  icon: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607Z',
                },
                {
                  step: '02',
                  title: 'Đặt lịch xem thực tế',
                  desc: 'Chọn ngày giờ thuận tiện để xem căn hộ trực tiếp. Trước khi đến, bạn có thể xem trước không gian qua VR Tour 360° ngay trên nền tảng.',
                  icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5',
                },
                {
                  step: '03',
                  title: 'Đặt cọc & Tạo hợp đồng',
                  desc: 'Thanh toán đặt cọc trực tuyến an toàn. Hợp đồng được tạo tự động với điều khoản rõ ràng, hai bên xác nhận điện tử trước khi có hiệu lực.',
                  icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
                },
                {
                  step: '04',
                  title: 'Thanh toán & Ghi nhận Blockchain',
                  desc: 'Mỗi giao dịch thanh toán được ghi nhận hash lên Blockchain. Bạn có thể kiểm chứng bất kỳ lúc nào — đảm bảo minh bạch, chống sửa đổi và bảo vệ quyền lợi cả hai bên.',
                  icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h0A11.956 11.956 0 0012 2.714z',
                },
              ].map((item, i) => (
                <div
                  key={item.step}
                  className={`relative mb-12 flex flex-col md:flex-row md:items-start ${
                    i % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Step circle */}
                  <div className="absolute left-6 z-10 hidden md:left-1/2 md:block md:-translate-x-1/2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-surface font-display text-sm font-bold text-primary shadow-sm">
                      {item.step}
                    </div>
                  </div>

                  {/* Content card */}
                  <div
                    className={`w-full md:w-[calc(50%-40px)] ${i % 2 === 0 ? 'md:pr-4' : 'md:pl-4'}`}
                  >
                    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary md:hidden">
                          <span className="font-display text-xs font-bold">
                            {item.step}
                          </span>
                        </div>
                        <h3 className="font-display text-lg font-bold text-fg">
                          {item.title}
                        </h3>
                      </div>
                      <p className="font-body text-sm leading-relaxed text-muted">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3.5. Landlord Section */}
        <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary-soft/30 via-white to-accent-soft/20 p-8 md:p-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
              <div className="space-y-6">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                  DÀNH CHO CHỦ NHÀ
                </span>
                <h2 className="font-marketing text-3xl font-bold text-fg sm:text-4xl">
                  Quản lý căn hộ cho thuê thông minh & hiệu quả hơn
                </h2>
                <p className="font-body text-sm leading-relaxed text-muted">
                  TH-PropTech cung cấp công cụ SAAS chuyên nghiệp giúp chủ nhà
                  tối ưu tỷ lệ lấp đầy phòng, quản lý hợp đồng thuê và lịch hẹn
                  xem nhà tự động.
                </p>
                <div className="space-y-3 font-body text-sm text-fg">
                  {[
                    'Đăng tin căn hộ nhanh chóng, hỗ trợ tích hợp VR Tour 3D',
                    'Duyệt lịch xem nhà tự động của khách thuê thông qua lịch biểu thông minh',
                    'Ký hợp đồng điện tử và nhận cọc an toàn, minh bạch',
                    'Báo cáo doanh thu và tình hình lấp đầy phòng theo thời gian thực',
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                        <svg
                          className="h-2.5 w-2.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      </div>
                      <span className="text-xs">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <Link href={'/contact' as Route}>
                    <Button
                      variant="primary"
                      className="rounded-full bg-primary hover:bg-primary-hover text-white font-bold"
                    >
                      Đăng ký ký gửi căn hộ
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm">
                <span className="font-display text-xs font-bold text-muted uppercase">
                  Quy trình ký gửi
                </span>
                <div className="relative border-l border-border pl-4 space-y-6">
                  {[
                    {
                      title: '1. Đăng ký tài khoản',
                      desc: 'Tạo tài khoản chủ nhà và xác minh thông tin sở hữu.',
                    },
                    {
                      title: '2. Tải lên thông tin',
                      desc: 'Đăng tải thông tin, diện tích, hình ảnh và tiện ích căn hộ.',
                    },
                    {
                      title: '3. Tích hợp VR Tour',
                      desc: 'Hỗ trợ chụp ảnh 360° tạo VR Tour trực quan cho căn hộ.',
                    },
                    {
                      title: '4. Bắt đầu vận hành',
                      desc: 'Nhận yêu cầu xem nhà, ký hợp đồng trực tuyến và thu cọc.',
                    },
                  ].map((step, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[22px] top-1 flex h-3 w-3 items-center justify-center rounded-full bg-primary ring-4 ring-white" />
                      <h4 className="font-display text-sm font-bold text-fg">
                        {step.title}
                      </h4>
                      <p className="font-body text-xs text-muted mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Technology Deep-Dive — 3 Pillars */}
        <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
          <div className="mb-16 text-center">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
              CÔNG NGHỆ CỐT LÕI
            </span>
            <h2 className="mt-3 font-marketing text-3xl font-bold text-fg sm:text-4xl">
              Ba trụ cột công nghệ của TH-PropTech
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-sm text-muted">
              Kết hợp Blockchain, AI và VR 3D để tạo nên trải nghiệm thuê nhà
              minh bạch, thông minh và trực quan chưa từng có.
            </p>
          </div>

          <div className="flex flex-col gap-16">
            {/* Pillar 1: Blockchain */}
            <div className="flex flex-col items-center gap-8 md:flex-row">
              <div className="flex h-48 w-full items-center justify-center rounded-3xl border border-border bg-gradient-to-br from-primary-soft via-surface to-accent-soft md:w-5/12">
                <svg
                  className="h-24 w-24 text-primary/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={0.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                  />
                </svg>
              </div>
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-success/20 bg-success-soft px-3 py-1">
                  <svg
                    className="h-3.5 w-3.5 text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h0A11.956 11.956 0 0012 2.714z"
                    />
                  </svg>
                  <span className="font-mono text-[10px] font-bold uppercase text-success">
                    Blockchain
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-fg">
                  Giao dịch minh bạch, chống giả mạo
                </h3>
                <p className="font-body text-sm leading-relaxed text-muted">
                  Mỗi hợp đồng, đặt cọc và thanh toán đều được ghi nhận hash bất
                  biến trên Blockchain. Khách thuê và chủ nhà có thể kiểm chứng
                  bất kỳ giao dịch nào bằng mã hash — không ai có thể sửa đổi,
                  xóa hay phủ nhận.
                </p>
                <ul className="space-y-2 font-body text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    Hash giao dịch có thể tra cứu công khai bất kỳ lúc nào
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    Hợp đồng thuê ghi nhận vĩnh viễn, chống sửa đổi
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    Bảo vệ quyền lợi khách thuê lẫn chủ nhà
                  </li>
                </ul>
              </div>
            </div>

            {/* Pillar 2: AI */}
            <div className="flex flex-col items-center gap-8 md:flex-row-reverse">
              <div className="flex h-48 w-full items-center justify-center rounded-3xl border border-border bg-gradient-to-br from-accent-soft via-surface to-primary-soft md:w-5/12">
                <svg
                  className="h-24 w-24 text-accent/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={0.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                  />
                </svg>
              </div>
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-soft px-3 py-1">
                  <svg
                    className="h-3.5 w-3.5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                    />
                  </svg>
                  <span className="font-mono text-[10px] font-bold uppercase text-primary">
                    AI Recommendation
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-fg">
                  Gợi ý thông minh, cá nhân hóa
                </h3>
                <p className="font-body text-sm leading-relaxed text-muted">
                  Hệ thống kết hợp thuật toán Naive Bayes và Content-Based
                  Filtering để phân tích hồ sơ người dùng (độ tuổi, thu nhập,
                  khu vực ưa thích, số phòng, tiện ích) và đề xuất căn hộ phù
                  hợp nhất. Mỗi gợi ý kèm điểm tin cậy và giải thích chi tiết.
                </p>
                <ul className="space-y-2 font-body text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    Hybrid: Naive Bayes + Content-Based Filtering
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    Explainable AI — giải thích lý do từng gợi ý
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    Học từ phản hồi người dùng (online learning)
                  </li>
                </ul>
              </div>
            </div>

            {/* Pillar 3: VR 3D */}
            <div className="flex flex-col items-center gap-8 md:flex-row">
              <div className="flex h-48 w-full items-center justify-center rounded-3xl border border-border bg-gradient-to-br from-surface-muted via-surface to-primary-soft md:w-5/12">
                <svg
                  className="h-24 w-24 text-primary/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={0.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                  />
                </svg>
              </div>
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1">
                  <svg
                    className="h-3.5 w-3.5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                    />
                  </svg>
                  <span className="font-mono text-[10px] font-bold uppercase text-primary">
                    VR 3D Tour
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-fg">
                  Xem nhà từ xa, trải nghiệm như thực
                </h3>
                <p className="font-body text-sm leading-relaxed text-muted">
                  Mô hình 3D tương tác toàn khu đô thị cho phép bạn chọn tòa
                  nhà, chọn tầng và bước vào xem nội thất căn hộ qua VR Tour
                  360°. Bếp, phòng khách, phòng ngủ, ban công — tất cả hiện lên
                  chân thực với ảnh 360° chất lượng cao.
                </p>
                <ul className="space-y-2 font-body text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    Mô hình 3D Master Plan toàn khu đô thị
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    VR Tour 360° nội thất thực tế từng phòng
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    Chế độ đi bộ Avatar tham quan tự do
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Stats Section */}
        <section className="border-y border-border bg-surface py-20">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                {
                  value: '360°',
                  label: 'VR Tour trực quan',
                  sub: 'Xem từng phòng',
                },
                {
                  value: '7',
                  label: 'Bước quy trình',
                  sub: 'Số hóa hoàn toàn',
                },
                {
                  value: '100%',
                  label: 'Ghi nhận Blockchain',
                  sub: 'Chống sửa đổi',
                },
                { value: 'AI', label: 'Gợi ý thông minh', sub: 'Cá nhân hóa' },
              ].map(stat => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center"
                >
                  <span className="font-display text-4xl font-bold text-primary sm:text-5xl">
                    {stat.value}
                  </span>
                  <span className="mt-2 font-display text-sm font-bold text-fg">
                    {stat.label}
                  </span>
                  <span className="mt-0.5 font-body text-xs text-muted">
                    {stat.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5.1. Featured Locations */}
        <section className="mx-auto max-w-6xl px-6 py-20 md:px-10">
          <div className="mb-12 text-center">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
              KHU VỰC NỔI BẬT
            </span>
            <h2 className="mt-3 font-marketing text-2xl font-bold text-fg sm:text-3xl">
              Khám phá căn hộ theo khu vực ưa thích
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-sm text-muted">
              Tìm kiếm nhanh căn hộ cho thuê tại các quận sầm uất nhất TP. Hồ
              Chí Minh.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {[
              { name: 'Quận 1', count: 24, range: '12–25 Tr' },
              { name: 'Quận 2', count: 38, range: '10–20 Tr' },
              { name: 'Quận 7', count: 45, range: '8–18 Tr' },
              { name: 'Bình Thạnh', count: 32, range: '9–17 Tr' },
              { name: 'Thủ Đức', count: 27, range: '7–15 Tr' },
              { name: 'Phú Nhuận', count: 19, range: '10–19 Tr' },
            ].map(area => (
              <Link
                key={area.name}
                href={'/properties' as Route}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-5 text-center shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                </div>
                <span className="font-display text-xs font-bold text-fg">
                  {area.name}
                </span>
                <div className="space-y-0.5">
                  <span className="block font-display text-sm font-bold text-primary">
                    {area.count}+
                  </span>
                  <span className="font-body text-[10px] text-muted">
                    căn hộ · {area.range}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 5.2. Why Choose Us */}
        <section className="border-y border-border bg-surface py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <div className="mb-16 text-center">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                TẠI SAO CHỌN CHÚNG TÔI
              </span>
              <h2 className="mt-3 font-marketing text-3xl font-bold text-fg sm:text-4xl">
                Lý do hàng nghìn người tin dùng TH-PropTech
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Tiết kiệm thời gian',
                  desc: 'Xem nhà từ xa qua VR 360°, lọc thông minh theo nhu cầu, đặt lịch xem nhà tự động — không cần đi lại hàng chục địa điểm.',
                  icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
                },
                {
                  title: 'Không lo giả mạo',
                  desc: 'Tất cả hình ảnh là ảnh thực tế, diện tích đo đạc chính xác, giá thuê cam kết gốc không qua môi giới trung gian.',
                  icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h0A11.956 11.956 0 0012 2.714z',
                },
                {
                  title: 'Hợp đồng minh bạch',
                  desc: 'Mọi điều khoản rõ ràng, ký điện tử hai bên, lưu trên Blockchain — không còn tranh chấp hợp đồng giấy.',
                  icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
                },
                {
                  title: 'Miễn phí hoàn toàn',
                  desc: 'Khách thuê sử dụng đầy đủ tính năng mà không trả bất kỳ phí nào. Không phí môi giới, không phí nền tảng.',
                  icon: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z',
                },
                {
                  title: 'AI gợi ý thông minh',
                  desc: 'Hệ thống học từ sở thích của bạn và đề xuất căn hộ phù hợp nhất, kèm giải thích lý do rõ ràng.',
                  icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z',
                },
                {
                  title: 'Hỗ trợ tận tâm',
                  desc: 'Đội ngũ tư vấn chuyên nghiệp, hỗ trợ nhanh chóng và đồng hành cùng bạn suốt hành trình thuê nhà.',
                  icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-white p-8 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                    <svg
                      className="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={item.icon}
                      />
                    </svg>
                  </div>
                  <h3 className="font-display text-base font-bold text-fg">
                    {item.title}
                  </h3>
                  <p className="font-body text-xs leading-relaxed text-muted">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5.5. Testimonials Section */}
        <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
          <div className="mb-16 text-center">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
              Ý KIẾN KHÁCH HÀNG
            </span>
            <h2 className="mt-3 font-marketing text-3xl font-bold text-fg sm:text-4xl">
              Khách thuê và Chủ nhà nói gì về chúng tôi?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-sm text-muted">
              Hàng trăm người đã tìm được tổ ấm ưng ý và quản lý vận hành thuê
              nhà mượt mà nhờ công nghệ của TH-PropTech.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                quote:
                  '“Tôi rất ấn tượng với tính năng VR 3D. Tôi có thể đi bộ tham quan chi tiết căn hộ từ xa, cấu trúc thực tế giống 100% khi đi xem trực tiếp, tiết kiệm được rất nhiều thời gian đi lại.”',
                author: 'Nguyễn Minh Thảo',
                role: 'Sinh viên Đại học',
                avatar: 'MT',
              },
              {
                quote:
                  '“Việc thanh toán tiền đặt cọc và hóa đơn hàng tháng được lưu trữ mã hash trên Blockchain mang lại sự an tâm tuyệt đối. Hóa đơn rõ ràng, lịch sử giao dịch không thể bị sửa đổi.”',
                author: 'Trần Hoàng Long',
                role: 'Kỹ sư phần mềm',
                avatar: 'HL',
              },
              {
                quote:
                  '“Là chủ căn hộ, TH-PropTech giúp tôi quản lý hợp đồng thuê và lịch xem nhà của khách cực kỳ khoa học. Luồng vận hành trạng thái rõ ràng giúp tránh tranh chấp không đáng có.”',
                author: 'Phạm Thị Mai',
                role: 'Chủ căn hộ cho thuê',
                avatar: 'PM',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-3xl border border-border bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-body text-xs italic leading-relaxed text-muted">
                    {item.quote}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft font-display text-xs font-bold text-primary">
                    {item.avatar}
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-fg">
                      {item.author}
                    </h4>
                    <span className="font-body text-[10px] text-muted">
                      {item.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5.6. FAQ Section */}
        <section className="border-y border-border bg-surface py-24">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-16 text-center">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                HỎI ĐÁP PHỔ BIẾN
              </span>
              <h2 className="mt-3 font-marketing text-3xl font-bold text-fg sm:text-4xl">
                Giải đáp thắc mắc thường gặp
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-body text-sm text-muted">
                Tìm hiểu nhanh về cách thức hoạt động, tính năng an toàn
                Blockchain và xem nhà 3D.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: 'Công nghệ Blockchain bảo mật đặt cọc và hợp đồng như thế nào?',
                  a: 'Khi bạn thực hiện đặt cọc hoặc ký hợp đồng thuê, hệ thống sẽ tự động tạo một giao dịch tương ứng và lưu trữ mã hash (dấu bản quyền số) lên sổ cái Blockchain. Mã hash này đóng vai trò như một bằng chứng pháp lý bất biến — thông tin hợp đồng và số tiền giao dịch không bao giờ có thể bị sửa đổi, xóa bỏ hay giả mạo bởi bất kỳ bên nào.',
                },
                {
                  q: 'Xem nhà qua VR Tour 360° có phản ánh chính xác thực tế không?',
                  a: 'Có. Tất cả hình ảnh trong VR Tour 360° đều được đội ngũ chuyên viên chụp thực tế tại chính căn hộ đó với chất lượng phân giải cao. Bạn có thể nhìn thấy chi tiết cấu trúc, hiện trạng nội thất, các góc chết và view ban công một cách chân thực nhất, cam kết không dùng ảnh ảo hay ảnh dựng Photoshop sai thực tế.',
                },
                {
                  q: 'Quy trình đặt lịch xem nhà thực tế diễn ra như thế nào?',
                  a: 'Sau khi tìm được căn hộ ưng ý, bạn nhấn nút "Đặt lịch xem". Bạn có thể chủ động chọn ngày giờ rảnh của mình. Hệ thống sẽ tự động gửi thông báo tới chủ nhà hoặc người quản lý căn hộ để xác nhận. Khi lịch hẹn được duyệt, bạn sẽ nhận được thông báo SMS/Email hướng dẫn vị trí và thông tin người đón tiếp.',
                },
                {
                  q: 'Khách thuê có phải trả phí môi giới hay phí dịch vụ nền tảng không?',
                  a: 'Không. Khách thuê được sử dụng hoàn toàn miễn phí các tính năng tìm kiếm, trải nghiệm VR Tour 3D, nhận đề xuất từ AI và quản lý hợp đồng trên hệ thống TH-PropTech. Chúng tôi hướng tới việc xây dựng một hệ sinh thái kết nối trực tiếp minh bạch và tiết kiệm chi phí nhất cho cộng đồng.',
                },
              ].map((faq, idx) => {
                const isOpen = openFaq === idx
                return (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-2xl border border-border bg-white transition-colors duration-250"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between p-6 text-left"
                    >
                      <span className="font-display text-sm font-bold text-fg pr-4">
                        {faq.q}
                      </span>
                      <svg
                        className={`h-4 w-4 shrink-0 text-primary transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </button>
                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        isOpen
                          ? 'max-h-[200px] border-t border-border opacity-100 p-6'
                          : 'max-h-0 opacity-0 overflow-hidden'
                      }`}
                    >
                      <p className="font-body text-xs leading-relaxed text-muted">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 5.7. Blog & Knowledge Base Section */}
        <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
          <div className="mb-16 text-center">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
              CẨM NANG & TIN TỨC
            </span>
            <h2 className="mt-3 font-marketing text-3xl font-bold text-fg sm:text-4xl">
              Kiến thức & Kinh nghiệm thuê nhà hữu ích
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-sm text-muted">
              Cập nhật những bài viết mới nhất chia sẻ kinh nghiệm thuê căn hộ
              và pháp lý nhà đất.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title:
                  '5 điều cần lưu ý kỹ trước khi ký hợp đồng đặt cọc căn hộ',
                desc: 'Tìm hiểu các điều khoản pháp lý quan trọng về cọc, điều kiện hoàn cọc và quyền lợi khách thuê cần biết.',
                date: '10 Tháng 6, 2026',
                author: 'BTV TH-PropTech',
                bg: 'from-amber-100 to-orange-100',
              },
              {
                title: 'Hướng dẫn sử dụng VR 360° chọn căn hộ ưng ý từ xa',
                desc: 'Các bước chi tiết để bạn tự đi bộ tham quan nhà, kiểm tra cấu trúc phòng ngủ, bếp và view ban công qua màn hình.',
                date: '08 Tháng 6, 2026',
                author: 'Tech Team',
                bg: 'from-orange-100 to-red-100',
              },
              {
                title:
                  'Cách bảo vệ thông tin giao dịch nhờ ứng dụng Blockchain',
                desc: 'Giải thích dễ hiểu về cách thức Blockchain bảo mật hóa đơn và tính pháp lý của hợp đồng thuê nhà điện tử.',
                date: '05 Tháng 6, 2026',
                author: 'Blockchain Specialist',
                bg: 'from-amber-100/70 to-yellow-100/70',
              },
            ].map((blog, idx) => (
              <div
                key={idx}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div
                  className={`h-40 w-full bg-gradient-to-br ${blog.bg} flex items-center justify-center p-6 text-center`}
                >
                  <span className="font-marketing text-base font-bold text-primary/80 line-clamp-2">
                    {blog.title}
                  </span>
                </div>
                <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-mono text-[10px] text-muted">
                      <span>{blog.date}</span>
                      <span>•</span>
                      <span>{blog.author}</span>
                    </div>
                    <h3 className="font-display text-sm font-bold text-fg group-hover:text-primary transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="font-body text-xs text-muted line-clamp-2 leading-relaxed">
                      {blog.desc}
                    </p>
                  </div>
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                      Đọc tiếp
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5.8. Security Commitments Section */}
        <section className="border-y border-border bg-surface py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <div className="mb-16 text-center">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                CAM KẾT BẢO MẬT
              </span>
              <h2 className="mt-3 font-marketing text-3xl font-bold text-fg sm:text-4xl">
                An toàn & Bảo mật là ưu tiên hàng đầu
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-body text-sm text-muted">
                TH-PropTech cam kết bảo vệ thông tin và quyền lợi của bạn với
                tiêu chuẩn bảo mật cao nhất.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: 'Mã hóa dữ liệu',
                  desc: 'Toàn bộ thông tin cá nhân, hợp đồng và giao dịch được mã hóa theo tiêu chuẩn AES-256 trong quá trình truyền tải và lưu trữ.',
                  icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z',
                },
                {
                  title: 'Blockchain bất biến',
                  desc: 'Mọi giao dịch tài chính đều được ghi nhận hash trên sổ cái phân tán. Không ai có thể sửa đổi, xóa bỏ hay phủ nhận lịch sử giao dịch.',
                  icon: 'M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244',
                },
                {
                  title: 'Quyền riêng tư',
                  desc: 'Chúng tôi không chia sẻ thông tin cá nhân của bạn cho bên thứ ba. Dữ liệu chỉ phục vụ mục đích nâng cao trải nghiệm thuê nhà.',
                  icon: 'M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88',
                },
                {
                  title: 'Hỗ trợ 24/7',
                  desc: 'Đội ngũ kỹ thuật và chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn mọi lúc khi có vấn đề liên quan đến tài khoản hoặc giao dịch.',
                  icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-white p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={item.icon}
                      />
                    </svg>
                  </div>
                  <h3 className="font-display text-sm font-bold text-fg">
                    {item.title}
                  </h3>
                  <p className="font-body text-xs leading-relaxed text-muted">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5.9. Newsletter Section */}
        <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-primary-soft/40 via-white to-accent-soft/30 p-8 md:p-12">
            <div className="mx-auto max-w-2xl text-center space-y-6">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft">
                <svg
                  className="h-7 w-7 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <h2 className="font-marketing text-2xl font-bold text-fg sm:text-3xl">
                Nhận tin tức & Ưu đãi mới nhất
              </h2>
              <p className="font-body text-sm text-muted">
                Đăng ký để nhận thông tin căn hộ mới, bài viết hữu ích và các
                chương trình ưu đãi độc quyền từ TH-PropTech.
              </p>
              <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Nhập email của bạn..."
                  className="flex-1 rounded-full border border-border bg-white px-5 py-3 font-body text-sm text-fg placeholder:text-muted/50 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <Button
                  variant="primary"
                  className="rounded-full bg-primary hover:bg-primary-hover text-white font-bold px-8 shrink-0"
                >
                  Đăng ký
                </Button>
              </div>
              <p className="font-body text-[10px] text-muted">
                Chúng tôi tôn trọng quyền riêng tư của bạn. Bạn có thể hủy đăng
                ký bất kỳ lúc nào.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Final CTA Banner */}
        <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-8 py-16 text-center text-fg shadow-sm md:px-16">
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              aria-hidden="true"
            >
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/[0.04] blur-3xl" />
              <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-accent/[0.06] blur-3xl" />
            </div>
            <div className="relative z-10 space-y-6">
              <h2 className="font-display text-3xl font-bold text-fg sm:text-4xl">
                Sẵn sàng tìm căn hộ phù hợp?
              </h2>
              <p className="mx-auto max-w-xl font-body text-sm leading-relaxed text-muted">
                Bắt đầu tìm kiếm căn hộ, trải nghiệm VR 3D và theo dõi quy trình
                thuê minh bạch trên nền tảng TH-PropTech ngay hôm nay.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link href={'/properties' as Route}>
                  <Button
                    variant="primary"
                    size="lg"
                    className="rounded-full bg-primary shadow-[0_14px_32px_rgba(198,90,58,0.18)] hover:bg-primary-hover text-white font-bold transition-all hover:-translate-y-0.5"
                  >
                    Tìm căn hộ ngay
                  </Button>
                </Link>
                <Link href={'/contact' as Route}>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="rounded-full border border-border bg-white text-muted hover:bg-bg font-bold transition-all hover:-translate-y-0.5"
                  >
                    Liên hệ tư vấn
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Page Footer */}
      <Footer />
    </div>
  )
}
