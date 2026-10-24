'use client'

import * as React from 'react'
import { useSearchParams } from 'next/navigation'
import {
  mockProjects,
  mockApartments,
  ApartmentItem,
  type ApiProjectItem,
} from '@/entities/properties'
import { apiClient } from '@/shared/api/api-client'
import { env } from '@/shared/config/env'
export function removeVietnameseTones(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim()
}

export function parsePriceParam(val: string | null | undefined): number | '' {
  if (!val) return ''
  const num = Number(val)
  if (isNaN(num) || num <= 0) return ''
  // If value is >= 1,000,000 (e.g. legacy VND value 10000000), convert to millions (10)
  if (num >= 1_000_000) {
    return Math.round(num / 1_000_000)
  }
  return num
}

export function parseBedroomsParam(
  val: string | null | undefined
): number | 'all' {
  if (!val || val === 'all') return 'all'
  const clean = String(val).replace('+', '').trim()
  const num = Number(clean)
  if (isNaN(num) || num <= 0) return 'all'
  return num
}

export function isAllDistrict(district?: string | null): boolean {
  if (!district) return true
  const norm = removeVietnameseTones(district)
  return (
    norm === '' ||
    norm === 'all' ||
    norm === 'tat ca' ||
    norm === 'tat ca khu vuc'
  )
}

export function matchDistrict(
  itemDistrict?: string,
  targetDistrict?: string | null
): boolean {
  if (isAllDistrict(targetDistrict)) return true
  if (!itemDistrict) return false
  return (
    removeVietnameseTones(itemDistrict) ===
    removeVietnameseTones(targetDistrict!)
  )
}

export function matchBedrooms(
  itemBedrooms: number | undefined,
  targetFilter: number | 'all'
): boolean {
  if (targetFilter === 'all') return true
  if (itemBedrooms === undefined) return false
  if (targetFilter >= 4) {
    return itemBedrooms >= targetFilter
  }
  return itemBedrooms === targetFilter
}

