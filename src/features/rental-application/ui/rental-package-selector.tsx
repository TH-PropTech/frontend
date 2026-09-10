'use client'

import * as React from 'react'
import { CalendarDays, CircleDollarSign, ShieldCheck } from 'lucide-react'
import type { RentalPackageItem } from '@/entities/properties'

export interface RentalPackageSelectorProps {
  packages: RentalPackageItem[]
  value: string
  onChange: (packageId: string) => void
}

function formatMoney(value: number): string {
  return new Intl.NumberFormat('vi-VN').format(value)
}

export function RentalPackageSelector({
  packages,
  value,
  onChange,
}: RentalPackageSelectorProps): React.ReactElement {
  const activePackages = packages.filter(item => item.status === 'active')

  if (activePackages.length === 0) {
    return (
      <p className="rounded-lg border border-border bg-surface-muted p-3 text-xs text-muted">
        Chủ nhà chưa công bố gói thuê. Bạn có thể gửi thời hạn thuê tùy chỉnh.
      </p>
    )
  }

  return (
    <fieldset className="space-y-2">
      <legend className="text-xs font-medium text-muted">
        Gói thuê đã duyệt
      </legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {activePackages.map(item => {
          const selected = item.packageId === value
          return (
            <label
              key={`${item.packageId}-${item.version}`}
              className={`cursor-pointer rounded-lg border p-3 transition-colors ${
                selected
                  ? 'border-primary bg-primary-soft'
                  : 'border-border bg-surface hover:bg-surface-muted'
              }`}
            >
              <input
                className="sr-only"
                type="radio"
                name="rentalPackage"
                value={item.packageId}
                checked={selected}
                onChange={() => onChange(item.packageId)}
                aria-label={`${item.durationMonths} tháng`}
                data-testid={`rental-package-${item.packageId}`}
              />
              <span className="flex items-center justify-between gap-2 text-sm font-semibold text-fg">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays
                    className="h-4 w-4 text-primary"
                    aria-hidden="true"
                  />
                  {item.durationMonths} tháng
                </span>
                <span>{formatMoney(item.monthlyRent)} đ/tháng</span>
              </span>
              <span className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                <CircleDollarSign className="h-3.5 w-3.5" aria-hidden="true" />
                Cọc {formatMoney(item.resolvedDepositAmount)} đ
              </span>
              <span className="mt-1 flex items-center gap-1.5 text-[11px] text-muted">
                <ShieldCheck
                  className="h-3.5 w-3.5 text-success"
                  aria-hidden="true"
                />
                Phiên bản {item.version}
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
