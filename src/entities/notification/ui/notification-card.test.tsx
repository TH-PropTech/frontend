import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { NotificationItem } from '../api/notifications-api'
import { NotificationCard } from './notification-card'

function notification(
  overrides: Partial<NotificationItem> = {}
): NotificationItem {
  return {
    _id: 'n1',
    title: 'Có lịch hẹn mới',
    body: 'Khách thuê muốn xem căn hộ.',
    type: 'OTHER',
    isRead: false,
    createdAt: new Date().toISOString(),
    ...overrides,
  }
}

function renderCard(
  item: NotificationItem,
  props: Partial<React.ComponentProps<typeof NotificationCard>> = {}
) {
  const onOpen = vi.fn()
  render(
    <ul>
      <NotificationCard notification={item} onOpen={onOpen} {...props} />
    </ul>
  )
  return { onOpen }
}

describe('NotificationCard', () => {
  it('hiện tiêu đề, nội dung và thời gian', () => {
    renderCard(notification())

    expect(screen.getByText('Có lịch hẹn mới')).toBeInTheDocument()
    expect(screen.getByText('Khách thuê muốn xem căn hộ.')).toBeInTheDocument()
    expect(screen.getByText('Vừa xong')).toBeInTheDocument()
  })

  it('báo "Chưa đọc" bằng chữ cho trình đọc màn hình, không chỉ bằng màu', () => {
    renderCard(notification({ isRead: false }))

    expect(screen.getByText('Chưa đọc.')).toBeInTheDocument()
  })

  it('thông báo đã đọc không có chữ "Chưa đọc"', () => {
    renderCard(notification({ isRead: true }))

    expect(screen.queryByText('Chưa đọc.')).not.toBeInTheDocument()
  })

  it('bấm vào nội dung gọi onOpen với id', () => {
    const { onOpen } = renderCard(notification())

    fireEvent.click(screen.getByRole('button', { name: /Có lịch hẹn mới/ }))

    expect(onOpen).toHaveBeenCalledWith('n1')
  })

  describe('liên kết', () => {
    it('hiện nút đi tới data.link kèm số tiền và không kích hoạt onOpen', () => {
      const { onOpen } = renderCard(
        notification({
          type: 'PAYOUT_PENDING',
          data: { link: '/landlord/payouts/P1', amount: 5000000 },
        })
      )

      const link = screen.getByRole('link', {
        name: /Mở trang xác nhận chuyển tiền/,
      })
      expect(link).toHaveAttribute('href', '/landlord/payouts/P1')
      expect(link).toHaveTextContent('5.000.000 VND')
      // jsdom không hỗ trợ điều hướng thật; chặn để test không in cảnh báo.
      link.addEventListener('click', event => event.preventDefault())
      fireEvent.click(link)
      expect(onOpen).not.toHaveBeenCalled()
    })

    it('không dựng link khi đích điều hướng không an toàn', () => {
      renderCard(
        notification({
          type: 'PAYOUT_PENDING',
          data: { link: 'javascript:alert(1)' },
        })
      )

      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })
  })

  describe('yêu cầu đặt lịch', () => {
    const request = notification({
      type: 'BOOKING',
      title: 'Tiêu đề bất kỳ',
      data: { bookingId: 'B1' },
    })

    it('gọi onApproveBooking / onRejectBooking với thông báo', () => {
      const onApproveBooking = vi.fn()
      const onRejectBooking = vi.fn()
      renderCard(request, { onApproveBooking, onRejectBooking })

      fireEvent.click(screen.getByRole('button', { name: /Đồng ý/ }))
      fireEvent.click(screen.getByRole('button', { name: /Từ chối/ }))

      expect(onApproveBooking).toHaveBeenCalledWith(request)
      expect(onRejectBooking).toHaveBeenCalledWith(request)
    })

    it('vô hiệu hóa hai nút khi đang xử lý', () => {
      renderCard(request, {
        onApproveBooking: vi.fn(),
        onRejectBooking: vi.fn(),
        bookingBusy: true,
      })

      expect(screen.getByRole('button', { name: /Đồng ý/ })).toBeDisabled()
      expect(screen.getByRole('button', { name: /Từ chối/ })).toBeDisabled()
    })

    it('không hiện nút khi nơi dùng không cung cấp xử lý', () => {
      renderCard(request)

      expect(
        screen.queryByRole('button', { name: /Đồng ý/ })
      ).not.toBeInTheDocument()
    })
  })

  it.each([
    ['confirmed', 'Đã đồng ý'],
    ['rejected', 'Đã từ chối'],
    ['cancelled', 'Đã hủy'],
  ])('lịch hẹn %s hiện nhãn %s', (status, label) => {
    renderCard(
      notification({ type: 'BOOKING', data: { bookingId: 'B1', status } })
    )

    expect(screen.getByText(label)).toBeInTheDocument()
  })

  describe('xóa', () => {
    it('chỉ hiện nút xóa khi có onDelete và gọi với id', () => {
      const onDelete = vi.fn()
      renderCard(notification(), { onDelete })

      fireEvent.click(screen.getByRole('button', { name: 'Xóa thông báo' }))

      expect(onDelete).toHaveBeenCalledWith('n1')
    })

    it('không có nút xóa khi không truyền onDelete', () => {
      renderCard(notification())

      expect(
        screen.queryByRole('button', { name: 'Xóa thông báo' })
      ).not.toBeInTheDocument()
    })
  })

  it('không để lộ mã loại nội bộ ra giao diện', () => {
    const { container } = render(
      <ul>
        <NotificationCard
          notification={notification({ type: 'SOME_INTERNAL_CODE_X' })}
          onOpen={vi.fn()}
        />
      </ul>
    )

    expect(container.textContent).not.toMatch(/[A-Z]{3,}(_[A-Z0-9]+){2,}/)
  })
})
