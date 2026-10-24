import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import {
  usePropertiesFilters,
  parsePriceParam,
  parseBedroomsParam,
  isAllDistrict,
  matchDistrict,
  matchBedrooms,
  matchApartmentKeyword,
  removeVietnameseTones,
  resolveLocationFromParams,
  resolveProvinceFromCity,
} from '../use-properties-filters'
import { apiClient } from '@/shared/api/api-client'
import { makeApartment } from './apartment-fixture'

let mockSearchParams = new URLSearchParams()

vi.mock('next/navigation', () => ({
  useSearchParams: () => mockSearchParams,
}))

vi.mock('@/shared/api/api-client', () => ({
  apiClient: {
    get: vi.fn(),
  },
}))

describe('usePropertiesFilters - Query Parameters & Normalization Suite (5 Dimensions)', () => {
  beforeEach(() => {
    mockSearchParams = new URLSearchParams()
    vi.clearAllMocks()
    vi.mocked(apiClient.get).mockResolvedValue([makeApartment()])
  })

  // Dimension 1: Happy Path
  describe('Dimension 1: Happy Path', () => {
    it('initializes filters correctly from standard URL search params (district, price in millions, bedrooms, search)', async () => {
      mockSearchParams.set('search', 'Vinhomes')
      mockSearchParams.set('district', 'Bình Thạnh')
      mockSearchParams.set('minPrice', '10')
      mockSearchParams.set('maxPrice', '20')
      mockSearchParams.set('bedrooms', '2')

      const { result } = renderHook(() => usePropertiesFilters())
      await waitFor(() => {
        expect(result.current.filteredApartments.length).toBeGreaterThan(0)
      })

      expect(result.current.searchKeyword).toBe('Vinhomes')
      expect(result.current.appliedCity).toBe('Thành phố Hồ Chí Minh')
      expect(result.current.selectedCity).toBe('Thành phố Hồ Chí Minh')
      expect(result.current.selectedProvinceCode).toBe(79)
      expect(result.current.selectedDistrictCode).toBe(765)
      expect(result.current.appliedDistrict).toBe('Bình Thạnh')
      expect(result.current.selectedDistrict).toBe('Bình Thạnh')
      expect(result.current.minPrice).toBe(10)
      expect(result.current.maxPrice).toBe(20)
      expect(result.current.appliedBedroomsFilter).toBe(2)
      expect(result.current.priceLabel).toBe('10 - 20 tr')
      expect(result.current.locationLabel).toBe(
        'Thành phố Hồ Chí Minh • Bình Thạnh'
      )

      // Server-side filters are forwarded to the backend query string
      const requestedPath = String(vi.mocked(apiClient.get).mock.calls[0]?.[0])
      expect(requestedPath).toContain('minPrice=10')
      expect(requestedPath).toContain('maxPrice=20')
      expect(requestedPath).toContain('bedrooms=2')
    })
  })

  describe('Location params shared with home quick search', () => {
    it('initializes city, district and ward from URL params', () => {
      mockSearchParams.set('city', 'Thành phố Hồ Chí Minh')
      mockSearchParams.set('district', 'Quận Bình Thạnh')
      mockSearchParams.set('ward', 'Phường 22')

      const { result } = renderHook(() => usePropertiesFilters())

      expect(result.current.selectedCity).toBe('Thành phố Hồ Chí Minh')
      expect(result.current.selectedWard).toBe('Phường 22')
      expect(result.current.locationLabel).toBe(
        'Thành phố Hồ Chí Minh • Quận Bình Thạnh • Phường 22'
      )
    })
  })

  // Dimension 2: Boundary & Edge Cases
  describe('Dimension 2: Boundary & Edge Cases', () => {
    it('normalizes legacy raw VND prices (e.g. 10,000,000) into millions (10) automatically', () => {
      mockSearchParams.set('minPrice', '10000000')
      mockSearchParams.set('maxPrice', '25000000')

      const { result } = renderHook(() => usePropertiesFilters())

      expect(result.current.minPrice).toBe(10)
      expect(result.current.maxPrice).toBe(25)
      expect(result.current.priceLabel).toBe('10 - 25 tr')

      // parsePriceParam helper validation
      expect(parsePriceParam('10000000')).toBe(10)
      expect(parsePriceParam('15000000')).toBe(15)
      expect(parsePriceParam('25000000')).toBe(25)
      expect(parsePriceParam('10')).toBe(10)
      expect(parsePriceParam('')).toBe('')
      expect(parsePriceParam(null)).toBe('')
    })

    it('handles bedroom format variations ("3+", "4+", "all", empty)', () => {
      expect(parseBedroomsParam('3+')).toBe(3)
      expect(parseBedroomsParam('4+')).toBe(4)
      expect(parseBedroomsParam('2')).toBe(2)
      expect(parseBedroomsParam('all')).toBe('all')
      expect(parseBedroomsParam('')).toBe('all')
      expect(parseBedroomsParam(null)).toBe('all')

      // 4+ bedrooms matching logic
      expect(matchBedrooms(4, 4)).toBe(true)
      expect(matchBedrooms(5, 4)).toBe(true)
      expect(matchBedrooms(3, 4)).toBe(false)
      expect(matchBedrooms(2, 2)).toBe(true)
      expect(matchBedrooms(3, 2)).toBe(false)
      expect(matchBedrooms(1, 'all')).toBe(true)
    })

    it('ignores placeholder district values such as "all" or "Tất cả khu vực"', () => {
      expect(isAllDistrict('all')).toBe(true)
      expect(isAllDistrict('tat ca')).toBe(true)
      expect(isAllDistrict('Tất cả khu vực')).toBe(true)
      expect(isAllDistrict('')).toBe(true)
      expect(isAllDistrict(null)).toBe(true)
      expect(isAllDistrict('Bình Thạnh')).toBe(false)

      expect(matchDistrict('Bình Thạnh', 'all')).toBe(true)
      expect(matchDistrict('Bình Thạnh', 'Tất cả')).toBe(true)
      expect(matchDistrict('Bình Thạnh', 'Bình Thạnh')).toBe(true)
      expect(matchDistrict('Bình Thạnh', 'binh thanh')).toBe(true)
      expect(matchDistrict('Bình Thạnh', 'Quận 1')).toBe(false)
    })

    it('resolves location cascade correctly (province, provinceCode, district, districtCode) from district or city param', () => {
      // Test District in TP.HCM
      const q1 = resolveLocationFromParams(null, 'Quận 1')
      expect(q1.city).toBe('Thành phố Hồ Chí Minh')
      expect(q1.provinceCode).toBe(79)
      expect(q1.district).toBe('Quận 1')
      expect(q1.districtCode).toBe(760)

      // Test District in Hà Nội
      const cauGiay = resolveLocationFromParams(null, 'Cầu Giấy')
      expect(cauGiay.city).toBe('Thành phố Hà Nội')
      expect(cauGiay.provinceCode).toBe(1)
      expect(cauGiay.district).toBe('Cầu Giấy')
      expect(cauGiay.districtCode).toBe(5)

      // Test District in Đà Nẵng
      const haiChau = resolveLocationFromParams(null, 'Hải Châu')
      expect(haiChau.city).toBe('Thành phố Đà Nẵng')
      expect(haiChau.provinceCode).toBe(48)
      expect(haiChau.district).toBe('Hải Châu')
      expect(haiChau.districtCode).toBe(490)

      // Test explicit cityParam with unmapped district
      const explicitCity = resolveLocationFromParams('Hà Nội', 'all')
      expect(explicitCity.city).toBe('Thành phố Hà Nội')
      expect(explicitCity.provinceCode).toBe(1)
      expect(explicitCity.district).toBe('')
      expect(explicitCity.districtCode).toBeNull()

      // Test empty / all
      const empty = resolveLocationFromParams('', '')
      expect(empty.city).toBe('')
      expect(empty.provinceCode).toBeNull()
      expect(empty.district).toBe('')
      expect(empty.districtCode).toBeNull()

      // Test resolveProvinceFromCity directly
      expect(resolveProvinceFromCity('TP.HCM')).toEqual({
        name: 'Thành phố Hồ Chí Minh',
        code: 79,
      })
      expect(resolveProvinceFromCity('Hà Nội')).toEqual({
        name: 'Thành phố Hà Nội',
        code: 1,
      })
      expect(resolveProvinceFromCity('Đà Nẵng')).toEqual({
        name: 'Thành phố Đà Nẵng',
        code: 48,
      })
      expect(resolveProvinceFromCity('Bình Dương')).toEqual({
        name: 'Tỉnh Bình Dương',
        code: 74,
      })
      expect(resolveProvinceFromCity('')).toBeNull()
      expect(resolveProvinceFromCity(null)).toBeNull()
    })

    it('auto-resolves province and codes in hook when navigating with only district=Quận 1', () => {
      mockSearchParams.set('district', 'Quận 1')

      const { result } = renderHook(() => usePropertiesFilters())

      expect(result.current.selectedCity).toBe('Thành phố Hồ Chí Minh')
      expect(result.current.appliedCity).toBe('Thành phố Hồ Chí Minh')
      expect(result.current.selectedProvinceCode).toBe(79)
      expect(result.current.selectedDistrict).toBe('Quận 1')
      expect(result.current.appliedDistrict).toBe('Quận 1')
      expect(result.current.selectedDistrictCode).toBe(760)
      expect(result.current.locationLabel).toBe(
        'Thành phố Hồ Chí Minh • Quận 1'
      )
    })
  })

  // Dimension 3: Negative & Fallback Scenarios
  describe('Dimension 3: Negative Scenarios & Exception Handling', () => {
    it('handles negative or invalid prices gracefully without breaking', () => {
      expect(parsePriceParam('-5')).toBe('')
      expect(parsePriceParam('abc')).toBe('')
      expect(parsePriceParam('0')).toBe('')
    })

    it('keeps the list empty and exposes the error when backend API request fails', async () => {
      const errorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => undefined)
      vi.mocked(apiClient.get).mockRejectedValue(new Error('Network down'))
      const { result } = renderHook(() => usePropertiesFilters())

      await waitFor(() => {
        expect(result.current.apartmentsError?.message).toBe('Network down')
      })
      expect(result.current.filteredApartments).toEqual([])
      expect(result.current.apiProjects).toEqual([])
      expect(result.current.projectsError?.message).toBe('Network down')
      errorSpy.mockRestore()
    })

    it('returns projects from the backend and clears the project error', async () => {
      vi.mocked(apiClient.get).mockImplementation((path: string) =>
        Promise.resolve(
          path.startsWith('/projects')
            ? [{ id: 'p1', name: 'Dự án A' }]
            : [makeApartment()]
        )
      )
      const { result } = renderHook(() => usePropertiesFilters())

      await waitFor(() => {
        expect(result.current.apiProjects).toHaveLength(1)
      })
      expect(result.current.projectsError).toBeNull()
    })
  })

  // Dimension 4: Full Branch Coverage
  describe('Dimension 4: Full Branch Coverage', () => {
    it('matches apartment keyword across project name, project name, and district', () => {
      const sampleApt = makeApartment()

      // Match by title
      expect(matchApartmentKeyword(sampleApt, sampleApt.title)).toBe(true)
      // Match by projectName
      if (sampleApt.projectName) {
        expect(matchApartmentKeyword(sampleApt, sampleApt.projectName)).toBe(
          true
        )
      }
      // Match by district
      if (sampleApt.district) {
        expect(matchApartmentKeyword(sampleApt, sampleApt.district)).toBe(true)
      }
      // Non-matching query
      expect(
        matchApartmentKeyword(sampleApt, 'Không tồn tại từ khóa xyz123')
      ).toBe(false)
    })

    it('supports resetFilters to clear all filters back to default values', () => {
      mockSearchParams.set('search', 'Masteri')
      mockSearchParams.set('district', 'Quận 2')
      mockSearchParams.set('minPrice', '15')

      const { result } = renderHook(() => usePropertiesFilters())

      expect(result.current.searchKeyword).toBe('Masteri')
      expect(result.current.appliedDistrict).toBe('Quận 2')

      act(() => {
        result.current.resetFilters()
      })

      expect(result.current.searchKeyword).toBe('')
      expect(result.current.appliedDistrict).toBe('')
      expect(result.current.minPrice).toBe('')
      expect(result.current.maxPrice).toBe('')
      expect(result.current.appliedBedroomsFilter).toBe('all')
      expect(result.current.locationLabel).toBe('Toàn quốc')
      expect(result.current.priceLabel).toBe('Tất cả')
    })
  })

  // Dimension 5: Safe Isolation & Vietnamese Tone Normalization
  describe('Dimension 5: Safe Isolation & Tone Resilience', () => {
    it('properly strips tones and diacritics via removeVietnameseTones', () => {
      expect(removeVietnameseTones('Bình Thạnh')).toBe('binh thanh')
      expect(removeVietnameseTones('Đà Nẵng')).toBe('da nang')
      expect(removeVietnameseTones('Thủ Đức')).toBe('thu duc')
      expect(removeVietnameseTones('QUẬN 1')).toBe('quan 1')
    })
  })
})
