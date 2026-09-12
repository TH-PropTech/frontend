import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { BookingWidget } from './booking-widget'

vi.mock('@/shared/api/api-client', () => ({
  apiClient: { post: vi.fn() },
}))

vi.mock('sonner', () => ({
  toast: { error: vi.fn(), success: vi.fn() },
}))

describe('BookingWidget', () => {
  it('keeps the consultation card calm without a decorative top stripe', () => {
    render(<BookingWidget propertyId="apartment-1" />)

    const title = screen.getByText('Lên lịch xem căn hộ')
    const card = title.parentElement

    expect(card).toHaveClass('bg-surface')
    expect(card).not.toHaveClass('relative')
    expect(card?.querySelector('.bg-primary')).toBeNull()
  })
})
