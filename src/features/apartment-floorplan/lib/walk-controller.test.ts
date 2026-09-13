import * as THREE from 'three'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { runRendererScripts } from './renderer-script-harness'

interface Room {
  id: string
  label: string
  x: number
  z: number
}

interface Template {
  rooms: Room[]
}

interface WalkController {
  enter: (template: Template) => void
  exit: () => void
  setView: (view: 'firstPerson' | 'thirdPerson') => void
  getView: () => string
  teleport: (roomId: string) => void
  update: (dt: number) => void
  pause: () => void
  isActive: () => boolean
  dispose: () => void
}

const renderer = runRendererScripts(
  [
    'layout-templates.js',
    'floorplan-geometry.js',
    'walk-navigation.js',
    'walk-controller.js',
  ],
  { THREE }
)
const templates = renderer.FloorplanTemplates as {
  create: (config: Record<string, unknown>) => Template
}
const navigation = renderer.FloorplanWalkNavigation as {
  spawnPoint: (template: Template) => { x: number; z: number; yaw: number }
}
const walkApi = renderer.FloorplanWalk as {
  create: (options: Record<string, unknown>) => WalkController
}
const template = templates.create({
  version: 1,
  apartmentId: 'apt-1',
  bedrooms: 2,
  bathrooms: 2,
  areaM2: 75,
  furnishing: 'full',
})

let camera: THREE.PerspectiveCamera
let scene: THREE.Scene
let walk: WalkController
let onRoomChange: ReturnType<typeof vi.fn>
let onExit: ReturnType<typeof vi.fn>

function press(type: 'keydown' | 'keyup', key: string) {
  document.dispatchEvent(new KeyboardEvent(type, { key, bubbles: true }))
}

function pointer(target: Element, type: string, clientX = 0, clientY = 0) {
  target.dispatchEvent(
    new MouseEvent(type, { bubbles: true, clientX, clientY })
  )
}

function lookDirection(): THREE.Vector3 {
  camera.updateMatrixWorld()
  return camera.getWorldDirection(new THREE.Vector3())
}

function tick(frames: number) {
  for (let frame = 0; frame < frames; frame += 1) walk.update(0.1)
}

function avatar(): THREE.Object3D {
  return scene.children.find(child => child.userData.walkAvatar)!
}

function announcer(): string {
  return document.getElementById('room-announcer')!.textContent ?? ''
}

beforeEach(() => {
  document.body.innerHTML =
    '<main id="viewer">' +
    '<canvas id="canvas"></canvas>' +
    '<p id="walk-hint"></p>' +
    '<p id="room-announcer"></p>' +
    '<button data-walk-move="forward"></button>' +
    '</main>'
  camera = new THREE.PerspectiveCamera(70, 1, 0.1, 100)
  scene = new THREE.Scene()
  onRoomChange = vi.fn()
  onExit = vi.fn()
  walk = walkApi.create({
    camera,
    scene,
    canvas: document.getElementById('canvas'),
    root: document.getElementById('viewer'),
    hint: document.getElementById('walk-hint'),
    announcer: document.getElementById('room-announcer'),
    onRoomChange,
    onExit,
  })
})

afterEach(() => {
  walk.dispose()
})

describe('walk-controller', () => {
  it('starts at eye height in the hallway looking into the living room', () => {
    walk.enter(template)
    const spawn = navigation.spawnPoint(template)

    expect(camera.position.x).toBeCloseTo(spawn.x)
    expect(camera.position.y).toBeCloseTo(1.6)
    expect(camera.position.z).toBeCloseTo(spawn.z)
    expect(lookDirection().z).toBeGreaterThan(0.99)
    expect(onRoomChange).toHaveBeenLastCalledWith(null)
    expect(announcer()).toBe('Hành lang')
    expect(document.getElementById('walk-hint')!.textContent).toContain('Esc')
  })

  it('walks forward while W is held and reports the room entered', () => {
    walk.enter(template)
    press('keydown', 'w')
    tick(10)

    expect(onRoomChange).toHaveBeenLastCalledWith('living')
    expect(announcer()).toBe('Phòng khách')

    press('keyup', 'w')
    const stoppedAt = camera.position.clone()
    tick(5)

    expect(camera.position.distanceTo(stoppedAt)).toBe(0)
  })

  it('drops held movement when paused', () => {
    walk.enter(template)
    press('keydown', 'w')
    walk.pause()
    const before = camera.position.clone()
    tick(5)

    expect(camera.position.distanceTo(before)).toBe(0)
  })

  it('moves while the on-screen forward button is held', () => {
    walk.enter(template)
    const before = camera.position.clone()
    const forward = document.querySelector('[data-walk-move="forward"]')!

    pointer(forward, 'pointerdown')
    tick(3)
    pointer(forward, 'pointerup')

    expect(camera.position.z).toBeGreaterThan(before.z + 0.3)
    const released = camera.position.clone()
    tick(3)
    expect(camera.position.distanceTo(released)).toBe(0)
  })

  it('turns the view when dragging on the canvas', () => {
    walk.enter(template)
    const canvas = document.getElementById('canvas')!

    pointer(canvas, 'pointerdown', 0, 0)
    pointer(canvas, 'pointermove', 150, 0)
    pointer(canvas, 'pointerup', 150, 0)
    walk.update(0)

    expect(lookDirection().z).toBeLessThan(0.9)
  })

  it('asks the app to exit on Escape when the pointer is not locked', () => {
    walk.enter(template)
    press('keydown', 'Escape')

    expect(onExit).toHaveBeenCalledTimes(1)
  })

  it('teleports to the centre of a room picked from the list', () => {
    walk.enter(template)
    walk.teleport('bedroom-1')
    const bedroom = template.rooms.find(room => room.id === 'bedroom-1')!

    expect(camera.position.x).toBeCloseTo(bedroom.x)
    expect(camera.position.z).toBeCloseTo(bedroom.z)
    expect(onRoomChange).toHaveBeenLastCalledWith('bedroom-1')
  })

  it('shows the avatar in front of the camera in third person', () => {
    walk.enter(template)
    onRoomChange.mockClear()
    walk.setView('thirdPerson')
    const body = avatar()

    expect(walk.getView()).toBe('thirdPerson')
    expect(body.visible).toBe(true)
    expect(camera.position.y).toBeCloseTo(2.2)
    expect(
      Math.hypot(
        camera.position.x - body.position.x,
        camera.position.z - body.position.z
      )
    ).toBeCloseTo(2.5)
    expect(camera.position.z).toBeLessThan(body.position.z)
    expect(onRoomChange).toHaveBeenCalledWith(null)
  })

  it('ignores input after exit and hides the avatar', () => {
    walk.enter(template)
    walk.setView('thirdPerson')
    walk.exit()
    const before = camera.position.clone()
    press('keydown', 'w')
    tick(3)

    expect(walk.isActive()).toBe(false)
    expect(camera.position.distanceTo(before)).toBe(0)
    expect(avatar().visible).toBe(false)
    expect(announcer()).toBe('')
  })

  it('removes the avatar from the scene on dispose', () => {
    walk.dispose()

    expect(scene.children.some(child => child.userData.walkAvatar)).toBe(false)
  })
})
