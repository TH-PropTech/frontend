import { describe, expect, it } from 'vitest'
import {
  createFloorplanInitMessage,
  isTrustedFloorplanMessage,
  parseFloorplanMessage,
} from './floorplan-messages'

describe('floorplan messages', () => {
  it('creates a versioned init message', () => {
    const config = {
      version: 1 as const,
      apartmentId: 'apt-1',
      bedrooms: 2,
      bathrooms: 1,
      areaM2: 70,
      furnishing: 'partial' as const,
    }

    expect(createFloorplanInitMessage(config)).toEqual({
      version: 1,
      type: 'FLOORPLAN_INIT',
      payload: config,
    })
  })

  it('parses only allowlisted message types and versions', () => {
    expect(
      parseFloorplanMessage({ version: 1, type: 'FLOORPLAN_READY' })
    ).toEqual({ version: 1, type: 'FLOORPLAN_READY' })
    expect(
      parseFloorplanMessage({ version: 2, type: 'FLOORPLAN_READY' })
    ).toBeNull()
    expect(parseFloorplanMessage({ version: 1, type: 'RUN_SCRIPT' })).toBeNull()
  })

  it('accepts a design selection from the viewer and rejects a blank id', () => {
    expect(
      parseFloorplanMessage({
        version: 1,
        type: 'FLOORPLAN_DESIGN_SELECTED',
        payload: { designId: 'd1' },
      })
    ).toEqual({
      version: 1,
      type: 'FLOORPLAN_DESIGN_SELECTED',
      payload: { designId: 'd1' },
    })
    expect(
      parseFloorplanMessage({
        version: 1,
        type: 'FLOORPLAN_DESIGN_SELECTED',
        payload: { designId: '' },
      })
    ).toBeNull()
  })

  it('requires the expected origin and iframe source', () => {
    const source = window
    const event = {
      origin: 'https://proptech.test',
      source,
      data: { version: 1, type: 'FLOORPLAN_READY' },
    } as unknown as MessageEvent

    expect(
      isTrustedFloorplanMessage(event, source, 'https://proptech.test')
    ).toBe(true)
    expect(isTrustedFloorplanMessage(event, source, 'https://evil.test')).toBe(
      false
    )
    expect(
      isTrustedFloorplanMessage(
        event,
        new MessageChannel().port1,
        'https://proptech.test'
      )
    ).toBe(false)
  })
})
