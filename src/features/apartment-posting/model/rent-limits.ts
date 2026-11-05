/**
 * Limits on what a landlord can type for rent and deposit. Rents run from a few hundred
 * thousand to tens of millions a month, so the only hard stops are values that cannot be
 * real (a typo in the unit); everything merely unusual is a warning the landlord can ignore.
 */
export const MAX_MONTHLY_RENT_VND = 1_000_000_000
export const MAX_DEPOSIT_MONTHS = 12

/** Above these the form asks the landlord to double-check, but still accepts the value. */
export const HIGH_MONTHLY_RENT_VND = 100_000_000
export const HIGH_DEPOSIT_MONTHS = 6
export const PACKAGE_RENT_RATIO_WARNING = 3

const VND = new Intl.NumberFormat('vi-VN')

export function formatVndAmount(amountVnd: number): string {
  return `${VND.format(Math.round(amountVnd))} ₫`
}

/** The value the form stores for a field typed in millions of dong. */
export function millionsToVnd(millions: number): number {
  return Math.round(millions * 1_000_000)
}

export function rentWarning(rentVnd: number): string | null {
  if (!Number.isFinite(rentVnd) || rentVnd <= 0) return null
  if (rentVnd >= HIGH_MONTHLY_RENT_VND) {
    return `Giá thuê ${formatVndAmount(rentVnd)}/tháng khá cao, hãy kiểm tra lại số vừa nhập.`
  }
  return null
}

/** A package priced far from the listing price is usually a slip, not a deliberate discount. */
export function packageRentWarning(
  packageRentVnd: number,
  baseRentVnd: number
): string | null {
  if (packageRentVnd <= 0 || baseRentVnd <= 0) return null
  const ratio = packageRentVnd / baseRentVnd
  if (
    ratio >= PACKAGE_RENT_RATIO_WARNING ||
    ratio <= 1 / PACKAGE_RENT_RATIO_WARNING
  ) {
    return `Giá gói lệch nhiều so với giá thuê của tin (${formatVndAmount(baseRentVnd)}/tháng). Kiểm tra lại nếu không cố ý.`
  }
  return null
}

export function fixedDepositWarning(
  depositVnd: number,
  rentVnd: number
): string | null {
  if (depositVnd <= 0 || rentVnd <= 0) return null
  if (depositVnd > rentVnd * HIGH_DEPOSIT_MONTHS) {
    return `Tiền cọc bằng ${Math.round((depositVnd / rentVnd) * 10) / 10} tháng tiền thuê, cao hơn thông thường.`
  }
  return null
}

/** Hard stop: a rent no landlord would charge, almost always a slip in the unit. */
export function rentError(rentVnd: number): string | null {
  if (rentVnd > MAX_MONTHLY_RENT_VND) {
    return `Giá thuê tối đa ${formatVndAmount(MAX_MONTHLY_RENT_VND)}/tháng.`
  }
  return null
}

export function fixedDepositError(
  depositVnd: number,
  rentVnd: number
): string | null {
  if (rentVnd > 0 && depositVnd > rentVnd * MAX_DEPOSIT_MONTHS) {
    return `Tiền cọc tối đa ${MAX_DEPOSIT_MONTHS} tháng tiền thuê (${formatVndAmount(rentVnd * MAX_DEPOSIT_MONTHS)}).`
  }
  return null
}
