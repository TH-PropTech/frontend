export interface FabricAuditCapability {
  /** Audit Center read views, governance list/detail/verify, reconciliation list/detail/findings. */
  canRead: boolean
  /** Governance publication and reconciliation start/resume/cancel/repair (design D13). */
  canOperate: boolean
}

const NONE: FabricAuditCapability = { canRead: false, canOperate: false }

/**
 * The single place that maps JWT roles to Audit Center capabilities (D13): `admin` is the operator,
 * `staff` is read-only. This only shapes the UI; the API still enforces the same rule with `@Roles`.
 */
export function resolveFabricAuditCapability(
  roles: readonly string[] | null | undefined
): FabricAuditCapability {
  if (!roles) return NONE
  if (roles.includes('admin')) return { canRead: true, canOperate: true }
  if (roles.includes('staff')) return { canRead: true, canOperate: false }
  return NONE
}

/** Reads the role list from the serialized `user` entry the auth feature keeps in localStorage. */
export function readStoredRoles(serializedUser: string | null): string[] {
  if (!serializedUser) return []
  try {
    const parsed: unknown = JSON.parse(serializedUser)
    if (typeof parsed !== 'object' || parsed === null) return []
    const roles = (parsed as { roles?: unknown }).roles
    return Array.isArray(roles)
      ? roles.filter((role): role is string => typeof role === 'string')
      : []
  } catch {
    return []
  }
}
