import * as React from 'react'
import type { Article } from '../articles-data'
import { Bullets, H3, Lead, Note, Prose, Steps } from './article-blocks'

export const servicesArticles: Article[] = [
  {
    id: 'smart-contract',
    title: 'Hợp đồng điện tử và quy trình thuê',
    breadcrumbs: ['Sản phẩm & Dịch vụ', 'Hợp đồng điện tử và quy trình thuê'],
    content: (
      <Prose>
        <Lead>Quy trình thuê nhà diễn ra như thế nào?</Lead>
        <p>
          Sau khi hồ sơ thuê được chấp thuận, hợp đồng thuê được lập thành bản
          điện tử và đi qua các bước cố định. Bạn xem tiến độ ở trang hợp đồng.
        </p>

        <H3>Các bước của hợp đồng:</H3>
        <Steps>
          <li>
            <strong>Hợp đồng:</strong> đọc nội dung hợp đồng (thời hạn, giá
            thuê, ngày thanh toán hằng tháng, điều khoản chậm thanh toán). Khi
            nội dung được khóa, bản PDF không còn chỉnh sửa.
          </li>
          <li>
            <strong>Ký số:</strong> chủ nhà và khách thuê đều ký bằng chứng thư
            số VNPT SmartCA. Mỗi bên cần đã xác minh KYC. Xem bài{' '}
            <em>Ký hợp đồng bằng VNPT SmartCA</em>.
          </li>
          <li>
            <strong>Đặt cọc:</strong> khách thuê thanh toán tiền cọc. Thứ tự là
            ký trước, cọc sau: hợp đồng ở trạng thái chờ cọc cho đến khi đủ hai
            chữ ký và tiền cọc đã được xác nhận.
          </li>
          <li>
            <strong>Kích hoạt:</strong> hợp đồng có hiệu lực, hệ thống tạo lịch
            hóa đơn tiền thuê theo chu kỳ đã ghi trong hợp đồng.
          </li>
          <li>
            <strong>Nhận nhà:</strong> với hợp đồng có quyết toán nhận nhà, bạn
            thanh toán các khoản đến hạn rồi hai bên xác nhận bàn giao.
          </li>
        </Steps>

        <H3>Dấu vết và kiểm tra tính toàn vẹn:</H3>
        <Bullets>
          <li>
            Khi hệ thống lưu vết chống sửa đổi hoạt động, hệ thống ghi nhận mã
            xác thực nội dung của hợp đồng và các giao dịch quan trọng. Số tiền
            và thông tin cá nhân không được đưa vào dữ liệu lưu vết.
          </li>
          <li>
            Ở bước Kích hoạt có nút <em>Đối soát toàn vẹn nội dung hợp đồng</em>{' '}
            để kiểm tra nội dung hiện tại có khớp bản đã ký hay không, cùng gói
            bằng chứng có thể tải về.
          </li>
        </Bullets>

        <Note title="Lưu ý:">
          Hợp đồng có hiệu lực khi đủ chữ ký của cả hai bên và tiền cọc đã được
          xác nhận. Hãy đọc kỹ điều khoản trước khi ký.
        </Note>
      </Prose>
    ),
  },
  {
    id: 'smartca-sign',
    title: 'Ký hợp đồng bằng VNPT SmartCA',
    breadcrumbs: ['Sản phẩm & Dịch vụ', 'Ký hợp đồng bằng VNPT SmartCA'],
    content: (
      <Prose>
        <Lead>Chữ ký số VNPT SmartCA là gì?</Lead>
        <p>
          Hợp đồng thuê nhà trên TH-PropTech được ký điện tử bằng chứng thư số
          do VNPT SmartCA cấp. Chữ ký gắn với đúng một người và có số hiệu chứng
          thư để tra cứu ai đã ký. Bạn duyệt giao dịch ngay trong ứng dụng VNPT
          SmartCA trên điện thoại, nên trên trang web không phải nhập mật khẩu
          hay mã OTP của SmartCA.
        </p>

        <H3>Điều kiện để ký:</H3>
        <Bullets>
          <li>
            Tài khoản đã <strong>hoàn tất xác minh KYC</strong> (hồ sơ được
            duyệt và có số CCCD).
          </li>
          <li>
            Đã có tài khoản <strong>VNPT SmartCA</strong> được cấp chứng thư số
            và cài ứng dụng VNPT SmartCA trên điện thoại.
          </li>
          <li>Bản PDF hợp đồng đã được khóa nội dung (không còn chỉnh sửa).</li>
        </Bullets>

        <H3>Các bước thao tác chi tiết:</H3>
        <Steps>
          <li>
            <strong>Mở bước Ký số:</strong> Trong trang hợp đồng, đọc kỹ nội
            dung ở bước Hợp đồng rồi chuyển sang bước <em>Ký số</em>. Nếu chưa
            ký được, hệ thống nêu rõ lý do (ví dụ chưa duyệt KYC).
          </li>
          <li>
            <strong>Chuẩn bị ký:</strong> Nhấn <em>Chuẩn bị ký VNPT SmartCA</em>
            . Hệ thống tải danh sách chứng thư số SmartCA của bạn.
          </li>
          <li>
            <strong>Chọn chứng thư và gửi yêu cầu:</strong> Nếu có nhiều chứng
            thư, hãy chọn đúng chứng thư của bạn rồi nhấn{' '}
            <em>Gửi yêu cầu ký VNPT SmartCA</em>.
          </li>
          <li>
            <strong>Duyệt trong app VNPT SmartCA:</strong> Mở ứng dụng VNPT
            SmartCA trên điện thoại, kiểm tra thông tin giao dịch và đồng ý ký.
            Trang web tự cập nhật trạng thái và có đồng hồ đếm ngược thời gian
            chờ; bạn cũng có thể nhấn kiểm tra trạng thái hoặc hủy yêu cầu.
          </li>
          <li>
            <strong>Hoàn tất:</strong> Khi hiện{' '}
            <em>Đã ký: bằng chứng giao dịch SmartCA đã được xác minh</em>, chữ
            ký của bạn đã được ghi nhận. Hợp đồng chỉ có hiệu lực khi cả chủ nhà
            và khách thuê đều ký và tiền cọc đã được xác nhận.
          </li>
        </Steps>

        <H3>Khi giao dịch không thành công:</H3>
        <Bullets>
          <li>
            <strong>Bị từ chối / đã hủy / hết hạn:</strong> gửi lại yêu cầu ký
            mới và duyệt trong app đúng thời gian đếm ngược.
          </li>
          <li>
            <strong>Chứng thư không hợp lệ hoặc bị trùng:</strong> liên hệ VNPT
            SmartCA để kiểm tra chứng thư số của bạn.
          </li>
        </Bullets>

        <Note title="Lưu ý an toàn:">
          Chỉ duyệt giao dịch khi chính bạn vừa gửi yêu cầu ký và nội dung đúng
          là hợp đồng của mình. TH-PropTech không bao giờ hỏi mật khẩu hay mã
          OTP SmartCA của bạn.
        </Note>
      </Prose>
    ),
  },
  {
    id: 'ai-recommender',
    title: 'Gợi ý căn hộ theo khảo sát',
    breadcrumbs: ['Sản phẩm & Dịch vụ', 'Gợi ý căn hộ theo khảo sát'],
    content: (
      <Prose>
        <Lead>Hệ thống gợi ý hoạt động ra sao?</Lead>
        <p>
          Bạn trả lời một khảo sát ngắn, hệ thống chấm điểm các căn hộ đang cho
          thuê và đề xuất tối đa 5 căn phù hợp nhất. Việc gợi ý chỉ dùng các câu
          trả lời trong khảo sát, không đọc hồ sơ KYC hay lịch sử duyệt tin của
          bạn.
        </p>

        <H3>Cách dùng:</H3>
        <Steps>
          <li>
            Ở trang chủ, mục <em>Đề xuất cá nhân hoá cho bạn</em>, nhấn nút làm
            khảo sát. Không cần đăng nhập để nhận gợi ý.
          </li>
          <li>
            Điền: tuổi, thu nhập hằng tháng, khu vực mong muốn, số phòng ngủ, và
            nhu cầu có phòng gym hoặc chỗ để xe hay không.
          </li>
          <li>
            Xem danh sách căn hộ gợi ý. Mỗi căn có <strong>điểm phù hợp</strong>
            , mức tin cậy (Cao / Trung bình / Thấp) và các lý do chính.
          </li>
          <li>
            Nếu đã đăng nhập, bạn có thể nhấn thích hoặc không thích để hệ thống
            học dần từ phản hồi.
          </li>
        </Steps>

        <H3>Hệ thống chấm điểm như thế nào:</H3>
        <Bullets>
          <li>
            Kết hợp mô hình xác suất Naive Bayes và bộ điểm theo bốn nhóm: tài
            chính, vị trí, nhân khẩu học và tiện ích.
          </li>
          <li>
            Căn hộ có giá thuê vượt quá 50% thu nhập bạn khai sẽ không được đề
            xuất.
          </li>
          <li>
            Mô hình được huấn luyện lại từ dữ liệu căn hộ và phản hồi mỗi khi hệ
            thống khởi động.
          </li>
        </Bullets>

        <Note title="Lưu ý:">
          Điểm phù hợp chỉ là tham khảo, không thay thế việc xem nhà và đọc kỹ
          điều khoản. Danh sách khu vực trong khảo sát hiện gồm 9 quận phổ biến.
        </Note>
      </Prose>
    ),
  },
]

