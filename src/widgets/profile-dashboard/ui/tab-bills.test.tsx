import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, expect, it, vi } from 'vitest'
import type { UseProfileReturn } from '../model/use-profile'
import { TabBills } from './tab-bills'

vi.mock('./landlord-escrow', () => ({
  LandlordEscrow: () => <div />,
}))
vi.mock('./components/tenant-bills-chart', () => ({
  TenantBillsChart: () => <div />,
}))
vi.mock('./components/landlord-bills-chart', () => ({
  LandlordBillsChart: () => <div />,
}))

describe('TabBills', () => {
  it('labels the profile bill table as demo data', () => {
    const profile = {
      role: 'tenant',
      bills: [],
      firstMonthPaid: false,
      handleCopyText: vi.fn(),
      portfolio: {
        isLive: false,
        isLoading: false,
        isError: false,
        properties: [],
        contractByProperty: {},
      },
    } as unknown as UseProfileReturn

    render(
      <QueryClientProvider client={new QueryClient()}>
        <TabBills profile={profile} />
      </QueryClientProvider>
    )

    expect(screen.getByText('Demo')).toBeTruthy()
  })
})
