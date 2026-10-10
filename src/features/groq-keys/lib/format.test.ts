import { describe, expect, it } from 'vitest'
import {
  estimateCost,
  estimateLoad,
  formatAgo,
  formatCount,
  formatTimeLeft,
  formatUsd,
  formatVnd,
  getKeyKind,
  maskKey,
} from './format'

const NOW = 1_700_000_000_000

describe('groq key formatting', () => {
  it('formats relative times in Vietnamese', () => {
    expect(formatAgo(0, NOW)).toBe('chưa dùng')
    expect(formatAgo(NOW - 30_000, NOW)).toBe('30 giây trước')
    expect(formatAgo(NOW - 5 * 60_000, NOW)).toBe('5 phút trước')
    expect(formatAgo(NOW - 3 * 3_600_000, NOW)).toBe('3 giờ trước')
    expect(formatAgo(NOW - 2 * 86_400_000, NOW)).toBe('2 ngày trước')
  })

  it('formats the remaining cooldown', () => {
    expect(formatTimeLeft(NOW + 10 * 60_000, NOW)).toBe('10 phút')
    expect(formatTimeLeft(NOW + 90 * 60_000, NOW)).toBe('1 giờ 30 phút')
  })

  it('formats counts, masks keys and money', () => {
    expect(formatCount(undefined)).toBe('—')
    expect(formatCount(1500)).toBe('1.500')
    expect(maskKey('gsk_abcdefghijklmnopqrstuvwxyz')).toBe('gsk_abcd...wxyz')
    expect(formatUsd(1.234)).toBe('$1.23')
    expect(formatUsd(0.0456)).toBe('$0.046')
    expect(formatVnd(25000.4)).toBe('25.000đ')
  })

  it('derives the display kind of a key', () => {
    expect(getKeyKind({ status: 'invalid', cooldownUntil: 0 }, NOW)).toBe(
      'invalid'
    )
    expect(getKeyKind({ status: 'disabled', cooldownUntil: 0 }, NOW)).toBe(
      'off'
    )
    expect(
      getKeyKind({ status: 'active', cooldownUntil: NOW + 1000 }, NOW)
    ).toBe('rest')
    expect(getKeyKind({ status: 'active', cooldownUntil: 0 }, NOW)).toBe(
      'ready'
    )
  })
})

describe('groq cost and load estimates', () => {
  it('computes per request, per day and per month cost', () => {
    const cost = estimateCost({
      inputPrice: 0.59,
      outputPrice: 0.79,
      tokensIn: 1500,
      tokensOut: 500,
      requestsPerDay: 2000,
    })

    expect(cost.perRequest).toBeCloseTo((1500 * 0.59 + 500 * 0.79) / 1e6)
    expect(cost.perDay).toBeCloseTo(cost.perRequest * 2000)
    expect(cost.perMonth).toBeCloseTo(cost.perDay * 30)
  })

  it('estimates how many keys the daily load needs', () => {
    const load = estimateLoad({
      tokensIn: 1500,
      tokensOut: 500,
      requestsPerDay: 2000,
      capacity: { readyCount: 1, tokensLimit: 6000, requestsLimit: 1000 },
    })

    expect(load.tokensPerRequest).toBe(2000)
    expect(load.requestsPerMinute).toBe(3)
    expect(load.keysNeeded).toBe(2)
  })

  it('reports zero needed keys without rate-limit data', () => {
    const load = estimateLoad({
      tokensIn: 100,
      tokensOut: 100,
      requestsPerDay: 10,
      capacity: { readyCount: 0, tokensLimit: 0, requestsLimit: 0 },
    })

    expect(load.keysNeeded).toBe(0)
    expect(load.requestsPerMinute).toBe(0)
  })
})
