import { render, screen } from '@testing-library/react'
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
    } as unknown as UseProfileReturn

    render(<TabBills profile={profile} />)

    expect(screen.getByText('Demo')).toBeTruthy()
  })
})
