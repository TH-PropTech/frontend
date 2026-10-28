import { describe, expect, it } from 'vitest'
import { ApiClientError } from '@/shared/api'
import {
  REFUND_DECLARATION_NOTICE,
  getAcceptedReasonLabel,
  getCloseReasonLabel,
  getCompletionReasonLabel,
  getHandoverStatusLabel,
  getMoveOutErrorMessage,
  getStatementStatusLabel,
} from './move-out-labels'
import { BANNED_TERMS, INTERNAL_CODE } from '../test-fixtures/move-out.fixtures'

describe('move-out labels', () => {
  it('maps every known status to plain Vietnamese', () => {
    for (const s of ['recorded', 'completed', 'disputed']) {
      expect(getHandoverStatusLabel(s)).not.toMatch(INTERNAL_CODE)
    }
    for (const s of [
      'draft',
      'awaiting-tenant',
      'accepted',
      'disputed',
      'refund-recorded',
      'closed',
    ]) {
      expect(getStatementStatusLabel(s)).not.toMatch(/-/)
    }
  })

  it('humanizes unknown codes instead of showing raw values', () => {
    expect(getStatementStatusLabel('SOME_NEW_STATE')).toBe('Some new state')
    expect(getAcceptedReasonLabel('weird-reason')).toBe('Weird reason')
    expect(getCloseReasonLabel(null)).toBeNull()
    expect(getCompletionReasonLabel(null)).toBe('Biên bản đã hoàn tất.')
  })

  it('maps error codes and falls back for unknown ones', () => {
    const expired = new ApiClientError('x', 409, {
      code: 'STATEMENT_RESPONSE_EXPIRED',
      message: 'x',
    })
    expect(getMoveOutErrorMessage(expired, 'fb')).toMatch(/quá hạn/)
    const exists = new ApiClientError('x', 409, {
      code: 'STATEMENT_EXISTS',
      message: 'x',
    })
    expect(getMoveOutErrorMessage(exists, 'fb')).toMatch(/tải lại/)
    const foreignUrl = new ApiClientError('x', 400, {
      code: 'STATEMENT_EVIDENCE_URL_NOT_ALLOWED',
      message: 'x',
    })
    expect(getMoveOutErrorMessage(foreignUrl, 'fb')).toMatch(/tải lên/)
    expect(getMoveOutErrorMessage(new Error('?'), 'fb')).toBe('fb')
  })

  it('keeps the refund notice free of banned terms and says the platform holds no money', () => {
    expect(REFUND_DECLARATION_NOTICE).not.toMatch(BANNED_TERMS)
    expect(REFUND_DECLARATION_NOTICE).toMatch(/không giữ/)
  })
})
