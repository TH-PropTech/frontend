import { describe, expect, it } from 'vitest'
import { formatRentPrice, formatRentPriceCompact } from './format-rent-price'

describe('formatRentPrice', () => {
  it('formats millions with vi-VN decimals', () => {
    expect(formatRentPrice(14.5)).toBe('14,5 triệu/tháng')
  })

  it('switches to tỷ for values >= 1000 triệu', () => {
    expect(formatRentPrice(100000)).toBe('100 tỷ/tháng')
  })

  it('falls back when price is not a finite number', () => {
    expect(formatRentPrice(undefined, 'Liên hệ')).toBe('Liên hệ')
    expect(formatRentPrice(Number.NaN, 'Liên hệ')).toBe('Liên hệ')
  })
})

describe('formatRentPriceCompact', () => {
  it('returns short marker labels', () => {
    expect(formatRentPriceCompact(14.5)).toBe('14,5tr')
    expect(formatRentPriceCompact(500000)).toBe('500 tỷ')
  })
})
