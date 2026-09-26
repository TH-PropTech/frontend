import { apiClient, ApiClientError } from '@/shared/api'
import type {
  LegalSource,
  LegalSourceInput,
  PlatformRegulation,
  PlatformRegulationInput,
} from '../model/legal-governance-data'

// ── Public ──

export async function getContractPanelSources(): Promise<LegalSource[]> {
  return apiClient.get<LegalSource[]>('/legal-sources?panel=contract')
}

export async function getLegalSource(key: string): Promise<LegalSource> {
  return apiClient.get<LegalSource>(`/legal-sources/${encodeURIComponent(key)}`)
}

// ── Admin: nguồn pháp lý ──

export async function getAdminLegalSources(): Promise<LegalSource[]> {
  return apiClient.get<LegalSource[]>('/legal-sources/admin')
}

export async function createLegalSource(
  input: LegalSourceInput & { key: string }
): Promise<LegalSource> {
  return apiClient.post<LegalSource>('/legal-sources/admin', input)
}

export async function updateLegalSource(
  key: string,
  patch: Partial<LegalSourceInput>
): Promise<LegalSource> {
  return apiClient.patch<LegalSource>(
    `/legal-sources/admin/${encodeURIComponent(key)}`,
    patch
  )
}

export async function deleteLegalSource(key: string): Promise<void> {
  await apiClient.delete(`/legal-sources/admin/${encodeURIComponent(key)}`)
}

export async function reorderLegalSources(
  keys: string[]
): Promise<LegalSource[]> {
  return apiClient.put<LegalSource[]>('/legal-sources/admin/reorder', { keys })
}

// ── Admin: quy định nền tảng ──

export async function getAdminPlatformRegulations(): Promise<
  PlatformRegulation[]
> {
  return apiClient.get<PlatformRegulation[]>('/platform-regulations/admin')
}

export async function createPlatformRegulation(
  input: PlatformRegulationInput
): Promise<PlatformRegulation> {
  return apiClient.post<PlatformRegulation>(
    '/platform-regulations/admin',
    input
  )
}

export async function updatePlatformRegulation(
  id: string,
  patch: Partial<PlatformRegulationInput>
): Promise<PlatformRegulation> {
  return apiClient.patch<PlatformRegulation>(
    `/platform-regulations/admin/${encodeURIComponent(id)}`,
    patch
  )
}

export async function deletePlatformRegulation(id: string): Promise<void> {
  await apiClient.delete(
    `/platform-regulations/admin/${encodeURIComponent(id)}`
  )
}

export async function reorderPlatformRegulations(
  ids: string[]
): Promise<PlatformRegulation[]> {
  return apiClient.put<PlatformRegulation[]>(
    '/platform-regulations/admin/reorder',
    { ids }
  )
}

/**
 * Thông báo lỗi thân thiện cho các thao tác quản trị; nêu rõ mã quy định
 * khi xoá nguồn đang được tham chiếu (409 `LEGAL_SOURCE_IN_USE`).
 */
export function getLegalAdminErrorMessage(error: unknown): string {
  if (error instanceof ApiClientError) {
    const details = error.body?.details as
      | { code?: string; regulationCodes?: string[] }
      | undefined
    if (details?.code === 'LEGAL_SOURCE_IN_USE' && details.regulationCodes) {
      return `Không thể xoá: nguồn đang được quy định ${details.regulationCodes.join(', ')} tham chiếu. Hãy bỏ liên kết trước.`
    }
    return error.body?.message ?? error.message
  }
  return error instanceof Error
    ? error.message
    : 'Đã xảy ra lỗi không xác định.'
}
