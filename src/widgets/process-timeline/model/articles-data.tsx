import * as React from 'react'

export interface Article {
  id: string
  title: string
  breadcrumbs: string[]
  content: React.ReactNode
}

export interface Category {
  id: string
  title: string
  desc: string
  icon: React.ReactNode
  articles: Article[]
}

export const categories: Category[] = [
  {
    id: 'services',
    title: 'Sản phẩm & Dịch vụ',
    desc: 'Giải pháp thuê nhà và quản lý căn hộ thông minh tích hợp Blockchain.',
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
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012 2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
    articles: [
      {
        id: 'smart-contract',
        title: 'Hợp đồng thông minh Smart Contract',
        breadcrumbs: [
          'Sản phẩm & Dịch vụ',
          'Hợp đồng thông minh Smart Contract',
        ],
        content: (
          <div className="space-y-4 text-xs md:text-sm text-muted leading-relaxed">
            <p>
              Hợp đồng số thông minh (Smart Contract / Chaincode) là cốt lõi
              trong hệ thống giao dịch của <strong>TH-PropTech</strong>, chạy
              trực tiếp trên nền tảng mạng Hyperledger Fabric, giúp tự động hóa
              và tối ưu toàn bộ tiến trình thuê nhà từ lúc đặt cọc cho đến khi
              kết thúc thời hạn thuê.
            </p>

            <h3 className="font-bold text-fg text-sm mt-6">
              1. Đặc điểm nổi bật và lợi ích pháp lý
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Không thể chỉnh sửa đơn phương:</strong> Mọi điều khoản
                sau khi được ký số bằng chứng chỉ Fabric CA X.509 đều được mã
                hóa, tạo mã băm (hash) và lưu trực tiếp lên hệ thống hợp đồng
                Hyperledger Fabric (proptech-channel), ngăn chặn hoàn toàn việc
                sửa đổi đơn phương hoặc gian lận từ cả hai phía.
              </li>
              <li>
                <strong>Thực thi tự động:</strong> Tự động giám sát luồng tiền
                đặt cọc ký quỹ tại Techcombank, tự động đối chiếu lịch sử đóng
                tiền phòng định kỳ và ghi nhận trạng thái hóa đơn ngay lập tức
                khi phát hiện dòng tiền chuyển khoản hợp lệ từ hệ thống ngân
                hàng liên kết.
              </li>
              <li>
                <strong>Giải quyết tranh chấp minh bạch:</strong> Do toàn bộ dữ
                liệu lịch sử đóng tiền, nhật ký tương tác và các điều kiện phạt
                hợp đồng được lưu vết vĩnh viễn trên hệ thống Fabric, cơ quan
                pháp lý dễ dàng đối chiếu và xử lý tranh chấp nhanh chóng nếu
                có.
              </li>
            </ul>

            <h3 className="font-bold text-fg text-sm mt-6">
              2. Quy trình kích hoạt và các bước thực thi
            </h3>
            <p>
              Quy trình bao gồm các bước: (1) Chủ nhà tạo mẫu hợp đồng trên nền
              tảng với đầy đủ giá thuê, tiền cọc và điều khoản. (2) Khách thuê
              ký duyệt trực tiếp bằng chữ ký số mật mã X.509 của mình. (3) Sau
              khi ký kết, hợp đồng (chaincode) được kích hoạt trực tiếp trên
              mạng Hyperledger Fabric. (4) Tiền cọc (tiền ký quỹ bảo chứng) của
              khách thuê được chuyển và giữ bảo chứng an toàn tại ngân hàng
              Techcombank (giám sát tự động bởi hệ thống Fabric) và chỉ giải tỏa
              hoặc hoàn trả khi đủ điều kiện chấm dứt hợp đồng.
            </p>

            <h3 className="font-bold text-fg text-sm mt-6">
              3. Giải quyết tranh chấp tài sản tự động
            </h3>
            <p>
              Trong trường hợp phát sinh hư hại đồ đạc hoặc kết thúc hợp đồng
              trước hạn, số tiền đặt cọc đang được ký quỹ bảo chứng tại
              Techcombank sẽ tạm thời bị khóa. Hệ thống hỗ trợ hai bên gửi bằng
              chứng hình ảnh (trước/sau khi thuê) để ban quản trị đối chiếu. Sau
              khi có kết quả đồng thuận hoặc phán quyết, hệ thống sẽ gửi lệnh
              lệnh giải tỏa về phía ngân hàng để tự động hoàn trả tiền cọc về
              tài khoản của mỗi bên theo đúng tỷ lệ định sẵn trong hợp đồng
              Fabric.
            </p>

            <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 text-xs mt-6">
              <span className="font-bold text-primary block mb-1">
                Lưu ý quan trọng:
              </span>
              Vui lòng bảo mật tuyệt đối thông tin đăng nhập và mã PIN xác thực
              chữ ký số Fabric CA X.509 cá nhân của bạn. Đây là danh tính chữ ký
              số mật mã duy nhất của bạn trên hệ thống và không thể thay thế tùy
              tiện nếu bị lộ.
            </div>
          </div>
        ),
      },
      {
        id: 'ai-recommender',
        title: 'Hệ thống gợi ý AI gợi ý căn hộ',
        breadcrumbs: ['Sản phẩm & Dịch vụ', 'Hệ thống gợi ý AI gợi ý căn hộ'],
        content: (
          <div className="space-y-4 text-xs md:text-sm text-muted leading-relaxed">
            <p>
              Hệ thống AI đề xuất căn hộ thông minh của TH-PropTech giúp khách
              thuê nhanh chóng tìm được nơi ở lý tưởng dựa trên nhu cầu thực tế
              và thói quen sinh hoạt.
            </p>

            <h3 className="font-bold text-fg text-sm mt-6">
              1. Cơ chế hoạt động của thuật toán
            </h3>
            <p>
              Hệ thống AI của chúng tôi kết hợp hai phương pháp học máy phổ biến
              là <strong>Collaborative Filtering</strong> (gợi ý dựa trên hành
              vi của người dùng có chung sở thích) và{' '}
              <strong>Content-Based Filtering</strong> (gợi ý dựa trên thuộc
              tính cụ thể của căn hộ). Hệ thống sẽ phân tích dữ liệu lịch sử tìm
              kiếm, tầm giá mong muốn, vị trí làm việc, diện tích sử dụng, hướng
              ban công và các tiện ích ưu tiên của bạn để đưa ra điểm số tương
              thích (Match Score) cao nhất.
            </p>
          </div>
        ),
      },
    ],
  },
  {
    id: 'payments',
    title: 'Thanh toán & Giao dịch',
    desc: 'Hướng dẫn thanh toán tiền đặt cọc ký quỹ và tiền thuê căn hộ qua ngân hàng.',
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
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    articles: [
      {
        id: 'payment-guide',
        title: 'Hướng dẫn thanh toán và ký quỹ bảo chứng',
        breadcrumbs: [
          'Thanh toán & Giao dịch',
          'Hướng dẫn thanh toán và ký quỹ bảo chứng',
        ],
        content: (
          <div className="space-y-4 text-xs md:text-sm text-muted leading-relaxed">
            <p>
              TH-PropTech hoạt động theo mô hình sàn giao dịch và quản lý bất
              động sản thông minh. Hệ thống{' '}
              <strong>
                không lưu giữ hay quản lý tiền trực tiếp của bạn dưới dạng ví
                điện tử nội bộ
              </strong>
              . Thay vào đó, toàn bộ dòng tiền thanh toán và ký quỹ đặt cọc đều
              được liên kết trực tiếp qua cổng ngân hàng đối tác (Techcombank)
              và được giám sát tự động bằng hệ thống Hyperledger Fabric.
            </p>

            <h3 className="font-bold text-fg text-sm mt-6">
              Quy trình thực hiện thanh toán và ký quỹ đặt cọc:
            </h3>
            <ul className="list-decimal pl-5 space-y-3">
              <li>
                <strong>Bước 1: Nhận mã thanh toán Techcombank:</strong> Khi có
                yêu cầu đóng tiền nhà hàng tháng hoặc đóng tiền đặt cọc ký quỹ,
                hệ thống sẽ tự động khởi tạo một mã thanh toán ảo (Virtual
                Account) hoặc mã QR chuyển khoản chính xác của Techcombank.
              </li>
              <li>
                <strong>Bước 2: Thực hiện chuyển khoản ngân hàng:</strong> Bạn
                sử dụng ứng dụng Mobile Banking của bất kỳ ngân hàng nào quét mã
                QR hoặc chuyển khoản đúng số tiền đến số tài khoản ảo được cung
                cấp.
              </li>
              <li>
                <strong>Bước 3: Tự động ghi nhận giao dịch:</strong> Cổng thanh
                toán Techcombank sẽ phản hồi trạng thái giao dịch tức thì về hệ
                thống. Fabric Transaction Manager sẽ tự động bắt sự kiện và ghi
                nhận lịch sử thanh toán này vào hệ thống Hyperledger Fabric.
              </li>
              <li>
                <strong>Bước 4: Trạng thái ký quỹ bảo chứng:</strong> Đối với
                tiền đặt cọc ký quỹ, số tiền này sẽ được khóa bảo chứng tại tài
                khoản phong tỏa của Techcombank. Trạng thái bảo chứng sẽ được
                neo trên hệ thống Fabric để đảm bảo không bên nào có thể rút ra
                cho đến khi hợp đồng kết thúc.
              </li>
            </ul>

            <h3 className="font-bold text-fg text-sm mt-6">
              Lưu ý quan trọng về tính pháp lý và an toàn
            </h3>
            <p>
              Hệ thống không thu bất kỳ khoản phí giao dịch hay gas fee nào của
              mạng lưới blockchain vì đây là mạng Hyperledger Fabric riêng tư
              (permissioned blockchain). Bạn chỉ cần thực hiện chuyển khoản đúng
              số tiền ghi trên hóa đơn. Mọi biên lai chuyển khoản thành công từ
              phía ngân hàng đều có ID đối chiếu giao dịch đồng bộ trực tiếp lên
              hệ thống Fabric.
            </p>
          </div>
        ),
      },
      {
        id: 'blockchain-invoice',
        title: 'Cách kiểm tra giao dịch trên hệ thống Fabric',
        breadcrumbs: [
          'Thanh toán & Giao dịch',
          'Cách kiểm tra giao dịch trên hệ thống Fabric',
        ],
        content: (
          <div className="space-y-4 text-xs md:text-sm text-muted leading-relaxed">
            <p>
              Mỗi giao dịch thanh toán thành công thông qua ngân hàng liên kết
              sẽ sinh ra một mã giao dịch Hyperledger Fabric duy nhất (TxID)
              trên hệ thống hợp đồng Hyperledger Fabric của TH-PropTech.
            </p>

            <h3 className="font-bold text-fg text-sm mt-6">
              Hướng dẫn tra cứu chi tiết giao dịch:
            </h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Truy cập mục <strong>Lịch sử hóa đơn</strong> trong giao diện cá
                nhân hoặc giao diện quản lý hợp đồng.
              </li>
              <li>
                Mỗi hóa đơn đã thanh toán thành công sẽ đi kèm một mã giao dịch
                TxID có dạng chuỗi băm mật mã.
              </li>
              <li>
                Bạn có thể nhấp trực tiếp vào TxID để xem thông tin chi tiết
                được xuất trực tiếp từ hệ thống Fabric, bao gồm: Ngày giờ chính
                xác, Họ tên danh tính người gửi (Tenant Fabric CA), người nhận
                (Landlord Fabric CA) và số tiền VND được Techcombank xác nhận.
              </li>
            </ol>

            <h3 className="font-bold text-fg text-sm mt-6">
              Giá trị bảo chứng của hệ thống Hyperledger Fabric
            </h3>
            <p>
              Hệ thống Hyperledger Fabric sử dụng mô hình đồng thuận giữa các
              thành viên mạng lưới (bao gồm ngân hàng giám sát Techcombank và
              các tổ chức vận hành). Điều này đảm bảo lịch sử thanh toán tiền
              nhà và tiền đặt cọc của bạn là bất biến, không thể bị tẩy xóa hay
              sửa đổi bởi bất kỳ cá nhân nào, đóng vai trò là bằng chứng pháp lý
              đanh thép nhất để bảo vệ quyền lợi của hai bên.
            </p>
          </div>
        ),
      },
    ],
  },
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
              Cấp chứng chỉ Fabric CA giúp bạn thực hiện chữ ký số mã hóa X.509
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
                các hướng trái, phải, lên, xuống để xoay camera 360 độ quan sát
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
