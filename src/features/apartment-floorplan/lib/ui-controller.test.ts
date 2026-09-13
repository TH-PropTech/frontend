import * as THREE from 'three'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { runRendererScripts } from './renderer-script-harness'

interface UiApi {
  create: (options: {
    group: THREE.Group
    onRoomClick: (roomId: string) => void
    onReset?: () => void
  }) => {
    highlight: (roomId: string | null) => void
    getSelectedId: () => string | null
  }
}

const renderer = runRendererScripts(
  [
    'room-materials.js',
    'layout-templates.js',
    'floorplan-geometry.js',
    'apartment-generator.js',
    'ui-controller.js',
  ],
  { THREE }
)
const post = vi.fn()
renderer.FloorplanHostBridge = { post }
renderer.location = { origin: 'http://localhost' }

const generator = renderer.ApartmentGenerator as {
  create: (config: Record<string, unknown>) => THREE.Group
}
const ui = renderer.FloorplanUi as UiApi
const config = {
  version: 1,
  apartmentId: 'apt-1',
  bedrooms: 2,
  bathrooms: 1,
  areaM2: 70,
  furnishing: 'full',
}

function roomButton(roomId: string): HTMLButtonElement {
  return document.querySelector<HTMLButtonElement>(
    '[data-room-id="' + roomId + '"]'
  )!
}

beforeEach(() => {
  document.body.innerHTML =
    '<div id="room-list"></div><button id="reset-button"></button>'
  post.mockClear()
})

describe('ui-controller', () => {
  it('hands room clicks to the app instead of highlighting directly', () => {
    const onRoomClick = vi.fn()
    const controller = ui.create({
      group: generator.create(config),
      onRoomClick,
    })

    roomButton('kitchen').click()

    expect(onRoomClick).toHaveBeenCalledWith('kitchen')
    expect(controller.getSelectedId()).toBeNull()
  })

  it('keeps one click handler per room after the viewer is rebuilt', () => {
    const onRoomClick = vi.fn()
    ui.create({ group: generator.create(config), onRoomClick })
    ui.create({ group: generator.create(config), onRoomClick })

    roomButton('kitchen').click()

    expect(onRoomClick).toHaveBeenCalledTimes(1)
  })

  it('leaves the reset button to the app', () => {
    const onReset = vi.fn()
    ui.create({
      group: generator.create(config),
      onRoomClick: vi.fn(),
      onReset,
    })

    document.getElementById('reset-button')!.click()

    expect(onReset).not.toHaveBeenCalled()
  })

  it('notifies the host when a room is highlighted and clears silently', () => {
    const controller = ui.create({
      group: generator.create(config),
      onRoomClick: vi.fn(),
    })

    controller.highlight('kitchen')
    controller.highlight(null)

    expect(post).toHaveBeenCalledTimes(1)
    expect(post.mock.calls[0][0]).toMatchObject({
      version: 1,
      type: 'FLOORPLAN_ROOM_SELECTED',
      payload: { roomId: 'kitchen' },
    })
    expect(controller.getSelectedId()).toBeNull()
    expect(roomButton('kitchen').classList.contains('active')).toBe(false)
  })
})
