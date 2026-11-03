import { describe, expect, it } from 'vitest'
import { ApiClientError } from './api-client'
import { buildRateLimitMessage, formatWait, readRateLimit } from './rate-limit'

function tooManyRequests(details?: unknown): ApiClientError {
  return new ApiClientError('Quá nhanh', 429, {
    code: 'HTTP_429',
    message: 'Quá nhanh',
    details,
  })
}

describe('readRateLimit', () => {
  it('reads scope and wait time from the backend error model', () => {
    const info = readRateLimit(
      tooManyRequests({
        code: 'RATE_LIMITED',
        scope: 'auth',
        retryAfterSeconds: 42,
      })
    )
    expect(info).toEqual({ scope: 'auth', retryAfterSeconds: 42 })
  })

  it('defaults to the global scope and no wait time when details are missing', () => {
    expect(readRateLimit(tooManyRequests())).toEqual({
      scope: 'global',
      retryAfterSeconds: null,
    })
  })

  it('rounds a fractional wait up and rejects unusable values', () => {
    expect(
      readRateLimit(tooManyRequests({ retryAfterSeconds: 1.2 }))
        ?.retryAfterSeconds
    ).toBe(2)
    expect(
      readRateLimit(tooManyRequests({ retryAfterSeconds: 'abc' }))
        ?.retryAfterSeconds
    ).toBeNull()
    expect(
      readRateLimit(tooManyRequests({ retryAfterSeconds: -5 }))
        ?.retryAfterSeconds
    ).toBeNull()
  })

  it('returns null for errors that are not 429', () => {
    expect(
      readRateLimit(
        new ApiClientError('x', 400, { code: 'HTTP_400', message: 'x' })
      )
    ).toBeNull()
    expect(readRateLimit(new Error('boom'))).toBeNull()
    expect(readRateLimit(null)).toBeNull()
  })
})

describe('buildRateLimitMessage', () => {
  it('states the reason and the wait for each scope', () => {
    expect(buildRateLimitMessage('global', 42)).toBe(
      'Bạn thao tác quá nhanh. Vui lòng thử lại sau 42 giây.'
    )
    expect(buildRateLimitMessage('auth', 30)).toBe(
      'Bạn đã thử đăng nhập hoặc xác thực quá nhiều lần. Vui lòng thử lại sau 30 giây.'
    )
  })

  it('falls back to a generic wait when the backend gives none', () => {
    expect(buildRateLimitMessage('global', null)).toBe(
      'Bạn thao tác quá nhanh. Vui lòng thử lại sau ít phút.'
    )
  })
})

describe('formatWait', () => {
  it('shows seconds under a minute and rounds up to minutes after', () => {
    expect(formatWait(59)).toBe('59 giây')
    expect(formatWait(60)).toBe('1 phút')
    expect(formatWait(61)).toBe('2 phút')
  })
})
