'use client'

import * as React from 'react'

interface Property360RobotProps {
  isAiEnabled: boolean
  setIsAiEnabled: React.Dispatch<React.SetStateAction<boolean>>
  isSpeaking: boolean
  speechText: string
}

export function Property360Robot({
  isAiEnabled,
  setIsAiEnabled,
  isSpeaking,
  speechText,
}: Property360RobotProps): React.ReactElement {
  return (
    <div className="absolute bottom-24 right-6 md:right-8 flex flex-col items-end gap-3 z-20 pointer-events-none">
      {/* Speech Bubble */}
      {isSpeaking && speechText && (
        <div className="pointer-events-auto max-w-[280px] md:max-w-[320px] bg-black/75 backdrop-blur-md border border-white/10 p-3.5 rounded-2xl rounded-tr-none text-white text-xs leading-relaxed shadow-xl animate-fade-in-up">
          <div className="text-[10px] font-bold text-primary mb-1 uppercase tracking-wider">AI Trợ Lý</div>
          <p className="font-medium text-white/90">{speechText}</p>
        </div>
      )}

      <div className="flex items-center gap-3 pointer-events-auto">
        {/* AI Narrator Control Panel */}
        <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-2 px-3 flex items-center gap-2.5 shadow-lg">
          <span className="text-white text-[10px] font-bold uppercase tracking-wider">Thuyết minh AI</span>
          <button
            onClick={() => setIsAiEnabled(prev => !prev)}
            className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-300 focus:outline-none ${
              isAiEnabled ? 'bg-[#c65a3a]' : 'bg-white/20'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                isAiEnabled ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Futuristic Robot Avatar */}
        <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-[#1e1e24] to-[#0a0a0f] border border-white/10 flex items-center justify-center shadow-2xl">
          {/* Pulsing ring around avatar */}
          <div
            className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${
              isSpeaking
                ? 'border-[#c65a3a] scale-110 animate-pulse'
                : isAiEnabled
                  ? 'border-primary/40 scale-105'
                  : 'border-white/5'
            }`}
          />

          {/* Glowing active indicator */}
          {isAiEnabled && (
            <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSpeaking ? 'bg-[#c65a3a]' : 'bg-primary'}`} />
              <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${isSpeaking ? 'bg-[#c65a3a]' : 'bg-primary'}`} />
            </span>
          )}

          {/* Modern Robot Face SVG */}
          <svg
            className={`h-7 w-7 transition-colors duration-300 ${isSpeaking ? 'text-[#c65a3a]' : isAiEnabled ? 'text-primary' : 'text-white/40'}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="5" y="6" width="14" height="12" rx="3" />
            <circle cx="9" cy="11" r="1.5" fill="currentColor" />
            <circle cx="15" cy="11" r="1.5" fill="currentColor" />
            {isSpeaking ? (
              <path d="M9 15c1 1.5 5 1.5 6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M10 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
            <path d="M12 6V3M9 3h6" />
          </svg>

          {/* Sound Equalizer bars when speaking */}
          {isSpeaking && (
            <div className="absolute -bottom-1.5 flex gap-0.5 justify-center">
              <span className="w-0.5 h-3.5 bg-[#c65a3a] rounded-full animate-bar-1" />
              <span className="w-0.5 h-4.5 bg-[#c65a3a] rounded-full animate-bar-2" />
              <span className="w-0.5 h-3 bg-[#c65a3a] rounded-full animate-bar-3" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
