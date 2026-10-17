import { describe, expect, it } from 'vitest'
import { formatSmartCaCertificateLabel } from './smartca-certificate-label'

describe('formatSmartCaCertificateLabel', () => {
  it('chỉ hiện tên chủ thể, 6 ký tự cuối serial và hạn dùng', () => {
    const label = formatSmartCaCertificateLabel({
      serialNumber: '5401010145290e7cd66ea0054c69c163',
      subject: 'CN=Nguyen Van A, O=VNPT, C=VN',
      validTo: '2027-10-11T00:00:00.000Z',
    })
    expect(label).toMatch(/^Nguyen Van A · …69c163 · hết hạn /)
    expect(label).not.toContain('5401010145290e7c')
  })

  it('thiếu subject và hạn dùng thì vẫn có nhãn dễ đọc', () => {
    expect(
      formatSmartCaCertificateLabel({ serialNumber: 'ABCDEF123456' })
    ).toBe('Chứng thư SmartCA · …123456')
  })
})
