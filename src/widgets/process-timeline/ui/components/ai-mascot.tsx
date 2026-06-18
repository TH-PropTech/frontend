'use client'

import * as React from 'react'

export interface AiMascotProps {
  isHappy?: boolean
  onClick?: () => void
  className?: string
}

export function AiMascot({
  isHappy = false,
  onClick,
  className = '',
}: AiMascotProps): React.ReactElement {
  const mascotRef = React.useRef<HTMLDivElement>(null)
  const [eyeOffset, setEyeOffset] = React.useState({ x: 0, y: 0 })
  const [isBlinking, setIsBlinking] = React.useState(false)
  const [isSpinning, setIsSpinning] = React.useState(false)

  // Eye tracking math
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      if (!mascotRef.current) return
      const rect = mascotRef.current.getBoundingClientRect()
      const mascotX = rect.left + rect.width / 2
      const mascotY = rect.top + rect.height / 2

      const deltaX = e.clientX - mascotX
      const deltaY = e.clientY - mascotY
      const distance = Math.hypot(deltaX, deltaY)

      const maxDistance = 2.5 // Tight movement space for large pupils

      if (distance === 0) {
        setEyeOffset({ x: 0, y: 0 })
      } else {
        const angle = Math.atan2(deltaY, deltaX)
        const displacement = Math.min(maxDistance, distance / 50)
        setEyeOffset({
          x: Math.cos(angle) * displacement,
          y: Math.sin(angle) * displacement,
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Auto blinking interval
  React.useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => {
        setIsBlinking(false)
      }, 150)
    }, 4500)

    return () => clearInterval(blinkInterval)
  }, [])

  const handleMascotClick = (): void => {
    if (isSpinning) return
    setIsSpinning(true)
    if (onClick) {
      onClick()
    }
    setTimeout(() => {
      setIsSpinning(false)
    }, 1000)
  }

  // Determine eyes display path
  const renderEye = (side: 'left' | 'right'): React.ReactNode => {
    const cx = side === 'left' ? 13 : 27

    if (isHappy) {
      // Smile eyes ^ ^
      return (
        <path
          d={side === 'left' ? 'M 8 18 Q 13 11 18 18' : 'M 22 18 Q 27 11 32 18'}
          fill="none"
          stroke="#C65A3A"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="transition-all duration-200"
        />
      )
    }

    if (isBlinking) {
      // Flat blinking line
      return (
        <line
          x1={cx - 6}
          y1="18"
          x2={cx + 6}
          y2="18"
          stroke="#C65A3A"
          strokeWidth="3"
          strokeLinecap="round"
          className="transition-all duration-100"
        />
      )
    }

    // Large eyes matching the image
    return (
      <g className="transition-all duration-200">
        {/* Outer Eye Outline */}
        <circle
          cx={cx}
          cy="18"
          r="7.5"
          fill="white"
          stroke="#C65A3A"
          strokeWidth="2.5"
        />
        {/* Pupil */}
        <circle
          cx={cx + eyeOffset.x}
          cy={18 + eyeOffset.y}
          r="4.8"
          fill="#C65A3A"
          className="transition-transform duration-75 ease-out"
        />
        {/* Pupil Shine */}
        <circle
          cx={cx - 2 + eyeOffset.x}
          cy={16 + eyeOffset.y}
          r="1.5"
          fill="white"
          className="transition-transform duration-75 ease-out"
        />
      </g>
    )
  }

  return (
    <div
      ref={mascotRef}
      onClick={handleMascotClick}
      className={`relative w-24 h-24 cursor-pointer select-none animate-mascot-float ${className}`}
      style={{
        transform: isSpinning ? 'rotateY(360deg)' : 'none',
        transition: isSpinning ? 'transform 1s ease-in-out' : 'none',
        perspective: '600px',
      }}
    >
      <style>{`
        @keyframes mascot-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .animate-mascot-float {
          animation: mascot-float 3.5s ease-in-out infinite;
        }
      `}</style>

      <svg
        className="w-full h-full drop-shadow-[0_4px_8px_rgba(198,90,58,0.12)]"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
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
          y2="9.5"
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
        <rect x="1.5" y="17" width="3" height="7" rx="1.5" fill="#C65A3A" />
        <rect x="35.5" y="17" width="3" height="7" rx="1.5" fill="#C65A3A" />

        {/* Render Left & Right Eyes */}
        {renderEye('left')}
        {renderEye('right')}

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
        <circle cx="8" cy="21.5" r="1.5" fill="#C65A3A" fillOpacity="0.25" />
        <circle cx="32" cy="21.5" r="1.5" fill="#C65A3A" fillOpacity="0.25" />
      </svg>
    </div>
  )
}
