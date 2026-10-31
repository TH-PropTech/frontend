import * as React from 'react'
import type { PermissionSubject } from '@/shared/lib/permissions'
import {
  ArrowRightLeft,
  BookOpen,
  Blocks,
  Box,
  Building2,
  CalendarDays,
  ClipboardList,
  Cpu,
  DollarSign,
  FileText,
  History,
  Home,
  LayoutDashboard,
  LayoutTemplate,
  LifeBuoy,
  MapPin,
  MessageSquare,
  ShieldAlert,
  ShieldCheck,
  SlidersVertical,
  Wallet,
} from 'lucide-react'

/**
 * Menu dùng chung của bảng điều khiển /admin. Một nguồn duy nhất cho cả quản trị viên và nhân viên:
 * - `audience: 'staff'`: mục vận hành. Nhân viên thấy theo mặc định, admin có thể ẩn bớt (cấu hình
 *   `hiddenForStaff`). Admin luôn thấy đủ.
 * - `audience: 'admin'`: mục quản trị hệ thống, chỉ admin thấy.
 * Đây là cấu hình HIỂN THỊ. Quyền truy cập dữ liệu vẫn do guard của từng API quyết định.
 */
export const NAV_TAB_IDS = [
  'home',
  'overview',
  'apartments',
  'properties',
  'kyc',
  'schedules',
  'safety-reports',
  'support-tickets',
  'community',
  'design-requests',
  'fabric-audit',
  'permissions',
  'policies',
  'rental-flow',
  'ownership-transfer',
  'ai-engine',
  'contract-layouts',
  'fees',
  'wallets',
  'payment-history',
  'apartment-designs',
  'legal-knowledge',
] as const

export type NavTabId = (typeof NAV_TAB_IDS)[number]
export type NavGroup = 'operations' | 'system'
export type NavAudience = 'staff' | 'admin'

export interface NavItem {
  id: NavTabId
  label: string
  icon: React.ReactNode
  group: NavGroup
  audience: NavAudience
  /** Nhân viên cần quyền xem đối tượng này mới thấy mục (admin luôn thấy). */
  readSubject?: PermissionSubject
}

export const NAV_GROUP_LABELS: Record<NavGroup, string> = {
  operations: 'Vận hành',
  system: 'Quản trị hệ thống',
}

const icon = (Icon: React.ComponentType<{ className?: string }>) => (
  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
)

