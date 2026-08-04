import { apiClient } from '@/shared/api'

export interface EstimateRange {
  type: 'official' | 'estimated'
  low: number
  mid: number
  high: number
}

export interface CalculationResult {
  monthlyRent: number
  serviceFee: number
  parkingFee: number
  internetFee: number
  electricityEstimate: EstimateRange
  waterEstimate: EstimateRange
  commuteEstimate: { distance?: number; mode?: string; monthlyFee?: number }
  oneTimeCosts: { name: string; amount: number }[]
  occupants: number
  monthlyBudget?: number
  totalEstimate: EstimateRange
  affordabilityStatus: 'affordable' | 'tight' | 'over_budget' | 'unknown'
  confidenceLabel: 'high' | 'medium' | 'low'
}

export interface CalculateLivingCostPayload {
  apartmentId?: string
  monthlyRent: number
  serviceFee?: number
  parkingFee?: number
  internetFee?: number
  commuteEstimate?: { distance?: number; mode?: string; monthlyFee?: number }
  oneTimeCosts?: { name: string; amount: number }[]
  occupants?: number
  monthlyBudget?: number
}

export interface LivingCostProfileItem extends CalculationResult {
  _id: string
  userId: string
  name: string
  apartmentId?: string
  createdAt: string
  updatedAt: string
}

export async function calculateLivingCost(
  payload: CalculateLivingCostPayload
): Promise<CalculationResult> {
  return apiClient.post<CalculationResult>('/living-cost/calculate', payload)
}

export async function saveLivingCostProfile(
  payload: CalculateLivingCostPayload & { name: string }
): Promise<LivingCostProfileItem> {
  return apiClient.post<LivingCostProfileItem>('/living-cost/profiles', payload)
}

export async function getLivingCostProfiles(): Promise<{
  items: LivingCostProfileItem[]
  total: number
}> {
  return apiClient.get<{ items: LivingCostProfileItem[]; total: number }>(
    '/living-cost/profiles'
  )
}

export async function deleteLivingCostProfile(id: string): Promise<void> {
  return apiClient.delete(`/living-cost/profiles/${id}`)
}
