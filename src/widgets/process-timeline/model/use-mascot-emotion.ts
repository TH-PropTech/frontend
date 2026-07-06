'use client'

import * as React from 'react'

/* ─── Types ─── */
type Emotion = 'neutral' | 'confused' | 'excited' | 'sleepy'
type MouthShape = 'line' | 'smile' | 'open-o' | 'worried'
type ArmState = 'idle' | 'greeting' | 'pointing' | 'thinking' | 'celebrating'

interface MascotEmotionState {
  emotion: Emotion
  mouthShape: MouthShape
  armState: ArmState
  triggerExcited: () => void
  triggerConfused: () => void
  triggerGreeting: () => void
}

/**
 * Hook to manage mascot emotion state.
 * Auto-detects idle (sleepy after 60s inactivity).
 * Provides triggers for context-based emotion changes.
 * Business-triggered states always override idle behaviors.
 */
export function useMascotEmotion(
  checkedSteps: Record<number, boolean>,
  totalSteps: number,
): MascotEmotionState {
  const [emotion, setEmotion] = React.useState<Emotion>('neutral')
  const [mouthShape, setMouthShape] = React.useState<MouthShape>('line')
  const [armState, setArmState] = React.useState<ArmState>('idle')
  const idleTimerRef = React.useRef<NodeJS.Timeout | undefined>(undefined)
  const emotionTimerRef = React.useRef<NodeJS.Timeout | undefined>(undefined)

  /* ─── Sleepy when idle > 60s ─── */
  React.useEffect(() => {
    const resetIdle = (): void => {
      clearTimeout(idleTimerRef.current)
      if (emotion === 'sleepy') {
        setEmotion('neutral')
        setMouthShape('line')
      }
      idleTimerRef.current = setTimeout(() => {
        setEmotion('sleepy')
        setMouthShape('open-o')
      }, 60_000)
    }

    // Pause idle timer when tab is hidden
    const handleVisibility = (): void => {
      if (document.hidden) {
        clearTimeout(idleTimerRef.current)
      } else {
        resetIdle()
      }
    }

    window.addEventListener('mousemove', resetIdle)
    window.addEventListener('keydown', resetIdle)
    window.addEventListener('click', resetIdle)
    document.addEventListener('visibilitychange', handleVisibility)
    resetIdle()

    return () => {
      window.removeEventListener('mousemove', resetIdle)
      window.removeEventListener('keydown', resetIdle)
      window.removeEventListener('click', resetIdle)
      document.removeEventListener('visibilitychange', handleVisibility)
      clearTimeout(idleTimerRef.current)
    }
  }, [emotion])

  /* ─── Trigger helpers ─── */
  const triggerExcited = React.useCallback((): void => {
    clearTimeout(emotionTimerRef.current)
    setEmotion('excited')
    setMouthShape('smile')
    setArmState('celebrating')
    emotionTimerRef.current = setTimeout(() => {
      setEmotion('neutral')
      setMouthShape('line')
      setArmState('idle')
    }, 2000)
  }, [])

  const triggerConfused = React.useCallback((): void => {
    clearTimeout(emotionTimerRef.current)
    setEmotion('confused')
    setMouthShape('worried')
    setArmState('thinking')
    emotionTimerRef.current = setTimeout(() => {
      setEmotion('neutral')
      setMouthShape('line')
      setArmState('idle')
    }, 3000)
  }, [])

  const triggerGreeting = React.useCallback((): void => {
    clearTimeout(emotionTimerRef.current)
    setMouthShape('smile')
    setArmState('greeting')
    emotionTimerRef.current = setTimeout(() => {
      setMouthShape('line')
      setArmState('idle')
    }, 3000)
  }, [])

  /* ─── Cleanup ─── */
  React.useEffect(() => {
    return () => {
      clearTimeout(emotionTimerRef.current)
    }
  }, [])

  return { emotion, mouthShape, armState, triggerExcited, triggerConfused, triggerGreeting }
}
