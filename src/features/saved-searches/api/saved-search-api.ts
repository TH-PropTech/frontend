import { apiClient } from '@/shared/api'

export interface SavedSearchFilters {
  city?: string
  district?: string
  ward?: string
  minPrice?: number
  maxPrice?: number
  minArea?: number
  maxArea?: number
  bedrooms?: number
  bathrooms?: number
  amenities?: string[]
  furniture?: string
  moveInTime?: string
  petFriendly?: boolean
  category?: string
}

export interface SavedSearchItem {
  _id: string
  userId: string
  name: string
  filters: SavedSearchFilters
  alertEnabled: boolean
  alertFrequency: 'instant' | 'daily' | 'weekly'
  matchCount: number
  createdAt: string
  updatedAt: string
}

export interface SearchAlertItem {
  _id: string
  savedSearchId: string
  userId: string
  apartmentId: string
  apartmentTitle: string
  triggerType:
    | 'new_listing'
    | 'price_change'
    | 'status_change'
    | 'expiring_soon'
  matchReason: string
  previousValue?: string
  newValue?: string
  isRead: boolean
  createdAt: string
}

export interface CreateSavedSearchPayload {
  name: string
  filters: SavedSearchFilters
  alertEnabled?: boolean
  alertFrequency?: 'instant' | 'daily' | 'weekly'
}

export async function createSavedSearch(
  payload: CreateSavedSearchPayload
): Promise<SavedSearchItem> {
  return apiClient.post<SavedSearchItem>('/saved-searches', payload)
}

export async function getSavedSearches(): Promise<{
  items: SavedSearchItem[]
  total: number
}> {
  return apiClient.get<{ items: SavedSearchItem[]; total: number }>(
    '/saved-searches'
  )
}

export async function deleteSavedSearch(id: string): Promise<void> {
  return apiClient.delete(`/saved-searches/${id}`)
}

export async function toggleSearchAlert(
  id: string,
  enabled: boolean
): Promise<SavedSearchItem> {
  return apiClient.patch<SavedSearchItem>(
    `/saved-searches/${id}/toggle-alert`,
    {
      enabled,
    }
  )
}

export async function getSearchAlerts(isRead?: boolean): Promise<{
  items: SearchAlertItem[]
  total: number
}> {
  const query = isRead !== undefined ? `?isRead=${isRead}` : ''
  return apiClient.get<{ items: SearchAlertItem[]; total: number }>(
    `/saved-searches/alerts${query}`
  )
}

export async function markAlertRead(id: string): Promise<SearchAlertItem> {
  return apiClient.patch<SearchAlertItem>(
    `/saved-searches/alerts/${id}/read`,
    {}
  )
}

export async function markAllAlertsRead(): Promise<{ success: boolean }> {
  return apiClient.patch<{ success: boolean }>(
    '/saved-searches/alerts/read-all',
    {}
  )
}
