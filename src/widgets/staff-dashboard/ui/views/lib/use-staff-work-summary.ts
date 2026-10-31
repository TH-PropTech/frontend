'use client'

import * as React from 'react'
import { apiClient } from '@/shared/api/api-client'

export interface OperationsStats {
  bookings: {
    total: number
    pending: number
    confirmed: number
    cancelled: number
    completed: number
  }
  kyc: { total: number; pending: number; verified: number; rejected: number }
  apartments: {
    total: number
    pending: number
    available: number
    rejected: number
  }
  tickets: { total: number; open: number; inProgress: number; resolved: number }
}

export interface StaffWorkSummary {
  loading: boolean
  error: string | null
  stats: OperationsStats | null
  kycPendingCount: number
  apartmentsPendingCount: number
  ticketsOpenCount: number
  refetch: () => void
}

export function useStaffWorkSummary(): StaffWorkSummary {
  const [stats, setStats] = React.useState<OperationsStats | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [fetchKey, setFetchKey] = React.useState(0)

  const refetch = React.useCallback((): void => {
    setLoading(true)
    setFetchKey(k => k + 1)
  }, [])

  React.useEffect(() => {
    let cancelled = false
    apiClient
      .get<OperationsStats>('/operations/stats')
      .then(data => {
        if (!cancelled) setStats(data)
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'Không thể tải thống kê'
          )
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [fetchKey])

  return {
    loading,
    error,
    stats,
    kycPendingCount: stats?.kyc?.pending ?? 0,
    apartmentsPendingCount: stats?.apartments?.pending ?? 0,
    ticketsOpenCount: stats?.tickets?.open ?? 0,
    refetch,
  }
}
