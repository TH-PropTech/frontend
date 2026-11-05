import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ContractChangeRequestsPanel } from './contract-change-requests-panel'
import type {
  ContractChangeRequest,
  ContractChangeRequestList,
} from '../api/contract-change-requests-api'

const api = vi.hoisted(() => ({
  get: vi.fn(),
  create: vi.fn(),
  accept: vi.fn(),
  reject: vi.fn(),
  cancel: vi.fn(),
}))

vi.mock('../api/contract-change-requests-api', () => ({
  getContractChangeRequests: api.get,
  createContractChangeRequest: api.create,
  acceptContractChangeRequest: api.accept,
  rejectContractChangeRequest: api.reject,
  cancelContractChangeRequest: api.cancel,
}))

const pending: ContractChangeRequest = {
  _id: 'req-1',
  contractId: 'contract-1',
  sequence: 1,
  status: 'pending-counterparty',
  requestedBy: 'landlord-1',
  requestedRole: 'landlord',
  changes: [
    { field: 'terminationNoticeDays', before: 30, after: 45 },
    { field: 'monthlyRent', before: 12_000_000, after: 13_000_000 },
  ],
  reason: 'Cần báo trước lâu hơn',
  baseRevision: 0,
  expiresAt: '2030-01-08T00:00:00.000Z',
  createdAt: '2030-01-01T00:00:00.000Z',
}

function listOf(
  items: ContractChangeRequest[],
  overrides: Partial<ContractChangeRequestList> = {}
): ContractChangeRequestList {
  return { commercialRevision: 0, locked: false, items, ...overrides }
}

