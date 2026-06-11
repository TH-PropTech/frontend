'use client'

import * as React from 'react'

interface PriceFilterModalProps {
  isOpen: boolean
  onClose: () => void
  minPrice: number | ''
  setMinPrice: (val: number | '') => void
  maxPrice: number | ''
  setMaxPrice: (val: number | '') => void
}

export function PriceFilterModal({
  isOpen,
  onClose,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}: PriceFilterModalProps): React.ReactElement | null {
  if (!isOpen) return null

  return (
    <div
      className="absolute left-0 lg:left-auto lg:right-0 top-[100%] mt-2 z-50 w-72 rounded-2xl border border-border bg-white p-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150 space-y-4"
      onClick={e => e.stopPropagation()}
    >
      <div className="flex items-center justify-between border-b border-border pb-2">
        <span className="font-bold text-sm text-fg">Chọn khoảng giá</span>
        <button
          type="button"
          onClick={() => {
            setMinPrice('')
            setMaxPrice('')
          }}
          className="text-xs font-semibold text-primary hover:underline cursor-pointer"
        >
          Xóa
        </button>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Từ (Tr)"
          value={minPrice}
          onChange={e =>
            setMinPrice(e.target.value !== '' ? Number(e.target.value) : '')
          }
          className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted focus:outline-none focus:border-primary"
        />
        <span className="text-muted text-xs">→</span>
        <input
          type="number"
          placeholder="Đến (Tr)"
          value={maxPrice}
          onChange={e =>
            setMaxPrice(e.target.value !== '' ? Number(e.target.value) : '')
          }
          className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted focus:outline-none focus:border-primary"
        />
      </div>

      <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-left">
        {(
          [
            { label: 'Tất cả khoảng giá', min: '', max: '' },
            { label: 'Dưới 3 triệu', min: '', max: 3 },
            { label: '3 - 5 triệu', min: 3, max: 5 },
            { label: '5 - 10 triệu', min: 5, max: 10 },
            { label: '10 - 20 triệu', min: 10, max: 20 },
            { label: '20 - 40 triệu', min: 20, max: 40 },
            { label: 'Trên 40 triệu', min: 40, max: '' },
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
              setMinPrice(preset.min)
              setMaxPrice(preset.max)
              onClose()
            }}
            className="w-full text-left text-xs px-3 py-2 rounded-xl text-fg hover:bg-surface-muted transition-colors font-semibold flex justify-between cursor-pointer"
          >
            <span>{preset.label}</span>
            {minPrice === preset.min && maxPrice === preset.max && (
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

      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2.5 text-xs font-bold text-white bg-primary hover:bg-primary-hover rounded-xl transition-colors w-full text-center cursor-pointer shadow-sm"
      >
        Xác nhận
      </button>
    </div>
  )
}
