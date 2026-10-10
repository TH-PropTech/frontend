'use client'

import * as React from 'react'
import { toast } from 'sonner'
import { fetchLegalLink } from '../api/legal-knowledge-api'
import {
  CONTENT_MAX_CHARS,
  describeError,
  formatCount,
  isHttpUrl,
  normalizeKeywords,
} from '../lib/format'
import { validateLegalDocForm } from '../lib/validate'
import {
  LEGAL_DOC_CATEGORIES,
  LEGAL_DOC_CATEGORY_LABELS,
  type LegalContentSource,
  type LegalDocCategory,
  type LegalDocDetail,
  type LegalDocFormValues,
  type LegalFetchResult,
} from '../model/legal-knowledge.types'
import { LegalKeywordInput } from './legal-keyword-input'
import { LegalSourcePicker } from './legal-source-picker'

export interface LegalDocDraft {
  values: LegalDocFormValues
  contentSource: LegalContentSource
  publish: boolean
}

export interface LegalDocFormProps {
  /** null = create a new document. */
  initial: LegalDocDetail | null
  busy: boolean
  onCancel: () => void
  onSave: (draft: LegalDocDraft) => void
}

interface FetchInfo {
  distilled: boolean
  rawCharCount: number
}

const INPUT =
  'w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-fg placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/30'

const LABEL = 'flex flex-col gap-1 text-xs font-semibold text-muted'

function FieldError({
  message,
}: {
  message?: string | undefined
}): React.ReactElement | null {
  return message ? (
    <span className="text-xs font-normal text-danger">{message}</span>
  ) : null
}

