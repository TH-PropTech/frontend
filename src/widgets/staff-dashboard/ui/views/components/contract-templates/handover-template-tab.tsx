'use client'

import * as React from 'react'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import {
  getHandoverTemplateAdmin,
  publishHandoverTemplate,
  saveHandoverTemplateDraft,
  type HandoverTemplate,
  type HandoverTemplateAdminState,
} from '@/features/move-in-settlement'
import { Button } from '@/shared/ui/button'
import { AdminCard } from '@/shared/ui/admin-card'

type InventoryRow = { name: string; quantity: string }
type ChecklistRow = { id: string; label: string }

const MAX_ROWS = 100
const INPUT_CLASS =
  'mt-1 min-h-11 w-full rounded-lg border border-border bg-surface p-2 text-xs'

function toRows(template: HandoverTemplate | null): {
  inventory: InventoryRow[]
  checklist: ChecklistRow[]
} {
  return {
    inventory: (template?.inventoryDefaults ?? []).map(item => ({
      name: item.name,
      quantity: String(item.quantity),
    })),
    checklist: (template?.checklist ?? []).map(item => ({ ...item })),
  }
}

function messageOf(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback
}

export function HandoverTemplateTab(): React.ReactElement {
  const [state, setState] = React.useState<HandoverTemplateAdminState | null>(
    null
  )
  const [inventory, setInventory] = React.useState<InventoryRow[]>([])
  const [checklist, setChecklist] = React.useState<ChecklistRow[]>([])
  const [dirty, setDirty] = React.useState(false)
  const [reason, setReason] = React.useState('')
  const [loading, setLoading] = React.useState(true)
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [notice, setNotice] = React.useState<string | null>(null)

  const apply = React.useCallback((next: HandoverTemplateAdminState): void => {
    setState(next)
    const rows = toRows(next.draft ?? next.published)
    setInventory(rows.inventory)
    setChecklist(rows.checklist)
    setDirty(false)
  }, [])

  React.useEffect(() => {
    let active = true
    const load = async (): Promise<void> => {
      try {
        const loaded = await getHandoverTemplateAdmin()
        if (active) apply(loaded)
      } catch (loadError) {
        if (active)
          setError(messageOf(loadError, 'Không tải được mẫu biên bản.'))
      } finally {
        if (active) setLoading(false)
      }
    }
    void load()
    return () => {
      active = false
    }
  }, [apply])

  const editInventory = (index: number, patch: Partial<InventoryRow>): void => {
    setInventory(current =>
      current.map((row, i) => (i === index ? { ...row, ...patch } : row))
    )
    setDirty(true)
  }
  const editChecklist = (index: number, label: string): void => {
    setChecklist(current =>
      current.map((row, i) => (i === index ? { ...row, label } : row))
    )
    setDirty(true)
  }

  const draft = state?.draft ?? null
  const canPublish = Boolean(draft) && !dirty && reason.trim().length > 0

  const handleSave = async (): Promise<void> => {
    setBusy(true)
    setError(null)
    setNotice(null)
    try {
      await saveHandoverTemplateDraft(draft?.draftRevision ?? 1, {
        inventoryDefaults: inventory.map(row => ({
          name: row.name.trim(),
          quantity: Number(row.quantity),
        })),
        checklist: checklist.map(row => ({
          id: row.id,
          label: row.label.trim(),
        })),
      })
      apply(await getHandoverTemplateAdmin())
      setNotice('Đã lưu bản nháp.')
    } catch (saveError) {
      setError(messageOf(saveError, 'Không lưu được bản nháp.'))
    } finally {
      setBusy(false)
    }
  }

  const handlePublish = async (): Promise<void> => {
    if (!draft) return
    setBusy(true)
    setError(null)
    setNotice(null)
    try {
      const published = await publishHandoverTemplate(
        draft.draftRevision,
        reason.trim()
      )
      apply(await getHandoverTemplateAdmin())
      setReason('')
      setNotice(`Đã phát hành phiên bản v${published.version}.`)
    } catch (publishError) {
      setError(messageOf(publishError, 'Không phát hành được mẫu.'))
    } finally {
      setBusy(false)
    }
  }

  if (loading) {
    return (
      <p className="flex items-center gap-2 text-xs text-muted">
        <Loader2 className="h-4 w-4 animate-spin" />
        Đang tải mẫu biên bản…
      </p>
    )
  }

  return (
    <div className="space-y-4" data-testid="handover-template-tab">
      <AdminCard className="space-y-1 p-4 text-xs">
        <h2 className="text-sm font-bold text-fg">
          Mẫu biên bản bàn giao khi vào ở
        </h2>
        <p className="text-muted">
          Đang áp dụng:{' '}
          {state?.published?.version
            ? `v${state.published.version}`
            : 'chưa có phiên bản'}
          {draft ? ' · đang có bản nháp chưa phát hành' : ''}. Biên bản đã lập
          giữ nguyên phiên bản mẫu đã dùng.
        </p>
      </AdminCard>

      <AdminCard className="space-y-2 p-4">
        <h3 className="text-sm font-bold text-fg">
          Danh mục đồ nạp sẵn vào biên bản
        </h3>
        {inventory.length === 0 ? (
          <p className="text-xs text-muted">
            Chưa có dòng nào, chủ nhà tự nhập khi lập biên bản.
          </p>
        ) : null}
        {inventory.map((row, index) => (
          <div
            key={index}
            data-testid="template-inventory-row"
            className="grid gap-2 sm:grid-cols-[3fr_1fr_auto]"
          >
            <label className="text-xs">
              Tên tài sản
              <input
                maxLength={200}
                value={row.name}
                onChange={event =>
                  editInventory(index, { name: event.target.value })
                }
                className={INPUT_CLASS}
              />
            </label>
            <label className="text-xs">
              Số lượng
              <input
                type="number"
                min="1"
                step="1"
                value={row.quantity}
                onChange={event =>
                  editInventory(index, { quantity: event.target.value })
                }
                className={INPUT_CLASS}
              />
            </label>
            <Button
              type="button"
              variant="ghost"
              aria-label={`Xóa tài sản ${index + 1}`}
              className="min-h-11 self-end"
              onClick={() => {
                setInventory(current => current.filter((_, i) => i !== index))
                setDirty(true)
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          className="min-h-11"
          disabled={inventory.length >= MAX_ROWS}
          onClick={() => {
            setInventory(current => [...current, { name: '', quantity: '1' }])
            setDirty(true)
          }}
        >
          <Plus className="h-4 w-4" />
          Thêm tài sản
        </Button>
      </AdminCard>

      <AdminCard className="space-y-2 p-4">
        <h3 className="text-sm font-bold text-fg">
          Các mục kiểm tra khi bàn giao
        </h3>
        {checklist.map((row, index) => (
          <div
            key={row.id}
            data-testid="template-checklist-row"
            className="grid gap-2 sm:grid-cols-[1fr_auto]"
          >
            <label className="text-xs">
              Nội dung mục {index + 1}
              <input
                maxLength={200}
                value={row.label}
                onChange={event => editChecklist(index, event.target.value)}
                className={INPUT_CLASS}
              />
            </label>
            <Button
              type="button"
              variant="ghost"
              aria-label={`Xóa mục ${index + 1}`}
              className="min-h-11 self-end"
              onClick={() => {
                setChecklist(current => current.filter((_, i) => i !== index))
                setDirty(true)
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          className="min-h-11"
          disabled={checklist.length >= MAX_ROWS}
          onClick={() => {
            setChecklist(current => [
              ...current,
              { id: `item-${Date.now().toString(36)}`, label: '' },
            ])
            setDirty(true)
          }}
        >
          <Plus className="h-4 w-4" />
          Thêm mục kiểm tra
        </Button>
      </AdminCard>

      <AdminCard className="space-y-3 p-4">
        <label className="block text-xs">
          Lý do phát hành
          <input
            maxLength={500}
            value={reason}
            onChange={event => setReason(event.target.value)}
            className={INPUT_CLASS}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            disabled={busy || !dirty}
            className="min-h-11"
            onClick={() => void handleSave()}
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Lưu bản nháp
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={busy || !canPublish}
            className="min-h-11"
            onClick={() => void handlePublish()}
          >
            Phát hành
          </Button>
        </div>
        {dirty ? (
          <p className="text-xs text-muted">
            Có thay đổi chưa lưu. Lưu bản nháp trước khi phát hành.
          </p>
        ) : null}
        {notice ? (
          <p role="status" className="text-xs text-success">
            {notice}
          </p>
        ) : null}
        {error ? (
          <p role="alert" className="text-xs text-danger">
            {error}
          </p>
        ) : null}
      </AdminCard>
    </div>
  )
}
