import type { ContractItem } from '@/features/contracts'
import type { RentalBill } from './types'

export interface CostBreakdownItem {
  key: string
  label: string
  amount: number
}

/**
 * Trích xuất các khoản chi phí hàng tháng chỉ gồm các khoản có số tiền > 0
 * từ hợp đồng thật (tiền thuê) và hóa đơn định kỳ (điện, nước, phí quản lý/dịch vụ).
 * Khi không có khoản nào, trả về mảng rỗng.
 */
export function buildMonthlyCostBreakdown(
  contract: ContractItem | null | undefined,
  bills: RentalBill[] = []
): CostBreakdownItem[] {
  const items: CostBreakdownItem[] = []

  // 1. Tiền thuê từ hợp đồng (chỉ phát sinh chi phí hàng tháng khi hợp đồng đã có hiệu lực hoặc hoàn tất)
  const isContractActive =
    contract?.status === 'active' || contract?.status === 'completed'
  if (contract && isContractActive && contract.monthlyRent > 0) {
    items.push({
      key: 'rent',
      label: 'Tiền thuê',
      amount: contract.monthlyRent,
    })
  }

  // 2. Các khoản từ bills định kỳ (không tính tiền cọc một lần)
  for (const bill of bills) {
    if (bill.amount <= 0) continue

    const idLower = bill.id.toLowerCase()
    const titleLower = bill.title.toLowerCase()

    // Bỏ qua tiền cọc
    if (idLower.includes('dep') || titleLower.includes('cọc')) {
      continue
    }

    if (idLower.includes('elec') || titleLower.includes('điện')) {
      items.push({
        key: 'electricity',
        label: 'Tiền điện',
        amount: bill.amount,
      })
    } else if (idLower.includes('water') || titleLower.includes('nước')) {
      items.push({
        key: 'water',
        label: 'Tiền nước',
        amount: bill.amount,
      })
    } else if (
      idLower.includes('svc') ||
      idLower.includes('mgmt') ||
      titleLower.includes('quản lý') ||
      titleLower.includes('dịch vụ')
    ) {
      items.push({
        key: 'service',
        label: 'Phí QL',
        amount: bill.amount,
      })
    } else if (
      !contract &&
      (idLower.includes('rent') ||
        titleLower.includes('tiền thuê') ||
        titleLower.includes('tiền nhà'))
    ) {
      // Nếu không có hợp đồng mà bill có tiền thuê
      items.push({
        key: 'rent',
        label: 'Tiền thuê',
        amount: bill.amount,
      })
    }
  }

  return items
}
