import { describe, it, expect } from 'vitest'
import {
  resolveContractActiveStep,
  type ResolveActiveStepInput,
} from './resolve-contract-active-step'

describe('resolveContractActiveStep', () => {
  // ---------------------------------------------------------------------------
  // Happy path — DEPOSIT_FIRST
  // ---------------------------------------------------------------------------
  describe('DEPOSIT_FIRST strategy', () => {
    it('returns "document" when status is draft', () => {
      const input: ResolveActiveStepInput = {
        strategy: 'DEPOSIT_FIRST',
        status: 'draft',
      }
      expect(resolveContractActiveStep(input)).toBe('document')
    })

    it('returns "deposit" when status is deposit-pending', () => {
      expect(
        resolveContractActiveStep({
          strategy: 'DEPOSIT_FIRST',
          status: 'deposit-pending',
        })
      ).toBe('deposit')
    })

    it('returns "signing" when status is deposit-paid', () => {
      expect(
        resolveContractActiveStep({
          strategy: 'DEPOSIT_FIRST',
          status: 'deposit-paid',
        })
      ).toBe('signing')
    })

    it('returns "signing" when status is awaiting-signature (DEPOSIT_FIRST)', () => {
      expect(
        resolveContractActiveStep({
          strategy: 'DEPOSIT_FIRST',
          status: 'awaiting-signature',
        })
      ).toBe('signing')
    })

    it('returns "ledger" when status is active (DEPOSIT_FIRST)', () => {
      expect(
        resolveContractActiveStep({
          strategy: 'DEPOSIT_FIRST',
          status: 'active',
        })
      ).toBe('ledger')
    })
  })

  // ---------------------------------------------------------------------------
  // Happy path — SIGN_FIRST
  // ---------------------------------------------------------------------------
  describe('SIGN_FIRST strategy', () => {
    it('returns "document" when status is draft', () => {
      expect(
        resolveContractActiveStep({
          strategy: 'SIGN_FIRST',
          status: 'draft',
        })
      ).toBe('document')
    })

    it('returns "signing" when awaiting-signature and neither signed', () => {
      expect(
        resolveContractActiveStep({
          strategy: 'SIGN_FIRST',
          status: 'awaiting-signature',
          signedByTenant: false,
          signedByLandlord: false,
        })
      ).toBe('signing')
    })

    it('returns "signing" when awaiting-signature and only tenant signed', () => {
      expect(
        resolveContractActiveStep({
          strategy: 'SIGN_FIRST',
          status: 'awaiting-signature',
          signedByTenant: true,
          signedByLandlord: false,
        })
      ).toBe('signing')
    })

    it('returns "deposit" when awaiting-signature and both signed', () => {
      expect(
        resolveContractActiveStep({
          strategy: 'SIGN_FIRST',
          status: 'awaiting-signature',
          signedByTenant: true,
          signedByLandlord: true,
        })
      ).toBe('deposit')
    })

    it('returns "deposit" when status is fully-signed-pending-deposit', () => {
      expect(
        resolveContractActiveStep({
          strategy: 'SIGN_FIRST',
          status: 'fully-signed-pending-deposit',
          signedByTenant: true,
          signedByLandlord: true,
        })
      ).toBe('deposit')
    })

    it('returns "ledger" when status is active (SIGN_FIRST)', () => {
      expect(
        resolveContractActiveStep({
          strategy: 'SIGN_FIRST',
          status: 'active',
          signedByTenant: true,
          signedByLandlord: true,
        })
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
          strategy: 'DEPOSIT_FIRST',
          status: 'completed',
        })
      ).toBe('completed')
    })

    it('returns "completed" when status is terminated', () => {
      expect(
        resolveContractActiveStep({
          strategy: 'SIGN_FIRST',
          status: 'terminated',
        })
      ).toBe('completed')
    })

    it('returns "completed" when status is cancelled', () => {
      expect(
        resolveContractActiveStep({
          strategy: 'DEPOSIT_FIRST',
          status: 'cancelled',
        })
      ).toBe('completed')
    })

    it('handles undefined signedBy fields gracefully (SIGN_FIRST draft)', () => {
      expect(
        resolveContractActiveStep({
          strategy: 'SIGN_FIRST',
          status: 'draft',
        })
      ).toBe('document')
    })

    it('handles null depositStatus gracefully', () => {
      const result = resolveContractActiveStep({
        strategy: 'DEPOSIT_FIRST',
        status: 'deposit-pending',
        depositStatus: null,
      })
      expect(result).toBe('deposit')
    })
  })

  // ---------------------------------------------------------------------------
  // Branch coverage — DEPOSIT_FIRST fully-signed-pending-deposit edge
  // ---------------------------------------------------------------------------
  it('DEPOSIT_FIRST: fully-signed-pending-deposit returns "deposit"', () => {
    expect(
      resolveContractActiveStep({
        strategy: 'DEPOSIT_FIRST',
        status: 'fully-signed-pending-deposit',
      })
    ).toBe('deposit')
  })

  it('SIGN_FIRST: deposit-paid returns "ledger"', () => {
    expect(
      resolveContractActiveStep({
        strategy: 'SIGN_FIRST',
        status: 'deposit-paid',
        signedByTenant: true,
        signedByLandlord: true,
      })
    ).toBe('ledger')
  })
})
