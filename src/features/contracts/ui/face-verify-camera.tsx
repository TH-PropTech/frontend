'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import {
  Camera,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Upload,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react'
import { verifySigner } from '../api/contracts-api'

export interface FaceVerifyCameraProps {
  contractId: string
  onVerified: (biometricEvidenceId: string) => void
  onCancel?: () => void
}

export function FaceVerifyCamera({
  contractId,
  onVerified,
  onCancel,
}: FaceVerifyCameraProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const [hasCamera, setHasCamera] = useState<boolean | null>(null)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [previewImg, setPreviewImg] = useState<string | null>(null)
  const [capturedBlob, setCapturedBlob] = useState<Blob | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verifyError, setVerifyError] = useState<string | null>(null)

  // Stop camera tracks
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }, [])

  // Start webcam
  const startCamera = useCallback(async () => {
    try {
      if (
        !navigator.mediaDevices ||
        typeof navigator.mediaDevices.getUserMedia !== 'function'
      ) {
        setHasCamera(false)
        return
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user',
        },
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        try {
          await videoRef.current.play()
        } catch {
          // Ignore autoplay restriction or JSDOM unimplemented play
        }
      }
      setHasCamera(true)
    } catch {
      setHasCamera(false)
    }
  }, [])

  useEffect(() => {
    let active = true

    const init = async () => {
      try {
        if (
          !navigator.mediaDevices ||
          typeof navigator.mediaDevices.getUserMedia !== 'function'
        ) {
          if (active) setHasCamera(false)
          return
        }
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user',
          },
        })
        if (!active) {
          stream.getTracks().forEach(track => track.stop())
          return
        }
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          try {
            await videoRef.current.play()
          } catch {
            // Ignore autoplay restriction or JSDOM unimplemented play
          }
        }
        if (active) setHasCamera(true)
      } catch {
        if (active) setHasCamera(false)
      }
    }

    void init()

    return () => {
      active = false
      stopCamera()
    }
  }, [stopCamera])

  // Trigger countdown then snap photo
  const handleStartCapture = () => {
    setVerifyError(null)
    setCountdown(3)
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(interval)
          snapPhoto()
          return null
        }
        return prev - 1
      })
    }, 1000)
  }

  // Snap photo to Canvas
  const snapPhoto = () => {
    if (!videoRef.current) return
    const video = videoRef.current
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth || 640
    canvas.height = video.videoHeight || 480
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    canvas.toBlob(blob => {
      if (blob) {
        setCapturedBlob(blob)
        setPreviewImg(canvas.toDataURL('image/jpeg'))
        stopCamera()
      }
    }, 'image/jpeg')
  }

  // Fallback: upload file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setCapturedBlob(file)
    const reader = new FileReader()
    reader.onload = () => {
      setPreviewImg(reader.result as string)
      stopCamera()
    }
    reader.readAsDataURL(file)
  }

  // Submit for KYC match
  const handleVerify = async () => {
    if (!capturedBlob) return
    try {
      setIsVerifying(true)
      setVerifyError(null)
      const res = await verifySigner(contractId, capturedBlob)
      if (res.verified && res.biometricEvidenceId) {
        onVerified(res.biometricEvidenceId)
      } else {
        setVerifyError(
          'Khuôn mặt không khớp với ảnh CCCD trong hồ sơ KYC. Vui lòng chụp lại.'
        )
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Xác thực sinh trắc học thất bại'
      setVerifyError(msg)
    } finally {
      setIsVerifying(false)
    }
  }

  // Retake photo
  const handleRetake = () => {
    setPreviewImg(null)
    setCapturedBlob(null)
    setVerifyError(null)
    startCamera()
  }

  return (
    <div
      data-testid="face-verify-camera"
      className="flex flex-col items-center gap-4 w-full text-center"
    >
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--fg)]">
        <ShieldCheck className="w-4 h-4 text-[var(--primary)]" />
        <span>Bước 1: Đối soát sinh trắc học khuôn mặt</span>
      </div>

      <p className="text-xs text-[var(--muted)] max-w-sm">
        Vui lòng giữ khuôn mặt thẳng trong khung hình để hệ thống đối sánh với
        ảnh CCCD đã được xác thực KYC.
      </p>

      {/* Video Preview or Captured Image Frame */}
      <div className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-[var(--primary)] bg-black shadow-md flex items-center justify-center">
        {previewImg ? (
          <Image
            src={previewImg}
            alt="Selfie đối soát"
            width={288}
            height={288}
            unoptimized
            className="w-full h-full object-cover scale-x-[-1]"
          />
        ) : hasCamera !== false ? (
          <>
            <video
              ref={videoRef}
              playsInline
              muted
              data-testid="camera-video-element"
              className="w-full h-full object-cover scale-x-[-1]"
            />
            {/* Oval Face Guide Overlay */}
            <div
              data-testid="face-guide-overlay"
              aria-hidden="true"
              className="absolute inset-4 rounded-full border-2 border-dashed border-white/60 pointer-events-none animate-pulse"
            />
            {/* Countdown Overlay */}
            {countdown !== null && (
              <div
                data-testid="countdown-overlay"
                className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-5xl font-extrabold animate-bounce"
              >
                {countdown}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-center text-xs text-[var(--muted)] gap-2">
            <Camera className="w-8 h-8 text-[var(--muted)]" />
            <span>Camera không khả dụng hoặc chưa cấp quyền.</span>
          </div>
        )}
      </div>

      {/* Errors */}
      {verifyError && (
        <div className="flex items-center gap-1.5 text-xs text-[var(--danger)] max-w-xs text-center">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{verifyError}</span>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col items-center gap-2 w-full max-w-xs">
        {previewImg ? (
          <div className="flex items-center gap-2 w-full">
            <button
              type="button"
              onClick={handleRetake}
              disabled={isVerifying}
              aria-label="Chụp lại"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--fg)] hover:bg-[var(--surface)] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Chụp lại</span>
            </button>

            <button
              type="button"
              onClick={handleVerify}
              disabled={isVerifying}
              aria-label="Xác nhận đối soát"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Đang đối soát...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Xác nhận</span>
                </>
              )}
            </button>
          </div>
        ) : hasCamera !== false ? (
          <button
            type="button"
            onClick={handleStartCapture}
            disabled={countdown !== null}
            aria-label="Chụp ảnh đối soát"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 disabled:opacity-50 transition-opacity shadow-sm"
          >
            <Camera className="w-4 h-4" />
            <span>Chụp ảnh đối soát (3 giây)</span>
          </button>
        ) : null}

        {/* Fallback File Upload */}
        <label className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--primary)] cursor-pointer mt-1">
          <Upload className="w-3.5 h-3.5" />
          <span>Tải ảnh selfie từ máy</span>
          <input
            type="file"
            accept="image/*"
            aria-label="Tải ảnh selfie từ máy"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-[var(--muted)] hover:underline mt-2"
          >
            Hủy thao tác
          </button>
        )}
      </div>
    </div>
  )
}
