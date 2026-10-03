/**
 * Server-shaped fixtures that mirror `backend/src/modules/fabric/dto/*.dto.ts`. They are plain
 * objects (not parsed) so tests can both feed them through the Zod schemas and mutate them to
 * prove malformed responses are rejected.
 */

const HASH_A = 'a'.repeat(64)
const HASH_B = 'b'.repeat(64)

export function buildOverview(overrides: Record<string, unknown> = {}) {
  return {
    generatedAt: '2026-10-02T08:00:00.000Z',
    runtime: {
      mode: 'fabric',
      state: 'live',
      ready: true,
      connectionState: 'connected',
      abiVersion: 2,
      evidenceSchemaVersions: [1, 2, 3],
      errorCodes: [],
    },
    outbox: {
      pending: 3,
      processing: 1,
      retryable: 2,
      succeeded: 40,
      terminalFailure: 1,
      oldestPendingAt: '2026-10-02T07:00:00.000Z',
      oldestPendingAgeSeconds: 3600,
      oldestTerminalFailureAt: '2026-10-01T07:00:00.000Z',
      oldestTerminalFailureAgeSeconds: 90000,
    },
    worker: { state: 'ready', oldestPendingAt: null },
    ledger: {
      height: 10492,
      currentBlockHash: 'c'.repeat(64),
      observedAt: '2026-10-02T07:59:30.000Z',
    },
    identityWarnings: [],
    explorer: {
      enabled: true,
      state: 'ready',
      available: true,
      reason: null,
    },
    coverage: [
      {
        eventType: 'contract.activated',
        total: 10,
        pending: 1,
        confirmed: 8,
        failed: 1,
      },
      {
        eventType: 'handover.completed',
        total: 4,
        pending: 0,
        confirmed: 4,
        failed: 0,
      },
    ],
    reconciliation: {
      latestRun: {
        id: '66f000000000000000000001',
        status: 'completed-with-findings',
        startedAt: '2026-10-01T01:00:00.000Z',
        completedAt: '2026-10-01T01:05:00.000Z',
        counters: {
          examined: 50,
          consistent: 47,
          findings: 2,
          unverifiable: 1,
        },
      },
      openFindings: 2,
    },
    ...overrides,
  }
}

export function buildEventSummary(overrides: Record<string, unknown> = {}) {
  return {
    id: '66f0000000000000000000a1',
    eventType: 'contract.activated',
    aggregateType: 'contract',
    aggregateRef: 'abc123',
    contractId: 'contract-1',
    status: 'confirmed',
    verificationState: 'verified',
    networkMode: 'fabric',
    txId: 'tx-0123456789abcdef0123456789abcdef',
    blockNumber: 10492,
    explorerUrl: 'https://explorer.example.test/tx/tx-0123456789abcdef',
    payloadHash: HASH_A,
    attempts: 1,
    failureCode: null,
    createdAt: '2026-10-02T06:00:00.000Z',
    updatedAt: '2026-10-02T06:01:00.000Z',
    recordedAt: '2026-10-02T06:01:00.000Z',
    ...overrides,
  }
}

export function buildEventDetail(overrides: Record<string, unknown> = {}) {
  return {
    ...buildEventSummary(),
    dependencies: [
      { key: 'deposit:def456:deposit.paid', state: 'confirmed' },
      {
        key: 'governance-snapshot:aaa111:governance.published',
        state: 'pending',
      },
    ],
    explorer: {
      available: true,
      url: 'https://explorer.example.test/tx/tx-0123456789abcdef',
      reason: null,
    },
    verification: { status: 'verified', reason: null },
    ...overrides,
  }
}

export function buildEventsPage(
  items: unknown[] = [buildEventSummary()],
  overrides: Record<string, unknown> = {}
) {
  return {
    items,
    total: items.length,
    page: 1,
    limit: 20,
    totalPages: items.length === 0 ? 0 : 1,
    ...overrides,
  }
}

export function buildGovernanceSnapshot(
  overrides: Record<string, unknown> = {}
) {
  return {
    id: '66f0000000000000000000b1',
    snapshotCode: 'GOV-000001',
    version: 1,
    manifestSchemaVersion: 1,
    status: 'published',
    components: {
      legalTerms: [{ id: 'lt1', version: 2, hash: HASH_A }],
      policySet: [
        { key: 'late-fee', value: '5', unit: 'percent', hash: HASH_B },
      ],
      contractTemplate: [{ id: 'tpl1', version: 1, hash: HASH_A }],
      contractLayout: null,
      rentalExecutionPolicy: [
        { policyId: 'DEPOSIT_FIRST', version: 1, hash: HASH_B },
      ],
      feeSchedule: { id: 'fee1', version: 3, hash: HASH_A },
    },
    manifestHash: HASH_A,
    ledgerStatus: 'confirmed-fabric',
    txHash: 'tx-gov-1',
    blockNumber: 10400,
    publishedBy: 'admin-1',
    publishedAt: '2026-09-30T10:00:00.000Z',
    ...overrides,
  }
}

export function buildGovernancePage(
  items: unknown[] = [buildGovernanceSnapshot()]
) {
  return { items, total: items.length, page: 1, limit: 20, totalPages: 1 }
}

export function buildGovernanceVerification(
  overrides: Record<string, unknown> = {}
) {
  return {
    snapshotId: '66f0000000000000000000b1',
    version: 1,
    status: 'verified',
    localManifestHash: HASH_A,
    ledgerManifestHash: HASH_A,
    mismatchFields: [],
    txHash: 'tx-gov-1',
    blockNumber: 10400,
    networkMode: 'fabric',
    reason: null,
    checkedAt: '2026-10-02T08:00:00.000Z',
    ...overrides,
  }
}

export function buildRun(overrides: Record<string, unknown> = {}) {
  return {
    id: '66f000000000000000000001',
    scope: {
      from: '2026-09-01T00:00:00.000Z',
      to: '2026-09-30T23:59:59.999Z',
      contractCount: 0,
      eventTypes: ['contract.activated'],
    },
    status: 'completed-with-findings',
    checkpointPhase: null,
    counters: { examined: 50, consistent: 47, findings: 2, unverifiable: 1 },
    requestedBy: 'admin-1',
    startedAt: '2026-10-01T01:00:00.000Z',
    completedAt: '2026-10-01T01:05:00.000Z',
    lastErrorCode: null,
    createdAt: '2026-10-01T00:59:00.000Z',
    ...overrides,
  }
}

export function buildRunsPage(items: unknown[] = [buildRun()]) {
  return { items, total: items.length, page: 1, limit: 20, totalPages: 1 }
}

export function buildFinding(overrides: Record<string, unknown> = {}) {
  return {
    id: '66f000000000000000000f01',
    runId: '66f000000000000000000001',
    category: 'terminal_delivery_failure',
    status: 'open',
    contractId: 'contract-1',
    aggregateType: 'contract',
    aggregateId: 'contract-1',
    eventType: 'contract.activated',
    expectedHash: HASH_A,
    observedHash: null,
    repairable: true,
    recoveryOutboxId: null,
    repair: null,
    resolution: null,
    firstSeenAt: '2026-10-01T01:01:00.000Z',
    lastSeenAt: '2026-10-01T01:04:00.000Z',
    ...overrides,
  }
}

export function buildFindingsPage(items: unknown[] = [buildFinding()]) {
  return { items, total: items.length, page: 1, limit: 20, totalPages: 1 }
}
