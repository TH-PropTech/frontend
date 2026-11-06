/** Khóa nguồn theo ngữ cảnh nghiệp vụ; nguồn nằm trong danh mục `legal-sources`. */
export const LEGAL_SOURCE_KEYS = {
  /** Đăng tin, yêu cầu thêm người ở: đăng ký tạm trú và Luật Cư trú. */
  residence: ['1.004194', 'residence-law-2020'],
  /** Biên bản bàn giao, bảng khấu trừ: giá điện cho người thuê nhà. */
  utilities: ['circular-16-2014-bct'],
} as const

/** Giải thích 8 m²/người: điều kiện thường trú, không phải điều kiện tạm trú. */
export const RESIDENCE_AREA_NOTE =
  'Mức 8 m² sàn mỗi người là điều kiện của đăng ký thường trú tại chỗ ở thuê, mượn (Điều 20 khoản 3 điểm b Luật Cư trú 2020). Thủ tục đăng ký tạm trú trên Cổng Dịch vụ công của Bộ Công an không có điều kiện diện tích tối thiểu. Số người ở tối đa do Chủ nhà đặt cho căn hộ; mức 8 m² chỉ để tham khảo.'
