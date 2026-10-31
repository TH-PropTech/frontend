import * as React from 'react'
import Image from 'next/image'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'white'
  className?: string
}

const sizeMap = {
  sm: { img: 28, text: 'text-lg' },
  md: { img: 36, text: 'text-lg sm:text-xl' },
  lg: { img: 44, text: 'text-2xl' },
} as const

export function Logo({
  size = 'md',
  variant = 'default',
  className,
}: LogoProps): React.ReactElement {
  const { img, text } = sizeMap[size]
  const textColor = variant === 'white' ? 'text-white/95' : 'text-fg'
  const accentColor =
    variant === 'white' ? 'text-[var(--accent)]' : 'text-primary'

  return (
    <div className={`flex items-center gap-2.5 ${className ?? ''}`}>
      <Image
        src="/logo.png"
        alt="TH PropTech Logo"
        width={img}
        height={img}
        style={{ width: 'auto', height: 'auto' }}
        className={variant === 'white' ? 'brightness-0 invert' : ''}
        priority
      />
      <span
        className={`font-display font-bold tracking-tight whitespace-nowrap ${textColor} ${text}`}
      >
        TH-<span className={accentColor}>PropTech</span>
      </span>
    </div>
  )
}
