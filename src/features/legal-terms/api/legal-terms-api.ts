import { apiClient } from '@/shared/api'

export interface LegalTermsSection {
  id: string
  heading: string
  body: string
  order: number
}

export interface PublicLegalTermsResponse {
  key: string
  version: number
  title: string
  summary: string
  sections: LegalTermsSection[]
  contentHash: string
  publishedAt: string | null
}

export interface PublicPolicyItem {
  key: string
  value: string
  description: string
  unit?: string
  legalReference?: string
}

export interface AdminPolicyItem extends PublicPolicyItem {
  status: 'active' | 'inactive'
  updatedBy?: string
  updatedAt?: string
}

export interface AdminLegalTermsStateResponse {
  published: PublicLegalTermsResponse | null
  draft: {
    key: string
    title: string
    summary: string
    sections: LegalTermsSection[]
    draftRevision: number
    updatedBy?: string
    updatedAt: string
  } | null
}

export interface SaveDraftInput {
  title: string
  summary: string
  sections: LegalTermsSection[]
  expectedRevision: number
}

export interface PublishTermsInput {
  expectedRevision: number
}

export async function getCurrentLegalTerms(): Promise<PublicLegalTermsResponse> {
  return apiClient.get<PublicLegalTermsResponse>('/legal-terms/rental/current')
}

export async function getLegalTermsVersion(
  version: number
): Promise<PublicLegalTermsResponse> {
  return apiClient.get<PublicLegalTermsResponse>(
    `/legal-terms/rental/versions/${version}`
  )
}

export async function getPublicPolicies(): Promise<PublicPolicyItem[]> {
  return apiClient.get<PublicPolicyItem[]>('/policies/public')
}

export async function getAdminLegalTermsState(): Promise<AdminLegalTermsStateResponse> {
  return apiClient.get<AdminLegalTermsStateResponse>(
    '/legal-terms/admin/rental'
  )
}

export async function saveLegalTermsDraft(
  input: SaveDraftInput
): Promise<{ success: boolean; draftRevision: number }> {
  return apiClient.put<{ success: boolean; draftRevision: number }>(
    '/legal-terms/admin/rental/draft',
    input
  )
}

export async function publishLegalTerms(
  input: PublishTermsInput
): Promise<PublicLegalTermsResponse> {
  return apiClient.post<PublicLegalTermsResponse>(
    '/legal-terms/admin/rental/publish',
    input
  )
}

export async function getAdminPolicies(): Promise<AdminPolicyItem[]> {
  return apiClient.get<AdminPolicyItem[]>('/policies/admin')
}

export async function updatePolicy(
  key: string,
  value: string
): Promise<AdminPolicyItem> {
  return apiClient.patch<AdminPolicyItem>(`/policies/${key}`, { value })
}

export async function updatePolicyStatus(
  key: string,
  status: 'active' | 'inactive'
): Promise<AdminPolicyItem> {
  return apiClient.patch<AdminPolicyItem>(`/policies/${key}/status`, { status })
}
