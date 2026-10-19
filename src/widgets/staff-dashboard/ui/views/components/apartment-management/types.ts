import type { PrepaidRentPolicy } from '@/shared/lib/prepaid-rent'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ApartmentStatus =
  | 'available'
  | 'pending'
  | 'rejected'
  | 'expired'
  | 'updating'
  | 'unavailable'

export type FilterStatus = 'all' | ApartmentStatus

export interface StaffExecutionPolicyRef {
  policyId: string
  version: number
  strategy: 'SIGN_FIRST'
  contentHash: string
}

/** Gói thuê như backend trả về (kèm dữ liệu chỉ đọc như resolvedDepositAmount). */
export interface StaffRentalPackage {
  packageId: string
  version: number
  durationMonths: 3 | 6 | 12 | 24
  monthlyRent: number
  depositPolicy:
    | { type: 'MONTHS_OF_RENT'; months: number }
    | { type: 'FIXED_AMOUNT'; amount: number }
  status: 'active' | 'inactive'
  resolvedDepositAmount?: number
  prepaidRent?: PrepaidRentPolicy
  allowedExecutionPolicies?: StaffExecutionPolicyRef[]
  defaultExecutionPolicy?: StaffExecutionPolicyRef
}

export interface StaffApartment {
  id: string
  pricingMode?: 'packages' | 'legacy'
  pricingRevision?: number
  rentalPackages?: StaffRentalPackage[]
  title: string
  location: string
  city: string
  district: string
  // Các trường chỉnh sửa (GET /apartments/manage trả đủ; tuỳ chọn để không ép mọi nơi dùng phải có)
  category?: string
  description?: string
  ward?: string
  street?: string
  address?: string
  direction?: string
  balconyDirection?: string
  furniture?: string
  moveInTime?: string
  electricity?: string
  water?: string
  internet?: string
  priceMonthly: number
  area: number
  bedrooms: number
  bathrooms: number
  gallery: string[]
  images360: string[]
  vrUrl: string
  amenities: string[]
  status: ApartmentStatus
  isVerified: boolean
  landlordId: string
  rejectedReason: string | null
  submittedAt: string | null
  approvedAt: string | null
  expiresAt: string | null
  projectName: string | null
  landlord?: {
    fullName: string
    phone: string
    email: string
  } | null
}

// ─── Status Config ────────────────────────────────────────────────────────────

export interface StatusConfig {
  label: string
  textClass: string
  bgClass: string
  borderClass: string
}

export const STATUS_CONFIG: Record<ApartmentStatus, StatusConfig> = {
  available: {
    label: 'Đang hiển thị',
    textClass: 'text-[color:var(--success)]',
    bgClass: 'bg-[color:var(--success-soft)]',
    borderClass: 'border-[color:var(--success)]/20',
  },
  pending: {
    label: 'Chờ duyệt',
    textClass: 'text-[color:var(--warning)]',
    bgClass: 'bg-[color:var(--warning-soft)]',
    borderClass: 'border-[color:var(--warning)]/20',
  },
  rejected: {
    label: 'Đã từ chối',
    textClass: 'text-[color:var(--danger)]',
    bgClass: 'bg-[color:var(--danger-soft)]',
    borderClass: 'border-[color:var(--danger)]/20',
  },
  expired: {
    label: 'Hết hạn',
    textClass: 'text-[color:var(--muted)]',
    bgClass: 'bg-[color:var(--surface-muted)]',
    borderClass: 'border-[color:var(--border)]',
  },
  updating: {
    label: 'Đang cập nhật',
    textClass: 'text-[color:var(--info)]',
    bgClass: 'bg-[color:var(--info-soft)]',
    borderClass: 'border-[color:var(--info)]/20',
  },
  unavailable: {
    label: 'Đang ẩn',
    textClass: 'text-[color:var(--muted)]',
    bgClass: 'bg-[color:var(--surface-muted)]',
    borderClass: 'border-[color:var(--border-strong)]/30',
  },
}

export const FILTER_OPTIONS: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'Tất cả' },
  { value: 'available', label: 'Đang hiển thị' },
  { value: 'pending', label: 'Chờ duyệt' },
  { value: 'unavailable', label: 'Đang ẩn' },
  { value: 'rejected', label: 'Đã từ chối' },
  { value: 'expired', label: 'Hết hạn' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatPrice(price: number | undefined | null): string {
  if (price == null || isNaN(price)) return 'Chưa có giá'
  if (price >= 1_000_000) {
    const millions = price / 1_000_000
    return `${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)} triệu/tháng`
  }
  return `${price.toLocaleString('vi-VN')} đ/tháng`
}
