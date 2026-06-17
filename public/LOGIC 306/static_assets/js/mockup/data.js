export const dataLocation = {
  default: {
    id: 'default',
    title: 'Không xác định',
    isHighlight: false,
    rotation: { x: 0, y: 0, z: 0 },
    description: 'Thông tin đang được cập nhật...',
    assets: {
      audios: {
        background: './static_assets/audio/background.mp3',
        description: './static_assets/audio/description.mp3',
      },
      images: {
        type: 'IMAGE_360',
        preview: './static_assets/img/360/Cs1-Sky-1224.jpg',
        highQuality: './static_assets/img/360/Cs1-Sky-1224.jpg',
      },
    },
    spots: [],
  },
  'Cs1-Sky-1224': {
    id: 'Cs1-Sky-1224',
    title: 'Trụ sở chính',
    isHighlight: true,
    rotation: { x: -0.7160000000000002, y: 1.5120000000000005, z: 0 },
    description:
      'Trường có trụ sở chính tại số 12 Nguyễn Văn Bảo, phường 1 quận Gò Vấp, Tp.HCM  là nơi phục vụ cho việc học tập và nghiên cứu của giảng viên, sinh viên tất cả các khoa gồm nhiều khu vực chức năng như các phòng học lý thuyết hiện đại, thư viện rộng lớn, khu vực thực hành với các phòng lab được trang bị đầy đủ thiết bị, khu vực thể thao và khuôn viên xanh mát. Ngoài ra, còn có các khu vực giải trí và căn tin phục vụ nhu cầu ăn uống của sinh viên.',
    assets: {
      audios: {
        background: './static_assets/audio/background.mp3',
        description: './static_assets/audio/cs1-sky-test.mp3',
      },
      images: {
        type: 'IMAGE_360',
        preview: './static_assets/img/360/Cs1-Sky-1224.jpg',
        highQuality: './static_assets/img/360/Cs1-Sky-1224.jpg',
      },
    },
    spots: [
      {
        id: 'Cs1-HallE-1224',
        type: 'goAHead',
        title: 'Nhà hiệu bộ',
        position: { x: -5.632, y: -9.5, z: -0.049 },
        rotation: { x: -90, y: 90, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
      // {
      // 	id: "Cs1-KTX-1224",
      // 	type: "highLight",
      // 	title: "KÝ TÚC XÁ",
      // 	position: { x: -0.8, y: -3, z: -8.8 },
      // 	rotation: { x: 0, y: 0, z: 0 },
      // 	scale: { x: 1, y: 1, z: 1 },
      // },
      {
        id: 'Cs1-HallH-1224',
        type: 'markPoint',
        title: 'Phòng truyền thống',
        position: { x: -3.7, y: -7, z: 3.4 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
      {
        id: 'Cs1-HallE4-1224',
        type: 'markPoint',
        title: 'Hội trường E4',
        position: { x: -3.57, y: -3.47, z: 0 },
        rotation: { x: -44, y: 90, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
      {
        id: 'Cs1-HallLibrary-1224',
        type: 'markPoint',
        title: 'Thư viện',
        position: { x: -0.02, y: -3.47, z: 1.743 },
        rotation: { x: -63.3, y: 179.1, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
      {
        id: 'Cs1-PracticeRoomSmartGrid-1224',
        type: 'markPoint',
        title: 'Phòng thực hành Smart Grid',
        position: { x: -4.49, y: -2.2, z: 0.184 },
        rotation: { x: -26, y: 92.34, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
      {
        id: 'Cs1-EngineRoom40-1224',
        type: 'markPoint',
        title: 'Phòng nhà máy 4.0',
        position: { x: -4.38, y: -3.63, z: -1.627 },
        rotation: { x: -65.86, y: 47.75, z: 58.81 },
        scale: { x: 1, y: 1, z: 1 },
      },
      {
        id: 'Cs1-PracticeRoomBanking-1224',
        type: 'markPoint',
        title: 'Phòng mô phỏng Ngân hàng',
        position: { x: -4.95, y: -2.89, z: -2.439 },
        rotation: { x: -27.6, y: 63.79, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
      {
        id: 'Cs1-PracticeRoomAccounting-1224',
        type: 'markPoint',
        title: 'Phòng mô phỏng Kế toán',
        position: { x: -4.31, y: -3.1, z: -2.439 },
        rotation: { x: -33.4, y: 60.51, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
      {
        id: 'Cs1-IUHBar-0425',
        type: 'markPoint',
        title: 'IUH Bar',
        position: { x: -5, y: -0.8, z: 0.162 },
        rotation: { x: -26, y: 92.34, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
      {
        id: 'Cs1-TrainingRoom-0425',
        type: 'markPoint',
        title: 'Phòng đào tạo',
        position: { x: -5.36, y: -5.23, z: 2.432 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
      {
        id: 'Cs1-InternationalTrainingInstitute-0425',
        type: 'markPoint',
        title: 'Viện Đào tạo Quốc tế',
        position: { x: -4, y: -5.23, z: 2.432 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
      {
        id: 'Cs1-HallE-0425',
        type: 'markPoint',
        title: 'Sảnh nhà hiệu bộ',
        position: { x: -3.067, y: -3.853, z: -0.0 },
        rotation: { x: -51.478, y: 89.996, z: 0.0 },
        scale: { x: 1, y: 1, z: 1 },
      },
      {
        id: 'Cs1-E7-0425',
        type: 'markPoint',
        title: 'Hội trường A7',
        position: { x: -0.554, y: -3.177, z: 3.986 },
        rotation: { x: -141.451, y: 6.206, z: 175.076 },
        scale: { x: 1, y: 1, z: 1 },
      },
    ],
  },
  'Cs1-HallE-1224': {
    plugins: [
      {
        id: 'plugin-1',
        title: 'Plugin Point 1',
        preview: '#',
        data: {
          // images: [
          // 	"https://placehold.co/800x600?text=Ảnh+1 - Plugin",
          // 	"https://placehold.co/800x600?text=Ảnh+2 - Plugin",
          // 	"https://placehold.co/800x600?text=Ảnh+3 - Plugin",
          // 	"https://placehold.co/800x600?text=Ảnh+2",
          // 	"https://placehold.co/800x600?text=Ảnh+3",
          // ],
          video: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
          current: 0,
          title: 'P?????',
          description:
            'Phòng thí ngh???  bị đầy đủ thiết bị hiện đại, phục vụ nghiên cứu và giảng dạy các lĩnh vực hóa vô cơ, hữu cơ và vật liệu mới. Đây là nơi sinh viên trực tiếp thực hành, quan sát các phản ứng và khám phá ứng dụng công nghệ nano trong đời sống.',
        },
        constructor: 'GalleryPlugin',
        type: 'markPoint',
        position: { x: -3.067, y: -3.853, z: -0.0 },
        rotation: { x: -51.478, y: 89.996, z: 0.0 },
        scale: { x: 1, y: 1, z: 1 },
      },
    ],
    id: 'Cs1-HallE-1224',
    title: 'Nhà hiệu bộ',
    isHighlight: false,
    rotation: { x: 0.2520000000000004, y: 0.7800000000000005, z: 0 },
    description:
      'Nhà E là trung tâm hành chính của trường với phòng làm việc của Ban giám hiệu, phòng Tổ chức Hành chính, Phòng Tài chính kế toán, Phòng QL Khoa học và hợp tác quốc tế và các phòng họp, hội trường lớn. Phía trước Nhà hiệu bộ chính là sân chính của trường được bố trí cảnh quan hài hòa, không gian xanh thoáng mát, đây còn là nơi diễn ra đa dạng các sự kiện lớn nhỏ và các hoạt động tập thể ngoài giờ của sinh viên.',
    assets: {
      audios: {
        background: './static_assets/audio/background.mp3',
        description: './static_assets/audio/description.mp3',
      },
      images: {
        type: 'IMAGE_360',
        preview: './static_assets/img/360/Cs1-HallE-1224.jpg',
        highQuality: './static_assets/img/360/Cs1-HallE-1224.jpg',
      },
    },
    spots: [
      {
        id: 'Cs1-HallH-1224',
        type: 'goAHead',
        title: 'Phòng truyền thống',
        position: { x: -4.118, y: -1.075, z: 6.142 },
        rotation: { x: 80, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
      {
        id: 'Cs1-HallE-0425',
        type: 'goAHead',
        title: 'Sảnh nhà hiệu bộ',
        position: { x: 0.38, y: -2.254, z: -7.089 },
        rotation: { x: -80.0, y: 0, z: 45.0 },
        scale: { x: 1, y: 1, z: 1 },
      },
    ],
  },
  'Cs1-HallHDisplay-1224': {
    id: 'Cs1-HallHDisplay-1224',
    title: 'Khu thành tích',
    isHighlight: false,
    rotation: { x: 0, y: 0, z: 0 },
    description:
      'Đây là khu vực trưng bày những thành tích, thành tựu tiêu biểu của Nhà trường trong suốt quá trình hình thành và phát triển.',
    assets: {
      audios: {
        background: './static_assets/audio/background.mp3',
        description: './static_assets/audio/description.mp3',
      },
      images: {
        type: 'IMAGE_360',
        preview: './static_assets/img/360/Cs1-HallHDisplay-1224.jpg',
        highQuality: './static_assets/img/360/Cs1-HallHDisplay-1224.jpg',
      },
    },
    spots: [
      {
        id: 'Cs1-HallLibrary-1224',
        type: 'goAHead',
        title: 'Thư viện',
        position: { x: -7.573, y: -2.1, z: -3.853 },
        rotation: { x: 80, y: -80, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
      {
        id: 'Cs1-HallH-1224',
        type: 'goAHead',
        title: 'Phòng truyền thống',
        position: { x: 4.961, y: -2.055, z: -3.843 },
        rotation: { x: 90, y: 90, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
    ],
  },
  'Cs1-HallH-1224': {
    id: 'Cs1-HallH-1224',
    title: 'Phòng truyền thống',
    isHighlight: false,
    rotation: { x: 0, y: 0, z: 0 },
    description:
      'Nằm ở tiền sảnh nhà H, trong khuôn khổ của trung tâm thư viện, Phòng truyền thống là nơi lưu giữ, tôn vinh và giới thiệu những hình ảnh, tư liệu, hiện vật mang giá trị truyền thống, phản ánh lịch sử xây dựng, hình thành và phát triển của Nhà trường; là không gian để bày tỏ lòng tri ân với thế hệ đi trước – những người có công đặt nền móng vững chắc cho sự ra đời và phát triển của Đại học Công nghiệp TP.HCM. Bên cạnh đó, không gian văn hóa Hồ Chí Minh là nơi trưng bày nhiều tư liệu về cuộc đời và sự nghiệp của Chủ tịch Hồ Chí Minh. Phòng Truyền thống IUH chia làm nhiều khu vực, bước vào cửa là hình ảnh chiếc trống đồng được đặt ở giữa, bên trong trưng bày theo các mảng nội dung chuyên đề như: Quá trình hình thành và phát triển nhà trường; hình ảnh của lãnh đạo trường qua các thời kỳ; hình ảnh các đồng chí lãnh đạo Đảng, Bộ đến thăm và làm việc tại trường; hoạt động biểu diễn văn hóa nghệ thuật; công tác nghiên cứu khoa học;... Đây là nơi mà giảng viên, sinh viên IUH cùng nhau nhìn lại quá trình hình thành và phát triển của trường với nhiều dấu ấn lịch sử quan trọng khiến cho mỗi người đều cảm thấy tự hào khi bước vào không gian này.',
    assets: {
      audios: {
        background: './static_assets/audio/background.mp3',
        description: './static_assets/audio/description.mp3',
      },
      images: {
        type: 'IMAGE_360',
        preview: './static_assets/img/360/Cs1-HallH-1224.jpg',
        highQuality: './static_assets/img/360/Cs1-HallH-1224.jpg',
      },
    },
    spots: [
      {
        id: 'Cs1-HallE-1224',
        type: 'goAHead',
        title: 'Nhà hiệu bộ',
        position: { x: -5.23, y: -2.281, z: -4.485 },
        rotation: { x: -80, y: 90, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
      {
        id: 'Cs1-HallHDisplay-1224',
        type: 'goAHead',
        title: 'Phòng thành tích',
        position: { x: -2.295, y: -2.39, z: -8.759 },
        rotation: { x: -90, y: -80, z: 20 },
        scale: { x: 1, y: 1, z: 1 },
      },
    ],
  },
  'Cs1-HallLibrary-1224': {
    id: 'Cs1-HallLibrary-1224',
    title: 'Thư viện',
    isHighlight: false,
    rotation: { x: 0, y: 0, z: 0 },
    description:
      'Nhằm hỗ trợ không gian để sinh viên có đầy đủ điều kiện tự học ngoài giờ lên lớp, Nhà trường cũng chú trọng đầu tư xây dựng khu vực tự học kết hợp với phòng máy tính tự tra cứu tại thư viện. Đặt ngay tại tầng trệt thư viện, đây là một không gian lý tưởng cho sinh viên IUH trong việc nghiên cứu và học tập độc lập. Nơi đây được trang bị đầy đủ các thiết bị như dàn máy vi tính chất lượng, bàn ghế hiện đại và các tài liệu tham khảo phong phú sẽ có thể đáp ứng tối đa nhu cầu của sinh viên, giúp sinh viên dễ dàng tiếp cận nguồn kiến thức cần thiết. Đặc biệt, không gian tại khu vực tự học được bảo đảm yên tĩnh và thoải mái, tạo điều kiện thuận lợi cho việc tập trung trong học tập. Sinh viên khi đến học tập tại đây cũng thường xuyên được hỗ trợ bởi đội ngũ nhân viên chuyên nghiệp, luôn có mặt để hướng dẫn và cung cấp thông tin hữu ích, giúp sinh viên hiểu rõ hơn về cách khai thác tài nguyên của thư viện trên máy tính để phục vụ cho việc tự học.',
    assets: {
      audios: {
        background: './static_assets/audio/background.mp3',
        description: './static_assets/audio/description.mp3',
      },
      images: {
        type: 'IMAGE_360',
        preview: './static_assets/img/360/Cs1-HallLibrary-1224.jpg',
        highQuality: './static_assets/img/360/Cs1-HallLibrary-1224.jpg',
      },
    },
    spots: [
      {
        id: 'Cs1-HallHDisplay-1224',
        type: 'goAHead',
        title: 'Phòng thành tích',
        position: { x: 6.335, y: -2.596, z: -7.239 },
        rotation: { x: -80.0, y: -50.0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
      {
        id: 'Cs1-HallE-1224',
        type: 'goAHead',
        title: 'Nhà hiệu bộ',
        position: { x: -0.521, y: -3.087, z: 7.265 },
        rotation: { x: 90, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
      {
        id: 'Cs1-BookWarehouse-0425',
        type: 'goAHead',
        title: 'Kho sách',
        position: { x: 2.022, y: -2.481, z: -9.116 },
        rotation: { x: -80.0, y: -30.0, z: -10.0 },
        scale: { x: 1, y: 1, z: 1 },
      },
    ],
  },
  'Cs1-HallE4-1224': {
    id: 'Cs1-HallE4-1224',
    title: 'Hội trường E4',
    isHighlight: false,
    rotation: { x: 0.02, y: 1.61, z: 0 },
    description:
      'Hội trường chính nằm tại lầu 4 tòa nhà E, là nơi tổ chức các sự kiện lớn như hội thảo, hội nghị, các hoạt động ngoại khóa, và nhiều hoạt động sinh viên khác. Với thiết kế hai tầng, tận dụng mọi khoảng trống có sức chứa hơn 500 người tham dự, giúp thầy cô và sinh viên có thể thoải mái di chuyển, tham dự sự kiện. Bên cạnh đó hội trường E4 được trang bị hệ thống âm thanh, ánh sáng đầy đủ, màn hình LED hiện đại, những hàng ghế chất lượng, êm ái và đảm bảo yêu cầu về Phòng cháy chữa cháy, thoát hiểm,... là một địa điểm lý tưởng để tổ chức các sự kiện lớn của Nhà trường.',
    assets: {
      audios: {
        background: './static_assets/audio/background.mp3',
        description: './static_assets/audio/description.mp3',
      },
      images: {
        type: 'IMAGE_360',
        preview: './static_assets/img/360/Cs1-HallE4-1224.jpg',
        highQuality: './static_assets/img/360/Cs1-HallE4-1224.jpg',
      },
    },
  },
  'Cs1-EngineRoom40-1224': {
    id: 'Cs1-EngineRoom40-1224',
    title: 'Phòng Nhà máy 4.0',
    isHighlight: false,
    rotation: { x: 0, y: 0, z: 0 },
    description:
      'Phòng máy 4.0 của khoa Công nghệ Cơ Khí được xem là một trong những phòng thực hành chế tạo cơ khí hiện đại nhất tại Việt Nam dành cho sinh viên. Phòng máy gồm các thiết bị công nghệ, 300 bảnphần mềm SolidEgd, 3D CAD,… hỗ trợ sinh viên tiến gần hơn với công nghệ trên thế giới, có thể thiết kế, mô phỏng, sản xuất công nghệ 4.0, trang bị nhiều kiến thức nhằm đáp ứng yêu cầu của nền kinh tế trên thị trường hiện nay. Với nhiều thiết bị hiện đại và thông minh thì tổng vốn đầu tư của dự án là hơn 4,6 triệu USD được triển khai trên cơ sở hợp tác giữa Nhà trường và Tập đoàn Siemens (Đức)',
    assets: {
      audios: {
        background: './static_assets/audio/background.mp3',
        description: './static_assets/audio/description.mp3',
      },
      images: {
        type: 'IMAGE_360',
        preview: './static_assets/img/360/Cs1-EngineRoom4.0-1224.jpg',
        highQuality: './static_assets/img/360/Cs1-EngineRoom4.0-1224.jpg',
      },
    },
  },

  'Cs1-PracticeRoomSmartGrid-1224': {
    id: 'Cs1-PracticeRoomSmartGrid-1224',
    title: 'Phòng thực hành Smart Grid',
    isHighlight: false,
    rotation: { x: 0, y: 0, z: 0 },
    description:
      'Nằm ở phòng V5.01, Phòng thí nghiệm trọng điểm Smart Grid do nhà trường đầu tư cung cấp phòng thí nghiệm hiện đại, tiếp cận các công nghệ kỹ thuật tiên tiến.Phòng thí nghiệm trọng điểm Smart Grid bao gồm 2 hệ thống chính: Hệ thống mô phỏng hệ thống điện theo thời gian thực (Opal RT): Thực hiện mô phỏng quá độ điện từ, mô phỏng quá độ điện cơ và để nghiên cứu các hiện tượng phức tạp liên quan đến sự tương tác giữa các hệ thống điều khiển, bảo vệ trong hệ thống điện…. Hệ thống Tủ trung hạ thế ABB: Được sử dụng rộng rãi trong các hệ thống phân phối trung thế, tòa nhà cao tầng và nhà máy công nghiệp. Đây là những thiết bị hiện đại, nhiều tính năng, đáp ứng các tiêu chuẩn nghiêm ngặt về an toàn, về độ tin cậy trong quá trình vận hành. Với 2 hệ thống này, phòng thí nghiệm sẽ nghiên cứu các hiện tượng phức tạp, liên quan đến hệ thống điều khiển, bảo vệ trong hệ thống lưới điện; đồng thời giúp sinh viên hiểu về các hệ thống phân phối trung thế, tòa nhà cao tầng và nhà máy công nghiệp. những thiết bị này rất hiện đại và nhiều tính năng, đáp ứng nghiêm ngặt các tiêu chuẩn về an toàn, độ tin cậy trong quá trình vận hành. ',
    assets: {
      audios: {
        background: './static_assets/audio/background.mp3',
        description: './static_assets/audio/description.mp3',
      },
      images: {
        type: 'IMAGE_360',
        preview: './static_assets/img/360/Cs1-PracticeRoomSmartGrid-1224.jpg',
        highQuality:
          './static_assets/img/360/Cs1-PracticeRoomSmartGrid-1224.jpg',
      },
    },
  },
  'Cs1-PracticeRoomBanking-1224': {
    id: 'Cs1-PracticeRoomBanking-1224',
    title: 'Phòng mô phỏng Ngân hàng',
    isHighlight: false,
    rotation: { x: -0.278, y: 1.68, z: 0 },
    description:
      'Phòng mô phỏng Ngân hàng (thuộc Viện Tài chính - Kế toán) của Nhà trường được xây dựng với mục tiêu tái hiện một môi trường làm việc thực tế của ngành ngân hàng, hỗ trợ sinh viên trong việc thực hành các nghiệp vụ ngân hàng và tài chính ngay tại trường, mô phỏng, kê khai quyết toán thuế trực tuyến với các thiết bị hiện đại, các phần mềm tiện ích, chương trình cập nhật liên tục giúp học viên trải nghiệm và phát triển công việc chuyên môn của mình.\nBên cạnh đó, tăng cường khả năng thực hành các nghiệp vụ thực tế, giúp sinh viên tự tin khi bước vào môi trường làm việc và là công cụ hỗ trợ giảng dạy hiệu quả, giúp truyền tải kiến thức lý thuyết kết hợp với thực hành.',
    assets: {
      audios: {
        background: './static_assets/audio/background.mp3',
        description: './static_assets/audio/description.mp3',
      },
      images: {
        type: 'IMAGE_360',
        preview: './static_assets/img/360/Cs1-PracticeRoomBanking-1224.jpg',
        highQuality: './static_assets/img/360/Cs1-PracticeRoomBanking-1224.jpg',
      },
    },
  },
  'Cs1-PracticeRoomAccounting-1224': {
    id: 'Cs1-PracticeRoomAccounting-1224',
    title: 'Phòng mô phỏng Kế toán',
    isHighlight: false,
    rotation: { x: 0.11, y: 3.296, z: 0 },
    description:
      'Nhằm đáp ứng nhu cầu đào tạo nguồn nhân lực Kế toán - Kiểm toán trong giai đoạn Cách mạng công nghiệp 4.0, Đại học Công nghiệp TP.HCM đã đầu tư nâng cấp Trung tâm mô phỏng Kế toán hiện đại bậc nhất cả nước. Trung tâm mô phỏng được cài đặt đầy đủ các phần mềm phù hợp cho nhiều loại hình doanh nghiệp khác nhau như: phần mềm kế toán MISA SME.NET 2019 Enterprise dành cho các doanh nghiệp vừa và nhỏ; phần mềm FAST Business Online là hệ hoạch định nguồn lực doanh nghiệp (Enterprise Resource Planning - ERP); phần mềm HTKK hỗ trợ khai báo thuế…. Đây là môi trường lý tưởng giúp sinh viên có thể rèn luyện kỹ năng thực tiễn, gắn liền với kiến thức lý thuyết đã học. Với không gian thiết kế mở, phòng thực hành bao gồm nhiều khu vực tiện ích như máy tính, bàn họp, và bàn lễ tân… tạo nên một không gian làm việc mô phỏng một cách chuyên nghiệp, hiện đại, mang phong cách của các doanh nghiệp quốc tế. ',
    assets: {
      audios: {
        background: './static_assets/audio/background.mp3',
        description: './static_assets/audio/description.mp3',
      },
      images: {
        type: 'IMAGE_360',
        preview: './static_assets/img/360/Cs1-PracticeRoomAccounting-1224.jpg',
        highQuality:
          './static_assets/img/360/Cs1-PracticeRoomAccounting-1224.jpg',
      },
    },
  },

  /*
   ** 360 images for 0425
   ** Cs1-BookWarehouse-0425: Kho sách
   ** Cs1-FinanceRoom-0425: Phòng tài chính
   ** Cs1-HallE-0425: Sảnh nhà hiệu bộ
   ** Cs1-InternationalTrainingInstitute-0425: Viện Đào tạo Quốc tế
   ** Cs1-IUHBar-0425: IUH Bar
   ** Cs1-TechicalDrawingRoom-0425: Phòng vẽ kỹ thuật
   ** Cs1-TrainingRoom-0425: Phong đào tạo
   ** Cs1-E7-0425: Hội trường A7
   **/
  'Cs1-BookWarehouse-0425': {
    id: 'Cs1-BookWarehouse-0425',
    title: 'Kho sách',
    isHighlight: false,
    rotation: { x: 0, y: 0, z: 0 },
    description:
      'Bên cạnh khu vực tự học - phòng máy, khu vực vẽ kỹ thuật và phòng học nhóm thì thư viện IUH còn hấp dẫn bạn đọc bởi nguồn tài nguyên sách khổng lồ. Với tổng số đầu ấn phẩm ấn tượng 38.913 tài liệu, kho sách được chia ra thành 4 lầu, mỗi lầu cung cấp những loại sách khác nhau thuận tiện cho việc tìm kiếm tài liệu nhanh chóng và dễ dàng. Tầng trệt là Kho sách Điện, Điện tử, Cơ khí, Nhiệt lạnh, Động lực, Xây dựng, May – thời trang, Môi trường, Sinh học – thực phẩm; lầu 2 là kho sách Công nghệ Thông tin, Hóa học, Pháp luật, Ngoại ngữ, Chính trị – Xã hội, Khoa học Tự nhiên, Khối ngành kinh tế, Văn học – nghệ thuật, Lịch sử – địa lý; lầu 3: Kho sách ngoại văn và lầu 4 là Kho luận văn, đồ án tốt nghiệp, tạp chí chuyên ngành. Giảng viên và sinh viên có thể tự vào kho tìm sách hoặc hỏi thủ thư để được giúp đỡ. Kho sách thư viện IUH cung cấp nguồn tài liệu phong phú phục vụ cho việc học tập, giảng dạy và nghiên cứu, đảm bảo mọi đối tượng (sinh viên, giảng viên, nghiên cứu sinh) đều có thể tiếp cận nguồn tài liệu.',
    assets: {
      audios: {
        background: './static_assets/audio/background.mp3',
        description: './static_assets/audio/description.mp3',
      },
      images: {
        type: 'IMAGE_360',
        preview: './static_assets/img/360/Cs1-BookWarehouse-0425.jpg',
        highQuality: './static_assets/img/360/Cs1-BookWarehouse-0425.jpg',
      },
    },
    spots: [
      {
        id: 'Cs1-HallLibrary-1224',
        type: 'goAHead',
        title: 'Thư viện',
        position: { x: 1.188, y: -2.5, z: -5.576 },
        rotation: { x: -88.0, y: 0, z: -48.0 },
        scale: { x: 1, y: 1, z: 1 },
      },
      {
        id: 'Cs1-TechnicalDrawingRoom-0425',
        type: 'goAHead',
        title: 'Phòng vẽ kỹ thuật',
        position: { x: -0.69, y: -2.064, z: -6.444 },
        rotation: { x: -90.0, y: 45.0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
    ],
  },

  'Cs1-FinanceRoom-0425': {
    id: 'Cs1-FinanceRoom-0425',
    title: 'Phòng Tài chính Kế toán',
    isHighlight: false,
    rotation: { x: 0.006, y: -1.57, z: 0 },
    description:
      'Phòng Tài chính – Kế toán là đơn vị chuyên trách về quản lý tài chính, kế toán và ngân sách của nhà trường. Phòng có nhiệm vụ tham mưu cho Ban Giám hiệu trong việc xây dựng kế hoạch tài chính, quản lý thu – chi, kiểm soát hoạt động mua sắm, sửa chữa và tổng hợp báo cáo tài chính định kỳ.​​',
    assets: {
      audios: {
        background: './static_assets/audio/background.mp3',
        description: './static_assets/audio/description.mp3',
      },
      images: {
        type: 'IMAGE_360',
        preview: './static_assets/img/360/Cs1-FinanceRoom-0425.jpg',
        highQuality: './static_assets/img/360/Cs1-FinanceRoom-0425.jpg',
      },
    },
  },

  'Cs1-HallE-0425': {
    id: 'Cs1-HallE-0425',
    title: 'Sảnh nhà hiệu bộ',
    isHighlight: false,
    rotation: { x: -0.044, y: 3.81, z: 0 },
    description: '​',
    assets: {
      audios: {
        background: './static_assets/audio/background.mp3',
        description: './static_assets/audio/description.mp3',
      },
      images: {
        type: 'IMAGE_360',
        preview: './static_assets/img/360/Cs1-HallE-0425.jpg',
        highQuality: './static_assets/img/360/Cs1-HallE-0425.jpg',
      },
    },
    spots: [
      {
        id: 'Cs1-HallE-1224',
        type: 'goAHead',
        title: 'Nhà hiệu bộ',
        position: { x: -5.352, y: -2.462, z: 0.115 },
        rotation: { x: 86, y: -87.0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
    ],
  },

  'Cs1-InternationalTrainingInstitute-0425': {
    id: 'Cs1-InternationalTrainingInstitute-0425',
    title: 'Viện Đào tạo Quốc tế và Sau đại học',
    isHighlight: false,
    rotation: { x: -0.074, y: 2.99, z: 0 },
    description:
      'Viện Đào tạo Quốc tế và Sau đại học phụ trách đào tạo các chương trình Thạc sĩ, Tiến sĩ và liên kết quốc tế. Ngoài ra, viện còn tổ chức các chương trình trao đổi, thực tập quốc tế giúp sinh viên tiếp cận môi trường học tập toàn cầu.',
    assets: {
      audios: {
        background: './static_assets/audio/background.mp3',
        description: './static_assets/audio/description.mp3',
      },
      images: {
        type: 'IMAGE_360',
        preview:
          './static_assets/img/360/Cs1-InternationalTrainingInstitute-0425.jpg',
        highQuality:
          './static_assets/img/360/Cs1-InternationalTrainingInstitute-0425.jpg',
      },
    },
    spots: [
      {
        id: 'Cs1-HallE-1224',
        type: 'goAHead',
        title: 'Nhà hiệu bộ',
        position: { x: 2.293, y: -3.171, z: -4.14 },
        rotation: { x: 86.0, y: 180, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
    ],
  },

  'Cs1-IUHBar-0425': {
    id: 'Cs1-IUHBar-0425',
    title: 'Quán bar IUH',
    isHighlight: false,
    rotation: { x: 0.19, y: 1.76, z: 0 },
    description:
      'IUH Bar là khu vực thực hành pha chế cocktail dành cho sinh viên, nâng cao nghiệp vụ chung về lĩnh vực nhà hàng khách sạn nhằm đáp ứng yêu cầu của doanh nghiệp trong ngành du lịch hiện nay.',
    assets: {
      audios: {
        background: './static_assets/audio/background.mp3',
        description: './static_assets/audio/description.mp3',
      },
      images: {
        type: 'IMAGE_360',
        preview: './static_assets/img/360/Cs1-IUHBar-0425.jpg',
        highQuality: './static_assets/img/360/Cs1-IUHBar-0425.jpg',
      },
    },
  },

  'Cs1-TechnicalDrawingRoom-0425': {
    id: 'Cs1-TechnicalDrawingRoom-0425',
    title: 'Phòng vẽ kỹ thuật',
    isHighlight: false,
    rotation: { x: 0, y: 0, z: 0 },
    description:
      'Khu vực học nhóm - vẽ kỹ thuật nằm tại tầng 1 của thư viện IUH, được thiết kế đặc biệt để phục vụ nhu cầu học tập và làm việc nhóm của sinh viên, đặc biệt là các bạn học các môn liên quan đến vẽ kỹ thuật và thiết kế. Khu vực này được trang bị đầy đủ các bàn ghế với kích thước lớn, phù hợp nhu cầu vẽ thiết kế của sinh viên. Ngoài ra, còn có các thiết bị khác cùng giảng viên trực để tư vấn cũng như hỗ trợ trong quá trình học tập và thiết kế của sinh viên, giúp sinh viên dễ dàng thực hiện các dự án và bài tập nhóm.',
    assets: {
      audios: {
        background: './static_assets/audio/background.mp3',
        description: './static_assets/audio/description.mp3',
      },
      images: {
        type: 'IMAGE_360',
        preview: './static_assets/img/360/Cs1-TechnicalDrawingRoom-0425.jpg',
        highQuality:
          './static_assets/img/360/Cs1-TechnicalDrawingRoom-0425.jpg',
      },
    },
    spots: [
      {
        id: 'Cs1-BookWarehouse-0425',
        type: 'goAHead',
        title: 'Kho sách',
        position: { x: 1.65, y: -4.296, z: -7.36 },
        rotation: { x: -90.0, y: -60.0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
    ],
  },

  'Cs1-TrainingRoom-0425': {
    id: 'Cs1-TrainingRoom-0425',
    title: 'Phòng đào tạo',
    isHighlight: false,
    rotation: { x: 0.032, y: 1.53, z: 0 },
    description:
      'Phòng Đào tạo là đơn vị chuyên trách quản lý và tổ chức các hoạt động đào tạo bậc đại học. Phòng đảm nhiệm xây dựng kế hoạch giảng dạy, tổ chức thi cử, quản lý chương trình đào tạo và hỗ trợ sinh viên trong quá trình học tập.',
    assets: {
      audios: {
        background: './static_assets/audio/background.mp3',
        description: './static_assets/audio/description.mp3',
      },
      images: {
        type: 'IMAGE_360',
        preview: './static_assets/img/360/Cs1-TrainingRoom-0425.jpg',
        highQuality: './static_assets/img/360/Cs1-TrainingRoom-0425.jpg',
      },
    },
    spots: [
      {
        id: 'Cs1-HallE-1224',
        type: 'goAHead',
        title: 'Nhà hiệu bộ',
        position: { x: -8.529, y: -3.338, z: 5.41 },
        rotation: { x: 80.0, y: -20.0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
    ],
  },

  'Cs1-E7-0425': {
    id: 'Cs1-E7-0425',
    title: 'Hội trường A7',
    isHighlight: false,
    rotation: { x: 0.068, y: 1.7, z: 0 },
    description:
      'Hội trường chính nằm tại lầu 7 tòa nhà A, là nơi tổ chức các sự kiện lớn như hội thảo, hội nghị, các hoạt động ngoại khóa, và nhiều hoạt động sinh viên khác, Hội trường A7 có sức chứa gần 450 người tham dự. Bên cạnh đó hội trường A7 được trang bị hệ thống âm thanh, ánh sáng đầy đủ, màn hình LED hiện đại, những hàng ghế chất lượng, êm ái và đảm bảo yêu cầu về Phòng cháy chữa cháy, thoát hiểm,... là một địa điểm lý tưởng để tổ chức các sự kiện của Nhà trường.',
    assets: {
      audios: {
        background: './static_assets/audio/background.mp3',
        description: './static_assets/audio/description.mp3',
      },
      images: {
        type: 'IMAGE_360',
        preview: './static_assets/img/360/Cs1-E7-0425.jpg',
        highQuality: './static_assets/img/360/Cs1-E7-0425.jpg',
      },
    },
  },

  'Cs2-Sky-1224': {
    id: 'Cs2-Sky-1224',
    title: 'Cơ sở Phạm Văn Chiêu',
    isHighlight: false,
    rotation: { x: -0.5760000000000004, y: -4.812000000000005, z: 0 },
    description:
      'Cơ sở Phạm Văn Chiêu, hay còn gọi là Nhà P - IUH, tọa lạc tại số 20, đường số 53, Phường 14, Quận Gò Vấp. Đây là nơi phục vụ học tập cho sinh viên các khoa Công nghệ Cơ khí, Công nghệ Động lực và môn Quốc phòng An ninh. Nhằm hỗ trợ tối đa việc giảng dạy và thực hành, cơ sở được chia thành nhiều khu vực, bao gồm các phòng học lý thuyết, khu tập bắn, các khu luyện tập, căn tin và các phòng nghỉ. Tại đây, sinh viên học Quốc phòng An ninh sẽ tham gia lịch học kéo dài trong vài tuần. Ngoài chức năng học tập cơ bản, cơ sở còn cung cấp các tiện ích như phòng nghỉ trưa cho sinh viên học Quốc phòng, cùng các phòng học được trang bị thiết bị hiện đại. ',
    assets: {
      audios: {
        background: './static_assets/audio/background.mp3',
        description: './static_assets/audio/description.mp3',
      },
      images: {
        type: 'IMAGE_360',
        preview: './static_assets/img/360/Cs2-Sky-1224.jpg',
        highQuality: './static_assets/img/360/Cs2-Sky-1224.jpg',
      },
    },
  },
  'Cs3-Sky-1224': {
    id: 'Cs3-Sky-1224',
    title: 'Cơ sở Nguyễn Văn Dung',
    isHighlight: false,
    rotation: { x: -0.4560000000000003, y: -4.437999999999961, z: 0 },
    description:
      'Cơ sở Nguyễn Văn Dung tại số 10 Nguyễn Văn Dung, Phường 6, Quận Gò Vấp, TP. Hồ Chí Minh.\nTại cơ sở này, Nhà trường thành lập các khu giảng đường khang trang, hiện đại, nhằm đáp ứng các hình thức giảng dạy mới của giảng viên, tạo ra một môi trường tốt nhất cho các bạn sinh viên học tập, phát triển các kỹ năng',
    assets: {
      audios: {
        background: './static_assets/audio/background.mp3',
        description: './static_assets/audio/description.mp3',
      },
      images: {
        type: 'IMAGE_360',
        preview: './static_assets/img/360/Cs3-Sky-1224.jpg',
        highQuality: './static_assets/img/360/Cs3-Sky-1224.jpg',
      },
    },
    spots: [
      {
        id: 'Cs3-HallN-0425',
        type: 'goAHead',
        title: 'Sảnh nhà N',
        position: { x: -6.188, y: -9.045, z: -0.443 },
        rotation: { x: 90, y: -70.0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
    ],
  },

  /*
   ** 360 images for 0425
   ** Cs3-Classroom-0425: Phòng học
   ** Cs3-HallN-0425: Sảnh nhà N
   */
  'Cs3-Classroom-0425': {
    id: 'Cs3-Classroom-0425',
    title: 'Phòng học',
    isHighlight: false,
    rotation: { x: -0.042, y: 1.61, z: 0 },
    description: '',
    assets: {
      audios: {
        background: './static_assets/audio/background.mp3',
        description: './static_assets/audio/description.mp3',
      },
      images: {
        type: 'IMAGE_360',
        preview: './static_assets/img/360/Cs3-Classroom-0425.jpg',
        highQuality: './static_assets/img/360/Cs3-Classroom-0425.jpg',
      },
    },
    spots: [
      {
        id: 'Cs3-HallN-0425',
        type: 'goAHead',
        title: 'Sảnh nhà N',
        position: { x: -0.118, y: -3.416, z: -6.82 },
        rotation: { x: -90.0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
    ],
  },
  'Cs3-HallN-0425': {
    id: 'Cs3-HallN-0425',
    title: 'Sảnh nhà N',
    isHighlight: false,
    rotation: { x: 0.252, y: -1.448, z: 0 },
    description: '',
    assets: {
      audios: {
        background: './static_assets/audio/background.mp3',
        description: './static_assets/audio/description.mp3',
      },
      images: {
        type: 'IMAGE_360',
        preview: './static_assets/img/360/Cs3-HallN-0425.jpg',
        highQuality: './static_assets/img/360/Cs3-HallN-0425.jpg',
      },
    },
    spots: [
      {
        id: 'Cs3-Classroom-0425',
        type: 'goAHead',
        title: 'Phòng học',
        position: { x: -4.927, y: -1.571, z: -2.955 },
        rotation: { x: -90.0, y: 45.0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
    ],
  },
}
