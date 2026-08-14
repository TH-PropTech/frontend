import { render, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SafetyReportsView } from './safety-reports-view'
import { SupportQueueView } from './support-queue-view'

const mocks = vi.hoisted(() => ({
  getModerationQueue: vi.fn(),
  getTicketQueue: vi.fn(),
  error: vi.fn(),
}))

vi.mock('@/features/safety-reports', () => ({
  getModerationQueue: mocks.getModerationQueue,
  updateReportStatus: vi.fn(),
}))
vi.mock('@/features/support-tickets', () => ({
  getTicketQueue: mocks.getTicketQueue,
  resolveSupportTicket: vi.fn(),
}))
vi.mock('@/shared/ui/app-toast', () => ({
  appToast: { error: mocks.error, success: vi.fn() },
}))

describe('staff trust operations', () => {
  beforeEach(() => vi.clearAllMocks())

  it('uses the custom toast when the safety queue cannot load', async () => {
    mocks.getModerationQueue.mockRejectedValue(new Error('queue unavailable'))
    render(<SafetyReportsView />)
    await waitFor(() =>
      expect(mocks.error).toHaveBeenCalledWith('queue unavailable')
    )
  })

  it('uses the custom toast when the support queue cannot load', async () => {
    mocks.getTicketQueue.mockRejectedValue(new Error('sla unavailable'))
    render(<SupportQueueView />)
    await waitFor(() =>
      expect(mocks.error).toHaveBeenCalledWith('sla unavailable')
    )
  })
})
