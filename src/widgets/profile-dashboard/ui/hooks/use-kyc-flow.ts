'use client'

import * as React from 'react'
import { toast } from 'sonner'
import { env } from '@/shared/config/env'
import { KYC_MAINTENANCE_MESSAGE } from '@/shared/config/kyc-maintenance'
import { UseProfileReturn } from '../../model/use-profile'
import { extractKycBack, extractKycFront, submitKyc } from '../../api/kyc-api'
import { attachMediaStream, base64ToBlob } from '../../lib/kyc-media'
import {
  attemptOcr,
  describeOcrIssues,
  type OcrIssue,
} from '../../lib/kyc-ocr-issues'
import { KYC_NATIONALITY } from '../../lib/kyc-nationality'
import { useKycSelfie } from './use-kyc-selfie'

export interface Recommendation {
  id: number
  name: string
  district: string
  rent_price: number
  rooms: number
  has_gym: boolean
  has_parking: boolean
  match_score: number
  confidence: string
  contributions: {
    location: number
    finance: number
    amenities: number
    demographics: number
  }
  reasons: string[]
}

export function useKycFlow(profile: UseProfileReturn) {
  const { setShowKycModal, kycForm, setKycForm, refreshKycStatus } = profile

  const [currentStep, setCurrentStep] = React.useState<1 | 2 | 3>(1)
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [ocrIssues, setOcrIssues] = React.useState<OcrIssue[]>([])
  const kycDemoMaintenanceMode = env.kycDemoMaintenanceMode

  // Step 1 Refs & Previews
  const fileInputRef1 = React.useRef<HTMLInputElement>(null)
  const fileInputRef2 = React.useRef<HTMLInputElement>(null)
  const videoRef1 = React.useRef<HTMLVideoElement>(null)
  const videoRef2 = React.useRef<HTMLVideoElement>(null)
  const canvasRef1 = React.useRef<HTMLCanvasElement>(null)
  const canvasRef2 = React.useRef<HTMLCanvasElement>(null)

  const [frontPreview, setFrontPreview] = React.useState('')
  const [backPreview, setBackPreview] = React.useState('')
  const [isWebcamActive1, setIsWebcamActive1] = React.useState(false)
  const [isWebcamActive2, setIsWebcamActive2] = React.useState(false)
  const [stream1, setStream1] = React.useState<MediaStream | null>(null)
  const [stream2, setStream2] = React.useState<MediaStream | null>(null)

  const selfie = useKycSelfie({
    frontPreview,
    maintenanceMode: kycDemoMaintenanceMode,
    onVerified: () => setCurrentStep(3),
  })

  React.useEffect(() => {
    attachMediaStream(videoRef1.current, stream1)
  }, [stream1])

  React.useEffect(() => {
    attachMediaStream(videoRef2.current, stream2)
  }, [stream2])

  // Recommendations
  const [showResults, setShowResults] = React.useState(false)
  const [preferredDistrict, setPreferredDistrict] = React.useState('Bình Thạnh')
  const [income, setIncome] = React.useState(25000000)
  const [rooms, setRooms] = React.useState(2)
  const [hasGym, setHasGym] = React.useState(true)
  const [hasParking, setHasParking] = React.useState(true)
  const [recommendations, setRecommendations] = React.useState<
    Recommendation[]
  >([])
  const [feedbackGiven, setFeedbackGiven] = React.useState<
    Record<number, 'like' | 'dislike'>
  >({})

  // Cleanup helper
  const stopStream = (stream: MediaStream | null) => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
    }
  }

  // Webcam Handlers
  const startWebcam = async (card: 1 | 2) => {
    if (kycDemoMaintenanceMode) {
      toast.error(KYC_MAINTENANCE_MESSAGE)
      return
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: 640, height: 480 },
      })
      if (card === 1) {
        setStream1(mediaStream)
        setIsWebcamActive1(true)
        if (videoRef1.current) videoRef1.current.srcObject = mediaStream
      } else {
        setStream2(mediaStream)
        setIsWebcamActive2(true)
        if (videoRef2.current) videoRef2.current.srcObject = mediaStream
      }
    } catch {
      toast.error('Không thể truy cập camera. Vui lòng cấp quyền.')
    }
  }

  const takePicture = (card: 1 | 2) => {
    const video = card === 1 ? videoRef1.current : videoRef2.current
    const canvas = card === 1 ? canvasRef1.current : canvasRef2.current
    const stream = card === 1 ? stream1 : stream2

    if (video && canvas) {
      const ctx = canvas.getContext('2d')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)
      const dataUrl = canvas.toDataURL('image/jpeg')

      if (card === 1) {
        setFrontPreview(dataUrl)
        setIsWebcamActive1(false)
        stopStream(stream)
        setStream1(null)
      } else {
        setBackPreview(dataUrl)
        setIsWebcamActive2(false)
        stopStream(stream)
        setStream2(null)
      }
    }
  }

  // Upload fallback
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 1 | 2
  ) => {
    if (kycDemoMaintenanceMode) {
      toast.error(KYC_MAINTENANCE_MESSAGE)
      return
    }

    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const resultStr = reader.result as string
        if (type === 1) setFrontPreview(resultStr)
        else setBackPreview(resultStr)
      }
      reader.readAsDataURL(file)
    }
  }

  // Auto-detect Preferred District based on address
  const detectDistrict = (addressStr: string) => {
    const addr = addressStr.toLowerCase()
    if (addr.includes('bình thạnh')) setPreferredDistrict('Bình Thạnh')
    else if (addr.includes('quận 1') || addr.includes('q.1'))
      setPreferredDistrict('Quận 1')
    else if (
      addr.includes('quận 2') ||
      addr.includes('q.2') ||
      addr.includes('thủ đức')
    )
      setPreferredDistrict('Quận 2')
    else if (addr.includes('quận 7') || addr.includes('q.7'))
      setPreferredDistrict('Quận 7')
  }

  // API Call: Step 1 OCR
  const handleExtractOcr = async () => {
    if (kycDemoMaintenanceMode) {
      toast.error(KYC_MAINTENANCE_MESSAGE)
      return
    }

    if (!frontPreview || !backPreview) {
      toast.error('Vui lòng cung cấp đủ ảnh mặt trước và mặt sau CCCD!')
      return
    }

    setIsProcessing(true)
    try {
      const frontBlob = base64ToBlob(frontPreview)
      const backBlob = base64ToBlob(backPreview)
      // Sequential on purpose: the eKYC service handles one image at a time.
      const frontAttempt = await attemptOcr(() => extractKycFront(frontBlob))
      const backAttempt = await attemptOcr(() => extractKycBack(backBlob))
      const front = frontAttempt.value
      const back = backAttempt.value
      const extractedAddress = front?.address ?? back?.data?.address ?? ''

      setKycForm({
        fullName: front?.fullName ?? '',
        cccdNumber: front?.idNumber ?? '',
        dob: front?.dob ?? '',
        address: extractedAddress,
        gender: front?.gender ?? '',
        nationality: KYC_NATIONALITY,
        placeOfOrigin: front?.birthplace ?? back?.data?.placeOfBirth ?? '',
        issueDate: back?.data?.issueDate ?? '',
        placeOfIssue: '',
      })

      detectDistrict(extractedAddress)
      const issues = describeOcrIssues(frontAttempt, backAttempt)
      if (issues.length > 0) {
        // Let the user pick: retake the flagged side or fix the fields by hand.
        setOcrIssues(issues)
        return
      }
      toast.success('Trích xuất thông tin OCR thành công!')
      setCurrentStep(2)
    } finally {
      setIsProcessing(false)
    }
  }

  const dismissOcrIssues = () => setOcrIssues([])

  const retakeFlaggedCards = () => {
    if (ocrIssues.some(issue => issue.side === 'front')) setFrontPreview('')
    if (ocrIssues.some(issue => issue.side === 'back')) setBackPreview('')
    setOcrIssues([])
  }

  const continueWithManualEdit = () => {
    setOcrIssues([])
    setCurrentStep(2)
  }

  // API Call: Step 2 Submit
  const handleConfirmAndSubmitKyc = async () => {
    if (kycDemoMaintenanceMode) {
      toast.error(KYC_MAINTENANCE_MESSAGE)
      return
    }

    if (!frontPreview || !backPreview) {
      toast.error('Hồ sơ chưa đủ ảnh CCCD')
      return
    }
    if (!selfie.selfiePreview || !selfie.isFaceVerified) {
      toast.error('Cần xác thực khuôn mặt trước khi nộp hồ sơ')
      setCurrentStep(2)
      return
    }
    setIsProcessing(true)
    try {
      await submitKyc({
        idCardNumber: kycForm.cccdNumber,
        fullName: kycForm.fullName,
        dateOfBirth: kycForm.dob,
        gender: kycForm.gender,
        nationality: kycForm.nationality,
        placeOfOrigin: kycForm.placeOfOrigin,
        placeOfResidence: kycForm.address,
        issueDate: kycForm.issueDate,
        placeOfIssue: kycForm.placeOfIssue,
        frontCard: base64ToBlob(frontPreview),
        backCard: base64ToBlob(backPreview),
        selfie: base64ToBlob(selfie.selfiePreview),
      })

      await refreshKycStatus()
      toast.success('Hồ sơ KYC đã được gửi và đang chờ nhân viên duyệt')
      await handleVerifyAndRecommend()
    } catch (error) {
      toast.error(
        'Nộp hồ sơ thất bại: ' +
          (error instanceof Error ? error.message : String(error))
      )
    } finally {
      setIsProcessing(false)
    }
  }

  const handleVerifyAndRecommend = async () => {
    let age = 30
    if (kycForm.dob) {
      const parts = kycForm.dob.split('/')
      if (parts.length === 3) {
        const birthYear = parseInt(parts[2] || '')
        if (!isNaN(birthYear)) age = 2026 - birthYear
      }
    }

    try {
      const response = await fetch('http://localhost:5001/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age,
          income,
          preferred_district: preferredDistrict,
          rooms,
          has_gym: hasGym,
          has_parking: hasParking,
        }),
      })
      const result = await response.json()
      if (result.success && result.data) setRecommendations(result.data)
      else throw new Error('API recommend error')
    } catch (e) {
      console.error('Recommend API error:', e)
      setRecommendations([])
    } finally {
      setShowResults(true)
    }
  }

  const handleFeedback = (apartmentId: number, type: 'like' | 'dislike') => {
    setFeedbackGiven(prev => ({ ...prev, [apartmentId]: type }))
    toast.success(
      type === 'like'
        ? 'Đã lưu phản hồi học máy Naïve Bayes!'
        : 'Đã ghi nhận phản hồi!'
    )
  }

  const handleCloseAll = () => {
    setShowKycModal(false)
    setTimeout(() => {
      setShowResults(false)
      setFeedbackGiven({})
    }, 300)
  }

  return {
    currentStep,
    setCurrentStep,
    isProcessing,
    kycDemoMaintenanceMode,
    fileInputRef1,
    fileInputRef2,
    videoRef1,
    videoRef2,
    canvasRef1,
    canvasRef2,
    frontPreview,
    backPreview,
    isWebcamActive1,
    isWebcamActive2,
    showResults,
    preferredDistrict,
    setPreferredDistrict,
    income,
    setIncome,
    rooms,
    setRooms,
    hasGym,
    setHasGym,
    hasParking,
    setHasParking,
    recommendations,
    feedbackGiven,
    startWebcam,
    takePicture,
    handleFileChange,
    handleExtractOcr,
    handleConfirmAndSubmitKyc,
    handleFeedback,
    handleCloseAll,
    selfie,
    ocrIssues,
    dismissOcrIssues,
    retakeFlaggedCards,
    continueWithManualEdit,
  }
}
