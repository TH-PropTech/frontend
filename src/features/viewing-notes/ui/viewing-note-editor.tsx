'use client'

import * as React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { LockKeyhole, NotebookPen, RotateCcw, Save, Trash2 } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  createViewingNote,
  deleteViewingNote,
  getViewingNotes,
  type ViewingNoteInput,
} from '../api/viewing-notes-api'

const RATING_FIELDS = [
  ['noise', 'Độ yên tĩnh'],
  ['lighting', 'Ánh sáng'],
  ['signal', 'Sóng điện thoại'],
  ['waterPressure', 'Áp lực nước'],
  ['parking', 'Chỗ đỗ xe'],
  ['neighbors', 'Khu dân cư'],
] as const

type RatingName = (typeof RATING_FIELDS)[number][0]
type Draft = { smell: string } & Partial<Record<RatingName, number>>

export function ViewingNoteEditor({
  apartmentId,
}: {
  apartmentId: string
}): React.ReactElement {
  const queryClient = useQueryClient()
  const [draft, setDraft] = React.useState<Draft>({ smell: '' })
  const notes = useQuery({
    queryKey: ['viewing-notes', apartmentId],
    queryFn: () => getViewingNotes(apartmentId),
  })
  const createNote = useMutation({
    mutationFn: (input: ViewingNoteInput) => createViewingNote(input),
    onSuccess: async () => {
      setDraft({ smell: '' })
      await queryClient.invalidateQueries({
        queryKey: ['viewing-notes', apartmentId],
      })
    },
  })
  const removeNote = useMutation({
    mutationFn: deleteViewingNote,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['viewing-notes', apartmentId],
      }),
  })

  const submit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const input: ViewingNoteInput = { apartmentId }
    if (draft.smell.trim()) input.smell = draft.smell.trim()
    for (const [name] of RATING_FIELDS) {
      if (draft[name] !== undefined) input[name] = draft[name]
    }
    createNote.mutate(input)
  }

  if (notes.isLoading)
    return <div className="h-48 animate-pulse rounded-3xl bg-surface-muted" />
  if (notes.isError) {
    return (
      <div className="rounded-3xl border border-danger/30 bg-danger/10 p-6">
        <p className="text-sm font-semibold text-danger">
          Không tải được ghi chú.
        </p>
        <Button
          className="mt-3"
          size="sm"
          variant="outline"
          onClick={() => notes.refetch()}
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Thử lại
        </Button>
      </div>
    )
  }

  return (
    <section
      className="rounded-3xl border border-border bg-surface p-4 md:p-5 shadow-sm"
      aria-labelledby="viewing-note-title"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3
            id="viewing-note-title"
            className="flex items-center gap-2 text-base font-bold text-fg"
          >
            <NotebookPen className="h-5 w-5 text-primary" aria-hidden="true" />{' '}
            Ghi chú xem nhà
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
            <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" /> Chỉ bạn
            xem được nội dung này.
          </p>
        </div>
      </div>

      {notes.data?.items.length ? (
        <div className="mt-4 space-y-2">
          {notes.data.items.map(note => (
            <article
              key={note._id}
              className="flex items-start justify-between gap-3 rounded-2xl bg-surface-muted p-4"
            >
              <div>
                <p className="text-sm text-fg">
                  {note.smell || 'Ghi chú checklist'}
                </p>
                <p className="mt-1 text-xs text-subtle">
                  Cập nhật{' '}
                  {new Date(note.updatedAt).toLocaleDateString('vi-VN')}
                </p>
              </div>
              <Button
                aria-label="Xóa ghi chú"
                size="icon"
                variant="ghost"
                onClick={() => removeNote.mutate(note._id)}
              >
                <Trash2 className="h-4 w-4 text-danger" aria-hidden="true" />
              </Button>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-4 rounded-2xl bg-surface-muted p-4 text-sm text-muted">
          Chưa có ghi chú xem nhà.
        </p>
      )}

      <form className="mt-5 space-y-4" onSubmit={submit}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {RATING_FIELDS.map(([name, label]) => (
            <label key={name} className="text-xs font-medium text-muted">
              {label}
              <select
                aria-label={label}
                className="mt-1 h-10 w-full min-w-0 rounded-lg border border-border bg-bg px-3 text-sm text-fg"
                value={draft[name] ?? ''}
                onChange={event =>
                  setDraft(current => ({
                    ...current,
                    [name]: event.target.value
                      ? Number(event.target.value)
                      : undefined,
                  }))
                }
              >
                <option value="">Chưa chấm</option>
                {[1, 2, 3, 4, 5].map(value => (
                  <option key={value} value={value}>
                    {value}/5
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
        <label className="block text-xs font-medium text-muted">
          Mùi và thông gió
          <textarea
            className="mt-1 min-h-20 w-full rounded-xl border border-border bg-bg p-3 text-sm text-fg"
            value={draft.smell}
            maxLength={500}
            onChange={event =>
              setDraft(current => ({ ...current, smell: event.target.value }))
            }
          />
        </label>
        <Button type="submit" loading={createNote.isPending}>
          <Save className="h-4 w-4" aria-hidden="true" /> Lưu ghi chú riêng tư
        </Button>
        {createNote.isError || removeNote.isError ? (
          <p className="text-xs text-danger">
            Không thể lưu thay đổi. Hãy thử lại.
          </p>
        ) : null}
      </form>
    </section>
  )
}
