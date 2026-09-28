import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { PaymentSchedulePanel } from './payment-schedule-panel'

const mocks = vi.hoisted(() => ({
  schedule: vi.fn(),
  wallet: vi.fn(),
}))

vi.mock('../api/payments-api', () => ({
  getPaymentsByContract: mocks.schedule,
  getLinkedWallet: mocks.wallet,
  initRentPayment: vi.fn(),
  linkWallet: vi.fn(),
}))

describe('PaymentSchedulePanel', () => {
  beforeEach(() => vi.clearAllMocks())

  it('renders an empty state after loading an unconfigured schedule', async () => {
    mocks.schedule.mockResolvedValue([])
    mocks.wallet.mockResolvedValue({
      userId: 'user-1',
      provider: 'mock-bank',
      externalAccountRef: 'sandbox:user-1',
      status: 'linked',
      simulation: true,
      balance: null,
    })

    render(<PaymentSchedulePanel contractId="contract-1" />)

    await waitFor(() =>
      expect(screen.getByText(/Chưa có kỳ thanh toán/i)).toBeTruthy()
    )
    expect(screen.getByText(/Mô phỏng sandbox/i)).toBeTruthy()
  })

  it('refreshes the schedule when returning to the tab', async () => {
    mocks.schedule.mockResolvedValue([])
    mocks.wallet.mockResolvedValue({ status: 'linked', balance: null })
    render(<PaymentSchedulePanel contractId="contract-1" />)
    await waitFor(() => expect(mocks.schedule).toHaveBeenCalledTimes(1))
    fireEvent.focus(window)
    await waitFor(() => expect(mocks.schedule).toHaveBeenCalledTimes(2))
  })
})
