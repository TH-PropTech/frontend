'use client'

import * as React from 'react'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/ui/dialog'
import { UseProfileReturn } from '../model/use-profile'
import { ShieldCheck, UploadCloud, Sparkles, Shield } from 'lucide-react'

interface ModalKycProps {
  profile: UseProfileReturn
}

export function ModalKyc({ profile }: ModalKycProps): React.ReactElement {
  const {
    showKycModal,
    setShowKycModal,
    cccdUploaded,
    isOcrLoading,
    handleUploadCccd,
    kycForm,
    setKycForm,
    handleConfirmKyc,
    setCccdUploaded,
  } = profile

  return (
    <Dialog open={showKycModal} onOpenChange={setShowKycModal}>
      <DialogContent className="max-w-xl p-6 md:p-8 gap-6 bg-white border border-border rounded-2xl shadow-2xl">
        <DialogHeader className="border-b border-border pb-3 text-left">
          <DialogTitle className="font-marketing text-lg font-bold text-fg flex items-center gap-2">
            <ShieldCheck className="h-5.5 w-5.5 text-primary" />
            Xác minh danh tính bằng CCCD điện tử
          </DialogTitle>
          <DialogDescription className="text-xs text-muted mt-1">
            Sử dụng công nghệ nhận diện trí tuệ nhân tạo OCR và băm bảo mật mã
            hóa chuỗi khối.
          </DialogDescription>
        </DialogHeader>

        {!cccdUploaded ? (
          <div className="space-y-4">
            {isOcrLoading ? (
              /* Animated Scanner Box */
              <div className="relative border-2 border-dashed border-primary/40 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 bg-primary-soft/5 overflow-hidden h-56 transition-all">
                {/* Scanning laser line */}
                <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_8px_var(--primary)] animate-scan-line z-10" />

                {/* A mockup CCCD image */}
                <div className="w-56 h-36 border border-border/80 rounded-xl bg-surface/80 flex flex-col justify-between p-4 shadow-sm relative z-0 opacity-60">
                  <div className="flex gap-3">
                    <div className="w-10 h-12 bg-surface-muted rounded" />
                    <div className="space-y-1.5 flex-1 text-left">
                      <div className="h-2.5 bg-surface-muted rounded w-3/4 animate-pulse" />
                      <div className="h-2 bg-surface-muted rounded w-1/2 animate-pulse" />
                      <div className="h-2 bg-surface-muted rounded w-5/6 animate-pulse" />
                    </div>
                  </div>
                  <div className="h-2 bg-surface-muted rounded w-2/3 animate-pulse text-left" />
                </div>

                <span className="text-xs font-bold text-primary animate-pulse z-10">
                  Đang nhận diện ký tự OCR & băm mật mã...
                </span>
              </div>
            ) : (
              <div className="border-2 border-dashed border-border rounded-2xl p-10 flex flex-col items-center justify-center gap-4 bg-surface/40 hover:bg-surface-muted/10 hover:border-primary/40 transition-colors text-center">
                <div className="h-12 w-12 rounded-full bg-primary-soft flex items-center justify-center text-primary">
                  <UploadCloud className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-fg block">
                    Kéo thả hoặc click để tải lên mặt trước & sau của CCCD
                  </span>
                  <span className="text-[10px] text-muted block">
                    Định dạng file: JPG, PNG, PDF tối đa 5MB
                  </span>
                </div>
                <Button
                  onClick={handleUploadCccd}
                  className="h-10 text-xs px-6 rounded-full font-bold shadow-sm"
                >
                  Tải ảnh lên & Quét thông tin
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-border/40 pb-2">
              <h4 className="text-xs font-bold text-primary uppercase flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" />
                Thông tin tự động trích xuất từ CCCD
              </h4>
              <Badge
                variant="outline"
                className="text-[9px] font-mono py-0.5 bg-success-soft text-success border-success/20"
              >
                OCR 99% ACCURACY
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider block">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value={kycForm.fullName}
                    onChange={e =>
                      setKycForm({ ...kycForm, fullName: e.target.value })
                    }
                    className="w-full border border-border rounded-xl px-4 py-2 text-xs text-fg focus:outline-none focus:border-primary bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider block">
                    Số CCCD
                  </label>
                  <input
                    type="text"
                    value={kycForm.cccdNumber}
                    onChange={e =>
                      setKycForm({ ...kycForm, cccdNumber: e.target.value })
                    }
                    className="w-full border border-border rounded-xl px-4 py-2 text-xs text-fg focus:outline-none focus:border-primary bg-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider block">
                    Ngày sinh
                  </label>
                  <input
                    type="text"
                    value={kycForm.dob}
                    onChange={e =>
                      setKycForm({ ...kycForm, dob: e.target.value })
                    }
                    className="w-full border border-border rounded-xl px-4 py-2 text-xs text-fg focus:outline-none focus:border-primary bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider block">
                    Địa chỉ thường trú
                  </label>
                  <input
                    type="text"
                    value={kycForm.address}
                    onChange={e =>
                      setKycForm({ ...kycForm, address: e.target.value })
                    }
                    className="w-full border border-border rounded-xl px-4 py-2 text-xs text-fg focus:outline-none focus:border-primary bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="bg-success-soft/20 border border-success/30 rounded-2xl p-4 text-[10px] text-muted leading-relaxed flex gap-2">
              <Shield className="h-4.5 w-4.5 text-success shrink-0 mt-0.5" />
              <span>
                Thông tin CCCD sau khi xác nhận sẽ được băm mật mã (hash) và đối
                chiếu bảo mật trên chuỗi. Bản ghi có giá trị pháp lý tuyệt đối
                để ký kết hợp đồng điện tử.
              </span>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => setCccdUploaded(false)}
                variant="secondary"
                className="flex-1 h-10 text-xs rounded-full font-bold"
              >
                Quét lại
              </Button>
              <Button
                onClick={handleConfirmKyc}
                className="flex-1 h-10 text-xs bg-success hover:bg-success/90 text-white rounded-full font-bold shadow-md flex items-center justify-center gap-1 border-none"
              >
                <ShieldCheck className="h-4 w-4" />
                Xác nhận & Ký băm Blockchain
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
