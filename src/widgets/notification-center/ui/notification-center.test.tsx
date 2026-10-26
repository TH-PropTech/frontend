import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiClientError } from '@/shared/api/api-client'
import { NotificationCenter } from './notification-center'

interface TestNotification {
  _id: string
  title: string
  body: string
  type: string
  data?: Record<string, unknown>
  isRead: boolean
  createdAt: string
}

interface RealtimeListener {
  onCreated?: (event: {
    notification: TestNotification
    unreadCount: number
  }) => void
}

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
  subscribe: vi.fn(),
  unsubscribe: vi.fn(),
  success: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
}))

vi.mock('@/shared/api/api-client', async importOriginal => {
  const actual =
    await importOriginal<typeof import('@/shared/api/api-client')>()
  return {
    ...actual,
    apiClient: { get: mocks.get, patch: mocks.patch, delete: mocks.delete },
  }
})

vi.mock('@/entities/notification/api/notification-events-client', () => ({
  notificationEvents: { subscribe: mocks.subscribe },
}))

vi.mock('sonner', () => ({
  toast: { success: mocks.success, error: mocks.error, info: mocks.info },
}))

let realtime: RealtimeListener = {}

function item(overrides: Partial<TestNotification> = {}): TestNotification {
  return {
    _id: 'n1',
    title: 'Thông báo',
    body: 'Nội dung',
    type: 'OTHER',
    isRead: false,
    createdAt: new Date().toISOString(),
    ...overrides,
  }
}

interface ServeOptions {
  unread?: number
  total?: number
  totalPages?: number
}

function serve(items: TestNotification[], options: ServeOptions = {}): void {
  mocks.get.mockImplementation((path: string) =>
    Promise.resolve(
      path === '/notifications/unread-count'
        ? { count: options.unread ?? items.filter(n => !n.isRead).length }
        : {
            items,
            total: options.total ?? items.length,
            page: 1,
            limit: 20,
            totalPages: options.totalPages ?? 1,
          }
    )
  )
}

async function renderCenter(): Promise<void> {
  render(<NotificationCenter />)
  await waitFor(() =>
    expect(screen.queryByText('Đang tải thông báo...')).not.toBeInTheDocument()
  )
}

function listPaths(): string[] {
  return mocks.get.mock.calls
    .map(call => String(call[0]))
    .filter(path => path.startsWith('/notifications?'))
}

