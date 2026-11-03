import { describe, expect, it } from 'vitest'
import { normalizePlaceName, splitAddress, splitWard } from './kyc-address'
import { dmyToIso, isoToDmy, parseDmy } from './kyc-date'
import { validateKycForm, type KycFormValues } from './kyc-form-validation'

const PROVINCES = [
  { name: 'Thành phố Hồ Chí Minh', code: 79 },
  { name: 'Tỉnh Đắk Lắk', code: 66 },
  { name: 'Thành phố Hà Nội', code: 1 },
]
const WARDS = [{ name: 'Phường Bến Nghé' }, { name: 'Xã Phú Hòa' }]

describe('kyc date helpers', () => {
  it('accepts only real DD/MM/YYYY dates', () => {
    expect(parseDmy('22/10/2004')).toEqual(new Date(2004, 9, 22))
    expect(parseDmy('1/2/2000')).toEqual(new Date(2000, 1, 1))
    expect(parseDmy('31/02/2000')).toBeNull()
    expect(parseDmy('22-10-2004')).toBeNull()
    expect(parseDmy('')).toBeNull()
  })

  it('converts between DD/MM/YYYY and the DatePicker ISO string', () => {
    expect(dmyToIso('22/10/2004')).toBe('2004-10-22')
    expect(dmyToIso('5/3/1999')).toBe('1999-03-05')
    expect(dmyToIso('99/99/2000')).toBe('')
    expect(isoToDmy('2004-10-22')).toBe('22/10/2004')
    expect(isoToDmy('nope')).toBe('')
  })
})

describe('kyc address helpers', () => {
  it('normalises names and strips administrative prefixes', () => {
    expect(normalizePlaceName('Thành phố Hồ Chí Minh')).toBe('ho chi minh')
    expect(normalizePlaceName('TP. Hồ Chí Minh')).toBe('ho chi minh')
    expect(normalizePlaceName('Tỉnh Đắk Lắk')).toBe('dak lak')
    expect(normalizePlaceName('Đăk Lăk')).toBe('dak lak')
    expect(normalizePlaceName('Phước Long')).toBe('phuoc long')
  })

  it('finds the province in the last segment and keeps the rest as detail', () => {
    expect(
      splitAddress('12 Lê Lợi, Phường Bến Nghé, TP Hồ Chí Minh', PROVINCES)
    ).toEqual({
      province: PROVINCES[0],
      rest: '12 Lê Lợi, Phường Bến Nghé',
    })
  })

  it('leaves unknown or old province names as plain detail', () => {
    expect(splitAddress('Hòa An, Phú Hòa, Phú Yên', PROVINCES)).toEqual({
      province: null,
      rest: 'Hòa An, Phú Hòa, Phú Yên',
    })
    expect(splitAddress('', PROVINCES)).toEqual({ province: null, rest: '' })
  })

  it('takes the ward off the end of the detail when it matches', () => {
    expect(splitWard('12 Lê Lợi, Phường Bến Nghé', WARDS)).toEqual({
      ward: WARDS[0],
      rest: '12 Lê Lợi',
    })
    expect(splitWard('12 Lê Lợi', WARDS)).toEqual({
      ward: null,
      rest: '12 Lê Lợi',
    })
  })
})

describe('validateKycForm', () => {
  const NOW = new Date(2026, 10, 3)
  const valid: KycFormValues = {
    fullName: 'TỐNG PHAN KIM THẠCH',
    cccdNumber: '054204004683',
    dob: '22/10/2004',
    address: '12 Lê Lợi, Thành phố Hồ Chí Minh',
    gender: 'Nam',
    nationality: 'Việt Nam',
    placeOfOrigin: '',
    issueDate: '',
    placeOfIssue: '',
  }

  it('accepts a complete form', () => {
    expect(validateKycForm(valid, NOW)).toEqual({})
  })

  it('reports each missing or malformed required field', () => {
    const errors = validateKycForm(
      {
        ...valid,
        cccdNumber: '123',
        fullName: ' ',
        dob: '',
        gender: '',
        address: '',
        nationality: '',
      },
      NOW
    )

    expect(Object.keys(errors).sort()).toEqual([
      'address',
      'cccdNumber',
      'dob',
      'fullName',
      'gender',
      'nationality',
    ])
  })

  it('rejects a future birth date and an issue date before birth or in the future', () => {
    expect(
      validateKycForm({ ...valid, dob: '01/01/2030' }, NOW).dob
    ).toBeDefined()
    expect(
      validateKycForm({ ...valid, issueDate: '01/01/2000' }, NOW).issueDate
    ).toContain('sau ngày sinh')
    expect(
      validateKycForm({ ...valid, issueDate: '01/01/2030' }, NOW).issueDate
    ).toBeDefined()
    expect(validateKycForm({ ...valid, issueDate: '04/05/2021' }, NOW)).toEqual(
      {}
    )
  })
})
