import { describe, expect, it } from 'vitest'
import {
  PROPERTY_MAP_ATTRIBUTION,
  PROPERTY_MAP_TILE_URL,
} from './properties-map'

describe('PropertiesMap tile provider', () => {
  it('uses public OpenStreetMap tiles with attribution instead of a key-gated provider', () => {
    expect(PROPERTY_MAP_TILE_URL).toBe(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    )
    expect(PROPERTY_MAP_TILE_URL).not.toMatch(/api[-_]?key|token/i)
    expect(PROPERTY_MAP_ATTRIBUTION).toContain('OpenStreetMap')
  })
})
