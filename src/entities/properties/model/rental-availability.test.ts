import { describe, expect, it } from 'vitest'
import { getRentalAvailabilityPresentation } from './rental-availability'

describe('getRentalAvailabilityPresentation', () => {
  it.each([
    ['available', 'Đang trống', true],
    ['reserved', 'Có người giữ chỗ', false],
    ['deposit-paid', 'Đã đặt cọc', false],
    ['rented', 'Đang cho thuê', false],
  ] as const)(
    'maps %s to an explicit application state',
    (status, label, isApplicationAllowed) => {
      expect(
        getRentalAvailabilityPresentation({
          rentalAvailabilityStatus: status,
        })
      ).toEqual({ status, label, isApplicationAllowed })
    }
  )

  it('prefers the backend projection label over a stale legacy tag', () => {
    expect(
      getRentalAvailabilityPresentation({
        rentalAvailabilityStatus: 'deposit-paid',
        rentalAvailabilityLabel: 'Đã đặt cọc',
        tag: 'empty',
        tagText: 'Trống',
      })
    ).toMatchObject({
      status: 'deposit-paid',
      label: 'Đã đặt cọc',
      isApplicationAllowed: false,
    })
  })

  it('keeps legacy mock cards readable until the projection is present', () => {
    expect(
      getRentalAvailabilityPresentation({
        tag: 'pending',
        tagText: 'Đang chờ cọc',
      })
    ).toEqual({
      status: 'reserved',
      label: 'Đang chờ cọc',
      isApplicationAllowed: false,
    })
  })
})
