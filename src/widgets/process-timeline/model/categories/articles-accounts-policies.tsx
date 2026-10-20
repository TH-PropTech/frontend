import * as React from 'react'
import type { Article } from '../articles-data'
import { Bullets, H3, Lead, Note, Prose, Steps } from './article-blocks'

export const postingArticles: Article[] = [
  {
    id: 'post-desktop',
    title: 'Hướng dẫn đăng tin trên máy tính',
    breadcrumbs: [
      'Hướng dẫn và quy định đăng tin',
      'Hướng dẫn đăng tin',
      'Hướng dẫn đăng tin trên máy tính',
    ],
    content: (
      <Prose>
        <p>
          Đăng tin cho thuê trên website bằng máy tính giúp bạn nhập liệu nhanh
          và quản lý tin đăng dễ dàng.
        </p>

        <H3>Các bước thực hiện:</H3>
        <Steps>
          <li>
            <strong>Đăng nhập</strong> tài khoản chủ nhà. Bạn nên hoàn tất xác
            minh KYC sớm vì cần KYC đã duyệt để ký hợp đồng về sau.
          </li>
          <li>
            Bấm <strong>Đăng tin</strong> ở thanh trên cùng, hoặc vào{' '}
            <em>Trang cá nhân → Tin đăng của tôi</em>.
          </li>
          <li>
            <strong>Nhập thông tin căn hộ:</strong> loại hình, địa chỉ, số phòng
            ngủ, số phòng vệ sinh, diện tích, giá thuê, hướng nhà, hướng ban
            công, tình trạng nội thất, thời gian dọn vào, đơn giá điện nước
            internet và tiện ích.
          </li>
          <li>
            <strong>Hình ảnh:</strong> tải lên ít nhất 1 ảnh thật, càng nhiều
            ảnh rõ nét càng tốt. Có thể thêm link VR Tour hoặc ảnh 360° nếu có.
          </li>
          <li>
            <strong>Giấy chứng nhận quyền sở hữu:</strong> bạn có thể nhập số
            hoặc mã giấy chứng nhận (tùy chọn) để nhân viên đối chiếu.
          </li>
          <li>
            Bấm <strong>Gửi kiểm duyệt</strong>.
          </li>
        </Steps>

        <H3>Sau khi gửi:</H3>
        <Bullets>
          <li>
            Nhân viên kiểm duyệt tin. Tin được duyệt sẽ hiển thị công khai và có
            hiệu lực <strong>30 ngày</strong>; hệ thống nhắc bạn trước khi hết
            hạn 3 ngày.
          </li>
          <li>Tin bị từ chối sẽ kèm lý do. Bạn chỉnh sửa rồi gửi lại.</li>
          <li>Tin sắp hết hạn có thể gia hạn thêm 30 ngày.</li>
          <li>
            Căn hộ của bạn tự có sơ đồ 3D minh hoạ, dựng từ số phòng ngủ, phòng
            vệ sinh, diện tích và nội thất bạn khai.
          </li>
        </Bullets>

        <Note title="Mẹo:">
          Giá thuê, diện tích và ảnh càng đúng thực tế thì càng ít bị báo cáo và
          tăng lòng tin của khách thuê.
        </Note>
      </Prose>
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
      <Prose>
        <p>Đăng tin ngay trên ứng dụng di động TH-PropTech.</p>

        <H3>Các bước thực hiện:</H3>
        <Steps>
          <li>
            Mở ứng dụng, đăng nhập tài khoản chủ nhà và chọn mục dành cho chủ
            nhà.
          </li>
          <li>
            Chọn <strong>Đăng tin căn hộ mới</strong>.
          </li>
          <li>
            <strong>Thêm ảnh:</strong> chọn ảnh có sẵn hoặc chụp trực tiếp (cho
            phép ứng dụng dùng Camera khi được hỏi). Cần ít nhất 1 ảnh.
          </li>
          <li>
            Nhập địa chỉ, số phòng ngủ, phòng vệ sinh, diện tích, giá thuê,
            hướng nhà, nội thất, điện nước và tiện ích.
          </li>
          <li>
            Nhập số hoặc mã giấy chứng nhận quyền sở hữu nếu có (tùy chọn), rồi
            gửi kiểm duyệt.
          </li>
        </Steps>

        <Note title="Sau khi gửi:">
          Theo dõi trạng thái ở danh sách tin đăng. Tin được duyệt hiển thị 30
          ngày; tin bị từ chối có lý do để bạn sửa và gửi lại.
        </Note>
      </Prose>
    ),
  },
]

