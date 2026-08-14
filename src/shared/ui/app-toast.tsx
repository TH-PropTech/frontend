'use client'

import type { ReactElement } from 'react'
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react'
import { toast } from 'sonner'

export type AppToastType = 'success' | 'error' | 'info'

interface AppToastCardProps {
  readonly type: AppToastType
  readonly title: string
  readonly message: string
  readonly onDismiss?: () => void
}

const TOAST_PRESENTATION = {
  success: {
    icon: CheckCircle2,
    iconClassName: 'text-[var(--success)] bg-[var(--success)]/10',
  },
  error: {
    icon: AlertCircle,
    iconClassName: 'text-[var(--danger)] bg-[var(--danger)]/10',
  },
  info: {
    icon: Info,
    iconClassName: 'text-[var(--info)] bg-[var(--info)]/10',
  },
} as const

const DEFAULT_TITLE: Record<AppToastType, string> = {
  success: 'Thành công',
  error: 'Có lỗi xảy ra',
  info: 'Thông báo',
}

export function AppToastCard({
  type,
  title,
  message,
  onDismiss,
}: AppToastCardProps): ReactElement {
  const presentation = TOAST_PRESENTATION[type]
  const Icon = presentation.icon

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      className="flex w-[min(24rem,calc(100vw-2rem))] items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-raised)] p-4 text-[var(--fg)] shadow-xl"
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${presentation.iconClassName}`}
      >
        <Icon aria-hidden="true" className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold">{title}</span>
        <span className="mt-0.5 block text-sm leading-5 text-[var(--muted)]">
          {message}
        </span>
      </span>
      {onDismiss ? (
        <button
          type="button"
          aria-label="Đóng thông báo"
          onClick={onDismiss}
          className="rounded-full p-1 text-[var(--muted)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  )
}

interface AppToastOptions {
  readonly title?: string
  readonly duration?: number
}

function showAppToast(
  type: AppToastType,
  message: string,
  options: AppToastOptions = {}
): string | number {
  return toast.custom(
    toastId => (
      <AppToastCard
        type={type}
        title={options.title ?? DEFAULT_TITLE[type]}
        message={message}
        onDismiss={() => toast.dismiss(toastId)}
      />
    ),
    { duration: options.duration ?? 4000 }
  )
}

export const appToast = {
  success: (message: string, options?: AppToastOptions): string | number =>
    showAppToast('success', message, options),
  error: (message: string, options?: AppToastOptions): string | number =>
    showAppToast('error', message, options),
  info: (message: string, options?: AppToastOptions): string | number =>
    showAppToast('info', message, options),
} as const