export const paymentsArticles: Article[] = [
  {
    id: 'payment-guide',
    title: 'Thanh toán tiền cọc và tiền thuê',
    breadcrumbs: ['Thanh toán & Giao dịch', 'Thanh toán tiền cọc và tiền thuê'],
    content: (
      <Prose>
        <Lead>Tiền của bạn đi đâu?</Lead>
        <p>
          Tiền cọc và tiền thuê được chuyển cho chủ nhà. TH-PropTech không giữ
          tiền của bạn và không có tài khoản giữ cọc trung gian. Tùy phương thức
          thanh toán, khoản tiền đến chủ nhà trực tiếp hoặc do nền tảng chuyển
          hộ.
        </p>

        <Note title="Môi trường thử nghiệm:">
          Hệ thống hiện chạy với ví và ngân hàng giả lập (ví dụ Ví Mộc, Mock
          Bank), không phải tiền thật. Các phương thức hiển thị có thể thay đổi
          theo cấu hình.
        </Note>

        <H3>Thanh toán tiền cọc:</H3>
        <Steps>
          <li>
            Hoàn tất ký hợp đồng (thứ tự là ký trước, cọc sau), rồi vào bước{' '}
            <em>Đặt cọc</em> của hợp đồng.
          </li>
          <li>
            Chọn phương thức thanh toán, quét mã QR hoặc làm theo hướng dẫn trên
            màn hình. Mỗi lần thanh toán có thời hạn khoảng 15 phút, hết thời
            hạn bạn tạo lại lượt mới.
          </li>
          <li>
            Khi tiền cọc được xác nhận, hợp đồng được kích hoạt nếu đã đủ hai
            chữ ký.
          </li>
        </Steps>

        <H3>Tiền thuê hằng tháng:</H3>
        <Bullets>
          <li>
            Hóa đơn tiền thuê được tạo khi hợp đồng có hiệu lực, theo chu kỳ 1,
            3 hoặc 6 tháng đã ghi trong hợp đồng, đến hạn vào ngày thanh toán
            quy định.
          </li>
          <li>
            Hệ thống nhắc trước hạn 7 ngày. Quá hạn, hóa đơn chuyển sang trạng
            thái <em>quá hạn</em>.
          </li>
          <li>
            Lãi chậm thanh toán là điều khoản của hợp đồng (tính theo %/năm, có
            mức trần theo quy định), không tự cộng vào hóa đơn.
          </li>
        </Bullets>

        <H3>Thanh toán khi nhận nhà:</H3>
        <p>
          Với hợp đồng có quyết toán nhận nhà, các khoản đến hạn có thể gồm phần
          tiền cọc còn thiếu, tiền thuê kỳ đầu và phí dịch vụ của khách thuê.
          Hạn thanh toán mặc định là 3 ngày trước ngày bắt đầu thuê.
        </p>

        <Note title="Lưu ý an toàn:">
          Chỉ thanh toán qua cổng của TH-PropTech. Không chuyển tiền cọc cho chủ
          nhà ngoài nền tảng; nếu bị yêu cầu, hãy báo cáo vi phạm ngay.
        </Note>
      </Prose>
    ),
  },
  {
    id: 'blockchain-invoice',
    title: 'Xem hóa đơn và bằng chứng giao dịch',
    breadcrumbs: [
      'Thanh toán & Giao dịch',
      'Xem hóa đơn và bằng chứng giao dịch',
    ],
    content: (
      <Prose>
        <Lead>Kiểm tra hóa đơn và dấu vết của giao dịch</Lead>
        <p>
          Mọi hóa đơn của bạn nằm ở tab <em>Hóa đơn</em> trong trang cá nhân.
          Với hợp đồng, bạn còn xem được bằng chứng ghi lại các bước quan trọng.
        </p>

        <H3>Các bước kiểm tra:</H3>
        <Steps>
          <li>
            Vào <em>Trang cá nhân</em> rồi tab <em>Hóa đơn</em> để xem hóa đơn,
            hạn thanh toán, số tiền và trạng thái.
          </li>
          <li>
            Mở hợp đồng, bước <em>Kích hoạt</em>: thẻ bằng chứng hiển thị{' '}
            <em>Mã giao dịch lưu vết</em> (rút gọn, có nút sao chép) và dòng
            thời gian các sự kiện.
          </li>
          <li>
            Nhấn <em>Đối soát toàn vẹn nội dung hợp đồng</em> để kiểm tra nội
            dung hiện tại khớp với bản đã ký.
          </li>
          <li>
            Cần lưu trữ hoặc gửi cho bên thứ ba thì tải <em>gói bằng chứng</em>.
          </li>
        </Steps>

        <H3>Hệ thống lưu vết ghi những gì?</H3>
        <Bullets>
          <li>
            Chỉ ghi mã xác thực nội dung và mã định danh của hợp đồng, thanh
            toán, bàn giao. Số tiền, họ tên, CCCD không được ghi vào dữ liệu lưu
            vết.
          </li>
          <li>Bạn không phải nhập hay dán mã giao dịch ở bất kỳ bước nào.</li>
          <li>
            Khi chưa kích hoạt lưu vết trực tiếp, hệ thống ghi nhận ở chế độ thử
            nghiệm.
          </li>
        </Bullets>
      </Prose>
    ),
  },
]
