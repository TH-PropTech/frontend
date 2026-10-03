import {
  AUDIT_DELIVERY_STATES,
  AUDIT_EVENT_TYPES,
  AUDIT_VERIFICATION_STATES,
  type AuditDeliveryState,
  type AuditVerificationState,
} from './schemas'

export const AUDIT_TABS = [
  'overview',
  'events',
  'reconciliation',
  'governance',
] as const
export type AuditTab = (typeof AUDIT_TABS)[number]

export interface AuditFilters {
  contractId: string
  eventType: string
  state: AuditDeliveryState | ''
  verificationState: AuditVerificationState | ''
  /** Date-only `YYYY-MM-DD` (inclusive). */
  from: string
  to: string
  txId: string
  page: number
  limit: number
}

/** Query accepted by `GET /fabric/audit/events` (blank filters are omitted). */
export interface AuditEventsQuery {
  page: number
  limit: number
  contractId?: string
  eventType?: string
  state?: AuditDeliveryState
  verificationState?: AuditVerificationState
  from?: string
  to?: string
  txId?: string
}

export const DEFAULT_AUDIT_FILTERS: AuditFilters = {
  contractId: '',
  eventType: '',
  state: '',
  verificationState: '',
  from: '',
  to: '',
  txId: '',
  page: 1,
  limit: 20,
}

const CONTRACT_ID = /^[A-Za-z0-9_-]{1,64}$/
const TX_ID = /^[A-Za-z0-9_.:-]{1,128}$/
const EVENT_ID = /^[a-f0-9]{24}$/i

/** Parameters mirror the backend filter names, so the URL stays shareable and self-describing. */
const PARAM = {
  contractId: 'contractId',
  eventType: 'eventType',
  state: 'state',
  verificationState: 'verification',
  from: 'from',
  to: 'to',
  txId: 'txId',
  page: 'page',
  event: 'event',
  tab: 'tab',
} as const

export function isValidDateOnly(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T00:00:00.000Z`)
  return (
    !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
  )
}

function pick<T extends string>(
  value: string | null,
  allowed: readonly T[]
): T | '' {
  return allowed.find(item => item === value) ?? ''
}

function matching(value: string | null, pattern: RegExp): string {
  return value !== null && pattern.test(value) ? value : ''
}

function dateOnly(value: string | null): string {
  return value !== null && isValidDateOnly(value) ? value : ''
}

export function parseAuditFilters(params: URLSearchParams): AuditFilters {
  const page = Number(params.get(PARAM.page))
  return {
    contractId: matching(params.get(PARAM.contractId), CONTRACT_ID),
    eventType: pick(params.get(PARAM.eventType), AUDIT_EVENT_TYPES),
    state: pick(params.get(PARAM.state), AUDIT_DELIVERY_STATES),
    verificationState: pick(
      params.get(PARAM.verificationState),
      AUDIT_VERIFICATION_STATES
    ),
    from: dateOnly(params.get(PARAM.from)),
    to: dateOnly(params.get(PARAM.to)),
    txId: matching(params.get(PARAM.txId), TX_ID),
    page: Number.isInteger(page) && page >= 1 ? page : 1,
    limit: DEFAULT_AUDIT_FILTERS.limit,
  }
}

export function parseAuditTab(params: URLSearchParams): AuditTab {
  const tab = params.get(PARAM.tab)
  return AUDIT_TABS.find(item => item === tab) ?? 'overview'
}

export function parseSelectedEventId(params: URLSearchParams): string | null {
  const id = params.get(PARAM.event)
  return id !== null && EVENT_ID.test(id) ? id : null
}

export interface AuditSearchState {
  filters: AuditFilters
  tab?: AuditTab | undefined
  eventId?: string | null | undefined
}

/** Serializes UI state to a query string, omitting every default so URLs stay minimal. */
export function serializeAuditSearch({
  filters,
  tab,
  eventId,
}: AuditSearchState): string {
  const params = new URLSearchParams()
  if (tab && tab !== 'overview') params.set(PARAM.tab, tab)
  if (filters.contractId) params.set(PARAM.contractId, filters.contractId)
  if (filters.eventType) params.set(PARAM.eventType, filters.eventType)
  if (filters.state) params.set(PARAM.state, filters.state)
  if (filters.verificationState) {
    params.set(PARAM.verificationState, filters.verificationState)
  }
  if (filters.from) params.set(PARAM.from, filters.from)
  if (filters.to) params.set(PARAM.to, filters.to)
  if (filters.txId) params.set(PARAM.txId, filters.txId)
  if (filters.page > 1) params.set(PARAM.page, String(filters.page))
  if (eventId) params.set(PARAM.event, eventId)
  return params.toString()
}

export function toAuditEventsQuery(filters: AuditFilters): AuditEventsQuery {
  const query: AuditEventsQuery = { page: filters.page, limit: filters.limit }
  if (filters.contractId) query.contractId = filters.contractId
  if (filters.eventType) query.eventType = filters.eventType
  if (filters.state) query.state = filters.state
  if (filters.verificationState) {
    query.verificationState = filters.verificationState
  }
  if (filters.from) query.from = `${filters.from}T00:00:00.000Z`
  if (filters.to) query.to = `${filters.to}T23:59:59.999Z`
  if (filters.txId) query.txId = filters.txId
  return query
}

/** Client-side check of a filter draft; returns a user-facing message or null when valid. */
export function validateAuditFilters(filters: AuditFilters): string | null {
  if (filters.contractId && !CONTRACT_ID.test(filters.contractId)) {
    return 'Mã hợp đồng chỉ gồm chữ, số, "-" và "_" (tối đa 64 ký tự).'
  }
  if (filters.txId && !TX_ID.test(filters.txId)) {
    return 'Mã giao dịch chứa ký tự không hợp lệ.'
  }
  if (filters.from && filters.to && filters.from > filters.to) {
    return 'Ngày bắt đầu phải trước hoặc bằng ngày kết thúc.'
  }
  return null
}
