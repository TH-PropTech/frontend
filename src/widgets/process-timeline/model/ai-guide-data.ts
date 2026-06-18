export interface AiGuide {
  title: string
  summary: string
  steps: string[]
  tip: string
  stepTips: string[]
}

export const AI_GUIDES: Record<string, AiGuide> = {
  'post-desktop': {
    title: 'Trợ lý Đăng tin Web',
    summary:
      'Đăng tin trên máy tính giúp tải lên các tài liệu pháp lý và liên kết VR Tour dễ dàng hơn.',
    steps: [
      'Đăng nhập tài khoản đã được xác thực KYC.',
      'Nhấp vào nút "Đăng tin" ở góc phải thanh Header.',
      'Điền thông tin căn hộ (giá, cọc, số phòng, diện tích).',
      'Tải lên Sổ hồng / Hợp đồng mua bán và đính kèm link VR Tour 3D.',
    ],
    tip: 'Tin đăng có đính kèm VR Tour 3D sẽ được hệ thống ưu tiên hiển thị và tiếp cận khách thuê tốt gấp 3 lần.',
    stepTips: [
      'Trước khi bắt đầu, bạn hãy đăng nhập vào tài khoản của mình. Đảm bảo tài khoản này đã hoàn thành xác thực thông tin cá nhân KYC để được hệ thống cấp quyền đăng tin chính chủ.',
      'Nhìn lên góc trên bên phải màn hình cạnh ảnh đại diện của bạn. Hãy nhấp vào nút Đăng tin màu cam nổi bật để hệ thống mở giao diện nhập thông tin căn hộ mới.',
      'Vui lòng điền chính xác số tiền cho thuê hàng tháng và số tiền đặt cọc. Thông tin giá cọc này sẽ được liên kết trực tiếp với tài khoản ký quỹ bảo chứng của ngân hàng.',
      'Kéo thả trực tiếp file ảnh chụp sổ hồng hoặc hợp đồng mua bán của căn hộ lên ô tải tài liệu, đồng thời dán đường dẫn liên kết VR Tour 3D mà bạn đã khởi tạo.',
    ],
  },
  'post-mobile': {
    title: 'Trợ lý Đăng tin App',
    summary:
      'Đăng tin ngay trên ứng dụng di động TH-PropTech vô cùng nhanh chóng.',
    steps: [
      'Mở app, chuyển sang tab "Chủ nhà" ở thanh điều hướng dưới.',
      'Nhấn chọn "Đăng tin căn hộ mới" và cấp quyền truy cập Camera.',
      'Chụp ảnh trực tiếp không gian căn hộ để ghi nhận vị trí thực tế.',
      'Nhập mô tả, giá cọc và gửi ban quản trị kiểm duyệt.',
    ],
    tip: 'Cho phép ứng dụng lấy metadata GPS khi chụp ảnh sẽ tăng độ uy tín và rút ngắn thời gian kiểm duyệt còn dưới 1 giờ.',
    stepTips: [
      'Mở ứng dụng TH-PropTech trên điện thoại di động của bạn, sau đó nhấp chọn vào tab dành cho Chủ nhà nằm ở góc phải phía dưới thanh điều hướng của màn hình.',
      'Nhấn vào nút tạo tin đăng mới. Lúc này hệ thống sẽ hiển thị yêu cầu, bạn cần bấm đồng ý cấp quyền truy cập Camera cho ứng dụng để thực hiện chụp ảnh trực tiếp.',
      'Di chuyển xung quanh căn nhà để chụp ảnh các phòng khách, phòng ngủ và bếp. Hãy giữ camera chắc tay để ảnh chụp rõ nét nhất, giúp ban quản trị duyệt tin nhanh hơn.',
      'Điền đầy đủ giá cho thuê, tiền cọc kèm theo mô tả ngắn về căn hộ. Bấm gửi tin đăng để hệ thống mã hóa dữ liệu và gửi lên ban quản trị tiến hành phê duyệt công khai.',
    ],
  },
  'kyc-info': {
    title: 'Trợ lý Định danh KYC',
    summary:
      'Xác thực danh tính giúp bảo vệ bạn trước các tin đăng ảo và đủ điều kiện thực hiện các giao dịch ký số.',
    steps: [
      'Chụp ảnh CCCD mặt trước và mặt sau rõ nét, không lóa sáng.',
      'Kiểm tra thông tin do AI OCR tự động trích xuất.',
      'Thực hiện quét sinh trắc khuôn mặt (Selfie camera động).',
    ],
    tip: 'Toàn bộ dữ liệu của bạn được mã hóa đầu cuối bằng chuẩn AES-256 cực kỳ bảo mật.',
    stepTips: [
      'Chuẩn bị thẻ CCCD chính chủ còn hạn sử dụng. Hãy đặt thẻ ngay ngắn trên mặt phẳng phẳng và chụp rõ nét cả hai mặt, tránh để ánh đèn phản chiếu trực tiếp làm mất chữ.',
      'Hệ thống AI OCR sẽ tự động đọc dữ liệu và điền vào các ô thông tin. Bạn hãy kiểm tra thật kỹ lại họ tên, số CCCD, ngày sinh xem có bị sai lệch ký tự nào hay không.',
      'Nhìn thẳng vào camera trước ở nơi có đủ ánh sáng tốt. Di chuyển đầu quay sang trái, sang phải và nháy mắt theo đúng chỉ dẫn hiển thị trên màn hình ứng dụng.',
    ],
  },
  'fabric-ca-cert': {
    title: 'Trợ lý Chứng chỉ Fabric CA',
    summary:
      'Kích hoạt cặp khóa mật mã chữ ký số X.509 để tự ký kết hợp đồng điện tử.',
    steps: [
      'Hoàn tất KYC định danh trước khi đăng ký chứng chỉ.',
      'Đăng ký tài khoản (Register & Enroll) lên Fabric CA.',
      'Thiết lập mã PIN bảo mật cho chữ ký số cá nhân.',
    ],
    tip: 'Khóa bí mật được lưu trữ an toàn trong Secure Storage trên thiết bị của bạn. Tuyệt đối không chia sẻ mã PIN cho người khác.',
    stepTips: [
      'Để đảm bảo tính pháp lý hợp pháp của chữ ký số, tài khoản của bạn bắt buộc phải hoàn thành việc xác thực danh tính KYC thành công trên hệ thống trước đó.',
      'Hệ thống sẽ kết nối đến dịch vụ Fabric Certificate Authority để tạo lập và gửi về cho thiết bị của bạn một cặp khóa mã hóa mật mã bảo mật riêng biệt duy nhất.',
      'Tạo một mã PIN bảo mật cá nhân gồm ít nhất 6 chữ số để bảo vệ chữ ký. Mã PIN này sẽ cần nhập mỗi khi ký hợp đồng thuê nhà, hãy ghi nhớ thật kỹ và bảo mật nó.',
    ],
  },
  'smart-contract': {
    title: 'Trợ lý Hợp đồng Thông minh',
    summary:
      'Hợp đồng thông minh giúp tự động hóa giao dịch thuê nhà trên blockchain Hyperledger Fabric.',
    steps: [
      'Chủ nhà soạn thảo các điều khoản thuê trên hệ thống.',
      'Khách thuê kiểm tra kỹ và thực hiện ký số bằng chứng chỉ Fabric CA.',
      'Techcombank nhận lệnh phong tỏa tiền đặt cọc ký quỹ tự động.',
    ],
    tip: 'Mọi điều khoản sau khi đã ký số sẽ không thể bị sửa đổi đơn phương bởi bất kỳ bên nào.',
    stepTips: [
      'Chủ nhà điền các thông tin thỏa thuận thuê nhà bao gồm thời hạn, giá thuê, tiền cọc và trách nhiệm hai bên, sau đó dùng chữ ký điện tử để ký xác nhận bản thảo.',
      'Khách thuê sẽ nhận được hợp đồng bản thảo gửi về tài khoản. Bạn cần kiểm tra kỹ toàn bộ các điều khoản thuê trước khi nhập mã PIN chữ ký số cá nhân để xác thực.',
      'Sau khi hai bên hoàn thành việc ký số, Techcombank sẽ ngay lập tức thực hiện khóa phong tỏa số tiền đặt cọc ký quỹ tự động trên hệ thống ngân hàng liên kết.',
    ],
  },
  'ai-recommender': {
    title: 'Trợ lý Gợi ý AI',
    summary:
      'AI sẽ đề xuất các căn hộ tối ưu nhất dựa trên thói quen và nhu cầu cụ thể của bạn.',
    steps: [
      'Điền đầy đủ thông tin sở thích trong trang cá nhân.',
      'Tìm kiếm và tương tác với các căn hộ (lượt xem, lưu tin).',
      'Xem danh sách gợi ý cá nhân hóa có Match Score cao nhất.',
    ],
    tip: 'Match Score càng cao thể hiện độ tương thích của căn hộ với lối sống của bạn càng lớn.',
    stepTips: [
      'Hãy cập nhật đầy đủ các tùy chọn sở thích của bạn tại trang thông tin cá nhân như khu vực sinh sống mong muốn, mức giá thuê phù hợp và các yêu cầu tiện ích đi kèm.',
      'Tích cực thực hiện các hành động tìm kiếm, bấm xem chi tiết các phòng và lưu lại những tin đăng bạn thích. Thuật toán AI sẽ tự động học hỏi từ các hành vi này.',
      'Xem điểm tương thích Match Score hiển thị ở mỗi bài đăng. Điểm số này càng cao biểu thị căn hộ đó càng đáp ứng sát nhất với nhu cầu thực tế của bạn.',
    ],
  },
  'payment-guide': {
    title: 'Trợ lý Ký quỹ Techcombank',
    summary:
      'Hướng dẫn chuyển tiền cọc ký quỹ an toàn thông qua tài khoản phong tỏa Techcombank.',
    steps: [
      'Nhận mã tài khoản ảo (Virtual Account) hoặc mã QR chuyển khoản.',
      'Thực hiện chuyển khoản chính xác số tiền thuê/cọc.',
      'Techcombank phản hồi giao dịch và tự động đồng bộ lên Fabric.',
    ],
    tip: 'Hệ thống không thu bất kỳ khoản phí gas hay phí dịch vụ trung gian nào. Tiền cọc được khóa bảo chứng an toàn.',
    stepTips: [
      'Hệ thống liên kết Techcombank sẽ cung cấp một mã tài khoản ảo giao dịch kèm mã QR thanh toán độc bản dành riêng cho giao dịch đặt cọc hợp đồng của bạn.',
      'Sử dụng ứng dụng Mobile Banking của ngân hàng bạn đang dùng để quét mã QR và tiến hành chuyển khoản chính xác số tiền đặt cọc được ghi nhận trong hợp đồng.',
      'Khi tiền chuyển thành công, Techcombank sẽ khóa số tiền đó và gửi thông báo xác nhận thanh toán tự động lên hệ thống blockchain để kích hoạt hợp đồng thuê.',
    ],
  },
  'blockchain-invoice': {
    title: 'Trợ lý Tra cứu Giao dịch',
    summary:
      'Truy vấn chi tiết lịch sử đóng tiền nhà trực tiếp trên sổ cái Hyperledger Fabric.',
    steps: [
      'Truy cập mục "Lịch sử hóa đơn" trong trang quản trị cá nhân.',
      'Nhấp vào mã giao dịch dạng mã băm (TxID) trên hóa đơn.',
      'Xem chi tiết thông tin thời gian, chữ ký số hai bên.',
    ],
    tip: 'Mã giao dịch TxID giúp chứng minh bạn đã hoàn tất đóng tiền nhà một cách bất biến, có giá trị pháp lý đầy đủ.',
    stepTips: [
      'Vào phần quản lý tài khoản cá nhân của bạn, tìm chọn mục Lịch sử hóa đơn. Nơi đây lưu trữ đầy đủ các hóa đơn thanh toán tiền thuê nhà hàng tháng của bạn.',
      'Mỗi hóa đơn thanh toán sẽ có một mã băm giao dịch TxID duy nhất đi kèm. Bạn hãy bấm vào mã băm đó để chuyển tiếp đến trang tra cứu blockchain explorer.',
      'Tại đây, bạn có thể kiểm tra chi tiết thời gian giao dịch, số tiền chuyển khoản cùng chữ ký điện tử xác nhận của cả khách thuê và chủ nhà.',
    ],
  },
  'vr-guide': {
    title: 'Trợ lý Trải nghiệm VR 3D',
    summary: 'Tham quan chi tiết căn hộ từ xa với góc nhìn 360 độ sinh động.',
    steps: [
      'Nhấp giữ chuột trái và di chuyển để xoay góc nhìn camera.',
      'Nhấp vào các Hotspots (vòng tròn nhấp nháy) để di chuyển giữa các phòng.',
      'Nhấp biểu tượng kính VR ở góc phải nếu có kính VR cá nhân.',
    ],
    tip: 'Trải nghiệm mượt mà nhất khi sử dụng mạng Wi-Fi tốc độ cao hoặc sóng 5G ổn định.',
    stepTips: [
      'Hãy nhấn giữ chuột trái và kéo rê chuột theo các hướng xung quanh màn hình để xoay camera xem toàn cảnh 360 độ từ trần nhà, sàn nhà tới các góc tường.',
      'Tìm và nhấp vào các điểm vòng tròn nhấp nháy trên sàn nhà (Hotspots) để chuyển góc nhìn tham quan sang các khu vực phòng khác như nhà bếp hay ban công.',
      'Nhấn vào biểu tượng kính VR ở góc phải màn hình, sau đó đặt điện thoại vào kính thực tế ảo cá nhân của bạn để trải nghiệm tham quan không gian nổi 3D chân thực.',
    ],
  },
  'policy-blacklist': {
    title: 'Trợ lý Quy chế Xử phạt',
    summary:
      'TH-PropTech áp dụng hình phạt nghiêm khắc với tin đăng ảo để bảo vệ người dùng.',
    steps: [
      'Báo cáo các tin đăng có mức giá ảo hoặc địa điểm sai lệch.',
      'Tài khoản đăng ảnh giả mạo sẽ bị tạm khóa quyền 30 ngày.',
      'Mưu toan gian lận cọc sẽ bị đưa vào danh sách đen (Blacklist) Fabric.',
    ],
    tip: 'Khi bị đưa vào Blacklist, chứng chỉ Fabric CA của tài khoản đó sẽ bị thu hồi vĩnh viễn.',
    stepTips: [
      'Nếu bạn phát hiện ra một bài đăng ghi sai lệch giá thực tế, sai vị trí hoặc ảnh chụp giả mạo, hãy bấm vào nút Báo cáo tin đăng để gửi thông tin phản hồi lên hệ thống.',
      'Các tài khoản chủ nhà có bài viết vi phạm đăng tin ảo hoặc ảnh sao chép mạng không đúng thực tế sẽ bị hệ thống tự động khóa quyền đăng tin trong vòng 30 ngày.',
      'Hành vi có ý gian lận chiếm đoạt tiền đặt cọc của khách thuê sẽ bị lưu trữ lịch sử vi phạm vĩnh viễn trên Blockchain và bị tước bỏ chứng chỉ chữ ký điện tử.',
    ],
  },
  'policy-privacy': {
    title: 'Trợ lý Bảo mật dữ liệu',
    summary:
      'Chính sách bảo vệ thông tin cá nhân của người dùng trên TH-PropTech.',
    steps: [
      'Mã hóa CCCD và sinh trắc học bằng chuẩn AES-256.',
      'Sử dụng dữ liệu đúng mục đích pháp lý của hợp đồng thuê.',
      'Bạn có quyền yêu cầu trích xuất hoặc xóa dữ liệu bất kỳ lúc nào.',
    ],
    tip: 'Dữ liệu cá nhân chỉ được sử dụng cho quy trình KYC và giao kết hợp đồng điện tử.',
    stepTips: [
      'Tất cả ảnh chụp giấy tờ cá nhân CCCD cùng ảnh quét sinh trắc học khuôn mặt đều được mã hóa tự động trước khi lưu trữ bằng thuật toán mã hóa tiêu chuẩn quân đội AES-256.',
      'Chúng tôi cam kết tuyệt đối bảo mật và chỉ sử dụng thông tin cá nhân của bạn cho mục đích hợp pháp duy nhất là xác minh định danh KYC và giao giao kết hợp đồng.',
      'Bạn hoàn toàn nắm quyền tự chủ thông tin cá nhân. Bạn có thể gửi yêu cầu xuất file báo cáo thông tin dữ liệu hoặc yêu cầu xóa vĩnh viễn tài khoản trong trang cá nhân.',
    ],
  },
}
