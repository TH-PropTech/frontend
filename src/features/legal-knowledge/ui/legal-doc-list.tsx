'use client'

import * as React from 'react'
import { Skeleton } from '@/shared/ui/skeleton'
import { formatCount, formatDate, isHttpUrl, statusTone } from '../lib/format'
import {
  LEGAL_DOC_CATEGORY_LABELS,
  LEGAL_DOC_STATUS_LABELS,
  type LegalDocItem,
} from '../model/legal-knowledge.types'

const KEYWORD_PREVIEW = 5

const ACTION_BUTTON =
  'rounded-lg px-2.5 py-1.5 text-xs font-semibold text-muted transition-colors hover:bg-surface-muted hover:text-fg disabled:opacity-50'

export interface LegalDocListProps {
  docs: readonly LegalDocItem[] | null
  busy: boolean
  onEdit: (doc: LegalDocItem) => void
  onTogglePublish: (doc: LegalDocItem) => void
  onArchive: (doc: LegalDocItem) => void
}

export function LegalDocList({
  docs,
  busy,
  onEdit,
  onTogglePublish,
  onArchive,
}: LegalDocListProps): React.ReactElement {
  if (docs === null) {
    return (
      <div role="status" aria-busy="true" className="space-y-3 p-5">
        <p className="text-xs text-muted">Đang tải danh sách tài liệu...</p>
        {[0, 1, 2].map(index => (
          <Skeleton key={index} className="h-14 w-full" />
        ))}
      </div>
    )
  }

  if (docs.length === 0) {
    return (
      <div className="px-5 py-10 text-center">
        <p className="text-sm font-bold text-fg">Chưa có tài liệu nào</p>
        <p className="mt-1 text-xs text-muted">
          Bấm “Thêm tài liệu” và dán liên kết văn bản để bắt đầu.
        </p>
      </div>
    )
  }

  return (
    <ul className="divide-y divide-border">
      {docs.map(doc => {
        const isArchived = doc.status === 'archived'
        const isPublished = doc.status === 'published'
        return (
          <li key={doc._id} className="px-4 py-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-fg">{doc.title}</span>
                  <span className="rounded-md bg-primary-soft px-2 py-0.5 text-[11px] font-semibold text-primary">
                    {LEGAL_DOC_CATEGORY_LABELS[doc.category]}
                  </span>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${statusTone(doc.status)}`}
                  >
                    {LEGAL_DOC_STATUS_LABELS[doc.status]}
                  </span>
                  {isHttpUrl(doc.sourceUrl) && (
                    <a
                      href={doc.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Mở nguồn của ${doc.title}`}
                      className="text-muted hover:text-primary"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  )}
                </div>
                <p className="text-xs text-muted">
                  {doc.docNumber ? `${doc.docNumber} · ` : ''}
                  {doc.issuer ? `${doc.issuer} · ` : ''}
                  {formatCount(doc.chunkCount)} đoạn ·{' '}
                  {formatCount(doc.contentLength)} ký tự · cập nhật{' '}
                  {formatDate(doc.updatedAt)}
                </p>
                {doc.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {doc.keywords.slice(0, KEYWORD_PREVIEW).map(keyword => (
                      <span
                        key={keyword}
                        className="rounded-md bg-surface-muted px-2 py-0.5 text-[11px] text-muted"
                      >
                        {keyword}
                      </span>
                    ))}
                    {doc.keywords.length > KEYWORD_PREVIEW && (
                      <span className="text-[11px] text-muted">
                        +{doc.keywords.length - KEYWORD_PREVIEW}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex shrink-0 flex-wrap gap-1">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => onEdit(doc)}
                  className={ACTION_BUTTON}
                >
                  Sửa
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => onTogglePublish(doc)}
                  className={ACTION_BUTTON}
                >
                  {isArchived
                    ? 'Khôi phục'
                    : isPublished
                      ? 'Gỡ xuống'
                      : 'Xuất bản'}
                </button>
                {!isArchived && (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => onArchive(doc)}
                    className={`${ACTION_BUTTON} hover:text-danger`}
                  >
                    Lưu trữ
                  </button>
                )}
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
