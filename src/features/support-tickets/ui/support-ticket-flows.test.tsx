import { render, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { TicketList } from './ticket-list'

const mocks = vi.hoisted(() => ({
  getTickets: vi.fn(),
  errorToast: vi.fn(),
}))

vi.mock('../api/support-ticket-api', () => ({
  getMySupportTickets: mocks.getTickets,
}))

vi.mock('@/shared/ui/app-toast', () => ({
  appToast: {
    success: vi.fn(),
    error: mocks.errorToast,
    info: vi.fn(),
  },
}))

describe('TicketList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows the shared custom toast when ticket loading fails', async () => {
    mocks.getTickets.mockRejectedValue(new Error('Tickets unavailable'))

    render(<TicketList />)

    await waitFor(() => {
      expect(mocks.errorToast).toHaveBeenCalledWith('Tickets unavailable')
    })
  })
})
