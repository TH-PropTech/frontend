import type { SmartCaCertificate } from '../api/contracts-api'

/** Lấy CN từ chuỗi DN (`CN=Nguyen Van A, O=...`); không có thì trả chuỗi gốc. */
function commonName(subject: string): string {
  const match = /(?:^|,\s*)CN=([^,]+)/i.exec(subject)
  return (match?.[1] ?? subject).trim()
}

/**
 * Nhãn hiển thị cho một chứng thư trong danh sách chọn. Serial đầy đủ chỉ dùng làm
 * giá trị gửi backend; người dùng chỉ thấy tên chủ thể, 6 ký tự cuối và hạn dùng.
 */
export function formatSmartCaCertificateLabel(
  certificate: SmartCaCertificate
): string {
  const name = certificate.subject
    ? commonName(certificate.subject)
    : 'Chứng thư SmartCA'
  const tail = certificate.serialNumber.slice(-6)
  const expiry = certificate.validTo ? new Date(certificate.validTo) : null
  const expiryText =
    expiry && !Number.isNaN(expiry.getTime())
      ? ` · hết hạn ${expiry.toLocaleDateString('vi-VN')}`
      : ''
  return `${name} · …${tail}${expiryText}`
}
