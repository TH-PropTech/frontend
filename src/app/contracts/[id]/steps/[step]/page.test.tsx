import { isValidElement } from 'react'
import { describe, expect, it, vi } from 'vitest'
import ContractStepPage from './page'

vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND')
  }),
}))
vi.mock('@/widgets/contract-workspace', () => ({
  SharedContractStepFlow: () => null,
}))

const renderStep = (step: string) =>
  ContractStepPage({ params: Promise.resolve({ id: 'c1', step }) })

describe('Contract step route', () => {
  it.each(['document', 'deposit', 'signing', 'ledger', 'move-in', 'move-out'])(
    'renders the step flow for %s',
    async step => {
      const element = await renderStep(step)
      expect(isValidElement(element)).toBe(true)
      expect(element.props).toEqual({ contractId: 'c1', step })
    }
  )

  it('returns not found for an unknown step', async () => {
    await expect(renderStep('xyz')).rejects.toThrow('NEXT_NOT_FOUND')
  })
})
