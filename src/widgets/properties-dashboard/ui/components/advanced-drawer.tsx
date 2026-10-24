'use client'

import * as React from 'react'
import { AmenitiesSelector } from './amenities-selector'

interface AdvancedDrawerProps {
  activeTab?: 'single' | 'project'
  isOpen: boolean
  onClose: () => void
  onApply: () => void
  bedroomsFilter: number | 'all'
  setBedroomsFilter: (val: number | 'all') => void
  bathroomsFilter: number | 'all'
  setBathroomsFilter: (val: number | 'all') => void
  directionFilter: string
  setDirectionFilter: (val: string) => void
  balconyDirectionFilter: string
  setBalconyDirectionFilter: (val: string) => void
  furnitureFilter: string
  setFurnitureFilter: (val: string) => void
  moveInTimeFilter: string
  setMoveInTimeFilter: (val: string) => void
  electricityPriceFilter: string
  setElectricityPriceFilter: (val: string) => void
  waterPriceFilter: string
  setWaterPriceFilter: (val: string) => void
  internetPriceFilter: string
  setInternetPriceFilter: (val: string) => void
  isVerifiedOnly: boolean
  setIsVerifiedOnly: (val: boolean) => void
  hasMediaOnly: boolean
  setHasMediaOnly: (val: boolean) => void
  selectedAmenities: string[]
  setSelectedAmenities: (val: string[]) => void
  resetFilters: () => void
  totalCount: number
}

