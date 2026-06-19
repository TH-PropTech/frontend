'use client'

import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'

interface LocationFilterModalProps {
  activeTab?: 'single' | 'project'
  onClose: () => void
  onApply?: () => void
  selectedCity: string
  setSelectedCity: (val: string) => void
  selectedDistrict: string
  setSelectedDistrict: (val: string) => void
  selectedWard: string
  setSelectedWard: (val: string) => void
  selectedStreet: string
  setSelectedStreet: (val: string) => void
  selectedProject: string
  setSelectedProject: (val: string) => void
  locationData: Record<
    string,
    Record<
      string,
      {
        wards: string[]
        streets: string[]
        projects: string[]
      }
    >
  >
}

export function LocationFilterModal({
  activeTab = 'single',
  onClose,
  onApply,
  selectedCity,
  setSelectedCity,
  selectedDistrict,
  setSelectedDistrict,
  selectedWard,
  setSelectedWard,
  selectedStreet,
  setSelectedStreet,
  selectedProject,
  setSelectedProject,
  locationData,
}: LocationFilterModalProps): React.ReactElement {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-2">
        <span className="font-bold text-sm text-fg">Chọn khu vực & dự án</span>
        <button
          type="button"
          onClick={() => {
            setSelectedCity('')
            setSelectedDistrict('')
            setSelectedWard('')
            setSelectedStreet('')
            setSelectedProject('')
          }}
          className="text-xs font-semibold text-primary hover:underline cursor-pointer"
        >
          Đặt lại
        </button>
      </div>

      <div className="space-y-3 text-left">
        {/* City */}
        <div>
          <label className="text-[10px] font-bold text-muted uppercase">
            Tỉnh / Thành phố
          </label>
          <Select
            value={selectedCity || 'all'}
            onValueChange={val => {
              setSelectedCity(val === 'all' ? '' : val)
              setSelectedDistrict('')
              setSelectedWard('')
              setSelectedStreet('')
              setSelectedProject('')
            }}
          >
            <SelectTrigger className="w-full mt-1 px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted focus:outline-none focus:border-primary cursor-pointer h-9 shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto">
              <SelectItem value="all">Chọn Tỉnh/Thành phố</SelectItem>
              {Object.keys(locationData).map(city => (
                <SelectItem key={city} value={city}>
                  {city}
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
              setSelectedDistrict(val === 'all' ? '' : val)
              setSelectedWard('')
              setSelectedStreet('')
              setSelectedProject('')
            }}
          >
            <SelectTrigger className="w-full mt-1 px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted focus:outline-none focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer h-9 shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto">
              <SelectItem value="all">Chọn Quận/Huyện</SelectItem>
              {selectedCity &&
                locationData[selectedCity] &&
                Object.keys(locationData[selectedCity]).map(dist => (
                  <SelectItem key={dist} value={dist}>
                    {dist}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Ward */}
        {activeTab === 'single' && (
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
                <SelectItem value="all">Chọn Phường/Xã</SelectItem>
                {selectedCity &&
                  selectedDistrict &&
                  locationData[selectedCity]?.[selectedDistrict] &&
                  locationData[selectedCity][selectedDistrict].wards.map(
                    ward => (
                      <SelectItem key={ward} value={ward}>
                        {ward}
                      </SelectItem>
                    )
                  )}
              </SelectContent>
            </Select>
          </div>
        )}

        {activeTab === 'single' && (
          <div className="grid grid-cols-2 gap-2">
            {/* Street */}
            <div>
              <label className="text-[10px] font-bold text-muted uppercase">
                Đường / Phố
              </label>
              <Select
                value={selectedStreet || 'all'}
                disabled={!selectedDistrict}
                onValueChange={val => {
                  setSelectedStreet(val === 'all' ? '' : val)
                  setSelectedProject('')
                }}
              >
                <SelectTrigger className="w-full mt-1 px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted focus:outline-none focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer h-9 shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  <SelectItem value="all">Chọn Đường</SelectItem>
                  {selectedCity &&
                    selectedDistrict &&
                    locationData[selectedCity]?.[selectedDistrict] &&
                    locationData[selectedCity][selectedDistrict].streets.map(
                      street => (
                        <SelectItem key={street} value={street}>
                          {street}
                        </SelectItem>
                      )
                    )}
                </SelectContent>
              </Select>
            </div>

            {/* Project */}
            <div>
              <label className="text-[10px] font-bold text-muted uppercase">
                Dự án
              </label>
              <Select
                value={selectedProject || 'all'}
                disabled={!selectedDistrict}
                onValueChange={val => {
                  setSelectedProject(val === 'all' ? '' : val)
                  setSelectedStreet('')
                }}
              >
                <SelectTrigger className="w-full mt-1 px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted focus:outline-none focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer h-9 shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  <SelectItem value="all">Chọn Dự án</SelectItem>
                  {selectedCity &&
                    selectedDistrict &&
                    locationData[selectedCity]?.[selectedDistrict] &&
                    locationData[selectedCity][selectedDistrict].projects.map(
                      project => (
                        <SelectItem key={project} value={project}>
                          {project}
                        </SelectItem>
                      )
                    )}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
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
