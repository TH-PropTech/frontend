import { env } from '@/shared/config/env'
import type { NotificationItem } from './notifications-api'

export type NotificationConnectionState =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'disconnected'

export type NotificationCreatedEvent = Readonly<{
  notification: NotificationItem
  unreadCount: number
}>

export interface NotificationEventsListener {
  onCreated?: (event: NotificationCreatedEvent) => void
  onConnectionStateChange?: (state: NotificationConnectionState) => void
  /** Gọi sau khi kết nối lại thành công; nơi nghe nên đồng bộ lại dữ liệu đã lỡ. */
  onReconnected?: () => void
}

export interface NotificationEventsClientOptions {
  apiUrl?: string
  getAccessToken?: () => string | null
}

export interface NotificationEventsClient {
  /** Trả về hàm hủy đăng ký. Socket dùng chung và đóng khi người nghe cuối rời đi. */
  subscribe(listener: NotificationEventsListener): () => void
  /**
   * Thử kết nối lại khi socket đang ở trạng thái `idle` (ví dụ lúc mount chưa
   * đăng nhập, sau đó mới có token). Không làm gì nếu đang kết nối hoặc chưa
   * có người nghe.
   */
  reconnectIfIdle(): void
}

/** Mức chờ cuối cùng được giữ nguyên: không bao giờ bỏ cuộc kết nối lại. */
const RECONNECT_DELAYS_MS = [1_000, 2_000, 5_000, 10_000] as const

function defaultAccessToken(): string | null {
  return typeof window === 'undefined'
    ? null
    : window.localStorage.getItem('accessToken')
}

function createWebSocketUrl(apiUrl: string): string {
  const url = new URL(apiUrl)
  url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:'
  url.pathname = '/ws/notifications'
  url.search = ''
  url.hash = ''
  return url.toString().replace(/\/$/, '')
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isNotificationItem(value: unknown): value is NotificationItem {
  return (
    isRecord(value) &&
    typeof value._id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.body === 'string' &&
    typeof value.type === 'string' &&
    typeof value.isRead === 'boolean' &&
    typeof value.createdAt === 'string'
  )
}

function parseCreatedEvent(message: unknown): NotificationCreatedEvent | null {
  if (!isRecord(message) || message.event !== 'notification.created') {
    return null
  }
  const { data } = message
  if (
    !isRecord(data) ||
    typeof data.unreadCount !== 'number' ||
    !isNotificationItem(data.notification)
  ) {
    return null
  }
  return { notification: data.notification, unreadCount: data.unreadCount }
}

class BrowserNotificationEventsClient implements NotificationEventsClient {
  private readonly listeners = new Set<NotificationEventsListener>()
  private readonly getAccessToken: () => string | null
  private socket: WebSocket | undefined
  private reconnectTimer: ReturnType<typeof setTimeout> | undefined
  private reconnectAttempt = 0
  private state: NotificationConnectionState = 'idle'

  constructor(private readonly options: NotificationEventsClientOptions) {
    this.getAccessToken = options.getAccessToken ?? defaultAccessToken
  }

  subscribe(listener: NotificationEventsListener): () => void {
    this.listeners.add(listener)
    if (this.state !== 'idle') listener.onConnectionStateChange?.(this.state)
    this.connect()
    return () => {
      this.listeners.delete(listener)
      if (this.listeners.size === 0) this.disconnectIdle()
    }
  }

  reconnectIfIdle(): void {
    if (this.state === 'idle' && this.listeners.size > 0) this.connect()
  }

  private connect(): void {
    const { socket } = this
    if (
      socket !== undefined &&
      (socket.readyState === WebSocket.OPEN ||
        socket.readyState === WebSocket.CONNECTING)
    ) {
      return
    }

    this.setState('connecting')
    const next = new WebSocket(
      createWebSocketUrl(this.options.apiUrl ?? env.apiUrl)
    )
    this.socket = next
    next.onopen = () => this.handleOpen(next)
    next.onmessage = event => this.handleMessage(event.data)
    next.onerror = () => this.setState('disconnected')
    next.onclose = () => this.handleClose(next)
  }

  private handleOpen(socket: WebSocket): void {
    if (socket !== this.socket) return
    const token = this.getAccessToken()
    if (!token) {
      // Chưa đăng nhập: gỡ socket trước khi đóng để onclose không kết nối lại.
      this.socket = undefined
      socket.close()
      this.setState('idle')
      return
    }

    const reconnected = this.reconnectAttempt > 0
    socket.send(JSON.stringify({ event: 'auth', data: { token } }))
    this.reconnectAttempt = 0
    this.setState('connected')
    if (reconnected) this.emit(listener => listener.onReconnected?.())
  }

  private handleClose(socket: WebSocket): void {
    if (socket !== this.socket) return
    this.socket = undefined
    if (this.listeners.size === 0) return
    this.setState('disconnected')
    this.scheduleReconnect()
  }

  private scheduleReconnect(): void {
    const index = Math.min(
      this.reconnectAttempt,
      RECONNECT_DELAYS_MS.length - 1
    )
    this.reconnectAttempt += 1
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = undefined
      if (this.listeners.size > 0) this.connect()
    }, RECONNECT_DELAYS_MS[index])
  }

  private handleMessage(raw: unknown): void {
    if (typeof raw !== 'string') return
    let message: unknown
    try {
      message = JSON.parse(raw)
    } catch {
      console.warn('Ignored an invalid notification realtime message')
      return
    }
    const event = parseCreatedEvent(message)
    if (event) this.emit(listener => listener.onCreated?.(event))
  }

  private disconnectIdle(): void {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer)
    this.reconnectTimer = undefined
    this.reconnectAttempt = 0
    const { socket } = this
    this.socket = undefined
    socket?.close()
    this.state = 'idle'
  }

  private setState(state: NotificationConnectionState): void {
    if (state === this.state) return
    this.state = state
    this.emit(listener => listener.onConnectionStateChange?.(state))
  }

  private emit(notify: (listener: NotificationEventsListener) => void): void {
    for (const listener of [...this.listeners]) notify(listener)
  }
}

export function createNotificationEventsClient(
  options: NotificationEventsClientOptions = {}
): NotificationEventsClient {
  return new BrowserNotificationEventsClient(options)
}

/** Một socket dùng chung cho chuông và trang thông báo. */
export const notificationEvents = createNotificationEventsClient()
