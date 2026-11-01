import * as React from 'react'
import { toast } from 'sonner'
import { apiClient } from '@/shared/api/api-client'
import type { ProfileDataStatus, UserSession } from './types'

interface SessionsApiResponse {
  items: Array<{
    id: string
    deviceLabel: string
    ipMasked: string
    lastActiveAt: string
    isCurrent: boolean
  }>
}

export function useSessions() {
  const [sessions, setSessions] = React.useState<UserSession[]>([])
  const [status, setStatus] = React.useState<ProfileDataStatus>('loading')

  const fetchSessions = React.useCallback(async () => {
    setStatus('loading')
    try {
      const res = await apiClient.get<SessionsApiResponse>('/users/me/sessions')
      const items = res?.items ?? []
      setSessions(items)
      setStatus('ready')
    } catch (err) {
      console.error('Failed to load sessions:', err)
      setStatus('error')
    }
  }, [])

  React.useEffect(() => {
    let ignore = false
    apiClient
      .get<SessionsApiResponse>('/users/me/sessions')
      .then(res => {
        if (!ignore) {
          setSessions(res?.items ?? [])
          setStatus('ready')
        }
      })
      .catch(err => {
        if (!ignore) {
          console.error('Failed to load sessions:', err)
          setStatus('error')
        }
      })
    return () => {
      ignore = true
    }
  }, [])

  const revokeSession = React.useCallback(async (id: string) => {
    try {
      await apiClient.delete(`/users/me/sessions/${id}`)
      setSessions(prev => prev.filter(s => s.id !== id))
      toast.success('Đã thu hồi phiên đăng nhập thành công')
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Không thể thu hồi phiên đăng nhập'
      toast.error(message)
    }
  }, [])

  return {
    sessions,
    status,
    retry: fetchSessions,
    revokeSession,
  }
}
