'use client'

import * as React from 'react'
import { normalizeKeywords } from '../lib/format'

export interface LegalKeywordInputProps {
  id: string
  value: string[]
  onChange: (next: string[]) => void
}

/** Chip input: Enter or comma adds a keyword, Backspace on empty removes the last one. */
export function LegalKeywordInput({
  id,
  value,
  onChange,
}: LegalKeywordInputProps): React.ReactElement {
  const [draft, setDraft] = React.useState('')

  const commit = (): void => {
    const next = normalizeKeywords([...value, ...draft.split(',')])
    onChange(next)
    setDraft('')
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      if (draft.trim()) commit()
      return
    }
    if (event.key === 'Backspace' && !draft && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-border bg-surface px-2 py-1.5 focus-within:ring-2 focus-within:ring-primary/30">
      {value.map(keyword => (
        <span
          key={keyword}
          className="inline-flex items-center gap-1 rounded-md bg-primary-soft px-2 py-0.5 text-[11px] font-semibold text-primary"
        >
          {keyword}
          <button
            type="button"
            aria-label={`Xoá từ khoá ${keyword}`}
            onClick={() => onChange(value.filter(item => item !== keyword))}
            className="rounded px-0.5 leading-none text-muted hover:text-fg"
          >
            ×
          </button>
        </span>
      ))}
      <input
        id={id}
        value={draft}
        placeholder={value.length ? '' : 'Nhập từ khoá, nhấn Enter'}
        onChange={event => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          if (draft.trim()) commit()
        }}
        className="min-w-[120px] flex-1 bg-transparent px-1 py-0.5 text-sm text-fg placeholder:text-muted focus:outline-none"
      />
    </div>
  )
}
