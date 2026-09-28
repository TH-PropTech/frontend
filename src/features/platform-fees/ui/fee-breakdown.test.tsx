import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FeeBreakdown } from './fee-breakdown'

describe('FeeBreakdown', () => {
  it('shows only the tenant fee and renders nothing when no schedule is active', () => {
    const snapshot = {
      scheduleId: 'schedule-1',
      version: 1,
      contentHash: 'hash',
      quote: [
        {
          feeKind: 'TENANT_SERVICE' as const,
          payerRole: 'tenant' as const,
          amountBeforeVat: 100_000,
          vatAmount: 10_000,
          amount: 110_000,
        },
        {
          feeKind: 'LANDLORD_COMMISSION' as const,
          payerRole: 'landlord' as const,
          amountBeforeVat: 1_000_000,
          vatAmount: 100_000,
          amount: 1_100_000,
        },
      ],
    }
    const { rerender } = render(<FeeBreakdown snapshot={snapshot} />)
    expect(screen.getByText('Phí dịch vụ người thuê')).toBeInTheDocument()
    expect(screen.queryByText('Hoa hồng chủ nhà')).not.toBeInTheDocument()
    rerender(<FeeBreakdown snapshot={null} />)
    expect(screen.queryByTestId('fee-breakdown')).not.toBeInTheDocument()
  })
})
