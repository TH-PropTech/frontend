'use client'

import * as React from 'react'

interface LandlordChatModalProps {
  isOpen: boolean
  onClose: () => void
  landlord?:
    | {
        id: string
        fullName: string
        email: string
        phone: string
        avatar: string
        kycStatus: string
      }
    | null
    | undefined
}

export function LandlordChatModal({
  isOpen,
  onClose,
  landlord,
}: LandlordChatModalProps): React.ReactElement | null {
  const [chatMessages, setChatMessages] = React.useState<
    { sender: 'user' | 'landlord'; text: string }[]
  >([])
  const [inputText, setInputText] = React.useState('')

  const landlordName = landlord?.fullName || 'Chủ nhà'
  const landlordAvatar =
    landlord?.avatar ||
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'

  const handleSendMessage = (e: React.FormEvent): void => {
    e.preventDefault()
    const trimmed = inputText.trim()
    if (!trimmed) return
    setChatMessages(prev => [...prev, { sender: 'user', text: trimmed }])
    setInputText('')

    // Auto response simulator
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'landlord',
          text: `Chào bạn, mình là ${landlordName}. Căn hộ này vẫn còn trống và bạn có thể đặt lịch xem bất cứ lúc nào nhé.`,
        },
      ])
    }, 1000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 bg-white border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col h-96 animate-slide-up">
      {/* Header */}
      <div className="bg-primary text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-3 text-left">
          <img
            src={landlordAvatar}
            alt={landlordName}
            className="w-9 h-9 rounded-full object-cover border border-white/20 shadow-sm"
          />
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold">{landlordName}</h4>
            <span className="text-[10px] text-white/80">
              Phản hồi trong vài phút
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-white/80 text-xs font-bold cursor-pointer"
        >
          Đóng
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-surface-muted/30">
        {chatMessages.length === 0 ? (
          <p className="text-[10px] text-muted text-center py-12">
            Bắt đầu cuộc trò chuyện với chủ nhà căn hộ.
          </p>
        ) : (
          chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 text-xs font-body ${
                  msg.sender === 'user'
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-white border border-border text-fg rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input form */}
      <form
        onSubmit={handleSendMessage}
        className="border-t border-border p-3 flex gap-2"
      >
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          className="flex-1 bg-surface-muted/50 border border-border rounded-xl px-3 text-xs focus:outline-none focus:border-primary"
        />
        <button
          type="submit"
          className="bg-primary text-white text-xs font-bold rounded-xl px-3 py-2 cursor-pointer"
        >
          Gửi
        </button>
      </form>
    </div>
  )
}
