import type { ContractItem, ContractStatus } from '@/features/contracts'
import type { LandlordApartmentItem } from '@/features/apartment-posting'
import type {
  ContractSummary,
  LandlordAlert,
  LandlordPortfolio,
  LandlordStats,
  Property,
  TenantInfo,
} from './types'

const DAY_MS = 86_400_000

/** Hợp đồng đã kết thúc: không còn quyết định trạng thái căn hộ. */
const CLOSED: ContractStatus[] = ['cancelled', 'terminated', 'completed']
const PENDING: ContractStatus[] = [
  'draft',
  'deposit-pending',
  'deposit-paid',
  'awaiting-signature',
  'fully-signed-pending-deposit',
]

export const EMPTY_STATS: LandlordStats = {
  total: 0,
  occupied: 0,
  occupancyPct: 0,
  monthlyRevenue: 0,
}

const fmtDate = (iso: string): string => {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleDateString('vi-VN')
}

const monthsBetween = (a: string, b: string): number => {
  const ms = new Date(b).getTime() - new Date(a).getTime()
  return Number.isFinite(ms) && ms > 0
    ? Math.max(1, Math.round(ms / (DAY_MS * 30.44)))
    : 0
}

/** Hợp đồng hiện hành của một căn: ưu tiên đang hiệu lực, sau đó hợp đồng chưa hoàn tất mới nhất. */
export function currentContract(
  propertyId: string,
  contracts: ContractItem[]
): ContractItem | undefined {
  const open = contracts.filter(
    c => c.propertyId === propertyId && !CLOSED.includes(c.status)
  )
  return (
    open.find(c => c.status === 'active') ??
    [...open].sort((a, b) => b.startDate.localeCompare(a.startDate))[0]
  )
}

function propertyStatus(contract?: ContractItem): Property['status'] {
  if (contract?.status === 'active') return 'Đang thuê'
  if (contract && PENDING.includes(contract.status)) return 'Đang chờ cọc'
  return 'Trống'
}

/** Cờ tiến độ của thẻ "Tiến độ hoàn thành", suy ra từ trạng thái hợp đồng thật. */
export function progressFlags(contract?: ContractItem): {
  depositPaid: boolean
  contractSigned: boolean
  firstMonthPaid: boolean
  handoverSigned: boolean
  leaseTerminated: boolean
} {
  const s = contract?.status
  const after = (list: ContractStatus[]): boolean => !!s && list.includes(s)
  return {
    depositPaid: after([
      'deposit-paid',
      'awaiting-signature',
      'active',
      'completed',
      'terminated',
    ]),
    contractSigned:
      !!contract &&
      ((contract.signedByTenant && contract.signedByLandlord) ||
        after(['active', 'completed', 'terminated'])),
    firstMonthPaid: after(['active', 'completed', 'terminated']),
    handoverSigned: after(['completed']),
    leaseTerminated: after(['terminated', 'completed']),
  }
}

const ALERT_BY_STATUS: Partial<
  Record<ContractStatus, Pick<LandlordAlert, 'type' | 'message'>>
> = {
  'deposit-pending': { type: 'danger', message: 'Chờ khách thuê nộp cọc' },
  'deposit-paid': {
    type: 'warning',
    message: 'Đã nhận cọc, chờ ký duyệt hợp đồng',
  },
  'awaiting-signature': { type: 'warning', message: 'Chờ ký hợp đồng điện tử' },
  'fully-signed-pending-deposit': {
    type: 'warning',
    message: 'Đã ký hợp đồng, chờ khách nộp cọc',
  },
}

type BuiltPortfolio = Omit<
  LandlordPortfolio,
  'isLive' | 'isLoading' | 'isError'
>

/** Gộp tin đăng + hợp đồng của chủ nhà thành danh mục căn hộ, số liệu và cảnh báo. */
export function buildPortfolio(
  listings: LandlordApartmentItem[],
  contracts: ContractItem[],
  now: Date = new Date()
): BuiltPortfolio {
  const properties: Property[] = []
  const tenantInfo: Record<string, TenantInfo> = {}
  const contractSummary: Record<string, ContractSummary> = {}
  const contractByProperty: Record<string, ContractItem> = {}
  const alerts: LandlordAlert[] = []
  let monthlyRevenue = 0

  for (const l of listings) {
    const contract = currentContract(l.id, contracts)
    // tin chưa duyệt / bị từ chối / hết hạn mà chưa có hợp đồng thì chưa phải căn đang quản lý
    if (!contract && !['available', 'unavailable'].includes(l.status)) continue

    properties.push({
      id: l.id,
      name: l.title,
      status: propertyStatus(contract),
      code: contract?.contractCode ?? '—',
      price: l.priceMonthly,
      contractId: contract?._id,
    })
    if (!contract) continue
    contractByProperty[l.id] = contract

    const note = ALERT_BY_STATUS[contract.status]
    if (note)
      alerts.push({
        id: `contract-${contract._id}`,
        ...note,
        propertyName: l.title,
      })

    if (contract.status !== 'active') continue
    monthlyRevenue += contract.monthlyRent
    const months = monthsBetween(contract.startDate, contract.endDate)
    tenantInfo[l.id] = {
      name: contract.tenantName || 'Khách thuê',
      phone: contract.tenantPhone || 'Chưa có số điện thoại',
      startDate: fmtDate(contract.startDate),
      duration: months ? `${months} tháng` : '—',
      endDate: fmtDate(contract.endDate),
      paymentStatus: 'Chưa có dữ liệu',
      creditScore: '—',
      creditRank: '—',
    }
    contractSummary[l.id] = {
      code: contract.contractCode,
      duration: months ? `${months} tháng` : '—',
      startDate: fmtDate(contract.startDate),
      endDate: fmtDate(contract.endDate),
      monthlyRent: contract.monthlyRent,
      deposit: contract.deposit,
      paymentDay: contract.paymentDay,
      latePenalty: 'Theo điều khoản hợp đồng',
      daysRemaining: Math.max(
        0,
        Math.ceil(
          (new Date(contract.endDate).getTime() - now.getTime()) / DAY_MS
        ) || 0
      ),
    }
  }

  const occupied = properties.filter(p => p.status === 'Đang thuê').length
  const stats: LandlordStats = {
    total: properties.length,
    occupied,
    occupancyPct: properties.length
      ? Math.round((occupied / properties.length) * 1000) / 10
      : 0,
    monthlyRevenue,
  }
  return {
    properties,
    stats,
    tenantInfo,
    contractSummary,
    contractByProperty,
    alerts,
  }
}
