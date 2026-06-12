'use client'

import * as React from 'react'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/ui/dialog'
import { UseProfileReturn } from '../model/use-profile'
import { FileText, ShieldCheck, FileSignature } from 'lucide-react'

interface ModalContractProps {
  profile: UseProfileReturn
}

export function ModalContract({
  profile,
}: ModalContractProps): React.ReactElement {
  const {
    showContractModal,
    setShowContractModal,
    role,
    activeProperty,
    handleSignContract,
  } = profile

  return (
    <Dialog open={showContractModal} onOpenChange={setShowContractModal}>
      <DialogContent className="max-w-2xl p-6 md:p-8 gap-6 bg-white border border-border rounded-2xl shadow-2xl flex flex-col max-h-[85vh]">
        <DialogHeader className="border-b border-border pb-3 text-left shrink-0">
          <DialogTitle className="font-marketing text-lg font-bold text-fg flex items-center gap-2">
            <FileText className="h-5.5 w-5.5 text-primary" />
            Chi tiết Điều khoản Hợp đồng Thuê nhà Điện tử
          </DialogTitle>
          <DialogDescription className="text-xs text-muted mt-1">
            Mã số hợp đồng:{' '}
            {role === 'tenant' ? 'CTR-2026-0048' : activeProperty.code}
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Document Text */}
        <div className="flex-1 overflow-y-auto pr-2 border border-border/80 rounded-xl p-4 bg-surface/30 text-xs text-fg space-y-4 leading-relaxed font-body scrollbar-thin text-left">
          <h4 className="text-center font-bold text-sm uppercase">
            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
          </h4>
          <h5 className="text-center font-bold text-xs uppercase -mt-2">
            Độc lập - Tự do - Hạnh phúc
          </h5>
          <div className="border-t border-border/60 my-2" />

          <h4 className="text-center font-bold text-sm uppercase">
            HỢP ĐỒNG THUÊ CĂN HỘ CHUNG CƯ
          </h4>

          <p className="font-semibold">
            Hôm nay, ngày 10 tháng 06 năm 2026, chúng tôi gồm các bên:
          </p>

          <div className="space-y-1">
            <p className="font-bold">BÊN CHO THUÊ (BÊN A): LÊ HOÀNG MINH</p>
            <p>
              Số CCCD: 012093005678 - Nơi cấp: Cục Cảnh sát Quảnh lý Hành chính
              về Trật tự Xã hội
            </p>
            <p>
              Địa chỉ thường trú: 100 Nguyễn Hữu Cảnh, Phường 22, Bình Thạnh,
              TP.HCM
            </p>
          </div>

          <div className="space-y-1">
            <p className="font-bold">BÊN THUÊ (BÊN B): NGUYỄN VĂN A</p>
            <p>
              Số CCCD: 038096001234 - Nơi cấp: Cục Cảnh sát Quản lý Hành chính
              về Trật tự Xã hội
            </p>
            <p>
              Địa chỉ thường trú: 720A Điện Biên Phủ, Phường 22, Bình Thạnh,
              TP.HCM
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-bold">ĐIỀU 1: ĐỐI TƯỢNG HỢP ĐỒNG</p>
            <p>
              Bên A đồng ý cho Bên B thuê căn hộ chung cư tọa lạc tại:{' '}
              {role === 'tenant'
                ? 'Vinhomes Central Park - Căn hộ #102'
                : activeProperty.name}
              . Diện tích sử dụng: 75 m² bao gồm 2 phòng ngủ đầy đủ nội thất cơ
              bản.
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-bold">ĐIỀU 2: THỜI HẠN VÀ GIÁ THUÊ</p>
            <p>
              2.1 Thời hạn thuê là 12 tháng, bắt đầu từ ngày 15/06/2026 đến ngày
              15/06/2027.
            </p>
            <p>
              2.2 Giá thuê căn hộ cố định trong suốt thời gian hợp đồng là:{' '}
              <strong className="text-primary">
                {role === 'tenant'
                  ? '18.000.000đ'
                  : activeProperty.price.toLocaleString() + 'đ'}
                /tháng
              </strong>
              .
            </p>
            <p>
              2.3 Tiền đặt cọc bảo đảm là:{' '}
              <strong className="text-primary">
                {role === 'tenant'
                  ? '18.000.000đ'
                  : activeProperty.price.toLocaleString() + 'đ'}
              </strong>
              , khoản tiền này được khóa ký quỹ thông qua Smart Contract trên hệ
              thống Blockchain.
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-bold">ĐIỀU 3: QUYỀN VÀ NGHĨA VỤ CỦA CÁC BÊN</p>
            <p>
              3.1 Bên A có trách nhiệm bàn giao căn hộ và trang thiết bị đúng
              hiện trạng thỏa thuận, hỗ trợ khai báo tạm trú và sửa chữa các sự
              cố lỗi khách quan lớn.
            </p>
            <p>
              3.2 Bên B phải thanh toán tiền nhà đúng hạn (trước ngày 5 hàng
              tháng), giữ gìn tài sản chung, không được tự ý sửa đổi kiến trúc
              khi chưa có sự đồng ý bằng văn bản của Bên A.
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-bold">
              ĐIỀU 4: PHƯƠNG THỨC GIẢI QUYẾT TRANH CHẤP
            </p>
            <p>
              Mọi tranh chấp phát sinh sẽ được ưu tiên giải quyết thông qua
              thương lượng. Trong trường hợp không thể thỏa thuận, dữ liệu hành
              trình băm mã hóa trên Sổ cái Ledger của hệ thống TH-PropTech sẽ
              được sử dụng làm bằng chứng số đối chiếu pháp lý.
            </p>
          </div>
        </div>

        <div className="bg-primary-soft/30 border border-primary/20 rounded-2xl p-4 text-[10px] text-muted leading-relaxed flex gap-2 shrink-0 text-left">
          <ShieldCheck className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
          <span>
            Khi bấm nút &quot;Xác nhận ký số&quot;, hệ thống sẽ tiến hành gửi
            giao dịch băm mã hóa của các điều khoản trên lên Smart Contract mạng
            Sepolia.
          </span>
        </div>

        <div className="flex gap-3 pt-2 shrink-0">
          <Button
            onClick={() => setShowContractModal(false)}
            variant="secondary"
            className="flex-1 h-10 text-xs rounded-full font-bold"
          >
            Hủy bỏ
          </Button>
          <Button
            onClick={() => {
              setShowContractModal(false)
              handleSignContract()
            }}
            className="flex-1 h-10 text-xs bg-primary hover:bg-primary-hover text-white rounded-full font-bold shadow-md flex items-center justify-center gap-1.5 border-none"
          >
            <FileSignature className="h-4 w-4" />
            Xác nhận ký số bằng Ví Web3
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