describe('NotificationCenter', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.localStorage.setItem('accessToken', 'token')
    Object.values(mocks).forEach(mock => mock.mockReset())
    realtime = {}
    mocks.subscribe.mockImplementation((listener: RealtimeListener) => {
      realtime = listener
      return mocks.unsubscribe
    })
    mocks.patch.mockResolvedValue({})
    mocks.delete.mockResolvedValue({ success: true })
    serve([])
  })

  describe('danh sách', () => {
    it('lấy trang 1 với 20 mục và nhóm theo ngày', async () => {
      serve([item({ _id: 'n1', title: 'Mới nhất' })])

      await renderCenter()

      expect(listPaths()).toEqual(['/notifications?page=1&limit=20'])
      expect(
        screen.getByRole('heading', { level: 2, name: 'Hôm nay' })
      ).toBeInTheDocument()
      expect(screen.getByText('Mới nhất')).toBeInTheDocument()
    })

    it('hiện trạng thái đang tải', () => {
      mocks.get.mockReturnValue(new Promise(() => undefined))

      render(<NotificationCenter />)

      expect(screen.getByText('Đang tải thông báo...')).toBeInTheDocument()
    })

    it('hiện trạng thái rỗng', async () => {
      await renderCenter()

      expect(screen.getByText('Bạn chưa có thông báo nào.')).toBeInTheDocument()
    })

    it('tóm tắt số chưa đọc ở đầu trang', async () => {
      serve([item()], { unread: 5 })

      await renderCenter()

      expect(
        screen.getByText('Bạn có 5 thông báo chưa đọc')
      ).toBeInTheDocument()
    })

    it('báo đã đọc hết khi không còn chưa đọc', async () => {
      serve([item({ isRead: true })], { unread: 0 })

      await renderCenter()

      expect(screen.getByText('Bạn đã đọc hết thông báo')).toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: 'Đọc tất cả' })
      ).not.toBeInTheDocument()
    })
  })

  describe('lỗi', () => {
    it('hiện lỗi mạng kèm nút thử lại và tải lại khi bấm', async () => {
      mocks.get.mockRejectedValue(new ApiClientError('offline', 0, null))
      render(<NotificationCenter />)
      expect(
        await screen.findByText(/Không thể kết nối máy chủ thông báo/)
      ).toBeInTheDocument()

      serve([item({ title: 'Đã có lại' })])
      fireEvent.click(screen.getByRole('button', { name: 'Thử lại' }))

      expect(await screen.findByText('Đã có lại')).toBeInTheDocument()
      expect(
        screen.queryByText(/Không thể kết nối máy chủ thông báo/)
      ).not.toBeInTheDocument()
    })

    it('báo phiên đăng nhập hết hạn khi bị 401', async () => {
      mocks.get.mockRejectedValue(new ApiClientError('Unauthorized', 401, null))

      render(<NotificationCenter />)

      expect(
        await screen.findByText(/Phiên đăng nhập không còn hợp lệ/)
      ).toBeInTheDocument()
    })
  })

  describe('bộ lọc', () => {
    it('có tablist với tab đang chọn là "Tất cả"', async () => {
      await renderCenter()

      const tabs = within(screen.getByRole('tablist')).getAllByRole('tab')
      expect(tabs.map(tab => tab.textContent)).toEqual(['Tất cả', 'Chưa đọc'])
      expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
      expect(tabs[1]).toHaveAttribute('aria-selected', 'false')
    })

    it('chọn "Chưa đọc" tải lại với isRead=false từ trang 1', async () => {
      serve([item()], { totalPages: 3 })
      await renderCenter()
      fireEvent.click(screen.getByRole('button', { name: 'Trang sau' }))
      await waitFor(() =>
        expect(listPaths()).toContain('/notifications?page=2&limit=20')
      )

      fireEvent.click(screen.getByRole('tab', { name: 'Chưa đọc' }))

      await waitFor(() =>
        expect(listPaths()).toContain(
          '/notifications?page=1&limit=20&isRead=false'
        )
      )
      expect(screen.getByRole('tab', { name: 'Chưa đọc' })).toHaveAttribute(
        'aria-selected',
        'true'
      )
    })

    it('lọc chưa đọc mà rỗng thì báo riêng', async () => {
      await renderCenter()

      fireEvent.click(screen.getByRole('tab', { name: 'Chưa đọc' }))

      expect(
        await screen.findByText('Không có thông báo chưa đọc.')
      ).toBeInTheDocument()
    })
  })

  describe('phân trang', () => {
    it('chuyển trang và vô hiệu hóa nút ở hai đầu', async () => {
      serve([item()], { totalPages: 2 })
      await renderCenter()
      expect(screen.getByText('Trang 1 / 2')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Trang trước' })).toBeDisabled()

      fireEvent.click(screen.getByRole('button', { name: 'Trang sau' }))

      await waitFor(() =>
        expect(listPaths()).toContain('/notifications?page=2&limit=20')
      )
      expect(await screen.findByText('Trang 2 / 2')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Trang sau' })).toBeDisabled()
    })

    it('một trang thì không hiện phân trang', async () => {
      serve([item()], { totalPages: 1 })

      await renderCenter()

      expect(
        screen.queryByRole('navigation', { name: 'Phân trang thông báo' })
      ).not.toBeInTheDocument()
    })
  })

  describe('thao tác', () => {
    it('bấm thông báo đánh dấu đã đọc bằng PATCH', async () => {
      serve([item({ _id: 'n1', title: 'Cần đọc' })])
      await renderCenter()

      fireEvent.click(screen.getByRole('button', { name: /Cần đọc/ }))

      await waitFor(() =>
        expect(mocks.patch).toHaveBeenCalledWith('/notifications/n1/read', {})
      )
    })

    it('"Đọc tất cả" dùng PATCH và báo thành công', async () => {
      serve([item({ _id: 'n1' }), item({ _id: 'n2' })])
      await renderCenter()

      fireEvent.click(screen.getByRole('button', { name: 'Đọc tất cả' }))

      await waitFor(() =>
        expect(mocks.patch).toHaveBeenCalledWith('/notifications/read-all', {})
      )
      await waitFor(() =>
        expect(mocks.success).toHaveBeenCalledWith(
          'Đã đánh dấu tất cả là đã đọc'
        )
      )
    })

    it('xóa: gọi DELETE, báo thành công và bỏ mục khỏi danh sách', async () => {
      serve([
        item({ _id: 'n1', title: 'Sẽ xóa' }),
        item({ _id: 'n2', title: 'Giữ lại' }),
      ])
      await renderCenter()
      const card = screen.getByText('Sẽ xóa').closest('li')
      if (!card) throw new Error('Không tìm thấy thẻ thông báo')

      fireEvent.click(
        within(card).getByRole('button', { name: 'Xóa thông báo' })
      )

      await waitFor(() =>
        expect(mocks.delete).toHaveBeenCalledWith('/notifications/n1')
      )
      await waitFor(() =>
        expect(screen.queryByText('Sẽ xóa')).not.toBeInTheDocument()
      )
      expect(screen.getByText('Giữ lại')).toBeInTheDocument()
      expect(mocks.success).toHaveBeenCalledWith('Đã xóa thông báo')
    })

    it('xóa thất bại: báo lỗi và giữ nguyên mục', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => undefined)
      mocks.delete.mockRejectedValue(new Error('500'))
      serve([item({ _id: 'n1', title: 'Vẫn còn' })])
      await renderCenter()

      fireEvent.click(screen.getByRole('button', { name: 'Xóa thông báo' }))

      await waitFor(() =>
        expect(mocks.error).toHaveBeenCalledWith(
          'Không thể xóa thông báo. Vui lòng thử lại.'
        )
      )
      expect(screen.getByText('Vẫn còn')).toBeInTheDocument()
    })

    it('xóa mục cuối của trang 2 thì quay về trang 1', async () => {
      serve([item({ _id: 'only', title: 'Mục cuối' })], { totalPages: 2 })
      await renderCenter()
      fireEvent.click(screen.getByRole('button', { name: 'Trang sau' }))
      await screen.findByText('Trang 2 / 2')
      // Trang 2 tải xong mới có thẻ để xóa.
      const deleteButton = await screen.findByRole('button', {
        name: 'Xóa thông báo',
      })
      mocks.get.mockClear()
      serve([item({ _id: 'p1', title: 'Trang đầu' })], { totalPages: 1 })

      fireEvent.click(deleteButton)

      await waitFor(() =>
        expect(listPaths()).toContain('/notifications?page=1&limit=20')
      )
      expect(await screen.findByText('Trang đầu')).toBeInTheDocument()
    })
  })

  describe('yêu cầu đặt lịch và realtime', () => {
    it('đồng ý lịch hẹn ngay trên trang', async () => {
      serve([
        item({
          _id: 'n1',
          title: 'Có người muốn xem nhà',
          type: 'BOOKING',
          data: { bookingId: 'B1' },
        }),
      ])
      await renderCenter()

      fireEvent.click(screen.getByRole('button', { name: /Đồng ý/ }))

      await waitFor(() =>
        expect(mocks.patch).toHaveBeenCalledWith('/bookings/B1/status', {
          status: 'confirmed',
        })
      )
    })

    it('thông báo mới hiện ở đầu trang 1 không cần tải lại', async () => {
      serve([item({ _id: 'old', title: 'Cũ', isRead: true })], { unread: 0 })
      await renderCenter()

      act(() =>
        realtime.onCreated?.({
          notification: item({ _id: 'new', title: 'Vừa đến' }),
          unreadCount: 1,
        })
      )

      expect(await screen.findByText('Vừa đến')).toBeInTheDocument()
      expect(
        screen.getByText('Bạn có 1 thông báo chưa đọc')
      ).toBeInTheDocument()
    })
  })
})
