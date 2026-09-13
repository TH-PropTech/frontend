import * as THREE from 'three'
import { describe, expect, it } from 'vitest'
import { runRendererScripts } from './renderer-script-harness'

interface LightStyle {
  color: number
  intensity: number
}

interface FloorplanMaterials {
  floor: THREE.MeshLambertMaterial
  wall: THREE.MeshLambertMaterial
  lighting: {
    ambient: LightStyle
    directional: LightStyle
  }
  addLighting: (scene: THREE.Scene) => void
}

const renderer = runRendererScripts(['room-materials.js'], { THREE })
const materials = renderer.FloorplanMaterials as FloorplanMaterials

describe('room-materials', () => {
  it('uses grounded warm surfaces to separate circulation from walls', () => {
    expect(materials.floor.color.getHex()).toBe(0xcdbba9)
    expect(materials.wall.color.getHex()).toBe(0xeee5da)
  })

  it('limits combined light intensity to avoid washing out pale surfaces', () => {
    const totalIntensity =
      materials.lighting.ambient.intensity +
      materials.lighting.directional.intensity

    expect(totalIntensity).toBeLessThanOrEqual(1.5)
  })

  it('adds the glare-reduced ambient and directional lights to the scene', () => {
    const scene = new THREE.Scene()

    materials.addLighting(scene)

    const lights = scene.children.filter(
      (child): child is THREE.Light => child instanceof THREE.Light
    )
    expect(lights.map(light => light.intensity)).toEqual([0.85, 0.65])
  })
})
