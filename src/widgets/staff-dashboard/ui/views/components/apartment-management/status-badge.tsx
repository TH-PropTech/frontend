import * as React from 'react'
import { STATUS_CONFIG } from './types'
import type { ApartmentStatus } from './types'

interface StatusBadgeProps {
  status: ApartmentStatus
  size?: 'sm' | 'xs'
}

export function StatusBadge({
  status,
  size = 'xs',
}: StatusBadgeProps): React.ReactElement {
  const cfg = STATUS_CONFIG[status]
  const sizeClass =
    size === 'sm' ? 'text-xs px-2.5 py-1' : 'text-[10px] px-2 py-0.5'
  return (
    <span
      className={`font-bold rounded-full border ${sizeClass} ${cfg.textClass} ${cfg.bgClass} ${cfg.borderClass}`}
    >
      {cfg.label}
    </span>
  )
}
