import { isValidDateOnly } from './audit-filters'

/** Mirrors the server limits (design D7 / `ledger-reconciliation.dto.ts`). */
export const MAX_RECONCILIATION_DAYS = 92
export const MAX_RECONCILIATION_CONTRACTS = 500

const OBJECT_ID = /^[a-f0-9]{24}$/i
const DAY_MS = 24 * 60 * 60 * 1000

export interface ReconciliationScopeInput {
  from: string
  to: string
  /** Free text: ObjectIds separated by commas, spaces or new lines. */
  contractIds: string
  eventTypes: readonly string[]
}

export interface ReconciliationScopeRequest {
  from?: string
  to?: string
  contractIds?: string[]
  eventTypes?: string[]
}

export type ReconciliationScopeErrorCode =
  | 'RECONCILIATION_SCOPE_REQUIRED'
  | 'RECONCILIATION_RANGE_INVALID'
  | 'RECONCILIATION_RANGE_INVERTED'
  | 'RECONCILIATION_RANGE_TOO_LONG'
  | 'RECONCILIATION_CONTRACT_ID_INVALID'
  | 'RECONCILIATION_CONTRACT_LIMIT_EXCEEDED'

export type ReconciliationScopeResult =
  | { ok: true; value: ReconciliationScopeRequest }
  | {
      ok: false
      errors: Partial<
        Record<'scope' | 'range' | 'contractIds', ReconciliationScopeErrorCode>
      >
    }

export function parseContractIds(text: string): string[] {
  return [...new Set(text.split(/[\s,;]+/).filter(Boolean))]
}

/**
 * Client-side mirror of the server scope rules so an unbounded request never leaves the browser.
 * The API remains the authority and still answers with `RECONCILIATION_SCOPE_*` codes.
 */
export function validateReconciliationScope(
  input: ReconciliationScopeInput
): ReconciliationScopeResult {
  const contractIds = parseContractIds(input.contractIds)
  const hasContracts = contractIds.length > 0
  const hasFrom = input.from.length > 0
  const hasTo = input.to.length > 0

  if (!hasContracts && !(hasFrom && hasTo)) {
    return { ok: false, errors: { scope: 'RECONCILIATION_SCOPE_REQUIRED' } }
  }

  if (hasContracts) {
    if (contractIds.length > MAX_RECONCILIATION_CONTRACTS) {
      return {
        ok: false,
        errors: { contractIds: 'RECONCILIATION_CONTRACT_LIMIT_EXCEEDED' },
      }
    }
    if (!contractIds.every(id => OBJECT_ID.test(id))) {
      return {
        ok: false,
        errors: { contractIds: 'RECONCILIATION_CONTRACT_ID_INVALID' },
      }
    }
  }

  const value: ReconciliationScopeRequest = {}

  if (hasFrom || hasTo) {
    if (!(hasFrom && hasTo)) {
      return { ok: false, errors: { scope: 'RECONCILIATION_SCOPE_REQUIRED' } }
    }
    if (!isValidDateOnly(input.from) || !isValidDateOnly(input.to)) {
      return { ok: false, errors: { range: 'RECONCILIATION_RANGE_INVALID' } }
    }
    const start = Date.parse(`${input.from}T00:00:00.000Z`)
    const end = Date.parse(`${input.to}T23:59:59.999Z`)
    if (end < start) {
      return { ok: false, errors: { range: 'RECONCILIATION_RANGE_INVERTED' } }
    }
    if ((end - start) / DAY_MS > MAX_RECONCILIATION_DAYS) {
      return { ok: false, errors: { range: 'RECONCILIATION_RANGE_TOO_LONG' } }
    }
    value.from = `${input.from}T00:00:00.000Z`
    value.to = `${input.to}T23:59:59.999Z`
  }

  if (hasContracts) value.contractIds = contractIds
  if (input.eventTypes.length > 0) value.eventTypes = [...input.eventTypes]
  return { ok: true, value }
}

export const SCOPE_ERROR_MESSAGES: Record<
  ReconciliationScopeErrorCode,
  string
> = {
  RECONCILIATION_SCOPE_REQUIRED:
    'Cần nhập đủ khoảng thời gian (từ ngày và đến ngày) hoặc danh sách hợp đồng.',
  RECONCILIATION_RANGE_INVALID: 'Ngày không hợp lệ.',
  RECONCILIATION_RANGE_INVERTED:
    'Ngày bắt đầu phải trước hoặc bằng ngày kết thúc.',
  RECONCILIATION_RANGE_TOO_LONG: `Khoảng thời gian tối đa ${MAX_RECONCILIATION_DAYS} ngày.`,
  RECONCILIATION_CONTRACT_ID_INVALID:
    'Mỗi mã hợp đồng phải là ObjectId gồm 24 ký tự hex.',
  RECONCILIATION_CONTRACT_LIMIT_EXCEEDED: `Tối đa ${MAX_RECONCILIATION_CONTRACTS} hợp đồng mỗi lần đối soát.`,
}
