import { ApiClientError } from './api-client'

const STABLE_CODE = /^[A-Z][A-Z0-9_]{2,63}$/

/**
 * The backend wraps domain exceptions as `{ code: 'HTTP_<status>', details: { code: '<DOMAIN_CODE>' } }`,
 * so the stable domain code lives in `details.code`. A non-transport top-level code is accepted too.
 */
export function readApiErrorCode(error: unknown): string | null {
  if (!(error instanceof ApiClientError) || !error.body) return null

  const details: unknown = error.body.details
  if (typeof details === 'object' && details !== null && 'code' in details) {
    const code = (details as { code: unknown }).code
    if (typeof code === 'string' && STABLE_CODE.test(code)) return code
  }

  return error.body.code || null
}
