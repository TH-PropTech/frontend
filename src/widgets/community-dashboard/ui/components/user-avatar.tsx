'use client'

import * as React from 'react'

import Image from 'next/image'

interface UserAvatarProps {
  src?: string | null
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const SIZE_MAP = {
  sm: 'h-7 w-7 text-[11px]',
  md: 'h-10 w-10 text-xs',
  lg: 'h-12 w-12 text-sm',
}

export function UserAvatar({
  src,
  name,
  size = 'md',
  className = '',
}: UserAvatarProps): React.ReactElement {
  const [hasError, setHasError] = React.useState(false)

  const initials = React.useMemo(() => {
    if (!name) return 'U'
    const parts = name.trim().split(/\s+/).filter(Boolean)
    if (parts.length === 0) return 'U'
    const first = parts[0] ?? ''
    if (parts.length === 1) return first.slice(0, 2).toUpperCase()
    const last = parts[parts.length - 1] ?? ''
    return ((first[0] ?? '') + (last[0] ?? '')).toUpperCase() || 'U'
  }, [name])

  const bgClass = React.useMemo(() => {
    const colors = [
      'bg-primary-soft text-primary border-primary/20',
      'bg-accent-soft text-fg border-accent/30',
      'bg-success-soft text-success border-success/20',
      'bg-info-soft text-info border-info/20',
    ]
    let hash = 0
    for (let i = 0; i < (name || '').length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
  }, [name])

  const sizeClass = SIZE_MAP[size]

  if (!src || hasError) {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-full font-bold uppercase select-none border shrink-0 ${sizeClass} ${bgClass} ${className}`}
        title={name}
        aria-label={name}
      >
        {initials}
      </div>
    )
  }

  return (
    <div
      className={`relative rounded-full overflow-hidden shrink-0 ring-1 ring-border ${sizeClass} ${className}`}
    >
      <Image
        src={src}
        alt={name}
        fill
        sizes="48px"
        unoptimized
        className="object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  )
}
