import { afterEach, describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api'
import { FabricAuditResponseError } from '../model/error-messages'
import {
  buildEventDetail,
  buildEventsPage,
  buildFinding,
  buildFindingsPage,
  buildGovernancePage,
  buildGovernanceSnapshot,
  buildGovernanceVerification,
  buildOverview,
  buildRun,
  buildRunsPage,
} from '../test-fixtures/fabric-audit.fixtures'
import {
  cancelReconciliationRun,
  getAuditEvent,
  getAuditOverview,
  getGovernanceSnapshot,
  getReconciliationRun,
  listAuditEvents,
  listGovernanceSnapshots,
  listReconciliationFindings,
  listReconciliationRuns,
  publishGovernanceSnapshot,
  repairReconciliationFinding,
  resumeReconciliationRun,
  startReconciliationRun,
  verifyGovernanceSnapshot,
} from './fabric-audit-api'

afterEach(() => vi.restoreAllMocks())

describe('fabric audit read API', () => {
  it('loads and validates the overview', async () => {
    const get = vi.spyOn(apiClient, 'get').mockResolvedValue(buildOverview())
    const overview = await getAuditOverview()
    expect(get).toHaveBeenCalledWith('/fabric/audit/overview')
    expect(overview.outbox.terminalFailure).toBe(1)
  })

  it('sends only defined event filters as server-side query parameters', async () => {
    const get = vi.spyOn(apiClient, 'get').mockResolvedValue(buildEventsPage())
    await listAuditEvents({
      page: 2,
      limit: 20,
      contractId: 'contract-1',
      eventType: 'handover.completed',
      state: 'failed',
      from: '2026-09-01T00:00:00.000Z',
    })
    const url = get.mock.calls[0]?.[0] as string
    const [path, query] = url.split('?')
    expect(path).toBe('/fabric/audit/events')
    const params = new URLSearchParams(query)
    expect(Object.fromEntries(params)).toEqual({
      page: '2',
      limit: '20',
      contractId: 'contract-1',
      eventType: 'handover.completed',
      state: 'failed',
      from: '2026-09-01T00:00:00.000Z',
    })
  })

  it('encodes the event id and validates the detail', async () => {
    const get = vi.spyOn(apiClient, 'get').mockResolvedValue(buildEventDetail())
    const detail = await getAuditEvent('a/b')
    expect(get).toHaveBeenCalledWith('/fabric/audit/events/a%2Fb')
    expect(detail.dependencies).toHaveLength(2)
  })

  it('lists, reads and verifies governance snapshots', async () => {
    const get = vi
      .spyOn(apiClient, 'get')
      .mockResolvedValueOnce(buildGovernancePage())
      .mockResolvedValueOnce(buildGovernanceSnapshot())
      .mockResolvedValueOnce(
        buildGovernanceVerification({ status: 'mismatch' })
      )
    await listGovernanceSnapshots({ page: 1, limit: 20 })
    await getGovernanceSnapshot('snap-1')
    const verification = await verifyGovernanceSnapshot('snap-1')
    expect(get.mock.calls.map(call => call[0])).toEqual([
      '/fabric/governance-snapshots?page=1&limit=20',
      '/fabric/governance-snapshots/snap-1',
      '/fabric/governance-snapshots/snap-1/verify',
    ])
    expect(verification.status).toBe('mismatch')
  })

  it('lists runs, a run and its filtered findings', async () => {
    const get = vi
      .spyOn(apiClient, 'get')
      .mockResolvedValueOnce(buildRunsPage())
      .mockResolvedValueOnce(buildRun())
      .mockResolvedValueOnce(buildFindingsPage())
    await listReconciliationRuns({ page: 1, limit: 20 })
    await getReconciliationRun('run-1')
    await listReconciliationFindings('run-1', {
      page: 2,
      limit: 10,
      category: 'missing_delivery_work',
      status: 'open',
    })
    expect(get.mock.calls.map(call => call[0])).toEqual([
      '/fabric/reconciliation-runs?page=1&limit=20',
      '/fabric/reconciliation-runs/run-1',
      '/fabric/reconciliation-runs/run-1/findings?page=2&limit=10&category=missing_delivery_work&status=open',
    ])
  })

  it('rejects malformed server responses with a typed error', async () => {
    vi.spyOn(apiClient, 'get').mockResolvedValue({ unexpected: true })
    await expect(getAuditOverview()).rejects.toBeInstanceOf(
      FabricAuditResponseError
    )
    vi.spyOn(apiClient, 'get').mockResolvedValue(buildEventsPage([{ id: 'x' }]))
    await expect(
      listAuditEvents({ page: 1, limit: 20 })
    ).rejects.toBeInstanceOf(FabricAuditResponseError)
  })

  it('propagates transport errors untouched so stable codes survive', async () => {
    const failure = new Error('offline')
    vi.spyOn(apiClient, 'get').mockRejectedValue(failure)
    await expect(getAuditOverview()).rejects.toBe(failure)
  })
})

describe('fabric audit operator API', () => {
  it('starts a bounded run with the validated scope', async () => {
    const post = vi.spyOn(apiClient, 'post').mockResolvedValue(buildRun())
    const scope = {
      from: '2026-09-01T00:00:00.000Z',
      to: '2026-09-30T23:59:59.999Z',
    }
    const run = await startReconciliationRun(scope)
    expect(post).toHaveBeenCalledWith('/fabric/reconciliation-runs', scope)
    expect(run.status).toBe('completed-with-findings')
  })

  it('resumes and cancels a run by id', async () => {
    const post = vi
      .spyOn(apiClient, 'post')
      .mockResolvedValueOnce(buildRun({ status: 'running' }))
      .mockResolvedValueOnce(buildRun({ status: 'cancelled' }))
    await resumeReconciliationRun('run/1')
    const cancelled = await cancelReconciliationRun('run/1')
    expect(post.mock.calls).toEqual([
      ['/fabric/reconciliation-runs/run%2F1/resume', {}],
      ['/fabric/reconciliation-runs/run%2F1/cancel', {}],
    ])
    expect(cancelled.status).toBe('cancelled')
  })

  it('sends the repair reason (trimmed) and validates the response', async () => {
    const post = vi.spyOn(apiClient, 'post').mockResolvedValue({
      finding: buildFinding({ status: 'repair-pending' }),
      outboxId: 'outbox-1',
      alreadyRepaired: false,
    })
    const result = await repairReconciliationFinding(
      'finding-1',
      '  Retry after dependency recovered  '
    )
    expect(post).toHaveBeenCalledWith(
      '/fabric/reconciliation-findings/finding-1/repair',
      { reason: 'Retry after dependency recovered' }
    )
    expect(result.outboxId).toBe('outbox-1')
  })

  it('publishes a governance snapshot and validates the response', async () => {
    const post = vi.spyOn(apiClient, 'post').mockResolvedValue({
      created: true,
      snapshot: buildGovernanceSnapshot(),
    })
    const result = await publishGovernanceSnapshot()
    expect(post).toHaveBeenCalledWith(
      '/fabric/governance-snapshots/publish',
      {}
    )
    expect(result.created).toBe(true)
  })

  it('rejects a malformed mutation response', async () => {
    vi.spyOn(apiClient, 'post').mockResolvedValue({ finding: null })
    await expect(
      repairReconciliationFinding('finding-1', 'Valid reason')
    ).rejects.toBeInstanceOf(FabricAuditResponseError)
  })
})
