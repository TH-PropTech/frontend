import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { OverdueRemindersPanel } from './overdue-reminders-panel'

const mocks = vi.hoisted(() => ({ overdue: vi.fn(), process: vi.fn() }))
vi.mock('../api/payments-api', () => ({
  getOverduePayments: mocks.overdue,
  processPaymentReminders: mocks.process,
}))

describe('OverdueRemindersPanel', () => {
  beforeEach(() => vi.clearAllMocks())

  it('renders the empty overdue state after loading', async () => {
    mocks.overdue.mockResolvedValue([])
    render(<OverdueRemindersPanel />)
    await waitFor(() =>
      expect(screen.getByText(/Không có hóa đơn quá hạn/i)).toBeTruthy()
    )
    expect(screen.getByText(/Mỗi hóa đơn chỉ nhận một nhắc/i)).toBeTruthy()
  })
})
