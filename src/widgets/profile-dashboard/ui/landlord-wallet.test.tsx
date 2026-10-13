import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { LandlordWallet } from './landlord-wallet'

const mocks = vi.hoisted(() => ({
  useWallet: vi.fn(),
  useWalletBanks: vi.fn(),
  useLinkWallet: vi.fn(),
  useWalletTransactions: vi.fn(),
  usePayableInvoices: vi.fn(),
  link: vi.fn(),
  getPaymentProviders: vi.fn(),
  initInvoicePayment: vi.fn(),
}))

vi.mock('@/entities/wallet', () => ({
  useWallet: mocks.useWallet,
  useWalletBanks: mocks.useWalletBanks,
  useLinkWallet: mocks.useLinkWallet,
  useWalletTransactions: mocks.useWalletTransactions,
  usePayableInvoices: mocks.usePayableInvoices,
}))

vi.mock('@/features/payments/api/payments-api', async importOriginal => {
  const actual =
    await importOriginal<
      typeof import('@/features/payments/api/payments-api')
    >()
  return {
    ...actual,
    getPaymentProviders: mocks.getPaymentProviders,
    initInvoicePayment: mocks.initInvoicePayment,
  }
})

const unlinked = {
  status: 'unlinked',
  simulation: true,
  bank: null,
  accountHolder: null,
  accountNumberMasked: null,
  linkedAt: null,
}

const linked = {
  ...unlinked,
  status: 'linked',
  bank: { code: 'VCB', name: 'Vietcombank' },
  accountHolder: 'NGUYEN VAN A',
  accountNumberMasked: '****6789',
  linkedAt: '2026-01-01T00:00:00.000Z',
}

describe('LandlordWallet', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.useWalletBanks.mockReturnValue({
      data: [
        { code: 'VCB', name: 'Vietcombank' },
        { code: 'TCB', name: 'Techcombank' },
      ],
    })
    mocks.useLinkWallet.mockReturnValue({
      mutate: mocks.link,
      isPending: false,
      isError: false,
    })
    mocks.useWalletTransactions.mockReturnValue({
      isLoading: false,
      data: { items: [] },
    })
    mocks.usePayableInvoices.mockReturnValue({ data: [] })
    mocks.getPaymentProviders.mockResolvedValue([
      { provider: 'mock-bank', label: 'Mock Bank (sandbox)', simulation: true },
    ])
  })

  it('asks an unlinked landlord for bank details and validates before submit', () => {
    mocks.useWallet.mockReturnValue({ isLoading: false, data: unlinked })
    render(<LandlordWallet />)

    const submit = screen.getByRole('button', { name: 'Liên kết ngân hàng' })
    expect(submit).toBeDisabled()

    fireEvent.change(screen.getByLabelText('Ngân hàng'), {
      target: { value: 'VCB' },
    })
    fireEvent.change(screen.getByLabelText('Số tài khoản'), {
      target: { value: '12ab' },
    })
    fireEvent.change(screen.getByLabelText('Tên chủ tài khoản'), {
      target: { value: 'Nguyen Van A' },
    })
    expect(submit).toBeDisabled()
    expect(
      screen.getByText('Số tài khoản gồm 6–19 chữ số.')
    ).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Số tài khoản'), {
      target: { value: '0123 456 789' },
    })
    expect(submit).toBeEnabled()
    fireEvent.click(submit)

    expect(mocks.link).toHaveBeenCalledWith(
      {
        bankCode: 'VCB',
        accountNumber: '0123456789',
        accountHolder: 'Nguyen Van A',
      },
      expect.any(Object)
    )
  })

  it('shows the masked bank account once linked, without any balance figure', () => {
    mocks.useWallet.mockReturnValue({ isLoading: false, data: linked })
    render(<LandlordWallet />)

    expect(screen.getByText(/Vietcombank · \*\*\*\*6789/)).toBeInTheDocument()
    expect(screen.queryByText('Số dư khả dụng')).not.toBeInTheDocument()
    expect(screen.queryByText('Tổng đã nhận')).not.toBeInTheDocument()
    expect(screen.queryByText('Phí sàn đã trả')).not.toBeInTheDocument()
    expect(
      screen.queryByRole('form', { name: 'Liên kết ngân hàng' })
    ).not.toBeInTheDocument()
  })

  it('pays an invoice through the payment gateway instead of a wallet balance', async () => {
    mocks.useWallet.mockReturnValue({ isLoading: false, data: linked })
    mocks.usePayableInvoices.mockReturnValue({
      data: [
        {
          paymentId: 'inv-ok',
          contractId: 'c1',
          amount: 2_000_000,
          vatAmount: 200_000,
          description: 'Landlord platform commission',
          dueDate: '2026-12-01T00:00:00.000Z',
          status: 'unpaid',
        },
      ],
    })
    mocks.initInvoicePayment.mockResolvedValue({
      txRef: 'invoice-ref',
      deepLink: 'https://bank.example/invoice-ref',
    })
    render(<LandlordWallet />)

    expect(screen.queryByText('Trả bằng số dư ví')).not.toBeInTheDocument()
    expect(screen.queryByText('Số dư chưa đủ.')).not.toBeInTheDocument()

    const payButton = screen.getByRole('button', { name: /Trả hóa đơn/ })
    fireEvent.click(payButton)

    await waitFor(() =>
      expect(mocks.initInvoicePayment).toHaveBeenCalledWith('inv-ok', {
        provider: 'mock-bank',
      })
    )
    expect(
      screen.getByRole('link', { name: 'Mở cổng thanh toán' })
    ).toHaveAttribute('href', 'https://bank.example/invoice-ref')
  })
})
