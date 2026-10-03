import { RotateCcw } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { describeFabricAuditError } from '../model/error-messages'

/** Pulsing placeholder announced to assistive tech while a panel loads. */
export function PanelLoading({
  label,
  rows = 3,
}: {
  label: string
  rows?: number
}): React.ReactElement {
  return (
    <div role="status" aria-label={label} className="space-y-2">
      {Array.from({ length: rows }, (_, index) => (
        <div
          key={index}
          className="h-12 animate-pulse rounded-lg bg-surface-muted"
        />
      ))}
    </div>
  )
}

export function PanelError({
  error,
  onRetry,
  testId,
}: {
  error: unknown
  onRetry: () => void
  testId?: string
}): React.ReactElement {
  return (
    <div
      role="alert"
      data-testid={testId}
      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-danger bg-danger-soft p-4"
    >
      <p className="text-sm font-semibold text-danger">
        {describeFabricAuditError(error)}
      </p>
      <Button size="sm" variant="outline" onClick={onRetry}>
        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Thử lại
      </Button>
    </div>
  )
}

export function PanelEmpty({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <p className="rounded-xl border border-border bg-surface p-5 text-sm text-muted">
      {children}
    </p>
  )
}

export function InlineError({
  message,
}: {
  message: string
}): React.ReactElement {
  return (
    <p role="alert" className="text-sm font-medium text-danger">
      {message}
    </p>
  )
}
