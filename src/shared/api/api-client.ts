import { env } from '@/shared/config/env'
import { parseContentDispositionFilename } from './content-disposition'
import type { ApiErrorBody, ApiResponse } from './api-response'

type ApiClientOptions = {
  baseUrl?: string
  getAccessToken?: () => string | null | undefined
}

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown
}

type PostOptions = Omit<RequestOptions, 'body' | 'method'>

export type ApiFile = {
  blob: Blob
  contentType: string | null
  /** Filename advertised by `Content-Disposition`, or null when it is absent/unreadable. */
  filename: string | null
}

export class ApiClientError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly body: ApiErrorBody | null
  ) {
    super(message)
    this.name = 'ApiClientError'
  }
}

export class ApiClient {
  private readonly baseUrl: string
  private readonly getAccessToken: (() => string | null | undefined) | undefined

  constructor(options: ApiClientOptions = {}) {
    this.baseUrl = options.baseUrl ?? env.apiUrl
    this.getAccessToken = options.getAccessToken
  }

  async get<TData>(path: string, options: RequestOptions = {}): Promise<TData> {
    return this.request<TData>(path, { ...options, method: 'GET' })
  }

  async post<TData>(
    path: string,
    body: unknown,
    options: PostOptions = {}
  ): Promise<TData> {
    return this.request<TData>(path, { ...options, method: 'POST', body })
  }

  async patch<TData>(path: string, body: unknown): Promise<TData> {
    return this.request<TData>(path, { method: 'PATCH', body })
  }

  async put<TData>(path: string, body: unknown): Promise<TData> {
    return this.request<TData>(path, { method: 'PUT', body })
  }

  async delete<TData>(
    path: string,
    options: RequestOptions = {}
  ): Promise<TData> {
    return this.request<TData>(path, { ...options, method: 'DELETE' })
  }

  async getBlob(path: string): Promise<Blob> {
    const headers = new Headers()
    const token = this.getAccessToken?.()
    if (token) headers.set('Authorization', `Bearer ${token}`)
    const response = await fetchWithNetworkError(
      createApiUrl(this.baseUrl, path),
      { headers }
    )
    if (!response.ok) {
      throw new ApiClientError(
        'Không thể tải nội dung được bảo vệ',
        response.status,
        null
      )
    }
    return response.blob()
  }

  /**
   * Downloads a binary response (for example an evidence ZIP) without interpreting its bytes.
   * A failed download keeps the stable JSON error envelope so callers can map domain codes.
   */
  async getFile(path: string): Promise<ApiFile> {
    const headers = new Headers({
      Accept: 'application/zip, application/octet-stream, application/json',
    })
    const token = this.getAccessToken?.()
    if (token) headers.set('Authorization', `Bearer ${token}`)
    const response = await fetchWithNetworkError(
      createApiUrl(this.baseUrl, path),
      { headers }
    )
    if (!response.ok) {
      const body = await readErrorBody(response)
      throw new ApiClientError(
        body?.message ?? 'Không thể tải tệp được bảo vệ',
        response.status,
        body
      )
    }
    return {
      blob: await response.blob(),
      contentType: response.headers.get('Content-Type'),
      filename: parseContentDispositionFilename(
        response.headers.get('Content-Disposition')
      ),
    }
  }

  private async request<TData>(
    path: string,
    options: RequestOptions
  ): Promise<TData> {
    const { body, ...requestInit } = options
    const token = this.getAccessToken?.()
    const headers = new Headers(options.headers)

    headers.set('Accept', 'application/json')

    if (body !== undefined) {
      if (typeof FormData !== 'undefined' && body instanceof FormData) {
        // FormData should let fetch set the Content-Type automatically with boundary
      } else {
        headers.set('Content-Type', 'application/json')
      }
    }

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    const init: RequestInit = {
      ...requestInit,
      headers,
    }

    if (body !== undefined) {
      if (typeof FormData !== 'undefined' && body instanceof FormData) {
        init.body = body
      } else {
        init.body = JSON.stringify(body)
      }
    }

    const url = createApiUrl(this.baseUrl, path)
    let response = await fetchWithNetworkError(url, init)
    let payload = (await response.json()) as ApiResponse<TData>

    // Auto-refresh token on 401 unauthorized
    if (
      response.status === 401 &&
      !path.includes('/auth/refresh') &&
      typeof window !== 'undefined'
    ) {
      const refreshToken = localStorage.getItem('refreshToken')
      if (refreshToken) {
        try {
          if (!refreshTokenPromise) {
            refreshTokenPromise = (async (): Promise<{
              accessToken: string
              refreshToken: string
            } | null> => {
              const refreshRes = await fetchWithNetworkError(
                createApiUrl(this.baseUrl, '/auth/refresh'),
                {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ refreshToken }),
                }
              )
              if (refreshRes.ok) {
                const refreshPayload = await refreshRes.json()
                if (refreshPayload.success && refreshPayload.data) {
                  const data = refreshPayload.data
                  localStorage.setItem('accessToken', data.accessToken)
                  localStorage.setItem('refreshToken', data.refreshToken)
                  return data
                }
              }
              // Clear session if refresh failed
              localStorage.removeItem('accessToken')
              localStorage.removeItem('refreshToken')
              localStorage.removeItem('user')
              return null
            })()
          }

          const newTokens = await refreshTokenPromise
          refreshTokenPromise = null

          if (newTokens && newTokens.accessToken) {
            const newHeaders = new Headers(init.headers)
            newHeaders.set('Authorization', `Bearer ${newTokens.accessToken}`)
            init.headers = newHeaders
            response = await fetchWithNetworkError(url, init)
            payload = (await response.json()) as ApiResponse<TData>
          }
        } catch {
          refreshTokenPromise = null
        }
      }
    }

    if (!response.ok || !payload.success) {
      throw new ApiClientError(
        payload.error?.message ?? 'API request failed',
        response.status,
        payload.error
      )
    }

    return payload.data
  }
}

let refreshTokenPromise: Promise<{
  accessToken: string
  refreshToken: string
} | null> | null = null

export function createApiUrl(baseUrl: string, path: string): string {
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path

  return new URL(normalizedPath, normalizedBase).toString()
}

async function readErrorBody(response: Response): Promise<ApiErrorBody | null> {
  try {
    const payload = (await response.json()) as Partial<ApiResponse<unknown>>
    return payload.error ?? null
  } catch {
    return null
  }
}

async function fetchWithNetworkError(
  url: string,
  init?: RequestInit
): Promise<Response> {
  try {
    return await fetch(url, init)
  } catch {
    throw new ApiClientError('Không thể kết nối tới máy chủ API', 0, null)
  }
}

export const apiClient = new ApiClient({
  getAccessToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken')
    }
    return null
  },
})
