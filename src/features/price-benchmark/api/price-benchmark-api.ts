import { apiClient } from '@/shared/api'

export interface PriceBenchmarkCriteria {
  district: string
  bedrooms: number
  priceMonthly: number
  area?: number
  furniture?: string
}

export interface PriceBenchmarkResult {
  median: number | null
  p25: number | null
  p75: number | null
  range: { min: number; max: number } | null
  sampleCount: number
  excludedOutliers: number
  confidence: 'low' | 'medium' | 'high' | 'insufficient'
  classification:
    | 'below_market'
    | 'fair_range'
    | 'above_market'
    | 'not_enough_data'
  calculatedAt: string
  criteria: {
    district: string
    bedrooms: number
    area: number | null
    furniture: string | null
  }
}

export async function getPriceBenchmark(
  criteria: PriceBenchmarkCriteria
): Promise<PriceBenchmarkResult> {
  const search = new URLSearchParams({
    district: criteria.district,
    bedrooms: String(criteria.bedrooms),
    priceMonthly: String(criteria.priceMonthly),
  })
  if (criteria.area !== undefined) search.set('area', String(criteria.area))
  if (criteria.furniture) search.set('furniture', criteria.furniture)
  return apiClient.get<PriceBenchmarkResult>(
    `/price-benchmark?${search.toString()}`
  )
}
