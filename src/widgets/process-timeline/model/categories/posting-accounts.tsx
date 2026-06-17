import * as React from 'react'
import { Category } from '../articles-data'

export const postingAccountsCategories: Category[] = [
  {
    id: 'posting',
    title: 'Hướng dẫn và quy định đăng tin',
    desc: 'Cách đăng tin cho thuê căn hộ, định giá tài sản và quy trình kiểm duyệt.',
    icon: (
      <svg
        className="h-6 w-6 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
    articles: [
      {
        id: 'post-desktop',
        title: 'Hướng dẫn đăng tin trên máy tính',
        breadcrumbs: [
          'Hướng dẫn và quy định đăng tin',
          'Hướng dẫn đăng tin',
          'Hướng dẫn đăng tin trên máy tính',
        ],
        content: (
          <div className="space-y-4 text-xs md:text-sm text-muted leading-relaxed">
            <p>
              Đăng tin cho thuê căn hộ trên website{' '}
              <strong>TH-PropTech.com.vn</strong> bằng máy tính giúp bạn thao
              tác nhanh chóng và quản lý tin đăng dễ dàng:
            </p>

            <h3 className="font-bold text-fg text-sm mt-6">
              1. Đăng nhập vào tài khoản TH-Proptech của bạn
            </h3>
            <p>
              Đăng nhập tài khoản của bạn, đảm bảo tài khoản đã hoàn thành KYC
              xác thực danh tính để tin đăng được hệ thống ưu tiên kiểm duyệt và
              hiển thị nhãn &quot;Chính chủ&quot;.
            </p>

            <h3 className="font-bold text-fg text-sm mt-6">
              2. Bấm vào nút Đăng tin ở góc phải website hoặc trong mục Quản lý
              tin đăng
            </h3>
            <div className="my-5 rounded-2xl border border-border overflow-hidden bg-bg p-4 flex flex-col items-center justify-center gap-4">
              <div className="w-full bg-white border border-border/80 rounded-xl p-3 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="font-bold text-xs text-fg">TH-PropTech</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-muted">Căn hộ</span>
                  <span className="text-[10px] text-muted">Cộng đồng</span>
                  <button className="bg-primary text-white text-[10px] font-bold py-1 px-3 rounded-lg pointer-events-none">
                    Đăng tin
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-muted">
                Giao diện vị trí nút Đăng tin trên thanh Header
              </p>
            </div>

            <h3 className="font-bold text-fg text-sm mt-6">
              3. Nhập đầy đủ thông tin căn hộ chi tiết
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Thông tin cơ bản:</strong> Chọn loại hình căn hộ, nhập
                địa chỉ chính xác, số phòng ngủ, nhà vệ sinh và diện tích sử
                dụng.
              </li>
              <li>
                <strong>Giá thuê & Tiền cọc:</strong> Nhập giá thuê hàng tháng
                (bằng VND) và số tiền đặt cọc tương ứng (thường là 1-2 tháng
                tiền nhà).
              </li>
              <li>
                <strong>Hình ảnh & VR Tour:</strong> Tải lên ít nhất 5 ảnh chụp
                thực tế rõ nét của căn hộ. Khuyến khích đính kèm link VR Tour
                360 độ để khách thuê có thể tham quan thực tế ảo, giúp tin đăng
                tiếp cận hiệu quả gấp 3 lần.
              </li>
              <li>
                <strong>Pháp lý căn hộ:</strong> Tải lên hình ảnh Giấy chứng
                nhận quyền sở hữu nhà ở (Sổ hồng) hoặc hợp đồng mua bán để ban
                quản trị đối chiếu danh tính chủ nhà.
              </li>
            </ul>

            <h3 className="font-bold text-fg text-sm mt-6">
              4. Gửi phê duyệt và theo dõi trạng thái
            </h3>
            <p>
              Nhấn &quot;Gửi kiểm duyệt&quot; để hệ thống chuyển tin đăng tới
              ban quản trị TH-PropTech phê duyệt. Quá trình kiểm duyệt và xác
              minh pháp lý của tin đăng sẽ hoàn tất trong vòng 2 giờ làm việc.
              Bạn sẽ nhận được email hoặc thông báo ngay khi tin được phê duyệt
              công khai.
            </p>
          </div>
        ),
      },
      {
        id: 'post-mobile',
        title: 'Hướng dẫn đăng tin trên điện thoại',
        breadcrumbs: [
          'Hướng dẫn và quy định đăng tin',
          'Hướng dẫn đăng tin',
          'Hướng dẫn đăng tin trên điện thoại',
        ],
        content: (
          <div className="space-y-4 text-xs md:text-sm text-muted leading-relaxed">
            <p>
              Đăng tin nhanh chóng và thuận lợi thông qua ứng dụng di động
              TH-PropTech Mobile:
            </p>

            <h3 className="font-bold text-fg text-sm mt-6">
              Các bước thực hiện trên ứng dụng di động:
            </h3>
            <ul className="list-decimal pl-5 space-y-3">
              <li>
                <strong>Bước 1:</strong> Mở ứng dụng TH-PropTech trên điện thoại
                của bạn, đăng nhập tài khoản chính chủ và chọn tab{' '}
                <strong>Chủ nhà</strong> ở thanh công cụ phía dưới.
              </li>
              <li>
                <strong>Bước 2:</strong> Nhấn chọn{' '}
                <strong>Đăng tin căn hộ mới</strong>. Cho phép ứng dụng sử dụng
                Camera để chụp ảnh không gian căn hộ trực tiếp thông qua app để
                hệ thống lưu trữ metadata vị trí thực tế, tăng độ uy tín cho tin
                đăng.
              </li>
              <li>
                <strong>Bước 3:</strong> Tải lên ảnh giấy tờ pháp lý sở hữu căn
                hộ. Nhập giá thuê, số tiền đặt cọc và các chi phí sinh hoạt phát
                sinh khác (nếu có).
              </li>
              <li>
                <strong>Bước 4:</strong> Nhập tiêu đề thu hút và mô tả chi tiết
                các tiện ích nội khu nổi bật (như bể bơi, phòng gym, hầm gửi xe,
                an ninh 3 lớp).
              </li>
              <li>
                <strong>Bước 5:</strong> Nhấn gửi phê duyệt để hoàn tất quy
                trình. Ban quản trị sẽ xác minh thông tin nhanh chóng và thông
                báo qua notification của ứng dụng.
              </li>
            </ul>
          </div>
        ),
      },
    ],
  },
  {
    id: 'accounts',
    title: 'Tài khoản người dùng',
    desc: 'Định danh xác thực KYC (OCR), cấp chứng chỉ Fabric CA và quản lý hồ sơ.',
    icon: (
      <svg
        className="h-6 w-6 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    articles: [
      {
        id: 'kyc-info',
        title: 'Định danh xác thực KYC (OCR)',
        breadcrumbs: ['Tài khoản người dùng', 'Định danh xác thực KYC (OCR)'],
        content: (
          <div className="space-y-4 text-xs md:text-sm text-muted leading-relaxed">
            <p>
              Xác thực danh tính KYC giúp bảo vệ sự minh bạch, ngăn chặn lừa đảo
              và loại bỏ hoàn toàn các tin đăng ảo trên toàn bộ nền tảng.
            </p>

            <h3 className="font-bold text-fg text-sm mt-6">
              Các bước thực hiện KYC định danh chuẩn xác:
            </h3>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <strong>Tải lên ảnh CCCD chính chủ:</strong> Chụp rõ nét mặt
                trước và mặt sau Căn cước công dân (CCCD) dưới điều kiện ánh
                sáng tốt, không bị lóa hoặc mất góc.
              </li>
              <li>
                <strong>Xác nhận thông tin OCR tự động:</strong> Hệ thống AI OCR
                tích hợp sẽ tự động trích xuất thông tin cá nhân (Họ tên, Số
                CCCD, Ngày sinh, Quê quán) để điền vào form. Bạn chỉ cần đối
                chiếu lại và sửa đổi nếu phát hiện sai sót nhỏ do nét chữ mờ.
              </li>
              <li>
                <strong>Quét sinh trắc học khuôn mặt:</strong> Thực hiện Selfie
                camera động theo hướng dẫn (xoay mặt sang trái, sang phải, mỉm
                cười). AI sẽ so khớp các điểm nhân trắc học trên khuôn mặt bạn
                với ảnh trên giấy tờ để đảm bảo người dùng là chính chủ sở hữu
                thẻ.
              </li>
            </ol>

            <h3 className="font-bold text-fg text-sm mt-6">
              Quy định về bảo mật dữ liệu KYC nhạy cảm
            </h3>
            <p>
              Toàn bộ tài liệu hình ảnh CCCD và sinh trắc học của bạn được mã
              hóa đầu cuối bằng tiêu chuẩn AES-256 và chỉ phục vụ cho việc xác
              thực tính pháp lý khi giao kết hợp đồng trên hệ thống Hyperledger
              Fabric, cam kết bảo mật 100%. Hệ thống không chia sẻ thông tin cá
              nhân của bạn cho bất kỳ bên thứ ba nào vì mục đích quảng cáo.
            </p>
          </div>
        ),
      },
      {
        id: 'fabric-ca-cert',
        title: 'Kích hoạt chứng chỉ Fabric CA X.509',
        breadcrumbs: [
          'Tài khoản người dùng',
          'Kích hoạt chứng chỉ Fabric CA X.509',
        ],
        content: (
          <div className="space-y-4 text-xs md:text-sm text-muted leading-relaxed">
            <p>
              Cắp chứng chỉ Fabric CA giúp bạn thực hiện chữ ký số mã hóa X.509
              để ký kết hợp đồng và xác nhận các biên bản bàn giao căn hộ trực
              tiếp trên nền tảng an toàn.
            </p>

            <h3 className="font-bold text-fg text-sm mt-6">
              Tại sao cần kích hoạt chứng chỉ Fabric CA?
            </h3>
            <p>
              Khác với các phương thức ký tay truyền thống dễ bị làm giả, mọi
              hợp đồng giao dịch trên TH-PropTech đều được ghi nhận trực tiếp
              trên hệ thống Hyperledger Fabric. Việc kích hoạt chứng chỉ Fabric
              CA cung cấp cho bạn một cặp khóa mật mã (Private/Public Key) chuẩn
              chữ ký số X.509 (ECDSA P-256). Chữ ký số này có giá trị pháp lý
              tuyệt đối theo Luật Giao dịch điện tử Việt Nam.
            </p>

            <h3 className="font-bold text-fg text-sm mt-6">
              Quy trình cấp phát chứng chỉ Fabric CA tự động:
            </h3>
            <ul className="list-decimal pl-5 space-y-2">
              <li>
                Sau khi bạn hoàn tất xác thực danh tính KYC thành công, hệ thống
                TH-PropTech sẽ tự động gửi yêu cầu đăng ký (Register & Enroll)
                tài khoản lên Certificate Authority của tổ chức (Org).
              </li>
              <li>
                Fabric CA sẽ phát hành một chứng chỉ số X.509 mang danh tính duy
                nhất của bạn (ví dụ: <code>org1.tenant.nguyen_van_a</code> hoặc{' '}
                <code>org1.landlord.le_hoang_minh</code>).
              </li>
              <li>
                Chứng chỉ số này cùng với khóa bí mật tương ứng sẽ được lưu trữ
                an toàn trong kho dữ liệu bảo mật (Secure Storage) trên thiết bị
                di động hoặc tài khoản web của bạn.
              </li>
              <li>
                Mỗi khi thực hiện ký kết hợp đồng hoặc biên bản, bạn chỉ cần
                nhập mã PIN để hệ thống thực hiện thuật toán ký số X.509 và gửi
                giao dịch lên mạng Fabric.
              </li>
            </ul>
          </div>
        ),
      },
    ],
  },
]
