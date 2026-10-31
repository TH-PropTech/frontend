import { describe, expect, it } from 'vitest'
import { formatRentPrice, formatRentPriceCompact } from './format-rent-price'

describe('formatRentPrice', () => {
  it('luôn dùng dạng đầy đủ có ký hiệu ₫ (không "triệu")', () => {
    expect(formatRentPrice(14.5)).toBe(
      `${(14_500_000).toLocaleString('vi-VN')} ₫/tháng`
    )
    expect(formatRentPrice(0.5)).toBe(
      `${(500_000).toLocaleString('vi-VN')} ₫/tháng`
    )
  })

  it('không còn đổi sang "tỷ" cho giá rất lớn', () => {
    expect(formatRentPrice(100000)).toBe(
      `${(100_000_000_000).toLocaleString('vi-VN')} ₫/tháng`
    )
  })

  it('làm tròn sai số số thực', () => {
    expect(formatRentPrice(0.1 + 0.2)).toBe(
      `${(300_000).toLocaleString('vi-VN')} ₫/tháng`
    )
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
    expect(formatRentPriceCompact(0.1)).toBe('100k')
  })
})
