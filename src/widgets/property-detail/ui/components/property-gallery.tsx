'use client'

import * as React from 'react'

interface PropertyGalleryProps {
  gallery?: string[]
}

export function PropertyGallery({
  gallery = [],
}: PropertyGalleryProps): React.ReactElement | null {
  const [activeImageIndex, setActiveImageIndex] = React.useState<number | null>(
    null
  )

  if (!gallery || gallery.length === 0) {
    return null
  }

  // Label map for 5 pictures based on sequence (Khách, Ngủ, WC, Bếp, Ban công)
  const LABELS = [
    'Phòng khách',
    'Phòng ngủ',
    'Phòng vệ sinh',
    'Phòng bếp',
    'Ban công',
  ]

  const handlePrev = (e: React.MouseEvent): void => {
    e.stopPropagation()
    if (activeImageIndex !== null) {
      setActiveImageIndex(
        (activeImageIndex - 1 + gallery.length) % gallery.length
      )
    }
  }

  const handleNext = (e: React.MouseEvent): void => {
    e.stopPropagation()
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % gallery.length)
    }
  }

  return (
    <div className="w-full">
      {/* Premium Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-auto md:h-[450px]">
        {/* Large Main Image (Phòng khách) */}
        <div
          onClick={() => setActiveImageIndex(0)}
          className="md:col-span-2 h-[300px] md:h-full relative overflow-hidden rounded-2xl border border-border group cursor-pointer"
        >
          <img
            src={gallery[0]}
            alt={LABELS[0]}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          <div className="absolute bottom-4 left-4 z-10">
            <span className="bg-primary/95 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-primary/20 backdrop-blur-sm">
              {LABELS[0]}
            </span>
          </div>
        </div>

        {/* Small Images Grid */}
        <div className="grid grid-cols-2 md:col-span-2 gap-3 h-full">
          {gallery.slice(1, 5).map((imgUrl, index) => {
            const actualIndex = index + 1
            return (
              <div
                key={index}
                onClick={() => setActiveImageIndex(actualIndex)}
                className="h-[145px] md:h-[218px] relative overflow-hidden rounded-2xl border border-border group cursor-pointer"
              >
                <img
                  src={imgUrl}
                  alt={LABELS[actualIndex] || `Hình ảnh ${actualIndex + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="bg-black/70 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm">
                    {LABELS[actualIndex] || `Ảnh ${actualIndex + 1}`}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Lightbox / Modal view */}
      {activeImageIndex !== null && (
        <div
          onClick={() => setActiveImageIndex(null)}
          className="fixed inset-0 bg-black/95 z-[9999] flex flex-col items-center justify-between p-4 md:p-8 animate-fade-in"
        >
          {/* Lightbox Top Control */}
          <div className="w-full max-w-6xl flex justify-between items-center text-white z-10">
            <span className="text-xs font-mono font-bold text-white/75 bg-white/10 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
              {LABELS[activeImageIndex] || `Hình ảnh`} ({activeImageIndex + 1} /{' '}
              {gallery.length})
            </span>
            <button
              onClick={() => setActiveImageIndex(null)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-white border border-white/10 cursor-pointer font-bold text-xs"
            >
              &times;
            </button>
          </div>

          {/* Main View Area */}
          <div className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-6">
            {/* Left Nav Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-white border border-white/10 cursor-pointer"
            >
              &larr;
            </button>

            {/* Image display */}
            <img
              src={gallery[activeImageIndex]}
              alt={LABELS[activeImageIndex]}
              className="max-h-[70vh] max-w-full object-contain rounded-xl select-none"
              onClick={e => e.stopPropagation()}
            />

            {/* Right Nav Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-white border border-white/10 cursor-pointer"
            >
              &rarr;
            </button>
          </div>

          {/* Thumbnails Navigator */}
          <div className="w-full max-w-3xl flex justify-center gap-2 overflow-x-auto py-2 z-10">
            {gallery.map((thumbUrl, idx) => (
              <button
                key={idx}
                onClick={e => {
                  e.stopPropagation()
                  setActiveImageIndex(idx)
                }}
                className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImageIndex === idx
                    ? 'border-primary scale-105'
                    : 'border-white/20 opacity-50 hover:opacity-100'
                }`}
              >
                <img
                  src={thumbUrl}
                  alt="thumbnail"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
