import type { ApartmentItem } from '@/entities/properties'

const MAX_DISTRICTS = 6
const BEDROOM_GROUPS = [1, 2, 3] as const

export interface DistrictStat {
  name: string
  count: number
  priceRange: string
}

export interface BedroomStat {
  bedrooms: number
  count: number
  areaRange: string
  minPrice: string
}

export interface FeaturedCard {
  id: string | number
  name: string
  district: string
  rent_price: number
  rooms: number
  image_url?: string
  reasons: string[]
  match_score: number
  isVerified: boolean
  hasVr: boolean
}

function formatNumber(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1)
}

function formatRange(min: number, max: number, unit: string): string {
  return min === max
    ? `${formatNumber(min)} ${unit}`
    : `${formatNumber(min)}–${formatNumber(max)} ${unit}`
}

function groupBy<T>(items: T[], keyOf: (item: T) => string): Map<string, T[]> {
  const groups = new Map<string, T[]>()
  for (const item of items) {
    const key = keyOf(item)
    groups.set(key, [...(groups.get(key) ?? []), item])
  }
  return groups
}

function pricesOf(items: ApartmentItem[]): number[] {
  return items.map(item => item.priceNum).filter(price => price > 0)
}

export function buildDistrictStats(items: ApartmentItem[]): DistrictStat[] {
  const groups = groupBy(
    items.filter(item => item.district?.trim()),
    item => item.district.trim()
  )

  return [...groups.entries()]
    .map(([name, group]) => {
      const prices = pricesOf(group)
      return {
        name,
        count: group.length,
        priceRange:
          prices.length > 0
            ? formatRange(Math.min(...prices), Math.max(...prices), 'Tr')
            : '',
      }
    })
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'vi'))
    .slice(0, MAX_DISTRICTS)
}

export function buildBedroomStats(items: ApartmentItem[]): BedroomStat[] {
  return BEDROOM_GROUPS.flatMap(bedrooms => {
    const group = items.filter(item => item.bedrooms === bedrooms)
    if (group.length === 0) return []

    const areas = group.map(item => item.areaNum).filter(area => area > 0)
    const prices = pricesOf(group)
    return [
      {
        bedrooms,
        count: group.length,
        areaRange:
          areas.length > 0
            ? formatRange(Math.min(...areas), Math.max(...areas), 'm²')
            : '',
        minPrice:
          prices.length > 0 ? `Từ ${formatNumber(Math.min(...prices))} Tr` : '',
      },
    ]
  })
}

export function toFeaturedCard(item: ApartmentItem): FeaturedCard {
  const image = item.image || item.gallery?.[0]
  const reasons = [
    item.projectName ? `Dự án ${item.projectName}` : '',
    item.areaNum > 0 ? `Diện tích ${formatNumber(item.areaNum)} m²` : '',
    item.furniture ? `Nội thất: ${item.furniture}` : '',
  ].filter(Boolean)

  return {
    id: item.id,
    name: item.title,
    district: item.district || item.location,
    rent_price: item.priceNum * 1_000_000,
    rooms: item.bedrooms,
    ...(image ? { image_url: image } : {}),
    reasons,
    match_score: 0,
    isVerified: item.isVerified,
    hasVr: (item.images360?.length ?? 0) > 0,
  }
}
