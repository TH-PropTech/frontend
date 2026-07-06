'use client'

import * as React from 'react'
import type { AiGuide } from './ai-guide-data'

type GuideLang = 'vi' | 'en'

interface GuideLangResult {
  lang: GuideLang
  toggleLang: () => void
  getTip: (guide: AiGuide, stepIndex: number) => string
}

/**
 * Bilingual tip hook — toggles between Vietnamese and English tips.
 * Persists preference in localStorage.
 * Falls back to Vietnamese if English tips don't exist.
 */
export function useGuideLang(): GuideLangResult {
  const [lang, setLang] = React.useState<GuideLang>(() => {
    if (typeof window === 'undefined') return 'vi'
    const saved = localStorage.getItem('mascot-lang')
    if (saved === 'en') return 'en'
    return 'vi'
  })

  const toggleLang = React.useCallback((): void => {
    const next: GuideLang = lang === 'vi' ? 'en' : 'vi'
    setLang(next)
    localStorage.setItem('mascot-lang', next)
  }, [lang])

  const getTip = React.useCallback(
    (guide: AiGuide, stepIndex: number): string => {
      if (lang === 'en' && guide.stepTipsEn?.[stepIndex]) {
        return guide.stepTipsEn[stepIndex]
      }
      return guide.stepTips[stepIndex] ?? ''
    },
    [lang]
  )

  return { lang, toggleLang, getTip }
}
