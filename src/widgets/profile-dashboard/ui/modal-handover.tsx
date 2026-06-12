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
import {
  CheckSquare,
  Check,
  AlertTriangle,
  ShieldCheck,
  FileSignature,
} from 'lucide-react'

interface ModalHandoverProps {
  profile: UseProfileReturn
}

export function ModalHandover({
  profile,
}: ModalHandoverProps): React.ReactElement {
  const {
    showHandoverModal,
    setShowHandoverModal,
    handoverChecks,
    setHandoverChecks,
    handleConfirmHandover,
  } = profile

  return (
    <Dialog open={showHandoverModal} onOpenChange={setShowHandoverModal}>
      <DialogContent className="max-w-xl p-6 md:p-8 gap-6 bg-white border border-border rounded-2xl shadow-2xl">
        <DialogHeader className="border-b border-border pb-3 text-left">
          <DialogTitle className="font-marketing text-lg font-bold text-fg flex items-center gap-2">
            <CheckSquare className="h-5.5 w-5.5 text-primary" />
            Biên bản bàn giao căn hộ điện tử
          </DialogTitle>
          <DialogDescription className="text-xs text-muted mt-1">
            Đối chiếu và xác nhận tình trạng thực tế của trang thiết bị tại các
            phòng.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 text-left">
          <div className="space-y-3.5">
            {/* Living room */}
            <div className="flex justify-between items-center py-2.5 border-b border-border/50 gap-4">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-fg block">
                  Phòng khách
                </span>
                <span className="text-[10px] text-muted block">
                  Hệ thống Sofa, Đèn điện & Điều hòa
                </span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setHandoverChecks({
                      ...handoverChecks,
                      livingRoom: 'good',
                    })
                  }
                  className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer border-none ${
                    handoverChecks.livingRoom === 'good'
                      ? 'bg-success text-white shadow-sm'
                      : 'bg-surface border border-border text-muted hover:bg-surface-muted/50'
                  }`}
                >
                  <Check className="h-3 w-3" />
                  Tốt
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setHandoverChecks({
                      ...handoverChecks,
                      livingRoom: 'bad',
                    })
                  }
                  className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer border-none ${
                    handoverChecks.livingRoom === 'bad'
                      ? 'bg-danger text-white shadow-sm'
                      : 'bg-surface border border-border text-muted hover:bg-surface-muted/50'
                  }`}
                >
                  <AlertTriangle className="h-3 w-3" />
                  Có lỗi
                </button>
              </div>
            </div>

            {/* Bedroom */}
            <div className="flex justify-between items-center py-2.5 border-b border-border/50 gap-4">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-fg block">
                  Phòng ngủ
                </span>
                <span className="text-[10px] text-muted block">
                  Giường tủ, Đệm & Hệ thống rèm cửa
                </span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setHandoverChecks({
                      ...handoverChecks,
                      bedroom: 'good',
                    })
                  }
                  className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer border-none ${
                    handoverChecks.bedroom === 'good'
                      ? 'bg-success text-white shadow-sm'
                      : 'bg-surface border border-border text-muted hover:bg-surface-muted/50'
                  }`}
                >
                  <Check className="h-3 w-3" />
                  Tốt
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setHandoverChecks({ ...handoverChecks, bedroom: 'bad' })
                  }
                  className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer border-none ${
                    handoverChecks.bedroom === 'bad'
                      ? 'bg-danger text-white shadow-sm'
                      : 'bg-surface border border-border text-muted hover:bg-surface-muted/50'
                  }`}
                >
                  <AlertTriangle className="h-3 w-3" />
                  Có lỗi
                </button>
              </div>
            </div>

            {/* Kitchen */}
            <div className="flex justify-between items-center py-2.5 border-b border-border/50 gap-4">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-fg block">
                  Phòng bếp
                </span>
                <span className="text-[10px] text-muted block">
                  Hệ thống tủ bếp, Bếp từ & Tủ lạnh
                </span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setHandoverChecks({
                      ...handoverChecks,
                      kitchen: 'good',
                    })
                  }
                  className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer border-none ${
                    handoverChecks.kitchen === 'good'
                      ? 'bg-success text-white shadow-sm'
                      : 'bg-surface border border-border text-muted hover:bg-surface-muted/50'
                  }`}
                >
                  <Check className="h-3 w-3" />
                  Tốt
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setHandoverChecks({ ...handoverChecks, kitchen: 'bad' })
                  }
                  className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer border-none ${
                    handoverChecks.kitchen === 'bad'
                      ? 'bg-danger text-white shadow-sm'
                      : 'bg-surface border border-border text-muted hover:bg-surface-muted/50'
                  }`}
                >
                  <AlertTriangle className="h-3 w-3" />
                  Có lỗi
                </button>
              </div>
            </div>

            {/* Bathroom */}
            <div className="flex justify-between items-center py-2.5 border-b border-border/50 gap-4">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-fg block">
                  Nhà vệ sinh
                </span>
                <span className="text-[10px] text-muted block">
                  Bình nóng lạnh, Vòi sen & Hệ thống nước
                </span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setHandoverChecks({
                      ...handoverChecks,
                      bathroom: 'good',
                    })
                  }
                  className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer border-none ${
                    handoverChecks.bathroom === 'good'
                      ? 'bg-success text-white shadow-sm'
                      : 'bg-surface border border-border text-muted hover:bg-surface-muted/50'
                  }`}
                >
                  <Check className="h-3 w-3" />
                  Tốt
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setHandoverChecks({
                      ...handoverChecks,
                      bathroom: 'bad',
                    })
                  }
                  className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer border-none ${
                    handoverChecks.bathroom === 'bad'
                      ? 'bg-danger text-white shadow-sm'
                      : 'bg-surface border border-border text-muted hover:bg-surface-muted/50'
                  }`}
                >
                  <AlertTriangle className="h-3 w-3" />
                  Có lỗi
                </button>
              </div>
            </div>
          </div>

          <div className="bg-primary-soft/30 border border-primary/20 rounded-2xl p-4 text-[10px] text-muted leading-relaxed flex gap-2">
            <ShieldCheck className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
            <span>
              Sau khi cả 2 bên thống nhất trạng thái và ký số xác nhận biên bản
              bàn giao, mã băm (hash) mật mã sẽ được tải lên blockchain làm bằng
              chứng pháp lý bất biến.
            </span>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              onClick={() => setShowHandoverModal(false)}
              variant="secondary"
              className="flex-1 h-10 text-xs rounded-full font-bold"
            >
              Hủy bỏ
            </Button>
            <Button
              onClick={handleConfirmHandover}
              className="flex-1 h-10 text-xs bg-primary hover:bg-primary-hover text-white rounded-full font-bold shadow-md flex items-center justify-center gap-1 border-none"
            >
              <FileSignature className="h-4 w-4" />
              Ký & Nhận bàn giao Căn hộ
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
