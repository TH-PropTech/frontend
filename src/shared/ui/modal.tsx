'use client'

import * as React from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  hideFooter?: boolean
  /** 'xl' is for wide forms; default keeps the narrow reading width. */
  size?: 'md' | 'xl'
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  hideFooter = false,
  size = 'md',
}: ModalProps): React.ReactElement | null {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }

    return (): void => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-fg/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        className={`relative z-10 flex flex-col w-full ${size === 'xl' ? 'max-w-4xl' : 'max-w-2xl'} max-h-[90vh] bg-surface rounded-xl border border-border shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface-muted/30">
          <h2 className="text-base font-bold text-fg font-display">{title}</h2>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-subtle hover:bg-fg/5 hover:text-fg transition-all"
            onClick={onClose}
            aria-label="Đóng cửa sổ"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 text-sm text-muted leading-relaxed font-body">
          {children}
        </div>

        {/* Footer */}
        {!hideFooter && (
          <div className="flex items-center justify-end px-6 py-3.5 border-t border-border bg-surface-muted/20">
            <button
              type="button"
              className="px-4 py-2 bg-primary hover:bg-primary-hover text-on-control rounded-lg text-xs font-semibold shadow-sm transition-all"
              onClick={onClose}
            >
              Đồng ý và Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
