import type { FloorplanConfig, FurnishingLevel } from './floorplan-config'

/** Dữ liệu sa bàn gửi cho viewer (FLOORPLAN_CAMPUS_INIT): các tòa của chủ nhà, căn nào `has3d` sẽ sáng lên. */
export interface FloorplanCampusUnit {
  apartmentId: string
  floor: number
  slot: number
  label: string
  bedrooms: number
  bathrooms: number
  areaM2: number
  furnishing: FurnishingLevel
  has3d: boolean
}

export interface FloorplanCampus {
  name: string
  buildings: {
    id: string
    name: string
    floors: number
    units: FloorplanCampusUnit[]
  }[]
}

const FLOORS = 20

/** Băm ổn định theo mã căn để vị trí cửa sổ không đổi giữa các lần xem. */
function hash(value: string): number {
  let h = 2166136261
  for (let i = 0; i < value.length; i++) {
    h = Math.imul(h ^ value.charCodeAt(i), 16777619)
  }
  return h >>> 0
}

/**
 * Sa bàn của một căn hộ: một tòa, căn đang xem sáng lên (có 3D vì dựng được từ thông tin tin đăng).
 * Tin đăng chưa có tầng/ô thật nên vị trí cửa sổ chỉ mang tính minh hoạ, cố định theo mã căn.
 */
export function toFloorplanCampus(
  config: FloorplanConfig,
  label: string,
  buildingName = 'Tòa nhà'
): FloorplanCampus {
  const h = hash(config.apartmentId)
  return {
    name: buildingName,
    buildings: [
      {
        id: 'main',
        name: buildingName,
        floors: FLOORS,
        units: [
          {
            apartmentId: config.apartmentId,
            floor: 3 + (h % (FLOORS - 3)),
            slot: (h >>> 8) % 4,
            label,
            bedrooms: config.bedrooms,
            bathrooms: config.bathrooms,
            areaM2: config.areaM2,
            furnishing: config.furnishing,
            has3d: true,
          },
        ],
      },
    ],
  }
}
