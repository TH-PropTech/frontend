'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  Send,
  X,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Building2,
  Video,
  CheckCircle2,
} from 'lucide-react'
import { env } from '@/shared/config/env'

import { AiMascot } from './ai-mascot'

interface ChatMessage {
  id: string
  sender: 'user' | 'assistant'
  text: string
  propertyCard?: {
    id: string
    title: string
    price: number
    image: string
    location: string
    landlordName?: string
    landlordPhone?: string
  }
  propertyCards?: Array<{
    id: string
    title: string
    price: number
    image: string
    location: string
    landlordName?: string
    landlordPhone?: string
  }>
  bookingRequest?: {
    apartmentId: string
    apartmentTitle: string
  }
}

const QUICK_PROMPTS = [
  'Tìm căn hộ Vinhomes 2PN',
  'Quy trình thuê phòng?',
  'Tôi muốn đặt lịch xem nhà',
]

// Impure helper functions defined outside the React component to satisfy purity rules
let messageCounter = 0
const generateMessageId = (prefix: string): string => {
  messageCounter++
  return `${prefix}-${Date.now()}-${messageCounter}`
}

const generateRandomDeviceId = (): string => {
  return 'web-device-' + Math.random().toString(36).substring(2, 15)
}

const getWebSocketUrl = (userId?: string, deviceId?: string): string => {
  const base = env.apiUrl.replace('/api/v1', '')
  const wsProtocol = base.startsWith('https') ? 'wss' : 'ws'
  const wsBase = base.replace(/^https?/, wsProtocol) + '/ws/ai-chats'

  const params = []
  if (userId) params.push(`userId=${encodeURIComponent(userId)}`)
  if (deviceId) params.push(`deviceId=${encodeURIComponent(deviceId)}`)

  const queryStr = params.length > 0 ? `?${params.join('&')}` : ''
  return `${wsBase}${queryStr}`
}

