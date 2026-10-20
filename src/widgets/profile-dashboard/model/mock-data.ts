import type {
  Property,
  BlockchainLog,
  RentalBill,
  MaintenanceTicket,
  TenantInfo,
  Appointment,
  ContractSummary,
  TenantReview,
  LandlordAlert,
  EventType,
  EventLabelConfig,
} from './types'

export const EVENT_LABELS: Record<EventType, EventLabelConfig> = {
  LEASE_DEPLOYED: {
    label: 'Khởi tạo hợp đồng thuê nhà',
    iconName: 'file-text',
    details: [
      { field: 'Mã hợp đồng', value: 'CTR-2026-0048' },
      {
        field: 'Bất động sản',
        value: 'Vinhomes Central Park - Căn hộ #102, 75m²',
      },
      { field: 'Bên cho thuê', value: 'Lê Hoàng Minh (CCCD: 012093005678)' },
      { field: 'Bên thuê', value: 'Nguyễn Văn A (CCCD: 038096001234)' },
      { field: 'Thời hạn', value: '12 tháng (10/06/2026 → 10/06/2027)' },
      { field: 'Giá thuê', value: '18.000.000 VNĐ/tháng' },
      { field: 'Tiền cọc', value: '18.000.000 VNĐ' },
      { field: 'Ngày thanh toán hàng tháng', value: 'Mùng 5 hàng tháng' },
      { field: 'Phạt trễ hạn', value: '1%/ngày (tối đa 10%)' },
    ],
  },
  TENANT_KYC_VERIFIED: {
    label: 'Xác minh danh tính khách thuê',
    iconName: 'user-check',
    details: [
      { field: 'Họ và tên', value: 'NGUYỄN VĂN A' },
      { field: 'Số CCCD', value: '038096001234' },
      { field: 'Ngày sinh', value: '15/08/1996' },
      {
        field: 'Địa chỉ thường trú',
        value: '720A Điện Biên Phủ, P.22, Bình Thạnh, TP.HCM',
      },
      {
        field: 'Phương thức xác minh',
        value: 'OCR CCCD + So khớp khuôn mặt eKYC',
      },
      {
        field: 'Chứng chỉ Fabric CA',
        value: 'org1.tenant.nguyen_van_a (X.509)',
      },
    ],
  },
  LANDLORD_KYC_VERIFIED: {
    label: 'Xác minh danh tính chủ nhà',
    iconName: 'user-check',
    details: [
      { field: 'Họ và tên', value: 'LÊ HOÀNG MINH' },
      { field: 'Số CCCD', value: '012093005678' },
      { field: 'Ngày sinh', value: '20/12/1985' },
      {
        field: 'Địa chỉ thường trú',
        value: '100 Nguyễn Hữu Cảnh, P.22, Bình Thạnh, TP.HCM',
      },
      {
        field: 'Phương thức xác minh',
        value: 'OCR CCCD + So khớp khuôn mặt eKYC',
      },
      {
        field: 'Chứng chỉ Fabric CA',
        value: 'org1.landlord.le_hoang_minh (X.509)',
      },
    ],
  },
  DEPOSIT_CONFIRMED: {
    label: 'Thanh toán tiền đặt cọc thành công',
    iconName: 'banknote',
    details: [
      { field: 'Số tiền', value: '18.000.000 VNĐ' },
      {
        field: 'Người chuyển',
        value: 'Nguyễn Văn A (Techcombank - 19023456789012)',
      },
      {
        field: 'Ngân hàng bảo chứng',
        value: 'Techcombank - Tài khoản ký quỹ trung gian',
      },
      { field: 'Trạng thái', value: 'Đã khóa bảo chứng an toàn tại ngân hàng' },
      { field: 'Phương thức', value: 'Chuyển khoản qua cổng PayOS' },
      {
        field: 'Điều kiện giải tỏa',
        value: 'Thanh lý hợp đồng hoặc hết hạn thuê',
      },
    ],
  },
  TENANT_SIGNED: {
    label: 'Khách thuê ký hợp đồng',
    iconName: 'pen-tool',
    details: [
      { field: 'Người ký', value: 'Nguyễn Văn A' },
      { field: 'Mã hợp đồng', value: 'CTR-2026-0048' },
      {
        field: 'Danh tính ký số',
        value: 'org1.tenant.nguyen_van_a (Fabric CA X.509)',
      },
      { field: 'Thuật toán ký', value: 'ECDSA P-256 (SHA-256)' },
      { field: 'Vai trò', value: 'Bên thuê (Tenant)' },
    ],
  },
  LANDLORD_SIGNED: {
    label: 'Chủ nhà ký duyệt hợp đồng',
    iconName: 'pen-tool',
    details: [
      { field: 'Người ký', value: 'Lê Hoàng Minh' },
      { field: 'Mã hợp đồng', value: 'CTR-2026-0048' },
      {
        field: 'Danh tính ký số',
        value: 'org1.landlord.le_hoang_minh (Fabric CA X.509)',
      },
      { field: 'Thuật toán ký', value: 'ECDSA P-256 (SHA-256)' },
      { field: 'Vai trò', value: 'Bên cho thuê (Landlord)' },
    ],
  },
  RENT_PAID_CONFIRMED: {
    label: 'Thanh toán tiền thuê hàng tháng',
    iconName: 'landmark',
    details: [
      { field: 'Kỳ thanh toán', value: 'Tháng 06/2026' },
      { field: 'Số tiền', value: '18.000.000 VNĐ' },
      { field: 'Người chuyển', value: 'Nguyễn Văn A (Techcombank)' },
      { field: 'Người nhận', value: 'Lê Hoàng Minh (TPBank - 04382910301)' },
      { field: 'Phương thức', value: 'Chuyển khoản tự động qua PayOS' },
      { field: 'Hạn thanh toán', value: '05/07/2026' },
    ],
  },
  HANDOVER_SIGNED: {
    label: 'Ký biên bản bàn giao căn hộ',
    iconName: 'key-round',
    details: [
      { field: 'Bất động sản', value: 'Vinhomes Central Park - Căn hộ #102' },
      { field: 'Phòng khách', value: '✓ Sofa, điều hòa — Tình trạng tốt' },
      { field: 'Phòng ngủ', value: '✓ Giường, tủ quần áo — Tình trạng tốt' },
      {
        field: 'Nhà bếp',
        value: '✓ Bếp từ, tủ lạnh, lò vi sóng — Tình trạng tốt',
      },
      { field: 'Nhà tắm', value: '✓ Vòi sen, bình nóng lạnh — Tình trạng tốt' },
      { field: 'Bên bàn giao', value: 'Lê Hoàng Minh (Chủ nhà)' },
      { field: 'Bên tiếp nhận', value: 'Nguyễn Văn A (Khách thuê)' },
    ],
  },
  LEASE_TERMINATED: {
    label: 'Thanh lý hợp đồng & hoàn cọc',
    iconName: 'file-check-2',
    details: [
      { field: 'Mã hợp đồng', value: 'CTR-2026-0048' },
      { field: 'Lý do', value: 'Hết thời hạn hợp đồng thuê 12 tháng' },
      { field: 'Tiền cọc gốc', value: '18.000.000 VNĐ' },
      { field: 'Khấu trừ hư hỏng', value: '0 VNĐ (không có hư hỏng)' },
      { field: 'Số tiền hoàn trả', value: '18.000.000 VNĐ' },
      {
        field: 'Hoàn trả về',
        value: 'Nguyễn Văn A (Techcombank - 19023456789012)',
      },
      { field: 'Trạng thái', value: 'Đã giải tỏa và hoàn trả thành công' },
    ],
  },
  MAINTENANCE_APPROVED_BY_LANDLORD: {
    label: 'Phê duyệt yêu cầu bảo trì',
    iconName: 'wrench',
    details: [
      { field: 'Mã yêu cầu', value: 'TCK-001' },
      { field: 'Sự cố', value: 'Hỏng vòi nước nhà tắm' },
      {
        field: 'Mô tả',
        value: 'Vòi hoa sen bị rò rỉ nước liên tục gây lãng phí nước sạch',
      },
      { field: 'Chi phí sửa chữa', value: '250.000 VNĐ' },
      { field: 'Người phê duyệt', value: 'Lê Hoàng Minh (Chủ nhà)' },
      { field: 'Trạng thái', value: 'Đã phê duyệt — Kỹ thuật viên đang xử lý' },
    ],
  },
}

