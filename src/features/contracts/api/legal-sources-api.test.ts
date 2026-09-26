import { beforeEach, describe, expect, it, vi } from 'vitest'
import { apiClient, ApiClientError } from '@/shared/api'
import {
  deleteLegalSource,
  getContractPanelSources,
  getLegalAdminErrorMessage,
  getLegalSource,
  reorderLegalSources,
  reorderPlatformRegulations,
  updateLegalSource,
  updatePlatformRegulation,
} from './legal-sources-api'

vi.mock('@/shared/api', async () => {
  const actual =
    await vi.importActual<typeof import('@/shared/api')>('@/shared/api')
  return {
    ...actual,
    apiClient: {
      get: vi.fn(),
      post: vi.fn(),
      patch: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    },
  }
})

describe('legal sources API', () => {
  beforeEach(() => vi.clearAllMocks())

  it('requests contract panel sources from the public endpoint', async () => {
    vi.mocked(apiClient.get).mockResolvedValue([])
    await getContractPanelSources()
    expect(apiClient.get).toHaveBeenCalledWith('/legal-sources?panel=contract')
  })

  it('encodes source keys in paths', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({})
    vi.mocked(apiClient.patch).mockResolvedValue({})
    vi.mocked(apiClient.delete).mockResolvedValue({})

    await getLegalSource('1.004194')
    await updateLegalSource('housing-law-2023', { isActive: false })
    await deleteLegalSource('a/b')

    expect(apiClient.get).toHaveBeenCalledWith('/legal-sources/1.004194')
    expect(apiClient.patch).toHaveBeenCalledWith(
      '/legal-sources/admin/housing-law-2023',
      { isActive: false }
    )
    expect(apiClient.delete).toHaveBeenCalledWith('/legal-sources/admin/a%2Fb')
  })

  it('sends reorder payloads', async () => {
    vi.mocked(apiClient.put).mockResolvedValue([])
    await reorderLegalSources(['b', 'a'])
    await reorderPlatformRegulations(['id2', 'id1'])
    expect(apiClient.put).toHaveBeenCalledWith('/legal-sources/admin/reorder', {
      keys: ['b', 'a'],
    })
    expect(apiClient.put).toHaveBeenCalledWith(
      '/platform-regulations/admin/reorder',
      { ids: ['id2', 'id1'] }
    )
  })

  it('patches regulations by id', async () => {
    vi.mocked(apiClient.patch).mockResolvedValue({})
    await updatePlatformRegulation('reg-1', { linkedSourceKey: null })
    expect(apiClient.patch).toHaveBeenCalledWith(
      '/platform-regulations/admin/reg-1',
      { linkedSourceKey: null }
    )
  })
})

describe('getLegalAdminErrorMessage', () => {
  it('lists referencing regulation codes for LEGAL_SOURCE_IN_USE', () => {
    const error = new ApiClientError('conflict', 409, {
      code: 'HTTP_409',
      message: 'Nguồn đang được quy định tham chiếu',
      details: {
        code: 'LEGAL_SOURCE_IN_USE',
        regulationCodes: ['REG-RES-01', 'REG-TAX-02'],
      },
    })
    expect(getLegalAdminErrorMessage(error)).toContain('REG-RES-01, REG-TAX-02')
  })

  it('falls back to API message, then error message', () => {
    expect(
      getLegalAdminErrorMessage(
        new ApiClientError('x', 400, {
          code: 'HTTP_400',
          message: 'externalUrl phải là URL https://',
        })
      )
    ).toBe('externalUrl phải là URL https://')
    expect(getLegalAdminErrorMessage(new Error('boom'))).toBe('boom')
  })
})
