import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useRateLimitCountdown } from './use-rate-limit-countdown'

describe('useRateLimitCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts idle', () => {
    const { result } = renderHook(() => useRateLimitCountdown())
    expect(result.current.remaining).toBe(0)
  })

  it('counts down once per second and stops at zero', () => {
    const { result } = renderHook(() => useRateLimitCountdown())

    act(() => result.current.start(3))
    expect(result.current.remaining).toBe(3)

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.remaining).toBe(2)

    act(() => {
      vi.advanceTimersByTime(2500)
    })
    expect(result.current.remaining).toBe(0)
  })

  it('restarts with a new wait and can be cleared', () => {
    const { result } = renderHook(() => useRateLimitCountdown())

    act(() => result.current.start(5))
    act(() => result.current.start(10))
    expect(result.current.remaining).toBe(10)

    act(() => result.current.clear())
    expect(result.current.remaining).toBe(0)
  })
})
