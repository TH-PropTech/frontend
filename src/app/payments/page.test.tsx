import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import PaymentsPage from './page'

vi.mock('@/features/payments/ui/payment-result-panel', () => ({
  PaymentResultPanel: ({ txRef }: { txRef: string | null }) => (
    <div>{txRef ?? 'missing reference'}</div>
  ),
}))

describe('PaymentsPage', () => {
  it('passes a single server reference to the result panel', async () => {
    render(
      await PaymentsPage({ searchParams: Promise.resolve({ txRef: 'MOMO-1' }) })
    )

    expect(screen.getByText('MOMO-1')).toBeTruthy()
  })

  it('ignores an ambiguous reference', async () => {
    render(
      await PaymentsPage({
        searchParams: Promise.resolve({ txRef: ['MOMO-1', 'MOMO-2'] }),
      })
    )

    expect(screen.getByText('missing reference')).toBeTruthy()
  })
})
