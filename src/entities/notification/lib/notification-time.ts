import type { NotificationItem } from '../api/notifications-api'

const MS_PER_MINUTE = 60_000
const RELATIVE_TIME_LIMIT_DAYS = 30
const UNKNOWN_DAY_LABEL = 'Không rõ ngày'

export interface NotificationDayGroup {
  label: string
  items: NotificationItem[]
}

/** Thời gian tương đối ("5 phút trước"); từ 30 ngày trở lên hiện ngày giờ. */
export function formatNotificationTime(
  createdAt: string,
  now: Date = new Date()
): string {
  const date = new Date(createdAt)
  if (Number.isNaN(date.getTime())) return ''

  const minutes = Math.floor((now.getTime() - date.getTime()) / MS_PER_MINUTE)
  if (minutes < 1) return 'Vừa xong'
  if (minutes < 60) return `${minutes} phút trước`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} giờ trước`

  const days = Math.floor(hours / 24)
  if (days < RELATIVE_TIME_LIMIT_DAYS) return `${days} ngày trước`

  return `${formatDayMonth(date)} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

/** Tự định dạng để kết quả không phụ thuộc phiên bản ICU của môi trường. */
function pad(value: number): string {
  return String(value).padStart(2, '0')
}

function formatDayMonth(date: Date): string {
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}`
}

function dayKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

function dayLabel(date: Date, now: Date): string {
  if (dayKey(date) === dayKey(now)) return 'Hôm nay'
  const yesterday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1
  )
  if (dayKey(date) === dayKey(yesterday)) return 'Hôm qua'
  return `${formatDayMonth(date)}/${date.getFullYear()}`
}

/** Gom theo ngày (giờ địa phương), giữ thứ tự xuất hiện của danh sách gốc. */
export function groupNotificationsByDay(
  items: readonly NotificationItem[],
  now: Date = new Date()
): NotificationDayGroup[] {
  const groups = new Map<string, NotificationDayGroup>()
  for (const item of items) {
    const date = new Date(item.createdAt)
    const isValid = !Number.isNaN(date.getTime())
    const key = isValid ? dayKey(date) : UNKNOWN_DAY_LABEL
    const group = groups.get(key) ?? {
      label: isValid ? dayLabel(date, now) : UNKNOWN_DAY_LABEL,
      items: [],
    }
    group.items.push(item)
    groups.set(key, group)
  }
  return [...groups.values()]
}
