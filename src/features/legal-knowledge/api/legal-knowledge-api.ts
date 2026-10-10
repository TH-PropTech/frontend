import { apiClient } from '@/shared/api'
import type {
  LegalDocDetail,
  LegalDocFilters,
  LegalDocInput,
  LegalDocItem,
  LegalDocPatch,
  LegalFetchResult,
  LegalSearchHit,
} from '../model/legal-knowledge.types'

const BASE = '/legal-knowledge/admin'

function buildListPath(filters: LegalDocFilters): string {
  const params = new URLSearchParams()
  if (filters.status) params.set('status', filters.status)
  if (filters.category) params.set('category', filters.category)
  const q = filters.q?.trim()
  if (q) params.set('q', q)
  const query = params.toString()
  return query ? `${BASE}?${query}` : BASE
}

export function listLegalDocs(
  filters: LegalDocFilters = {}
): Promise<LegalDocItem[]> {
  return apiClient.get<LegalDocItem[]>(buildListPath(filters))
}

export function getLegalDoc(id: string): Promise<LegalDocDetail> {
  return apiClient.get<LegalDocDetail>(`${BASE}/${encodeURIComponent(id)}`)
}

export function createLegalDoc(input: LegalDocInput): Promise<LegalDocDetail> {
  return apiClient.post<LegalDocDetail>(BASE, input)
}

export function updateLegalDoc(
  id: string,
  patch: LegalDocPatch
): Promise<LegalDocDetail> {
  return apiClient.patch<LegalDocDetail>(
    `${BASE}/${encodeURIComponent(id)}`,
    patch
  )
}

export function publishLegalDoc(id: string): Promise<LegalDocDetail> {
  return apiClient.post<LegalDocDetail>(
    `${BASE}/${encodeURIComponent(id)}/publish`,
    {}
  )
}

export function unpublishLegalDoc(id: string): Promise<LegalDocDetail> {
  return apiClient.post<LegalDocDetail>(
    `${BASE}/${encodeURIComponent(id)}/unpublish`,
    {}
  )
}

/** Soft delete: the backend archives the document. */
export function archiveLegalDoc(id: string): Promise<{ ok: boolean }> {
  return apiClient.delete<{ ok: boolean }>(`${BASE}/${encodeURIComponent(id)}`)
}

export function fetchLegalLink(url: string): Promise<LegalFetchResult> {
  return apiClient.post<LegalFetchResult>(`${BASE}/fetch`, { url })
}

export function searchLegalKnowledge(
  query: string,
  limit = 5
): Promise<LegalSearchHit[]> {
  return apiClient.post<LegalSearchHit[]>(`${BASE}/search`, { query, limit })
}
