'use client'

import * as React from 'react'
import { useSearchParams } from 'next/navigation'
import {
  mockProjects,
  mockApartments,
  ApartmentItem,
} from '@/entities/properties'
import { apiClient } from '@/shared/api/api-client'

export function usePropertiesFilters() {
  const searchParams = useSearchParams()
  const tabParam = searchParams?.get('tab')

  const [activeTab, setActiveTab] = React.useState<'single' | 'project'>(
    tabParam === 'project' ? 'project' : 'single'
  )
  const [searchKeyword, setSearchKeyword] = React.useState('')
  const [searchStatus, setSearchStatus] = React.useState('')
  const [selectedType, setSelectedType] = React.useState('Tất cả')

  // State for fetched apartments
  const [apartments, setApartments] =
    React.useState<ApartmentItem[]>(mockApartments)

  React.useEffect(() => {
    let active = true
    apiClient
      .get<ApartmentItem[]>('/apartments?format=web')
      .then(data => {
        if (active && data && Array.isArray(data) && data.length > 0) {
          setApartments(data)
        }
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error(
          'Failed to fetch apartments from backend, falling back to mock data:',
          err
        )
      })
    return () => {
      active = false
    }
  }, [])

  // Detailed Cascade Location States
  const [selectedCity, setSelectedCity] = React.useState('')
  const [selectedDistrict, setSelectedDistrict] = React.useState('')
  const [selectedWard, setSelectedWard] = React.useState('')
  const [selectedStreet, setSelectedStreet] = React.useState('')
  const [selectedProject, setSelectedProject] = React.useState('')

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

  // Reset all filters helper
  const resetFilters = (): void => {
    setSelectedCity('')
    setSelectedDistrict('')
    setSelectedWard('')
    setSelectedStreet('')
    setSelectedProject('')
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
    setSelectedType('Tất cả')
    setSearchKeyword('')
    setSearchStatus('')
  }

  // Active filters count
  const activeFiltersCount = React.useMemo(() => {
    let count = 0
    if (selectedCity) count++
    if (selectedDistrict) count++
    if (selectedWard) count++
    if (selectedStreet) count++
    if (selectedProject) count++
    if (minPrice !== '' || maxPrice !== '') count++
    if (minArea !== '' || maxArea !== '') count++
    if (isVerifiedOnly) count++
    if (bedroomsFilter !== 'all') count++
    if (bathroomsFilter !== 'all') count++
    if (directionFilter !== 'all') count++
    if (balconyDirectionFilter !== 'all') count++
    if (furnitureFilter !== 'all') count++
    if (moveInTimeFilter !== 'all') count++
    if (electricityPriceFilter !== 'all') count++
    if (waterPriceFilter !== 'all') count++
    if (internetPriceFilter !== 'all') count++
    if (selectedAmenities.length > 0) count++
    if (hasMediaOnly) count++
    if (selectedType !== 'Tất cả') count++
    return count
  }, [
    selectedCity,
    selectedDistrict,
    selectedWard,
    selectedStreet,
    selectedProject,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    isVerifiedOnly,
    bedroomsFilter,
    bathroomsFilter,
    directionFilter,
    balconyDirectionFilter,
    furnitureFilter,
    moveInTimeFilter,
    electricityPriceFilter,
    waterPriceFilter,
    internetPriceFilter,
    selectedAmenities,
    hasMediaOnly,
    selectedType,
  ])

  // Filter projects
  const filteredProjects = React.useMemo(() => {
    return mockProjects.filter(proj => {
      if (searchKeyword.trim()) {
        const kw = searchKeyword.toLowerCase()
        const matchTitle = proj.title.toLowerCase().includes(kw)
        const matchDev = proj.developer.toLowerCase().includes(kw)
        const matchLoc = proj.location.toLowerCase().includes(kw)
        if (!matchTitle && !matchDev && !matchLoc) return false
      }

      if (selectedCity && proj.city !== selectedCity) return false
      if (selectedDistrict && proj.district !== selectedDistrict) return false
      if (selectedWard && proj.ward !== selectedWard) return false
      if (selectedStreet && proj.street !== selectedStreet) return false

      if (minPrice !== '' && proj.maxPrice < Number(minPrice)) return false
      if (maxPrice !== '' && proj.minPrice > Number(maxPrice)) return false
      if (isVerifiedOnly && !proj.isVerified) return false
      if (hasMediaOnly && !proj.hasMedia) return false

      if (selectedAmenities.length > 0) {
        const hasAll = selectedAmenities.every(amenity =>
          proj.amenities.includes(amenity)
        )
        if (!hasAll) return false
      }

      return true
    })
  }, [
    searchKeyword,
    selectedCity,
    selectedDistrict,
    selectedWard,
    selectedStreet,
    minPrice,
    maxPrice,
    isVerifiedOnly,
    hasMediaOnly,
    selectedAmenities,
  ])

  // Filter apartments
  const filteredApartments = React.useMemo(() => {
    return apartments.filter(apt => {
      if (searchKeyword.trim()) {
        const kw = searchKeyword.toLowerCase()
        const matchTitle = apt.title.toLowerCase().includes(kw)
        const matchDesc = apt.description.toLowerCase().includes(kw)
        const matchLoc = apt.location.toLowerCase().includes(kw)
        if (!matchTitle && !matchDesc && !matchLoc) return false
      }

      if (selectedCity && apt.city !== selectedCity) return false
      if (selectedDistrict && apt.district !== selectedDistrict) return false
      if (selectedWard && apt.ward !== selectedWard) return false
      if (selectedStreet && apt.street !== selectedStreet) return false
      if (selectedProject && apt.projectName !== selectedProject) return false

      if (selectedType !== 'Tất cả' && apt.category !== selectedType)
        return false

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

      if (furnitureFilter !== 'all' && apt.furniture !== furnitureFilter)
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
        const hasAll = selectedAmenities.every(amenity =>
          apt.amenities.includes(amenity)
        )
        if (!hasAll) return false
      }

      return true
    })
  }, [
    searchKeyword,
    selectedCity,
    selectedDistrict,
    selectedWard,
    selectedStreet,
    selectedProject,
    selectedType,
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
    apartments,
  ])

  const locationLabel = React.useMemo(() => {
    const parts = []
    if (selectedCity) parts.push(selectedCity)
    if (selectedDistrict) parts.push(selectedDistrict)
    if (selectedWard) parts.push(selectedWard)
    if (selectedProject) parts.push(selectedProject)
    else if (selectedStreet) parts.push(selectedStreet)
    return parts.length > 0 ? parts.join(' • ') : 'Toàn quốc'
  }, [
    selectedCity,
    selectedDistrict,
    selectedWard,
    selectedStreet,
    selectedProject,
  ])

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

  return {
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
  }
}
