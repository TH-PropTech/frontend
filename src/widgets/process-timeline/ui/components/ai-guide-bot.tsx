'use client'

import * as React from 'react'
import { AI_GUIDES } from '../../model/ai-guide-data'
import { AiMascot } from './ai-mascot'

export interface AiGuideBotProps {
  articleId: string
  isVisible: boolean
}

export function AiGuideBot({
  articleId,
  isVisible,
}: AiGuideBotProps): React.ReactElement | null {
  const guide = AI_GUIDES[articleId]
  const [checkedSteps, setCheckedSteps] = React.useState<
    Record<number, boolean>
  >({})
  const [isMascotHappy, setIsMascotHappy] = React.useState(false)
  const [activeStepIndex, setActiveStepIndex] = React.useState(0)
  const [mascotTop, setMascotTop] = React.useState(28)
  const [isMascotCrawling, setIsMascotCrawling] = React.useState(false)

  // Reset states when active article changes
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCheckedSteps({})
      setIsMascotHappy(false)
      setActiveStepIndex(0)
      setMascotTop(28)
      setIsMascotCrawling(false)
    }, 0)
    return () => clearTimeout(timer)
  }, [articleId])

  // Track DOM position to crawl to the active step
  React.useEffect(() => {
    if (!isVisible) return

    let timer: NodeJS.Timeout | undefined

    const measure = () => {
      const activeEl = document.getElementById(`step-btn-${activeStepIndex}`)
      const trackEl = document.getElementById('mascot-track-col')

      if (activeEl && trackEl) {
        setIsMascotCrawling(true)
        const activeRect = activeEl.getBoundingClientRect()
        const trackRect = trackEl.getBoundingClientRect()

        // Calculate exact relative vertical position and clamp to prevent clipping
        const rawTop =
          activeRect.top - trackRect.top + activeRect.height / 2 - 48
        const minTop = 8
        const maxTop = Math.max(minTop, trackRect.height - 104) // mascot height is 96px plus 8px padding
        const clampedTop = Math.min(maxTop, Math.max(minTop, rawTop))
        setMascotTop(clampedTop)

        timer = setTimeout(() => {
          setIsMascotCrawling(false)
        }, 1000) // matches the transition duration (1000ms)
      }
    }

    // Quick measurement for immediate feedback
    const layoutTimer = setTimeout(measure, 50)

    // Second measurement after card expands completely (550ms expansion transition)
    const animTimer = setTimeout(measure, 600)

    return () => {
      clearTimeout(layoutTimer)
      clearTimeout(animTimer)
      if (timer) clearTimeout(timer)
    }
  }, [activeStepIndex, articleId, isVisible])

  if (!guide) return null

  const handleStepToggle = (index: number): void => {
    setCheckedSteps(prev => {
      const nextState = { ...prev, [index]: !prev[index] }
      if (nextState[index]) {
        setIsMascotHappy(true)
        setTimeout(() => {
          setIsMascotHappy(false)
        }, 1500)
      }
      return nextState
    })
    setActiveStepIndex(index)
  }

  const handleMascotClick = (): void => {
    setIsMascotHappy(true)
    setTimeout(() => {
      setIsMascotHappy(false)
    }, 1500)
  }

  return (
    <div
      className="transition-all duration-500 ease-in-out overflow-hidden"
      style={{
        maxHeight: isVisible ? '800px' : '0px',
        opacity: isVisible ? 1 : 0,
        marginBottom: isVisible ? '24px' : '0px',
      }}
    >
      <div className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-white/95 via-primary/[0.01] to-primary/[0.03] p-6 shadow-md backdrop-blur-md overflow-hidden group">
        {/* Wiggle / Crawling keyframes */}
        <style>{`
          @keyframes mascot-wiggle {
            0%, 100% { transform: rotate(-8deg); }
            50% { transform: rotate(8deg); }
          }
          .anim-mascot-wiggle {
            animation: mascot-wiggle 0.15s infinite ease-in-out;
          }
          @keyframes slide-down-bounce {
            0% { transform: translateY(-20px); opacity: 0; }
            70% { transform: translateY(4px); }
            100% { transform: translateY(0); opacity: 1; }
          }
          .animate-slide-down-bounce {
            animation: slide-down-bounce 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          }
        `}</style>

        {/* Glow Effect */}
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl pointer-events-none group-hover:bg-primary/15 transition-all duration-500" />
        <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-primary/10">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-xl bg-primary/20 opacity-75 duration-1000" />
              <svg
                className="h-5 w-5 animate-bounce"
                style={{ animationDuration: '2s' }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-marketing text-base font-extrabold text-fg flex items-center gap-1.5">
                {guide.title}
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary tracking-wide">
                  TRỢ LÝ AI
                </span>
              </h4>
              <p className="text-xs text-muted font-medium">
                Trực quan hóa quy trình thực hiện
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="mt-4 space-y-4">
          <p className="font-body text-sm text-muted leading-relaxed font-semibold">
            {guide.summary}
          </p>

          <div className="relative flex gap-6 items-start">
            {/* Checklist Column */}
            <div className="flex-1 space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted/80 block">
                Các bước cần thực hiện:
              </span>
              <div className="grid grid-cols-1 gap-2">
                {guide.steps.map((step, idx) => {
                  const isChecked = !!checkedSteps[idx]
                  const isActive = activeStepIndex === idx
                  return (
                    <div
                      key={idx}
                      id={`step-btn-${idx}`}
                      onClick={() => setActiveStepIndex(idx)}
                      onMouseEnter={() => setActiveStepIndex(idx)}
                      className={`flex items-start text-left gap-3.5 p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-primary/[0.05] border-primary/50 shadow-sm ring-1 ring-primary/10 scale-[1.01]'
                          : isChecked
                            ? 'bg-primary/[0.01] border-primary/20 opacity-80'
                            : 'bg-white/50 border-border/70 hover:border-primary/25 hover:bg-white/80'
                      }`}
                    >
                      {/* Checkbox button */}
                      <button
                        onClick={e => {
                          e.stopPropagation()
                          handleStepToggle(idx)
                        }}
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/30 hover:border-primary bg-white transition-all duration-200 cursor-pointer"
                      >
                        {isChecked ? (
                          <svg
                            className="h-3.5 w-3.5 text-primary animate-in zoom-in duration-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-muted/20 hover:bg-primary/50 transition-colors" />
                        )}
                      </button>
                      <span
                        className={`font-body text-[13px] leading-relaxed transition-all duration-200 ${
                          isChecked
                            ? 'text-muted line-through decoration-muted/50 font-semibold'
                            : 'text-fg font-bold'
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Mascot Track Column */}
            <div
              id="mascot-track-col"
              className="relative w-24 self-stretch hidden md:block shrink-0 border-l border-primary/10 pl-4"
            >
              <div
                className={`absolute left-4 transition-all duration-1000 ease-in-out ${
                  isMascotCrawling ? 'anim-mascot-wiggle' : ''
                } ${isVisible ? 'animate-slide-down-bounce' : ''}`}
                style={{
                  top: `${mascotTop}px`,
                }}
              >
                {/* Speech Bubble floating left of Mascot pointing towards active step card */}
                {guide.stepTips && guide.stepTips[activeStepIndex] && (
                  <div className="absolute right-28 top-1/2 -translate-y-1/2 w-60 bg-white border border-primary/20 text-fg p-3.5 rounded-xl shadow-md text-xs leading-relaxed font-semibold animate-in fade-in duration-300 z-10">
                    <div className="relative">
                      <span className="text-primary font-bold block mb-1 text-[11px] uppercase tracking-wider">
                        Gợi ý từ trợ lý
                      </span>
                      {guide.stepTips[activeStepIndex]}
                      {/* Arrow pointing right to Mascot */}
                      <div className="absolute top-1/2 -translate-y-1/2 -right-[17px] w-0 h-0 border-[8px] border-transparent border-l-white" />
                      <div className="absolute top-1/2 -translate-y-1/2 -right-[19px] w-0 h-0 border-[8px] border-transparent border-l-primary/20 -z-10" />
                    </div>
                  </div>
                )}

                <AiMascot isHappy={isMascotHappy} onClick={handleMascotClick} />
              </div>
            </div>
          </div>

          {/* AI Tip / Suggestion (No emojis, larger text, custom SVG bulb) */}
          <div className="relative rounded-xl border border-amber-500/25 bg-amber-500/[0.03] p-4 text-xs text-amber-900 leading-relaxed font-semibold flex gap-2.5">
            <svg
              className="h-5 w-5 text-amber-600 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <div>
              <span className="font-bold text-sm text-amber-950 block mb-1">
                Mẹo từ trợ lý AI:
              </span>
              <span className="text-amber-900/90 leading-relaxed">
                {guide.tip}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
