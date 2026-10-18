/**
 * Tiền thuê trả trước (ngoài tiền cọc) của một gói thuê: chỉ cọc / trả trước N tháng / trả toàn bộ.
 * Gói cũ không có chính sách này (`undefined`), khi đó giữ hành vi cũ nên không hiển thị gì.
 */
export type PrepaidRentType = 'NONE' | 'MONTHS' | 'FULL'

export type PrepaidRentPolicy =
  | { type: 'NONE' }
  | { type: 'MONTHS'; months: number }
  | { type: 'FULL' }

/** Số tháng trả trước đã quy đổi: NONE = 0, MONTHS = months, FULL = toàn bộ thời hạn. */
export function resolvePrepaidMonths(
  policy: PrepaidRentPolicy | undefined,
  durationMonths: number
): number | null {
  if (!policy) return null
  if (policy.type === 'NONE') return 0
  if (policy.type === 'FULL') return durationMonths
  return Math.min(Math.max(1, Math.round(policy.months)), durationMonths)
}

/** Nhãn ngắn cho dòng tài chính của hợp đồng / hồ sơ thuê. */
export function describePrepaidRent(input: {
  policy: PrepaidRentType
  months: number
}): string {
  if (input.policy === 'NONE') {
    return 'Tiền thuê trả trước: không (chỉ đặt cọc)'
  }
  if (input.policy === 'FULL') {
    return `Tiền thuê trả trước: toàn bộ (${input.months} tháng)`
  }
  return `Tiền thuê trả trước: ${input.months} tháng`
}

/** Câu mô tả đầy đủ để người thuê đọc trước khi chọn gói. */
export function explainPrepaidRent(input: {
  policy: PrepaidRentType
  months: number
}): string {
  if (input.policy === 'NONE') {
    return 'Chỉ cần đặt cọc khi nhận nhà. Tiền thuê được thanh toán theo lịch của hợp đồng, không phải trả trước.'
  }
  if (input.policy === 'FULL') {
    return `Trả trước toàn bộ ${input.months} tháng tiền thuê cùng khoản cọc khi nhận nhà.`
  }
  return `Trả trước ${input.months} tháng tiền thuê cùng khoản cọc khi nhận nhà; các tháng còn lại thanh toán theo lịch.`
}
