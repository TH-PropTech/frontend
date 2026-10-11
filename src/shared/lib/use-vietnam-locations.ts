'use client'

import * as React from 'react'

// ── Public API: https://provinces.open-api.vn (v2: cơ cấu hành chính từ 1/7/2025) ──
// 34 tỉnh/thành, KHÔNG còn cấp Quận/Huyện: phường/xã nằm trực tiếp dưới tỉnh/thành.

const PROVINCES_API_BASE = 'https://provinces.open-api.vn/api/v2'

export interface Province {
  name: string
  code: number
  division_type: string
  codename: string
  phone_code: number
}

export interface Ward {
  name: string
  code: number
  division_type: string
  codename: string
  province_code: number
}

// Simple in-memory cache to avoid refetching the same data
let provincesCache: Province[] | null = null
const wardsCache = new Map<number, Ward[]>()

export function clearLocationsCache(): void {
  provincesCache = null
  wardsCache.clear()
}

export async function fetchProvinces(): Promise<Province[]> {
  if (provincesCache) return provincesCache

  const res = await fetch(`${PROVINCES_API_BASE}/p/`)
  if (!res.ok) {
    throw new Error(`Failed to fetch provinces: ${res.status}`)
  }
  const data = (await res.json()) as Province[]
  provincesCache = data
  return data
}

export async function fetchWards(provinceCode: number): Promise<Ward[]> {
  const cached = wardsCache.get(provinceCode)
  if (cached) return cached

  const res = await fetch(`${PROVINCES_API_BASE}/p/${provinceCode}?depth=2`)
  if (!res.ok) {
    throw new Error(`Failed to fetch wards: ${res.status}`)
  }
  const data = (await res.json()) as { wards?: Ward[] }
  const wards = [...(data.wards ?? [])].sort((a, b) =>
    a.name.localeCompare(b.name, 'vi')
  )
  wardsCache.set(provinceCode, wards)
  return wards
}

/**
 * Hook lấy dữ liệu hành chính Việt Nam theo cơ cấu mới (Tỉnh/Thành phố → Phường/Xã).
 * Có in-memory cache tránh gọi API lại khi chọn lại cùng tỉnh.
 * `districts` luôn rỗng: giữ lại trong kết quả để các nơi dùng cũ không phải đổi hình dạng dữ liệu.
 */
export function useVietnamLocations(provinceCode: number | null): {
  provinces: Province[]
  districts: never[]
  wards: Ward[]
  isLoadingProvinces: boolean
  isLoadingDistricts: boolean
  isLoadingWards: boolean
} {
  const [provinces, setProvinces] = React.useState<Province[]>([])
  const [wards, setWards] = React.useState<Ward[]>([])
  const [isLoadingProvinces, setIsLoadingProvinces] = React.useState(false)
  const [isLoadingWards, setIsLoadingWards] = React.useState(false)

  React.useEffect(() => {
    let active = true
    const load = async (): Promise<void> => {
      setIsLoadingProvinces(true)
      try {
        const data = await fetchProvinces()
        if (active) setProvinces(data)
      } catch {
        // Bỏ qua: giao diện giữ danh sách rỗng.
      } finally {
        if (active) setIsLoadingProvinces(false)
      }
    }
    void load()
    return () => {
      active = false
    }
  }, [])

  React.useEffect(() => {
    let active = true
    const load = async (): Promise<void> => {
      if (provinceCode === null) {
        setWards([])
        return
      }
      setIsLoadingWards(true)
      try {
        const data = await fetchWards(provinceCode)
        if (active) setWards(data)
      } catch {
        if (active) setWards([])
      } finally {
        if (active) setIsLoadingWards(false)
      }
    }
    void load()
    return () => {
      active = false
    }
  }, [provinceCode])

  return {
    provinces,
    districts: [],
    wards,
    isLoadingProvinces,
    isLoadingDistricts: false,
    isLoadingWards,
  }
}
