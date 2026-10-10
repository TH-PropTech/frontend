import * as React from 'react'
import { formatCount } from '../lib/format'

export interface GroqKeyMeterProps {
  label: string
  remaining?: number | undefined
  limit?: number | undefined
  resetIn?: string | undefined
}

export function GroqKeyMeter({
  label,
  remaining,
  limit,
  resetIn,
}: GroqKeyMeterProps): React.ReactElement | null {
  if (remaining === undefined || !limit) return null
  const percent = Math.max(0, Math.min(100, (remaining / limit) * 100))
  const low = percent < 15

  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs">
        <span className="text-muted">{label}</span>
        <span className="text-fg">
          <b>{formatCount(remaining)}</b> / {formatCount(limit)}
          {resetIn ? ` · làm mới sau ${resetIn}` : ''}
        </span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={limit}
        aria-valuenow={remaining}
        className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted"
      >
        <div
          className={`h-full rounded-full transition-all ${low ? 'bg-danger' : 'bg-primary'}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