export function AdvancedDrawer({
  activeTab = 'single',
  isOpen,
  onClose,
  onApply,
  bedroomsFilter,
  setBedroomsFilter,
  bathroomsFilter,
  setBathroomsFilter,
  directionFilter,
  setDirectionFilter,
  balconyDirectionFilter,
  setBalconyDirectionFilter,
  furnitureFilter,
  setFurnitureFilter,
  moveInTimeFilter,
  setMoveInTimeFilter,
  electricityPriceFilter,
  setElectricityPriceFilter,
  waterPriceFilter,
  setWaterPriceFilter,
  internetPriceFilter,
  setInternetPriceFilter,
  isVerifiedOnly,
  setIsVerifiedOnly,
  hasMediaOnly,
  setHasMediaOnly,
  selectedAmenities,
  setSelectedAmenities,
  resetFilters,
  totalCount,
}: AdvancedDrawerProps): React.ReactElement | null {
  React.useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Advanced Drawer Overlay Backdrop */}
      {isOpen && (
        <div
          role="presentation"
          aria-hidden="true"
          className="fixed inset-0 z-[99] bg-fg/40 backdrop-blur-sm transition-opacity duration-300 cursor-pointer"
          onClick={onClose}
        />
      )}

      {/* Advanced Drawer Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Bộ lọc nâng cao"
        className={`fixed inset-y-0 right-0 z-[100] w-full max-w-md bg-white border-l border-border shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-surface-muted">
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
            <span className="font-display font-bold text-base text-fg">
              Bộ lọc nâng cao
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-muted hover:bg-border/40 hover:text-fg transition-colors cursor-pointer"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content (Scrollable body) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar text-left">
          {/* Rooms configuration */}
          <div className="space-y-3 border-t border-border/60 pt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
              Cơ cấu phòng ngủ & WC
            </h3>

            {/* Bedrooms */}
            <div>
              <label className="text-xs font-bold text-muted block mb-1.5">
                Số phòng ngủ
              </label>
              <div className="flex gap-1.5">
                {['all', 1, 2, 3, 4].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setBedroomsFilter(val as number | 'all')}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      bedroomsFilter === val
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-white text-fg border-border hover:bg-surface-muted'
                    }`}
                  >
                    {val === 'all'
                      ? 'Tất cả'
                      : val === 4
                        ? '4+ PN'
                        : `${val} PN`}
                  </button>
                ))}
              </div>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="text-xs font-bold text-muted block mb-1.5">
                Số phòng tắm, vệ sinh
              </label>
              <div className="flex gap-1.5">
                {['all', 1, 2, 3, 4].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setBathroomsFilter(val as number | 'all')}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      bathroomsFilter === val
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-white text-fg border-border hover:bg-surface-muted'
                    }`}
                  >
                    {val === 'all'
                      ? 'Tất cả'
                      : val === 4
                        ? '4+ WC'
                        : `${val} WC`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Orientations */}
          {activeTab === 'single' && (
            <div className="space-y-3 border-t border-border/60 pt-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
                Hướng nhà & ban công
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-muted block mb-1.5">
                    Hướng nhà chính
                  </label>
                  <select
                    value={directionFilter}
                    onChange={e => setDirectionFilter(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-white focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="all">Tất cả hướng</option>
                    {[
                      'Đông',
                      'Tây',
                      'Nam',
                      'Bắc',
                      'Đông Bắc',
                      'Đông Nam',
                      'Tây Bắc',
                      'Tây Nam',
                    ].map(dir => (
                      <option key={dir} value={dir}>
                        {dir}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-muted block mb-1.5">
                    Hướng ban công
                  </label>
                  <select
                    value={balconyDirectionFilter}
                    onChange={e => setBalconyDirectionFilter(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-white focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="all">Tất cả hướng</option>
                    {[
                      'Đông',
                      'Tây',
                      'Nam',
                      'Bắc',
                      'Đông Bắc',
                      'Đông Nam',
                      'Tây Bắc',
                      'Tây Nam',
                    ].map(dir => (
                      <option key={dir} value={dir}>
                        {dir}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Furniture & Timing */}
          {activeTab === 'single' && (
            <div className="space-y-3 border-t border-border/60 pt-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
                Nội thất & Bàn giao
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-muted block mb-1.5">
                    Nội thất
                  </label>
                  <select
                    value={furnitureFilter}
                    onChange={e => setFurnitureFilter(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-white focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="all">Tất cả trạng thái</option>
                    {['Đầy đủ', 'Cơ bản', 'Không nội thất', 'Cao cấp'].map(
                      f => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-muted block mb-1.5">
                    Thời gian nhận nhà
                  </label>
                  <select
                    value={moveInTimeFilter}
                    onChange={e => setMoveInTimeFilter(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-white focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="all">Linh hoạt</option>
                    {[
                      'Ngay lập tức',
                      'Trong tháng này',
                      'Tháng sau',
                      'Linh hoạt',
                    ].map(t => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Living Costs (Utility profiles) */}
          {activeTab === 'single' && (
            <div className="space-y-3 border-t border-border/60 pt-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
                Biểu phí sinh hoạt
              </h3>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="font-semibold text-muted">Mức giá điện</span>
                  <select
                    value={electricityPriceFilter}
                    onChange={e => setElectricityPriceFilter(e.target.value)}
                    className="w-40 px-2 py-1.5 font-bold rounded-lg border border-border bg-white focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="all">Tất cả</option>
                    {['Giá nhà nước', 'Giá kinh doanh', 'Tự thỏa thuận'].map(
                      t => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="font-semibold text-muted">Mức giá nước</span>
                  <select
                    value={waterPriceFilter}
                    onChange={e => setWaterPriceFilter(e.target.value)}
                    className="w-40 px-2 py-1.5 font-bold rounded-lg border border-border bg-white focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="all">Tất cả</option>
                    {['Giá nhà nước', 'Giá kinh doanh', 'Tự thỏa thuận'].map(
                      t => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="font-semibold text-muted">
                    Giá thuê Internet
                  </span>
                  <select
                    value={internetPriceFilter}
                    onChange={e => setInternetPriceFilter(e.target.value)}
                    className="w-40 px-2 py-1.5 font-bold rounded-lg border border-border bg-white focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="all">Tất cả</option>
                    {['Miễn phí', 'Cố định', 'Tự lắp'].map(t => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Verification and Media */}
          {activeTab === 'single' && (
            <div className="space-y-3 border-t border-border/60 pt-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
                Thông tin kiểm duyệt
              </h3>
              <div className="space-y-2.5">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold text-muted">
                    Chỉ hiển thị Tin xác thực
                  </span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={isVerifiedOnly}
                      onChange={e => setIsVerifiedOnly(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-border rounded-full peer peer-focus:ring-2 peer-focus:ring-primary/20 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                  </div>
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold text-muted">
                    Tin có hình ảnh / video
                  </span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={hasMediaOnly}
                      onChange={e => setHasMediaOnly(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-border rounded-full peer peer-focus:ring-2 peer-focus:ring-primary/20 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                  </div>
                </label>
              </div>
            </div>
          )}

          <AmenitiesSelector
            selectedAmenities={selectedAmenities}
            setSelectedAmenities={setSelectedAmenities}
          />
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-border bg-surface-muted flex gap-3">
          <button
            type="button"
            onClick={resetFilters}
            className="flex-1 py-3 border border-border rounded-xl font-bold text-xs text-muted bg-white hover:bg-border/20 transition-all active:scale-98 cursor-pointer"
          >
            Đặt lại bộ lọc
          </button>
          <button
            type="button"
            onClick={onApply}
            className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-xs hover:bg-primary-hover transition-all active:scale-98 shadow-md cursor-pointer"
          >
            Áp dụng ({totalCount})
          </button>
        </div>
      </div>
    </>
  )
}
