import { describe, expect, it } from 'vitest'
import {
  MAX_LAYOUT_EXTRAS,
  MAX_LAYOUT_ITEMS,
  isLayoutEmpty,
  normalizeFloorplanLayout,
  summarizeLayout,
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
      layout: { items: {}, extras: [] },
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

describe('floorplan layout', () => {
  it('keeps valid overrides and extras and rounds numbers like the viewer', () => {
    const layout = normalizeFloorplanLayout({
      items: { 'sofa-1': { x: 1.23456, z: 2, rot: Math.PI * 3, hidden: true } },
      extras: [{ id: 'extra-1', kind: 'chair', x: 2.34567, z: 3, rot: 0 }],
    })
    expect(layout).toEqual({
      items: { 'sofa-1': { x: 1.235, z: 2, rot: 3.1416, hidden: true } },
      extras: [{ id: 'extra-1', kind: 'chair', x: 2.346, z: 3, rot: 0 }],
    })
  })

  it('drops malformed entries instead of failing', () => {
    const layout = normalizeFloorplanLayout({
      items: {
        'bad id': { x: 1 },
        'sofa-1': { x: '2', z: Number.NaN, rot: Infinity },
        'bed-1': { x: 100 },
        'tv-1': 'nope',
      },
      extras: [
        { id: 'extra-1', kind: 'rug', x: 1, z: 1, rot: 0 },
        { id: 'extra-2', kind: 'chair', x: '1', z: 1, rot: 0 },
        { id: 'extra-3', kind: 'chair', x: 1, z: null, rot: 0 },
        { id: 'extra-4', kind: 'chair', x: 1, z: 1, rot: 0 },
        { id: 'extra-4', kind: 'sofa', x: 2, z: 2, rot: 0 },
      ],
    })
    expect(layout.items).toEqual({})
    expect(layout.extras.map(e => e.id)).toEqual(['extra-4'])
    expect(layout.extras[0]?.kind).toBe('chair')
  })

  it('returns an empty layout for missing or non-object input', () => {
    for (const bad of [undefined, null, 'x', 5, []]) {
      expect(isLayoutEmpty(normalizeFloorplanLayout(bad))).toBe(true)
    }
  })

  it('caps the number of overrides and extras at the contract limits', () => {
    const items = Object.fromEntries(
      Array.from({ length: 150 }, (_, i) => [`chair-${i}`, { x: 1 }])
    )
    const extras = Array.from({ length: 80 }, (_, i) => ({
      id: `extra-${i}`,
      kind: 'chair',
      x: 1,
      z: 1,
      rot: 0,
    }))
    const layout = normalizeFloorplanLayout({ items, extras })
    expect(Object.keys(layout.items)).toHaveLength(MAX_LAYOUT_ITEMS)
    expect(layout.extras).toHaveLength(MAX_LAYOUT_EXTRAS)
  })

  it('summarizes adjusted, hidden and added furniture for the admin', () => {
    const layout = normalizeFloorplanLayout({
      items: {
        'sofa-1': { x: 1, z: 1 },
        'bed-1': { hidden: true },
      },
      extras: [
        { id: 'extra-1', kind: 'chair', x: 1, z: 1, rot: 0, hidden: true },
        { id: 'extra-2', kind: 'sofa', x: 2, z: 2, rot: 0 },
      ],
    })
    expect(summarizeLayout(layout)).toEqual({
      adjusted: 1,
      hidden: 2,
      added: 2,
    })
  })

  it('keeps the layout when normalizing a whole design', () => {
    const design = normalizeFloorplanDesign({
      id: 'd',
      name: 'D',
      layout: { items: { 'sofa-1': { x: 3, z: 4 } } },
    })
    expect(design?.layout.items['sofa-1']).toEqual({ x: 3, z: 4 })
  })
})
