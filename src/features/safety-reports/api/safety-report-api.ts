import { apiClient } from '@/shared/api'

export type SafetyReportCategory =
  | 'fake_listing'
  | 'external_payment'
  | 'wrong_info'
  | 'harassment'
  | 'spam'
  | 'danger'

export type SafetyReportTargetType = 'listing' | 'user' | 'message'
export type SafetyReportStatus =
  | 'pending'
  | 'investigating'
  | 'resolved'
  | 'dismissed'
  | 'appealed'

export interface SafetyReportItem {
  _id: string
  reporterId: string
  targetType: SafetyReportTargetType
  targetId: string
  targetTitle?: string
  category: SafetyReportCategory
  description: string
  evidenceUrls: string[]
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  status: SafetyReportStatus
  isTargetHidden: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateReportPayload {
  targetType: SafetyReportTargetType
  targetId: string
  targetTitle?: string
  category: SafetyReportCategory
  description: string
  evidenceUrls?: string[]
}

export async function createSafetyReport(
  payload: CreateReportPayload
): Promise<SafetyReportItem> {
  return apiClient.post<SafetyReportItem>('/safety-reports', payload)
}

export async function getMySafetyReports(): Promise<{
  items: SafetyReportItem[]
  total: number
}> {
  return apiClient.get<{ items: SafetyReportItem[]; total: number }>(
    '/safety-reports/my'
  )
}

export async function getModerationQueue(): Promise<{
  items: SafetyReportItem[]
  total: number
}> {
  return apiClient.get<{ items: SafetyReportItem[]; total: number }>(
    '/safety-reports/queue'
  )
}

export async function updateReportStatus(
  id: string,
  status: 'investigating' | 'resolved' | 'dismissed',
  resolutionNote?: string
): Promise<SafetyReportItem> {
  return apiClient.patch<SafetyReportItem>(`/safety-reports/${id}/status`, {
    status,
    resolutionNote,
  })
}

export async function appealReport(
  id: string,
  appealReason: string
): Promise<SafetyReportItem> {
  return apiClient.post<SafetyReportItem>(`/safety-reports/${id}/appeal`, {
    appealReason,
  })
}
