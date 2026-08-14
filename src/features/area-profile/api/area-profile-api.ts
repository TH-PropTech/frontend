import { ApiClientError, apiClient } from '@/shared/api'
export type FacilityType =
  | 'school'
  | 'hospital'
  | 'market'
  | 'bus_stop'
  | 'park'
  | 'gym'
  | 'bank'
  | 'police'
  | 'post_office'
  | 'supermarket'
export interface NearbyFacility {
  type: FacilityType
  name: string
  distanceMeters: number
  travelTimeMinutes?: number
  travelMode?: 'walk' | 'drive'
}
export interface AreaProfileItem {
  _id: string
  district: string
  city: string
  ward?: string
  overview: string
  facilities: NearbyFacility[]
  source: string
  disclaimer: string
  lastSurveyedAt: string
}
export async function getAreaProfileForApartment(
  apartmentId: string
): Promise<AreaProfileItem | null> {
  try {
    return await apiClient.get<AreaProfileItem>(
      `/area-profiles/apartment/${apartmentId}`
    )
  } catch (error) {
    if (error instanceof ApiClientError && error.status === 404) return null
    throw error
  }
}
