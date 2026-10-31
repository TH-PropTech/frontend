/**
 * Từ điển nhãn tiếng Việt cho Staff Dashboard (Admin Console).
 * Ánh xạ toàn bộ enum / code nội bộ sang ngôn ngữ người dùng tự nhiên.
 * Tuyệt đối không để lộ enum thô (UPPER_SNAKE hay snake_case).
 */

export function humanizeCode(code: string | null | undefined): string {
  if (!code) return 'Chưa cập nhật'
  const text = code.replace(/[_-]+/g, ' ').trim().toLowerCase()
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : code
}

const PRIORITY_LABELS: Record<string, string> = {
  low: 'Thấp',
  normal: 'Bình thường',
  high: 'Cao',
  urgent: 'Khẩn cấp',
}

export function getPriorityLabel(priority: string | null | undefined): string {
  if (!priority) return 'Bình thường'
  return PRIORITY_LABELS[priority.toLowerCase()] ?? humanizeCode(priority)
}

const TICKET_STATUS_LABELS: Record<string, string> = {
  open: 'Mới tiếp nhận',
  in_progress: 'Đang xử lý',
  waiting_customer: 'Chờ khách phản hồi',
  waiting_staff: 'Chờ nhân viên',
  escalated: 'Đã chuyển tuyến trên',
  resolved: 'Đã giải quyết',
  closed: 'Đã đóng',
}

export function getTicketStatusLabel(
  status: string | null | undefined
): string {
  if (!status) return 'Chưa cập nhật'
  return TICKET_STATUS_LABELS[status.toLowerCase()] ?? humanizeCode(status)
}

const TICKET_CATEGORY_LABELS: Record<string, string> = {
  account: 'Tài khoản',
  listing: 'Tin đăng',
  booking: 'Đặt cọc & thuê',
  payment: 'Thanh toán',
  kyc: 'Định danh (KYC)',
  technical: 'Kỹ thuật hệ thống',
  feedback: 'Đóng góp ý kiến',
}

export function getTicketCategoryLabel(
  category: string | null | undefined
): string {
  if (!category) return 'Chung'
  return (
    TICKET_CATEGORY_LABELS[category.toLowerCase()] ?? humanizeCode(category)
  )
}

const RISK_LEVEL_LABELS: Record<string, string> = {
  low: 'Rủi ro thấp',
  medium: 'Rủi ro trung bình',
  high: 'Rủi ro cao',
  critical: 'Đặc biệt nghiêm trọng',
}

export function getRiskLevelLabel(risk: string | null | undefined): string {
  if (!risk) return 'Chưa đánh giá'
  return RISK_LEVEL_LABELS[risk.toLowerCase()] ?? humanizeCode(risk)
}

const REPORT_STATUS_LABELS: Record<string, string> = {
  pending: 'Chờ xử lý',
  investigating: 'Đang điều tra',
  resolved: 'Đã xử lý',
  dismissed: 'Đã bỏ qua',
}

export function getReportStatusLabel(
  status: string | null | undefined
): string {
  if (!status) return 'Chờ xử lý'
  return REPORT_STATUS_LABELS[status.toLowerCase()] ?? humanizeCode(status)
}

const REPORT_CATEGORY_LABELS: Record<string, string> = {
  fake_listing: 'Tin đăng ảo',
  scam: 'Dấu hiệu lừa đảo',
  harassment: 'Hành vi quấy rối',
  wrong_info: 'Thông tin không chính xác',
  other: 'Lý do khác',
}

export function getReportCategoryLabel(
  category: string | null | undefined
): string {
  if (!category) return 'Báo cáo khác'
  return (
    REPORT_CATEGORY_LABELS[category.toLowerCase()] ?? humanizeCode(category)
  )
}

const AUTHOR_ROLE_LABELS: Record<string, string> = {
  tenant: 'Khách thuê',
  landlord: 'Chủ nhà',
  staff: 'Nhân viên',
  admin: 'Quản trị viên',
}

export function getAuthorRoleLabel(role: string | null | undefined): string {
  if (!role) return 'Khách thuê'
  return AUTHOR_ROLE_LABELS[role.toLowerCase()] ?? humanizeCode(role)
}

const TOPIC_LABELS: Record<string, string> = {
  qa: 'Hỏi đáp',
  review: 'Đánh giá',
  roommate: 'Tìm bạn ở ghép',
}

export function getTopicLabel(topic: string | null | undefined): string {
  if (!topic) return 'Thảo luận'
  return TOPIC_LABELS[topic.toLowerCase()] ?? humanizeCode(topic)
}

const POST_STATUS_LABELS: Record<string, string> = {
  pending: 'Chờ duyệt',
  approved: 'Đã duyệt',
  rejected: 'Bị từ chối',
}

export function getPostStatusLabel(status: string | null | undefined): string {
  if (!status) return 'Chờ duyệt'
  return POST_STATUS_LABELS[status.toLowerCase()] ?? humanizeCode(status)
}

/**
 * Rút gọn ID kỹ thuật dài (ObjectId 24 ký tự) thành chuỗi dễ đọc,
 * ví dụ: "6724..." hoặc 6 ký tự cuối, không in cả ObjectId thô.
 */
export function formatRecordCode(
  id: string | null | undefined,
  prefix = 'HS'
): string {
  if (!id) return 'Chưa cập nhật'
  const clean = id.trim()
  if (clean.length > 8) {
    return `${prefix}-${clean.slice(-6).toUpperCase()}`
  }
  return clean
}