describe('ContractChangeRequestsPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    api.get.mockResolvedValue(listOf([]))
  })

  it('shows an empty state and lets a participant open the request dialog', async () => {
    render(
      <ContractChangeRequestsPanel
        contractId="contract-1"
        viewerRole="landlord"
        currentUserId="landlord-1"
      />
    )
    expect(await screen.findByTestId('change-requests-empty')).toBeDefined()
    fireEvent.click(screen.getByTestId('change-request-open'))
    expect(screen.getByTestId('change-request-dialog')).toBeDefined()
  })

  it('sends the request with the current draft revision', async () => {
    api.get.mockResolvedValue(listOf([], { commercialRevision: 3 }))
    api.create.mockResolvedValue(pending)
    render(
      <ContractChangeRequestsPanel
        contractId="contract-1"
        viewerRole="landlord"
        currentUserId="landlord-1"
      />
    )
    fireEvent.click(await screen.findByTestId('change-request-open'))
    fireEvent.change(screen.getByTestId('change-request-field'), {
      target: { value: 'paymentDay' },
    })
    fireEvent.change(screen.getByTestId('change-request-value'), {
      target: { value: '5' },
    })
    fireEvent.change(screen.getByTestId('change-request-reason'), {
      target: { value: 'Đổi ngày thanh toán' },
    })
    fireEvent.click(screen.getByTestId('change-request-submit'))

    await waitFor(() => expect(api.create).toHaveBeenCalled())
    expect(api.create).toHaveBeenCalledWith(
      'contract-1',
      expect.objectContaining({
        changes: [{ field: 'paymentDay', after: 5 }],
        reason: 'Đổi ngày thanh toán',
        expectedRevision: 3,
      })
    )
  })

  it('keeps submit disabled until a value and a reason are entered', async () => {
    render(
      <ContractChangeRequestsPanel
        contractId="contract-1"
        viewerRole="tenant"
        currentUserId="tenant-1"
      />
    )
    fireEvent.click(await screen.findByTestId('change-request-open'))
    const submit = screen.getByTestId('change-request-submit')
    expect(submit).toBeDisabled()
    fireEvent.change(screen.getByTestId('change-request-value'), {
      target: { value: '15000000' },
    })
    expect(submit).toBeDisabled()
    fireEvent.change(screen.getByTestId('change-request-reason'), {
      target: { value: 'Giảm giá' },
    })
    expect(submit).toBeEnabled()
  })

  it('lets the counterparty accept and refreshes the contract', async () => {
    api.get.mockResolvedValue(listOf([pending]))
    api.accept.mockResolvedValue({ ...pending, status: 'applied' })
    const onApplied = vi.fn()
    render(
      <ContractChangeRequestsPanel
        contractId="contract-1"
        viewerRole="tenant"
        currentUserId="tenant-1"
        onApplied={onApplied}
      />
    )
    expect(await screen.findByText(/13\.000\.000/)).toBeDefined()
    expect(screen.getByText(/Số ngày báo trước/)).toBeDefined()
    fireEvent.click(screen.getByTestId('change-request-accept-req-1'))
    await waitFor(() => expect(onApplied).toHaveBeenCalled())
    expect(api.accept).toHaveBeenCalledWith('contract-1', 'req-1')
  })

  it('does not offer accept to the requester but allows withdrawing with a reason', async () => {
    api.get.mockResolvedValue(listOf([pending]))
    api.cancel.mockResolvedValue({ ...pending, status: 'cancelled' })
    render(
      <ContractChangeRequestsPanel
        contractId="contract-1"
        viewerRole="landlord"
        currentUserId="landlord-1"
      />
    )
    await screen.findByTestId('change-request-req-1')
    expect(screen.queryByTestId('change-request-accept-req-1')).toBeNull()
    expect(screen.getByTestId('change-request-open')).toBeDisabled()

    fireEvent.click(screen.getByTestId('change-request-cancel-req-1'))
    const confirm = screen.getByTestId('change-request-decision-confirm')
    expect(confirm).toBeDisabled()
    fireEvent.change(screen.getByTestId('change-request-decision-reason'), {
      target: { value: 'Nhập nhầm' },
    })
    fireEvent.click(confirm)
    await waitFor(() =>
      expect(api.cancel).toHaveBeenCalledWith(
        'contract-1',
        'req-1',
        'Nhập nhầm'
      )
    )
  })

  it('lets staff reject or close but never accept', async () => {
    api.get.mockResolvedValue(listOf([pending]))
    render(<ContractChangeRequestsPanel contractId="contract-1" canModerate />)
    await screen.findByTestId('change-request-req-1')
    expect(screen.queryByTestId('change-request-accept-req-1')).toBeNull()
    expect(screen.getByTestId('change-request-reject-req-1')).toBeDefined()
    expect(screen.getByTestId('change-request-cancel-req-1')).toBeDefined()
    expect(screen.queryByTestId('change-request-open')).toBeNull()
  })

  it('points to amendments once the contract is locked', async () => {
    api.get.mockResolvedValue(listOf([pending], { locked: true }))
    render(
      <ContractChangeRequestsPanel
        contractId="contract-1"
        viewerRole="landlord"
        currentUserId="landlord-1"
      />
    )
    expect(await screen.findByText(/dùng phụ lục hợp đồng/)).toBeDefined()
    expect(screen.queryByTestId('change-request-open')).toBeNull()
  })

  it('renders nothing for a locked contract that never had a request', async () => {
    api.get.mockResolvedValue(listOf([], { locked: true }))
    const { container } = render(
      <ContractChangeRequestsPanel
        contractId="contract-1"
        viewerRole="landlord"
        currentUserId="landlord-1"
      />
    )
    await waitFor(() => expect(api.get).toHaveBeenCalled())
    await waitFor(() => expect(container.firstChild).toBeNull())
  })

  it('shows the server error when loading or acting fails', async () => {
    api.get.mockResolvedValue(listOf([pending]))
    api.accept.mockRejectedValue(new Error('CONTRACT_REVISION_STALE'))
    render(
      <ContractChangeRequestsPanel
        contractId="contract-1"
        viewerRole="tenant"
        currentUserId="tenant-1"
      />
    )
    fireEvent.click(await screen.findByTestId('change-request-accept-req-1'))
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'CONTRACT_REVISION_STALE'
    )
  })
})
