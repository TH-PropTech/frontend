'use client'

import * as React from 'react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/alert-dialog'
import { Button } from '@/shared/ui/button'
import { FilterAutocomplete } from '@/shared/ui/filter-autocomplete'
import { FilterDropdown } from '@/shared/ui/filter-dropdown'
import { Modal } from '@/shared/ui/modal'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
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
  type LegalDocItem,
  type LegalDocStatus,
} from '../model/legal-knowledge.types'
import { LegalDocForm, type LegalDocDraft } from './legal-doc-form'
import { LegalDocList } from './legal-doc-list'
import { LegalSearchTester } from './legal-search-tester'
import { LegalSourceMap } from './legal-source-map'

type EditorState =
  | { mode: 'new'; seq: number }
  | { mode: 'edit'; seq: number; doc: LegalDocDetail }

type LegalTab = 'docs' | 'sources' | 'archive'

/** Archived docs have their own tab, so the status filter only offers the other states. */
const LISTED_STATUSES = LEGAL_DOC_STATUSES.filter(item => item !== 'archived')

const STATUS_OPTIONS = [
  { value: '', label: 'Tất cả' },
  ...LISTED_STATUSES.map(item => ({
    value: item,
    label: LEGAL_DOC_STATUS_LABELS[item],
  })),
]

const CATEGORY_OPTIONS = [
  { value: '', label: 'Tất cả' },
  ...LEGAL_DOC_CATEGORIES.map(item => ({
    value: item,
    label: LEGAL_DOC_CATEGORY_LABELS[item],
  })),
]

const TAB_TRIGGER =
  'pb-3 rounded-none border-b-2 border-transparent bg-transparent px-0 font-semibold text-muted hover:text-fg data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:font-bold data-[state=active]:bg-transparent shadow-none transition-all cursor-pointer inline-flex items-center'

