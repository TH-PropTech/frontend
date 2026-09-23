import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { LandlordAppointments } from './landlord-appointments'

vi.mock('sonner', () => ({
  toast: { error: vi.fn() },
}))

const appointment = {
  id: 'booking-1',
  guestName: 'Nguyễn Văn A',
  phone: '0901234567',
  propertyId: 'apartment-1',
  propertyName: 'Căn hộ Central Park',
  date: '25/09/2026',
  time: '10:00',
  status: 'pending' as const,
}

describe('LandlordAppointments', () => {
  it('renders pending bookings and confirms the selected booking', () => {
    const onApprove = vi.fn()

    render(
      <LandlordAppointments
        appointments={[appointment]}
        onApprove={onApprove}
        onReject={vi.fn()}
      />
    )

    expect(screen.getByText('Căn hộ Central Park')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Xác nhận' }))

    expect(onApprove).toHaveBeenCalledWith('booking-1')
  })

  it('requires a rejection reason before submitting and sends the reason when provided', () => {
    const onReject = vi.fn()

    render(
      <LandlordAppointments
        appointments={[appointment]}
        onApprove={vi.fn()}
        onReject={onReject}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Từ chối' }))
    fireEvent.click(screen.getByRole('button', { name: 'Xác nhận từ chối' }))
    expect(onReject).not.toHaveBeenCalled()

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Chủ nhà bận lịch' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Xác nhận từ chối' }))

    expect(onReject).toHaveBeenCalledWith('booking-1', 'Chủ nhà bận lịch')
  })
})
