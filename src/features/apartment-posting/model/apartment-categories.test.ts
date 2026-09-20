import { describe, expect, it } from 'vitest'
import { APARTMENT_CATEGORIES } from './apartment-categories'
import { apartmentPostingSchema } from './apartment-posting-schema'

describe('apartment categories', () => {
  it('only offers apartments: chung cư and chung cư mini / căn hộ dịch vụ', () => {
    expect(APARTMENT_CATEGORIES).toEqual([
      'Căn hộ chung cư',
      'Chung cư mini, căn hộ dịch vụ',
    ])
  })

  it.each(['Căn hộ chung cư', 'Chung cư mini, căn hộ dịch vụ'])(
    'schema accepts "%s"',
    category => {
      expect(
        apartmentPostingSchema.shape.category.safeParse(category).success
      ).toBe(true)
    }
  )

  it.each(['Nhà riêng', 'Văn phòng', 'Bất động sản khác', ''])(
    'schema rejects "%s"',
    category => {
      expect(
        apartmentPostingSchema.shape.category.safeParse(category).success
      ).toBe(false)
    }
  )
})
