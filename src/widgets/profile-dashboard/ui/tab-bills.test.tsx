import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, expect, it, vi } from 'vitest'
import type { UseProfileReturn } from '../model/use-profile'
import { TabBills } from './tab-bills'

vi.mock('./landlord-wallet', () => ({
  LandlordWallet: () => <div />,
}))
vi.mock('./landlord-payout-history', () => ({
  LandlordPayoutHistory: () => <div />,
}))
vi.mock('./components/tenant-bills-chart', () => ({
  TenantBillsChart: () => <div data-testid="tenant-bills-chart" />,
}))
vi.mock('./components/landlord-bills-chart', () => ({
  LandlordBillsChart: () => <div />,
}))
vi.mock('./components/landlord-revenue-chart', () => ({
  LandlordRevenueChart: () => <div />,
}))

describe('TabBills', () => {
  it('renders empty bills state with friendly message when tenant has no bills', () => {
    const profile = {
      role: 'tenant',
      bills: [],
      handleCopyText: vi.fn(),
      portfolio: {
        isLive: true,
        isLoading: false,
        isError: false,
        status: 'ready',
        retry: vi.fn(),
        properties: [],
        contractByProperty: {},
      },
    } as unknown as UseProfileReturn

    render(
      <QueryClientProvider client={new QueryClient()}>
        <TabBills profile={profile} />
      </QueryClientProvider>
    )

    expect(screen.getByText('Chưa có hóa đơn nào phát sinh')).toBeDefined()
  })

  it('renders list of bills when bills exist', () => {
    const profile = {
      role: 'tenant',
      bills: [
        {
          id: 'BILL-RENT-001',
          title: 'Tiền thuê nhà tháng 11',
          dueDate: '2026-11-05',
          amount: 15000000,
          status: 'paid',
          txHash: '0x12345678abcdef',
        },
      ],
      handleCopyText: vi.fn(),
      portfolio: {
        isLive: true,
        isLoading: false,
        isError: false,
        status: 'ready',
        retry: vi.fn(),
        properties: [],
        contractByProperty: {},
      },
    } as unknown as UseProfileReturn

    render(
      <QueryClientProvider client={new QueryClient()}>
        <TabBills profile={profile} />
      </QueryClientProvider>
    )

    expect(screen.getByText('Tiền thuê nhà tháng 11')).toBeDefined()
    expect(screen.getByText('15.000.000 VND')).toBeDefined()
    expect(screen.getByText('Đã thanh toán')).toBeDefined()
  })
})
