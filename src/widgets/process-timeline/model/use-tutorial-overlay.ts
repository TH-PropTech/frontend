'use client'

import * as React from 'react'

type ArmState = 'idle' | 'greeting' | 'pointing' | 'thinking' | 'celebrating'

export interface TutorialStep {
  targetSelector: string
  message: string
  armState: ArmState
  pointDirection?: 'left' | 'right'
}

interface SpotlightRect {
  top: number
  left: number
  width: number
  height: number
}

interface TutorialOverlayResult {
  currentStep: number | null
  activeStep: TutorialStep | null
  spotlightRect: SpotlightRect | null
  hasSeenTutorial: boolean
  startTutorial: () => void
  nextStep: () => void
  skipTutorial: () => void
}

const STORAGE_KEY = 'mascot-tutorial-seen'

/**
 * Tutorial overlay hook — manages spotlight steps that highlight UI elements.
 * Calculates target position via getBoundingClientRect and recalculates on resize.
 * State persisted in sessionStorage so tutorial doesn't repeat in same session.
 */
export function useTutorialOverlay(steps: TutorialStep[]): TutorialOverlayResult {
  const [currentStep, setCurrentStep] = React.useState<number | null>(null)
  const [spotlightRect, setSpotlightRect] = React.useState<SpotlightRect | null>(null)
  const [hasSeenTutorial, setHasSeenTutorial] = React.useState(() => {
    if (typeof window === 'undefined') return false
    return sessionStorage.getItem(STORAGE_KEY) === 'true'
  })

  // Recalculate spotlight position when step changes or window resizes
  React.useEffect(() => {
    if (currentStep === null) {
      setSpotlightRect(null)
      return
    }

    const step = steps[currentStep]
    if (!step) return

    const calculate = (): void => {
      const el = document.querySelector(step.targetSelector)
      if (!el) {
        setSpotlightRect(null)
        return
      }
      const rect = el.getBoundingClientRect()
      const padding = 8
      setSpotlightRect({
        top: rect.top - padding + window.scrollY,
        left: rect.left - padding + window.scrollX,
        width: rect.width + padding * 2,
        height: rect.height + padding * 2,
      })
    }

    calculate()
    window.addEventListener('resize', calculate)
    return () => window.removeEventListener('resize', calculate)
  }, [currentStep, steps])

  const markSeen = (): void => {
    setHasSeenTutorial(true)
    sessionStorage.setItem(STORAGE_KEY, 'true')
  }

  const startTutorial = React.useCallback((): void => {
    setCurrentStep(0)
  }, [])

  const nextStep = React.useCallback((): void => {
    if (currentStep !== null && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setCurrentStep(null)
      markSeen()
    }
  }, [currentStep, steps.length])

  const skipTutorial = React.useCallback((): void => {
    setCurrentStep(null)
    markSeen()
  }, [])

  const activeStep = currentStep !== null ? steps[currentStep] ?? null : null

  return {
    currentStep,
    activeStep,
    spotlightRect,
    hasSeenTutorial,
    startTutorial,
    nextStep,
    skipTutorial,
  }
}
