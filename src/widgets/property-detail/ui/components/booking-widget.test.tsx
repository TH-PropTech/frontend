import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { BookingWidget } from './booking-widget'
import { apiClient } from '@/shared/api/api-client'
import { toast } from 'sonner'

vi.mock('@/shared/api/api-client', () => ({
  apiClient: { post: vi.fn() },
}))

vi.mock('sonner', () => ({
  toast: { error: vi.fn(), success: vi.fn() },
}))

describe('BookingWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('keeps the consultation card calm without a decorative top stripe', () => {
    render(<BookingWidget propertyId="apartment-1" />)

    const title = screen.getByText('Lên lịch xem căn hộ')
    const card = title.parentElement

    expect(card).toHaveClass('bg-surface')
    expect(card).not.toHaveClass('relative')
    expect(card?.querySelector('.bg-primary')).toBeNull()
  })

  it('autofills full name and phone from localStorage user object', async () => {
    localStorage.setItem(
      'user',
      JSON.stringify({ name: 'Nguyễn Văn B', phone: '0987654321' })
    )

    render(<BookingWidget propertyId="apartment-1" />)

    await waitFor(() => {
      const nameInput = screen.getByPlaceholderText('Ví dụ: Nguyễn Văn A')
      expect(nameInput).toHaveValue('Nguyễn Văn B')
      const phoneInput = screen.getByPlaceholderText('Ví dụ: 0901234567')
      expect(phoneInput).toHaveValue('0987654321')
    })
  })

  it('shows error toast when submitting without name or phone', async () => {
    render(<BookingWidget propertyId="apartment-1" />)

    const submitBtn = screen.getByRole('button', {
      name: /Đăng ký lịch hẹn ngay/i,
    })
    fireEvent.click(submitBtn)

    expect(toast.error).toHaveBeenCalledWith(
      'Vui lòng điền đầy đủ Họ tên và Số điện thoại'
    )
    expect(apiClient.post).not.toHaveBeenCalled()
  })

  it('shows error toast when submitting without selecting a visit date', async () => {
    render(<BookingWidget propertyId="apartment-1" />)

    const nameInput = screen.getByPlaceholderText('Ví dụ: Nguyễn Văn A')
    const phoneInput = screen.getByPlaceholderText('Ví dụ: 0901234567')

    fireEvent.change(nameInput, { target: { value: 'Trần Văn C' } })
    fireEvent.change(phoneInput, { target: { value: '0912345678' } })

    const submitBtn = screen.getByRole('button', {
      name: /Đăng ký lịch hẹn ngay/i,
    })
    fireEvent.click(submitBtn)

    expect(toast.error).toHaveBeenCalledWith('Vui lòng chọn ngày xem phòng')
    expect(apiClient.post).not.toHaveBeenCalled()
  })

  it('selects quick date chip and successfully submits the booking request', async () => {
    vi.mocked(apiClient.post).mockResolvedValueOnce({ success: true })

    render(<BookingWidget propertyId="apartment-1" />)

    const nameInput = screen.getByPlaceholderText('Ví dụ: Nguyễn Văn A')
    const phoneInput = screen.getByPlaceholderText('Ví dụ: 0901234567')

    fireEvent.change(nameInput, { target: { value: 'Trần Văn C' } })
    fireEvent.change(phoneInput, { target: { value: '0912345678' } })

    // Click quick date "Hôm nay"
    const todayChip = screen.getByRole('button', { name: 'Hôm nay' })
    fireEvent.click(todayChip)

    // Fill notes
    const notesInput = screen.getByPlaceholderText(
      'Có thú cưng đi cùng, cần thang máy...'
    )
    fireEvent.change(notesInput, { target: { value: 'Cần xem thêm ban công' } })

    const submitBtn = screen.getByRole('button', {
      name: /Đăng ký lịch hẹn ngay/i,
    })
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledTimes(1)
      expect(apiClient.post).toHaveBeenCalledWith(
        '/bookings',
        expect.objectContaining({
          apartmentId: 'apartment-1',
          method: 'onsite',
          tenantName: 'Trần Văn C',
          tenantPhone: '0912345678',
          note: 'Cần xem thêm ban công',
        })
      )
      expect(toast.success).toHaveBeenCalledWith(
        'Đăng ký xem phòng thành công!',
        expect.any(Object)
      )
    })
  })

  it('handles submission error gracefully and displays error toast', async () => {
    vi.mocked(apiClient.post).mockRejectedValueOnce(
      new Error('Khung giờ này đã kín lịch')
    )

    render(<BookingWidget propertyId="apartment-1" />)

    const nameInput = screen.getByPlaceholderText('Ví dụ: Nguyễn Văn A')
    const phoneInput = screen.getByPlaceholderText('Ví dụ: 0901234567')

    fireEvent.change(nameInput, { target: { value: 'Trần Văn C' } })
    fireEvent.change(phoneInput, { target: { value: '0912345678' } })

    const tomorrowChip = screen.getByRole('button', { name: 'Ngày mai' })
    fireEvent.click(tomorrowChip)

    const submitBtn = screen.getByRole('button', {
      name: /Đăng ký lịch hẹn ngay/i,
    })
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Khung giờ này đã kín lịch')
    })
  })
})
