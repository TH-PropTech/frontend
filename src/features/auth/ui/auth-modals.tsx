'use client'

import * as React from 'react'
import { Modal } from '@/shared/ui/modal'
import { Button } from '@/shared/ui/button'
import { IsometricHouseGlowing } from './components/isometric-house-glowing'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TermsModal({
  isOpen,
  onClose,
}: ModalProps): React.ReactElement {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Điều khoản sử dụng — TH-PropTech"
    >
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-fg mb-1">1. Giới thiệu dịch vụ</h3>
          <p>
            TH-PropTech là nền tảng quản lý thuê căn hộ thông minh tích hợp công
            nghệ thực tế ảo VR 360° và hợp đồng thông minh Blockchain, mang lại
            trải nghiệm thuê nhà minh bạch, chính xác và an toàn tuyệt đối.
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
            Các giao dịch đặt cọc và ký hợp đồng thuê nhà điện tử được mã hóa và
            lưu trữ vĩnh viễn trên chuỗi Blockchain. Các dữ liệu này có tính
            chất phi tập trung, không thể sửa đổi hoặc xóa bỏ đơn phương, bảo vệ
            quyền lợi pháp lý tối đa cho cả chủ nhà và khách thuê.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-fg mb-1">4. Trách nhiệm người dùng</h3>
          <p>
            Khách thuê và chủ nhà phải tự bảo quản thông tin đăng nhập và ví
            liên kết Blockchain cá nhân. TH-PropTech không chịu trách nhiệm đối
            với bất kỳ tổn thất nào phát sinh do lỗi bảo mật từ phía người dùng.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-fg mb-1">5. Giải quyết tranh chấp</h3>
          <p>
            Khi xảy ra tranh chấp, các biên bản ký kết ghi nhận trên Blockchain
            và thông tin hình ảnh căn hộ VR 360° đã quét tại thời điểm ký kết sẽ
            được sử dụng làm bằng chứng pháp lý đối chiếu chính thức.
          </p>
        </div>
      </div>
    </Modal>
  )
}

export function PrivacyModal({
  isOpen,
  onClose,
}: ModalProps): React.ReactElement {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Chính sách bảo mật — TH-PropTech"
    >
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-fg mb-1">
            1. Thu thập dữ liệu cá nhân
          </h3>
          <p>
            Chúng tôi thu thập các thông tin bao gồm: Họ tên, Số điện thoại,
            Email, thông tin Căn cước công dân (CCCD) và hình ảnh chân dung nhằm
            mục đích xác thực danh tính khách hàng (KYC) bắt buộc trước khi giao
            dịch.
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
              thuật toán tiên tiến (AES-256) và lưu trữ biệt lập trên máy chủ an
              toàn.
            </li>
            <li>
              Mã hash của các giao dịch, chữ ký điện tử và trạng thái hợp đồng
              sẽ được lưu trực tiếp trên Blockchain công khai nhằm đối chiếu
              tính toàn vẹn nhưng hoàn toàn không làm lộ thông tin cá nhân trần
              của người dùng.
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-fg mb-1">4. Chia sẻ thông tin</h3>
          <p>
            Chúng tôi cam kết tuyệt đối không bán hoặc cung cấp thông tin cá
            nhân của người dùng cho bất kỳ bên thứ ba nào vì mục đích thương
            mại, ngoại trừ trường hợp có yêu cầu chính thức bằng văn bản của cơ
            quan pháp luật có thẩm quyền.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-fg mb-1">5. Quyền của người dùng</h3>
          <p>
            Bạn có quyền truy cập, hiệu chỉnh thông tin cá nhân trong phần cài
            đặt tài khoản, hoặc gửi yêu cầu xóa dữ liệu KYC trong trường hợp
            không còn bất kỳ hợp đồng thuê nhà nào đang hoạt động trên hệ thống.
          </p>
        </div>
      </div>
    </Modal>
  )
}

export function WelcomeModal({
  isOpen,
  onClose,
}: ModalProps): React.ReactElement {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Chào mừng thành viên mới"
      hideFooter={true}
    >
      <div className="space-y-6 text-center py-2">
        <div className="flex justify-center -mb-6 -mt-2">
          <div className="w-full max-w-[280px]">
            <IsometricHouseGlowing />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-fg">
            Chào mừng bạn đến với TH-PropTech!
          </h3>
          <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
            Tài khoản của bạn đã được kích hoạt thành công. Hãy cùng trải nghiệm
            hệ sinh thái quản lý bất động sản thông minh ứng dụng công nghệ
            Blockchain tiên tiến.
          </p>
        </div>

        <div className="text-left bg-surface-muted/55 border border-line rounded-2xl p-4 space-y-3 max-w-md mx-auto">
          <h4 className="text-xs font-bold text-muted uppercase tracking-wider">
            Các bước khởi đầu cho bạn:
          </h4>

          <div className="flex gap-3">
            <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold">
              1
            </div>
            <div>
              <h5 className="text-sm font-semibold text-fg">
                Xác thực tài khoản (eKYC)
              </h5>
              <p className="text-xs text-muted">
                Cung cấp CCCD để kích hoạt quyền ký hợp đồng điện tử pháp lý.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold">
              2
            </div>
            <div>
              <h5 className="text-sm font-semibold text-fg">
                Liên kết ví Blockchain
              </h5>
              <p className="text-xs text-muted">
                Kết nối ví điện tử để thanh toán cọc và tiền thuê nhà an toàn.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold">
              3
            </div>
            <div>
              <h5 className="text-sm font-semibold text-fg">
                Tìm kiếm & Trải nghiệm VR 360°
              </h5>
              <p className="text-xs text-muted">
                Xem căn hộ thực tế ảo từ xa và tiến hành đặt lịch thuê trực
                tuyến.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Button
            onClick={onClose}
            size="lg"
            className="w-full max-w-xs rounded-full"
          >
            Bắt đầu trải nghiệm
          </Button>
        </div>
      </div>
    </Modal>
  )
}
