'use client'

import { useId, useState, type ReactElement, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

export interface RailGroupProps {
  title: string
  /** Mở sẵn trên desktop; mobile luôn hiện nội dung của tab đang chọn. */
  defaultOpen?: boolean
  /** Tab mobile tương ứng đang được chọn. */
  isMobileActive: boolean
  children: ReactNode
}

/**
 * Nhóm panel của rail phải. Trên desktop (`lg+`) tiêu đề là nút gập/mở; dưới `lg`
 * tiêu đề ẩn và nội dung luôn hiện theo tab, nên không cần phân nhánh bằng JS.
 */
export function RailGroup({
  title,
  defaultOpen = true,
  isMobileActive,
  children,
}: RailGroupProps): ReactElement {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const contentId = useId()

  return (
    <section
      className={`flex-col gap-4 ${isMobileActive ? 'flex' : 'hidden lg:flex'}`}
    >
      <h2 className="hidden lg:block">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={() => setIsOpen(open => !open)}
          className="flex min-h-11 w-full items-center justify-between gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] px-3 text-xs font-bold uppercase tracking-wider text-[var(--fg)] transition-colors hover:border-[var(--primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
        >
          <span>{title}</span>
          <ChevronDown
            aria-hidden="true"
            className={`h-4 w-4 shrink-0 text-[var(--muted)] transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </h2>
      <div
        id={contentId}
        className={`flex flex-col gap-6 ${isOpen ? '' : 'lg:hidden'}`}
      >
        {children}
      </div>
    </section>
  )
}
