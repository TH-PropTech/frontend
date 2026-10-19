'use client'

import * as React from 'react'

export function TechnologyDeepDive(): React.ReactElement {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <div className="mb-16 text-center">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
          CÔNG NGHỆ CỐT LÕI
        </span>
        <h2 className="mt-3 font-marketing text-3xl font-bold text-fg sm:text-4xl">
          Ba trụ cột công nghệ của TH-PropTech
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-body text-sm text-muted">
          Kết hợp Blockchain, AI và VR 3D để tạo nên trải nghiệm thuê nhà minh
          bạch, thông minh và trực quan chưa từng có.
        </p>
      </div>

      <div className="flex flex-col gap-16">
        {/* Pillar 1: Blockchain */}
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <div className="flex h-48 w-full items-center justify-center rounded-3xl border border-border bg-gradient-to-br from-primary-soft via-surface to-accent-soft md:w-5/12">
            <svg
              className="h-24 w-24 text-primary/60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={0.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
          </div>
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-success/20 bg-success-soft px-3 py-1">
              <svg
                className="h-3.5 w-3.5 text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h0A11.956 11.956 0 0012 2.714z"
                />
              </svg>
              <span className="font-mono text-[10px] font-bold uppercase text-success">
                Blockchain
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold text-fg">
              Giao dịch minh bạch, chống giả mạo
            </h3>
            <p className="font-body text-sm leading-relaxed text-muted">
              Mỗi hợp đồng, đặt cọc và thanh toán đều được ghi nhận hash bất
              biến trên Blockchain. Khách thuê và chủ nhà có thể kiểm chứng bất
              kỳ giao dịch nào bằng mã hash — không ai có thể sửa đổi, xóa hay
              phủ nhận.
            </p>
            <ul className="space-y-2 font-body text-sm text-muted">
              <li className="flex items-start gap-2">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                Hash giao dịch có thể tra cứu công khai bất kỳ lúc nào
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                Hợp đồng thuê ghi nhận vĩnh viễn, chống sửa đổi
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                Bảo vệ quyền lợi khách thuê lẫn chủ nhà
              </li>
            </ul>
          </div>
        </div>

        {/* Pillar 2: AI */}
        <div className="flex flex-col items-center gap-8 md:flex-row-reverse">
          <div className="flex h-48 w-full items-center justify-center rounded-3xl border border-border bg-gradient-to-br from-accent-soft via-surface to-primary-soft md:w-5/12">
            <svg
              className="h-24 w-24 text-accent/60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={0.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
              />
            </svg>
          </div>
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-soft px-3 py-1">
              <svg
                className="h-3.5 w-3.5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                />
              </svg>
              <span className="font-mono text-[10px] font-bold uppercase text-primary">
                AI Recommendation
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold text-fg">
              Gợi ý thông minh, cá nhân hóa
            </h3>
            <p className="font-body text-sm leading-relaxed text-muted">
              Hệ thống kết hợp thuật toán Naive Bayes và Content-Based Filtering
              để phân tích hồ sơ người dùng (độ tuổi, thu nhập, khu vực ưa
              thích, số phòng, tiện ích) và đề xuất căn hộ phù hợp nhất. Mỗi gợi
              ý kèm điểm tin cậy và giải thích chi tiết.
            </p>
            <ul className="space-y-2 font-body text-sm text-muted">
              <li className="flex items-start gap-2">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                Hybrid: Naive Bayes + Content-Based Filtering
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                Explainable AI — giải thích lý do từng gợi ý
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                Học từ phản hồi người dùng (online learning)
              </li>
            </ul>
          </div>
        </div>

        {/* Pillar 3: VR 3D */}
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <div className="flex h-48 w-full items-center justify-center rounded-3xl border border-border bg-gradient-to-br from-surface-muted via-surface to-primary-soft md:w-5/12">
            <svg
              className="h-24 w-24 text-primary/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={0.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
              />
            </svg>
          </div>
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1">
              <svg
                className="h-3.5 w-3.5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                />
              </svg>
              <span className="font-mono text-[10px] font-bold uppercase text-primary">
                VR 3D Tour
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold text-fg">
              Xem nhà từ xa, trải nghiệm như thực
            </h3>
            <p className="font-body text-sm leading-relaxed text-muted">
              Mô hình 3D tương tác toàn khu đô thị cho phép bạn chọn căn hộ,
              chọn tầng và bước vào xem nội thất căn hộ qua VR Tour 360°. Bếp,
              phòng khách, phòng ngủ, ban công — tất cả hiện lên chân thực với
              ảnh 360° chất lượng cao.
            </p>
            <ul className="space-y-2 font-body text-sm text-muted">
              <li className="flex items-start gap-2">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                Mô hình 3D Master Plan toàn khu đô thị
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                VR Tour 360° nội thất thực tế từng phòng
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                Chế độ đi bộ Avatar tham quan tự do
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
