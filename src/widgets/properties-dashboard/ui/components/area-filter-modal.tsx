'use client'

import * as React from 'react'

interface AreaFilterModalProps {
  onClose: () => void
  minArea: number | ''
  setMinArea: (val: number | '') => void
  maxArea: number | ''
  setMaxArea: (val: number | '') => void
}

export function AreaFilterModal({
  onClose,
  minArea,
  setMinArea,
  maxArea,
  setMaxArea,
}: AreaFilterModalProps): React.ReactElement {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-2">
        <span className="font-bold text-sm text-fg">Chọn diện tích</span>
        <button
          type="button"
          onClick={() => {
            setMinArea('')
            setMaxArea('')
          }}
          className="text-xs font-semibold text-primary hover:underline cursor-pointer"
        >
          Xóa
        </button>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Từ (m²)"
          value={minArea}
          onChange={e =>
            setMinArea(e.target.value !== '' ? Number(e.target.value) : '')
          }
          className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted focus:outline-none focus:border-primary"
        />
        <span className="text-muted text-xs">→</span>
        <input
          type="number"
          placeholder="Đến (m²)"
          value={maxArea}
          onChange={e =>
            setMaxArea(e.target.value !== '' ? Number(e.target.value) : '')
          }
          className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted focus:outline-none focus:border-primary"
        />
      </div>

      <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-left">
        {(
          [
            { label: 'Tất cả diện tích', min: '', max: '' },
            { label: 'Dưới 30 m²', min: '', max: 30 },
            { label: '30 - 50 m²', min: 30, max: 50 },
            { label: '50 - 80 m²', min: 50, max: 80 },
            { label: '80 - 100 m²', min: 80, max: 100 },
            { label: '100 - 150 m²', min: 100, max: 150 },
            { label: 'Trên 150 m²', min: 150, max: '' },
          ] as {
            label: string
            min: number | ''
            max: number | ''
          }[]
        ).map(preset => (
          <button
            key={preset.label}
            type="button"
            onClick={() => {
              setMinArea(preset.min)
              setMaxArea(preset.max)
              onClose()
            }}
            className="w-full text-left text-xs px-3 py-2 rounded-xl text-fg hover:bg-surface-muted transition-colors font-semibold flex justify-between cursor-pointer"
          >
            <span>{preset.label}</span>
            {minArea === preset.min && maxArea === preset.max && (
              <svg
                className="h-4 w-4 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
