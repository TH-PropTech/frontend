import { describe, expect, it } from 'vitest'
import { runRendererScripts } from './renderer-script-harness'

interface Room {
  id: string
  label: string
  kind: string
  doors: string[]
  x: number
  z: number
  width: number
  depth: number
}

interface Piece {
  kind: 'wall' | 'railing' | 'post' | 'lintel' | 'header'
  x: number
  z: number
  width: number
  depth: number
  height: number
  y: number
}

interface GeometryApi {
  WALL_HEIGHT: number
  WALK_WALL_HEIGHT: number
  WALL_THICKNESS: number
  wallPieces: (room: Room, options?: { wallHeight?: number }) => Piece[]
}

const geometry = runRendererScripts(['floorplan-geometry.js'])
  .FloorplanGeometry as GeometryApi

function room(overrides: Partial<Room> = {}): Room {
  return {
    id: 'bedroom-1',
    label: 'Phòng ngủ 1',
    kind: 'bedroom',
    doors: [],
    x: 0,
    z: 0,
    width: 3,
    depth: 2,
    ...overrides,
  }
}

function kinds(pieces: Piece[]): string[] {
  return pieces.map(piece => piece.kind)
}

describe('floorplan-geometry', () => {
  it('draws one solid piece per side without a door', () => {
    const pieces = geometry.wallPieces(room())

    expect(kinds(pieces)).toEqual(['wall', 'wall', 'wall', 'wall'])
    expect(pieces.every(piece => piece.height === geometry.WALL_HEIGHT)).toBe(
      true
    )
  })

  it('matches the P0 wall placement on every side', () => {
    const t = geometry.WALL_THICKNESS
    const [front, back, east, west] = geometry.wallPieces(room())

    expect(front).toMatchObject({ x: 0, width: 3, depth: t, y: 0.36 })
    expect(front.z).toBeCloseTo(1 - t / 2)
    expect(back.z).toBeCloseTo(-1 + t / 2)
    expect(east).toMatchObject({ z: 0, width: t })
    expect(east.x).toBeCloseTo(1.5 - t / 2)
    expect(east.depth).toBeCloseTo(2 - 2 * t)
    expect(west.x).toBeCloseTo(-1.5 + t / 2)
  })

  it('splits a door side into two walls, two posts and a lintel', () => {
    const pieces = geometry.wallPieces(room({ doors: ['front'] }))

    expect(kinds(pieces)).toEqual([
      'wall',
      'wall',
      'post',
      'post',
      'lintel',
      'wall',
      'wall',
      'wall',
    ])
  })

  it('keeps the door opening centred between the wall segments', () => {
    const [left, right, postA, postB] = geometry.wallPieces(
      room({ doors: ['front'] })
    )

    expect(left.x + left.width / 2).toBeCloseTo(postA.x)
    expect(right.x - right.width / 2).toBeCloseTo(postB.x)
    expect(postA.x + postB.x).toBeCloseTo(0)
    expect(postB.x - postA.x - geometry.WALL_THICKNESS).toBeGreaterThan(0.3)
  })

  it('uses glass railings on open balcony sides only', () => {
    const pieces = geometry.wallPieces(
      room({ id: 'balcony', kind: 'balcony', doors: ['back'] }),
      { wallHeight: geometry.WALK_WALL_HEIGHT }
    )

    expect(kinds(pieces)).toEqual([
      'railing',
      'wall',
      'wall',
      'post',
      'post',
      'lintel',
      'header',
      'railing',
      'railing',
    ])
    expect(
      pieces
        .filter(piece => piece.kind === 'railing')
        .every(piece => piece.height === 0.42)
    ).toBe(true)
  })

  it('raises walls and closes the space above doors for walking', () => {
    const pieces = geometry.wallPieces(room({ doors: ['east'] }), {
      wallHeight: geometry.WALK_WALL_HEIGHT,
    })
    const header = pieces.find(piece => piece.kind === 'header')!

    expect(
      pieces
        .filter(piece => piece.kind === 'wall')
        .every(piece => piece.height === 2.4)
    ).toBe(true)
    expect(
      pieces
        .filter(piece => piece.kind === 'post')
        .every(piece => piece.height === 2)
    ).toBe(true)
    expect(header.y - header.height / 2).toBeCloseTo(2)
    expect(header.y + header.height / 2).toBeCloseTo(2.4)
  })

  it('adds no header at the cutaway height', () => {
    expect(kinds(geometry.wallPieces(room({ doors: ['east'] })))).not.toContain(
      'header'
    )
  })
})
