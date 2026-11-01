import type { EventType, EventLabelConfig } from './types'

export const EVENT_LABELS: Record<EventType, EventLabelConfig> = {
  LEASE_DEPLOYED: {
    label: 'Khởi tạo hợp đồng thuê nhà',
    iconName: 'file-text',
  },
  TENANT_KYC_VERIFIED: {
    label: 'Xác minh danh tính khách thuê',
    iconName: 'user-check',
  },
  LANDLORD_KYC_VERIFIED: {
    label: 'Xác minh danh tính chủ nhà',
    iconName: 'user-check',
  },
  DEPOSIT_CONFIRMED: {
    label: 'Thanh toán tiền đặt cọc thành công',
    iconName: 'banknote',
  },
  TENANT_SIGNED: {
    label: 'Khách thuê ký hợp đồng',
    iconName: 'pen-tool',
  },
  LANDLORD_SIGNED: {
    label: 'Chủ nhà ký duyệt hợp đồng',
    iconName: 'pen-tool',
  },
  RENT_PAID_CONFIRMED: {
    label: 'Thanh toán tiền thuê hàng tháng',
    iconName: 'landmark',
  },
  HANDOVER_SIGNED: {
    label: 'Ký biên bản bàn giao căn hộ',
    iconName: 'key-round',
  },
  MAINTENANCE_APPROVED_BY_LANDLORD: {
    label: 'Phê duyệt yêu cầu bảo trì',
    iconName: 'wrench',
  },
}
