import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { NotificationItem } from '../api/notifications-api'
import { useBookingDecision } from './use-booking-decision'

const mocks = vi.hoisted(() => ({
  patch: vi.fn(),
  success: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
}))

vi.mock('@/shared/api', () => ({ apiClient: { patch: mocks.patch } }))
vi.mock('sonner', () => ({
  toast: { success: mocks.success, error: mocks.error, info: mocks.info },
}))

const request: NotificationItem = {
  _id: 'n1',
  title: 'Yêu cầu',
  body: 'Nội dung',
  type: 'BOOKING',
  isRead: false,
  createdAt: '2026-10-25T03:00:00.000Z',
  data: { bookingId: 'B1' },
}

function setup() {
  const onDecided = vi.fn().mockResolvedValue(undefined)
  const hook = renderHook(() => useBookingDecision({ onDecided }))
  return { ...hook, onDecided }
}

describe('useBookingDecision', () => {
  beforeEach(() => {
    Object.values(mocks).forEach(mock => mock.mockReset())
    mocks.patch.mockResolvedValue({})
  })

  describe('đồng ý', () => {
    it('gửi confirmed, báo thành công rồi gọi onDecided', async () => {
      const { result, onDecided } = setup()

      await act(() => result.current.approve(request))

      expect(mocks.patch).toHaveBeenCalledWith('/bookings/B1/status', {
        status: 'confirmed',
      })
      expect(mocks.success).toHaveBeenCalledWith(
        'Đã xác nhận lịch hẹn xem nhà!'
      )
      expect(onDecided).toHaveBeenCalledWith('n1')
      expect(result.current.busy).toBe(false)
    })

    it('đặt busy trong lúc chờ phản hồi', async () => {
      let release: () => void = () => undefined
      mocks.patch.mockReturnValue(
        new Promise<void>(resolve => {
          release = resolve
        })
      )
      const { result } = setup()

      let pending: Promise<void> = Promise.resolve()
      act(() => {
        pending = result.current.approve(request)
      })
      expect(result.current.busy).toBe(true)

      await act(async () => {
        release()
        await pending
      })
      expect(result.current.busy).toBe(false)
    })

    it('lỗi: báo lỗi bằng thông điệp thật, không gọi onDecided, hết busy', async () => {
      mocks.patch.mockRejectedValue(new Error('Lịch hẹn đã được xử lý'))
      const { result, onDecided } = setup()

      await act(() => result.current.approve(request))

      expect(mocks.error).toHaveBeenCalledWith('Lịch hẹn đã được xử lý')
      expect(onDecided).not.toHaveBeenCalled()
      expect(result.current.busy).toBe(false)
    })

    it('lỗi không phải Error dùng thông điệp mặc định', async () => {
      mocks.patch.mockRejectedValue('boom')
      const { result } = setup()

      await act(() => result.current.approve(request))

      expect(mocks.error).toHaveBeenCalledWith('Không thể xác nhận lịch hẹn')
    })

    it('thiếu bookingId: không gọi API', async () => {
      const { result } = setup()

      await act(() => result.current.approve({ ...request, data: {} }))

      expect(mocks.patch).not.toHaveBeenCalled()
    })
  })

  describe('từ chối', () => {
    it('mở hộp thoại và đóng lại sẽ xóa lý do', () => {
      const { result } = setup()

      act(() => result.current.startReject(request))
      act(() => result.current.setReason('Bận'))
      expect(result.current.isRejecting).toBe(true)
      expect(result.current.reason).toBe('Bận')

      act(() => result.current.cancelReject())
      expect(result.current.isRejecting).toBe(false)
      expect(result.current.reason).toBe('')
    })

    it('thiếu bookingId: không mở hộp thoại', () => {
      const { result } = setup()

      act(() => result.current.startReject({ ...request, data: {} }))

      expect(result.current.isRejecting).toBe(false)
    })

    it.each(['', '   '])(
      'lý do trống (%j): báo lỗi, không gọi API và giữ hộp thoại',
      async reason => {
        const { result } = setup()
        act(() => result.current.startReject(request))
        act(() => result.current.setReason(reason))

        await act(() => result.current.confirmReject())

        expect(mocks.error).toHaveBeenCalledWith('Vui lòng nhập lý do từ chối!')
        expect(mocks.patch).not.toHaveBeenCalled()
        expect(result.current.isRejecting).toBe(true)
      }
    )

    it('thành công: gửi lý do đã cắt khoảng trắng, đóng hộp thoại, gọi onDecided', async () => {
      const { result, onDecided } = setup()
      act(() => result.current.startReject(request))
      act(() => result.current.setReason('  Đã cho thuê  '))

      await act(() => result.current.confirmReject())

      expect(mocks.patch).toHaveBeenCalledWith('/bookings/B1/status', {
        status: 'rejected',
        rejectedReason: 'Đã cho thuê',
      })
      expect(mocks.info).toHaveBeenCalledWith('Đã từ chối lịch hẹn xem nhà.')
      expect(onDecided).toHaveBeenCalledWith('n1')
      expect(result.current.isRejecting).toBe(false)
      expect(result.current.reason).toBe('')
    })

    it('thất bại: báo lỗi và giữ hộp thoại cùng lý do để thử lại', async () => {
      mocks.patch.mockRejectedValue(new Error('Máy chủ bận'))
      const { result, onDecided } = setup()
      act(() => result.current.startReject(request))
      act(() => result.current.setReason('Đã cho thuê'))

      await act(() => result.current.confirmReject())

      expect(mocks.error).toHaveBeenCalledWith('Máy chủ bận')
      expect(onDecided).not.toHaveBeenCalled()
      expect(result.current.isRejecting).toBe(true)
      expect(result.current.reason).toBe('Đã cho thuê')
      expect(result.current.busy).toBe(false)
    })

    it('xác nhận khi chưa mở hộp thoại: không làm gì', async () => {
      const { result } = setup()

      await act(() => result.current.confirmReject())

      expect(mocks.patch).not.toHaveBeenCalled()
      expect(mocks.error).not.toHaveBeenCalled()
    })
  })
})
