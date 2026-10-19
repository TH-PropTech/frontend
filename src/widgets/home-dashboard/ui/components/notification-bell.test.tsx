import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiClientError } from '@/shared/api/api-client'
import { NotificationBell } from './notification-bell'

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  patch: vi.fn(),
  post: vi.fn(),
}))

vi.mock('@/shared/api/api-client', async importOriginal => {
  const actual =
    await importOriginal<typeof import('@/shared/api/api-client')>()
  return {
    ...actual,
    apiClient: mocks,
  }
})

describe('NotificationBell API failure states', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.localStorage.setItem('accessToken', 'token')
    window.localStorage.setItem('user', JSON.stringify({ id: 'user-1' }))
    mocks.get.mockReset()
    mocks.patch.mockReset()
    mocks.post.mockReset()
  })

  it('shows recoverable feedback for a temporary network failure', async () => {
    mocks.get.mockRejectedValue(
      new ApiClientError('Không thể kết nối tới máy chủ API', 0, null)
    )

    render(<NotificationBell isLightHeader />)

    await waitFor(() => expect(mocks.get).toHaveBeenCalled())
    fireEvent.click(screen.getByTitle('Thông báo'))

    expect(
      await screen.findByText(/Không thể kết nối máy chủ thông báo/i)
    ).toBeInTheDocument()
    expect(
      screen.queryByText('Bạn chưa có thông báo nào.')
    ).not.toBeInTheDocument()
  })

  it('shows authentication recovery feedback for unauthorized responses', async () => {
    mocks.get.mockRejectedValue(new ApiClientError('Unauthorized', 401, null))

    render(<NotificationBell isLightHeader />)

    await waitFor(() => expect(mocks.get).toHaveBeenCalled())
    fireEvent.click(screen.getByTitle('Thông báo'))

    expect(
      await screen.findByText(/Phiên đăng nhập không còn hợp lệ/i)
    ).toBeInTheDocument()
  })

  it('renders a clickable payout simulation link from a pending payout notification', async () => {
    mocks.get.mockResolvedValue({
      items: [
        {
          _id: 'notice-1',
          title: 'Có khoản tiền đang chờ nhận',
          body: 'Mở liên kết để xác nhận kết quả chuyển tiền.',
          type: 'PAYOUT_PENDING',
          data: { link: '/landlord/payouts/PAYOUT-1', amount: 5000000 },
          isRead: false,
          createdAt: '2026-10-04T00:00:00.000Z',
        },
      ],
      total: 1,
    })

    render(<NotificationBell isLightHeader />)
    fireEvent.click(screen.getByTitle('Thông báo'))

    const payoutLink = await screen.findByRole('link', {
      name: /Mở trang xác nhận chuyển tiền/,
    })
    expect(payoutLink).toHaveAttribute('href', '/landlord/payouts/PAYOUT-1')
    expect(screen.getByText(/5\.000\.000 VND/)).toBeInTheDocument()
  })

  it('links a platform fee invoice notification to the wallet invoices', async () => {
    mocks.get.mockResolvedValue({
      items: [
        {
          _id: 'notice-fee',
          title: 'Phí hoa hồng cần thanh toán',
          body: 'Hợp đồng đã kích hoạt.',
          type: 'PLATFORM_FEE_INVOICE',
          data: { link: '/profile?tab=wallet' },
          isRead: false,
          createdAt: '2026-10-04T00:00:00.000Z',
        },
      ],
      total: 1,
    })

    render(<NotificationBell isLightHeader />)
    fireEvent.click(screen.getByTitle('Thông báo'))

    const link = await screen.findByRole('link', {
      name: /Xem hóa đơn phí hoa hồng/,
    })
    expect(link).toHaveAttribute('href', '/profile?tab=wallet')
  })

  it('links a design request notification to its request page', async () => {
    mocks.get.mockResolvedValue({
      items: [
        {
          _id: 'notice-design',
          title: 'Thiết kế 3D đã sẵn sàng',
          body: 'Vui lòng xem và duyệt thiết kế.',
          type: 'DESIGN_REQUEST',
          data: { link: '/profile?tab=listings' },
          isRead: false,
          createdAt: '2026-10-04T00:00:00.000Z',
        },
      ],
      total: 1,
    })

    render(<NotificationBell isLightHeader />)
    fireEvent.click(screen.getByTitle('Thông báo'))

    const link = await screen.findByRole('link', {
      name: /Xem yêu cầu thiết kế 3D/,
    })
    expect(link).toHaveAttribute('href', '/profile?tab=listings')
  })

  it('renders the received amount from a completed payout notification', async () => {
    mocks.get.mockResolvedValue({
      items: [
        {
          _id: 'notice-2',
          title: 'Bạn đã nhận tiền',
          body: 'Ví của bạn đã nhận 5.000.000 VND.',
          type: 'PAYOUT_RECEIVED',
          data: { receivedAmount: 5000000 },
          isRead: false,
          createdAt: '2026-10-04T00:00:00.000Z',
        },
      ],
      total: 1,
    })

    render(<NotificationBell isLightHeader />)
    fireEvent.click(screen.getByTitle('Thông báo'))

    expect(await screen.findByText(/5\.000\.000 VND/)).toBeInTheDocument()
  })
})
