import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiClientError } from '@/shared/api/api-client'
import type {
  NotificationEventsListener,
  NotificationCreatedEvent,
} from '../api/notification-events-client'
import type { NotificationItem } from '../api/notifications-api'
import { useNotifications } from './use-notifications'

const mocks = vi.hoisted(() => ({
  fetchNotifications: vi.fn(),
  fetchUnreadCount: vi.fn(),
  markNotificationRead: vi.fn(),
  markAllNotificationsRead: vi.fn(),
  deleteNotification: vi.fn(),
  subscribe: vi.fn(),
  unsubscribe: vi.fn(),
}))

vi.mock('../api/notifications-api', () => ({
  fetchNotifications: mocks.fetchNotifications,
  fetchUnreadCount: mocks.fetchUnreadCount,
  markNotificationRead: mocks.markNotificationRead,
  markAllNotificationsRead: mocks.markAllNotificationsRead,
  deleteNotification: mocks.deleteNotification,
}))

vi.mock('../api/notification-events-client', () => ({
  notificationEvents: { subscribe: mocks.subscribe },
}))

function item(id: string, overrides: Partial<NotificationItem> = {}) {
  return {
    _id: id,
    title: `Tiêu đề ${id}`,
    body: 'Nội dung',
    type: 'OTHER',
    isRead: false,
    createdAt: '2026-10-25T03:00:00.000Z',
    ...overrides,
  } satisfies NotificationItem
}

function list(items: NotificationItem[], total = items.length) {
  return { items, total, page: 1, limit: 10, totalPages: 1 }
}

function created(id: string, unreadCount: number): NotificationCreatedEvent {
  return { notification: item(id), unreadCount }
}

let listener: NotificationEventsListener = {}

function emit(run: (target: NotificationEventsListener) => void): void {
  act(() => run(listener))
}

