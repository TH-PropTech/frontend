'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { Modal } from '@/shared/ui/modal'

export function RegisterForm(): React.ReactElement {
  const [isLoading, setIsLoading] = React.useState(false)
  const [showTerms, setShowTerms] = React.useState(false)
  const [showPrivacy, setShowPrivacy] = React.useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Họ và tên"
            type="text"
            placeholder="Nguyễn Văn A"
            required
            autoComplete="name"
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            }
          />
          <Input
            label="Số điện thoại"
            type="tel"
            placeholder="0912 345 678"
            required
            autoComplete="tel"
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            }
          />
        </div>

        <Input
          label="Email"
          type="email"
          placeholder="email@example.com"
          required
          autoComplete="email"
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          }
        />

        <Input
          label="CCCD / CMND"
          type="text"
          placeholder="0012345678901"
          required
          autoComplete="off"
          maxLength={12}
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
          }
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Mật khẩu"
            type="password"
            placeholder="Tối thiểu 8 ký tự"
            required
            autoComplete="new-password"
            minLength={8}
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            }
          />
          <Input
            label="Xác nhận mật khẩu"
            type="password"
            placeholder="Nhập lại mật khẩu"
            required
            autoComplete="new-password"
            minLength={8}
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            }
          />
        </div>

        {/* Terms */}
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 rounded border-border accent-primary"
          />
          <span className="text-xs text-muted leading-relaxed">
            Tôi đồng ý với{' '}
            <button
              type="button"
              onClick={() => setShowTerms(true)}
              className="font-medium text-primary hover:text-primary-hover underline focus:outline-none"
            >
              Điều khoản sử dụng
            </button>{' '}
            và{' '}
            <button
              type="button"
              onClick={() => setShowPrivacy(true)}
              className="font-medium text-primary hover:text-primary-hover underline focus:outline-none"
            >
              Chính sách bảo mật
            </button>
          </span>
        </label>

        <Button
          type="submit"
          size="lg"
          loading={isLoading}
          className="w-full mt-1"
        >
          Tạo tài khoản
        </Button>

        {/* Divider */}
        <div className="relative flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-subtle">hoặc</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Social */}
        <Button type="button" variant="secondary" size="lg" className="w-full">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Đăng ký với Google
        </Button>

        <p className="text-center text-sm text-muted">
          Đã có tài khoản?{' '}
          <Link
            href={'/login' as Route}
            className="font-semibold text-primary hover:text-primary-hover transition-colors"
          >
            Đăng nhập
          </Link>
        </p>
      </form>

      {/* ── Terms of Service Modal ── */}
      <Modal
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        title="Điều khoản sử dụng — TH-PropTech"
      >
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-fg mb-1">1. Giới thiệu dịch vụ</h3>
            <p>
              TH-PropTech là nền tảng quản lý thuê căn hộ thông minh tích hợp
              công nghệ thực tế ảo VR 360° và hợp đồng thông minh Blockchain,
              mang lại trải nghiệm thuê nhà minh bạch, chính xác và an toàn
              tuyệt đối.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-fg mb-1">
              2. Đăng ký và Xác thực tài khoản (KYC)
            </h3>
            <p>
              Để tham gia ký kết hợp đồng, người dùng có trách nhiệm cung cấp
              thông tin cá nhân chính xác và thực hiện định danh tài khoản (KYC)
              thông qua căn cước công dân (CCCD). Mọi thông tin sai lệch có thể
              dẫn đến việc vô hiệu hóa tài khoản và hủy hợp đồng.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-fg mb-1">
              3. Cơ chế giao dịch Blockchain
            </h3>
            <p>
              Các giao dịch đặt cọc và ký hợp đồng thuê nhà điện tử được mã hóa
              và lưu trữ vĩnh viễn trên chuỗi Blockchain. Các dữ liệu này có
              tính chất phi tập trung, không thể sửa đổi hoặc xóa bỏ đơn phương,
              bảo vệ quyền lợi pháp lý tối đa cho cả chủ nhà và khách thuê.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-fg mb-1">
              4. Trách nhiệm người dùng
            </h3>
            <p>
              Khách thuê và chủ nhà phải tự bảo quản thông tin đăng nhập và ví
              liên kết Blockchain cá nhân. TH-PropTech không chịu trách nhiệm
              đối với bất kỳ tổn thất nào phát sinh do lỗi bảo mật từ phía người
              dùng.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-fg mb-1">5. Giải quyết tranh chấp</h3>
            <p>
              Khi xảy ra tranh chấp, các biên bản ký kết ghi nhận trên
              Blockchain và thông tin hình ảnh căn hộ VR 360° đã quét tại thời
              điểm ký kết sẽ được sử dụng làm bằng chứng pháp lý đối chiếu chính
              thức.
            </p>
          </div>
        </div>
      </Modal>

      {/* ── Privacy Policy Modal ── */}
      <Modal
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        title="Chính sách bảo mật — TH-PropTech"
      >
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-fg mb-1">
              1. Thu thập dữ liệu cá nhân
            </h3>
            <p>
              Chúng tôi thu thập các thông tin bao gồm: Họ tên, Số điện thoại,
              Email, thông tin Căn cước công dân (CCCD) và hình ảnh chân dung
              nhằm mục đích xác thực danh tính khách hàng (KYC) bắt buộc trước
              khi giao dịch.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-fg mb-1">
              2. Mục đích sử dụng dữ liệu
            </h3>
            <p>
              Dữ liệu cá nhân được dùng để xác minh tài khoản, lập hợp đồng thuê
              nhà điện tử chính xác, gửi thông báo cập nhật trạng thái căn hộ và
              hỗ trợ xử lý kỹ thuật / tranh chấp phát sinh trong thời gian thuê
              nhà.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-fg mb-1">
              3. Phương thức lưu trữ và Bảo mật Blockchain
            </h3>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>
                Thông tin định danh cá nhân nhạy cảm (như CCCD) được mã hóa bằng
                thuật toán tiên tiến (AES-256) và lưu trữ biệt lập trên máy chủ
                an toàn.
              </li>
              <li>
                Mã hash của các giao dịch, chữ ký điện tử và trạng thái hợp đồng
                sẽ được lưu trực tiếp trên Blockchain công khai nhằm đối chiếu
                tính toàn vẹn nhưng hoàn toàn không làm lộ thông tin cá nhân
                trần của người dùng.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-fg mb-1">4. Chia sẻ thông tin</h3>
            <p>
              Chúng tôi cam kết tuyệt đối không bán hoặc cung cấp thông tin cá
              nhân của người dùng cho bất kỳ bên thứ ba nào vì mục đích thương
              mại, ngoại trừ trường hợp có yêu cầu chính thức bằng văn bản của
              cơ quan pháp luật có thẩm quyền.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-fg mb-1">5. Quyền của người dùng</h3>
            <p>
              Bạn có quyền truy cập, hiệu chỉnh thông tin cá nhân trong phần cài
              đặt tài khoản, hoặc gửi yêu cầu xóa dữ liệu KYC trong trường hợp
              không còn bất kỳ hợp đồng thuê nhà nào đang hoạt động trên hệ
              thống.
            </p>
          </div>
        </div>
      </Modal>
    </>
  )
}
