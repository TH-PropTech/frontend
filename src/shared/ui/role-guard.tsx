'use client'

import * as React from 'react'
import { useRouter, usePathname, notFound } from 'next/navigation'
import type { Route } from 'next'
import { toast } from 'sonner'

interface UserStored {
  roles?: string[]
}

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles: string[]
}

export function RoleGuard({
  children,
  allowedRoles,
}: RoleGuardProps): React.ReactElement | null {
  const router = useRouter()
  const pathname = usePathname()
  const [status, setStatus] = React.useState<
    'checking' | 'authorized' | 'forbidden'
  >('checking')

  React.useEffect(() => {
    const checkAuth = () => {
      const userStr = localStorage.getItem('user')
      if (!userStr) {
        toast.error('Vui lòng đăng nhập để truy cập trang này')
        router.replace('/login' as Route)
        return
      }

      try {
        const user = JSON.parse(userStr) as UserStored
        const userRoles = user.roles || []

        const hasPermission = allowedRoles.some(role =>
          userRoles.includes(role)
        )

        if (!hasPermission) {
          setStatus('forbidden')
        } else {
          setStatus('authorized')
        }
      } catch (e) {
        console.error('Error parsing user data:', e)
        router.replace('/login' as Route)
      }
    }

    checkAuth()
  }, [router, allowedRoles, pathname])

  if (status === 'forbidden') {
    notFound()
  }

  if (status === 'checking') {
    return null
  }

  return <>{children}</>
}
