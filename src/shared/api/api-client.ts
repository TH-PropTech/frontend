import { env } from '@/shared/config/env'
import type { ApiErrorBody, ApiResponse } from './api-response'

type ApiClientOptions = {
  baseUrl?: string
  getAccessToken?: () => string | null | undefined
}

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown
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

  async post<TData>(path: string, body: unknown): Promise<TData> {
    return this.request<TData>(path, { method: 'POST', body })
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
      headers.set('Content-Type', 'application/json')
    }

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    const init: RequestInit = {
      ...requestInit,
      headers,
    }

    if (body !== undefined) {
      init.body = JSON.stringify(body)
    }

    const url = createApiUrl(this.baseUrl, path)
    let response = await fetch(url, init)
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
            refreshTokenPromise = (async () => {
              const refreshRes = await fetch(
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
            response = await fetch(url, init)
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

export const apiClient = new ApiClient({
  getAccessToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken')
    }
    return null
  },
})
