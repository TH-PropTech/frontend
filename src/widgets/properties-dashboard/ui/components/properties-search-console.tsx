'use client'

import * as React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { LocationFilterModal } from './location-filter-modal'
import { PriceFilterModal } from './price-filter-modal'
import { AreaFilterModal } from './area-filter-modal'

interface PropertiesSearchConsoleProps {
  activeTab: 'single' | 'project'
  searchKeyword: string
  setSearchKeyword: (val: string) => void
  isLocationModalOpen: boolean
  setIsLocationModalOpen: (val: boolean) => void
  isPriceModalOpen: boolean
  setIsPriceModalOpen: (val: boolean) => void
  isAreaModalOpen: boolean
  setIsAreaOpen: (val: boolean) => void
  locationLabel: string
  priceLabel: string
  areaLabel: string
  activeFiltersCount: number
  setIsAdvancedDrawerOpen: (val: boolean) => void
  handleSearchSubmit: (e: React.FormEvent) => void

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

  minPrice: number | ''
  setMinPrice: (val: number | '') => void
  maxPrice: number | ''
  setMaxPrice: (val: number | '') => void

  minArea: number | ''
  setMinArea: (val: number | '') => void
  maxArea: number | ''
  setMaxArea: (val: number | '') => void

  applyLocationFilters: () => void
  revertLocationFilters: () => void
}

