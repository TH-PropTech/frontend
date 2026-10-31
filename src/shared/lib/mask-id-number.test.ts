import { describe, it, expect } from 'vitest'
import { maskIdNumber } from './mask-id-number'

describe('maskIdNumber', () => {
  it('che số 12 chữ số, giữ 3 đầu và 3 cuối', () => {
    expect(maskIdNumber('080123456567')).toBe('080***567')
  })
  it('cắt khoảng trắng hai đầu trước khi che', () => {
    expect(maskIdNumber(' 080123456567 ')).toBe('080***567')
  })
  it('trả null khi rỗng, null, undefined hoặc dưới 6 ký tự', () => {
    expect(maskIdNumber('')).toBeNull()
    expect(maskIdNumber(null)).toBeNull()
    expect(maskIdNumber(undefined)).toBeNull()
    expect(maskIdNumber('12345')).toBeNull()
  })
  it('đúng 6 ký tự vẫn che', () => {
    expect(maskIdNumber('123456')).toBe('123***456')
  })
})
