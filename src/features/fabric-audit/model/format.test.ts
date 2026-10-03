import { describe, expect, it } from 'vitest'
import {
  formatAge,
  formatDateTime,
  safeExternalUrl,
  truncateMiddle,
} from './format'

describe('formatAge', () => {
  it.each([
    [0, '0 giây'],
    [59, '59 giây'],
    [60, '1 phút'],
    [3599, '59 phút'],
    [3600, '1 giờ'],
    [86399, '23 giờ'],
    [86400, '1 ngày'],
    [200000, '2 ngày'],
  ])('formats %s seconds as %s', (seconds, text) => {
    expect(formatAge(seconds)).toBe(text)
  })

  it('returns null for unknown or invalid ages', () => {
    expect(formatAge(null)).toBeNull()
    expect(formatAge(-1)).toBeNull()
    expect(formatAge(Number.NaN)).toBeNull()
  })
})

describe('formatDateTime', () => {
  it('formats a valid timestamp and tolerates missing or invalid values', () => {
    expect(formatDateTime('2026-10-02T08:00:00.000Z')).toMatch(/2026/)
    expect(formatDateTime(null)).toBe('—')
    expect(formatDateTime('not a date')).toBe('—')
  })
})

describe('truncateMiddle', () => {
  it('shortens long values and keeps short ones intact', () => {
    expect(truncateMiddle('a'.repeat(64))).toBe(
      `${'a'.repeat(10)}...${'a'.repeat(8)}`
    )
    expect(truncateMiddle('short')).toBe('short')
    expect(truncateMiddle(null)).toBe('—')
  })
})

describe('safeExternalUrl', () => {
  it('allows only http and https URLs', () => {
    expect(safeExternalUrl('https://explorer.example.test/tx/1')).toBe(
      'https://explorer.example.test/tx/1'
    )
    expect(safeExternalUrl('http://localhost:8080/tx/1')).toBe(
      'http://localhost:8080/tx/1'
    )
    expect(safeExternalUrl('javascript:alert(1)')).toBeNull()
    expect(safeExternalUrl('data:text/html,x')).toBeNull()
    expect(safeExternalUrl('not a url')).toBeNull()
    expect(safeExternalUrl(null)).toBeNull()
  })
})
