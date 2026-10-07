import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { LandlordPayoutHistory } from './landlord-payout-history'

const mocks = vi.hoisted(() => ({ useLandlordPayouts: vi.fn() }))

vi.mock('@/entities/payout', () => ({
  useLandlordPayouts: mocks.useLandlordPayouts,
}))

describe('LandlordPayoutHistory', () => {
  beforeEach(() => vi.clearAllMocks())

  it('renders loading, empty, and populated payout states', () => {
    mocks.useLandlordPayouts.mockReturnValue({ isLoading: true })
    const { rerender } = render(<LandlordPayoutHistory />)
    expect(screen.getByText('Đang tải lịch sử nhận tiền…')).toBeInTheDocument()

    mocks.useLandlordPayouts.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { items: [] },
    })
    rerender(<LandlordPayoutHistory />)
    expect(screen.getByText('Chưa có khoản nhận tiền nào.')).toBeInTheDocument()

    mocks.useLandlordPayouts.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        items: [
          {
            _id: 'payout-1',
            sentAmount: 5_000_000,
            receivedAmount: 5_000_000,
            status: 'paid-out',
            createdAt: '2026-10-04T00:00:00.000Z',
          },
        ],
      },
    })
    rerender(<LandlordPayoutHistory />)
    expect(screen.getAllByText(/5\.000\.000 VND/)).toHaveLength(2)
    expect(screen.getByText('Đã nhận')).toBeInTheDocument()
  })

  it('renders a recoverable error state', () => {
    mocks.useLandlordPayouts.mockReturnValue({
      isLoading: false,
      isError: true,
    })
    render(<LandlordPayoutHistory />)
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Không thể tải lịch sử nhận tiền.'
    )
  })
})
