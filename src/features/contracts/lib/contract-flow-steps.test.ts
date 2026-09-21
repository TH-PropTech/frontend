import { describe, expect, it } from 'vitest'
import {
  CONTRACT_FLOW_STEPS,
  getContractFlowSteps,
  getContractStepState,
  getNextContractStep,
  getPreviousContractStep,
  isContractRouteStep,
  toContractStepHref,
} from './contract-flow-steps'

describe('contract-flow-steps', () => {
  it('keeps all four route steps in deposit-first order', () => {
    const steps = getContractFlowSteps('DEPOSIT_FIRST')

    expect(steps.map(step => step.key)).toEqual([
      'document',
      'deposit',
      'signing',
      'ledger',
    ])
    expect(CONTRACT_FLOW_STEPS).toHaveLength(4)
  })

  it('places signing before deposit for sign-first contracts', () => {
    const steps = getContractFlowSteps('SIGN_FIRST')

    expect(steps.map(step => step.key)).toEqual([
      'document',
      'signing',
      'deposit',
      'ledger',
    ])
  })

  it('returns done, active and upcoming states relative to the active step', () => {
    const steps = getContractFlowSteps('DEPOSIT_FIRST')

    expect(getContractStepState('document', 'deposit', steps)).toBe('done')
    expect(getContractStepState('deposit', 'deposit', steps)).toBe('active')
    expect(getContractStepState('signing', 'deposit', steps)).toBe('upcoming')
    expect(getContractStepState('ledger', 'completed', steps)).toBe('done')
  })

  it('supports guarded navigation and stable route hrefs', () => {
    expect(getPreviousContractStep('document', 'DEPOSIT_FIRST')).toBeNull()
    expect(getPreviousContractStep('deposit', 'DEPOSIT_FIRST')).toBe('document')
    expect(getNextContractStep('deposit', 'DEPOSIT_FIRST')).toBe('signing')
    expect(getNextContractStep('ledger', 'DEPOSIT_FIRST')).toBeNull()
    expect(toContractStepHref('contract-1', 'ledger')).toBe(
      '/contracts/contract-1/steps/ledger'
    )
  })

  it('rejects unknown route segments', () => {
    expect(isContractRouteStep('document')).toBe(true)
    expect(isContractRouteStep('unknown')).toBe(false)
  })
})
