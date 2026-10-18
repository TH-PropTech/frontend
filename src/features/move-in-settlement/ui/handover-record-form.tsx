'use client'

import { useState, type FormEvent, type ReactElement } from 'react'
import { ClipboardList, Loader2, Plus, Trash2 } from 'lucide-react'
import type {
  HandoverInput,
  HandoverInventoryItem,
} from '@/features/contracts/api/contracts-api'
import { Button } from '@/shared/ui/button'
import { ITEM_CONDITION_LABELS } from '../lib/move-in-labels'

export interface HandoverRecordFormProps {
  busy: boolean
  /** Có biên bản trước → nút là "Sửa biên bản". */
  isRevision: boolean
  onSubmit: (input: HandoverInput) => void
}

type ItemDraft = {
  name: string
  quantity: string
  condition: HandoverInventoryItem['condition']
  note: string
}

const MAX_ITEMS = 100
const INPUT_CLASS =
  'mt-1 min-h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2'
const EMPTY_ITEM: ItemDraft = {
  name: '',
  quantity: '1',
  condition: 'good',
  note: '',
}

const METER_FIELDS = [
  { key: 'electricity', label: 'Chỉ số điện' },
  { key: 'water', label: 'Chỉ số nước' },
  { key: 'keyCount', label: 'Số chìa khóa' },
] as const
type MeterKey = (typeof METER_FIELDS)[number]['key']

export function HandoverRecordForm({
  busy,
  isRevision,
  onSubmit,
}: HandoverRecordFormProps): ReactElement {
  const [handedOverAt, setHandedOverAt] = useState('')
  const [meters, setMeters] = useState<Record<MeterKey, string>>({
    electricity: '',
    water: '',
    keyCount: '',
  })
  const [items, setItems] = useState<ItemDraft[]>([])
  const [notes, setNotes] = useState('')

  const updateItem = (index: number, patch: Partial<ItemDraft>): void =>
    setItems(current =>
      current.map((item, i) => (i === index ? { ...item, ...patch } : item))
    )

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const trimmedNotes = notes.trim()
    onSubmit({
      // datetime-local không có múi giờ: đổi sang ISO theo giờ trình duyệt.
      handedOverAt: new Date(handedOverAt).toISOString(),
      electricity: Number(meters.electricity),
      water: Number(meters.water),
      keyCount: Number(meters.keyCount),
      inventoryItems: items.map(item => ({
        name: item.name.trim(),
        quantity: Number(item.quantity),
        condition: item.condition,
        ...(item.note.trim() ? { note: item.note.trim() } : {}),
      })),
      ...(trimmedNotes ? { notes: trimmedNotes } : {}),
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 border-t border-[var(--border)] pt-4 sm:grid-cols-2"
    >
      <label className="text-xs sm:col-span-2">
        Thời gian bàn giao
        <input
          required
          type="datetime-local"
          value={handedOverAt}
          onChange={event => setHandedOverAt(event.target.value)}
          className={INPUT_CLASS}
        />
      </label>
      {METER_FIELDS.map(field => (
        <label key={field.key} className="text-xs">
          {field.label}
          <input
            required
            type="number"
            min="0"
            step="1"
            value={meters[field.key]}
            onChange={event =>
              setMeters(current => ({
                ...current,
                [field.key]: event.target.value,
              }))
            }
            className={INPUT_CLASS}
          />
        </label>
      ))}
      <fieldset className="space-y-2 sm:col-span-2">
        <legend className="text-xs font-semibold text-[var(--fg)]">
          Danh mục thiết bị, nội thất
        </legend>
        {items.length === 0 ? (
          <p className="text-xs text-[var(--muted)]">
            Chưa có dòng nào. Thêm từng thiết bị, nội thất bàn giao kèm căn hộ.
          </p>
        ) : null}
        {items.map((item, index) => (
          <div
            key={index}
            data-testid="inventory-row"
            className="grid gap-2 rounded-lg border border-[var(--border)] p-2 sm:grid-cols-[2fr_1fr_1fr_2fr_auto]"
          >
            <label className="text-xs">
              Tên tài sản
              <input
                required
                maxLength={200}
                value={item.name}
                onChange={event =>
                  updateItem(index, { name: event.target.value })
                }
                className={INPUT_CLASS}
              />
            </label>
            <label className="text-xs">
              Số lượng
              <input
                required
                type="number"
                min="1"
                step="1"
                value={item.quantity}
                onChange={event =>
                  updateItem(index, { quantity: event.target.value })
                }
                className={INPUT_CLASS}
              />
            </label>
            <label className="text-xs">
              Tình trạng
              <select
                value={item.condition}
                onChange={event =>
                  updateItem(index, {
                    condition:
                      event.target.value === 'damaged' ? 'damaged' : 'good',
                  })
                }
                className={INPUT_CLASS}
              >
                {(['good', 'damaged'] as const).map(condition => (
                  <option key={condition} value={condition}>
                    {ITEM_CONDITION_LABELS[condition]}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs">
              Ghi chú
              <input
                maxLength={500}
                value={item.note}
                onChange={event =>
                  updateItem(index, { note: event.target.value })
                }
                className={INPUT_CLASS}
              />
            </label>
            <Button
              type="button"
              variant="ghost"
              aria-label={`Xóa dòng ${index + 1}`}
              className="min-h-11 self-end"
              onClick={() =>
                setItems(current => current.filter((_, i) => i !== index))
              }
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          className="min-h-11"
          disabled={items.length >= MAX_ITEMS}
          onClick={() => setItems(current => [...current, { ...EMPTY_ITEM }])}
        >
          <Plus className="h-4 w-4" />
          Thêm tài sản
        </Button>
      </fieldset>
      <label className="text-xs sm:col-span-2">
        Ghi chú chung
        <textarea
          maxLength={2000}
          value={notes}
          onChange={event => setNotes(event.target.value)}
          className={INPUT_CLASS}
        />
      </label>
      <Button type="submit" disabled={busy} className="min-h-11 sm:col-span-2">
        {busy ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ClipboardList className="h-4 w-4" />
        )}
        {isRevision ? 'Sửa biên bản bàn giao' : 'Ghi biên bản bàn giao'}
      </Button>
    </form>
  )
}
