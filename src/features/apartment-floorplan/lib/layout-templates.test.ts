import { describe, expect, it } from 'vitest'
import { runRendererScripts } from './renderer-script-harness'

type Side = 'front' | 'back' | 'east' | 'west'

interface Rect {
  x: number
  z: number
  width: number
  depth: number
}

interface TemplateRoom extends Rect {
  id: string
  label: string
  kind: string
  doors: Side[]
}

interface FloorplanTemplate {
  rooms: TemplateRoom[]
  circulation: Rect[]
  width: number
  depth: number
  scale: number
}

interface TemplatesApi {
  create: (config: {
    bedrooms: number
    bathrooms: number
    areaM2: number
    furnishing: string
  }) => FloorplanTemplate
}

const EPSILON = 1e-6
const MAX_ROOMS = 8

const templates = runRendererScripts(['layout-templates.js'])
  .FloorplanTemplates as TemplatesApi

const combos = Array.from({ length: MAX_ROOMS + 1 }, (_, bedrooms) =>
  Array.from({ length: MAX_ROOMS + 1 }, (_, bathrooms) => ({
    bedrooms,
    bathrooms,
  }))
).flat()

function build(bedrooms: number, bathrooms: number, areaM2 = 75) {
  return templates.create({
    bedrooms,
    bathrooms,
    areaM2,
    furnishing: 'partial',
  })
}

function edges(rect: Rect) {
  return {
    minX: rect.x - rect.width / 2,
    maxX: rect.x + rect.width / 2,
    minZ: rect.z - rect.depth / 2,
    maxZ: rect.z + rect.depth / 2,
  }
}

function overlaps(a: Rect, b: Rect): boolean {
  const ea = edges(a)
  const eb = edges(b)
  const overlapX = Math.min(ea.maxX, eb.maxX) - Math.max(ea.minX, eb.minX)
  const overlapZ = Math.min(ea.maxZ, eb.maxZ) - Math.max(ea.minZ, eb.minZ)
  return overlapX > EPSILON && overlapZ > EPSILON
}

function doorOpensOnto(room: Rect, side: Side, target: Rect): boolean {
  const r = edges(room)
  const t = edges(target)
  const spanX = Math.min(r.maxX, t.maxX) - Math.max(r.minX, t.minX)
  const spanZ = Math.min(r.maxZ, t.maxZ) - Math.max(r.minZ, t.minZ)
  if (side === 'front')
    return Math.abs(r.maxZ - t.minZ) < EPSILON && spanX > EPSILON
  if (side === 'back')
    return Math.abs(r.minZ - t.maxZ) < EPSILON && spanX > EPSILON
  if (side === 'east')
    return Math.abs(r.maxX - t.minX) < EPSILON && spanZ > EPSILON
  return Math.abs(r.minX - t.maxX) < EPSILON && spanZ > EPSILON
}

function nameOf(rect: Rect): string {
  return 'id' in rect ? String((rect as TemplateRoom).id) : 'hallway'
}

describe('layout-templates', () => {
  it('produces identical layouts for identical input', () => {
    expect(JSON.stringify(build(3, 2))).toBe(JSON.stringify(build(3, 2)))
  })

  it('never overlaps rooms or hallways for 0-8 bedrooms x 0-8 bathrooms', () => {
    const clashes: string[] = []
    combos.forEach(({ bedrooms, bathrooms }) => {
      const template = build(bedrooms, bathrooms)
      const rects: Rect[] = [...template.rooms, ...template.circulation]
      rects.forEach((a, index) =>
        rects.slice(index + 1).forEach(b => {
          if (overlaps(a, b))
            clashes.push(
              `${bedrooms}/${bathrooms}: ${nameOf(a)} x ${nameOf(b)}`
            )
        })
      )
    })
    expect(clashes).toEqual([])
  })

  it('draws exactly the listed number of bedrooms and bathrooms', () => {
    const mismatches: string[] = []
    combos.forEach(({ bedrooms, bathrooms }) => {
      const { rooms } = build(bedrooms, bathrooms)
      const drawnBedrooms = rooms.filter(room => room.kind === 'bedroom').length
      const drawnBathrooms = rooms.filter(
        room => room.kind === 'bathroom'
      ).length
      if (drawnBedrooms !== bedrooms || drawnBathrooms !== bathrooms)
        mismatches.push(
          `${bedrooms}/${bathrooms} -> ${drawnBedrooms}/${drawnBathrooms}`
        )
    })
    expect(mismatches).toEqual([])
  })

  it('opens every living, kitchen, bedroom and bathroom onto a hallway', () => {
    const unreachable: string[] = []
    combos.forEach(({ bedrooms, bathrooms }) => {
      const template = build(bedrooms, bathrooms)
      template.rooms
        .filter(room => room.kind !== 'balcony')
        .forEach(room => {
          const reachable = room.doors.some(side =>
            template.circulation.some(hallway =>
              doorOpensOnto(room, side, hallway)
            )
          )
          if (!reachable)
            unreachable.push(`${bedrooms}/${bathrooms}: ${room.id}`)
        })
    })
    expect(unreachable).toEqual([])
  })

  it('opens the balcony onto the living room with aligned doorways', () => {
    const { rooms } = build(2, 2)
    const balcony = rooms.find(room => room.id === 'balcony')!
    const living = rooms.find(room => room.id === 'living')!

    expect(balcony.doors).toContain('back')
    expect(living.doors).toContain('front')
    expect(doorOpensOnto(balcony, 'back', living)).toBe(true)
    expect(Math.abs(balcony.x - living.x)).toBeLessThan(EPSILON)
  })

  it('uses an open-plan living room for studios', () => {
    const { rooms } = build(0, 1)

    expect(rooms.some(room => room.kind === 'kitchen')).toBe(false)
    expect(rooms.find(room => room.id === 'living')?.label).toBe(
      'Phòng khách & bếp'
    )
  })

  it('matches the listing area when the scale is not clamped', () => {
    const template = build(2, 2, 80)
    const drawnArea = [...template.rooms, ...template.circulation].reduce(
      (sum, rect) => sum + rect.width * rect.depth,
      0
    )

    expect(drawnArea).toBeCloseTo(80, 5)
  })

  it('clamps the scale for extreme areas', () => {
    expect(build(0, 1, 1000).scale).toBe(1.4)
    expect(build(8, 8, 10).scale).toBe(0.75)
  })

  it('centres the layout on the origin', () => {
    const template = build(8, 3)
    const all = [...template.rooms, ...template.circulation].map(edges)
    const minX = Math.min(...all.map(e => e.minX))
    const maxX = Math.max(...all.map(e => e.maxX))
    const minZ = Math.min(...all.map(e => e.minZ))
    const maxZ = Math.max(...all.map(e => e.maxZ))

    expect(Math.abs(minX + maxX)).toBeLessThan(EPSILON)
    expect(Math.abs(minZ + maxZ)).toBeLessThan(EPSILON)
    expect(template.width).toBeCloseTo(maxX - minX, 6)
    expect(template.depth).toBeCloseTo(maxZ - minZ, 6)
  })
})
