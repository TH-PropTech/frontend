import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AdminWalletsView } from './admin-wallets-view'

vi.mock('../api/admin-wallets-api', () => ({
  getLandlordWallets: vi.fn().mockResolvedValue({
    items: [
      {
        userId: 'u1',
        name: 'Chủ nhà A',
        email: 'a@example.com',
        wallet: {
          userId: 'u1',
          status: 'linked',
          simulation: false,
          bank: { code: 'MOC', name: 'Ví Mộc' },
          accountHolder: 'A',
          accountNumberMasked: '****1234',
          accountNumber: null,
          linkedAt: null,
        },
      },
    ],
    total: 1,
    page: 1,
    limit: 50,
  }),
}))

describe('AdminWalletsView', () => {
  it('renders the landlord list without a platform wallet tab', async () => {
    render(<AdminWalletsView />)

    expect(await screen.findByText('Chủ nhà A')).toBeInTheDocument()
    expect(screen.getByText('Đã liên kết')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.queryByText(/ví giải ngân/i)).not.toBeInTheDocument()
  })

  it('renders pagination buttons when total exceeds limit', async () => {
    const { getLandlordWallets } = await import('../api/admin-wallets-api')
    vi.mocked(getLandlordWallets).mockResolvedValueOnce({
      items: [
        {
          userId: 'u1',
          name: 'Chủ nhà B',
          email: 'b@example.com',
          wallet: {
            userId: 'u1',
            status: 'unlinked',
            simulation: false,
            bank: null,
            accountHolder: null,
            accountNumberMasked: null,
            accountNumber: null,
            linkedAt: null,
          },
        },
      ],
      total: 30,
      page: 1,
      limit: 20,
    })

    render(<AdminWalletsView />)
    expect(await screen.findByText('Trang 1 / 2')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sau' })).toBeEnabled()
    expect(screen.getByRole('button', { name: 'Trước' })).toBeDisabled()
  })
})
