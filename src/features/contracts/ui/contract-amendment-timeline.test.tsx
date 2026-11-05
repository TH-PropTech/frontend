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

  it('lets a participant start an amendment without staff rights', async () => {
    render(
      <ContractAmendmentTimeline
        contractId="contract-1"
        canManage={false}
        canRequest
        canSign
      />
    )
    await waitFor(() => expect(getAmendments).toHaveBeenCalled())
    expect(screen.getByLabelText(/Giá thuê mới/)).toBeInTheDocument()
  })

  it('hides the create form from a viewer who cannot request', async () => {
    render(
      <ContractAmendmentTimeline
        contractId="contract-1"
        canManage={false}
        canSign={false}
      />
    )
    await waitFor(() => expect(getAmendments).toHaveBeenCalled())
    expect(screen.queryByLabelText(/Giá thuê mới/)).not.toBeInTheDocument()
  })
})
