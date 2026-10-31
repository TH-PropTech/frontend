import { describe, expect, it } from 'vitest'
import { isValidCitizenId } from './citizen-id'

describe('isValidCitizenId', () => {
  it('returns true for 12 numeric digits', () => {
    expect(isValidCitizenId('001098001234')).toBe(true)
    expect(isValidCitizenId('035098001234')).toBe(true)
  })

  it('returns false for alphanumeric or invalid length values', () => {
    // Contains letters like 03509800s
    expect(isValidCitizenId('03509800s')).toBe(false)
    expect(isValidCitizenId('03509800123s')).toBe(false)
    // Too short or too long
    expect(isValidCitizenId('123456789')).toBe(false)
    expect(isValidCitizenId('0010980012345')).toBe(false)
    // Null, undefined or empty
    expect(isValidCitizenId('')).toBe(false)
    expect(isValidCitizenId(null)).toBe(false)
    expect(isValidCitizenId(undefined)).toBe(false)
  })
})
