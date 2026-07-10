import * as React from 'react'
import { cn } from '@/shared/lib/utils'

interface MatchScoreRingProps {
  score: number
  className?: string
}

export function MatchScoreRing({
  score,
  className,
}: MatchScoreRingProps): React.ReactElement {
  const radius = 36
  const strokeWidth = 8
  const normalizedRadius = radius - strokeWidth * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (score / 100) * circumference

  // Color mapping based on score
  let strokeColor = 'stroke-accent' // fallback
  let bgColor = 'bg-accent/10 text-accent'

  if (score >= 80) {
    strokeColor = 'stroke-[#6B8E4E]' // Olive Green
    bgColor = 'text-[#6B8E4E]'
  } else if (score >= 60) {
    strokeColor = 'stroke-[#E9A23B]' // Gold/Yellow
    bgColor = 'text-[#E9A23B]'
  } else {
    strokeColor = 'stroke-[#9F3F2A]' // Cam đất
    bgColor = 'text-[#9F3F2A]'
  }

  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90"
      >
        {/* Track */}
        <circle
          className="stroke-[#E3D8D0]"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress */}
        <circle
          className={cn('transition-all duration-500 ease-out', strokeColor)}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      {/* Percentage Center */}
      <span
        className={cn(
          'absolute text-sm font-mono font-bold tracking-tight',
          bgColor
        )}
      >
        {score}%
      </span>
    </div>
  )
}
