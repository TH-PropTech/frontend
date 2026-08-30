import type { PermissionModule } from './types'

/** Danh sách module hệ thống và các action tương ứng */
export const PERMISSION_MODULES: PermissionModule[] = [
  {
    key: 'apartments',
    label: 'Quản lý Căn hộ',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    actions: [
      { key: 'view', label: 'Xem' },
      { key: 'create', label: 'Tạo' },
      { key: 'update', label: 'Sửa' },
      { key: 'delete', label: 'Xóa' },
      { key: 'approve', label: 'Duyệt' },
    ],
  },
  {
    key: 'users',
    label: 'Quản lý Người dùng',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    actions: [
      { key: 'view', label: 'Xem' },
      { key: 'update', label: 'Sửa' },
      { key: 'delete', label: 'Xóa' },
    ],
  },
  {
    key: 'kyc',
    label: 'Xác minh KYC',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    actions: [
      { key: 'view', label: 'Xem' },
      { key: 'approve', label: 'Duyệt' },
    ],
  },
  {
    key: 'bookings',
    label: 'Lịch hẹn xem nhà',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    actions: [
      { key: 'view', label: 'Xem' },
      { key: 'create', label: 'Tạo' },
      { key: 'update', label: 'Sửa' },
      { key: 'approve', label: 'Xác nhận' },
    ],
  },
  {
    key: 'contracts',
    label: 'Hợp đồng thuê',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    actions: [
      { key: 'view', label: 'Xem' },
      { key: 'create', label: 'Tạo' },
      { key: 'update', label: 'Sửa' },
    ],
  },
  {
    key: 'payments',
    label: 'Quản lý Thanh toán',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
    actions: [
      { key: 'view', label: 'Xem' },
      { key: 'update', label: 'Xác nhận' },
    ],
  },
  {
    key: 'disputes',
    label: 'Tranh chấp cọc',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    actions: [
      { key: 'view', label: 'Xem' },
      { key: 'approve', label: 'Giải quyết' },
    ],
  },
  {
    key: 'notifications',
    label: 'Thông báo',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    actions: [
      { key: 'view', label: 'Xem' },
      { key: 'create', label: 'Gửi' },
    ],
  },
  {
    key: 'reports',
    label: 'Báo cáo & Thống kê',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    actions: [
      { key: 'view', label: 'Xem' },
      { key: 'export', label: 'Xuất' },
    ],
  },
  {
    key: 'community',
    label: 'Cộng đồng Cư dân',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    actions: [
      { key: 'view', label: 'Xem' },
      { key: 'create', label: 'Đăng' },
      { key: 'delete', label: 'Xóa' },
      { key: 'approve', label: 'Duyệt' },
    ],
  },
]
