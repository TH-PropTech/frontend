import { apiClient } from '@/shared/api'

export type ConditionFindingStatus = 'detected' | 'uncertain' | 'not_detected'

export interface NormalizedBoundingBox {
  x: number
  y: number
  width: number
  height: number
}

export interface ConditionFinding {
  label: string
  status: ConditionFindingStatus
  confidence: number
  description: string
  boundingBox: NormalizedBoundingBox | null
}

export interface ConditionAnalysisItem {
  _id: string
  apartmentId: string
  imageUrl: string
  findings: ConditionFinding[]
  overallCondition: 'good' | 'attention_needed' | 'uncertain'
  checklist: string[]
  model: string
  createdAt: string
}

export async function analyzeConditionImage(
  apartmentId: string,
  image: File
): Promise<ConditionAnalysisItem> {
  const form = new FormData()
  form.append('apartmentId', apartmentId)
  form.append('image', image)
  return apiClient.post<ConditionAnalysisItem>('/condition-analyses', form)
}

export async function getMyConditionAnalyses(
  apartmentId: string
): Promise<ConditionAnalysisItem[]> {
  const query = new URLSearchParams({ apartmentId })
  return apiClient.get<ConditionAnalysisItem[]>(
    `/condition-analyses?${query.toString()}`
  )
}

export async function getConditionAnalysisImage(
  imageUrl: string
): Promise<Blob> {
  const token = window.localStorage.getItem('accessToken')
  const response = await fetch(imageUrl, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  if (!response.ok) throw new Error('Could not load private analysis image')
  return response.blob()
}