export function matchApartmentKeyword(
  apt: ApartmentItem,
  keyword: string
): boolean {
  if (!keyword.trim()) return true
  const kw = removeVietnameseTones(keyword)
  const fields = [
    apt.title,
    apt.description,
    apt.location,
    apt.projectName,
    apt.district,
    apt.street,
    apt.ward,
  ]
  return fields.some(f => f && removeVietnameseTones(f).includes(kw))
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

export function resolveProvinceFromCity(
  city?: string | null
): { name: string; code: number } | null {
  if (!city) return null
  const norm = removeVietnameseTones(city)
  if (
    norm.includes('ho chi minh') ||
    norm.includes('tp.hcm') ||
    norm.includes('tphcm') ||
    norm.includes('hcm') ||
    norm.includes('sai gon')
  ) {
    return { name: 'Thành phố Hồ Chí Minh', code: 79 }
  }
  if (norm.includes('ha noi') || norm === 'hn') {
    return { name: 'Thành phố Hà Nội', code: 1 }
  }
  if (norm.includes('da nang') || norm === 'dn') {
    return { name: 'Thành phố Đà Nẵng', code: 48 }
  }
  if (norm.includes('binh duong')) {
    return { name: 'Tỉnh Bình Dương', code: 74 }
  }
  return null
}

export interface DistrictMapping {
  provinceName: string
  provinceCode: number
  districtCode: number
  officialDistrictName: string
}

export const DISTRICT_TO_PROVINCE_MAP: Record<string, DistrictMapping> = {
  // TP. Hồ Chí Minh (Code: 79)
  '1': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 760,
    officialDistrictName: 'Quận 1',
  },
  'quan 1': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 760,
    officialDistrictName: 'Quận 1',
  },
  '2': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 769,
    officialDistrictName: 'Thành phố Thủ Đức',
  },
  'quan 2': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 769,
    officialDistrictName: 'Thành phố Thủ Đức',
  },
  '3': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 770,
    officialDistrictName: 'Quận 3',
  },
  'quan 3': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 770,
    officialDistrictName: 'Quận 3',
  },
  '4': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 773,
    officialDistrictName: 'Quận 4',
  },
  'quan 4': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 773,
    officialDistrictName: 'Quận 4',
  },
  '5': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 774,
    officialDistrictName: 'Quận 5',
  },
  'quan 5': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 774,
    officialDistrictName: 'Quận 5',
  },
  '6': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 775,
    officialDistrictName: 'Quận 6',
  },
  'quan 6': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 775,
    officialDistrictName: 'Quận 6',
  },
  '7': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 778,
    officialDistrictName: 'Quận 7',
  },
  'quan 7': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 778,
    officialDistrictName: 'Quận 7',
  },
  '8': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 776,
    officialDistrictName: 'Quận 8',
  },
  'quan 8': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 776,
    officialDistrictName: 'Quận 8',
  },
  '9': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 769,
    officialDistrictName: 'Thành phố Thủ Đức',
  },
  'quan 9': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 769,
    officialDistrictName: 'Thành phố Thủ Đức',
  },
  '10': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 771,
    officialDistrictName: 'Quận 10',
  },
  'quan 10': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 771,
    officialDistrictName: 'Quận 10',
  },
  '11': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 772,
    officialDistrictName: 'Quận 11',
  },
  'quan 11': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 772,
    officialDistrictName: 'Quận 11',
  },
  '12': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 761,
    officialDistrictName: 'Quận 12',
  },
  'quan 12': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 761,
    officialDistrictName: 'Quận 12',
  },
  'binh thanh': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 765,
    officialDistrictName: 'Quận Bình Thạnh',
  },
  'quan binh thanh': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 765,
    officialDistrictName: 'Quận Bình Thạnh',
  },
  'thu duc': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 769,
    officialDistrictName: 'Thành phố Thủ Đức',
  },
  'thanh pho thu duc': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 769,
    officialDistrictName: 'Thành phố Thủ Đức',
  },
  'go vap': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 764,
    officialDistrictName: 'Quận Gò Vấp',
  },
  'quan go vap': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 764,
    officialDistrictName: 'Quận Gò Vấp',
  },
  'phu nhuan': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 768,
    officialDistrictName: 'Quận Phú Nhuận',
  },
  'quan phu nhuan': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 768,
    officialDistrictName: 'Quận Phú Nhuận',
  },
  'tan binh': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 766,
    officialDistrictName: 'Quận Tân Bình',
  },
  'quan tan binh': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 766,
    officialDistrictName: 'Quận Tân Bình',
  },
  'tan phu': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 767,
    officialDistrictName: 'Quận Tân Phú',
  },
  'quan tan phu': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 767,
    officialDistrictName: 'Quận Tân Phú',
  },
  'binh tan': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 777,
    officialDistrictName: 'Quận Bình Tân',
  },
  'quan binh tan': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 777,
    officialDistrictName: 'Quận Bình Tân',
  },
  'nha be': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 786,
    officialDistrictName: 'Huyện Nhà Bè',
  },
  'huyen nha be': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 786,
    officialDistrictName: 'Huyện Nhà Bè',
  },
  'hoc mon': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 784,
    officialDistrictName: 'Huyện Hóc Môn',
  },
  'huyen hoc mon': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 784,
    officialDistrictName: 'Huyện Hóc Môn',
  },
  'cu chi': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 783,
    officialDistrictName: 'Huyện Củ Chi',
  },
  'huyen cu chi': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 783,
    officialDistrictName: 'Huyện Củ Chi',
  },
  'binh chanh': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 785,
    officialDistrictName: 'Huyện Bình Chánh',
  },
  'huyen binh chanh': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 785,
    officialDistrictName: 'Huyện Bình Chánh',
  },
  'can gio': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 787,
    officialDistrictName: 'Huyện Cần Giờ',
  },
  'huyen can gio': {
    provinceName: 'Thành phố Hồ Chí Minh',
    provinceCode: 79,
    districtCode: 787,
    officialDistrictName: 'Huyện Cần Giờ',
  },

  // Hà Nội (Code: 1)
  'ba dinh': {
    provinceName: 'Thành phố Hà Nội',
    provinceCode: 1,
    districtCode: 1,
    officialDistrictName: 'Quận Ba Đình',
  },
  'quan ba dinh': {
    provinceName: 'Thành phố Hà Nội',
    provinceCode: 1,
    districtCode: 1,
    officialDistrictName: 'Quận Ba Đình',
  },
  'hoan kiem': {
    provinceName: 'Thành phố Hà Nội',
    provinceCode: 1,
    districtCode: 2,
    officialDistrictName: 'Quận Hoàn Kiếm',
  },
  'quan hoan kiem': {
    provinceName: 'Thành phố Hà Nội',
    provinceCode: 1,
    districtCode: 2,
    officialDistrictName: 'Quận Hoàn Kiếm',
  },
  'tay ho': {
    provinceName: 'Thành phố Hà Nội',
    provinceCode: 1,
    districtCode: 3,
    officialDistrictName: 'Quận Tây Hồ',
  },
  'quan tay ho': {
    provinceName: 'Thành phố Hà Nội',
    provinceCode: 1,
    districtCode: 3,
    officialDistrictName: 'Quận Tây Hồ',
  },
  'long bien': {
    provinceName: 'Thành phố Hà Nội',
    provinceCode: 1,
    districtCode: 4,
    officialDistrictName: 'Quận Long Biên',
  },
  'quan long bien': {
    provinceName: 'Thành phố Hà Nội',
    provinceCode: 1,
    districtCode: 4,
    officialDistrictName: 'Quận Long Biên',
  },
  'cau giay': {
    provinceName: 'Thành phố Hà Nội',
    provinceCode: 1,
    districtCode: 5,
    officialDistrictName: 'Quận Cầu Giấy',
  },
  'quan cau giay': {
    provinceName: 'Thành phố Hà Nội',
    provinceCode: 1,
    districtCode: 5,
    officialDistrictName: 'Quận Cầu Giấy',
  },
  'dong da': {
    provinceName: 'Thành phố Hà Nội',
    provinceCode: 1,
    districtCode: 6,
    officialDistrictName: 'Quận Đống Đa',
  },
  'quan dong da': {
    provinceName: 'Thành phố Hà Nội',
    provinceCode: 1,
    districtCode: 6,
    officialDistrictName: 'Quận Đống Đa',
  },
  'hai ba trung': {
    provinceName: 'Thành phố Hà Nội',
    provinceCode: 1,
    districtCode: 7,
    officialDistrictName: 'Quận Hai Bà Trưng',
  },
  'quan hai ba trung': {
    provinceName: 'Thành phố Hà Nội',
    provinceCode: 1,
    districtCode: 7,
    officialDistrictName: 'Quận Hai Bà Trưng',
  },
  'hoang mai': {
    provinceName: 'Thành phố Hà Nội',
    provinceCode: 1,
    districtCode: 8,
    officialDistrictName: 'Quận Hoàng Mai',
  },
  'quan hoang mai': {
    provinceName: 'Thành phố Hà Nội',
    provinceCode: 1,
    districtCode: 8,
    officialDistrictName: 'Quận Hoàng Mai',
  },
  'thanh xuan': {
    provinceName: 'Thành phố Hà Nội',
    provinceCode: 1,
    districtCode: 9,
    officialDistrictName: 'Quận Thanh Xuân',
  },
  'quan thanh xuan': {
    provinceName: 'Thành phố Hà Nội',
    provinceCode: 1,
    districtCode: 9,
    officialDistrictName: 'Quận Thanh Xuân',
  },
  'nam tu liem': {
    provinceName: 'Thành phố Hà Nội',
    provinceCode: 1,
    districtCode: 19,
    officialDistrictName: 'Quận Nam Từ Liêm',
  },
  'quan nam tu liem': {
    provinceName: 'Thành phố Hà Nội',
    provinceCode: 1,
    districtCode: 19,
    officialDistrictName: 'Quận Nam Từ Liêm',
  },
  'bac tu liem': {
    provinceName: 'Thành phố Hà Nội',
    provinceCode: 1,
    districtCode: 21,
    officialDistrictName: 'Quận Bắc Từ Liêm',
  },
  'quan bac tu liem': {
    provinceName: 'Thành phố Hà Nội',
    provinceCode: 1,
    districtCode: 21,
    officialDistrictName: 'Quận Bắc Từ Liêm',
  },
  'ha dong': {
    provinceName: 'Thành phố Hà Nội',
    provinceCode: 1,
    districtCode: 268,
    officialDistrictName: 'Quận Hà Đông',
  },
  'quan ha dong': {
    provinceName: 'Thành phố Hà Nội',
    provinceCode: 1,
    districtCode: 268,
    officialDistrictName: 'Quận Hà Đông',
  },

  // Đà Nẵng (Code: 48)
  'hai chau': {
    provinceName: 'Thành phố Đà Nẵng',
    provinceCode: 48,
    districtCode: 490,
    officialDistrictName: 'Quận Hải Châu',
  },
  'quan hai chau': {
    provinceName: 'Thành phố Đà Nẵng',
    provinceCode: 48,
    districtCode: 490,
    officialDistrictName: 'Quận Hải Châu',
  },
  'thanh khe': {
    provinceName: 'Thành phố Đà Nẵng',
    provinceCode: 48,
    districtCode: 491,
    officialDistrictName: 'Quận Thanh Khê',
  },
  'quan thanh khe': {
    provinceName: 'Thành phố Đà Nẵng',
    provinceCode: 48,
    districtCode: 491,
    officialDistrictName: 'Quận Thanh Khê',
  },
  'son tra': {
    provinceName: 'Thành phố Đà Nẵng',
    provinceCode: 48,
    districtCode: 492,
    officialDistrictName: 'Quận Sơn Trà',
  },
  'quan son tra': {
    provinceName: 'Thành phố Đà Nẵng',
    provinceCode: 48,
    districtCode: 492,
    officialDistrictName: 'Quận Sơn Trà',
  },
  'ngu hanh son': {
    provinceName: 'Thành phố Đà Nẵng',
    provinceCode: 48,
    districtCode: 493,
    officialDistrictName: 'Quận Ngũ Hành Sơn',
  },
  'quan ngu hanh son': {
    provinceName: 'Thành phố Đà Nẵng',
    provinceCode: 48,
    districtCode: 493,
    officialDistrictName: 'Quận Ngũ Hành Sơn',
  },
  'lien chieu': {
    provinceName: 'Thành phố Đà Nẵng',
    provinceCode: 48,
    districtCode: 494,
    officialDistrictName: 'Quận Liên Chiểu',
  },
  'quan lien chieu': {
    provinceName: 'Thành phố Đà Nẵng',
    provinceCode: 48,
    districtCode: 494,
    officialDistrictName: 'Quận Liên Chiểu',
  },
  'cam le': {
    provinceName: 'Thành phố Đà Nẵng',
    provinceCode: 48,
    districtCode: 495,
    officialDistrictName: 'Quận Cẩm Lệ',
  },
  'quan cam le': {
    provinceName: 'Thành phố Đà Nẵng',
    provinceCode: 48,
    districtCode: 495,
    officialDistrictName: 'Quận Cẩm Lệ',
  },

  // Bình Dương (Code: 74)
  'thu dau mot': {
    provinceName: 'Tỉnh Bình Dương',
    provinceCode: 74,
    districtCode: 718,
    officialDistrictName: 'Thành phố Thủ Dầu Một',
  },
  'thanh pho thu dau mot': {
    provinceName: 'Tỉnh Bình Dương',
    provinceCode: 74,
    districtCode: 718,
    officialDistrictName: 'Thành phố Thủ Dầu Một',
  },
  'di an': {
    provinceName: 'Tỉnh Bình Dương',
    provinceCode: 74,
    districtCode: 724,
    officialDistrictName: 'Thành phố Dĩ An',
  },
  'thanh pho di an': {
    provinceName: 'Tỉnh Bình Dương',
    provinceCode: 74,
    districtCode: 724,
    officialDistrictName: 'Thành phố Dĩ An',
  },
  'thuan an': {
    provinceName: 'Tỉnh Bình Dương',
    provinceCode: 74,
    districtCode: 725,
    officialDistrictName: 'Thành phố Thuận An',
  },
  'thanh pho thuan an': {
    provinceName: 'Tỉnh Bình Dương',
    provinceCode: 74,
    districtCode: 725,
    officialDistrictName: 'Thành phố Thuận An',
  },
}

