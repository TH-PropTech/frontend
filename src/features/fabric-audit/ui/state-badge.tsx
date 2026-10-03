import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  MinusCircle,
  XCircle,
  type LucideIcon,
} from 'lucide-react'
import { Badge } from '@/shared/ui/badge'
import { cn } from '@/shared/lib/utils'
import type { StateView, Tone } from '../model/labels'

const TONES: Record<Tone, { className: string; Icon: LucideIcon }> = {
  success: {
    className: 'border-border bg-success-soft text-success',
    Icon: CheckCircle2,
  },
  warning: {
    className: 'border-border bg-warning-soft text-warning',
    Icon: AlertTriangle,
  },
  danger: {
    className: 'border-border bg-danger-soft text-danger',
    Icon: XCircle,
  },
  info: { className: 'border-border bg-info-soft text-info', Icon: Clock },
  neutral: {
    className: 'border-border bg-surface-muted text-muted',
    Icon: MinusCircle,
  },
}

/** Status chip: tone colour plus an icon and text, so state never relies on colour alone. */
export function StateBadge({
  view,
  className,
}: {
  view: StateView
  className?: string
}): React.ReactElement {
  const { className: toneClass, Icon } = TONES[view.tone]
  return (
    <Badge
      variant="outline"
      className={cn('gap-1 whitespace-nowrap', toneClass, className)}
    >
      <Icon className="h-3 w-3 shrink-0" aria-hidden="true" />
      {view.label}
    </Badge>
  )
}
