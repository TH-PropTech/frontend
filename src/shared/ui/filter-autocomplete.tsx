'use client'

import * as React from 'react'
import { Search, X } from 'lucide-react'

export interface AutocompleteOption {
  value: string
  label: string
  sublabel?: string
}

interface FilterAutocompleteProps {
  id: string
  label: string
  options: AutocompleteOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function FilterAutocomplete({
  id,
  label,
  options,
  value,
  onChange,
  placeholder = 'Tìm kiếm...',
  className = '',
}: FilterAutocompleteProps): React.ReactElement {
  const [query, setQuery] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const selected = options.find(o => o.value === value)

  const filtered = query.trim()
    ? options.filter(
        o =>
          o.label.toLowerCase().includes(query.toLowerCase()) ||
          (o.sublabel?.toLowerCase().includes(query.toLowerCase()) ?? false)
      )
    : options

  React.useEffect(() => {
    const handler = (e: MouseEvent): void => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const handleFocus = (): void => setOpen(true)

  const handleSelect = (opt: AutocompleteOption): void => {
    onChange(opt.value)
    setQuery('')
    setOpen(false)
  }

  const handleClear = (): void => {
    onChange('')
    setQuery('')
    inputRef.current?.focus()
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <label
        htmlFor={id}
        className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted pointer-events-none" />
        <input
          ref={inputRef}
          id={id}
          type="text"
          value={open ? query : (selected?.label ?? '')}
          onChange={e => setQuery(e.target.value)}
          onFocus={handleFocus}
          placeholder={placeholder}
          className="w-full pl-8 pr-8 py-2 text-xs font-semibold text-fg bg-surface border border-border rounded-lg hover:border-border-strong focus:outline-none focus:border-primary transition-colors shadow-sm min-w-[160px]"
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-muted hover:text-fg transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {open && filtered.length > 0 && (
        <div className="absolute top-full mt-1 left-0 z-50 w-full max-h-48 overflow-y-auto bg-surface border border-border rounded-lg shadow-md animate-in fade-in slide-in-from-top-2 duration-150">
          {filtered.map(opt => (
            <button
              key={opt.value}
              type="button"
              onMouseDown={e => {
                e.preventDefault()
                handleSelect(opt)
              }}
              className={`w-full text-left px-3 py-2 transition-colors ${
                opt.value === value
                  ? 'bg-primary-soft'
                  : 'hover:bg-surface-muted'
              }`}
            >
              <span className="block text-xs font-semibold text-fg truncate">
                {opt.label}
              </span>
              {opt.sublabel && (
                <span className="block text-[10px] text-muted truncate mt-0.5">
                  {opt.sublabel}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {open && filtered.length === 0 && (
        <div className="absolute top-full mt-1 left-0 z-50 w-full bg-surface border border-border rounded-lg shadow-md px-3 py-3 animate-in fade-in duration-150">
          <p className="text-[11px] text-muted text-center">
            Không tìm thấy kết quả
          </p>
        </div>
      )}
    </div>
  )
}
