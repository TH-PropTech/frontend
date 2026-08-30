'use client'

import * as React from 'react'
import { ImageIcon, ChevronLeft, ChevronRight, Upload } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
  onUpload: (files: FileList) => void
  isUploading: boolean
  previewUrls: string[]
}

export function ImageGallery({
  images,
  onUpload,
  isUploading,
  previewUrls,
}: ImageGalleryProps): React.ReactElement {
  const allImages = [...images, ...previewUrls]
  const [activeIdx, setActiveIdx] = React.useState(0)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const [prevLength, setPrevLength] = React.useState(images.length)
  if (prevLength !== images.length) {
    setPrevLength(images.length)
    setActiveIdx(0)
  }

  const goNext = (): void => setActiveIdx(prev => (prev + 1) % allImages.length)

  const goPrev = (): void =>
    setActiveIdx(prev => (prev - 1 + allImages.length) % allImages.length)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files)
    }
  }

  const activeImage = allImages[activeIdx]
  const isPreview = activeIdx >= images.length

  return (
    <div className="flex flex-col h-full bg-[color:var(--surface-muted)]/30">
      {/* Main image viewer */}
      <div className="relative flex-1 min-h-0 flex items-center justify-center bg-[color:var(--fg)]/5 overflow-hidden">
        {activeImage ? (
          <>
            {}
            <img
              src={activeImage}
              alt={`Ảnh căn hộ ${activeIdx + 1}`}
              className="max-h-full max-w-full object-contain"
            />
            {isPreview && (
              <span className="absolute top-3 right-3 bg-[color:var(--accent)] text-[color:var(--fg)] text-[10px] font-bold px-2 py-0.5 rounded-full">
                Xem trước
              </span>
            )}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  aria-label="Ảnh trước"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-[color:var(--fg)]/40 hover:bg-[color:var(--fg)]/60 text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={goNext}
                  aria-label="Ảnh tiếp theo"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-[color:var(--fg)]/40 hover:bg-[color:var(--fg)]/60 text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-[color:var(--muted)]">
            <ImageIcon className="w-12 h-12 opacity-30" />
            <span className="text-xs">Chưa có ảnh</span>
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {allImages.length > 0 && (
        <div className="flex gap-1.5 p-2 overflow-x-auto no-scrollbar border-t border-[color:var(--border)]">
          {allImages.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              aria-label={`Chọn ảnh ${idx + 1}`}
              className={`relative shrink-0 w-14 h-10 rounded overflow-hidden border-2 transition-all ${
                idx === activeIdx
                  ? 'border-[color:var(--primary)]'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              {}
              <img
                src={src}
                alt={`thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              {idx >= images.length && (
                <span className="absolute inset-0 bg-[color:var(--accent)]/30" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Upload zone */}
      <div className="p-3 border-t border-[color:var(--border)] bg-[color:var(--surface)]">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpg,image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={handleFileChange}
          aria-label="Tải lên ảnh căn hộ"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full py-2 flex items-center justify-center gap-2 text-xs font-semibold border border-dashed border-[color:var(--border-strong)] rounded-lg text-[color:var(--muted)] hover:text-[color:var(--primary)] hover:border-[color:var(--primary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-[color:var(--primary)] border-t-transparent rounded-full animate-spin" />
              Đang tải lên...
            </>
          ) : (
            <>
              <Upload className="w-3.5 h-3.5" />
              Tải ảnh lên (preview)
            </>
          )}
        </button>
        {previewUrls.length > 0 && (
          <p className="text-[10px] text-[color:var(--success)] text-center mt-1.5">
            {previewUrls.length} ảnh đã upload thành công
          </p>
        )}
      </div>
    </div>
  )
}
