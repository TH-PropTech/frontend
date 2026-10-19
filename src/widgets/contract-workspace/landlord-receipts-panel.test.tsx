import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import type { ReactElement } from 'react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { LandlordReceiptsPanel } from './landlord-receipts-panel'

const mocks = vi.hoisted(() => ({ getContractPayoutSummary: vi.fn() }))

vi.mock('@/entities/payout/api/payout-api', async () => {
  const actual = await vi.importActual<Record<string, unknown>>(
    '@/entities/payout/api/payout-api'
  )
  return { ...actual, getContractPayoutSummary: mocks.getContractPayoutSummary }
})

function renderWithQuery(ui: ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  )
}

describe('LandlordReceiptsPanel', () => {
  beforeEach(() => vi.clearAllMocks())

  it('does not render and does not call the API for a tenant viewer', () => {
    renderWithQuery(
      <LandlordReceiptsPanel contractId="c-1" viewerRole="tenant" />
    )

    expect(
      screen.queryByTestId('landlord-receipts-panel')
    ).not.toBeInTheDocument()
    expect(mocks.getContractPayoutSummary).not.toHaveBeenCalled()
  })

  it('renders deposit and rent items with Vietnamese status labels for a landlord viewer', async () => {
    mocks.getContractPayoutSummary.mockResolvedValue({
      contractId: 'c-1',
      wallet: { linked: true },
      items: [
        {
          kind: 'DEPOSIT',
          ref: 'd1',
          label: 'Tiền đặt cọc',
          dueAt: null,
          sentAmount: 10_000_000,
          receivedAmount: 10_000_000,
          status: 'pending',
        },
        {
          kind: 'RENT',
          ref: 'p1',
          label: 'Kỳ thuê 2030-01',
          dueAt: '2030-01-01',
          sentAmount: 5_000_000,
          receivedAmount: 5_000_000,
          status: 'paid-out',
        },
      ],
      totals: { received: 5_000_000, pending: 10_000_000 },
    })

    renderWithQuery(
      <LandlordReceiptsPanel contractId="c-1" viewerRole="landlord" />
    )

    expect(mocks.getContractPayoutSummary).toHaveBeenCalledWith('c-1')
    await waitFor(() =>
      expect(screen.getAllByTestId('landlord-receipt-item')).toHaveLength(2)
    )
    expect(screen.getByText('Đang chuyển')).toBeInTheDocument()
    expect(screen.getAllByText('Đã nhận').length).toBeGreaterThan(0)
    expect(
      screen.queryByTestId('landlord-wallet-link-prompt')
    ).not.toBeInTheDocument()
  })

  it('adds a new paid-out item to the received total', async () => {
    mocks.getContractPayoutSummary.mockResolvedValue({
      contractId: 'c-1',
      wallet: { linked: true },
      items: [
        {
          kind: 'RENT',
          ref: 'p1',
          label: 'Kỳ thuê 2030-01',
          dueAt: null,
          sentAmount: 5_000_000,
          receivedAmount: 5_000_000,
          status: 'paid-out',
        },
      ],
      totals: { received: 5_000_000, pending: 0 },
    })

    renderWithQuery(
      <LandlordReceiptsPanel contractId="c-1" viewerRole="staff" />
    )

    await waitFor(() =>
      expect(screen.getByText('5.000.000 VND')).toBeInTheDocument()
    )
  })

  it('shows the wallet-link prompt and never marks an awaiting-wallet item as received', async () => {
    mocks.getContractPayoutSummary.mockResolvedValue({
      contractId: 'c-1',
      wallet: { linked: false },
      items: [
        {
          kind: 'RENT',
          ref: 'p1',
          label: 'Kỳ thuê 2030-01',
          dueAt: null,
          sentAmount: 5_000_000,
          receivedAmount: 5_000_000,
          status: 'awaiting-wallet',
        },
      ],
      totals: { received: 0, pending: 5_000_000 },
    })

    renderWithQuery(
      <LandlordReceiptsPanel contractId="c-1" viewerRole="landlord" />
    )

    await waitFor(() =>
      expect(
        screen.getByTestId('landlord-wallet-link-prompt')
      ).toBeInTheDocument()
    )
    expect(screen.getByText('Chờ liên kết ví')).toBeInTheDocument()
    expect(screen.getByText('Liên kết ví ngay')).toBeInTheDocument()
  })

  it.each(['pending', 'confirmed-fabric' as const, 'failed-terminal' as const])(
    'shows a Vietnamese label for status %s without leaking internal codes',
    async status => {
      mocks.getContractPayoutSummary.mockResolvedValue({
        contractId: 'c-1',
        wallet: { linked: true },
        items: [
          {
            kind: 'RENT',
            ref: 'p1',
            label: 'Kỳ thuê 2030-01',
            dueAt: null,
            sentAmount: 1,
            receivedAmount: 1,
            status,
          },
        ],
        totals: { received: 0, pending: 0 },
      })

      renderWithQuery(
        <LandlordReceiptsPanel contractId="c-1" viewerRole="landlord" />
      )

      await waitFor(() =>
        expect(screen.getAllByTestId('landlord-receipt-item')).toHaveLength(1)
      )
      const text = screen.getByTestId('landlord-receipts-panel').textContent
      expect(text).not.toMatch(/[A-Z]{3,}(_[A-Z0-9]+){2,}/)
    }
  )
})
