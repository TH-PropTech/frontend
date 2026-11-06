import { apiClient } from '@/shared/api'

export interface LegalSourceGround {
  title: string
  article: string
  url?: string | undefined
}

/** Phần nguồn pháp lý công khai mà các màn hình nghiệp vụ dùng để dẫn chứng. */
export interface PublicLegalSource {
  key: string
  code: string
  title: string
  externalUrl: string
  legalGrounds: LegalSourceGround[]
  notes: string[]
}

let cached: Promise<PublicLegalSource[]> | null = null

/** Đọc danh sách nguồn đang hiệu lực; dùng chung một lần tải cho cả trang. */
export function getPublicLegalSources(): Promise<PublicLegalSource[]> {
  if (!cached) {
    cached = Promise.resolve()
      .then(() => apiClient.get<PublicLegalSource[]>('/legal-sources'))
      .catch((error: unknown) => {
        cached = null
        throw error
      })
  }
  return cached
}

export function resetPublicLegalSourcesCache(): void {
  cached = null
}
