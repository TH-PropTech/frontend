import type { FurnishingLevel } from './floorplan-config'

/** Phong cách thiết kế 3D (khớp bảng THEMES của viewer apartment-3d-renderer và backend). */
export const FLOORPLAN_THEMES = [
  'modern',
  'nordic',
  'warm',
  'luxury',
  'industrial',
] as const
export type FloorplanTheme = (typeof FLOORPLAN_THEMES)[number]

export const PALETTE_KEYS = ['floor', 'wall', 'wood', 'sofa', 'accent'] as const
export type PaletteKey = (typeof PALETTE_KEYS)[number]
export type FloorplanPalette = Partial<Record<PaletteKey, string>>

export const PALETTE_LABELS: Record<PaletteKey, string> = {
  floor: 'Sàn',
  wall: 'Tường',
  wood: 'Gỗ nội thất',
  sofa: 'Sofa',
  accent: 'Điểm nhấn',
}

export const THEME_META: Record<
  FloorplanTheme,
  { label: string; palette: Record<PaletteKey, string> }
> = {
  modern: {
    label: 'Hiện đại',
    palette: {
      floor: '#cfa67a',
      wall: '#f4f1ea',
      wood: '#b98b5e',
      sofa: '#5f7fa6',
      accent: '#e8a33d',
    },
  },
  nordic: {
    label: 'Bắc Âu',
    palette: {
      floor: '#e3cfa8',
      wall: '#f8f8f6',
      wood: '#d2b48c',
      sofa: '#8fa8bc',
      accent: '#6fa8a0',
    },
  },
  warm: {
    label: 'Ấm cúng',
    palette: {
      floor: '#b98458',
      wall: '#f2e4cf',
      wood: '#9c6b43',
      sofa: '#c4745a',
      accent: '#d9822b',
    },
  },
  luxury: {
    label: 'Sang trọng',
    palette: {
      floor: '#8a6544',
      wall: '#e8e2d6',
      wood: '#6b4a30',
      sofa: '#2f3e55',
      accent: '#c9a24a',
    },
  },
  industrial: {
    label: 'Công nghiệp',
    palette: {
      floor: '#8d7a67',
      wall: '#d2d5d9',
      wood: '#7d5f43',
      sofa: '#4a4f57',
      accent: '#d9732b',
    },
  },
}

/** Loại đồ có thể thêm vào thiết kế (khớp ADDABLE của viewer và APARTMENT_FURNITURE_KINDS của backend). */
export const FURNITURE_KINDS = LAYOUT_FURNITURE_KINDS
export type FurnitureKind = LayoutFurnitureKind
export {
  LAYOUT_FLOOR_MATERIALS,
  LAYOUT_LIMITS,
  LAYOUT_OPENING_TYPES,
  type LayoutCustomFloor,
  type LayoutCustomRoom,
  type LayoutExtra,
  type LayoutFloorMaterial,
  type LayoutItemOverride,
  type LayoutOpening,
  type LayoutOpeningType,
} from './apartment-layout'
import {
  LAYOUT_FURNITURE_KINDS,
  LAYOUT_LIMITS,
  isApartmentLayoutEmpty,
  normalizeApartmentLayout,
  type ApartmentLayout,
  type LayoutFurnitureKind,
} from './apartment-layout'

export const MAX_LAYOUT_ITEMS = LAYOUT_LIMITS.overrides
export const MAX_LAYOUT_EXTRAS = LAYOUT_LIMITS.extras

/** Bố cục tuỳ chỉnh của một thiết kế (đồ, sàn/tên phòng, cửa hoặc mặt bằng tự vẽ nhiều tầng). */
export type FloorplanLayout = ApartmentLayout

export const emptyLayout = (): FloorplanLayout => ({ items: {}, extras: [] })

export const normalizeFloorplanLayout = normalizeApartmentLayout

export const isLayoutEmpty = isApartmentLayoutEmpty

