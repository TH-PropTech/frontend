import * as React from 'react'
import type { Route } from 'next'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { notificationEvents } from '../api/notification-events-client'
import type { NotificationItem } from '../api/notifications-api'
import { resolveNotificationAction } from './notification-actions'

/** Đủ lâu để người đang làm việc khác vẫn kịp nhìn thấy. */
const TOAST_DURATION_MS = 8_000
const NOTIFICATIONS_PAGE = '/notifications'

function hasAccessToken(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.localStorage.getItem('accessToken') !== null
  )
}

/** Đi thẳng tới liên kết nội bộ của thông báo, nếu không có thì mở trang thông báo. */
function destinationOf(notification: NotificationItem): string {
  const action = resolveNotificationAction(notification)
  return action?.kind === 'link' ? action.href : NOTIFICATIONS_PAGE
}

/**
 * Hiện toast mỗi khi có thông báo mới qua realtime, ở mọi trang. Chỉ nghe khi
 * đã đăng nhập; đăng nhập/đăng xuất không tải lại trang được nhận ra ở lần
 * điều hướng kế tiếp.
 */
export function useNotificationToasts(): void {
  const router = useRouter()
  const pathname = usePathname()
  const stop = React.useRef<(() => void) | null>(null)

  React.useEffect(() => {
    if (!hasAccessToken()) {
      stop.current?.()
      stop.current = null
      return
    }
    if (stop.current !== null) {
      notificationEvents.reconnectIfIdle()
      return
    }
    stop.current = notificationEvents.subscribe({
      onCreated: ({ notification }) => {
        toast(notification.title, {
          id: notification._id,
          description: notification.body,
          duration: TOAST_DURATION_MS,
          action: {
            label: 'Xem',
            onClick: () => router.push(destinationOf(notification) as Route),
          },
        })
      },
    })
  }, [pathname, router])

  React.useEffect(
    () => () => {
      stop.current?.()
      stop.current = null
    },
    []
  )
}
