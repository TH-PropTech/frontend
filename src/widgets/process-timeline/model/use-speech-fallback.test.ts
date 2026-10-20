import { describe, expect, it } from 'vitest'
import { wordAt, wordStarts } from './use-speech-fallback'

describe('speech word mapping', () => {
  const text = 'Bước 1:  Khi lướt xem tin'

  it('lấy vị trí bắt đầu của từng từ, bỏ qua khoảng trắng thừa', () => {
    expect(wordStarts(text)).toEqual([0, 5, 9, 13, 18, 22])
    expect(wordStarts('')).toEqual([])
  })

  it('đổi charIndex của sự kiện boundary thành chỉ số từ đang đọc', () => {
    const starts = wordStarts(text)
    expect(wordAt(starts, 0)).toBe(0)
    expect(wordAt(starts, 6)).toBe(1) // giữa "1:"
    expect(wordAt(starts, 8)).toBe(1) // khoảng trắng sau "1:"
    expect(wordAt(starts, 9)).toBe(2)
    expect(wordAt(starts, 12)).toBe(2) // khoảng trắng sau "Khi"
    expect(wordAt(starts, 999)).toBe(starts.length - 1)
  })
})
