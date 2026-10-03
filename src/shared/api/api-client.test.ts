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

describe('ApiClient.post', () => {
  it('supports request headers required by idempotent operations', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true, data: { ok: true } }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    )
    vi.stubGlobal('fetch', fetchMock)
    const client = new ApiClient({ baseUrl: 'http://localhost:3001/api/v1' })

    await client.post(
      '/ownership-transfers/transfer-1/apply',
      {
        previewHash: 'sha256:hash',
      },
      {
        headers: { 'Idempotency-Key': 'request-1' },
      }
    )

    const headers = fetchMock.mock.calls[0]?.[1]?.headers as Headers
    expect(headers.get('Idempotency-Key')).toBe('request-1')
  })
})

describe('ApiClient network failures', () => {
  it('normalizes transport failures into an ApiClientError with status zero', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('offline')))
    const client = new ApiClient({ baseUrl: 'http://localhost:3001/api/v1' })

    await expect(client.get('/apartments')).rejects.toMatchObject({
      name: 'ApiClientError',
      status: 0,
      message: 'Không thể kết nối tới máy chủ API',
    })
  })
})

describe('ApiClient.getFile', () => {
  it('returns the blob with its Content-Disposition filename and bearer token', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response('zip-bytes', {
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': 'attachment; filename="evidence.zip"',
        },
      })
    )
    vi.stubGlobal('fetch', fetchMock)
    const client = new ApiClient({
      baseUrl: 'http://localhost:3001/api/v1',
      getAccessToken: () => 'token',
    })

    const file = await client.getFile('/contracts/c1/evidence-package')

    expect(file.blob.size).toBe(9)
    expect(file.contentType).toBe('application/zip')
    expect(file.filename).toBe('evidence.zip')
    const headers = fetchMock.mock.calls[0]?.[1]?.headers as Headers
    expect(headers.get('Authorization')).toBe('Bearer token')
    expect(headers.get('Accept')).toContain('application/zip')
  })

  it('reports a null filename when the header is not readable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('x')))
    const client = new ApiClient({ baseUrl: 'http://localhost:3001/api/v1' })
    const file = await client.getFile('/contracts/c1/evidence-package')
    expect(file.filename).toBeNull()
  })

  it('surfaces the stable error envelope of a failed download', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            success: false,
            data: null,
            error: {
              code: 'HTTP_422',
              message: 'Evidence incomplete',
              details: { code: 'EVIDENCE_PACKAGE_INCOMPLETE' },
            },
            meta: null,
          }),
          { status: 422, headers: { 'Content-Type': 'application/json' } }
        )
      )
    )
    const client = new ApiClient({ baseUrl: 'http://localhost:3001/api/v1' })

    const failure = await client
      .getFile('/contracts/c1/evidence-package')
      .catch((error: unknown) => error)

    expect(failure).toBeInstanceOf(ApiClientError)
    expect((failure as ApiClientError).status).toBe(422)
    expect((failure as ApiClientError).body?.details).toEqual({
      code: 'EVIDENCE_PACKAGE_INCOMPLETE',
    })
  })

  it('keeps a typed error when the failure body is not JSON', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('<html>', { status: 502 }))
    )
    const client = new ApiClient({ baseUrl: 'http://localhost:3001/api/v1' })
    await expect(client.getFile('/x')).rejects.toMatchObject({
      status: 502,
      body: null,
    })
  })
})
