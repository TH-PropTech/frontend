'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'

export function FeaturedLocations(): React.ReactElement {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:px-10">
      <div className="mb-12 text-center">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
          KHU VỰC NỔI BẬT
        </span>
        <h2 className="mt-3 font-marketing text-2xl font-bold text-fg sm:text-3xl">
          Khám phá căn hộ theo khu vực ưa thích
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-body text-sm text-muted">
          Tìm kiếm nhanh căn hộ cho thuê tại các quận sầm uất nhất TP. Hồ Chí
          Minh.
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
  )
}
