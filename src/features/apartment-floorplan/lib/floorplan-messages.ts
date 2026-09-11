import type { FloorplanConfig } from '../model/floorplan-config'

export const FLOORPLAN_MESSAGE_VERSION = 1 as const

export type FloorplanHostMessage =
  | { version: 1; type: 'FLOORPLAN_INIT'; payload: FloorplanConfig }
  | { version: 1; type: 'FLOORPLAN_PAUSE' }
  | { version: 1; type: 'FLOORPLAN_RESUME' }
  | { version: 1; type: 'FLOORPLAN_RESET' }

export type FloorplanFrameMessage =
  | { version: 1; type: 'FLOORPLAN_READY' }
  | { version: 1; type: 'FLOORPLAN_ROOM_SELECTED'; payload: { roomId: string } }
  | { version: 1; type: 'FLOORPLAN_ERROR'; payload: { code: string } }

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
  if (value.type === 'FLOORPLAN_ROOM_SELECTED' && isRecord(value.payload)) {
    if (typeof value.payload.roomId !== 'string' || !value.payload.roomId)
      return null
    return {
      version: 1,
      type: value.type,
      payload: { roomId: value.payload.roomId },
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