export const NAV_ITEMS: readonly NavItem[] = [
  {
    id: 'home',
    label: 'Chào mừng',
    icon: icon(Home),
    group: 'operations',
    audience: 'staff',
  },
  {
    id: 'overview',
    label: 'Tổng quan',
    icon: icon(LayoutDashboard),
    group: 'operations',
    audience: 'staff',
    readSubject: 'Report',
  },
  {
    id: 'apartments',
    label: 'Quản lý căn hộ',
    icon: icon(Building2),
    group: 'operations',
    audience: 'staff',
    readSubject: 'Apartment',
  },
  {
    id: 'properties',
    label: 'Duyệt tin đăng căn hộ',
    icon: icon(MapPin),
    group: 'operations',
    audience: 'staff',
    readSubject: 'Apartment',
  },
  {
    id: 'kyc',
    label: 'Xác minh định danh (KYC)',
    icon: icon(FileText),
    group: 'operations',
    audience: 'staff',
    readSubject: 'Kyc',
  },
  {
    id: 'schedules',
    label: 'Lịch hẹn xem nhà',
    icon: icon(CalendarDays),
    group: 'operations',
    audience: 'staff',
    readSubject: 'Booking',
  },
  {
    id: 'safety-reports',
    label: 'Báo cáo an toàn',
    icon: icon(ShieldAlert),
    group: 'operations',
    audience: 'staff',
    readSubject: 'SafetyReport',
  },
  {
    id: 'support-tickets',
    label: 'Hỗ trợ & SLA',
    icon: icon(LifeBuoy),
    group: 'operations',
    audience: 'staff',
    readSubject: 'SupportTicket',
  },
  {
    id: 'community',
    label: 'Duyệt bài cộng đồng',
    icon: icon(MessageSquare),
    group: 'operations',
    audience: 'staff',
    readSubject: 'CommunityPost',
  },
  {
    id: 'design-requests',
    label: 'Yêu cầu thiết kế 3D',
    icon: icon(ClipboardList),
    group: 'operations',
    audience: 'staff',
    readSubject: 'DesignRequest',
  },
  {
    id: 'apartment-designs',
    label: 'Thiết kế 3D căn hộ',
    icon: icon(Box),
    group: 'operations',
    audience: 'staff',
  },
  {
    id: 'fabric-audit',
    label: 'Kiểm toán lưu vết',
    icon: icon(Blocks),
    group: 'operations',
    audience: 'staff',
    readSubject: 'AuditLog',
  },
  {
    id: 'permissions',
    label: 'Ma trận Phân quyền',
    icon: icon(ShieldCheck),
    group: 'system',
    audience: 'admin',
  },
  {
    id: 'policies',
    label: 'Chính sách & Điều khoản',
    icon: icon(FileText),
    group: 'system',
    audience: 'admin',
  },
  {
    id: 'rental-flow',
    label: 'Quy trình thuê',
    icon: icon(SlidersVertical),
    group: 'system',
    audience: 'admin',
  },
  {
    id: 'ownership-transfer',
    label: 'Chuyển quyền chủ nhà',
    icon: icon(ArrowRightLeft),
    group: 'system',
    audience: 'admin',
  },
  {
    id: 'ai-engine',
    label: 'Cấu hình AI',
    icon: icon(Cpu),
    group: 'system',
    audience: 'admin',
  },
  {
    id: 'contract-layouts',
    label: 'Bố cục hợp đồng',
    icon: icon(LayoutTemplate),
    group: 'system',
    audience: 'admin',
  },
  {
    id: 'fees',
    label: 'Biểu phí & doanh thu',
    icon: icon(DollarSign),
    group: 'system',
    audience: 'admin',
  },
  {
    id: 'wallets',
    label: 'Ví & liên kết thanh toán',
    icon: icon(Wallet),
    group: 'system',
    audience: 'admin',
  },
  {
    id: 'payment-history',
    label: 'Thanh toán & đối soát',
    icon: icon(History),
    group: 'system',
    audience: 'admin',
  },
  {
    id: 'legal-knowledge',
    label: 'Kho tri thức luật',
    icon: icon(BookOpen),
    group: 'system',
    audience: 'admin',
  },
]

/** Các mục admin có thể bật/tắt cho nhân viên. */
export const STAFF_TOGGLEABLE_ITEMS: readonly NavItem[] = NAV_ITEMS.filter(
  item => item.audience === 'staff'
)

/**
 * Mục menu một người dùng được thấy: admin thấy tất cả; nhân viên thấy mục vận hành chưa bị ẩn và
 * được cấp quyền xem đối tượng tương ứng.
 */
export function visibleNavItems(
  isAdmin: boolean,
  hiddenForStaff: readonly string[],
  canRead: (subject: PermissionSubject) => boolean = () => true
): NavItem[] {
  if (isAdmin) return [...NAV_ITEMS]
  const hidden = new Set(hiddenForStaff)
  return NAV_ITEMS.filter(
    item =>
      item.audience === 'staff' &&
      !hidden.has(item.id) &&
      (!item.readSubject || canRead(item.readSubject))
  )
}

/** Mục đã gộp vào mục khác: link cũ vẫn mở đúng màn. */
const LEGACY_SECTIONS: Record<string, NavTabId> = {
  'rental-ops': 'payment-history',
}

/**
 * Tab đang mở theo URL `/admin/<section>`. Section lạ hoặc không được phép thì rơi về mục đầu tiên
 * được thấy (`null` nếu không có mục nào).
 */
export function resolveConsoleTab(
  pathname: string,
  items: readonly NavItem[]
): NavTabId | null {
  const section =
    LEGACY_SECTIONS[pathname.split('/')[2] ?? ''] ?? pathname.split('/')[2]
  const matched = items.find(item => item.id === section)
  if (matched) return matched.id
  const fallback = items.find(item => item.id === 'overview') ?? items[0]
  return fallback?.id ?? null
}
