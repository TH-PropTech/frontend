'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Footer } from '@/shared/ui/footer'
import { locationData } from '@/entities/properties'
import { usePropertiesFilters } from '../lib/use-properties-filters'
import { PropertiesHero } from './components/properties-hero'
import { ApartmentCard } from './components/apartment-card'
import { ProjectCard } from './components/project-card'
import { LocationFilterModal } from './components/location-filter-modal'
import { PriceFilterModal } from './components/price-filter-modal'
import { AreaFilterModal } from './components/area-filter-modal'
import { AdvancedDrawer } from './components/advanced-drawer'

export function PropertiesDashboard(): React.ReactElement {
  const {
    activeTab,
    setActiveTab,
    searchKeyword,
    setSearchKeyword,
    searchStatus,
    setSearchStatus,
    selectedType,
    setSelectedType,
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
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    minArea,
    setMinArea,
    maxArea,
    setMaxArea,
    isVerifiedOnly,
    setIsVerifiedOnly,
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
    selectedAmenities,
    setSelectedAmenities,
    hasMediaOnly,
    setHasMediaOnly,
    resetFilters,
    activeFiltersCount,
    filteredProjects,
    filteredApartments,
    locationLabel,
    priceLabel,
    areaLabel,
  } = usePropertiesFilters()

  // Dropdown & Modal UI Open States
  const [isLocationModalOpen, setIsLocationModalOpen] = React.useState(false)
  const [isPriceModalOpen, setIsPriceModalOpen] = React.useState(false)
  const [isAreaModalOpen, setIsAreaOpen] = React.useState(false)
  const [isAdvancedDrawerOpen, setIsAdvancedDrawerOpen] = React.useState(false)
  const [viewMode, setViewMode] = React.useState<'list' | 'map'>('list')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedMapApt, setSelectedMapApt] = React.useState<any>(null)

  const handleSearchSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    const trimmed = searchKeyword.trim()
    let statusText = 'Đang hiển thị kết quả lọc.'
    if (trimmed) {
      statusText = `Đang lọc theo "${trimmed}"...`
    }
    setSearchStatus(statusText)
  }

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-primary/20 selection:text-primary relative overflow-x-hidden">
      <HomeHeader />

      <main className="w-full">
        {/* Header Hero Section */}
        <PropertiesHero />

        {/* Search Console Container */}
        <section className="mx-auto -mt-10 max-w-5xl px-6 relative z-30">
          <div className="rounded-[24px] lg:rounded-full bg-white border border-border shadow-[0_0_0_1px_rgba(var(--primary-rgb),0.08),0_20px_50px_rgba(var(--fg-rgb),0.12)] p-2">
            <form
              onSubmit={handleSearchSubmit}
              className="grid grid-cols-1 lg:grid-cols-[1.4fr_1.1fr_1fr_1fr_auto_auto] items-center w-full gap-3 lg:gap-0"
            >
              {/* Keyword Section */}
              <div className="flex items-center gap-3 rounded-2xl lg:rounded-none lg:rounded-l-full hover:bg-primary/5 px-5 py-2.5 transition-all cursor-text focus-within:bg-primary/5 lg:border-r lg:border-primary/15">
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
              <div
                className="flex items-center gap-3 rounded-2xl lg:rounded-none hover:bg-primary/5 px-5 py-2.5 transition-all cursor-pointer relative group lg:border-r lg:border-primary/15"
                onClick={() => {
                  setIsLocationModalOpen(!isLocationModalOpen)
                  setIsPriceModalOpen(false)
                  setIsAreaOpen(false)
                }}
                onMouseLeave={() => setIsLocationModalOpen(false)}
              >
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
                    Khu vực & Dự án
                  </span>
                  <span className="font-semibold text-fg text-xs mt-0.5 truncate">
                    {locationLabel}
                  </span>
                </div>
                <LocationFilterModal
                  isOpen={isLocationModalOpen}
                  onClose={() => setIsLocationModalOpen(false)}
                  selectedCity={selectedCity}
                  setSelectedCity={setSelectedCity}
                  selectedDistrict={selectedDistrict}
                  setSelectedDistrict={setSelectedDistrict}
                  selectedWard={selectedWard}
                  setSelectedWard={setSelectedWard}
                  selectedStreet={selectedStreet}
                  setSelectedStreet={setSelectedStreet}
                  selectedProject={selectedProject}
                  setSelectedProject={setSelectedProject}
                  locationData={locationData}
                />
              </div>

              {/* Price Range Section */}
              <div
                className="flex items-center gap-3 rounded-2xl lg:rounded-none hover:bg-primary/5 px-5 py-2.5 transition-all cursor-pointer relative group lg:border-r lg:border-primary/15"
                onClick={() => {
                  setIsPriceModalOpen(!isPriceModalOpen)
                  setIsLocationModalOpen(false)
                  setIsAreaOpen(false)
                }}
                onMouseLeave={() => setIsPriceModalOpen(false)}
              >
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
                <PriceFilterModal
                  isOpen={isPriceModalOpen}
                  onClose={() => setIsPriceModalOpen(false)}
                  minPrice={minPrice}
                  setMinPrice={setMinPrice}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                />
              </div>

              {/* Area Section */}
              <div
                className="flex items-center gap-3 rounded-2xl lg:rounded-none hover:bg-primary/5 px-5 py-2.5 transition-all cursor-pointer relative group lg:border-r lg:border-primary/15"
                onClick={() => {
                  setIsAreaOpen(!isAreaModalOpen)
                  setIsLocationModalOpen(false)
                  setIsPriceModalOpen(false)
                }}
                onMouseLeave={() => setIsAreaOpen(false)}
              >
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
                <AreaFilterModal
                  isOpen={isAreaModalOpen}
                  onClose={() => setIsAreaOpen(false)}
                  minArea={minArea}
                  setMinArea={setMinArea}
                  maxArea={maxArea}
                  setMaxArea={setMaxArea}
                />
              </div>

              {/* Advanced Filters Button */}
              <div className="px-3 py-1 flex justify-center">
                <button
                  type="button"
                  onClick={() => setIsAdvancedDrawerOpen(true)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-bold text-xs transition-all cursor-pointer ${
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
              <div className="px-3 py-1 flex justify-center lg:justify-end">
                <button
                  type="submit"
                  className="flex h-11 w-full lg:h-11 lg:w-11 items-center justify-center rounded-[12px] lg:rounded-full bg-primary text-white shadow-md hover:bg-primary-hover hover:scale-105 active:scale-95 transition-all duration-200 shrink-0 cursor-pointer"
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
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Tab Switcher */}
        <section className="mx-auto max-w-lg mt-12 px-6">
          <div className="flex rounded-full bg-surface-muted p-1 border border-border">
            <button
              onClick={() => {
                setActiveTab('single')
                setSearchStatus('')
              }}
              className={`flex-1 rounded-full py-2.5 text-xs font-bold transition-all duration-300 ${
                activeTab === 'single'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-muted hover:text-fg'
              }`}
            >
              Căn hộ thuê lẻ (Chủ nhà cá nhân)
            </button>
            <button
              onClick={() => {
                setActiveTab('project')
                setSearchStatus('')
              }}
              className={`flex-1 rounded-full py-2.5 text-xs font-bold transition-all duration-300 ${
                activeTab === 'project'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-muted hover:text-fg'
              }`}
            >
              Dự án / Tòa nhà (Chủ đầu tư)
            </button>
          </div>
        </section>

        {/* Apartments & Projects Grid Listing Section */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-10">
          <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-2">
              <span className="font-display text-xs font-bold uppercase tracking-widest text-primary">
                KET QUA TIM KIEM
              </span>
              <h2 className="font-marketing text-3xl font-bold text-fg sm:text-4xl">
                {activeTab === 'single'
                  ? `Can ho kha dung (${filteredApartments.length})`
                  : `Du an & Toa nha chung cu (${filteredProjects.length})`}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              {searchStatus && (
                <p className="font-mono text-xs font-semibold text-primary animate-pulse-subtle bg-primary/10 px-3.5 py-1.5 rounded-full">
                  {searchStatus}
                </p>
              )}
              <div className="flex rounded-lg bg-surface-muted p-1 border border-border">
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-muted hover:text-fg'
                  }`}
                >
                  Danh sach
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('map')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    viewMode === 'map'
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-muted hover:text-fg'
                  }`}
                >
                  Ban do
                </button>
              </div>
            </div>
          </div>

          {viewMode === 'map' ? (
            <div className="relative border border-border rounded-3xl overflow-hidden h-[500px] bg-[#E5E9F0] shadow-sm flex">
              {/* Map grid simulation */}
              <div className="absolute inset-0 z-0">
                <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Grid lines */}
                  <defs>
                    <pattern
                      id="grid"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="#D8DEE9"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  {/* Rivers / Roads */}
                  <path
                    d="M -50 200 C 300 220, 500 120, 1000 180"
                    fill="none"
                    stroke="#81A1C1"
                    strokeWidth="24"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                  <path
                    d="M 300 -50 L 320 600"
                    fill="none"
                    stroke="#D8DEE9"
                    strokeWidth="16"
                    opacity="0.8"
                  />
                  <path
                    d="M 700 -50 L 680 600"
                    fill="none"
                    stroke="#D8DEE9"
                    strokeWidth="12"
                    opacity="0.8"
                  />
                </svg>
              </div>

              {/* Map Pins */}
              <div className="absolute inset-0 z-10">
                {activeTab === 'single'
                  ? filteredApartments.map((apt, idx) => {
                      const x = 150 + ((idx * 220) % 600)
                      const y = 100 + ((idx * 130) % 350)
                      return (
                        <button
                          key={apt.id}
                          onClick={() => setSelectedMapApt(apt)}
                          style={{ left: `${x}px`, top: `${y}px` }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
                        >
                          <div className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md group-hover:scale-110 transition-transform">
                            {apt.price}
                          </div>
                          <div className="h-2 w-2 rounded-full bg-primary border border-white mt-0.5" />
                        </button>
                      )
                    })
                  : filteredProjects.map((proj, idx) => {
                      const x = 200 + ((idx * 280) % 550)
                      const y = 120 + ((idx * 160) % 320)
                      return (
                        <button
                          key={proj.id}
                          onClick={() => setSelectedMapApt(proj)}
                          style={{ left: `${x}px`, top: `${y}px` }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
                        >
                          <div className="bg-accent-2 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md group-hover:scale-110 transition-transform">
                            {proj.title}
                          </div>
                          <div className="h-2 w-2 rounded-full bg-accent-2 border border-white mt-0.5" />
                        </button>
                      )
                    })}
              </div>

              {/* Pin Detail Popup */}
              {selectedMapApt && (
                <div className="absolute bottom-5 left-5 z-20 bg-white border border-border rounded-2xl p-4 shadow-2xl max-w-sm animate-fade-in space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                        {selectedMapApt.category || 'Du an'}
                      </span>
                      <h4 className="font-marketing text-sm font-bold text-fg line-clamp-1">
                        {selectedMapApt.title}
                      </h4>
                      <p className="text-xs text-primary font-extrabold mt-0.5">
                        {selectedMapApt.price || selectedMapApt.priceRange}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedMapApt(null)}
                      className="text-muted hover:text-fg text-xs font-bold p-1 cursor-pointer"
                    >
                      Dong
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/properties/${selectedMapApt.id}` as Route}
                      className="flex-1"
                    >
                      <button className="w-full bg-primary text-white text-[10px] font-bold rounded-lg py-1.5 hover:bg-primary-hover transition-colors cursor-pointer">
                        Xem chi tiet
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === 'single' ? (
            filteredApartments.length === 0 ? (
              <div className="text-center py-20 rounded-3xl border border-dashed border-border bg-surface-muted/40">
                <p className="font-body text-sm text-muted">
                  Khong tim thay can ho phu hop voi bo loc hien tai.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredApartments.map(apt => (
                  <ApartmentCard key={apt.id} apt={apt} />
                ))}
              </div>
            )
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20 rounded-3xl border border-dashed border-border bg-surface-muted/40">
              <p className="font-body text-sm text-muted">
                Khong tim thay du an phu hop voi bo loc hien tai.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map(proj => (
                <ProjectCard key={proj.id} proj={proj} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />

      <AdvancedDrawer
        isOpen={isAdvancedDrawerOpen}
        onClose={() => setIsAdvancedDrawerOpen(false)}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        bedroomsFilter={bedroomsFilter}
        setBedroomsFilter={setBedroomsFilter}
        bathroomsFilter={bathroomsFilter}
        setBathroomsFilter={setBathroomsFilter}
        directionFilter={directionFilter}
        setDirectionFilter={setDirectionFilter}
        balconyDirectionFilter={balconyDirectionFilter}
        setBalconyDirectionFilter={setBalconyDirectionFilter}
        furnitureFilter={furnitureFilter}
        setFurnitureFilter={setFurnitureFilter}
        moveInTimeFilter={moveInTimeFilter}
        setMoveInTimeFilter={setMoveInTimeFilter}
        electricityPriceFilter={electricityPriceFilter}
        setElectricityPriceFilter={setElectricityPriceFilter}
        waterPriceFilter={waterPriceFilter}
        setWaterPriceFilter={setWaterPriceFilter}
        internetPriceFilter={internetPriceFilter}
        setInternetPriceFilter={setInternetPriceFilter}
        isVerifiedOnly={isVerifiedOnly}
        setIsVerifiedOnly={setIsVerifiedOnly}
        hasMediaOnly={hasMediaOnly}
        setHasMediaOnly={setHasMediaOnly}
        selectedAmenities={selectedAmenities}
        setSelectedAmenities={setSelectedAmenities}
        resetFilters={resetFilters}
        totalCount={filteredApartments.length + filteredProjects.length}
      />
    </div>
  )
}
