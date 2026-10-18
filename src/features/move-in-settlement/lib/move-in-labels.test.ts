import { describe, expect, it } from 'vitest'
import { ApiClientError } from '@/shared/api/api-client'
import {
  getCompletionReasonLabel,
  getHandoverErrorMessage,
  getSettlementLineLabel,
  getSettlementStatusLabel,
} from './move-in-labels'

describe('move-in labels', () => {
  it('maps known statuses and line kinds and never returns the raw code', () => {
    expect(getSettlementStatusLabel('partially-paid')).toBe(
      'Đã thanh toán một phần'
    )
    expect(getSettlementStatusLabel('something-new')).toBe('Đang cập nhật')
    expect(getSettlementLineLabel('DEPOSIT_TOPUP')).toBe('Tiền cọc bổ sung')
    expect(getSettlementLineLabel('BRAND_NEW_KIND')).toBe('Khoản khác')
  })

  it('explains each completion reason, defaulting legacy records to both-confirmed', () => {
    expect(getCompletionReasonLabel('tenant-no-response')).toContain('Điều 9.1')
    expect(getCompletionReasonLabel(null)).toBe('Hai bên đã xác nhận biên bản.')
    expect(getCompletionReasonLabel('weird')).toBe('Biên bản đã hoàn tất.')
  })

  it('maps known error codes and falls back for unknown or non-API errors', () => {
    const known = new ApiClientError('Forbidden', 403, {
      code: 'HTTP_403',
      message: 'Forbidden',
      details: { code: 'HANDOVER_ACCESS_DENIED' },
    })
    const unknown = new ApiClientError('x', 500, {
      code: 'HTTP_500',
      message: 'x',
    })
    expect(getHandoverErrorMessage(known, 'fallback')).toBe(
      'Bạn không có quyền thực hiện thao tác này.'
    )
    expect(getHandoverErrorMessage(unknown, 'fallback')).toBe('fallback')
    expect(getHandoverErrorMessage(new Error('boom'), 'fallback')).toBe(
      'fallback'
    )
  })
})
