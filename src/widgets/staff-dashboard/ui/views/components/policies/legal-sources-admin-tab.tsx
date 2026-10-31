'use client'

import * as React from 'react'
import {
  ArrowDown,
  ArrowUp,
  BookOpen,
  Edit3,
  ExternalLink,
  Eye,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from 'lucide-react'
import {
  PublicServiceDetailModal,
  createLegalSource,
  deleteLegalSource,
  getAdminLegalSources,
  getLegalAdminErrorMessage,
  reorderLegalSources,
  updateLegalSource,
  type LegalSource,
  type LegalSourceInput,
} from '@/features/contracts'
import { ConfirmDialog } from '@/shared/ui/confirm-dialog'
import {
  LegalSourceForm,
  type LegalSourceFormValues,
} from './legal-source-form'

type Notice = { type: 'success' | 'error'; text: string }

/** Payload PATCH: `key` bất biến nên không gửi (backend từ chối field lạ) */
function toPatch(values: LegalSourceFormValues): Partial<LegalSourceInput> {
  const patch: Partial<LegalSourceFormValues> = { ...values }
  delete patch.key
  return patch
}

function Toggle({
  checked,
  label,
  testId,
  onClick,
}: {
  checked: boolean
  label: string
  testId: string
  onClick: () => void
}): React.ReactElement {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      data-testid={testId}
      onClick={onClick}
      className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors ${
        checked ? 'bg-[var(--success)]' : 'bg-[var(--border-strong)]'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transition ${
          checked ? 'translate-x-4' : 'translate-x-0'
        }`}
      />
    </button>
  )
}

export function LegalSourcesAdminTab(): React.ReactElement {
  const [sources, setSources] = React.useState<LegalSource[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [loadError, setLoadError] = React.useState<string | null>(null)
  const [loadAttempt, setLoadAttempt] = React.useState(0)
  const [notice, setNotice] = React.useState<Notice | null>(null)
  const [search, setSearch] = React.useState('')
  const [preview, setPreview] = React.useState<LegalSource | null>(null)
  // `undefined` = đóng form, `null` = tạo mới
  const [editing, setEditing] = React.useState<LegalSource | null | undefined>(
    undefined
  )
  const [isSaving, setIsSaving] = React.useState(false)
  const [formError, setFormError] = React.useState<string | null>(null)
  const [deletingSource, setDeletingSource] =
    React.useState<LegalSource | null>(null)

  React.useEffect(() => {
    let active = true
    getAdminLegalSources()
      .then(data => {
        if (!active) return
        setSources(data)
        setLoadError(null)
      })
      .catch((err: unknown) => {
        if (active) setLoadError(getLegalAdminErrorMessage(err))
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })
    return () => {
      active = false
    }
  }, [loadAttempt])

  const notify = (text: string, type: Notice['type'] = 'success') =>
    setNotice({ text, type })

  const replace = (saved: LegalSource) =>
    setSources(list => list.map(s => (s.key === saved.key ? saved : s)))

  const patchSource = async (
    source: LegalSource,
    patch: Partial<LegalSourceInput>,
    message: string
  ) => {
    try {
      replace(await updateLegalSource(source.key, patch))
      notify(message)
    } catch (err) {
      notify(getLegalAdminErrorMessage(err), 'error')
    }
  }

  const handleMove = async (source: LegalSource, offset: -1 | 1) => {
    const index = sources.findIndex(s => s.key === source.key)
    const target = index + offset
    if (target < 0 || target >= sources.length) return
    const reordered = [...sources]
    const [moved] = reordered.splice(index, 1)
    if (moved) reordered.splice(target, 0, moved)
    const previous = sources
    setSources(reordered)
    try {
      setSources(await reorderLegalSources(reordered.map(s => s.key)))
    } catch (err) {
      setSources(previous)
      notify(getLegalAdminErrorMessage(err), 'error')
    }
  }

  const handleConfirmDelete = async () => {
    if (!deletingSource) return
    try {
      await deleteLegalSource(deletingSource.key)
      setSources(list => list.filter(s => s.key !== deletingSource.key))
      notify(`Đã xoá nguồn [${deletingSource.code}]`)
    } catch (err) {
      notify(getLegalAdminErrorMessage(err), 'error')
    } finally {
      setDeletingSource(null)
    }
  }

  const openForm = (source: LegalSource | null) => {
    setFormError(null)
    setEditing(source)
  }

  const handleSubmit = async (values: LegalSourceFormValues) => {
    setIsSaving(true)
    setFormError(null)
    try {
      if (editing) {
        replace(await updateLegalSource(editing.key, toPatch(values)))
        notify(`Đã cập nhật nguồn [${values.code}]`)
      } else {
        const created = await createLegalSource(values)
        setSources(list => [...list, created])
        notify(`Đã tạo nguồn [${created.code}]`)
      }
      setEditing(undefined)
    } catch (err) {
      setFormError(getLegalAdminErrorMessage(err))
    } finally {
      setIsSaving(false)
    }
  }

  const query = search.trim().toLowerCase()
  const visible = query
    ? sources.filter(s =>
        [s.key, s.code, s.title].some(v => v.toLowerCase().includes(query))
      )
    : sources
  const panelCount = sources.filter(
    s => s.isActive && s.showInContractPanel
  ).length

  if (isLoading) {
    return (
      <div
        data-testid="legal-sources-admin-loading"
        className="p-8 text-center text-xs text-[var(--muted)] flex items-center justify-center gap-2"
      >
        <RefreshCw className="w-4 h-4 animate-spin text-[var(--primary)]" />
        <span>Đang tải nguồn pháp lý...</span>
      </div>
    )
  }

  if (loadError) {
    return (
      <div
        data-testid="legal-sources-admin-error"
        className="p-4 rounded-xl border border-[var(--danger)] bg-[var(--danger)]/10 text-xs text-[var(--danger)] flex items-center justify-between gap-3"
      >
        <span>{loadError}</span>
        <button
          type="button"
          onClick={() => {
            setIsLoading(true)
            setLoadAttempt(n => n + 1)
          }}
          className="font-semibold underline underline-offset-2"
        >
          Thử lại
        </button>
      </div>
    )
  }

  return (
    <div data-testid="legal-sources-admin-tab" className="space-y-4">
      {notice && (
        <div
          role="status"
          data-testid="legal-sources-notice"
          className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold ${
            notice.type === 'success'
              ? 'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/30'
              : 'bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)]/30'
          }`}
        >
          <span>{notice.text}</span>
          <button
            type="button"
            aria-label="Đóng thông báo"
            onClick={() => setNotice(null)}
            className="p-1 hover:opacity-75"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
          <BookOpen className="w-4 h-4 text-[var(--primary)]" />
          <span>
            {sources.length} nguồn · {panelCount} đang hiển thị trên panel hợp
            đồng
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[var(--muted)]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Tìm theo key, mã, tiêu đề..."
              className="pl-9 pr-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--fg)]"
            />
          </div>
          <button
            type="button"
            onClick={() => openForm(null)}
            data-testid="btn-add-legal-source"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[var(--primary)] text-white text-xs font-bold hover:opacity-95"
          >
            <Plus className="w-4 h-4" />
            Thêm nguồn
          </button>
        </div>
      </div>

      <ul className="space-y-2" data-testid="legal-sources-list">
        {visible.length === 0 && (
          <li className="p-6 text-center text-xs text-[var(--muted)] rounded-xl border border-dashed border-[var(--border)]">
            Không có nguồn nào phù hợp.
          </li>
        )}
        {visible.map(source => {
          const index = sources.findIndex(s => s.key === source.key)
          return (
            <li
              key={source.key}
              data-testid={`legal-source-row-${source.key}`}
              className={`p-3 rounded-xl border border-[var(--border)] flex flex-wrap items-center gap-3 ${
                source.isActive
                  ? 'bg-[var(--surface)]'
                  : 'bg-[var(--surface-muted)] opacity-70'
              }`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold bg-[var(--surface-muted)] text-[var(--muted)] border border-[var(--border)]">
                {index + 1}
              </span>
              <div className="flex-1 min-w-[200px] space-y-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-[var(--surface-muted)] border border-[var(--border)]">
                    {source.code}
                  </span>
                  <span className="text-[10px] font-semibold text-[var(--muted)]">
                    {source.kind === 'procedure'
                      ? 'Thủ tục DVC'
                      : 'Văn bản pháp lý'}{' '}
                    · key <code>{source.key}</code>
                  </span>
                </div>
                <p className="text-xs font-bold text-[var(--fg)]">
                  {source.title}
                </p>
                <a
                  href={source.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-[var(--primary)] hover:underline break-all"
                >
                  <ExternalLink className="w-3 h-3 shrink-0" />
                  {source.externalUrl}
                </a>
              </div>

              <div className="flex items-center gap-4 text-[11px] text-[var(--muted)]">
                <span className="inline-flex items-center gap-1.5">
                  Hiện trên trang hợp đồng
                  <Toggle
                    checked={source.showInContractPanel}
                    label={`Hiển thị ${source.code} trên panel hợp đồng`}
                    testId={`toggle-panel-${source.key}`}
                    onClick={() =>
                      void patchSource(
                        source,
                        { showInContractPanel: !source.showInContractPanel },
                        `${source.showInContractPanel ? 'Ẩn' : 'Hiển thị'} [${source.code}] trên panel hợp đồng`
                      )
                    }
                  />
                </span>
                <span className="inline-flex items-center gap-1.5">
                  Hiệu lực
                  <Toggle
                    checked={source.isActive}
                    label={`Bật tắt hiệu lực ${source.code}`}
                    testId={`toggle-active-${source.key}`}
                    onClick={() =>
                      void patchSource(
                        source,
                        { isActive: !source.isActive },
                        `${source.isActive ? 'Tắt' : 'Bật'} nguồn [${source.code}]`
                      )
                    }
                  />
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label={`Đưa ${source.code} lên`}
                  disabled={index === 0}
                  onClick={() => void handleMove(source, -1)}
                  className="p-1 rounded text-[var(--muted)] hover:text-[var(--primary)] disabled:opacity-30"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  aria-label={`Đưa ${source.code} xuống`}
                  disabled={index === sources.length - 1}
                  onClick={() => void handleMove(source, 1)}
                  className="p-1 rounded text-[var(--muted)] hover:text-[var(--primary)] disabled:opacity-30"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  aria-label={`Xem trước ${source.code}`}
                  onClick={() => setPreview(source)}
                  className="p-1 rounded text-[var(--muted)] hover:text-[var(--primary)]"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  aria-label={`Sửa ${source.code}`}
                  data-testid={`btn-edit-source-${source.key}`}
                  onClick={() => openForm(source)}
                  className="p-1 rounded text-[var(--muted)] hover:text-[var(--primary)]"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  aria-label={`Xoá ${source.code}`}
                  data-testid={`btn-delete-source-${source.key}`}
                  onClick={() => setDeletingSource(source)}
                  className="p-1 rounded text-[var(--muted)] hover:text-[var(--danger)]"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </li>
          )
        })}
      </ul>

      {editing !== undefined && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={editing ? `Sửa nguồn ${editing.code}` : 'Thêm nguồn'}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setEditing(undefined)}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-muted)] px-6 py-4">
              <h3 className="text-sm font-bold text-[var(--fg)]">
                {editing
                  ? `Sửa nguồn: ${editing.code}`
                  : 'Thêm nguồn pháp lý / DVC'}
              </h3>
              <button
                type="button"
                aria-label="Đóng form"
                onClick={() => setEditing(undefined)}
                className="p-1 text-[var(--muted)] hover:text-[var(--fg)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <LegalSourceForm
              initial={editing}
              isSaving={isSaving}
              serverError={formError}
              onSubmit={values => void handleSubmit(values)}
              onCancel={() => setEditing(undefined)}
            />
          </div>
        </div>
      )}

      <PublicServiceDetailModal
        source={preview}
        onClose={() => setPreview(null)}
      />

      <ConfirmDialog
        open={!!deletingSource}
        onOpenChange={open => !open && setDeletingSource(null)}
        title="Xoá nguồn pháp lý"
        description={
          deletingSource
            ? `Bạn có chắc chắn muốn xoá nguồn [${deletingSource.code}] "${deletingSource.title}"?`
            : undefined
        }
        confirmText="Xoá"
        variant="danger"
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
