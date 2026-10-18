import { describe, expect, it } from 'vitest'
import {
  describePrepaidRent,
  explainPrepaidRent,
  resolvePrepaidMonths,
} from './prepaid-rent'

describe('prepaid rent helpers', () => {
  it('resolves the policy to a number of months', () => {
    expect(resolvePrepaidMonths(undefined, 12)).toBeNull()
    expect(resolvePrepaidMonths({ type: 'NONE' }, 12)).toBe(0)
    expect(resolvePrepaidMonths({ type: 'FULL' }, 12)).toBe(12)
    expect(resolvePrepaidMonths({ type: 'MONTHS', months: 3 }, 12)).toBe(3)
  })

  it('keeps prepaid months inside the package duration', () => {
    expect(resolvePrepaidMonths({ type: 'MONTHS', months: 99 }, 6)).toBe(6)
    expect(resolvePrepaidMonths({ type: 'MONTHS', months: 0 }, 6)).toBe(1)
  })

  it('labels each option for the contract summary', () => {
    expect(describePrepaidRent({ policy: 'NONE', months: 0 })).toBe(
      'Tiền thuê trả trước: không (chỉ đặt cọc)'
    )
    expect(describePrepaidRent({ policy: 'MONTHS', months: 2 })).toBe(
      'Tiền thuê trả trước: 2 tháng'
    )
    expect(describePrepaidRent({ policy: 'FULL', months: 12 })).toBe(
      'Tiền thuê trả trước: toàn bộ (12 tháng)'
    )
  })

  it('explains each option to the tenant', () => {
    expect(explainPrepaidRent({ policy: 'NONE', months: 0 })).toContain(
      'Chỉ cần đặt cọc'
    )
    expect(explainPrepaidRent({ policy: 'FULL', months: 6 })).toContain(
      'toàn bộ 6 tháng'
    )
    expect(explainPrepaidRent({ policy: 'MONTHS', months: 3 })).toContain(
      'Trả trước 3 tháng'
    )
  })
})
