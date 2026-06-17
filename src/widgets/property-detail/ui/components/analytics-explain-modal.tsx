'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'

interface AnalyticsExplainModalProps {
  isOpen: boolean
  onClose: () => void
  data: {
    title: string
    description: string
    formula?: string
    visualExample?: string
    steps?: string[]
  } | null
}

export function AnalyticsExplainModal({
  isOpen,
  onClose,
  data,
}: AnalyticsExplainModalProps): React.ReactElement | null {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted || !isOpen || !data || typeof window === 'undefined') return null

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 transition-all duration-300">
      <div className="bg-white border border-border rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative space-y-5 animate-scale-up border-primary/20">
        <h4 className="font-marketing text-lg md:text-xl font-bold text-fg flex items-center gap-2 border-b border-border pb-3.5 text-left">
          <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
          {data.title}
        </h4>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          <div className="space-y-1.5 text-left">
            <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider block">
              Nguyên lý hoạt động:
            </span>
            <p className="text-xs text-fg-muted font-body leading-relaxed font-semibold">
              {data.description}
            </p>
          </div>

          {data.formula && (
            <div className="bg-surface-muted border border-border/80 rounded-2xl p-4 space-y-1 shadow-inner text-left">
              <span className="text-[10px] font-extrabold text-primary uppercase tracking-wider block">
                Công thức tính toán:
              </span>
              <div className="font-mono text-xs text-primary font-bold">
                {data.formula}
              </div>
            </div>
          )}

          {data.visualExample && (
            <div className="bg-success/5 border border-success/20 rounded-2xl p-4 space-y-1.5 text-left">
              <span className="text-[10px] font-extrabold text-success uppercase tracking-wider block">
                Ví dụ trực quan:
              </span>
              <p className="text-xs text-success/90 font-medium leading-relaxed font-body">
                {data.visualExample}
              </p>
            </div>
          )}

          {data.steps && (
            <div className="space-y-2 pt-1 text-left">
              <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider block">
                Các bước xử lý hệ thống:
              </span>
              <ul className="space-y-2 text-xs font-semibold text-fg-muted font-body pl-5 list-decimal leading-relaxed">
                {data.steps.map((step, idx) => (
                  <li
                    key={idx}
                    className="marker:text-primary marker:font-bold"
                  >
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-3 border-t border-border/60">
          <button
            onClick={onClose}
            className="bg-primary text-white text-xs font-bold px-5 py-3 rounded-xl hover:bg-primary/90 transition-all active:scale-95 cursor-pointer shadow-md shadow-primary/10"
          >
            Đóng giải thích
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
