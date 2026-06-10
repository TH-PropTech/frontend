'use client'

import * as React from 'react'

type RoomType = 'living' | 'bedroom' | 'kitchen' | 'balcony'

interface RoomInfo {
  id: RoomType
  label: string
  image: string
  hotspots: Array<{
    id: string
    x: number
    y: number
    label: string
    description: string
  }>
}

const rooms: RoomInfo[] = [
  {
    id: 'living',
    label: 'Phòng khách',
    image: '/khach.webp',
    hotspots: [
      {
        id: 'sofa',
        x: 45,
        y: 60,
        label: 'Sofa Da Cao Cấp',
        description:
          'Chất liệu nhập khẩu cao cấp, thiết kế tối giản phù hợp không gian.',
      },
      {
        id: 'tv',
        x: 20,
        y: 40,
        label: 'Hệ Thống Giải Trí',
        description:
          'Tích hợp tivi thông minh 65-inch và dàn loa soundbar cao cấp.',
      },
    ],
  },
  {
    id: 'bedroom',
    label: 'Phòng ngủ',
    image: '/ngu.webp',
    hotspots: [
      {
        id: 'bed',
        x: 50,
        y: 55,
        label: 'Giường King Size',
        description: 'Đệm lò xo cao cấp 7 vùng giúp bạn có giấc ngủ ngon nhất.',
      },
      {
        id: 'closet',
        x: 80,
        y: 35,
        label: 'Tủ Quần Áo Âm Tường',
        description: 'Tối ưu hóa diện tích phòng, thiết kế cánh lùa hiện đại.',
      },
    ],
  },
  {
    id: 'kitchen',
    label: 'Nhà bếp',
    image: '/Bep.webp',
    hotspots: [
      {
        id: 'cabinet',
        x: 35,
        y: 40,
        label: 'Hệ Tủ Bếp Thông Minh',
        description:
          'Chất liệu chống ẩm acrylic sang trọng, tích hợp đèn LED cảm ứng.',
      },
      {
        id: 'stove',
        x: 60,
        y: 65,
        label: 'Bếp Từ Âm Cao Cấp',
        description:
          'Nhập khẩu châu Âu, an toàn tuyệt đối, tiết kiệm điện năng.',
      },
    ],
  },
  {
    id: 'balcony',
    label: 'Ban công',
    image: '/bancong.webp',
    hotspots: [
      {
        id: 'view',
        x: 50,
        y: 30,
        label: 'View Toàn Cảnh',
        description: 'Tầm nhìn trực diện Landmark 81 cực đẹp, đón nắng sớm.',
      },
      {
        id: 'garden',
        x: 25,
        y: 70,
        label: 'Tiểu Cảnh Xanh',
        description:
          'Khu vực trồng cây xanh tự nhiên, thư giãn sau giờ làm việc.',
      },
    ],
  },
]