export const DEMO_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    name: 'Vinhomes Central Park - Căn hộ #102',
    status: 'Đang thuê',
    code: 'CTR-2026-0048',
    price: 18000000,
  },
  {
    id: 'prop-2',
    name: 'Masteri Thảo Điền - Studio #204',
    status: 'Đang chờ cọc',
    code: 'CTR-2026-0112',
    price: 12000000,
  },
  {
    id: 'prop-3',
    name: 'Sunrise City - Căn hộ #403',
    status: 'Trống',
    code: 'CTR-2026-0250',
    price: 15000000,
  },
]

export const DEMO_BLOCKCHAIN_LOGS: BlockchainLog[] = [
  {
    id: 'LOG-001',
    event: 'LEASE_DEPLOYED',
    timestamp: '10/06/2026 16:15',
    hash: '498abf10927e3d09a25b18920138d89f2c1e8aa2206b7d19c009d12d4109b8aef',
    status: 'verified',
  },
]

export const DEMO_BILLS: RentalBill[] = [
  {
    id: 'BILL-DEP-001',
    title: 'Tiền đặt cọc giữ chỗ căn hộ',
    dueDate: '15/06/2026',
    amount: 18000000,
    status: 'unpaid',
  },
  {
    id: 'BILL-RENT-001',
    title: 'Tiền thuê nhà tháng 6/2026',
    dueDate: '05/07/2026',
    amount: 18000000,
    status: 'unpaid',
  },
]

