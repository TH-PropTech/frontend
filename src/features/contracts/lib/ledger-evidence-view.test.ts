import { describe, expect, it } from 'vitest'
import type { LedgerEvidenceEvent } from '../api/contracts-api'
import {
  deriveGovernanceReference,
  layerStateLabel,
  ledgerEventPresentation,
  normalizeLayerStatus,
  resolveIntegrityState,
} from './ledger-evidence-view'

function event(
  overrides: Partial<LedgerEvidenceEvent> = {}
): LedgerEvidenceEvent {
  return {
    id: 'outbox-1',
    eventType: 'contract.activated',
    aggregateType: 'contract',
    aggregateRef: 'abc123',
    status: 'confirmed',
    networkMode: 'fabric',
    txId: 'tx-1',
    blockNumber: 42,
    recordedAt: '2026-10-01T10:00:00.000Z',
    payloadHash: 'a'.repeat(64),
    dependsOn: null,
    attempts: 1,
    errorCode: null,
    explorerUrl: null,
    ...overrides,
  }
}

describe('normalizeLayerStatus (tri-state plus not-recorded)', () => {
  it.each([
    ['valid', 'verified'],
    ['verified', 'verified'],
    ['mismatch', 'mismatch'],
    ['invalid', 'mismatch'],
    ['unavailable', 'unavailable'],
    ['not-recorded', 'not-recorded'],
  ])('maps %s to %s', (input, expected) => {
    expect(normalizeLayerStatus(input)).toBe(expected)
  })

  it('never collapses an unknown or missing status into mismatch', () => {
    expect(normalizeLayerStatus('something-new')).toBe('unavailable')
    expect(normalizeLayerStatus(undefined)).toBe('unavailable')
    expect(normalizeLayerStatus(null)).toBe('unavailable')
  })

  it('keeps unavailable and mismatch visibly different', () => {
    expect(layerStateLabel('unavailable')).not.toBe(layerStateLabel('mismatch'))
    expect(layerStateLabel('verified')).toBe('Đã xác minh')
    expect(layerStateLabel('mismatch')).toBe('Sai lệch')
    expect(layerStateLabel('unavailable')).toBe('Không khả dụng')
    expect(layerStateLabel('not-recorded')).toBe('Chưa ghi nhận')
  })
})

describe('resolveIntegrityState', () => {
  it('prefers the explicit verification status', () => {
    expect(
      resolveIntegrityState({
        isValid: null,
        verificationStatus: 'unavailable',
      })
    ).toBe('unavailable')
    expect(
      resolveIntegrityState({ isValid: false, verificationStatus: 'invalid' })
    ).toBe('mismatch')
    expect(
      resolveIntegrityState({ isValid: true, verificationStatus: 'valid' })
    ).toBe('verified')
    expect(
      resolveIntegrityState({
        isValid: null,
        verificationStatus: 'not-recorded',
      })
    ).toBe('not-recorded')
  })

  it('falls back to isValid for older payloads and treats null as unavailable', () => {
    expect(resolveIntegrityState({ isValid: true })).toBe('verified')
    expect(resolveIntegrityState({ isValid: false })).toBe('mismatch')
    expect(resolveIntegrityState({ isValid: null })).toBe('unavailable')
  })
})

describe('deriveGovernanceReference', () => {
  it('reports not-recorded for a legacy contract without a governance event', () => {
    expect(deriveGovernanceReference([event()])).toEqual({
      state: 'not-recorded',
      snapshotRef: null,
      networkMode: null,
    })
    expect(deriveGovernanceReference([])).toEqual({
      state: 'not-recorded',
      snapshotRef: null,
      networkMode: null,
    })
  })

  it('reports a live committed snapshot as verified with its identifier', () => {
    expect(
      deriveGovernanceReference([
        event(),
        event({
          id: 'outbox-2',
          eventType: 'governance.published',
          aggregateType: 'governance-snapshot',
          aggregateRef: 'gov999',
        }),
      ])
    ).toEqual({
      state: 'verified',
      snapshotRef: 'gov999',
      networkMode: 'fabric',
    })
  })

  it('never claims verification for simulated or uncommitted snapshots', () => {
    const simulated = deriveGovernanceReference([
      event({
        aggregateType: 'governance-snapshot',
        aggregateRef: 'gov1',
        networkMode: 'simulation',
        blockNumber: null,
      }),
    ])
    expect(simulated).toEqual({
      state: 'unavailable',
      snapshotRef: 'gov1',
      networkMode: 'simulation',
    })

    const pending = deriveGovernanceReference([
      event({
        aggregateType: 'governance-snapshot',
        aggregateRef: 'gov2',
        status: 'pending',
        txId: null,
      }),
    ])
    expect(pending.state).toBe('not-recorded')
    expect(pending.snapshotRef).toBe('gov2')
  })

  it('prefers a committed snapshot over a pending one', () => {
    const result = deriveGovernanceReference([
      event({
        aggregateType: 'governance-snapshot',
        aggregateRef: 'pending1',
        status: 'pending',
        txId: null,
      }),
      event({
        id: 'outbox-9',
        aggregateType: 'governance-snapshot',
        aggregateRef: 'done1',
      }),
    ])
    expect(result.snapshotRef).toBe('done1')
    expect(result.state).toBe('verified')
  })
})

describe('ledgerEventPresentation', () => {
  it('labels move-in settlement and handover events', () => {
    expect(
      ledgerEventPresentation(
        event({
          eventType: 'MOVE_IN_SETTLED',
          aggregateType: 'move-in-settlement',
        })
      ).title
    ).toBe('Quyết toán nhận nhà')
    expect(
      ledgerEventPresentation(
        event({
          eventType: 'HANDOVER_RECORDED',
          aggregateType: 'move-in-handover',
        })
      ).title
    ).toBe('Bàn giao nhận nhà')
  })

  it('renders a safe generic label for a future event type', () => {
    const presentation = ledgerEventPresentation(
      event({ eventType: 'future.new-event', aggregateType: 'brand-new' })
    )
    expect(presentation.title).toBe('future new event')
    expect(presentation.aggregateLabel).toBe('brand new')
  })

  it('shows a block number only for live Fabric evidence', () => {
    expect(ledgerEventPresentation(event()).blockLabel).toBe('#42')
    expect(
      ledgerEventPresentation(
        event({ networkMode: 'simulation', blockNumber: 42 })
      ).blockLabel
    ).toBeNull()
    expect(
      ledgerEventPresentation(event({ blockNumber: null })).blockLabel
    ).toBeNull()
  })
})
