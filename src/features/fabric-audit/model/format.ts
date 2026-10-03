/** Presentation helpers shared by the Audit Center panels. */

const MINUTE = 60
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

/** Coarse human age ("45 giây", "3 phút", "2 giờ", "1 ngày"), or null when unknown. */
export function formatAge(seconds: number | null): string | null {
  if (seconds === null || !Number.isFinite(seconds) || seconds < 0) return null
  if (seconds < MINUTE) return `${Math.floor(seconds)} giây`
  if (seconds < HOUR) return `${Math.floor(seconds / MINUTE)} phút`
  if (seconds < DAY) return `${Math.floor(seconds / HOUR)} giờ`
  return `${Math.floor(seconds / DAY)} ngày`
}

export function formatDateTime(value: string | null): string {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function truncateMiddle(
  value: string | null,
  start = 10,
  end = 8
): string {
  if (!value) return '—'
  return value.length <= start + end + 3
    ? value
    : `${value.slice(0, start)}...${value.slice(-end)}`
}

/** Only http(s) URLs may become links; anything else is rendered as unavailable. */
export function safeExternalUrl(value: string | null): string | null {
  if (!value) return null
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:'
      ? url.toString()
      : null
  } catch {
    return null
  }
}
