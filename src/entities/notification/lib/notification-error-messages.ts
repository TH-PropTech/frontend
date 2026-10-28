import type { NotificationErrorKind } from '../model/use-notifications'

/** Thông điệp hiển thị cho người dùng theo từng loại lỗi khi tải thông báo. */
export const NOTIFICATION_ERROR_MESSAGES: Readonly<
  Record<NotificationErrorKind, string>
> = {
  network:
    'Không thể kết nối máy chủ thông báo. Vui lòng thử lại khi mở lại danh sách.',
  auth: 'Phiên đăng nhập không còn hợp lệ. Vui lòng đăng nhập lại.',
  unknown: 'Không thể tải thông báo lúc này. Vui lòng thử lại sau.',
}
