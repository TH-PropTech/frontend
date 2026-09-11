import type { ApartmentItem } from '@/entities/properties'

export type FurnishingLevel = 'bare' | 'partial' | 'full'

export interface FloorplanConfig {
  version: 1
  apartmentId: string
  bedrooms: number
  bathrooms: number
  areaM2: number
  furnishing: FurnishingLevel
}

type FloorplanInput = Omit<FloorplanConfig, 'version'> & {
  version?: unknown
}

const MAX_BEDROOMS = 8
const MAX_BATHROOMS = 8
const MAX_AREA_M2 = 1_000

function isValidNumber(value: unknown, max: number): value is number {
  return (
    typeof value === 'number' &&
    Number.isFinite(value) &&
    value >= 0 &&
    value <= max
  )
}

function isFurnishingLevel(value: unknown): value is FurnishingLevel {
  return value === 'bare' || value === 'partial' || value === 'full'
}

export function normalizeFloorplanConfig(
  input: unknown
): FloorplanConfig | null {
  if (!input || typeof input !== 'object') return null
  const candidate = input as Partial<FloorplanInput>
  if (
    typeof candidate.apartmentId !== 'string' ||
    !candidate.apartmentId.trim()
  )
    return null
  if (!isValidNumber(candidate.bedrooms, MAX_BEDROOMS)) return null
  if (!isValidNumber(candidate.bathrooms, MAX_BATHROOMS)) return null
  if (!isValidNumber(candidate.areaM2, MAX_AREA_M2) || candidate.areaM2 <= 0)
    return null
  if (!isFurnishingLevel(candidate.furnishing)) return null
  return {
    version: 1,
    apartmentId: candidate.apartmentId.trim(),
    bedrooms: Math.floor(candidate.bedrooms),
    bathrooms: Math.floor(candidate.bathrooms),
    areaM2: candidate.areaM2,
    furnishing: candidate.furnishing,
  }
}

function mapFurnishingLabel(label: string): FurnishingLevel {
  const normalized = label.trim().toLocaleLowerCase('vi-VN')
  if (normalized.includes('không')) return 'bare'
  if (normalized.includes('đầy') || normalized.includes('cao cấp'))
    return 'full'
  return 'partial'
}

export function toFloorplanConfig(
  property: Pick<
    ApartmentItem,
    'id' | 'bedrooms' | 'bathrooms' | 'areaNum' | 'furniture'
  >
): FloorplanConfig | null {
  return normalizeFloorplanConfig({
    apartmentId: property.id,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    areaM2: property.areaNum,
    furnishing: mapFurnishingLabel(property.furniture),
  })
}
