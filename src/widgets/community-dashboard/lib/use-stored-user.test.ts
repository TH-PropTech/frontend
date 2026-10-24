import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { parseStoredUser, useStoredUser } from './use-stored-user'

afterEach(() => {
  window.localStorage.clear()
  vi.restoreAllMocks()
})

describe('parseStoredUser', () => {
  it('parses a stored user object', () => {
    expect(parseStoredUser('{"_id":"u1","roles":["tenant"]}')).toEqual({
      _id: 'u1',
      roles: ['tenant'],
    })
  })

  it('returns null for empty input without logging', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    expect(parseStoredUser(null)).toBeNull()
    expect(parseStoredUser('')).toBeNull()
    expect(warn).not.toHaveBeenCalled()
  })

  it('returns null and warns for corrupt JSON', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    expect(parseStoredUser('{not json')).toBeNull()
    expect(warn).toHaveBeenCalled()
  })

  it('rejects JSON that is not an object', () => {
    expect(parseStoredUser('42')).toBeNull()
    expect(parseStoredUser('null')).toBeNull()
  })
})

describe('useStoredUser', () => {
  it('is null for a guest', () => {
    const { result } = renderHook(() => useStoredUser())
    expect(result.current).toBeNull()
  })

  it('reads the logged-in user from localStorage', () => {
    window.localStorage.setItem('user', JSON.stringify({ _id: 'u7' }))
    const { result } = renderHook(() => useStoredUser())
    expect(result.current).toEqual({ _id: 'u7' })
  })

  it('is null when localStorage access throws', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    const { result } = renderHook(() => useStoredUser())
    expect(result.current).toBeNull()
  })
})
