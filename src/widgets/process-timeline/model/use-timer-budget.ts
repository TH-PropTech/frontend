'use client'

import * as React from 'react'

export type TimerPriority = 'business' | 'idle' | 'cosmetic'

interface TimerRegistration {
  id: NodeJS.Timeout
  priority: TimerPriority
  callback: () => void
}

/**
 * Timer budget hook: limits the amount of concurrent active timers (default max = 3).
 * If limit is exceeded, preempts lower priority timers (business > idle > cosmetic).
 * Safeguards memory leakage on component unmounts.
 */
export function useTimerBudget(maxTimers: number = 3) {
  const activeTimersRef = React.useRef<TimerRegistration[]>([])

  const registerTimer = React.useCallback(
    (callback: () => void, delay: number, priority: TimerPriority): NodeJS.Timeout => {
      const priorityVal = (p: TimerPriority) => {
        if (p === 'business') return 3
        if (p === 'idle') return 2
        return 1
      }

      // Preempt if at max limit
      if (activeTimersRef.current.length >= maxTimers) {
        let lowestIndex = -1
        let lowestPriorityValue = 4

        activeTimersRef.current.forEach((t, idx) => {
          const val = priorityVal(t.priority)
          if (val < lowestPriorityValue) {
            lowestPriorityValue = val
            lowestIndex = idx
          }
        })

        // Cancel lowest if new one has higher/equal priority
        if (lowestIndex !== -1 && priorityVal(priority) >= lowestPriorityValue) {
          const preempted = activeTimersRef.current[lowestIndex]
          if (preempted) {
            clearTimeout(preempted.id)
            activeTimersRef.current.splice(lowestIndex, 1)
          }
        }
      }

      const timerId = setTimeout(() => {
        activeTimersRef.current = activeTimersRef.current.filter(t => t.id !== timerId)
        callback()
      }, delay)
      activeTimersRef.current.push({ id: timerId, priority, callback })
      return timerId
    },
    [maxTimers]
  )

  const clearRegisteredTimer = React.useCallback((id: NodeJS.Timeout | undefined) => {
    if (!id) return
    clearTimeout(id)
    activeTimersRef.current = activeTimersRef.current.filter(t => t.id !== id)
  }, [])

  // Auto clean up everything on unmount
  React.useEffect(() => {
    return () => {
      activeTimersRef.current.forEach(t => clearTimeout(t.id))
      activeTimersRef.current = []
    }
  }, [])

  return { registerTimer, clearRegisteredTimer }
}