export function PropertiesSearchConsole({
  activeTab,
  searchKeyword,
  setSearchKeyword,
  isLocationModalOpen,
  setIsLocationModalOpen,
  isPriceModalOpen,
  setIsPriceModalOpen,
  isAreaModalOpen,
  setIsAreaOpen,
  locationLabel,
  priceLabel,
  areaLabel,
  activeFiltersCount,
  setIsAdvancedDrawerOpen,
  handleSearchSubmit,
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
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minArea,
  setMinArea,
  maxArea,
  setMaxArea,
  applyLocationFilters,
  revertLocationFilters,
}: PropertiesSearchConsoleProps): React.ReactElement {
  return (
    <section className="mx-auto -mt-10 max-w-5xl px-4 sm:px-6 relative z-30">
      <div className="rounded-[24px] lg:rounded-full bg-white border border-border shadow-[0_0_0_1px_rgba(var(--primary-rgb),0.08),0_20px_50px_rgba(var(--fg-rgb),0.12)] p-2">
        <form
          onSubmit={handleSearchSubmit}
          className={`grid grid-cols-2 items-center w-full gap-1 lg:gap-0 ${
            activeTab === 'project'
              ? 'lg:grid-cols-[1.5fr_1.2fr_1.2fr_auto_auto]'
              : 'lg:grid-cols-[1.4fr_1.1fr_1fr_1fr_auto_auto]'
          }`}
        >
          {/* Keyword Section */}
          <div className="col-span-2 lg:col-span-1 flex items-center gap-3 rounded-2xl lg:rounded-none lg:rounded-l-full hover:bg-primary/5 px-4 sm:px-5 py-2.5 transition-all cursor-text focus-within:bg-primary/5 lg:border-r lg:border-primary/15">
            <svg
              className="h-5 w-5 text-primary shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.35-4.35m1.35-5.4a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z"
              />
            </svg>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[10px] uppercase font-bold text-muted tracking-wider">
                Từ khóa
              </span>
              <input
                type="search"
                placeholder="Nhập địa điểm, tên dự án..."
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
                className="w-full bg-transparent font-semibold text-fg placeholder-subtle focus:outline-none mt-0.5 text-xs"
                autoComplete="off"
              />
            </div>
          </div>

          {/* Cascade Location Section */}
          <Popover
            open={isLocationModalOpen}
            onOpenChange={open => {
              if (!open) {
                revertLocationFilters()
              }
              setIsLocationModalOpen(open)
            }}
          >
            <PopoverTrigger asChild>
              <div className="flex items-center gap-3 rounded-2xl lg:rounded-none hover:bg-primary/5 px-4 sm:px-5 py-2.5 transition-all cursor-pointer relative group lg:border-r lg:border-primary/15">
                <svg
                  className="h-5 w-5 text-primary shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <div className="flex flex-col flex-1 min-w-0 select-none">
                  <span className="text-[10px] uppercase font-bold text-muted tracking-wider">
                    Khu vực
                  </span>
                  <span className="font-semibold text-fg text-xs mt-0.5 truncate">
                    {locationLabel}
                  </span>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-80 md:w-96 rounded-2xl border border-border bg-white p-4 shadow-xl outline-none"
              align="start"
              onOpenAutoFocus={e => e.preventDefault()}
            >
              <LocationFilterModal
                onClose={() => setIsLocationModalOpen(false)}
                onApply={applyLocationFilters}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                selectedDistrict={selectedDistrict}
                setSelectedDistrict={setSelectedDistrict}
                selectedWard={selectedWard}
                setSelectedWard={setSelectedWard}
                selectedProvinceCode={selectedProvinceCode}
                setSelectedProvinceCode={setSelectedProvinceCode}
                selectedDistrictCode={selectedDistrictCode}
                setSelectedDistrictCode={setSelectedDistrictCode}
                showWard={activeTab === 'single'}
              />
            </PopoverContent>
          </Popover>

          {/* Price Range Section */}
          <Popover open={isPriceModalOpen} onOpenChange={setIsPriceModalOpen}>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-3 rounded-2xl lg:rounded-none hover:bg-primary/5 px-4 sm:px-5 py-2.5 transition-all cursor-pointer relative group lg:border-r lg:border-primary/15">
                <svg
                  className="h-5 w-5 text-primary shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <div className="flex flex-col flex-1 min-w-0 select-none">
                  <span className="text-[10px] uppercase font-bold text-muted tracking-wider">
                    Mức giá
                  </span>
                  <span className="font-semibold text-fg text-xs mt-0.5 truncate">
                    {priceLabel}
                  </span>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-72 rounded-2xl border border-border bg-white p-4 shadow-xl outline-none"
              align="center"
            >
              <PriceFilterModal
                onClose={() => setIsPriceModalOpen(false)}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
              />
            </PopoverContent>
          </Popover>

          {/* Area Section */}
          {activeTab === 'single' && (
            <Popover open={isAreaModalOpen} onOpenChange={setIsAreaOpen}>
              <PopoverTrigger asChild>
                <div className="col-span-1 flex items-center gap-3 rounded-2xl lg:rounded-none hover:bg-primary/5 px-4 sm:px-5 py-2.5 transition-all cursor-pointer relative group lg:border-r lg:border-primary/15">
                  <svg
                    className="h-5 w-5 text-primary shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 3.75v16.5m0-16.5h16.5m-16.5 0v16.5m16.5-16.5v16.5m0-16.5H3.75m16.5 16.5H3.75m16.5 0V3.75"
                    />
                  </svg>
                  <div className="flex flex-col flex-1 min-w-0 select-none">
                    <span className="text-[10px] uppercase font-bold text-muted tracking-wider">
                      Diện tích
                    </span>
                    <span className="font-semibold text-fg text-xs mt-0.5 truncate">
                      {areaLabel}
                    </span>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent
                className="w-72 rounded-2xl border border-border bg-white p-4 shadow-xl outline-none"
                align="end"
              >
                <AreaFilterModal
                  onClose={() => setIsAreaOpen(false)}
                  minArea={minArea}
                  setMinArea={setMinArea}
                  maxArea={maxArea}
                  setMaxArea={setMaxArea}
                />
              </PopoverContent>
            </Popover>
          )}

          {/* Advanced Filters Button */}
          <div
            className={`${activeTab === 'project' ? 'col-span-2 lg:col-span-1' : 'col-span-1'} px-3 py-1 flex justify-center`}
          >
            <button
              type="button"
              onClick={() => setIsAdvancedDrawerOpen(true)}
              className={`flex min-h-11 w-full lg:w-auto items-center justify-center gap-2 px-4 py-2.5 lg:min-h-0 rounded-xl border font-bold text-xs transition-all cursor-pointer ${
                activeFiltersCount > 0
                  ? 'border-primary bg-primary-soft text-primary'
                  : 'border-border bg-white text-muted hover:bg-surface-muted'
              }`}
            >
              <svg
                className="h-4 w-4"
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
              <span>Lọc thêm</span>
              {activeFiltersCount > 0 && (
                <span className="bg-primary text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Submit button */}
          <div className="col-span-2 lg:col-span-1 px-3 py-1 flex justify-center lg:justify-end">
            <button
              type="submit"
              className="flex h-11 w-full lg:h-11 lg:w-11 items-center justify-center gap-2 rounded-[12px] lg:rounded-full bg-primary text-white shadow-md hover:bg-primary-hover hover:scale-[1.02] lg:hover:scale-105 active:scale-95 transition-all duration-200 shrink-0 cursor-pointer"
              aria-label="Tìm kiếm căn hộ"
            >
              <svg
                className="h-5 w-5 shrink-0 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-4.35-4.35m1.35-5.4a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z"
                />
              </svg>
              <span className="lg:hidden text-xs font-bold">Tìm kiếm</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
