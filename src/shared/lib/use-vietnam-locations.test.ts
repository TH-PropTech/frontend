import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import {
  useVietnamLocations,
  clearLocationsCache,
} from './use-vietnam-locations'

describe('useVietnamLocations', () => {
  const originalFetch = global.fetch

  beforeEach(() => {
    vi.restoreAllMocks()
    clearLocationsCache()
  })

  afterEach(() => {
    global.fetch = originalFetch
  })

  it('fetches provinces on mount and updates state', async () => {
    const mockProvinces = [
      {
        name: 'Thành phố Hà Nội',
        code: 1,
        division_type: 'thành phố trung ương',
        codename: 'ha_noi',
        phone_code: 24,
      },
      {
        name: 'Thành phố Hồ Chí Minh',
        code: 79,
        division_type: 'thành phố trung ương',
        codename: 'ho_chi_minh',
        phone_code: 28,
      },
    ]

    global.fetch = vi.fn().mockImplementation((url: string) => {
      if (url.includes('/api/p/')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProvinces),
        })
      }
      return Promise.reject(new Error('Unknown URL'))
    })

    const { result } = renderHook(() => useVietnamLocations(null, null))

    await waitFor(() => {
      expect(result.current.isLoadingProvinces).toBe(false)
    })

    expect(result.current.provinces).toHaveLength(2)
    expect(result.current.provinces[0]?.name).toBe('Thành phố Hà Nội')
  })

  it('fetches districts when provinceCode is provided', async () => {
    const mockDistricts = [
      {
        name: 'Quận 1',
        code: 760,
        division_type: 'quận',
        codename: 'quan_1',
        province_code: 79,
      },
      {
        name: 'Quận 7',
        code: 778,
        division_type: 'quận',
        codename: 'quan_7',
        province_code: 79,
      },
    ]

    global.fetch = vi.fn().mockImplementation((url: string) => {
      if (url.endsWith('/api/p/')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([]),
        })
      }
      if (url.includes('/api/p/79?depth=2')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ districts: mockDistricts }),
        })
      }
      return Promise.reject(new Error('Unknown URL'))
    })

    const { result } = renderHook(() => useVietnamLocations(79, null))

    await waitFor(() => {
      expect(result.current.isLoadingDistricts).toBe(false)
    })

    expect(result.current.districts).toHaveLength(2)
    expect(result.current.districts[0]?.name).toBe('Quận 1')
  })

  it('fetches wards when districtCode is provided', async () => {
    const mockWards = [
      {
        name: 'Phường Bến Nghé',
        code: 26740,
        division_type: 'phường',
        codename: 'phuong_ben_nghe',
        district_code: 760,
      },
      {
        name: 'Phường Bến Thành',
        code: 26743,
        division_type: 'phường',
        codename: 'phuong_ben_thanh',
        district_code: 760,
      },
    ]

    global.fetch = vi.fn().mockImplementation((url: string) => {
      if (url.endsWith('/api/p/')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([]),
        })
      }
      if (url.includes('/api/d/760?depth=2')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ wards: mockWards }),
        })
      }
      return Promise.reject(new Error('Unknown URL'))
    })

    const { result } = renderHook(() => useVietnamLocations(79, 760))

    await waitFor(() => {
      expect(result.current.isLoadingWards).toBe(false)
    })

    expect(result.current.wards).toHaveLength(2)
    expect(result.current.wards[0]?.name).toBe('Phường Bến Nghé')
  })

  it('handles API errors gracefully without crashing', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network Error'))

    const { result } = renderHook(() => useVietnamLocations(999, 999))

    await waitFor(() => {
      expect(result.current.isLoadingProvinces).toBe(false)
      expect(result.current.isLoadingDistricts).toBe(false)
      expect(result.current.isLoadingWards).toBe(false)
    })

    expect(result.current.provinces).toEqual([])
    expect(result.current.districts).toEqual([])
    expect(result.current.wards).toEqual([])
  })
})
