import { describe, expect, it } from 'vitest'
import { joinAddressParts } from './join-address'

describe('joinAddressParts', () => {
  it('joins full address parts cleanly', () => {
    expect(
      joinAddressParts(
        'Số 10 Lê Lợi',
        'Phường Bến Nghé',
        'Quận 1',
        'TP. Hồ Chí Minh'
      )
    ).toBe('Số 10 Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh')
  })

  it('filters out empty, null, and undefined segments without leading or trailing commas', () => {
    // Only city
    expect(joinAddressParts('', '', '', 'Điện Biên')).toBe('Điện Biên')
    expect(joinAddressParts(null, undefined, 'Điện Biên')).toBe('Điện Biên')
    // Missing ward/district
    expect(joinAddressParts('Ngõ 5', '', 'Quận Ba Đình', 'Hà Nội')).toBe(
      'Ngõ 5, Quận Ba Đình, Hà Nội'
    )
  })

  it('returns empty string when all parts are empty or null', () => {
    expect(joinAddressParts('', null, undefined, '   ')).toBe('')
  })
})
