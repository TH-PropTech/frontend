'use client'

import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { apiClient } from '@/shared/api'

/** Hành động và đối tượng khớp `RBAC_ACTIONS` / `RBAC_SUBJECTS` của backend (module rbac). */
export type PermissionAction =
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'approve'
export type PermissionSubject =
  | 'Kyc'
  | 'Apartment'
  | 'Booking'
  | 'CommunityPost'
  | 'SupportTicket'
  | 'SafetyReport'
  | 'DesignRequest'
  | 'Payment'
  | 'Contract'
  | 'RentalApplication'
  | 'Wallet'
  | 'Payout'
  | 'AuditLog'
  | 'Report'
  | 'SavedSearch'
  | 'ViewingNote'

export interface MyPermissions {
  isAdmin: boolean
  /** Dạng `'read:Kyc': true`. */
  permissions: Record<string, boolean>
}

export const myPermissionsKey = ['rbac', 'me-permissions'] as const

export function useMyPermissions(enabled = true, userKey = 'me') {
  return useQuery({
    queryKey: [...myPermissionsKey, userKey],
    queryFn: () => apiClient.get<MyPermissions>('/rbac/me/permissions'),
    staleTime: 30_000,
    enabled,
  })
}

type Can = (action: PermissionAction, subject: PermissionSubject) => boolean

const PermissionsContext = React.createContext<Record<string, boolean> | null>(
  null
)

export function PermissionsProvider({
  permissions,
  children,
}: {
  permissions: Record<string, boolean> | null
  children: React.ReactNode
}): React.ReactElement {
  return (
    <PermissionsContext.Provider value={permissions}>
      {children}
    </PermissionsContext.Provider>
  )
}

/**
 * Hỏi người dùng hiện tại có được làm `action` trên `subject` không, để ẩn nút. Chưa tải được hoặc
 * không có provider thì coi là được: việc chặn thật nằm ở backend (`PermissionsGuard`), giao diện
 * chỉ để khỏi hiện nút bấm vào sẽ bị từ chối.
 */
export function useCan(): Can {
  const permissions = React.useContext(PermissionsContext)
  return React.useCallback(
    (action, subject) => permissions?.[`${action}:${subject}`] ?? true,
    [permissions]
  )
}

/** Khóa người dùng đang đăng nhập (để không dùng nhầm quyền của người trước), hoặc null nếu chưa đăng nhập. */
function currentUserKey(): string | null {
  try {
    if (!window.localStorage.getItem('accessToken')) return null
    const raw = window.localStorage.getItem('user')
    const user = raw ? (JSON.parse(raw) as { email?: string }) : null
    return user?.email ?? 'me'
  } catch {
    return null
  }
}

/**
 * Tải quyền của người đang đăng nhập một lần cho cả ứng dụng và cấp cho `useCan`. Khách chưa đăng
 * nhập không gọi API. Đọc lại khi đổi trang để bắt được lần đăng nhập mới.
 */
export function PermissionsLoader({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  usePathname()
  const userKey = typeof window === 'undefined' ? null : currentUserKey()
  const query = useMyPermissions(userKey !== null, userKey ?? 'guest')
  return (
    <PermissionsProvider
      permissions={userKey ? (query.data?.permissions ?? null) : null}
    >
      {children}
    </PermissionsProvider>
  )
}
