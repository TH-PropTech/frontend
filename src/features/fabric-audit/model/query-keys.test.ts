import { describe, expect, it } from 'vitest'
import { fabricAuditKeys } from './query-keys'

describe('fabricAuditKeys', () => {
  it('scopes every key under one root so invalidation is predictable', () => {
    const keys = [
      fabricAuditKeys.overview(),
      fabricAuditKeys.events({ page: 1, limit: 20 }),
      fabricAuditKeys.event('e1'),
      fabricAuditKeys.governanceList({ page: 1, limit: 20 }),
      fabricAuditKeys.governanceVerification('g1'),
      fabricAuditKeys.runs({ page: 1, limit: 20 }),
      fabricAuditKeys.run('r1'),
      fabricAuditKeys.findings('r1', { page: 1, limit: 20 }),
    ]
    for (const key of keys) expect(key[0]).toBe('fabric-audit')
  })

  it('produces stable, filter-sensitive keys', () => {
    expect(fabricAuditKeys.events({ page: 1, limit: 20 })).toEqual(
      fabricAuditKeys.events({ page: 1, limit: 20 })
    )
    expect(fabricAuditKeys.events({ page: 1, limit: 20 })).not.toEqual(
      fabricAuditKeys.events({ page: 2, limit: 20 })
    )
    expect(fabricAuditKeys.findings('r1', { page: 1, limit: 20 })).not.toEqual(
      fabricAuditKeys.findings('r2', { page: 1, limit: 20 })
    )
  })

  it('exposes group prefixes used to refresh caches after mutations', () => {
    expect(fabricAuditKeys.runsRoot()).toEqual(['fabric-audit', 'runs'])
    const listKey = fabricAuditKeys.runs({ page: 1, limit: 20 })
    expect(listKey.slice(0, 2)).toEqual(fabricAuditKeys.runsRoot())
    expect(fabricAuditKeys.run('r1').slice(0, 2)).toEqual(
      fabricAuditKeys.runsRoot()
    )
    expect(fabricAuditKeys.findings('r1', { page: 1, limit: 20 })[1]).toBe(
      'runs'
    )
    expect(fabricAuditKeys.events({ page: 1, limit: 20 }).slice(0, 2)).toEqual(
      fabricAuditKeys.eventsRoot()
    )
    expect(fabricAuditKeys.event('e1').slice(0, 2)).toEqual(
      fabricAuditKeys.eventsRoot()
    )
    expect(fabricAuditKeys.overview()).toEqual(['fabric-audit', 'overview'])
  })
})
