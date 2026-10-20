'use client'

import * as React from 'react'
import { toast } from 'sonner'
import { Button } from '@/shared/ui/button'
import { getLegalDoc } from '../api/legal-knowledge-api'
import {
  describeError,
  formatCount,
  formatDate,
  formatDateTime,
  isHttpUrl,
  statusTone,
} from '../lib/format'
import {
  extractOutline,
  groupBySource,
  MANUAL_HOST,
  sourceTrust,
} from '../lib/source-map'
import {
  LEGAL_DOC_CATEGORY_LABELS,
  LEGAL_DOC_STATUS_LABELS,
  type LegalDocDetail,
  type LegalDocItem,
} from '../model/legal-knowledge.types'
import { AdminCard } from '@/shared/ui/admin-card'

const OUTLINE_LIMIT = 40
const PREVIEW_CHARS = 1200

export interface LegalSourceMapProps {
  docs: readonly LegalDocItem[] | null
}

export function LegalSourceMap({
  docs,
}: LegalSourceMapProps): React.ReactElement {
  const [openId, setOpenId] = React.useState<string | null>(null)
  const [loadingId, setLoadingId] = React.useState<string | null>(null)
  const [details, setDetails] = React.useState<Record<string, LegalDocDetail>>(
    {}
  )

  if (docs === null) {
    return (
      <p role="status" className="px-1 text-xs text-muted">
        Đang tải bản đồ nguồn...
      </p>
    )
  }

  const groups = groupBySource(docs)
  const linkCount = docs.filter(doc => isHttpUrl(doc.sourceUrl)).length
  const totalChars = docs.reduce((sum, doc) => sum + doc.contentLength, 0)
  const totalChunks = docs.reduce((sum, doc) => sum + doc.chunkCount, 0)

  const toggle = async (doc: LegalDocItem): Promise<void> => {
    if (openId === doc._id) {
      setOpenId(null)
      return
    }
    setOpenId(doc._id)
    if (details[doc._id]) return
    setLoadingId(doc._id)
    try {
      const detail = await getLegalDoc(doc._id)
      setDetails(current => ({ ...current, [doc._id]: detail }))
    } catch (cause: unknown) {
      toast.error(describeError(cause))
      setOpenId(null)
    } finally {
      setLoadingId(null)
    }
  }

  if (docs.length === 0) {
    return (
      <AdminCard className="px-5 py-10 text-center">
        <p className="text-sm font-bold text-fg">Chưa có nội dung nào</p>
        <p className="mt-1 text-xs text-muted">
          Thêm tài liệu từ liên kết để xem nội dung nào lấy từ trang nào.
        </p>
      </AdminCard>
    )
  }

  return (
    <div className="space-y-5">
      <section
        aria-label="Tổng quan kho tri thức"
        className="grid grid-cols-2 gap-3 lg:grid-cols-4"
      >
        <Stat label="Trang nguồn" value={groups.length} />
        <Stat label="Tài liệu từ liên kết" value={linkCount} />
        <Stat label="Ký tự đã lưu trong CSDL" value={totalChars} />
        <Stat label="Đoạn chatbot tra cứu" value={totalChunks} />
      </section>

      <p className="rounded-xl border border-border bg-surface-muted px-4 py-3 text-xs text-muted">
        Mỗi liên kết được tải một lần, chắt lọc phần nội dung chính rồi{' '}
        <strong className="text-fg">lưu vào cơ sở dữ liệu của hệ thống</strong>.
        Chatbot chỉ tra cứu bản đã lưu, không đọc lại trang gốc. Liên kết chỉ
        dùng để đối chiếu nguồn.
      </p>

      {groups.map(group => (
        <section
          key={group.host}
          aria-label={`Nguồn ${group.host}`}
          className="overflow-hidden rounded-xl border border-border bg-surface"
        >
          <header className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-border px-4 py-3">
            <h2 className="text-sm font-bold text-fg">{group.host}</h2>
            <span className="text-xs text-muted">
              {formatCount(group.docs.length)} tài liệu ·{' '}
              {formatCount(group.totalChars)} ký tự ·{' '}
              {formatCount(group.totalChunks)} đoạn
            </span>
          </header>
          <ul className="divide-y divide-border">
            {group.docs.map(doc => {
              const open = openId === doc._id
              const detail = details[doc._id]
              const trust = sourceTrust(group.host)
              return (
                <li key={doc._id} className="px-4 py-4">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-fg">
                          {doc.title}
                        </span>
                        <span className="rounded-md bg-primary-soft px-2 py-0.5 text-[11px] font-semibold text-primary">
                          {LEGAL_DOC_CATEGORY_LABELS[doc.category]}
                        </span>
                        <span
                          className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${statusTone(doc.status)}`}
                        >
                          {LEGAL_DOC_STATUS_LABELS[doc.status]}
                        </span>
                      </div>
                      <dl className="grid gap-x-6 gap-y-2 text-xs sm:grid-cols-2">
                        <Field
                          label={
                            group.host === MANUAL_HOST
                              ? 'Nguồn'
                              : 'Liên kết nguồn'
                          }
                          wide
                        >
                          {isHttpUrl(doc.sourceUrl) ? (
                            <a
                              href={doc.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={doc.sourceUrl}
                              className="block truncate text-primary hover:underline"
                            >
                              {doc.sourceUrl}
                            </a>
                          ) : (
                            <span className="text-muted">
                              Biên soạn thủ công, không có liên kết
                            </span>
                          )}
                        </Field>
                        <Field label="Đơn vị ban hành / xác nhận">
                          <span className="text-fg">
                            {doc.issuer ?? 'Chưa ghi nhận'}
                          </span>
                          <span
                            className={`ml-2 rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${
                              trust.official
                                ? 'bg-success-soft text-success'
                                : 'bg-warning-soft text-warning'
                            }`}
                          >
                            {trust.label}
                          </span>
                        </Field>
                        <Field label="Lấy về lúc">
                          <span className="text-fg">
                            {formatDateTime(doc.fetchedAt ?? doc.createdAt)}
                          </span>
                          {doc.fetchedAt ? null : (
                            <span className="ml-1 text-muted">(ngày nhập)</span>
                          )}
                        </Field>
                        <Field label="Số hiệu / hiệu lực">
                          <span className="text-fg">
                            {doc.docNumber ?? '—'}
                            {doc.effectiveDate
                              ? ` · hiệu lực ${formatDate(doc.effectiveDate)}`
                              : ''}
                          </span>
                        </Field>
                        <Field label="Đã lưu trong CSDL">
                          <span className="text-fg">
                            {formatCount(doc.contentLength)} ký tự ·{' '}
                            {formatCount(doc.chunkCount)} đoạn
                          </span>
                        </Field>
                      </dl>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-expanded={open}
                      onClick={() => void toggle(doc)}
                      className="shrink-0 text-primary"
                    >
                      {open ? 'Ẩn nội dung' : 'Xem nội dung đã lưu'}
                    </Button>
                  </div>
                  {open && (
                    <StoredContent
                      loading={loadingId === doc._id}
                      detail={detail}
                    />
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}

function Field({
  label,
  wide = false,
  children,
}: {
  label: string
  wide?: boolean
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div className={`min-w-0 ${wide ? 'sm:col-span-2' : ''}`}>
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted">
        {label}
      </dt>
      <dd className="mt-0.5">{children}</dd>
    </div>
  )
}

function Stat({
  label,
  value,
}: {
  label: string
  value: number
}): React.ReactElement {
  return (
    <AdminCard className="px-4 py-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-xl font-bold text-fg">{formatCount(value)}</p>
    </AdminCard>
  )
}

function StoredContent({
  loading,
  detail,
}: {
  loading: boolean
  detail: LegalDocDetail | undefined
}): React.ReactElement {
  if (loading || !detail) {
    return (
      <p role="status" className="mt-3 text-xs text-muted">
        Đang tải nội dung đã lưu...
      </p>
    )
  }
  const outline = extractOutline(detail.content, OUTLINE_LIMIT)
  const preview = detail.content.slice(0, PREVIEW_CHARS)
  return (
    <div className="mt-3 grid gap-4 rounded-lg bg-surface-muted p-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-fg">
          Trang này lấy những mục nào
        </h3>
        {outline.length > 0 ? (
          <ul className="max-h-64 space-y-1 overflow-y-auto pr-1 text-xs text-muted">
            {outline.map((heading, index) => (
              <li
                key={`${index}-${heading}`}
                className="truncate"
                title={heading}
              >
                {heading}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-muted">
            Nội dung không chia theo Chương/Điều, xem phần trích bên cạnh.
          </p>
        )}
        {detail.summary && (
          <p className="border-t border-border pt-2 text-xs text-muted">
            <span className="font-semibold text-fg">Tóm tắt: </span>
            {detail.summary}
          </p>
        )}
        {detail.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {detail.keywords.map(keyword => (
              <span
                key={keyword}
                className="rounded-md bg-surface px-2 py-0.5 text-[11px] text-muted"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="min-w-0">
        <h3 className="mb-2 text-xs font-bold text-fg">
          Nội dung đã lưu (trích đầu)
        </h3>
        <pre className="max-h-64 overflow-y-auto whitespace-pre-wrap break-words rounded-md bg-surface p-3 text-xs leading-relaxed text-fg">
          {preview}
          {detail.content.length > PREVIEW_CHARS ? '…' : ''}
        </pre>
      </div>
    </div>
  )
}
