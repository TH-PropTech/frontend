/**
 * Che số định danh (CCCD/CMND) theo cùng quy tắc với hợp đồng ở backend
 * (`contract-view.service.ts`): giữ 3 ký tự đầu và 3 ký tự cuối, ví dụ `080***567`.
 * Giữ quy tắc này đồng bộ với backend. Trả về null khi thiếu hoặc quá ngắn.
 */
export function maskIdNumber(value?: string | null): string | null {
  const id = value?.trim()
  if (!id || id.length < 6) return null
  return `${id.slice(0, 3)}***${id.slice(-3)}`
}
