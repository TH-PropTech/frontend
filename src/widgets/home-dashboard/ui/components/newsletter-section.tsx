'use client'

import * as React from 'react'
import { Button } from '@/shared/ui/button'

export function NewsletterSection(): React.ReactElement {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <div className="rounded-3xl border border-border bg-gradient-to-br from-primary-soft/40 via-white to-accent-soft/30 p-8 md:p-12">
        <div className="mx-auto max-w-2xl text-center space-y-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl">
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
            Đăng ký để nhận thông tin căn hộ mới, bài viết hữu ích và các chương
            trình ưu đãi độc quyền từ TH-PropTech.
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
            Chúng tôi tôn trọng quyền riêng tư của bạn. Bạn có thể hủy đăng ký
            bất kỳ lúc nào.
          </p>
        </div>
      </div>
    </section>
  )
}
