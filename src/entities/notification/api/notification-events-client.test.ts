import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  createNotificationEventsClient,
  type NotificationConnectionState,
} from './notification-events-client'

class FakeWebSocket {
  static readonly instances: FakeWebSocket[] = []
  static readonly CONNECTING = 0
  static readonly OPEN = 1

  readonly send = vi.fn()
  readonly close = vi.fn(() => {
    this.readyState = 3
  })
  readyState = 0
  onopen: (() => void) | null = null
  onclose: (() => void) | null = null
  onerror: (() => void) | null = null
  onmessage: ((event: MessageEvent<string>) => void) | null = null

  constructor(readonly url: string) {
    FakeWebSocket.instances.push(this)
  }

  open(): void {
    this.readyState = FakeWebSocket.OPEN
    this.onopen?.()
  }

  disconnect(): void {
    this.readyState = 3
    this.onclose?.()
  }

  receive(data: unknown): void {
    this.onmessage?.({ data: JSON.stringify(data) } as MessageEvent<string>)
  }
}

const createdMessage = {
  event: 'notification.created',
  data: {
    unreadCount: 4,
    notification: {
      _id: 'n1',
      title: 'Có lịch hẹn mới',
      body: 'Nội dung',
      type: 'BOOKING',
      isRead: false,
      data: { bookingId: 'B1' },
      createdAt: '2026-10-25T03:00:00.000Z',
    },
  },
}

function createClient(token: string | null = 'secret-access-token') {
  return createNotificationEventsClient({
    apiUrl: 'https://api.example.com/api/v1',
    getAccessToken: () => token,
  })
}

function lastSocket(): FakeWebSocket {
  const socket = FakeWebSocket.instances.at(-1)
  if (!socket) throw new Error('Chưa có socket nào được tạo')
  return socket
}

