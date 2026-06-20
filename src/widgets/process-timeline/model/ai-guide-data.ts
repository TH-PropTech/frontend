export interface AiGuide {
  title: string
  summary: string
  steps: string[]
  tip: string
  stepTips: string[]
}

export const AI_GUIDES: Record<string, AiGuide> = {
  'post-desktop': {
    title: 'Trợ lý Đăng tin Web (Máy tính)',
    summary:
      'Đăng tin trên máy tính giúp bạn dễ dàng tải lên các giấy tờ pháp lý và liên kết hình ảnh tham quan nhà 3D một cách trực quan, rõ nét nhất.',
    steps: [
      'Đăng nhập tài khoản của bạn (đảm bảo tài khoản đã hoàn thành xác thực định danh eKYC).',
      'Nhấn vào nút Đăng tin màu cam đất nổi bật ở góc phía trên bên phải màn hình.',
      'Khai báo đầy đủ thông số kỹ thuật căn hộ bao gồm: Hướng nhà, Hướng ban công, Tình trạng bàn giao nội thất, Thời gian dọn vào, Đơn giá điện và đơn giá nước.',
      'Tải lên ảnh chụp Sổ hồng pháp lý, dán đường link VR Tour 360 độ rồi gửi yêu cầu kiểm duyệt.',
    ],
    tip: 'Các căn hộ được Staff kiểm duyệt chuyển sang trạng thái available sẽ tự động được gán cờ xác thực isVerified thành true và hiển thị nhãn chứng nhận chính chủ để thu hút khách thuê.',
    stepTips: [
      'Bước 1: Đăng nhập tài khoản. Đảm bảo tài khoản của bạn đã hoàn thành eKYC thành công để bài đăng sau khi duyệt được gắn nhãn chính chủ.',
      'Bước 2: Di chuyển con trỏ chuột lên góc trên cùng bên phải màn hình và nhấn vào nút Đăng tin để mở biểu mẫu khai báo thông tin.',
      'Bước 3: Vui lòng điền chính xác giá thuê, tiền cọc, và các thông số chi tiết như hướng nhà, hướng ban công, tình trạng bàn giao nội thất, đơn giá điện nước.',
      'Bước 4: Nhấp vào ô tải tài liệu để chọn ảnh chụp Sổ hồng từ máy tính của bạn. Dán link VR Tour 360 độ (nếu có) rồi nhấn nút gửi duyệt.',
    ],
  },
  'post-mobile': {
    title: 'Trợ lý Đăng tin App (Điện thoại)',
    summary:
      'Đăng tin cho thuê nhà ngay trên điện thoại di động vô cùng tiện lợi nhờ khả năng chụp ảnh không gian phòng trực tiếp và tự động định vị địa chỉ.',
    steps: [
      'Mở ứng dụng trên điện thoại, nhấn vào biểu tượng Chủ nhà ở thanh menu dưới cùng.',
      'Nhấn chọn nút Đăng tin căn hộ mới và chọn Đồng ý cho phép ứng dụng truy cập Máy ảnh (Camera).',
      'Đi xung quanh nhà và chụp hình phòng khách, phòng ngủ, bếp. Bật định vị GPS để tự động lấy địa chỉ chính xác.',
      'Khai báo đầy đủ thông số kỹ thuật (Hướng nhà, Hướng ban công, điện nước) rồi nhấn nút Gửi kiểm duyệt.',
    ],
    tip: 'Bật định vị định vị GPS khi chụp ảnh giúp hệ thống tự điền địa chỉ chính xác, rút ngắn thời gian duyệt tin của nhân viên Staff.',
    stepTips: [
      'Bước 1: Trên điện thoại của bạn, mở ứng dụng TH-PropTech. Nhìn xuống thanh công cụ dưới cùng màn hình và nhấn vào biểu tượng có chữ Chủ nhà.',
      'Bước 2: Bấm vào nút Đăng tin căn hộ mới. Khi hệ điều hành hiển thị thông báo hỏi quyền truy cập Máy ảnh, hãy chọn Đồng ý.',
      'Bước 3: Hãy đứng ở các góc phòng để chụp được toàn cảnh rõ nét. Bật GPS trên điện thoại để hệ thống tự động điền vị trí căn hộ lên bản đồ.',
      'Bước 4: Nhập đầy đủ giá thuê, tiền cọc, thông số nội thất, đơn giá điện nước chi tiết rồi nhấn nút Gửi kiểm duyệt.',
    ],
  },
  'kyc-info': {
    title: 'Trợ lý Định danh eKYC (Xác thực tài khoản)',
    summary:
      'Xác thực định danh eKYC giúp bảo vệ bạn khỏi các tài khoản giả mạo, lừa đảo, đồng thời đủ điều kiện ký hợp đồng thuê nhà điện tử hợp pháp trên hệ thống.',
    steps: [
      'Đặt thẻ Căn cước công dân (CCCD) ngay ngắn trên mặt bàn và chụp rõ nét mặt trước, mặt sau.',
      'Kiểm tra lại kỹ các thông tin (Họ tên, Số CCCD, Ngày sinh) do OCR tự động trích xuất và hiển thị.',
      'Đưa camera trước lên trước mặt, thực hiện nháy mắt, mỉm cười và quay đầu chậm để quét sinh trắc học khuôn mặt.',
    ],
    tip: 'Mã hash của hồ sơ eKYC sau khi xác thực thành công sẽ được ghi nhận lên Blockchain Hyperledger Fabric để lưu vết bằng chứng xác minh bất biến.',
    stepTips: [
      'Bước 1: Hãy đặt thẻ CCCD của bạn trên một mặt phẳng đủ ánh sáng. Giữ chắc tay khi chụp, tránh để ánh đèn phản chiếu làm mờ các dòng chữ trên thẻ.',
      'Bước 2: Hệ thống tự động phân tích OCR dữ liệu trên thẻ và điền vào các ô. Bạn hãy đọc lại thật kỹ xem số CCCD, họ tên đã hoàn toàn chính xác chưa.',
      'Bước 3: Giữ điện thoại ngang tầm mắt, đưa khuôn mặt vào giữa khung tròn trên màn hình và làm theo hướng dẫn nháy mắt, mỉm cười hoặc quay đầu chậm.',
    ],
  },
  'fabric-ca-cert': {
    title: 'Trợ lý Chữ ký số VNPT SmartCA',
    summary:
      'Chữ ký số tích hợp qua VNPT SmartCA là danh tính điện tử duy nhất đại diện cho chữ ký tay của bạn trên môi trường mạng, giúp ký kết hợp đồng thuê nhà trực tuyến.',
    steps: [
      'Đảm bảo tài khoản đã hoàn thành xác thực định danh eKYC thành công.',
      'Liên kết trực tiếp dịch vụ chứng thư số cá nhân VNPT SmartCA hiển thị số seri chứng thư và thời hạn hiệu lực.',
      'Tạo mã PIN bảo mật gồm 6 số tự chọn để bảo vệ quyền ký kết của bạn.',
    ],
    tip: 'Mã PIN chữ ký số VNPT SmartCA có giá trị pháp lý tương đương chữ ký tay của bạn. Tuyệt đối không chia sẻ mã PIN này cho người khác.',
    stepTips: [
      'Bước 1: Để chữ ký số có giá trị pháp lý, tài khoản bắt buộc phải ở trạng thái Verified (hoàn thành eKYC thành công).',
      'Bước 2: Hệ thống tự động liên kết tài khoản của bạn với dịch vụ chứng thư số cá nhân VNPT SmartCA.',
      'Bước 3: Thiết lập mã PIN bảo mật gồm 6 chữ số để bảo vệ chữ ký số. Mã PIN này sẽ được yêu cầu mỗi khi bạn thực hiện ký số hợp đồng.',
    ],
  },
  'smart-contract': {
    title: 'Trợ lý Ký Hợp Đồng Điện Tử',
    summary:
      'Hợp đồng thuê nhà được quản lý bằng Blockchain giúp lưu trữ các điều khoản thuê vĩnh viễn, minh bạch và không một ai có thể tự ý sửa đổi sau khi đã ký kết.',
    steps: [
      'Chủ nhà soạn thảo bản thảo hợp đồng thuê (giá thuê, tiền cọc, ngày đóng tiền) gửi cho khách thuê.',
      'Khách thuê mở hợp đồng ra đọc kỹ, nếu đồng ý thì nhấn nút Ký và nhập mã PIN chữ ký số VNPT SmartCA.',
      'Hệ thống tính toán mã băm SHA-256 (contractHash) của hợp đồng và ghi nhận bất biến lên sổ cái Hyperledger Fabric.',
    ],
    tip: 'Hợp đồng đã ký số sẽ được lưu vết bất biến trên Blockchain làm bằng chứng pháp lý bảo vệ bạn nếu xảy ra tranh chấp sau này.',
    stepTips: [
      'Bước 1: Chủ nhà điền đầy đủ các thông tin thỏa thuận thuê nhà như giá tiền, ngày thanh toán, và các quy định của phòng trọ rồi bấm gửi bản thảo cho người thuê.',
      'Bước 2: Khách thuê mở ứng dụng đọc kỹ từng điều khoản hợp đồng. Nếu đồng ý, nhấn nút Ký hợp đồng và nhập mã PIN VNPT SmartCA để hoàn tất.',
      'Bước 3: Blockchain Hyperledger Fabric tự động lưu vết mã băm hợp đồng (contractHash) để đảm bảo không ai có thể đơn phương sửa đổi nội dung đã ký.',
    ],
  },
  'ai-recommender': {
    title: 'Trợ lý Gợi ý căn hộ bằng AI',
    summary:
      'Thuật toán Naïve Bayes sẽ tự động học hỏi từ sở thích và thông tin KYC của bạn để tính toán điểm số tương thích căn hộ.',
    steps: [
      'Cập nhật các thông tin mong muốn tại hồ sơ cá nhân (vị trí mong muốn, tầm giá thuê, số phòng ngủ).',
      'Tìm kiếm và tương tác lưu lại các tin đăng căn hộ phù hợp với nhu cầu sinh sống.',
      'Xem mục Gợi ý dành riêng cho bạn và kiểm tra tỷ lệ Match Score cụ thể theo 3 chiều: Vị trí, Tài chính, Tiện ích.',
    ],
    tip: 'Thuật toán Naïve Bayes phân tích các tiêu chí để tính toán điểm tương thích Match Score (%), giúp bạn nhanh chóng tìm được căn hộ phù hợp lâu dài.',
    stepTips: [
      'Bước 1: Cập nhật các thông tin mong muốn của bạn tại mục Hồ sơ cá nhân. Ví dụ: Bạn muốn thuê nhà ở Quận 9, tầm giá dưới 10 triệu đồng/tháng.',
      'Bước 2: Tìm kiếm và tương tác lưu lại (thả tim) các tin đăng căn hộ phù hợp với nhu cầu của bạn.',
      'Bước 3: Vào trang chủ, hệ thống sẽ đề xuất danh sách căn hộ kèm theo biểu đồ Match Score 3 chiều (Vị trí, Tài chính, Tiện ích) của Naïve Bayes.',
    ],
  },
  'payment-guide': {
    title: 'Trợ lý Thanh toán Hóa đơn tiền thuê',
    summary:
      'Các hóa đơn tiền thuê nhà định kỳ hàng tháng được quản lý tập trung và phân loại theo các trạng thái thanh toán rõ ràng.',
    steps: [
      'Kiểm tra danh sách hóa đơn và thời hạn đóng tiền định kỳ ghi nhận trên hợp đồng thuê.',
      'Xem trạng thái công nợ hiện tại của hóa đơn: Chưa thanh toán (unpaid), Đã thanh toán (paid), hoặc Quá hạn (overdue).',
      'Thực hiện thanh toán và cập nhật mã băm giao dịch (txHash) trực tiếp vào hóa đơn.',
    ],
    tip: 'Mã băm giao dịch txHash đóng vai trò như một biên lai điện tử vĩnh viễn ghi nhận việc nộp tiền nhà đúng hạn, không thể tẩy xóa.',
    stepTips: [
      'Bước 1: Hệ thống phát sinh hóa đơn tiền thuê định kỳ hàng tháng dựa trên ngày thanh toán quy định trong hợp đồng.',
      'Bước 2: Hãy kiểm tra trạng thái hóa đơn để tránh rơi vào trạng thái Quá hạn (overdue), dẫn đến phát sinh lãi phạt chậm thanh toán theo hợp đồng.',
      'Bước 3: Sau khi chuyển khoản thanh toán thành công, cập nhật mã băm giao dịch txHash vào hóa đơn để hệ thống lưu vết đối soát.',
    ],
  },
  'blockchain-invoice': {
    title: 'Trợ lý Tra cứu Lịch sử Hóa Đơn Blockchain',
    summary:
      'Mỗi lần hóa đơn được cập nhật trạng thái đã thanh toán kèm txHash, hệ thống sẽ tự động đồng bộ ghi nhật ký BlockchainLog lên sổ cái Hyperledger Fabric.',
    steps: [
      'Vào mục quản lý tài khoản cá nhân, chọn phần Lịch sử hóa đơn.',
      'Tìm hóa đơn bạn muốn kiểm tra và nhấn vào dòng mã băm (txHash) dài dưới hóa đơn.',
      'Xem thông tin chi tiết biên lai gồm thời gian nộp tiền và chữ ký xác nhận bất biến của ngân hàng lưu trữ trên Blockchain.',
    ],
    tip: 'Biên lai trên Blockchain có giá trị như một chứng cứ thanh toán vĩnh viễn, bảo vệ bạn khỏi các tranh chấp tài chính.',
    stepTips: [
      'Bước 1: Nhấp chọn mục Cá nhân, tìm đến dòng chữ Lịch sử hóa đơn. Tại đây hiển thị toàn bộ danh sách tiền nhà bạn đã đóng hàng tháng từ trước tới nay.',
      'Bước 2: Dưới mỗi hóa đơn đã thanh toán sẽ có dòng mã chữ và số dài (txHash). Hãy chạm vào dòng mã này để mở trang tra cứu sổ cái Blockchain.',
      'Bước 3: Màn hình sẽ hiện chi tiết: Ngày giờ chính xác bạn nạp tiền, số tiền, và xác nhận kỹ thuật của sổ cái Blockchain.',
    ],
  },
  'vr-guide': {
    title: 'Trợ lý Xem Nhà 3D (VR Tour)',
    summary:
      'Tính năng xem nhà 3D tích hợp WebGL cho phép bạn tham quan toàn diện mọi ngóc ngách của căn hộ thực tế mà không cần di chuyển trực tiếp.',
    steps: [
      'Kéo thả chuột hoặc dùng ngón tay vuốt màn hình để xoay camera 360 độ từ sàn nhà đến trần nhà.',
      'Nhấn vào các biểu tượng vòng tròn nhấp nháy trên nền nhà để di chuyển robot đi từ phòng này sang phòng khác.',
      'Chọn các điểm dịch chuyển nhanh (Podium, Sân thượng, Cầu đi bộ, Hồ bơi) trên bảng HUD điều khiển.',
    ],
    tip: 'Bật tính năng Thuyết minh giọng nói AI để nghe thuyết minh giới thiệu chi tiết về thông số kỹ thuật và hướng nhà trong quá trình tham quan.',
    stepTips: [
      'Bước 1: Khi mở màn hình VR Tour, bạn hãy chạm và vuốt màn hình để quay camera nhìn toàn diện căn phòng.',
      'Bước 2: Tìm những vòng tròn nhấp nháy (Hotspots) nằm dưới sàn nhà hoặc cạnh cửa ra vào. Chạm vào vòng tròn đó để robot di chuyển sang phòng bên cạnh.',
      'Bước 3: Sử dụng bảng điều khiển UI HUD (tour-hud) ở góc màn hình để di chuyển nhanh (teleport) đến các vị trí mong muốn hoặc ẩn hiện giao diện HUD.',
    ],
  },
  'policy-blacklist': {
    title: 'Trợ lý Báo cáo tin ảo và Blacklist',
    summary:
      'Để bảo vệ khách thuê khỏi các chiêu trò lừa đảo cọc hoặc đăng thông tin giá ảo, hệ thống áp dụng cơ chế xử phạt nghiêm khắc và đưa vào Blacklist.',
    steps: [
      'Nếu phát hiện tin đăng ghi giá sai sự thật hoặc địa chỉ giả, hãy nhấn nút Báo cáo vi phạm ở góc bài đăng.',
      'Staff sẽ xác minh thực tế, nếu chủ nhà vi phạm sẽ bị tạm ẩn tin đăng sang trạng thái unavailable hoặc updating và khóa quyền đăng tin trong 30 ngày.',
      'Trường hợp gian lận chiếm đoạt tiền cọc sẽ bị đưa vào danh sách đen Blacklist của Blockchain và tước quyền sử dụng vĩnh viễn.',
    ],
    tip: 'Hãy tích cực báo cáo nếu thấy dấu hiệu nghi ngờ để cùng nhau xây dựng môi trường thuê nhà an toàn, lành mạnh cho cộng đồng.',
    stepTips: [
      'Bước 1: Khi lướt xem tin, nếu bạn thấy hình ảnh không đúng thực tế hoặc giá thuê ghi quá rẻ so với thị trường, hãy nhấn nút Báo cáo vi phạm.',
      'Bước 2: Staff sẽ kiểm tra lại ngay lập tức. Nếu chủ nhà đăng tin giả mạo để câu khách, tài khoản đó sẽ bị ẩn bài viết và khóa đăng tin 30 ngày.',
      'Bước 3: Hành vi lừa đảo cọc sẽ bị lưu vết vĩnh viễn vào danh sách đen Blacklist trên Blockchain, không thể tẩy xóa, giúp nhận diện danh tính kẻ gian lận.',
    ],
  },
  'policy-privacy': {
    title: 'Trợ lý Quyền riêng tư và Bảo mật',
    summary:
      'Quy chế bảo vệ thông tin cá nhân của người dùng. Mọi hình ảnh giấy tờ tùy thân của bạn đều được mã hóa bảo mật.',
    steps: [
      'Ảnh chụp CCCD và dữ liệu quét khuôn mặt được mã hóa AES-256 tự động trước khi lưu trữ vào cơ sở dữ liệu MongoDB.',
      'Thông tin cá nhân chỉ được sử dụng cho việc xác minh tài khoản và ký kết hợp đồng thuê nhà của chính bạn.',
      'Bạn có toàn quyền yêu cầu trích xuất dữ liệu cá nhân hoặc yêu cầu xóa vĩnh viễn tài khoản bất cứ lúc nào.',
    ],
    tip: 'Hệ thống cam kết bảo vệ dữ liệu cá nhân đầu cuối, không chia sẻ số điện thoại, thông tin định danh của bạn cho bất kỳ bên thứ ba nào.',
    stepTips: [
      'Bước 1: Khi bạn gửi ảnh chụp giấy tờ xác thực tài khoản, hệ thống sẽ tự động mã hóa AES-256 phức tạp để không ai có thể xem trộm được.',
      'Bước 2: Hệ thống chỉ dùng thông tin này để đối chiếu xác minh tài khoản, đảm bảo an toàn giao dịch pháp lý cho hợp đồng thuê.',
      'Bước 3: Nếu không còn nhu cầu dùng ứng dụng, bạn có thể gửi yêu cầu xóa tài khoản để hệ thống xóa bỏ vĩnh viễn mọi dữ liệu giấy tờ liên quan.',
    ],
  },
}
