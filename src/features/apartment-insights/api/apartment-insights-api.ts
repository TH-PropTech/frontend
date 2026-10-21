import { apiClient } from '@/shared/api'

export interface TrustItem {
  key: 'landlord-kyc' | 'ownership' | 'listing-verified' | 'ledger' | 'record'
  label: string
  ok: boolean
  points: number
  maxPoints: number
}

export interface PriceTrendSeries {
  /** `YYYY-MM`, cũ → mới. */
  months: string[]
  apartment: Array<number | null>
  project: Array<number | null> | null
  district: Array<number | null> | null
  projectName: string | null
  districtName: string | null
  projectSampleCount: number
  districtSampleCount: number
}

export interface ApartmentInsights {
  priceTrend: PriceTrendSeries
  trust: { score: number; items: TrustItem[] }
}

export async function getApartmentInsights(
  apartmentId: string
): Promise<ApartmentInsights> {
  return apiClient.get<ApartmentInsights>(
    `/apartments/${encodeURIComponent(apartmentId)}/insights`
  )
}
