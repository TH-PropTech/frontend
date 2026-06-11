'use client'

import * as React from 'react'

export function TestimonialsSection(): React.ReactElement {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <div className="mb-16 text-center">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
          Ý KIẾN KHÁCH HÀNG
        </span>
        <h2 className="mt-3 font-marketing text-3xl font-bold text-fg sm:text-4xl">
          Khách thuê và Chủ nhà nói gì về chúng tôi?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-body text-sm text-muted">
          Hàng trăm người đã tìm được tổ ấm ưng ý và quản lý vận hành thuê nhà
          mượt mà nhờ công nghệ của TH-PropTech.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {[
          {
            quote:
              '“Tôi rất ấn tượng với tính năng VR 3D. Tôi có thể đi bộ tham quan chi tiết căn hộ từ xa, cấu trúc thực tế giống 100% khi đi xem trực tiếp, tiết kiệm được rất nhiều thời gian đi lại.”',
            author: 'Nguyễn Minh Thảo',
            role: 'Sinh viên Đại học',
            avatar: 'MT',
          },
          {
            quote:
              '“Việc thanh toán tiền đặt cọc và hóa đơn hàng tháng được lưu trữ mã hash trên Blockchain mang lại sự an tâm tuyệt đối. Hóa đơn rõ ràng, lịch sử giao dịch không thể bị sửa đổi.”',
            author: 'Trần Hoàng Long',
            role: 'Kỹ sư phần mềm',
            avatar: 'HL',
          },
          {
            quote:
              '“Là chủ căn hộ, TH-PropTech giúp tôi quản lý hợp đồng thuê và lịch xem nhà của khách cực kỳ khoa học. Luồng vận hành trạng thái rõ ràng giúp tránh tranh chấp không đáng có.”',
            author: 'Phạm Thị Mai',
            role: 'Chủ căn hộ cho thuê',
            avatar: 'PM',
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-3xl border border-border bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <div className="space-y-4">
              {/* Rating Stars */}
              <div className="flex gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-4 w-4 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="font-body text-xs italic leading-relaxed text-muted">
                {item.quote}
              </p>
            </div>
            <div className="mt-8 flex items-center gap-3 border-t border-border pt-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft font-display text-xs font-bold text-primary">
                {item.avatar}
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-fg">
                  {item.author}
                </h4>
                <span className="font-body text-[10px] text-muted">
                  {item.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
