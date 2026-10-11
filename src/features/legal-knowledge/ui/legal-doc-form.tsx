'use client'

import * as React from 'react'
import { CalendarDays, X } from 'lucide-react'
import { format, isValid, parseISO } from 'date-fns'
import { vi } from 'date-fns/locale'
import { toast } from 'sonner'
import { Button } from '@/shared/ui/button'
import { Calendar } from '@/shared/ui/calendar'
import { FilterDropdown } from '@/shared/ui/filter-dropdown'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { Textarea } from '@/shared/ui/textarea'
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
  const [calendarOpen, setCalendarOpen] = React.useState(false)
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

  const parsedDate = values.effectiveDate
    ? parseISO(values.effectiveDate)
    : undefined
  const selectedDate =
    parsedDate && isValid(parsedDate) ? parsedDate : undefined

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
    <div className="space-y-5">
      {!isEdit && (
        <div className="space-y-3 rounded-lg border border-dashed border-border p-4">
          <p className="text-xs font-semibold text-fg">
            Bước 1: Dán liên kết văn bản (trang cổng dịch vụ công, văn bản pháp
            luật…)
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <Input
                label="Liên kết nguồn"
                id="legal-doc-fetch-url"
                type="url"
                inputMode="url"
                value={url}
                placeholder="https://..."
                onChange={event => setUrl(event.target.value)}
              />
            </div>
            <Button
              disabled={!url.trim() || fetching}
              loading={fetching}
              onClick={() => void handleFetch()}
              className="shrink-0"
            >
              {fetching ? 'Đang đọc & chắt lọc...' : 'Đọc & chắt lọc'}
            </Button>
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
        <div className="sm:col-span-2">
          <Input
            label="Tên văn bản *"
            id="legal-doc-title"
            value={values.title}
            {...(shownErrors.title ? { error: shownErrors.title } : {})}
            onChange={event => update('title', event.target.value)}
          />
        </div>
        <FilterDropdown
          id="legal-doc-category"
          label="Phân loại *"
          value={values.category}
          options={LEGAL_DOC_CATEGORIES.map(category => ({
            value: category,
            label: LEGAL_DOC_CATEGORY_LABELS[category],
          }))}
          onChange={next => update('category', next as LegalDocCategory)}
        />
        <Input
          label="Số hiệu"
          id="legal-doc-number"
          value={values.docNumber}
          placeholder="VD: 56/2024/QH15"
          onChange={event => update('docNumber', event.target.value)}
        />
        <Input
          label="Cơ quan ban hành / xác nhận"
          id="legal-doc-issuer"
          value={values.issuer}
          onChange={event => update('issuer', event.target.value)}
        />
        <div className="flex flex-col gap-1">
          <Label
            htmlFor="legal-doc-effective-date"
            className="text-xs font-medium text-fg sm:text-sm"
          >
            Ngày có hiệu lực
          </Label>
          <div className="flex gap-2">
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="legal-doc-effective-date"
                  variant="outline"
                  className="h-10 flex-1 justify-start px-3 text-sm font-normal"
                >
                  <CalendarDays
                    aria-hidden="true"
                    className="mr-2 h-3.5 w-3.5 text-primary"
                  />
                  <span className={selectedDate ? 'text-fg' : 'text-subtle'}>
                    {selectedDate
                      ? format(selectedDate, 'dd/MM/yyyy')
                      : 'Chọn ngày'}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-auto rounded-2xl border border-border bg-surface p-0 shadow-xl"
              >
                <Calendar
                  mode="single"
                  locale={vi}
                  captionLayout="dropdown"
                  startMonth={new Date(1990, 0)}
                  endMonth={new Date(2040, 11)}
                  {...(selectedDate ? { defaultMonth: selectedDate } : {})}
                  selected={selectedDate}
                  onSelect={date => {
                    update(
                      'effectiveDate',
                      date ? format(date, 'yyyy-MM-dd') : ''
                    )
                    setCalendarOpen(false)
                  }}
                />
              </PopoverContent>
            </Popover>
            {selectedDate && (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Xoá ngày có hiệu lực"
                className="h-10 w-10"
                onClick={() => update('effectiveDate', '')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <div className="sm:col-span-2">
          <Input
            label="Liên kết nguồn"
            id="legal-doc-source-url"
            type="url"
            value={values.sourceUrl}
            placeholder="https://..."
            {...(shownErrors.sourceUrl ? { error: shownErrors.sourceUrl } : {})}
            onChange={event => update('sourceUrl', event.target.value)}
          />
        </div>
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
        <div className="flex flex-col gap-1 sm:col-span-2">
          <Label
            htmlFor="legal-doc-summary"
            className="text-xs font-medium text-fg sm:text-sm"
          >
            Tóm tắt
          </Label>
          <Textarea
            id="legal-doc-summary"
            rows={2}
            value={values.summary}
            onChange={event => update('summary', event.target.value)}
            className="border-border bg-surface text-fg"
          />
        </div>
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
          <Textarea
            rows={14}
            value={values.content}
            placeholder="Nội dung sau khi chắt lọc sẽ hiện ở đây. Có thể dán thủ công nếu không đọc được liên kết."
            onChange={event => update('content', event.target.value)}
            className="border-border bg-surface font-mono text-[13px] leading-relaxed text-fg"
          />
          <FieldError message={shownErrors.content} />
        </label>
      </div>

      <div className="flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
        <Button variant="ghost" onClick={onCancel}>
          Huỷ
        </Button>
        <Button
          variant="secondary"
          disabled={busy}
          onClick={() => submit(false)}
        >
          Lưu nháp
        </Button>
        <Button disabled={busy} onClick={() => submit(true)}>
          {busy ? 'Đang lưu...' : 'Lưu & xuất bản'}
        </Button>
      </div>
    </div>
  )
}
