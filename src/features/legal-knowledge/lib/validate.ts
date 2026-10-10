import {
  CONTENT_MAX_CHARS,
  CONTENT_MIN_CHARS,
  KEYWORD_MAX_CHARS,
  KEYWORD_MAX_COUNT,
  TITLE_MAX_CHARS,
  TITLE_MIN_CHARS,
  isHttpUrl,
  normalizeKeywords,
} from './format'

export interface LegalDocFormFields {
  title: string
  sourceUrl: string
  keywords: readonly string[]
  content: string
}

export type LegalDocFormErrors = Partial<
  Record<'title' | 'sourceUrl' | 'keywords' | 'content', string>
>

export function validateLegalDocForm(
  fields: LegalDocFormFields
): LegalDocFormErrors {
  const errors: LegalDocFormErrors = {}
  const title = fields.title.trim()
  if (title.length < TITLE_MIN_CHARS || title.length > TITLE_MAX_CHARS) {
    errors.title = `Tên văn bản cần từ ${TITLE_MIN_CHARS} đến ${TITLE_MAX_CHARS} ký tự.`
  }
  const sourceUrl = fields.sourceUrl.trim()
  if (sourceUrl && (sourceUrl.length > 2000 || !isHttpUrl(sourceUrl))) {
    errors.sourceUrl = 'Liên kết nguồn phải là đường dẫn http(s) hợp lệ.'
  }
  const keywords = normalizeKeywords(fields.keywords)
  if (
    keywords.length > KEYWORD_MAX_COUNT ||
    keywords.some(keyword => keyword.length > KEYWORD_MAX_CHARS)
  ) {
    errors.keywords = `Tối đa ${KEYWORD_MAX_COUNT} từ khoá, mỗi từ tối đa ${KEYWORD_MAX_CHARS} ký tự.`
  }
  const content = fields.content.trim()
  if (content.length < CONTENT_MIN_CHARS) {
    errors.content = `Nội dung cần tối thiểu ${CONTENT_MIN_CHARS} ký tự.`
  } else if (content.length > CONTENT_MAX_CHARS) {
    errors.content = `Nội dung tối đa ${CONTENT_MAX_CHARS.toLocaleString('vi-VN')} ký tự.`
  }
  return errors
}
