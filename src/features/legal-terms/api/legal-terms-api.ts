import { apiClient, readApiErrorCode } from '@/shared/api'

export interface LegalTermsSection {
  id: string
  heading: string
  body: string
  order: number
  /** `key` của các Nguồn pháp lý làm căn cứ; backend kiểm tồn tại lúc lưu. */
  sourceKeys?: string[]
}

export interface PublicLegalTermsResponse {
  key: string
  version: number
  title: string
  summary: string
  sections: LegalTermsSection[]
  contentHash: string
  publishedAt: string | null
  /** null/absent = có hiệu lực ngay khi công bố. */
  effectiveFrom?: string | null
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

export type TermsReviewStatus = 'editing' | 'in_review' | 'approved'

export interface AdminLegalTermsDraft {
  key: string
  title: string
  summary: string
  sections: LegalTermsSection[]
  draftRevision: number
  updatedBy?: string
  updatedAt: string
  reviewStatus?: TermsReviewStatus
  submittedBy?: string
  submittedAt?: string
  reviewedBy?: string
  reviewedAt?: string
  reviewNote?: string
}

export interface AdminLegalTermsStateResponse {
  published: PublicLegalTermsResponse | null
  scheduled?: PublicLegalTermsResponse | null
  draft: AdminLegalTermsDraft | null
}

export interface TermsReviewResponse {
  success: boolean
  draftRevision: number
  reviewStatus: TermsReviewStatus
}

export interface SaveDraftInput {
  title: string
  summary: string
  sections: LegalTermsSection[]
  expectedRevision: number
}

export interface PublishTermsInput {
  expectedRevision: number
  /** ISO; bỏ trống = có hiệu lực ngay. */
  effectiveFrom?: string
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

const ADMIN_BASE = '/legal-terms/admin/rental'

export async function submitTermsForReview(
  expectedRevision: number
): Promise<TermsReviewResponse> {
  return apiClient.post<TermsReviewResponse>(`${ADMIN_BASE}/submit-review`, {
    expectedRevision,
  })
}

export async function approveTerms(
  expectedRevision: number
): Promise<TermsReviewResponse> {
  return apiClient.post<TermsReviewResponse>(`${ADMIN_BASE}/approve`, {
    expectedRevision,
  })
}

export async function requestTermsChanges(
  expectedRevision: number,
  note: string
): Promise<TermsReviewResponse> {
  return apiClient.post<TermsReviewResponse>(`${ADMIN_BASE}/request-changes`, {
    expectedRevision,
    note,
  })
}

const TERMS_ERROR_MESSAGES: Record<string, string> = {
  TERMS_DRAFT_STALE: 'Bản nháp đã được người khác thay đổi, hãy tải lại.',
  TERMS_INVALID_REVIEW_STATE:
    'Trạng thái duyệt không còn phù hợp, hãy tải lại.',
  TERMS_SELF_APPROVAL_FORBIDDEN:
    'Người soạn bản nháp không thể tự duyệt. Hãy nhờ quản trị viên khác duyệt.',
  TERMS_NOT_APPROVED: 'Bản nháp chưa được duyệt.',
  TERMS_EFFECTIVE_FROM_INVALID:
    'Ngày có hiệu lực không hợp lệ (phải từ bây giờ đến tối đa 1 năm).',
  UNKNOWN_LEGAL_SOURCE_KEYS:
    'Có điều khoản đang gắn Nguồn pháp lý không còn tồn tại. Hãy mở lại mục chọn nguồn và xác nhận lại.',
}

/** Mã lỗi nghiệp vụ nằm ở `details.code` (readApiErrorCode) hoặc trong message. */
export function readTermsErrorCode(err: unknown): string | null {
  const code = readApiErrorCode(err)
  if (code && code in TERMS_ERROR_MESSAGES) return code
  const message = err instanceof Error ? err.message : ''
  return (
    Object.keys(TERMS_ERROR_MESSAGES).find(k => message.includes(k)) ?? null
  )
}

export function describeTermsError(err: unknown, fallback = ''): string {
  const code = readTermsErrorCode(err)
  if (code) return TERMS_ERROR_MESSAGES[code] ?? fallback
  return (err instanceof Error ? err.message : '') || fallback
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
