import * as React from 'react'
import Link from 'next/link'
import {
  NOTIFICATION_ERROR_MESSAGES,
  NotificationCard,
  type NotificationErrorKind,
  type NotificationItem,
  type UseBookingDecisionResult,
  type UseNotificationsResult,
} from '@/entities/notification'

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'

export interface NotificationDropdownProps {
  id: string
  items: NotificationItem[]
  unreadCount: number
  status: UseNotificationsResult['status']
  errorKind: NotificationErrorKind | null
  decision: Pick<UseBookingDecisionResult, 'busy' | 'approve' | 'startReject'>
  onOpenNotification: (id: string) => void
  onMarkAllRead: () => void
  onClose: () => void
}

function DropdownBody({
  items,
  status,
  errorKind,
  decision,
  onOpenNotification,
}: Pick<
  NotificationDropdownProps,
  'items' | 'status' | 'errorKind' | 'decision' | 'onOpenNotification'
>): React.ReactElement {
  if (errorKind) {
    return (
      <p
        role="alert"
        className="mb-2 rounded-xl border border-warning/30 bg-warning/10 p-3 text-xs font-medium text-warning"
      >
        {NOTIFICATION_ERROR_MESSAGES[errorKind]}
      </p>
    )
  }
  if (status === 'loading') {
    return (
      <p
        role="status"
        className="py-8 text-center text-xs font-medium text-muted"
      >
        Đang tải thông báo...
      </p>
    )
  }
  if (items.length === 0) {
    return (
      <p className="py-8 text-center text-xs font-medium text-muted">
        Bạn chưa có thông báo nào.
      </p>
    )
  }
  return (
    <ul
      tabIndex={0}
      aria-label="Danh sách thông báo"
      className={`scrollbar-thin max-h-80 space-y-2.5 overflow-y-auto pr-1 ${FOCUS_RING}`}
    >
      {items.map(notification => (
        <NotificationCard
          key={notification._id}
          notification={notification}
          onOpen={onOpenNotification}
          bookingBusy={decision.busy}
          onApproveBooking={decision.approve}
          onRejectBooking={decision.startReject}
        />
      ))}
    </ul>
  )
}

export function NotificationDropdown({
  id,
  unreadCount,
  onMarkAllRead,
  onClose,
  ...body
}: NotificationDropdownProps): React.ReactElement {
  return (
    <div
      id={id}
      className="animate-in fade-in slide-in-from-top-2 absolute right-0 z-50 mt-3 w-80 rounded-3xl border border-border bg-white p-4 shadow-xl duration-200 sm:w-96"
    >
      <div className="mb-2 flex items-center justify-between border-b border-border/50 pb-2.5">
        <h4 className="font-marketing text-sm font-bold text-fg">
          Thông báo mới nhận
        </h4>
        {unreadCount > 0 ? (
          <button
            type="button"
            onClick={onMarkAllRead}
            className={`min-h-10 cursor-pointer rounded-lg px-2 text-xs font-bold text-primary hover:text-primary-hover ${FOCUS_RING}`}
          >
            Đọc tất cả
          </button>
        ) : null}
      </div>

      <DropdownBody {...body} />

      <div className="mt-2 border-t border-border/50 pt-2 text-center">
        <Link
          href="/notifications"
          onClick={onClose}
          className={`block min-h-10 rounded-lg py-2 text-xs font-bold text-muted transition-colors hover:text-fg ${FOCUS_RING}`}
        >
          Xem tất cả thông báo
        </Link>
      </div>
    </div>
  )
}
