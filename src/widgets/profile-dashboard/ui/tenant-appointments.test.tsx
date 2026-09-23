import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { TenantAppointments } from './tenant-appointments'

const appointment = {
  id: 'booking-1',
  guestName: 'Nguyễn Văn A',
  phone: '0901234567',
  propertyId: 'apartment-1',
  propertyName: 'Căn hộ Central Park',
  date: '25/09/2026',
  time: '10:00',
  status: 'confirmed' as const,
}

describe('TenantAppointments', () => {
  it('renders the tenant booking and cancels pending or confirmed bookings', () => {
    const onCancel = vi.fn()

    render(
      <TenantAppointments appointments={[appointment]} onCancel={onCancel} />
    )

    expect(screen.getByText('Căn hộ Central Park')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Hủy lịch' }))

    expect(onCancel).toHaveBeenCalledWith('booking-1')
  })

  it('renders the empty state without a cancellation action', () => {
    render(<TenantAppointments appointments={[]} onCancel={vi.fn()} />)

    expect(
      screen.getByText('Bạn chưa đăng ký lịch hẹn xem nhà nào.')
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Hủy lịch' })
    ).not.toBeInTheDocument()
  })
})
