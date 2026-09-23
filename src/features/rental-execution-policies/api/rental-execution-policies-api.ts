import { apiClient } from '@/shared/api'

export type RentalExecutionPolicyStrategy = 'DEPOSIT_FIRST' | 'SIGN_FIRST'
export type RentalExecutionPolicyStatus = 'draft' | 'published' | 'archived'

export interface RentalExecutionPolicyDisclosure {
  sequenceLabel: string
  depositLabel: string
  effectivenessLabel: string
  cancellationLabel: string
}

export interface RentalExecutionPolicyRecord {
  _id?: string
  policyId: string
  version: number | null
  status: RentalExecutionPolicyStatus
  strategy: RentalExecutionPolicyStrategy
  name: string
  description: string
  disclosure: RentalExecutionPolicyDisclosure
  contentHash: string | null
  draftRevision: number
  createdBy?: string | null
  updatedBy?: string | null
  publishedBy?: string | null
  publishedAt?: string | null
  archivedAt?: string | null
}

export interface SaveRentalExecutionPolicyDraftInput {
  policyId?: string
  strategy: RentalExecutionPolicyStrategy
  name: string
  description: string
  disclosure: RentalExecutionPolicyDisclosure
  expectedRevision: number
}

export async function getRentalExecutionPolicies(): Promise<
  RentalExecutionPolicyRecord[]
> {
  return apiClient.get<RentalExecutionPolicyRecord[]>(
    '/rental-execution-policies'
  )
}

export async function getAdminRentalExecutionPolicies(): Promise<
  RentalExecutionPolicyRecord[]
> {
  return apiClient.get<RentalExecutionPolicyRecord[]>(
    '/rental-execution-policies/admin'
  )
}

export async function saveRentalExecutionPolicyDraft(
  input: SaveRentalExecutionPolicyDraftInput
): Promise<RentalExecutionPolicyRecord> {
  const policyId = input.policyId?.trim()
  const path = policyId
    ? `/rental-execution-policies/admin/${encodeURIComponent(policyId)}/draft`
    : '/rental-execution-policies/admin/draft'
  return policyId
    ? apiClient.put<RentalExecutionPolicyRecord>(path, input)
    : apiClient.post<RentalExecutionPolicyRecord>(path, input)
}

export async function publishRentalExecutionPolicy(
  policyId: string,
  input: { expectedRevision: number; reason: string }
): Promise<RentalExecutionPolicyRecord> {
  return apiClient.post<RentalExecutionPolicyRecord>(
    `/rental-execution-policies/admin/${encodeURIComponent(policyId)}/publish`,
    input
  )
}

export async function archiveRentalExecutionPolicy(
  policyId: string,
  version: number,
  reason: string
): Promise<RentalExecutionPolicyRecord> {
  return apiClient.post<RentalExecutionPolicyRecord>(
    `/rental-execution-policies/admin/${encodeURIComponent(policyId)}/${version}/archive`,
    { reason }
  )
}
