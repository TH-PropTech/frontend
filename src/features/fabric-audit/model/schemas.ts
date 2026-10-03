import { z } from 'zod'

/**
 * Zod mirrors of `backend/src/modules/fabric/dto/{fabric-audit,fabric-governance,ledger-reconciliation}.dto.ts`.
 * Closed sets documented in design D6/D7/D9 are enums (a drifting contract is rejected instead of
 * rendered); event types stay open strings so new sanitized event families remain forward compatible.
 */

export const AUDIT_EVENT_TYPES = [
  'contract.activated',
  'deposit.paid',
  'payment.paid',
  'contract.amendment-effective',
  'contract.terminated',
  'governance.published',
  'move-in.settled',
  'handover.completed',
] as const

export const RECONCILIATION_EVENT_TYPES = [
  'contract.activated',
  'deposit.paid',
  'payment.paid',
  'governance.published',
  'move-in.settled',
  'handover.completed',
] as const

export const AUDIT_DELIVERY_STATES = [
  'pending',
  'processing',
  'retryable',
  'confirmed',
  'failed',
] as const

export const AUDIT_VERIFICATION_STATES = [
  'verified',
  'mismatch',
  'unavailable',
  'not-recorded',
] as const

export const FINDING_CATEGORIES = [
  'missing_delivery_work',
  'retryable_delivery_failure',
  'terminal_delivery_failure',
  'missing_local_projection',
  'missing_ledger_evidence',
  'hash_schema_mismatch',
  'orphan_local_projection',
  'orphan_ledger_evidence',
  'unverifiable',
] as const

export const FINDING_STATUSES = [
  'open',
  'repair-pending',
  'resolved',
  'accepted-risk',
] as const

export const RUN_STATUSES = [
  'queued',
  'running',
  'completed',
  'completed-with-findings',
  'failed',
  'cancelled',
] as const

export const deliveryStateSchema = z.enum(AUDIT_DELIVERY_STATES)
export const verificationStateSchema = z.enum(AUDIT_VERIFICATION_STATES)
export const findingCategorySchema = z.enum(FINDING_CATEGORIES)
export const findingStatusSchema = z.enum(FINDING_STATUSES)
export const runStatusSchema = z.enum(RUN_STATUSES)

const nullableString = z.string().nullable()
const nullableNumber = z.number().nullable()
const count = z.number().int().nonnegative()

function pageSchema<TItem extends z.ZodTypeAny>(item: TItem) {
  return z.object({
    items: z.array(item),
    total: count,
    page: z.number().int().positive(),
    limit: z.number().int().positive(),
    totalPages: count,
  })
}

// ── Overview ──

const explorerReasonSchema = z
  .enum(['EXPLORER_NOT_CONFIGURED', 'EXPLORER_DEGRADED'])
  .nullable()

export const auditOverviewSchema = z.object({
  generatedAt: z.string(),
  runtime: z.object({
    mode: z.enum(['simulation', 'fabric']),
    state: z.enum(['simulation', 'live', 'degraded', 'unavailable']),
    ready: z.boolean(),
    connectionState: z.enum(['disabled', 'connected', 'unavailable']),
    abiVersion: nullableNumber,
    evidenceSchemaVersions: z.array(z.number()),
    errorCodes: z.array(z.string()),
  }),
  outbox: z.object({
    pending: count,
    processing: count,
    retryable: count,
    succeeded: count,
    terminalFailure: count,
    oldestPendingAt: nullableString,
    oldestPendingAgeSeconds: nullableNumber,
    oldestTerminalFailureAt: nullableString,
    oldestTerminalFailureAgeSeconds: nullableNumber,
  }),
  worker: z.object({
    state: z.enum(['ready', 'degraded']),
    oldestPendingAt: nullableString,
  }),
  ledger: z.object({
    height: nullableNumber,
    currentBlockHash: nullableString,
    observedAt: nullableString,
  }),
  identityWarnings: z.array(
    z.object({
      role: z.enum(['writer', 'reader', 'operator']),
      state: z.enum(['expiring', 'expired']),
      expiresAt: nullableString,
    })
  ),
  explorer: z.object({
    enabled: z.boolean(),
    state: z.enum(['disabled', 'ready', 'degraded']),
    available: z.boolean(),
    reason: explorerReasonSchema,
  }),
  coverage: z.array(
    z.object({
      eventType: z.string(),
      total: count,
      pending: count,
      confirmed: count,
      failed: count,
    })
  ),
  reconciliation: z.object({
    latestRun: z
      .object({
        id: z.string(),
        status: z.string(),
        startedAt: nullableString,
        completedAt: nullableString,
        counters: z.object({
          examined: count,
          consistent: count,
          findings: count,
          unverifiable: count,
        }),
      })
      .nullable(),
    openFindings: count,
  }),
})

// ── Events ──

export const auditEventSummarySchema = z.object({
  id: z.string(),
  eventType: z.string(),
  aggregateType: z.string(),
  aggregateRef: z.string(),
  contractId: nullableString,
  status: deliveryStateSchema,
  verificationState: verificationStateSchema,
  networkMode: z.enum(['fabric', 'simulation']),
  txId: nullableString,
  blockNumber: nullableNumber,
  explorerUrl: nullableString,
  payloadHash: z.string(),
  attempts: count,
  failureCode: nullableString,
  createdAt: z.string(),
  updatedAt: z.string(),
  recordedAt: nullableString,
})

