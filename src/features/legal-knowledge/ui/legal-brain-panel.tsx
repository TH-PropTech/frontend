'use client'

import * as React from 'react'
import { toast } from 'sonner'
import { Button } from '@/shared/ui/button'
import { Checkbox } from '@/shared/ui/checkbox'
import { Skeleton } from '@/shared/ui/skeleton'
import { getLegalDoc } from '../api/legal-knowledge-api'
import { CATEGORY_COLORS, countByCategory } from '../lib/brain-graph'
import {
  describeError,
  formatCount,
  formatDate,
  isHttpUrl,
  statusTone,
} from '../lib/format'
import { extractOutline } from '../lib/source-map'
import {
  LEGAL_DOC_CATEGORY_LABELS,
  LEGAL_DOC_STATUS_LABELS,
  type LegalDocCategory,
  type LegalDocItem,
} from '../model/legal-knowledge.types'

const LegalBrain3D = React.lazy(() => import('./legal-brain-3d'))

const OUTLINE_LIMIT = 30

export interface LegalBrainPanelProps {
  /** Documents that are not archived; null while loading. */
  docs: readonly LegalDocItem[] | null
  busy: boolean
  onAdd: () => void
  /** Publishes the given drafts together. */
  onIngest: (ids: readonly string[]) => Promise<void>
  onEdit: (doc: LegalDocItem) => void
  onTogglePublish: (doc: LegalDocItem) => void
  onArchive: (doc: LegalDocItem) => void
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function LegalBrainPanel({
  docs,
  busy,
  onAdd,
  onIngest,
  onEdit,
  onTogglePublish,
  onArchive,
}: LegalBrainPanelProps): React.ReactElement {
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [autoRotate, setAutoRotate] = React.useState(
    () => !prefersReducedMotion()
  )
  const [focus, setFocus] = React.useState<LegalDocCategory | null>(null)
  const [checked, setChecked] = React.useState<ReadonlySet<string>>(new Set())
  const [outlines, setOutlines] = React.useState<Record<string, string[]>>({})

  const list = React.useMemo(() => docs ?? [], [docs])
  const selected = list.find(doc => doc._id === selectedId) ?? null
  const drafts = list.filter(doc => doc.status === 'draft')
  // Only drafts still in the list count, so a doc loaded or removed elsewhere drops out by itself.
  const markedIds = React.useMemo(
    () =>
      new Set(drafts.filter(doc => checked.has(doc._id)).map(doc => doc._id)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [list, checked]
  )
  const allMarked = drafts.length > 0 && markedIds.size === drafts.length
  const categories = countByCategory(list)
  const totalChunks = list.reduce((sum, doc) => sum + doc.chunkCount, 0)
  const outline = selected ? outlines[selected._id] : undefined

  const toggleMarked = (id: string): void =>
    setChecked(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const ingest = (): void => {
    const ids = [...markedIds]
    if (ids.length === 0) return
    void onIngest(ids).then(() => setChecked(new Set()))
  }

  // Reads the stored text once per document to list the laws/articles it covers.
  React.useEffect(() => {
    if (!selectedId || outlines[selectedId]) return
    let active = true
    getLegalDoc(selectedId)
      .then(detail => {
        if (!active) return
        setOutlines(prev => ({
          ...prev,
          [selectedId]: extractOutline(detail.content, OUTLINE_LIMIT),
        }))
      })
      .catch((cause: unknown) => {
        if (active) toast.error(describeError(cause))
      })
    return () => {
      active = false
    }
  }, [selectedId, outlines])

  return (
    <section
      aria-labelledby="legal-brain-title"
      className="overflow-hidden rounded-xl border border-border bg-surface"
    >
      <div className="flex flex-col gap-3 border-b border-border px-4 py-3 lg:flex-row lg:items-center">
        <div className="min-w-0 flex-1">
          <h2 id="legal-brain-title" className="text-sm font-bold text-fg">
            Bộ não tri thức
          </h2>
          <p className="mt-0.5 text-xs text-muted">
            {docs === null
              ? 'Đang tải...'
              : `${formatCount(list.length)} tài liệu · ${formatCount(totalChunks)} đoạn chatbot có thể tra cứu`}
            . Mỗi nút sáng là một văn bản, bấm vào để xem bên trong có luật nào.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button
            variant="secondary"
            size="sm"
            aria-pressed={autoRotate}
            onClick={() => setAutoRotate(value => !value)}
          >
            Tự xoay: {autoRotate ? 'bật' : 'tắt'}
          </Button>
          <Button size="sm" onClick={onAdd}>
            Thêm tài liệu
          </Button>
        </div>
      </div>

      {categories.length > 0 && (
        <div
          role="group"
          aria-label="Lọc theo loại văn bản"
          className="flex flex-wrap gap-2 border-b border-border px-4 py-2.5"
        >
          {categories.map(item => {
            const active = focus === item.category
            return (
              <button
                key={item.category}
                type="button"
                aria-pressed={active}
                onClick={() => setFocus(active ? null : item.category)}
                className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors ${
                  active
                    ? 'border-primary bg-primary-soft text-fg'
                    : 'border-border text-muted hover:text-fg'
                }`}
              >
                <i
                  aria-hidden="true"
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: CATEGORY_COLORS[item.category] }}
                />
                {LEGAL_DOC_CATEGORY_LABELS[item.category]} ({item.count})
              </button>
            )
          })}
        </div>
      )}

      {docs === null ? (
        <Skeleton className="h-[520px] w-full rounded-none" />
      ) : (
        <React.Suspense
          fallback={<Skeleton className="h-[520px] w-full rounded-none" />}
        >
          <LegalBrain3D
            docs={list}
            selectedId={selected?._id ?? null}
            markedIds={markedIds}
            onSelect={setSelectedId}
            autoRotate={autoRotate}
            focusCategory={focus}
          />
        </React.Suspense>
      )}

      <div
        aria-labelledby="legal-brain-tray-title"
        role="region"
        className="border-t border-border px-4 py-3"
      >
        <div className="flex flex-wrap items-center gap-3">
          <p id="legal-brain-tray-title" className="text-xs font-bold text-fg">
            Chờ nạp ({drafts.length})
          </p>
          {drafts.length > 0 && (
            <label className="flex cursor-pointer items-center gap-1.5 text-xs text-muted">
              <Checkbox
                checked={allMarked}
                disabled={busy}
                aria-label="Chọn tất cả tài liệu chờ nạp"
                onCheckedChange={value =>
                  setChecked(
                    value === true
                      ? new Set(drafts.map(doc => doc._id))
                      : new Set()
                  )
                }
              />
              Chọn tất cả
            </label>
          )}
          <Button
            size="sm"
            className="ml-auto"
            disabled={busy || markedIds.size === 0}
            onClick={ingest}
          >
            {markedIds.size > 0
              ? `Nạp ${markedIds.size} tài liệu vào não`
              : 'Nạp vào não'}
          </Button>
        </div>
        {drafts.length === 0 ? (
          <p className="mt-2 text-xs text-muted">
            Chưa có tài liệu nào chờ nạp. Bấm “Thêm tài liệu”, lưu nháp rồi quay
            lại đây chọn nhiều tài liệu để nạp cùng lúc.
          </p>
        ) : (
          <ul className="mt-2 grid gap-1 sm:grid-cols-2">
            {drafts.map(doc => (
              <li
                key={doc._id}
                className="flex items-center gap-2 rounded-md border border-border px-2.5 py-1.5"
              >
                <Checkbox
                  checked={markedIds.has(doc._id)}
                  disabled={busy}
                  aria-label={`Chọn ${doc.title} để nạp`}
                  onCheckedChange={() => toggleMarked(doc._id)}
                />
                <i
                  aria-hidden="true"
                  className="inline-block h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: CATEGORY_COLORS[doc.category] }}
                />
                <button
                  type="button"
                  onClick={() => setSelectedId(doc._id)}
                  className="min-w-0 flex-1 cursor-pointer truncate text-left text-xs text-fg hover:text-primary"
                >
                  {doc.title}
                </button>
                <span className="shrink-0 text-[11px] text-muted">
                  {LEGAL_DOC_CATEGORY_LABELS[doc.category]}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-border px-4 py-4">
        {selected ? (
          <div className="space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-fg">{selected.title}</p>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                  <span
                    className={`rounded-full px-2 py-0.5 font-semibold ${statusTone(selected.status)}`}
                  >
                    {LEGAL_DOC_STATUS_LABELS[selected.status]}
                  </span>
                  <span>{LEGAL_DOC_CATEGORY_LABELS[selected.category]}</span>
                  {selected.docNumber && <span>Số {selected.docNumber}</span>}
                  {selected.issuer && <span>{selected.issuer}</span>}
                  <span>Hiệu lực {formatDate(selected.effectiveDate)}</span>
                  <span>{formatCount(selected.chunkCount)} đoạn</span>
                  {isHttpUrl(selected.sourceUrl) && (
                    <a
                      href={selected.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-primary hover:underline"
                    >
                      Nguồn gốc
                    </a>
                  )}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={busy}
                  onClick={() => onEdit(selected)}
                >
                  Sửa
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={busy}
                  onClick={() => onTogglePublish(selected)}
                >
                  {selected.status === 'published' ? 'Gỡ xuống' : 'Xuất bản'}
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  disabled={busy}
                  onClick={() => onArchive(selected)}
                >
                  Loại bỏ khỏi não
                </Button>
              </div>
            </div>
            {selected.summary && (
              <p className="text-xs text-muted">{selected.summary}</p>
            )}
            {selected.keywords.length > 0 && (
              <p className="flex flex-wrap gap-1.5">
                {selected.keywords.map(word => (
                  <span
                    key={word}
                    className="rounded bg-surface-muted px-1.5 py-0.5 text-[11px] text-muted"
                  >
                    {word}
                  </span>
                ))}
              </p>
            )}
            <div>
              <p className="text-xs font-bold text-fg">Nội dung chính</p>
              {outline === undefined ? (
                <p role="status" className="mt-1 text-xs text-muted">
                  Đang đọc nội dung...
                </p>
              ) : outline.length === 0 ? (
                <p className="mt-1 text-xs text-muted">
                  Văn bản không có mục lục Chương/Điều rõ ràng, xem tab “Kho tri
                  thức” để đọc nội dung.
                </p>
              ) : (
                <ul className="mt-1 grid gap-x-6 gap-y-0.5 text-xs text-fg sm:grid-cols-2">
                  {outline.map((heading, index) => (
                    <li key={`${index}-${heading}`} className="truncate">
                      {heading}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-xs font-bold text-fg">Trong não đang có gì</p>
            {categories.length === 0 ? (
              <p className="text-xs text-muted">
                Chưa có tài liệu nào. Bấm “Nạp tri thức” và dán liên kết văn
                bản.
              </p>
            ) : (
              categories.map(item => (
                <div
                  key={item.category}
                  className="flex flex-wrap items-center gap-1.5 text-xs"
                >
                  <span className="w-28 shrink-0 font-semibold text-muted">
                    {LEGAL_DOC_CATEGORY_LABELS[item.category]}
                  </span>
                  {list
                    .filter(doc => doc.category === item.category)
                    .map(doc => (
                      <button
                        key={doc._id}
                        type="button"
                        onClick={() => setSelectedId(doc._id)}
                        className="cursor-pointer rounded border border-border px-2 py-0.5 text-fg transition-colors hover:border-primary"
                      >
                        {doc.title}
                      </button>
                    ))}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  )
}
