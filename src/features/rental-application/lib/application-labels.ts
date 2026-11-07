import { humanizeCode } from '@/features/contracts/lib/contract-labels'

const REASON_LABELS: Record<string, string> = {
  PROPERTY_UNAVAILABLE: 'Căn hộ đã có người thuê/giữ chỗ',
  PET_POLICY_VIOLATION: 'Không phù hợp chính sách thú cưng',
  INSUFFICIENT_CRITERIA: 'Chưa đáp ứng tiêu chí',
  OTHER: 'Lý do khác',
}

export const RESERVATION_CONFLICT_MESSAGE =
  'Căn hộ đã có hồ sơ khác được chấp thuận. Hồ sơ này đã được tự động từ chối.'
const ALREADY_RESOLVED_MESSAGE =
  'Hồ sơ này đã được xử lý trước đó. Dữ liệu đang được làm mới.'
const STALE_MESSAGE =
  'Hồ sơ đã được cập nhật bởi một phiên làm việc khác. Dữ liệu đang được làm mới.'
const FALLBACK_ERROR = 'Xử lý hồ sơ thất bại'

export function getApplicationReasonLabel(code: string): string {
  return REASON_LABELS[code] ?? humanizeCode(code)
}

function hasCode(err: unknown, code: string): boolean {
  if (!(err instanceof Error)) return false
  const body = (err as { body?: { code?: string } }).body
  return err.message.includes(code) || body?.code === code
}

export function getRespondErrorMessage(err: unknown, isStale = false): string {
  if (hasCode(err, 'RENTAL_RESERVATION_CONFLICT')) {
    return RESERVATION_CONFLICT_MESSAGE
  }
  if (err instanceof Error && err.message.includes('already been resolved')) {
    return ALREADY_RESOLVED_MESSAGE
  }
  if (isStale || hasCode(err, 'APPLICATION_REVISION_STALE')) {
    return STALE_MESSAGE
  }
  return err instanceof Error ? err.message : FALLBACK_ERROR
}
