'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { FileText, Eye, ShieldCheck, Clock, ArrowRight } from 'lucide-react'

export function BlogKnowledgeSection(): React.ReactElement {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <div className="mb-16 text-center">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
          CẨM NANG & TIN TỨC
        </span>
        <h2 className="mt-3 font-marketing text-3xl font-bold text-fg sm:text-4xl">
          Kiến thức & Kinh nghiệm thuê nhà hữu ích
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-body text-sm text-muted">
          Cập nhật những bài viết mới nhất chia sẻ kinh nghiệm thuê căn hộ và
          pháp lý nhà đất.
        </p>
      </div>

      <div className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory no-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:pb-0">
        {[
          {
            title: '5 điều cần lưu ý kỹ trước khi ký hợp đồng đặt cọc căn hộ',
            desc: 'Tìm hiểu các điều khoản pháp lý quan trọng về cọc, điều kiện hoàn cọc và quyền lợi khách thuê cần biết.',
            date: '10 Tháng 6, 2026',
            author: 'BTV TH-PropTech',
            category: 'Pháp lý thuê nhà',
            readTime: '4 phút đọc',
            href: '/process',
            icon: FileText,
            accentColor: 'text-amber-700 bg-amber-100/80 border-amber-300/60',
            bg: 'from-amber-50 to-orange-100/70',
          },
          {
            title: 'Hướng dẫn sử dụng VR 360° chọn căn hộ ưng ý từ xa',
            desc: 'Các bước chi tiết để bạn tự đi bộ tham quan nhà, kiểm tra cấu trúc phòng ngủ, bếp và view ban công qua màn hình.',
            date: '08 Tháng 6, 2026',
            author: 'Tech Team',
            category: 'Trải nghiệm số',
            readTime: '3 phút đọc',
            href: '/process',
            icon: Eye,
            accentColor:
              'text-orange-700 bg-orange-100/80 border-orange-300/60',
            bg: 'from-orange-50 to-red-100/60',
          },
          {
            title: 'Cách bảo vệ thông tin giao dịch nhờ ứng dụng Blockchain',
            desc: 'Giải thích dễ hiểu về cách thức Blockchain bảo mật hóa đơn và tính pháp lý của hợp đồng thuê nhà điện tử.',
            date: '05 Tháng 6, 2026',
            author: 'Chuyên gia bảo mật',
            category: 'Công nghệ bảo mật',
            readTime: '5 phút đọc',
            href: '/process',
            icon: ShieldCheck,
            accentColor:
              'text-emerald-700 bg-emerald-100/80 border-emerald-300/60',
            bg: 'from-emerald-50 to-teal-100/60',
          },
        ].map((blog, idx) => {
          const Icon = blog.icon
          return (
            <Link
              key={idx}
              href={blog.href as Route}
              className="snap-start shrink-0 w-[84vw] max-w-[320px] sm:w-auto group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30"
            >
              {/* Graphic Banner */}
              <div
                className={`h-36 sm:h-40 w-full bg-gradient-to-br ${blog.bg} flex flex-col justify-between p-5 relative overflow-hidden`}
              >
                <div className="flex items-center justify-between z-10">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${blog.accentColor}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {blog.category}
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] text-muted bg-white/70 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    <Clock className="w-3 h-3" />
                    {blog.readTime}
                  </span>
                </div>

                <div className="z-10 flex items-center justify-center py-2">
                  <div className="p-3 rounded-2xl bg-white/80 shadow-sm border border-white/60 group-hover:scale-105 transition-transform">
                    <Icon className="w-8 h-8 text-primary/80" />
                  </div>
                </div>

                {/* Subtle pattern background */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#9F3F2A_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-muted">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.author}</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-fg group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {blog.title}
                  </h3>
                  <p className="font-body text-xs text-muted line-clamp-2 leading-relaxed">
                    {blog.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-border/40">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                    Đọc tiếp
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Mobile Swipe Hint */}
      <div className="mt-4 flex sm:hidden items-center justify-center gap-1 text-[11px] font-medium text-muted">
        <span>← Vuốt sang để đọc thêm bài viết →</span>
      </div>
    </section>
  )
}
