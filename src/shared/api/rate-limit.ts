import { ApiClientError } from './api-client'

/** Nhóm hạn mức bị vượt: `auth` là đăng nhập và OTP, còn lại là `global`. */
export type RateLimitScope = 'auth' | 'global'

export interface RateLimitInfo {
  scope: RateLimitScope
  /** Số giây phải chờ do backend báo; null khi backend không cho biết. */
  retryAfterSeconds: number | null
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

/**
 * Đọc lỗi 429 của backend: `details.code` là `RATE_LIMITED`, kèm `scope` và `retryAfterSeconds`.
 * Trả null khi lỗi không phải 429.
 */
export function readRateLimit(error: unknown): RateLimitInfo | null {
  if (!(error instanceof ApiClientError) || error.status !== 429) return null

  const details = error.body?.details
  const record = isRecord(details) ? details : {}
  const scope: RateLimitScope = record.scope === 'auth' ? 'auth' : 'global'
  const seconds = Number(record.retryAfterSeconds)

  return {
    scope,
    retryAfterSeconds:
      Number.isFinite(seconds) && seconds > 0 ? Math.ceil(seconds) : null,
  }
}

/** Dưới một phút hiện số giây, từ một phút trở lên làm tròn lên số phút. */
export function formatWait(seconds: number): string {
  if (seconds < 60) return `${seconds} giây`
  return `${Math.ceil(seconds / 60)} phút`
}

/** Câu báo: lý do bị chặn và còn phải chờ bao lâu. Cùng cách diễn đạt với backend. */
export function buildRateLimitMessage(
  scope: RateLimitScope,
  retryAfterSeconds: number | null
): string {
  const reason =
    scope === 'auth'
      ? 'Bạn đã thử đăng nhập hoặc xác thực quá nhiều lần.'
      : 'Bạn thao tác quá nhanh.'
  const wait =
    retryAfterSeconds === null
      ? 'Vui lòng thử lại sau ít phút.'
      : `Vui lòng thử lại sau ${formatWait(retryAfterSeconds)}.`
  return `${reason} ${wait}`
}
