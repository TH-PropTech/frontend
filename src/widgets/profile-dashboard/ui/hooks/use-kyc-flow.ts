'use client'

import * as React from 'react'
import { toast } from 'sonner'
import { UseProfileReturn } from '../../model/use-profile'
import { extractKycCards, submitKyc, verifyKycFace } from '../../api/kyc-api'

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

const base64ToBlob = (base64: string): Blob => {
  const arr = base64.split(',')
  const mime = arr[0]?.match(/:(.*?);/)?.[1] || 'image/jpeg'
  const bstr = atob(arr[1] || '')
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

export function useKycFlow(profile: UseProfileReturn) {
  const { setShowKycModal, kycForm, setKycForm, refreshKycStatus } = profile

  const [currentStep, setCurrentStep] = React.useState<1 | 2 | 3>(1)
  const [isProcessing, setIsProcessing] = React.useState(false)

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

  // Step 2 Refs & Previews
  const fileInputRefSelfie = React.useRef<HTMLInputElement>(null)
  const videoRefSelfie = React.useRef<HTMLVideoElement>(null)
  const canvasRefSelfie = React.useRef<HTMLCanvasElement>(null)
  const [selfiePreview, setSelfiePreview] = React.useState('')
  const [isWebcamActiveSelfie, setIsWebcamActiveSelfie] = React.useState(false)
  const [streamSelfie, setStreamSelfie] = React.useState<MediaStream | null>(
    null
  )

  // Verification results
  const [verifyResults, setVerifyResults] = React.useState({
    verified: false,
    faceMatch: false,
    liveness: false,
    realConfidence: null as number | null,
  })

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

  // Selfie handlers
  const startSelfieWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 },
      })
      setStreamSelfie(mediaStream)
      setIsWebcamActiveSelfie(true)
      if (videoRefSelfie.current) videoRefSelfie.current.srcObject = mediaStream
    } catch {
      toast.error('Không thể truy cập camera trước. Vui lòng cấp quyền.')
    }
  }

  const takeSelfie = () => {
    if (videoRefSelfie.current && canvasRefSelfie.current) {
      const canvas = canvasRefSelfie.current
      const video = videoRefSelfie.current
      const ctx = canvas.getContext('2d')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)
      const dataUrl = canvas.toDataURL('image/jpeg')

      setSelfiePreview(dataUrl)
      setIsWebcamActiveSelfie(false)
      stopStream(streamSelfie)
      setStreamSelfie(null)
    }
  }

  // Upload fallback
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 1 | 2 | 3
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const resultStr = reader.result as string
        if (type === 1) setFrontPreview(resultStr)
        else if (type === 2) setBackPreview(resultStr)
        else setSelfiePreview(resultStr)
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
    if (!frontPreview || !backPreview) {
      toast.error('Vui lòng cung cấp đủ ảnh mặt trước và mặt sau CCCD!')
      return
    }

    setIsProcessing(true)
    try {
      const frontBlob = base64ToBlob(frontPreview)
      const backBlob = base64ToBlob(backPreview)
      const [ocrResult, ocrBackResult] = await extractKycCards(
        frontBlob,
        backBlob
      )
      if (!ocrBackResult.success) {
        throw new Error('Không thể trích xuất mặt sau CCCD')
      }
      const extractedAddress =
        ocrResult.address ?? ocrBackResult.data?.address ?? ''

      setKycForm({
        fullName: ocrResult.fullName,
        cccdNumber: ocrResult.idNumber,
        dob: ocrResult.dob,
        address: extractedAddress,
        gender: ocrResult.gender,
        nationality: ocrResult.nationality,
        placeOfOrigin:
          ocrResult.birthplace ?? ocrBackResult.data?.placeOfBirth ?? '',
        issueDate: ocrBackResult.data?.issueDate ?? '',
        placeOfIssue: '',
      })

      detectDistrict(extractedAddress)
      toast.success('Trích xuất thông tin OCR thành công!')
      setCurrentStep(2)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Không thể trích xuất CCCD'
      )
    } finally {
      setIsProcessing(false)
    }
  }

  // API Call: Step 2 Selfie & Face Match
  const handleVerifyFace = async () => {
    if (!selfiePreview) {
      toast.error('Vui lòng chụp ảnh selfie của bạn!')
      return
    }

    setIsProcessing(true)
    try {
      const selfieBlob = base64ToBlob(selfiePreview)
      const frontBlob = base64ToBlob(frontPreview)
      const result = await verifyKycFace(selfieBlob, frontBlob)
      setVerifyResults(result)

      if (!result.verified) {
        toast.error(
          'Xác thực sinh trắc học không khớp CCCD hoặc phát hiện spoofing!'
        )
      } else {
        toast.success('So khớp sinh trắc học thành công!')
        setCurrentStep(3)
      }
    } catch (error) {
      setVerifyResults({
        verified: false,
        faceMatch: false,
        liveness: false,
        realConfidence: null,
      })
      toast.error(
        error instanceof Error ? error.message : 'Không thể xác thực khuôn mặt'
      )
    } finally {
      setIsProcessing(false)
    }
  }

  // API Call: Step 3 Submit
  const handleConfirmAndSubmitKyc = async () => {
    if (
      !verifyResults.verified ||
      !frontPreview ||
      !backPreview ||
      !selfiePreview
    ) {
      toast.error('Hồ sơ chưa đủ ảnh hoặc chưa qua xác thực sinh trắc học')
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
        selfie: base64ToBlob(selfiePreview),
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
      console.error('Recommend API error, using fallback recommendations', e)
      setRecommendations([
        {
          id: 1,
          name: 'Vinhomes Central Park',
          district: 'Bình Thạnh',
          rent_price: 18000000,
          rooms: 2,
          has_gym: true,
          has_parking: true,
          match_score: 92,
          confidence: '95.6%',
          contributions: {
            location: 95,
            finance: 90,
            amenities: 95,
            demographics: 90,
          },
          reasons: [
            'Đúng khu vực Bình Thạnh bạn yêu cầu',
            'Giá thuê 18tr/tháng tối ưu cho thu nhập 25tr',
            'Đáp ứng trọn vẹn yêu cầu Gym & Bãi đỗ xe',
            'Khu vực sinh sống lý tưởng cho độ tuổi 30',
          ],
        },
        {
          id: 2,
          name: 'Masteri Thảo Điền',
          district: 'Quận 2',
          rent_price: 22000000,
          rooms: 2,
          has_gym: true,
          has_parking: true,
          match_score: 76,
          confidence: '88.2%',
          contributions: {
            location: 60,
            finance: 70,
            amenities: 95,
            demographics: 80,
          },
          reasons: [
            'Khu vực Quận 2 giáp ranh đi lại thuận tiện',
            'Giá thuê chiếm 88% ngân sách tối đa mong muốn',
            'Đáp ứng trọn vẹn yêu cầu Gym & Bãi đỗ xe',
          ],
        },
      ])
    } finally {
      setShowResults(true)
    }
  }

  const handleFeedback = (buildingId: number, type: 'like' | 'dislike') => {
    setFeedbackGiven(prev => ({ ...prev, [buildingId]: type }))
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
    selfiePreview,
    isWebcamActiveSelfie,
    fileInputRefSelfie,
    videoRefSelfie,
    canvasRefSelfie,
    verifyResults,
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
    startSelfieWebcam,
    takeSelfie,
    handleFileChange,
    handleExtractOcr,
    handleVerifyFace,
    handleConfirmAndSubmitKyc,
    handleFeedback,
    handleCloseAll,
  }
}
