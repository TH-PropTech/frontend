'use client'

import * as React from 'react'

export function WhyChooseUs(): React.ReactElement {
  return (
    <section className="border-y border-border bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mb-16 text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
            TẠI SAO CHỌN CHÚNG TÔI
          </span>
          <h2 className="mt-3 font-marketing text-3xl font-bold text-fg sm:text-4xl">
            Lý do hàng nghìn người tin dùng TH-PropTech
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Tiết kiệm thời gian',
              desc: 'Xem nhà từ xa qua VR 360°, lọc thông minh theo nhu cầu, đặt lịch xem nhà tự động — không cần đi lại hàng chục địa điểm.',
              icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
            },
            {
              title: 'Không lo giả mạo',
              desc: 'Tất cả hình ảnh là ảnh thực tế, diện tích đo đạc chính xác, giá thuê cam kết gốc không qua môi giới trung gian.',
              icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h0A11.956 11.956 0 0012 2.714z',
            },
            {
              title: 'Hợp đồng minh bạch',
              desc: 'Mọi điều khoản rõ ràng, ký điện tử hai bên, lưu trên Blockchain — không còn tranh chấp hợp đồng giấy.',
              icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
            },
            {
              title: 'Miễn phí hoàn toàn',
              desc: 'Khách thuê sử dụng đầy đủ tính năng mà không trả bất kỳ phí nào. Không phí môi giới, không phí nền tảng.',
              icon: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z',
            },
            {
              title: 'AI gợi ý thông minh',
              desc: 'Hệ thống học từ sở thích của bạn và đề xuất căn hộ phù hợp nhất, kèm giải thích lý do rõ ràng.',
              icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z',
            },
            {
              title: 'Hỗ trợ tận tâm',
              desc: 'Đội ngũ tư vấn chuyên nghiệp, hỗ trợ nhanh chóng và đồng hành cùng bạn suốt hành trình thuê nhà.',
              icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-white p-8 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <svg
                  className="h-7 w-7"
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
              <h3 className="font-display text-base font-bold text-fg">
                {item.title}
              </h3>
              <p className="font-body text-xs leading-relaxed text-muted">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
