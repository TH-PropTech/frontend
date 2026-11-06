import { apiClient } from '@/shared/api'

export type OccupantRequestStatus =
  | 'pending-landlord'
  | 'pending-tenant'
  | 'agreed'
  | 'rejected'

export interface OccupantRequestPerson {
  fullName: string
  birthYear: number
  relationship: string
  idPhotoUrls: string[]
}

export interface OccupantRequestAuditEntry {
  at: string
  actorId: string
  actorRole: 'tenant' | 'landlord'
  action: string
  detail: string | null
}

export interface OccupantRequest {
  _id: string
  contractId: string
  occupants: OccupantRequestPerson[]
  moveInDate: string
  reason: string
  proposedSurcharge: number
  counterSurcharge: number | null
  agreedSurcharge: number | null
  status: OccupantRequestStatus
  decisionReason: string | null
  amendmentId: string | null
  auditTrail: OccupantRequestAuditEntry[]
  createdAt: string
}

export interface OccupantRequestList {
  /** Số người ở hiện tại, gồm cả người thuê. */
  currentOccupants: number
  /** Giới hạn của căn hộ; null khi tin cũ chưa đặt giới hạn. */
  maxOccupants: number | null
  openRequest: OccupantRequest | null
  requests: OccupantRequest[]
}

export interface CreateOccupantRequestInput {
  occupants: OccupantRequestPerson[]
  moveInDate: string
  reason: string
  proposedSurcharge: number
}

export type OccupantRequestDecision =
  | { action: 'approve' }
  | { action: 'reject'; reason?: string }
  | { action: 'counter'; counterSurcharge: number; reason?: string }

const base = (contractId: string): string =>
  `/contracts/${encodeURIComponent(contractId)}/occupant-requests`

export const getOccupantRequests = (
  contractId: string
): Promise<OccupantRequestList> =>
  apiClient.get<OccupantRequestList>(base(contractId))

export const createOccupantRequest = (
  contractId: string,
  input: CreateOccupantRequestInput
): Promise<OccupantRequest> =>
  apiClient.post<OccupantRequest>(base(contractId), input)

export const decideOccupantRequest = (
  contractId: string,
  requestId: string,
  decision: OccupantRequestDecision
): Promise<OccupantRequest> =>
  apiClient.post<OccupantRequest>(
    `${base(contractId)}/${encodeURIComponent(requestId)}/decision`,
    decision
  )

export const respondToOccupantCounter = (
  contractId: string,
  requestId: string,
  accept: boolean
): Promise<OccupantRequest> =>
  apiClient.post<OccupantRequest>(
    `${base(contractId)}/${encodeURIComponent(requestId)}/counter-response`,
    { accept }
  )
