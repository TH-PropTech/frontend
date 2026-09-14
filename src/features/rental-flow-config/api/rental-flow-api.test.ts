import { describe, expect, it, vi, beforeEach } from 'vitest'
import { apiClient } from '@/shared/api'
import {
  getRentalFlowProfiles,
  getRentalFlowProfile,
  saveRentalFlowProfileDraft,
  publishRentalFlowProfile,
  restoreRentalFlowProfileVersion,
  getRentalFlowAssignments,
  activateRentalFlowAssignment,
  previewRentalFlowAssignment,
  getContractImpactReport,
  type FlowProfileSteps,
} from './rental-flow-api'

vi.mock('@/shared/api', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
}))

describe('rental-flow-api', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls GET /admin/rental-flow/profiles to fetch profiles list', async () => {
    const mockProfiles = [{ profileId: 'prof-1', name: 'Profile 1' }]
    vi.mocked(apiClient.get).mockResolvedValue(mockProfiles)

    const res = await getRentalFlowProfiles()
    expect(apiClient.get).toHaveBeenCalledWith('/admin/rental-flow/profiles')
    expect(res).toEqual(mockProfiles)
  })

  it('calls GET /admin/rental-flow/profiles/:id to fetch specific profile', async () => {
    const mockProfile = { profileId: 'prof-1', name: 'Profile 1' }
    vi.mocked(apiClient.get).mockResolvedValue(mockProfile)

    const res = await getRentalFlowProfile('prof-1')
    expect(apiClient.get).toHaveBeenCalledWith(
      '/admin/rental-flow/profiles/prof-1'
    )
    expect(res).toEqual(mockProfile)
  })

  it('calls POST /admin/rental-flow/profiles/draft to save draft', async () => {
    const mockDraft = { name: 'Draft 1', steps: {} as FlowProfileSteps }
    vi.mocked(apiClient.post).mockResolvedValue({
      profileId: 'prof-new',
      ...mockDraft,
    })

    const res = await saveRentalFlowProfileDraft(mockDraft)
    expect(apiClient.post).toHaveBeenCalledWith(
      '/admin/rental-flow/profiles/draft',
      mockDraft
    )
    expect(res.profileId).toBe('prof-new')
  })

  it('calls POST /admin/rental-flow/profiles/:id/publish with expectedRevision', async () => {
    vi.mocked(apiClient.post).mockResolvedValue({
      profileId: 'prof-1',
      version: 2,
    })

    const res = await publishRentalFlowProfile('prof-1', 3)
    expect(apiClient.post).toHaveBeenCalledWith(
      '/admin/rental-flow/profiles/prof-1/publish',
      {
        expectedRevision: 3,
      }
    )
    expect(res.version).toBe(2)
  })

  it('calls POST /admin/rental-flow/profiles/:id/restore/:version', async () => {
    vi.mocked(apiClient.post).mockResolvedValue({
      profileId: 'prof-1',
      version: 1,
    })

    const res = await restoreRentalFlowProfileVersion('prof-1', 1)
    expect(apiClient.post).toHaveBeenCalledWith(
      '/admin/rental-flow/profiles/prof-1/restore/1',
      {}
    )
    expect(res.version).toBe(1)
  })

  it('calls GET /admin/rental-flow/assignments and POST /activate', async () => {
    vi.mocked(apiClient.get).mockResolvedValue([])
    vi.mocked(apiClient.post).mockResolvedValue({ assignmentId: 'asgn-1' })

    await getRentalFlowAssignments()
    expect(apiClient.get).toHaveBeenCalledWith('/admin/rental-flow/assignments')

    const res = await activateRentalFlowAssignment({
      scope: 'GLOBAL',
      profileId: 'prof-1',
      version: 1,
      contentHash: 'hash-abc',
    })
    expect(apiClient.post).toHaveBeenCalledWith(
      '/admin/rental-flow/assignments/activate',
      {
        scope: 'GLOBAL',
        profileId: 'prof-1',
        version: 1,
        contentHash: 'hash-abc',
      }
    )
    expect(res.assignmentId).toBe('asgn-1')
  })

  it('calls preview and contract-impact endpoints', async () => {
    vi.mocked(apiClient.post).mockResolvedValue({ effectiveConfig: {} })
    vi.mocked(apiClient.get).mockResolvedValue({ eligibleUnsignedDrafts: 5 })

    await previewRentalFlowAssignment({ durationMonths: 12 })
    expect(apiClient.post).toHaveBeenCalledWith(
      '/admin/rental-flow/assignments/preview',
      {
        durationMonths: 12,
      }
    )

    const impact = await getContractImpactReport()
    expect(apiClient.get).toHaveBeenCalledWith(
      '/admin/rental-flow/assignments/contract-impact'
    )
    expect(impact.eligibleUnsignedDrafts).toBe(5)
  })
})
