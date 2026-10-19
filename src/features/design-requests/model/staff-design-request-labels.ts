import type {
  DesignRequestEventType,
  DesignRequestKind,
  DesignRequestStatus,
} from '../api/design-requests-api'

export const STAFF_STATUS_LABELS: Record<DesignRequestStatus, string> = {
  submitted: 'Chờ tiếp nhận',
  needs_info: 'Chờ chủ nhà bổ sung',
  escalated: 'Chờ quản trị viên',
  in_progress: 'Đang thiết kế',
  delivered: 'Chờ chủ nhà duyệt',
  changes_requested: 'Chủ nhà yêu cầu sửa',
  approved: 'Đã duyệt',
  rejected: 'Đã từ chối',
  cancelled: 'Đã hủy',
}

export const STAFF_STATUS_ORDER: DesignRequestStatus[] = [
  'submitted',
  'needs_info',
  'escalated',
  'in_progress',
  'delivered',
  'changes_requested',
  'approved',
  'rejected',
  'cancelled',
]

export const STAFF_STATUS_TONE: Record<DesignRequestStatus, string> = {
  submitted: 'bg-sky-100 text-sky-800',
  needs_info: 'bg-amber-100 text-amber-800',
  escalated: 'bg-violet-100 text-violet-800',
  in_progress: 'bg-blue-100 text-blue-800',
  delivered: 'bg-teal-100 text-teal-800',
  changes_requested: 'bg-orange-100 text-orange-800',
  approved: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-red-100 text-red-800',
  cancelled: 'bg-zinc-200 text-zinc-700',
}

export const STAFF_KIND_LABELS: Record<DesignRequestKind, string> = {
  create: 'Thiết kế mới',
  edit: 'Chỉnh sửa',
}

export const STAFF_EVENT_LABELS: Record<DesignRequestEventType, string> = {
  submitted: 'Chủ nhà gửi yêu cầu',
  info_requested: 'Yêu cầu bổ sung thông tin',
  info_provided: 'Chủ nhà bổ sung thông tin',
  escalated: 'Chuyển quản trị viên',
  rejected: 'Từ chối yêu cầu',
  started: 'Quản trị viên nhận thiết kế',
  delivered: 'Giao thiết kế cho chủ nhà',
  feedback: 'Chủ nhà yêu cầu chỉnh sửa',
  approved: 'Chủ nhà duyệt thiết kế',
  cancelled: 'Hủy yêu cầu',
}

export const STAFF_ROLE_LABELS = {
  landlord: 'Chủ nhà',
  staff: 'Nhân viên',
  admin: 'Quản trị viên',
} as const

export function defaultQueueStatuses(
  role: 'staff' | 'admin'
): DesignRequestStatus[] {
  return role === 'staff'
    ? ['submitted', 'needs_info', 'escalated']
    : ['escalated', 'in_progress', 'changes_requested', 'delivered']
}
