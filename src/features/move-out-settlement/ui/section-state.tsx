import type { ReactElement, ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/shared/ui/button'

export interface SectionStateProps {
  isLoading: boolean
  isError: boolean
  onRetry: () => void
  loadingText: string
  errorText: string
  children: ReactNode
}

/** Ba trạng thái dùng chung: đang tải, lỗi (có nút thử lại), còn lại là nội dung. */
export function SectionState({
  isLoading,
  isError,
  onRetry,
  loadingText,
  errorText,
  children,
}: SectionStateProps): ReactElement {
  if (isLoading) {
    return (
      <p
        role="status"
        className="inline-flex items-center gap-2 text-xs text-[var(--muted)]"
      >
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        {loadingText}
      </p>
    )
  }
  if (isError) {
    return (
      <div role="alert" className="space-y-2 text-xs text-[var(--danger)]">
        <p>{errorText}</p>
        <Button
          type="button"
          variant="secondary"
          className="min-h-11"
          onClick={onRetry}
        >
          Thử lại
        </Button>
      </div>
    )
  }
  return <>{children}</>
}
