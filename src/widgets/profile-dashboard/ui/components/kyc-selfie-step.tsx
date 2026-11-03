'use client'

import * as React from 'react'
import { Camera, Loader2, ScanFace, Upload } from 'lucide-react'
import { Button } from '@/shared/ui/button'

interface KycSelfieStepProps {
  selfiePreview: string
  isCameraActive: boolean
  isVerifying: boolean
  faceError: string
  maintenanceMode: boolean
  videoRef: React.RefObject<HTMLVideoElement | null>
  fileInputRef: React.RefObject<HTMLInputElement | null>
  startCamera: () => void
  capture: () => void
  retake: () => void
  handleFile: (event: React.ChangeEvent<HTMLInputElement>) => void
  verify: () => void
  onBack: () => void
}

export function KycSelfieStep({
  selfiePreview,
  isCameraActive,
  isVerifying,
  faceError,
  maintenanceMode,
  videoRef,
  fileInputRef,
  startCamera,
  capture,
  retake,
  handleFile,
  verify,
  onBack,
}: KycSelfieStepProps): React.ReactElement {
  const hasSelfie = selfiePreview !== ''

  return (
    <div className="max-w-xl mx-auto w-full flex-1 overflow-y-auto pr-1">
      <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
          <span className="text-xs font-bold text-fg flex items-center gap-1.5">
            <ScanFace className="h-4 w-4 text-[#9F3F2A]" aria-hidden="true" />
            Ảnh selfie xác thực khuôn mặt
          </span>
          <span className="text-[10px] text-[#9F3F2A] font-bold">Bắt buộc</span>
        </div>

        {maintenanceMode && (
          <div
            role="status"
            className="rounded-xl border border-warning/40 bg-warning-soft/20 p-3 text-xs text-fg"
          >
            Dịch vụ eKYC đang tạm bảo trì. Thao tác chụp và xác thực selfie đã
            được khóa.
          </div>
        )}

        <div className="h-64 w-full relative rounded-xl bg-slate-50 border border-dashed border-slate-300 overflow-hidden flex items-center justify-center shadow-inner">
          {isCameraActive ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover -scale-x-100"
              autoPlay
              playsInline
              muted
            />
          ) : hasSelfie ? (
            <img
              src={selfiePreview}
              className="w-full h-full object-cover"
              alt="Ảnh selfie đã chụp"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <ScanFace
                className="h-8 w-8 text-slate-400 mb-2"
                aria-hidden="true"
              />
              <p className="text-xs text-slate-500">
                Nhìn thẳng vào camera, đủ sáng, không đeo kính che mắt
              </p>
            </div>
          )}
        </div>

        {faceError && (
          <p
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700"
          >
            {faceError}
          </p>
        )}

        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Bạn sẽ kiểm tra và sửa thông tin trích xuất ở bước 3, sau khi xác thực
          khuôn mặt.
        </p>

        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Ảnh khuôn mặt được lưu mã hóa và chỉ dùng để xác minh danh tính của
          bạn.
        </p>

        {isVerifying ? (
          <div
            role="status"
            className="flex items-center justify-center gap-2 py-2"
          >
            <Loader2
              className="h-5 w-5 text-[#9F3F2A] animate-spin"
              aria-hidden="true"
            />
            <span className="text-xs font-bold text-slate-500">
              Đang đối chiếu khuôn mặt với ảnh CCCD...
            </span>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex gap-2">
              {isCameraActive ? (
                <Button
                  onClick={capture}
                  className="flex-1 text-[11px] h-9 bg-emerald-600 hover:bg-emerald-700 text-white font-bold border-none"
                >
                  <Camera className="h-4 w-4 mr-1.5" /> Chụp ảnh
                </Button>
              ) : hasSelfie ? (
                <Button
                  onClick={retake}
                  variant="outline"
                  className="flex-1 text-[11px] h-9 border-slate-200 hover:bg-slate-50"
                >
                  <Camera className="h-4 w-4 mr-1.5" /> Chụp lại
                </Button>
              ) : (
                <Button
                  onClick={startCamera}
                  disabled={maintenanceMode}
                  variant="outline"
                  className="flex-1 text-[11px] h-9 border-slate-200 hover:bg-slate-50"
                >
                  <Camera className="h-4 w-4 mr-1.5" /> Mở camera
                </Button>
              )}
              {!isCameraActive && !hasSelfie && (
                <>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={maintenanceMode}
                    variant="outline"
                    className="flex-1 text-[11px] h-9 border-slate-200 hover:bg-slate-50"
                  >
                    <Upload className="h-4 w-4 mr-1.5" /> Chọn tệp
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    aria-label="Chọn ảnh selfie"
                    disabled={maintenanceMode}
                    onChange={handleFile}
                  />
                </>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={onBack}
                variant="outline"
                className="flex-1 h-10 text-xs border-slate-200 text-slate-600 rounded-full font-bold"
              >
                Quay lại
              </Button>
              <Button
                onClick={verify}
                disabled={!hasSelfie || isCameraActive || maintenanceMode}
                className="flex-1 h-10 text-xs text-white rounded-full font-bold shadow-md border-none cursor-pointer"
                style={{ backgroundColor: '#9F3F2A' }}
              >
                Xác thực khuôn mặt
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
