import { apiClient } from '@/shared/api'
export interface ScoreBreakdown {
  category: string
  label: string
  score: number
  maxScore: number
}
export interface ChecklistItem {
  id: string
  label: string
  priority: 'high' | 'medium' | 'low'
  completed: boolean
  category: string
}
export interface QualityScoreResult {
  score: number
  maxScore: 100
  grade: 'excellent' | 'good' | 'fair' | 'poor'
  breakdown: ScoreBreakdown[]
  checklist: ChecklistItem[]
}
export async function getListingQualityScore(
  apartmentId: string
): Promise<QualityScoreResult> {
  return apiClient.get<QualityScoreResult>(`/apartments/${apartmentId}/quality`)
}
