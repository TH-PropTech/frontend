'use client'

import * as React from 'react'
import * as THREE from 'three'
import { X, RotateCw, Compass, Maximize2, Minimize2 } from 'lucide-react'
import { ROOM_LABELS, ROOM_HOTSPOTS } from './property-360-config'
import { use360Narrator } from './use-360-narrator'
import { Property360Robot } from './property-360-robot'
import { use360Viewer } from './use-360-viewer'

interface Property360ModalProps {
  isOpen: boolean
  onClose: () => void
  images360: string[]
}

export function Property360Modal({
  isOpen,
  onClose,
  images360,
}: Property360ModalProps): React.ReactElement | null {
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const modalRef = React.useRef<HTMLDivElement>(null)

  const {
    currentRoomIndex,
    loading,
    showLoadingOverlay,
    isAutoRotate,
    setIsAutoRotate,
    containerRef,
    switchRoom,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    rendererRef,
    sphereRef,
  } = use360Viewer({ isOpen, images360 })

  // Hook handles all speech synthesis logic
  const { isAiEnabled, setIsAiEnabled, isSpeaking, speechText } =
    use360Narrator(currentRoomIndex, isOpen)

  // Fullscreen support
  const toggleFullscreen = React.useCallback((): void => {
    if (!modalRef.current) return
    if (!document.fullscreenElement) {
      modalRef.current
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(err => {
          console.error('Không thể bật toàn màn hình:', err)
        })
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(err => {
          console.error('Không thể tắt toàn màn hình:', err)
        })
    }
  }, [])

  React.useEffect(() => {
    const handleFullscreenChange = (): void => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  // Cleanup WebGL resources on unmount
  React.useEffect(() => {
    const renderer = rendererRef.current
    const sphere = sphereRef.current
    return () => {
      if (renderer) {
        renderer.dispose()
      }
      if (sphere) {
        const mat = sphere.material as THREE.MeshBasicMaterial
        if (mat.map) mat.map.dispose()
        mat.dispose()
        sphere.geometry.dispose()
      }
    }
  }, [rendererRef, sphereRef])

  if (!isOpen) return null

  const hotspots = ROOM_HOTSPOTS[currentRoomIndex] || []

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[100] bg-black select-none flex flex-col font-sans"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes floatBar {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1.2); }
        }
        .animate-bar-1 {
          animation: floatBar 0.8s ease-in-out infinite;
          transform-origin: bottom;
        }
        .animate-bar-2 {
          animation: floatBar 0.6s ease-in-out infinite 0.15s;
          transform-origin: bottom;
        }
        .animate-bar-3 {
          animation: floatBar 0.7s ease-in-out infinite 0.3s;
          transform-origin: bottom;
        }
      `,
        }}
      />

      {/* 360 Viewport Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="w-full h-full cursor-grab active:cursor-grabbing relative overflow-hidden"
      >
        {/* Fallback load screen */}
        {images360.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-sm">
            Không có ảnh 360 độ cho căn hộ này.
          </div>
        )}
      </div>

      {/* Hotspots Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {hotspots.map((spot, idx) => (
          <div
            key={idx}
            id={`hotspot-${idx}`}
            className="absolute pointer-events-auto"
            style={{
              transform: 'translate(-50%, -50%)',
              display: 'none',
            }}
          >
            {/* Tooltip on top */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-black/85 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg whitespace-nowrap border border-white/10 shadow-lg pointer-events-none transition-all duration-200">
              {spot.label}
            </div>

            {/* Glowing Pulse Circle */}
            <button
              onClick={() => switchRoom(spot.targetIndex, spot.yaw, spot.pitch)}
              className="h-10 w-10 flex items-center justify-center relative group active:scale-90 transition-transform duration-150"
            >
              <div className="absolute inset-0 rounded-full bg-[#c65a3a]/40 animate-ping" />
              <div className="h-6 w-6 rounded-full bg-[#c65a3a] border-2 border-white flex items-center justify-center shadow-lg group-hover:bg-[#c65a3a]/90 transition-colors">
                <Compass className="h-3.5 w-3.5 text-white" />
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Floating AI Narrator Widget */}
      <Property360Robot
        isAiEnabled={isAiEnabled}
        setIsAiEnabled={setIsAiEnabled}
        isSpeaking={isSpeaking}
        speechText={speechText}
      />

      {/* Header Info & Actions */}
      <div className="absolute top-0 left-0 right-0 p-5 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between pointer-events-none z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#c65a3a] animate-pulse" />
            <span className="text-white text-xs font-bold uppercase tracking-widest">
              Trải nghiệm 360° VR Tour
            </span>
          </div>
          <h2 className="text-white font-bold text-base md:text-lg">
            {ROOM_LABELS[currentRoomIndex]}
          </h2>
        </div>

        <div className="flex items-center gap-3 pointer-events-auto">
          {/* Auto Rotate Button */}
          <button
            onClick={() => setIsAutoRotate(prev => !prev)}
            className={`h-11 w-11 flex items-center justify-center rounded-full border border-white/10 transition-all duration-200 active:scale-95 shadow-md ${
              isAutoRotate
                ? 'bg-[#c65a3a] text-white shadow-lg shadow-[#c65a3a]/20'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            title={isAutoRotate ? 'Tắt tự động xoay' : 'Bật tự động xoay'}
          >
            <RotateCw
              className={`h-5 w-5 ${isAutoRotate ? 'animate-spin' : ''}`}
              style={{ animationDuration: '8s' }}
            />
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="h-11 w-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all duration-200 active:scale-95 shadow-md"
            title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
          >
            {isFullscreen ? (
              <Minimize2 className="h-5 w-5" />
            ) : (
              <Maximize2 className="h-5 w-5" />
            )}
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="h-11 w-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all duration-200 active:scale-95 shadow-md"
            title="Đóng"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Center Loader Overlay (Only for initial load) */}
      {showLoadingOverlay && (
        <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center z-20 transition-all duration-300">
          <div className="bg-white/10 border border-white/15 p-6 rounded-3xl flex flex-col items-center gap-3.5 shadow-2xl">
            <RotateCw className="h-8 w-8 text-[#c65a3a] animate-spin" />
            <span className="text-white font-bold text-xs uppercase tracking-wider">
              Đang tải không gian 3D...
            </span>
          </div>
        </div>
      )}

      {/* Subtle loader for room switching */}
      {loading && !showLoadingOverlay && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="bg-black/60 border border-white/10 p-4 rounded-2xl flex items-center gap-3 shadow-xl backdrop-blur-sm">
            <RotateCw className="h-5 w-5 text-[#c65a3a] animate-spin" />
            <span className="text-white text-[10px] uppercase font-bold tracking-wider">
              Đang chuyển phòng...
            </span>
          </div>
        </div>
      )}

      {/* Bottom Room Selector Panel */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 p-1.5 rounded-3xl bg-black/60 border border-white/10 backdrop-blur-md flex gap-1.5 max-w-[90vw] overflow-x-auto scrollbar-none shadow-2xl z-10">
        {images360.map((_, idx) => {
          const isActive = idx === currentRoomIndex
          return (
            <button
              key={idx}
              disabled={loading}
              onClick={() => switchRoom(idx)}
              className={`px-4 py-2.5 rounded-2xl text-[10px] uppercase font-bold tracking-wider transition-all duration-300 whitespace-nowrap active:scale-95 ${
                isActive
                  ? 'bg-[#c65a3a] text-white shadow-lg shadow-[#c65a3a]/30'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {ROOM_LABELS[idx] || `Phòng ${idx + 1}`}
            </button>
          )
        })}
      </div>
    </div>
  )
}
