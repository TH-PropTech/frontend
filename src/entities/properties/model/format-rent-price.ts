const MILLION_PER_BILLION = 1000

function formatNumber(value: number): string {
  return value.toLocaleString('vi-VN', { maximumFractionDigits: 2 })
}

function isUsable(value: number | undefined): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

/**
 * Format a monthly rent expressed in millions of VND.
 * Large values are shown in "tỷ" with locale grouping instead of a raw number.
 */
export function formatRentPrice(
  priceInMillions: number | undefined,
  fallback = ''
): string {
  if (!isUsable(priceInMillions)) return fallback
  if (priceInMillions >= MILLION_PER_BILLION) {
    return `${formatNumber(priceInMillions / MILLION_PER_BILLION)} tỷ/tháng`
  }
  return `${formatNumber(priceInMillions)} triệu/tháng`
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
  return `${formatNumber(priceInMillions)}tr`
}
