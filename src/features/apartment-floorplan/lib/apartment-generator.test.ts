import * as THREE from 'three'
import { describe, expect, it } from 'vitest'
import { runRendererScripts } from './renderer-script-harness'

interface GeneratorApi {
  create: (config: Record<string, unknown>) => THREE.Group
}

interface TemplatesApi {
  create: (config: Record<string, unknown>) => { circulation: unknown[] }
}

const renderer = runRendererScripts(
  ['room-materials.js', 'layout-templates.js', 'apartment-generator.js'],
  { THREE }
)
const generator = renderer.ApartmentGenerator as GeneratorApi
const templates = renderer.FloorplanTemplates as TemplatesApi
const materials = renderer.FloorplanMaterials as Record<string, THREE.Material>

function configFor(bedrooms: number, bathrooms: number) {
  return {
    version: 1,
    apartmentId: 'apt-1',
    bedrooms,
    bathrooms,
    areaM2: 75,
    furnishing: 'full',
  }
}

function meshes(group: THREE.Group): THREE.Mesh[] {
  return group.children.filter(
    (child): child is THREE.Mesh => child instanceof THREE.Mesh
  )
}

function meshesOf(group: THREE.Group, roomId: string): THREE.Mesh[] {
  return meshes(group).filter(mesh => mesh.userData.roomId === roomId)
}

describe('apartment-generator', () => {
  it('gives every listed room selectable geometry', () => {
    const missing: string[] = []
    for (let bedrooms = 0; bedrooms <= 8; bedrooms += 1) {
      for (let bathrooms = 0; bathrooms <= 8; bathrooms += 1) {
        const group = generator.create(configFor(bedrooms, bathrooms))
        const rooms = group.userData.rooms as Array<{ id: string }>
        rooms.forEach(room => {
          if (!meshesOf(group, room.id).length)
            missing.push(`${bedrooms}/${bathrooms}: ${room.id}`)
        })
      }
    }
    expect(missing).toEqual([])
  })

  it('draws the balcony railing in glass', () => {
    const balcony = meshesOf(generator.create(configFor(2, 2)), 'balcony')

    expect(balcony.some(mesh => mesh.material === materials.glass)).toBe(true)
  })

  it('keeps the bathroom fixture visible beside the vanity', () => {
    const bathroom = meshesOf(generator.create(configFor(2, 2)), 'bathroom-1')
    const ceramic = bathroom.find(mesh => mesh.material === materials.ceramic)
    const vanity = bathroom.find(
      mesh =>
        mesh.material === materials.furniture &&
        (mesh.geometry as THREE.BoxGeometry).parameters.height === 0.24
    )

    expect(ceramic).toBeDefined()
    expect(vanity).toBeDefined()
    const ceramicBox = new THREE.Box3().setFromObject(ceramic!)
    const vanityBox = new THREE.Box3().setFromObject(vanity!)
    expect(ceramicBox.intersectsBox(vanityBox)).toBe(false)
  })

  it('draws one unselectable floor per hallway', () => {
    const config = configFor(2, 2)
    const group = generator.create(config)
    const hallwayFloors = meshes(group).filter(
      mesh => mesh.material === materials.floor && !mesh.userData.roomId
    )

    expect(hallwayFloors).toHaveLength(
      templates.create(config).circulation.length
    )
  })

  it('exposes the layout size for camera fitting', () => {
    expect(generator.create(configFor(3, 2)).userData.size).toBeGreaterThan(0)
  })
})
