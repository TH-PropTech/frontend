import type { ReconciliationRun } from './schemas'

const BUDGET_EXHAUSTED = 'ORPHAN_SCAN_BUDGET_EXHAUSTED'

/** Mirrors the server rule: only queued or running runs can be cancelled cooperatively. */
export function canCancelRun(run: ReconciliationRun): boolean {
  return run.status === 'queued' || run.status === 'running'
}

/**
 * Mirrors the visible part of the server resume rule: failed runs, or runs that stopped on the
 * orphan-scan budget while holding a checkpoint. (Stale `running` runs are left to the API.)
 */
export function canResumeRun(run: ReconciliationRun): boolean {
  if (run.status === 'failed') return true
  return (
    run.status === 'completed-with-findings' &&
    run.lastErrorCode === BUDGET_EXHAUSTED &&
    run.checkpointPhase !== null
  )
}
