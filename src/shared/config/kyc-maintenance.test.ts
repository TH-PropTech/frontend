import { describe, expect, it } from 'vitest'
import { KYC_MAINTENANCE_MESSAGE, assertKycAvailable } from './kyc-maintenance'

describe('KYC maintenance guard', () => {
  it('allows KYC operations when maintenance mode is disabled', () => {
    expect(() => assertKycAvailable(false)).not.toThrow()
  })

  it('fails closed with a user-safe message when maintenance mode is enabled', () => {
    expect(() => assertKycAvailable(true)).toThrow(KYC_MAINTENANCE_MESSAGE)
  })
})
