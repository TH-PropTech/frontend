import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiClientError } from '@/shared/api/api-client'
import { NotificationBell } from './notification-bell'

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
  post: vi.fn(),
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
    apiClient: { get: mocks.get, patch: mocks.patch, post: mocks.post },
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

function serve(items: TestNotification[], unread?: number): void {
  mocks.get.mockImplementation((path: string) =>
    Promise.resolve(
      path === '/notifications/unread-count'
        ? { count: unread ?? items.filter(n => !n.isRead).length }
        : {
            items,
            total: items.length,
            page: 1,
            limit: 10,
            totalPages: 1,
          }
    )
  )
}

async function openBell(): Promise<void> {
  render(<NotificationBell isLightHeader />)
  fireEvent.click(screen.getByTitle('Thông báo'))
  await waitFor(() => expect(mocks.get).toHaveBeenCalled())
}

describe('NotificationBell', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.localStorage.setItem('accessToken', 'token')
    window.localStorage.setItem('user', JSON.stringify({ id: 'user-1' }))
    Object.values(mocks).forEach(mock => mock.mockReset())
    realtime = {}
    mocks.subscribe.mockImplementation((listener: RealtimeListener) => {
      realtime = listener
      return mocks.unsubscribe
    })
    mocks.patch.mockResolvedValue({})
    serve([])
  })

  describe('trạng thái', () => {
    it('báo lỗi mạng có thể phục hồi', async () => {
      mocks.get.mockRejectedValue(
        new ApiClientError('Không thể kết nối tới máy chủ API', 0, null)
      )

      await openBell()

      expect(
        await screen.findByText(/Không thể kết nối máy chủ thông báo/i)
      ).toBeInTheDocument()
      expect(
        screen.queryByText('Bạn chưa có thông báo nào.')
      ).not.toBeInTheDocument()
    })

    it('báo phiên đăng nhập hết hạn khi bị 401', async () => {
      mocks.get.mockRejectedValue(new ApiClientError('Unauthorized', 401, null))

      await openBell()

      expect(
        await screen.findByText(/Phiên đăng nhập không còn hợp lệ/i)
      ).toBeInTheDocument()
    })

    it('hiện trạng thái đang tải trước khi có dữ liệu', async () => {
      mocks.get.mockReturnValue(new Promise(() => undefined))

      await openBell()

      expect(screen.getByText('Đang tải thông báo...')).toBeInTheDocument()
    })

    it('hiện trạng thái rỗng khi chưa có thông báo', async () => {
      await openBell()

      expect(
        await screen.findByText('Bạn chưa có thông báo nào.')
      ).toBeInTheDocument()
    })
  })

  describe('badge chưa đọc', () => {
    it('lấy tổng chưa đọc từ máy chủ, không đếm trong 10 tin đang hiện', async () => {
      serve([item()], 35)

      render(<NotificationBell isLightHeader />)

      expect(await screen.findByText('35')).toBeInTheDocument()
    })

    it('rút gọn thành 99+ khi quá nhiều', async () => {
      serve([item()], 120)

      render(<NotificationBell isLightHeader />)

      expect(await screen.findByText('99+')).toBeInTheDocument()
    })

    it('không hiện badge khi không còn thông báo chưa đọc', async () => {
      serve([item({ isRead: true })], 0)

      await openBell()
      await screen.findByText('Thông báo')

      expect(screen.queryByText('0')).not.toBeInTheDocument()
    })

    it('mô tả số chưa đọc cho trình đọc màn hình', async () => {
      serve([item()], 3)

      render(<NotificationBell isLightHeader />)

      expect(
        await screen.findByRole('button', { name: 'Thông báo, 3 chưa đọc' })
      ).toBeInTheDocument()
    })
  })

  describe('liên kết theo loại', () => {
    it('mở trang xác nhận chuyển tiền kèm số tiền', async () => {
      serve([
        item({
          title: 'Có khoản tiền đang chờ nhận',
          type: 'PAYOUT_PENDING',
          data: { link: '/landlord/payouts/PAYOUT-1', amount: 5000000 },
        }),
      ])

      await openBell()

      const link = await screen.findByRole('link', {
        name: /Mở trang xác nhận chuyển tiền/,
      })
      expect(link).toHaveAttribute('href', '/landlord/payouts/PAYOUT-1')
      expect(link).toHaveTextContent('5.000.000 VND')
    })

    it.each([
      [
        'PLATFORM_FEE_INVOICE',
        '/profile?tab=wallet',
        /Xem hóa đơn phí hoa hồng/,
      ],
      ['DESIGN_REQUEST', '/profile?tab=listings', /Xem yêu cầu thiết kế 3D/],
      ['PAYOUT_FAILED', '/profile?tab=wallet', /Xem trạng thái nhận tiền/],
      ['PAYOUT_REPORTED', '/admin/payment-history', /Xem đối soát/],
    ])('%s dẫn tới đích của nó', async (type, link, name) => {
      serve([item({ type, data: { link } })])

      await openBell()

      expect(await screen.findByRole('link', { name })).toHaveAttribute(
        'href',
        link
      )
    })

    it('hiện số tiền đã nhận từ nội dung thông báo', async () => {
      serve([
        item({
          title: 'Bạn đã nhận tiền',
          body: 'Ví của bạn đã nhận 5.000.000 VND.',
          type: 'PAYOUT_RECEIVED',
          data: { receivedAmount: 5000000 },
        }),
      ])

      await openBell()

      expect(await screen.findByText(/5\.000\.000 VND/)).toBeInTheDocument()
    })

    it('footer dẫn tới trang thông báo đầy đủ', async () => {
      await openBell()

      expect(
        await screen.findByRole('link', { name: /Xem tất cả thông báo/ })
      ).toHaveAttribute('href', '/notifications')
    })
  })

  describe('đánh dấu đã đọc', () => {
    it('bấm một thông báo gọi PATCH :id/read', async () => {
      serve([item({ _id: 'n1', title: 'Cần đọc' })])
      await openBell()

      fireEvent.click(await screen.findByRole('button', { name: /Cần đọc/ }))

      await waitFor(() =>
        expect(mocks.patch).toHaveBeenCalledWith('/notifications/n1/read', {})
      )
    })

    it('"Đọc tất cả" dùng PATCH read-all (không phải POST) rồi báo thành công', async () => {
      serve([item({ _id: 'n1' }), item({ _id: 'n2' })])
      await openBell()

      fireEvent.click(await screen.findByRole('button', { name: 'Đọc tất cả' }))

      await waitFor(() =>
        expect(mocks.patch).toHaveBeenCalledWith('/notifications/read-all', {})
      )
      expect(mocks.post).not.toHaveBeenCalled()
      await waitFor(() =>
        expect(mocks.success).toHaveBeenCalledWith(
          'Đã đánh dấu tất cả là đã đọc'
        )
      )
    })

    it('"Đọc tất cả" thất bại thì báo lỗi, không báo thành công', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => undefined)
      mocks.patch.mockRejectedValue(new Error('404'))
      serve([item()])
      await openBell()

      fireEvent.click(await screen.findByRole('button', { name: 'Đọc tất cả' }))

      await waitFor(() =>
        expect(mocks.error).toHaveBeenCalledWith(
          'Không thể đánh dấu đã đọc. Vui lòng thử lại.'
        )
      )
      expect(mocks.success).not.toHaveBeenCalled()
    })
  })

  describe('yêu cầu đặt lịch', () => {
    const request = item({
      _id: 'n1',
      title: 'Có người muốn xem nhà',
      type: 'BOOKING',
      data: { bookingId: 'B1' },
    })

    it('hiện nút xử lý theo loại, không phụ thuộc tiêu đề', async () => {
      serve([request])

      await openBell()

      expect(
        await screen.findByRole('button', { name: /Đồng ý/ })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /Từ chối/ })
      ).toBeInTheDocument()
    })

    it('đồng ý: xác nhận lịch hẹn rồi đánh dấu đã đọc', async () => {
      serve([request])
      await openBell()

      fireEvent.click(await screen.findByRole('button', { name: /Đồng ý/ }))

      await waitFor(() =>
        expect(mocks.patch).toHaveBeenCalledWith('/bookings/B1/status', {
          status: 'confirmed',
        })
      )
      await waitFor(() =>
        expect(mocks.patch).toHaveBeenCalledWith('/notifications/n1/read', {})
      )
    })

    it('từ chối: bắt buộc nhập lý do rồi mới gửi', async () => {
      serve([request])
      await openBell()

      fireEvent.click(await screen.findByRole('button', { name: /Từ chối/ }))
      fireEvent.click(
        await screen.findByRole('button', { name: 'Xác nhận từ chối' })
      )
      expect(mocks.error).toHaveBeenCalledWith('Vui lòng nhập lý do từ chối!')
      expect(mocks.patch).not.toHaveBeenCalledWith(
        '/bookings/B1/status',
        expect.anything()
      )

      fireEvent.change(screen.getByLabelText('Lý do từ chối'), {
        target: { value: 'Đã cho thuê' },
      })
      fireEvent.click(screen.getByRole('button', { name: 'Xác nhận từ chối' }))

      await waitFor(() =>
        expect(mocks.patch).toHaveBeenCalledWith('/bookings/B1/status', {
          status: 'rejected',
          rejectedReason: 'Đã cho thuê',
        })
      )
    })
  })

  describe('realtime và bàn phím', () => {
    it('thông báo mới đến thì badge và danh sách cập nhật không cần mở lại', async () => {
      serve([item({ _id: 'old', title: 'Cũ', isRead: true })], 0)
      await openBell()
      await screen.findByText('Cũ')

      act(() =>
        realtime.onCreated?.({
          notification: item({ _id: 'new', title: 'Vừa đến' }),
          unreadCount: 4,
        })
      )

      expect(await screen.findByText('Vừa đến')).toBeInTheDocument()
      expect(screen.getByText('4')).toBeInTheDocument()
    })

    it('hủy đăng ký realtime khi gỡ component', async () => {
      const { unmount } = render(<NotificationBell isLightHeader />)
      await waitFor(() => expect(mocks.subscribe).toHaveBeenCalled())

      unmount()

      expect(mocks.unsubscribe).toHaveBeenCalled()
    })

    it('phím Escape đóng danh sách', async () => {
      await openBell()
      expect(await screen.findByText('Thông báo mới nhận')).toBeInTheDocument()

      fireEvent.keyDown(document, { key: 'Escape' })

      expect(screen.queryByText('Thông báo mới nhận')).not.toBeInTheDocument()
    })

    it('bấm ra ngoài đóng danh sách', async () => {
      await openBell()
      expect(await screen.findByText('Thông báo mới nhận')).toBeInTheDocument()

      fireEvent.mouseDown(document.body)

      expect(screen.queryByText('Thông báo mới nhận')).not.toBeInTheDocument()
    })
  })
})
