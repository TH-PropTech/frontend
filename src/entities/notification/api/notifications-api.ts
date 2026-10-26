import { apiClient } from '@/shared/api'

export interface NotificationItem {
  _id: string
  title: string
  body: string
  type: string
  /** Dữ liệu kèm theo do từng loại thông báo quyết định; luôn thu hẹp kiểu trước khi dùng. */
  data?: Record<string, unknown>
  isRead: boolean
  createdAt: string
}

export interface NotificationList {
  items: NotificationItem[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface NotificationQuery {
  page?: number
  limit?: number
  isRead?: boolean
}

export function fetchNotifications(
  query: NotificationQuery = {}
): Promise<NotificationList> {
  const params = new URLSearchParams()
  if (query.page !== undefined) params.set('page', String(query.page))
  if (query.limit !== undefined) params.set('limit', String(query.limit))
  if (query.isRead !== undefined) params.set('isRead', String(query.isRead))
  const search = params.toString()
  return apiClient.get<NotificationList>(
    search ? `/notifications?${search}` : '/notifications'
  )
}

export async function fetchUnreadCount(): Promise<number> {
  const { count } = await apiClient.get<{ count: number }>(
    '/notifications/unread-count'
  )
  return count
}

export function markNotificationRead(id: string): Promise<unknown> {
  return apiClient.patch(`/notifications/${encodeURIComponent(id)}/read`, {})
}

export function markAllNotificationsRead(): Promise<unknown> {
  return apiClient.patch('/notifications/read-all', {})
}

export function deleteNotification(id: string): Promise<unknown> {
  return apiClient.delete(`/notifications/${encodeURIComponent(id)}`)
}
