import type { SmartCaCertificate } from '../api/contracts-api'

/** VNPT service type of the certificate integrated with TH PropTech (the other kind is `SMARTCA`). */
const INTEGRATED_SERVICE_TYPE = 'ESEAL'

export const INTEGRATED_CERTIFICATE_REQUIRED_MESSAGE =
  'Hãy chọn chứng thư tích hợp (eSeal) của TH PropTech để ký.'

export function isIntegratedCertificate(
  certificate: SmartCaCertificate
): boolean {
  return certificate.serviceType?.toUpperCase() === INTEGRATED_SERVICE_TYPE
}

/** One certificate needs no choice; with several, the single integrated one is the right default. */
export function defaultCertificateSerial(
  certificates: SmartCaCertificate[]
): string {
  if (certificates.length === 1) return certificates[0]?.serialNumber ?? ''
  const integrated = certificates.filter(isIntegratedCertificate)
  return integrated.length === 1 ? (integrated[0]?.serialNumber ?? '') : ''
}

/** Set when the chosen certificate is an ordinary one although an integrated one is available. */
export function certificateChoiceProblem(
  certificates: SmartCaCertificate[] | null,
  serial: string
): string | null {
  if (!certificates || !serial) return null
  const chosen = certificates.find(item => item.serialNumber === serial)
  if (!chosen || isIntegratedCertificate(chosen)) return null
  return certificates.some(isIntegratedCertificate)
    ? INTEGRATED_CERTIFICATE_REQUIRED_MESSAGE
    : null
}

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
  // Two certificates of one person share a name, so the kind is what tells them apart.
  const kind = certificate.serviceType
    ? `${isIntegratedCertificate(certificate) ? 'Chứng thư tích hợp (eSeal)' : 'Chứng thư thường (SmartCA)'} · `
    : ''
  return `${kind}${name} · …${tail}${expiryText}`
}
