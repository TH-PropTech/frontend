'use client'

import * as React from 'react'
import { apiClient } from '@/shared/api/api-client'
import { toast } from 'sonner'
import { ShieldCheck, Save, RotateCcw, Users, Loader2 } from 'lucide-react'
import { ToggleSwitch } from './components/permission-matrix/toggle-switch'
import { PERMISSION_MODULES } from './components/permission-matrix/modules-config'
import {
  ROLE_LABELS,
  buildDefaultMatrix,
} from './components/permission-matrix/types'
import type {
  RoleKey,
  MatrixByRole,
  UserRecord,
} from './components/permission-matrix/types'

// ─── RoleSelector ────────────────────────────────────────────────────────────

interface RoleSelectorProps {
  activeRole: RoleKey
  userCounts: Record<RoleKey, number>
  permCounts: { enabled: number; total: number }
  isLoadingUsers: boolean
  onChange: (role: RoleKey) => void
}

function RoleSelector({
  activeRole,
  userCounts,
  permCounts,
  isLoadingUsers,
  onChange,
}: RoleSelectorProps): React.ReactElement {
  return (
    <div className="grid grid-cols-3 gap-3">
      {(Object.keys(ROLE_LABELS) as RoleKey[]).map(role => {
        const cfg = ROLE_LABELS[role]
        const isActive = activeRole === role
        return (
          <button
            key={role}
            onClick={() => onChange(role)}
            className={`relative flex flex-col items-start gap-1.5 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
              isActive
                ? `${cfg.color} border-current shadow-sm`
                : 'bg-[color:var(--surface)] border-[color:var(--border)] hover:border-[color:var(--border-strong)] text-[color:var(--fg)]'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-bold">{cfg.label}</span>
              <span
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${isActive ? 'bg-current/20' : 'bg-[color:var(--fg)]/8'}`}
              >
                <span className={isActive ? '' : 'text-[color:var(--muted)]'}>
                  {isLoadingUsers ? '...' : `${userCounts[role]} người`}
                </span>
              </span>
            </div>
            <p
              className={`text-[10px] ${isActive ? 'opacity-80' : 'text-[color:var(--muted)]'}`}
            >
              {cfg.desc}
            </p>
            {isActive && (
              <div className="absolute bottom-2 right-3 text-[9px] font-bold opacity-60">
                {permCounts.enabled}/{permCounts.total} quyền
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}

// ─── ModuleRow ────────────────────────────────────────────────────────────────

interface ModuleRowProps {
  moduleKey: string
  label: string
  icon: React.ReactNode
  actions: { key: string; label: string }[]
  permissions: Record<string, boolean>
  roleLabel: string
  onToggle: (moduleKey: string, actionKey: string) => void
}

function ModuleRow({
  moduleKey,
  label,
  icon,
  actions,
  permissions,
  roleLabel,
  onToggle,
}: ModuleRowProps): React.ReactElement {
  return (
    <div className="px-5 py-4 hover:bg-[color:var(--surface-muted)]/20 transition-colors">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[color:var(--primary)]">{icon}</span>
        <span className="text-xs font-bold text-[color:var(--fg)]">
          {label}
        </span>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {actions.map(action => {
          const permKey = `${moduleKey}:${action.key}`
          const isOn = permissions[permKey] ?? false
          return (
            <div key={action.key} className="flex items-center gap-2.5">
              <ToggleSwitch
                checked={isOn}
                onChange={() => onToggle(moduleKey, action.key)}
                ariaLabel={`${isOn ? 'Tắt' : 'Bật'} quyền ${action.label} cho ${roleLabel}`}
              />
              <span
                className={`text-xs font-medium transition-colors ${isOn ? 'text-[color:var(--fg)]' : 'text-[color:var(--muted)]'}`}
              >
                {action.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Main View ────────────────────────────────────────────────────────────────

export function PermissionMatrixView(): React.ReactElement {
  const [activeRole, setActiveRole] = React.useState<RoleKey>('staff')
  const [matrix, setMatrix] = React.useState<MatrixByRole>(buildDefaultMatrix)
  const [isSaving, setIsSaving] = React.useState(false)
  const [hasChanges, setHasChanges] = React.useState(false)
  const [isLoadingUsers, setIsLoadingUsers] = React.useState(true)
  const [roleUserMap, setRoleUserMap] = React.useState<
    Record<RoleKey, UserRecord[]>
  >({
    staff: [],
    landlord: [],
    tenant: [],
  })

  // Load users and merge their saved permissions into initial matrix state
  React.useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        const users = await apiClient.get<UserRecord[]>('/users')
        const grouped: Record<RoleKey, UserRecord[]> = {
          staff: [],
          landlord: [],
          tenant: [],
        }
        const newMatrix = buildDefaultMatrix()

        for (const u of users) {
          if (
            u.role === 'staff' ||
            u.role === 'landlord' ||
            u.role === 'tenant'
          ) {
            grouped[u.role].push(u)
            if (
              u.metadata?.permissions &&
              Object.keys(u.metadata.permissions).length > 0
            ) {
              newMatrix[u.role] = {
                ...newMatrix[u.role],
                ...u.metadata.permissions,
              }
            }
          }
        }

        setRoleUserMap(grouped)
        setMatrix(newMatrix)
      } catch (err) {
        console.warn('Không thể tải danh sách người dùng:', err)
      } finally {
        setIsLoadingUsers(false)
      }
    }

    fetchUsers()
  }, [])

  const togglePermission = (moduleKey: string, actionKey: string): void => {
    const permKey = `${moduleKey}:${actionKey}`
    setMatrix(prev => ({
      ...prev,
      [activeRole]: {
        ...prev[activeRole],
        [permKey]: !prev[activeRole][permKey],
      },
    }))
    setHasChanges(true)
  }

  const handleReset = (): void => {
    setMatrix(buildDefaultMatrix())
    setHasChanges(false)
    toast.info('Đã khôi phục về cài đặt mặc định.')
  }

  const handleSave = async (): Promise<void> => {
    setIsSaving(true)
    try {
      const usersOfRole = roleUserMap[activeRole]
      if (usersOfRole.length === 0) {
        toast.info(
          `Không có người dùng nào với role "${ROLE_LABELS[activeRole].label}" để lưu.`
        )
        return
      }
      await Promise.all(
        usersOfRole.map(u =>
          apiClient.patch<unknown>(`/users/${u._id}/permissions`, {
            permissions: matrix[activeRole],
          })
        )
      )
      setHasChanges(false)
      toast.success(
        `Đã lưu phân quyền cho ${usersOfRole.length} tài khoản "${ROLE_LABELS[activeRole].label}"!`
      )
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Lưu phân quyền thất bại'
      )
    } finally {
      setIsSaving(false)
    }
  }

  const currentPerms = matrix[activeRole]
  const permValues = Object.values(currentPerms)
  const countEnabled = permValues.filter(Boolean).length
  const countTotal = permValues.length

  const userCounts: Record<RoleKey, number> = {
    staff: roleUserMap.staff.length,
    landlord: roleUserMap.landlord.length,
    tenant: roleUserMap.tenant.length,
  }

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[color:var(--fg)] font-marketing flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[color:var(--primary)]" />
            Ma trận Phân quyền
          </h2>
          <p className="text-xs text-[color:var(--muted)] mt-1">
            Bật / tắt từng quyền cho từng vai trò trong hệ thống.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {hasChanges && (
            <button
              onClick={handleReset}
              disabled={isSaving}
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-[color:var(--border)] text-[color:var(--muted)] hover:text-[color:var(--fg)] hover:bg-[color:var(--fg)]/5 transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Khôi phục
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={isSaving || isLoadingUsers}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-[color:var(--primary)] text-[color:var(--on-control)] hover:bg-[color:var(--primary-hover)] transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </div>
      </div>

      {/* Role Selector */}
      <RoleSelector
        activeRole={activeRole}
        userCounts={userCounts}
        permCounts={{ enabled: countEnabled, total: countTotal }}
        isLoadingUsers={isLoadingUsers}
        onChange={setActiveRole}
      />

      {/* Permission Table */}
      <div className="bg-[color:var(--surface)] border border-[color:var(--border)] rounded-2xl overflow-hidden shadow-[var(--shadow-sm)]">
        {/* Table header */}
        <div className="px-5 py-3.5 border-b border-[color:var(--border)] bg-[color:var(--surface-muted)]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-[color:var(--primary)]" />
            <span className="text-xs font-bold text-[color:var(--fg)]">
              Phân quyền:{' '}
              <span className={ROLE_LABELS[activeRole].color.split(' ')[0]}>
                {ROLE_LABELS[activeRole].label}
              </span>
            </span>
          </div>
          <span className="text-[10px] text-[color:var(--muted)] font-medium">
            {countEnabled} / {countTotal} quyền được bật
          </span>
        </div>

        {/* Module rows */}
        <div className="divide-y divide-[color:var(--border)]/50">
          {PERMISSION_MODULES.map(mod => (
            <ModuleRow
              key={mod.key}
              moduleKey={mod.key}
              label={mod.label}
              icon={mod.icon}
              actions={mod.actions}
              permissions={currentPerms}
              roleLabel={ROLE_LABELS[activeRole].label}
              onToggle={togglePermission}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-[color:var(--border)] bg-[color:var(--surface-muted)]/20 flex items-center justify-between">
          <span className="text-[10px] text-[color:var(--muted)]">
            Thay đổi sẽ áp dụng cho tất cả tài khoản có role tương ứng sau khi
            lưu.
          </span>
          {hasChanges && (
            <span className="text-[10px] font-bold text-[color:var(--warning)] bg-[color:var(--warning-soft)] px-2 py-0.5 rounded-full border border-[color:var(--warning)]/20">
              Có thay đổi chưa lưu
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
