'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { Button } from '@/shared/ui/button'

export function FinalCtaBanner(): React.ReactElement {
  return (
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
          </div>
        </div>
      </div>
    </section>
  )
}
