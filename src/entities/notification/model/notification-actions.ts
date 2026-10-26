import type { NotificationItem } from '../api/notifications-api'

/** Loại thông báo có nút đi tới `data.link`, kèm nhãn nút. */
const LINK_LABEL_BY_TYPE: Readonly<Record<string, string>> = {
  PAYOUT_PENDING: 'Mở trang xác nhận chuyển tiền',
  PAYOUT_FAILED: 'Xem trạng thái nhận tiền',
  PAYOUT_REPORTED: 'Xem đối soát',
  PLATFORM_FEE_INVOICE: 'Xem hóa đơn phí hoa hồng',
  DESIGN_REQUEST: 'Xem yêu cầu thiết kế 3D',
}

const BOOKING_RESULT_STATUSES = ['confirmed', 'rejected', 'cancelled'] as const

export type BookingResultStatus = (typeof BOOKING_RESULT_STATUSES)[number]

export type NotificationAction =
  | { kind: 'booking-request'; bookingId: string }
  | { kind: 'booking-status'; status: BookingResultStatus }
  | { kind: 'link'; label: string; href: string; amount?: number }

function isBookingResultStatus(value: unknown): value is BookingResultStatus {
  return BOOKING_RESULT_STATUSES.some(status => status === value)
}

/** Chỉ cho đi tới đường dẫn nội bộ; chặn `javascript:`, URL ngoài và `//host`. */
function isInternalHref(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    value.startsWith('/') &&
    !value.startsWith('//') &&
    !value.startsWith('/\\')
  )
}

function resolveBookingAction(
  data: Record<string, unknown>
): NotificationAction | null {
  const { bookingId, status } = data
  if (typeof bookingId !== 'string' || bookingId === '') return null
  if (status === undefined || status === 'pending') {
    return { kind: 'booking-request', bookingId }
  }
  return isBookingResultStatus(status)
    ? { kind: 'booking-status', status }
    : null
}

function resolveLinkAction(
  label: string,
  data: Record<string, unknown>
): NotificationAction | null {
  if (!isInternalHref(data.link)) return null
  const action = { kind: 'link', label, href: data.link } as const
  return typeof data.amount === 'number'
    ? { ...action, amount: data.amount }
    : action
}

/**
 * Quyết định hành động hiển thị cho một thông báo theo `type` và `data`,
 * không dựa vào nội dung tiêu đề.
 */
export function resolveNotificationAction(
  notification: NotificationItem
): NotificationAction | null {
  const data = notification.data ?? {}
  if (notification.type === 'BOOKING') return resolveBookingAction(data)
  const label = LINK_LABEL_BY_TYPE[notification.type]
  return label ? resolveLinkAction(label, data) : null
}
