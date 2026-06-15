'use client'

import * as React from 'react'

export function SecurityCommitmentsSection(): React.ReactElement {
  return (
    <section className="border-y border-border bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mb-16 text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
            CAM KẾT BẢO MẬT
          </span>
          <h2 className="mt-3 font-marketing text-3xl font-bold text-fg sm:text-4xl">
            An toàn & Bảo mật là ưu tiên hàng đầu
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-sm text-muted">
            TH-PropTech cam kết bảo vệ thông tin và quyền lợi của bạn với tiêu
            chuẩn bảo mật cao nhất.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Mã hóa dữ liệu',
              desc: 'Toàn bộ thông tin cá nhân, hợp đồng và giao dịch được mã hóa theo tiêu chuẩn AES-256 trong quá trình truyền tải và lưu trữ.',
              icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z',
            },
            {
              title: 'Blockchain bất biến',
              desc: 'Mọi giao dịch tài chính đều được ghi nhận hash trên hệ thống phân tán. Không ai có thể sửa đổi, xóa bỏ hay phủ nhận lịch sử giao dịch.',
              icon: 'M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244',
            },
            {
              title: 'Quyền riêng tư',
              desc: 'Chúng tôi không chia sẻ thông tin cá nhân của bạn cho bên thứ ba. Dữ liệu chỉ phục vụ mục đích nâng cao trải nghiệm thuê nhà.',
              icon: 'M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88',
            },
            {
              title: 'Hỗ trợ 24/7',
              desc: 'Đội ngũ kỹ thuật và chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn mọi lúc khi có vấn đề liên quan đến tài khoản hoặc giao dịch.',
              icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-white p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
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
