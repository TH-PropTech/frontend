import { z } from 'zod'
import { apiClient } from '@/shared/api'
import type { AuditEventsQuery } from '../model/audit-filters'
import { FabricAuditResponseError } from '../model/error-messages'
import type { PageParams } from '../model/query-keys'
import {
  auditEventDetailSchema,
  auditEventsPageSchema,
  auditOverviewSchema,
  governancePageSchema,
  governanceSnapshotSchema,
  governanceVerificationSchema,
  publishGovernanceResponseSchema,
  reconciliationFindingsPageSchema,
  reconciliationRunSchema,
  reconciliationRunsPageSchema,
  repairFindingResponseSchema,
  type AuditEventDetail,
  type AuditEventsPage,
  type AuditOverview,
  type FindingCategory,
  type FindingStatus,
  type GovernancePage,
  type GovernanceSnapshot,
  type GovernanceVerification,
  type PublishGovernanceResponse,
  type ReconciliationFindingsPage,
  type ReconciliationRun,
  type ReconciliationRunsPage,
  type RepairFindingResponse,
} from '../model/schemas'
import type { ReconciliationScopeRequest } from '../model/reconciliation-scope'

export interface FindingsQuery extends PageParams {
  category?: FindingCategory | undefined
  status?: FindingStatus | undefined
}

function parseResponse<TSchema extends z.ZodTypeAny>(
  resource: string,
  schema: TSchema,
  data: unknown
): z.infer<TSchema> {
  const result = schema.safeParse(data)
  if (!result.success) throw new FabricAuditResponseError(resource)
  return result.data
}

function withQuery(
  path: string,
  query: Record<string, string | number | undefined>
): string {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== '') params.set(key, String(value))
  }
  const search = params.toString()
  return search ? `${path}?${search}` : path
}

const segment = encodeURIComponent

// ── Audit Center (admin, staff) ──

export async function getAuditOverview(): Promise<AuditOverview> {
  const data = await apiClient.get<unknown>('/fabric/audit/overview')
  return parseResponse('overview', auditOverviewSchema, data)
}

export async function listAuditEvents(
  query: AuditEventsQuery
): Promise<AuditEventsPage> {
  const data = await apiClient.get<unknown>(
    withQuery('/fabric/audit/events', { ...query })
  )
  return parseResponse('events', auditEventsPageSchema, data)
}

export async function getAuditEvent(id: string): Promise<AuditEventDetail> {
  const data = await apiClient.get<unknown>(
    `/fabric/audit/events/${segment(id)}`
  )
  return parseResponse('event', auditEventDetailSchema, data)
}

// ── Governance snapshots (read: admin, staff; publish: admin) ──

export async function listGovernanceSnapshots(
  params: PageParams
): Promise<GovernancePage> {
  const data = await apiClient.get<unknown>(
    withQuery('/fabric/governance-snapshots', { ...params })
  )
  return parseResponse('governance-list', governancePageSchema, data)
}

export async function getGovernanceSnapshot(
  id: string
): Promise<GovernanceSnapshot> {
  const data = await apiClient.get<unknown>(
    `/fabric/governance-snapshots/${segment(id)}`
  )
  return parseResponse('governance-detail', governanceSnapshotSchema, data)
}

export async function verifyGovernanceSnapshot(
  id: string
): Promise<GovernanceVerification> {
  const data = await apiClient.get<unknown>(
    `/fabric/governance-snapshots/${segment(id)}/verify`
  )
  return parseResponse(
    'governance-verification',
    governanceVerificationSchema,
    data
  )
}

export async function publishGovernanceSnapshot(): Promise<PublishGovernanceResponse> {
  const data = await apiClient.post<unknown>(
    '/fabric/governance-snapshots/publish',
    {}
  )
  return parseResponse(
    'governance-publish',
    publishGovernanceResponseSchema,
    data
  )
}

// ── Reconciliation (read: admin, staff; start/resume/cancel/repair: admin) ──

export async function listReconciliationRuns(
  params: PageParams
): Promise<ReconciliationRunsPage> {
  const data = await apiClient.get<unknown>(
    withQuery('/fabric/reconciliation-runs', { ...params })
  )
  return parseResponse('runs', reconciliationRunsPageSchema, data)
}

export async function getReconciliationRun(
  id: string
): Promise<ReconciliationRun> {
  const data = await apiClient.get<unknown>(
    `/fabric/reconciliation-runs/${segment(id)}`
  )
  return parseResponse('run', reconciliationRunSchema, data)
}

export async function listReconciliationFindings(
  runId: string,
  query: FindingsQuery
): Promise<ReconciliationFindingsPage> {
  const data = await apiClient.get<unknown>(
    withQuery(`/fabric/reconciliation-runs/${segment(runId)}/findings`, {
      page: query.page,
      limit: query.limit,
      category: query.category,
      status: query.status,
    })
  )
  return parseResponse('findings', reconciliationFindingsPageSchema, data)
}

export async function startReconciliationRun(
  scope: ReconciliationScopeRequest
): Promise<ReconciliationRun> {
  const data = await apiClient.post<unknown>(
    '/fabric/reconciliation-runs',
    scope
  )
  return parseResponse('run-start', reconciliationRunSchema, data)
}

export async function resumeReconciliationRun(
  id: string
): Promise<ReconciliationRun> {
  const data = await apiClient.post<unknown>(
    `/fabric/reconciliation-runs/${segment(id)}/resume`,
    {}
  )
  return parseResponse('run-resume', reconciliationRunSchema, data)
}

export async function cancelReconciliationRun(
  id: string
): Promise<ReconciliationRun> {
  const data = await apiClient.post<unknown>(
    `/fabric/reconciliation-runs/${segment(id)}/cancel`,
    {}
  )
  return parseResponse('run-cancel', reconciliationRunSchema, data)
}

export async function repairReconciliationFinding(
  findingId: string,
  reason: string
): Promise<RepairFindingResponse> {
  const data = await apiClient.post<unknown>(
    `/fabric/reconciliation-findings/${segment(findingId)}/repair`,
    { reason: reason.trim() }
  )
  return parseResponse('finding-repair', repairFindingResponseSchema, data)
}
