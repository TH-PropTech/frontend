'use client'

import * as React from 'react'
import { useSearchParams } from 'next/navigation'
import {
  mockProjects,
  mockApartments,
  ApartmentItem,
  type ApiProjectItem,
  type ApiBuildingItem,
} from '@/entities/properties'
import { apiClient } from '@/shared/api/api-client'
function removeVietnameseTones(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim()
}

function normalizeCity(city?: string): string {
  if (!city) return ''
  const norm = city.toLowerCase()
  if (
    norm.includes('hồ chí minh') ||
    norm.includes('tp.hcm') ||
    norm.includes('tphcm') ||
    norm.includes('hcm') ||
    norm.includes('sài gòn')
  ) {
    return 'hcm'
  }
  if (norm.includes('hà nội') || norm.includes('hn')) {
    return 'hn'
  }
  return norm
}

const AMENITY_MAP_TO_DB: Record<string, string> = {
  pool: 'Bể bơi',
  gym: 'Phòng gym',
  parking: 'Bãi đỗ xe',
  elevator: 'Thang máy',
  security: 'Bảo vệ 24/7',
  pets: 'Cho nuôi thú cưng',
  park: 'Công viên',
}

function amenityMatchesKey(dbAmenity: string, key: string): boolean {
  const normAmenity = removeVietnameseTones(dbAmenity)
  switch (key) {
    case 'pool':
      return normAmenity.includes('be boi') || normAmenity.includes('ho boi')
    case 'gym':
      return normAmenity.includes('gym')
    case 'parking':
      return normAmenity.includes('do xe') || normAmenity.includes('parking')
    case 'elevator':
      return (
        normAmenity.includes('thang may') || normAmenity.includes('elevator')
      )
    case 'security':
      return normAmenity.includes('bao ve') || normAmenity.includes('security')
    case 'pets':
      return normAmenity.includes('thu cung') || normAmenity.includes('pet')
    case 'park':
      return normAmenity.includes('cong vien') || normAmenity.includes('park')
    default:
      return normAmenity.includes(removeVietnameseTones(key))
  }
}

