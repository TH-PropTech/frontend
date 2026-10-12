import { describe, expect, it } from 'vitest'
import { vndInWords } from './vnd-in-words'

describe('vndInWords', () => {
  it.each([
    [0, 'không đồng'],
    [15, 'mười lăm đồng'],
    [21, 'hai mươi mốt đồng'],
    [105, 'một trăm lẻ năm đồng'],
    [500_000, 'năm trăm nghìn đồng'],
    [12_500_000, 'mười hai triệu năm trăm nghìn đồng'],
    [2_000_000_000, 'hai tỷ đồng'],
  ])('reads %i as "%s"', (amount, words) => {
    expect(vndInWords(amount)).toBe(words)
  })

  it('returns an empty string for invalid amounts', () => {
    expect(vndInWords(-1)).toBe('')
    expect(vndInWords(1.5)).toBe('')
    expect(vndInWords(undefined)).toBe('')
  })
})
