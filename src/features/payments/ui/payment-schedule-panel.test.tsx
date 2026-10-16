import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { PaymentSchedulePanel } from './payment-schedule-panel'

const mocks = vi.hoisted(() => ({
  schedule: vi.fn(),
  initRentPayment: vi.fn(),
  initInvoicePayment: vi.fn(),
  providers: vi.fn(),
}))

vi.mock('../api/payments-api', async importOriginal => {
  const actual = await importOriginal<typeof import('../api/payments-api')>()
  return {
    getPaymentsByContract: mocks.schedule,
    initRentPayment: mocks.initRentPayment,
    initInvoicePayment: mocks.initInvoicePayment,
    getPaymentProviders: mocks.providers,
    isExternalGateway: actual.isExternalGateway,
  }
})

describe('PaymentSchedulePanel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.providers.mockResolvedValue([
      { provider: 'mock-bank', label: 'Mock Bank (sandbox)', simulation: true },
    ])
  })

  it('renders an empty state after loading an unconfigured schedule', async () => {
    mocks.schedule.mockResolvedValue([])

    render(<PaymentSchedulePanel contractId="contract-1" />)

    await waitFor(() =>
      expect(screen.getByText(/Chưa có kỳ thanh toán/i)).toBeTruthy()
    )
    expect(screen.getByText(/Mô phỏng sandbox/i)).toBeTruthy()
  })

  it('refreshes the schedule when returning to the tab', async () => {
    mocks.schedule.mockResolvedValue([])
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
      expect(mocks.initInvoicePayment).toHaveBeenCalledWith('fee-1', {
        provider: 'mock-bank',
      })
    )
    expect(
      screen.getByRole('link', { name: 'Mở ngân hàng mô phỏng' })
    ).toHaveAttribute('href', 'https://bank.example/invoice-ref')
  })

  it('redirects rent payment to the chosen external gateway', async () => {
    mocks.providers.mockResolvedValue([
      { provider: 'zalopay', label: 'ZaloPay', simulation: false },
    ])
    mocks.schedule.mockResolvedValue([
      {
        _id: 'rent-1',
        contractId: 'contract-1',
        amount: 5000000,
        description: 'Rent 2030-01',
        dueDate: '2030-01-01T00:00:00.000Z',
        paidAt: null,
        status: 'unpaid',
        type: 'rent',
        txHash: null,
        txRef: null,
        ledgerStatus: 'pending',
      },
    ])
    mocks.initRentPayment.mockResolvedValue({
      provider: 'zalopay',
      txRef: '300101_x',
      deepLink: 'https://qcgateway.zalopay.vn/openinapp?order=x',
    })
    const assign = vi.fn()
    const originalLocation = window.location
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { assign },
    })

    render(<PaymentSchedulePanel contractId="contract-1" />)
    await screen.findByRole('radio', { name: 'ZaloPay' })
    fireEvent.click(screen.getByRole('button', { name: 'Thanh toán' }))

    await waitFor(() =>
      expect(assign).toHaveBeenCalledWith(
        'https://qcgateway.zalopay.vn/openinapp?order=x'
      )
    )
    expect(mocks.initRentPayment).toHaveBeenCalledWith('rent-1', {
      provider: 'zalopay',
    })
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    })
  })
})
