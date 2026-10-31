const MILLION_PER_BILLION = 1000
const VND_PER_MILLION = 1_000_000

function formatNumber(value: number): string {
  return value.toLocaleString('vi-VN', { maximumFractionDigits: 2 })
}

function isUsable(value: number | undefined): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

/**
 * Giá thuê tháng ở dạng đầy đủ, thống nhất cho danh sách và chi tiết: "500.000 ₫/tháng".
 * Đầu vào tính bằng triệu đồng; không dùng "triệu"/"tỷ" để tránh lẫn định dạng.
 */
export function formatRentPrice(
  priceInMillions: number | undefined,
  fallback = ''
): string {
  if (!isUsable(priceInMillions)) return fallback
  return `${formatNumber(Math.round(priceInMillions * VND_PER_MILLION))} ₫/tháng`
}

/** Compact form for map markers, e.g. "14,5tr" or "100 tỷ". */
export function formatRentPriceCompact(
  priceInMillions: number | undefined,
  fallback = ''
): string {
  if (!isUsable(priceInMillions)) return fallback
  if (priceInMillions >= MILLION_PER_BILLION) {
    return `${formatNumber(priceInMillions / MILLION_PER_BILLION)} tỷ`
  }
  if (priceInMillions < 1) {
    return `${formatNumber(Math.round(priceInMillions * 1000))}k`
  }
  return `${formatNumber(priceInMillions)}tr`
}
