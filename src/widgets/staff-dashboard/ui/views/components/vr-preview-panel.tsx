'use client'

import * as React from 'react'
import Image from 'next/image'
import { Camera, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

export interface VrPreviewPanelProps {
  images360?: string[]
  gallery?: string[]
  vrUrl?: string
}

export function VrPreviewPanel({
  images360 = [],
  gallery = [],
  vrUrl,
}: VrPreviewPanelProps = {}): React.ReactElement {
  const displayImages = images360.length > 0 ? images360 : gallery
  const [activeIdx, setActiveIdx] = React.useState(0)

  const has360 = images360.length > 0
  const activeImage =
    displayImages.length > 0
      ? displayImages[activeIdx % displayImages.length]
      : null

  return (
    <div className="relative flex-1 bg-surface-muted/40 flex flex-col justify-between overflow-hidden border-r border-line min-h-[300px]">
      {/* Top Header */}
      <div className="relative z-10 flex justify-between items-center p-4 bg-surface/80 backdrop-blur-sm border-b border-line">
        <span className="text-xs font-semibold text-fg flex items-center gap-1.5">
          <Camera className="w-4 h-4 text-primary" />
          {has360 ? (
            <>
              Ảnh 360° ({activeIdx + 1}/{displayImages.length})
            </>
          ) : (
            'Thẩm định ảnh 360°'
          )}
        </span>

        {vrUrl ? (
          <a
            href={vrUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-primary hover:underline flex items-center gap-1 font-medium bg-primary/10 px-2.5 py-1 rounded-md"
          >
            Mở liên kết VR ngoài
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : null}
      </div>

      {/* Main viewer / empty state */}
      <div className="relative flex-1 flex items-center justify-center p-4 overflow-hidden">
        {has360 && activeImage ? (
          <div className="relative w-full h-full min-h-[250px] flex items-center justify-center">
            <Image
              src={activeImage}
              alt={`Ảnh 360 độ ${activeIdx + 1}`}
              fill
              unoptimized
              className="max-h-full max-w-full object-contain"
            />
            {displayImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIdx(
                      prev =>
                        (prev - 1 + displayImages.length) % displayImages.length
                    )
                  }
                  aria-label="Ảnh trước"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-fg/40 hover:bg-fg/60 text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIdx(prev => (prev + 1) % displayImages.length)
                  }
                  aria-label="Ảnh tiếp theo"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-fg/40 hover:bg-fg/60 text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-6 text-muted gap-2">
            <Camera className="w-12 h-12 opacity-30 text-muted" />
            <p className="text-sm font-semibold text-fg">Chưa có ảnh 360°</p>
            <p className="text-xs text-subtle max-w-xs">
              Tin đăng này chưa đính kèm ảnh chụp không gian 360° hoặc liên kết
              VR tham quan thực tế.
            </p>
          </div>
        )}
      </div>

      {/* Thumbnail strip if multiple 360 images */}
      {displayImages.length > 1 && (
        <div className="flex gap-1.5 p-2 overflow-x-auto border-t border-line bg-surface/60">
          {displayImages.map((src, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              aria-label={`Chọn ảnh 360 số ${idx + 1}`}
              className={`relative shrink-0 w-14 h-10 rounded overflow-hidden border-2 transition-all ${
                idx === activeIdx
                  ? 'border-primary'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={src}
                alt={`Ảnh nhỏ ${idx + 1}`}
                fill
                unoptimized
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
