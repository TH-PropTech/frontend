import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ExecutionPoliciesAdminTab } from './execution-policies-admin-tab'
import * as api from '@/features/rental-execution-policies/api/rental-execution-policies-api'

vi.mock(
  '@/features/rental-execution-policies/api/rental-execution-policies-api',
  () => ({
    getAdminRentalExecutionPolicies: vi.fn(),
    saveRentalExecutionPolicyDraft: vi.fn(),
    publishRentalExecutionPolicy: vi.fn(),
    archiveRentalExecutionPolicy: vi.fn(),
  })
)

const draft = {
  policyId: 'sign-first',
  version: null,
  status: 'draft' as const,
  strategy: 'SIGN_FIRST' as const,
  name: 'Sign first',
  description: 'Sign before deposit',
  disclosure: {
    sequenceLabel: 'Sign then deposit',
    depositLabel: 'Deposit pending',
    effectivenessLabel: 'Active after deposit',
    cancellationLabel: 'Snapshot rule',
  },
  contentHash: null,
  draftRevision: 2,
}

const published = {
  ...draft,
  version: 1,
  status: 'published' as const,
  contentHash: 'hash-v1',
}

describe('ExecutionPoliciesAdminTab', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(api.getAdminRentalExecutionPolicies).mockResolvedValue([
      draft,
      published,
    ])
    vi.mocked(api.saveRentalExecutionPolicyDraft).mockResolvedValue({
      ...draft,
      draftRevision: 3,
    })
    vi.mocked(api.publishRentalExecutionPolicy).mockResolvedValue(published)
    vi.mocked(api.archiveRentalExecutionPolicy).mockResolvedValue({
      ...published,
      status: 'archived',
    })
  })

  it('loads both draft and published revisions without a strategy selector', async () => {
    render(<ExecutionPoliciesAdminTab />)

    expect(
      await screen.findByTestId('execution-policies-admin-tab')
    ).toBeDefined()
    expect(screen.queryByTestId('execution-policy-strategy')).toBeNull()
    expect(screen.getByText('sign-first · vdraft')).toBeDefined()
    expect(screen.getByText('sign-first · v1')).toBeDefined()
  })

  it('saves a draft with optimistic revision and publishes it', async () => {
    render(<ExecutionPoliciesAdminTab />)
    await screen.findByTestId('execution-policies-admin-tab')

    fireEvent.click(screen.getByTestId('execution-policy-save-draft'))
    await waitFor(() => {
      expect(api.saveRentalExecutionPolicyDraft).toHaveBeenCalledWith(
        expect.objectContaining({
          policyId: 'sign-first',
          strategy: 'SIGN_FIRST',
          expectedRevision: 2,
        })
      )
    })

    fireEvent.click(screen.getByTestId('execution-policy-publish'))
    await waitFor(() => {
      expect(api.publishRentalExecutionPolicy).toHaveBeenCalledWith(
        'sign-first',
        expect.objectContaining({ expectedRevision: 3 })
      )
    })
  })

  it('archives a published revision with an explicit operation', async () => {
    render(<ExecutionPoliciesAdminTab />)
    await screen.findByTestId('execution-policies-admin-tab')

    fireEvent.click(screen.getByTestId('execution-policy-archive-sign-first-1'))
    await waitFor(() => {
      expect(api.archiveRentalExecutionPolicy).toHaveBeenCalledWith(
        'sign-first',
        1,
        expect.any(String)
      )
    })
  })
})
