import type { ContractStatus } from '../api/contracts-api'

const CONTRACT_STATUS_LABELS: Record<ContractStatus, string> = {
  draft: 'Bản nháp',
  'deposit-pending': 'Chờ đặt cọc',
  'deposit-paid': 'Đã đặt cọc',
  'awaiting-signature': 'Chờ ký',
  'fully-signed-pending-deposit': 'Đã ký, chờ đặt cọc',
  active: 'Đang hiệu lực',
  terminated: 'Đã chấm dứt',
  cancelled: 'Đã hủy',
  completed: 'Hoàn tất',
}

const EXECUTION_STRATEGY_LABELS = {
  DEPOSIT_FIRST: 'Cọc trước, ký sau',
  SIGN_FIRST: 'Ký trước, cọc sau',
} as const

interface LegalBasisLabel {
  label: string
  sourceUrl: string
}

/** Đồng bộ tay với `LEGAL_BASIS_REGISTRY` của backend (id → tên đầy đủ + nguồn). */
const LEGAL_BASIS_LABELS: Record<string, LegalBasisLabel> = {
  DECREE_96_2024_APPENDIX_II_RESIDENTIAL_LEASE: {
    label: 'Nghị định 96/2024/NĐ-CP, Phụ lục II – Mẫu hợp đồng thuê nhà ở',
    sourceUrl:
      'https://xaydungchinhsach.chinhphu.vn/mau-hop-dong-thue-nha-o-119240827172441217.htm',
  },
  HOUSING_LAW_2023_ART_163_164: {
    label: 'Luật Nhà ở 27/2023/QH15, Điều 163–164',
    sourceUrl: 'https://vbpl.vn/',
  },
  REAL_ESTATE_BUSINESS_LAW_2023_ART_44_46: {
    label: 'Luật Kinh doanh bất động sản 29/2023/QH15, Điều 44–46',
    sourceUrl: 'https://vanban.chinhphu.vn/',
  },
  NATIONAL_PUBLIC_SERVICE_TEMPORARY_RESIDENCE_1004194: {
    label: 'TTHC 1.004194 – Đăng ký tạm trú',
    sourceUrl: 'https://dichvucong.bocongan.gov.vn/',
  },
}

const LEGAL_PROFILE_LABELS: Record<string, string> = {
  PRIVATE_CIVIL_APARTMENT_LEASE: 'Thuê căn hộ giữa cá nhân',
  REAL_ESTATE_BUSINESS_STANDARD: 'Kinh doanh bất động sản',
}

const TEMPLATE_LABELS: Record<string, string> = {
  VN_INDIVIDUAL_RESIDENTIAL_LEASE: 'Mẫu thuê nhà ở cá nhân',
  VN_RE_BUSINESS_ND96_APPENDIX_II:
    'Mẫu theo Nghị định 96/2024 (kinh doanh BĐS)',
}

const LEDGER_STATUS_LABELS: Record<string, string> = {
  pending: 'Đang chờ',
  processing: 'Đang xử lý',
  confirmed: 'Đã xác nhận',
  'failed-retryable': 'Lỗi, đang thử lại',
  'failed-terminal': 'Thất bại',
}

const AMENDMENT_FIELD_LABELS: Record<string, string> = {
  monthlyRent: 'Giá thuê hàng tháng',
}

/** Mã nội bộ lạ: bỏ `_`/`-`, chữ thường, viết hoa chữ đầu; không bao giờ hiện mã thô. */
export function humanizeCode(code: string): string {
  const text = code.replace(/[_-]+/g, ' ').trim().toLowerCase()
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : code
}

/** Nhãn tiếng Việt cho trạng thái hợp đồng; giá trị lạ trả về nguyên bản. */
export function getContractStatusLabel(status: string): string {
  return CONTRACT_STATUS_LABELS[status as ContractStatus] ?? status
}

export function getExecutionStrategyLabel(
  strategy: keyof typeof EXECUTION_STRATEGY_LABELS
): string {
  return EXECUTION_STRATEGY_LABELS[strategy]
}

export function getLegalBasisLabel(id: string): string {
  return LEGAL_BASIS_LABELS[id]?.label ?? humanizeCode(id)
}

export function getLegalBasisSourceUrl(id: string): string | null {
  return LEGAL_BASIS_LABELS[id]?.sourceUrl ?? null
}

export function getLegalProfileLabel(profile: string): string {
  return LEGAL_PROFILE_LABELS[profile] ?? humanizeCode(profile)
}

export function getTemplateLabel(
  key: string,
  version?: string | number | null
): string {
  const label = TEMPLATE_LABELS[key] ?? humanizeCode(key)
  return version === undefined || version === null || version === ''
    ? label
    : `${label} (bản ${version})`
}

export function getLedgerStatusLabel(status: string): string {
  return LEDGER_STATUS_LABELS[status] ?? humanizeCode(status)
}

export function getAmendmentFieldLabel(field: string): string {
  return AMENDMENT_FIELD_LABELS[field] ?? humanizeCode(field)
}
