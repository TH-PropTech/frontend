'use client'

import * as React from 'react'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Footer } from '@/shared/ui/footer'
import { usePropertiesFilters } from '../lib/use-properties-filters'
import { PropertiesHero } from './components/properties-hero'
import { ApartmentCard } from './components/apartment-card'
import { ProjectCard } from './components/project-card'
import { BuildingCard } from './components/building-card'
import { PropertiesSearchConsole } from './components/properties-search-console'
import { ApiProjectCard } from './components/api-project-card'
import { AdvancedDrawer } from './components/advanced-drawer'
import { PropertiesMap } from './components/properties-map'
import { SelectedProjectHeader } from './components/selected-project-header'
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
    filteredApiProjects,
    filteredApartments,
    locationLabel,
    priceLabel,
    areaLabel,
    // Backend API data for projects/buildings
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
    // Applied filter methods
    applyLocationFilters,
    revertLocationFilters,
    triggerSearch,
  } = usePropertiesFilters()

  // Get selected building name from apartments data
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

  const handleApplyAdvanced = (): void => {
    applyAdvancedFilters()
    setIsAdvancedDrawerOpen(false)
  }

  const handleCloseAdvanced = (): void => {
    revertAdvancedFilters()
    setIsAdvancedDrawerOpen(false)
  }

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-primary/20 selection:text-primary relative overflow-x-hidden">
      <HomeHeader />

      <main className="w-full">
        {/* Header Hero Section */}
        <PropertiesHero />

        {/* Search Console Container */}
        {!selectedApiProjectId && (
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
            selectedStreet={selectedStreet}
            setSelectedStreet={setSelectedStreet}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
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
        )}

        {/* Tab Switcher */}
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

        {/* Apartments & Projects Grid Listing Section */}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredApartments.map(apt => (
                  <ApartmentCard key={apt.id} apt={apt} />
                ))}
              </div>
            )
          ) : /* ── Tab Doanh nghiệp (project) ── */
          selectedApiProjectId ? (
            /* ── Drill-down: Show buildings for the selected project ── */
            <div>
              {/* Selected Project Header */}
              <SelectedProjectHeader
                selectedApiProjectId={selectedApiProjectId}
                apiProjects={apiProjects}
              />

              {isLoadingBuildings ? (
                <div className="text-center py-20">
                  <div className="inline-flex items-center gap-3 text-primary">
                    <svg
                      className="h-5 w-5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    <span className="font-body text-sm font-semibold">
                      Đang tải tòa nhà...
                    </span>
                  </div>
                </div>
              ) : apiBuildings.length === 0 ? (
                <div className="text-center py-20 rounded-3xl border border-dashed border-border bg-surface-muted/40">
                  <svg
                    className="mx-auto h-12 w-12 text-muted/40 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21"
                    />
                  </svg>
                  <p className="font-body text-sm text-muted">
                    Chưa có tòa nhà nào trong dự án này.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {apiBuildings.map(building => (
                    <BuildingCard
                      key={building.id}
                      building={building}
                      onSelectBuilding={bId => {
                        setSelectedBuildingId(bId)
                        setActiveTab('single')
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : /* ── Show project list (API first, fallback to mock) ── */
          isLoadingProjects ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center gap-3 text-primary">
                <svg
                  className="h-5 w-5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                <span className="font-body text-sm font-semibold">
                  Đang tải dự án...
                </span>
              </div>
            </div>
          ) : apiProjects.length > 0 ? (
            filteredApiProjects.length === 0 ? (
              <div className="text-center py-20 rounded-3xl border border-dashed border-border bg-surface-muted/40">
                <p className="font-body text-sm text-muted">
                  Không tìm thấy dự án phù hợp với bộ lọc hiện tại.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredApiProjects.map(proj => (
                  <ApiProjectCard
                    key={proj.id}
                    project={proj}
                    onSelect={() => setSelectedApiProjectId(proj.id)}
                  />
                ))}
              </div>
            )
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20 rounded-3xl border border-dashed border-border bg-surface-muted/40">
              <p className="font-body text-sm text-muted">
                Không tìm thấy dự án phù hợp với bộ lọc hiện tại.
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
        activeTab={activeTab}
        isOpen={isAdvancedDrawerOpen}
        onClose={handleCloseAdvanced}
        onApply={handleApplyAdvanced}
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
    </div>
  )
}
