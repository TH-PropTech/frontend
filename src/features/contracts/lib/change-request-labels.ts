import type { ContractChangeRequestStatus } from '../api/contract-change-requests-api'

export const CHANGE_REQUEST_STATUS_LABELS: Record<
  ContractChangeRequestStatus,
  string
> = {
  'pending-counterparty': 'Chờ bên còn lại phản hồi',
  applied: 'Đã đồng ý và cập nhật hợp đồng',
  rejected: 'Bị từ chối',
  cancelled: 'Đã hủy',
  expired: 'Đã hết hạn',
}

export const CHANGE_REQUEST_CUSTOM_CLAUSES_MAX = 2000

/** Trường cho phép đề nghị đổi trước khi khóa hợp đồng, kèm kiểu nhập. */
export const CHANGE_REQUEST_FIELD_OPTIONS = [
  { field: 'monthlyRent', kind: 'number', needsConsent: true },
  { field: 'deposit', kind: 'number', needsConsent: true },
  { field: 'durationMonths', kind: 'number', needsConsent: true },
  { field: 'paymentDay', kind: 'number', needsConsent: false },
  { field: 'latePenaltyRate', kind: 'number', needsConsent: false },
  { field: 'terminationNoticeDays', kind: 'number', needsConsent: false },
  { field: 'customClauses', kind: 'text', needsConsent: true },
] as const

export type ChangeRequestFieldKind =
  (typeof CHANGE_REQUEST_FIELD_OPTIONS)[number]['kind']

const MONEY_FIELDS = new Set(['monthlyRent', 'deposit'])

/** Giá trị hiển thị cho người dùng; tiền theo VND, rỗng thành "Chưa có". */
export function formatChangeValue(field: string, value: unknown): string {
  if (value === null || value === undefined || value === '') return 'Chưa có'
  if (typeof value === 'number' && MONEY_FIELDS.has(field))
    return `${new Intl.NumberFormat('vi-VN').format(value)} ₫`
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

/** Đổi chuỗi nhập thành giá trị gửi lên; trả `undefined` khi không hợp lệ. */
export function parseChangeInput(
  kind: ChangeRequestFieldKind,
  raw: string
): number | string | undefined {
  if (kind === 'text') return raw.trim().length > 0 ? raw.trim() : undefined
  if (raw.trim() === '') return undefined
  const value = Number(raw)
  return Number.isFinite(value) ? value : undefined
}
