import { describe, expect, it } from 'vitest'
import { runRendererScripts } from './renderer-script-harness'

interface Rect {
  x: number
  z: number
  width: number
  depth: number
}

interface Room extends Rect {
  id: string
  label: string
  kind: string
  doors: string[]
}

interface Template {
  rooms: Room[]
  circulation: Rect[]
  width: number
  depth: number
  scale: number
}

interface Point {
  x: number
  z: number
}

interface Pose extends Point {
  yaw: number
}

interface Nav {
  radius: number
}

interface NavigationApi {
  RADIUS: number
  create: (template: Template) => Nav
  canStand: (nav: Nav, x: number, z: number) => boolean
  move: (nav: Nav, position: Point, delta: Point) => Point
  roomAt: (template: Template, x: number, z: number) => string | null
  spawnPoint: (template: Template) => Pose
  roomTarget: (template: Template, roomId: string) => Pose | null
}

const renderer = runRendererScripts([
  'layout-templates.js',
  'floorplan-geometry.js',
  'walk-navigation.js',
])
const templates = renderer.FloorplanTemplates as {
  create: (config: Record<string, unknown>) => Template
}
const navigation = renderer.FloorplanWalkNavigation as NavigationApi
const THICKNESS = (renderer.FloorplanGeometry as { WALL_THICKNESS: number })
  .WALL_THICKNESS
const STEP = 0.05
const TOLERANCE = 1e-6
const MIN_SCALE_AREA = 1
const MAX_SCALE_AREA = 1000
const LARGE_SCALE_SAMPLES: Array<[number, number]> = [
  [0, 0],
  [1, 1],
  [3, 2],
  [8, 8],
]
const DIRECTIONS: ReadonlyArray<readonly [number, number]> = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
]

function templateFor(
  bedrooms: number,
  bathrooms: number,
  areaM2 = 75
): Template {
  return templates.create({
    version: 1,
    apartmentId: 'apt-1',
    bedrooms,
    bathrooms,
    areaM2,
    furnishing: 'full',
  })
}

function roomById(template: Template, id: string): Room {
  const room = template.rooms.find(item => item.id === id)
  if (!room) throw new Error(`missing room ${id}`)
  return room
}

function rectAt(rects: Rect[], index: number): Rect {
  const rect = rects[index]
  if (!rect) throw new Error('missing rectangle at index ' + index)
  return rect
}

function walk(nav: Nav, start: Point, delta: Point, steps: number): Point {
  let position: Point = { x: start.x, z: start.z }
  for (let index = 0; index < steps; index += 1) {
    position = navigation.move(nav, position, delta)
  }
  return position
}

// Flood fill on a STEP grid anchored at `start`; STEP is smaller than the
// narrowest door lane for the avatar centre (~0.09m) so every passable door
// has at least one grid column through it.
function floodFrom(nav: Nav, template: Template, start: Point) {
  const spanX = Math.ceil(template.width / STEP)
  const spanZ = Math.ceil(template.depth / STEP)
  const columns = spanX * 2 + 1
  const visited = new Uint8Array(columns * (spanZ * 2 + 1))
  const queue = new Int32Array(visited.length)
  const indexOf = (i: number, j: number) => i + spanX + (j + spanZ) * columns
  let head = 0
  let tail = 0
  visited[indexOf(0, 0)] = 1
  queue[tail++] = indexOf(0, 0)
  while (head < tail) {
    const index = queue[head++]
    if (index === undefined) throw new Error('missing queued grid index')
    const i = (index % columns) - spanX
    const j = Math.floor(index / columns) - spanZ
    for (const [di, dj] of DIRECTIONS) {
      const ni = i + di
      const nj = j + dj
      if (Math.abs(ni) > spanX || Math.abs(nj) > spanZ) continue
      const next = indexOf(ni, nj)
      if (visited[next]) continue
      if (!navigation.canStand(nav, start.x + ni * STEP, start.z + nj * STEP))
        continue
      visited[next] = 1
      queue[tail++] = next
    }
  }
  return (point: Point) => {
    const i = Math.round((point.x - start.x) / STEP)
    const j = Math.round((point.z - start.z) / STEP)
    return (
      Math.abs(i) <= spanX &&
      Math.abs(j) <= spanZ &&
      visited[indexOf(i, j)] === 1
    )
  }
}

function unreachableRooms(
  bedrooms: number,
  bathrooms: number,
  areaM2: number
): string[] {
  const layout = templateFor(bedrooms, bathrooms, areaM2)
  const layoutNav = navigation.create(layout)
  const spawn = navigation.spawnPoint(layout)
  const label = `${bedrooms}/${bathrooms}@${areaM2}`
  if (!navigation.canStand(layoutNav, spawn.x, spawn.z))
    return [`${label}: spawn`]
  const reached = floodFrom(layoutNav, layout, spawn)
  return layout.rooms
    .filter(room => {
      const target = navigation.roomTarget(layout, room.id)
      return !target || !reached(target)
    })
    .map(room => `${label}: ${room.id}`)
}

