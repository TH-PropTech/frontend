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

    const response = await fetch(createApiUrl(this.baseUrl, path), init)
    const payload = (await response.json()) as ApiResponse<TData>

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
