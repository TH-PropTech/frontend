import { useState, useCallback } from 'react'
import { recommendationApi } from '../api/recommendation-api'
import type { SurveyState, RecommendationResult } from './types'

export const useRecommendation = () => {
  const [step, setStep] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<RecommendationResult[]>([])
  const [likedIds, setLikedIds] = useState<
    Record<string | number, 'like' | 'dislike'>
  >({})

  const [survey, setSurvey] = useState<SurveyState>({
    age: 25,
    income: 15000000,
    preferred_district: 'Quận 1',
    rooms: 1,
    has_gym: false,
    has_parking: false,
  })
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false)

  const updateSurvey = useCallback((fields: Partial<SurveyState>) => {
    setSurvey(prev => ({ ...prev, ...fields }))
  }, [])

  const nextStep = useCallback(() => setStep(prev => prev + 1), [])
  const prevStep = useCallback(() => setStep(prev => Math.max(1, prev - 1)), [])
  const resetSurvey = useCallback(() => {
    setStep(1)
    setResults([])
    setError(null)
    setLikedIds({})
    setHasSubmitted(false)
  }, [])

  const submitSurvey = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await recommendationApi.getRecommendations(survey)
      setResults(data)
      setHasSubmitted(true)
      setStep(4) // Go to result screen directly to avoid dependency on nextStep
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err)
      setError(
        errMsg || 'Không thể lấy gợi ý AI vào lúc này. Vui lòng thử lại sau.'
      )
    } finally {
      setIsLoading(false)
    }
  }, [survey])

  const handleFeedback = useCallback(
    async (buildingId: string | number, type: 'like' | 'dislike') => {
      // Optimistic UI update
      setLikedIds(prev => ({ ...prev, [buildingId]: type }))
      try {
        await recommendationApi.sendFeedback({
          building_id: buildingId,
          age: survey.age,
          income: survey.income,
          preferred_district: survey.preferred_district,
          rooms: survey.rooms,
          has_gym: survey.has_gym,
          has_parking: survey.has_parking,
          feedback_type: type,
        })
      } catch {
        // Revert if error (optional, or just ignore for secondary action)
        setLikedIds(prev => {
          const next = { ...prev }
          delete next[buildingId]
          return next
        })
      }
    },
    [survey]
  )

  return {
    step,
    survey,
    results,
    isLoading,
    error,
    likedIds,
    hasSubmitted,
    updateSurvey,
    nextStep,
    prevStep,
    resetSurvey,
    submitSurvey,
    handleFeedback,
  }
}
export type UseRecommendationReturn = ReturnType<typeof useRecommendation>
