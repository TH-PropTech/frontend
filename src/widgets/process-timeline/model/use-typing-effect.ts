/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import * as React from 'react'

interface TypingEffectResult {
  displayed: string
  isTyping: boolean
}

/**
 * Typing animation hook — displays text character by character.
 * Timer is cleaned up on unmount and paused when tab is hidden (8A.2).
 */
export function useTypingEffect(text: string, speed: number = 30): TypingEffectResult {
  const [displayed, setDisplayed] = React.useState('')
  const [isTyping, setIsTyping] = React.useState(false)
  const intervalRef = React.useRef<NodeJS.Timeout | undefined>(undefined)
  const indexRef = React.useRef(0)

  React.useEffect(() => {
    setDisplayed('')
    setIsTyping(true)
    indexRef.current = 0

    const tick = (): void => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1))
        indexRef.current++
      } else {
        clearInterval(intervalRef.current)
        setIsTyping(false)
      }
    }

    intervalRef.current = setInterval(tick, speed)

    // Pause typing when tab hidden
    const handleVisibility = (): void => {
      if (document.hidden) {
        clearInterval(intervalRef.current)
      } else {
        intervalRef.current = setInterval(tick, speed)
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      clearInterval(intervalRef.current)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [text, speed])

  return { displayed, isTyping }
}
