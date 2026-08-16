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
}

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
}: LocationFilterModalProps): React.ReactElement {
  const {
    provinces,
    districts,
    wards,
    isLoadingProvinces,
    isLoadingDistricts,
    isLoadingWards,
  } = useVietnamLocations(selectedProvinceCode, selectedDistrictCode)

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
          className="text-xs font-semibold text-primary hover:underline cursor-pointer"
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
                const province = provinces.find(p => p.name === val)
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
              <SelectItem value="all">
                {isLoadingProvinces ? 'Đang tải...' : 'Chọn Tỉnh/Thành phố'}
              </SelectItem>
              {provinces.map(province => (
                <SelectItem key={province.code} value={province.name}>
                  {province.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* District */}
        <div>
          <label className="text-[10px] font-bold text-muted uppercase">
            Quận / Huyện
          </label>
          <Select
            value={selectedDistrict || 'all'}
            disabled={!selectedCity}
            onValueChange={val => {
              if (val === 'all') {
                setSelectedDistrict('')
                setSelectedDistrictCode(null)
              } else {
                const district = districts.find(d => d.name === val)
                setSelectedDistrict(val)
                setSelectedDistrictCode(district?.code ?? null)
              }
              setSelectedWard('')
            }}
          >
            <SelectTrigger className="w-full mt-1 px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted focus:outline-none focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer h-9 shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto">
              <SelectItem value="all">
                {isLoadingDistricts ? 'Đang tải...' : 'Chọn Quận/Huyện'}
              </SelectItem>
              {districts.map(district => (
                <SelectItem key={district.code} value={district.name}>
                  {district.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Ward */}
        <div>
          <label className="text-[10px] font-bold text-muted uppercase">
            Phường / Xã
          </label>
          <Select
            value={selectedWard || 'all'}
            disabled={!selectedDistrict}
            onValueChange={val => {
              setSelectedWard(val === 'all' ? '' : val)
            }}
          >
            <SelectTrigger className="w-full mt-1 px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted focus:outline-none focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer h-9 shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto">
              <SelectItem value="all">
                {isLoadingWards ? 'Đang tải...' : 'Chọn Phường/Xã'}
              </SelectItem>
              {wards.map(ward => (
                <SelectItem key={ward.code} value={ward.name}>
                  {ward.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
