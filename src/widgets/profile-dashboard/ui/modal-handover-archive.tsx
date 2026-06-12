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
import { ShieldCheck, Copy } from 'lucide-react'

interface ModalHandoverArchiveProps {
  profile: UseProfileReturn
}

export function ModalHandoverArchive({
  profile,
}: ModalHandoverArchiveProps): React.ReactElement {
  const {
    showHandoverArchiveModal,
    setShowHandoverArchiveModal,
    role,
    activeProperty,
    handleCopyText,
  } = profile

  return (
    <Dialog
      open={showHandoverArchiveModal}
      onOpenChange={setShowHandoverArchiveModal}
    >
      <DialogContent className="max-w-xl p-6 md:p-8 gap-6 bg-white border border-border rounded-2xl shadow-2xl">
        <DialogHeader className="border-b border-border pb-3 text-left">
          <DialogTitle className="font-marketing text-lg font-bold text-fg flex items-center gap-2">
            <ShieldCheck className="h-5.5 w-5.5 text-success" />
            Biên bản bàn giao thiết bị đã ký số
          </DialogTitle>
          <DialogDescription className="text-xs text-muted mt-1">
            Hợp đồng:{' '}
            {role === 'tenant' ? 'CTR-2026-0048' : activeProperty.code}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-left">
          <div className="divide-y divide-border/60 border border-border rounded-2xl overflow-hidden bg-surface/10 text-xs">
            <div className="flex justify-between items-center p-3">
              <span className="font-semibold text-fg">
                1. Phòng khách (Sofa, điều hòa, tủ kệ)
              </span>
              <Badge
                variant="outline"
                className="text-[10px] py-0.5 bg-success-soft text-success border-success/20"
              >
                Tốt
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3">
              <span className="font-semibold text-fg">
                2. Phòng ngủ (Giường, rèm cửa, nệm)
              </span>
              <Badge
                variant="outline"
                className="text-[10px] py-0.5 bg-success-soft text-success border-success/20"
              >
                Tốt
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3">
              <span className="font-semibold text-fg">
                3. Phòng bếp (Tủ lạnh, bếp từ, tủ kệ bếp)
              </span>
              <Badge
                variant="outline"
                className="text-[10px] py-0.5 bg-success-soft text-success border-success/20"
              >
                Tốt
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3">
              <span className="font-semibold text-fg">
                4. Nhà vệ sinh (Bình nóng lạnh, vòi sen, bồn rửa)
              </span>
              <Badge
                variant="outline"
                className="text-[10px] py-0.5 bg-success-soft text-success border-success/20"
              >
                Tốt
              </Badge>
            </div>
          </div>

          <div className="border border-border/80 rounded-2xl p-4 bg-surface-muted/30 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 font-mono text-muted">
              <span className="text-[10px] font-sans">
                Mã giao dịch Blockchain:
              </span>
              <span
                className="text-primary font-bold truncate flex-1 select-all"
                title="0x5c9f9a9213cd990112d430a0be1c99f1a2098bcfd"
              >
                0x5c9f9a9213cd990112d430a0be1c99f1a2098bcfd
              </span>
              <button
                type="button"
                onClick={() =>
                  handleCopyText('0x5c9f9a9213cd990112d430a0be1c99f1a2098bcfd')
                }
                className="text-subtle hover:text-fg transition-colors"
              >
                <Copy className="h-3 w-3" />
              </button>
            </div>
            <p className="text-[10px] text-muted leading-relaxed font-body">
              Biên bản được ký số mật mã vào lúc 10/06/2026 17:30 bằng chữ ký số
              Ledger của cả hai bên. Giao dịch này là bất biến và không thể sửa
              đổi.
            </p>
          </div>

          <Button
            onClick={() => setShowHandoverArchiveModal(false)}
            className="w-full h-10 text-xs rounded-full font-bold"
          >
            Đóng cửa sổ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
