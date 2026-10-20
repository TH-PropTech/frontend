'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/shared/api'
import { myPermissionsKey } from '@/shared/lib/permissions'
import type {
  PermissionAction,
  PermissionSubject,
} from '@/shared/lib/permissions'

/** Vai trò gốc admin điều chỉnh được. Admin luôn toàn quyền nên không có trong danh sách. */
export type ManagedRole = 'tenant' | 'landlord' | 'staff'

export interface RoleTab {
  /** Mã vai trò (`Role.name`): `tenant`, `landlord`, `staff` hoặc mã vai trò tùy chỉnh. */
  key: string
  label: string
  description: string
  /** Vai trò gốc: quyết định bảng thao tác hiển thị. Vai trò gốc thì chính là nó. */
  baseRole: ManagedRole
  /** Vai trò tùy chỉnh do admin tạo (có thể gán người dùng và xóa). */
  custom: boolean
  roleId: string
}

const BASE_ROLES: ReadonlyArray<{
  key: ManagedRole
  label: string
  description: string
}> = [
  {
    key: 'tenant',
    label: 'Khách thuê',
    description: 'Người tìm và thuê căn hộ: đặt lịch, nộp hồ sơ, ký hợp đồng.',
  },
  {
    key: 'landlord',
    label: 'Chủ nhà',
    description:
      'Người đăng căn hộ cho thuê: quản lý tin, duyệt hồ sơ, nhận tiền.',
  },
  {
    key: 'staff',
    label: 'Nhân viên',
    description:
      'Nhân viên vận hành: duyệt KYC và tin đăng, hỗ trợ, xử lý yêu cầu.',
  },
]

export const BASE_ROLE_LABELS: Record<ManagedRole, string> = {
  tenant: 'Khách thuê',
  landlord: 'Chủ nhà',
  staff: 'Nhân viên',
}

export const ACTION_COLUMNS: ReadonlyArray<{
  action: PermissionAction
  label: string
}> = [
  { action: 'read', label: 'Xem' },
  { action: 'create', label: 'Tạo' },
  { action: 'update', label: 'Sửa' },
  { action: 'delete', label: 'Xóa' },
  { action: 'approve', label: 'Duyệt' },
]

/** Tên hiển thị và mã của từng đối tượng. Đối tượng lạ hiển thị theo mã. */
export const SUBJECT_META: Record<string, { label: string; code: string }> = {
  Kyc: { label: 'Xác minh KYC', code: 'KYC' },
  Apartment: { label: 'Căn hộ & tin đăng', code: 'APARTMENT' },
  Booking: { label: 'Lịch hẹn xem nhà', code: 'BOOKING' },
  RentalApplication: { label: 'Hồ sơ thuê', code: 'RENTAL_APPLICATION' },
  Contract: { label: 'Hợp đồng', code: 'CONTRACT' },
  Payment: { label: 'Thanh toán', code: 'PAYMENT' },
  Wallet: { label: 'Ví nhận tiền', code: 'WALLET' },
  Payout: { label: 'Chi trả cho chủ nhà', code: 'PAYOUT' },
  CommunityPost: { label: 'Cộng đồng', code: 'COMMUNITY' },
  SupportTicket: { label: 'Hỗ trợ & SLA', code: 'SUPPORT' },
  SafetyReport: { label: 'Báo cáo an toàn', code: 'SAFETY_REPORT' },
  DesignRequest: { label: 'Thiết kế 3D', code: 'DESIGN_REQUEST' },
  AuditLog: { label: 'Kiểm toán Fabric', code: 'AUDIT_LOG' },
  Report: { label: 'Thống kê tổng quan', code: 'REPORT' },
  SavedSearch: { label: 'Tìm kiếm đã lưu', code: 'SAVED_SEARCH' },
  ViewingNote: { label: 'Ghi chú xem nhà', code: 'VIEWING_NOTE' },
}

export const subjectMeta = (subject: string): { label: string; code: string } =>
  SUBJECT_META[subject] ?? { label: subject, code: subject.toUpperCase() }

export interface SchemaRow {
  subject: PermissionSubject
  actions: PermissionAction[]
}

export type PermissionSchema = Record<ManagedRole, SchemaRow[]>

export interface RolePermissionEntry {
  action: string
  subject: string
  allowed: boolean
}

interface RoleSummary {
  _id: string
  name: string
  label?: string | null
  description?: string
  baseRole?: string | null
  isActive?: boolean
}

export interface RoleMatrixData {
  schema: PermissionSchema
  tabs: RoleTab[]
  /** Mọi mục của role theo mã, kể cả mục ngoài ma trận, cần giữ nguyên khi lưu. */
  entries: Record<string, RolePermissionEntry[]>
}

const isManaged = (value: string | null | undefined): value is ManagedRole =>
  value === 'tenant' || value === 'landlord' || value === 'staff'

/** Cùng thứ tự ưu tiên với backend (`isAllowed`); không có mục nào thì được phép. */
export function resolveCell(
  entries: readonly RolePermissionEntry[],
  action: string,
  subject: string
): boolean {
  const find = (a: string, s: string): RolePermissionEntry | undefined =>
    entries.find(e => e.action === a && e.subject === s)
  const hit =
    find(action, subject) ??
    find('manage', subject) ??
    find(action, 'all') ??
    find('manage', 'all')
  return hit ? hit.allowed : true
}

export type CellState = Record<string, boolean>

export const cellKey = (action: string, subject: string): string =>
  `${action}:${subject}`

/** Trạng thái bật/tắt hiện tại của mọi ô mà backend thật sự kiểm tra cho vai trò này. */
export function toCellState(
  schema: readonly SchemaRow[],
  entries: readonly RolePermissionEntry[]
): CellState {
  const state: CellState = {}
  for (const row of schema) {
    for (const action of row.actions) {
      state[cellKey(action, row.subject)] = resolveCell(
        entries,
        action,
        row.subject
      )
    }
  }
  return state
}

