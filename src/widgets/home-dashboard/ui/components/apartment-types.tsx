'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'

export function ApartmentTypes(): React.ReactElement {
  return (
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
            Từ căn hộ Studio nhỏ gọn cho sinh viên đến Penthouse cao cấp dành
            cho gia đình.
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
  )
}
