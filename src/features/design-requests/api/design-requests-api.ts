import { apiClient } from '@/shared/api'
import type { AdminFloorplanDesign } from '@/features/apartment-floorplan'

export type DesignRequestKind = 'create' | 'edit'

export type DesignRequestStatus =
  | 'submitted'
  | 'needs_info'
  | 'rejected'
  | 'escalated'
  | 'in_progress'
  | 'delivered'
  | 'changes_requested'
  | 'approved'
  | 'cancelled'

export type DesignRequestEventType =
  | 'submitted'
  | 'info_requested'
  | 'info_provided'
  | 'escalated'
  | 'rejected'
  | 'started'
  | 'delivered'
  | 'feedback'
  | 'approved'
  | 'cancelled'

export interface DesignRequestEvent {
  type: DesignRequestEventType
  actorId: string
  actorRole: 'landlord' | 'staff' | 'admin'
  actorName: string | null
  note: string | null
  attachmentUrls: string[]
  revision: number
  at: string
}

export interface DesignRequestParty {
  id: string
  name: string
  email: string
}

export interface DesignRequestSummary {
  id: string
  apartmentId: string
  apartment: { id: string; title: string } | null
  landlordId: string
  landlord: DesignRequestParty | null
  kind: DesignRequestKind
  targetDesignId: string | null
  brief: string
  attachmentUrls: string[]
  status: DesignRequestStatus
  revision: number
  deliveredDesignId: string | null
  /** Người đã nhận thiết kế (tên trường cũ giữ nguyên để khỏi migrate). */
  assignedAdminId: string | null
  assignee: { id: string; name: string } | null
  createdAt: string
  updatedAt: string
}

export interface DesignRequest extends DesignRequestSummary {
  events: DesignRequestEvent[]
  deliveredDesign: AdminFloorplanDesign | null
}

export interface DesignRequestPage {
  items: DesignRequestSummary[]
  total: number
  page: number
  limit: number
}

export interface CreateDesignRequestInput {
  apartmentId: string
  kind: DesignRequestKind
  targetDesignId?: string
  brief: string
  attachmentUrls?: string[]
}

export interface DesignRequestNoteInput {
  note: string
  attachmentUrls?: string[]
}

export interface DesignRequestListFilter {
  apartmentId?: string
  statuses?: DesignRequestStatus[]
  page?: number
  limit?: number
}

const base = '/design-requests'
const path = (id: string, action?: string): string =>
  `${base}/${encodeURIComponent(id)}${action ? `/${action}` : ''}`

function toQuery(filter: DesignRequestListFilter): string {
  const params = new URLSearchParams()
  if (filter.apartmentId) params.set('apartmentId', filter.apartmentId)
  if (filter.statuses?.length) params.set('status', filter.statuses.join(','))
  if (filter.page) params.set('page', String(filter.page))
  if (filter.limit) params.set('limit', String(filter.limit))
  const qs = params.toString()
  return qs ? `?${qs}` : ''
}

/** Chủ nhà. */
export function createDesignRequest(
  input: CreateDesignRequestInput
): Promise<DesignRequestSummary> {
  return apiClient.post<DesignRequestSummary>(base, input)
}

export function listMyDesignRequests(
  filter: DesignRequestListFilter = {}
): Promise<DesignRequestPage> {
  return apiClient.get<DesignRequestPage>(`${base}/my${toQuery(filter)}`)
}

export function getDesignRequest(id: string): Promise<DesignRequest> {
  return apiClient.get<DesignRequest>(path(id))
}

export function replyDesignRequest(
  id: string,
  input: DesignRequestNoteInput
): Promise<DesignRequest> {
  return apiClient.post<DesignRequest>(path(id, 'reply'), input)
}

export function approveDesignRequest(id: string): Promise<DesignRequest> {
  return apiClient.post<DesignRequest>(path(id, 'approve'), {})
}

export function feedbackDesignRequest(
  id: string,
  input: DesignRequestNoteInput
): Promise<DesignRequest> {
  return apiClient.post<DesignRequest>(path(id, 'feedback'), input)
}

export function cancelDesignRequest(id: string): Promise<DesignRequest> {
  return apiClient.post<DesignRequest>(path(id, 'cancel'), {})
}

/** Nhân viên (admin cũng có quyền tương đương). */
export function listDesignRequestQueue(
  filter: DesignRequestListFilter = {}
): Promise<DesignRequestPage> {
  return apiClient.get<DesignRequestPage>(`${base}/queue${toQuery(filter)}`)
}

export function requestInfoDesignRequest(
  id: string,
  input: { note: string }
): Promise<DesignRequest> {
  return apiClient.post<DesignRequest>(path(id, 'request-info'), input)
}

export function rejectDesignRequest(
  id: string,
  input: { note: string }
): Promise<DesignRequest> {
  return apiClient.post<DesignRequest>(path(id, 'reject'), input)
}

export function startDesignRequest(id: string): Promise<DesignRequest> {
  return apiClient.post<DesignRequest>(path(id, 'start'), {})
}

export function deliverDesignRequest(
  id: string,
  input: { designId: string; note?: string }
): Promise<DesignRequest> {
  return apiClient.post<DesignRequest>(path(id, 'deliver'), input)
}
