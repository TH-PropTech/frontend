'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'

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
}: AuthRequiredModalProps): React.ReactElement | null {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Close on Escape key
  React.useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!mounted || !isOpen || typeof window === 'undefined') return null

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/45 backdrop-blur-[2px] transition-opacity duration-200 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl border border-border bg-white p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-center"
        onClick={e => e.stopPropagation()}
      >
        {/* Lock Icon with soft background */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/8 border border-primary/15">
          <svg
            className="h-7 w-7 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
        </div>

        {/* Title */}
        <h3 className="font-display text-lg font-bold text-fg mb-2">{title}</h3>

        {/* Message */}
        <div className="text-sm text-muted leading-relaxed mb-6">
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

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-border py-3 text-xs font-bold text-muted hover:bg-surface-muted transition-all cursor-pointer"
          >
            Để sau
          </button>
          <a
            href="/login"
            className="flex-1 rounded-xl bg-primary py-3 text-xs font-bold text-white shadow-[0_8px_24px_rgba(198,90,58,0.15)] hover:bg-primary-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 no-underline"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>
            Đăng nhập
          </a>
        </div>
      </div>
    </div>,
    document.body
  )
}
