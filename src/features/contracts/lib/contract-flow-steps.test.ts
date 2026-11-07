import { describe, expect, it } from 'vitest'
import type {
  ContractFlowStageKey,
  ContractFlowView,
} from '../api/contracts-api'
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
  it('keeps all four route steps in sign-first order', () => {
    const steps = getContractFlowSteps()

    expect(CONTRACT_FLOW_STEPS).toHaveLength(4)

    expect(steps.map(step => step.key)).toEqual([
      'document',
      'signing',
      'deposit',
      'ledger',
    ])
  })

  it('returns done, active and upcoming states relative to the active step', () => {
    const steps = getContractFlowSteps()

    expect(getContractStepState('document', 'signing', steps)).toBe('done')
    expect(getContractStepState('signing', 'signing', steps)).toBe('active')
    expect(getContractStepState('deposit', 'signing', steps)).toBe('upcoming')
    expect(getContractStepState('ledger', 'completed', steps)).toBe('done')
  })

  it('supports guarded navigation and stable route hrefs', () => {
    expect(getPreviousContractStep('document')).toBeNull()
    expect(getPreviousContractStep('signing')).toBe('document')
    expect(getNextContractStep('signing')).toBe('deposit')
    expect(getNextContractStep('ledger')).toBeNull()
    expect(toContractStepHref('contract-1', 'ledger')).toBe(
      '/contracts/contract-1/steps/ledger'
    )
  })

  it('rejects unknown route segments', () => {
    expect(isContractRouteStep('document')).toBe(true)
    expect(isContractRouteStep('unknown')).toBe(false)
  })

  it.each(['document', 'deposit', 'signing', 'ledger', 'move-in', 'move-out'])(
    'accepts the route step %s',
    step => {
      expect(isContractRouteStep(step)).toBe(true)
    }
  )

  it.each(['xyz', '', 'completed', 'Move-In'])(
    'rejects the route step %j',
    step => {
      expect(isContractRouteStep(step)).toBe(false)
    }
  )
})

describe('contract-flow-steps with serverFlow', () => {
  const flowWith = (keys: ContractFlowStageKey[]): ContractFlowView => ({
    version: 1,
    strategy: 'SIGN_FIRST',
    stages: keys.map(key => ({
      key,
      status: 'upcoming',
      blockers: [],
      completedAt: null,
    })),
    activeStage: keys[0] ?? 'completed',
    nextActions: [],
  })

  it('theo thứ tự stage của server và thêm bước move-in khi có', () => {
    const steps = getContractFlowSteps(
      flowWith(['document', 'deposit', 'signing', 'ledger', 'move-in'])
    )

    expect(steps.map(step => step.key)).toEqual([
      'document',
      'deposit',
      'signing',
      'ledger',
      'move-in',
    ])
    expect(steps.at(-1)?.label).toBe('Nhận nhà')
  })

  it('giữ 4 bước theo luồng ký trước khi không có flow', () => {
    expect(getContractFlowSteps(null).map(step => step.key)).toEqual([
      'document',
      'signing',
      'deposit',
      'ledger',
    ])
  })

  it('chấp nhận move-in là route bước hợp lệ', () => {
    expect(isContractRouteStep('move-in')).toBe(true)
    expect(toContractStepHref('c-1', 'move-in')).toBe(
      '/contracts/c-1/steps/move-in'
    )
  })

  it('trả next step move-in theo thứ tự server', () => {
    expect(
      getNextContractStep(
        'ledger',
        flowWith(['document', 'deposit', 'signing', 'ledger', 'move-in'])
      )
    ).toBe('move-in')
  })
})
