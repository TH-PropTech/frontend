'use client'

import * as React from 'react'

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
            title: 'Cách bảo vệ thông tin giao dịch nhờ ứng dụng Blockchain',
            desc: 'Giải thích dễ hiểu về cách thức Blockchain bảo mật hóa đơn và tính pháp lý của hợp đồng thuê nhà điện tử.',
            date: '05 Tháng 6, 2026',
            author: 'Blockchain Specialist',
            bg: 'from-amber-100/70 to-yellow-100/70',
          },
        ].map((blog, idx) => (
          <div
            key={idx}
            className="snap-start shrink-0 w-[84vw] max-w-[320px] sm:w-auto group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <div
              className={`h-36 sm:h-40 w-full bg-gradient-to-br ${blog.bg} flex items-center justify-center p-5 text-center`}
            >
              <span className="font-marketing text-base font-bold text-primary/80 line-clamp-2">
                {blog.title}
              </span>
            </div>
            <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
              <div className="space-y-1.5">
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

      {/* Mobile Swipe Hint */}
      <div className="mt-3 flex sm:hidden items-center justify-center gap-1 text-[11px] font-medium text-muted">
        <span>← Vuốt sang để đọc thêm bài viết →</span>
      </div>
    </section>
  )
}
