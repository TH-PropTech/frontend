import { describe, expect, it } from 'vitest'
import {
  normalizeFloorplanDesign,
  normalizeFloorplanDesigns,
  resolveDesignPalette,
} from './floorplan-design'

describe('floorplan design', () => {
  it('normalizes a valid design and lowercases overrides', () => {
    expect(
      normalizeFloorplanDesign({
        id: 'd1',
        name: '  Bắc Âu  ',
        theme: 'nordic',
        palette: { floor: '#AABBCC', wall: 'not-a-color' },
        furnishing: 'partial',
        defaultHour: 15,
      })
    ).toEqual({
      id: 'd1',
      name: 'Bắc Âu',
      description: '',
      theme: 'nordic',
      palette: { floor: '#aabbcc' },
      furnishing: 'partial',
      defaultHour: 15,
    })
  })

  it('falls back to safe defaults for unknown values', () => {
    expect(
      normalizeFloorplanDesign({
        id: 'd2',
        name: 'X',
        theme: 'hacker',
        furnishing: 'luxury',
        defaultHour: 99,
      })
    ).toMatchObject({
      theme: 'modern',
      furnishing: null,
      defaultHour: 18,
    })
  })

  it('drops entries without id or name and caps the list', () => {
    expect(normalizeFloorplanDesign({ id: '', name: 'A' })).toBeNull()
    expect(normalizeFloorplanDesign({ id: 'a', name: '  ' })).toBeNull()
    expect(normalizeFloorplanDesigns('nope')).toEqual([])
    const many = Array.from({ length: 30 }, (_, i) => ({
      id: `d${i}`,
      name: `D${i}`,
    }))
    expect(normalizeFloorplanDesigns(many)).toHaveLength(20)
  })

  it('layers palette overrides over the theme colors', () => {
    const palette = resolveDesignPalette({
      theme: 'warm',
      palette: { sofa: '#112233' },
    })
    expect(palette.sofa).toBe('#112233')
    expect(palette.floor).toBe('#b98458')
  })
})