export interface ResolvedLocation {
  city: string
  provinceCode: number | null
  district: string
  districtCode: number | null
}

export function resolveLocationFromParams(
  cityParam?: string | null,
  districtParam?: string | null
): ResolvedLocation {
  const isDistrictAll = isAllDistrict(districtParam)
  const normDistrict =
    districtParam && !isDistrictAll ? removeVietnameseTones(districtParam) : ''

  const mappedDistrict = normDistrict
    ? DISTRICT_TO_PROVINCE_MAP[normDistrict]
    : undefined
  const resolvedProvinceFromCity = resolveProvinceFromCity(cityParam)

  // 1. Resolve province name and code
  let city = ''
  let provinceCode: number | null = null

  if (resolvedProvinceFromCity) {
    city = resolvedProvinceFromCity.name
    provinceCode = resolvedProvinceFromCity.code
  } else if (mappedDistrict) {
    city = mappedDistrict.provinceName
    provinceCode = mappedDistrict.provinceCode
  } else if (cityParam && cityParam.trim() !== '') {
    city = cityParam.trim()
  }

  // 2. Resolve district name and code
  let district = ''
  let districtCode: number | null = null

  if (!isDistrictAll && districtParam && districtParam.trim() !== '') {
    district = districtParam.trim()
    if (mappedDistrict) {
      districtCode = mappedDistrict.districtCode
    }
  }

  return {
    city,
    provinceCode,
    district,
    districtCode,
  }
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
  const cityParam = searchParams?.get('city')
  const districtParam = searchParams?.get('district')
  const wardParam = searchParams?.get('ward') || ''
  const minPriceParam = searchParams?.get('minPrice')
  const maxPriceParam = searchParams?.get('maxPrice')
  const bedroomsParam = searchParams?.get('bedrooms')
  const searchParam = searchParams?.get('search')

  const initialLocation = resolveLocationFromParams(cityParam, districtParam)

  const parsedInitialBedrooms: number | 'all' =
    parseBedroomsParam(bedroomsParam)
  const parsedInitialMinPrice: number | '' = parsePriceParam(minPriceParam)
  const parsedInitialMaxPrice: number | '' = parsePriceParam(maxPriceParam)

  const [activeTab, setActiveTab] = React.useState<'single' | 'project'>(
    tabParam === 'project' ? 'project' : 'single'
  )
  const [searchKeyword, setSearchKeyword] = React.useState(searchParam || '')
  const [searchStatus, setSearchStatus] = React.useState('')

  // Detailed Cascade Location States
  const [selectedCity, setSelectedCity] = React.useState(initialLocation.city)
  const [selectedDistrict, setSelectedDistrict] = React.useState(
    initialLocation.district
  )
  const [selectedWard, setSelectedWard] = React.useState(wardParam)
  const [selectedStreet, setSelectedStreet] = React.useState('')
  const [selectedProject, setSelectedProject] = React.useState('')

  // Province/District codes for API cascade lookup
  const [selectedProvinceCode, setSelectedProvinceCode] = React.useState<
    number | null
  >(initialLocation.provinceCode)
  const [selectedDistrictCode, setSelectedDistrictCode] = React.useState<
    number | null
  >(initialLocation.districtCode)

  const [appliedCity, setAppliedCity] = React.useState(initialLocation.city)
  const [appliedDistrict, setAppliedDistrict] = React.useState(
    initialLocation.district
  )
  const [appliedWard, setAppliedWard] = React.useState(wardParam)
  const [appliedStreet, setAppliedStreet] = React.useState('')
  const [appliedProject, setAppliedProject] = React.useState('')

  // Price & Area Range States
  const [minPrice, setMinPrice] = React.useState<number | ''>(
    parsedInitialMinPrice
  )
  const [maxPrice, setMaxPrice] = React.useState<number | ''>(
    parsedInitialMaxPrice
  )
  const [minArea, setMinArea] = React.useState<number | ''>('')
  const [maxArea, setMaxArea] = React.useState<number | ''>('')

  // Advanced Drawer States
  const [isVerifiedOnly, setIsVerifiedOnly] = React.useState(false)
  const [bedroomsFilter, setBedroomsFilter] = React.useState<number | 'all'>(
    parsedInitialBedrooms
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
  >(parsedInitialBedrooms)

  // Synchronize state when search params change during navigation without effect cascading renders
  const [prevParamsKey, setPrevParamsKey] = React.useState(
    `${cityParam || ''}_${districtParam || ''}_${wardParam}_${minPriceParam || ''}_${maxPriceParam || ''}_${bedroomsParam || ''}_${searchParam || ''}`
  )
  const currentParamsKey = `${cityParam || ''}_${districtParam || ''}_${wardParam}_${minPriceParam || ''}_${maxPriceParam || ''}_${bedroomsParam || ''}_${searchParam || ''}`

  if (prevParamsKey !== currentParamsKey) {
    setPrevParamsKey(currentParamsKey)
    const resolved = resolveLocationFromParams(cityParam, districtParam)
    setSelectedCity(resolved.city)
    setAppliedCity(resolved.city)
    setSelectedDistrict(resolved.district)
    setAppliedDistrict(resolved.district)
    setSelectedProvinceCode(resolved.provinceCode)
    setSelectedDistrictCode(resolved.districtCode)
    setSelectedWard(wardParam)
    setAppliedWard(wardParam)

    const normalizedMinPrice = parsePriceParam(minPriceParam)
    setMinPrice(normalizedMinPrice)

    const normalizedMaxPrice = parsePriceParam(maxPriceParam)
    setMaxPrice(normalizedMaxPrice)

    const normalizedBedrooms = parseBedroomsParam(bedroomsParam)
    setBedroomsFilter(normalizedBedrooms)
    setAppliedBedroomsFilter(normalizedBedrooms)

    setSearchKeyword(searchParam || '')
  }
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
    const resolved = resolveLocationFromParams(appliedCity, appliedDistrict)
    setSelectedProvinceCode(resolved.provinceCode)
    setSelectedDistrictCode(resolved.districtCode)
  }

  const [debouncedKeyword, setDebouncedKeyword] = React.useState(searchKeyword)
  const [useMockFallback, setUseMockFallback] = React.useState(env.enableMocks)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(searchKeyword)
    }, 500)
    return () => {
      clearTimeout(handler)
    }
  }, [searchKeyword])

  // State for fetched apartments
  const [apartments, setApartments] = React.useState<ApartmentItem[]>(() =>
    env.enableMocks ? mockApartments : []
  )
  const [isLoadingApartments, setIsLoadingApartments] = React.useState<boolean>(
    () => !env.enableMocks
  )
  const [apartmentsError, setApartmentsError] = React.useState<Error | null>(
    null
  )

  React.useEffect(() => {
    let active = true
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoadingApartments(true)
    const queryParams = new URLSearchParams()
    queryParams.append('format', 'web')
    if (debouncedKeyword) queryParams.append('search', debouncedKeyword)
    if (appliedCity) queryParams.append('city', appliedCity)
    if (appliedDistrict && !isAllDistrict(appliedDistrict))
      queryParams.append('district', appliedDistrict)
    if (appliedWard) queryParams.append('ward', appliedWard)
    if (appliedStreet) queryParams.append('street', appliedStreet)
    if (appliedProject) queryParams.append('projectName', appliedProject)
    if (minPrice !== '') queryParams.append('minPrice', String(minPrice))
    if (maxPrice !== '') queryParams.append('maxPrice', String(maxPrice))
    if (minArea !== '') queryParams.append('minArea', String(minArea))
    if (maxArea !== '') queryParams.append('maxArea', String(maxArea))

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
            setApartmentsError(null)
          } else {
            throw new Error('Apartment API returned an invalid response')
          }
        }
      })
      .catch(err => {
        const normalizedError =
          err instanceof Error ? err : new Error('Failed to fetch apartments')
        console.error(
          'Failed to fetch apartments from backend:',
          normalizedError
        )
        if (active) {
          setApartmentsError(normalizedError)
          setUseMockFallback(env.enableMocks)
          setApartments(env.enableMocks ? mockApartments : [])
        }
      })
      .finally(() => {
        if (active) {
          setIsLoadingApartments(false)
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
    if (appliedDistrict && !isAllDistrict(appliedDistrict))
      queryParams.append('district', appliedDistrict)
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
          setUseMockFallback(env.enableMocks)
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
      if (
        appliedDistrict &&
        !isAllDistrict(appliedDistrict) &&
        !matchDistrict(proj.district, appliedDistrict)
      )
        return false
      if (appliedWard && proj.ward !== appliedWard) return false
      if (appliedStreet && proj.street !== appliedStreet) return false

      if (minPrice !== '' && proj.maxPrice < Number(minPrice)) return false
      if (maxPrice !== '' && proj.minPrice > Number(maxPrice)) return false
      if (appliedIsVerifiedOnly && !proj.isVerified) return false
      if (appliedHasMediaOnly && !proj.hasMedia) return false

      if (appliedBedroomsFilter !== 'all') {
        const hasMatchingUnit = proj.units?.some(unit =>
          matchBedrooms(unit.bedrooms, appliedBedroomsFilter)
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
    const shouldFilterLocally = useMockFallback || apiProjects.length === 0
    return apiProjects.filter(proj => {
      if (shouldFilterLocally) {
        if (searchKeyword.trim()) {
          const kw = removeVietnameseTones(searchKeyword)
          const nameToMatch =
            proj.name || (proj as unknown as { title?: string }).title || ''
          const devToMatch =
            proj.investor ||
            (proj as unknown as { developer?: string }).developer ||
            ''
          const matchName = removeVietnameseTones(nameToMatch).includes(kw)
          const matchDesc = removeVietnameseTones(
            proj.description || ''
          ).includes(kw)
          const matchLoc = removeVietnameseTones(proj.location).includes(kw)
          const matchInvestor = removeVietnameseTones(devToMatch).includes(kw)
          const matchDistrict = removeVietnameseTones(
            proj.district || ''
          ).includes(kw)
          if (
            !matchName &&
            !matchDesc &&
            !matchLoc &&
            !matchInvestor &&
            !matchDistrict
          )
            return false
        }

        if (
          appliedCity &&
          normalizeCity(proj.city) !== normalizeCity(appliedCity)
        )
          return false
        if (
          appliedDistrict &&
          !isAllDistrict(appliedDistrict) &&
          !matchDistrict(proj.district, appliedDistrict)
        )
          return false
      }

      // Calculate price range from apartments belonging to this project
      const projectApartments = apartments.filter(
        apt => apt.projectName === proj.name
      )
      if (shouldFilterLocally && projectApartments.length > 0) {
        const prices = projectApartments.map(apt => apt.priceNum)
        const projectMinPrice = Math.min(...prices)
        const projectMaxPrice = Math.max(...prices)

        if (minPrice !== '' && projectMaxPrice < Number(minPrice)) return false
        if (maxPrice !== '' && projectMinPrice > Number(maxPrice)) return false
      }

      // Filter by bedrooms and bathrooms in apartments belonging to this project
      if (appliedBedroomsFilter !== 'all') {
        const hasMatchingApt = projectApartments.some(apt =>
          matchBedrooms(apt.bedrooms, appliedBedroomsFilter)
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
    const shouldFilterLocally = useMockFallback || apartments === mockApartments
    return apartments.filter(apt => {
      if (shouldFilterLocally) {
        if (searchKeyword.trim()) {
          if (!matchApartmentKeyword(apt, searchKeyword)) return false
        }

        if (
          appliedCity &&
          normalizeCity(apt.city) !== normalizeCity(appliedCity)
        )
          return false
        if (
          appliedDistrict &&
          !isAllDistrict(appliedDistrict) &&
          !matchDistrict(apt.district, appliedDistrict)
        )
          return false
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
        !matchBedrooms(apt.bedrooms, appliedBedroomsFilter)
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
  ])

  // Draft Filter apartments (used only to calculate count inside advanced drawer)
  const draftFilteredApartments = React.useMemo(() => {
    return apartments.filter(apt => {
      if (searchKeyword.trim()) {
        if (!matchApartmentKeyword(apt, searchKeyword)) return false
      }

      if (
        selectedCity &&
        normalizeCity(apt.city) !== normalizeCity(selectedCity)
      )
        return false
      if (
        selectedDistrict &&
        !isAllDistrict(selectedDistrict) &&
        !matchDistrict(apt.district, selectedDistrict)
      )
        return false
      if (selectedWard && apt.ward !== selectedWard) return false
      if (selectedStreet && apt.street !== selectedStreet) return false
      if (selectedProject && apt.projectName !== selectedProject) return false

      if (minPrice !== '' && apt.priceNum < Number(minPrice)) return false
      if (maxPrice !== '' && apt.priceNum > Number(maxPrice)) return false

      if (minArea !== '' && apt.areaNum < Number(minArea)) return false
      if (maxArea !== '' && apt.areaNum > Number(maxArea)) return false

      if (
        bedroomsFilter !== 'all' &&
        !matchBedrooms(apt.bedrooms, bedroomsFilter)
      )
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
        const nameToMatch =
          proj.name || (proj as unknown as { title?: string }).title || ''
        const devToMatch =
          proj.investor ||
          (proj as unknown as { developer?: string }).developer ||
          ''
        const matchName = removeVietnameseTones(nameToMatch).includes(kw)
        const matchDesc = removeVietnameseTones(
          proj.description || ''
        ).includes(kw)
        const matchLoc = removeVietnameseTones(proj.location).includes(kw)
        const matchInvestor = removeVietnameseTones(devToMatch).includes(kw)
        const matchDistrict = removeVietnameseTones(
          proj.district || ''
        ).includes(kw)
        if (
          !matchName &&
          !matchDesc &&
          !matchLoc &&
          !matchInvestor &&
          !matchDistrict
        )
          return false
      }

      if (
        selectedCity &&
        normalizeCity(proj.city) !== normalizeCity(selectedCity)
      )
        return false
      if (
        selectedDistrict &&
        !isAllDistrict(selectedDistrict) &&
        !matchDistrict(proj.district, selectedDistrict)
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
        const hasMatchingApt = projectApartments.some(apt =>
          matchBedrooms(apt.bedrooms, bedroomsFilter)
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
    if (appliedDistrict && !isAllDistrict(appliedDistrict))
      parts.push(appliedDistrict)
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
    apartmentsError,
    isLoadingApartments,
    locationLabel,
    priceLabel,
    areaLabel,
    // Backend API data for projects
    apiProjects,
    isLoadingProjects,
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
