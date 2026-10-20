'use client'

import * as React from 'react'
import { toast } from 'sonner'

interface SpeechResult {
  speak: () => void
  stop: () => void
  isSpeaking: boolean
  words: string[]
  /** Nghe tiến độ đọc (chỉ số từ đang đọc, -1 = hết). Không đi qua state của cha nên không làm cả khối re-render. */
  subscribeWord: (listener: (index: number) => void) => () => void
}

/** Vị trí ký tự bắt đầu của từng từ (khớp cách tách từ theo khoảng trắng). */
export function wordStarts(text: string): number[] {
  const starts: number[] = []
  const re = /\S+/g
  for (let m = re.exec(text); m; m = re.exec(text)) starts.push(m.index)
  return starts
}

/** Từ đang đọc ứng với `charIndex` của sự kiện boundary. */
export function wordAt(starts: number[], charIndex: number): number {
  let lo = 0
  let hi = starts.length - 1
  let found = 0
  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    if ((starts[mid] ?? 0) <= charIndex) {
      found = mid
      lo = mid + 1
    } else hi = mid - 1
  }
  return found
}

const pickVietnameseVoice = (
  voices: SpeechSynthesisVoice[]
): SpeechSynthesisVoice | null =>
  voices.find(v => v.lang.toLowerCase() === 'vi-vn') ??
  voices.find(v => v.lang.toLowerCase().startsWith('vi')) ??
  null

/**
 * Đọc văn bản bằng Web Speech API với giọng tiếng Việt thật.
 * - Giọng nạp bất đồng bộ (`voiceschanged`), không đoán ở lần bấm đầu.
 * - Không có giọng Việt / trình duyệt không hỗ trợ: báo rõ cho người dùng, không giả vờ đọc.
 * - Tô từ theo sự kiện `boundary` của chính giọng đọc; giọng nào không phát boundary thì ước lượng theo tốc độ,
 *   nhưng chỉ chạy khi âm thanh thật sự đang phát.
 */
export function useSpeechFallback(
  text: string,
  rate: number = 1
): SpeechResult {
  const [isSpeaking, setIsSpeaking] = React.useState(false)
  const [voice, setVoice] = React.useState<SpeechSynthesisVoice | null>(null)
  const listenersRef = React.useRef(new Set<(index: number) => void>())
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )
  const words = React.useMemo(() => text.split(/\s+/).filter(Boolean), [text])
  const starts = React.useMemo(() => wordStarts(text), [text])

  const emit = React.useCallback((index: number): void => {
    for (const listener of listenersRef.current) listener(index)
  }, [])

  React.useEffect(() => {
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null
    if (!synth) return
    const load = (): void => setVoice(pickVietnameseVoice(synth.getVoices()))
    load()
    synth.addEventListener('voiceschanged', load)
    return () => synth.removeEventListener('voiceschanged', load)
  }, [])

  const stop = React.useCallback((): void => {
    clearTimeout(timerRef.current)
    setIsSpeaking(false)
    emit(-1)
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
  }, [emit])

  const speak = React.useCallback((): void => {
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null
    if (!synth) {
      toast.info('Trình duyệt này chưa hỗ trợ đọc bằng giọng nói.')
      return
    }
    if (!voice) {
      toast.info('Thiết bị chưa có giọng đọc tiếng Việt.', {
        description:
          'Bạn có thể đọc nội dung ở bên dưới, hoặc cài thêm giọng tiếng Việt trong cài đặt hệ thống.',
      })
      return
    }

    synth.cancel()
    clearTimeout(timerRef.current)

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = voice
    utterance.lang = voice.lang
    utterance.rate = rate

    let boundarySeen = false
    let estimated = 0
    // giọng nào không phát boundary thì ước lượng ~230ms/từ ở tốc độ 1
    const tick = (): void => {
      if (boundarySeen || estimated >= words.length) return
      emit(estimated++)
      timerRef.current = setTimeout(tick, 230 / rate)
    }

    utterance.onstart = (): void => {
      setIsSpeaking(true)
      emit(0)
      timerRef.current = setTimeout(tick, 600)
    }
    utterance.onboundary = (e: SpeechSynthesisEvent): void => {
      if (e.name && e.name !== 'word') return
      boundarySeen = true
      clearTimeout(timerRef.current)
      emit(wordAt(starts, e.charIndex))
    }
    utterance.onend = (): void => {
      clearTimeout(timerRef.current)
      setIsSpeaking(false)
      emit(-1)
    }
    utterance.onerror = (e: SpeechSynthesisErrorEvent): void => {
      clearTimeout(timerRef.current)
      setIsSpeaking(false)
      emit(-1)
      // huỷ do người dùng bấm dừng / đổi bước không phải lỗi
      if (e.error === 'canceled' || e.error === 'interrupted') return
      toast.error('Không đọc được hướng dẫn. Vui lòng thử lại.')
    }
    synth.speak(utterance)
  }, [text, rate, voice, words.length, starts, emit])

  const subscribeWord = React.useCallback(
    (listener: (index: number) => void): (() => void) => {
      listenersRef.current.add(listener)
      return () => {
        listenersRef.current.delete(listener)
      }
    },
    []
  )

  // Dọn khi rời trang
  React.useEffect(() => {
    return () => {
      clearTimeout(timerRef.current)
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  return { speak, stop, isSpeaking, words, subscribeWord }
}
