'use client'

import { useId, useState, type FormEvent, type ReactElement } from 'react'
import { Button } from '@/shared/ui/button'

export const FIELD_CLASS =
  'mt-1 min-h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 text-sm'

export interface NoteActionProps {
  /** Chữ trên nút mở form, ví dụ "Phản đối biên bản". */
  openLabel: string
  fieldLabel: string
  submitLabel: string
  busy: boolean
  onSubmit: (note: string) => void
}

/** Nút mở ra ô ghi chú bắt buộc rồi gửi: dùng cho phản đối và yêu cầu tranh chấp. */
export function NoteAction({
  openLabel,
  fieldLabel,
  submitLabel,
  busy,
  onSubmit,
}: NoteActionProps): ReactElement {
  const [open, setOpen] = useState(false)
  const [note, setNote] = useState('')
  const regionId = useId()

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const trimmed = note.trim()
    if (trimmed) onSubmit(trimmed)
  }

  return (
    <div>
      <Button
        type="button"
        variant="secondary"
        className="min-h-11"
        aria-expanded={open}
        aria-controls={regionId}
        onClick={() => setOpen(current => !current)}
      >
        {openLabel}
      </Button>
      {open ? (
        <form id={regionId} onSubmit={handleSubmit} className="mt-2 space-y-2">
          <label className="block text-xs">
            {fieldLabel}
            <textarea
              required
              maxLength={1000}
              value={note}
              onChange={event => setNote(event.target.value)}
              className={FIELD_CLASS}
            />
          </label>
          <Button
            type="submit"
            className="min-h-11"
            disabled={busy || !note.trim()}
          >
            {submitLabel}
          </Button>
        </form>
      ) : null}
    </div>
  )
}
