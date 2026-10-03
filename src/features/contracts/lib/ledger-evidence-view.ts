import {
  ledgerAggregateLabel,
  ledgerEventLabel,
} from '@/shared/lib/ledger-event-labels'
import type { LedgerEvidenceEvent } from '../api/contracts-api'

/**
 * The verification vocabulary of the contract evidence UI: `verified`, `mismatch` and `unavailable`
 * (plus `not-recorded` for evidence that does not exist yet). `unavailable` is never folded into
 * `mismatch`, so an unreachable ledger cannot look like tampering.
 */
export type VerificationLayerState =
  | 'verified'
  | 'mismatch'
  | 'unavailable'
  | 'not-recorded'

const LAYER_LABELS: Record<VerificationLayerState, string> = {
  verified: 'Đã xác minh',
  mismatch: 'Sai lệch',
  unavailable: 'Không khả dụng',
  'not-recorded': 'Chưa ghi nhận',
}

export function layerStateLabel(state: VerificationLayerState): string {
  return LAYER_LABELS[state]
}

/** Accepts the legacy (`valid`/`invalid`) and spec (`verified`) spellings; unknown means unavailable. */
export function normalizeLayerStatus(
  status: string | null | undefined
): VerificationLayerState {
  switch (status) {
    case 'valid':
    case 'verified':
      return 'verified'
    case 'mismatch':
    case 'invalid':
      return 'mismatch'
    case 'not-recorded':
      return 'not-recorded'
    default:
      return 'unavailable'
  }
}

export function resolveIntegrityState(result: {
  isValid: boolean | null
  verificationStatus?: string | null | undefined
}): VerificationLayerState {
  if (result.verificationStatus) {
    return normalizeLayerStatus(result.verificationStatus)
  }
  if (result.isValid === true) return 'verified'
  if (result.isValid === false) return 'mismatch'
  return 'unavailable'
}

export interface GovernanceReference {
  state: VerificationLayerState
  /** Last characters of the snapshot id, as exposed by the sanitized evidence timeline. */
  snapshotRef: string | null
  networkMode: 'fabric' | 'simulation' | null
}

const GOVERNANCE_AGGREGATE = 'governance-snapshot'

function isCommitted(event: LedgerEvidenceEvent): boolean {
  return event.status === 'confirmed'
}

/**
 * Derives the governing snapshot reference from the participant-visible timeline only (no extra
 * endpoint, no snapshot content). State follows the local commit evidence the way the Audit Center
 * does: a live commit with a transaction id is `verified`, simulation is `unavailable`, and anything
 * not committed (or no snapshot at all, as for legacy contracts) is `not-recorded`.
 */
export function deriveGovernanceReference(
  events: readonly LedgerEvidenceEvent[]
): GovernanceReference {
  const snapshots = events.filter(
    event => event.aggregateType === GOVERNANCE_AGGREGATE
  )
  const chosen = snapshots.find(isCommitted) ?? snapshots[0]
  if (!chosen) {
    return { state: 'not-recorded', snapshotRef: null, networkMode: null }
  }
  let state: VerificationLayerState = 'not-recorded'
  if (isCommitted(chosen)) {
    state =
      chosen.networkMode === 'fabric' && chosen.txId
        ? 'verified'
        : 'unavailable'
  }
  return {
    state,
    snapshotRef: chosen.aggregateRef,
    networkMode: chosen.networkMode,
  }
}

export interface LedgerEventPresentation {
  title: string
  aggregateLabel: string
  /** `#<n>` only for live Fabric evidence that reported a block; never for simulation. */
  blockLabel: string | null
}

export function ledgerEventPresentation(
  event: LedgerEvidenceEvent
): LedgerEventPresentation {
  return {
    title: ledgerEventLabel(event.eventType),
    aggregateLabel: ledgerAggregateLabel(event.aggregateType),
    blockLabel:
      event.networkMode === 'fabric' && event.blockNumber !== null
        ? `#${event.blockNumber}`
        : null,
  }
}
