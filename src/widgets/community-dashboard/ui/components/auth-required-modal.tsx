'use client'

import * as React from 'react'
import { Lock, LogIn } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/shared/ui/dialog'

interface AuthRequiredModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: React.ReactNode
}

export function AuthRequiredModal({
  isOpen,
  onClose,
  title = 'Yêu cầu đăng nhập',
  description,
}: AuthRequiredModalProps): React.ReactElement {
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-sm rounded-2xl border-border bg-surface p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-primary/15 bg-primary-soft">
          <Lock className="h-7 w-7 text-primary" aria-hidden />
        </div>

        <DialogTitle className="text-center font-display text-lg font-bold text-fg">
          {title}
        </DialogTitle>

        <DialogDescription asChild>
          <div className="text-sm leading-relaxed text-muted">
            {description ?? (
              <>
                Vui lòng đăng nhập để tương tác với cộng đồng.
                <br />
                <span className="text-xs text-subtle">
                  Bạn có thể đăng bài, bình luận và vote sau khi đăng nhập.
                </span>
              </>
            )}
          </div>
        </DialogDescription>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 flex-1 rounded-xl border border-border py-3 text-xs font-bold text-muted transition-colors hover:bg-surface-muted"
          >
            Để sau
          </button>
          <a
            href="/login"
            className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-primary-foreground shadow-md no-underline transition-colors hover:bg-primary-hover"
          >
            <LogIn className="h-4 w-4" aria-hidden />
            Đăng nhập
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
