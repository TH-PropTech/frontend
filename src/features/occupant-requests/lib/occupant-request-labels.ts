import { readApiErrorCode } from '@/shared/api'
import type { OccupantRequestStatus } from '../api/occupant-requests-api'

export const STATUS_LABELS: Record<OccupantRequestStatus, string> = {
  'pending-landlord': 'Chờ Chủ nhà phản hồi',
  'pending-tenant': 'Chờ Khách thuê trả lời mức phí mới',
  agreed: 'Đã thống nhất, chờ hai bên xác nhận phụ lục',
  rejected: 'Đã đóng',
}

const ERROR_LABELS: Record<string, string> = {
  OCCUPANT_REQUEST_IN_PROGRESS:
    'Đã có một yêu cầu thêm người ở đang chờ xử lý. Hãy hoàn tất yêu cầu đó trước.',
  OCCUPANT_REQUEST_NOT_PENDING:
    'Yêu cầu này đã được xử lý ở nơi khác. Hãy tải lại trang.',
  OCCUPANT_REQUEST_CONTRACT_NOT_ACTIVE:
    'Chỉ gửi được yêu cầu khi hợp đồng đang có hiệu lực.',
  OCCUPANT_REQUEST_TENANT_ONLY: 'Chỉ Khách thuê của hợp đồng gửi được yêu cầu.',
  OCCUPANT_REQUEST_LANDLORD_ONLY:
    'Chỉ Chủ nhà của hợp đồng quyết định được yêu cầu.',
  CONTRACT_AMENDMENT_IN_PROGRESS:
    'Hợp đồng đang có một phụ lục chờ xử lý. Hãy hoàn tất phụ lục đó trước khi thống nhất thêm người ở.',
}

/** Lỗi cho người dùng: ưu tiên nhãn theo mã; thông báo tiếng Việt từ server giữ nguyên. */
export function getOccupantRequestErrorMessage(
  error: unknown,
  fallback: string
): string {
  const code = readApiErrorCode(error)
  if (code && ERROR_LABELS[code]) return ERROR_LABELS[code]
  if (
    error instanceof Error &&
    /[ạảãàáâậầấẩẫăắằặẳẵêếềệểễôốồộổỗơớờợởỡưứừựửữđ]/i.test(error.message)
  ) {
    return error.message
  }
  return fallback
}

export const formatMoney = (amount: number): string =>
  `${new Intl.NumberFormat('vi-VN').format(amount)} đ`

export const formatDate = (value: string): string =>
  new Date(value).toLocaleDateString('vi-VN')
