'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'

export function PlatformOverview(): React.ReactElement {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-24 pb-20 md:pt-28 md:pb-24 md:px-10 scroll-mt-20">
      <div className="mb-16 text-center">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1: Properties Search */}
        <div className="group relative rounded-3xl border border-border bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[260px]">
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-2xl flex items-center justify-center text-primary">
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
              mong muốn. Hình ảnh thực tế, thông tin đầy đủ, cập nhật thời gian
              thực.
            </p>
          </div>
          <div className="pt-6">
            <Link
              href={'/properties' as Route}
              className="inline-flex items-center gap-2 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform"
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
            <div className="h-12 w-12 rounded-2xl flex items-center justify-center text-primary">
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
              tiết cấu trúc phòng, cách bài trí nội thất trực quan trước khi đi
              xem thực tế.
            </p>
          </div>
          <div className="pt-6">
            <Link
              href={'/vr' as Route}
              className="inline-flex items-center gap-2 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform"
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
            <div className="h-12 w-12 rounded-2xl flex items-center justify-center text-primary">
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
              Bảo mật thông tin hợp đồng và đặt cọc bằng công nghệ Blockchain.
              Ghi nhận vĩnh viễn hóa đơn thanh toán và nhật ký thuê trên hệ
              thống chống sửa đổi.
            </p>
          </div>
          <div className="pt-6">
            <Link
              href={'/process' as Route}
              className="inline-flex items-center gap-2 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform"
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
      </div>
    </section>
  )
}
