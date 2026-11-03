'use client'

import * as React from 'react'

export interface RateLimitCountdown {
  /** Số giây còn lại; 0 khi không bị chặn hoặc đã hết giờ. */
  remaining: number
  start: (seconds: number) => void
  clear: () => void
}

/** Đếm ngược thời gian chờ sau lỗi 429, để form khoá nút gửi và tự mở lại khi hết giờ. */
export function useRateLimitCountdown(): RateLimitCountdown {
  const [endsAt, setEndsAt] = React.useState<number | null>(null)
  const [remaining, setRemaining] = React.useState(0)

  React.useEffect(() => {
    if (endsAt === null) return undefined

    function tick(): void {
      const left = Math.max(0, Math.ceil(((endsAt ?? 0) - Date.now()) / 1000))
      setRemaining(left)
      if (left === 0) setEndsAt(null)
    }

    tick()
    const timer = setInterval(tick, 500)
    return (): void => clearInterval(timer)
  }, [endsAt])

  const start = React.useCallback((seconds: number): void => {
    setRemaining(seconds)
    setEndsAt(Date.now() + seconds * 1000)
  }, [])

  const clear = React.useCallback((): void => {
    setEndsAt(null)
    setRemaining(0)
  }, [])

  return { remaining, start, clear }
}
