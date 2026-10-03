import { describe, expect, it } from 'vitest'
import {
  DEFAULT_AUDIT_FILTERS,
  parseAuditFilters,
  parseAuditTab,
  serializeAuditSearch,
  toAuditEventsQuery,
  validateAuditFilters,
} from './audit-filters'

describe('parseAuditFilters', () => {
  it('returns defaults for an empty query string', () => {
    expect(parseAuditFilters(new URLSearchParams())).toEqual(
      DEFAULT_AUDIT_FILTERS
    )
  })

  it('reads every supported filter', () => {
    const filters = parseAuditFilters(
      new URLSearchParams(
        'contractId=c-1&eventType=handover.completed&state=failed&verification=mismatch&from=2026-09-01&to=2026-09-30&txId=tx_1&page=3'
      )
    )
    expect(filters).toEqual({
      contractId: 'c-1',
      eventType: 'handover.completed',
      state: 'failed',
      verificationState: 'mismatch',
      from: '2026-09-01',
      to: '2026-09-30',
      txId: 'tx_1',
      page: 3,
      limit: 20,
    })
  })

  it('drops unsupported enum values, malformed dates and unsafe identifiers', () => {
    const filters = parseAuditFilters(
      new URLSearchParams(
        'state=done&verification=ok&eventType=nope&from=yesterday&to=2026-13-40&contractId=a%20b&txId=<script>'
      )
    )
    expect(filters).toEqual(DEFAULT_AUDIT_FILTERS)
  })

  it('clamps non-positive or non-numeric pages to 1', () => {
    expect(parseAuditFilters(new URLSearchParams('page=0')).page).toBe(1)
    expect(parseAuditFilters(new URLSearchParams('page=-4')).page).toBe(1)
    expect(parseAuditFilters(new URLSearchParams('page=abc')).page).toBe(1)
    expect(parseAuditFilters(new URLSearchParams('page=2.5')).page).toBe(1)
  })
})

describe('serializeAuditSearch', () => {
  it('omits defaults so the URL stays minimal', () => {
    expect(serializeAuditSearch({ filters: DEFAULT_AUDIT_FILTERS })).toBe('')
  })

  it('round-trips filters, tab and selected event through the query string', () => {
    const filters = {
      ...DEFAULT_AUDIT_FILTERS,
      contractId: 'c-1',
      eventType: 'move-in.settled',
      state: 'pending' as const,
      verificationState: 'unavailable' as const,
      from: '2026-09-01',
      to: '2026-09-30',
      txId: 'tx-9',
      page: 2,
    }
    const search = serializeAuditSearch({
      filters,
      tab: 'events',
      eventId: '66f0000000000000000000a1',
    })
    const params = new URLSearchParams(search)
    expect(parseAuditFilters(params)).toEqual(filters)
    expect(params.get('event')).toBe('66f0000000000000000000a1')
    expect(params.get('tab')).toBe('events')
  })

  it('serializes the active tab', () => {
    const search = serializeAuditSearch({
      filters: DEFAULT_AUDIT_FILTERS,
      tab: 'reconciliation',
    })
    expect(search).toBe('tab=reconciliation')
  })
})

describe('parseAuditTab', () => {
  it('defaults to the overview and rejects unknown tabs', () => {
    expect(parseAuditTab(new URLSearchParams())).toBe('overview')
    expect(parseAuditTab(new URLSearchParams('tab=reconciliation'))).toBe(
      'reconciliation'
    )
    expect(parseAuditTab(new URLSearchParams('tab=governance'))).toBe(
      'governance'
    )
    expect(parseAuditTab(new URLSearchParams('tab=admin'))).toBe('overview')
  })
})

describe('toAuditEventsQuery', () => {
  it('maps date-only filters to inclusive ISO bounds and omits blanks', () => {
    expect(
      toAuditEventsQuery({
        ...DEFAULT_AUDIT_FILTERS,
        from: '2026-09-01',
        to: '2026-09-30',
        page: 2,
      })
    ).toEqual({
      page: 2,
      limit: 20,
      from: '2026-09-01T00:00:00.000Z',
      to: '2026-09-30T23:59:59.999Z',
    })
  })

  it('passes server-side filters through unchanged', () => {
    expect(
      toAuditEventsQuery({
        ...DEFAULT_AUDIT_FILTERS,
        contractId: 'c-1',
        eventType: 'deposit.paid',
        state: 'retryable',
        verificationState: 'verified',
        txId: 'tx-1',
      })
    ).toEqual({
      page: 1,
      limit: 20,
      contractId: 'c-1',
      eventType: 'deposit.paid',
      state: 'retryable',
      verificationState: 'verified',
      txId: 'tx-1',
    })
  })
})

describe('validateAuditFilters', () => {
  it('accepts defaults and well-formed filters', () => {
    expect(validateAuditFilters(DEFAULT_AUDIT_FILTERS)).toBeNull()
    expect(
      validateAuditFilters({
        ...DEFAULT_AUDIT_FILTERS,
        contractId: 'c-1',
        txId: 'tx:1.a',
        from: '2026-09-01',
        to: '2026-09-01',
      })
    ).toBeNull()
  })

  it('rejects unsafe identifiers and an inverted range', () => {
    expect(
      validateAuditFilters({ ...DEFAULT_AUDIT_FILTERS, contractId: 'a b' })
    ).toMatch(/Mã hợp đồng/)
    expect(
      validateAuditFilters({ ...DEFAULT_AUDIT_FILTERS, txId: '<x>' })
    ).toMatch(/Mã giao dịch/)
    expect(
      validateAuditFilters({
        ...DEFAULT_AUDIT_FILTERS,
        from: '2026-09-30',
        to: '2026-09-01',
      })
    ).toMatch(/Ngày bắt đầu/)
  })
})