export const accountArticles: Article[] = [
  {
    id: 'kyc-info',
    title: 'Xác minh danh tính (KYC) bằng CCCD',
    breadcrumbs: ['Tài khoản người dùng', 'Xác minh danh tính (KYC) bằng CCCD'],
    content: (
      <Prose>
        <Lead>Vì sao cần KYC?</Lead>
        <p>
          KYC xác nhận bạn là người thật với giấy tờ thật. Bạn cần KYC đã được
          duyệt để ký hợp đồng bằng VNPT SmartCA.
        </p>

        <H3>Các bước thực hiện:</H3>
        <Steps>
          <li>
            Vào <em>Trang cá nhân</em> và chọn xác minh danh tính.
          </li>
          <li>
            <strong>Tải CCCD:</strong> chụp bằng webcam hoặc tải ảnh mặt trước
            và mặt sau của căn cước công dân.
          </li>
          <li>
            Hệ thống đọc thông tin trên thẻ (OCR). Hãy{' '}
            <strong>kiểm tra và sửa</strong> các trường như họ tên, số CCCD,
            ngày sinh, giới tính, quốc tịch, quê quán, nơi thường trú, ngày cấp,
            nơi cấp.
          </li>
          <li>Gửi hồ sơ và chờ nhân viên duyệt.</li>
        </Steps>

        <H3>Trạng thái hồ sơ:</H3>
        <Bullets>
          <li>
            <strong>Đang chờ duyệt:</strong> nhân viên đang xem hồ sơ.
          </li>
          <li>
            <strong>Đã duyệt:</strong> bạn có thể ký hợp đồng. Hồ sơ đã duyệt
            không gửi lại.
          </li>
          <li>
            <strong>Bị từ chối:</strong> có lý do cụ thể; bạn chỉnh sửa và gửi
            lại.
          </li>
        </Bullets>

        <Note title="Về dữ liệu của bạn:">
          Ảnh CCCD được mã hóa AES-256-GCM khi lưu trữ. Để đọc thông tin trên
          thẻ, hệ thống gửi ảnh tới dịch vụ nhận dạng của bên thứ ba. Thông tin
          cá nhân và số tiền không được ghi lên sổ cái.
        </Note>
      </Prose>
    ),
  },
  {
    id: 'account-security',
    title: 'Bảo mật tài khoản (2FA, Smart OTP)',
    breadcrumbs: ['Tài khoản người dùng', 'Bảo mật tài khoản (2FA, Smart OTP)'],
    content: (
      <Prose>
        <Lead>Bảo vệ tài khoản của bạn</Lead>
        <p>
          Ngoài mật khẩu, bạn có thể bật thêm các lớp bảo vệ trong{' '}
          <em>Trang cá nhân → Bảo mật</em>.
        </p>

        <H3>Xác thực hai lớp (2FA):</H3>
        <Steps>
          <li>Chọn bật 2FA, hệ thống tạo khóa bí mật và mã QR.</li>
          <li>
            Quét mã bằng ứng dụng xác thực (Google Authenticator hoặc tương
            đương) rồi nhập mã 6 số để kích hoạt.
          </li>
          <li>
            <strong>Lưu lại các mã dự phòng</strong> ở nơi an toàn, dùng khi bạn
            mất điện thoại.
          </li>
        </Steps>

        <H3>Smart OTP:</H3>
        <Bullets>
          <li>
            Smart OTP gắn với thiết bị của bạn và dùng mã PIN riêng để xác nhận
            các thao tác nhạy cảm.
          </li>
          <li>
            Nhập sai quá nhiều lần thiết bị sẽ bị khóa tạm thời; hãy giữ kín mã
            PIN.
          </li>
        </Bullets>

        <Note title="Lưu ý:">
          Smart OTP là tính năng khác với chữ ký VNPT SmartCA. Khi ký hợp đồng
          bạn duyệt trong ứng dụng VNPT SmartCA, không nhập mã PIN trên web.
        </Note>
      </Prose>
    ),
  },
]

