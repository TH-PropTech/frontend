import * as React from 'react'
import { ApiClientError } from '@/shared/api'
import {
  notificationEvents,
  type NotificationConnectionState,
  type NotificationCreatedEvent,
} from '../api/notification-events-client'
import {
  deleteNotification,
  fetchNotifications,
  fetchUnreadCount,
  markAllNotificationsRead,
  markNotificationRead,
  type NotificationItem,
  type NotificationQuery,
} from '../api/notifications-api'

/** Khoảng hỏi lại số chưa đọc khi chưa có kết nối realtime. */
const POLL_INTERVAL_MS = 60_000

export type NotificationErrorKind = 'network' | 'auth' | 'unknown'

export interface UseNotificationsOptions {
  limit?: number | undefined
  page?: number | undefined
  isRead?: boolean | undefined
}

export interface UseNotificationsResult {
  items: NotificationItem[]
  total: number
  totalPages: number
  unreadCount: number
  status: 'loading' | 'ready' | 'error'
  errorKind: NotificationErrorKind | null
  connection: NotificationConnectionState
  refresh: () => Promise<void>
  /** Các thao tác trả `true` khi thành công, `false` khi lỗi (đã ghi log). */
  markRead: (id: string) => Promise<boolean>
  markAllRead: () => Promise<boolean>
  remove: (id: string) => Promise<boolean>
}

interface Snapshot {
  items: NotificationItem[]
  total: number
  totalPages: number
  unreadCount: number
}

interface State extends Snapshot {
  status: UseNotificationsResult['status']
  errorKind: NotificationErrorKind | null
  /** Khóa truy vấn của lần tải gần nhất đã xong (thành công hoặc lỗi). */
  queryKey: string | null
}

const EMPTY_SNAPSHOT: Snapshot = {
  items: [],
  total: 0,
  totalPages: 1,
  unreadCount: 0,
}

const INITIAL_STATE: State = {
  ...EMPTY_SNAPSHOT,
  status: 'loading',
  errorKind: null,
  queryKey: null,
}

function queryKeyOf({ limit, page, isRead }: UseNotificationsOptions): string {
  return `${page ?? 1}:${limit ?? ''}:${isRead ?? ''}`
}

function hasAccessToken(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.localStorage.getItem('accessToken') !== null
  )
}

function buildQuery({
  limit,
  page,
  isRead,
}: UseNotificationsOptions): NotificationQuery {
  return {
    ...(page !== undefined && { page }),
    ...(limit !== undefined && { limit }),
    ...(isRead !== undefined && { isRead }),
  }
}

function classifyError(error: unknown): NotificationErrorKind {
  if (error instanceof ApiClientError) {
    if (error.status === 0) return 'network'
    if (error.status === 401 || error.status === 403) return 'auth'
  }
  return 'unknown'
}

async function fetchSnapshot(query: NotificationQuery): Promise<Snapshot> {
  if (!hasAccessToken()) return EMPTY_SNAPSHOT
  const [list, unreadCount] = await Promise.all([
    fetchNotifications(query),
    fetchUnreadCount(),
  ])
  return {
    items: list.items,
    total: list.total,
    totalPages: list.totalPages,
    unreadCount,
  }
}

function applyCreated(
  state: State,
  { notification, unreadCount }: NotificationCreatedEvent,
  { limit, page, isRead }: UseNotificationsOptions
): State {
  const next = { ...state, unreadCount }
  const isFirstPage = (page ?? 1) === 1
  const isDuplicate = state.items.some(item => item._id === notification._id)
  // Thông báo mới luôn chưa đọc nên không khớp bộ lọc "đã đọc".
  if (!isFirstPage || isRead === true || isDuplicate) return next
  const items = [notification, ...state.items]
  return {
    ...next,
    items: limit === undefined ? items : items.slice(0, limit),
    total: state.total + 1,
  }
}

function applyRead(state: State, id: string): State {
  const target = state.items.find(item => item._id === id)
  if (!target || target.isRead) return state
  return {
    ...state,
    items: state.items.map(item =>
      item._id === id ? { ...item, isRead: true } : item
    ),
    unreadCount: Math.max(0, state.unreadCount - 1),
  }
}

