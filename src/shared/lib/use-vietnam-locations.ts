'use client'

import * as React from 'react'

// ── Public API: https://provinces.open-api.vn ──

const PROVINCES_API_BASE = 'https://provinces.open-api.vn/api'

export interface Province {
  name: string
  code: number
  division_type: string
  codename: string
  phone_code: number
}

export interface District {
  name: string
  code: number
  division_type: string
  codename: string
  province_code: number
}

export interface Ward {
  name: string
  code: number
  division_type: string
  codename: string
  district_code: number
}

// Simple in-memory cache to avoid refetching the same data
let provincesCache: Province[] | null = null
const districtsCache = new Map<number, District[]>()
const wardsCache = new Map<number, Ward[]>()

export function clearLocationsCache(): void {
  provincesCache = null
  districtsCache.clear()
  wardsCache.clear()
}

async function fetchProvinces(): Promise<Province[]> {
  if (provincesCache) return provincesCache

  const res = await fetch(`${PROVINCES_API_BASE}/p/`)
  if (!res.ok) {
    throw new Error(`Failed to fetch provinces: ${res.status}`)
  }
  const data = (await res.json()) as Province[]
  provincesCache = data
  return data
}

async function fetchDistricts(provinceCode: number): Promise<District[]> {
  const cached = districtsCache.get(provinceCode)
  if (cached) return cached

  const res = await fetch(`${PROVINCES_API_BASE}/p/${provinceCode}?depth=2`)
  if (!res.ok) {
    throw new Error(`Failed to fetch districts: ${res.status}`)
  }
  const data = (await res.json()) as { districts: District[] }
  const districts = data.districts ?? []
  districtsCache.set(provinceCode, districts)
  return districts
}

async function fetchWards(districtCode: number): Promise<Ward[]> {
  const cached = wardsCache.get(districtCode)
  if (cached) return cached

  const res = await fetch(`${PROVINCES_API_BASE}/d/${districtCode}?depth=2`)
  if (!res.ok) {
    throw new Error(`Failed to fetch wards: ${res.status}`)
  }
  const data = (await res.json()) as { wards: Ward[] }
  const wards = data.wards ?? []
  wardsCache.set(districtCode, wards)
  return wards
}

/**
 * Hook lấy dữ liệu hành chính Việt Nam (Tỉnh/Thành phố → Quận/Huyện → Phường/Xã)
 * từ API công khai provinces.open-api.vn.
 *
 * Cascade: chọn Tỉnh → load Quận; chọn Quận → load Phường.
 * Có in-memory cache tránh gọi API lại khi chọn lại cùng tỉnh/quận.
 */
export function useVietnamLocations(
  provinceCode: number | null,
  districtCode: number | null
): {
  provinces: Province[]
  districts: District[]
  wards: Ward[]
  isLoadingProvinces: boolean
  isLoadingDistricts: boolean
  isLoadingWards: boolean
} {
  const [provinces, setProvinces] = React.useState<Province[]>([])
  const [districts, setDistricts] = React.useState<District[]>([])
  const [wards, setWards] = React.useState<Ward[]>([])

  const [isLoadingProvinces, setIsLoadingProvinces] = React.useState(false)
  const [isLoadingDistricts, setIsLoadingDistricts] = React.useState(false)
  const [isLoadingWards, setIsLoadingWards] = React.useState(false)

  // 1. Load provinces (once on mount)
  React.useEffect(() => {
    let active = true

    const loadProvinces = async (): Promise<void> => {
      setIsLoadingProvinces(true)
      try {
        const data = await fetchProvinces()
        if (active) setProvinces(data)
      } catch {
        // Fallback or ignore
      } finally {
        if (active) setIsLoadingProvinces(false)
      }
    }

    void loadProvinces()

    return () => {
      active = false
    }
  }, [])

  // 2. Load districts when province changes
  React.useEffect(() => {
    let active = true

    const loadDistricts = async (): Promise<void> => {
      if (provinceCode === null) {
        setDistricts([])
        return
      }

      setIsLoadingDistricts(true)
      try {
        const data = await fetchDistricts(provinceCode)
        if (active) setDistricts(data)
      } catch {
        if (active) setDistricts([])
      } finally {
        if (active) setIsLoadingDistricts(false)
      }
    }

    void loadDistricts()

    return () => {
      active = false
    }
  }, [provinceCode])

  // 3. Load wards when district changes
  React.useEffect(() => {
    let active = true

    const loadWards = async (): Promise<void> => {
      if (districtCode === null) {
        setWards([])
        return
      }

      setIsLoadingWards(true)
      try {
        const data = await fetchWards(districtCode)
        if (active) setWards(data)
      } catch {
        if (active) setWards([])
      } finally {
        if (active) setIsLoadingWards(false)
      }
    }

    void loadWards()

    return () => {
      active = false
    }
  }, [districtCode])

  return {
    provinces,
    districts,
    wards,
    isLoadingProvinces,
    isLoadingDistricts,
    isLoadingWards,
  }
}
