import { describe, expect, it } from 'vitest'
import { describeSmartCaV2Error } from './smartca-v2-error'

describe('describeSmartCaV2Error', () => {
  it('maps known VNPT SmartCA v2 error codes to Vietnamese guidance', () => {
    expect(describeSmartCaV2Error('SMARTCA_OTP_INVALID')).toContain(
      'Mã OTP không đúng'
    )
    expect(describeSmartCaV2Error('SMARTCA_CREDENTIAL_REJECTED')).toContain(
      'Mật khẩu SmartCA không đúng'
    )
    expect(describeSmartCaV2Error('SMARTCA_SERVICE_PACK_EXPIRED')).toContain(
      'hết lượt ký'
    )
  })

  it('keeps unknown codes unchanged so nothing is hidden', () => {
    expect(describeSmartCaV2Error('SOME_UNKNOWN_CODE')).toBe(
      'SOME_UNKNOWN_CODE'
    )
  })
})