export const vrtourArticles: Article[] = [
  {
    id: 'vr-guide',
    title: 'Xem ảnh 360° căn hộ',
    breadcrumbs: ['Tham quan VR Tour', 'Xem ảnh 360° căn hộ'],
    content: (
      <Prose>
        <Lead>Tham quan căn hộ bằng ảnh 360°</Lead>
        <p>
          Nếu chủ nhà đã tải ảnh 360°, trang chi tiết căn hộ có mục{' '}
          <em>Trải nghiệm 360° VR Tour</em> để bạn nhìn quanh từng phòng như
          đang đứng tại chỗ. Căn hộ chưa có ảnh 360° sẽ không hiện mục này.
        </p>

        <H3>Các bước thao tác:</H3>
        <Steps>
          <li>
            Mở trang chi tiết căn hộ và nhấn <em>Trải nghiệm 360° VR Tour</em>.
          </li>
          <li>
            <strong>Nhìn quanh:</strong> nhấn giữ chuột và kéo, hoặc vuốt trên
            màn hình cảm ứng để xoay góc nhìn.
          </li>
          <li>
            <strong>Sang phòng khác:</strong> nhấn vào các điểm{' '}
            <em>Đi tới ...</em> trong ảnh (ví dụ Đi tới Phòng bếp) để chuyển
            phòng.
          </li>
          <li>
            Bật hoặc tắt chế độ tự xoay, và nhấn <em>Toàn màn hình</em> để xem
            rộng hơn; <em>Thu nhỏ</em> để quay lại.
          </li>
        </Steps>

        <Note title="Mẹo:">
          Ảnh 360° có dung lượng lớn nên hãy xem khi có Wi-Fi hoặc 4G ổn định để
          ảnh tải nhanh và rõ nét.
        </Note>
      </Prose>
    ),
  },
  {
    id: 'floorplan-3d',
    title: 'Xem sơ đồ 3D căn hộ',
    breadcrumbs: ['Tham quan VR Tour', 'Xem sơ đồ 3D căn hộ'],
    content: (
      <Prose>
        <Lead>Sơ đồ 3D minh hoạ là gì?</Lead>
        <p>
          Sơ đồ 3D được dựng ngay khi bạn xem, từ thông tin của tin đăng: số
          phòng ngủ, số phòng vệ sinh, diện tích và mức nội thất. Bố cục mang
          tính minh hoạ và có thể khác hiện trạng thực tế, bạn nên đi xem nhà
          trước khi quyết định.
        </p>

        <H3>Các bước thao tác chi tiết:</H3>
        <Steps>
          <li>
            <strong>Mở sơ đồ:</strong> Ở trang chi tiết căn hộ, nhấn{' '}
            <em>Xem sơ đồ 3D minh hoạ</em>. Màn hình mở ra một khu đô thị nhìn
            từ trên cao, căn bạn đang xem là cửa sổ{' '}
            <strong>sáng màu cam</strong> trên tòa nhà xanh, có ghim nổi phía
            trên.
          </li>
          <li>
            <strong>Di chuyển trong khu đô thị:</strong> Kéo chuột trái để dịch
            chuyển, kéo chuột phải để xoay, lăn chuột để phóng to hoặc thu nhỏ.
            Trên điện thoại: một ngón để kéo, hai ngón để phóng và xoay. Nút mặt
            trời / mặt trăng đổi giữa ban ngày và ban đêm, nút bên cạnh bật toàn
            màn hình.
          </li>
          <li>
            <strong>Vào xem phòng:</strong> Nhấn vào cửa sổ đang sáng (hoặc nhấn
            tòa nhà rồi chọn căn trong danh sách). Camera bay tới sát cửa sổ rồi
            chuyển vào bên trong căn hộ.
          </li>
          <li>
            <strong>Quan sát và đi trong phòng:</strong> Chế độ{' '}
            <em>Tổng quan</em> cho nhìn toàn bộ mặt bằng từ trên cao; chế độ{' '}
            <em>Đi vào</em> cho bạn đi bộ bên trong. Máy tính: phím W A S D hoặc
            mũi tên để đi, Shift để chạy, kéo chuột để nhìn quanh. Điện thoại:
            cần điều khiển bên trái để đi, nút bên phải để quay hoặc chạy, kéo
            màn hình để nhìn quanh.
          </li>
          <li>
            <strong>Tùy chỉnh khi xem:</strong> Đổi giờ trong ngày để xem ánh
            sáng, chọn phong cách thiết kế (nếu căn có nhiều phong cách) và dùng
            ô tìm kiếm để đến nhanh một phòng hoặc món đồ.
          </li>
          <li>
            <strong>Quay lại:</strong> Nhấn <em>Sa bàn</em> ở góc trên bên trái
            để trở về khu đô thị.
          </li>
        </Steps>

        <Note title="Trên ứng dụng điện thoại:">
          Xoay máy ngang để có không gian rộng hơn, hoặc nhấn nút xoay ở góc
          trên màn hình. Thoát khỏi màn hình 3D thì ứng dụng tự trở về chiều
          dọc.
        </Note>
      </Prose>
    ),
  },
]

