import { describe, expect, it } from 'vitest'
import type { LegalDocFormValues } from '../model/legal-knowledge.types'
import {
  buildDocPayload,
  formatDateTime,
  formatScore,
  isHttpUrl,
  normalizeKeywords,
  toIsoDate,
} from './format'
import { validateLegalDocForm } from './validate'

const baseValues: LegalDocFormValues = {
  title: '  Luật Nhà ở  ',
  category: 'luat',
  docNumber: '',
  issuer: ' Quốc hội ',
  sourceUrl: '',
  keywords: ['thuê nhà', ' Thuê Nhà ', '', 'đặt cọc'],
  content: '  Điều 1. Phạm vi điều chỉnh của văn bản này.  ',
  effectiveDate: '2024-07-01',
  summary: '',
}

describe('legal knowledge format helpers', () => {
  it('formats scores with two decimals', () => {
    expect(formatScore(3.14159)).toBe('3.14')
  })

  it('accepts only http(s) URLs', () => {
    expect(isHttpUrl('https://dichvucong.gov.vn/x')).toBe(true)
    expect(isHttpUrl('http://example.com')).toBe(true)
    expect(isHttpUrl('javascript:alert(1)')).toBe(false)
    expect(isHttpUrl('not a url')).toBe(false)
    expect(isHttpUrl(undefined)).toBe(false)
  })

  it('trims, dedupes case-insensitively and drops empty keywords', () => {
    expect(
      normalizeKeywords(['thuê nhà', ' Thuê Nhà ', '', 'đặt cọc'])
    ).toEqual(['thuê nhà', 'đặt cọc'])
  })

  it('converts a date input value to an ISO string and ignores empty input', () => {
    expect(toIsoDate('2024-07-01')).toBe('2024-07-01T00:00:00.000Z')
    expect(toIsoDate('')).toBeUndefined()
    expect(toIsoDate('2024-13-45')).toBeUndefined()
  })

  it('builds a payload without empty optional fields', () => {
    const payload = buildDocPayload(baseValues)

    expect(payload).toEqual({
      title: 'Luật Nhà ở',
      category: 'luat',
      issuer: 'Quốc hội',
      keywords: ['thuê nhà', 'đặt cọc'],
      content: 'Điều 1. Phạm vi điều chỉnh của văn bản này.',
      effectiveDate: '2024-07-01T00:00:00.000Z',
    })
    expect(payload).not.toHaveProperty('docNumber')
    expect(payload).not.toHaveProperty('sourceUrl')
    expect(payload).not.toHaveProperty('summary')
  })
})

describe('validateLegalDocForm', () => {
  const valid = {
    title: 'Luật Nhà ở',
    sourceUrl: '',
    keywords: [],
    content: 'Điều 1. Phạm vi điều chỉnh của văn bản này.',
  }

  it('passes a complete form', () => {
    expect(validateLegalDocForm(valid)).toEqual({})
  })

  it('flags a short title, bad source URL, short content and too many keywords', () => {
    const errors = validateLegalDocForm({
      title: 'ab',
      sourceUrl: 'ftp://x',
      keywords: Array.from({ length: 31 }, (_, index) => `k${index}`),
      content: 'quá ngắn',
    })

    expect(errors.title).toBeDefined()
    expect(errors.sourceUrl).toBeDefined()
    expect(errors.keywords).toBeDefined()
    expect(errors.content).toBeDefined()
  })
})

describe('formatDateTime', () => {
  it('returns a dash for missing or invalid input', () => {
    expect(formatDateTime(undefined)).toBe('—')
    expect(formatDateTime('khong-phai-ngay')).toBe('—')
  })

  it('includes the time of day', () => {
    expect(formatDateTime('2026-10-11T03:15:00.000Z')).toMatch(/\d{2}:\d{2}/)
  })
})
