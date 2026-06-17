'use client'

import * as React from 'react'
import { Upload, Camera, RefreshCw, Shield, ShieldCheck, Loader2 } from 'lucide-react'
import { Button } from '@/shared/ui/button'

interface KycUploadPanelProps {
  isWebcamActive1: boolean
  isWebcamActive2: boolean
  frontPreview: string
  backPreview: string
  frontUrl: string
  backUrl: string
  setFrontPreview: (val: string) => void
  setBackPreview: (val: string) => void
  setFrontUrl: (val: string) => void
  setBackUrl: (val: string) => void
  videoRef1: React.RefObject<HTMLVideoElement | null>
  videoRef2: React.RefObject<HTMLVideoElement | null>
  fileInputRef1: React.RefObject<HTMLInputElement | null>
  fileInputRef2: React.RefObject<HTMLInputElement | null>
  startWebcam: (card: 1 | 2) => void
  takePicture: (card: 1 | 2) => void
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, card: 1 | 2) => void
  handleExtractOcr: () => void
  isOcrLoading: boolean
  cccdUploaded: boolean
}

export function KycUploadPanel({
  isWebcamActive1,
  isWebcamActive2,
  frontPreview,
  backPreview,
  frontUrl,
  backUrl,
  setFrontPreview,
  setBackPreview,
  setFrontUrl,
  setBackUrl,
  videoRef1,
  videoRef2,
  fileInputRef1,
  fileInputRef2,
  startWebcam,
  takePicture,
  handleFileChange,
  handleExtractOcr,
  isOcrLoading,
}: KycUploadPanelProps): React.ReactElement {
  return (
    <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Front Card Panel */}
        <div className="border border-border rounded-2xl p-4 bg-surface/5 space-y-3 shadow-sm bg-white">
          <div className="flex justify-between items-center pb-2 border-b border-border/40">
            <span className="text-xs font-bold text-fg">Mặt trước CCCD</span>
            <span className="text-[10px] text-primary font-bold">Bắt buộc</span>
          </div>
          <div className="h-36 w-full relative rounded-xl bg-surface-muted/20 border border-dashed border-border overflow-hidden flex items-center justify-center shadow-inner">
            {isWebcamActive1 ? (
              <video
                ref={videoRef1}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
              />
            ) : frontPreview || frontUrl ? (
              <img
                src={frontPreview || frontUrl}
                className="w-full h-full object-cover"
                alt="Mặt trước preview"
              />
            ) : (
              <Upload className="h-8 w-8 text-muted/50" />
            )}
          </div>
          <div className="flex gap-2">
            {isWebcamActive1 ? (
              <Button
                size="sm"
                className="flex-1 text-[10px] h-8 bg-success hover:bg-success/90"
                onClick={() => takePicture(1)}
              >
                <Camera className="h-3.5 w-3.5 mr-1" /> Chụp ảnh
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="flex-1 text-[10px] h-8"
                onClick={() => startWebcam(1)}
              >
                <Camera className="h-3.5 w-3.5 mr-1" /> Webcam
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-[10px] h-8"
              onClick={() => fileInputRef1.current?.click()}
            >
              <Upload className="h-3.5 w-3.5 mr-1" /> Chọn ảnh
            </Button>
            <input
              type="file"
              ref={fileInputRef1}
              className="hidden"
              accept="image/*"
              onChange={e => handleFileChange(e, 1)}
            />
          </div>
          <div className="space-y-1">
            <div className="flex gap-1">
              <input
                type="text"
                placeholder="Nhập URL ảnh mặt trước..."
                value={frontUrl}
                onChange={e => setFrontUrl(e.target.value)}
                className="flex-1 border border-border rounded-lg px-2.5 py-1 text-[11px] bg-white text-fg focus:outline-none focus:border-primary"
              />
              {(frontPreview || frontUrl) && (
                <button
                  onClick={() => {
                    setFrontPreview('')
                    setFrontUrl('')
                  }}
                  className="p-1 border border-border rounded-lg text-muted hover:text-danger cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Back Card Panel */}
        <div className="border border-border rounded-2xl p-4 bg-surface/5 space-y-3 shadow-sm bg-white">
          <div className="flex justify-between items-center pb-2 border-b border-border/40">
            <span className="text-xs font-bold text-fg">Mặt sau CCCD</span>
            <span className="text-[10px] text-muted">Không bắt buộc</span>
          </div>
          <div className="h-36 w-full relative rounded-xl bg-surface-muted/20 border border-dashed border-border overflow-hidden flex items-center justify-center shadow-inner">
            {isWebcamActive2 ? (
              <video
                ref={videoRef2}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
              />
            ) : backPreview || backUrl ? (
              <img
                src={backPreview || backUrl}
                className="w-full h-full object-cover"
                alt="Mặt sau preview"
              />
            ) : (
              <Upload className="h-8 w-8 text-muted/50" />
            )}
          </div>
          <div className="flex gap-2">
            {isWebcamActive2 ? (
              <Button
                size="sm"
                className="flex-1 text-[10px] h-8 bg-success hover:bg-success/90"
                onClick={() => takePicture(2)}
              >
                <Camera className="h-3.5 w-3.5 mr-1" /> Chụp ảnh
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="flex-1 text-[10px] h-8"
                onClick={() => startWebcam(2)}
              >
                <Camera className="h-3.5 w-3.5 mr-1" /> Webcam
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-[10px] h-8"
              onClick={() => fileInputRef2.current?.click()}
            >
              <Upload className="h-3.5 w-3.5 mr-1" /> Chọn ảnh
            </Button>
            <input
              type="file"
              ref={fileInputRef2}
              className="hidden"
              accept="image/*"
              onChange={e => handleFileChange(e, 2)}
            />
          </div>
          <div className="space-y-1">
            <div className="flex gap-1">
              <input
                type="text"
                placeholder="Nhập URL ảnh mặt sau..."
                value={backUrl}
                onChange={e => setBackUrl(e.target.value)}
                className="flex-1 border border-border rounded-lg px-2.5 py-1 text-[11px] bg-white text-fg focus:outline-none focus:border-primary"
              />
              {(backPreview || backUrl) && (
                <button
                  onClick={() => {
                    setBackPreview('')
                    setBackUrl('')
                  }}
                  className="p-1 border border-border rounded-lg text-muted hover:text-danger cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action and AI status info */}
      <div className="space-y-3.5 bg-white border border-border rounded-2xl p-4.5 shadow-sm flex-1 flex flex-col justify-center animate-fade-in">
        {isOcrLoading ? (
          <div className="flex flex-col items-center justify-center gap-2.5 py-6">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <span className="text-xs font-bold text-primary font-marketing">
              Đang phân tích OCR từ ảnh thẻ CCCD...
            </span>
            <span className="text-[10px] text-muted">
              Đang gọi thuật toán xử lý ảnh - Vui lòng chờ 2.5 giây
            </span>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2 bg-primary-soft/10 border border-primary/10 rounded-xl p-3 text-[11px] text-muted leading-relaxed text-left">
              <Shield className="h-5 w-5 text-primary shrink-0" />
              <span>
                Đặt ảnh CCCD gốc rõ nét ở trên để AI OCR trích xuất thông tin.
                Khi hoàn tất, các ô kết quả bên phải sẽ tự động được điền và băm
                Blockchain.
              </span>
            </div>
            <Button
              onClick={handleExtractOcr}
              disabled={!frontPreview && !frontUrl}
              className="w-full h-11 text-sm bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer border-none"
            >
              <ShieldCheck className="h-5 w-5" /> Bắt đầu trích xuất thông tin
              (OCR)
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
