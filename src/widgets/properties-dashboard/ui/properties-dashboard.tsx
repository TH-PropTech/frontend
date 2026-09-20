'use client'

import * as React from 'react'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Footer } from '@/shared/ui/footer'
import { usePropertiesFilters } from '../lib/use-properties-filters'
import { PropertiesHero } from './components/properties-hero'
import { ApartmentCard } from './components/apartment-card'
import { PropertiesSearchConsole } from './components/properties-search-console'
import { AdvancedDrawer } from './components/advanced-drawer'
import { PropertiesMap } from './components/properties-map'
import { CompareModal } from './components/compare-modal'
import { ProjectGridView } from './components/project-grid-view'
import { LandlordActionBar } from './components/landlord-action-bar'
import { SavedSearchControl } from './components/saved-search-control'
import type { SavedSearchFilters } from '@/features/saved-searches'
import { toast } from 'sonner'

export function PropertiesDashboard(): React.ReactElement {
  const {
    activeTab,
    setActiveTab,
    searchKeyword,
    setSearchKeyword,
    searchStatus,
    setSearchStatus,
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
    filteredApiProjects,
    filteredApartments,
    apartmentsError,
    locationLabel,
    priceLabel,
    areaLabel,
    apiProjects,
    isLoadingProjects,
    apiBuildings,
    isLoadingBuildings,
    selectedApiProjectId,
    setSelectedApiProjectId,
    selectedBuildingId,
    setSelectedBuildingId,
    applyAdvancedFilters,
    revertAdvancedFilters,
    draftCount,
    applyLocationFilters,
    revertLocationFilters,
    triggerSearch,
  } = usePropertiesFilters()

  const selectedBuildingName = React.useMemo(() => {
    if (!selectedBuildingId) return null
    const found = filteredApartments.find(
      apt => apt.buildingId === selectedBuildingId
    )
    if (found) return found.buildingName
    const foundApi = apiBuildings.find(b => b.id === selectedBuildingId)
    if (foundApi) return foundApi.name
    return 'Tòa nhà'
  }, [selectedBuildingId, filteredApartments, apiBuildings])

  const [isLocationModalOpen, setIsLocationModalOpen] = React.useState(false)
  const [isPriceModalOpen, setIsPriceModalOpen] = React.useState(false)
  const [isAreaModalOpen, setIsAreaOpen] = React.useState(false)
  const [isAdvancedDrawerOpen, setIsAdvancedDrawerOpen] = React.useState(false)
  const [viewMode, setViewMode] = React.useState<'list' | 'map'>('list')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedMapApt, setSelectedMapApt] = React.useState<any>(null)

  // Compare states
  const [compareIds, setCompareIds] = React.useState<string[]>([])
  const [showCompareModal, setShowCompareModal] = React.useState(false)

  const compareApartments = React.useMemo(() => {
    return filteredApartments.filter(apt => compareIds.includes(apt.id))
  }, [compareIds, filteredApartments])

  const savedSearchFilters = React.useMemo<SavedSearchFilters>(
    () => ({
      ...(selectedCity ? { city: selectedCity } : {}),
      ...(selectedDistrict ? { district: selectedDistrict } : {}),
      ...(selectedWard ? { ward: selectedWard } : {}),
      ...(minPrice !== '' ? { minPrice } : {}),
      ...(maxPrice !== '' ? { maxPrice } : {}),
      ...(minArea !== '' ? { minArea } : {}),
      ...(maxArea !== '' ? { maxArea } : {}),
      ...(bedroomsFilter !== 'all' ? { bedrooms: bedroomsFilter } : {}),
      ...(bathroomsFilter !== 'all' ? { bathrooms: bathroomsFilter } : {}),
      ...(selectedAmenities.length > 0 ? { amenities: selectedAmenities } : {}),
      ...(furnitureFilter !== 'all' ? { furniture: furnitureFilter } : {}),
      ...(moveInTimeFilter !== 'all' ? { moveInTime: moveInTimeFilter } : {}),
    }),
    [
      bathroomsFilter,
      bedroomsFilter,
      furnitureFilter,
      maxArea,
      maxPrice,
      minArea,
      minPrice,
      moveInTimeFilter,
      selectedAmenities,
      selectedCity,
      selectedDistrict,
      selectedWard,
    ]
  )

  const handleToggleCompare = (id: string): void => {
    setCompareIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id)
      } else {
        if (prev.length >= 4) {
          toast.warning('Chỉ có thể chọn tối đa 4 căn hộ để so sánh.')
          return prev
        }
        return [...prev, id]
      }
    })
  }

  const handleSearchSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    triggerSearch()
    setIsLocationModalOpen(false)
    setIsPriceModalOpen(false)
    setIsAreaOpen(false)
    const trimmed = searchKeyword.trim()
    let statusText = 'Đang hiển thị kết quả lọc.'
    if (trimmed) {
      statusText = `Đang lọc theo "${trimmed}"...`
      toast.info(`Tìm kiếm: "${trimmed}"`, {
        description: 'Đã cập nhật danh sách căn hộ theo từ khóa tìm kiếm.',
      })
    } else {
      toast.info('Đã tải lại toàn bộ danh sách căn hộ.')
    }
    setSearchStatus(statusText)
  }

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-primary/20 selection:text-primary relative overflow-x-hidden">
      <HomeHeader />

      <main className="w-full pb-20">
        <PropertiesHero />

        {!selectedApiProjectId && (
          <>
            <PropertiesSearchConsole
              activeTab={activeTab}
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              isLocationModalOpen={isLocationModalOpen}
              setIsLocationModalOpen={setIsLocationModalOpen}
              isPriceModalOpen={isPriceModalOpen}
              setIsPriceModalOpen={setIsPriceModalOpen}
              isAreaModalOpen={isAreaModalOpen}
              setIsAreaOpen={setIsAreaOpen}
              locationLabel={locationLabel}
              priceLabel={priceLabel}
              areaLabel={areaLabel}
              activeFiltersCount={activeFiltersCount}
              setIsAdvancedDrawerOpen={setIsAdvancedDrawerOpen}
              handleSearchSubmit={handleSearchSubmit}
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
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              minArea={minArea}
              setMinArea={setMinArea}
              maxArea={maxArea}
              setMaxArea={setMaxArea}
              applyLocationFilters={applyLocationFilters}
              revertLocationFilters={revertLocationFilters}
            />
            <SavedSearchControl filters={savedSearchFilters} />
          </>
        )}

        <section className="mx-auto max-w-lg mt-12 px-6">
          <div className="flex rounded-full bg-surface-muted p-1 border border-border">
            <button
              onClick={() => {
                setActiveTab('single')
                setSearchStatus('')
                setSelectedApiProjectId(null)
                setSelectedBuildingId(null)
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
                setSelectedApiProjectId(null)
                setSelectedBuildingId(null)
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

        <section className="mx-auto max-w-6xl px-6 py-12 md:px-10">
          <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-2">
              <span className="font-display text-xs font-bold uppercase tracking-widest text-primary">
                KẾT QUẢ TÌM KIẾM
              </span>
              <h2 className="font-marketing text-3xl font-bold text-fg sm:text-4xl">
                {activeTab === 'single'
                  ? selectedBuildingId
                    ? `Căn hộ tại ${selectedBuildingName} (${filteredApartments.length})`
                    : `Căn hộ khả dụng (${filteredApartments.length})`
                  : selectedApiProjectId
                    ? `Tòa nhà trong dự án (${apiBuildings.length})`
                    : `Dự án từ Chủ đầu tư (${apiProjects.length > 0 ? apiProjects.length : filteredProjects.length})`}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              {searchStatus && (
                <p className="font-mono text-xs font-semibold text-primary animate-pulse-subtle bg-primary/10 px-3.5 py-1.5 rounded-full">
                  {searchStatus}
                </p>
              )}
              {activeTab === 'single' && selectedBuildingId && (
                <button
                  type="button"
                  onClick={() => setSelectedBuildingId(null)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-primary/20 bg-primary/5 text-xs font-bold text-primary hover:bg-primary/10 transition-all cursor-pointer shadow-sm"
                >
                  <svg
                    className="h-3.5 w-3.5"
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
                  Xóa lọc theo tòa nhà
                </button>
              )}
              {activeTab === 'project' && selectedApiProjectId && (
                <button
                  type="button"
                  onClick={() => setSelectedApiProjectId(null)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-white text-xs font-bold text-muted hover:bg-surface-muted hover:text-fg transition-all cursor-pointer"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                  </svg>
                  Quay lại danh sách dự án
                </button>
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
                  Danh sách
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
                  Bản đồ
                </button>
              </div>
            </div>
          </div>

          <LandlordActionBar />

          {activeTab === 'single' && apartmentsError ? (
            <div
              role="alert"
              className="mb-6 rounded-2xl border border-danger/30 bg-danger/10 p-4 text-sm text-danger"
            >
              Không thể tải danh sách căn hộ từ máy chủ. Vui lòng kiểm tra kết
              nối và thử lại.
            </div>
          ) : null}

          {viewMode === 'map' ? (
            <PropertiesMap
              activeTab={activeTab}
              filteredApartments={filteredApartments}
              filteredProjects={filteredProjects}
              selectedMapApt={selectedMapApt}
              setSelectedMapApt={setSelectedMapApt}
            />
          ) : activeTab === 'single' ? (
            filteredApartments.length === 0 ? (
              <div className="text-center py-20 rounded-3xl border border-dashed border-border bg-surface-muted/40">
                <p className="font-body text-sm text-muted">
                  Không tìm thấy căn hộ phù hợp với bộ lọc hiện tại.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filteredApartments.map(apt => (
                  <ApartmentCard
                    key={apt.id}
                    apt={apt}
                    showCompareCheckbox={true}
                    isSelected={compareIds.includes(apt.id)}
                    onToggleCompare={() => handleToggleCompare(apt.id)}
                    disableCompare={compareIds.length >= 4}
                  />
                ))}
              </div>
            )
          ) : (
            <ProjectGridView
              selectedApiProjectId={selectedApiProjectId}
              setSelectedApiProjectId={setSelectedApiProjectId}
              apiProjects={apiProjects}
              filteredApiProjects={filteredApiProjects}
              isLoadingProjects={isLoadingProjects}
              apiBuildings={apiBuildings}
              isLoadingBuildings={isLoadingBuildings}
              setSelectedBuildingId={setSelectedBuildingId}
              setActiveTab={setActiveTab}
              filteredProjects={filteredProjects}
            />
          )}
        </section>
      </main>

      <Footer />

      <AdvancedDrawer
        activeTab={activeTab}
        isOpen={isAdvancedDrawerOpen}
        onClose={() => {
          revertAdvancedFilters()
          setIsAdvancedDrawerOpen(false)
        }}
        onApply={() => {
          applyAdvancedFilters()
          setIsAdvancedDrawerOpen(false)
        }}
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
        totalCount={draftCount}
      />

      {/* Floating Compare Action Bar for Guest and Authenticated Users */}
      {compareIds.length >= 2 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-surface/95 backdrop-blur-md border border-border-strong text-fg px-6 py-4 rounded-2xl shadow-2xl flex items-center justify-between gap-8 z-[999] w-[90%] max-w-xl animate-in slide-in-from-bottom duration-300">
          <div className="space-y-0.5">
            <p className="font-marketing text-xs font-bold text-fg flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
              Đã chọn {compareIds.length}/4 căn hộ. Chọn tối thiểu 2 để đối
              chiếu.
            </p>
            <p className="font-body text-[10px] text-fg/70 font-medium">
              Hỗ trợ cả khách vãng lai chưa cần tài khoản
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setCompareIds([])}
              className="px-4 py-2 border border-border-strong rounded-xl text-xs font-bold text-fg/85 hover:text-danger hover:bg-surface-muted transition-all cursor-pointer"
            >
              Xóa chọn
            </button>
            <button
              onClick={() => setShowCompareModal(true)}
              className="px-5 py-2 bg-primary rounded-xl text-xs font-bold text-white hover:bg-primary-hover transition-all cursor-pointer shadow-md shadow-primary/10"
            >
              So sánh ngay
            </button>
          </div>
        </div>
      )}

      {/* Compare Modal Panel */}
      <CompareModal
        show={showCompareModal}
        onClose={() => setShowCompareModal(false)}
        compareApartments={compareApartments}
      />
    </div>
  )
}
