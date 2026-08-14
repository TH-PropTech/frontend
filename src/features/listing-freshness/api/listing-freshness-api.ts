import { apiClient } from '@/shared/api'

export type FreshnessStatus = 'fresh' | 'needs_confirmation' | 'stale'
export type ListingReviewStatus = 'pending' | 'confirmed' | 'dismissed'
export type ListingReviewType =
  | 'stale'
  | 'duplicate_photo'
  | 'duplicate_location'
  | 'duplicate_phone'
  | 'similar_content'

export interface ListingFreshness {
  apartmentId: string
  status: FreshnessStatus
  daysSinceUpdate: number
  needsConfirmation: boolean
  lastUpdatedAt: string
}

export interface ListingReviewCase {
  _id: string
  apartmentId: string
  relatedApartmentId: string | null
  type: ListingReviewType
  confidence: number
  evidence: string
  status: ListingReviewStatus
  createdAt: string
  updatedAt: string
}

export interface ListingReviewQueueResult {
  items: ListingReviewCase[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export async function getListingFreshness(
  listingId: string
): Promise<ListingFreshness> {
  return apiClient.get<ListingFreshness>(`/listing-freshness/${listingId}`)
}

export async function confirmListingFreshness(
  listingId: string
): Promise<ListingFreshness> {
  return apiClient.patch<ListingFreshness>(
    `/listing-freshness/${listingId}/confirm`,
    {}
  )
}

export async function getListingReviewQueue(query: {
  status?: ListingReviewStatus
  type?: ListingReviewType
  page?: number
  limit?: number
}): Promise<ListingReviewQueueResult> {
  const search = new URLSearchParams()
  if (query.status) search.set('status', query.status)
  if (query.type) search.set('type', query.type)
  search.set('page', String(query.page ?? 1))
  search.set('limit', String(query.limit ?? 20))
  return apiClient.get<ListingReviewQueueResult>(
    `/listing-freshness/queue?${search.toString()}`
  )
}

export async function reviewListingCase(
  caseId: string,
  status: Exclude<ListingReviewStatus, 'pending'>
): Promise<ListingReviewCase> {
  return apiClient.patch<ListingReviewCase>(
    `/listing-freshness/cases/${caseId}`,
    { status }
  )
}
