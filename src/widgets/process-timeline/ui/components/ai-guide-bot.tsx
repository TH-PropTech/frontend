/* eslint-disable */
'use client'

import * as React from 'react'
import { AI_GUIDES } from '../../model/ai-guide-data'
import { useMascotEmotion } from '../../model/use-mascot-emotion'
import { useScrollProgress } from '../../model/use-scroll-progress'
import { useGuideBookmark } from '../../model/use-guide-bookmark'
import { useVoiceCommand } from '../../model/use-voice-command'
import { useGuideLang } from '../../model/use-guide-lang'
import { useTutorialOverlay } from '../../model/use-tutorial-overlay'
import { useSpeechFallback } from '../../model/use-speech-fallback'
import { usePlatform } from '../../model/use-platform'

import { AiMascot } from './ai-mascot'
import { SpeechSubtitle } from './speech-subtitle'

/* ─── Time-Aware Greeting ─── */
const getGreeting = (): string => {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12)
    return 'Chào buổi sáng! Mình sẵn sàng hướng dẫn bạn nhé.'
  if (hour >= 12 && hour < 18)
    return 'Chào buổi chiều! Cùng tiếp tục quy trình thuê nhà nào.'
  if (hour >= 18 && hour < 22)
    return 'Chào buổi tối! Bạn cần mình hỗ trợ gì không?'
  return 'Khuya rồi! Bạn làm việc khuya thật siêng năng. Mình ở đây hỗ trợ bạn.'
}

export interface AiGuideBotProps {
  articleId: string
  isVisible: boolean
}

