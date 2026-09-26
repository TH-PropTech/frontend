import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ContractAmendmentTimeline } from './contract-amendment-timeline'

const getAmendments = vi.hoisted(() => vi.fn())

vi.mock('../api/contracts-api', () => ({
  getContractAmendments: getAmendments,
}))

describe('ContractAmendmentTimeline', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    getAmendments.mockResolvedValue([])
  })

  it('shows an empty state for a contract with no amendments', async () => {
    render(
      <ContractAmendmentTimeline
        contractId="contract-1"
        canManage={false}
        canSign={false}
      />
    )

    await waitFor(() =>
      expect(getAmendments).toHaveBeenCalledWith('contract-1')
    )
    expect(
      screen.getByTestId('contract-amendment-timeline')
    ).toBeInTheDocument()
    expect(screen.getByText(/phụ lục nào/)).toBeInTheDocument()
  })
})
