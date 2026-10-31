export type ApartmentModerationStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'rented'
  | 'expired'
  | 'unavailable'
  | 'updating'
  | 'other'

export const APARTMENT_STATUS_LABELS: Record<
  ApartmentModerationStatus,
  string
> = {
  pending: 'Chờ duyệt',
  approved: 'Đã duyệt',
  rejected: 'Bị từ chối',
  rented: 'Đang cho thuê',
  expired: 'Hết hạn',
  unavailable: 'Đã ẩn',
  updating: 'Đang cập nhật',
  other: 'Không rõ',
}

const STATUS_MAP: Record<string, ApartmentModerationStatus> = {
  pending: 'pending',
  available: 'approved',
  rejected: 'rejected',
  rented: 'rented',
  expired: 'expired',
  unavailable: 'unavailable',
  updating: 'updating',
}

/**
 * Maps raw backend apartment status to UI moderation status.
 * Never defaults unknown or rented status to 'pending'.
 */
export function mapApartmentStatus(
  status?: string | null
): ApartmentModerationStatus {
  if (!status) return 'other'
  return STATUS_MAP[status] ?? 'other'
}
