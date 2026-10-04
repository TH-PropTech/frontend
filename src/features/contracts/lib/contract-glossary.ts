export interface GlossaryEntry {
  title: string
  body: string
}

/** Giải thích ngắn cho các thuật ngữ không thể bỏ khỏi giao diện hợp đồng. */
export const GLOSSARY = {
  contentHash: {
    title: 'Mã xác thực nội dung',
    body: 'Dãy ký tự được tạo ra từ toàn bộ nội dung hợp đồng, như dấu vân tay. Chỉ cần sửa một ký tự trong hợp đồng thì mã này sẽ khác, nên dùng để chứng minh nội dung chưa bị thay đổi.',
  },
  ledgerTrace: {
    title: 'Lưu vết chống sửa đổi',
    body: 'Mã xác thực và chữ ký của hợp đồng được ghi vào một hệ thống lưu trữ mà không ai (kể cả hai bên) sửa hoặc xóa được. Khi cần đối chiếu, hệ thống so lại với bản đã lưu.',
  },
  transactionId: {
    title: 'Mã giao dịch lưu vết',
    body: 'Số hiệu của lần ghi hợp đồng vào hệ thống lưu vết. Dùng để tra cứu hoặc cung cấp khi cần xác minh bản ghi.',
  },
  signatureCertificate: {
    title: 'Chứng thư số',
    body: 'Giấy xác nhận điện tử do nhà cung cấp (VNPT SmartCA) cấp, gắn chữ ký với đúng một người. Số hiệu chứng thư giúp tra cứu ai đã ký.',
  },
  signatureHash: {
    title: 'Mã xác thực chữ ký',
    body: 'Dãy ký tự đại diện cho chữ ký số của bên đã ký, dùng để đối chiếu chữ ký không bị thay thế.',
  },
  testMode: {
    title: 'Chế độ thử nghiệm',
    body: 'Hợp đồng đang chạy trong môi trường kiểm thử: việc lưu vết chỉ được mô phỏng, chưa ghi lên hệ thống thật.',
  },
} as const satisfies Record<string, GlossaryEntry>

export type GlossaryTerm = keyof typeof GLOSSARY
