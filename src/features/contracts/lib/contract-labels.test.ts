import { describe, expect, it } from 'vitest'
import {
  getContractStatusLabel,
  getExecutionStrategyLabel,
} from './contract-labels'

describe('contract labels', () => {
  it('maps known statuses to Vietnamese and passes unknown through', () => {
    expect(getContractStatusLabel('awaiting-signature')).toBe('Chờ ký')
    expect(getContractStatusLabel('something-new')).toBe('something-new')
  })

  it('maps execution strategies', () => {
    expect(getExecutionStrategyLabel('DEPOSIT_FIRST')).toBe('Cọc trước, ký sau')
    expect(getExecutionStrategyLabel('SIGN_FIRST')).toBe('Ký trước, cọc sau')
  })
})
