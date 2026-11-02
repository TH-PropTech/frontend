import { describe, expect, it } from 'vitest'
import {
  deliveryStateView,
  explorerReasonLabel,
  findingCategoryLabel,
  findingStatusView,
  identityRoleLabel,
  runErrorLabel,
  runStatusView,
  runtimeStateView,
  verificationStateView,
} from './labels'
import { canCancelRun, canResumeRun } from './run-actions'
import { buildRun } from '../test-fixtures/fabric-audit.fixtures'
import { reconciliationRunSchema } from './schemas'

describe('state views', () => {
  it('never labels simulation as live and keeps all runtime states distinct', () => {
    const labels = (
      ['simulation', 'live', 'degraded', 'unavailable'] as const
    ).map(state => runtimeStateView(state).label)
    expect(new Set(labels).size).toBe(4)
    expect(runtimeStateView('simulation').label).toMatch(/mô phỏng/i)
    expect(runtimeStateView('simulation').tone).not.toBe('success')
    expect(runtimeStateView('live').tone).toBe('success')
  })

  it('keeps unavailable distinct from mismatch in verification', () => {
    expect(verificationStateView('unavailable').label).not.toBe(
      verificationStateView('mismatch').label
    )
    expect(verificationStateView('mismatch').tone).toBe('danger')
    expect(verificationStateView('unavailable').tone).toBe('neutral')
    expect(verificationStateView('verified').tone).toBe('success')
    expect(verificationStateView('not-recorded').tone).toBe('neutral')
  })

  it('marks terminal delivery failure as danger and retryable as warning', () => {
    expect(deliveryStateView('failed').tone).toBe('danger')
    expect(deliveryStateView('retryable').tone).toBe('warning')
    expect(deliveryStateView('pending').tone).toBe('info')
    expect(deliveryStateView('processing').tone).toBe('info')
    expect(deliveryStateView('confirmed').tone).toBe('success')
  })

  it('covers every finding category, status and run status', () => {
    expect(findingCategoryLabel('hash_schema_mismatch')).toMatch(/mã băm/i)
    expect(findingCategoryLabel('unverifiable')).toBeTruthy()
    expect(findingStatusView('open').tone).toBe('warning')
    expect(findingStatusView('resolved').tone).toBe('success')
    expect(runStatusView('failed').tone).toBe('danger')
    expect(runStatusView('completed-with-findings').tone).toBe('warning')
    expect(runStatusView('completed').tone).toBe('success')
    expect(runStatusView('cancelled').tone).toBe('neutral')
  })

  it('labels identity roles, explorer reasons and run error codes', () => {
    expect(identityRoleLabel('writer')).toBe('Ghi sổ')
    expect(identityRoleLabel('reader')).toBe('Đọc sổ')
    expect(identityRoleLabel('operator')).toBe('Vận hành')
    expect(explorerReasonLabel('EXPLORER_NOT_CONFIGURED')).toMatch(/cấu hình/)
    expect(explorerReasonLabel('EXPLORER_DEGRADED')).toMatch(/suy giảm/)
    expect(explorerReasonLabel('NOT_COMMITTED_ON_FABRIC')).toMatch(/Fabric/)
    expect(runErrorLabel('ORPHAN_SCAN_BUDGET_EXHAUSTED')).toMatch(/ngân sách/)
    expect(runErrorLabel('FABRIC_UNAVAILABLE')).toMatch(/Fabric/)
    expect(runErrorLabel('SOMETHING_NEW')).toBe('SOMETHING_NEW')
    expect(runErrorLabel(null)).toBeNull()
  })
})

describe('run actions', () => {
  const run = (overrides: Record<string, unknown>) =>
    reconciliationRunSchema.parse(buildRun(overrides))

  it('lets only queued or running runs be cancelled', () => {
    expect(canCancelRun(run({ status: 'queued' }))).toBe(true)
    expect(canCancelRun(run({ status: 'running' }))).toBe(true)
    expect(canCancelRun(run({ status: 'completed' }))).toBe(false)
    expect(canCancelRun(run({ status: 'failed' }))).toBe(false)
  })

  it('lets failed runs and budget-exhausted runs with a checkpoint resume', () => {
    expect(canResumeRun(run({ status: 'failed' }))).toBe(true)
    expect(
      canResumeRun(
        run({
          status: 'completed-with-findings',
          lastErrorCode: 'ORPHAN_SCAN_BUDGET_EXHAUSTED',
          checkpointPhase: 'contract.activated',
        })
      )
    ).toBe(true)
    expect(
      canResumeRun(
        run({
          status: 'completed-with-findings',
          lastErrorCode: 'ORPHAN_SCAN_BUDGET_EXHAUSTED',
          checkpointPhase: null,
        })
      )
    ).toBe(false)
    expect(canResumeRun(run({ status: 'completed' }))).toBe(false)
    expect(canResumeRun(run({ status: 'cancelled' }))).toBe(false)
  })
})
