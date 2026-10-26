import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type {
  NotificationCreatedEvent,
  NotificationEventsListener,
} from '../api/notification-events-client'
import type { NotificationItem } from '../api/notifications-api'
import { useNotificationToasts } from './use-notification-toasts'

const mocks = vi.hoisted(() => ({
  toast: vi.fn(),
  push: vi.fn(),
  pathname: '/',
  subscribe: vi.fn(),
  unsubscribe: vi.fn(),
  reconnectIfIdle: vi.fn(),
}))

vi.mock('sonner', () => ({ toast: mocks.toast }))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mocks.push }),
  usePathname: () => mocks.pathname,
}))

vi.mock('../api/notification-events-client', () => ({
  notificationEvents: {
    subscribe: mocks.subscribe,
    reconnectIfIdle: mocks.reconnectIfIdle,
  },
}))

function item(overrides: Partial<NotificationItem> = {}): NotificationItem {
  return {
    _id: 'n1',
    title: 'Có lịch hẹn mới',
    body: 'Khách muốn xem căn hộ A1',
    type: 'OTHER',
    isRead: false,
    createdAt: '2026-10-25T03:00:00.000Z',
    ...overrides,
  }
}

let listener: NotificationEventsListener = {}

function emitCreated(notification: NotificationItem): void {
  const event: NotificationCreatedEvent = { notification, unreadCount: 1 }
  listener.onCreated?.(event)
}

type ToastOptions = {
  id: string
  description: string
  duration: number
  action: { label: string; onClick: () => void }
}

function lastToastOptions(): ToastOptions {
  const call = mocks.toast.mock.calls.at(-1)
  if (!call) throw new Error('Chưa có toast nào được hiển thị')
  return call[1] as ToastOptions
}

describe('useNotificationToasts', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.localStorage.setItem('accessToken', 'token')
    mocks.toast.mockReset()
    mocks.push.mockReset()
    mocks.subscribe.mockReset()
    mocks.unsubscribe.mockReset()
    mocks.reconnectIfIdle.mockReset()
    mocks.pathname = '/'
    listener = {}
    mocks.subscribe.mockImplementation((next: NotificationEventsListener) => {
      listener = next
      return mocks.unsubscribe
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('hiện toast có tiêu đề, nội dung và id theo thông báo khi có thông báo mới', () => {
    renderHook(() => useNotificationToasts())

    emitCreated(item())

    expect(mocks.toast).toHaveBeenCalledWith(
      'Có lịch hẹn mới',
      expect.objectContaining({
        id: 'n1',
        description: 'Khách muốn xem căn hộ A1',
      })
    )
  })

  it('toast ở lại đủ lâu để người dùng kịp thấy (>= 8 giây)', () => {
    renderHook(() => useNotificationToasts())

    emitCreated(item())

    expect(lastToastOptions().duration).toBeGreaterThanOrEqual(8_000)
  })

  it('nút "Xem" đi tới trang thông báo khi thông báo không có liên kết riêng', () => {
    renderHook(() => useNotificationToasts())
    emitCreated(item())

    expect(lastToastOptions().action.label).toBe('Xem')
    lastToastOptions().action.onClick()

    expect(mocks.push).toHaveBeenCalledWith('/notifications')
  })

  it('nút "Xem" đi thẳng tới liên kết nội bộ của thông báo', () => {
    renderHook(() => useNotificationToasts())
    emitCreated(
      item({
        type: 'PAYOUT_PENDING',
        data: { link: '/profile/payouts/p1' },
      })
    )

    lastToastOptions().action.onClick()

    expect(mocks.push).toHaveBeenCalledWith('/profile/payouts/p1')
  })

  it('không đi tới liên kết ngoài, quay về trang thông báo', () => {
    renderHook(() => useNotificationToasts())
    emitCreated(
      item({
        type: 'PAYOUT_PENDING',
        data: { link: 'https://evil.example.com' },
      })
    )

    lastToastOptions().action.onClick()

    expect(mocks.push).toHaveBeenCalledWith('/notifications')
  })

  it('không đăng ký nghe khi chưa đăng nhập', () => {
    window.localStorage.clear()

    renderHook(() => useNotificationToasts())

    expect(mocks.subscribe).not.toHaveBeenCalled()
  })

  it('đăng ký nghe khi đã có token sau lần điều hướng kế tiếp (đăng nhập không tải lại trang)', () => {
    window.localStorage.clear()
    const { rerender } = renderHook(() => useNotificationToasts())
    expect(mocks.subscribe).not.toHaveBeenCalled()

    window.localStorage.setItem('accessToken', 'token')
    mocks.pathname = '/profile'
    rerender()

    expect(mocks.subscribe).toHaveBeenCalledTimes(1)
  })

  it('điều hướng khi đã đăng ký: thử nối lại socket nếu đang rảnh, không đăng ký trùng', () => {
    const { rerender } = renderHook(() => useNotificationToasts())
    expect(mocks.subscribe).toHaveBeenCalledTimes(1)

    mocks.pathname = '/profile'
    rerender()

    expect(mocks.subscribe).toHaveBeenCalledTimes(1)
    expect(mocks.reconnectIfIdle).toHaveBeenCalledTimes(1)
  })

  it('đăng xuất (mất token) thì hủy đăng ký ở lần điều hướng kế tiếp', () => {
    const { rerender } = renderHook(() => useNotificationToasts())

    window.localStorage.clear()
    mocks.pathname = '/login'
    rerender()

    expect(mocks.unsubscribe).toHaveBeenCalledTimes(1)
  })

  it('hủy đăng ký khi unmount', () => {
    const { unmount } = renderHook(() => useNotificationToasts())

    unmount()

    expect(mocks.unsubscribe).toHaveBeenCalledTimes(1)
  })
})
