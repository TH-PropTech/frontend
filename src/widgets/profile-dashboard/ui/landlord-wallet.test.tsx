import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiClientError } from '@/shared/api'
import { LandlordWallet } from './landlord-wallet'

const mocks = vi.hoisted(() => ({
  useWallet: vi.fn(),
  useLinkWallet: vi.fn(),
  useWalletTransactions: vi.fn(),
  usePayableInvoices: vi.fn(),
  useReceivingStatus: vi.fn(),
  useReportPayoutIssue: vi.fn(),
  link: vi.fn(),
  getPaymentProviders: vi.fn(),
  initInvoicePayment: vi.fn(),
}))

vi.mock('@/entities/wallet', () => ({
  useWallet: mocks.useWallet,
  useLinkWallet: mocks.useLinkWallet,
  useWalletTransactions: mocks.useWalletTransactions,
  usePayableInvoices: mocks.usePayableInvoices,
  useReceivingStatus: mocks.useReceivingStatus,
  useReportPayoutIssue: mocks.useReportPayoutIssue,
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
  accountNumber: null,
  linkedAt: null,
}

const linked = {
  ...unlinked,
  status: 'linked',
  bank: { code: 'MOCBANK', name: 'Ví Mộc' },
  accountHolder: 'NGUYEN VAN A',
  accountNumberMasked: '****6789',
  accountNumber: '810000006789',
  linkedAt: '2026-01-01T00:00:00.000Z',
}

describe('LandlordWallet', () => {
  beforeEach(() => {
    vi.clearAllMocks()
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
    mocks.useReceivingStatus.mockReturnValue({
      isLoading: true,
      refreshNow: vi.fn(),
    })
    mocks.useReportPayoutIssue.mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    })
    mocks.getPaymentProviders.mockResolvedValue([
      { provider: 'mock-bank', label: 'Mock Bank (sandbox)', simulation: true },
    ])
  })

  it('asks an unlinked landlord for a Ví Mộc account number and validates before submit', () => {
    mocks.useWallet.mockReturnValue({ isLoading: false, data: unlinked })
    render(<LandlordWallet />)

    const submit = screen.getByRole('button', { name: 'Liên kết ví' })
    expect(submit).toBeDisabled()

    fireEvent.change(screen.getByLabelText('Số tài khoản Ví Mộc'), {
      target: { value: '12ab' },
    })
    expect(submit).toBeDisabled()
    expect(
      screen.getByText('Số tài khoản Ví Mộc gồm đúng 12 chữ số.')
    ).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Số tài khoản Ví Mộc'), {
      target: { value: '8100 0000 6789' },
    })
    expect(submit).toBeEnabled()
    fireEvent.click(submit)

    expect(mocks.link).toHaveBeenCalledWith(
      { accountNumber: '810000006789' },
      expect.any(Object)
    )
  })

  it('shows the masked bank account once linked, without any balance figure', () => {
    mocks.useWallet.mockReturnValue({ isLoading: false, data: linked })
    render(<LandlordWallet />)

    expect(screen.getByText(/Ví Mộc · \*\*\*\*6789/)).toBeInTheDocument()
    expect(screen.queryByText('Số dư khả dụng')).not.toBeInTheDocument()
    expect(screen.queryByText('Tổng đã nhận')).not.toBeInTheDocument()
    expect(screen.queryByText('Phí sàn đã trả')).not.toBeInTheDocument()
    expect(
      screen.queryByRole('form', { name: 'Liên kết ví Ví Mộc' })
    ).not.toBeInTheDocument()
  })

  it('lists extra brand accounts and tolerates a missing extraAccounts', () => {
    mocks.useWallet.mockReturnValue({
      isLoading: false,
      data: {
        ...linked,
        extraAccounts: [
          {
            brand: 'momo',
            accountHolder: 'NGUYEN VAN A',
            accountNumberMasked: '****1111',
            accountNumber: '820000001111',
            linkedAt: null,
          },
        ],
      },
    })
    const { unmount } = render(<LandlordWallet />)
    expect(screen.getByTestId('wallet-extra-momo')).toHaveTextContent(
      'Momo · ****1111 · NGUYEN VAN A'
    )
    expect(screen.getByText('820000001111')).toBeInTheDocument()
    expect(screen.getByText(/Tài khoản mô phỏng trong Ví Mộc/)).toBeTruthy()
    unmount()

    mocks.useWallet.mockReturnValue({ isLoading: false, data: linked })
    render(<LandlordWallet />)
    expect(screen.queryByTestId('wallet-extra-momo')).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Thêm ví khác' })
    ).toBeInTheDocument()
  })

  it('pays an invoice with an in-app Ví Mộc QR instead of redirecting', async () => {
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
    mocks.getPaymentProviders.mockResolvedValue([
      { provider: 'mocbank', label: 'Ví Mộc', simulation: true },
    ])
    mocks.initInvoicePayment.mockResolvedValue({
      txRef: 'invoice-ref',
      amount: 2_000_000,
      deepLink: 'https://bank.example/invoice-ref',
    })
    render(<LandlordWallet />)

    expect(screen.queryByText('Trả bằng số dư ví')).not.toBeInTheDocument()
    expect(screen.queryByText('Số dư chưa đủ.')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Trả hóa đơn/ }))

    await waitFor(() =>
      expect(mocks.initInvoicePayment).toHaveBeenCalledWith('inv-ok', {
        provider: 'mocbank',
      })
    )
    expect(mocks.getPaymentProviders).toHaveBeenCalledWith('invoice')
    expect(
      await screen.findByText(
        'Quét mã bằng Ví Mộc để thanh toán phí hoa hồng cho sàn'
      )
    ).toBeInTheDocument()
    expect(screen.getByTestId('invoice-qr')).toHaveAttribute(
      'data-value',
      'https://bank.example/invoice-ref'
    )
    expect(screen.getByRole('link', { name: 'Mở Ví Mộc' })).toHaveAttribute(
      'href',
      'https://bank.example/invoice-ref'
    )
  })

  it('shows a Vietnamese message when the invoice provider is rejected', async () => {
    mocks.useWallet.mockReturnValue({ isLoading: false, data: linked })
    mocks.usePayableInvoices.mockReturnValue({
      data: [
        {
          paymentId: 'inv-bad',
          contractId: 'c1',
          amount: 1_000_000,
          vatAmount: 100_000,
          description: 'Landlord platform commission',
          dueDate: '2026-12-01T00:00:00.000Z',
          status: 'unpaid',
        },
      ],
    })
    mocks.initInvoicePayment.mockRejectedValue(
      new ApiClientError('Unprocessable', 422, {
        code: 'INVOICE_PROVIDER_NOT_SUPPORTED',
        message: 'x',
      })
    )
    render(<LandlordWallet />)
    fireEvent.click(screen.getByRole('button', { name: /Trả hóa đơn/ }))
    expect(
      await screen.findByText('Hóa đơn phí sàn chỉ thanh toán được qua Ví Mộc.')
    ).toBeInTheDocument()
  })
})