function AiGuideBotImpl({
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
  const [greetingText, setGreetingText] = React.useState<string | null>(null)

  const [feedbackSubmitted, setFeedbackSubmitted] = React.useState<
    boolean | null
  >(null)

  // Refs for tracking DOM and scroll
  const checklistRef = React.useRef<HTMLDivElement>(null)
  const isAutoSwitchingRef = React.useRef(false)

  // Custom accessibility settings
  const [fontSize, setFontSize] = React.useState<'sm' | 'base' | 'lg'>('sm')
  const [speechRate, setSpeechRate] = React.useState<
    'slow' | 'medium' | 'fast'
  >('medium')

  // Platform & WebView detection
  const platform = usePlatform()

  // Language management
  const { lang, toggleLang, getTip } = useGuideLang()

  // Scroll tracking
  const scrollProgress = useScrollProgress(checklistRef)

  // Bookmark management
  const { bookmark, setBookmark, clearBookmark } = useGuideBookmark(articleId)
  const [showResumeBanner, setShowResumeBanner] = React.useState(false)

  // Emotion system hook
  const mascotEmotion = useMascotEmotion()

  // Lời hướng dẫn của bước đang chọn. Giọng đọc luôn đọc đúng chữ này (không đọc lời chào).
  const currentTip = guide ? getTip(guide, activeStepIndex) : ''

  // Giọng đọc tiếng Việt thật (Web Speech API)
  const speechRateValue =
    speechRate === 'slow' ? 0.8 : speechRate === 'fast' ? 1.25 : 1
  const speechHelper = useSpeechFallback(currentTip, speechRateValue)

  // Voice Command control
  const voiceHelper = useVoiceCommand(cmd => {
    if (!guide) return
    if (cmd === 'next') {
      const nextIdx = Math.min(guide.steps.length - 1, activeStepIndex + 1)
      setActiveStepIndex(nextIdx)
      mascotEmotion.triggerGreeting()
    } else if (cmd === 'prev') {
      const prevIdx = Math.max(0, activeStepIndex - 1)
      setActiveStepIndex(prevIdx)
      mascotEmotion.triggerGreeting()
    } else if (cmd === 'repeat') {
      speechHelper.speak()
    } else if (cmd === 'done') {
      handleStepToggle(activeStepIndex)
    }
  })

  // Tutorial configuration
  const tutorialSteps = React.useMemo(
    () => [
      {
        targetSelector: '.mascot-title-box',
        message:
          'Đây là bảng hướng dẫn từng bước để thực hiện quy trình thuê nhà.',
        armState: 'greeting' as const,
      },
      {
        targetSelector: '.accessibility-controls',
        message:
          'Bạn có thể phóng to chữ và chỉnh giọng nói chậm lại để dễ quan sát hơn.',
        armState: 'pointing' as const,
        pointDirection: 'right' as const,
      },
      {
        targetSelector: '.checklist-box',
        message:
          'Đây là danh sách các bước. Nhấn nút Tròn để đánh dấu bước đã hoàn thành.',
        armState: 'pointing' as const,
        pointDirection: 'left' as const,
      },
      {
        targetSelector: '#mascot-track-col',
        message:
          'Mascot robot sẽ di chuyển theo các bước để chỉ dẫn từng thao tác cho bạn.',
        armState: 'celebrating' as const,
      },
    ],
    []
  )

  const tutorial = useTutorialOverlay(tutorialSteps)

  // Milestone and aura states
  const completedCount = guide
    ? Object.values(checkedSteps).filter(Boolean).length
    : 0
  const totalSteps = guide ? guide.steps.length : 1
  const progressPercent = Math.round((completedCount / totalSteps) * 100)
  const isProgressAura = progressPercent >= 75

  /* ─── Restore state from bookmark ─── */
  React.useEffect(() => {
    if (bookmark) {
      setShowResumeBanner(true)
    }
  }, [bookmark])

  /* ─── Session State Resume (sessionStorage) ─── */
  React.useEffect(() => {
    const saved = sessionStorage.getItem(`guide-${articleId}`)
    if (saved) {
      try {
        setCheckedSteps(JSON.parse(saved) as Record<number, boolean>)
      } catch {
        /* ignore */
      }
    }
  }, [articleId])

  React.useEffect(() => {
    if (Object.keys(checkedSteps).length > 0) {
      sessionStorage.setItem(`guide-${articleId}`, JSON.stringify(checkedSteps))
    }
  }, [checkedSteps, articleId])

  /* ─── Auto Scroll to active step ─── */
  React.useEffect(() => {
    if (!isVisible) return
    const stepEl = document.getElementById(`step-btn-${activeStepIndex}`)
    stepEl?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [activeStepIndex, isVisible])

  /* ─── Time-Aware Greeting on first mount ─── */
  React.useEffect(() => {
    if (!isVisible || !guide) return
    setGreetingText(getGreeting())
    mascotEmotion.triggerGreeting()
    const timer = setTimeout(() => setGreetingText(null), 4000)
    return () => clearTimeout(timer)
  }, [articleId, isVisible])

  /* ─── Idle Curiosity behaviors ─── */
  React.useEffect(() => {
    if (!isVisible) return
    let timeout: NodeJS.Timeout
    const behaviors = ['lookAround', 'scratch', 'wave'] as const

    const triggerRandom = (): void => {
      const delay = 30_000 + Math.random() * 30_000
      timeout = setTimeout(() => {
        if (mascotEmotion.armState !== 'idle') {
          triggerRandom()
          return
        }
        const pick = behaviors[Math.floor(Math.random() * behaviors.length)]
        if (pick === 'scratch') {
          mascotEmotion.triggerConfused()
        } else if (pick === 'wave') {
          mascotEmotion.triggerGreeting()
        }
        triggerRandom()
      }, delay)
    }

    const handleVisibility = (): void => {
      if (document.hidden) {
        clearTimeout(timeout)
      } else {
        triggerRandom()
      }
    }

    triggerRandom()
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      clearTimeout(timeout)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [isVisible])

  /* ─── Reset states when active article changes ─── */
  React.useEffect(() => {
    setCheckedSteps({})
    setIsMascotHappy(false)
    setActiveStepIndex(0)
    setMascotTop(28)
    setFeedbackSubmitted(null)
    speechHelper.stop()
  }, [articleId])

  /* ─── Tắt hướng dẫn thì dừng đọc ─── */
  React.useEffect(() => {
    if (!isVisible) speechHelper.stop()
  }, [isVisible])

  /* ─── Stop speaking on step change ─── */
  React.useEffect(() => {
    if (isAutoSwitchingRef.current) {
      isAutoSwitchingRef.current = false
      return
    }
    speechHelper.stop()
  }, [activeStepIndex])

  /* ─── Track DOM position to crawl to the active step ─── */
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

        const rawTop =
          activeRect.top - trackRect.top + activeRect.height / 2 - 48
        const minTop = 8
        const maxTop = Math.max(minTop, trackRect.height - 104)
        const clampedTop = Math.min(maxTop, Math.max(minTop, rawTop))
        setMascotTop(clampedTop)

        timer = setTimeout(() => {
          setIsMascotCrawling(false)
        }, 1000)
      }
    }

    const layoutTimer = setTimeout(measure, 50)
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
        mascotEmotion.triggerExcited()
        setTimeout(() => setIsMascotHappy(false), 1500)
      }
      return nextState
    })
    setActiveStepIndex(index)
  }

  const handleMascotClick = (): void => {
    setIsMascotHappy(true)
    mascotEmotion.triggerExcited()
    setTimeout(() => setIsMascotHappy(false), 1500)
  }

  const handleToggleSpeech = (): void => {
    if (speechHelper.isSpeaking) {
      speechHelper.stop()
    } else {
      speechHelper.speak()
    }
  }

  const handleResumeBookmark = (): void => {
    if (bookmark) {
      setActiveStepIndex(bookmark.stepIndex)
      setShowResumeBanner(false)
      mascotEmotion.triggerExcited()
    }
  }

  const handleFeedback = (isHelpful: boolean): void => {
    setFeedbackSubmitted(isHelpful)
    if (isHelpful) {
      mascotEmotion.triggerExcited()
    } else {
      mascotEmotion.triggerConfused()
    }
  }

  // Text-size mappings
  const getBodyTextClass = () => {
    if (fontSize === 'base') return 'text-base font-semibold'
    if (fontSize === 'lg') return 'text-lg font-bold'
    return 'text-sm font-semibold'
  }

  const getStepTextClass = (isChecked: boolean) => {
    let sizeClass = 'text-[13px]'
    if (fontSize === 'base') sizeClass = 'text-[15px]'
    if (fontSize === 'lg') sizeClass = 'text-[18px]'

    return `font-body ${sizeClass} leading-relaxed transition-all duration-200 ${
      isChecked
        ? 'text-muted line-through decoration-muted/50 font-semibold'
        : 'text-fg font-bold'
    }`
  }

  return (
    <div
      className={isVisible ? 'mb-6 animate-in fade-in duration-300' : 'hidden'}
    >
      {/* CSS Confetti Celebration */}
      {progressPercent === 100 && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
          <style>{`
            @keyframes confetti-fall {
              0% { transform: translateY(-50px) rotate(0deg); opacity: 1; }
              100% { transform: translateY(300px) rotate(360deg); opacity: 0; }
            }
            .confetti-piece {
              position: absolute;
              width: 10px;
              height: 10px;
              background-color: var(--primary);
              animation: confetti-fall 2.5s ease-out infinite;
            }
          `}</style>
          <div
            className="confetti-piece left-[20%] delay-0"
            style={{ backgroundColor: 'var(--primary)' }}
          />
          <div
            className="confetti-piece left-[40%] delay-300"
            style={{ backgroundColor: 'var(--accent)' }}
          />
          <div
            className="confetti-piece left-[60%] delay-700"
            style={{ backgroundColor: 'var(--success)' }}
          />
          <div
            className="confetti-piece left-[80%] delay-1000"
            style={{ backgroundColor: 'var(--warning)' }}
          />
        </div>
      )}

      {/* Tutorial Overlay Portal */}
      {tutorial.currentStep !== null && tutorial.spotlightRect && (
        <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
          <style>{`
            .tutorial-overlay {
              position: fixed;
              inset: 0;
              background-color: rgba(43, 33, 30, 0.45);
              pointer-events: auto;
              z-index: 10000;
            }
            .tutorial-spotlight {
              position: absolute;
              border-radius: 12px;
              box-shadow: 0 0 0 9999px rgba(43, 33, 30, 0.45);
              border: 2.5px solid var(--accent);
              pointer-events: none;
              z-index: 10001;
              transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
            }
            .tutorial-bubble {
              position: absolute;
              background-color: var(--surface);
              border: 1.5px solid var(--border);
              padding: 16px;
              border-radius: 16px;
              box-shadow: var(--shadow-lg);
              max-width: 280px;
              pointer-events: auto;
              z-index: 10002;
              animation: slide-down-bounce 0.4s ease-out;
            }
          `}</style>
          <div className="tutorial-overlay" onClick={tutorial.skipTutorial} />
          <div
            className="tutorial-spotlight"
            style={{
              top: `${tutorial.spotlightRect.top}px`,
              left: `${tutorial.spotlightRect.left}px`,
              width: `${tutorial.spotlightRect.width}px`,
              height: `${tutorial.spotlightRect.height}px`,
            }}
          />
          <div
            className="tutorial-bubble"
            style={{
              top: `${Math.min(window.innerHeight - 200, tutorial.spotlightRect.top + tutorial.spotlightRect.height + 16)}px`,
              left: `${Math.max(16, Math.min(window.innerWidth - 300, tutorial.spotlightRect.left))}px`,
            }}
          >
            <span className="text-primary font-bold block mb-1 text-[11px] uppercase tracking-wider">
              Hướng dẫn nhanh:
            </span>
            <p className="text-xs text-fg leading-relaxed mb-3">
              {tutorial.activeStep?.message}
            </p>
            <div className="flex justify-between items-center gap-4">
              <button
                onClick={tutorial.skipTutorial}
                className="text-[11px] text-muted hover:text-fg font-bold cursor-pointer transition-colors"
              >
                Bỏ qua
              </button>
              <button
                onClick={tutorial.nextStep}
                className="bg-primary hover:bg-primary-hover text-white text-[11px] font-bold py-1.5 px-3 rounded-lg shadow-sm cursor-pointer transition-colors"
              >
                {tutorial.currentStep === tutorialSteps.length - 1
                  ? 'Hoàn tất'
                  : 'Tiếp theo'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bookmark Resume Banner */}
      {showResumeBanner && bookmark && (
        <div className="bg-accent-soft border border-accent/30 rounded-xl p-3.5 mb-3 flex items-center justify-between gap-3 text-xs leading-relaxed animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
            <span className="text-amber-950 font-bold">
              Lần trước bạn đã đọc đến bước {bookmark.stepIndex + 1}. Bạn có
              muốn tiếp tục không?
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowResumeBanner(false)}
              className="text-amber-900/60 hover:text-amber-900 font-bold px-2 py-1 cursor-pointer transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleResumeBookmark}
              className="bg-primary hover:bg-primary-hover text-white font-bold px-3 py-1.5 rounded-lg shadow-sm cursor-pointer transition-colors"
            >
              Đồng ý
            </button>
          </div>
        </div>
      )}

      {/* Main Bot Card Container */}
      <div
        className={`relative rounded-2xl border border-primary/20 bg-gradient-to-br from-white/95 via-primary/[0.01] to-primary/[0.03] shadow-md backdrop-blur-md overflow-hidden group transition-all duration-300 ${
          fontSize === 'sm' ? 'p-5' : fontSize === 'base' ? 'p-6' : 'p-7'
        }`}
      >
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

        {/* Header */}
        <div className="flex flex-col gap-3 pb-4 border-b border-primary/10">
          <div className="flex items-center gap-3 mascot-title-box">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <svg
                className="h-5 w-5"
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
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary tracking-wide">
                  HƯỚNG DẪN
                </span>
              </h4>
              <p className="text-xs text-muted font-medium">
                Chỉ dẫn trực quan & Hỗ trợ đọc giọng nói cho người cao tuổi
              </p>
            </div>
          </div>

          {/* Accessibility Controls & Custom settings */}
          <div className="flex items-center gap-3 accessibility-controls flex-wrap">
            {/* Bilingual Switch EN / VI */}
            {guide.stepTipsEn && (
              <button
                onClick={toggleLang}
                className="bg-primary/10 border border-primary/20 text-primary font-bold text-xs py-1.5 px-3 rounded-lg shadow-sm hover:bg-primary/20 cursor-pointer transition-colors"
                title="Đổi ngôn ngữ chỉ dẫn"
              >
                {lang === 'vi' ? 'EN' : 'VI'}
              </button>
            )}

            {/* Quick Tutorial Trigger */}
            <button
              onClick={tutorial.startTutorial}
              className="bg-accent/20 border border-accent/30 text-amber-950 font-bold text-xs py-1.5 px-3 rounded-lg shadow-sm hover:bg-accent/30 cursor-pointer transition-colors"
              title="Hướng dẫn nhanh cách sử dụng"
            >
              HD dùng
            </button>

            {/* Font Size adjustment */}
            <div className="flex items-center gap-2 bg-primary/[0.03] border border-primary/10 rounded-xl p-1 shadow-inner">
              <span className="text-[11px] font-bold text-primary/60 pl-2 select-none uppercase tracking-wider hidden sm:inline">
                Cỡ chữ
              </span>
              <div className="relative flex items-center bg-primary/[0.06] rounded-lg p-0.5 select-none">
                <button
                  onClick={() => setFontSize('sm')}
                  className={`relative z-10 flex h-7 w-12 items-center justify-center rounded-md font-body text-[11px] font-bold transition-colors duration-200 ${
                    fontSize === 'sm'
                      ? 'text-white'
                      : 'text-primary hover:text-primary/80'
                  }`}
                  title="Cỡ chữ nhỏ"
                >
                  Nhỏ
                </button>
                <button
                  onClick={() => setFontSize('base')}
                  className={`relative z-10 flex h-7 w-12 items-center justify-center rounded-md font-body text-xs font-bold transition-colors duration-200 ${
                    fontSize === 'base'
                      ? 'text-white'
                      : 'text-primary hover:text-primary/80'
                  }`}
                  title="Cỡ chữ vừa"
                >
                  Vừa
                </button>
                <button
                  onClick={() => setFontSize('lg')}
                  className={`relative z-10 flex h-7 w-12 items-center justify-center rounded-md font-body text-sm font-extrabold transition-colors duration-200 ${
                    fontSize === 'lg'
                      ? 'text-white'
                      : 'text-primary hover:text-primary/80'
                  }`}
                  title="Cỡ chữ lớn"
                >
                  To
                </button>

                {/* Sliding pill background */}
                <div
                  className="absolute top-0.5 bottom-0.5 left-0.5 w-12 bg-primary rounded-md shadow-md transition-all duration-300 ease-out z-0"
                  style={{
                    transform: `translateX(${fontSize === 'sm' ? '0px' : fontSize === 'base' ? '48px' : '96px'})`,
                  }}
                />
              </div>
            </div>

            {/* Speech Rate adjustment */}
            <div className="flex items-center gap-2 bg-primary/[0.03] border border-primary/10 rounded-xl p-1 shadow-inner">
              <span className="text-[11px] font-bold text-primary/60 pl-2 select-none uppercase tracking-wider hidden sm:inline">
                Giọng đọc
              </span>
              <div className="relative flex items-center bg-primary/[0.06] rounded-lg p-0.5 select-none">
                <button
                  onClick={() => setSpeechRate('slow')}
                  className={`relative z-10 flex h-7 w-14 items-center justify-center rounded-md font-body text-[11px] font-bold transition-colors duration-200 ${
                    speechRate === 'slow'
                      ? 'text-white'
                      : 'text-primary hover:text-primary/80'
                  }`}
                  title="Giọng đọc chậm"
                >
                  Chậm
                </button>
                <button
                  onClick={() => setSpeechRate('medium')}
                  className={`relative z-10 flex h-7 w-14 items-center justify-center rounded-md font-body text-[11px] font-bold transition-colors duration-200 ${
                    speechRate === 'medium'
                      ? 'text-white'
                      : 'text-primary hover:text-primary/80'
                  }`}
                  title="Giọng đọc bình thường"
                >
                  Vừa
                </button>
                <button
                  onClick={() => setSpeechRate('fast')}
                  className={`relative z-10 flex h-7 w-16 items-center justify-center rounded-md font-body text-[11px] font-bold transition-colors duration-200 ${
                    speechRate === 'fast'
                      ? 'text-white'
                      : 'text-primary hover:text-primary/80'
                  }`}
                  title="Giọng đọc hơi nhanh"
                >
                  Nhanh
                </button>

                {/* Sliding pill background for speech rate */}
                <div
                  className="absolute top-0.5 bottom-0.5 left-0.5 bg-primary rounded-md shadow-md transition-all duration-300 ease-out z-0"
                  style={{
                    width: speechRate === 'fast' ? '64px' : '56px',
                    transform: `translateX(${speechRate === 'slow' ? '0px' : speechRate === 'medium' ? '56px' : '112px'})`,
                  }}
                />
              </div>
            </div>

            {/* Voice Command Mic Trigger */}
            {platform.enableVoiceCommand && (
              <button
                onClick={
                  voiceHelper.isListening
                    ? voiceHelper.stopListening
                    : voiceHelper.startListening
                }
                className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all cursor-pointer ${
                  voiceHelper.isListening
                    ? 'bg-amber-500 border-amber-500 text-white shadow-md'
                    : 'bg-primary/10 border-primary/20 text-primary hover:bg-primary/20'
                }`}
                title={
                  voiceHelper.isListening
                    ? 'Dừng lắng nghe'
                    : 'Lắng nghe giọng nói của bạn'
                }
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </button>
            )}

            {/* TTS Play/Stop Button */}
            <button
              onClick={handleToggleSpeech}
              className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all cursor-pointer ${
                speechHelper.isSpeaking
                  ? 'bg-red-500 border-red-500 text-white shadow-md'
                  : 'bg-primary/10 border-primary/20 text-primary hover:bg-primary/20'
              }`}
              title={
                speechHelper.isSpeaking
                  ? 'Dừng đọc giọng nói'
                  : 'Đọc hướng dẫn bằng giọng nói'
              }
            >
              {speechHelper.isSpeaking ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 10h6v4H9z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div
          className={`transition-all duration-300 ${
            fontSize === 'sm'
              ? 'mt-3.5 space-y-3.5'
              : fontSize === 'base'
                ? 'mt-4 space-y-4'
                : 'mt-5 space-y-5'
          }`}
        >
          {/* Mobile Responsive Mascot — visible < md */}
          <div className="flex md:hidden items-center gap-3 mb-3">
            <AiMascot
              isHappy={isMascotHappy}
              armState={mascotEmotion.armState}
              emotion={mascotEmotion.emotion}
              mouthShape={mascotEmotion.mouthShape}
              isTalking={speechHelper.isSpeaking}
              isProgressAura={isProgressAura}
              scrollProgress={scrollProgress}
              className="w-12 h-[52px] shrink-0"
              onClick={handleMascotClick}
            />
            <div className="flex-1 text-xs text-primary font-bold bg-primary/5 p-3 rounded-lg border border-primary/10">
              {greetingText ?? currentTip}
            </div>
          </div>

          <p
            className={`${getBodyTextClass()} text-muted leading-relaxed font-semibold`}
          >
            {guide.summary}
          </p>

          <div
            className={`relative flex items-start transition-all duration-300 ${
              fontSize === 'sm'
                ? 'gap-4.5'
                : fontSize === 'base'
                  ? 'gap-6'
                  : 'gap-7.5'
            }`}
          >
            {/* Checklist Column */}
            <div
              ref={checklistRef}
              className="flex-1 space-y-2 max-h-[450px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/20 checklist-box"
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted/80 block">
                Các bước thực hiện (Nhấn chọn để hoàn thành):
              </span>
              <div className="grid grid-cols-1 gap-2">
                {guide.steps.map((step, idx) => {
                  const isChecked = !!checkedSteps[idx]
                  const isActive = activeStepIndex === idx
                  const isPinned = bookmark?.stepIndex === idx

                  return (
                    <div
                      key={idx}
                      id={`step-btn-${idx}`}
                      onClick={() => setActiveStepIndex(idx)}
                      className={`flex flex-col text-left rounded-xl border transition-colors duration-200 cursor-pointer ${
                        fontSize === 'sm'
                          ? 'p-3.5'
                          : fontSize === 'base'
                            ? 'p-4'
                            : 'p-5'
                      } ${
                        isActive
                          ? 'bg-primary/[0.06] border-primary/30 shadow-sm'
                          : isChecked
                            ? 'bg-primary/[0.01] border-primary/15 opacity-80'
                            : 'bg-white/50 border-border/70 hover:bg-white/80'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          {/* Checkbox button */}
                          <button
                            onClick={e => {
                              e.stopPropagation()
                              handleStepToggle(idx)
                            }}
                            className={`mt-0.5 flex shrink-0 items-center justify-center rounded-full border border-primary/30 hover:border-primary bg-white transition-all duration-200 cursor-pointer shadow-sm ${
                              fontSize === 'sm'
                                ? 'h-5 w-5'
                                : fontSize === 'base'
                                  ? 'h-6 w-6'
                                  : 'h-7 w-7'
                            }`}
                          >
                            {isChecked ? (
                              <svg
                                className={`text-primary animate-in zoom-in duration-200 ${
                                  fontSize === 'sm'
                                    ? 'h-3.5 w-3.5'
                                    : fontSize === 'base'
                                      ? 'h-4 w-4'
                                      : 'h-4.5 w-4.5'
                                }`}
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
                              <div
                                className={`rounded-full bg-muted/20 hover:bg-primary/50 transition-colors ${
                                  fontSize === 'sm'
                                    ? 'h-2 w-2'
                                    : fontSize === 'base'
                                      ? 'h-2.5 w-2.5'
                                      : 'h-3 w-3'
                                }`}
                              />
                            )}
                          </button>
                          <span className={getStepTextClass(isChecked)}>
                            {step}
                          </span>
                        </div>

                        {/* Bookmark Pin Button */}
                        <button
                          onClick={e => {
                            e.stopPropagation()
                            if (isPinned) {
                              clearBookmark()
                            } else {
                              setBookmark(idx)
                            }
                          }}
                          className={`shrink-0 p-1 rounded-lg hover:bg-primary/10 transition-colors ${
                            isPinned
                              ? 'text-primary'
                              : 'text-muted/40 hover:text-primary/70'
                          }`}
                          title={
                            isPinned
                              ? 'Bỏ lưu bước đọc'
                              : 'Lưu lại bước đang đọc'
                          }
                        >
                          <svg
                            className="h-4 w-4"
                            fill={isPinned ? 'currentColor' : 'none'}
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Expandable detailed visual preview and responsive tips */}
                      {isActive && (
                        <div className="mt-3 pl-9 space-y-2">
                          {/* Step Tip text - shown inline on ALL screens */}
                          <div className="text-xs text-primary bg-primary/5 p-3 rounded-lg leading-relaxed border border-primary/10">
                            <span className="font-bold uppercase tracking-wider text-[11px] block mb-1">
                              Hướng dẫn:
                            </span>
                            {speechHelper.isSpeaking ? (
                              <SpeechSubtitle
                                words={speechHelper.words}
                                subscribeWord={speechHelper.subscribeWord}
                              />
                            ) : (
                              (greetingText ?? currentTip)
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Mascot Track Column */}
            <div
              id="mascot-track-col"
              className="relative w-28 self-stretch hidden md:block shrink-0 border-l border-primary/10 pl-4"
            >
              <div
                className="absolute left-4 top-0 transition-transform duration-700 ease-in-out will-change-transform"
                style={{ transform: `translate3d(0, ${mascotTop}px, 0)` }}
              >
                <div
                  className={`${isMascotCrawling ? 'anim-mascot-wiggle' : ''} ${
                    isVisible ? 'animate-slide-down-bounce' : ''
                  }`}
                >
                  <AiMascot
                    isHappy={isMascotHappy}
                    armState={mascotEmotion.armState}
                    emotion={mascotEmotion.emotion}
                    mouthShape={mascotEmotion.mouthShape}
                    isTalking={speechHelper.isSpeaking}
                    isProgressAura={isProgressAura}
                    scrollProgress={scrollProgress}
                    pointDirection="left"
                    onClick={handleMascotClick}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AI Tip / Suggestion */}
          <div
            className={`relative rounded-xl border border-amber-500/25 bg-amber-500/[0.03] text-amber-900 leading-relaxed font-semibold flex transition-all duration-300 ${
              fontSize === 'sm'
                ? 'p-3.5 gap-2 text-[11px]'
                : fontSize === 'base'
                  ? 'p-4 gap-2.5 text-xs'
                  : 'p-5 gap-3 text-sm'
            }`}
          >
            <svg
              className={`text-amber-600 shrink-0 transition-all ${
                fontSize === 'sm'
                  ? 'h-4 w-4'
                  : fontSize === 'base'
                    ? 'h-5 w-5'
                    : 'h-6 w-6'
              }`}
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
              <span
                className={`font-bold text-amber-950 block mb-1 ${
                  fontSize === 'sm'
                    ? 'text-xs'
                    : fontSize === 'base'
                      ? 'text-sm'
                      : 'text-[15px]'
                }`}
              >
                Lưu ý quan trọng:
              </span>
              <span
                className={`${getBodyTextClass()} text-amber-900/90 leading-relaxed`}
              >
                {guide.tip}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const AiGuideBot = React.memo(AiGuideBotImpl)
