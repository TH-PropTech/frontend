'use client'

import * as React from 'react'
import { Upload, Camera, Loader2, ShieldCheck } from 'lucide-react'
import { Button } from '@/shared/ui/button'

interface KycStep1Props {
  isWebcamActive1: boolean
  isWebcamActive2: boolean
  frontPreview: string
  backPreview: string
  videoRef1: React.RefObject<HTMLVideoElement | null>
  videoRef2: React.RefObject<HTMLVideoElement | null>
  fileInputRef1: React.RefObject<HTMLInputElement | null>
  fileInputRef2: React.RefObject<HTMLInputElement | null>
  startWebcam: (card: 1 | 2) => void
  takePicture: (card: 1 | 2) => void
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    card: 1 | 2
  ) => void
  handleExtractOcr: () => void
  isProcessing: boolean
  maintenanceMode: boolean
}

export function KycStep1({
  isWebcamActive1,
  isWebcamActive2,
  frontPreview,
  backPreview,
  videoRef1,
  videoRef2,
  fileInputRef1,
  fileInputRef2,
  startWebcam,
  takePicture,
  handleFileChange,
  handleExtractOcr,
  isProcessing,
  maintenanceMode,
}: KycStep1Props): React.ReactElement {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch flex-1 overflow-y-auto pr-1">
      {maintenanceMode && (
        <div
          role="status"
          className="md:col-span-2 rounded-xl border border-warning/40 bg-warning-soft/20 p-4 text-sm text-fg"
        >
          Dịch vụ eKYC đang tạm bảo trì. Các thao tác nhập CCCD và gửi OCR đã
          được khóa để không phát sinh request giả.
        </div>
      )}

      {/* Front ID */}
      <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm flex flex-col justify-between space-y-4">
        <div>
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-fg">Mặt trước CCCD</span>
            <span className="text-[10px] text-[#9F3F2A] font-bold">
              Bắt buộc
            </span>
          </div>
          <div className="mt-4 h-48 w-full relative rounded-xl bg-slate-50 border border-dashed border-slate-300 overflow-hidden flex items-center justify-center shadow-inner">
            {isWebcamActive1 ? (
              <video
                ref={videoRef1}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
              />
            ) : frontPreview ? (
              <img
                src={frontPreview}
                className="w-full h-full object-cover"
                alt="Mặt trước CCCD"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <Upload className="h-8 w-8 text-slate-400 mb-2" />
                <p className="text-xs text-slate-500">
                  Chụp ảnh từ webcam hoặc tải tệp lên
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex gap-2">
            {isWebcamActive1 ? (
              <Button
                onClick={() => takePicture(1)}
                disabled={maintenanceMode}
                className="flex-1 text-[11px] h-9 bg-emerald-600 hover:bg-emerald-700 text-white font-bold border-none"
              >
                <Camera className="h-4 w-4 mr-1.5" /> Chụp ảnh
              </Button>
            ) : (
              <Button
                onClick={() => startWebcam(1)}
                disabled={maintenanceMode}
                variant="outline"
                className="flex-1 text-[11px] h-9 border-slate-200 hover:bg-slate-50"
              >
                <Camera className="h-4 w-4 mr-1.5" /> Mở Webcam
              </Button>
            )}
            <Button
              onClick={() => fileInputRef1.current?.click()}
              disabled={maintenanceMode}
              variant="outline"
              className="flex-1 text-[11px] h-9 border-slate-200 hover:bg-slate-50"
            >
              <Upload className="h-4 w-4 mr-1.5" /> Chọn tệp
            </Button>
            <input
              type="file"
              ref={fileInputRef1}
              className="hidden"
              accept="image/*"
              disabled={maintenanceMode}
              onChange={e => handleFileChange(e, 1)}
            />
          </div>
        </div>
      </div>

      {/* Back ID */}
      <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm flex flex-col justify-between space-y-4">
        <div>
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-fg">Mặt sau CCCD</span>
            <span className="text-[10px] text-slate-400">Khuyến nghị</span>
          </div>
          <div className="mt-4 h-48 w-full relative rounded-xl bg-slate-50 border border-dashed border-slate-300 overflow-hidden flex items-center justify-center shadow-inner">
            {isWebcamActive2 ? (
              <video
                ref={videoRef2}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
              />
            ) : backPreview ? (
              <img
                src={backPreview}
                className="w-full h-full object-cover"
                alt="Mặt sau CCCD"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <Upload className="h-8 w-8 text-slate-400 mb-2" />
                <p className="text-xs text-slate-500">
                  Chụp ảnh từ webcam hoặc tải tệp lên
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex gap-2">
            {isWebcamActive2 ? (
              <Button
                onClick={() => takePicture(2)}
                disabled={maintenanceMode}
                className="flex-1 text-[11px] h-9 bg-emerald-600 hover:bg-emerald-700 text-white font-bold border-none"
              >
                <Camera className="h-4 w-4 mr-1.5" /> Chụp ảnh
              </Button>
            ) : (
              <Button
                onClick={() => startWebcam(2)}
                disabled={maintenanceMode}
                variant="outline"
                className="flex-1 text-[11px] h-9 border-slate-200 hover:bg-slate-50"
              >
                <Camera className="h-4 w-4 mr-1.5" /> Mở Webcam
              </Button>
            )}
            <Button
              onClick={() => fileInputRef2.current?.click()}
              disabled={maintenanceMode}
              variant="outline"
              className="flex-1 text-[11px] h-9 border-slate-200 hover:bg-slate-50"
            >
              <Upload className="h-4 w-4 mr-1.5" /> Chọn tệp
            </Button>
            <input
              type="file"
              ref={fileInputRef2}
              className="hidden"
              accept="image/*"
              disabled={maintenanceMode}
              onChange={e => handleFileChange(e, 2)}
            />
          </div>
        </div>
      </div>

      {/* Bottom Control row */}
      <div className="md:col-span-2 mt-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Loader2 className="h-8 w-8 text-[#9F3F2A] animate-spin mb-2" />
            <p className="text-sm font-bold text-fg">
              Đang phân tích OCR từ ảnh thẻ CCCD...
            </p>
            <p className="text-xs text-muted mt-1">
              Hệ thống đang trích xuất dữ liệu, vui lòng chờ trong giây lát.
            </p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <p className="text-xs text-slate-600 max-w-md font-sans">
                Vui lòng cung cấp hình ảnh CCCD nguyên bản, không bị mờ, lóa
                hoặc mất góc để công nghệ AI OCR nhận diện chính xác nhất.
              </p>
            </div>
            <Button
              onClick={handleExtractOcr}
              disabled={maintenanceMode || !frontPreview || isProcessing}
              className="w-full md:w-auto h-11 px-8 text-sm font-bold text-white rounded-xl shadow-md border-none flex items-center justify-center gap-2 cursor-pointer transition-colors"
              style={{ backgroundColor: frontPreview ? '#9F3F2A' : '#e2e8f0' }}
            >
              <ShieldCheck className="h-5 w-5" /> Bắt đầu trích xuất OCR
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
