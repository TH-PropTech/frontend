'use client'

import * as React from 'react'
import { toast } from 'sonner'
import { KYC_MAINTENANCE_MESSAGE } from '@/shared/config/kyc-maintenance'
import { verifyKycFace, type KycFaceResult } from '../../api/kyc-api'
import { attachMediaStream, base64ToBlob } from '../../lib/kyc-media'

export const FACE_SPOOF_MESSAGE =
  'Ảnh selfie nghi ngờ là ảnh chụp lại (màn hình hoặc ảnh in). Hãy chụp trực tiếp khuôn mặt của bạn, đủ sáng và không bị che.'
export const FACE_MISMATCH_MESSAGE =
  'Khuôn mặt không khớp với ảnh trên CCCD. Nguyên nhân thường gặp: selfie thiếu sáng hoặc lệch góc; ảnh mặt trước CCCD mờ, tối hoặc chói nên không thấy rõ chân dung. Hãy chụp lại selfie, hoặc quay lại chụp lại mặt trước CCCD.'
const CAMERA_DENIED_MESSAGE = 'Không thể truy cập camera. Vui lòng cấp quyền.'

/** Liveness is checked before the match so a spoof is never reported as a mismatch. */
export function describeFaceFailure(result: KycFaceResult): string | null {
  if (!result.liveness) return FACE_SPOOF_MESSAGE
  if (!result.match) return FACE_MISMATCH_MESSAGE
  return null
}

interface UseKycSelfieOptions {
  frontPreview: string
  maintenanceMode: boolean
  onVerified: () => void
}

/** Selfie capture + server precheck. Submit re-verifies; this only gates the UX step. */
export function useKycSelfie({
  frontPreview,
  maintenanceMode,
  onVerified,
}: UseKycSelfieOptions) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const [selfiePreview, setSelfiePreview] = React.useState('')
  const [stream, setStream] = React.useState<MediaStream | null>(null)
  const [isVerifying, setIsVerifying] = React.useState(false)
  const [faceError, setFaceError] = React.useState('')
  // Bound to the exact images that passed, so replacing either one invalidates it.
  const [verifiedPair, setVerifiedPair] = React.useState<{
    front: string
    selfie: string
  } | null>(null)

  const isCameraActive = stream !== null
  const isFaceVerified =
    verifiedPair !== null &&
    verifiedPair.front === frontPreview &&
    verifiedPair.selfie === selfiePreview

  React.useEffect(() => {
    attachMediaStream(videoRef.current, stream)
  }, [stream])

  React.useEffect(
    () => () => stream?.getTracks().forEach(track => track.stop()),
    [stream]
  )

  const startCamera = async () => {
    if (maintenanceMode) {
      toast.error(KYC_MAINTENANCE_MESSAGE)
      return
    }
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 },
      })
      setFaceError('')
      setStream(mediaStream)
    } catch {
      toast.error(CAMERA_DENIED_MESSAGE)
    }
  }

  const capture = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height)
    setSelfiePreview(canvas.toDataURL('image/jpeg'))
    setStream(null)
  }

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (maintenanceMode) {
      toast.error(KYC_MAINTENANCE_MESSAGE)
      return
    }
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setFaceError('')
      setSelfiePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const retake = () => {
    setSelfiePreview('')
    setFaceError('')
    setVerifiedPair(null)
  }

  const verify = async () => {
    if (maintenanceMode) {
      toast.error(KYC_MAINTENANCE_MESSAGE)
      return
    }
    if (!selfiePreview || !frontPreview) {
      toast.error('Vui lòng chụp ảnh selfie trước khi tiếp tục')
      return
    }

    setIsVerifying(true)
    setFaceError('')
    try {
      const result = await verifyKycFace(
        base64ToBlob(selfiePreview),
        base64ToBlob(frontPreview)
      )
      const failure = describeFaceFailure(result)
      if (failure) {
        setFaceError(failure)
        return
      }
      setVerifiedPair({ front: frontPreview, selfie: selfiePreview })
      toast.success('Xác thực khuôn mặt thành công')
      onVerified()
    } catch (error) {
      setFaceError(
        error instanceof Error
          ? error.message
          : 'Không thể xác thực khuôn mặt. Vui lòng thử lại.'
      )
    } finally {
      setIsVerifying(false)
    }
  }

  return {
    videoRef,
    canvasRef,
    fileInputRef,
    selfiePreview,
    isCameraActive,
    isFaceVerified,
    isVerifying,
    faceError,
    startCamera,
    capture,
    handleFile,
    retake,
    verify,
  }
}
