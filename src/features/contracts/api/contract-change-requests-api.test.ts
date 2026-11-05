import { beforeEach, describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api/api-client'
import {
  acceptContractChangeRequest,
  cancelContractChangeRequest,
  createContractChangeRequest,
  getContractChangeRequests,
  rejectContractChangeRequest,
} from './contract-change-requests-api'
import {
  saveAdminCommercialDraft,
  validateAdminCommercialDraft,
} from './contracts-api'

vi.mock('@/shared/api/api-client', () => ({
  apiClient: { get: vi.fn(), post: vi.fn(), put: vi.fn() },
}))

describe('contract change requests API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(apiClient.get).mockResolvedValue({})
    vi.mocked(apiClient.post).mockResolvedValue({})
    vi.mocked(apiClient.put).mockResolvedValue({})
  })

  it('uses the contract-scoped change request endpoints', async () => {
    await getContractChangeRequests('c1')
    await createContractChangeRequest('c1', {
      changes: [{ field: 'paymentDay', after: 5 }],
      reason: 'Đổi ngày',
      expectedRevision: 2,
    })
    await acceptContractChangeRequest('c1', 'r1')
    await rejectContractChangeRequest('c1', 'r1', 'Không đồng ý')
    await cancelContractChangeRequest('c1', 'r1', 'Nhầm')

    expect(apiClient.get).toHaveBeenCalledWith('/contracts/c1/change-requests')
    expect(apiClient.post).toHaveBeenNthCalledWith(
      1,
      '/contracts/c1/change-requests',
      expect.objectContaining({ expectedRevision: 2 })
    )
    expect(apiClient.post).toHaveBeenNthCalledWith(
      2,
      '/contracts/c1/change-requests/r1/accept',
      {}
    )
    expect(apiClient.post).toHaveBeenNthCalledWith(
      3,
      '/contracts/c1/change-requests/r1/reject',
      { reason: 'Không đồng ý' }
    )
    expect(apiClient.post).toHaveBeenNthCalledWith(
      4,
      '/contracts/c1/change-requests/r1/cancel',
      { reason: 'Nhầm' }
    )
  })

  it('never sends the read-only custom clauses back from the admin editor', async () => {
    const commercial = {
      monthlyRent: 12_000_000,
      deposit: 24_000_000,
      paymentDay: 5,
      latePenaltyRate: 10,
      terminationNoticeDays: 45,
      durationMonths: 12,
      customClauses: 'Không nuôi thú cưng.',
    }
    await validateAdminCommercialDraft('c1', commercial)
    await saveAdminCommercialDraft('c1', commercial, 1)

    const validateBody = vi.mocked(apiClient.post).mock.calls[0]?.[1] as {
      commercial: Record<string, unknown>
    }
    const saveBody = vi.mocked(apiClient.put).mock.calls[0]?.[1] as {
      commercial: Record<string, unknown>
    }
    expect(validateBody.commercial).not.toHaveProperty('customClauses')
    expect(saveBody.commercial).not.toHaveProperty('customClauses')
    expect(saveBody.commercial).toMatchObject({ paymentDay: 5 })
  })
})