export const DEMO_MAINTENANCE_TICKETS: MaintenanceTicket[] = [
  {
    id: 'TCK-001',
    title: 'Hỏng vòi nước nhà tắm',
    description: 'Vòi hoa sen bị rò rỉ nước liên tục gây lãng phí nước sạch.',
    status: 'completed',
    createdAt: '08/06/2026',
    cost: 250000,
  },
]

export const DEMO_SESSIONS = [
  {
    id: 's1',
    device: 'Windows PC • Chrome (Thiết bị hiện tại)',
    ip: '113.161.45.102',
    location: 'TP. Hồ Chí Minh',
    lastActive: 'Đang hoạt động',
  },
  {
    id: 's2',
    device: 'iPhone 15 Pro • Safari',
    ip: '14.162.210.55',
    location: 'Bình Dương',
    lastActive: '2 giờ trước',
  },
  {
    id: 's3',
    device: 'MacBook Pro • Chrome',
    ip: '27.79.155.8',
    location: 'TP. Hồ Chí Minh',
    lastActive: '3 ngày trước',
  },
]

// --- Landlord-specific mock data ---

export const DEMO_TENANT_INFO: Record<string, TenantInfo> = {
  'prop-1': {
    name: 'Nguyễn Văn A',
    phone: '0901 234 567',
    startDate: '10/06/2026',
    duration: '12 tháng',
    endDate: '10/06/2027',
    paymentStatus: 'Đúng hạn 100%',
    creditScore: '780/850',
    creditRank: 'Hạng Vàng',
  },
}

export const DEMO_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    guestName: 'Trần Minh Tú',
    phone: '0912 345 678',
    propertyId: 'prop-2',
    propertyName: 'Masteri Thảo Điền - Studio #204',
    date: '14/06/2026',
    time: '10:00',
    status: 'pending',
  },
  {
    id: 'apt-2',
    guestName: 'Phạm Thị Lan',
    phone: '0987 654 321',
    propertyId: 'prop-3',
    propertyName: 'Sunrise City - Căn hộ #403',
    date: '15/06/2026',
    time: '14:30',
    status: 'pending',
  },
]

export const DEMO_CONTRACT_SUMMARY: ContractSummary = {
  code: 'CTR-2026-0048',
  duration: '12 tháng',
  startDate: '10/06/2026',
  endDate: '10/06/2027',
  monthlyRent: 18000000,
  deposit: 18000000,
  paymentDay: 5,
  latePenalty: '1%/ngày (tối đa 10%)',
  daysRemaining: 364,
}

export const DEMO_TENANT_REVIEW: TenantReview = {
  author: 'Nguyễn Văn A',
  date: '08/06/2026',
  comment:
    'Chủ nhà rất nhiệt tình và chuyên nghiệp, xử lý sự cố vòi nước rò rỉ trong vòng 2 giờ đồng hồ. Phòng sạch sẽ, đúng như mô tả.',
  ratings: {
    responsiveness: 5.0,
    quality: 4.5,
    maintenance: 4.8,
    commitment: 5.0,
  },
  overall: 4.8,
}

export const DEMO_LANDLORD_ALERTS: LandlordAlert[] = [
  {
    id: 'alert-1',
    type: 'danger',
    message: 'Chờ khách nộp cọc đã 3 ngày',
    propertyName: 'Studio #204',
  },
  {
    id: 'alert-2',
    type: 'warning',
    message: '1 yêu cầu bảo trì đang chờ phê duyệt',
    propertyName: 'Căn hộ #102',
  },
  {
    id: 'alert-3',
    type: 'info',
    message: '2 lịch hẹn xem nhà mới chờ xác nhận',
    propertyName: '',
  },
]

export const DEMO_PROPERTY_STATS: Record<
  string,
  { views: number; favorites: number }
> = {
  'prop-2': { views: 89, favorites: 12 },
  'prop-3': { views: 142, favorites: 18 },
}
