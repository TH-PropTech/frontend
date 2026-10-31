import { describe, expect, it } from 'vitest'
import {
  mapApartmentStatus,
  APARTMENT_STATUS_LABELS,
} from './apartment-moderation'

describe('mapApartmentStatus', () => {
  it('maps standard backend statuses accurately', () => {
    expect(mapApartmentStatus('pending')).toBe('pending')
    expect(mapApartmentStatus('available')).toBe('approved')
    expect(mapApartmentStatus('rejected')).toBe('rejected')
    expect(mapApartmentStatus('unavailable')).toBe('unavailable')
    expect(mapApartmentStatus('rented')).toBe('rented')
    expect(mapApartmentStatus('expired')).toBe('expired')
    expect(mapApartmentStatus('updating')).toBe('updating')
  })

  it('maps unknown, null or empty status to other, never defaults to pending', () => {
    expect(mapApartmentStatus('unknown_status')).toBe('other')
    expect(mapApartmentStatus('')).toBe('other')
    expect(mapApartmentStatus(null)).toBe('other')
    expect(mapApartmentStatus(undefined)).toBe('other')
  })

  it('provides plain Vietnamese labels for every moderation status', () => {
    expect(APARTMENT_STATUS_LABELS.pending).toBe('Chờ duyệt')
    expect(APARTMENT_STATUS_LABELS.approved).toBe('Đã duyệt')
    expect(APARTMENT_STATUS_LABELS.rejected).toBe('Bị từ chối')
    expect(APARTMENT_STATUS_LABELS.rented).toBe('Đang cho thuê')
    expect(APARTMENT_STATUS_LABELS.expired).toBe('Hết hạn')
    expect(APARTMENT_STATUS_LABELS.unavailable).toBe('Đã ẩn')
    expect(APARTMENT_STATUS_LABELS.updating).toBe('Đang cập nhật')
    expect(APARTMENT_STATUS_LABELS.other).toBe('Không rõ')
  })
})
