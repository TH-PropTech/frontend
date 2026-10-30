'use client'

import * as React from 'react'

export function ComparisonSection(): React.ReactElement {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <div className="mb-16 text-center">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
          SO SÁNH MÔ HÌNH
        </span>
        <h2 className="mt-3 font-marketing text-3xl font-bold text-fg sm:text-4xl">
          Sự khác biệt vượt trội từ TH-PropTech
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-body text-sm text-muted">
          So sánh trải nghiệm giữa quy trình thuê nhà kiểu cũ và giải pháp số
          hóa thế hệ mới.
        </p>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-border bg-white shadow-sm">
        <table className="w-full min-w-[600px] border-collapse text-left font-body text-sm">
          <thead>
            <tr className="border-b border-border bg-surface text-fg font-display font-bold">
              <th className="p-5">Tính năng so sánh</th>
              <th className="p-5 text-muted text-xs">Thuê nhà truyền thống</th>
              <th className="p-5 text-primary text-xs">
                Giải pháp TH-PropTech
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-fg">
            {[
              {
                feat: 'Minh bạch thông tin',
                old: 'Hình ảnh ảo, diện tích sai lệch, thông tin giá cả mập mờ qua trung gian.',
                new: 'Thông tin căn hộ kiểm duyệt, đo đạc diện tích thực, cam kết giá thuê gốc.',
              },
              {
                feat: 'Trải nghiệm xem nhà',
                old: 'Tốn công sức đi lại xem thực tế nhiều nơi, lịch hẹn không đồng bộ.',
                new: 'Trải nghiệm Mô hình 3D tương tác (Three.js), nộp hồ sơ eKYC CCCD và đặt lịch xem nhà trực tiếp.',
              },
              {
                feat: 'Bảo mật đặt cọc & hợp đồng',
                old: 'Dễ xảy ra tranh chấp cọc giấy, hợp đồng dễ bị thay đổi điều khoản đơn phương.',
                new: 'Hợp đồng theo Nghị định 96/2024/NĐ-CP, ký số VNPT SmartCA và lưu vết chống sửa đổi trên Blockchain.',
              },
              {
                feat: 'Hỗ trợ tìm kiếm & gợi ý',
                old: 'Tự tìm mò mẫm qua các group rác hoặc phụ thuộc môi giới chi phí cao.',
                new: 'Gợi ý thông minh (AI Recommendation) cá nhân hóa dựa trên dữ liệu nhu cầu thực tế.',
              },
              {
                feat: 'Quản lý lịch sử thanh toán',
                old: 'Biên lai giấy dễ thất lạc, khó đối soát lịch sử đóng tiền hàng tháng.',
                new: 'Hệ thống hóa đơn điện tử tự động, đối soát nhanh gọn, lưu trữ vĩnh viễn.',
              },
            ].map((row, idx) => (
              <tr key={idx} className="hover:bg-bg/20 transition-colors">
                <td className="p-5 font-bold text-fg text-xs">{row.feat}</td>
                <td className="p-5 text-muted/80 text-xs">{row.old}</td>
                <td className="p-5 text-fg font-medium bg-primary-soft/10 text-xs">
                  <span className="flex items-center gap-2 text-primary">
                    <svg
                      className="h-4 w-4 shrink-0 text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    {row.new}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
