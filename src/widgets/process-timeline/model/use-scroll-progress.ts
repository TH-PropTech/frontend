'use client'

import * as React from 'react'

/**
 * Tracks scroll percentage of a scrollable container.
 * Uses passive event listener for performance.
 * Returns 0–100 integer.
 */
export function useScrollProgress(
  contentRef: React.RefObject<HTMLElement | null>
): number {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const el = contentRef.current
    if (!el) return

    const onScroll = (): void => {
      const { scrollTop, scrollHeight, clientHeight } = el
      if (scrollHeight <= clientHeight) {
        setProgress(0)
        return
      }
      const pct = Math.min(scrollTop / (scrollHeight - clientHeight), 1)
      setProgress(Math.round(pct * 100))
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [contentRef])

  return progress
}
