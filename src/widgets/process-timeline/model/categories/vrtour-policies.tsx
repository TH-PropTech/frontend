import * as React from 'react'
import { Category } from '../articles-data'

export const vrtourPoliciesCategories: Category[] = [
  {
    id: 'vrtour',
    title: 'Tham quan VR Tour',
    desc: 'Hướng dẫn tham quan căn hộ từ xa thông qua công nghệ thực tế ảo 360°.',
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
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
    articles: [
      {
        id: 'vr-guide',
        title: 'Hướng dẫn xem VR Tour 360 độ',
        breadcrumbs: ['Tham quan VR Tour', 'Hướng dẫn xem VR Tour 360 độ'],
        content: (
          <div className="space-y-4 text-xs md:text-sm text-muted leading-relaxed">
            <p className="font-bold text-fg text-sm">
              Giới thiệu về tính năng VR Tour 360°
            </p>
            <p>
              Tính năng VR Tour 360° của TH-PropTech cung cấp trải nghiệm thực
              tế ảo trực quan sinh động, cho phép người dùng quan sát chi tiết
              mọi ngóc ngách của căn hộ từ xa giống như đang trực tiếp đứng tham
              quan tại địa điểm thực tế.
            </p>

            <h3 className="font-bold text-fg text-sm mt-6">
              Các bước thao tác chi tiết:
            </h3>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <strong>Xoay và điều hướng góc nhìn:</strong> Nhấp giữ chuột
                trái và kéo (hoặc vuốt trên màn hình cảm ứng điện thoại) theo
                các hướng trái, right, lên, xuống để xoay camera 360 độ quan sát
                trần nhà, sàn và bốn góc tường.
              </li>
              <li>
                <strong>Di chuyển sang các khu vực khác (Hotspots):</strong> Tìm
                các biểu tượng vòng tròn hoặc mũi tên nhấp nháy trên sàn nhà/cửa
                đi. Nhấp vào chúng để di chuyển camera sang phòng khác (ví dụ:
                chuyển từ phòng khách sang phòng ngủ hoặc bếp).
              </li>
              <li>
                <strong>Chế độ phóng to/thu nhỏ (Zoom):</strong> Sử dụng con lăn
                chuột hoặc dùng hai ngón tay co giãn trên màn hình điện thoại để
                zoom cận cảnh chất lượng đồ nội thất, thiết bị gia dụng trong
                phòng.
              </li>
              <li>
                <strong>Trải nghiệm kính thực tế ảo (VR Mode):</strong> Nhấp vào
                biểu tượng chiếc kính VR ở góc dưới bên phải màn hình, lắp điện
                thoại vào thiết bị kính VR cá nhân của bạn để kích hoạt hiệu ứng
                lập thể 3D chân thực nhất.
              </li>
            </ol>

            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 mt-6">
              <span className="font-bold text-primary text-xs block mb-1">
                Mẹo nhỏ khi trải nghiệm:
              </span>
              Nên xem ở nơi có mạng Wi-Fi ổn định hoặc mạng 4G/5G chất lượng tốt
              để hình ảnh panorama 360 độ độ phân giải cao 4K không bị mờ và
              hiển thị mượt mà nhất.
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'policies',
    title: 'Quy định & Chính sách',
    desc: 'Các điều khoản sử dụng dịch vụ, chính sách bảo mật và quy chế cộng đồng.',
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
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    articles: [
      {
        id: 'policy-blacklist',
        title: 'Quy định xử phạt tin đăng ảo',
        breadcrumbs: ['Quy định & Chính sách', 'Quy định xử phạt tin đăng ảo'],
        content: (
          <div className="space-y-4 text-xs md:text-sm text-muted leading-relaxed">
            <p>
              TH PropTech áp dụng chính sách kiểm duyệt chặt chẽ và không khoan
              nhượng với tin đăng ảo để đảm bảo tính an toàn cho cộng đồng.
            </p>

            <h3 className="font-bold text-fg text-sm mt-6">
              Các hình thức vi phạm và mức xử phạt chi tiết:
            </h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>
                <strong>
                  Đăng tải thông tin sai lệch về giá thuê hoặc địa điểm:
                </strong>{' '}
                Khi phát hiện tin đăng hiển thị giá ảo hoặc sai vị trí thực tế,
                hệ thống sẽ tự động gửi email cảnh báo và tạm khóa tin đăng
                trong vòng 24 giờ để chủ nhà đính chính.
              </li>
              <li>
                <strong>Sao chép hình ảnh căn hộ của tài khoản khác:</strong> Sử
                dụng hình ảnh không chính chủ hoặc lấy hình ảnh từ internet để
                đăng tin sẽ bị khóa quyền đăng tin trong vòng 30 ngày.
              </li>
              <li>
                <strong>Hành vi lừa đảo cọc trực tuyến:</strong> Yêu cầu khách
                chuyển khoản tiền đặt cọc trước qua các kênh liên hệ ngoài hệ
                thống (không qua tài khoản bảo chứng Techcombank của sàn) sẽ bị
                khóa tài khoản vĩnh viễn và gửi thông tin sang cơ quan công an
                xử lý.
              </li>
              <li>
                <strong>
                  Thu hồi chứng chỉ Fabric CA và đưa vào Blacklist:
                </strong>{' '}
                Danh tính và chứng chỉ X.509 liên kết với tài khoản vi phạm
                nghiêm trọng sẽ bị Fabric CA thu hồi (Revoke), đồng thời ghi
                nhận vào danh sách đen (Blacklist) của chaincode để cấm vĩnh
                viễn mọi quyền tham gia giao dịch trên hệ sinh thái TH-PropTech.
              </li>
            </ul>
          </div>
        ),
      },
      {
        id: 'policy-privacy',
        title: 'Chính sách bảo mật dữ liệu',
        breadcrumbs: ['Quy định & Chính sách', 'Chính sách bảo mật dữ liệu'],
        content: (
          <div className="space-y-4 text-xs md:text-sm text-muted leading-relaxed">
            <p>
              Thông tin cá nhân nhạy cảm (như ảnh CCCD, số điện thoại) đều được
              mã hóa lưu trữ bằng công nghệ mật mã đầu cuối.
            </p>

            <h3 className="font-bold text-fg text-sm mt-6">
              Cam kết của TH-PropTech đối với dữ liệu người dùng:
            </h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>
                <strong>Mục đích sử dụng dữ liệu rõ ràng:</strong> Chúng tôi chỉ
                thu thập và sử dụng thông tin này để phục vụ mục đích xác thực
                KYC pháp lý và thực thi hợp đồng thuê theo đúng quy định pháp
                luật Việt Nam. Tuyệt đối không cung cấp dữ liệu cho bất kỳ đơn
                vị quảng cáo nào khác.
              </li>
              <li>
                <strong>Mã hóa lưu trữ AES-256:</strong> Dữ liệu hình ảnh CCCD,
                số điện thoại của bạn được mã hóa hoàn toàn trước khi đẩy vào
                database. Khóa giải mã được lưu giữ riêng biệt trong các module
                bảo mật vật lý chuyên dụng.
              </li>
              <li>
                <strong>Quyền của chủ thể dữ liệu:</strong> Bạn có quyền yêu cầu
                trích xuất dữ liệu cá nhân của mình, yêu cầu đính chính thông
                tin bị sai sót, hoặc yêu cầu xóa bỏ hoàn toàn thông tin định
                danh khỏi hệ thống bất cứ lúc nào thông qua cổng hỗ trợ khách
                hàng của TH-PropTech.
              </li>
            </ul>
          </div>
        ),
      },
    ],
  },
]
