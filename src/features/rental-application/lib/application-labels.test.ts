import { describe, it, expect } from 'vitest'
import {
  getApplicationReasonLabel,
  getRespondErrorMessage,
  RESERVATION_CONFLICT_MESSAGE,
} from './application-labels'

describe('getApplicationReasonLabel', () => {
  it.each([
    ['PROPERTY_UNAVAILABLE', 'Căn hộ đã có người thuê/giữ chỗ'],
    ['PET_POLICY_VIOLATION', 'Không phù hợp chính sách thú cưng'],
    ['INSUFFICIENT_CRITERIA', 'Chưa đáp ứng tiêu chí'],
    ['OTHER', 'Lý do khác'],
  ])('maps %s to a Vietnamese label', (code, label) => {
    expect(getApplicationReasonLabel(code)).toBe(label)
  })

  it('humanizes unknown codes instead of showing the raw value', () => {
    const label = getApplicationReasonLabel('SOME_NEW_REASON')
    expect(label).toBe('Some new reason')
    expect(label).not.toMatch(/[A-Z]{3,}(_[A-Z0-9]+){1,}/)
  })
})

describe('getRespondErrorMessage', () => {
  it('maps the reservation conflict to a Vietnamese message', () => {
    expect(
      getRespondErrorMessage(new Error('RENTAL_RESERVATION_CONFLICT'))
    ).toBe(RESERVATION_CONFLICT_MESSAGE)
    expect(RESERVATION_CONFLICT_MESSAGE).toBe(
      'Căn hộ đã có hồ sơ khác được chấp thuận. Hồ sơ này đã được tự động từ chối.'
    )
  })

  it('detects the conflict from the response body code', () => {
    const err = Object.assign(new Error('Conflict'), {
      body: { code: 'RENTAL_RESERVATION_CONFLICT' },
    })
    expect(getRespondErrorMessage(err)).toBe(RESERVATION_CONFLICT_MESSAGE)
  })

  it('maps already-resolved applications to Vietnamese', () => {
    expect(
      getRespondErrorMessage(new Error('Application has already been resolved'))
    ).toBe('Hồ sơ này đã được xử lý trước đó. Dữ liệu đang được làm mới.')
  })

  it('maps stale revisions to Vietnamese', () => {
    expect(
      getRespondErrorMessage(new Error('APPLICATION_REVISION_STALE'))
    ).toBe(
      'Hồ sơ đã được cập nhật bởi một phiên làm việc khác. Dữ liệu đang được làm mới.'
    )
  })

  it('passes through ordinary messages and falls back for non-errors', () => {
    expect(getRespondErrorMessage(new Error('Network failure'))).toBe(
      'Network failure'
    )
    expect(getRespondErrorMessage('boom')).toBe('Xử lý hồ sơ thất bại')
  })
})
