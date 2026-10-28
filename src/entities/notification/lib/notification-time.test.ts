import { describe, expect, it } from 'vitest'
import type { NotificationItem } from '../api/notifications-api'
import {
  formatNotificationTime,
  groupNotificationsByDay,
} from './notification-time'

const NOW = new Date(2026, 9, 25, 15, 0, 0)

function minutesAgo(minutes: number): string {
  return new Date(NOW.getTime() - minutes * 60_000).toISOString()
}

function at(
  day: number,
  hour: number,
  month = 9,
  id = `${month}-${day}-${hour}`
): NotificationItem {
  return {
    _id: id,
    title: 'Tiêu đề',
    body: 'Nội dung',
    type: 'OTHER',
    isRead: false,
    createdAt: new Date(2026, month, day, hour, 0, 0).toISOString(),
  }
}

describe('formatNotificationTime', () => {
  it.each([
    [0, 'Vừa xong'],
    [1, '1 phút trước'],
    [59, '59 phút trước'],
    [60, '1 giờ trước'],
    [23 * 60 + 59, '23 giờ trước'],
    [24 * 60, '1 ngày trước'],
    [29 * 24 * 60, '29 ngày trước'],
  ])('%d phút trước → %s', (minutes, expected) => {
    expect(formatNotificationTime(minutesAgo(minutes), NOW)).toBe(expected)
  })

  it('từ 30 ngày trở lên hiện ngày tháng thay vì số ngày', () => {
    const text = formatNotificationTime(minutesAgo(40 * 24 * 60), NOW)

    expect(text).toMatch(/\d{2}\/\d{2}/)
    expect(text).not.toContain('ngày trước')
  })

  it('thời điểm ở tương lai (lệch đồng hồ) coi như vừa xong', () => {
    expect(formatNotificationTime(minutesAgo(-5), NOW)).toBe('Vừa xong')
  })

  it('ngày không hợp lệ trả chuỗi rỗng thay vì "NaN"', () => {
    expect(formatNotificationTime('không phải ngày', NOW)).toBe('')
  })
})

describe('groupNotificationsByDay', () => {
  it('gom theo ngày, giữ nguyên thứ tự và gắn nhãn Hôm nay / Hôm qua', () => {
    const items = [at(25, 14), at(25, 9), at(24, 20), at(20, 8)]

    const groups = groupNotificationsByDay(items, NOW)

    expect(groups.map(group => group.label)).toEqual([
      'Hôm nay',
      'Hôm qua',
      expect.stringMatching(/20\/10\/2026/),
    ])
    expect(groups.map(group => group.items.length)).toEqual([2, 1, 1])
    expect(groups[0]?.items.map(item => item._id)).toEqual([
      '9-25-14',
      '9-25-9',
    ])
  })

  it('"Hôm qua" đúng cả khi qua ranh giới tháng', () => {
    const now = new Date(2026, 10, 1, 9, 0, 0)

    const groups = groupNotificationsByDay([at(31, 20, 9)], now)

    expect(groups.map(group => group.label)).toEqual(['Hôm qua'])
  })

  it('danh sách rỗng cho ra nhóm rỗng', () => {
    expect(groupNotificationsByDay([], NOW)).toEqual([])
  })

  it('ngày không hợp lệ rơi vào nhóm "Không rõ ngày" thay vì làm hỏng danh sách', () => {
    const broken: NotificationItem = { ...at(25, 9), createdAt: 'xxx' }

    const groups = groupNotificationsByDay([broken], NOW)

    expect(groups.map(group => group.label)).toEqual(['Không rõ ngày'])
  })
})