/** Ghi đè các ô của ma trận, giữ nguyên mọi mục khác của role. */
export function toEntries(
  existing: readonly RolePermissionEntry[],
  state: CellState
): RolePermissionEntry[] {
  const matrixKeys = new Set(Object.keys(state))
  const kept = existing.filter(
    e => !matrixKeys.has(cellKey(e.action, e.subject))
  )
  const cells = Object.entries(state).map(([key, allowed]) => {
    const [action = '', subject = ''] = key.split(':')
    return { action, subject, allowed }
  })
  return [...kept, ...cells]
}

/** Mã vai trò gợi ý từ tên hiển thị: chữ thường không dấu, nối bằng gạch ngang. */
export function slugifyRoleName(label: string): string {
  return label
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/gi, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
}

export const ROLE_CODE_PATTERN = /^[a-z][a-z0-9_-]{2,39}$/
export const RESERVED_ROLE_CODES: readonly string[] = [
  'admin',
  'tenant',
  'landlord',
  'staff',
  'all',
  'me',
]

const roleMatrixKey = ['rbac', 'role-matrix'] as const

export function useRoleMatrix() {
  return useQuery({
    queryKey: roleMatrixKey,
    queryFn: async (): Promise<RoleMatrixData> => {
      const [schema, roleList] = await Promise.all([
        apiClient.get<PermissionSchema>('/rbac/permission-schema'),
        apiClient.get<RoleSummary[]>('/rbac/roles'),
      ])
      const tabs: RoleTab[] = []
      for (const base of BASE_ROLES) {
        const role = roleList.find(r => r.name === base.key)
        if (!role) throw new Error(`ROLE_NOT_FOUND:${base.key}`)
        tabs.push({
          key: base.key,
          label: base.label,
          description: base.description,
          baseRole: base.key,
          custom: false,
          roleId: role._id,
        })
      }
      const customRoles = roleList
        .filter(r => isManaged(r.baseRole) && r.isActive !== false)
        .sort((a, b) => a.name.localeCompare(b.name))
      for (const role of customRoles) {
        if (!isManaged(role.baseRole)) continue
        tabs.push({
          key: role.name,
          label: role.label || role.name,
          description:
            role.description ||
            `Vai trò tùy chỉnh dựa trên ${BASE_ROLE_LABELS[role.baseRole].toLowerCase()}.`,
          baseRole: role.baseRole,
          custom: true,
          roleId: role._id,
        })
      }
      const lists = await Promise.all(
        tabs.map(tab =>
          apiClient.get<RolePermissionEntry[]>(
            `/rbac/roles/${encodeURIComponent(tab.roleId)}/permissions`
          )
        )
      )
      const entries: Record<string, RolePermissionEntry[]> = {}
      tabs.forEach((tab, index) => {
        entries[tab.key] = (lists[index] ?? []).map(e => ({
          action: e.action,
          subject: e.subject,
          allowed: e.allowed,
        }))
      })
      return { schema, tabs, entries }
    },
  })
}

function useInvalidateMatrix(): () => Promise<void> {
  const queryClient = useQueryClient()
  return async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: roleMatrixKey }),
      queryClient.invalidateQueries({ queryKey: myPermissionsKey }),
      queryClient.invalidateQueries({ queryKey: roleUsersKey }),
    ])
  }
}

export function useSaveRolePermissions() {
  const invalidate = useInvalidateMatrix()
  return useMutation({
    mutationFn: async ({
      roleId,
      entries,
    }: {
      roleId: string
      entries: RolePermissionEntry[]
    }) =>
      apiClient.put<unknown>(
        `/rbac/roles/${encodeURIComponent(roleId)}/permissions`,
        { permissions: entries }
      ),
    onSuccess: invalidate,
  })
}

export interface CreateRoleInput {
  name: string
  label: string
  description?: string
  baseRole: ManagedRole
}

export function useCreateRole() {
  const invalidate = useInvalidateMatrix()
  return useMutation({
    mutationFn: (input: CreateRoleInput) =>
      apiClient.post<{ _id: string; name: string }>('/rbac/roles', input),
    onSuccess: invalidate,
  })
}

export function useDeleteRole() {
  const invalidate = useInvalidateMatrix()
  return useMutation({
    mutationFn: (roleId: string) =>
      apiClient.delete<unknown>(`/rbac/roles/${encodeURIComponent(roleId)}`),
    onSuccess: invalidate,
  })
}

export interface AssignableUser {
  _id: string
  fullName: string
  email: string
  role: string
  permissionProfile?: string | null
}

const roleUsersKey = ['rbac', 'role-users'] as const

/** Danh sách người dùng (chỉ admin gọi được) để gán vào vai trò tùy chỉnh và đếm thành viên. */
export function useAssignableUsers() {
  return useQuery({
    queryKey: roleUsersKey,
    queryFn: async (): Promise<AssignableUser[]> => {
      const users = await apiClient.get<AssignableUser[]>('/users')
      return users.map(u => ({
        _id: u._id,
        fullName: u.fullName,
        email: u.email,
        role: u.role,
        permissionProfile: u.permissionProfile ?? null,
      }))
    },
  })
}

export function useSetRoleUsers() {
  const invalidate = useInvalidateMatrix()
  return useMutation({
    mutationFn: ({ roleId, userIds }: { roleId: string; userIds: string[] }) =>
      apiClient.put<{ assigned: number; removed: number }>(
        `/rbac/roles/${encodeURIComponent(roleId)}/users`,
        { userIds }
      ),
    onSuccess: invalidate,
  })
}