export function LegalKnowledgeManager(): React.ReactElement {
  const [tab, setTab] = React.useState<LegalTab>('docs')
  const [status, setStatus] = React.useState<LegalDocStatus | ''>('')
  const [category, setCategory] = React.useState<LegalDocCategory | ''>('')
  const [pickedDocId, setPickedDocId] = React.useState('')
  const [docs, setDocs] = React.useState<LegalDocItem[] | null>(null)
  const [editor, setEditor] = React.useState<EditorState | null>(null)
  const [archiveTarget, setArchiveTarget] = React.useState<LegalDocItem | null>(
    null
  )
  const [openingId, setOpeningId] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(0)
  const busy = pending > 0
  const openSeq = React.useRef(0)

  // Async callbacks only, so no synchronous setState inside the effect body.
  React.useEffect(() => {
    let active = true
    listLegalDocs()
      .then(next => {
        if (active) setDocs(next)
      })
      .catch((cause: unknown) => {
        if (active) toast.error(describeError(cause))
      })
    return () => {
      active = false
    }
  }, [])

  // The whole corpus is small, so search and filters run on the loaded list.
  const visibleDocs =
    docs?.filter(
      doc =>
        (!category || doc.category === category) &&
        (!pickedDocId || doc._id === pickedDocId)
    ) ?? null
  const activeDocs =
    visibleDocs?.filter(doc => doc.status !== 'archived') ?? null
  const listedDocs =
    activeDocs?.filter(doc => !status || doc.status === status) ?? null
  const archivedDocs =
    visibleDocs?.filter(doc => doc.status === 'archived') ?? null
  const archivedCount = archivedDocs?.length ?? 0

  const searchOptions = (docs ?? []).map(doc => ({
    value: doc._id,
    label: doc.title,
    // Matched by the autocomplete too, so numbers, issuers and keywords are searchable.
    sublabel: [doc.docNumber, doc.issuer, ...doc.keywords]
      .filter(Boolean)
      .join(' · '),
  }))

  const reload = async (): Promise<void> => {
    setDocs(await listLegalDocs())
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

  const confirmArchive = (): void => {
    const item = archiveTarget
    if (!item) return
    setArchiveTarget(null)
    if (editor?.mode === 'edit' && editor.doc._id === item._id) setEditor(null)
    void runAction(async () => {
      await archiveLegalDoc(item._id)
      return 'Đã lưu trữ'
    })
  }

  const formInitial = editor?.mode === 'edit' ? editor.doc : null
  const listBusy = busy || openingId !== null

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 lg:flex-row lg:items-end">
        <FilterAutocomplete
          id="legal-filter-search"
          label="Tìm kiếm"
          placeholder="Tên, số hiệu, cơ quan hoặc từ khoá"
          className="min-w-0 flex-1"
          value={pickedDocId}
          options={searchOptions}
          onChange={setPickedDocId}
        />
        {tab === 'docs' && (
          <FilterDropdown
            id="legal-filter-status"
            label="Trạng thái"
            value={status}
            options={STATUS_OPTIONS}
            onChange={next => setStatus(next as LegalDocStatus | '')}
          />
        )}
        <FilterDropdown
          id="legal-filter-category"
          label="Phân loại"
          value={category}
          options={CATEGORY_OPTIONS}
          onChange={next => setCategory(next as LegalDocCategory | '')}
        />
        <Button onClick={openNew} className="shrink-0">
          Thêm tài liệu
        </Button>
      </section>

      <Modal
        isOpen={editor !== null}
        onClose={() => setEditor(null)}
        title={editor?.mode === 'edit' ? 'Sửa tài liệu' : 'Thêm tài liệu'}
        size="xl"
        hideFooter
      >
        {editor && (
          <LegalDocForm
            key={editor.seq}
            initial={formInitial}
            busy={busy}
            onCancel={() => setEditor(null)}
            onSave={save}
          />
        )}
      </Modal>

      <AlertDialog
        open={archiveTarget !== null}
        onOpenChange={open => {
          if (!open) setArchiveTarget(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Lưu trữ tài liệu này?</AlertDialogTitle>
            <AlertDialogDescription>
              “{archiveTarget?.title}” sẽ được cất sang tab Lưu trữ, chatbot
              không còn tìm thấy văn bản này. Bạn có thể khôi phục bất cứ lúc
              nào.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Huỷ</AlertDialogCancel>
            <AlertDialogAction onClick={confirmArchive}>
              Lưu trữ
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Tabs
        value={tab}
        onValueChange={value => setTab(value as LegalTab)}
        className="w-full"
      >
        <TabsList className="mb-5 flex h-auto flex-wrap items-center justify-start gap-x-6 gap-y-2 rounded-none border-b border-border bg-transparent p-0 text-sm font-semibold">
          <TabsTrigger value="docs" className={TAB_TRIGGER}>
            Danh sách tài liệu
          </TabsTrigger>
          <TabsTrigger value="sources" className={TAB_TRIGGER}>
            Kho tri thức (nguồn nội dung)
          </TabsTrigger>
          <TabsTrigger value="archive" className={TAB_TRIGGER}>
            {archivedCount > 0 ? `Lưu trữ (${archivedCount})` : 'Lưu trữ'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="docs" className="mt-0 space-y-5">
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
            <p className="border-b border-border bg-surface-muted/40 px-4 py-2 text-xs text-muted">
              <strong className="text-fg">Gỡ xuống</strong>: chatbot ngừng dùng
              văn bản, giữ lại ở dạng nháp để sửa.{' '}
              <strong className="text-fg">Lưu trữ</strong>: cất sang tab Lưu
              trữ, khôi phục được bất cứ lúc nào.
            </p>
            <LegalDocList
              docs={listedDocs}
              busy={listBusy}
              onEdit={item => void openEdit(item)}
              onTogglePublish={togglePublish}
              onArchive={setArchiveTarget}
            />
          </section>

          <LegalSearchTester />
        </TabsContent>

        <TabsContent value="sources" className="mt-0">
          <LegalSourceMap docs={activeDocs} />
        </TabsContent>

        <TabsContent value="archive" className="mt-0">
          <section
            aria-labelledby="legal-archive-title"
            className="overflow-hidden rounded-xl border border-border bg-surface"
          >
            <h2
              id="legal-archive-title"
              className="border-b border-border px-4 py-3 text-sm font-bold text-fg"
            >
              Tài liệu đã lưu trữ
            </h2>
            <LegalDocList
              docs={archivedDocs}
              busy={listBusy}
              onEdit={item => void openEdit(item)}
              onTogglePublish={togglePublish}
              onArchive={setArchiveTarget}
              emptyHint="Tài liệu bấm “Lưu trữ” sẽ nằm ở đây và có thể khôi phục."
            />
          </section>
        </TabsContent>
      </Tabs>
    </div>
  )
}
