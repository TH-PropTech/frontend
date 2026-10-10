export const LEGAL_DOC_CATEGORIES = [
  'luat',
  'nghi-dinh',
  'thong-tu',
  'quyet-dinh',
  'noi-quy',
  'hop-dong-mau',
  'faq',
  'khac',
] as const

export type LegalDocCategory = (typeof LEGAL_DOC_CATEGORIES)[number]

export const LEGAL_DOC_CATEGORY_LABELS: Readonly<
  Record<LegalDocCategory, string>
> = {
  luat: 'Luật',
  'nghi-dinh': 'Nghị định',
  'thong-tu': 'Thông tư',
  'quyet-dinh': 'Quyết định',
  'noi-quy': 'Nội quy',
  'hop-dong-mau': 'Hợp đồng mẫu',
  faq: 'FAQ',
  khac: 'Khác',
}

export const LEGAL_DOC_STATUSES = ['draft', 'published', 'archived'] as const

export type LegalDocStatus = (typeof LEGAL_DOC_STATUSES)[number]

export const LEGAL_DOC_STATUS_LABELS: Readonly<Record<LegalDocStatus, string>> =
  {
    draft: 'Nháp',
    published: 'Đang áp dụng',
    archived: 'Đã lưu trữ',
  }

export type LegalContentSource = 'link' | 'manual'

/** One row of the admin list. */
export interface LegalDocItem {
  _id: string
  title: string
  category: LegalDocCategory
  docNumber?: string
  issuer?: string
  sourceUrl?: string
  keywords: string[]
  /** ISO date string. */
  effectiveDate?: string
  status: LegalDocStatus
  chunkCount: number
  contentLength: number
  summary?: string
  contentSource: LegalContentSource
  /** ISO date string. */
  fetchedAt?: string
  createdAt: string
  updatedAt: string
}

/** Full document, including the distilled knowledge text. */
export interface LegalDocDetail extends LegalDocItem {
  content: string
}

export interface LegalSuggestion {
  title?: string
  docNumber?: string
  issuer?: string
  category?: LegalDocCategory
  keywords: string[]
  summary?: string
}

export interface LegalFetchResult {
  url: string
  finalUrl: string
  pageTitle?: string
  rawCharCount: number
  /** AI-distilled text, or cleaned raw text if the AI failed. */
  content: string
  /** false when the AI failed and `content` is cleaned raw text. */
  distilled: boolean
  suggestion: LegalSuggestion
}

export interface LegalDocFilters {
  status?: LegalDocStatus | undefined
  category?: LegalDocCategory | undefined
  q?: string | undefined
}

/** Body of POST /legal-knowledge/admin. PATCH accepts any subset of these. */
export interface LegalDocInput {
  title: string
  category: LegalDocCategory
  docNumber?: string
  issuer?: string
  sourceUrl?: string
  keywords?: string[]
  content: string
  effectiveDate?: string
  summary?: string
  contentSource?: LegalContentSource
  status?: 'draft' | 'published'
}

export type LegalDocPatch = Partial<Omit<LegalDocInput, 'status'>>

export interface LegalSearchHit {
  docId: string
  title: string
  docNumber?: string
  issuer?: string
  heading?: string
  text: string
  score: number
  sourceUrl?: string
}

/** Editable fields of the document editor (strings for inputs; converted on save). */
export interface LegalDocFormValues {
  title: string
  category: LegalDocCategory
  docNumber: string
  issuer: string
  sourceUrl: string
  keywords: string[]
  content: string
  /** `yyyy-mm-dd` from a date input, or empty. */
  effectiveDate: string
  summary: string
}
