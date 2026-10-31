import { describe, expect, it } from 'vitest'
import {
  humanizeCode,
  getPriorityLabel,
  getTicketStatusLabel,
  getTicketCategoryLabel,
  getRiskLevelLabel,
  getReportStatusLabel,
  getReportCategoryLabel,
  getAuthorRoleLabel,
  getTopicLabel,
  getPostStatusLabel,
  formatRecordCode,
} from './admin-labels'

describe('admin-labels', () => {
  it('maps priority codes correctly', () => {
    expect(getPriorityLabel('low')).toBe('Thấp')
    expect(getPriorityLabel('normal')).toBe('Bình thường')
    expect(getPriorityLabel('high')).toBe('Cao')
    expect(getPriorityLabel('urgent')).toBe('Khẩn cấp')
  })

  it('maps ticket status codes correctly', () => {
    expect(getTicketStatusLabel('open')).toBe('Mới tiếp nhận')
    expect(getTicketStatusLabel('in_progress')).toBe('Đang xử lý')
    expect(getTicketStatusLabel('waiting_customer')).toBe('Chờ khách phản hồi')
    expect(getTicketStatusLabel('resolved')).toBe('Đã giải quyết')
    expect(getTicketStatusLabel('closed')).toBe('Đã đóng')
  })

  it('maps ticket categories correctly', () => {
    expect(getTicketCategoryLabel('kyc')).toBe('Định danh (KYC)')
    expect(getTicketCategoryLabel('payment')).toBe('Thanh toán')
    expect(getTicketCategoryLabel('technical')).toBe('Kỹ thuật hệ thống')
  })

  it('maps risk levels correctly', () => {
    expect(getRiskLevelLabel('low')).toBe('Rủi ro thấp')
    expect(getRiskLevelLabel('critical')).toBe('Đặc biệt nghiêm trọng')
  })

  it('maps report statuses and categories correctly', () => {
    expect(getReportStatusLabel('investigating')).toBe('Đang điều tra')
    expect(getReportCategoryLabel('fake_listing')).toBe('Tin đăng ảo')
    expect(getReportCategoryLabel('wrong_info')).toBe(
      'Thông tin không chính xác'
    )
  })

  it('maps author roles and topics correctly', () => {
    expect(getAuthorRoleLabel('tenant')).toBe('Khách thuê')
    expect(getAuthorRoleLabel('landlord')).toBe('Chủ nhà')
    expect(getTopicLabel('qa')).toBe('Hỏi đáp')
    expect(getTopicLabel('roommate')).toBe('Tìm bạn ở ghép')
    expect(getPostStatusLabel('rejected')).toBe('Bị từ chối')
  })

  it('formats record codes without dumping raw 24-character ObjectIds', () => {
    expect(formatRecordCode('507f1f77bcf86cd799439011')).toBe('HS-439011')
    expect(formatRecordCode(null)).toBe('Chưa cập nhật')
  })

  it('humanizes unknown snake_case codes without leaking raw syntax', () => {
    expect(humanizeCode('pending_contract_review')).toBe(
      'Pending contract review'
    )
    expect(humanizeCode(null)).toBe('Chưa cập nhật')
  })

  it('never outputs raw UPPER_SNAKE or snake_case enums', () => {
    const outputs = [
      getPriorityLabel('urgent'),
      getTicketStatusLabel('in_progress'),
      getRiskLevelLabel('critical'),
      getReportStatusLabel('investigating'),
      getReportCategoryLabel('fake_listing'),
      getAuthorRoleLabel('tenant'),
      getTopicLabel('qa'),
      getPostStatusLabel('approved'),
    ]

    for (const output of outputs) {
      expect(output).not.toMatch(/[A-Z]{3,}(_[A-Z0-9]+){2,}/)
      expect(output).not.toMatch(/^[a-z]+_[a-z]+$/)
    }
  })
})
