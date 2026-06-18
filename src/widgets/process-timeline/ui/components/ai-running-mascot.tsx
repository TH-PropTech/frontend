'use client'

import * as React from 'react'
import { AI_GUIDES } from '../../model/ai-guide-data'

export interface AiRunningMascotProps {
  isVisible: boolean
  onClose: () => void
}

export function AiRunningMascot({
  isVisible,
  onClose,
}: AiRunningMascotProps): React.ReactElement | null {
  const [positionX, setPositionX] = React.useState(0)
  const [facingRight, setFacingRight] = React.useState(true)
  const [isMoving, setIsMoving] = React.useState(false)
  const [transitionDuration, setTransitionDuration] = React.useState(0)
  const [speechText, setSpeechText] = React.useState<string | null>(null)
  const [showSpeech, setShowSpeech] = React.useState(false)
  const [speechTimer, setSpeechTimer] = React.useState<NodeJS.Timeout | null>(
    null
  )
  const [jumpCount, setJumpCount] = React.useState(0)

  // Move back and forth loop
  React.useEffect(() => {
    if (!isVisible) return

    let timeoutId: NodeJS.Timeout
    const moveNext = (): void => {
      const delay = Math.random() * 6000 + 8000 // Every 8s to 14s
      timeoutId = setTimeout(() => {
        setPositionX(current => {
          const target = Math.floor(Math.random() * 120) - 60 // Walk within [-60, 60] px
          const distance = Math.abs(target - current)

          if (distance < 20) {
            moveNext()
            return current
          }

          const speed = 15 // 15px per second
          const duration = distance / speed

          setFacingRight(target > current)
          setIsMoving(true)
          setTransitionDuration(duration)

          setTimeout(() => {
            setIsMoving(false)
            moveNext()
          }, duration * 1000)

          return target
        })
      }, delay)
    }

    moveNext()

    return () => {
      clearTimeout(timeoutId)
    }
  }, [isVisible])

  if (!isVisible) return null

  // Trigger speech bubble
  const handleInteraction = (): void => {
    // Jump animation
    setJumpCount(prev => prev + 1)
    setTimeout(() => {
      setJumpCount(prev => (prev > 0 ? prev - 1 : 0))
    }, 500)

    // Clear old timer
    if (speechTimer) {
      clearTimeout(speechTimer)
    }

    // Pick a random tip from AI Guides
    const guides = Object.values(AI_GUIDES)
    const randomGuide = guides[Math.floor(Math.random() * guides.length)]
    const randomTip = randomGuide
      ? randomGuide.tip
      : 'Chào bạn! Mình có thể giúp gì cho bạn?'

    // Strip any emojis from tip just in case
    const cleanTip = randomTip.replace(
      /[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF]/g,
      ''
    )

    setSpeechText(cleanTip)
    setShowSpeech(true)

    const timer = setTimeout(() => {
      setShowSpeech(false)
    }, 6000)
    setSpeechTimer(timer)
  }

  return (
    <div
      className="fixed bottom-6 right-20 z-50 flex flex-col items-center select-none"
      style={{
        transform: `translate3d(${positionX}px, 0, 0)`,
        transition: isMoving
          ? `transform ${transitionDuration}s linear`
          : 'transform 0.5s ease-out',
      }}
    >
      <style>{`
        @keyframes mascot-leg-left {
          0%, 100% { transform: rotate(-20deg); }
          50% { transform: rotate(20deg); }
        }
        @keyframes mascot-leg-right {
          0%, 100% { transform: rotate(20deg); }
          50% { transform: rotate(-20deg); }
        }
        @keyframes mascot-body-bob-run {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes mascot-body-bob-idle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        @keyframes mascot-jump {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .anim-leg-left {
          animation: mascot-leg-left 0.4s infinite linear;
          transform-origin: 14px 28px;
        }
        .anim-leg-right {
          animation: mascot-leg-right 0.4s infinite linear;
          transform-origin: 26px 28px;
        }
        .anim-body-run {
          animation: mascot-body-bob-run 0.2s infinite ease-in-out;
        }
        .anim-body-idle {
          animation: mascot-body-bob-idle 2.5s infinite ease-in-out;
        }
        .anim-mascot-jump {
          animation: mascot-jump 0.5s ease-out;
        }
      `}</style>

      {/* Speech Bubble (No emojis, larger text, aligned to extend inwards) */}
      {showSpeech && speechText && (
        <div className="absolute bottom-20 right-0 w-64 bg-white border border-primary/20 text-fg p-3.5 rounded-2xl shadow-lg text-xs leading-relaxed font-semibold animate-in fade-in slide-in-from-bottom-2 duration-300 z-50">
          <div className="relative">
            <span className="text-primary font-bold block mb-1 text-[13px]">
              Trợ lý AI
            </span>
            {speechText}
            {/* Speech bubble arrow aligned to mascot center */}
            <div className="absolute -bottom-[18px] right-6 w-0 h-0 border-[9px] border-transparent border-t-white" />
            <div className="absolute -bottom-[20px] right-6 w-0 h-0 border-[9px] border-transparent border-t-primary/20 -z-10" />
          </div>
        </div>
      )}

      {/* Mascot Container */}
      <div
        className={`relative flex flex-col items-center ${jumpCount > 0 ? 'anim-mascot-jump' : ''}`}
        onClick={handleInteraction}
      >
        {/* Close button */}
        <button
          onClick={e => {
            e.stopPropagation()
            onClose()
          }}
          className="absolute -top-3 -right-2 h-4 w-4 rounded-full bg-surface-muted/90 border border-border flex items-center justify-center text-[8px] font-bold text-muted hover:bg-primary hover:text-white transition-colors shadow-sm cursor-pointer z-10"
        >
          ✕
        </button>

        {/* Robot visual flipped dynamically */}
        <div
          style={{
            transform: facingRight ? 'scaleX(1)' : 'scaleX(-1)',
            transition: 'transform 0.2s ease',
          }}
          className="w-14 h-14"
        >
          <svg
            className="w-full h-full drop-shadow-md"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Head and Body group */}
            <g className={isMoving ? 'anim-body-run' : 'anim-body-idle'}>
              {/* Dashed Halo Ring */}
              <ellipse
                cx="20"
                cy="3.5"
                rx="6"
                ry="1.5"
                fill="none"
                stroke="#C65A3A"
                strokeWidth="1.2"
                strokeDasharray="2.5,2.5"
              />

              {/* Connection to Head */}
              <line
                x1="20"
                y1="5"
                x2="20"
                y2="9"
                stroke="#C65A3A"
                strokeWidth="1.5"
              />

              {/* Head Shell */}
              <rect
                x="4.5"
                y="9"
                width="31"
                height="23"
                rx="10.5"
                fill="white"
                stroke="#C65A3A"
                strokeWidth="3"
              />

              {/* Ears */}
              <rect
                x="1.5"
                y="17"
                width="3"
                height="7"
                rx="1.5"
                fill="#C65A3A"
              />
              <rect
                x="35.5"
                y="17"
                width="3"
                height="7"
                rx="1.5"
                fill="#C65A3A"
              />

              {/* Big eyes matching the image */}
              <circle
                cx="13"
                cy="18"
                r="7.5"
                fill="white"
                stroke="#C65A3A"
                strokeWidth="2.5"
              />
              <circle
                cx="27"
                cy="18"
                r="7.5"
                fill="white"
                stroke="#C65A3A"
                strokeWidth="2.5"
              />

              {/* Pupils */}
              <circle
                cx={isMoving ? 13.5 : 13}
                cy={18}
                r="4.8"
                fill="#C65A3A"
              />
              <circle
                cx={isMoving ? 27.5 : 27}
                cy={18}
                r="4.8"
                fill="#C65A3A"
              />

              {/* Pupil Shine */}
              <circle cx={isMoving ? 11.5 : 11} cy={16} r="1.5" fill="white" />
              <circle cx={isMoving ? 25.5 : 25} cy={16} r="1.5" fill="white" />

              {/* Mouth */}
              <line
                x1="18.5"
                y1="24.5"
                x2="21.5"
                y2="24.5"
                stroke="#C65A3A"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Blush Cheeks */}
              <circle
                cx="8"
                cy="21.5"
                r="1.5"
                fill="#C65A3A"
                fillOpacity="0.25"
              />
              <circle
                cx="32"
                cy="21.5"
                r="1.5"
                fill="#C65A3A"
                fillOpacity="0.25"
              />
            </g>

            {/* Legs */}
            <line
              x1="14"
              y1="31"
              x2="14"
              y2="37"
              stroke="#C65A3A"
              strokeWidth="2.5"
              strokeLinecap="round"
              className={isMoving ? 'anim-leg-left' : ''}
            />
            <line
              x1="26"
              y1="31"
              x2="26"
              y2="37"
              stroke="#C65A3A"
              strokeWidth="2.5"
              strokeLinecap="round"
              className={isMoving ? 'anim-leg-right' : ''}
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
