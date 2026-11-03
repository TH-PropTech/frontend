import { parseDmy } from './kyc-date'

export interface KycFormValues {
  fullName: string
  cccdNumber: string
  dob: string
  address: string
  gender: string
  nationality: string
  placeOfOrigin: string
  issueDate: string
  placeOfIssue: string
}

export type KycFormErrors = Partial<Record<keyof KycFormValues, string>>

const MIN_BIRTH_YEAR = 1900

function startOfToday(now: Date): Date {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

/** Client-side checks for the confirmation form; an empty object means it can be submitted. */
export function validateKycForm(
  form: KycFormValues,
  now: Date = new Date()
): KycFormErrors {
  const errors: KycFormErrors = {}
  const today = startOfToday(now)

  if (!/^(\d{9}|\d{12})$/.test(form.cccdNumber.trim())) {
    errors.cccdNumber = 'Số CCCD phải gồm 9 hoặc 12 chữ số'
  }
  if (!form.fullName.trim()) errors.fullName = 'Vui lòng nhập họ và tên'
  if (form.gender !== 'Nam' && form.gender !== 'Nữ') {
    errors.gender = 'Vui lòng chọn giới tính'
  }
  if (!form.nationality.trim()) errors.nationality = 'Vui lòng nhập quốc tịch'
  if (!form.address.trim()) errors.address = 'Vui lòng nhập nơi thường trú'

  const dob = parseDmy(form.dob)
  if (!dob) {
    errors.dob = 'Vui lòng chọn ngày sinh'
  } else if (dob > today || dob.getFullYear() < MIN_BIRTH_YEAR) {
    errors.dob = 'Ngày sinh không hợp lệ'
  }

  if (form.issueDate.trim()) {
    const issued = parseDmy(form.issueDate)
    if (!issued || issued > today) {
      errors.issueDate = 'Ngày cấp không hợp lệ'
    } else if (dob && issued < dob) {
      errors.issueDate = 'Ngày cấp phải sau ngày sinh'
    }
  }
  return errors
}
