'use client'

import * as React from 'react'
import { ROOM_NARRATIVES } from './property-360-config'

interface Use360NarratorResult {
  isAiEnabled: boolean
  setIsAiEnabled: React.Dispatch<React.SetStateAction<boolean>>
  isSpeaking: boolean
  speechText: string
}

export function use360Narrator(
  currentRoomIndex: number,
  isOpen: boolean
): Use360NarratorResult {
  const [isAiEnabled, setIsAiEnabled] = React.useState(true)
  const [isSpeaking, setIsSpeaking] = React.useState(false)
  const [speechText, setSpeechText] = React.useState('')
  const utteranceRef = React.useRef<SpeechSynthesisUtterance | null>(null)

  // Initialize voices
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const loadVoices = (): void => {
        window.speechSynthesis.getVoices()
      }
      loadVoices()
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices
      }
    }
  }, [])

  // Speech synthesis narrator callback
  const speakNarrative = React.useCallback(
    (text: string): void => {
      if (!window.speechSynthesis) return

      window.speechSynthesis.cancel()

      if (!isAiEnabled) {
        setIsSpeaking(false)
        setSpeechText('')
        return
      }

      const utterance = new SpeechSynthesisUtterance(text)
      utteranceRef.current = utterance

      const voices = window.speechSynthesis.getVoices()
      const viVoice = voices.find(v => v.lang.startsWith('vi'))
      if (viVoice) {
        utterance.voice = viVoice
      }

      utterance.lang = 'vi-VN'
      utterance.rate = 1.25
      utterance.pitch = 1.15

      utterance.onstart = () => {
        setIsSpeaking(true)
        setSpeechText(text)
      }

      utterance.onend = () => {
        setIsSpeaking(false)
      }

      utterance.onerror = () => {
        setIsSpeaking(false)
        setSpeechText('')
      }

      window.speechSynthesis.speak(utterance)
    },
    [isAiEnabled]
  )

  // Trigger speech on room entry
  React.useEffect(() => {
    if (!isOpen) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
      return
    }

    const text = ROOM_NARRATIVES[currentRoomIndex]
    let timer: NodeJS.Timeout | undefined = undefined
    if (text) {
      timer = setTimeout(() => {
        speakNarrative(text)
      }, 500)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [currentRoomIndex, isOpen, speakNarrative])

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  return {
    isAiEnabled,
    setIsAiEnabled,
    isSpeaking,
    speechText,
  }
}
