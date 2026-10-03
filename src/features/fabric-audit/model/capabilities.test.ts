import { describe, expect, it } from 'vitest'
import { readStoredRoles, resolveFabricAuditCapability } from './capabilities'

describe('resolveFabricAuditCapability (D13)', () => {
  it('maps admin to operator with read access', () => {
    expect(resolveFabricAuditCapability(['admin'])).toEqual({
      canRead: true,
      canOperate: true,
    })
  })

  it('maps staff to read-only', () => {
    expect(resolveFabricAuditCapability(['staff'])).toEqual({
      canRead: true,
      canOperate: false,
    })
  })

  it('lets admin win when a user holds both roles', () => {
    expect(resolveFabricAuditCapability(['staff', 'admin']).canOperate).toBe(
      true
    )
  })

  it.each([[['tenant']], [['landlord']], [[]], [null], [undefined]])(
    'grants nothing to %j',
    roles => {
      expect(resolveFabricAuditCapability(roles)).toEqual({
        canRead: false,
        canOperate: false,
      })
    }
  )
})

describe('readStoredRoles', () => {
  it('reads roles from the stored user and tolerates malformed storage', () => {
    expect(readStoredRoles(JSON.stringify({ roles: ['staff'] }))).toEqual([
      'staff',
    ])
    expect(readStoredRoles(null)).toEqual([])
    expect(readStoredRoles('not json')).toEqual([])
    expect(readStoredRoles(JSON.stringify({ roles: 'admin' }))).toEqual([])
    expect(readStoredRoles(JSON.stringify({ roles: ['admin', 7] }))).toEqual([
      'admin',
    ])
  })
})
