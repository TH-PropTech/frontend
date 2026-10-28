import * as React from 'react'
import { Check, Clock, Trash2, X, type LucideIcon } from 'lucide-react'
import type { NotificationItem } from '../api/notifications-api'
import { formatNotificationTime } from '../lib/notification-time'
import {
  resolveNotificationAction,
  type BookingResultStatus,
  type NotificationAction,
} from '../model/notification-actions'

const BOOKING_STATUS_VIEW: Readonly<
  Record<
    BookingResultStatus,
    { label: string; className: string; Icon: LucideIcon }
  >
> = {
  confirmed: {
    label: 'Đã đồng ý',
    className: 'border-success/15 bg-success-soft/20 text-success',
    Icon: Check,
  },
  rejected: {
    label: 'Đã từ chối',
    className: 'border-danger/15 bg-danger-soft/20 text-danger',
    Icon: X,
  },
  cancelled: {
    label: 'Đã hủy',
    className: 'border-border bg-surface-muted text-subtle',
    Icon: X,
  },
}

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'

export interface NotificationCardProps {
  notification: NotificationItem
  onOpen: (id: string) => void
  onDelete?: (id: string) => void
  bookingBusy?: boolean
  onApproveBooking?: (notification: NotificationItem) => void
  onRejectBooking?: (notification: NotificationItem) => void
}

interface ActionAreaProps {
  action: NotificationAction
  notification: NotificationItem
  bookingBusy: boolean
  onApproveBooking: ((notification: NotificationItem) => void) | undefined
  onRejectBooking: ((notification: NotificationItem) => void) | undefined
}

function NotificationActionArea({
  action,
  notification,
  bookingBusy,
  onApproveBooking,
  onRejectBooking,
}: ActionAreaProps): React.ReactElement | null {
  if (action.kind === 'booking-status') {
    const { label, className, Icon } = BOOKING_STATUS_VIEW[action.status]
    return (
      <span
        className={`mt-2.5 inline-flex items-center gap-1 whitespace-nowrap rounded-md border px-2 py-0.5 text-[11px] font-bold ${className}`}
      >
        <Icon className="h-3 w-3" aria-hidden="true" />
        {label}
      </span>
    )
  }

  if (action.kind === 'link') {
    return (
      <a
        href={action.href}
        className={`mt-2.5 inline-flex min-h-11 items-center rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-primary-hover ${FOCUS_RING}`}
      >
        {action.label}
        {action.amount === undefined
          ? ''
          : ` (${action.amount.toLocaleString('vi-VN')} VND)`}
      </a>
    )
  }

  if (!onApproveBooking || !onRejectBooking) return null
  return (
    <div className="mt-2.5 flex flex-wrap gap-2">
      <button
        type="button"
        disabled={bookingBusy}
        onClick={() => onApproveBooking(notification)}
        className={`inline-flex min-h-11 cursor-pointer items-center gap-1 rounded-lg bg-primary px-4 text-xs font-bold text-white hover:bg-primary-hover disabled:opacity-50 ${FOCUS_RING}`}
      >
        <Check className="h-3.5 w-3.5" aria-hidden="true" />
        Đồng ý
      </button>
      <button
        type="button"
        disabled={bookingBusy}
        onClick={() => onRejectBooking(notification)}
        className={`inline-flex min-h-11 cursor-pointer items-center gap-1 rounded-lg border border-border px-4 text-xs font-bold text-fg hover:bg-surface-muted disabled:opacity-50 ${FOCUS_RING}`}
      >
        <X className="h-3.5 w-3.5" aria-hidden="true" />
        Từ chối
      </button>
    </div>
  )
}

export function NotificationCard({
  notification,
  onOpen,
  onDelete,
  bookingBusy = false,
  onApproveBooking,
  onRejectBooking,
}: NotificationCardProps): React.ReactElement {
  const action = resolveNotificationAction(notification)

  return (
    <li
      className={`relative rounded-2xl border p-3 text-left transition-colors ${
        notification.isRead
          ? 'border-border/40 bg-white hover:bg-surface-muted/30'
          : 'border-primary/20 bg-primary-soft/10 hover:bg-primary-soft/20'
      }`}
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          onClick={() => onOpen(notification._id)}
          className={`min-w-0 flex-1 cursor-pointer rounded-lg text-left ${FOCUS_RING}`}
        >
          {notification.isRead ? null : (
            <>
              <span
                aria-hidden="true"
                className="float-right ml-2 mt-1 h-2 w-2 rounded-full bg-primary"
              />
              <span className="sr-only">Chưa đọc.</span>
            </>
          )}
          <span className="block break-words font-marketing text-xs font-bold leading-tight text-fg">
            {notification.title}
          </span>
          <span className="mt-1 block break-words font-body text-[11px] leading-relaxed text-muted">
            {notification.body}
          </span>
        </button>
        {onDelete ? (
          <button
            type="button"
            aria-label="Xóa thông báo"
            onClick={() => onDelete(notification._id)}
            className={`inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg text-muted hover:bg-surface-muted hover:text-danger ${FOCUS_RING}`}
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      {action ? (
        <NotificationActionArea
          action={action}
          notification={notification}
          bookingBusy={bookingBusy}
          onApproveBooking={onApproveBooking}
          onRejectBooking={onRejectBooking}
        />
      ) : null}

      <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-muted">
        <Clock className="h-3 w-3" aria-hidden="true" />
        <span>{formatNotificationTime(notification.createdAt)}</span>
      </div>
    </li>
  )
}
