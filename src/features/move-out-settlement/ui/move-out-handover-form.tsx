'use client'

import { useState, type FormEvent, type ReactElement } from 'react'
import { ClipboardList, Loader2, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import type {
  MoveOutHandover,
  MoveOutHandoverInput,
  MoveOutItemCondition,
} from '../api/move-out-types'
import { CONDITION_LABELS } from '../lib/move-out-labels'
import { FIELD_CLASS } from './note-action'

export interface MoveOutHandoverFormProps {
  busy: boolean
  /** Có bản trước: điền sẵn và nút là "Sửa biên bản". */
  initial?: MoveOutHandover | null
  onSubmit: (input: MoveOutHandoverInput) => void
}

interface ItemDraft {
  name: string
  quantity: string
  condition: MoveOutItemCondition
  note: string
}

const MAX_ITEMS = 100
const CONDITIONS = Object.keys(CONDITION_LABELS) as MoveOutItemCondition[]
const METER_FIELDS = [
  { key: 'electricity', label: 'Chỉ số điện' },
  { key: 'water', label: 'Chỉ số nước' },
  { key: 'keyCount', label: 'Số chìa khóa trả lại' },
] as const
type MeterKey = (typeof METER_FIELDS)[number]['key']

const toLocalInput = (iso: string): string => {
  const date = new Date(iso)
  const pad = (n: number): string => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export function MoveOutHandoverForm({
  busy,
  initial,
  onSubmit,
}: MoveOutHandoverFormProps): ReactElement {
  const [handedBackAt, setHandedBackAt] = useState(
    initial ? toLocalInput(initial.handedBackAt) : ''
  )
  const [meters, setMeters] = useState<Record<MeterKey, string>>({
    electricity: String(initial?.meterReadings.electricity ?? ''),
    water: String(initial?.meterReadings.water ?? ''),
    keyCount: String(initial?.keyCount ?? ''),
  })
  const [items, setItems] = useState<ItemDraft[]>(
    (initial?.inventoryItems ?? []).map(item => ({
      name: item.name,
      quantity: String(item.quantity),
      condition: item.condition,
      note: item.note ?? '',
    }))
  )
  const [notes, setNotes] = useState(initial?.notes ?? '')

  const updateItem = (index: number, patch: Partial<ItemDraft>): void =>
    setItems(current =>
      current.map((item, i) => (i === index ? { ...item, ...patch } : item))
    )

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const trimmedNotes = notes.trim()
    onSubmit({
      handedBackAt: new Date(handedBackAt).toISOString(),
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
      aria-label="Biên bản trả nhà"
      className="grid gap-3 sm:grid-cols-2"
    >
      <label className="text-xs sm:col-span-2">
        Thời gian trả nhà
        <input
          required
          type="datetime-local"
          value={handedBackAt}
          onChange={event => setHandedBackAt(event.target.value)}
          className={FIELD_CLASS}
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
            className={FIELD_CLASS}
          />
        </label>
      ))}
      <fieldset className="space-y-2 sm:col-span-2">
        <legend className="text-xs font-semibold text-[var(--fg)]">
          Đồ đạc, thiết bị khi trả nhà
        </legend>
        {items.length === 0 ? (
          <p className="text-xs text-[var(--muted)]">
            Chưa có dòng nào. Thêm từng món đối chiếu với biên bản nhận nhà.
          </p>
        ) : null}
        {items.map((item, index) => (
          <div
            key={index}
            data-testid="move-out-item-row"
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
                className={FIELD_CLASS}
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
                className={FIELD_CLASS}
              />
            </label>
            <label className="text-xs">
              Tình trạng
              <select
                value={item.condition}
                onChange={event =>
                  updateItem(index, {
                    condition: event.target.value as MoveOutItemCondition,
                  })
                }
                className={FIELD_CLASS}
              >
                {CONDITIONS.map(condition => (
                  <option key={condition} value={condition}>
                    {CONDITION_LABELS[condition]}
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
                className={FIELD_CLASS}
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
          onClick={() =>
            setItems(current => [
              ...current,
              { name: '', quantity: '1', condition: 'good', note: '' },
            ])
          }
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
          className={FIELD_CLASS}
        />
      </label>
      <Button type="submit" disabled={busy} className="min-h-11 sm:col-span-2">
        {busy ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ClipboardList className="h-4 w-4" />
        )}
        {initial ? 'Sửa biên bản trả nhà' : 'Ghi biên bản trả nhà'}
      </Button>
    </form>
  )
}