export function LegalDocForm({
  initial,
  busy,
  onCancel,
  onSave,
}: LegalDocFormProps): React.ReactElement {
  const isEdit = initial !== null
  const [url, setUrl] = React.useState('')
  const [fetching, setFetching] = React.useState(false)
  const [fetchInfo, setFetchInfo] = React.useState<FetchInfo | null>(null)
  const [contentSource, setContentSource] = React.useState<LegalContentSource>(
    initial?.contentSource ?? 'manual'
  )
  const [attempted, setAttempted] = React.useState(false)
  const [values, setValues] = React.useState<LegalDocFormValues>(() => ({
    title: initial?.title ?? '',
    category: initial?.category ?? 'khac',
    docNumber: initial?.docNumber ?? '',
    issuer: initial?.issuer ?? '',
    sourceUrl: initial?.sourceUrl ?? '',
    keywords: initial?.keywords ?? [],
    content: initial?.content ?? '',
    effectiveDate: initial?.effectiveDate?.slice(0, 10) ?? '',
    summary: initial?.summary ?? '',
  }))

  const errors = validateLegalDocForm(values)
  const hasErrors = Object.keys(errors).length > 0
  const shownErrors = attempted ? errors : {}

  const update = <K extends keyof LegalDocFormValues>(
    key: K,
    value: LegalDocFormValues[K]
  ): void => setValues(prev => ({ ...prev, [key]: value }))

  const applyFetch = (result: LegalFetchResult): void => {
    const { suggestion } = result
    setValues(prev => ({
      ...prev,
      title: prev.title.trim()
        ? prev.title
        : (suggestion.title ?? result.pageTitle ?? ''),
      category: suggestion.category ?? prev.category,
      docNumber: prev.docNumber || suggestion.docNumber || '',
      issuer: prev.issuer || suggestion.issuer || '',
      keywords: normalizeKeywords([...prev.keywords, ...suggestion.keywords]),
      summary: prev.summary || suggestion.summary || '',
      sourceUrl: result.finalUrl,
      content: result.content,
    }))
    setContentSource('link')
    setFetchInfo({
      distilled: result.distilled,
      rawCharCount: result.rawCharCount,
    })
    if (result.distilled) {
      toast.success('Đã chắt lọc nội dung, hãy rà soát trước khi lưu.')
    } else {
      toast.warning('AI chưa chắt lọc được, đang hiển thị nội dung thô.')
    }
  }

  const handleFetch = async (): Promise<void> => {
    const target = url.trim()
    if (!isHttpUrl(target)) {
      toast.error('Hãy nhập đường dẫn http(s) hợp lệ.')
      return
    }
    setFetching(true)
    try {
      applyFetch(await fetchLegalLink(target))
    } catch (cause: unknown) {
      toast.error(describeError(cause))
    } finally {
      setFetching(false)
    }
  }

  const submit = (publish: boolean): void => {
    setAttempted(true)
    if (hasErrors || busy) return
    onSave({ values, contentSource, publish })
  }

  return (
    <section
      aria-labelledby="legal-doc-form-title"
      className="space-y-5 rounded-xl border border-border bg-surface p-5"
    >
      <h2 id="legal-doc-form-title" className="text-sm font-bold text-fg">
        {isEdit ? 'Sửa tài liệu' : 'Thêm tài liệu'}
      </h2>

      {!isEdit && (
        <div className="space-y-3 rounded-lg border border-dashed border-border p-4">
          <p className="text-xs font-semibold text-fg">
            Bước 1: Dán liên kết văn bản (trang cổng dịch vụ công, văn bản pháp
            luật…)
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className={`${LABEL} flex-1`}>
              Liên kết nguồn
              <input
                type="url"
                inputMode="url"
                value={url}
                placeholder="https://..."
                onChange={event => setUrl(event.target.value)}
                className={INPUT}
              />
            </label>
            <button
              type="button"
              disabled={!url.trim() || fetching}
              onClick={() => void handleFetch()}
              className="shrink-0 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-on-control transition-colors hover:bg-primary-hover disabled:opacity-50"
            >
              {fetching ? 'Đang đọc & chắt lọc...' : 'Đọc & chắt lọc'}
            </button>
          </div>
          <LegalSourcePicker
            onPick={source => {
              setUrl(source.url)
              if (!values.title.trim()) update('title', source.title)
            }}
          />
          <p className="text-[11px] text-muted">
            Nếu trang tải bằng JavaScript hoặc chặn truy cập, hãy sao chép nội
            dung và dán trực tiếp vào ô “Nội dung” bên dưới.
          </p>
        </div>
      )}

      {fetchInfo && !fetchInfo.distilled && (
        <div
          role="alert"
          className="rounded-lg bg-warning-soft px-3 py-2 text-xs text-warning"
        >
          AI chưa chắt lọc được, đang hiển thị nội dung thô (
          {formatCount(fetchInfo.rawCharCount)} ký tự). Hãy rà soát và chỉnh sửa
          trước khi lưu.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={`${LABEL} sm:col-span-2`}>
          Tên văn bản *
          <input
            value={values.title}
            onChange={event => update('title', event.target.value)}
            className={INPUT}
          />
          <FieldError message={shownErrors.title} />
        </label>
        <label className={LABEL}>
          Phân loại *
          <select
            value={values.category}
            onChange={event =>
              update('category', event.target.value as LegalDocCategory)
            }
            className={INPUT}
          >
            {LEGAL_DOC_CATEGORIES.map(category => (
              <option key={category} value={category}>
                {LEGAL_DOC_CATEGORY_LABELS[category]}
              </option>
            ))}
          </select>
        </label>
        <label className={LABEL}>
          Số hiệu
          <input
            value={values.docNumber}
            placeholder="VD: 56/2024/QH15"
            onChange={event => update('docNumber', event.target.value)}
            className={INPUT}
          />
        </label>
        <label className={LABEL}>
          Cơ quan ban hành
          <input
            value={values.issuer}
            onChange={event => update('issuer', event.target.value)}
            className={INPUT}
          />
        </label>
        <label className={LABEL}>
          Ngày có hiệu lực
          <input
            type="date"
            value={values.effectiveDate}
            onChange={event => update('effectiveDate', event.target.value)}
            className={INPUT}
          />
        </label>
        <label className={`${LABEL} sm:col-span-2`}>
          Liên kết nguồn
          <input
            type="url"
            value={values.sourceUrl}
            placeholder="https://..."
            onChange={event => update('sourceUrl', event.target.value)}
            className={INPUT}
          />
          <FieldError message={shownErrors.sourceUrl} />
        </label>
        <div className={`${LABEL} sm:col-span-2`}>
          <label htmlFor="legal-doc-keywords">
            Từ khoá (Enter hoặc dấu phẩy để thêm)
          </label>
          <LegalKeywordInput
            id="legal-doc-keywords"
            value={values.keywords}
            onChange={next => update('keywords', next)}
          />
          <FieldError message={shownErrors.keywords} />
        </div>
        <label className={`${LABEL} sm:col-span-2`}>
          Tóm tắt
          <textarea
            rows={2}
            value={values.summary}
            onChange={event => update('summary', event.target.value)}
            className={INPUT}
          />
        </label>
        <label className={`${LABEL} sm:col-span-2`}>
          <span className="flex justify-between">
            <span>Nội dung tri thức *</span>
            <span
              className={
                values.content.length > CONTENT_MAX_CHARS
                  ? 'text-danger'
                  : 'text-muted'
              }
            >
              {formatCount(values.content.length)} /{' '}
              {formatCount(CONTENT_MAX_CHARS)}
            </span>
          </span>
          <textarea
            rows={14}
            value={values.content}
            placeholder="Nội dung sau khi chắt lọc sẽ hiện ở đây. Có thể dán thủ công nếu không đọc được liên kết."
            onChange={event => update('content', event.target.value)}
            className={`${INPUT} font-mono text-[13px] leading-relaxed`}
          />
          <FieldError message={shownErrors.content} />
        </label>
      </div>

      <div className="flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-4 py-2 text-xs font-semibold text-muted transition-colors hover:bg-surface-muted hover:text-fg"
        >
          Huỷ
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => submit(false)}
          className="rounded-lg border border-border px-4 py-2 text-xs font-semibold text-fg transition-colors hover:bg-surface-muted disabled:opacity-50"
        >
          Lưu nháp
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => submit(true)}
          className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-on-control transition-colors hover:bg-primary-hover disabled:opacity-50"
        >
          {busy ? 'Đang lưu...' : 'Lưu & xuất bản'}
        </button>
      </div>
    </section>
  )
}
