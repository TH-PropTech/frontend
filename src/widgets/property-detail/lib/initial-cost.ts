import type { RentalPackageItem } from '@/entities/properties'

export interface CostSegment {
  key: 'holding' | 'security' | 'deposit' | 'prepaid'
  label: string
  amount: number
}

export interface InitialCost {
  segments: CostSegment[]
  total: number
  /** true khi suy từ giá niêm yết vì tin không có gói thuê. */
  estimated: boolean
}

/** Khoản thu khi nhận nhà theo gói: cọc (tách giữ chỗ/ký quỹ nếu có) + tiền thuê trả trước hoặc kỳ đầu. */
export function buildPackageCost(pkg: RentalPackageItem): InitialCost {
  const segments: CostSegment[] = []
  const holding = pkg.resolvedHoldingDepositAmount
  const topUp = pkg.resolvedSecurityTopUpAmount
  if (holding !== undefined && topUp !== undefined) {
    if (holding > 0)
      segments.push({ key: 'holding', label: 'Cọc giữ chỗ', amount: holding })
    if (topUp > 0)
      segments.push({ key: 'security', label: 'Ký quỹ còn lại', amount: topUp })
  } else if (pkg.resolvedDepositAmount > 0) {
    segments.push({
      key: 'deposit',
      label: 'Tiền cọc',
      amount: pkg.resolvedDepositAmount,
    })
  }

  const prepaid =
    pkg.resolvedPrepaidRentAmount ??
    pkg.monthlyRent * (pkg.settlementPolicy?.defaultPaymentCycle ?? 1)
  if (prepaid > 0) {
    segments.push({
      key: 'prepaid',
      label:
        pkg.resolvedPrepaidRentAmount !== undefined
          ? 'Tiền thuê trả trước'
          : 'Tiền thuê kỳ đầu',
      amount: prepaid,
    })
  }
  return {
    segments,
    total: segments.reduce((sum, segment) => sum + segment.amount, 0),
    estimated: false,
  }
}

/** Tin không có gói thuê: ước tính cọc 2 tháng + 1 tháng thuê đầu từ giá niêm yết. */
export function buildEstimatedCost(monthlyRent: number): InitialCost {
  const segments: CostSegment[] = [
    {
      key: 'deposit',
      label: 'Tiền cọc (ước tính 2 tháng)',
      amount: monthlyRent * 2,
    },
    { key: 'prepaid', label: 'Tiền thuê tháng đầu', amount: monthlyRent },
  ]
  return {
    segments,
    total: segments.reduce((sum, segment) => sum + segment.amount, 0),
    estimated: true,
  }
}
