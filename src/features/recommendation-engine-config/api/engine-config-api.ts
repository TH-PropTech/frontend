import { apiClient } from '@/shared/api'
import type { EngineConfig, UpdateEngineConfigDto } from '../model/types'

export const engineConfigApi = {
  getEngineConfig: async (): Promise<EngineConfig> => {
    return apiClient.get<EngineConfig>('/recommendations/engine-config')
  },

  updateEngineConfig: async (
    dto: UpdateEngineConfigDto
  ): Promise<EngineConfig> => {
    return apiClient.put<EngineConfig>('/recommendations/engine-config', dto)
  },
}
