export interface Property {
  id: string
  name: string
  status: 'Đang thuê' | 'Đang chờ cọc' | 'Trống'
  code: string
  price: number
}

export interface BlockchainLog {
  id: string
  event: EventType
  timestamp: string
  hash: string
  status: 'verified' | 'pending'
}

export type EventType =
  | 'LEASE_DEPLOYED'
  | 'TENANT_KYC_VERIFIED'
  | 'LANDLORD_KYC_VERIFIED'
  | 'DEPOSIT_CONFIRMED'
  | 'TENANT_SIGNED'
  | 'LANDLORD_SIGNED'
  | 'RENT_PAID_CONFIRMED'
  | 'HANDOVER_SIGNED'
  | 'LEASE_TERMINATED'
  | 'MAINTENANCE_APPROVED_BY_LANDLORD'

export interface EventLabelConfig {
  label: string
  /** Icon name: lucide-react on Web, Ionicons on Mobile */
  iconName: string
  /** Nội dung biên bản/chứng từ lưu trữ, hiển thị khi user mở xem chi tiết */
  details: { field: string; value: string }[]
}

export interface RentalBill {
  id: string
  title: string
  dueDate: string
  amount: number
  status: 'paid' | 'unpaid'
  txHash?: string
}

export interface MaintenanceTicket {
  id: string
  title: string
  description: string
  status: 'pending' | 'processing' | 'completed'
  createdAt: string
  cost?: number
}

// --- Landlord-specific types ---

export interface TenantInfo {
  name: string
  phone: string
  startDate: string
  duration: string
  endDate: string
  paymentStatus: string
  creditScore: string
  creditRank: string
}

export interface Appointment {
  id: string
  guestName: string
  phone: string
  propertyId: string
  propertyName: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'rejected'
}

export interface EscrowItem {
  propertyName: string
  amount: number
  status: 'locked' | 'pending' | 'empty'
}

export interface ContractSummary {
  code: string
  duration: string
  startDate: string
  endDate: string
  monthlyRent: number
  deposit: number
  paymentDay: number
  latePenalty: string
  daysRemaining: number
}

export interface ProfitItem {
  label: string
  amount: number
  type: 'income' | 'expense'
}

export interface TenantReview {
  author: string
  date: string
  comment: string
  ratings: {
    responsiveness: number
    quality: number
    maintenance: number
    commitment: number
  }
  overall: number
}

export interface LandlordAlert {
  id: string
  type: 'danger' | 'warning' | 'info'
  message: string
  propertyName: string
}
