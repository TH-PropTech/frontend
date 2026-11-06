/** Mức tham khảo: 8 m² sàn mỗi người (điều kiện đăng ký thường trú, không bắt buộc với tạm trú). */
export const REFERENCE_AREA_PER_PERSON = 8
export const MAX_OCCUPANTS_LIMIT = 20
const MAX_PEOPLE_PER_BEDROOM = 2

/**
 * Gợi ý số người ở tối đa: nhỏ hơn giữa diện tích chia 8 m² và hai người mỗi phòng
 * ngủ, tối thiểu 1. Trả null khi chưa đủ dữ liệu.
 */
export function suggestMaxOccupants(
  area: number,
  bedrooms: number
): number | null {
  if (!Number.isFinite(area) || area <= 0) return null
  if (!Number.isFinite(bedrooms) || bedrooms < 0) return null
  const byArea = Math.floor(area / REFERENCE_AREA_PER_PERSON)
  const byBedrooms = MAX_PEOPLE_PER_BEDROOM * bedrooms
  const suggested = Math.min(byArea, byBedrooms)
  return Math.min(Math.max(suggested, 1), MAX_OCCUPANTS_LIMIT)
}