export function usePropertiesFilters() {
  const searchParams = useSearchParams()
  const tabParam = searchParams?.get('tab')
  const buildingParam = searchParams?.get('building')

  const [activeTab, setActiveTab] = React.useState<'single' | 'project'>(
    tabParam === 'project' ? 'project' : 'single'
  )
  const [searchKeyword, setSearchKeyword] = React.useState('')
  const [searchStatus, setSearchStatus] = React.useState('')

  // Building filter state
  const [selectedBuildingId, setSelectedBuildingId] = React.useState<
    string | null
  >(buildingParam || null)

  React.useEffect(() => {
    if (buildingParam) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedBuildingId(buildingParam)

      setActiveTab('single')
    }
  }, [buildingParam])

  // Detailed Cascade Location States
  const [selectedCity, setSelectedCity] = React.useState('')
  const [selectedDistrict, setSelectedDistrict] = React.useState('')
  const [selectedWard, setSelectedWard] = React.useState('')
  const [selectedStreet, setSelectedStreet] = React.useState('')
  const [selectedProject, setSelectedProject] = React.useState('')

  // Province/District codes for API cascade lookup
  const [selectedProvinceCode, setSelectedProvinceCode] = React.useState<
    number | null
  >(null)
  const [selectedDistrictCode, setSelectedDistrictCode] = React.useState<
    number | null
  >(null)

  const [appliedCity, setAppliedCity] = React.useState('')
  const [appliedDistrict, setAppliedDistrict] = React.useState('')
  const [appliedWard, setAppliedWard] = React.useState('')
  const [appliedStreet, setAppliedStreet] = React.useState('')
  const [appliedProject, setAppliedProject] = React.useState('')

  // Price & Area Range States
  const [minPrice, setMinPrice] = React.useState<number | ''>('')
  const [maxPrice, setMaxPrice] = React.useState<number | ''>('')
  const [minArea, setMinArea] = React.useState<number | ''>('')
  const [maxArea, setMaxArea] = React.useState<number | ''>('')

  // Advanced Drawer States
  const [isVerifiedOnly, setIsVerifiedOnly] = React.useState(false)
  const [bedroomsFilter, setBedroomsFilter] = React.useState<number | 'all'>(
    'all'
  )
  const [bathroomsFilter, setBathroomsFilter] = React.useState<number | 'all'>(
    'all'
  )
  const [directionFilter, setDirectionFilter] = React.useState<string>('all')
  const [balconyDirectionFilter, setBalconyDirectionFilter] =
    React.useState<string>('all')
  const [furnitureFilter, setFurnitureFilter] = React.useState<string>('all')
  const [moveInTimeFilter, setMoveInTimeFilter] = React.useState<string>('all')
  const [electricityPriceFilter, setElectricityPriceFilter] =
    React.useState<string>('all')
  const [waterPriceFilter, setWaterPriceFilter] = React.useState<string>('all')
  const [internetPriceFilter, setInternetPriceFilter] =
    React.useState<string>('all')
  const [selectedAmenities, setSelectedAmenities] = React.useState<string[]>([])
  const [hasMediaOnly, setHasMediaOnly] = React.useState(false)

  // Applied Advanced Drawer States (Only updated when Apply button is clicked)
  const [appliedBedroomsFilter, setAppliedBedroomsFilter] = React.useState<
    number | 'all'
  >('all')
  const [appliedBathroomsFilter, setAppliedBathroomsFilter] = React.useState<
    number | 'all'
  >('all')
  const [appliedDirectionFilter, setAppliedDirectionFilter] =
    React.useState<string>('all')
  const [appliedBalconyDirectionFilter, setAppliedBalconyDirectionFilter] =
    React.useState<string>('all')
  const [appliedFurnitureFilter, setAppliedFurnitureFilter] =
    React.useState<string>('all')
  const [appliedMoveInTimeFilter, setAppliedMoveInTimeFilter] =
    React.useState<string>('all')
  const [appliedElectricityPriceFilter, setAppliedElectricityPriceFilter] =
    React.useState<string>('all')
  const [appliedWaterPriceFilter, setAppliedWaterPriceFilter] =
    React.useState<string>('all')
  const [appliedInternetPriceFilter, setAppliedInternetPriceFilter] =
    React.useState<string>('all')
  const [appliedAmenities, setAppliedAmenities] = React.useState<string[]>([])
  const [appliedIsVerifiedOnly, setAppliedIsVerifiedOnly] =
    React.useState(false)
  const [appliedHasMediaOnly, setAppliedHasMediaOnly] = React.useState(false)

  const applyAdvancedFilters = (): void => {
    setAppliedBedroomsFilter(bedroomsFilter)
    setAppliedBathroomsFilter(bathroomsFilter)
    setAppliedDirectionFilter(directionFilter)
    setAppliedBalconyDirectionFilter(balconyDirectionFilter)
    setAppliedFurnitureFilter(furnitureFilter)
    setAppliedMoveInTimeFilter(moveInTimeFilter)
    setAppliedElectricityPriceFilter(electricityPriceFilter)
    setAppliedWaterPriceFilter(waterPriceFilter)
    setAppliedInternetPriceFilter(internetPriceFilter)
    setAppliedAmenities(selectedAmenities)
    setAppliedIsVerifiedOnly(isVerifiedOnly)
    setAppliedHasMediaOnly(hasMediaOnly)
  }

  const revertAdvancedFilters = (): void => {
    setBedroomsFilter(appliedBedroomsFilter)
    setBathroomsFilter(appliedBathroomsFilter)
    setDirectionFilter(appliedDirectionFilter)
    setBalconyDirectionFilter(appliedBalconyDirectionFilter)
    setFurnitureFilter(appliedFurnitureFilter)
    setMoveInTimeFilter(appliedMoveInTimeFilter)
    setElectricityPriceFilter(appliedElectricityPriceFilter)
    setWaterPriceFilter(appliedWaterPriceFilter)
    setInternetPriceFilter(appliedInternetPriceFilter)
    setSelectedAmenities(appliedAmenities)
    setIsVerifiedOnly(appliedIsVerifiedOnly)
    setHasMediaOnly(appliedHasMediaOnly)
  }

  const applyLocationFilters = (): void => {
    setAppliedCity(selectedCity)
    setAppliedDistrict(selectedDistrict)
    setAppliedWard(selectedWard)
    setAppliedStreet(selectedStreet)
    setAppliedProject(selectedProject)
  }

  const revertLocationFilters = (): void => {
    setSelectedCity(appliedCity)
    setSelectedDistrict(appliedDistrict)
    setSelectedWard(appliedWard)
    setSelectedStreet(appliedStreet)
    setSelectedProject(appliedProject)
  }

  const [debouncedKeyword, setDebouncedKeyword] = React.useState(searchKeyword)
  const [useMockFallback, setUseMockFallback] = React.useState(false)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(searchKeyword)
    }, 500)
    return () => {
      clearTimeout(handler)
    }
  }, [searchKeyword])

  // State for fetched apartments
  const [apartments, setApartments] =
    React.useState<ApartmentItem[]>(mockApartments)

  React.useEffect(() => {
    let active = true
    const queryParams = new URLSearchParams()
    queryParams.append('format', 'web')
    if (debouncedKeyword) queryParams.append('search', debouncedKeyword)
    if (appliedCity) queryParams.append('city', appliedCity)
    if (appliedDistrict) queryParams.append('district', appliedDistrict)
    if (appliedWard) queryParams.append('ward', appliedWard)
    if (appliedStreet) queryParams.append('street', appliedStreet)
    if (appliedProject) queryParams.append('projectName', appliedProject)
    if (minPrice !== '') queryParams.append('minPrice', String(minPrice))
    if (maxPrice !== '') queryParams.append('maxPrice', String(maxPrice))
    if (minArea !== '') queryParams.append('minArea', String(minArea))
    if (maxArea !== '') queryParams.append('maxArea', String(maxArea))
    if (selectedBuildingId) queryParams.append('buildingId', selectedBuildingId)

    // Advanced filters
    if (appliedBedroomsFilter !== 'all')
      queryParams.append('bedrooms', String(appliedBedroomsFilter))
    if (appliedBathroomsFilter !== 'all')
      queryParams.append('bathrooms', String(appliedBathroomsFilter))
    if (appliedDirectionFilter !== 'all')
      queryParams.append('direction', appliedDirectionFilter)
    if (appliedBalconyDirectionFilter !== 'all')
      queryParams.append('balconyDirection', appliedBalconyDirectionFilter)
    if (appliedFurnitureFilter !== 'all')
      queryParams.append('furniture', appliedFurnitureFilter)
    if (appliedMoveInTimeFilter !== 'all')
      queryParams.append('moveInTime', appliedMoveInTimeFilter)
    if (appliedElectricityPriceFilter !== 'all')
      queryParams.append('electricity', appliedElectricityPriceFilter)
    if (appliedWaterPriceFilter !== 'all')
      queryParams.append('water', appliedWaterPriceFilter)
    if (appliedInternetPriceFilter !== 'all')
      queryParams.append('internet', appliedInternetPriceFilter)
    if (appliedIsVerifiedOnly) queryParams.append('isVerified', 'true')
    if (appliedHasMediaOnly) queryParams.append('hasMedia', 'true')
    if (appliedAmenities.length > 0) {
      const dbAmenities = appliedAmenities.map(a => AMENITY_MAP_TO_DB[a] || a)
      queryParams.append('amenities', dbAmenities.join(','))
    }

    apiClient
      .get<ApartmentItem[]>(`/apartments?${queryParams.toString()}`)
      .then(data => {
        if (active) {
          if (data && Array.isArray(data)) {
            setApartments(data)
            setUseMockFallback(false)
          } else {
            setUseMockFallback(true)
          }
        }
      })
      .catch(err => {
        console.error(
          'Failed to fetch apartments from backend, falling back to mock data:',
          err
        )
        if (active) {
          setUseMockFallback(true)
          setApartments(mockApartments)
        }
      })
    return () => {
      active = false
    }
  }, [
    debouncedKeyword,
    appliedCity,
    appliedDistrict,
    appliedWard,
    appliedStreet,
    appliedProject,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    selectedBuildingId,
    appliedBedroomsFilter,
    appliedBathroomsFilter,
    appliedDirectionFilter,
    appliedBalconyDirectionFilter,
    appliedFurnitureFilter,
    appliedMoveInTimeFilter,
    appliedElectricityPriceFilter,
    appliedWaterPriceFilter,
    appliedInternetPriceFilter,
    appliedIsVerifiedOnly,
    appliedHasMediaOnly,
    appliedAmenities,
  ])

  // ── State for fetched projects from backend ──
  const [apiProjects, setApiProjects] = React.useState<ApiProjectItem[]>([])
  const [isLoadingProjects, setIsLoadingProjects] = React.useState(false)

  React.useEffect(() => {
    let active = true
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoadingProjects(true)
    const queryParams = new URLSearchParams()
    if (debouncedKeyword) queryParams.append('search', debouncedKeyword)
    if (appliedCity) queryParams.append('city', appliedCity)
    if (appliedDistrict) queryParams.append('district', appliedDistrict)
    if (minPrice !== '') queryParams.append('minPrice', String(minPrice))
    if (maxPrice !== '') queryParams.append('maxPrice', String(maxPrice))

    // Advanced project filters
    if (appliedBedroomsFilter !== 'all')
      queryParams.append('bedrooms', String(appliedBedroomsFilter))
    if (appliedBathroomsFilter !== 'all')
      queryParams.append('bathrooms', String(appliedBathroomsFilter))
    if (appliedAmenities.length > 0) {
      const dbAmenities = appliedAmenities.map(a => AMENITY_MAP_TO_DB[a] || a)
      queryParams.append('amenities', dbAmenities.join(','))
    }

    apiClient
      .get<ApiProjectItem[]>(`/projects?${queryParams.toString()}`)
      .then(data => {
        if (active && data && Array.isArray(data)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mapped = data.map((item: any) => ({
            ...item,
            id: item.id || item._id?.toString() || item._id,
          }))
          setApiProjects(mapped)
          setUseMockFallback(false)
        }
      })
      .catch(err => {
        console.error(
          'Failed to fetch projects from backend, falling back to mock data:',
          err
        )
        if (active) {
          setUseMockFallback(true)
        }
      })
      .finally(() => {
        if (active) setIsLoadingProjects(false)
      })
    return () => {
      active = false
    }
  }, [
    debouncedKeyword,
    appliedCity,
    appliedDistrict,
    minPrice,
    maxPrice,
    appliedBedroomsFilter,
    appliedBathroomsFilter,
    appliedAmenities,
  ])

  // ── State for fetched buildings (loaded when a project is selected) ──
  const [selectedApiProjectId, setSelectedApiProjectId] = React.useState<
    string | null
  >(null)
  const [apiBuildings, setApiBuildings] = React.useState<ApiBuildingItem[]>([])
  const [isLoadingBuildings, setIsLoadingBuildings] = React.useState(false)

  React.useEffect(() => {
    if (!selectedApiProjectId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setApiBuildings([])
      return
    }
    let active = true
    setIsLoadingBuildings(true)
    apiClient
      .get<ApiBuildingItem[]>(`/buildings?projectId=${selectedApiProjectId}`)
      .then(data => {
        if (active && data && Array.isArray(data)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mapped = data.map((item: any) => ({
            ...item,
            id: item.id || item._id?.toString() || item._id,
          }))
          setApiBuildings(mapped)
        }
      })
      .catch(err => {
        console.error('Failed to fetch buildings for project:', err)
      })
      .finally(() => {
        if (active) setIsLoadingBuildings(false)
      })
    return () => {
      active = false
    }
  }, [selectedApiProjectId])

  // Filter projects
  const filteredProjects = React.useMemo(() => {
    return mockProjects.filter(proj => {
      if (searchKeyword.trim()) {
        const kw = removeVietnameseTones(searchKeyword)
        const matchTitle = removeVietnameseTones(proj.title).includes(kw)
        const matchDev = removeVietnameseTones(proj.developer).includes(kw)
        const matchLoc = removeVietnameseTones(proj.location).includes(kw)
        if (!matchTitle && !matchDev && !matchLoc) return false
      }

      if (
        appliedCity &&
        normalizeCity(proj.city) !== normalizeCity(appliedCity)
      )
        return false
      if (appliedDistrict && proj.district !== appliedDistrict) return false
      if (appliedWard && proj.ward !== appliedWard) return false
      if (appliedStreet && proj.street !== appliedStreet) return false

      if (minPrice !== '' && proj.maxPrice < Number(minPrice)) return false
      if (maxPrice !== '' && proj.minPrice > Number(maxPrice)) return false
      if (appliedIsVerifiedOnly && !proj.isVerified) return false
      if (appliedHasMediaOnly && !proj.hasMedia) return false

      if (appliedBedroomsFilter !== 'all') {
        const hasMatchingUnit = proj.units?.some(
          unit => unit.bedrooms === Number(appliedBedroomsFilter)
        )
        if (!hasMatchingUnit) return false
      }

      if (appliedAmenities.length > 0) {
        const hasAll = appliedAmenities.every(amenity =>
          proj.amenities.includes(amenity)
        )
        if (!hasAll) return false
      }

      return true
    })
  }, [
    searchKeyword,
    appliedCity,
    appliedDistrict,
    appliedWard,
    appliedStreet,
    minPrice,
    maxPrice,
    appliedIsVerifiedOnly,
    appliedHasMediaOnly,
    appliedAmenities,
    appliedBedroomsFilter,
  ])

  // Filter API projects
  const filteredApiProjects = React.useMemo(() => {
    return apiProjects.filter(proj => {
      if (useMockFallback) {
        if (searchKeyword.trim()) {
          const kw = removeVietnameseTones(searchKeyword)
          const matchName = removeVietnameseTones(proj.name).includes(kw)
          const matchDesc = removeVietnameseTones(
            proj.description || ''
          ).includes(kw)
          const matchLoc = removeVietnameseTones(proj.location).includes(kw)
          const matchInvestor = removeVietnameseTones(
            proj.investor || ''
          ).includes(kw)
          if (!matchName && !matchDesc && !matchLoc && !matchInvestor)
            return false
        }

        if (
          appliedCity &&
          normalizeCity(proj.city) !== normalizeCity(appliedCity)
        )
          return false
        if (
          appliedDistrict &&
          proj.district.toLowerCase() !== appliedDistrict.toLowerCase()
        )
          return false
      }

      // Calculate price range from apartments belonging to this project
      const projectApartments = apartments.filter(
        apt => apt.projectName === proj.name
      )
      if (useMockFallback && projectApartments.length > 0) {
        const prices = projectApartments.map(apt => apt.priceNum)
        const projectMinPrice = Math.min(...prices)
        const projectMaxPrice = Math.max(...prices)

        if (minPrice !== '' && projectMaxPrice < Number(minPrice)) return false
        if (maxPrice !== '' && projectMinPrice > Number(maxPrice)) return false
      }

      // Filter by bedrooms and bathrooms in apartments belonging to this project
      if (appliedBedroomsFilter !== 'all') {
        const hasMatchingApt = projectApartments.some(
          apt => apt.bedrooms === Number(appliedBedroomsFilter)
        )
        if (!hasMatchingApt) return false
      }
      if (appliedBathroomsFilter !== 'all') {
        const hasMatchingApt = projectApartments.some(
          apt => apt.bathrooms === Number(appliedBathroomsFilter)
        )
        if (!hasMatchingApt) return false
      }

      if (appliedAmenities.length > 0) {
        const hasAll = appliedAmenities.every(amenity =>
          proj.amenities.some(a => amenityMatchesKey(a, amenity))
        )
        if (!hasAll) return false
      }

      return true
    })
  }, [
    useMockFallback,
    apiProjects,
    searchKeyword,
    appliedCity,
    appliedDistrict,
    minPrice,
    maxPrice,
    appliedAmenities,
    apartments,
    appliedBedroomsFilter,
    appliedBathroomsFilter,
  ])

  // Filter apartments
  const filteredApartments = React.useMemo(() => {
    return apartments.filter(apt => {
      if (useMockFallback) {
        if (selectedBuildingId && apt.buildingId !== selectedBuildingId) {
          return false
        }

        if (searchKeyword.trim()) {
          const kw = removeVietnameseTones(searchKeyword)
          const matchTitle = removeVietnameseTones(apt.title).includes(kw)
          const matchDesc = removeVietnameseTones(apt.description).includes(kw)
          const matchLoc = removeVietnameseTones(apt.location).includes(kw)
          if (!matchTitle && !matchDesc && !matchLoc) return false
        }

        if (
          appliedCity &&
          normalizeCity(apt.city) !== normalizeCity(appliedCity)
        )
          return false
        if (appliedDistrict && apt.district !== appliedDistrict) return false
        if (appliedWard && apt.ward !== appliedWard) return false
        if (appliedStreet && apt.street !== appliedStreet) return false
        if (appliedProject && apt.projectName !== appliedProject) return false

        if (minPrice !== '' && apt.priceNum < Number(minPrice)) return false
        if (maxPrice !== '' && apt.priceNum > Number(maxPrice)) return false

        if (minArea !== '' && apt.areaNum < Number(minArea)) return false
        if (maxArea !== '' && apt.areaNum > Number(maxArea)) return false
      }

      if (
        appliedBedroomsFilter !== 'all' &&
        apt.bedrooms !== Number(appliedBedroomsFilter)
      )
        return false
      if (
        appliedBathroomsFilter !== 'all' &&
        apt.bathrooms !== Number(appliedBathroomsFilter)
      )
        return false

      if (
        appliedDirectionFilter !== 'all' &&
        apt.direction !== appliedDirectionFilter
      )
        return false
      if (
        appliedBalconyDirectionFilter !== 'all' &&
        apt.balconyDirection !== appliedBalconyDirectionFilter
      )
        return false

      if (
        appliedFurnitureFilter !== 'all' &&
        !removeVietnameseTones(apt.furniture).includes(
          removeVietnameseTones(appliedFurnitureFilter)
        )
      )
        return false
      if (
        appliedMoveInTimeFilter !== 'all' &&
        apt.moveInTime !== appliedMoveInTimeFilter
      )
        return false

      if (
        appliedElectricityPriceFilter !== 'all' &&
        apt.electricityPriceType !== appliedElectricityPriceFilter
      )
        return false
      if (
        appliedWaterPriceFilter !== 'all' &&
        apt.waterPriceType !== appliedWaterPriceFilter
      )
        return false
      if (
        appliedInternetPriceFilter !== 'all' &&
        apt.internetPriceType !== appliedInternetPriceFilter
      )
        return false

      if (appliedIsVerifiedOnly && !apt.isVerified) return false
      if (appliedHasMediaOnly && !apt.hasMedia) return false

      if (appliedAmenities.length > 0) {
        const hasAll = appliedAmenities.every(
          amenity =>
            apt.amenities.includes(amenity) ||
            apt.amenities.some(a => amenityMatchesKey(a, amenity))
        )
        if (!hasAll) return false
      }

      return true
    })
  }, [
    useMockFallback,
    searchKeyword,
    appliedCity,
    appliedDistrict,
    appliedWard,
    appliedStreet,
    appliedProject,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    appliedBedroomsFilter,
    appliedBathroomsFilter,
    appliedDirectionFilter,
    appliedBalconyDirectionFilter,
    appliedFurnitureFilter,
    appliedMoveInTimeFilter,
    appliedElectricityPriceFilter,
    appliedWaterPriceFilter,
    appliedInternetPriceFilter,
    appliedIsVerifiedOnly,
    appliedHasMediaOnly,
    appliedAmenities,
    apartments,
    selectedBuildingId,
  ])

  // Draft Filter apartments (used only to calculate count inside advanced drawer)
  const draftFilteredApartments = React.useMemo(() => {
    return apartments.filter(apt => {
      if (selectedBuildingId && apt.buildingId !== selectedBuildingId) {
        return false
      }

      if (searchKeyword.trim()) {
        const kw = removeVietnameseTones(searchKeyword)
        const matchTitle = removeVietnameseTones(apt.title).includes(kw)
        const matchDesc = removeVietnameseTones(apt.description).includes(kw)
        const matchLoc = removeVietnameseTones(apt.location).includes(kw)
        if (!matchTitle && !matchDesc && !matchLoc) return false
      }

      if (
        selectedCity &&
        normalizeCity(apt.city) !== normalizeCity(selectedCity)
      )
        return false
      if (selectedDistrict && apt.district !== selectedDistrict) return false
      if (selectedWard && apt.ward !== selectedWard) return false
      if (selectedStreet && apt.street !== selectedStreet) return false
      if (selectedProject && apt.projectName !== selectedProject) return false

      if (minPrice !== '' && apt.priceNum < Number(minPrice)) return false
      if (maxPrice !== '' && apt.priceNum > Number(maxPrice)) return false

      if (minArea !== '' && apt.areaNum < Number(minArea)) return false
      if (maxArea !== '' && apt.areaNum > Number(maxArea)) return false

      if (bedroomsFilter !== 'all' && apt.bedrooms !== Number(bedroomsFilter))
        return false
      if (
        bathroomsFilter !== 'all' &&
        apt.bathrooms !== Number(bathroomsFilter)
      )
        return false

      if (directionFilter !== 'all' && apt.direction !== directionFilter)
        return false
      if (
        balconyDirectionFilter !== 'all' &&
        apt.balconyDirection !== balconyDirectionFilter
      )
        return false

      if (
        furnitureFilter !== 'all' &&
        !removeVietnameseTones(apt.furniture).includes(
          removeVietnameseTones(furnitureFilter)
        )
      )
        return false
      if (moveInTimeFilter !== 'all' && apt.moveInTime !== moveInTimeFilter)
        return false

      if (
        electricityPriceFilter !== 'all' &&
        apt.electricityPriceType !== electricityPriceFilter
      )
        return false
      if (waterPriceFilter !== 'all' && apt.waterPriceType !== waterPriceFilter)
        return false
      if (
        internetPriceFilter !== 'all' &&
        apt.internetPriceType !== internetPriceFilter
      )
        return false

      if (isVerifiedOnly && !apt.isVerified) return false
      if (hasMediaOnly && !apt.hasMedia) return false

      if (selectedAmenities.length > 0) {
        const hasAll = selectedAmenities.every(
          amenity =>
            apt.amenities.includes(amenity) ||
            apt.amenities.some(a => amenityMatchesKey(a, amenity))
        )
        if (!hasAll) return false
      }

      return true
    })
  }, [
    apartments,
    selectedBuildingId,
    searchKeyword,
    selectedCity,
    selectedDistrict,
    selectedWard,
    selectedStreet,
    selectedProject,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    bedroomsFilter,
    bathroomsFilter,
    directionFilter,
    balconyDirectionFilter,
    furnitureFilter,
    moveInTimeFilter,
    electricityPriceFilter,
    waterPriceFilter,
    internetPriceFilter,
    isVerifiedOnly,
    hasMediaOnly,
    selectedAmenities,
  ])

  // Draft Filter API projects
  const draftFilteredApiProjects = React.useMemo(() => {
    return apiProjects.filter(proj => {
      if (searchKeyword.trim()) {
        const kw = removeVietnameseTones(searchKeyword)
        const matchName = removeVietnameseTones(proj.name).includes(kw)
        const matchDesc = removeVietnameseTones(
          proj.description || ''
        ).includes(kw)
        const matchLoc = removeVietnameseTones(proj.location).includes(kw)
        const matchInvestor = removeVietnameseTones(
          proj.investor || ''
        ).includes(kw)
        if (!matchName && !matchDesc && !matchLoc && !matchInvestor)
          return false
      }

      if (
        selectedCity &&
        normalizeCity(proj.city) !== normalizeCity(selectedCity)
      )
        return false
      if (
        selectedDistrict &&
        proj.district.toLowerCase() !== selectedDistrict.toLowerCase()
      )
        return false

      // Calculate price range from apartments belonging to this project
      const projectApartments = apartments.filter(
        apt => apt.projectName === proj.name
      )
      if (projectApartments.length > 0) {
        const prices = projectApartments.map(apt => apt.priceNum)
        const projectMinPrice = Math.min(...prices)
        const projectMaxPrice = Math.max(...prices)

        if (minPrice !== '' && projectMaxPrice < Number(minPrice)) return false
        if (maxPrice !== '' && projectMinPrice > Number(maxPrice)) return false
      }

      // Filter by bedrooms and bathrooms in apartments belonging to this project
      if (bedroomsFilter !== 'all') {
        const hasMatchingApt = projectApartments.some(
          apt => apt.bedrooms === Number(bedroomsFilter)
        )
        if (!hasMatchingApt) return false
      }
      if (bathroomsFilter !== 'all') {
        const hasMatchingApt = projectApartments.some(
          apt => apt.bathrooms === Number(bathroomsFilter)
        )
        if (!hasMatchingApt) return false
      }

      if (selectedAmenities.length > 0) {
        const hasAll = selectedAmenities.every(amenity =>
          proj.amenities.some(a => amenityMatchesKey(a, amenity))
        )
        if (!hasAll) return false
      }

      return true
    })
  }, [
    apiProjects,
    searchKeyword,
    selectedCity,
    selectedDistrict,
    minPrice,
    maxPrice,
    selectedAmenities,
    apartments,
    bedroomsFilter,
    bathroomsFilter,
  ])

  // Draft count for current active tab
  const draftCount = React.useMemo(() => {
    return activeTab === 'single'
      ? draftFilteredApartments.length
      : draftFilteredApiProjects.length
  }, [
    activeTab,
    draftFilteredApartments.length,
    draftFilteredApiProjects.length,
  ])

  const locationLabel = React.useMemo(() => {
    const parts = []
    if (appliedCity) parts.push(appliedCity)
    if (appliedDistrict) parts.push(appliedDistrict)
    if (appliedWard) parts.push(appliedWard)
    return parts.length > 0 ? parts.join(' • ') : 'Toàn quốc'
  }, [appliedCity, appliedDistrict, appliedWard])

  const priceLabel = React.useMemo(() => {
    if (minPrice === '' && maxPrice === '') return 'Tất cả'
    if (minPrice !== '' && maxPrice === '') return `Từ ${minPrice} tr`
    if (minPrice === '' && maxPrice !== '') return `Dưới ${maxPrice} tr`
    return `${minPrice} - ${maxPrice} tr`
  }, [minPrice, maxPrice])

  const areaLabel = React.useMemo(() => {
    if (minArea === '' && maxArea === '') return 'Tất cả'
    if (minArea !== '' && maxArea === '') return `Từ ${minArea} m²`
    if (minArea === '' && maxArea !== '') return `Dưới ${maxArea} m²`
    return `${minArea} - ${maxArea} m²`
  }, [minArea, maxArea])

  const resetFilters = (): void => {
    setSelectedCity('')
    setSelectedDistrict('')
    setSelectedWard('')
    setSelectedStreet('')
    setSelectedProject('')
    setSelectedProvinceCode(null)
    setSelectedDistrictCode(null)
    setMinPrice('')
    setMaxPrice('')
    setMinArea('')
    setMaxArea('')
    setIsVerifiedOnly(false)
    setBedroomsFilter('all')
    setBathroomsFilter('all')
    setDirectionFilter('all')
    setBalconyDirectionFilter('all')
    setFurnitureFilter('all')
    setMoveInTimeFilter('all')
    setElectricityPriceFilter('all')
    setWaterPriceFilter('all')
    setInternetPriceFilter('all')
    setSelectedAmenities([])
    setHasMediaOnly(false)
    setSearchKeyword('')
    setSearchStatus('')
    setSelectedBuildingId(null)

    // Reset applied states too
    setAppliedCity('')
    setAppliedDistrict('')
    setAppliedWard('')
    setAppliedStreet('')
    setAppliedProject('')
    setAppliedBedroomsFilter('all')
    setAppliedBathroomsFilter('all')
    setAppliedDirectionFilter('all')
    setAppliedBalconyDirectionFilter('all')
    setAppliedFurnitureFilter('all')
    setAppliedMoveInTimeFilter('all')
    setAppliedElectricityPriceFilter('all')
    setAppliedWaterPriceFilter('all')
    setAppliedInternetPriceFilter('all')
    setAppliedAmenities([])
    setAppliedIsVerifiedOnly(false)
    setAppliedHasMediaOnly(false)
  }

  // Active filters count (based on applied ones)
  const activeFiltersCount = React.useMemo(() => {
    let count = 0
    if (appliedCity) count++
    if (appliedDistrict) count++
    if (appliedWard) count++
    if (appliedStreet) count++
    if (appliedProject) count++
    if (minPrice !== '' || maxPrice !== '') count++
    if (minArea !== '' || maxArea !== '') count++
    if (appliedIsVerifiedOnly) count++
    if (appliedBedroomsFilter !== 'all') count++
    if (appliedBathroomsFilter !== 'all') count++
    if (appliedDirectionFilter !== 'all') count++
    if (appliedBalconyDirectionFilter !== 'all') count++
    if (appliedFurnitureFilter !== 'all') count++
    if (appliedMoveInTimeFilter !== 'all') count++
    if (appliedElectricityPriceFilter !== 'all') count++
    if (appliedWaterPriceFilter !== 'all') count++
    if (appliedInternetPriceFilter !== 'all') count++
    if (appliedAmenities.length > 0) count++
    if (appliedHasMediaOnly) count++
    return count
  }, [
    appliedCity,
    appliedDistrict,
    appliedWard,
    appliedStreet,
    appliedProject,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    appliedIsVerifiedOnly,
    appliedBedroomsFilter,
    appliedBathroomsFilter,
    appliedDirectionFilter,
    appliedBalconyDirectionFilter,
    appliedFurnitureFilter,
    appliedMoveInTimeFilter,
    appliedElectricityPriceFilter,
    appliedWaterPriceFilter,
    appliedInternetPriceFilter,
    appliedAmenities,
    appliedHasMediaOnly,
  ])

  const triggerSearch = React.useCallback(() => {
    setDebouncedKeyword(searchKeyword)
  }, [searchKeyword])

  return {
    triggerSearch,
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
    // Applied states and Apply function
    applyAdvancedFilters,
    revertAdvancedFilters,
    draftCount,
    appliedBedroomsFilter,
    appliedBathroomsFilter,
    appliedDirectionFilter,
    appliedBalconyDirectionFilter,
    appliedFurnitureFilter,
    appliedMoveInTimeFilter,
    appliedElectricityPriceFilter,
    appliedWaterPriceFilter,
    appliedInternetPriceFilter,
    appliedAmenities,
    appliedIsVerifiedOnly,
    appliedHasMediaOnly,
    // Newly returned apply/revert functions and applied variables
    applyLocationFilters,
    revertLocationFilters,
    appliedCity,
    appliedDistrict,
    appliedWard,
    appliedStreet,
    appliedProject,
    // Province/District codes for API cascade
    selectedProvinceCode,
    setSelectedProvinceCode,
    selectedDistrictCode,
    setSelectedDistrictCode,
  }
}
