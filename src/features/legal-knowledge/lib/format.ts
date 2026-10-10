import {
  LEGAL_DOC_CATEGORIES,
  type LegalDocCategory,
  type LegalDocFormValues,
  type LegalDocInput,
  type LegalDocStatus,
} from '../model/legal-knowledge.types'

export const CONTENT_MAX_CHARS = 500_000
export const CONTENT_MIN_CHARS = 20
export const TITLE_MIN_CHARS = 3
export const TITLE_MAX_CHARS = 300
export const KEYWORD_MAX_COUNT = 30
export const KEYWORD_MAX_CHARS = 60

export function formatDate(iso?: string): string {
  if (!iso) return '—'
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString('vi-VN')
}

export function formatCount(value: number): string {
  return value.toLocaleString('vi-VN')
}

export function formatScore(score: number): string {
  return score.toFixed(2)
}

export function isHttpUrl(value: string | undefined): value is string {
  if (!value) return false
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function isLegalCategory(value: string): value is LegalDocCategory {
  return (LEGAL_DOC_CATEGORIES as readonly string[]).includes(value)
}

/** Trims, drops empties and case-insensitive duplicates, keeps order. */
export function normalizeKeywords(values: readonly string[]): string[] {
  const seen = new Set<string>()
  const result: string[] = []
  for (const raw of values) {
    const value = raw.trim()
    const key = value.toLocaleLowerCase('vi-VN')
    if (!value || seen.has(key)) continue
    seen.add(key)
    result.push(value)
  }
  return result
}

/** Converts a `yyyy-mm-dd` input value to the ISO string the API expects. */
export function toIsoDate(dateInput: string): string | undefined {
  if (!dateInput) return undefined
  const date = new Date(`${dateInput}T00:00:00.000Z`)
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
}

export function describeError(cause: unknown): string {
  return cause instanceof Error && cause.message
    ? cause.message
    : 'Đã xảy ra lỗi, vui lòng thử lại.'
}

export function statusTone(status: LegalDocStatus): string {
  if (status === 'published') return 'bg-success-soft text-success'
  if (status === 'archived') return 'bg-surface-muted text-muted'
  return 'bg-warning-soft text-warning'
}

/** Builds a create/update payload, dropping empty optional fields. */
export function buildDocPayload(
  values: LegalDocFormValues
): Omit<LegalDocInput, 'status' | 'contentSource'> {
  const payload: Omit<LegalDocInput, 'status' | 'contentSource'> = {
    title: values.title.trim(),
    category: values.category,
    keywords: normalizeKeywords(values.keywords),
    content: values.content.trim(),
  }
  const docNumber = values.docNumber.trim()
  const issuer = values.issuer.trim()
  const sourceUrl = values.sourceUrl.trim()
  const summary = values.summary.trim()
  const effectiveDate = toIsoDate(values.effectiveDate)
  if (docNumber) payload.docNumber = docNumber
  if (issuer) payload.issuer = issuer
  if (sourceUrl) payload.sourceUrl = sourceUrl
  if (summary) payload.summary = summary
  if (effectiveDate) payload.effectiveDate = effectiveDate
  return payload
}
