/**
 * Định dạng ngày theo chuẩn Việt Nam dd/MM/yyyy, múi giờ Asia/Ho_Chi_Minh.
 * Giá trị rỗng hoặc không hợp lệ trả về '—'.
 */
export function formatDate(
  value: string | number | Date | null | undefined
): string {
  if (!value) return '—'
  const date =
    typeof value === 'string' || typeof value === 'number'
      ? new Date(value)
      : value
  if (isNaN(date.getTime())) return '—'

  return new Intl.DateTimeFormat('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}
