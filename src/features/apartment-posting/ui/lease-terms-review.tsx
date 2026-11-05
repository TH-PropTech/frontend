'use client'

import * as React from 'react'
import type { ApartmentFormValues } from '../model/types'
import { LEASE_TERM_DEFAULTS } from './lease-terms-fields'

export interface LeaseTermsReviewProps {
  packages: ApartmentFormValues['rentalPackages']
}

export function LeaseTermsReview({
  packages,
}: LeaseTermsReviewProps): React.JSX.Element | null {
  const active = (packages ?? []).filter(pkg => pkg.status === 'active')
  if (active.length === 0) return null

  return (
    <div
      className="rounded-xl border border-border/60 bg-muted/30 p-4 space-y-3"
      data-testid="lease-terms-review"
    >
      <h3 className="text-sm font-bold text-fg">Điều khoản hợp đồng của bạn</h3>
      {active.map(pkg => (
        <div
          key={pkg.durationMonths}
          className="space-y-1 text-xs text-muted-foreground"
          data-testid={`lease-terms-review-${pkg.durationMonths}`}
        >
          <p className="font-semibold text-fg">
            Gói {pkg.durationMonths} tháng
          </p>
          <p>
            Thanh toán ngày {pkg.paymentDay ?? LEASE_TERM_DEFAULTS.paymentDay}{' '}
            hằng tháng, lãi phạt{' '}
            {pkg.latePenaltyRate ?? LEASE_TERM_DEFAULTS.latePenaltyRate}%/năm,
            báo trước{' '}
            {pkg.terminationNoticeDays ??
              LEASE_TERM_DEFAULTS.terminationNoticeDays}{' '}
            ngày khi chấm dứt.
          </p>
          <p>
            Điều khoản riêng:{' '}
            {pkg.customClauses?.trim() ? pkg.customClauses : 'Không có'}
          </p>
        </div>
      ))}
    </div>
  )
}
