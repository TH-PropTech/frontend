'use client'

import * as React from 'react'

interface SpeechFallbackResult {
  speak: () => void
  isSpeaking: boolean
  showSubtitle: boolean
  highlightIndex: number
  words: string[]
  stop: () => void
}

/**
 * Speech fallback hook — tries Web Speech API TTS first.
 * If TTS is unavailable (Safari/iOS) or fails, falls back to
 * karaoke-style subtitle highlighting (word-by-word at ~200ms).
 * No new packages — uses built-in Web Speech API.
 */
export function useSpeechFallback(
  text: string,
  lang: string = 'vi-VN',
  rate: number = 1.1
): SpeechFallbackResult {
  const [isSpeaking, setIsSpeaking] = React.useState(false)
  const [showSubtitle, setShowSubtitle] = React.useState(false)
  const [highlightIndex, setHighlightIndex] = React.useState(0)
  const subtitleTimerRef = React.useRef<NodeJS.Timeout | undefined>(undefined)
  const words = React.useMemo(() => text.split(/\s+/).filter(Boolean), [text])

  const animateSubtitle = React.useCallback((): void => {
    setShowSubtitle(true)
    setHighlightIndex(0)
    let idx = 0

    const tick = (): void => {
      if (idx < words.length) {
        setHighlightIndex(idx)
        idx++
        subtitleTimerRef.current = setTimeout(tick, Math.max(80, 180 / rate))
      } else {
        setShowSubtitle(false)
        setIsSpeaking(false)
      }
    }
    subtitleTimerRef.current = setTimeout(tick, Math.max(80, 180 / rate))
  }, [words, rate])

  const speak = React.useCallback((): void => {
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null

    // Check if Vietnamese TTS is available
    if (
      !synth ||
      synth.getVoices().filter(v => v.lang.startsWith('vi')).length === 0
    ) {
      setIsSpeaking(true)
      animateSubtitle()
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = rate
    utterance.onstart = (): void => setIsSpeaking(true)
    utterance.onend = (): void => setIsSpeaking(false)
    utterance.onerror = (): void => {
      // Fallback to subtitle on TTS runtime error
      animateSubtitle()
    }
    synth.speak(utterance)
  }, [text, lang, rate, animateSubtitle])

  const stop = React.useCallback((): void => {
    clearTimeout(subtitleTimerRef.current)
    setShowSubtitle(false)
    setIsSpeaking(false)
    setHighlightIndex(0)
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
  }, [])

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      clearTimeout(subtitleTimerRef.current)
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  return { speak, isSpeaking, showSubtitle, highlightIndex, words, stop }
}
