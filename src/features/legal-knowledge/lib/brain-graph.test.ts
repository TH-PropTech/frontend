import { describe, expect, it } from 'vitest'
import type { LegalDocItem } from '../model/legal-knowledge.types'
import { allocateSlots, buildDocEdges, countByCategory } from './brain-graph'
import {
  buildCerebellumMesh,
  buildCortexMesh,
  buildNetwork,
  buildStemMesh,
  pickSlots,
} from './brain-shape'

function doc(id: string, patch: Partial<LegalDocItem> = {}): LegalDocItem {
  return {
    _id: id,
    title: `Văn bản ${id}`,
    category: 'luat',
    keywords: [],
    status: 'published',
    chunkCount: 3,
    contentLength: 100,
    contentSource: 'manual',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    ...patch,
  }
}

describe('allocateSlots', () => {
  it('keeps existing slots and gives new documents a free one', () => {
    const first = allocateSlots(['a', 'b'], new Map(), 10)
    const next = allocateSlots(['a', 'b', 'c'], first, 10)
    expect(next.get('a')).toBe(first.get('a'))
    expect(next.get('b')).toBe(first.get('b'))
    expect(new Set(next.values()).size).toBe(3)
  })

  it('frees the slot of a removed document', () => {
    const first = allocateSlots(['a', 'b'], new Map(), 4)
    const next = allocateSlots(['b'], first, 4)
    expect(next.has('a')).toBe(false)
    expect(next.get('b')).toBe(first.get('b'))
  })

  it('still assigns a slot when documents outnumber slots', () => {
    const slots = allocateSlots(['a', 'b', 'c'], new Map(), 2)
    expect(slots.size).toBe(3)
  })

  it('fills the lowest free slots first', () => {
    const slots = allocateSlots(['a', 'b', 'c'], new Map(), 10)
    expect([...slots.values()]).toEqual([0, 1, 2])
  })
})

describe('buildDocEdges', () => {
  it('links documents with the same issuer', () => {
    const edges = buildDocEdges([
      doc('a', { issuer: 'Chính phủ', category: 'luat' }),
      doc('b', { issuer: 'chính phủ', category: 'faq' }),
    ])
    expect(edges).toEqual([['a', 'b']])
  })

  it('links documents sharing two keywords but not one', () => {
    const shared = buildDocEdges([
      doc('a', { keywords: ['Thuê nhà', 'đặt cọc'], category: 'luat' }),
      doc('b', { keywords: ['thuê nhà', 'Đặt cọc'], category: 'faq' }),
    ])
    const single = buildDocEdges([
      doc('a', { keywords: ['thuê nhà'], category: 'luat' }),
      doc('b', { keywords: ['thuê nhà'], category: 'faq' }),
    ])
    expect(shared).toHaveLength(1)
    expect(single).toHaveLength(0)
  })

  it('chains documents of one category without duplicates', () => {
    const edges = buildDocEdges([doc('a'), doc('b'), doc('c')])
    expect(edges).toHaveLength(2)
  })

  it('returns nothing for an empty list', () => {
    expect(buildDocEdges([])).toEqual([])
  })
})

describe('countByCategory', () => {
  it('counts only categories in use, in display order', () => {
    const counts = countByCategory([
      doc('a', { category: 'faq' }),
      doc('b', { category: 'luat' }),
      doc('c', { category: 'faq' }),
    ])
    expect(counts).toEqual([
      { category: 'luat', count: 1 },
      { category: 'faq', count: 2 },
    ])
  })
})

describe('brain shape', () => {
  const network = buildNetwork()

  it('builds a finite neuron network with enough nodes for the cortex', () => {
    expect(network.positions.length).toBe(network.groups.length * 3)
    expect(network.positions.every(Number.isFinite)).toBe(true)
    expect(network.cortexCount).toBeGreaterThan(120)
    expect(network.groups.length).toBeGreaterThan(network.cortexCount)
  })

  it('links nodes as segment pairs', () => {
    expect(network.links.length).toBeGreaterThan(0)
    expect(network.links.length % 6).toBe(0)
    expect(network.links.every(Number.isFinite)).toBe(true)
  })

  it('picks distinct cortex slots deterministically, viewer side first', () => {
    const slots = pickSlots(network, 60)
    expect(slots).toHaveLength(60)
    expect(new Set(slots).size).toBe(60)
    expect(slots.every(index => index < network.cortexCount)).toBe(true)
    expect(pickSlots(network, 60)).toEqual(slots)
    expect(
      slots.every(index => (network.positions[index * 3 + 2] ?? 0) > 0.15)
    ).toBe(true)
  })

  it.each([
    ['cortex', buildCortexMesh(60, 40)],
    ['cerebellum', buildCerebellumMesh(30, 20)],
    ['stem', buildStemMesh(8, 8)],
  ])('builds a valid %s mesh', (_name, mesh) => {
    const vertexCount = mesh.positions.length / 3
    expect(mesh.positions.every(Number.isFinite)).toBe(true)
    expect(mesh.groove).toHaveLength(vertexCount)
    expect(mesh.groove.every(value => value >= 0 && value <= 1)).toBe(true)
    expect(mesh.indices.length % 3).toBe(0)
    expect(mesh.indices.every(index => index < vertexCount)).toBe(true)
  })

  it('makes the cortex longer than it is tall and wide', () => {
    const { positions } = buildCortexMesh(80, 50)
    const range = (axis: number): number => {
      const values = Array.from(
        { length: positions.length / 3 },
        (_, i) => positions[i * 3 + axis] ?? 0
      )
      return Math.max(...values) - Math.min(...values)
    }
    expect(range(0)).toBeGreaterThan(range(1))
    expect(range(0)).toBeGreaterThan(range(2) * 0.9)
  })
})