describe('notification events client', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    FakeWebSocket.instances.length = 0
    vi.stubGlobal('WebSocket', FakeWebSocket)
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('xác thực bằng message, không đưa token vào URL', () => {
    const client = createClient()

    client.subscribe({})
    const socket = lastSocket()
    socket.open()

    expect(socket.url).toBe('wss://api.example.com/ws/notifications')
    expect(socket.url).not.toContain('secret-access-token')
    expect(socket.send).toHaveBeenCalledWith(
      JSON.stringify({ event: 'auth', data: { token: 'secret-access-token' } })
    )
  })

  it('báo trạng thái kết nối và cho người nghe đến sau biết trạng thái hiện tại', () => {
    const client = createClient()
    const early: NotificationConnectionState[] = []
    const late: NotificationConnectionState[] = []

    client.subscribe({ onConnectionStateChange: state => early.push(state) })
    lastSocket().open()
    client.subscribe({ onConnectionStateChange: state => late.push(state) })

    expect(early).toEqual(['connecting', 'connected'])
    expect(late).toEqual(['connected'])
  })

  it('chuyển sự kiện notification.created cho người nghe', () => {
    const client = createClient()
    const onCreated = vi.fn()
    client.subscribe({ onCreated })
    lastSocket().open()

    lastSocket().receive(createdMessage)

    expect(onCreated).toHaveBeenCalledWith(createdMessage.data)
  })

  it.each([
    ['sự kiện không biết', { event: 'other', data: {} }],
    [
      'thiếu unreadCount',
      {
        event: 'notification.created',
        data: { notification: createdMessage.data.notification },
      },
    ],
    [
      'thông báo thiếu _id',
      {
        event: 'notification.created',
        data: { unreadCount: 1, notification: { title: 'x' } },
      },
    ],
    ['không phải object', 'chuỗi'],
  ])('bỏ qua message không hợp lệ: %s', (_name, message) => {
    const client = createClient()
    const onCreated = vi.fn()
    client.subscribe({ onCreated })
    lastSocket().open()

    lastSocket().receive(message)

    expect(onCreated).not.toHaveBeenCalled()
  })

  it('bỏ qua message không phải JSON và không ném lỗi', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    const client = createClient()
    const onCreated = vi.fn()
    client.subscribe({ onCreated })
    const socket = lastSocket()
    socket.open()

    expect(() =>
      socket.onmessage?.({ data: '{not json' } as MessageEvent<string>)
    ).not.toThrow()
    expect(onCreated).not.toHaveBeenCalled()
  })

  it('nhiều người nghe dùng chung một socket, đóng khi người cuối rời đi', () => {
    const client = createClient()
    const first = vi.fn()
    const second = vi.fn()

    const stopFirst = client.subscribe({ onCreated: first })
    const stopSecond = client.subscribe({ onCreated: second })
    lastSocket().open()
    lastSocket().receive(createdMessage)

    expect(FakeWebSocket.instances).toHaveLength(1)
    expect(first).toHaveBeenCalledTimes(1)
    expect(second).toHaveBeenCalledTimes(1)

    stopFirst()
    expect(lastSocket().close).not.toHaveBeenCalled()
    lastSocket().receive(createdMessage)
    expect(first).toHaveBeenCalledTimes(1)
    expect(second).toHaveBeenCalledTimes(2)

    stopSecond()
    expect(lastSocket().close).toHaveBeenCalledTimes(1)
  })

  it('tự kết nối lại sau khi mất kết nối và báo onReconnected', () => {
    const client = createClient()
    const onReconnected = vi.fn()
    client.subscribe({ onReconnected })
    lastSocket().open()
    expect(onReconnected).not.toHaveBeenCalled()

    lastSocket().disconnect()
    vi.advanceTimersByTime(1_000)
    expect(FakeWebSocket.instances).toHaveLength(2)
    lastSocket().open()

    expect(onReconnected).toHaveBeenCalledTimes(1)
  })

  it('tăng dần thời gian chờ rồi giữ nguyên mức tối đa, không bỏ cuộc', () => {
    const client = createClient()
    client.subscribe({})
    const delays = [1_000, 2_000, 5_000, 10_000, 10_000, 10_000]

    for (const [index, delay] of delays.entries()) {
      lastSocket().disconnect()
      vi.advanceTimersByTime(delay - 1)
      expect(FakeWebSocket.instances).toHaveLength(index + 1)
      vi.advanceTimersByTime(1)
      expect(FakeWebSocket.instances).toHaveLength(index + 2)
    }
  })

  it('không có token: đóng socket, không gửi auth và không kết nối lại', () => {
    const client = createClient(null)
    client.subscribe({})
    const socket = lastSocket()

    socket.open()
    vi.advanceTimersByTime(60_000)

    expect(socket.send).not.toHaveBeenCalled()
    expect(socket.close).toHaveBeenCalled()
    expect(FakeWebSocket.instances).toHaveLength(1)
  })

  it('không kết nối lại sau khi người nghe cuối rời đi', () => {
    const client = createClient()
    const stop = client.subscribe({})
    lastSocket().open()

    stop()
    vi.advanceTimersByTime(60_000)

    expect(FakeWebSocket.instances).toHaveLength(1)
  })

  describe('reconnectIfIdle', () => {
    it('kết nối lại sau khi đăng nhập xong nếu trước đó chưa có token', () => {
      let token: string | null = null
      const client = createNotificationEventsClient({
        apiUrl: 'https://api.example.com/api/v1',
        getAccessToken: () => token,
      })
      client.subscribe({})
      lastSocket().open()
      expect(FakeWebSocket.instances).toHaveLength(1)

      token = 'fresh-token'
      client.reconnectIfIdle()
      const socket = lastSocket()
      socket.open()

      expect(FakeWebSocket.instances).toHaveLength(2)
      expect(socket.send).toHaveBeenCalledWith(
        JSON.stringify({ event: 'auth', data: { token: 'fresh-token' } })
      )
    })

    it('không tạo thêm socket khi đang kết nối', () => {
      const client = createClient()
      client.subscribe({})
      lastSocket().open()

      client.reconnectIfIdle()

      expect(FakeWebSocket.instances).toHaveLength(1)
    })

    it('không làm gì khi chưa có người nghe nào', () => {
      const client = createClient()

      client.reconnectIfIdle()

      expect(FakeWebSocket.instances).toHaveLength(0)
    })
  })
})
