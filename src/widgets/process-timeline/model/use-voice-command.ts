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
  if (/ti(e|ê)p theo|bu(o|ơ)c ti(e|ê)p/.test(transcript)) return 'next'
  if (/quay l(a|ạ)i|bu(o|ơ)c tru(o|ơ)c/.test(transcript)) return 'prev'
  if (/(đ|d)(o|ọ)c l(a|ạ)i|nh(a|ắ)c l(a|ạ)i/.test(transcript)) return 'repeat'
  if (/ho(a|à)n th(a|à)nh|xong/.test(transcript)) return 'done'
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