export const policiesArticles: Article[] = [
  {
    id: 'policy-report',
    title: 'Báo cáo tin đăng vi phạm',
    breadcrumbs: ['Quy định & Chính sách', 'Báo cáo tin đăng vi phạm'],
    content: (
      <Prose>
        <Lead>Gặp tin đăng đáng ngờ thì làm gì?</Lead>
        <p>
          Nếu thấy tin đăng giả, thông tin sai hoặc bị yêu cầu chuyển tiền ngoài
          hệ thống, hãy báo cáo để nhân viên xem xét.
        </p>

        <H3>Cách báo cáo:</H3>
        <Steps>
          <li>
            Ở trang chi tiết căn hộ, nhấn <em>Báo cáo vi phạm</em>.
          </li>
          <li>
            Chọn loại vi phạm: <em>Tin đăng ảo / Thông tin sai sự thật</em>,{' '}
            <em>Yêu cầu chuyển tiền ngoài hệ thống</em>,{' '}
            <em>Thông tin căn hộ không chính xác</em>,{' '}
            <em>Quấy rầy / Ngôn từ không phù hợp</em>,{' '}
            <em>Spam / Đăng lặp lại</em> hoặc{' '}
            <em>Có hành vi dấu hiệu lừa đảo nguy hiểm</em>.
          </li>
          <li>Mô tả ngắn gọn rồi gửi báo cáo.</li>
        </Steps>

        <H3>Báo cáo được xử lý thế nào:</H3>
        <Bullets>
          <li>
            Nhân viên chuyển báo cáo sang <em>đang xem xét</em>, sau đó{' '}
            <em>đã xử lý</em> hoặc <em>bác bỏ</em>. Bạn theo dõi ở{' '}
            <em>Trang cá nhân → Báo cáo an toàn</em>.
          </li>
          <li>
            Với các loại nghiêm trọng, nhân viên có thể ẩn tin đăng khỏi trang
            tìm kiếm.
          </li>
          <li>
            Nếu không đồng ý với kết quả, bạn có thể khiếu nại sau khi báo cáo
            được xử lý hoặc bác bỏ.
          </li>
        </Bullets>

        <Note title="Phòng tránh lừa đảo:">
          Không chuyển tiền cọc hoặc tiền thuê ngoài nền tảng, kể cả khi chủ nhà
          nói được giảm giá. Hãy thanh toán qua cổng của TH-PropTech.
        </Note>
      </Prose>
    ),
  },
  {
    id: 'policy-privacy',
    title: 'Chính sách bảo mật dữ liệu',
    breadcrumbs: ['Quy định & Chính sách', 'Chính sách bảo mật dữ liệu'],
    content: (
      <Prose>
        <Lead>Dữ liệu của bạn được bảo vệ như thế nào?</Lead>
        <Bullets>
          <li>
            <strong>Mật khẩu:</strong> được băm bằng bcrypt, hệ thống không lưu
            mật khẩu gốc.
          </li>
          <li>
            <strong>Ảnh CCCD:</strong> mã hóa AES-256-GCM khi lưu trữ. Để đọc
            thông tin trên thẻ, ảnh được gửi tới dịch vụ nhận dạng của bên thứ
            ba.
          </li>
          <li>
            <strong>Đăng nhập:</strong> dùng phiên có thời hạn, giới hạn số lần
            thử, hỗ trợ xác thực hai lớp (2FA) và Smart OTP.
          </li>
          <li>
            <strong>Sổ cái:</strong> chỉ ghi mã băm và mã định danh của hợp
            đồng, thanh toán. Họ tên, CCCD, số tiền không được ghi lên sổ cái.
          </li>
        </Bullets>

        <H3>Quyền của bạn:</H3>
        <p>
          Cần xem, chỉnh sửa hoặc xóa dữ liệu cá nhân, hãy gửi yêu cầu qua mục{' '}
          <em>Hỗ trợ kỹ thuật</em> trong Trang cá nhân. Hiện chưa có chức năng
          tự xuất hoặc tự xóa dữ liệu.
        </p>

        <Note title="Lưu ý:">
          Không có hệ thống nào an toàn tuyệt đối. Hãy bật 2FA, dùng mật khẩu
          riêng và không chia sẻ mã OTP với bất kỳ ai.
        </Note>
      </Prose>
    ),
  },
  {
    id: 'policy-fees',
    title: 'Chính sách biểu phí dịch vụ',
    breadcrumbs: ['Quy định & Chính sách', 'Chính sách biểu phí dịch vụ'],
    content: (
      <Prose>
        <Lead>Những khoản phí trên TH-PropTech</Lead>
        <Bullets>
          <li>
            <strong>Đăng tin:</strong> không thu phí đăng tin.
          </li>
          <li>
            <strong>Phí của chủ nhà khi cho thuê thành công:</strong> tính theo
            thời hạn hợp đồng (theo biểu phí mặc định, hợp đồng 3 đến 6 tháng
            bằng nửa tháng tiền thuê, hợp đồng 12 đến 24 tháng bằng một tháng
            tiền thuê).
          </li>
          <li>
            <strong>Phí dịch vụ của khách thuê:</strong> theo biểu phí mặc định
            là 2% tiền thuê một tháng, tối thiểu 100.000đ và tối đa 500.000đ,
            thu cùng các khoản đến hạn khi nhận nhà.
          </li>
          <li>Các khoản phí cộng thêm VAT 10%.</li>
        </Bullets>

        <H3>Cách thu phí:</H3>
        <p>
          Phí được xuất thành hóa đơn riêng, không trừ vào tiền thuê hay tiền
          cọc bạn chuyển cho chủ nhà. Số tiền chính thức luôn hiển thị trên hóa
          đơn của bạn.
        </p>

        <Note title="Lưu ý:">
          Biểu phí có thể được cập nhật; số liệu trên đây là biểu phí mặc định.
          Hãy đối chiếu với hóa đơn thực tế của bạn.
        </Note>
      </Prose>
    ),
  },
]
