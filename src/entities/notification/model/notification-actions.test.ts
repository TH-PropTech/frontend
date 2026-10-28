import { describe, expect, it } from 'vitest'
import type { NotificationItem } from '../api/notifications-api'
import { resolveNotificationAction } from './notification-actions'

function notification(
  overrides: Partial<NotificationItem> = {}
): NotificationItem {
  return {
    _id: 'n1',
    title: 'Tiêu đề',
    body: 'Nội dung',
    type: 'OTHER',
    isRead: false,
    createdAt: '2026-10-25T03:00:00.000Z',
    ...overrides,
  }
}

describe('resolveNotificationAction', () => {
  it.each([
    ['không có status', undefined],
    ['status pending', 'pending'],
  ])('lịch hẹn %s là yêu cầu cần xử lý', (_name, status) => {
    const action = resolveNotificationAction(
      notification({ type: 'BOOKING', data: { bookingId: 'B1', status } })
    )

    expect(action).toEqual({ kind: 'booking-request', bookingId: 'B1' })
  })

  it('không phụ thuộc nội dung tiêu đề để nhận diện yêu cầu đặt lịch', () => {
    const data = { bookingId: 'B1' }

    const first = resolveNotificationAction(
      notification({ type: 'BOOKING', title: 'Yêu cầu đặt lịch mới', data })
    )
    const renamed = resolveNotificationAction(
      notification({ type: 'BOOKING', title: 'Có người muốn xem nhà', data })
    )

    expect(renamed).toEqual(first)
    expect(renamed).toEqual({ kind: 'booking-request', bookingId: 'B1' })
  })

  it.each(['confirmed', 'rejected', 'cancelled'] as const)(
    'lịch hẹn đã %s hiện trạng thái',
    status => {
      const action = resolveNotificationAction(
        notification({ type: 'BOOKING', data: { bookingId: 'B1', status } })
      )

      expect(action).toEqual({ kind: 'booking-status', status })
    }
  )

  it('trạng thái lịch hẹn không có nhãn (completed) không có hành động', () => {
    const action = resolveNotificationAction(
      notification({
        type: 'BOOKING',
        data: { bookingId: 'B1', status: 'completed' },
      })
    )

    expect(action).toBeNull()
  })

  it('thông báo BOOKING thiếu bookingId không có hành động', () => {
    expect(
      resolveNotificationAction(notification({ type: 'BOOKING', data: {} }))
    ).toBeNull()
  })

  it.each([
    ['PAYOUT_PENDING', 'Mở trang xác nhận chuyển tiền'],
    ['PAYOUT_FAILED', 'Xem trạng thái nhận tiền'],
    ['PAYOUT_REPORTED', 'Xem đối soát'],
    ['PLATFORM_FEE_INVOICE', 'Xem hóa đơn phí hoa hồng'],
    ['DESIGN_REQUEST', 'Xem yêu cầu thiết kế 3D'],
  ])('%s có nút đi tới data.link', (type, label) => {
    const action = resolveNotificationAction(
      notification({ type, data: { link: '/profile?tab=wallet' } })
    )

    expect(action).toEqual({
      kind: 'link',
      label,
      href: '/profile?tab=wallet',
    })
  })

  it('kèm số tiền khi data.amount là số', () => {
    const action = resolveNotificationAction(
      notification({
        type: 'PAYOUT_PENDING',
        data: { link: '/landlord/payouts/P1', amount: 5000000 },
      })
    )

    expect(action).toEqual(
      expect.objectContaining({ kind: 'link', amount: 5000000 })
    )
  })

  it('bỏ qua data.amount không phải số', () => {
    const action = resolveNotificationAction(
      notification({
        type: 'PAYOUT_PENDING',
        data: { link: '/landlord/payouts/P1', amount: '5000000' },
      })
    )

    expect(action).not.toHaveProperty('amount')
  })

  it('loại có nhãn nhưng thiếu data.link thì không có hành động', () => {
    expect(
      resolveNotificationAction(
        notification({ type: 'PAYOUT_PENDING', data: {} })
      )
    ).toBeNull()
  })

  it.each([
    'javascript:alert(1)',
    '//evil.example.com/steal',
    'https://evil.example.com',
    '',
  ])('từ chối đích điều hướng không an toàn: %s', link => {
    expect(
      resolveNotificationAction(
        notification({ type: 'PAYOUT_PENDING', data: { link } })
      )
    ).toBeNull()
  })

  it('loại không biết hoặc không có data thì không có hành động', () => {
    expect(
      resolveNotificationAction(notification({ type: 'UNKNOWN' }))
    ).toBeNull()
  })
})
