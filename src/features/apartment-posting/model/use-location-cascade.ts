import * as React from 'react'
import type { UseFormSetValue } from 'react-hook-form'
import {
  fetchProvinces,
  fetchWards,
  type Province,
  type Ward,
} from '@/shared/lib/use-vietnam-locations'
import type { ApartmentFormValues } from './types'

interface UseLocationCascadeProps {
  city: string
  /** Giữ lại cho tương thích: cơ cấu hành chính từ 1/7/2025 không còn Quận/Huyện. */
  district?: string
  setValue: UseFormSetValue<ApartmentFormValues>
}

const PROVINCE_PREFIX = /^(tỉnh|thành phố|tp.?)s+/i
const WARD_PREFIX = /^(phường|xã|thị trấn|đặc khu)s+/i

const normalize = (value: string, prefix: RegExp): string =>
  value.toLowerCase().replace(prefix, '').trim()

function findProvince(provinces: Province[], name: string): Province | null {
  const search = normalize(name, PROVINCE_PREFIX)
  if (!search) return null
  return (
    provinces.find(province => {
      const candidate = normalize(province.name, PROVINCE_PREFIX)
      return (
        candidate === search ||
        (search === 'tp.hcm' && candidate === 'hồ chí minh')
      )
    }) ?? null
  )
}

/** Địa chỉ mới: Tỉnh/Thành phố → Phường/Xã (không còn cấp Quận/Huyện). */
export function useLocationCascade({
  city,
  setValue,
}: UseLocationCascadeProps): {
  cities: string[]
  districts: string[]
  wards: string[]
  autoFillAddress: (locStr?: string, fallbackCity?: string) => Promise<void>
} {
  const [provinces, setProvinces] = React.useState<Province[]>([])
  const [loadedWards, setLoadedWards] = React.useState<{
    code: number
    list: Ward[]
  } | null>(null)
  const currentProvince = React.useMemo(
    () => findProvince(provinces, city),
    [provinces, city]
  )

  React.useEffect(() => {
    let active = true
    fetchProvinces()
      .then(data => {
        if (active) setProvinces(data)
      })
      .catch((cause: unknown) => {
        console.error('Error fetching provinces:', cause)
      })
    return () => {
      active = false
    }
  }, [])

  const provinceCode = currentProvince?.code ?? null
  React.useEffect(() => {
    if (provinceCode === null) return
    let active = true
    fetchWards(provinceCode)
      .then(data => {
        if (active) setLoadedWards({ code: provinceCode, list: data })
      })
      .catch((cause: unknown) => {
        console.error('Error fetching wards:', cause)
      })
    return () => {
      active = false
    }
  }, [provinceCode])

  const cities = React.useMemo(() => provinces.map(p => p.name), [provinces])
  const wards = React.useMemo(
    () =>
      provinceCode !== null && loadedWards?.code === provinceCode
        ? loadedWards.list.map(w => w.name)
        : [],
    [provinceCode, loadedWards]
  )

  /**
   * Điền sẵn địa chỉ khi chọn dự án/tòa nhà. Chuỗi cũ có dạng "đường, phường, quận, tỉnh":
   * chỉ lấy tỉnh và phường nếu còn trùng với cơ cấu mới, phần quận bị bỏ qua.
   */
  const autoFillAddress = React.useCallback(
    async (locStr?: string, fallbackCity?: string): Promise<void> => {
      if (!locStr) return
      const parts = locStr.split(',').map(part => part.trim())
      const cityName = parts.length >= 2 ? (parts[parts.length - 1] ?? '') : ''
      const wardName = parts.length >= 3 ? (parts[1] ?? '') : ''
      const street = parts.length >= 4 ? (parts[0] ?? '') : ''

      let source = provinces
      if (source.length === 0) {
        try {
          source = await fetchProvinces()
        } catch {
          return
        }
      }
      const province = findProvince(source, cityName || fallbackCity || '')
      if (!province) return
      setValue('city', province.name, { shouldValidate: true })
      setValue('district', '')

      try {
        const list = await fetchWards(province.code)
        setLoadedWards({ code: province.code, list })
        const search = normalize(wardName, WARD_PREFIX)
        const matched = search
          ? list.find(w => normalize(w.name, WARD_PREFIX) === search)
          : undefined
        setValue('ward', matched?.name ?? '', { shouldValidate: true })
      } catch (cause) {
        console.error('Error in address auto-fill:', cause)
      }
      if (street) setValue('street', street, { shouldValidate: true })
    },
    [provinces, setValue]
  )

  return { cities, districts: [], wards, autoFillAddress }
}
