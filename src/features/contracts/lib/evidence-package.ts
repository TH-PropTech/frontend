import { ApiClientError, readApiErrorCode } from '@/shared/api'

const SAFE_ID_CHARS = /[^A-Za-z0-9_-]+/g

/** Server filename when it is a usable name, otherwise a deterministic name from the contract id. */
export function resolveEvidencePackageFilename(
  serverFilename: string | null,
  contractId: string
): string {
  const name = serverFilename?.trim()
  if (name) return name.toLowerCase().endsWith('.zip') ? name : `${name}.zip`
  const safeId =
    contractId.replace(SAFE_ID_CHARS, '-').replace(/^-+|-+$/g, '') || 'contract'
  return `evidence-package-${safeId}.zip`
}

const CODE_MESSAGES: Record<string, string> = {
  EVIDENCE_PACKAGE_INCOMPLETE:
    'Bằng chứng của hợp đồng chưa đầy đủ nên chưa thể xuất gói. Hãy thử lại sau khi các bằng chứng bắt buộc được ghi nhận.',
  EVIDENCE_PACKAGE_TOO_LARGE:
    'Gói bằng chứng quá lớn để xuất trực tuyến. Hãy liên hệ nhân viên hỗ trợ.',
  EVIDENCE_ARTIFACT_MISMATCH:
    'Phát hiện sai lệch toàn vẹn ở tài liệu hợp đồng nên gói bị chặn. Hãy liên hệ nhân viên hỗ trợ.',
}

export function describeEvidencePackageError(error: unknown): string {
  if (error instanceof ApiClientError && error.status === 0) {
    return 'Không thể kết nối tới máy chủ. Hãy kiểm tra mạng và thử lại.'
  }
  if (error instanceof ApiClientError && error.status === 403) {
    return 'Bạn không có quyền xuất gói bằng chứng của hợp đồng này.'
  }
  if (error instanceof ApiClientError && error.status === 404) {
    return 'Không tìm thấy hợp đồng hoặc phiên bản cần xuất.'
  }
  const code = readApiErrorCode(error)
  return (
    (code ? CODE_MESSAGES[code] : undefined) ??
    'Không thể tải gói bằng chứng. Hãy thử lại sau.'
  )
}

/**
 * Hands the Blob to the browser through an object URL. The bytes are never read, parsed or
 * previewed client-side; the URL is revoked as soon as the download has been triggered.
 */
export function saveBlobAsFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.rel = 'noopener'
  anchor.style.display = 'none'
  document.body.appendChild(anchor)
  try {
    anchor.click()
  } catch (error) {
    URL.revokeObjectURL(url)
    throw error
  } finally {
    anchor.remove()
  }
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}
