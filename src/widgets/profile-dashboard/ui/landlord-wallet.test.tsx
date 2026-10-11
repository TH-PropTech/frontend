import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { LandlordWallet } from './landlord-wallet'

const mocks = vi.hoisted(() => ({
  useWallet: vi.fn(),
  useWalletBanks: vi.fn(),
  useLinkWallet: vi.fn(),
  useWalletTransactions: vi.fn(),
  usePayableInvoices: vi.fn(),
  usePayInvoiceFromWallet: vi.fn(),
  link: vi.fn(),
  pay: vi.fn(),
}))

vi.mock('@/entities/wallet', () => ({
  useWallet: mocks.useWallet,
  useWalletBanks: mocks.useWalletBanks,
  useLinkWallet: mocks.useLinkWallet,
  useWalletTransactions: mocks.useWalletTransactions,
  usePayableInvoices: mocks.usePayableInvoices,
  usePayInvoiceFromWallet: mocks.usePayInvoiceFromWallet,
}))

const unlinked = {
  status: 'unlinked',
  simulation: true,
  bank: null,
  accountHolder: null,
  accountNumberMasked: null,
  balance: 0,
  totalReceived: 0,
  totalFeesPaid: 0,
}

const linked = {
  ...unlinked,
  status: 'linked',
  bank: { code: 'VCB', name: 'Vietcombank' },
  accountHolder: 'NGUYEN VAN A',
  accountNumberMasked: '****6789',
  balance: 5_000_000,
  totalReceived: 6_000_000,
  totalFeesPaid: 1_000_000,
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
    mocks.usePayInvoiceFromWallet.mockReturnValue({
      mutate: mocks.pay,
      isPending: false,
      isError: false,
    })
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

  it('shows balance, totals and the masked bank account once linked', () => {
    mocks.useWallet.mockReturnValue({ isLoading: false, data: linked })
    render(<LandlordWallet />)

    expect(screen.getByText('5.000.000 VND')).toBeInTheDocument()
    expect(screen.getByText('6.000.000 VND')).toBeInTheDocument()
    expect(screen.getByText('1.000.000 VND')).toBeInTheDocument()
    expect(screen.getByText(/Vietcombank · \*\*\*\*6789/)).toBeInTheDocument()
    expect(
      screen.queryByRole('form', { name: 'Liên kết ngân hàng' })
    ).not.toBeInTheDocument()
  })

  it('pays an invoice from the balance only when the balance covers it', () => {
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
        {
          paymentId: 'inv-big',
          contractId: 'c2',
          amount: 9_000_000,
          vatAmount: 0,
          description: 'Landlord platform commission',
          dueDate: '2026-12-01T00:00:00.000Z',
          status: 'unpaid',
        },
      ],
    })
    render(<LandlordWallet />)

    const buttons = screen.getAllByRole('button', {
      name: 'Trả bằng số dư ví',
    })
    expect(buttons[0]).toBeEnabled()
    expect(buttons[1]).toBeDisabled()
    expect(screen.getByText('Số dư chưa đủ.')).toBeInTheDocument()

    const [okButton] = buttons
    if (!okButton) throw new Error('missing pay button')
    fireEvent.click(okButton)
    expect(mocks.pay).toHaveBeenCalledWith('inv-ok')
  })
})
