import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AdminContractCommercialEditor } from './admin-contract-commercial-editor'

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  validate: vi.fn(),
  save: vi.fn(),
}))

vi.mock('../api/contracts-api', () => ({
  getAdminContractEditor: mocks.get,
  validateAdminCommercialDraft: mocks.validate,
  saveAdminCommercialDraft: mocks.save,
}))

describe('AdminContractCommercialEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.get.mockResolvedValue({
      contractId: 'contract-1',
      revision: 2,
      locked: false,
      protectedFields: ['legalProfile', 'clauses', 'contractTemplateRef'],
      commercial: {
        monthlyRent: 15_000_000,
        deposit: 30_000_000,
        paymentDay: 5,
        latePenaltyRate: 8,
        terminationNoticeDays: 30,
        durationMonths: 12,
      },
    })
  })

  it('loads the server snapshot and renders the protected legal boundary', async () => {
    render(<AdminContractCommercialEditor contractId="contract-1" />)

    await waitFor(() =>
      expect(
        screen.getByTestId('admin-contract-commercial-editor')
      ).toBeInTheDocument()
    )
    expect(mocks.get).toHaveBeenCalledWith('contract-1')
    expect(screen.getByText(/Revision 2/)).toBeInTheDocument()
    expect(screen.getByText(/template version/)).toBeInTheDocument()
  })

  it('runs the server-confirmed validate/save flow and recovers from a stale save', async () => {
    mocks.validate.mockResolvedValue({
      valid: true,
      errors: [],
      changedFields: ['monthlyRent'],
    })
    mocks.save
      .mockResolvedValueOnce({
        contractId: 'contract-1',
        revision: 3,
        locked: false,
        protectedFields: ['legalProfile'],
        commercial: {
          monthlyRent: 18_000_000,
          deposit: 36_000_000,
          paymentDay: 5,
          latePenaltyRate: 8,
          terminationNoticeDays: 30,
          durationMonths: 12,
        },
      })
      .mockRejectedValueOnce(new Error('CONTRACT_COMMERCIAL_REVISION_STALE'))
    render(<AdminContractCommercialEditor contractId="contract-1" />)
    await waitFor(() =>
      expect(
        screen.getByTestId('admin-contract-commercial-editor')
      ).toBeInTheDocument()
    )

    const monthlyRent = screen.getAllByRole('spinbutton')[0]
    const saveButton = screen.getAllByRole('button')[1]
    const reloadButton = screen.getAllByRole('button')[2]
    if (!monthlyRent || !saveButton || !reloadButton) {
      throw new Error('Expected commercial editor controls')
    }
    fireEvent.change(monthlyRent, { target: { value: '18000000' } })
    fireEvent.click(saveButton)
    await waitFor(() =>
      expect(mocks.save).toHaveBeenCalledWith(
        'contract-1',
        expect.objectContaining({ monthlyRent: 18_000_000 }),
        2
      )
    )
    expect(await screen.findByText(/server x/)).toBeInTheDocument()

    fireEvent.change(monthlyRent, { target: { value: '19000000' } })
    fireEvent.click(saveButton)
    await waitFor(() =>
      expect(
        screen.getByText(/CONTRACT_COMMERCIAL_REVISION_STALE/)
      ).toBeInTheDocument()
    )

    mocks.get.mockResolvedValueOnce({
      contractId: 'contract-1',
      revision: 3,
      locked: false,
      protectedFields: ['legalProfile'],
      commercial: {
        monthlyRent: 19_000_000,
        deposit: 36_000_000,
        paymentDay: 5,
        latePenaltyRate: 8,
        terminationNoticeDays: 30,
        durationMonths: 12,
      },
    })
    fireEvent.click(reloadButton)
    await waitFor(() => expect(mocks.get).toHaveBeenCalledTimes(2))
    expect(screen.getByText(/Revision 3/)).toBeInTheDocument()
  })
})
