import { describe, expect, it } from 'vitest'
import type { RentalPackageItem } from '@/entities/properties'
import { buildEstimatedCost, buildPackageCost } from './initial-cost'

const base: RentalPackageItem = {
  packageId: 'p1',
  version: 1,
  durationMonths: 12,
  monthlyRent: 13_000_000,
  depositPolicy: { type: 'MONTHS_OF_RENT', months: 2 },
  resolvedDepositAmount: 26_000_000,
  status: 'active',
}

describe('initial cost', () => {
  it('splits holding deposit and security top-up, adds prepaid rent', () => {
    const cost = buildPackageCost({
      ...base,
      resolvedHoldingDepositAmount: 5_000_000,
      resolvedSecurityTopUpAmount: 21_000_000,
      prepaidRent: { type: 'MONTHS', months: 1 },
      resolvedPrepaidRentAmount: 13_000_000,
    })
    expect(cost.segments.map(s => s.key)).toEqual([
      'holding',
      'security',
      'prepaid',
    ])
    expect(cost.total).toBe(39_000_000)
    expect(cost.estimated).toBe(false)
  })

  it('omits prepaid rent for deposit-only packages', () => {
    const cost = buildPackageCost({
      ...base,
      prepaidRent: { type: 'NONE' },
      resolvedPrepaidRentAmount: 0,
    })
    expect(cost.segments.map(s => s.key)).toEqual(['deposit'])
    expect(cost.total).toBe(26_000_000)
  })

  it('falls back to first payment cycle for legacy packages', () => {
    const cost = buildPackageCost(base)
    expect(cost.total).toBe(39_000_000)
  })

  it('estimates from listing price when there is no package', () => {
    const cost = buildEstimatedCost(13_000_000)
    expect(cost.total).toBe(39_000_000)
    expect(cost.estimated).toBe(true)
  })
})
