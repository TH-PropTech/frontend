// ─── Types ────────────────────────────────────────────────────────────────────

export type RoleKey = 'staff' | 'landlord' | 'tenant'

export interface PermissionAction {
  key: string
  label: string
}

export interface PermissionModule {
  key: string
  label: string
  icon: React.ReactNode
  actions: PermissionAction[]
}

export type PermissionMatrix = Record<string, boolean>
export type MatrixByRole = Record<RoleKey, PermissionMatrix>

export interface UserRecord {
  _id: string
  fullName: string
  email: string
  role: RoleKey | 'admin'
  metadata?: {
    permissions?: PermissionMatrix
  } | null
}

// ─── Role Config ──────────────────────────────────────────────────────────────

export interface RoleConfig {
  label: string
  desc: string
  /** Tailwind classes for text + bg + border when active */
  color: string
}

export const ROLE_LABELS: Record<RoleKey, RoleConfig> = {
  staff: {
    label: 'Nhân viên',
    desc: 'Nhân viên vận hành hệ thống',
    color:
      'text-[color:var(--warning)] bg-[color:var(--warning-soft)] border-[color:var(--warning)]/30',
  },
  landlord: {
    label: 'Chủ nhà',
    desc: 'Chủ sở hữu bất động sản',
    color:
      'text-[color:var(--info)] bg-[color:var(--info-soft)] border-[color:var(--info)]/30',
  },
  tenant: {
    label: 'Khách thuê',
    desc: 'Người thuê căn hộ',
    color:
      'text-[color:var(--success)] bg-[color:var(--success-soft)] border-[color:var(--success)]/30',
  },
}

// ─── Build default matrix ─────────────────────────────────────────────────────

export function buildDefaultMatrix(): MatrixByRole {
  const staffDefaults: PermissionMatrix = {
    'apartments:view': true,
    'apartments:create': false,
    'apartments:update': true,
    'apartments:delete': false,
    'apartments:approve': true,
    'users:view': true,
    'users:update': false,
    'users:delete': false,
    'kyc:view': true,
    'kyc:approve': true,
    'bookings:view': true,
    'bookings:create': false,
    'bookings:update': true,
    'bookings:approve': true,
    'contracts:view': true,
    'contracts:create': true,
    'contracts:update': true,
    'payments:view': true,
    'payments:update': true,
    'disputes:view': true,
    'disputes:approve': true,
    'notifications:view': true,
    'notifications:create': true,
    'reports:view': true,
    'reports:export': false,
    'community:view': true,
    'community:create': false,
    'community:delete': true,
    'community:approve': true,
  }

  const landlordDefaults: PermissionMatrix = {
    'apartments:view': true,
    'apartments:create': true,
    'apartments:update': true,
    'apartments:delete': false,
    'apartments:approve': false,
    'users:view': false,
    'users:update': false,
    'users:delete': false,
    'kyc:view': false,
    'kyc:approve': false,
    'bookings:view': true,
    'bookings:create': false,
    'bookings:update': true,
    'bookings:approve': true,
    'contracts:view': true,
    'contracts:create': false,
    'contracts:update': false,
    'payments:view': true,
    'payments:update': false,
    'disputes:view': true,
    'disputes:approve': false,
    'notifications:view': true,
    'notifications:create': false,
    'reports:view': false,
    'reports:export': false,
    'community:view': true,
    'community:create': true,
    'community:delete': false,
    'community:approve': false,
  }

  const tenantDefaults: PermissionMatrix = {
    'apartments:view': true,
    'apartments:create': false,
    'apartments:update': false,
    'apartments:delete': false,
    'apartments:approve': false,
    'users:view': false,
    'users:update': false,
    'users:delete': false,
    'kyc:view': false,
    'kyc:approve': false,
    'bookings:view': true,
    'bookings:create': true,
    'bookings:update': false,
    'bookings:approve': false,
    'contracts:view': true,
    'contracts:create': false,
    'contracts:update': false,
    'payments:view': true,
    'payments:update': true,
    'disputes:view': true,
    'disputes:approve': false,
    'notifications:view': true,
    'notifications:create': false,
    'reports:view': false,
    'reports:export': false,
    'community:view': true,
    'community:create': true,
    'community:delete': false,
    'community:approve': false,
  }

  return {
    staff: staffDefaults,
    landlord: landlordDefaults,
    tenant: tenantDefaults,
  }
}
