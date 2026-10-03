import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/shared/ui/button'

export interface PageNavProps {
  label: string
  page: number
  totalPages: number
  total: number
  /** Plural noun used in the summary, for example "sự kiện". */
  noun: string
  onPage: (page: number) => void
}

export function PageNav({
  label,
  page,
  totalPages,
  total,
  noun,
  onPage,
}: PageNavProps): React.ReactElement {
  return (
    <nav
      aria-label={label}
      className="flex items-center justify-between gap-2 border-t border-border p-3"
    >
      <p className="text-xs text-muted">
        Trang {page} / {totalPages} · {total} {noun}
      </p>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          disabled={page <= 1}
          onClick={() => onPage(page - 1)}
        >
          <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" /> Trang trước
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={page >= totalPages}
          onClick={() => onPage(page + 1)}
        >
          Trang sau <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Button>
      </div>
    </nav>
  )
}
