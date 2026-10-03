'use client'

import * as React from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/shared/ui/button'

const FEEDBACK_MS = 1500

/** Copies a value to the clipboard and confirms it with an icon change and a live-region message. */
export function CopyButton({
  value,
  label,
}: {
  value: string
  label: string
}): React.ReactElement {
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<number | undefined>(undefined)

  React.useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), FEEDBACK_MS)
    } catch (error) {
      console.warn('Unable to copy to the clipboard', error)
    }
  }

  return (
    <span className="inline-flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        aria-label={label}
        onClick={() => void copy()}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-success" aria-hidden="true" />
        ) : (
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
        )}
      </Button>
      <span aria-live="polite" className="text-xs text-success">
        {copied ? 'Đã sao chép' : ''}
      </span>
    </span>
  )
}
