import { describe, expect, it } from 'vitest'
import {
  certificateChoiceProblem,
  defaultCertificateSerial,
  formatSmartCaCertificateLabel,
} from './smartca-certificate-label'

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

  it('nói rõ chứng thư thường hay tích hợp khi VNPT trả loại dịch vụ', () => {
    expect(
      formatSmartCaCertificateLabel({
        serialNumber: 'AAAAAAc163',
        serviceType: 'SMARTCA',
        subject: 'CN=Nguyen Van A',
      })
    ).toMatch(/^Chứng thư thường \(SmartCA\) · Nguyen Van A/)
    expect(
      formatSmartCaCertificateLabel({
        serialNumber: 'BBBBBB494d',
        serviceType: 'ESEAL',
        subject: 'CN=Nguyen Van A',
      })
    ).toMatch(/^Chứng thư tích hợp \(eSeal\) · Nguyen Van A/)
  })
})

describe('choosing between certificates', () => {
  const ordinary = { serialNumber: 'ORD', serviceType: 'SMARTCA' }
  const integrated = { serialNumber: 'INT', serviceType: 'ESEAL' }

  it('mặc định chọn chứng thư duy nhất, hoặc chứng thư tích hợp duy nhất', () => {
    expect(defaultCertificateSerial([ordinary])).toBe('ORD')
    expect(defaultCertificateSerial([ordinary, integrated])).toBe('INT')
    expect(
      defaultCertificateSerial([ordinary, { ...ordinary, serialNumber: 'O2' }])
    ).toBe('')
  })

  it('chỉ phản đối chứng thư thường khi có chứng thư tích hợp', () => {
    expect(certificateChoiceProblem([ordinary, integrated], 'ORD')).toContain(
      'chứng thư tích hợp'
    )
    expect(certificateChoiceProblem([ordinary, integrated], 'INT')).toBeNull()
    expect(certificateChoiceProblem([ordinary], 'ORD')).toBeNull()
    expect(certificateChoiceProblem(null, 'ORD')).toBeNull()
  })
})
