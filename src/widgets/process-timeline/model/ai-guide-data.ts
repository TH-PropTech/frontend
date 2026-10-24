export type UserRole = 'tenant' | 'staff' | 'admin' | 'guest'

export interface AnnotationAnchor {
  keyword: string
  explanation: string
  relatedStepIndex?: number
}

/**
 * Hướng dẫn từng bước đi kèm mỗi bài Cẩm nang. `stepTips[i]` là lời đọc của bước `steps[i]`.
 * Đây là kịch bản soạn sẵn (không phải AI): nội dung phải khớp với bài viết và với hành vi thật của hệ thống.
 */
export interface AiGuide {
  title: string
  summary: string
  steps: string[]
  tip: string
  stepTips: string[]
  stepTipsEn?: string[]
  glossary?: Record<string, string>
  stepTipsByRole?: Partial<Record<UserRole, string[]>>
  annotations?: AnnotationAnchor[]
}

export const AI_GUIDES: Record<string, AiGuide> = {
  'post-desktop': {
    title: 'Hướng dẫn đăng tin trên máy tính',
    summary:
      'Đăng tin trên máy tính giúp bạn nhập thông tin căn hộ và ảnh nhanh chóng, rồi gửi nhân viên kiểm duyệt.',
    steps: [
      'Đăng nhập tài khoản chủ nhà và bấm Đăng tin ở thanh trên cùng.',
      'Nhập thông tin căn hộ: loại hình, địa chỉ, số phòng, diện tích, giá thuê, hướng nhà, nội thất, điện nước và tiện ích.',
      'Tải lên ít nhất một ảnh thật của căn hộ, có thể thêm link VR Tour hoặc ảnh 360 độ.',
      'Bấm Gửi kiểm duyệt và theo dõi trạng thái ở Tin đăng của tôi.',
    ],
    tip: 'Tin được duyệt hiển thị 30 ngày. Hệ thống nhắc bạn trước khi hết hạn 3 ngày, và bạn có thể gia hạn thêm 30 ngày.',
    stepTips: [
      'Bước 1: Đăng nhập tài khoản chủ nhà, sau đó bấm nút Đăng tin ở thanh trên cùng hoặc vào mục Tin đăng của tôi.',
      'Bước 2: Nhập đầy đủ thông tin căn hộ, gồm loại hình, địa chỉ, số phòng ngủ, số phòng vệ sinh, diện tích, giá thuê, hướng nhà, tình trạng nội thất, điện nước và tiện ích.',
      'Bước 3: Tải lên ít nhất một ảnh thật của căn hộ. Nếu có, bạn có thể thêm đường link VR Tour hoặc ảnh 360 độ.',
      'Bước 4: Bấm Gửi kiểm duyệt. Nếu tin bị từ chối, bạn sẽ thấy lý do để chỉnh sửa và gửi lại.',
    ],
  },
  'post-mobile': {
    title: 'Hướng dẫn đăng tin trên điện thoại',
    summary:
      'Đăng tin ngay trên ứng dụng, chọn ảnh có sẵn hoặc chụp trực tiếp rồi gửi kiểm duyệt.',
    steps: [
      'Mở ứng dụng, đăng nhập và chọn mục dành cho chủ nhà.',
      'Chọn Đăng tin căn hộ mới.',
      'Thêm ít nhất một ảnh: chọn ảnh có sẵn hoặc chụp trực tiếp.',
      'Nhập thông tin căn hộ rồi gửi kiểm duyệt.',
    ],
    tip: 'Theo dõi trạng thái ở danh sách tin đăng. Tin bị từ chối có lý do để bạn sửa và gửi lại.',
    stepTips: [
      'Bước 1: Mở ứng dụng, đăng nhập tài khoản chủ nhà và chọn mục dành cho chủ nhà.',
      'Bước 2: Chọn Đăng tin căn hộ mới.',
      'Bước 3: Thêm ít nhất một ảnh. Bạn có thể chọn ảnh có sẵn hoặc chụp trực tiếp, hãy cho phép ứng dụng dùng Camera khi được hỏi.',
      'Bước 4: Nhập địa chỉ, số phòng, diện tích, giá thuê và các thông tin còn lại, rồi gửi kiểm duyệt.',
    ],
  },
  'kyc-info': {
    title: 'Hướng dẫn xác minh KYC',
    summary:
      'KYC xác nhận bạn là người thật với giấy tờ thật. Cần KYC đã duyệt để ký hợp đồng bằng VNPT SmartCA.',
    steps: [
      'Vào Trang cá nhân và chọn xác minh danh tính.',
      'Chụp hoặc tải ảnh mặt trước và mặt sau CCCD.',
      'Kiểm tra và sửa các thông tin hệ thống đọc được từ thẻ.',
      'Gửi hồ sơ và chờ nhân viên duyệt.',
    ],
    tip: 'Ảnh CCCD được mã hóa khi lưu trữ. Để đọc thông tin trên thẻ, ảnh được gửi tới dịch vụ nhận dạng của bên thứ ba.',
    stepTips: [
      'Bước 1: Vào Trang cá nhân và chọn xác minh danh tính.',
      'Bước 2: Chụp bằng webcam hoặc tải ảnh mặt trước và mặt sau của căn cước công dân. Hãy chụp rõ nét, đủ bốn góc.',
      'Bước 3: Hệ thống tự đọc thông tin trên thẻ. Bạn kiểm tra kỹ họ tên, số CCCD, ngày sinh và các trường khác, sửa nếu có sai.',
      'Bước 4: Gửi hồ sơ và chờ nhân viên duyệt. Nếu bị từ chối, bạn sẽ thấy lý do để chỉnh sửa và gửi lại.',
    ],
  },
  'account-security': {
    title: 'Hướng dẫn bảo mật tài khoản',
    summary:
      'Bật xác thực hai lớp và dùng Smart OTP để bảo vệ tài khoản ngoài mật khẩu.',
    steps: [
      'Vào Trang cá nhân, mục Bảo mật, chọn bật xác thực hai lớp.',
      'Quét mã QR bằng ứng dụng xác thực và nhập mã 6 số để kích hoạt.',
      'Lưu lại các mã dự phòng ở nơi an toàn.',
      'Giữ kín mã PIN Smart OTP và không chia sẻ mã xác thực với ai.',
    ],
    tip: 'Smart OTP khác với chữ ký VNPT SmartCA. Khi ký hợp đồng bạn duyệt trong ứng dụng VNPT SmartCA, không nhập PIN trên web.',
    stepTips: [
      'Bước 1: Vào Trang cá nhân, mở mục Bảo mật và chọn bật xác thực hai lớp.',
      'Bước 2: Quét mã QR bằng ứng dụng xác thực như Google Authenticator, rồi nhập mã sáu số hiện trong ứng dụng để kích hoạt.',
      'Bước 3: Hãy lưu lại các mã dự phòng ở nơi an toàn. Bạn sẽ cần chúng nếu mất điện thoại.',
      'Bước 4: Giữ kín mã PIN Smart OTP và không chia sẻ mã xác thực cho bất kỳ ai, kể cả người tự xưng là nhân viên.',
    ],
  },
  'smart-contract': {
    title: 'Hướng dẫn quy trình thuê nhà',
    summary:
      'Hợp đồng điện tử đi qua các bước: Hợp đồng, Ký số, Đặt cọc, Kích hoạt và Nhận nhà.',
    steps: [
      'Đọc nội dung hợp đồng ở bước Hợp đồng.',
      'Ký số bằng VNPT SmartCA, cả hai bên cùng ký.',
      'Đặt cọc sau khi ký.',
      'Hợp đồng được kích hoạt và hóa đơn tiền thuê được tạo.',
      'Hoàn tất nhận nhà nếu hợp đồng có quyết toán.',
    ],
    tip: 'Thứ tự là ký trước, cọc sau. Hợp đồng chỉ có hiệu lực khi đủ hai chữ ký và tiền cọc đã được xác nhận.',
    stepTips: [
      'Bước 1: Đọc kỹ nội dung hợp đồng gồm thời hạn, giá thuê, ngày thanh toán hằng tháng và điều khoản chậm thanh toán.',
      'Bước 2: Ký số bằng VNPT SmartCA. Cả chủ nhà và khách thuê đều cần ký và đã xác minh KYC.',
      'Bước 3: Sau khi ký, khách thuê thanh toán tiền cọc. Hợp đồng ở trạng thái chờ cọc cho đến khi tiền cọc được xác nhận.',
      'Bước 4: Khi đủ hai chữ ký và cọc đã xác nhận, hợp đồng được kích hoạt và hệ thống tạo lịch hóa đơn tiền thuê.',
      'Bước 5: Nếu hợp đồng có quyết toán nhận nhà, bạn thanh toán các khoản đến hạn rồi hai bên xác nhận bàn giao.',
    ],
  },
  'smartca-sign': {
    title: 'Hướng dẫn ký bằng VNPT SmartCA',
    summary:
      'Hợp đồng được ký điện tử bằng chứng thư số VNPT SmartCA. Bạn chỉ cần duyệt giao dịch trong ứng dụng VNPT SmartCA trên điện thoại.',
    steps: [
      'Hoàn tất xác minh KYC và cài ứng dụng VNPT SmartCA đã có chứng thư số.',
      'Trong trang hợp đồng, chuyển sang bước Ký số và nhấn Chuẩn bị ký VNPT SmartCA.',
      'Chọn đúng chứng thư số của bạn rồi nhấn Gửi yêu cầu ký VNPT SmartCA.',
      'Mở ứng dụng VNPT SmartCA, kiểm tra thông tin giao dịch và đồng ý ký trước khi hết thời gian đếm ngược.',
      'Khi hiện Đã ký, đợi bên còn lại ký rồi chuyển sang bước đặt cọc và kích hoạt hợp đồng.',
    ],
    tip: 'Trang web không bao giờ hỏi mật khẩu hay mã OTP SmartCA của bạn. Chỉ duyệt giao dịch khi chính bạn vừa gửi yêu cầu ký.',
    stepTips: [
      'Bước 1: Hãy chắc chắn tài khoản đã được duyệt KYC và bạn đã cài ứng dụng VNPT SmartCA có chứng thư số. Thiếu một trong hai thì hệ thống sẽ báo chưa thể ký.',
      'Bước 2: Ở bước Ký số của hợp đồng, nhấn nút Chuẩn bị ký VNPT SmartCA để hệ thống tải chứng thư số của bạn.',
      'Bước 3: Nếu bạn có nhiều chứng thư, chọn đúng chứng thư của mình rồi nhấn Gửi yêu cầu ký VNPT SmartCA.',
      'Bước 4: Mở ứng dụng VNPT SmartCA trên điện thoại, đọc lại thông tin giao dịch và đồng ý ký. Hãy làm trước khi đồng hồ đếm ngược kết thúc, nếu hết hạn bạn chỉ cần gửi yêu cầu ký lại.',
      'Bước 5: Khi thấy thông báo Đã ký, chữ ký của bạn đã được ghi nhận. Hợp đồng có hiệu lực khi cả hai bên cùng ký và tiền cọc đã được xác nhận.',
    ],
  },
  'ai-recommender': {
    title: 'Hướng dẫn gợi ý căn hộ',
    summary:
      'Bạn trả lời một khảo sát ngắn, hệ thống chấm điểm và đề xuất tối đa 5 căn hộ phù hợp.',
    steps: [
      'Ở trang chủ, mở mục Đề xuất cá nhân hoá và bắt đầu khảo sát.',
      'Điền tuổi, thu nhập, khu vực, số phòng ngủ và nhu cầu gym, chỗ để xe.',
      'Xem điểm phù hợp, mức tin cậy và lý do của từng căn.',
      'Đã đăng nhập thì có thể bấm thích hoặc không thích để cải thiện gợi ý.',
    ],
    tip: 'Căn hộ có giá thuê vượt quá một nửa thu nhập bạn khai sẽ không được đề xuất. Gợi ý chỉ dùng câu trả lời khảo sát.',
    stepTips: [
      'Bước 1: Ở trang chủ, tìm mục Đề xuất cá nhân hoá cho bạn và bấm làm khảo sát. Bạn không cần đăng nhập để nhận gợi ý.',
      'Bước 2: Điền tuổi, thu nhập hằng tháng, khu vực mong muốn, số phòng ngủ, và cho biết bạn có cần phòng gym hay chỗ để xe không.',
      'Bước 3: Xem danh sách tối đa năm căn hộ. Mỗi căn có điểm phù hợp, mức tin cậy cao, trung bình hoặc thấp, và các lý do chính.',
      'Bước 4: Nếu đã đăng nhập, bạn có thể bấm thích hoặc không thích để hệ thống học dần từ phản hồi.',
    ],
  },
  'payment-guide': {
    title: 'Hướng dẫn thanh toán cọc và tiền thuê',
    summary:
      'Tiền cọc và tiền thuê được chuyển cho chủ nhà. Nền tảng không giữ tiền và không có tài khoản giữ cọc trung gian.',
    steps: [
      'Ký hợp đồng trước, rồi vào bước Đặt cọc.',
      'Chọn phương thức thanh toán và quét mã QR trong vòng 15 phút.',
      'Tiền thuê hằng tháng đến hạn theo ngày đã ghi trong hợp đồng; hệ thống nhắc trước 7 ngày.',
      'Khi nhận nhà, thanh toán các khoản đến hạn trước ngày bắt đầu thuê.',
    ],
    tip: 'Chỉ thanh toán qua cổng của TH-PropTech. Không chuyển tiền ngoài nền tảng; nếu bị yêu cầu, hãy báo cáo vi phạm.',
    stepTips: [
      'Bước 1: Hoàn tất ký hợp đồng. Thứ tự là ký trước, cọc sau, nên sau khi đủ chữ ký bạn vào bước Đặt cọc.',
      'Bước 2: Chọn phương thức thanh toán và quét mã QR hoặc làm theo hướng dẫn trên màn hình. Mỗi lần thanh toán có thời hạn khoảng 15 phút, hết hạn bạn tạo lượt mới.',
      'Bước 3: Hóa đơn tiền thuê được tạo theo chu kỳ trong hợp đồng và đến hạn vào ngày thanh toán quy định. Hệ thống nhắc bạn trước hạn bảy ngày.',
      'Bước 4: Với hợp đồng có quyết toán nhận nhà, hãy thanh toán các khoản đến hạn, thường là ba ngày trước ngày bắt đầu thuê. Tiền thanh toán được xử lý an toàn qua cổng thanh toán liên kết của hệ thống.',
    ],
  },
  'blockchain-invoice': {
    title: 'Hướng dẫn xem hóa đơn và bằng chứng',
    summary:
      'Hóa đơn nằm ở tab Hóa đơn. Hợp đồng có thẻ bằng chứng với mã giao dịch lưu vết và nút đối soát nội dung.',
    steps: [
      'Vào Trang cá nhân, tab Hóa đơn để xem hạn thanh toán, số tiền và trạng thái.',
      'Mở hợp đồng, bước Kích hoạt, để xem mã giao dịch lưu vết và các sự kiện.',
      'Nhấn Đối soát toàn vẹn nội dung hợp đồng để kiểm tra nội dung khớp bản đã ký.',
      'Cần lưu trữ thì tải gói bằng chứng.',
    ],
    tip: 'Sổ cái chỉ ghi mã băm và mã định danh. Số tiền và thông tin cá nhân không được ghi lên sổ cái, và bạn không phải nhập mã giao dịch ở đâu cả.',
    stepTips: [
      'Bước 1: Vào Trang cá nhân và mở tab Hóa đơn để xem hạn thanh toán, số tiền và trạng thái từng hóa đơn.',
      'Bước 2: Mở hợp đồng, đến bước Kích hoạt. Thẻ bằng chứng hiển thị mã giao dịch lưu vết với nút sao chép, cùng dòng thời gian các sự kiện.',
      'Bước 3: Nhấn Đối soát toàn vẹn nội dung hợp đồng để kiểm tra nội dung hiện tại có khớp với bản đã ký hay không.',
      'Bước 4: Nếu cần lưu trữ hoặc gửi cho bên thứ ba, hãy tải gói bằng chứng về máy.',
    ],
  },
  'vr-guide': {
    title: 'Hướng dẫn xem ảnh 360 độ',
    summary:
      'Nếu chủ nhà đã tải ảnh 360 độ, bạn có thể nhìn quanh từng phòng ngay trên trang chi tiết căn hộ.',
    steps: [
      'Mở trang chi tiết căn hộ và nhấn Trải nghiệm 360 độ VR Tour.',
      'Nhấn giữ chuột và kéo, hoặc vuốt màn hình để nhìn quanh.',
      'Nhấn vào các điểm Đi tới để sang phòng khác.',
      'Dùng nút tự xoay và nút Toàn màn hình để xem rộng hơn.',
    ],
    tip: 'Ảnh 360 độ có dung lượng lớn, hãy xem khi có Wi-Fi hoặc 4G ổn định để ảnh tải nhanh và rõ nét.',
    stepTips: [
      'Bước 1: Mở trang chi tiết căn hộ và nhấn nút Trải nghiệm 360 độ VR Tour. Căn hộ chưa có ảnh 360 độ sẽ không có nút này.',
      'Bước 2: Nhấn giữ chuột và kéo, hoặc vuốt trên màn hình cảm ứng để xoay góc nhìn.',
      'Bước 3: Nhấn vào các điểm Đi tới, ví dụ Đi tới Phòng bếp, để chuyển sang phòng khác.',
      'Bước 4: Bật hoặc tắt chế độ tự xoay, và nhấn Toàn màn hình để xem rộng hơn.',
    ],
  },
  'floorplan-3d': {
    title: 'Hướng dẫn xem sơ đồ 3D',
    summary:
      'Sơ đồ 3D dựng từ thông tin tin đăng: bạn nhìn khu đô thị từ trên cao, thấy căn đang xem sáng lên rồi bấm vào để đi bộ trong căn hộ.',
    steps: [
      'Ở trang chi tiết căn hộ, nhấn Xem sơ đồ 3D minh hoạ. Căn bạn xem là cửa sổ sáng màu cam trên tòa nhà xanh.',
      'Kéo để di chuyển và xoay, lăn chuột hoặc dùng hai ngón để phóng to. Dùng nút mặt trời hoặc mặt trăng để đổi ngày đêm.',
      'Nhấn vào cửa sổ đang sáng để camera bay tới và vào bên trong căn hộ.',
      'Chọn chế độ Đi vào để đi bộ: phím W A S D trên máy tính, hoặc cần điều khiển và các nút bên phải trên điện thoại.',
      'Nhấn Sa bàn ở góc trên bên trái để quay lại khu đô thị.',
    ],
    tip: 'Bố cục 3D chỉ mang tính minh hoạ và có thể khác hiện trạng thực tế. Hãy đi xem nhà trước khi quyết định.',
    stepTips: [
      'Bước 1: Ở trang chi tiết căn hộ, nhấn nút Xem sơ đồ 3D minh hoạ. Bạn sẽ thấy khu đô thị từ trên cao, căn đang xem là cửa sổ sáng màu cam.',
      'Bước 2: Kéo chuột hoặc một ngón tay để di chuyển, lăn chuột hoặc dùng hai ngón để phóng to. Nút mặt trời hoặc mặt trăng đổi giữa ban ngày và ban đêm.',
      'Bước 3: Nhấn vào cửa sổ đang sáng. Camera sẽ bay tới sát cửa sổ rồi đưa bạn vào bên trong căn hộ.',
      'Bước 4: Chọn chế độ Đi vào. Trên máy tính dùng phím W A S D hoặc mũi tên, giữ Shift để chạy. Trên điện thoại dùng cần điều khiển bên trái, nút quay và nút chạy bên phải, kéo màn hình để nhìn quanh.',
      'Bước 5: Nhấn nút Sa bàn ở góc trên bên trái để trở về khu đô thị và xem căn khác.',
    ],
  },
  'policy-report': {
    title: 'Hướng dẫn báo cáo tin đăng vi phạm',
    summary:
      'Gặp tin đăng giả, thông tin sai hoặc bị yêu cầu chuyển tiền ngoài hệ thống, hãy báo cáo để nhân viên xem xét.',
    steps: [
      'Ở trang chi tiết căn hộ, nhấn Báo cáo vi phạm.',
      'Chọn loại vi phạm phù hợp và mô tả ngắn gọn.',
      'Theo dõi kết quả ở Trang cá nhân, mục Báo cáo an toàn.',
      'Không đồng ý kết quả thì có thể khiếu nại.',
    ],
    tip: 'Không bao giờ chuyển tiền cọc hoặc tiền thuê ngoài nền tảng, kể cả khi chủ nhà hứa giảm giá.',
    stepTips: [
      'Bước 1: Ở trang chi tiết căn hộ, nhấn nút Báo cáo vi phạm.',
      'Bước 2: Chọn loại vi phạm, ví dụ tin đăng ảo hoặc thông tin sai sự thật, hay yêu cầu chuyển tiền ngoài hệ thống, rồi mô tả ngắn gọn và gửi báo cáo.',
      'Bước 3: Nhân viên sẽ xem xét. Bạn theo dõi trạng thái ở Trang cá nhân, mục Báo cáo an toàn. Với trường hợp nghiêm trọng, tin đăng có thể bị ẩn.',
      'Bước 4: Nếu không đồng ý với kết quả, bạn có thể khiếu nại sau khi báo cáo được xử lý hoặc bác bỏ.',
    ],
  },
  'policy-privacy': {
    title: 'Hướng dẫn về bảo mật dữ liệu',
    summary:
      'Mật khẩu được băm, ảnh CCCD được mã hóa khi lưu, và sổ cái chỉ ghi mã băm chứ không ghi thông tin cá nhân.',
    steps: [
      'Bật xác thực hai lớp để bảo vệ tài khoản.',
      'Biết rằng ảnh CCCD được gửi tới dịch vụ nhận dạng của bên thứ ba để đọc thông tin.',
      'Gửi yêu cầu qua Hỗ trợ kỹ thuật nếu muốn xem, sửa hoặc xóa dữ liệu.',
    ],
    tip: 'Không chia sẻ mã OTP với bất kỳ ai. Hiện chưa có chức năng tự xuất hoặc tự xóa dữ liệu cá nhân.',
    stepTips: [
      'Bước 1: Bật xác thực hai lớp trong mục Bảo mật của Trang cá nhân để bảo vệ tài khoản tốt hơn.',
      'Bước 2: Khi xác minh KYC, ảnh CCCD được mã hóa khi lưu trữ, nhưng để đọc thông tin trên thẻ, ảnh được gửi tới dịch vụ nhận dạng của bên thứ ba.',
      'Bước 3: Muốn xem, chỉnh sửa hoặc xóa dữ liệu cá nhân, hãy gửi yêu cầu qua mục Hỗ trợ kỹ thuật trong Trang cá nhân.',
    ],
  },
  'policy-fees': {
    title: 'Hướng dẫn về biểu phí dịch vụ',
    summary:
      'Đăng tin không thu phí. Phí khi cho thuê thành công được xuất thành hóa đơn riêng.',
    steps: [
      'Đăng tin không thu phí.',
      'Chủ nhà trả phí theo thời hạn hợp đồng khi cho thuê thành công.',
      'Khách thuê trả phí dịch vụ cùng các khoản đến hạn khi nhận nhà.',
      'Đối chiếu số tiền chính thức trên hóa đơn của bạn.',
    ],
    tip: 'Phí không trừ vào tiền cọc hay tiền thuê chuyển cho chủ nhà. Số liệu biểu phí có thể được cập nhật, hãy xem hóa đơn thực tế.',
    stepTips: [
      'Bước 1: Đăng tin cho thuê không thu phí.',
      'Bước 2: Chủ nhà trả phí khi cho thuê thành công, tính theo thời hạn hợp đồng. Theo biểu phí mặc định, hợp đồng ba đến sáu tháng là nửa tháng tiền thuê, mười hai đến hai mươi bốn tháng là một tháng tiền thuê.',
      'Bước 3: Khách thuê trả phí dịch vụ theo biểu phí mặc định là hai phần trăm tiền thuê một tháng, thấp nhất một trăm nghìn và cao nhất năm trăm nghìn đồng, thu cùng các khoản đến hạn khi nhận nhà.',
      'Bước 4: Các khoản phí cộng thêm thuế giá trị gia tăng mười phần trăm. Hãy đối chiếu số tiền chính thức trên hóa đơn của bạn.',
    ],
  },
}
