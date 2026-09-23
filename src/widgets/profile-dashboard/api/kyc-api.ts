import { apiClient } from '@/shared/api/api-client'
import { env } from '@/shared/config/env'
import { assertKycAvailable } from '@/shared/config/kyc-maintenance'

export interface KycOcrFrontResult {
  idNumber: string
  fullName: string
  dob: string
  gender: string
  nationality: string
  birthplace?: string
  address?: string
}

export interface KycOcrBackResult {
  success: boolean
  data?: {
    address?: string
    issueDate?: string
    expiryDate?: string
    placeOfBirth?: string
  }
}

export interface KycBiometricResult {
  verified: boolean
  faceMatch: boolean
  liveness: boolean
  realConfidence: number | null
}

export interface KycSubmission {
  idCardNumber: string
  fullName: string
  dateOfBirth: string
  gender: string
  nationality: string
  placeOfOrigin: string
  placeOfResidence: string
  issueDate: string
  placeOfIssue: string
  frontCard: Blob
  backCard: Blob
  selfie: Blob
}

export interface MyKycRecord {
  id: string
  status: 'pending' | 'verified' | 'rejected'
  rejectedReason: string | null
  fullName?: string
  idCardNumber: string
  dateOfBirth?: string
  gender?: string
  nationality?: string
  placeOfOrigin?: string
  placeOfResidence?: string
  issueDate?: string
  placeOfIssue?: string
}

export function getMyKyc(): Promise<MyKycRecord | null> {
  return apiClient.get('/kyc/me')
}

export function extractKycFront(file: Blob): Promise<KycOcrFrontResult> {
  assertKycAvailable(env.kycDemoMaintenanceMode)
  const formData = new FormData()
  formData.append('frontID', file, 'front.jpg')
  return apiClient.post('/kyc/ocr-front', formData)
}

export function extractKycBack(file: Blob): Promise<KycOcrBackResult> {
  assertKycAvailable(env.kycDemoMaintenanceMode)
  const formData = new FormData()
  formData.append('backID', file, 'back.jpg')
  return apiClient.post('/kyc/ocr-back', formData)
}

export async function extractKycCards(
  front: Blob,
  back: Blob
): Promise<[KycOcrFrontResult, KycOcrBackResult]> {
  const frontResult = await extractKycFront(front)
  const backResult = await extractKycBack(back)
  return [frontResult, backResult]
}

export function verifyKycFace(
  selfie: Blob,
  frontCard: Blob
): Promise<KycBiometricResult> {
  assertKycAvailable(env.kycDemoMaintenanceMode)
  const formData = new FormData()
  formData.append('portraitImages', selfie, 'selfie.jpg')
  formData.append('frontID', frontCard, 'front.jpg')
  return apiClient.post('/kyc/verify-face', formData)
}

export function submitKyc(
  input: KycSubmission
): Promise<{ status: 'pending' }> {
  assertKycAvailable(env.kycDemoMaintenanceMode)
  const formData = new FormData()
  const { frontCard, backCard, selfie, ...fields } = input
  Object.entries(fields).forEach(([key, value]) => formData.append(key, value))
  formData.append('frontCard', frontCard, 'front.jpg')
  formData.append('backCard', backCard, 'back.jpg')
  formData.append('selfie', selfie, 'selfie.jpg')
  return apiClient.post('/kyc/submit', formData)
}