export const auditEventDetailSchema = auditEventSummarySchema.extend({
  dependencies: z.array(
    z.object({
      key: z.string(),
      state: z.enum([
        'confirmed',
        'pending',
        'processing',
        'failed',
        'missing',
      ]),
    })
  ),
  explorer: z.object({
    available: z.boolean(),
    url: nullableString,
    reason: z
      .enum([
        'EXPLORER_NOT_CONFIGURED',
        'EXPLORER_DEGRADED',
        'NOT_COMMITTED_ON_FABRIC',
      ])
      .nullable(),
  }),
  verification: z.object({
    status: verificationStateSchema,
    reason: nullableString,
  }),
})

export const auditEventsPageSchema = pageSchema(auditEventSummarySchema)

// ── Governance ──

const componentRefSchema = z.object({
  id: z.string(),
  version: z.number(),
  hash: z.string(),
})

export const governanceSnapshotSchema = z.object({
  id: z.string(),
  snapshotCode: z.string(),
  version: z.number(),
  manifestSchemaVersion: z.number(),
  status: z.literal('published'),
  components: z.object({
    legalTerms: z.array(componentRefSchema),
    policySet: z.array(
      z.object({
        key: z.string(),
        value: z.string(),
        unit: nullableString,
        hash: z.string(),
      })
    ),
    contractTemplate: z.array(componentRefSchema),
    contractLayout: z.array(componentRefSchema).nullable(),
    rentalExecutionPolicy: z.array(
      z.object({ policyId: z.string(), version: z.number(), hash: z.string() })
    ),
    feeSchedule: componentRefSchema.nullable(),
  }),
  manifestHash: z.string(),
  ledgerStatus: z.enum([
    'pending',
    'confirmed-fabric',
    'confirmed-simulation',
    'failed-terminal',
  ]),
  txHash: nullableString,
  blockNumber: nullableNumber,
  publishedBy: z.string(),
  publishedAt: z.string(),
})

export const governancePageSchema = pageSchema(governanceSnapshotSchema)

export const governanceVerificationSchema = z.object({
  snapshotId: z.string(),
  version: z.number(),
  status: verificationStateSchema,
  localManifestHash: z.string(),
  ledgerManifestHash: nullableString,
  mismatchFields: z.array(z.string()),
  txHash: nullableString.optional(),
  blockNumber: nullableNumber.optional(),
  networkMode: z.enum(['fabric', 'simulation']),
  reason: nullableString,
  checkedAt: z.string(),
})

export const publishGovernanceResponseSchema = z.object({
  created: z.boolean(),
  snapshot: governanceSnapshotSchema,
})

// ── Reconciliation ──

export const reconciliationRunSchema = z.object({
  id: z.string(),
  scope: z.object({
    from: nullableString,
    to: nullableString,
    contractCount: count,
    eventTypes: z.array(z.string()).nullable(),
  }),
  status: runStatusSchema,
  checkpointPhase: nullableString,
  counters: z.object({
    examined: count,
    consistent: count,
    findings: count,
    unverifiable: count,
  }),
  requestedBy: z.string(),
  startedAt: nullableString,
  completedAt: nullableString,
  lastErrorCode: nullableString,
  createdAt: z.string(),
})

export const reconciliationRunsPageSchema = pageSchema(reconciliationRunSchema)

export const reconciliationFindingSchema = z.object({
  id: z.string(),
  runId: z.string(),
  category: findingCategorySchema,
  status: findingStatusSchema,
  contractId: nullableString,
  aggregateType: z.string(),
  aggregateId: z.string(),
  eventType: z.string(),
  expectedHash: nullableString,
  observedHash: nullableString,
  repairable: z.boolean(),
  recoveryOutboxId: nullableString,
  repair: z
    .object({
      actorId: z.string(),
      reason: z.string(),
      requestedAt: z.string(),
    })
    .nullable(),
  resolution: z
    .object({
      actorId: z.string(),
      reason: z.string(),
      resolvedAt: z.string(),
    })
    .nullable(),
  firstSeenAt: z.string(),
  lastSeenAt: z.string(),
})

export const reconciliationFindingsPageSchema = pageSchema(
  reconciliationFindingSchema
)

export const repairFindingResponseSchema = z.object({
  finding: reconciliationFindingSchema,
  outboxId: z.string(),
  alreadyRepaired: z.boolean(),
})

export type AuditOverview = z.infer<typeof auditOverviewSchema>
export type AuditEventSummary = z.infer<typeof auditEventSummarySchema>
export type AuditEventDetail = z.infer<typeof auditEventDetailSchema>
export type AuditEventsPage = z.infer<typeof auditEventsPageSchema>
export type AuditDeliveryState = z.infer<typeof deliveryStateSchema>
export type AuditVerificationState = z.infer<typeof verificationStateSchema>
export type GovernanceSnapshot = z.infer<typeof governanceSnapshotSchema>
export type GovernancePage = z.infer<typeof governancePageSchema>
export type GovernanceVerification = z.infer<
  typeof governanceVerificationSchema
>
export type PublishGovernanceResponse = z.infer<
  typeof publishGovernanceResponseSchema
>
export type ReconciliationRun = z.infer<typeof reconciliationRunSchema>
export type ReconciliationRunsPage = z.infer<
  typeof reconciliationRunsPageSchema
>
export type ReconciliationFinding = z.infer<typeof reconciliationFindingSchema>
export type ReconciliationFindingsPage = z.infer<
  typeof reconciliationFindingsPageSchema
>
export type RepairFindingResponse = z.infer<typeof repairFindingResponseSchema>
export type FindingCategory = z.infer<typeof findingCategorySchema>
export type FindingStatus = z.infer<typeof findingStatusSchema>
export type RunStatus = z.infer<typeof runStatusSchema>
