'use client'

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import type { AuditFilters } from '../model/audit-filters'
import { toAuditEventsQuery } from '../model/audit-filters'
import { fabricAuditKeys, type PageParams } from '../model/query-keys'
import type { ReconciliationScopeRequest } from '../model/reconciliation-scope'
import type { ReconciliationRun } from '../model/schemas'
import {
  cancelReconciliationRun,
  getAuditEvent,
  getAuditOverview,
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
  type FindingsQuery,
} from './fabric-audit-api'

/** Reads are gated by the capability helper; a denied viewer never triggers a request. */
interface ReadOptions {
  enabled?: boolean
}

const ACTIVE_RUN_STATUSES: ReadonlySet<ReconciliationRun['status']> = new Set([
  'queued',
  'running',
])
const RUN_POLL_MS = 5000

export function useAuditOverview({ enabled = true }: ReadOptions = {}) {
  return useQuery({
    queryKey: fabricAuditKeys.overview(),
    queryFn: getAuditOverview,
    enabled,
    staleTime: 15_000,
  })
}

export function useAuditEvents(
  filters: AuditFilters,
  { enabled = true }: ReadOptions = {}
) {
  const query = toAuditEventsQuery(filters)
  return useQuery({
    queryKey: fabricAuditKeys.events(query),
    queryFn: () => listAuditEvents(query),
    enabled,
    placeholderData: keepPreviousData,
  })
}

export function useAuditEvent(
  id: string | null,
  { enabled = true }: ReadOptions = {}
) {
  return useQuery({
    queryKey: fabricAuditKeys.event(id ?? ''),
    queryFn: () => getAuditEvent(id ?? ''),
    enabled: enabled && id !== null,
  })
}

export function useGovernanceSnapshots(
  params: PageParams,
  { enabled = true }: ReadOptions = {}
) {
  return useQuery({
    queryKey: fabricAuditKeys.governanceList(params),
    queryFn: () => listGovernanceSnapshots(params),
    enabled,
    placeholderData: keepPreviousData,
  })
}

/** A live ledger check: never served from cache, requested explicitly by the viewer. */
export function useGovernanceVerification(id: string | null) {
  return useQuery({
    queryKey: fabricAuditKeys.governanceVerification(id ?? ''),
    queryFn: () => verifyGovernanceSnapshot(id ?? ''),
    enabled: id !== null,
    staleTime: 0,
    gcTime: 0,
    retry: false,
  })
}

export function useReconciliationRuns(
  params: PageParams,
  { enabled = true }: ReadOptions = {}
) {
  return useQuery({
    queryKey: fabricAuditKeys.runs(params),
    queryFn: () => listReconciliationRuns(params),
    enabled,
    placeholderData: keepPreviousData,
    refetchInterval: query =>
      query.state.data?.items.some(run => ACTIVE_RUN_STATUSES.has(run.status))
        ? RUN_POLL_MS
        : false,
  })
}

export function useReconciliationRun(id: string | null) {
  return useQuery({
    queryKey: fabricAuditKeys.run(id ?? ''),
    queryFn: () => getReconciliationRun(id ?? ''),
    enabled: id !== null,
    refetchInterval: query =>
      query.state.data && ACTIVE_RUN_STATUSES.has(query.state.data.status)
        ? RUN_POLL_MS
        : false,
  })
}

export function useReconciliationFindings(
  runId: string | null,
  query: FindingsQuery
) {
  return useQuery({
    queryKey: fabricAuditKeys.findings(runId ?? '', query),
    queryFn: () => listReconciliationFindings(runId ?? '', query),
    enabled: runId !== null,
    placeholderData: keepPreviousData,
  })
}

// ── Mutations: each refreshes every cache the operation can change ──

export function useStartReconciliationRun() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (scope: ReconciliationScopeRequest) =>
      startReconciliationRun(scope),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: fabricAuditKeys.runsRoot() }),
        queryClient.invalidateQueries({ queryKey: fabricAuditKeys.overview() }),
      ])
    },
  })
}

function useRunTransition(action: (id: string) => Promise<ReconciliationRun>) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => action(id),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: fabricAuditKeys.runsRoot() }),
        queryClient.invalidateQueries({ queryKey: fabricAuditKeys.overview() }),
      ])
    },
  })
}

export function useResumeReconciliationRun() {
  return useRunTransition(resumeReconciliationRun)
}

export function useCancelReconciliationRun() {
  return useRunTransition(cancelReconciliationRun)
}

export function useRepairFinding() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      findingId,
      reason,
    }: {
      findingId: string
      reason: string
    }) => repairReconciliationFinding(findingId, reason),
    onSuccess: async () => {
      // A repair enqueues outbox work, so findings, run counters, overview and events all change.
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: fabricAuditKeys.runsRoot() }),
        queryClient.invalidateQueries({ queryKey: fabricAuditKeys.overview() }),
        queryClient.invalidateQueries({
          queryKey: fabricAuditKeys.eventsRoot(),
        }),
      ])
    },
  })
}

export function usePublishGovernanceSnapshot() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => publishGovernanceSnapshot(),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: fabricAuditKeys.governanceRoot(),
        }),
        queryClient.invalidateQueries({ queryKey: fabricAuditKeys.overview() }),
        queryClient.invalidateQueries({
          queryKey: fabricAuditKeys.eventsRoot(),
        }),
      ])
    },
  })
}