describe('useNotifications', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.localStorage.setItem('accessToken', 'token')
    Object.values(mocks).forEach(mock => mock.mockReset())
    listener = {}
    mocks.subscribe.mockImplementation((next: NotificationEventsListener) => {
      listener = next
      return mocks.unsubscribe
    })
    mocks.fetchNotifications.mockResolvedValue(list([item('n1'), item('n2')]))
    mocks.fetchUnreadCount.mockResolvedValue(2)
    mocks.markNotificationRead.mockResolvedValue({})
    mocks.markAllNotificationsRead.mockResolvedValue({ success: true })
    mocks.deleteNotification.mockResolvedValue({ success: true })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('nạp danh sách và tổng số chưa đọc khi mount', async () => {
    mocks.fetchUnreadCount.mockResolvedValue(35)

    const { result } = renderHook(() => useNotifications({ limit: 10 }))

    expect(result.current.status).toBe('loading')
    await waitFor(() => expect(result.current.status).toBe('ready'))
    expect(mocks.fetchNotifications).toHaveBeenCalledWith({ limit: 10 })
    expect(result.current.items).toHaveLength(2)
    expect(result.current.unreadCount).toBe(35)
  })

  it('đổi trang: báo loading cho tới khi dữ liệu trang mới về', async () => {
    const { result, rerender } = renderHook(
      ({ page }) => useNotifications({ limit: 10, page }),
      { initialProps: { page: 1 } }
    )
    await waitFor(() => expect(result.current.status).toBe('ready'))

    mocks.fetchNotifications.mockResolvedValue(list([item('p2')]))
    rerender({ page: 2 })

    expect(result.current.status).toBe('loading')
    await waitFor(() => expect(result.current.status).toBe('ready'))
    expect(result.current.items.map(n => n._id)).toEqual(['p2'])
  })

  it('đổi bộ lọc khi đang lỗi: báo loading thay vì giữ lỗi cũ', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
    mocks.fetchNotifications.mockRejectedValueOnce(
      new ApiClientError('boom', 500, null)
    )
    const { result, rerender } = renderHook(
      ({ isRead }) => useNotifications({ limit: 10, isRead }),
      { initialProps: { isRead: undefined as boolean | undefined } }
    )
    await waitFor(() => expect(result.current.status).toBe('error'))

    rerender({ isRead: false })

    expect(result.current.status).toBe('loading')
    await waitFor(() => expect(result.current.status).toBe('ready'))
  })

  it('chưa đăng nhập: không gọi API và không nghe realtime', async () => {
    window.localStorage.clear()

    const { result } = renderHook(() => useNotifications({ limit: 10 }))

    await waitFor(() => expect(result.current.status).toBe('ready'))
    expect(mocks.fetchNotifications).not.toHaveBeenCalled()
    expect(mocks.subscribe).not.toHaveBeenCalled()
    expect(result.current.items).toEqual([])
  })

  it.each([
    ['mạng', new ApiClientError('offline', 0, null), 'network'],
    ['401', new ApiClientError('Unauthorized', 401, null), 'auth'],
    ['403', new ApiClientError('Forbidden', 403, null), 'auth'],
    ['máy chủ', new ApiClientError('boom', 500, null), 'unknown'],
  ])('phân loại lỗi %s', async (_name, error, kind) => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
    mocks.fetchNotifications.mockRejectedValue(error)

    const { result } = renderHook(() => useNotifications({ limit: 10 }))

    await waitFor(() => expect(result.current.status).toBe('error'))
    expect(result.current.errorKind).toBe(kind)
  })

  it('tải lại thành công thì xóa trạng thái lỗi', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
    mocks.fetchNotifications.mockRejectedValueOnce(
      new ApiClientError('offline', 0, null)
    )
    const { result } = renderHook(() => useNotifications({ limit: 10 }))
    await waitFor(() => expect(result.current.status).toBe('error'))

    await act(() => result.current.refresh())

    expect(result.current.status).toBe('ready')
    expect(result.current.errorKind).toBeNull()
  })

  describe('realtime', () => {
    it('thêm thông báo mới lên đầu và lấy unreadCount từ máy chủ', async () => {
      const { result } = renderHook(() => useNotifications({ limit: 10 }))
      await waitFor(() => expect(result.current.status).toBe('ready'))

      emit(target => target.onCreated?.(created('n3', 9)))

      expect(result.current.items.map(n => n._id)).toEqual(['n3', 'n1', 'n2'])
      expect(result.current.unreadCount).toBe(9)
      expect(result.current.total).toBe(3)
    })

    it('cắt danh sách theo limit', async () => {
      mocks.fetchNotifications.mockResolvedValue(
        list([item('n1'), item('n2')], 2)
      )
      const { result } = renderHook(() => useNotifications({ limit: 2 }))
      await waitFor(() => expect(result.current.status).toBe('ready'))

      emit(target => target.onCreated?.(created('n3', 3)))

      expect(result.current.items.map(n => n._id)).toEqual(['n3', 'n1'])
    })

    it('không thêm trùng khi nhận lại cùng _id', async () => {
      const { result } = renderHook(() => useNotifications({ limit: 10 }))
      await waitFor(() => expect(result.current.status).toBe('ready'))

      emit(target => target.onCreated?.(created('n1', 5)))

      expect(result.current.items.map(n => n._id)).toEqual(['n1', 'n2'])
      expect(result.current.total).toBe(2)
      expect(result.current.unreadCount).toBe(5)
    })

    it.each([
      ['trang 2', { limit: 10, page: 2 }],
      ['lọc đã đọc', { limit: 10, isRead: true }],
    ])(
      '%s: chỉ cập nhật số chưa đọc, không chèn vào danh sách',
      async (_name, query) => {
        const { result } = renderHook(() => useNotifications(query))
        await waitFor(() => expect(result.current.status).toBe('ready'))

        emit(target => target.onCreated?.(created('n3', 7)))

        expect(result.current.items.map(n => n._id)).toEqual(['n1', 'n2'])
        expect(result.current.unreadCount).toBe(7)
      }
    )

    it('đồng bộ lại dữ liệu sau khi kết nối lại', async () => {
      const { result } = renderHook(() => useNotifications({ limit: 10 }))
      await waitFor(() => expect(result.current.status).toBe('ready'))
      mocks.fetchNotifications.mockClear()

      emit(target => target.onReconnected?.())

      await waitFor(() =>
        expect(mocks.fetchNotifications).toHaveBeenCalledTimes(1)
      )
    })

    it('phản ánh trạng thái kết nối và hủy đăng ký khi unmount', async () => {
      const { result, unmount } = renderHook(() =>
        useNotifications({ limit: 10 })
      )
      await waitFor(() => expect(result.current.status).toBe('ready'))

      emit(target => target.onConnectionStateChange?.('connected'))
      expect(result.current.connection).toBe('connected')

      unmount()
      expect(mocks.unsubscribe).toHaveBeenCalledTimes(1)
    })
  })

  describe('polling dự phòng', () => {
    // Phải bật fake timers trước khi mount để setInterval của hook là timer giả.
    beforeEach(() => {
      vi.useFakeTimers({ shouldAdvanceTime: true })
    })

    it('hỏi lại unread-count mỗi 60 giây khi chưa có kết nối', async () => {
      const { result } = renderHook(() => useNotifications({ limit: 10 }))
      await waitFor(() => expect(result.current.status).toBe('ready'))
      mocks.fetchUnreadCount.mockClear()
      mocks.fetchUnreadCount.mockResolvedValue(11)

      await act(() => vi.advanceTimersByTimeAsync(60_000))

      expect(mocks.fetchUnreadCount).toHaveBeenCalledTimes(1)
      expect(result.current.unreadCount).toBe(11)
    })

    it('không polling khi WebSocket đang kết nối', async () => {
      const { result } = renderHook(() => useNotifications({ limit: 10 }))
      await waitFor(() => expect(result.current.status).toBe('ready'))
      emit(target => target.onConnectionStateChange?.('connected'))
      mocks.fetchUnreadCount.mockClear()

      await act(() => vi.advanceTimersByTimeAsync(180_000))

      expect(mocks.fetchUnreadCount).not.toHaveBeenCalled()
    })

    it('lỗi khi polling không làm hỏng danh sách đang hiển thị', async () => {
      vi.spyOn(console, 'warn').mockImplementation(() => undefined)
      const { result } = renderHook(() => useNotifications({ limit: 10 }))
      await waitFor(() => expect(result.current.status).toBe('ready'))
      mocks.fetchUnreadCount.mockRejectedValue(new Error('offline'))

      await act(() => vi.advanceTimersByTimeAsync(60_000))

      expect(result.current.status).toBe('ready')
      expect(result.current.items).toHaveLength(2)
    })
  })

  describe('thao tác', () => {
    it('đánh dấu đã đọc: gọi API, cập nhật mục và giảm số chưa đọc', async () => {
      const { result } = renderHook(() => useNotifications({ limit: 10 }))
      await waitFor(() => expect(result.current.status).toBe('ready'))

      let ok = false
      await act(async () => {
        ok = await result.current.markRead('n1')
      })

      expect(ok).toBe(true)
      expect(mocks.markNotificationRead).toHaveBeenCalledWith('n1')
      expect(result.current.items.find(n => n._id === 'n1')?.isRead).toBe(true)
      expect(result.current.unreadCount).toBe(1)
    })

    it('mục đã đọc: không gọi API và không giảm số chưa đọc', async () => {
      mocks.fetchNotifications.mockResolvedValue(
        list([item('n1', { isRead: true })])
      )
      const { result } = renderHook(() => useNotifications({ limit: 10 }))
      await waitFor(() => expect(result.current.status).toBe('ready'))

      await act(async () => {
        await result.current.markRead('n1')
      })

      expect(mocks.markNotificationRead).not.toHaveBeenCalled()
      expect(result.current.unreadCount).toBe(2)
    })

    it('đánh dấu đã đọc thất bại: trả false và giữ nguyên trạng thái', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => undefined)
      mocks.markNotificationRead.mockRejectedValue(new Error('500'))
      const { result } = renderHook(() => useNotifications({ limit: 10 }))
      await waitFor(() => expect(result.current.status).toBe('ready'))

      let ok = true
      await act(async () => {
        ok = await result.current.markRead('n1')
      })

      expect(ok).toBe(false)
      expect(result.current.unreadCount).toBe(2)
      expect(result.current.items.find(n => n._id === 'n1')?.isRead).toBe(false)
    })

    it('đọc tất cả: đặt mọi mục đã đọc và số chưa đọc về 0', async () => {
      const { result } = renderHook(() => useNotifications({ limit: 10 }))
      await waitFor(() => expect(result.current.status).toBe('ready'))

      await act(async () => {
        await result.current.markAllRead()
      })

      expect(mocks.markAllNotificationsRead).toHaveBeenCalledTimes(1)
      expect(result.current.items.every(n => n.isRead)).toBe(true)
      expect(result.current.unreadCount).toBe(0)
    })

    it('đọc tất cả thất bại: trả false và không đổi số chưa đọc', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => undefined)
      mocks.markAllNotificationsRead.mockRejectedValue(new Error('404'))
      const { result } = renderHook(() => useNotifications({ limit: 10 }))
      await waitFor(() => expect(result.current.status).toBe('ready'))

      let ok = true
      await act(async () => {
        ok = await result.current.markAllRead()
      })

      expect(ok).toBe(false)
      expect(result.current.unreadCount).toBe(2)
    })

    it('xóa mục chưa đọc: bỏ khỏi danh sách, giảm total và số chưa đọc', async () => {
      const { result } = renderHook(() => useNotifications({ limit: 10 }))
      await waitFor(() => expect(result.current.status).toBe('ready'))

      await act(async () => {
        await result.current.remove('n1')
      })

      expect(mocks.deleteNotification).toHaveBeenCalledWith('n1')
      expect(result.current.items.map(n => n._id)).toEqual(['n2'])
      expect(result.current.total).toBe(1)
      expect(result.current.unreadCount).toBe(1)
    })

    it('xóa mục đã đọc: không đổi số chưa đọc', async () => {
      mocks.fetchNotifications.mockResolvedValue(
        list([item('n1', { isRead: true }), item('n2')])
      )
      const { result } = renderHook(() => useNotifications({ limit: 10 }))
      await waitFor(() => expect(result.current.status).toBe('ready'))

      await act(async () => {
        await result.current.remove('n1')
      })

      expect(result.current.unreadCount).toBe(2)
      expect(result.current.total).toBe(1)
    })

    it('xóa thất bại: trả false và giữ nguyên danh sách', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => undefined)
      mocks.deleteNotification.mockRejectedValue(new Error('500'))
      const { result } = renderHook(() => useNotifications({ limit: 10 }))
      await waitFor(() => expect(result.current.status).toBe('ready'))

      let ok = true
      await act(async () => {
        ok = await result.current.remove('n1')
      })

      expect(ok).toBe(false)
      expect(result.current.items).toHaveLength(2)
    })
  })
})
