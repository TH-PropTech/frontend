'use client'

import * as React from 'react'
import { toast } from 'sonner'
import {
  archiveLegalDoc,
  createLegalDoc,
  getLegalDoc,
  listLegalDocs,
  publishLegalDoc,
  unpublishLegalDoc,
  updateLegalDoc,
} from '../api/legal-knowledge-api'
import { buildDocPayload, describeError } from '../lib/format'
import {
  LEGAL_DOC_CATEGORIES,
  LEGAL_DOC_CATEGORY_LABELS,
  LEGAL_DOC_STATUS_LABELS,
  LEGAL_DOC_STATUSES,
  type LegalDocCategory,
  type LegalDocDetail,
  type LegalDocFilters,
  type LegalDocItem,
  type LegalDocStatus,
} from '../model/legal-knowledge.types'
import { LegalDocForm, type LegalDocDraft } from './legal-doc-form'
import { LegalDocList } from './legal-doc-list'
import { LegalSearchTester } from './legal-search-tester'

const SEARCH_DEBOUNCE_MS = 300

type EditorState =
  | { mode: 'new'; seq: number }
  | { mode: 'edit'; seq: number; doc: LegalDocDetail }

const SELECT =
  'rounded-lg border border-border bg-surface px-3 py-2 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-primary/30'

export function LegalKnowledgeManager(): React.ReactElement {
  const [status, setStatus] = React.useState<LegalDocStatus | ''>('')
  const [category, setCategory] = React.useState<LegalDocCategory | ''>('')
  const [query, setQuery] = React.useState('')
  const [debouncedQuery, setDebouncedQuery] = React.useState('')
  const [docs, setDocs] = React.useState<LegalDocItem[] | null>(null)
  const [editor, setEditor] = React.useState<EditorState | null>(null)
  const [openingId, setOpeningId] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(0)
  const busy = pending > 0
  const openSeq = React.useRef(0)

  const filters: LegalDocFilters = {
    status: status || undefined,
    category: category || undefined,
    q: debouncedQuery || undefined,
  }

  React.useEffect(() => {
    const timer = window.setTimeout(
      () => setDebouncedQuery(query.trim()),
      SEARCH_DEBOUNCE_MS
    )
    return () => window.clearTimeout(timer)
  }, [query])

  // Async callbacks only, so no synchronous setState inside the effect body.
  React.useEffect(() => {
    let active = true
    listLegalDocs(filters)
      .then(next => {
        if (active) setDocs(next)
      })
      .catch((cause: unknown) => {
        if (active) toast.error(describeError(cause))
      })
    return () => {
      active = false
    }
    // filters is rebuilt each render; key on its primitive values instead.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, category, debouncedQuery])

  const reload = async (): Promise<void> => {
    setDocs(await listLegalDocs(filters))
  }

  const track = async (job: () => Promise<void>): Promise<void> => {
    setPending(count => count + 1)
    try {
      await job()
    } finally {
      setPending(count => count - 1)
    }
  }

  // Runs a mutation, refreshes the list on success, and reports via toast.
  const runAction = (action: () => Promise<string>): Promise<void> =>
    track(async () => {
      try {
        const message = await action()
        await reload()
        toast.success(message)
      } catch (cause: unknown) {
        toast.error(describeError(cause))
      }
    })

  const openNew = (): void => {
    openSeq.current += 1
    setEditor({ mode: 'new', seq: openSeq.current })
  }

  const openEdit = async (item: LegalDocItem): Promise<void> => {
    setOpeningId(item._id)
    try {
      const doc = await getLegalDoc(item._id)
      openSeq.current += 1
      setEditor({ mode: 'edit', seq: openSeq.current, doc })
    } catch (cause: unknown) {
      toast.error(describeError(cause))
    } finally {
      setOpeningId(null)
    }
  }

  const save = (draft: LegalDocDraft): void => {
    const current = editor
    void runAction(async () => {
      const body = {
        ...buildDocPayload(draft.values),
        contentSource: draft.contentSource,
      }
      if (current?.mode === 'edit') {
        const updated = await updateLegalDoc(current.doc._id, body)
        if (draft.publish) await publishLegalDoc(updated._id)
      } else {
        await createLegalDoc({
          ...body,
          status: draft.publish ? 'published' : 'draft',
        })
      }
      setEditor(null)
      return draft.publish ? 'Đã lưu và xuất bản' : 'Đã lưu nháp'
    })
  }

  const togglePublish = (item: LegalDocItem): void => {
    void runAction(async () => {
      if (item.status === 'archived') {
        await unpublishLegalDoc(item._id)
        return 'Đã khôi phục, tài liệu quay về nháp'
      }
      if (item.status === 'published') {
        await unpublishLegalDoc(item._id)
        return 'Đã gỡ xuống, tài liệu quay về nháp'
      }
      await publishLegalDoc(item._id)
      return 'Đã xuất bản, chatbot có thể tra cứu'
    })
  }

  const archive = (item: LegalDocItem): void => {
    if (
      !window.confirm(
        `Lưu trữ "${item.title}"? Chatbot sẽ không còn tìm thấy văn bản này.`
      )
    ) {
      return
    }
    if (editor?.mode === 'edit' && editor.doc._id === item._id) setEditor(null)
    void runAction(async () => {
      await archiveLegalDoc(item._id)
      return 'Đã lưu trữ'
    })
  }

  const formInitial = editor?.mode === 'edit' ? editor.doc : null

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 lg:flex-row lg:items-end">
        <label className="flex min-w-0 flex-1 flex-col gap-1 text-xs font-semibold text-muted">
          Tìm kiếm
          <input
            value={query}
            placeholder="Tên, số hiệu hoặc từ khoá"
            onChange={event => setQuery(event.target.value)}
            className={`${SELECT} w-full`}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-semibold text-muted">
          Trạng thái
          <select
            value={status}
            onChange={event =>
              setStatus(event.target.value as LegalDocStatus | '')
            }
            className={SELECT}
          >
            <option value="">Tất cả</option>
            {LEGAL_DOC_STATUSES.map(item => (
              <option key={item} value={item}>
                {LEGAL_DOC_STATUS_LABELS[item]}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-semibold text-muted">
          Phân loại
          <select
            value={category}
            onChange={event =>
              setCategory(event.target.value as LegalDocCategory | '')
            }
            className={SELECT}
          >
            <option value="">Tất cả</option>
            {LEGAL_DOC_CATEGORIES.map(item => (
              <option key={item} value={item}>
                {LEGAL_DOC_CATEGORY_LABELS[item]}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={openNew}
          className="shrink-0 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-on-control transition-colors hover:bg-primary-hover"
        >
          Thêm tài liệu
        </button>
      </section>

      {editor && (
        <LegalDocForm
          key={editor.seq}
          initial={formInitial}
          busy={busy}
          onCancel={() => setEditor(null)}
          onSave={save}
        />
      )}

      <section
        aria-labelledby="legal-list-title"
        className="overflow-hidden rounded-xl border border-border bg-surface"
      >
        <h2
          id="legal-list-title"
          className="border-b border-border px-4 py-3 text-sm font-bold text-fg"
        >
          Danh sách tài liệu
        </h2>
        <LegalDocList
          docs={docs}
          busy={busy || openingId !== null}
          onEdit={item => void openEdit(item)}
          onTogglePublish={togglePublish}
          onArchive={archive}
        />
      </section>

      <LegalSearchTester />
    </div>
  )
}
