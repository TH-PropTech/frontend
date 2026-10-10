import type { GroqKeyItem, GroqKeyKind } from '../model/groq-keys.types'

export function formatAgo(timestamp: number, now: number = Date.now()): string {
  if (!timestamp) return 'chưa dùng'
  const seconds = Math.max(1, Math.round((now - timestamp) / 1000))
  if (seconds < 60) return `${seconds} giây trước`
  if (seconds < 3600) return `${Math.round(seconds / 60)} phút trước`
  if (seconds < 86400) return `${Math.round(seconds / 3600)} giờ trước`
  return `${Math.round(seconds / 86400)} ngày trước`
}

export function formatTimeLeft(
  until: number,
  now: number = Date.now()
): string {
  const minutes = Math.ceil((until - now) / 60000)
  return minutes >= 60
    ? `${Math.floor(minutes / 60)} giờ ${minutes % 60} phút`
    : `${minutes} phút`
}

export function formatCount(value?: number): string {
  return value === undefined ? '—' : value.toLocaleString('vi-VN')
}

export function maskKey(key: string): string {
  return `${key.slice(0, 8)}...${key.slice(-4)}`
}

export function formatUsd(value: number): string {
  const text =
    value >= 1
      ? value.toLocaleString('en-US', { maximumFractionDigits: 2 })
      : value.toLocaleString('en-US', { maximumSignificantDigits: 2 })
  return `$${text}`
}

export function formatVnd(value: number): string {
  return `${Math.round(value).toLocaleString('vi-VN')}đ`
}

export function getKeyKind(
  key: Pick<GroqKeyItem, 'status' | 'cooldownUntil'>,
  now: number = Date.now()
): GroqKeyKind {
  if (key.status === 'invalid') return 'invalid'
  if (key.status === 'disabled') return 'off'
  return key.cooldownUntil > now ? 'rest' : 'ready'
}

/** Groq list prices in USD per 1M tokens: [input, output]. */
export const GROQ_PRICES: Readonly<Record<string, readonly [number, number]>> =
  {
    'llama-3.1-8b-instant': [0.05, 0.08],
    'llama-3.3-70b-versatile': [0.59, 0.79],
    'openai/gpt-oss-20b': [0.075, 0.3],
    'openai/gpt-oss-120b': [0.15, 0.6],
    'meta-llama/llama-4-scout-17b-16e-instruct': [0.11, 0.34],
    'meta-llama/llama-4-maverick-17b-128e-instruct': [0.2, 0.6],
    'qwen/qwen3-32b': [0.29, 0.59],
    'moonshotai/kimi-k2-instruct': [1, 3],
  }

export interface CostInput {
  inputPrice: number
  outputPrice: number
  tokensIn: number
  tokensOut: number
  requestsPerDay: number
}

export interface CostEstimate {
  perRequest: number
  perDay: number
  perMonth: number
}

export function estimateCost(input: CostInput): CostEstimate {
  const perRequest =
    (input.tokensIn * input.inputPrice + input.tokensOut * input.outputPrice) /
    1e6
  const perDay = perRequest * input.requestsPerDay
  return { perRequest, perDay, perMonth: perDay * 30 }
}

export interface PoolCapacity {
  readyCount: number
  tokensLimit: number
  requestsLimit: number
}

export interface LoadInput {
  tokensIn: number
  tokensOut: number
  requestsPerDay: number
  capacity: PoolCapacity
}

export interface LoadEstimate {
  tokensPerRequest: number
  tokensPerDay: number
  requestsPerMinute: number
  /** 0 when there is not enough rate-limit data to estimate. */
  keysNeeded: number
}

export function estimateLoad(input: LoadInput): LoadEstimate {
  const { tokensIn, tokensOut, requestsPerDay, capacity } = input
  const tokensPerRequest = tokensIn + tokensOut
  const perKeyRequests =
    capacity.readyCount && capacity.requestsLimit
      ? capacity.requestsLimit / capacity.readyCount
      : 0
  const perKeyTokens =
    capacity.readyCount && capacity.tokensLimit
      ? capacity.tokensLimit / capacity.readyCount
      : 0
  const neededByDay = perKeyRequests
    ? Math.ceil(requestsPerDay / perKeyRequests)
    : 0
  const neededByMinute = perKeyTokens
    ? Math.ceil((requestsPerDay * tokensPerRequest) / 1440 / perKeyTokens)
    : 0
  return {
    tokensPerRequest,
    tokensPerDay: requestsPerDay * tokensPerRequest,
    requestsPerMinute: tokensPerRequest
      ? Math.floor(capacity.tokensLimit / tokensPerRequest)
      : 0,
    keysNeeded: Math.max(neededByDay, neededByMinute),
  }
}

export function describeError(cause: unknown): string {
  return cause instanceof Error && cause.message
    ? cause.message
    : 'Đã xảy ra lỗi, vui lòng thử lại.'
}
