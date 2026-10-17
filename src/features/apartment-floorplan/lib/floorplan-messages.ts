import type { FloorplanConfig } from '../model/floorplan-config'
import {
  normalizeFloorplanLayout,
  type FloorplanLayout,
} from '../model/floorplan-design'

export const FLOORPLAN_MESSAGE_VERSION = 1 as const

export type FloorplanHostMessage =
  | { version: 1; type: 'FLOORPLAN_INIT'; payload: FloorplanConfig }
  | { version: 1; type: 'FLOORPLAN_PAUSE' }
  | { version: 1; type: 'FLOORPLAN_RESUME' }
  | { version: 1; type: 'FLOORPLAN_RESET' }
  | {
      version: 1
      type: 'FLOORPLAN_EXPANDED'
      payload: { expanded: boolean }
    }

export type FloorplanFrameMessage =
  | { version: 1; type: 'FLOORPLAN_READY' }
  | { version: 1; type: 'FLOORPLAN_EXPAND_TOGGLE' }
  | {
      version: 1
      type: 'FLOORPLAN_LAYOUT_CHANGED'
      payload: { designId: string; layout: FloorplanLayout }
    }
  | { version: 1; type: 'FLOORPLAN_ROOM_SELECTED'; payload: { roomId: string } }
  | { version: 1; type: 'FLOORPLAN_ERROR'; payload: { code: string } }
  | {
      version: 1
      type: 'FLOORPLAN_DESIGN_SELECTED'
      payload: { designId: string }
    }

export type FloorplanMessage = FloorplanHostMessage | FloorplanFrameMessage

export function createFloorplanInitMessage(
  config: FloorplanConfig
): FloorplanHostMessage {
  return {
    version: FLOORPLAN_MESSAGE_VERSION,
    type: 'FLOORPLAN_INIT',
    payload: config,
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object'
}

export function parseFloorplanMessage(value: unknown): FloorplanMessage | null {
  if (!isRecord(value) || value.version !== FLOORPLAN_MESSAGE_VERSION)
    return null
  if (value.type === 'FLOORPLAN_READY')
    return { version: 1, type: 'FLOORPLAN_READY' }
  if (value.type === 'FLOORPLAN_LAYOUT_CHANGED' && isRecord(value.payload)) {
    if (typeof value.payload.designId !== 'string' || !value.payload.designId)
      return null
    return {
      version: 1,
      type: value.type,
      payload: {
        designId: value.payload.designId,
        layout: normalizeFloorplanLayout(value.payload.layout),
      },
    }
  }
  if (value.type === 'FLOORPLAN_EXPAND_TOGGLE')
    return { version: 1, type: 'FLOORPLAN_EXPAND_TOGGLE' }
  if (value.type === 'FLOORPLAN_ROOM_SELECTED' && isRecord(value.payload)) {
    if (typeof value.payload.roomId !== 'string' || !value.payload.roomId)
      return null
    return {
      version: 1,
      type: value.type,
      payload: { roomId: value.payload.roomId },
    }
  }
  if (value.type === 'FLOORPLAN_DESIGN_SELECTED' && isRecord(value.payload)) {
    if (typeof value.payload.designId !== 'string' || !value.payload.designId)
      return null
    return {
      version: 1,
      type: value.type,
      payload: { designId: value.payload.designId },
    }
  }
  if (value.type === 'FLOORPLAN_ERROR' && isRecord(value.payload)) {
    if (typeof value.payload.code !== 'string' || !value.payload.code)
      return null
    return {
      version: 1,
      type: value.type,
      payload: { code: value.payload.code },
    }
  }
  return null
}

export function isTrustedFloorplanMessage(
  event: MessageEvent,
  expectedSource: MessageEventSource | null,
  expectedOrigin: string
): event is MessageEvent<FloorplanFrameMessage> {
  return (
    event.origin === expectedOrigin &&
    event.source === expectedSource &&
    parseFloorplanMessage(event.data)?.type.startsWith('FLOORPLAN_') === true
  )
}
