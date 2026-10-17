/** Lý do một phương thức ký chưa dùng được (mã từ backend `GET /contracts/:id/signing-methods`). */
const SIGNING_METHOD_REASONS: Readonly<Record<string, string>> = {
  SMARTCA_KYC_REQUIRED:
    'Tài khoản chưa có hồ sơ định danh KYC. Hãy hoàn tất KYC để ký bằng SmartCA.',
  SMARTCA_KYC_NOT_VERIFIED:
    'Hồ sơ KYC chưa được duyệt hoặc thiếu số CCCD. SmartCA cần KYC đã duyệt.',
  SMARTCA_CERTIFICATE_INVALID:
    'Chứng thư số SmartCA không hợp lệ hoặc bị trùng.',
  CONTRACT_ARTIFACT_NOT_LOCKED:
    'Bản PDF hợp đồng chưa được khóa nên chưa thể ký.',
  EXECUTION_POLICY_DEPOSIT_REQUIRED_BEFORE_SIGNING:
    'Cần xác nhận tiền đặt cọc trước khi ký.',
  UNSUPPORTED_RENTAL_EXECUTION_STRATEGY:
    'Trình tự cọc và ký của hợp đồng này chưa được hỗ trợ.',
  CONTRACT_SIGN_ACCESS_DENIED: 'Bạn không có quyền ký hợp đồng này.',
  SIGNING_METHOD_DISABLED: 'Phương thức ký này đang tắt trong cấu hình.',
}

/** Chuyển mã lý do thành câu tiếng Việt; mã lạ giữ nguyên để không giấu thông tin. */
export function describeSigningMethodReason(reason: string): string {
  return SIGNING_METHOD_REASONS[reason] ?? reason
}
