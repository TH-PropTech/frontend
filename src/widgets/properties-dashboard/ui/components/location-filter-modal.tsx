'use client'

import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import { useVietnamLocations } from '@/shared/lib/use-vietnam-locations'
import {
  resolveLocationFromParams,
  removeVietnameseTones,
} from '../../lib/use-properties-filters'

interface LocationFilterModalProps {
  onClose: () => void
  onApply?: () => void
  selectedCity: string
  setSelectedCity: (val: string) => void
  selectedDistrict: string
  setSelectedDistrict: (val: string) => void
  selectedWard: string
  setSelectedWard: (val: string) => void
  selectedProvinceCode: number | null
  setSelectedProvinceCode: (val: number | null) => void
  selectedDistrictCode: number | null
  setSelectedDistrictCode: (val: number | null) => void
  /** Ẩn ô Phường/Xã khi API không hỗ trợ lọc theo phường (tab Dự án). */
  showWard?: boolean
}

const POPULAR_PROVINCES = [
  { name: 'Thành phố Hồ Chí Minh', code: 79 },
  { name: 'Thành phố Hà Nội', code: 1 },
  { name: 'Thành phố Đà Nẵng', code: 48 },
  { name: 'Tỉnh Bình Dương', code: 74 },
  { name: 'Thành phố Hải Phòng', code: 31 },
  { name: 'Thành phố Cần Thơ', code: 92 },
]

export function LocationFilterModal({
  onClose,
  onApply,
  selectedCity,
  setSelectedCity,
  selectedDistrict,
  setSelectedDistrict,
  selectedWard,
  setSelectedWard,
  selectedProvinceCode,
  setSelectedProvinceCode,
  selectedDistrictCode,
  setSelectedDistrictCode,
  showWard = true,
}: LocationFilterModalProps): React.ReactElement {
  const { provinces, wards, isLoadingWards } =
    useVietnamLocations(selectedProvinceCode)
  const availableProvinces =
    provinces.length > 0 ? provinces : POPULAR_PROVINCES

  // 1. Auto-resolve missing city/province from selectedDistrict
  React.useEffect(() => {
    if (selectedDistrict && (!selectedCity || !selectedProvinceCode)) {
      const resolved = resolveLocationFromParams(selectedCity, selectedDistrict)
      if (resolved.city && !selectedCity) {
        setSelectedCity(resolved.city)
      }
      if (resolved.provinceCode && !selectedProvinceCode) {
        setSelectedProvinceCode(resolved.provinceCode)
      }
      if (resolved.districtCode && !selectedDistrictCode) {
        setSelectedDistrictCode(resolved.districtCode)
      }
    }
  }, [
    selectedDistrict,
    selectedCity,
    selectedProvinceCode,
    selectedDistrictCode,
    setSelectedCity,
    setSelectedProvinceCode,
    setSelectedDistrictCode,
  ])

  // 2. Auto-sync selectedCity with fetched provinces from API
  React.useEffect(() => {
    if (selectedCity && provinces.length > 0) {
      const matchedProvince = provinces.find(
        p =>
          removeVietnameseTones(p.name) ===
            removeVietnameseTones(selectedCity) ||
          removeVietnameseTones(p.name).includes(
            removeVietnameseTones(selectedCity)
          ) ||
          removeVietnameseTones(selectedCity).includes(
            removeVietnameseTones(p.name)
          )
      )
      if (matchedProvince) {
        if (selectedProvinceCode !== matchedProvince.code) {
          setSelectedProvinceCode(matchedProvince.code)
        }
        if (selectedCity !== matchedProvince.name) {
          setSelectedCity(matchedProvince.name)
        }
      }
    }
  }, [
    provinces,
    selectedCity,
    selectedProvinceCode,
    setSelectedCity,
    setSelectedProvinceCode,
  ])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-2">
        <span className="font-bold text-sm text-fg">Chọn khu vực</span>
        <button
          type="button"
          onClick={() => {
            setSelectedCity('')
            setSelectedDistrict('')
            setSelectedWard('')
            setSelectedProvinceCode(null)
            setSelectedDistrictCode(null)
          }}
          className="rounded text-xs font-semibold text-primary hover:underline cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Đặt lại
        </button>
      </div>

      <div className="space-y-3 text-left">
        {/* City / Province */}
        <div>
          <label className="text-[10px] font-bold text-muted uppercase">
            Tỉnh / Thành phố
          </label>
          <Select
            value={selectedCity || 'all'}
            onValueChange={val => {
              if (val === 'all') {
                setSelectedCity('')
                setSelectedProvinceCode(null)
              } else {
                const province = availableProvinces.find(p => p.name === val)
                setSelectedCity(val)
                setSelectedProvinceCode(province?.code ?? null)
              }
              setSelectedDistrict('')
              setSelectedDistrictCode(null)
              setSelectedWard('')
            }}
          >
            <SelectTrigger className="w-full mt-1 px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted focus:outline-none focus:border-primary cursor-pointer h-9 shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto">
              <SelectItem value="all">Chọn Tỉnh/Thành phố</SelectItem>
              {selectedCity &&
                !availableProvinces.some(p => p.name === selectedCity) && (
                  <SelectItem value={selectedCity}>{selectedCity}</SelectItem>
                )}
              {availableProvinces.map(province => (
                <SelectItem key={province.code} value={province.name}>
                  {province.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Ward */}
        {showWard ? (
          <div>
            <label className="text-[10px] font-bold text-muted uppercase">
              Phường / Xã
            </label>
            <Select
              value={selectedWard || 'all'}
              disabled={!selectedCity}
              onValueChange={val => {
                setSelectedWard(val === 'all' ? '' : val)
              }}
            >
              <SelectTrigger className="w-full mt-1 px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted focus:outline-none focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer h-9 shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                <SelectItem value="all">
                  {isLoadingWards ? 'Đang tải phường/xã...' : 'Chọn Phường/Xã'}
                </SelectItem>
                {selectedWard && !wards.some(w => w.name === selectedWard) && (
                  <SelectItem value={selectedWard}>{selectedWard}</SelectItem>
                )}
                {wards.map(ward => (
                  <SelectItem key={ward.code} value={ward.name}>
                    {ward.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => {
          onApply?.()
          onClose()
        }}
        className="px-4 py-2.5 text-xs font-bold text-white bg-primary hover:bg-primary-hover rounded-xl transition-colors w-full text-center cursor-pointer shadow-sm"
      >
        Xác nhận
      </button>
    </div>
  )
}
