import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiClientError, apiClient } from '@/shared/api'
import {
  applyOwnershipTransfer,
  mapOwnershipTransferError,
  previewOwnershipTransfer,
} from './ownership-transfer-api'

vi.mock('@/shared/api', () => ({
  ApiClientError: class MockApiClientError extends Error {
    constructor(
      message: string,
      readonly status: number,
      readonly body: { code: string; message: string } | null
    ) {
      super(message)
    }
  },
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
  },
}))

describe('ownership-transfer-api', () => {
  beforeEach(() => vi.clearAllMocks())

  it('normalizes the target email and calls the preview route', async () => {
    vi.mocked(apiClient.post).mockResolvedValue({ transferId: 'transfer-1' })

    await previewOwnershipTransfer('  Owner@Example.com ')

    expect(apiClient.post).toHaveBeenCalledWith(
      '/ownership-transfers/preview',
      {
        targetEmail: 'owner@example.com',
      }
    )
  })

  it('sends the preview hash and idempotency key without credentials', async () => {
    vi.mocked(apiClient.post).mockResolvedValue({ status: 'completed' })

    await applyOwnershipTransfer(
      'transfer-1',
      `sha256:${'a'.repeat(64)}`,
      'request-1'
    )

    const postMock = vi.mocked(apiClient.post)
    expect(postMock).toHaveBeenCalledWith(
      '/ownership-transfers/transfer-1/apply',
      { previewHash: `sha256:${'a'.repeat(64)}` },
      { headers: { 'Idempotency-Key': 'request-1' } }
    )
    expect(postMock).not.toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ password: expect.anything() }),
      expect.anything()
    )
  })

  it.each([
    [403, 'FORBIDDEN'],
    [409, 'TRANSFER_CONFLICT'],
    [422, 'TRANSACTION_UNAVAILABLE'],
  ])('maps HTTP %s to a safe UI error', (status, code) => {
    const error = new ApiClientError('backend error', status, null)

    expect(mapOwnershipTransferError(error)).toMatchObject({ status, code })
  })

  it('maps transport failures without leaking backend details', () => {
    expect(mapOwnershipTransferError(new Error('offline'))).toEqual({
      status: 0,
      code: 'NETWORK_ERROR',
      message: 'Không thể kết nối tới máy chủ API.',
    })
  })
})
