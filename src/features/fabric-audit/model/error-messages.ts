import { ApiClientError, readApiErrorCode } from '@/shared/api'

/** Thrown when a server response does not match the documented DTO (Zod rejected it). */
export class FabricAuditResponseError extends Error {
  constructor(readonly resource: string) {
    super(`FABRIC_AUDIT_RESPONSE_INVALID: ${resource}`)
    this.name = 'FabricAuditResponseError'
  }
}

/** Localized, user-facing text for the stable D9 error codes; backend text is never shown raw. */
const MESSAGES: Record<string, string> = {
  AUDIT_FILTER_INVALID: 'Bộ lọc không hợp lệ. Hãy kiểm tra khoảng thời gian.',
  AUDIT_EVENT_NOT_FOUND: 'Không tìm thấy sự kiện bằng chứng này.',
  GOVERNANCE_SNAPSHOT_INCOMPLETE:
    'Chưa đủ nguồn quản trị đang áp dụng để phát hành snapshot.',
  GOVERNANCE_SECRET_CLASSIFIED:
    'Nguồn quản trị chứa dữ liệu bí mật nên không thể phát hành.',
  GOVERNANCE_SNAPSHOT_NOT_FOUND: 'Không tìm thấy governance snapshot.',
  GOVERNANCE_SNAPSHOT_CONFLICT:
    'Snapshot đang được phát hành bởi một yêu cầu khác. Hãy thử lại sau.',
  RECONCILIATION_SCOPE_REQUIRED:
    'Cần khoảng thời gian có đủ từ/đến hoặc danh sách hợp đồng cụ thể.',
  RECONCILIATION_SCOPE_INVALID: 'Phạm vi đối soát không hợp lệ.',
  RECONCILIATION_SCOPE_LOCKED:
    'Đã có một lần đối soát đang chạy cho phạm vi này.',
  RECONCILIATION_RUN_NOT_FOUND: 'Không tìm thấy lần đối soát.',
  RECONCILIATION_RUN_NOT_RESUMABLE:
    'Lần đối soát này không thể tiếp tục ở trạng thái hiện tại.',
  RECONCILIATION_RUN_NOT_CANCELLABLE:
    'Lần đối soát này không thể hủy ở trạng thái hiện tại.',
  RECONCILIATION_FINDING_NOT_FOUND: 'Không tìm thấy phát hiện đối soát.',
  RECONCILIATION_REASON_REQUIRED: 'Cần nhập lý do hợp lệ (5-500 ký tự).',
  LEDGER_FINDING_NOT_REPAIRABLE:
    'Phát hiện này không có hành động sửa tự động an toàn.',
  LEDGER_FINDING_PRECONDITION_STALE:
    'Điều kiện nghiệp vụ đã thay đổi nên không thể sửa. Hãy chạy đối soát lại.',
}

export function isForbiddenError(error: unknown): boolean {
  return error instanceof ApiClientError && error.status === 403
}

export function describeFabricAuditError(error: unknown): string {
  if (error instanceof FabricAuditResponseError) {
    return 'Dữ liệu máy chủ trả về không hợp lệ. Hãy thử lại sau.'
  }
  if (isForbiddenError(error)) {
    return 'Bạn không có quyền thực hiện thao tác này.'
  }
  if (error instanceof ApiClientError && error.status === 0) {
    return 'Không thể kết nối tới máy chủ. Hãy kiểm tra mạng và thử lại.'
  }
  const code = readApiErrorCode(error)
  const known = code ? MESSAGES[code] : undefined
  return known ?? 'Không thể hoàn tất yêu cầu. Hãy thử lại sau.'
}
