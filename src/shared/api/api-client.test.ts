import { afterEach, describe, expect, it, vi } from 'vitest'
import { ApiClient, ApiClientError, createApiUrl } from './api-client'

afterEach(() => vi.unstubAllGlobals())

describe('createApiUrl', () => {
  it('joins base URL and relative path predictably', () => {
    expect(createApiUrl('http://localhost:3001/api/v1', '/health')).toBe(
      'http://localhost:3001/api/v1/health'
    )
  })
})

describe('ApiClient.getBlob', () => {
  it('sends the bearer token when loading protected media', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        new Response('image', { headers: { 'Content-Type': 'image/jpeg' } })
      )
    vi.stubGlobal('fetch', fetchMock)
    const client = new ApiClient({
      baseUrl: 'http://localhost:3001/api/v1',
      getAccessToken: () => 'token',
    })

    const result = await client.getBlob('/kyc/id/media/selfie')
    expect(result.size).toBe(5)
    expect(result.type).toBe('image/jpeg')
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3001/api/v1/kyc/id/media/selfie',
      expect.objectContaining({ headers: expect.any(Headers) })
    )
    const headers = fetchMock.mock.calls[0]?.[1]?.headers as Headers
    expect(headers.get('Authorization')).toBe('Bearer token')
  })

  it('fails when protected media is not authorized', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(null, { status: 403 }))
    )
    const client = new ApiClient({ baseUrl: 'http://localhost:3001/api/v1' })
    await expect(client.getBlob('/kyc/id/media/selfie')).rejects.toBeInstanceOf(
      ApiClientError
    )
  })
})

describe('ApiClient.put', () => {
  it('supports idempotent participant mutations', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true, data: { ok: true } }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    )
    vi.stubGlobal('fetch', fetchMock)
    const client = new ApiClient({ baseUrl: 'http://localhost:3001/api/v1' })

    await expect(
      client.put('/contracts/contract-1/sign', { signingGrantId: 'grant-1' })
    ).resolves.toEqual({ ok: true })
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3001/api/v1/contracts/contract-1/sign',
      expect.objectContaining({ method: 'PUT' })
    )
  })
})
