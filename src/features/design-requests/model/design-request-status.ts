import { ApiClientError } from '@/shared/api/api-client'
import type {
  DesignRequestEventType,
  DesignRequestStatus,
} from '../api/design-requests-api'

export const DESIGN_REQUEST_STATUS_META: Record<
  DesignRequestStatus,
  { label: string; className: string }
> = {
  submitted: {
    label: 'Chờ nhân viên tiếp nhận',
    className: 'bg-sky-100 text-sky-800 border-sky-200',
  },
  needs_info: {
    label: 'Cần bổ sung thông tin',
    className: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  escalated: {
    label: 'Đang chờ nhân viên nhận thiết kế',
    className: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  },
  in_progress: {
    label: 'Đang thiết kế',
    className: 'bg-violet-100 text-violet-800 border-violet-200',
  },
  delivered: {
    label: 'Chờ bạn duyệt',
    className: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
  changes_requested: {
    label: 'Đang chỉnh sửa theo phản hồi',
    className: 'bg-orange-100 text-orange-800 border-orange-200',
  },
  approved: {
    label: 'Đã duyệt',
    className: 'bg-green-600 text-white border-green-600',
  },
  rejected: {
    label: 'Bị từ chối',
    className: 'bg-rose-100 text-rose-800 border-rose-200',
  },
  cancelled: {
    label: 'Đã hủy',
    className: 'bg-zinc-100 text-zinc-700 border-zinc-200',
  },
}

const TERMINAL: ReadonlySet<DesignRequestStatus> = new Set([
  'rejected',
  'approved',
  'cancelled',
])

export function isTerminalDesignRequestStatus(
  status: DesignRequestStatus
): boolean {
  return TERMINAL.has(status)
}

export const DESIGN_REQUEST_EVENT_LABEL: Record<
  DesignRequestEventType,
  string
> = {
  submitted: 'Gửi yêu cầu',
  info_requested: 'Yêu cầu bổ sung thông tin',
  info_provided: 'Bổ sung thông tin',
  escalated: 'Chuyển nhân viên thiết kế',
  rejected: 'Từ chối yêu cầu',
  started: 'Bắt đầu thiết kế',
  delivered: 'Bàn giao thiết kế',
  feedback: 'Gửi phản hồi chỉnh sửa',
  approved: 'Duyệt thiết kế',
  cancelled: 'Hủy yêu cầu',
}

export const DESIGN_REQUEST_ROLE_LABEL = {
  landlord: 'Chủ nhà',
  staff: 'Nhân viên',
  admin: 'Quản trị viên',
} as const

/** Chuyển lỗi API thành thông báo tiếng Việt cho chủ nhà. */
export function designRequestErrorMessage(error: unknown): string {
  if (error instanceof ApiClientError) {
    switch (error.body?.code) {
      case 'DESIGN_REQUEST_ACTIVE_EXISTS':
        return 'Căn hộ này đã có yêu cầu đang xử lý.'
      case 'APARTMENT_ACCESS_DENIED':
        return 'Bạn không có quyền gửi yêu cầu cho căn hộ này.'
      case 'DESIGN_REQUEST_INVALID_STATE':
        return 'Trạng thái yêu cầu đã thay đổi. Vui lòng xem lại và thử lại.'
      default:
        break
    }
  }
  return 'Không thể xử lý yêu cầu thiết kế 3D. Vui lòng thử lại.'
}
