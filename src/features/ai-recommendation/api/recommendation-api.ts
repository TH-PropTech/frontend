import { apiClient } from '@/shared/api'
import type { SurveyState, RecommendationResult } from '../model/types'

export const recommendationApi = {
  getRecommendations: async (
    survey: SurveyState
  ): Promise<RecommendationResult[]> => {
    return apiClient.post<RecommendationResult[]>(
      '/recommendations/recommend',
      survey
    )
  },

  sendFeedback: async (feedback: {
    building_id: string | number
    age: number
    income: number
    preferred_district: string
    rooms: number
    has_gym: boolean
    has_parking: boolean
    feedback_type: 'like' | 'dislike'
  }): Promise<{ status: string; message: string }> => {
    return apiClient.post<{ status: string; message: string }>(
      '/recommendations/feedback',
      feedback
    )
  },
}
