'use client'

import * as React from 'react'
import { engineConfigApi } from '../api/engine-config-api'
import type { EngineConfig, UpdateEngineConfigDto } from './types'

export const DEFAULT_CONFIG: UpdateEngineConfigDto = {
  strategy: 'hybrid',
  alpha: 1.0,
  nbWeight: 0.5,
  ruleWeight: 0.5,
}

export interface UseEngineConfigReturn {
  config: EngineConfig | null
  isLoading: boolean
  isSaving: boolean
  error: string | null
  successMessage: string | null
  updateConfig: (dto: UpdateEngineConfigDto) => Promise<boolean>
  resetToDefault: () => Promise<boolean>
  refetch: () => Promise<void>
  clearMessages: () => void
}

export function useEngineConfig(): UseEngineConfigReturn {
  const [config, setConfig] = React.useState<EngineConfig | null>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(null)
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  )

  const fetchConfig = React.useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await engineConfigApi.getEngineConfig()
      setConfig(data)
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Không thể tải cấu hình AI Engine'
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    let cancelled = false
    queueMicrotask(() => {
      if (!cancelled) void fetchConfig()
    })
    return () => {
      cancelled = true
    }
  }, [fetchConfig])

  const updateConfig = React.useCallback(
    async (dto: UpdateEngineConfigDto): Promise<boolean> => {
      const previousConfig = config
      setIsSaving(true)
      setError(null)
      setSuccessMessage(null)

      // Optimistic update
      setConfig(prev =>
        prev
          ? {
              ...prev,
              ...dto,
              updatedAt: new Date().toISOString(),
            }
          : {
              ...dto,
              updatedAt: new Date().toISOString(),
            }
      )

      try {
        const saved = await engineConfigApi.updateEngineConfig(dto)
        setConfig(saved)
        setSuccessMessage(
          'Cập nhật cấu hình AI Engine và retrain mô hình thành công!'
        )
        return true
      } catch (err) {
        // Rollback optimistic update
        setConfig(previousConfig)
        const msg =
          err instanceof Error
            ? err.message
            : 'Không thể cập nhật cấu hình AI Engine'
        setError(msg)
        return false
      } finally {
        setIsSaving(false)
      }
    },
    [config]
  )

  const resetToDefault = React.useCallback(async (): Promise<boolean> => {
    return updateConfig(DEFAULT_CONFIG)
  }, [updateConfig])

  const clearMessages = React.useCallback(() => {
    setError(null)
    setSuccessMessage(null)
  }, [])

  return {
    config,
    isLoading,
    isSaving,
    error,
    successMessage,
    updateConfig,
    resetToDefault,
    refetch: fetchConfig,
    clearMessages,
  }
}