/** Tóm tắt thay đổi để hiện cho admin: đồ đã chỉnh / ẩn / thêm, phòng + cửa đã sửa, mặt bằng tự vẽ. */
export function summarizeLayout(layout: FloorplanLayout): {
  adjusted: number
  hidden: number
  added: number
  roomsEdited: number
  openingsEdited: number
  floors: number
  customRooms: number
  customArea: number
} {
  const entries = Object.values(layout.items)
  const floors = layout.custom?.floors ?? []
  const rooms = floors.flatMap(f => f.rooms)
  const openings = layout.openings
  return {
    adjusted: entries.filter(
      e => e.x !== undefined || e.z !== undefined || e.rot !== undefined
    ).length,
    hidden:
      entries.filter(e => e.hidden).length +
      layout.extras.filter(e => e.hidden).length,
    added: layout.extras.length,
    roomsEdited: Object.keys(layout.rooms ?? {}).length,
    openingsEdited: openings
      ? openings.removed.length +
        Object.keys(openings.moved).length +
        openings.added.length
      : 0,
    floors: floors.length,
    customRooms: rooms.length,
    customArea:
      Math.round(
        rooms.reduce((sum, r) => sum + (r.x1 - r.x0) * (r.z1 - r.z0), 0) * 10
      ) / 10,
  }
}

/** Thiết kế người xem được thấy (backend chỉ trả những thiết kế đang bật). */
export interface FloorplanDesign {
  id: string
  name: string
  description: string
  theme: FloorplanTheme
  palette: FloorplanPalette
  /** null = theo mức nội thất của tin đăng. */
  furnishing: FurnishingLevel | null
  defaultHour: number
  /** Bố cục tuỳ chỉnh (đồ dời / xoay / ẩn / thêm); rỗng = bố cục mẫu. */
  layout: FloorplanLayout
}

/** Thiết kế cho admin: thêm trạng thái ẩn/hiện và thứ tự. */
export interface AdminFloorplanDesign extends FloorplanDesign {
  visible: boolean
  order: number
  updatedAt: string
}

export type FloorplanDesignInput = Omit<FloorplanDesign, 'id'> & {
  visible: boolean
  order?: number
}

const HEX = /^#[0-9a-f]{6}$/i
const MAX_DESIGNS = 20

function isTheme(value: unknown): value is FloorplanTheme {
  return (FLOORPLAN_THEMES as readonly unknown[]).includes(value)
}

export function normalizeFloorplanDesign(
  input: unknown
): FloorplanDesign | null {
  if (!input || typeof input !== 'object') return null
  const raw = input as Record<string, unknown>
  const id = typeof raw.id === 'string' ? raw.id.trim() : ''
  const name = typeof raw.name === 'string' ? raw.name.trim().slice(0, 60) : ''
  if (!id || !name) return null
  const palette: FloorplanPalette = {}
  if (raw.palette && typeof raw.palette === 'object') {
    for (const key of PALETTE_KEYS) {
      const value = (raw.palette as Record<string, unknown>)[key]
      if (typeof value === 'string' && HEX.test(value)) {
        palette[key] = value.toLowerCase()
      }
    }
  }
  const hour = Number(raw.defaultHour)
  const furnishing = raw.furnishing
  return {
    id,
    name,
    description:
      typeof raw.description === 'string' ? raw.description.slice(0, 200) : '',
    theme: isTheme(raw.theme) ? raw.theme : 'modern',
    palette,
    furnishing:
      furnishing === 'bare' || furnishing === 'partial' || furnishing === 'full'
        ? furnishing
        : null,
    defaultHour: Number.isFinite(hour) ? Math.min(18, Math.max(6, hour)) : 10,
    layout: normalizeFloorplanLayout(raw.layout),
  }
}

export function normalizeFloorplanDesigns(input: unknown): FloorplanDesign[] {
  if (!Array.isArray(input)) return []
  return input
    .slice(0, MAX_DESIGNS)
    .map(normalizeFloorplanDesign)
    .filter((design): design is FloorplanDesign => design !== null)
}

/** Màu hiệu lực của một thiết kế = phong cách + ghi đè (dùng cho ô xem trước màu). */
export function resolveDesignPalette(
  design: Pick<FloorplanDesign, 'theme' | 'palette'>
): Record<PaletteKey, string> {
  return { ...THEME_META[design.theme].palette, ...design.palette }
}
