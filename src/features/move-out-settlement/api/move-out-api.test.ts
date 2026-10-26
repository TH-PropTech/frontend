import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiClientError, apiClient } from '@/shared/api'
import {
  acknowledgeDepositRefund,
  confirmMoveOutHandover,
  getDepositStatement,
  getMoveOutHandover,
  recordDepositRefund,
  uploadEvidencePhotos,
} from './move-out-api'

vi.mock('@/shared/api', async importOriginal => {
  const actual = await importOriginal<typeof import('@/shared/api')>()
  return {
    ...actual,
    apiClient: { get: vi.fn(), post: vi.fn(), put: vi.fn(), getBlob: vi.fn() },
  }
})

describe('move-out api', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns null on 404 so the UI can show the empty state', async () => {
    vi.mocked(apiClient.get).mockRejectedValue(
      new ApiClientError('nf', 404, null)
    )
    expect(await getMoveOutHandover('c1')).toBeNull()
    expect(await getDepositStatement('c1')).toBeNull()
  })

  it('rethrows non-404 errors', async () => {
    vi.mocked(apiClient.get).mockRejectedValue(
      new ApiClientError('boom', 500, null)
    )
    await expect(getMoveOutHandover('c1')).rejects.toThrow('boom')
  })

  it('posts the handover hash on confirm', async () => {
    await confirmMoveOutHandover('c1', 'hash')
    expect(apiClient.post).toHaveBeenCalledWith(
      '/move-out-handovers/contract/c1/confirm',
      { handoverHash: 'hash' }
    )
  })

  it('sends a refund without any file field', async () => {
    const input = {
      amount: 5,
      transactionRef: 'FT1',
      paidAt: '2026-10-05T00:00:00.000Z',
    }
    await recordDepositRefund('c1', input)
    expect(apiClient.post).toHaveBeenCalledWith(
      '/deposit-settlement-statements/contract/c1/refunds',
      input
    )
  })

  it('acknowledges a refund by id', async () => {
    await acknowledgeDepositRefund('c1', 'r 1')
    expect(apiClient.post).toHaveBeenCalledWith(
      '/deposit-settlement-statements/contract/c1/refunds/r%201/acknowledge',
      {}
    )
  })

  it('uploads evidence photos through the shared apartment upload', async () => {
    vi.mocked(apiClient.post).mockResolvedValue({ urls: ['https://x/a.png'] })
    const urls = await uploadEvidencePhotos([
      new File(['a'], 'a.png', { type: 'image/png' }),
    ])
    expect(urls).toEqual(['https://x/a.png'])
    expect(vi.mocked(apiClient.post).mock.calls[0]?.[0]).toBe(
      '/apartments/upload'
    )
  })
})
