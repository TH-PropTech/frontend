'use client'

import * as React from 'react'

export function FaqSection(): React.ReactElement {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null)

  return (
    <section className="border-y border-border bg-surface py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-16 text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
            HỎI ĐÁP PHỔ BIẾN
          </span>
          <h2 className="mt-3 font-marketing text-3xl font-bold text-fg sm:text-4xl">
            Giải đáp thắc mắc thường gặp
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-sm text-muted">
            Tìm hiểu nhanh về cách thức hoạt động, tính năng an toàn Blockchain
            và Mô hình 3D tương tác.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'Công nghệ Blockchain bảo mật đặt cọc và hợp đồng như thế nào?',
              a: 'Khi bạn thực hiện đặt cọc hoặc ký hợp đồng thuê theo mẫu Nghị định 96/2024/NĐ-CP, hệ thống tự động lưu vết chống sửa đổi lên Blockchain (Hyperledger Fabric) cùng chữ ký số VNPT SmartCA. Dữ liệu này là bằng chứng số xác thực tính toàn vẹn — thông tin hợp đồng và số tiền giao dịch không thể bị sửa đổi đơn phương hay giả mạo bởi bất kỳ bên nào.',
            },
            {
              q: 'Mô hình 3D tương tác (Interactive 3D Walkthrough) có phản ánh chính xác thực tế không?',
              a: 'Có. Mô hình 3D tương tác được xây dựng chuẩn xác theo tỉ lệ thực tế thông qua công nghệ Three.js và công cụ Floorplan 3D Editor. Khách thuê có thể tự do di chuyển, quan sát không gian đa chiều và kiểm tra bố cục nội thất trước khi đặt lịch hẹn xem nhà trực tiếp.',
            },
            {
              q: 'Quy trình đặt lịch xem nhà trực tiếp diễn ra như thế nào?',
              a: 'Sau khi trải nghiệm mô hình 3D và tìm được căn hộ ưng ý, bạn nộp hồ sơ thuê kèm xác thực eKYC CCCD và chọn ngày giờ thuận tiện. Hệ thống sẽ tự động gửi thông báo tới chủ nhà để thẩm định và phê duyệt lịch hẹn xem căn hộ trực tiếp.',
            },
            {
              q: 'Khách thuê có phải trả phí môi giới hay phí dịch vụ nền tảng không?',
              a: 'Không. Khách thuê được sử dụng hoàn toàn miễn phí các tính năng tìm kiếm, trải nghiệm Mô hình 3D tương tác, nhận đề xuất từ AI và quản lý hợp đồng trên hệ thống TH-PropTech. Chúng tôi hướng tới việc xây dựng một hệ sinh thái kết nối trực tiếp minh bạch và tiết kiệm chi phí nhất cho cộng đồng.',
            },
          ].map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-border bg-white transition-colors duration-250"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="font-display text-sm font-bold text-fg pr-4">
                    {faq.q}
                  </span>
                  <svg
                    className={`h-4 w-4 shrink-0 text-primary transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen
                      ? 'max-h-[200px] border-t border-border opacity-100 p-6'
                      : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <p className="font-body text-xs leading-relaxed text-muted">
                    {faq.a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
