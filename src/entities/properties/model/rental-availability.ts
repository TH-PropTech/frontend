import type { RentalAvailabilityStatus } from './types'

export interface RentalAvailabilitySource {
  rentalAvailabilityStatus?: RentalAvailabilityStatus
  rentalAvailabilityLabel?: string
  tag?: string
  tagText?: string
}

export interface RentalAvailabilityPresentation {
  status: RentalAvailabilityStatus
  label: string
  isApplicationAllowed: boolean
}

const DEFAULT_LABELS: Record<RentalAvailabilityStatus, string> = {
  available: 'Đang trống',
  reserved: 'Có người giữ chỗ',
  'deposit-paid': 'Đã đặt cọc',
  rented: 'Đang cho thuê',
}

export function getRentalAvailabilityPresentation(
  source: RentalAvailabilitySource
): RentalAvailabilityPresentation {
  const status =
    source.rentalAvailabilityStatus ??
    (source.tag === 'empty'
      ? 'available'
      : source.tag === 'pending'
        ? 'reserved'
        : 'rented')
  const projectedLabel = source.rentalAvailabilityLabel?.trim()
  const legacyLabel = source.tagText?.trim()

  return {
    status,
    label: projectedLabel || legacyLabel || DEFAULT_LABELS[status],
    isApplicationAllowed: status === 'available',
  }
}
