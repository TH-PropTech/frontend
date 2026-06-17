'use client'

import * as React from 'react'

export function PropertyReviews(): React.ReactElement {
  return (
    <section className="mx-auto max-w-6xl px-6 py-6 md:px-10">
      <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
          <h3 className="font-marketing text-lg font-bold text-fg flex items-center gap-2 text-left">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            Đánh giá từ khách thuê
          </h3>
          <div className="flex items-center gap-2 text-sm text-left">
            <span className="text-muted-foreground font-semibold">
              Tín nhiệm chủ nhà:
            </span>
            <span className="bg-success/15 text-success px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[11px] border border-success/20">
              98% Tín nhiệm (Xác thực Blockchain)
            </span>
          </div>
        </div>

        <div className="space-y-6 text-left">
          <div className="space-y-3 border-b border-border/40 pb-5">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-fg text-base">
                Trần Minh H.
              </span>
              <span className="text-muted-foreground font-semibold">
                15/05/2026
              </span>
            </div>
            <div className="flex text-amber-500 gap-1 items-center">
              {[1, 2, 3, 4, 5].map(s => (
                <svg
                  key={s}
                  className="h-4 w-4 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs font-bold text-amber-600 ml-1">
                5.0
              </span>
            </div>
            <p className="text-sm text-fg-muted font-body leading-relaxed font-semibold">
              Căn hộ rất sạch sẽ, đúng như hình ảnh thực tế trên ứng dụng.
              Chủ nhà nhiệt tình hỗ trợ và ký kết hợp đồng thông qua hệ
              thống rất nhanh chóng.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-fg text-base">
                Nguyễn Quốc T.
              </span>
              <span className="text-muted-foreground font-semibold">
                28/04/2026
              </span>
            </div>
            <div className="flex text-amber-500 gap-1 items-center">
              {[1, 2, 3, 4].map(s => (
                <svg
                  key={s}
                  className="h-4 w-4 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <svg
                className="h-4 w-4 text-gray-300 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs font-bold text-amber-600 ml-1">
                4.5
              </span>
            </div>
            <p className="text-sm text-fg-muted font-body leading-relaxed font-semibold">
              Không gian yên tĩnh, dịch vụ quản lý tòa nhà tốt. Các hóa đơn
              thanh toán đều rõ ràng trên lịch sử Blockchain.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
