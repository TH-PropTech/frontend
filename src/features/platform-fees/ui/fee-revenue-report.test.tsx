import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { FeeRevenueReport } from './fee-revenue-report'

const getRevenue = vi.fn()

vi.mock('../api/platform-fees-api', () => ({
  getPlatformFeeRevenue: (...args: unknown[]) => getRevenue(...args),
}))

describe('FeeRevenueReport', () => {
  it('renders revenue totals from the supplied report', () => {
    render(
      <FeeRevenueReport
        initialData={{
          paid: 1_000_000,
          unpaid: 250_000,
          waived: 50_000,
          invoices: 4,
        }}
      />
    )

    expect(screen.getByTestId('fee-revenue-report')).toHaveTextContent(
      '1.000.000 ₫'
    )
    expect(screen.getByTestId('fee-revenue-report')).toHaveTextContent('4')
    expect(getRevenue).not.toHaveBeenCalled()
  })

  it('shows an API error when the report cannot be loaded', async () => {
    getRevenue.mockRejectedValueOnce(new Error('revenue unavailable'))
    render(<FeeRevenueReport />)

    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('revenue unavailable')
    )
  })
})