function applyRemoved(state: State, id: string): State {
  const target = state.items.find(item => item._id === id)
  if (!target) return state
  return {
    ...state,
    items: state.items.filter(item => item._id !== id),
    total: Math.max(0, state.total - 1),
    unreadCount: target.isRead
      ? state.unreadCount
      : Math.max(0, state.unreadCount - 1),
  }
}

export function useNotifications(
  options: UseNotificationsOptions = {}
): UseNotificationsResult {
  const { limit, page, isRead } = options
  const [state, setState] = React.useState<State>(INITIAL_STATE)
  const [connection, setConnection] =
    React.useState<NotificationConnectionState>('idle')
  const latestRequest = React.useRef(0)

  const load = React.useCallback(async (): Promise<void> => {
    const requestId = ++latestRequest.current
    const key = queryKeyOf({ limit, page, isRead })
    try {
      const snapshot = await fetchSnapshot(buildQuery({ limit, page, isRead }))
      if (requestId !== latestRequest.current) return
      setState({ ...snapshot, status: 'ready', errorKind: null, queryKey: key })
    } catch (error) {
      if (requestId !== latestRequest.current) return
      const errorKind = classifyError(error)
      if (errorKind === 'unknown') {
        console.error('Failed to fetch notifications:', error)
      }
      setState(current => ({
        ...current,
        status: 'error',
        errorKind,
        queryKey: key,
      }))
    }
  }, [limit, page, isRead])

  React.useEffect(() => {
    // Hoãn sang tick sau để không gọi setState đồng bộ trong effect.
    const timer = setTimeout(() => {
      void load()
    }, 0)
    return () => {
      clearTimeout(timer)
      latestRequest.current += 1
    }
  }, [load])

  React.useEffect(() => {
    if (!hasAccessToken()) return
    return notificationEvents.subscribe({
      onCreated: event =>
        setState(current =>
          applyCreated(current, event, { limit, page, isRead })
        ),
      onConnectionStateChange: setConnection,
      onReconnected: () => {
        void load()
      },
    })
  }, [load, limit, page, isRead])

  React.useEffect(() => {
    if (connection === 'connected' || !hasAccessToken()) return
    const timer = setInterval(() => {
      fetchUnreadCount()
        .then(unreadCount => setState(current => ({ ...current, unreadCount })))
        .catch((error: unknown) =>
          console.warn('Failed to poll unread notifications:', error)
        )
    }, POLL_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [connection])

  const markRead = React.useCallback(
    async (id: string): Promise<boolean> => {
      if (state.items.find(item => item._id === id)?.isRead) return true
      try {
        await markNotificationRead(id)
      } catch (error) {
        console.error('Failed to mark notification as read:', error)
        return false
      }
      setState(current => applyRead(current, id))
      return true
    },
    [state.items]
  )

  const markAllRead = React.useCallback(async (): Promise<boolean> => {
    try {
      await markAllNotificationsRead()
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error)
      return false
    }
    setState(current => ({
      ...current,
      items: current.items.map(item => ({ ...item, isRead: true })),
      unreadCount: 0,
    }))
    return true
  }, [])

  const remove = React.useCallback(async (id: string): Promise<boolean> => {
    try {
      await deleteNotification(id)
    } catch (error) {
      console.error('Failed to delete notification:', error)
      return false
    }
    setState(current => applyRemoved(current, id))
    return true
  }, [])

  return {
    items: state.items,
    total: state.total,
    totalPages: state.totalPages,
    unreadCount: state.unreadCount,
    // Khóa khác nghĩa là truy vấn mới (đổi trang/bộ lọc) chưa tải xong.
    status:
      state.queryKey === queryKeyOf({ limit, page, isRead })
        ? state.status
        : 'loading',
    errorKind: state.errorKind,
    connection,
    refresh: load,
    markRead,
    markAllRead,
    remove,
  }
}
