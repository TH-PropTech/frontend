import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { PaymentSchedulePanel } from './payment-schedule-panel'

const mocks = vi.hoisted(() => ({
  schedule: vi.fn(),
  initRentPayment: vi.fn(),
  initInvoicePayment: vi.fn(),
  providers: vi.fn(),
  waivePenalty: vi.fn(),
}))

vi.mock('../api/payments-api', async importOriginal => {
  const actual = await importOriginal<typeof import('../api/payments-api')>()
  return {
    getPaymentsByContract: mocks.schedule,
    initRentPayment: mocks.initRentPayment,
    initInvoicePayment: mocks.initInvoicePayment,
    getPaymentProviders: mocks.providers,
    waivePenalty: mocks.waivePenalty,
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

  describe('late penalty (add-rental-penalty-enforcement)', () => {
    const base = {
      contractId: 'contract-1',
      paidAt: null,
      txHash: null,
      txRef: null,
      ledgerStatus: 'not-required',
    }
    const overdueRent = {
      ...base,
      _id: 'rent-1',
      amount: 6000000,
      description: 'Rent 2030-01',
      dueDate: '2030-01-01T00:00:00.000Z',
      status: 'overdue',
      type: 'rent',
      daysLate: 5,
      accruedLateInterest: 9863,
    }
    const penalty = {
      ...base,
      _id: 'penalty-1',
      amount: 27397,
      description: 'Lãi chậm trả 2030-01',
      dueDate: '2030-02-02T00:00:00.000Z',
      status: 'unpaid',
      type: 'penalty',
      sourcePaymentId: 'rent-0',
      latePenalty: {
        baseAmount: 5000000,
        ratePerYear: 10,
        daysLate: 20,
        dueDateKey: '2030-01-05',
        paidDateKey: '2030-01-25',
      },
    }

    it('shows days late and a provisional interest note on an overdue rent invoice', async () => {
      mocks.schedule.mockResolvedValue([overdueRent])
      render(<PaymentSchedulePanel contractId="contract-1" />)

      const note = await screen.findByTestId('accrued-interest')
      expect(note.textContent).toContain('Trễ 5 ngày')
      expect(note.textContent).toContain('Lãi tạm tính 9.863 đ')
      expect(note.textContent).toContain('chốt khi thanh toán')
    })

    it('shows no provisional interest for an invoice that is not overdue', async () => {
      mocks.schedule.mockResolvedValue([
        {
          ...overdueRent,
          status: 'unpaid',
          daysLate: null,
          accruedLateInterest: null,
        },
      ])
      render(<PaymentSchedulePanel contractId="contract-1" />)

      await screen.findByText(/Rent 2030-01/)
      expect(screen.queryByTestId('accrued-interest')).toBeNull()
    })

    it('labels a penalty invoice with its base, rate and days, and lets the tenant pay it', async () => {
      mocks.schedule.mockResolvedValue([penalty])
      render(<PaymentSchedulePanel contractId="contract-1" />)

      const breakdown = await screen.findByTestId('penalty-breakdown')
      expect(breakdown.textContent).toContain('Lãi chậm trả')
      expect(breakdown.textContent).toContain('5.000.000 đ × 10%/năm × 20 ngày')
      expect(screen.getByRole('button', { name: 'Thanh toán' })).toBeTruthy()
      expect(
        screen.queryByRole('button', { name: 'Miễn khoản phạt' })
      ).toBeNull()
    })

    it('lets the landlord waive an unpaid penalty with a reason, without a pay button', async () => {
      mocks.schedule.mockResolvedValue([penalty])
      mocks.waivePenalty.mockResolvedValue({ ...penalty, status: 'waived' })
      render(
        <PaymentSchedulePanel contractId="contract-1" viewerRole="landlord" />
      )

      fireEvent.click(
        await screen.findByRole('button', { name: 'Miễn khoản phạt' })
      )
      expect(screen.queryByRole('button', { name: 'Thanh toán' })).toBeNull()
      const confirm = screen.getByRole('button', { name: 'Xác nhận miễn' })
      expect(confirm).toBeDisabled()

      fireEvent.change(screen.getByLabelText('Lý do miễn'), {
        target: { value: '  Khách gặp khó khăn  ' },
      })
      fireEvent.click(confirm)

      await waitFor(() =>
        expect(mocks.waivePenalty).toHaveBeenCalledWith(
          'penalty-1',
          'Khách gặp khó khăn'
        )
      )
      await waitFor(() => expect(mocks.schedule).toHaveBeenCalledTimes(2))
    })

    it('shows the waiver error and keeps the form open', async () => {
      mocks.schedule.mockResolvedValue([penalty])
      mocks.waivePenalty.mockRejectedValue(new Error('PENALTY_ALREADY_PAID'))
      render(
        <PaymentSchedulePanel contractId="contract-1" viewerRole="landlord" />
      )

      fireEvent.click(
        await screen.findByRole('button', { name: 'Miễn khoản phạt' })
      )
      fireEvent.change(screen.getByLabelText('Lý do miễn'), {
        target: { value: 'ok' },
      })
      fireEvent.click(screen.getByRole('button', { name: 'Xác nhận miễn' }))

      expect(await screen.findByText('PENALTY_ALREADY_PAID')).toBeTruthy()
      expect(screen.getByLabelText('Lý do miễn')).toBeTruthy()
    })

    it('hides platform-fee invoices and waive buttons for rent from the landlord view', async () => {
      mocks.schedule.mockResolvedValue([
        overdueRent,
        { ...penalty, status: 'paid' },
        {
          ...base,
          _id: 'fee-1',
          amount: 100000,
          description: 'Landlord platform commission',
          dueDate: '2030-01-01T00:00:00.000Z',
          status: 'unpaid',
          type: 'platform-fee',
        },
      ])
      render(
        <PaymentSchedulePanel contractId="contract-1" viewerRole="landlord" />
      )

      await screen.findByText(/Rent 2030-01/)
      expect(screen.queryByText(/Landlord platform commission/)).toBeNull()
      expect(
        screen.queryByRole('button', { name: 'Miễn khoản phạt' })
      ).toBeNull()
    })

    it('shows the waiver reason on a waived penalty', async () => {
      mocks.schedule.mockResolvedValue([
        { ...penalty, status: 'waived', waiveReason: 'Khách gặp khó khăn' },
      ])
      render(<PaymentSchedulePanel contractId="contract-1" />)

      expect(
        await screen.findByText(/Chủ nhà đã miễn: Khách gặp khó khăn/)
      ).toBeTruthy()
      expect(screen.queryByRole('button', { name: 'Thanh toán' })).toBeNull()
    })
  })
})
