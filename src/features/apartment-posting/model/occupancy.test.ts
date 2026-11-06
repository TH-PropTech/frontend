import { describe, expect, it } from 'vitest'
import { suggestMaxOccupants } from './occupancy'

describe('suggestMaxOccupants', () => {
  it('takes the smaller of area / 8 and two people per bedroom', () => {
    expect(suggestMaxOccupants(40, 1)).toBe(2)
    expect(suggestMaxOccupants(75, 2)).toBe(4)
    expect(suggestMaxOccupants(30, 3)).toBe(3)
  })

  it('never goes below 1, even for a studio or a tiny area', () => {
    expect(suggestMaxOccupants(25, 0)).toBe(1)
    expect(suggestMaxOccupants(5, 2)).toBe(1)
  })

  it('caps at 20 people', () => {
    expect(suggestMaxOccupants(1000, 30)).toBe(20)
  })

  it('returns null while area or bedrooms are not valid yet', () => {
    expect(suggestMaxOccupants(0, 2)).toBeNull()
    expect(suggestMaxOccupants(Number.NaN, 2)).toBeNull()
    expect(suggestMaxOccupants(60, Number.NaN)).toBeNull()
    expect(suggestMaxOccupants(60, -1)).toBeNull()
  })
})
