import { beforeEach, describe, expect, it, vi } from 'vitest'

import { apiClient } from '@/shared/api/api-client'
import {
  extractKycCards,
  extractKycBack,
  extractKycFront,
  getMyKyc,
  submitKyc,
  checkKycPose,
  verifyKycFace,
} from './kyc-api'

vi.mock('@/shared/api/api-client', () => ({
  apiClient: { get: vi.fn(), post: vi.fn() },
}))

describe('KYC API', () => {
  beforeEach(() => vi.clearAllMocks())

  it('loads the authenticated owner status through the shared client', async () => {
    vi.mocked(apiClient.get).mockResolvedValue(null)
    await expect(getMyKyc()).resolves.toBeNull()
    expect(apiClient.get).toHaveBeenCalledWith('/kyc/me')
  })

  it('uses the exact multipart field names required by eKYC', async () => {
    vi.mocked(apiClient.post).mockResolvedValue({})
    const image = new Blob(['image'], { type: 'image/jpeg' })

    await extractKycFront(image)
    await extractKycBack(image)

    expect(apiClient.post).toHaveBeenNthCalledWith(
      1,
      '/kyc/ocr-front',
      expect.any(FormData)
    )
    expect(apiClient.post).toHaveBeenNthCalledWith(
      2,
      '/kyc/ocr-back',
      expect.any(FormData)
    )
  })

  it('runs both card OCR requests with the required multipart fields', async () => {
    vi.mocked(apiClient.post)
      .mockResolvedValueOnce({ idNumber: '079123456789' })
      .mockResolvedValueOnce({ success: true })
    const image = new Blob(['image'], { type: 'image/jpeg' })

    await expect(extractKycCards(image, image)).resolves.toEqual([
      { idNumber: '079123456789' },
      { success: true },
    ])

    expect(apiClient.post).toHaveBeenNthCalledWith(
      1,
      '/kyc/ocr-front',
      expect.any(FormData)
    )
    expect(apiClient.post).toHaveBeenNthCalledWith(
      2,
      '/kyc/ocr-back',
      expect.any(FormData)
    )
  })

  it('submits private media as multipart instead of base64 JSON fields', async () => {
    vi.mocked(apiClient.post).mockResolvedValue({ status: 'pending' })
    const image = new Blob(['image'], { type: 'image/jpeg' })

    await submitKyc({
      idCardNumber: '079123456789',
      fullName: 'Nguyen Van A',
      dateOfBirth: '01/01/2000',
      gender: 'Nam',
      nationality: 'Viet Nam',
      placeOfOrigin: 'Hue',
      placeOfResidence: 'TP HCM',
      issueDate: '01/01/2020',
      placeOfIssue: '',
      frontCard: image,
      backCard: image,
      selfie: image,
    })

    const body = vi.mocked(apiClient.post).mock.calls[0]?.[1] as FormData
    expect(body.get('frontCard')).toBeInstanceOf(Blob)
    expect(body.get('backCard')).toBeInstanceOf(Blob)
    expect(body.get('selfie')).toBeInstanceOf(Blob)
    expect(body.get('faceMatchResult')).toBeNull()
    expect(body.get('ocrMatchRate')).toBeNull()
  })

  it('sends the selfie and front card to the face-verify precheck', async () => {
    const face = {
      liveness: true,
      spoofScore: 0.1,
      match: true,
      distance: 0.4,
      threshold: 0.85,
    }
    vi.mocked(apiClient.post).mockResolvedValue(face)
    const image = new Blob(['image'], { type: 'image/jpeg' })

    await expect(verifyKycFace(image, image)).resolves.toEqual(face)

    expect(apiClient.post).toHaveBeenCalledWith(
      '/kyc/face-verify',
      expect.any(FormData)
    )
    const body = vi.mocked(apiClient.post).mock.calls[0]?.[1] as FormData
    expect(body.get('selfie')).toBeInstanceOf(Blob)
    expect(body.get('frontID')).toBeInstanceOf(Blob)
  })

  it('sends the frame and expected direction to face-pose', async () => {
    vi.mocked(apiClient.post).mockResolvedValue({
      faceFound: true,
      pose: 'left',
      matches: true,
    })
    const image = new Blob(['image'], { type: 'image/jpeg' })

    await expect(checkKycPose(image, 'left')).resolves.toMatchObject({
      matches: true,
    })

    expect(apiClient.post).toHaveBeenCalledWith(
      '/kyc/face-pose',
      expect.any(FormData)
    )
    const body = vi.mocked(apiClient.post).mock.calls[0]?.[1] as FormData
    expect(body.get('image')).toBeInstanceOf(Blob)
    expect(body.get('expected')).toBe('left')
  })
})
