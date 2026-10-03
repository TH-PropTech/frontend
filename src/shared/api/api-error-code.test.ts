import { describe, expect, it } from 'vitest'
import { ApiClientError } from './api-client'
import { readApiErrorCode } from './api-error-code'

describe('readApiErrorCode', () => {
  it('prefers the stable domain code carried in error.details', () => {
    const error = new ApiClientError('Bad request', 400, {
      code: 'HTTP_400',
      message: 'Bad request',
      details: { code: 'RECONCILIATION_SCOPE_REQUIRED', message: 'x' },
    })
    expect(readApiErrorCode(error)).toBe('RECONCILIATION_SCOPE_REQUIRED')
  })

  it('uses a top-level non-HTTP code when details carry none', () => {
    const error = new ApiClientError('Gone', 409, {
      code: 'EVIDENCE_PACKAGE_INCOMPLETE',
      message: 'x',
    })
    expect(readApiErrorCode(error)).toBe('EVIDENCE_PACKAGE_INCOMPLETE')
  })

  it('falls back to the transport HTTP code and rejects malformed details', () => {
    const transport = new ApiClientError('Forbidden', 403, {
      code: 'HTTP_403',
      message: 'Forbidden',
      details: { code: 'not a stable code', statusCode: 403 },
    })
    expect(readApiErrorCode(transport)).toBe('HTTP_403')
    expect(
      readApiErrorCode(
        new ApiClientError('x', 500, {
          code: 'HTTP_500',
          message: 'x',
          details: 'plain string',
        })
      )
    ).toBe('HTTP_500')
  })

  it('returns null for errors without a body or non-API errors', () => {
    expect(readApiErrorCode(new ApiClientError('offline', 0, null))).toBeNull()
    expect(readApiErrorCode(new Error('boom'))).toBeNull()
    expect(readApiErrorCode('boom')).toBeNull()
  })
})
