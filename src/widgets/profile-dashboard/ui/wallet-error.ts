import { readApiErrorCode } from '@/shared/api'

const WALLET_ERROR_MESSAGES: Record<string, string> = {
  WALLET_HOLDER_NAME_MISMATCH:
    'Tên chủ tài khoản phải trùng với họ tên trên hồ sơ của bạn.',
  WALLET_BANK_NOT_SUPPORTED: 'Ngân hàng này chưa được hỗ trợ.',
  PAYMENT_ALREADY_PAID: 'Hóa đơn này đã được thanh toán.',
  PAYMENT_ACCESS_DENIED: 'Bạn không có quyền thanh toán hóa đơn này.',
}

export function describeWalletError(error: unknown): string {
  const code = readApiErrorCode(error)
  if (code && WALLET_ERROR_MESSAGES[code]) return WALLET_ERROR_MESSAGES[code]
  return 'Có lỗi xảy ra, vui lòng thử lại.'
}

export function formatVnd(amount: number): string {
  return `${amount.toLocaleString('vi-VN')} VND`
}
