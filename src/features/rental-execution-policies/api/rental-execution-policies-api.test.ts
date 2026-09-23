import { beforeEach, describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api'
import {
  archiveRentalExecutionPolicy,
  getAdminRentalExecutionPolicies,
  getRentalExecutionPolicies,
  publishRentalExecutionPolicy,
  saveRentalExecutionPolicyDraft,
} from './rental-execution-policies-api'

vi.mock('@/shared/api', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
  },
}))

const input = {
  policyId: 'sign-first',
  strategy: 'SIGN_FIRST' as const,
  name: 'Sign first',
  description: 'Sign before deposit',
  disclosure: {
    sequenceLabel: 'Sign then deposit',
    depositLabel: 'Deposit remains pending',
    effectivenessLabel: 'Activates after deposit',
    cancellationLabel: 'Use snapshot cancellation rule',
  },
  expectedRevision: 1,
}

describe('rental execution policy API', () => {
  beforeEach(() => vi.clearAllMocks())

  it('reads active and admin policy catalogs', async () => {
    vi.mocked(apiClient.get).mockResolvedValue([])

    await expect(getRentalExecutionPolicies()).resolves.toEqual([])
    await expect(getAdminRentalExecutionPolicies()).resolves.toEqual([])

    expect(apiClient.get).toHaveBeenNthCalledWith(
      1,
      '/rental-execution-policies'
    )
    expect(apiClient.get).toHaveBeenNthCalledWith(
      2,
      '/rental-execution-policies/admin'
    )
  })

  it('uses post for new drafts and put for optimistic draft revisions', async () => {
    vi.mocked(apiClient.post).mockResolvedValue({})
    vi.mocked(apiClient.put).mockResolvedValue({})

    const newDraftInput = {
      strategy: input.strategy,
      name: input.name,
      description: input.description,
      disclosure: input.disclosure,
      expectedRevision: input.expectedRevision,
    }
    await saveRentalExecutionPolicyDraft(newDraftInput)
    await saveRentalExecutionPolicyDraft(input)

    expect(apiClient.post).toHaveBeenCalledWith(
      '/rental-execution-policies/admin/draft',
      newDraftInput
    )
    expect(apiClient.put).toHaveBeenCalledWith(
      '/rental-execution-policies/admin/sign-first/draft',
      input
    )
  })

  it('publishes and archives immutable revisions with the explicit reason', async () => {
    vi.mocked(apiClient.post).mockResolvedValue({})

    await publishRentalExecutionPolicy('sign-first', {
      expectedRevision: 2,
      reason: 'Reviewed by Admin',
    })
    await archiveRentalExecutionPolicy('sign-first', 3, 'Retired revision')

    expect(apiClient.post).toHaveBeenNthCalledWith(
      1,
      '/rental-execution-policies/admin/sign-first/publish',
      { expectedRevision: 2, reason: 'Reviewed by Admin' }
    )
    expect(apiClient.post).toHaveBeenNthCalledWith(
      2,
      '/rental-execution-policies/admin/sign-first/3/archive',
      { reason: 'Retired revision' }
    )
  })
})
