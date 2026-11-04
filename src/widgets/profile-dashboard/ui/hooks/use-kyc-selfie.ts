'use client'

import * as React from 'react'
import { toast } from 'sonner'
import { KYC_MAINTENANCE_MESSAGE } from '@/shared/config/kyc-maintenance'
import {
  checkKycPose,
  verifyKycFace,
  type KycFaceResult,
  type KycPose,
} from '../../api/kyc-api'
import { attachMediaStream, base64ToBlob } from '../../lib/kyc-media'

export const FACE_SPOOF_MESSAGE =
  'Ảnh selfie nghi ngờ là ảnh chụp lại (màn hình hoặc ảnh in). Hãy chụp trực tiếp khuôn mặt của bạn, đủ sáng và không bị che.'
export const FACE_MISMATCH_MESSAGE =
  'Khuôn mặt không khớp với ảnh trên CCCD. Nguyên nhân thường gặp: selfie thiếu sáng hoặc lệch góc; ảnh mặt trước CCCD mờ, tối hoặc chói nên không thấy rõ chân dung. Hãy chụp lại selfie, hoặc quay lại chụp lại mặt trước CCCD.'
/** Face-direction challenge, in order. The first frame (looking straight) is the one matched against the ID. */
export const KYC_POSE_STEPS: ReadonlyArray<{
  pose: KycPose
  instruction: string
}> = [
  {
    pose: 'center',
    instruction: 'Đặt khuôn mặt vào khung, nhìn thẳng, đủ sáng',
  },
  { pose: 'left', instruction: 'Quay mặt sang trái' },
  { pose: 'right', instruction: 'Quay mặt sang phải' },
  { pose: 'up', instruction: 'Nhìn thẳng và ngẩng nhẹ cằm' },
]
export const POSE_NOT_MATCHED_MESSAGE =
  'Chưa đúng hướng khuôn mặt. Hãy làm theo hướng dẫn trên khung hình rồi chụp lại.'
export const POSE_NO_FACE_MESSAGE =
  'Không thấy khuôn mặt trong ảnh. Hãy đưa mặt vào khung, đủ sáng, không bị che.'
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
  const [poseStep, setPoseStep] = React.useState(0)
  const [isCheckingPose, setIsCheckingPose] = React.useState(false)
  const centerFrameRef = React.useRef('')
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
      setPoseStep(0)
      centerFrameRef.current = ''
      setStream(mediaStream)
    } catch {
      toast.error(CAMERA_DENIED_MESSAGE)
    }
  }

  const capture = async () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas || isCheckingPose) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height)
    const frame = canvas.toDataURL('image/jpeg')
    const step = KYC_POSE_STEPS[poseStep]
    if (!step) return

    setIsCheckingPose(true)
    setFaceError('')
    try {
      const result = await checkKycPose(base64ToBlob(frame), step.pose)
      if (!result.faceFound) {
        setFaceError(POSE_NO_FACE_MESSAGE)
        return
      }
      if (!result.matches) {
        setFaceError(POSE_NOT_MATCHED_MESSAGE)
        return
      }
      if (step.pose === 'center') centerFrameRef.current = frame
      if (poseStep < KYC_POSE_STEPS.length - 1) {
        setPoseStep(poseStep + 1)
        return
      }
      setSelfiePreview(centerFrameRef.current)
      setStream(null)
    } catch (error) {
      setFaceError(
        error instanceof Error
          ? error.message
          : 'Không thể kiểm tra hướng khuôn mặt. Vui lòng thử lại.'
      )
    } finally {
      setIsCheckingPose(false)
    }
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
    setPoseStep(0)
    centerFrameRef.current = ''
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
    isCheckingPose,
    poseStep,
    faceError,
    startCamera,
    capture,
    handleFile,
    retake,
    verify,
  }
}
