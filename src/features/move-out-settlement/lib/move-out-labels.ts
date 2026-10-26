import { humanizeCode } from '@/features/contracts/lib/contract-labels'
import { readApiErrorCode } from '@/shared/api'
import type {
  DepositStatementStatus,
  MoveOutHandoverStatus,
  MoveOutItemCondition,
} from '../api/move-out-types'

const HANDOVER_STATUS_LABELS: Record<MoveOutHandoverStatus, string> = {
  recorded: 'Chờ khách xác nhận',
  completed: 'Đã hoàn tất',
  disputed: 'Đang có tranh chấp',
}

const STATEMENT_STATUS_LABELS: Record<DepositStatementStatus, string> = {
  draft: 'Chủ nhà đang soạn',
  'awaiting-tenant': 'Chờ khách phản hồi',
  accepted: 'Đã thống nhất',
  disputed: 'Đang có tranh chấp',
  'refund-recorded': 'Chủ nhà đã khai báo hoàn cọc',
  closed: 'Đã đóng',
}

export const CONDITION_LABELS: Record<MoveOutItemCondition, string> = {
  good: 'Tốt',
  damaged: 'Hư hỏng',
  missing: 'Mất',
}

const COMPLETION_REASON_LABELS: Record<string, string> = {
  'both-confirmed': 'Hai bên đã xác nhận biên bản.',
  'tenant-no-response':
    'Khách thuê không phản hồi trong hạn nên biên bản được xem là đã đồng ý.',
}

const ACCEPTED_REASON_LABELS: Record<string, string> = {
  'tenant-accepted': 'Khách thuê đã đồng ý các khoản khấu trừ.',
  'tenant-no-response':
    'Khách thuê không phản hồi trong hạn nên được xem là đã đồng ý.',
  'no-deductions': 'Chủ nhà không khấu trừ khoản nào.',
}

const CLOSE_REASON_LABELS: Record<string, string> = {
  'tenant-acknowledged': 'Khách thuê đã xác nhận nhận đủ tiền cọc.',
  'tenant-no-acknowledge':
    'Khách thuê không xác nhận trong hạn nên hồ sơ được đóng.',
  'no-refund-due': 'Không có khoản cọc nào phải hoàn.',
}

const ERROR_LABELS: Record<string, string> = {
  MOVE_OUT_HANDOVER_EXISTS: 'Biên bản trả nhà đã có. Hãy tải lại trang để sửa.',
  MOVE_OUT_REVISION_STALE:
    'Biên bản vừa được cập nhật. Vui lòng tải lại và xem bản mới nhất.',
  MOVE_OUT_DISCREPANCY_OPEN:
    'Bạn đã phản đối bản này. Chờ chủ nhà sửa biên bản rồi xác nhận lại.',
  MOVE_OUT_HANDOVER_NOT_COMPLETED: 'Biên bản trả nhà chưa hoàn tất.',
  MOVE_IN_HANDOVER_NOT_COMPLETED:
    'Cần có biên bản nhận nhà đã hoàn tất trước khi lập biên bản trả nhà.',
  STATEMENT_RESPONSE_EXPIRED:
    'Đã quá hạn phản hồi bảng khấu trừ. Nội dung được xem là đã đồng ý.',
  STATEMENT_NOT_AWAITING_TENANT: 'Bảng khấu trừ không còn chờ phản hồi.',
  STATEMENT_DEDUCTION_EXCEEDS_DEPOSIT:
    'Tổng khấu trừ không được vượt quá tiền cọc.',
  STATEMENT_REFUND_EXCEEDS_LIMIT: 'Số tiền hoàn vượt quá số cọc còn phải hoàn.',
  HTTP_403: 'Bạn không có quyền thực hiện thao tác này.',
  HTTP_409: 'Trạng thái đã thay đổi. Vui lòng tải lại trang.',
}

export const getHandoverStatusLabel = (status: string): string =>
  HANDOVER_STATUS_LABELS[status as MoveOutHandoverStatus] ??
  humanizeCode(status)

export const getStatementStatusLabel = (status: string): string =>
  STATEMENT_STATUS_LABELS[status as DepositStatementStatus] ??
  humanizeCode(status)

export const getConditionLabel = (condition: string): string =>
  CONDITION_LABELS[condition as MoveOutItemCondition] ?? humanizeCode(condition)

export const getCompletionReasonLabel = (reason: string | null): string =>
  (reason && COMPLETION_REASON_LABELS[reason]) || 'Biên bản đã hoàn tất.'

export const getAcceptedReasonLabel = (reason: string | null): string | null =>
  reason ? (ACCEPTED_REASON_LABELS[reason] ?? humanizeCode(reason)) : null

export const getCloseReasonLabel = (reason: string | null): string | null =>
  reason ? (CLOSE_REASON_LABELS[reason] ?? humanizeCode(reason)) : null

/** Mã lỗi lạ không bao giờ hiện thô: dùng câu dự phòng. */
export function getMoveOutErrorMessage(
  error: unknown,
  fallback: string
): string {
  const code = readApiErrorCode(error)
  return (code && ERROR_LABELS[code]) || fallback
}

export const formatMoney = (amount: number): string =>
  `${new Intl.NumberFormat('vi-VN').format(amount)} đ`

export const formatDateTime = (value: string): string =>
  new Date(value).toLocaleString('vi-VN')

export const formatDate = (value: string): string =>
  new Date(value).toLocaleDateString('vi-VN')

export const REFUND_DECLARATION_NOTICE =
  'Khoản hoàn cọc do chủ nhà khai báo và khách thuê xác nhận. Nền tảng không giữ, không chuyển và không kiểm chứng tiền.'
