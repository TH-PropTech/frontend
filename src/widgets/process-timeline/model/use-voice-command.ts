'use client'

import * as React from 'react'

/* ─── Web Speech Recognition type shims ─── */
interface SpeechRecognitionResult {
  readonly transcript: string
  readonly confidence: number
}

interface SpeechRecognitionResultList {
  readonly length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionEventMap {
  readonly results: {
    readonly length: number
    item(i: number): SpeechRecognitionResultList
    [i: number]: SpeechRecognitionResultList
  }
}

interface WebSpeechRecognition extends EventTarget {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult:
    | ((event: { results: SpeechRecognitionEventMap['results'] }) => void)
    | null
  onend: (() => void) | null
  onerror: (() => void) | null
  start(): void
  stop(): void
}

/* ─── Types ─── */
type VoiceCommand = 'next' | 'prev' | 'repeat' | 'done'

interface VoiceCommandResult {
  isListening: boolean
  isSupported: boolean
  startListening: () => void
  stopListening: () => void
}

/**
 * Parse Vietnamese voice transcript into a command.
 */
function parseCommand(transcript: string): VoiceCommand | null {
  const t = transcript.toLowerCase().trim()

  // Next step — "tiếp theo", "bước tiếp", "tiếp tục", "tiếp đi"
  if (
    t.includes('tiếp theo') ||
    t.includes('bước tiếp') ||
    t.includes('tiếp tục') ||
    t.includes('tiếp đi') ||
    t.includes('bước kế')
  )
    return 'next'

  // Previous step — "quay lại", "bước trước", "lùi lại"
  if (
    t.includes('quay lại') ||
    t.includes('bước trước') ||
    t.includes('lùi lại') ||
    t.includes('quay về')
  )
    return 'prev'

  // Repeat — "đọc lại", "nhắc lại", "lặp lại", "nói lại"
  if (
    t.includes('đọc lại') ||
    t.includes('nhắc lại') ||
    t.includes('lặp lại') ||
    t.includes('nói lại') ||
    t.includes('nghe lại')
  )
    return 'repeat'

  // Done — "hoàn thành", "xong", "đánh dấu"
  if (
    t.includes('hoàn thành') ||
    t.includes('xong rồi') ||
    t.includes('xong') ||
    t.includes('đánh dấu')
  )
    return 'done'

  return null
}

/**
 * Voice command hook — uses Web Speech Recognition API (Chrome/Edge only).
 * Graceful degradation: isSupported=false on unsupported browsers.
 * No new packages needed — this is a built-in Web API.
 */
export function useVoiceCommand(
  onCommand: (cmd: VoiceCommand) => void
): VoiceCommandResult {
  const [isListening, setIsListening] = React.useState(false)
  const recognitionRef = React.useRef<WebSpeechRecognition | null>(null)

  const win =
    typeof window !== 'undefined'
      ? (window as unknown as Record<string, unknown>)
      : null
  const isSupported = Boolean(
    win?.SpeechRecognition || win?.webkitSpeechRecognition
  )

  const startListening = React.useCallback((): void => {
    if (!isSupported || !win) return

    const Ctor = (win.SpeechRecognition ||
      win.webkitSpeechRecognition) as new () => WebSpeechRecognition

    const recognition = new Ctor()
    recognition.lang = 'vi-VN'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (event): void => {
      const firstResult = event.results[0]
      if (!firstResult) return
      const firstAlternative = firstResult[0]
      if (!firstAlternative) return
      const transcript = firstAlternative.transcript.toLowerCase().trim()
      const cmd = parseCommand(transcript)
      if (cmd) onCommand(cmd)
    }
    recognition.onend = (): void => setIsListening(false)
    recognition.onerror = (): void => setIsListening(false)

    recognition.start()
    setIsListening(true)
    recognitionRef.current = recognition
  }, [isSupported, win, onCommand])

  const stopListening = React.useCallback((): void => {
    recognitionRef.current?.stop()
    setIsListening(false)
  }, [])

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      recognitionRef.current?.stop()
    }
  }, [])

  return { isListening, isSupported, startListening, stopListening }
}
