import * as React from 'react'
import type { ContractItem } from '@/features/contracts'
import type { TenantPortfolio } from './use-tenant-portfolio'

export interface Property {
  id: string
  name: string
  status: 'Đang thuê' | 'Đang chờ cọc' | 'Trống'
  code: string
  price: number
  contractId?: string | undefined
}

export interface BlockchainLog {
  id: string
  event: EventType
  timestamp: string
  hash: string
  status: 'verified' | 'pending'
  details?: { field: string; value: string }[]
}

export type ProfileDataStatus = 'loading' | 'error' | 'ready'

export interface UserSession {
  id: string
  deviceLabel: string
  ipMasked: string
  lastActiveAt: string
  isCurrent: boolean
}

export interface UseProfileReturn {
  role: 'tenant' | 'landlord'
  activeTab:
    | 'progress'
    | 'bills'
    | 'blockchain'
    | 'maintenance'
    | 'security'
    | 'listings'
    | 'saved-searches'
    | 'safety-reports'
    | 'support-tickets'
    | 'rental-applications'
  setActiveTab: React.Dispatch<
    React.SetStateAction<
      | 'progress'
      | 'bills'
      | 'blockchain'
      | 'maintenance'
      | 'security'
      | 'listings'
      | 'saved-searches'
      | 'safety-reports'
      | 'support-tickets'
      | 'rental-applications'
    >
  >
  activePropertyId: string
  properties: Property[]
  showContractModal: boolean
  setShowContractModal: React.Dispatch<React.SetStateAction<boolean>>
  contractViewOnly: boolean
  handleViewSignedContract: () => void
  showHandoverArchiveModal: boolean
  setShowHandoverArchiveModal: React.Dispatch<React.SetStateAction<boolean>>
  notifChannels: {
    email: boolean
    push: boolean
  }
  setNotifChannels: React.Dispatch<
    React.SetStateAction<{
      email: boolean
      push: boolean
    }>
  >
  isWalletConnected: boolean
  walletAddress: string
  usdtBalance: number
  isKycVerified: boolean
  kycStatus: 'not-started' | 'pending' | 'verified' | 'rejected'
  showKycModal: boolean
  setShowKycModal: React.Dispatch<React.SetStateAction<boolean>>
  isOcrLoading: boolean
  kycForm: {
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
  setKycForm: React.Dispatch<
    React.SetStateAction<{
      fullName: string
      cccdNumber: string
      dob: string
      address: string
      gender: string
      nationality: string
      placeOfOrigin: string
      issueDate: string
      placeOfIssue: string
    }>
  >
  cccdUploaded: boolean
  setCccdUploaded: React.Dispatch<React.SetStateAction<boolean>>
  showHandoverModal: boolean
  setShowHandoverModal: React.Dispatch<React.SetStateAction<boolean>>
  handoverSigned: boolean
  setHandoverSigned: React.Dispatch<React.SetStateAction<boolean>>
  handoverChecks: {
    livingRoom: string
    bedroom: string
    kitchen: string
    bathroom: string
  }
  setHandoverChecks: React.Dispatch<
    React.SetStateAction<{
      livingRoom: string
      bedroom: string
      kitchen: string
      bathroom: string
    }>
  >
  maintenanceTickets: MaintenanceTicket[]
  maintenanceStatus?: ProfileDataStatus
  retryMaintenance?: () => void
  portfolio: LandlordPortfolio
  tenantPortfolio: TenantPortfolio
  liveContract: ContractItem | null
  newTicketTitle: string
  setNewTicketTitle: React.Dispatch<React.SetStateAction<string>>
  newTicketDesc: string
  setNewTicketDesc: React.Dispatch<React.SetStateAction<string>>
  leaseTerminated: boolean
  depositPaid: boolean
  contractSigned: boolean
  firstMonthPaid: boolean
  blockchainLogs: BlockchainLog[]
  blockchainStatus?: ProfileDataStatus
  retryBlockchain?: () => void
  isInitialLoading: boolean
  bills: RentalBill[]
  billsStatus?: ProfileDataStatus
  retryBills?: () => void
  activeProperty: Property
  appointments: Appointment[]
  handleConnectWallet: () => void
  handleUploadCccd: (imageBase64?: string) => Promise<void> | void
  refreshKycStatus: () => Promise<void>
  handlePayDeposit: () => void
  handleSignContract: () => void
  handlePayRent: () => void
  handleConfirmHandover: () => void
  handleNewMaintenanceTicket: (e: React.FormEvent) => void
  handleApproveTicket: (id: string) => void
  handleCopyText: (text: string) => void
  progressPercent: () => number
  handleOpenContractModal: () => void
  handlePropertyChange: (propertyId: string) => void
  handleRoleChange: (newRole: 'tenant' | 'landlord') => void
  handleApproveAppointment: (id: string) => void
  handleRejectAppointment: (id: string, reason: string) => void
  handleCancelAppointment: (id: string) => void
  handleCompleteAppointment: (id: string) => void
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
  | 'MAINTENANCE_APPROVED_BY_LANDLORD'

export interface EventLabelConfig {
  label: string
  /** Icon name: lucide-react on Web, Ionicons on Mobile */
  iconName: string
  /** Nội dung biên bản/chứng từ lưu trữ, hiển thị khi user mở xem chi tiết */
  details?: { field: string; value: string }[]
}

export interface RentalBill {
  id: string
  title: string
  dueDate: string
  amount: number
  status: 'paid' | 'unpaid'
  txHash?: string
  contractCode?: string
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
}

export interface Appointment {
  id: string
  guestName: string
  phone: string
  propertyId: string
  propertyName: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'completed'
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

export interface LandlordAlert {
  id: string
  type: 'danger' | 'warning' | 'info'
  message: string
  propertyName: string
}

/** Số liệu tổng hợp của chủ nhà, tính từ tin đăng + hợp đồng thật. */
export interface LandlordStats {
  total: number
  occupied: number
  occupancyPct: number
  monthlyRevenue: number
}

/** Danh mục căn hộ của chủ nhà. isLive = đang dùng dữ liệu backend (đã đăng nhập); ngược lại giao diện dùng dữ liệu demo. */
export interface LandlordPortfolio {
  isLive: boolean
  isLoading: boolean
  isError: boolean
  status: ProfileDataStatus
  retry: () => void
  properties: Property[]
  stats: LandlordStats
  tenantInfo: Record<string, TenantInfo>
  contractSummary: Record<string, ContractSummary>
  contractByProperty: Record<string, ContractItem>
  alerts: LandlordAlert[]
}
