import { apiClient } from '@/shared/api'

export interface RiskLayerItem {
  _id: string
  district: string
  layerType: string
  severity: number
  source: string
  timestamp: string
  confidence: number
  geoJson: Record<string, unknown> | null
}

export interface RiskScoreResult {
  status: 'available' | 'insufficient_data'
  score: number | null
  district: string
  layers: RiskLayerItem[]
}

export async function getLocationRiskScore(
  apartmentId: string,
  weights?: Record<string, number>
): Promise<RiskScoreResult> {
  return apiClient.post<RiskScoreResult>('/location-risk/score', {
    apartmentId,
    ...(weights ? { weights } : {}),
  })
}
