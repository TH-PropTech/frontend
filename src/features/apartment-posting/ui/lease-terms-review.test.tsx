import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LeaseTermsReview } from './lease-terms-review'
import type { ApartmentFormValues } from '../model/types'

const pkg = {
  packageId: 'pkg-12',
  version: 1,
  durationMonths: 12 as const,
  monthlyRent: 12_000_000,
  depositPolicy: { type: 'MONTHS_OF_RENT' as const, months: 2 },
  status: 'active' as const,
}

describe('LeaseTermsReview', () => {
  it('renders nothing without an active package', () => {
    const { container } = render(
      <LeaseTermsReview packages={[{ ...pkg, status: 'inactive' }]} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('shows the defaults for a package without terms', () => {
    render(
      <LeaseTermsReview
        packages={[pkg] as ApartmentFormValues['rentalPackages']}
      />
    )
    const text = screen.getByTestId('lease-terms-review-12').textContent
    expect(text).toContain('Thanh toán ngày 1 hằng tháng')
    expect(text).toContain('báo trước 30 ngày')
    expect(text).toContain('Điều khoản riêng: Không có')
  })

  it('shows the terms the landlord entered', () => {
    render(
      <LeaseTermsReview
        packages={
          [
            {
              ...pkg,
              paymentDay: 5,
              latePenaltyRate: 10,
              terminationNoticeDays: 45,
              customClauses: 'Không nuôi thú cưng.',
            },
          ] as ApartmentFormValues['rentalPackages']
        }
      />
    )
    const text = screen.getByTestId('lease-terms-review-12').textContent
    expect(text).toContain('Thanh toán ngày 5 hằng tháng')
    expect(text).toContain('lãi phạt 10%/năm')
    expect(text).toContain('báo trước 45 ngày')
    expect(text).toContain('Không nuôi thú cưng.')
  })
})
