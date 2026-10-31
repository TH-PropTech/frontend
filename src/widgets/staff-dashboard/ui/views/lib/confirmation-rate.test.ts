import { describe, expect, it } from 'vitest'
import { computeConfirmationRate } from './confirmation-rate'

describe('computeConfirmationRate', () => {
  it('returns "Chưa có dữ liệu" with no trend when total bookings is 0 or null', () => {
    const emptyResult = computeConfirmationRate({
      total: 0,
      pending: 0,
      confirmed: 0,
      completed: 0,
    })
    expect(emptyResult.rateText).toBe('Chưa có dữ liệu')
    expect(emptyResult.trend).toBeUndefined()

    const nullResult = computeConfirmationRate(null)
    expect(nullResult.rateText).toBe('Chưa có dữ liệu')
    expect(nullResult.trend).toBeUndefined()
  })

  it('handles scenario where all bookings are pending without showing negative trend', () => {
    const allPending = computeConfirmationRate({
      total: 2,
      pending: 2,
      confirmed: 0,
      completed: 0,
    })
    expect(allPending.rateText).toBe('0%')
    expect(allPending.trend).toEqual({
      value: 'Chờ xử lý',
      type: 'neutral',
    })
    expect(allPending.subtext).toBe('Đã xác nhận hoặc hoàn thành / tổng')
  })

  it('computes percentage correctly for mixed confirmed and completed bookings', () => {
    const good = computeConfirmationRate({
      total: 10,
      pending: 2,
      confirmed: 5,
      completed: 2,
    })
    // 7/10 = 70%
    expect(good.rateText).toBe('70%')
    expect(good.trend).toEqual({
      value: 'Tốt',
      type: 'up',
    })

    const low = computeConfirmationRate({
      total: 10,
      pending: 2,
      confirmed: 1,
      completed: 1,
    })
    // 2/10 = 20%
    expect(low.rateText).toBe('20%')
    expect(low.trend).toEqual({
      value: 'Cần cải thiện',
      type: 'down',
    })
  })
})
