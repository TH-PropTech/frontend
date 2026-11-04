import { describe, expect, it } from 'vitest'
import {
  fixedDepositWarning,
  formatVndAmount,
  millionsToVnd,
  packageRentWarning,
  rentWarning,
} from './rent-limits'

describe('rent limits', () => {
  it('turns the millions typed in the form into whole dong', () => {
    expect(millionsToVnd(0.3)).toBe(300_000)
    expect(millionsToVnd(12.5)).toBe(12_500_000)
    expect(formatVndAmount(300_000)).toBe('300.000 ₫')
  })

  it('does not warn about rents from a few hundred thousand up to tens of millions', () => {
    for (const rent of [100_000, 300_000, 500_000, 12_000_000, 45_000_000]) {
      expect(rentWarning(rent)).toBeNull()
    }
  })

  it('warns when a rent looks like a unit slip', () => {
    expect(rentWarning(10_000_000_000)).toContain('khá cao')
    expect(rentWarning(100_000_000)).toContain('khá cao')
  })

  it('warns only when a package is priced far from the listing price', () => {
    expect(packageRentWarning(11_000_000, 12_000_000)).toBeNull()
    expect(packageRentWarning(9_000_000, 12_000_000)).toBeNull()
    expect(packageRentWarning(100_000_000_000, 10_000_000_000)).toContain(
      'lệch nhiều'
    )
    expect(packageRentWarning(100_000_000, 12_000_000)).toContain('lệch nhiều')
    expect(packageRentWarning(1_000_000, 12_000_000)).toContain('lệch nhiều')
  })

  it('warns about a fixed deposit above six months of rent', () => {
    expect(fixedDepositWarning(24_000_000, 12_000_000)).toBeNull()
    expect(fixedDepositWarning(80_000_000, 12_000_000)).toContain('cao hơn')
    expect(fixedDepositWarning(0, 12_000_000)).toBeNull()
  })
})