export function AiAssistantPanel(): React.ReactElement {
  const [isOpen, setIsOpen] = React.useState(false)
  const [messages, setMessages] = React.useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = React.useState('')
  const [isTyping, setIsTyping] = React.useState(false)
  const [deviceId, setDeviceId] = React.useState('')
  const [showClearConfirm, setShowClearConfirm] = React.useState(false)

  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const wsRef = React.useRef<WebSocket | null>(null)
  const suggestionsRef = React.useRef<HTMLDivElement>(null)

  const scrollSuggestions = (direction: 'left' | 'right') => {
    if (suggestionsRef.current) {
      const scrollAmount = 150
      suggestionsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  // Initialize deviceId safely on client side
  React.useEffect(() => {
    let id = localStorage.getItem('ai_device_id')
    if (!id) {
      id = generateRandomDeviceId()
      localStorage.setItem('ai_device_id', id)
    }
    // Set state asynchronously to avoid warning of setState during effect execution
    const timer = setTimeout(() => {
      setDeviceId(id)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  // Auto-scroll messages to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  React.useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isTyping, isOpen])

  // Get active user ID if logged in
  const getUserId = (): string | undefined => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('user')
        if (stored) {
          const u = JSON.parse(stored) as { id?: string; _id?: string }
          return u.id || u._id
        }
      } catch {
        // Ignore JSON error
      }
    }
    return undefined
  }

  // Connect to WebSocket when panel is opened
  React.useEffect(() => {
    if (!isOpen || !deviceId) return

    const userId = getUserId()
    const wsUrl = getWebSocketUrl(userId, deviceId)
    const ws = new WebSocket(wsUrl)
    wsRef.current = ws

    ws.onopen = () => {
      console.log('[AiAssistantPanel] WebSocket connected')
    }

    ws.onmessage = event => {
      try {
        const payload = JSON.parse(event.data)
        if (payload.event === 'typing') {
          setIsTyping(true)
        } else if (payload.event === 'message_chunk') {
          setIsTyping(false)
          setMessages(prev => {
            const copy = [...prev]
            const lastMsg = copy[copy.length - 1]
            if (
              lastMsg &&
              lastMsg.sender === 'assistant' &&
              lastMsg.id.startsWith('stream-')
            ) {
              lastMsg.text = payload.data.text
            } else {
              copy.push({
                id: generateMessageId('stream'),
                sender: 'assistant',
                text: payload.data.text,
              })
            }
            return copy
          })
        } else if (payload.event === 'message_complete') {
          setIsTyping(false)
          setMessages(prev => {
            const copy = [...prev]
            const lastMsgIndex = copy.findIndex(m => m.id.startsWith('stream-'))
            const finalMsg: ChatMessage = {
              id: generateMessageId('msg'),
              sender: 'assistant',
              text: payload.data.text,
              propertyCard: payload.data.metadata?.propertyCard,
              propertyCards: payload.data.metadata?.propertyCards,
              bookingRequest: payload.data.metadata?.bookingRequest,
            }
            if (lastMsgIndex !== -1) {
              copy[lastMsgIndex] = finalMsg
            } else {
              copy.push(finalMsg)
            }
            return copy
          })
        } else if (payload.event === 'thinking_failed') {
          setIsTyping(false)
          setMessages(prev => [
            ...prev,
            {
              id: generateMessageId('error'),
              sender: 'assistant',
              text: payload.data.error || 'Có lỗi xảy ra khi xử lý tin nhắn.',
            },
          ])
        }
      } catch (err) {
        console.warn('Failed to parse WebSocket message:', err)
      }
    }

    ws.onerror = e => {
      console.warn('WebSocket error:', e)
    }

    ws.onclose = () => {
      console.log('[AiAssistantPanel] WebSocket closed')
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [isOpen, deviceId])

  const handleSend = (text: string) => {
    if (!text.trim()) return

    const userMsg: ChatMessage = {
      id: generateMessageId('msg'),
      sender: 'user',
      text: text,
    }

    setMessages(prev => [...prev, userMsg])
    setInputValue('')

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({ event: 'send_message', data: { text } })
      )
    } else {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: generateMessageId('err'),
            sender: 'assistant',
            text: 'Không thể kết nối đến Trợ lý AI. Vui lòng kiểm tra lại kết nối mạng.',
          },
        ])
      }, 500)
    }
  }

  const executeClearHistory = async () => {
    const userId = getUserId()
    try {
      const queryParams = new URLSearchParams()
      if (userId) queryParams.append('userId', userId)
      if (deviceId) queryParams.append('deviceId', deviceId)

      await fetch(`${env.apiUrl}/ai-chats/history?${queryParams.toString()}`, {
        method: 'DELETE',
      })
      setMessages([])
    } catch (err) {
      console.error('Failed to clear chat history:', err)
    }
  }

  const handleClearHistory = () => {
    setShowClearConfirm(true)
  }

  // Removed getFontSizeClass to use static text-sm

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return (price / 1000000).toLocaleString('vi-VN') + ' triệu/tháng'
    }
    return price.toLocaleString('vi-VN') + ' triệu/tháng'
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-[#C65A3A] via-[#E28766] to-[#F3A589] text-white shadow-xl shadow-orange-500/30 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none ring-4 ring-white/20 dark:ring-zinc-900/30"
          title="Mở Trợ lý ảo TH-PropTech"
        >
          <AiMascot size={56} isAnimated={false} />
        </button>
      )}

      {/* Glassmorphism Chat Panel */}
      {isOpen && (
        <div className="flex flex-col w-96 h-[550px] bg-white/90 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/50 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 transform scale-100 origin-bottom-right">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#C65A3A] text-white">
            <div className="flex items-center gap-2.5">
              <div className="relative h-9 w-9 bg-white/10 rounded-xl flex items-center justify-center p-0.5 shadow-sm border border-white/20">
                <AiMascot size={32} isAnimated={false} />
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#C65A3A] animate-pulse" />
              </div>
              <span className="font-semibold text-sm">
                Trợ lý ảo TH-PropTech
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Clear History */}
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearHistory}
                  className="p-1 rounded hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                  title="Xóa lịch sử chat"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.length === 0 && !isTyping && (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 text-zinc-400 space-y-3">
                <AiMascot size={72} isAnimated={false} />
                <p className="text-xs">
                  Chưa có cuộc hội thoại nào. Hãy nhập tin nhắn bên dưới hoặc
                  chọn gợi ý để bắt đầu!
                </p>
              </div>
            )}

            {messages.map(msg => {
              const isUser = msg.sender === 'user'
              return (
                <div
                  key={msg.id}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      isUser
                        ? 'bg-[#C65A3A] text-white rounded-br-none'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-bl-none border border-zinc-200/20'
                    }`}
                  >
                    <div className="whitespace-pre-line leading-relaxed">
                      {msg.text}
                    </div>

                    {msg.propertyCards && msg.propertyCards.length > 0 ? (
                      <div className="mt-3 flex gap-3 overflow-x-auto pb-2 snap-x scrollbar-none max-w-sm">
                        {msg.propertyCards.map((card, idx) => (
                          <div
                            key={card.id || idx}
                            className="snap-start shrink-0 w-56 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-md transition-shadow hover:shadow-lg"
                          >
                            <img
                              src={card.image}
                              alt={card.title}
                              className="h-24 w-full object-cover"
                            />
                            <div className="p-2.5 space-y-1">
                              <h4 className="font-semibold text-[11px] text-zinc-900 dark:text-white truncate">
                                {card.title}
                              </h4>
                              <p className="text-[9px] text-zinc-400 truncate">
                                {card.location}
                              </p>
                              {(card.landlordName || card.landlordPhone) && (
                                <p className="text-[8px] text-[#C65A3A] font-semibold truncate">
                                  Chủ: {card.landlordName || 'Chưa rõ'}{' '}
                                  {card.landlordPhone
                                    ? `(${card.landlordPhone})`
                                    : ''}
                                </p>
                              )}
                              <div className="flex items-center justify-between pt-1">
                                <span className="font-bold text-[10px] text-[#C65A3A]">
                                  {formatPrice(card.price)}
                                </span>
                                <div className="flex gap-1">
                                  <Link
                                    href={`/properties/${card.id}`}
                                    className="text-[9px] bg-[#C65A3A] hover:bg-[#A54B2F] text-white px-2 py-0.5 rounded transition-colors font-medium flex items-center"
                                  >
                                    Chi tiết
                                  </Link>
                                  <button
                                    onClick={() => {
                                      handleSend(
                                        `Đặt lịch xem căn hộ "${card.title}"`
                                      )
                                    }}
                                    className="text-[9px] border border-[#C65A3A] hover:bg-[#FDF3F0] text-[#C65A3A] px-1.5 py-0.5 rounded transition-colors font-medium"
                                  >
                                    Đặt lịch
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      msg.propertyCard && (
                        <div className="mt-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-md max-w-xs transition-shadow hover:shadow-lg">
                          <img
                            src={msg.propertyCard.image}
                            alt={msg.propertyCard.title}
                            className="h-28 w-full object-cover"
                          />
                          <div className="p-3 space-y-1">
                            <h4 className="font-semibold text-xs text-zinc-900 dark:text-white truncate">
                              {msg.propertyCard.title}
                            </h4>
                            <p className="text-[10px] text-zinc-400">
                              {msg.propertyCard.location}
                            </p>
                            {(msg.propertyCard.landlordName ||
                              msg.propertyCard.landlordPhone) && (
                              <p className="text-[9px] text-[#C65A3A] font-semibold mt-0.5">
                                Chủ:{' '}
                                {msg.propertyCard.landlordName || 'Chưa rõ'}{' '}
                                {msg.propertyCard.landlordPhone
                                  ? `(${msg.propertyCard.landlordPhone})`
                                  : ''}
                              </p>
                            )}
                            <div className="flex items-center justify-between pt-1">
                              <span className="font-bold text-xs text-[#C65A3A]">
                                {formatPrice(msg.propertyCard.price)}
                              </span>
                              <div className="flex gap-1.5">
                                <Link
                                  href={`/properties/${msg.propertyCard.id}`}
                                  className="text-[10px] bg-[#C65A3A] hover:bg-[#A54B2F] text-white px-2.5 py-1 rounded-md transition-colors font-medium flex items-center"
                                >
                                  Chi tiết
                                </Link>
                                <button
                                  onClick={() => {
                                    if (msg.propertyCard) {
                                      handleSend(
                                        `Đặt lịch xem căn hộ "${msg.propertyCard.title}"`
                                      )
                                    }
                                  }}
                                  className="text-[10px] border border-[#C65A3A] hover:bg-[#FDF3F0] text-[#C65A3A] px-2 py-1 rounded-md transition-colors font-medium"
                                >
                                  Đặt lịch
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}

                    {msg.bookingRequest && (
                      <BookingRequestCard
                        request={msg.bookingRequest}
                        onConfirm={(date, time) => {
                          const formattedMessage = `Đặt lịch xem căn hộ "${msg.bookingRequest?.apartmentTitle || 'căn hộ'}" vào lúc ${time} ngày ${date}`
                          handleSend(formattedMessage)
                        }}
                      />
                    )}
                  </div>
                </div>
              )
            })}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl rounded-bl-none px-4 py-2.5 text-zinc-400 text-xs flex items-center gap-1.5 border border-zinc-200/20">
                  <span
                    className="h-1.5 w-1.5 bg-zinc-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className="h-1.5 w-1.5 bg-zinc-400 rounded-full animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="h-1.5 w-1.5 bg-zinc-400 rounded-full animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="relative px-7 py-2 bg-zinc-50/50 dark:bg-zinc-950/20 border-t border-zinc-100 dark:border-zinc-800/40 group">
            {/* Slide Left Button */}
            <button
              type="button"
              onClick={() => scrollSuggestions('left')}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-white/90 dark:bg-zinc-800/90 border border-zinc-200/50 dark:border-zinc-700/50 text-[#C65A3A] shadow-sm hover:scale-105 active:scale-95 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
              title="Cuộn sang trái"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>

            <div
              ref={suggestionsRef}
              className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap no-scrollbar py-1"
            >
              {QUICK_PROMPTS.map(prompt => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="text-[10px] bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-[#C65A3A] font-medium px-3 py-1.5 rounded-full transition-colors focus:outline-none"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Slide Right Button */}
            <button
              type="button"
              onClick={() => scrollSuggestions('right')}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-white/90 dark:bg-zinc-800/90 border border-zinc-200/50 dark:border-zinc-700/50 text-[#C65A3A] shadow-sm hover:scale-105 active:scale-95 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
              title="Cuộn sang phải"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={e => {
              e.preventDefault()
              handleSend(inputValue)
            }}
            className="flex items-center gap-2 p-3 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800"
          >
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Hỏi trợ lý AI..."
              className="flex-1 px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-[#C65A3A] dark:focus:border-[#C65A3A] text-zinc-800 dark:text-zinc-200"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="flex items-center justify-center h-9 w-9 rounded-xl bg-[#C65A3A] hover:bg-[#A54B2F] disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 text-white transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          {/* Custom Confirmation Modal Overlay */}
          {showClearConfirm && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-zinc-950/40 backdrop-blur-sm p-6">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl shadow-2xl p-5 w-full max-w-[280px] space-y-4 transform scale-100 transition-all duration-200">
                <div className="text-center space-y-1.5">
                  <h4 className="font-semibold text-sm text-zinc-900 dark:text-white">
                    Xóa lịch sử chat
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Bạn có chắc chắn muốn xóa toàn bộ lịch sử trò chuyện? Hành
                    động này không thể hoàn tác.
                  </p>
                </div>
                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl transition-colors focus:outline-none"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      setShowClearConfirm(false)
                      await executeClearHistory()
                    }}
                    className="flex-1 py-2 text-xs font-medium text-white bg-gradient-to-tr from-[#C65A3A] to-[#E28766] hover:scale-[1.02] active:scale-[0.98] rounded-xl transition-all focus:outline-none shadow-md shadow-orange-500/10"
                  >
                    Xóa sạch
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

interface BookingRequestCardProps {
  request: {
    apartmentId: string
    apartmentTitle: string
  }
  onConfirm: (date: string, time: string) => void
}

function BookingRequestCard({
  request,
  onConfirm,
}: BookingRequestCardProps): React.ReactElement {
  const [selectedMethod, setSelectedMethod] = React.useState<
    'onsite' | 'video'
  >('onsite')
  const [selectedDate, setSelectedDate] = React.useState<string>('')
  const [selectedTime, setSelectedTime] = React.useState<string>('')
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  // Generate the next 3 days with labels and short dates (DD/MM)
  const dates = React.useMemo(() => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    const dayAfter = new Date(today)
    dayAfter.setDate(today.getDate() + 2)

    const formatDate = (d: Date) => {
      const day = String(d.getDate()).padStart(2, '0')
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const year = d.getFullYear()
      return `${day}/${month}/${year}`
    }

    const formatShort = (d: Date) => {
      const day = String(d.getDate()).padStart(2, '0')
      const month = String(d.getMonth() + 1).padStart(2, '0')
      return `${day}/${month}`
    }

    return [
      {
        label: 'Hôm nay',
        shortDate: formatShort(today),
        value: formatDate(today),
      },
      {
        label: 'Ngày mai',
        shortDate: formatShort(tomorrow),
        value: formatDate(tomorrow),
      },
      {
        label: 'Ngày kia',
        shortDate: formatShort(dayAfter),
        value: formatDate(dayAfter),
      },
    ]
  }, [])

  const times = ['09:00', '10:30', '14:00', '15:30', '17:00']

  const handleSubmit = () => {
    if (selectedDate && selectedTime) {
      setIsSubmitted(true)
      const methodText =
        selectedMethod === 'video' ? ' [Video Call]' : ' [Xem trực tiếp]'
      onConfirm(selectedDate, selectedTime + methodText)
    }
  }

  return (
    <div
      className="mt-3 rounded-2xl p-3.5 space-y-3.5 max-w-xs shadow-sm border"
      style={{
        backgroundColor: 'var(--surface-muted)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="space-y-1">
        <h4
          className="font-semibold text-xs flex items-center gap-1.5"
          style={{ color: 'var(--fg)' }}
        >
          <span
            className="flex h-2 w-2 rounded-full"
            style={{ backgroundColor: 'var(--primary)' }}
          />
          Lên lịch xem căn hộ
        </h4>
        <p
          className="text-[10px] line-clamp-1 font-medium"
          style={{ color: 'var(--muted)' }}
        >
          {request.apartmentTitle}
        </p>
      </div>

      {isSubmitted ? (
        <div
          className="text-center py-2.5 px-3 rounded-xl border space-y-1"
          style={{
            backgroundColor: 'var(--success-soft)',
            borderColor: 'var(--success)',
          }}
        >
          <p
            className="text-[11px] font-semibold flex items-center justify-center gap-1.5"
            style={{ color: 'var(--success)' }}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Đã gửi yêu cầu đặt lịch xem phòng
          </p>
          <p className="text-[10px] font-medium" style={{ color: 'var(--fg)' }}>
            {selectedDate} lúc {selectedTime} (
            {selectedMethod === 'video' ? 'Video Call' : 'Trực tiếp'})
          </p>
        </div>
      ) : (
        <>
          {/* Method Selector */}
          <div className="space-y-1.5">
            <span
              className="text-[10px] font-medium"
              style={{ color: 'var(--muted)' }}
            >
              Hình thức xem phòng:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedMethod('onsite')}
                className="text-[9px] px-2 py-1.5 rounded-lg border transition-all cursor-pointer font-medium flex items-center justify-center gap-1"
                style={{
                  backgroundColor:
                    selectedMethod === 'onsite'
                      ? 'var(--primary-soft)'
                      : 'var(--surface)',
                  borderColor:
                    selectedMethod === 'onsite'
                      ? 'var(--primary)'
                      : 'var(--border)',
                  color:
                    selectedMethod === 'onsite'
                      ? 'var(--primary)'
                      : 'var(--muted)',
                }}
              >
                <Building2 className="w-3 h-3" />
                Xem trực tiếp
              </button>
              <button
                type="button"
                onClick={() => setSelectedMethod('video')}
                className="text-[9px] px-2 py-1.5 rounded-lg border transition-all cursor-pointer font-medium flex items-center justify-center gap-1"
                style={{
                  backgroundColor:
                    selectedMethod === 'video'
                      ? 'var(--primary-soft)'
                      : 'var(--surface)',
                  borderColor:
                    selectedMethod === 'video'
                      ? 'var(--primary)'
                      : 'var(--border)',
                  color:
                    selectedMethod === 'video'
                      ? 'var(--primary)'
                      : 'var(--muted)',
                }}
              >
                <Video className="w-3 h-3" />
                Video Call
              </button>
            </div>
          </div>

          {/* Date Selector */}
          <div className="space-y-1.5">
            <span
              className="text-[10px] font-medium"
              style={{ color: 'var(--muted)' }}
            >
              Chọn ngày:
            </span>
            <div className="flex gap-1.5 flex-wrap">
              {dates.map(d => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setSelectedDate(d.value)}
                  className="text-[9px] px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer font-medium"
                  style={{
                    backgroundColor:
                      selectedDate === d.value
                        ? 'var(--primary)'
                        : 'var(--surface)',
                    borderColor:
                      selectedDate === d.value
                        ? 'var(--primary)'
                        : 'var(--border)',
                    color: selectedDate === d.value ? '#ffffff' : 'var(--fg)',
                  }}
                >
                  {d.label} ({d.shortDate})
                </button>
              ))}
            </div>
          </div>

          {/* Time Selector */}
          <div className="space-y-1.5">
            <span
              className="text-[10px] font-medium"
              style={{ color: 'var(--muted)' }}
            >
              Chọn giờ:
            </span>
            <div className="flex gap-1.5 flex-wrap">
              {times.map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTime(t)}
                  className="text-[9px] px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer font-medium"
                  style={{
                    backgroundColor:
                      selectedTime === t ? 'var(--primary)' : 'var(--surface)',
                    borderColor:
                      selectedTime === t ? 'var(--primary)' : 'var(--border)',
                    color: selectedTime === t ? '#ffffff' : 'var(--fg)',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedDate || !selectedTime}
            className="w-full text-center text-[10px] font-semibold py-2 rounded-xl transition-colors shadow-sm cursor-pointer disabled:cursor-not-allowed"
            style={{
              backgroundColor:
                !selectedDate || !selectedTime
                  ? 'var(--border)'
                  : 'var(--primary)',
              color:
                !selectedDate || !selectedTime ? 'var(--muted)' : '#ffffff',
            }}
          >
            Xác nhận đặt lịch xem phòng
          </button>
        </>
      )}
    </div>
  )
}
