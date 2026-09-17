import { beforeEach, describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api'
import { getPublicServiceChecklist } from './contracts-api'

vi.mock('@/shared/api', () => ({
  apiClient: {
    get: vi.fn(),
  },
}))

describe('public service checklist API', () => {
  beforeEach(() => vi.clearAllMocks())

  it('requests the temporary-residence checklist through the scoped contract endpoint', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      purpose: 'temporary-residence',
      externalProcedureCompleted: false,
    })

    await getPublicServiceChecklist('contract-1')

    expect(apiClient.get).toHaveBeenCalledWith(
      '/contracts/contract-1/public-service-checklist?purpose=temporary-residence'
    )
  })
})
