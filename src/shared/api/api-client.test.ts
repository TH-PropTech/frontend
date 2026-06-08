import { describe, expect, it } from 'vitest'
import { createApiUrl } from './api-client'

describe('createApiUrl', () => {
  it('joins base URL and relative path predictably', () => {
    expect(createApiUrl('http://localhost:3001/api/v1', '/health')).toBe(
      'http://localhost:3001/api/v1/health'
    )
  })
})
