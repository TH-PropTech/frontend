import { describe, expect, it } from 'vitest'
import { normalizeFloorplanConfig, toFloorplanConfig } from './floorplan-config'

describe('floorplan config', () => {
  it('normalizes a valid listing into the renderer contract', () => {
    const result = normalizeFloorplanConfig({
      apartmentId: 'apt-1',
      bedrooms: 2,
      bathrooms: 2,
      areaM2: 75,
      furnishing: 'full',
    })

    expect(result).toEqual({
      version: 1,
      apartmentId: 'apt-1',
      bedrooms: 2,
      bathrooms: 2,
      areaM2: 75,
      furnishing: 'full',
      designs: [],
      designId: null,
    })
  })

  it('rejects invalid numeric values and missing identifiers', () => {
    expect(
      normalizeFloorplanConfig({
        apartmentId: '',
        bedrooms: -1,
        bathrooms: Number.NaN,
        areaM2: 0,
        furnishing: 'full',
      })
    ).toBeNull()
  })

  it('maps Vietnamese furnishing labels to stable renderer levels', () => {
    const result = toFloorplanConfig({
      id: 'apt-2',
      bedrooms: 1,
      bathrooms: 1,
      areaNum: 48,
      furniture: 'Đầy đủ nội thất',
    })

    expect(result?.furnishing).toBe('full')
  })

  it('falls back to partial furnishing for an unknown label', () => {
    const result = toFloorplanConfig({
      id: 'apt-3',
      bedrooms: 1,
      bathrooms: 1,
      areaNum: 48,
      furniture: 'Chưa xác định',
    })

    expect(result?.furnishing).toBe('partial')
  })
})
