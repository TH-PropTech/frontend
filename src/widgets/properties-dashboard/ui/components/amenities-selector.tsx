'use client'

import * as React from 'react'

interface AmenitiesSelectorProps {
  selectedAmenities: string[]
  setSelectedAmenities: (val: string[]) => void
}

const AMENITIES = [
  { key: 'pool', label: 'Hồ bơi' },
  { key: 'gym', label: 'Phòng gym' },
  { key: 'parking', label: 'Bãi đỗ xe' },
  { key: 'elevator', label: 'Thang máy' },
  { key: 'security', label: 'Bảo vệ 24/7' },
  { key: 'pets', label: 'Cho nuôi thú cưng' },
  { key: 'park', label: 'Công viên nội khu' },
]

export function AmenitiesSelector({
  selectedAmenities,
  setSelectedAmenities,
}: AmenitiesSelectorProps): React.ReactElement {
  const toggleAmenity = (key: string) => {
    if (selectedAmenities.includes(key)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== key))
    } else {
      setSelectedAmenities([...selectedAmenities, key])
    }
  }

  return (
    <div className="space-y-3 border-t border-border/60 pt-5">
      <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
        Tiện ích căn hộ & dự án
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {AMENITIES.map(amenity => {
          const isSelected = selectedAmenities.includes(amenity.key)
          return (
            <button
              key={amenity.key}
              type="button"
              onClick={() => toggleAmenity(amenity.key)}
              className={`flex items-center justify-between p-2.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'border-primary bg-primary-soft text-primary font-bold'
                  : 'border-border bg-white text-muted hover:bg-surface-muted'
              }`}
            >
              <span>{amenity.label}</span>
              {isSelected && (
                <svg
                  className="h-3.5 w-3.5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
