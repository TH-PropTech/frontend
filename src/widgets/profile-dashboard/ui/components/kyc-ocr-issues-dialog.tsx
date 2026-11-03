'use client'

import * as React from 'react'
import { Camera, PencilLine, TriangleAlert } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import type { OcrIssue } from '../../lib/kyc-ocr-issues'

interface KycOcrIssuesDialogProps {
  issues: OcrIssue[]
  /** Clear the flagged card photos so the user can take them again. */
  onRetake: () => void
  /** Keep going; the extracted fields stay editable in the confirmation form. */
  onContinue: () => void
  /** Close without changing anything (Esc or click outside). */
  onDismiss: () => void
}

export function KycOcrIssuesDialog({
  issues,
  onRetake,
  onContinue,
  onDismiss,
}: KycOcrIssuesDialogProps): React.ReactElement {
  return (
    <Dialog
      open={issues.length > 0}
      onOpenChange={open => {
        if (!open) onDismiss()
      }}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TriangleAlert
              className="h-5 w-5 text-amber-600"
              aria-hidden="true"
            />
            Chưa đọc đủ thông tin trên thẻ
          </DialogTitle>
          <DialogDescription>
            Bạn có thể chụp lại ảnh, hoặc tiếp tục và nhập hoặc chỉnh thông tin
            ở bước xác nhận.
          </DialogDescription>
        </DialogHeader>

        <ul className="space-y-2" aria-label="Các vấn đề khi đọc thẻ">
          {issues.map(issue => (
            <li
              key={issue.side}
              className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900"
            >
              {issue.message}
            </li>
          ))}
        </ul>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onRetake}>
            <Camera className="mr-1.5 h-4 w-4" aria-hidden="true" />
            Chụp lại ảnh
          </Button>
          <Button onClick={onContinue}>
            <PencilLine className="mr-1.5 h-4 w-4" aria-hidden="true" />
            Tiếp tục &amp; sửa thông tin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
