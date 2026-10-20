'use client'

import * as React from 'react'
import { ConsoleDashboard } from './console-dashboard'
import { AdminCard } from '@/shared/ui/admin-card'

interface LocalStorageUser {
  name: string
  email: string
  roles: string[]
}

export function StaffDashboard(): React.ReactElement {
  const [user, setUser] = React.useState<LocalStorageUser | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('user')
        if (stored) {
          const parsed = JSON.parse(stored)
          if (parsed && parsed.name && parsed.email && parsed.roles) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser({
              name: parsed.name,
              email: parsed.email,
              roles: parsed.roles,
            })
          }
        }
      } catch (e) {
        console.warn('Failed to parse user from localStorage:', e)
      } finally {
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg text-fg flex items-center justify-center font-body">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold text-muted">
            Đang tải dữ liệu vận hành...
          </span>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-bg text-fg flex items-center justify-center font-body">
        <AdminCard className="text-center p-6 max-w-sm">
          <h2 className="text-sm font-bold text-danger font-display">
            Yêu cầu đăng nhập
          </h2>
          <p className="text-xs text-muted mt-2">
            Vui lòng đăng nhập bằng tài khoản Quản trị viên hoặc Nhân viên vận
            hành để truy cập trang này.
          </p>
        </AdminCard>
      </div>
    )
  }

  return <ConsoleDashboard initialUser={user} />
}
