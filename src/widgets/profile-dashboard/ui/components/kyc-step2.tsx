'use client'

import * as React from 'react'
import { Camera, Upload, Loader2, UserCheck } from 'lucide-react'
import { Button } from '@/shared/ui/button'

interface KycStep2Props {
  isWebcamActiveSelfie: boolean
  selfiePreview: string
  videoRefSelfie: React.RefObject<HTMLVideoElement | null>
  fileInputRefSelfie: React.RefObject<HTMLInputElement | null>
  takeSelfie: () => void
  startSelfieWebcam: () => void
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, card: 3) => void
  handleVerifyFace: () => void
  isProcessing: boolean
  setCurrentStep: (step: 1 | 2 | 3) => void
}

export function KycStep2({
  isWebcamActiveSelfie,
  selfiePreview,
  videoRefSelfie,
  fileInputRefSelfie,
  takeSelfie,
  startSelfieWebcam,
  handleFileChange,
  handleVerifyFace,
  isProcessing,
  setCurrentStep,
}: KycStep2Props): React.ReactElement {
  return (
    <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm flex flex-col items-center justify-center space-y-6 max-w-md mx-auto w-full">
      <h3 className="font-display text-sm font-bold text-fg text-center uppercase tracking-wide">
        Xác thực thực thể sống (Liveness Detection)
      </h3>
      <p className="text-xs text-slate-500 text-center -mt-3">
        Nhìn thẳng vào camera và nhấn chụp chân dung để so khớp khuôn mặt với
        ảnh thẻ.
      </p>

      <div className="relative h-56 w-56 rounded-full overflow-hidden border-4 border-[#9F3F2A]/30 bg-slate-50 flex items-center justify-center shadow-inner">
        {isWebcamActiveSelfie ? (
          <video
            ref={videoRefSelfie}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            muted
          />
        ) : selfiePreview ? (
          <img
            src={selfiePreview}
            className="w-full h-full object-cover"
            alt="Chân dung selfie"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <Camera className="h-8 w-8 text-slate-400 mb-2" />
            <p className="text-[11px] text-slate-500">Camera sẵn sàng</p>
          </div>
        )}
        {/* Face overlay target guide */}
        {isWebcamActiveSelfie && (
          <div className="absolute inset-4 rounded-full border-2 border-dashed border-[#9F3F2A]/60 pointer-events-none animate-pulse" />
        )}
      </div>

      <div className="w-full flex gap-3">
        {isWebcamActiveSelfie ? (
          <Button
            onClick={takeSelfie}
            className="flex-1 h-10 bg-emerald-600 hover:bg-emerald-700 text-white font-bold border-none"
          >
            <Camera className="h-4.5 w-4.5 mr-2" /> Chụp chân dung
          </Button>
        ) : (
          <Button
            onClick={startSelfieWebcam}
            variant="outline"
            className="flex-1 h-10 border-slate-200 hover:bg-slate-50"
          >
            <Camera className="h-4.5 w-4.5 mr-2" />{' '}
            {selfiePreview ? 'Chụp lại ảnh' : 'Bật camera'}
          </Button>
        )}
        <Button
          onClick={() => fileInputRefSelfie.current?.click()}
          variant="outline"
          className="flex-1 h-10 border-slate-200 hover:bg-slate-50"
        >
          <Upload className="h-4.5 w-4.5 mr-2" /> Tải ảnh lên
        </Button>
        <input
          type="file"
          ref={fileInputRefSelfie}
          className="hidden"
          accept="image/*"
          onChange={e => handleFileChange(e, 3)}
        />
      </div>

      {isProcessing ? (
        <div className="w-full flex flex-col items-center justify-center pt-2">
          <Loader2 className="h-7 w-7 text-[#9F3F2A] animate-spin mb-1.5" />
          <span className="text-xs font-bold text-fg">
            Đang so khớp khuôn mặt & Liveness...
          </span>
        </div>
      ) : (
        <Button
          onClick={handleVerifyFace}
          disabled={!selfiePreview}
          className="w-full h-11 text-sm font-bold text-white rounded-xl shadow-md border-none flex items-center justify-center gap-2 cursor-pointer"
          style={{ backgroundColor: selfiePreview ? '#9F3F2A' : '#e2e8f0' }}
        >
          <UserCheck className="h-5 w-5" /> Xác minh thực thể sống (Liveness)
        </Button>
      )}

      <button
        onClick={() => setCurrentStep(1)}
        className="text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors cursor-pointer bg-transparent border-none outline-none"
      >
        Quay lại bước trước
      </button>
    </div>
  )
}
