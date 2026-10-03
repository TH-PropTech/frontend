import { describe, expect, it } from 'vitest'
import {
  auditEventDetailSchema,
  auditEventsPageSchema,
  auditOverviewSchema,
  governancePageSchema,
  governanceVerificationSchema,
  reconciliationFindingsPageSchema,
  reconciliationRunSchema,
  reconciliationRunsPageSchema,
  repairFindingResponseSchema,
} from './schemas'
import {
  buildEventDetail,
  buildEventSummary,
  buildEventsPage,
  buildFinding,
  buildFindingsPage,
  buildGovernancePage,
  buildGovernanceVerification,
  buildOverview,
  buildRun,
  buildRunsPage,
} from '../test-fixtures/fabric-audit.fixtures'

describe('audit overview schema', () => {
  it('accepts the server overview, including an unavailable ledger height', () => {
    const parsed = auditOverviewSchema.parse(
      buildOverview({
        ledger: { height: null, currentBlockHash: null, observedAt: null },
      })
    )
    expect(parsed.ledger.height).toBeNull()
    expect(parsed.runtime.state).toBe('live')
  })

  it('accepts every documented runtime state', () => {
    for (const state of ['simulation', 'live', 'degraded', 'unavailable']) {
      const overview = buildOverview()
      expect(
        auditOverviewSchema.safeParse({
          ...overview,
          runtime: { ...overview.runtime, state },
        }).success
      ).toBe(true)
    }
  })

  it('rejects an unknown runtime state instead of silently coercing it', () => {
    const overview = buildOverview()
    const result = auditOverviewSchema.safeParse({
      ...overview,
      runtime: { ...overview.runtime, state: 'healthy' },
    })
    expect(result.success).toBe(false)
  })

  it('rejects malformed counters and missing sections', () => {
    const overview = buildOverview()
    expect(
      auditOverviewSchema.safeParse({
        ...overview,
        outbox: { ...overview.outbox, pending: '3' },
      }).success
    ).toBe(false)
    const partial = { ...overview }
    Reflect.deleteProperty(partial, 'reconciliation')
    expect(auditOverviewSchema.safeParse(partial).success).toBe(false)
  })

  it('accepts identity warnings per role and rejects unknown roles', () => {
    const ok = auditOverviewSchema.safeParse(
      buildOverview({
        identityWarnings: [
          {
            role: 'operator',
            state: 'expiring',
            expiresAt: '2026-10-20T00:00:00.000Z',
          },
        ],
      })
    )
    expect(ok.success).toBe(true)
    const bad = auditOverviewSchema.safeParse(
      buildOverview({
        identityWarnings: [
          { role: 'root', state: 'expiring', expiresAt: null },
        ],
      })
    )
    expect(bad.success).toBe(false)
  })
})

describe('audit events schemas', () => {
  it('parses a page and keeps unknown event types forward compatible', () => {
    const page = auditEventsPageSchema.parse(
      buildEventsPage([buildEventSummary({ eventType: 'future.event-type' })])
    )
    expect(page.items[0]?.eventType).toBe('future.event-type')
  })

  it('rejects an unknown delivery or verification state', () => {
    expect(
      auditEventsPageSchema.safeParse(
        buildEventsPage([buildEventSummary({ status: 'done' })])
      ).success
    ).toBe(false)
    expect(
      auditEventsPageSchema.safeParse(
        buildEventsPage([buildEventSummary({ verificationState: 'ok' })])
      ).success
    ).toBe(false)
  })

  it('rejects a page whose pagination metadata is malformed', () => {
    expect(
      auditEventsPageSchema.safeParse(buildEventsPage([], { total: -1 }))
        .success
    ).toBe(false)
  })

  it('parses event detail with dependencies, explorer reason and verification', () => {
    const detail = auditEventDetailSchema.parse(
      buildEventDetail({
        explorer: {
          available: false,
          url: null,
          reason: 'EXPLORER_NOT_CONFIGURED',
        },
        verification: {
          status: 'unavailable',
          reason: 'FABRIC_SIMULATION_MODE',
        },
      })
    )
    expect(detail.explorer.reason).toBe('EXPLORER_NOT_CONFIGURED')
    expect(detail.dependencies).toHaveLength(2)
  })

  it('rejects detail without a verification block', () => {
    const rest = { ...buildEventDetail() }
    Reflect.deleteProperty(rest, 'verification')
    expect(auditEventDetailSchema.safeParse(rest).success).toBe(false)
  })
})

