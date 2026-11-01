import * as React from 'react'
import { toast } from 'sonner'
import { apiClient } from '@/shared/api/api-client'

export interface NotificationPreferences {
  email: boolean
  push: boolean
}

export function useNotificationPreferences() {
  const [preferences, setPreferences] = React.useState<NotificationPreferences>(
    {
      email: true,
      push: true,
    }
  )
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function load() {
      try {
        const res = await apiClient.get<Partial<NotificationPreferences>>(
          '/users/me/notification-preferences'
        )
        if (res) {
          setPreferences({
            email: res.email ?? true,
            push: res.push ?? true,
          })
        }
      } catch (err) {
        console.error('Failed to load notification preferences:', err)
      } finally {
        setIsLoading(false)
      }
    }
    void load()
  }, [])

  const togglePreference = React.useCallback(
    async (key: keyof NotificationPreferences) => {
      const prev = preferences
      const next = {
        ...prev,
        [key]: !prev[key],
      }

      // Optimistic update
      setPreferences(next)

      try {
        await apiClient.put('/users/me/notification-preferences', next)
        toast.success('Đã cập nhật tùy chọn thông báo')
      } catch (err) {
        // Rollback
        setPreferences(prev)
        const message =
          err instanceof Error ? err.message : 'Không thể lưu cài đặt thông báo'
        toast.error(message)
      }
    },
    [preferences]
  )

  return {
    preferences,
    isLoading,
    togglePreference,
    setPreferences,
  }
}
