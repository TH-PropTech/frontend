import { apiClient } from '@/shared/api/api-client'

export type ContractChangeRequestStatus =
  | 'pending-counterparty'
  | 'applied'
  | 'rejected'
  | 'cancelled'
  | 'expired'

export type ContractChangeRequestRole = 'tenant' | 'landlord'

export interface ContractChangeRequestChange {
  field: string
  before: unknown
  after: unknown
}

export interface ContractChangeRequest {
  _id: string
  contractId: string
  sequence: number
  status: ContractChangeRequestStatus
  requestedBy: string
  requestedRole: ContractChangeRequestRole
  changes: ContractChangeRequestChange[]
  reason: string
  baseRevision: number
  decidedBy?: string | null
  decidedAt?: string | null
  decisionReason?: string | null
  expiresAt: string
  createdAt: string
}

export interface ContractChangeRequestList {
  commercialRevision: number
  locked: boolean
  items: ContractChangeRequest[]
}

export interface CreateContractChangeRequestInput {
  changes: Array<{ field: string; after: unknown }>
  reason: string
  expectedRevision: number
  idempotencyKey?: string
}

const basePath = (contractId: string): string =>
  `/contracts/${contractId}/change-requests`

export function getContractChangeRequests(
  contractId: string
): Promise<ContractChangeRequestList> {
  return apiClient.get<ContractChangeRequestList>(basePath(contractId))
}

export function createContractChangeRequest(
  contractId: string,
  input: CreateContractChangeRequestInput
): Promise<ContractChangeRequest> {
  return apiClient.post<ContractChangeRequest>(basePath(contractId), input)
}

export function acceptContractChangeRequest(
  contractId: string,
  requestId: string
): Promise<ContractChangeRequest> {
  return apiClient.post<ContractChangeRequest>(
    `${basePath(contractId)}/${requestId}/accept`,
    {}
  )
}

export function rejectContractChangeRequest(
  contractId: string,
  requestId: string,
  reason: string
): Promise<ContractChangeRequest> {
  return apiClient.post<ContractChangeRequest>(
    `${basePath(contractId)}/${requestId}/reject`,
    { reason }
  )
}

export function cancelContractChangeRequest(
  contractId: string,
  requestId: string,
  reason: string
): Promise<ContractChangeRequest> {
  return apiClient.post<ContractChangeRequest>(
    `${basePath(contractId)}/${requestId}/cancel`,
    { reason }
  )
}
