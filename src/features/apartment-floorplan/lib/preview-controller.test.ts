import * as THREE from 'three'
import { describe, expect, it } from 'vitest'
import { runRendererScripts } from './renderer-script-harness'

interface Bounds {
  minX: number
  maxX: number
  minZ: number
  maxZ: number
  width: number
  depth: number
  centerX: number
  centerZ: number
}

interface PreviewController {
  enter: (template: Record<string, unknown>) => void
  exit: () => void
  update: (deltaTime: number) => void
  pause: () => void
  reset: () => void
  isActive: () => boolean
  getGroup: () => THREE.Group
  getBounds: () => Bounds | null
  dispose: () => void
}

interface PreviewApi {
  create: (options: { scene: THREE.Scene }) => PreviewController
  createAvatarMesh: () => THREE.Group
  createPlatformMesh: (bounds: Bounds) => THREE.Mesh
  calculateBounds: (template: Record<string, unknown>) => Bounds
}

const renderer = runRendererScripts(
  ['layout-templates.js', 'floorplan-geometry.js', 'preview-controller.js'],
  { THREE }
)

const templates = renderer.FloorplanTemplates as {
  create: (config: Record<string, unknown>) => Record<string, unknown>
}
const previewApi = renderer.FloorplanPreview as PreviewApi

const config = {
  version: 1,
  apartmentId: 'apt-preview-test',
  bedrooms: 2,
  bathrooms: 1,
  areaM2: 70,
  furnishing: 'full',
}

describe('preview-controller', () => {
  it('calculates bounding dimensions and center from apartment template', () => {
    const template = templates.create(config)
    const bounds = previewApi.calculateBounds(template)

    expect(bounds.width).toBeGreaterThan(0)
    expect(bounds.depth).toBeGreaterThan(0)
    expect(bounds.maxX).toBeGreaterThan(bounds.minX)
    expect(bounds.maxZ).toBeGreaterThan(bounds.minZ)
    expect(bounds.centerX).toBeCloseTo((bounds.minX + bounds.maxX) / 2)
    expect(bounds.centerZ).toBeCloseTo((bounds.minZ + bounds.maxZ) / 2)
  })

  it('builds avatar mesh with body, head, visor, hover ring, and hands', () => {
    const avatar = previewApi.createAvatarMesh()

    expect(avatar).toBeInstanceOf(THREE.Group)
    expect(avatar.children.length).toBeGreaterThanOrEqual(4)
    expect(avatar.userData.hoverRing).toBeDefined()
    expect(avatar.userData.initialY).toBe(0.1)
  })

  it('builds platform mesh with proportional margins around layout bounds', () => {
    const bounds: Bounds = {
      minX: -4,
      maxX: 4,
      minZ: -3,
      maxZ: 3,
      width: 8,
      depth: 6,
      centerX: 0,
      centerZ: 0,
    }
    const platform = previewApi.createPlatformMesh(bounds)

    expect(platform).toBeInstanceOf(THREE.Mesh)
    expect(platform.position.y).toBe(-0.02)
    expect(platform.position.x).toBe(0)
    expect(platform.position.z).toBe(0)
  })

  it('manages preview lifecycle: enter, update, reset, exit, and dispose', () => {
    const scene = new THREE.Scene()
    const controller = previewApi.create({ scene })
    const template = templates.create(config)

    expect(controller.isActive()).toBe(false)
    expect(scene.children.includes(controller.getGroup())).toBe(true)

    controller.enter(template)
    expect(controller.isActive()).toBe(true)
    expect(controller.getGroup().visible).toBe(true)
    expect(controller.getBounds()).not.toBeNull()

    const initialAvatarY = controller.getGroup().children[1]?.position.y
    expect(initialAvatarY).toBeDefined()
    controller.update(0.1)
    expect(controller.getGroup().children[1]?.position.y).toBeDefined()

    controller.reset()
    expect(controller.isActive()).toBe(true)

    controller.exit()
    expect(controller.isActive()).toBe(false)
    expect(controller.getGroup().visible).toBe(false)

    controller.dispose()
    expect(scene.children.includes(controller.getGroup())).toBe(false)
  })
})
