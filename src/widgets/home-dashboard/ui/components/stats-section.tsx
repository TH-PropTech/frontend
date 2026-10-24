'use client'

import * as React from 'react'

export function StatsSection(): React.ReactElement {
  return (
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
              value: '4',
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
  )
}
