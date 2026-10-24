import { describe, it, expect } from 'vitest'
import type { ApartmentItem } from '@/entities/properties'
import {
  buildBedroomStats,
  buildDistrictStats,
  toFeaturedCard,
} from './home-apartment-stats'

function makeApartment(overrides: Partial<ApartmentItem> = {}): ApartmentItem {
  return {
    id: 'a1',
    title: 'Căn hộ A',
    district: 'Quận 2',
    location: 'TP. Hồ Chí Minh',
    priceNum: 10,
    areaNum: 50,
    bedrooms: 2,
    projectName: '',
    furniture: '',
    isVerified: false,
    images360: [],
    ...overrides,
  } as unknown as ApartmentItem
}

describe('buildDistrictStats', () => {
  it('counts per district, sorts by count and shows the price range', () => {
    const stats = buildDistrictStats([
      makeApartment({ district: 'Quận 2', priceNum: 10 }),
      makeApartment({ district: 'Quận 2', priceNum: 14 }),
      makeApartment({ district: 'Bình Thạnh', priceNum: 9 }),
    ])

    expect(stats).toEqual([
      { name: 'Quận 2', count: 2, priceRange: '10–14 Tr' },
      { name: 'Bình Thạnh', count: 1, priceRange: '9 Tr' },
    ])
  })

  it('returns an empty list for no apartments and skips blank districts', () => {
    expect(buildDistrictStats([])).toEqual([])
    expect(buildDistrictStats([makeApartment({ district: '  ' })])).toEqual([])
  })

  it('keeps only the 6 busiest districts and ignores non-positive prices', () => {
    const items = Array.from({ length: 8 }, (_, i) =>
      makeApartment({ district: `Quận ${i + 1}`, priceNum: 0 })
    )
    const stats = buildDistrictStats(items)

    expect(stats).toHaveLength(6)
    expect(stats[0]?.priceRange).toBe('')
  })
})

describe('buildBedroomStats', () => {
  it('summarises area range and minimum price per bedroom count', () => {
    const stats = buildBedroomStats([
      makeApartment({ bedrooms: 1, areaNum: 40, priceNum: 8.5 }),
      makeApartment({ bedrooms: 1, areaNum: 55, priceNum: 12 }),
      makeApartment({ bedrooms: 3, areaNum: 90, priceNum: 20 }),
    ])

    expect(stats).toEqual([
      { bedrooms: 1, count: 2, areaRange: '40–55 m²', minPrice: 'Từ 8.5 Tr' },
      { bedrooms: 3, count: 1, areaRange: '90 m²', minPrice: 'Từ 20 Tr' },
    ])
  })

  it('omits groups without apartments', () => {
    expect(buildBedroomStats([makeApartment({ bedrooms: 5 })])).toEqual([])
  })
})

describe('toFeaturedCard', () => {
  it('maps real fields and does not invent verification or VR flags', () => {
    const card = toFeaturedCard(makeApartment({ projectName: 'Masteri' }))

    expect(card.rent_price).toBe(10_000_000)
    expect(card.reasons).toEqual(['Dự án Masteri', 'Diện tích 50 m²'])
    expect(card.isVerified).toBe(false)
    expect(card.hasVr).toBe(false)
    expect(card).not.toHaveProperty('image_url')
  })

  it('uses the first gallery image and flags VR when 360 images exist', () => {
    const card = toFeaturedCard(
      makeApartment({
        gallery: ['g1.jpg'],
        images360: ['p1.jpg'],
        isVerified: true,
      })
    )

    expect(card.image_url).toBe('g1.jpg')
    expect(card.hasVr).toBe(true)
    expect(card.isVerified).toBe(true)
  })

  it('falls back to location when district is empty', () => {
    expect(toFeaturedCard(makeApartment({ district: '' })).district).toBe(
      'TP. Hồ Chí Minh'
    )
  })
})
