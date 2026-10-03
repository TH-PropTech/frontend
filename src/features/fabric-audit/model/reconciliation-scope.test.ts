import { describe, expect, it } from 'vitest'
import {
  MAX_RECONCILIATION_DAYS,
  parseContractIds,
  validateReconciliationScope,
} from './reconciliation-scope'

const OBJECT_ID_A = '66f000000000000000000001'
const OBJECT_ID_B = '66f000000000000000000002'

describe('parseContractIds', () => {
  it('splits on commas, whitespace and newlines and de-duplicates', () => {
    expect(
      parseContractIds(`${OBJECT_ID_A}, ${OBJECT_ID_B}\n${OBJECT_ID_A}`)
    ).toEqual([OBJECT_ID_A, OBJECT_ID_B])
  })

  it('returns an empty list for blank input', () => {
    expect(parseContractIds('  \n ')).toEqual([])
  })
})

describe('validateReconciliationScope', () => {
  it('rejects an unbounded request (no range and no contracts)', () => {
    const result = validateReconciliationScope({
      from: '',
      to: '',
      contractIds: '',
      eventTypes: [],
    })
    expect(result).toEqual({
      ok: false,
      errors: { scope: 'RECONCILIATION_SCOPE_REQUIRED' },
    })
  })

  it('rejects a range with only one bound', () => {
    expect(
      validateReconciliationScope({
        from: '2026-09-01',
        to: '',
        contractIds: '',
        eventTypes: [],
      })
    ).toEqual({ ok: false, errors: { scope: 'RECONCILIATION_SCOPE_REQUIRED' } })
  })

  it('rejects an inverted range', () => {
    const result = validateReconciliationScope({
      from: '2026-09-30',
      to: '2026-09-01',
      contractIds: '',
      eventTypes: [],
    })
    expect(result).toEqual({
      ok: false,
      errors: { range: 'RECONCILIATION_RANGE_INVERTED' },
    })
  })

  it('rejects a range longer than the server maximum', () => {
    const result = validateReconciliationScope({
      from: '2026-01-01',
      to: '2026-06-01',
      contractIds: '',
      eventTypes: [],
    })
    expect(result).toEqual({
      ok: false,
      errors: { range: 'RECONCILIATION_RANGE_TOO_LONG' },
    })
    expect(MAX_RECONCILIATION_DAYS).toBe(92)
  })

  it('accepts a range of exactly the maximum length', () => {
    const result = validateReconciliationScope({
      from: '2026-07-01',
      to: '2026-09-30',
      contractIds: '',
      eventTypes: [],
    })
    expect(result.ok).toBe(true)
  })

  it('rejects malformed contract identifiers', () => {
    expect(
      validateReconciliationScope({
        from: '',
        to: '',
        contractIds: 'contract-1',
        eventTypes: [],
      })
    ).toEqual({
      ok: false,
      errors: { contractIds: 'RECONCILIATION_CONTRACT_ID_INVALID' },
    })
  })

  it('rejects more than 500 contracts', () => {
    const ids = Array.from({ length: 501 }, (_, index) =>
      index.toString(16).padStart(24, '0')
    ).join(',')
    expect(
      validateReconciliationScope({
        from: '',
        to: '',
        contractIds: ids,
        eventTypes: [],
      })
    ).toEqual({
      ok: false,
      errors: { contractIds: 'RECONCILIATION_CONTRACT_LIMIT_EXCEEDED' },
    })
  })

  it('builds a range request with inclusive ISO bounds and event types', () => {
    const result = validateReconciliationScope({
      from: '2026-09-01',
      to: '2026-09-30',
      contractIds: '',
      eventTypes: ['contract.activated', 'handover.completed'],
    })
    expect(result).toEqual({
      ok: true,
      value: {
        from: '2026-09-01T00:00:00.000Z',
        to: '2026-09-30T23:59:59.999Z',
        eventTypes: ['contract.activated', 'handover.completed'],
      },
    })
  })

  it('builds a contract-scoped request and omits unused fields', () => {
    const result = validateReconciliationScope({
      from: '',
      to: '',
      contractIds: `${OBJECT_ID_A}\n${OBJECT_ID_B}`,
      eventTypes: [],
    })
    expect(result).toEqual({
      ok: true,
      value: { contractIds: [OBJECT_ID_A, OBJECT_ID_B] },
    })
  })
})
