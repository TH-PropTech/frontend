import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { use360Narrator } from './use-360-narrator'

describe('use360Narrator', () => {
  it('keeps AI narration disabled until the visitor opts in', () => {
    const { result } = renderHook(() => use360Narrator(0, false))

    expect(result.current.isAiEnabled).toBe(false)
    expect(result.current.isSpeaking).toBe(false)
  })
})
