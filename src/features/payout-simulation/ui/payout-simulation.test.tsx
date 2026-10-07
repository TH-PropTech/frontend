import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { PayoutSimulation } from './payout-simulation'

const mocks = vi.hoisted(() => ({ settlePayout: vi.fn() }))

vi.mock('@/entities/payout', () => ({ settlePayout: mocks.settlePayout }))

describe('PayoutSimulation', () => {
  beforeEach(() => vi.clearAllMocks())

  it('submits a successful simulated transfer', async () => {
    mocks.settlePayout.mockResolvedValue({
      payout: { status: 'paid-out' },
      replayed: false,
    })
    render(<PayoutSimulation txRef="PAYOUT-1" />)

    fireEvent.click(screen.getByRole('button', { name: 'Thành công' }))

    await waitFor(() =>
      expect(mocks.settlePayout).toHaveBeenCalledWith('PAYOUT-1', 'success')
    )
    expect(
      await screen.findByText('Chuyển tiền thành công!')
    ).toBeInTheDocument()
  })

  it('shows a recoverable API error', async () => {
    mocks.settlePayout.mockRejectedValue(new Error('PAYOUT_NOT_FOUND'))
    render(<PayoutSimulation txRef="PAYOUT-X" />)

    fireEvent.click(screen.getByRole('button', { name: 'Thất bại' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'PAYOUT_NOT_FOUND'
    )
    expect(screen.getByRole('button', { name: 'Thử lại' })).toBeInTheDocument()
  })
})
