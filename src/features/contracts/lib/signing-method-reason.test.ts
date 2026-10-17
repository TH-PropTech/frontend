import { describe, expect, it } from 'vitest'
import { describeSigningMethodReason } from './signing-method-reason'

describe('describeSigningMethodReason', () => {
  it('dịch mã lý do đã biết sang tiếng Việt', () => {
    expect(describeSigningMethodReason('SMARTCA_KYC_NOT_VERIFIED')).toMatch(
      /KYC chưa được duyệt/
    )
    expect(
      describeSigningMethodReason(
        'EXECUTION_POLICY_DEPOSIT_REQUIRED_BEFORE_SIGNING'
      )
    ).toMatch(/đặt cọc/)
  })

  it('giữ nguyên mã lạ thay vì giấu đi', () => {
    expect(describeSigningMethodReason('SOMETHING_NEW')).toBe('SOMETHING_NEW')
  })
})
