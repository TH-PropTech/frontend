import { readApiErrorCode } from '@/shared/api'

const SETTLEMENT_STATUS_LABELS: Record<string, string> = {
  pending: 'Chờ thanh toán',
  'partially-paid': 'Đã thanh toán một phần',
  paid: 'Đã thanh toán',
  overdue: 'Quá hạn',
  cancelled: 'Đã hủy',
}

const LINE_KIND_LABELS: Record<string, string> = {
  FIRST_RENT: 'Tiền thuê kỳ đầu',
  DEPOSIT_TOPUP: 'Tiền cọc bổ sung',
  TENANT_SERVICE_FEE: 'Phí dịch vụ',
}

const COMPLETION_REASON_LABELS: Record<string, string> = {
  'both-confirmed': 'Hai bên đã xác nhận biên bản.',
  'tenant-no-response':
    'Khách thuê không phản hồi sai lệch trong hạn 3 ngày theo Điều 9.1.',
}

export const ITEM_CONDITION_LABELS: Record<'good' | 'damaged', string> = {
  good: 'Tốt',
  damaged: 'Hư hỏng',
}

const ERROR_LABELS: Record<string, string> = {
  HANDOVER_ACCESS_DENIED: 'Bạn không có quyền thực hiện thao tác này.',
  HANDOVER_REQUIRES_SETTLEMENT:
    'Chỉ ghi được biên bản sau khi quyết toán đã được thanh toán.',
  HANDOVER_COMPLETED_IMMUTABLE: 'Biên bản đã hoàn tất, không thể sửa.',
  HANDOVER_NOT_RECORDED: 'Chưa có biên bản bàn giao.',
  HANDOVER_REVISION_STALE:
    'Biên bản vừa được cập nhật. Vui lòng tải lại và xem bản mới nhất.',
  HANDOVER_DISCREPANCY_OPEN:
    'Bạn đã báo sai lệch cho bản này. Chờ chủ nhà sửa biên bản rồi xác nhận lại.',
  HANDOVER_ALREADY_CONFIRMED:
    'Bạn đã xác nhận bản này nên không thể báo sai lệch.',
  MOVE_IN_SETTLEMENT_NOT_FOUND: 'Không tìm thấy quyết toán nhận nhà.',
}

/** Giá trị lạ không bao giờ hiện mã thô. */
export const getSettlementStatusLabel = (status: string): string =>
  SETTLEMENT_STATUS_LABELS[status] ?? 'Đang cập nhật'

export const getSettlementLineLabel = (kind: string): string =>
  LINE_KIND_LABELS[kind] ?? 'Khoản khác'

export const getCompletionReasonLabel = (
  reason: string | null | undefined
): string =>
  COMPLETION_REASON_LABELS[reason ?? 'both-confirmed'] ??
  'Biên bản đã hoàn tất.'

export function getHandoverErrorMessage(
  error: unknown,
  fallback: string
): string {
  const code = readApiErrorCode(error)
  return (code && ERROR_LABELS[code]) || fallback
}
