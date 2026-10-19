import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiClientError } from '@/shared/api/api-client'
import { WalletLinkForm } from './wallet-link-form'

const mocks = vi.hoisted(() => ({ useLinkWallet: vi.fn(), mutate: vi.fn() }))

vi.mock('@/entities/wallet', () => ({ useLinkWallet: mocks.useLinkWallet }))

describe('WalletLinkForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.useLinkWallet.mockReturnValue({
      mutate: mocks.mutate,
      isPending: false,
      isError: false,
    })
  })

  it('submits the selected brand and relabels the input', () => {
    render(<WalletLinkForm />)
    fireEvent.click(screen.getByRole('radio', { name: 'Momo (mô phỏng)' }))
    fireEvent.change(screen.getByLabelText('Số tài khoản Momo'), {
      target: { value: '8100 0000 6789' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Liên kết ví' }))
    expect(mocks.mutate).toHaveBeenCalledWith(
      { accountNumber: '810000006789', brand: 'momo' },
      expect.any(Object)
    )
  })

  it('omits brand for the primary wallet and keeps 12-digit validation', () => {
    render(<WalletLinkForm />)
    fireEvent.change(screen.getByLabelText('Số tài khoản Ví Mộc'), {
      target: { value: '123' },
    })
    expect(screen.getByRole('button', { name: 'Liên kết ví' })).toBeDisabled()
    fireEvent.change(screen.getByLabelText('Số tài khoản Ví Mộc'), {
      target: { value: '810000006789' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Liên kết ví' }))
    expect(mocks.mutate).toHaveBeenCalledWith(
      { accountNumber: '810000006789' },
      expect.any(Object)
    )
  })

  it('shows the brand mismatch message', () => {
    mocks.useLinkWallet.mockReturnValue({
      mutate: mocks.mutate,
      isPending: false,
      isError: true,
      error: new ApiClientError('bad', 400, {
        code: 'HTTP_400',
        details: { code: 'WALLET_BRAND_MISMATCH' },
      } as never),
    })
    render(<WalletLinkForm />)
    expect(
      screen.getByText('Số tài khoản này không phải ví thuộc loại bạn chọn.')
    ).toBeInTheDocument()
  })
})
