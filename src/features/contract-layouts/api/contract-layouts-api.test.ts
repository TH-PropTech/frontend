import { beforeEach, describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api'
import {
  previewContractLayout,
  saveContractLayoutDraft,
} from './contract-layouts-api'

vi.mock('@/shared/api', () => ({ apiClient: { post: vi.fn() } }))

describe('contract layouts API', () => {
  beforeEach(() => vi.clearAllMocks())

  it('uses the admin preview and draft endpoints', async () => {
    vi.mocked(apiClient.post).mockResolvedValue({})
    await previewContractLayout('lease profile')
    await saveContractLayoutDraft('lease profile', {
      legalProfile: 'PRIVATE_CIVIL_APARTMENT_LEASE',
      templateKey: null,
      blocks: [],
      supplementaryClauses: [],
      expectedRevision: 1,
    })
    expect(apiClient.post).toHaveBeenNthCalledWith(
      1,
      '/contract-layouts/admin/lease%20profile/preview',
      {}
    )
    expect(apiClient.post).toHaveBeenNthCalledWith(
      2,
      '/contract-layouts/admin/lease%20profile/draft',
      expect.objectContaining({ expectedRevision: 1 })
    )
  })
})
