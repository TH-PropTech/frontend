'use client'

import * as React from 'react'
import {
  createFloorplanInitMessage,
  isTrustedFloorplanMessage,
  parseFloorplanMessage,
} from '../lib/floorplan-messages'
import type { FloorplanConfig } from '../model/floorplan-config'

interface ApartmentFloorplanFrameProps {
  config: FloorplanConfig
  onClose?: () => void
  /** 'bare': chỉ vùng xem 3D (dùng cho xem trước trong trang quản trị). */
  variant?: 'card' | 'bare'
  heightClass?: string
}

export function ApartmentFloorplanFrame({
  config,
  onClose,
  variant = 'card',
  heightClass = 'h-[560px]',
}: ApartmentFloorplanFrameProps): React.ReactElement {
  const frameRef = React.useRef<HTMLIFrameElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [status, setStatus] = React.useState<'loading' | 'ready' | 'error'>(
    'loading'
  )
  const [errorCode, setErrorCode] = React.useState<string | null>(null)
  const [attempt, setAttempt] = React.useState(0)
  // Phóng to khung ra toàn màn hình khi trình duyệt không cho iframe dùng Fullscreen API (ví dụ iOS Safari).
  const [expanded, setExpanded] = React.useState(false)

  const postToFrame = React.useCallback(
    (
      message:
        | ReturnType<typeof createFloorplanInitMessage>
        | {
            version: 1
            type: 'FLOORPLAN_PAUSE' | 'FLOORPLAN_RESUME' | 'FLOORPLAN_RESET'
          }
        | {
            version: 1
            type: 'FLOORPLAN_EXPANDED'
            payload: { expanded: boolean }
          }
    ) => {
      frameRef.current?.contentWindow?.postMessage(
        message,
        window.location.origin
      )
    },
    []
  )

  React.useEffect(() => {
    const timeout = window.setTimeout(() => {
      setStatus(current => (current === 'loading' ? 'error' : current))
      setErrorCode(current => current ?? 'FRAME_TIMEOUT')
    }, 10_000)
    const handleMessage = (event: MessageEvent): void => {
      const source = frameRef.current?.contentWindow ?? null
      if (!isTrustedFloorplanMessage(event, source, window.location.origin))
        return
      const message = parseFloorplanMessage(event.data)
      if (!message) return
      if (message.type === 'FLOORPLAN_READY') {
        setStatus('ready')
        postToFrame(createFloorplanInitMessage(config))
        return
      }
      if (message.type === 'FLOORPLAN_EXPAND_TOGGLE') {
        setExpanded(current => !current)
        return
      }
      if (message.type === 'FLOORPLAN_ERROR') {
        setStatus('error')
        setErrorCode(message.payload.code)
      }
    }
    window.addEventListener('message', handleMessage)
    return () => {
      window.clearTimeout(timeout)
      window.removeEventListener('message', handleMessage)
    }
  }, [attempt, config, postToFrame])

  // Admin sửa thiết kế khi đang xem trước: gửi lại cấu hình, viewer tự dựng lại cảnh (bỏ qua nếu y hệt).
  React.useEffect(() => {
    if (status === 'ready') postToFrame(createFloorplanInitMessage(config))
  }, [config, status, postToFrame])

  React.useEffect(() => {
    const handleVisibility = (): void => {
      postToFrame({
        version: 1,
        type: document.hidden ? 'FLOORPLAN_PAUSE' : 'FLOORPLAN_RESUME',
      })
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () =>
      document.removeEventListener('visibilitychange', handleVisibility)
  }, [postToFrame])

  React.useEffect(() => {
    const container = containerRef.current
    if (!container || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return
      postToFrame({
        version: 1,
        type: entry.isIntersecting ? 'FLOORPLAN_RESUME' : 'FLOORPLAN_PAUSE',
      })
    })
    observer.observe(container)
    return () => observer.disconnect()
  }, [postToFrame])

  React.useEffect(() => {
    if (status === 'ready') {
      postToFrame({
        version: 1,
        type: 'FLOORPLAN_EXPANDED',
        payload: { expanded },
      })
    }
  }, [expanded, status, postToFrame])

  React.useEffect(() => {
    if (!expanded) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setExpanded(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', handleKey)
    }
  }, [expanded])

  const handleRetry = (): void => {
    setErrorCode(null)
    setStatus('loading')
    setAttempt(current => current + 1)
  }

  const handleFrameError = (): void => {
    setStatus('error')
    setErrorCode('IFRAME_LOAD_FAILED')
  }

  const handleReset = (): void =>
    postToFrame({ version: 1, type: 'FLOORPLAN_RESET' })

  const bare = variant === 'bare'
  return (
    <div
      ref={containerRef}
      className={
        expanded
          ? 'fixed inset-0 z-[70] flex flex-col overflow-hidden bg-surface'
          : bare
            ? 'overflow-hidden rounded-2xl border border-border bg-surface'
            : 'overflow-hidden rounded-3xl border border-border bg-surface'
      }
    >
      {bare ? null : (
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
          <div>
            <h3 className="font-marketing text-lg font-bold text-fg">
              Sơ đồ 3D minh hoạ
            </h3>
            <p className="mt-1 text-xs text-muted">
              Bố cục mô phỏng từ thông tin tin đăng, có thể khác hiện trạng thực
              tế.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl border border-border px-3 py-2 text-xs font-semibold text-muted hover:bg-surface-muted"
              aria-label="Đặt lại góc nhìn sơ đồ 3D"
            >
              Đặt lại
            </button>
            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-border px-3 py-2 text-xs font-semibold text-muted hover:bg-surface-muted"
                aria-label="Đóng sơ đồ 3D"
              >
                Đóng
              </button>
            ) : null}
          </div>
        </div>
      )}
      <div
        className={`relative bg-surface-muted ${
          expanded ? 'min-h-0 flex-1' : heightClass
        }`}
      >
        <iframe
          key={attempt}
          ref={frameRef}
          src="/apartment-floorplan/index.html"
          title="Sơ đồ 3D minh hoạ"
          className="h-full w-full border-0"
          loading="eager"
          allow="fullscreen"
          allowFullScreen
          onError={handleFrameError}
        />
        {status === 'loading' ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-surface/80 text-sm font-semibold text-muted">
            Đang chuẩn bị sơ đồ 3D...
          </div>
        ) : null}
        {status === 'error' ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface/95 p-6 text-center">
            <p className="text-sm font-semibold text-fg">
              Không thể tải sơ đồ 3D lúc này.
            </p>
            <p className="text-xs text-muted">
              Mã lỗi: {errorCode ?? 'UNKNOWN'}
            </p>
            <button
              type="button"
              onClick={handleRetry}
              className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary-hover"
            >
              Thử lại
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
