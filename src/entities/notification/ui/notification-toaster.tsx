'use client'

import { useNotificationToasts } from '../model/use-notification-toasts'

/** Gắn một lần ở gốc ứng dụng để thông báo mới hiện thành toast ở mọi trang. */
export function NotificationToaster(): null {
  useNotificationToasts()
  return null
}
