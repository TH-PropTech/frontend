'use client'

import * as React from 'react'

/* ─── Types ─── */
type ArmState = 'idle' | 'greeting' | 'pointing' | 'thinking' | 'celebrating'
type Emotion = 'neutral' | 'confused' | 'excited' | 'sleepy'
type MouthShape = 'line' | 'smile' | 'open-o' | 'worried'

export interface AiMascotProps {
  isHappy?: boolean
  armState?: ArmState
  pointDirection?: 'left' | 'right'
  isProgressAura?: boolean
  emotion?: Emotion
  mouthShape?: MouthShape
  isTalking?: boolean
  scrollProgress?: number // 0–100, thanh tiến trình đọc trên thân robot
  pendingNotifications?: number // Badge thông báo trên anten
  onClick?: () => void
  className?: string
}

function AiMascotImpl({
  isHappy = false,
  armState = 'idle',
  pointDirection = 'left',
  isProgressAura = false,
  emotion = 'neutral',
  mouthShape = 'line',
  isTalking = false,
  scrollProgress = 0,
  pendingNotifications = 0,
  onClick,
  className = '',
}: AiMascotProps): React.ReactElement {
  const mascotRef = React.useRef<HTMLDivElement>(null)
  const [eyeOffset, setEyeOffset] = React.useState({ x: 0, y: 0 })
  const [isBlinking, setIsBlinking] = React.useState(false)
  const [isSpinning, setIsSpinning] = React.useState(false)
  const rafRef = React.useRef<number>(0)

  /* ─── Eye tracking with rAF throttle (8A.2) ─── */
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0
        if (!mascotRef.current) return
        const rect = mascotRef.current.getBoundingClientRect()
        const mascotX = rect.left + rect.width / 2
        const mascotY = rect.top + rect.height / 2

        const deltaX = e.clientX - mascotX
        const deltaY = e.clientY - mascotY
        const distance = Math.hypot(deltaX, deltaY)

        const maxDistance = 2.5
        if (distance === 0) {
          setEyeOffset({ x: 0, y: 0 })
        } else {
          const angle = Math.atan2(deltaY, deltaX)
          const displacement = Math.min(maxDistance, distance / 50)
          // làm tròn 0,5px và bỏ qua khi không đổi: tránh render lại ~60 lần/giây khi rê chuột
          const x = Math.round(Math.cos(angle) * displacement * 2) / 2
          const y = Math.round(Math.sin(angle) * displacement * 2) / 2
          setEyeOffset(prev => (prev.x === x && prev.y === y ? prev : { x, y }))
        }
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  /* ─── Auto blinking (pause when tab hidden — 8A.2) ─── */
  React.useEffect(() => {
    let blinkInterval: NodeJS.Timeout
    const start = (): void => {
      blinkInterval = setInterval(() => {
        setIsBlinking(true)
        setTimeout(() => setIsBlinking(false), 150)
      }, 4500)
    }
    const handleVisibility = (): void => {
      if (document.hidden) {
        clearInterval(blinkInterval)
      } else {
        start()
      }
    }
    start()
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      clearInterval(blinkInterval)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  /* ─── Click spin ─── */
  const handleMascotClick = (): void => {
    if (isSpinning) return
    setIsSpinning(true)
    onClick?.()
    setTimeout(() => setIsSpinning(false), 1000)
  }

  /* ─── Determine arm CSS class ─── */
  const getArmClass = (): string => {
    switch (armState) {
      case 'greeting':
        return 'arm-greeting'
      case 'pointing':
        return pointDirection === 'right'
          ? 'arm-pointing-right'
          : 'arm-pointing-left'
      case 'thinking':
        return 'arm-thinking'
      case 'celebrating':
        return 'arm-celebrating'
      default:
        return 'arm-idle'
    }
  }

  /* ─── Face rotation for pointing direction ─── */
  const getFaceTransform = (): string => {
    if (armState === 'pointing') {
      return pointDirection === 'left' ? 'rotateY(-15deg)' : 'rotateY(15deg)'
    }
    return 'none'
  }

  /* ─── Render mouth by shape ─── */
  const renderMouth = (): React.ReactNode => {
    switch (mouthShape) {
      case 'smile':
        return (
          <path
            d="M 16 24 Q 20 28 24 24"
            stroke="var(--primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        )
      case 'open-o':
        return <ellipse cx="20" cy="25" rx="2.5" ry="2" fill="var(--primary)" />
      case 'worried':
        return (
          <path
            d="M 17 25 Q 20 23 23 25"
            stroke="var(--primary)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        )
      default:
        return (
          <line
            x1="18.5"
            y1="24.5"
            x2="21.5"
            y2="24.5"
            stroke="var(--primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        )
    }
  }

  /* ─── Render eyes based on emotion ─── */
  const renderEye = (side: 'left' | 'right'): React.ReactNode => {
    const cx = side === 'left' ? 13 : 27

    // Excited / isHappy → smile eyes ^ ^
    if (isHappy || emotion === 'excited') {
      return (
        <path
          d={side === 'left' ? 'M 8 18 Q 13 11 18 18' : 'M 22 18 Q 27 11 32 18'}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="transition-all duration-200"
        />
      )
    }

    // Sleepy → half-closed eyes
    if (emotion === 'sleepy') {
      return (
        <g className="transition-all duration-300">
          <circle
            cx={cx}
            cy="18"
            r="7.5"
            fill="white"
            stroke="var(--primary)"
            strokeWidth="2.5"
          />
          {/* Half-closed lid */}
          <rect
            x={cx - 8}
            y="10"
            width="16"
            height="10"
            fill="var(--surface)"
          />
          <line
            x1={cx - 6}
            y1="18"
            x2={cx + 6}
            y2="18"
            stroke="var(--primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle
            cx={cx + eyeOffset.x}
            cy={19 + eyeOffset.y}
            r="3"
            fill="var(--primary)"
          />
        </g>
      )
    }

    // Confused → asymmetric eyes
    if (emotion === 'confused') {
      const radius = side === 'left' ? 5.5 : 7.5
      return (
        <g className="transition-all duration-200">
          <circle
            cx={cx}
            cy="18"
            r={radius}
            fill="white"
            stroke="var(--primary)"
            strokeWidth="2.5"
          />
          <circle
            cx={cx + eyeOffset.x}
            cy={18 + eyeOffset.y}
            r={radius === 5.5 ? 3.2 : 4.8}
            fill="var(--primary)"
            className="transition-transform duration-75 ease-out"
          />
          <circle
            cx={cx - 1.5 + eyeOffset.x}
            cy={16 + eyeOffset.y}
            r="1"
            fill="white"
          />
        </g>
      )
    }

    // Blinking
    if (isBlinking) {
      return (
        <line
          x1={cx - 6}
          y1="18"
          x2={cx + 6}
          y2="18"
          stroke="var(--primary)"
          strokeWidth="3"
          strokeLinecap="round"
          className="transition-all duration-100"
        />
      )
    }

    // Default neutral eyes
    return (
      <g className="transition-all duration-200">
        <circle
          cx={cx}
          cy="18"
          r="7.5"
          fill="white"
          stroke="var(--primary)"
          strokeWidth="2.5"
        />
        <circle
          cx={cx + eyeOffset.x}
          cy={18 + eyeOffset.y}
          r="4.8"
          fill="var(--primary)"
          className="mascot-pupil"
        />
        <circle
          cx={cx - 2 + eyeOffset.x}
          cy={16 + eyeOffset.y}
          r="1.5"
          fill="white"
          className="mascot-pupil"
        />
      </g>
    )
  }

  /* ─── Scroll progress bar height ─── */
  const progressHeight = Math.max(0, Math.min(16, (scrollProgress / 100) * 16))

  return (
    <div
      ref={mascotRef}
      onClick={handleMascotClick}
      role="button"
      tabIndex={0}
      aria-label="Trợ lý robot AI hướng dẫn"
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') handleMascotClick()
      }}
      className={`relative w-24 h-[105px] cursor-pointer select-none animate-mascot-float
        min-w-[44px] min-h-[44px]
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
        ${className}`}
      style={{
        transform: isSpinning ? 'rotateY(360deg)' : 'none',
        transition: isSpinning ? 'transform 1s ease-in-out' : 'none',
        perspective: '600px',
      }}
    >
      {/* ─── CSS Keyframes ─── */}
      <style>{`
        /* Float */
        @keyframes mascot-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .animate-mascot-float {
          animation: mascot-float 3.5s ease-in-out infinite;
        }

        /* Reduced Motion Guard */
        @media (prefers-reduced-motion: reduce) {
          .animate-mascot-float,
          .mascot-arm-left, .mascot-arm-right,
          .mascot-aura-active ellipse { animation: none !important; }
        }

        /* ─── Arm Keyframes ─── */
        @keyframes arm-idle-l { 0%,100% { transform: rotate(0deg) } 50% { transform: rotate(-5deg) } }
        @keyframes arm-idle-r { 0%,100% { transform: rotate(0deg) } 50% { transform: rotate(5deg) } }
        .arm-idle .mascot-arm-left  { animation: arm-idle-l 3s ease-in-out infinite; }
        .arm-idle .mascot-arm-right { animation: arm-idle-r 3s ease-in-out infinite; }

        @keyframes arm-wave { 0%,100% { transform: rotate(-80deg) } 50% { transform: rotate(-110deg) } }
        .arm-greeting .mascot-arm-right { animation: arm-wave 0.6s ease-in-out infinite; }
        .arm-greeting .mascot-arm-left  { animation: arm-idle-l 3s ease-in-out infinite; }

        @keyframes arm-point { 0%,100% { transform: rotate(-60deg) } }
        .arm-pointing-left .mascot-arm-left   { animation: arm-point 0.5s ease-out forwards; }
        .arm-pointing-right .mascot-arm-right  { animation: arm-point 0.5s ease-out forwards; }

        @keyframes arm-think { 0%,100% { transform: rotate(-130deg) translateY(0) } 50% { transform: rotate(-135deg) translateY(-2px) } }
        .arm-thinking .mascot-arm-right { animation: arm-think 1s ease-in-out infinite; }

        @keyframes arm-cheer-l { 0%,100% { transform: rotate(-120deg) } 50% { transform: rotate(-140deg) } }
        @keyframes arm-cheer-r { 0%,100% { transform: rotate(120deg) } 50% { transform: rotate(140deg) } }
        .arm-celebrating .mascot-arm-left  { animation: arm-cheer-l 0.4s ease-in-out infinite; }
        .arm-celebrating .mascot-arm-right { animation: arm-cheer-r 0.4s ease-in-out infinite; }

        /* Aura Pulse */
        @keyframes aura-pulse {
          0%, 100% { stroke-opacity: 0.6; stroke-width: 1.2; }
          50% { stroke-opacity: 1; stroke-width: 2; filter: drop-shadow(0 0 4px var(--primary)); }
        }
        .mascot-aura-active .mascot-halo { animation: aura-pulse 2s ease-in-out infinite; }

        /* Notification antenna pulse */
        @keyframes antenna-pulse {
          0%, 100% { filter: none; }
          50% { filter: drop-shadow(0 0 6px var(--warning)); }
        }
        .mascot-antenna-active .antenna-tip {
          fill: var(--warning);
          animation: antenna-pulse 1.5s ease-in-out infinite;
        }

        /* GPU hints for smooth animation */
        .mascot-arm-left, .mascot-arm-right, .mascot-pupil {
          will-change: transform;
        }

        /* Talking mouth animation — pure CSS, no JS timer */
        @keyframes mouth-talk {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .mascot-mouth-talk .mouth-open { animation: mouth-talk 0.33s steps(1) infinite; }
        .mascot-mouth-talk .mouth-closed { animation: mouth-talk 0.33s steps(1) infinite reverse; }
      `}</style>

      <svg
        className={`w-full h-full drop-shadow-[0_4px_8px_rgba(198,90,58,0.12)] ${getArmClass()} ${isProgressAura ? 'mascot-aura-active' : ''} ${pendingNotifications > 0 ? 'mascot-antenna-active' : ''}`}
        viewBox="0 0 40 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden="true"
      >
        {/* ─── Dashed Halo Ring ─── */}
        <ellipse
          className="mascot-halo"
          cx="20"
          cy="3.5"
          rx="6"
          ry="1.5"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1.2"
          strokeDasharray="2.5,2.5"
        />

        {/* ─── Notification Badge on antenna ─── */}
        {pendingNotifications > 0 && (
          <g>
            <circle
              cx="26"
              cy="3"
              r="4"
              fill="var(--danger)"
              className="antenna-tip"
            />
            <text
              x="26"
              y="4.5"
              textAnchor="middle"
              fontSize="5"
              fill="var(--surface)"
              fontWeight="700"
              fontFamily="var(--font-body)"
            >
              {pendingNotifications > 9 ? '9+' : pendingNotifications}
            </text>
          </g>
        )}

        {/* ─── Connection to Head ─── */}
        <line
          x1="20"
          y1="5"
          x2="20"
          y2="9.5"
          stroke="var(--primary)"
          strokeWidth="1.5"
        />

        {/* ─── Face group (rotates when pointing) ─── */}
        <g
          style={{
            transform: getFaceTransform(),
            transformOrigin: '20px 20px',
            transition: 'transform 0.3s ease',
          }}
        >
          {/* Head Shell */}
          <rect
            x="4.5"
            y="9"
            width="31"
            height="23"
            rx="10.5"
            fill="var(--surface)"
            stroke="var(--primary)"
            strokeWidth="3"
          />

          {/* Ears */}
          <rect
            x="1.5"
            y="17"
            width="3"
            height="7"
            rx="1.5"
            fill="var(--primary)"
          />
          <rect
            x="35.5"
            y="17"
            width="3"
            height="7"
            rx="1.5"
            fill="var(--primary)"
          />

          {/* Eyes */}
          {renderEye('left')}
          {renderEye('right')}

          {/* Mouth */}
          {isTalking ? (
            <g className="mascot-mouth-talk">
              <ellipse
                className="mouth-open"
                cx="20"
                cy="25"
                rx="2.5"
                ry="2"
                fill="var(--primary)"
              />
              <line
                className="mouth-closed"
                x1="18.5"
                y1="24.5"
                x2="21.5"
                y2="24.5"
                stroke="var(--primary)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>
          ) : (
            renderMouth()
          )}

          {/* Blush Cheeks */}
          <circle
            cx="8"
            cy="21.5"
            r="1.5"
            fill="var(--primary)"
            fillOpacity="0.25"
          />
          <circle
            cx="32"
            cy="21.5"
            r="1.5"
            fill="var(--primary)"
            fillOpacity="0.25"
          />
        </g>

        {/* ─── Scroll Progress Bar (left side of body) ─── */}
        {scrollProgress > 0 && (
          <g>
            <rect
              x="3"
              y="16"
              width="2"
              height="16"
              rx="1"
              fill="var(--border)"
              opacity="0.3"
            />
            <rect
              x="3"
              y="16"
              width="2"
              rx="1"
              fill="var(--primary)"
              height={progressHeight}
              className="transition-[height] duration-300 ease-out"
            />
          </g>
        )}

        {/* ─── Left Arm ─── */}
        <g
          className="mascot-arm-left"
          style={{
            transformOrigin: '6px 28px',
            transformBox: 'fill-box' as React.CSSProperties['transformBox'],
          }}
        >
          <circle cx="6" cy="28" r="2" fill="var(--primary)" />
          <path
            d="M 6 28 Q 2 32 4 36"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 3 36 C 2 36 2 38 4 38 M 5 36 C 6 36 6 38 4 38"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>

        {/* ─── Right Arm ─── */}
        <g
          className="mascot-arm-right"
          style={{
            transformOrigin: '34px 28px',
            transformBox: 'fill-box' as React.CSSProperties['transformBox'],
          }}
        >
          <circle cx="34" cy="28" r="2" fill="var(--primary)" />
          <path
            d="M 34 28 Q 38 32 36 36"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 37 36 C 38 36 38 38 36 38 M 35 36 C 34 36 34 38 36 38"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  )
}

export const AiMascot = React.memo(AiMascotImpl)
