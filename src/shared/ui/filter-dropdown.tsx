'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'

export interface FilterDropdownOption {
  value: string
  label: string
}

interface FilterDropdownProps {
  id: string
  label: string
  options: FilterDropdownOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function FilterDropdown({
  id,
  label,
  options,
  value,
  onChange,
  placeholder = 'Chọn...',
  className = '',
}: FilterDropdownProps): React.ReactElement {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  const selected = options.find(o => o.value === value)

  React.useEffect(() => {
    const handler = (e: MouseEvent): void => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <label
        htmlFor={id}
        className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1"
      >
        {label}
      </label>
      <button
        id={id}
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 text-xs font-semibold text-fg bg-surface border border-border rounded-lg hover:border-border-strong transition-colors shadow-sm min-w-[140px]"
      >
        <span className={selected ? 'text-fg' : 'text-muted'}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-muted shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute top-full mt-1 left-0 z-50 min-w-full bg-surface border border-border rounded-lg shadow-md overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value)
                setOpen(false)
              }}
              className={`w-full text-left px-3 py-2 text-xs font-semibold transition-colors ${
                opt.value === value
                  ? 'bg-primary-soft text-primary'
                  : 'text-fg hover:bg-surface-muted'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
