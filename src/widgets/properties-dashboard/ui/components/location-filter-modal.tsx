'use client'

import * as React from 'react'

interface LocationFilterModalProps {
  isOpen: boolean
  onClose: () => void
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
  isOpen,
  onClose,
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
}: LocationFilterModalProps): React.ReactElement | null {
  if (!isOpen) return null

  return (
    <div
      className="absolute left-0 top-[100%] mt-2 z-50 w-80 md:w-96 rounded-2xl border border-border bg-white p-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150 space-y-4"
      onClick={e => e.stopPropagation()}
    >
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
          <select
            value={selectedCity}
            onChange={e => {
              setSelectedCity(e.target.value)
              setSelectedDistrict('')
              setSelectedWard('')
              setSelectedStreet('')
              setSelectedProject('')
            }}
            className="w-full mt-1 px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted focus:outline-none focus:border-primary cursor-pointer"
          >
            <option value="">Chọn Tỉnh/Thành phố</option>
            {Object.keys(locationData).map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="text-[10px] font-bold text-muted uppercase">
            Quận / Huyện
          </label>
          <select
            value={selectedDistrict}
            disabled={!selectedCity}
            onChange={e => {
              setSelectedDistrict(e.target.value)
              setSelectedWard('')
              setSelectedStreet('')
              setSelectedProject('')
            }}
            className="w-full mt-1 px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted focus:outline-none focus:border-primary disabled:opacity-50 cursor-pointer"
          >
            <option value="">Chọn Quận/Huyện</option>
            {selectedCity &&
              locationData[selectedCity] &&
              Object.keys(locationData[selectedCity]).map(dist => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
          </select>
        </div>

        {/* Ward */}
        <div>
          <label className="text-[10px] font-bold text-muted uppercase">
            Phường / Xã
          </label>
          <select
            value={selectedWard}
            disabled={!selectedDistrict}
            onChange={e => {
              setSelectedWard(e.target.value)
            }}
            className="w-full mt-1 px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted focus:outline-none focus:border-primary disabled:opacity-50 cursor-pointer"
          >
            <option value="">Chọn Phường/Xã</option>
            {selectedCity &&
              selectedDistrict &&
              locationData[selectedCity]?.[selectedDistrict] &&
              locationData[selectedCity][selectedDistrict].wards.map(ward => (
                <option key={ward} value={ward}>
                  {ward}
                </option>
              ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Street */}
          <div>
            <label className="text-[10px] font-bold text-muted uppercase">
              Đường / Phố
            </label>
            <select
              value={selectedStreet}
              disabled={!selectedDistrict}
              onChange={e => {
                setSelectedStreet(e.target.value)
                setSelectedProject('')
              }}
              className="w-full mt-1 px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted focus:outline-none focus:border-primary disabled:opacity-50 cursor-pointer"
            >
              <option value="">Chọn Đường</option>
              {selectedCity &&
                selectedDistrict &&
                locationData[selectedCity]?.[selectedDistrict] &&
                locationData[selectedCity][selectedDistrict].streets.map(
                  street => (
                    <option key={street} value={street}>
                      {street}
                    </option>
                  )
                )}
            </select>
          </div>

          {/* Project */}
          <div>
            <label className="text-[10px] font-bold text-muted uppercase">
              Dự án
            </label>
            <select
              value={selectedProject}
              disabled={!selectedDistrict}
              onChange={e => {
                setSelectedProject(e.target.value)
                setSelectedStreet('')
              }}
              className="w-full mt-1 px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted focus:outline-none focus:border-primary disabled:opacity-50 cursor-pointer"
            >
              <option value="">Chọn Dự án</option>
              {selectedCity &&
                selectedDistrict &&
                locationData[selectedCity]?.[selectedDistrict] &&
                locationData[selectedCity][selectedDistrict].projects.map(
                  project => (
                    <option key={project} value={project}>
                      {project}
                    </option>
                  )
                )}
            </select>
          </div>
        </div>
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
