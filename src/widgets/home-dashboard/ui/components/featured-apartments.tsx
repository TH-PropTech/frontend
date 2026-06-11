'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { Button } from '@/shared/ui/button'

export function FeaturedApartments(): React.ReactElement {
  return (
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
  )
}
