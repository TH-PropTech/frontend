import { describe, it, expect } from 'vitest'
import {
  resolveContractActiveStep,
  type ResolveActiveStepInput,
} from './resolve-contract-active-step'

describe('resolveContractActiveStep', () => {
  // ---------------------------------------------------------------------------
  // Happy path — SIGN_FIRST
  // ---------------------------------------------------------------------------
  describe('sign-first flow (the only flow)', () => {
    it('returns "document" when status is draft', () => {
      expect(
        resolveContractActiveStep({
          status: 'draft',
        })
      ).toBe('document')
    })

    it('returns "signing" when awaiting-signature and neither signed', () => {
      expect(
        resolveContractActiveStep({
          status: 'awaiting-signature',
          signedByTenant: false,
          signedByLandlord: false,
        })
      ).toBe('signing')
    })

    it('returns "signing" when awaiting-signature and only tenant signed', () => {
      expect(
        resolveContractActiveStep({
          status: 'awaiting-signature',
          signedByTenant: true,
          signedByLandlord: false,
        })
      ).toBe('signing')
    })

    it('returns "deposit" when awaiting-signature and both signed', () => {
      expect(
        resolveContractActiveStep({
          status: 'awaiting-signature',
          signedByTenant: true,
          signedByLandlord: true,
        })
      ).toBe('deposit')
    })

    it('returns "deposit" when status is fully-signed-pending-deposit', () => {
      expect(
        resolveContractActiveStep({
          status: 'fully-signed-pending-deposit',
          signedByTenant: true,
          signedByLandlord: true,
        })
      ).toBe('deposit')
    })

    it('returns "ledger" when status is active ', () => {
      expect(
        resolveContractActiveStep({
          status: 'active',
          signedByTenant: true,
          signedByLandlord: true,
        })
      ).toBe('ledger')
    })
  })

  describe('legacy strategy values from API', () => {
    it('treats a legacy DEPOSIT_FIRST value as sign-first', () => {
      const legacyInput = {
        strategy: 'DEPOSIT_FIRST',
        status: 'deposit-pending',
        signedByTenant: false,
        signedByLandlord: false,
      } as ResolveActiveStepInput
      expect(resolveContractActiveStep(legacyInput)).toBe('signing')
      expect(
        resolveContractActiveStep({
          ...legacyInput,
          signedByTenant: true,
          signedByLandlord: true,
        })
      ).toBe('deposit')
      expect(
        resolveContractActiveStep({ ...legacyInput, status: 'deposit-paid' })
      ).toBe('ledger')
    })
  })

  // ---------------------------------------------------------------------------
  // Boundary & edge cases
  // ---------------------------------------------------------------------------
  describe('boundary cases', () => {
    it('returns "completed" when status is completed', () => {
      expect(
        resolveContractActiveStep({
          status: 'completed',
        })
      ).toBe('completed')
    })

    it('returns "completed" when status is terminated', () => {
      expect(
        resolveContractActiveStep({
          status: 'terminated',
        })
      ).toBe('completed')
    })

    it('returns "completed" when status is cancelled', () => {
      expect(
        resolveContractActiveStep({
          status: 'cancelled',
        })
      ).toBe('completed')
    })

    it('handles undefined signedBy fields gracefully (SIGN_FIRST draft)', () => {
      expect(
        resolveContractActiveStep({
          status: 'draft',
        })
      ).toBe('document')
    })

    it('handles null depositStatus gracefully', () => {
      const result = resolveContractActiveStep({
        status: 'deposit-pending',
        depositStatus: null,
      })
      expect(result).toBe('signing')
    })
  })

  // ---------------------------------------------------------------------------
  // Branch coverage
  // ---------------------------------------------------------------------------
  it('deposit-paid returns "ledger"', () => {
    expect(
      resolveContractActiveStep({
        status: 'deposit-paid',
        signedByTenant: true,
        signedByLandlord: true,
      })
    ).toBe('ledger')
  })
})
