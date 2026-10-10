'use client'

import * as React from 'react'

export function RentalProcessTimeline(): React.ReactElement {
  return (
    <section className="border-y border-border bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mb-16 text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
            QUY TRÌNH THUÊ CĂN HỘ
          </span>
          <h2 className="mt-3 font-marketing text-3xl font-bold text-fg sm:text-4xl">
            Minh bạch từng bước, rõ ràng từng giai đoạn
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-sm text-muted">
            Toàn bộ hành trình thuê căn hộ được số hóa và ghi nhận trên hệ
            thống. Bạn luôn biết mình đang ở bước nào và cần làm gì tiếp theo.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 hidden h-full w-px bg-border md:left-1/2 md:block"
            aria-hidden="true"
          />

          {[
            {
              step: '01',
              title: 'Tìm kiếm & Lọc căn hộ',
              desc: 'Sử dụng bộ lọc thông minh theo khu vực, mức giá, diện tích, số phòng và tiện ích. Hệ thống AI gợi ý căn hộ phù hợp nhất dựa trên hồ sơ và lịch sử tìm kiếm của bạn.',
              icon: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607Z',
            },
            {
              step: '02',
              title: 'Đặt lịch xem thực tế',
              desc: 'Chọn ngày giờ thuận tiện để xem căn hộ trực tiếp. Trước khi đến, bạn có thể xem trước không gian qua VR Tour 360° ngay trên nền tảng.',
              icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5',
            },
            {
              step: '03',
              title: 'Đặt cọc & Tạo hợp đồng',
              desc: 'Thanh toán đặt cọc trực tuyến an toàn. Hợp đồng được tạo tự động với điều khoản rõ ràng, hai bên xác nhận điện tử trước khi có hiệu lực.',
              icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
            },
            {
              step: '04',
              title: 'Thanh toán & Ghi nhận Blockchain',
              desc: 'Mỗi giao dịch thanh toán được ghi nhận hash lên Blockchain. Bạn có thể kiểm chứng bất kỳ lúc nào — đảm bảo minh bạch, chống sửa đổi và bảo vệ quyền lợi cả hai bên.',
              icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h0A11.956 11.956 0 0012 2.714z',
            },
          ].map((item, i) => (
            <div
              key={item.step}
              className={`relative mb-12 flex flex-col md:flex-row md:items-start ${
                i % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Step circle */}
              <div className="absolute left-6 z-10 hidden md:left-1/2 md:block md:-translate-x-1/2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-surface font-display text-sm font-bold text-primary shadow-sm">
                  {item.step}
                </div>
              </div>

              {/* Content card */}
              <div
                className={`w-full md:w-[calc(50%-40px)] ${i % 2 === 0 ? 'md:pr-4' : 'md:pl-4'}`}
              >
                <div className="rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl text-primary md:hidden">
                      <span className="font-display text-xs font-bold">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-fg">
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-body text-sm leading-relaxed text-muted">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
