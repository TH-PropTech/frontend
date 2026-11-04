/** Lý do một lần gửi ký VNPT SmartCA v2 thất bại (mã từ `POST /contracts/:id/smartca/sign-v2`). */
const SMARTCA_V2_ERROR_REASONS: Readonly<Record<string, string>> = {
  SMARTCA_OTP_INVALID:
    'Mã OTP không đúng hoặc đã hết hạn. Lấy lại mã OTP mới trên app VNPT SmartCA rồi gửi lại.',
  SMARTCA_CREDENTIAL_REJECTED:
    'Mật khẩu SmartCA không đúng. Kiểm tra lại và gửi lại.',
  SMARTCA_CREDENTIAL_OR_REQUEST_REJECTED:
    'VNPT SmartCA từ chối yêu cầu. Kiểm tra lại mật khẩu và OTP rồi gửi lại.',
  SMARTCA_CERTIFICATE_INVALID:
    'Chứng thư số SmartCA không hợp lệ hoặc bị trùng.',
  SMARTCA_CERTIFICATE_SELECTION_REQUIRED:
    'Tài khoản SmartCA có nhiều chứng thư số. Chọn một chứng thư rồi gửi lại.',
  SMARTCA_INTEGRATED_CERTIFICATE_REQUIRED:
    'Hãy chọn chứng thư tích hợp (eSeal) của TH PropTech để ký.',
  SMARTCA_SERVICE_PACK_EXPIRED:
    'Tài khoản SmartCA đã hết lượt ký. Mua thêm lượt ký trong app VNPT SmartCA rồi thử lại.',
  SMARTCA_PROVIDER_UNAVAILABLE:
    'Không kết nối được tới VNPT SmartCA. Thử lại sau ít phút.',
  SMARTCA_NOT_CONFIGURED: 'Hệ thống chưa cấu hình VNPT SmartCA.',
} as const

/**
 * Signing is one call that VNPT confirms server-side, so a request cut off in the browser
 * (timeout, network drop, abort) may still have been signed. Do not tell the user it failed.
 */
const NO_RESPONSE_PATTERN =
  /timeout|failed to fetch|fetch failed|canceled|aborted|network/i
export const NO_RESPONSE_MESSAGE =
  'Chưa nhận được phản hồi từ máy chủ nên chưa rõ đã ký hay chưa. Hãy tải lại trang và kiểm tra trạng thái hợp đồng trước khi ký lại.'

/** Chuyển mã lỗi ký v2 thành câu tiếng Việt; mã lạ giữ nguyên để không giấu thông tin. */
export function describeSmartCaV2Error(message: string): string {
  if (NO_RESPONSE_PATTERN.test(message)) return NO_RESPONSE_MESSAGE
  return SMARTCA_V2_ERROR_REASONS[message] ?? message
}
