import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { PaymentSchedulePanel } from './payment-schedule-panel'

const mocks = vi.hoisted(() => ({
  schedule: vi.fn(),
  wallet: vi.fn(),
  initRentPayment: vi.fn(),
  initInvoicePayment: vi.fn(),
}))

vi.mock('../api/payments-api', () => ({
  getPaymentsByContract: mocks.schedule,
  getLinkedWallet: mocks.wallet,
  initRentPayment: mocks.initRentPayment,
  initInvoicePayment: mocks.initInvoicePayment,
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

  it('initializes a landlord platform-fee invoice with the invoice endpoint', async () => {
    mocks.schedule.mockResolvedValue([
      {
        _id: 'fee-1',
        contractId: 'contract-1',
        amount: 100000,
        description: 'Landlord platform commission',
        dueDate: '2030-01-01T00:00:00.000Z',
        paidAt: null,
        status: 'unpaid',
        type: 'platform-fee',
        txHash: null,
        txRef: null,
        ledgerStatus: 'pending',
      },
    ])
    mocks.wallet.mockResolvedValue({ status: 'linked', balance: null })
    mocks.initInvoicePayment.mockResolvedValue({
      txRef: 'invoice-ref',
      deepLink: 'https://bank.example/invoice-ref',
    })

    render(<PaymentSchedulePanel contractId="contract-1" />)

    await waitFor(() =>
      expect(screen.getByText(/Landlord platform commission/i)).toBeTruthy()
    )
    fireEvent.click(screen.getByRole('button', { name: 'Thanh toán' }))

    await waitFor(() =>
      expect(mocks.initInvoicePayment).toHaveBeenCalledWith('fee-1')
    )
    expect(
      screen.getByRole('link', { name: 'Mở ngân hàng mô phỏng' })
    ).toHaveAttribute('href', 'https://bank.example/invoice-ref')
  })
})