describe('governance schemas', () => {
  it('parses a snapshot page with nullable layout and fee schedule', () => {
    const page = governancePageSchema.parse(buildGovernancePage())
    expect(page.items[0]?.components.contractLayout).toBeNull()
    expect(page.items[0]?.ledgerStatus).toBe('confirmed-fabric')
  })

  it('rejects a snapshot with an unknown ledger status', () => {
    const page = buildGovernancePage()
    const firstItem = page.items[0]
    if (!firstItem)
      throw new Error('Fixture must include a governance snapshot')
    const item = { ...firstItem, ledgerStatus: 'maybe' }
    expect(
      governancePageSchema.safeParse({ ...page, items: [item] }).success
    ).toBe(false)
  })

  it('parses the tri-state verification result and rejects collapsed states', () => {
    for (const status of [
      'verified',
      'mismatch',
      'unavailable',
      'not-recorded',
    ]) {
      expect(
        governanceVerificationSchema.safeParse(
          buildGovernanceVerification({ status })
        ).success
      ).toBe(true)
    }
    expect(
      governanceVerificationSchema.safeParse(
        buildGovernanceVerification({ status: 'invalid' })
      ).success
    ).toBe(false)
  })
})

describe('reconciliation schemas', () => {
  it('parses runs and rejects unknown statuses', () => {
    expect(reconciliationRunSchema.parse(buildRun()).status).toBe(
      'completed-with-findings'
    )
    expect(
      reconciliationRunSchema.safeParse(buildRun({ status: 'paused' })).success
    ).toBe(false)
    expect(
      reconciliationRunsPageSchema.parse(buildRunsPage()).items
    ).toHaveLength(1)
  })

  it('parses findings including the repair/resolution audit blocks', () => {
    const page = reconciliationFindingsPageSchema.parse(
      buildFindingsPage([
        buildFinding({
          status: 'repair-pending',
          recoveryOutboxId: 'outbox-1',
          repair: {
            actorId: 'admin-1',
            reason: 'Retry after dependency recovered',
            requestedAt: '2026-10-02T01:00:00.000Z',
          },
        }),
        buildFinding({
          id: '66f000000000000000000f02',
          category: 'hash_schema_mismatch',
          repairable: false,
          resolution: {
            actorId: 'admin-1',
            reason: 'Accepted after review',
            resolvedAt: '2026-10-02T02:00:00.000Z',
          },
        }),
      ])
    )
    expect(page.items[1]?.repairable).toBe(false)
  })

  it('rejects an unknown finding category and a non-boolean repairable flag', () => {
    expect(
      reconciliationFindingsPageSchema.safeParse(
        buildFindingsPage([buildFinding({ category: 'weird' })])
      ).success
    ).toBe(false)
    expect(
      reconciliationFindingsPageSchema.safeParse(
        buildFindingsPage([buildFinding({ repairable: 'yes' })])
      ).success
    ).toBe(false)
  })

  it('parses a repair response and rejects one without an outbox id', () => {
    const ok = {
      finding: buildFinding({ status: 'repair-pending' }),
      outboxId: 'outbox-9',
      alreadyRepaired: false,
    }
    expect(repairFindingResponseSchema.parse(ok).outboxId).toBe('outbox-9')
    const bad = { ...ok }
    Reflect.deleteProperty(bad, 'outboxId')
    expect(repairFindingResponseSchema.safeParse(bad).success).toBe(false)
  })
})