describe('walk-navigation', () => {
  const template = templateFor(2, 2)
  const nav = navigation.create(template)

  it('stops at a wall with the avatar radius as clearance', () => {
    const bedroom = roomById(template, 'bedroom-1')
    const wallInnerX = bedroom.x - bedroom.width / 2 + THICKNESS
    const end = walk(nav, bedroom, { x: -0.1, z: 0 }, 100)

    expect(end.x).toBeGreaterThanOrEqual(
      wallInnerX + navigation.RADIUS - TOLERANCE
    )
    expect(end.x).toBeLessThan(wallInnerX + navigation.RADIUS + 0.1)
    expect(end.z).toBe(bedroom.z)
  })

  it('slides along a wall when walking diagonally into it', () => {
    const bedroom = roomById(template, 'bedroom-1')
    const end = walk(nav, bedroom, { x: -0.1, z: 0.02 }, 30)

    expect(end.x).toBeLessThan(
      bedroom.x - bedroom.width / 2 + THICKNESS + navigation.RADIUS + 0.1
    )
    expect(end.z).toBeGreaterThan(bedroom.z + 0.3)
  })

  it('walks from a bedroom through its door into the hallway spine', () => {
    const bedroom = roomById(template, 'bedroom-1')
    const end = walk(nav, bedroom, { x: 0.05, z: 0 }, 80)

    expect(end.x).toBeGreaterThan(bedroom.x + bedroom.width / 2)
  })

  it('cannot leave the floor at the open hallway ends', () => {
    const corridor = rectAt(template.circulation, 0)
    const westEnd = corridor.x - corridor.width / 2
    const end = walk(
      nav,
      navigation.spawnPoint(template),
      { x: -0.05, z: 0 },
      400
    )

    expect(end.x).toBeGreaterThanOrEqual(westEnd - TOLERANCE)
    expect(end.x).toBeLessThan(westEnd + 0.05)
    expect(
      navigation.canStand(
        nav,
        corridor.x + corridor.width / 2 + 0.01,
        corridor.z
      )
    ).toBe(false)
  })

  it('keeps the avatar inside the balcony railing and the spine bottom', () => {
    const balcony = roomById(template, 'balcony')
    const outerZ = balcony.z + balcony.depth / 2
    const spine = rectAt(template.circulation, 1)

    expect(navigation.canStand(nav, balcony.x, outerZ - 0.1)).toBe(false)
    expect(navigation.canStand(nav, balcony.x, outerZ + 0.01)).toBe(false)
    expect(
      navigation.canStand(nav, spine.x, spine.z - spine.depth / 2 - 0.01)
    ).toBe(false)
    expect(navigation.canStand(nav, spine.x, spine.z)).toBe(true)
  })

  it('names the room under the avatar and treats hallways as no room', () => {
    const kitchen = roomById(template, 'kitchen')
    const spawn = navigation.spawnPoint(template)

    expect(navigation.roomAt(template, kitchen.x, kitchen.z)).toBe('kitchen')
    expect(navigation.roomAt(template, spawn.x, spawn.z)).toBeNull()
  })

  it('spawns in the hallway facing the living room door', () => {
    const living = roomById(template, 'living')

    expect(navigation.spawnPoint(template)).toEqual({
      x: living.x,
      z: rectAt(template.circulation, 0).z,
      yaw: Math.PI,
    })
  })

  it('teleports to a room centre facing its first door', () => {
    const living = roomById(template, 'living')

    expect(navigation.roomTarget(template, 'living')).toEqual({
      x: living.x,
      z: living.z,
      yaw: Math.PI,
    })
    expect(navigation.roomTarget(template, 'missing')).toBeNull()
  })

  it('uses areas that hit both scale limits', () => {
    expect(templateFor(2, 2, MIN_SCALE_AREA).scale).toBe(0.75)
    expect(templateFor(2, 2, MAX_SCALE_AREA).scale).toBe(1.4)
  })

  it('reaches every room from the spawn point at the smallest scale', () => {
    const failures: string[] = []
    for (let bedrooms = 0; bedrooms <= 8; bedrooms += 1) {
      for (let bathrooms = 0; bathrooms <= 8; bathrooms += 1) {
        failures.push(...unreachableRooms(bedrooms, bathrooms, MIN_SCALE_AREA))
      }
    }

    expect(failures).toEqual([])
  }, 120_000)

  it('reaches every room from the spawn point at the largest scale', () => {
    const failures = LARGE_SCALE_SAMPLES.flatMap(([bedrooms, bathrooms]) =>
      unreachableRooms(bedrooms, bathrooms, MAX_SCALE_AREA)
    )

    expect(failures).toEqual([])
  }, 120_000)
})
