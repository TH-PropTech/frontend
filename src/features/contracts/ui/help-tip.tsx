'use client'

import type { ReactElement } from 'react'
import { HelpCircle } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { GLOSSARY, type GlossaryTerm } from '../lib/contract-glossary'

export interface HelpTipProps {
  term: GlossaryTerm
}

/** Nút "?" mở giải thích ngắn; dùng popover (chạm/bàn phím) thay vì tooltip chỉ hover. */
export function HelpTip({ term }: HelpTipProps): ReactElement {
  const entry = GLOSSARY[term]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`Giải thích: ${entry.title}`}
          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[var(--muted)] transition-colors hover:text-[var(--primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
        >
          <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 space-y-1 p-3 text-xs">
        <p className="font-bold text-[var(--fg)]">{entry.title}</p>
        <p className="leading-relaxed text-[var(--muted)]">{entry.body}</p>
      </PopoverContent>
    </Popover>
  )
}
