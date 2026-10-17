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
export const FURNITURE_KINDS = [
  'sofa',
  'armchair',
  'ottoman',
  'coffeeTable',
  'sideTable',
  'tvUnit',
  'bookshelf',
  'dresser',
  'wardrobe',
  'bed',
  'nightstand',
  'desk',
  'chair',
  'diningTable',
  'barStool',
  'console',
  'plant',
  'floorLamp',
  'standingMirror',
] as const
export type FurnitureKind = (typeof FURNITURE_KINDS)[number]

export const MAX_LAYOUT_ITEMS = 120
export const MAX_LAYOUT_EXTRAS = 60
const COORD_MIN = -2
const COORD_MAX = 40
const LAYOUT_ID = /^[A-Za-z0-9_-]{1,48}$/

/** Ghi đè của một món đồ có sẵn trong mẫu: dời / xoay / ẩn. Toạ độ theo MẪU (chưa co dãn theo diện tích). */
export interface LayoutItemOverride {
  x?: number
  z?: number
  rot?: number
  hidden?: boolean
}

/** Món đồ admin thêm vào từ danh mục. */
export interface LayoutExtra {
  id: string
  kind: FurnitureKind
  x: number
  z: number
  rot: number
  hidden?: boolean
}

export interface FloorplanLayout {
  items: Record<string, LayoutItemOverride>
  extras: LayoutExtra[]
}

export const emptyLayout = (): FloorplanLayout => ({ items: {}, extras: [] })

const coord = (value: unknown): number | undefined =>
  typeof value === 'number' &&
  Number.isFinite(value) &&
  value >= COORD_MIN &&
  value <= COORD_MAX
    ? Math.round(value * 1000) / 1000
    : undefined

const angle = (value: unknown): number | undefined =>
  typeof value === 'number' && Number.isFinite(value)
    ? Math.round((value % (Math.PI * 2)) * 10000) / 10000
    : undefined

/** Chuẩn hoá bố cục (cùng luật với viewer và backend): bỏ giá trị lạ, chặn số lượng, không tin kiểu chuỗi. */
export function normalizeFloorplanLayout(input: unknown): FloorplanLayout {
  const out = emptyLayout()
  if (!input || typeof input !== 'object') return out
  const raw = input as { items?: unknown; extras?: unknown }
  if (raw.items && typeof raw.items === 'object' && !Array.isArray(raw.items)) {
    for (const [id, value] of Object.entries(raw.items).slice(
      0,
      MAX_LAYOUT_ITEMS
    )) {
      if (!LAYOUT_ID.test(id) || !value || typeof value !== 'object') continue
      const o = value as Record<string, unknown>
      const entry: LayoutItemOverride = {}
      const x = coord(o.x)
      const z = coord(o.z)
      const rot = angle(o.rot)
      if (x !== undefined) entry.x = x
      if (z !== undefined) entry.z = z
      if (rot !== undefined) entry.rot = rot
      if (o.hidden === true) entry.hidden = true
      if (Object.keys(entry).length > 0) out.items[id] = entry
    }
  }
  if (Array.isArray(raw.extras)) {
    const seen = new Set<string>()
    for (const value of raw.extras.slice(0, MAX_LAYOUT_EXTRAS)) {
      if (!value || typeof value !== 'object') continue
      const e = value as Record<string, unknown>
      const id = typeof e.id === 'string' ? e.id : ''
      if (!LAYOUT_ID.test(id) || seen.has(id)) continue
      if (!(FURNITURE_KINDS as readonly unknown[]).includes(e.kind)) continue
      const x = coord(e.x)
      const z = coord(e.z)
      if (x === undefined || z === undefined) continue
      seen.add(id)
      const extra: LayoutExtra = {
        id,
        kind: e.kind as FurnitureKind,
        x,
        z,
        rot: angle(e.rot) ?? 0,
      }
      if (e.hidden === true) extra.hidden = true
      out.extras.push(extra)
    }
  }
  return out
}

export const isLayoutEmpty = (layout: FloorplanLayout): boolean =>
  Object.keys(layout.items).length === 0 && layout.extras.length === 0

/** Tóm tắt số thay đổi để hiện cho admin: đồ đã chỉnh, đồ đang ẩn, đồ thêm. */
export function summarizeLayout(layout: FloorplanLayout): {
  adjusted: number
  hidden: number
  added: number
} {
  const entries = Object.values(layout.items)
  return {
    adjusted: entries.filter(
      e => e.x !== undefined || e.z !== undefined || e.rot !== undefined
    ).length,
    hidden:
      entries.filter(e => e.hidden).length +
      layout.extras.filter(e => e.hidden).length,
    added: layout.extras.length,
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
