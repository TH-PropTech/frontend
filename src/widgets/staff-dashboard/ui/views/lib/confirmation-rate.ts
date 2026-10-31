export interface ConfirmationRateResult {
  rateText: string
  trend?: { value: string; type: 'up' | 'down' | 'neutral' } | undefined
  subtext: string
}

export function computeConfirmationRate(
  bookings?: {
    total: number
    pending: number
    confirmed: number
    completed: number
    cancelled?: number
  } | null
): ConfirmationRateResult {
  if (!bookings || bookings.total === 0) {
    return {
      rateText: 'Chưa có dữ liệu',
      trend: undefined,
      subtext: 'Chưa có lịch hẹn nào',
    }
  }

  const processed = bookings.confirmed + bookings.completed
  const rate = Math.round((processed / bookings.total) * 100)
  const isAllPending = bookings.pending === bookings.total

  let trend: { value: string; type: 'up' | 'down' | 'neutral' } | undefined

  if (isAllPending) {
    trend = { value: 'Chờ xử lý', type: 'neutral' }
  } else if (rate >= 60) {
    trend = { value: 'Tốt', type: 'up' }
  } else {
    trend = { value: 'Cần cải thiện', type: 'down' }
  }

  return {
    rateText: `${rate}%`,
    trend,
    subtext: 'Đã xác nhận hoặc hoàn thành / tổng',
  }
}
