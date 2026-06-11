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
            và xem nhà 3D.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'Công nghệ Blockchain bảo mật đặt cọc và hợp đồng như thế nào?',
              a: 'Khi bạn thực hiện đặt cọc hoặc ký hợp đồng thuê, hệ thống sẽ tự động tạo một giao dịch tương ứng và lưu trữ mã hash (dấu bản quyền số) lên sổ cái Blockchain. Mã hash này đóng vai trò như một bằng chứng pháp lý bất biến — thông tin hợp đồng và số tiền giao dịch không bao giờ có thể bị sửa đổi, xóa bỏ hay giả mạo bởi bất kỳ bên nào.',
            },
            {
              q: 'Xem nhà qua VR Tour 360° có phản ánh chính xác thực tế không?',
              a: 'Có. Tất cả hình ảnh trong VR Tour 360° đều được đội ngũ chuyên viên chụp thực tế tại chính căn hộ đó với chất lượng phân giải cao. Bạn có thể nhìn thấy chi tiết cấu trúc, hiện trạng nội thất, các góc chết và view ban công một cách chân thực nhất, cam kết không dùng ảnh ảo hay ảnh dựng Photoshop sai thực tế.',
            },
            {
              q: 'Quy trình đặt lịch xem nhà thực tế diễn ra như thế nào?',
              a: 'Sau khi tìm được căn hộ ưng ý, bạn nhấn nút "Đặt lịch xem". Bạn có thể chủ động chọn ngày giờ rảnh của mình. Hệ thống sẽ tự động gửi thông báo tới chủ nhà hoặc người quản lý căn hộ để xác nhận. Khi lịch hẹn được duyệt, bạn sẽ nhận được thông báo SMS/Email hướng dẫn vị trí và thông tin người đón tiếp.',
            },
            {
              q: 'Khách thuê có phải trả phí môi giới hay phí dịch vụ nền tảng không?',
              a: 'Không. Khách thuê được sử dụng hoàn toàn miễn phí các tính năng tìm kiếm, trải nghiệm VR Tour 3D, nhận đề xuất từ AI và quản lý hợp đồng trên hệ thống TH-PropTech. Chúng tôi hướng tới việc xây dựng một hệ sinh thái kết nối trực tiếp minh bạch và tiết kiệm chi phí nhất cho cộng đồng.',
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
