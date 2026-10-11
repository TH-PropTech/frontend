import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import {
  useVietnamLocations,
  clearLocationsCache,
} from './use-vietnam-locations'

const PROVINCES = [
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

const WARDS = [
  {
    name: 'Phường Vườn Lài',
    code: 27190,
    division_type: 'phường',
    codename: 'phuong_vuon_lai',
    province_code: 79,
  },
  {
    name: 'Phường An Hội Đông',
    code: 26911,
    division_type: 'phường',
    codename: 'phuong_an_hoi_dong',
    province_code: 79,
  },
]

describe('useVietnamLocations (cơ cấu hành chính từ 1/7/2025)', () => {
  const originalFetch = global.fetch

  beforeEach(() => {
    vi.restoreAllMocks()
    clearLocationsCache()
  })

  afterEach(() => {
    global.fetch = originalFetch
  })

  it('fetches provinces from the v2 API on mount', async () => {
    const fetchMock = vi.fn().mockImplementation((url: string) => {
      if (url.endsWith('/api/v2/p/')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(PROVINCES),
        })
      }
      return Promise.reject(new Error('Unknown URL'))
    })
    global.fetch = fetchMock

    const { result } = renderHook(() => useVietnamLocations(null))

    await waitFor(() => {
      expect(result.current.isLoadingProvinces).toBe(false)
    })

    expect(result.current.provinces).toHaveLength(2)
    expect(result.current.provinces[0]?.name).toBe('Thành phố Hà Nội')
    expect(result.current.districts).toEqual([])
    expect(fetchMock).not.toHaveBeenCalledWith(
      expect.stringContaining('/api/p/'),
      expect.anything()
    )
  })

  it('loads wards directly under the province, sorted by name, with no district level', async () => {
    global.fetch = vi.fn().mockImplementation((url: string) => {
      if (url.endsWith('/api/v2/p/')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
      }
      if (url.includes('/api/v2/p/79?depth=2')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ wards: WARDS }),
        })
      }
      return Promise.reject(new Error('Unknown URL'))
    })

    const { result } = renderHook(() => useVietnamLocations(79))

    await waitFor(() => {
      expect(result.current.wards).toHaveLength(2)
    })

    expect(result.current.wards.map(ward => ward.name)).toEqual([
      'Phường An Hội Đông',
      'Phường Vườn Lài',
    ])
    expect(result.current.districts).toEqual([])
    expect(result.current.isLoadingDistricts).toBe(false)
  })

  it('returns no wards when no province is selected', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    })

    const { result } = renderHook(() => useVietnamLocations(null))

    await waitFor(() => {
      expect(result.current.isLoadingProvinces).toBe(false)
    })
    expect(result.current.wards).toEqual([])
  })

  it('returns an empty ward list when the ward request fails', async () => {
    global.fetch = vi.fn().mockImplementation((url: string) => {
      if (url.endsWith('/api/v2/p/')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
      }
      return Promise.resolve({ ok: false, status: 500 })
    })

    const { result } = renderHook(() => useVietnamLocations(79))

    await waitFor(() => {
      expect(result.current.isLoadingWards).toBe(false)
    })
    expect(result.current.wards).toEqual([])
  })
})
