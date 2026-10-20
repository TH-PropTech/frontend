import * as React from 'react'
import { Category } from '../articles-data'

export const servicesPaymentsCategories: Category[] = [
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
        id: 'smartca-sign',
        title: 'Ký hợp đồng bằng VNPT SmartCA',
        breadcrumbs: ['Sản phẩm & Dịch vụ', 'Ký hợp đồng bằng VNPT SmartCA'],
        content: (
          <div className="space-y-4 text-xs md:text-sm text-muted leading-relaxed">
            <p className="font-bold text-fg text-sm">
              Chữ ký số VNPT SmartCA là gì?
            </p>
            <p>
              Hợp đồng thuê nhà trên TH-PropTech được ký điện tử bằng chứng thư
              số do VNPT SmartCA cấp. Chữ ký gắn với đúng một người và có số
              hiệu chứng thư để tra cứu ai đã ký. Bạn duyệt giao dịch ngay trong
              ứng dụng VNPT SmartCA trên điện thoại, nên trên trang web không
              phải nhập mật khẩu hay mã OTP của SmartCA.
            </p>

            <h3 className="font-bold text-fg text-sm mt-6">Điều kiện để ký:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Tài khoản đã <strong>hoàn tất xác minh KYC</strong> (hồ sơ được
                duyệt và có số CCCD).
              </li>
              <li>
                Đã có tài khoản <strong>VNPT SmartCA</strong> được cấp chứng thư
                số và cài ứng dụng VNPT SmartCA trên điện thoại.
              </li>
              <li>
                Bản PDF hợp đồng đã được khóa nội dung (không còn chỉnh sửa).
              </li>
            </ul>

            <h3 className="font-bold text-fg text-sm mt-6">
              Các bước thao tác chi tiết:
            </h3>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <strong>Mở bước Ký số:</strong> Trong trang hợp đồng, đọc kỹ nội
                dung ở bước Hợp đồng rồi chuyển sang bước <em>Ký số</em>. Nếu
                chưa ký được, hệ thống nêu rõ lý do (ví dụ chưa duyệt KYC).
              </li>
              <li>
                <strong>Chuẩn bị ký:</strong> Nhấn{' '}
                <em>Chuẩn bị ký VNPT SmartCA</em>. Hệ thống tải danh sách chứng
                thư số SmartCA của bạn.
              </li>
              <li>
                <strong>Chọn chứng thư và gửi yêu cầu:</strong> Nếu có nhiều
                chứng thư, hãy chọn đúng chứng thư của bạn rồi nhấn{' '}
                <em>Gửi yêu cầu ký VNPT SmartCA</em>.
              </li>
              <li>
                <strong>Duyệt trong app VNPT SmartCA:</strong> Mở ứng dụng VNPT
                SmartCA trên điện thoại, kiểm tra thông tin giao dịch và đồng ý
                ký. Trang web tự cập nhật trạng thái và có đồng hồ đếm ngược
                thời gian chờ; bạn cũng có thể nhấn kiểm tra trạng thái hoặc hủy
                yêu cầu.
              </li>
              <li>
                <strong>Hoàn tất:</strong> Khi hiện{' '}
                <em>Đã ký: bằng chứng giao dịch SmartCA đã được xác minh</em>,
                chữ ký của bạn đã được ghi nhận. Hợp đồng chỉ có hiệu lực khi cả
                chủ nhà và khách thuê đều ký, sau đó chuyển sang bước đặt cọc và
                kích hoạt.
              </li>
            </ol>

            <h3 className="font-bold text-fg text-sm mt-6">
              Khi giao dịch không thành công:
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Bị từ chối / đã hủy / hết hạn:</strong> gửi lại yêu cầu
                ký mới và duyệt trong app đúng thời gian đếm ngược.
              </li>
              <li>
                <strong>Chứng thư không hợp lệ hoặc bị trùng:</strong> liên hệ
                VNPT SmartCA để kiểm tra chứng thư số của bạn.
              </li>
            </ul>

            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 mt-6">
              <span className="font-bold text-primary text-xs block mb-1">
                Lưu ý an toàn:
              </span>
              Chỉ duyệt giao dịch khi chính bạn vừa gửi yêu cầu ký và nội dung
              đúng là hợp đồng của mình. TH-PropTech không bao giờ hỏi mật khẩu
              hay mã OTP SmartCA của bạn.
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
]
