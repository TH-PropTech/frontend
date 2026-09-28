import { apiClient } from '@/shared/api'
import type { FeeSnapshot } from '@/features/rental-application/api/rental-application-api'

export async function getPlatformFeeQuote(input: {
  durationMonths: number
  monthlyRent: number
}): Promise<FeeSnapshot | null> {
  const query = new URLSearchParams({
    durationMonths: String(input.durationMonths),
    monthlyRent: String(input.monthlyRent),
  })
  return apiClient.get<FeeSnapshot | null>(`/platform-fees/quote?${query}`)
}
