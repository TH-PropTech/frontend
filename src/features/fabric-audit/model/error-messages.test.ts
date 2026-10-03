import { describe, expect, it } from 'vitest'
import { ApiClientError } from '@/shared/api'
import {
  FabricAuditResponseError,
  describeFabricAuditError,
  isForbiddenError,
} from './error-messages'

function domainError(code: string, status = 400): ApiClientError {
  return new ApiClientError('raw backend text', status, {
    code: `HTTP_${status}`,
    message: 'raw backend text',
    details: { code },
  })
}

describe('describeFabricAuditError', () => {
  it.each([
    'AUDIT_FILTER_INVALID',
    'AUDIT_EVENT_NOT_FOUND',
    'GOVERNANCE_SNAPSHOT_INCOMPLETE',
    'GOVERNANCE_SECRET_CLASSIFIED',
    'GOVERNANCE_SNAPSHOT_NOT_FOUND',
    'GOVERNANCE_SNAPSHOT_CONFLICT',
    'RECONCILIATION_SCOPE_REQUIRED',
    'RECONCILIATION_SCOPE_INVALID',
    'RECONCILIATION_SCOPE_LOCKED',
    'RECONCILIATION_RUN_NOT_FOUND',
    'RECONCILIATION_RUN_NOT_RESUMABLE',
    'RECONCILIATION_RUN_NOT_CANCELLABLE',
    'RECONCILIATION_FINDING_NOT_FOUND',
    'RECONCILIATION_REASON_REQUIRED',
    'LEDGER_FINDING_NOT_REPAIRABLE',
    'LEDGER_FINDING_PRECONDITION_STALE',
  ])('maps the stable code %s to a localized message', code => {
    const message = describeFabricAuditError(domainError(code))
    expect(message).not.toBe('raw backend text')
    expect(message).not.toContain(code)
    expect(message.length).toBeGreaterThan(10)
  })

  it('describes a forbidden response without leaking backend text', () => {
    const forbidden = new ApiClientError('Forbidden resource', 403, {
      code: 'HTTP_403',
      message: 'Forbidden resource',
    })
    expect(describeFabricAuditError(forbidden)).toContain('quyền')
    expect(isForbiddenError(forbidden)).toBe(true)
    expect(isForbiddenError(domainError('AUDIT_FILTER_INVALID'))).toBe(false)
  })

  it('describes transport failures and malformed server responses', () => {
    expect(
      describeFabricAuditError(new ApiClientError('offline', 0, null))
    ).toContain('kết nối')
    expect(
      describeFabricAuditError(new FabricAuditResponseError('overview'))
    ).toContain('không hợp lệ')
  })

  it('falls back to a generic message for unknown failures', () => {
    expect(describeFabricAuditError(new Error('boom'))).toContain('Không thể')
    expect(
      describeFabricAuditError(domainError('SOMETHING_NEW', 500))
    ).toContain('Không thể')
  })
})
