import { apiClient } from '@/shared/api'
import type {
  AdminFloorplanDesign,
  FloorplanDesign,
  FloorplanDesignInput,
} from '../model/floorplan-design'
import { normalizeFloorplanDesigns } from '../model/floorplan-design'

const base = (apartmentId: string): string =>
  `/apartments/${encodeURIComponent(apartmentId)}/designs`

/** Người xem: các thiết kế đang bật của căn hộ (đã chuẩn hoá, lỗi dữ liệu bị loại). */
export async function listApartmentDesigns(
  apartmentId: string
): Promise<FloorplanDesign[]> {
  return normalizeFloorplanDesigns(
    await apiClient.get<unknown>(base(apartmentId))
  )
}

export function listAdminDesigns(
  apartmentId: string
): Promise<AdminFloorplanDesign[]> {
  return apiClient.get<AdminFloorplanDesign[]>(`${base(apartmentId)}/admin`)
}

export function createAdminDesign(
  apartmentId: string,
  input: FloorplanDesignInput
): Promise<AdminFloorplanDesign> {
  return apiClient.post<AdminFloorplanDesign>(
    `${base(apartmentId)}/admin`,
    input
  )
}

export function updateAdminDesign(
  apartmentId: string,
  designId: string,
  patch: Partial<FloorplanDesignInput>
): Promise<AdminFloorplanDesign> {
  return apiClient.patch<AdminFloorplanDesign>(
    `${base(apartmentId)}/admin/${encodeURIComponent(designId)}`,
    patch
  )
}

export function deleteAdminDesign(
  apartmentId: string,
  designId: string
): Promise<void> {
  return apiClient.delete<void>(
    `${base(apartmentId)}/admin/${encodeURIComponent(designId)}`
  )
}