export function VRShowcase(): React.ReactElement {
  const [activeRoom, setActiveRoom] = React.useState<RoomType>('living')
  const [rotation, setRotation] = React.useState(0)
  const [zoom, setZoom] = React.useState(100)
  const [activeHotspot, setActiveHotspot] = React.useState<string | null>(null)

  // Drag-to-rotate state references
  const [isDragging, setIsDragging] = React.useState(false)
  const startX = React.useRef(0)
  const startRotation = React.useRef(0)

  const handleMouseDown = (e: React.MouseEvent): void => {
    setIsDragging(true)
    startX.current = e.clientX
    startRotation.current = rotation
  }

  const handleMouseMove = (e: React.MouseEvent): void => {
    if (!isDragging) return
    const deltaX = e.clientX - startX.current
    // Speed factor for rotation drag
    setRotation(startRotation.current + deltaX * 0.5)
  }

  const handleMouseUpOrLeave = (): void => {
    setIsDragging(false)
  }

  // Touch handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent): void => {
    if (e.touches.length === 1) {
      const firstTouch = e.touches[0]
      if (firstTouch) {
        setIsDragging(true)
        startX.current = firstTouch.clientX
        startRotation.current = rotation
      }
    }
  }

  const handleTouchMove = (e: React.TouchEvent): void => {
    if (!isDragging || e.touches.length !== 1) return
    const firstTouch = e.touches[0]
    if (firstTouch) {
      const deltaX = firstTouch.clientX - startX.current
      setRotation(startRotation.current + deltaX * 0.5)
    }
  }

  const handleTouchEnd = (): void => {
    setIsDragging(false)
  }

  const currentRoom = (rooms.find(r => r.id === activeRoom) ??
    rooms[0]) as RoomInfo

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border bg-neutral-900 shadow-lg"
      id="vr-tour"
    >
      {/* VR Workspace Top Nav Bar */}
      <div className="relative z-20 flex flex-col items-center justify-between gap-4 border-b border-white/10 bg-black/60 px-6 py-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
          </span>
          <span className="font-display text-xs font-bold uppercase tracking-wider text-white">
            Trải nghiệm căn hộ VR 360°
          </span>
        </div>

        {/* Room Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-1 rounded-lg bg-white/5 p-1 text-xs">
          {rooms.map(room => (
            <button
              key={room.id}
              onClick={() => {
                setActiveRoom(room.id)
                setRotation(0)
                setActiveHotspot(null)
              }}
              className={`rounded-md px-3 py-1.5 font-semibold transition-all ${
                activeRoom === room.id
                  ? 'bg-primary text-white shadow-md'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {room.label}
            </button>
          ))}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoom(z => Math.max(70, z - 10))}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-black/40 font-bold text-white hover:bg-black/60"
            title="Zoom out"
          >
            -
          </button>
          <span className="w-12 text-center text-xs font-semibold text-white/80">
            {zoom}%
          </span>
          <button
            onClick={() => setZoom(z => Math.min(130, z + 10))}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-black/40 font-bold text-white hover:bg-black/60"
            title="Zoom in"
          >
            +
          </button>
        </div>
      </div>

      {/* Main Panoramas Window */}
      <div
        className="relative h-[450px] w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Dynamic Rotatable Panorama Layer */}
        <div
          className="absolute inset-0 h-full w-[2400px] transition-transform duration-75 ease-out"
          style={{
            backgroundImage: `url(${currentRoom.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateX(-50%) translateX(${rotation}px) scale(${zoom / 100})`,
            left: '50%',
          }}
        >
          {/* Simulated Hotspots positioned absolutely relative to the moving background */}
          {currentRoom.hotspots.map(spot => (
            <div
              key={spot.id}
              className="absolute group"
              style={{
                left: `${spot.x}%`,
                top: `${spot.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation()
                  setActiveHotspot(activeHotspot === spot.id ? null : spot.id)
                }}
                className="relative flex h-8 w-8 items-center justify-center"
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60 opacity-75"></span>
                <span className="relative flex h-6 w-6 items-center justify-center rounded-full border border-white bg-primary text-xs font-bold text-white shadow-lg transition-transform hover:scale-110">
                  i
                </span>
              </button>

              {/* Informative Tooltip Popover */}
              <div
                className={`absolute bottom-10 left-1/2 w-48 -translate-x-1/2 rounded-xl border border-white/10 bg-black/90 p-3 text-xs text-white shadow-xl backdrop-blur-md transition-all duration-200 pointer-events-none ${
                  activeHotspot === spot.id
                    ? 'scale-100 opacity-100 translate-y-0'
                    : 'scale-95 opacity-0 translate-y-2'
                }`}
              >
                <strong className="block font-display text-xs font-bold text-primary">
                  {spot.label}
                </strong>
                <p className="mt-1 text-[11px] leading-relaxed text-white/70">
                  {spot.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Drag Helper Overlay */}
        <div className="absolute bottom-4 left-4 pointer-events-none rounded-lg bg-black/60 px-3 py-1.5 text-[10px] font-semibold text-white/80 border border-white/5 backdrop-blur-sm">
          💡 Nhấn giữ và kéo chuột (hoặc vuốt) để xoay 360°
        </div>
      </div>

      {/* VR Workspace Bottom Controls */}
      <div className="flex items-center justify-between border-t border-white/10 bg-black/60 px-6 py-3">
        <span className="font-body text-[11px] text-white/40">
          * Hình ảnh giả lập chất lượng cao từ thiết bị scan 3D hồng ngoại.
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setRotation(r => r + 100)}
            className="rounded bg-white/10 px-3 py-1 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
          >
            &larr; Xoay trái
          </button>
          <button
            onClick={() => setRotation(r => r - 100)}
            className="rounded bg-white/10 px-3 py-1 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
          >
            Xoay phải &rarr;
          </button>
        </div>
      </div>
    </div>
  )
}
