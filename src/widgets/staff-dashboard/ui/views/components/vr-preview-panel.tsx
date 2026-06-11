'use client'

import * as React from 'react'

export function VrPreviewPanel(): React.ReactElement {
  const [vrZoom, setVrZoom] = React.useState(100)
  const [vrRotation, setVrRotation] = React.useState(0)

  return (
    <div className="relative flex-1 bg-neutral-900 flex flex-col justify-between p-4 overflow-hidden border-r border-line">
      {/* VR controls top */}
      <div className="relative z-10 flex justify-between items-center">
        <span className="text-xs font-bold text-white bg-black/60 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          GIẢ LẬP VR 360° SCANNER
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => setVrZoom(z => Math.max(50, z - 10))}
            className="h-8 w-8 bg-black/60 hover:bg-black/85 text-white rounded-lg flex items-center justify-center border border-white/10"
          >
            -
          </button>
          <button
            onClick={() => setVrZoom(z => Math.min(150, z + 10))}
            className="h-8 w-8 bg-black/60 hover:bg-black/85 text-white rounded-lg flex items-center justify-center border border-white/10"
          >
            +
          </button>
        </div>
      </div>

      {/* Panoramic Scene Container */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div
          className="relative transition-transform duration-300 ease-out select-none cursor-grab active:cursor-grabbing"
          style={{
            width: '1800px',
            height: '100%',
            transform: `translateX(${vrRotation}px) scale(${vrZoom / 100})`,
          }}
        >
          {/* Custom Simulated VR Scene */}
          <svg
            className="w-full h-full opacity-80"
            viewBox="0 0 1800 600"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="vr-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="50%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#1e1b4b" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#vr-sky)" />
            {/* Grids and lines simulating 3D spatial scanning */}
            <path
              d="M0 300h1800M900 0v600M450 0v600M1350 0v600"
              stroke="#334155"
              strokeWidth="1"
              strokeDasharray="5,5"
            />

            {/* Living Room Area */}
            <g transform="translate(100, 150)" className="text-white">
              <rect
                x="50"
                y="50"
                width="300"
                height="200"
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
              />
              <line
                x1="50"
                y1="50"
                x2="0"
                y2="0"
                stroke="#475569"
                strokeWidth="2"
              />
              <line
                x1="350"
                y1="50"
                x2="400"
                y2="0"
                stroke="#475569"
                strokeWidth="2"
              />
              <line
                x1="50"
                y1="250"
                x2="0"
                y2="300"
                stroke="#475569"
                strokeWidth="2"
              />
              <line
                x1="350"
                y1="250"
                x2="400"
                y2="300"
                stroke="#475569"
                strokeWidth="2"
              />
              <text
                x="120"
                y="150"
                fill="#94a3b8"
                fontSize="22"
                fontFamily="serif"
                fontWeight="bold"
              >
                PHÒNG KHÁCH (VR)
              </text>
              {/* Sofa */}
              <rect
                x="90"
                y="180"
                width="220"
                height="60"
                rx="10"
                fill="#3b82f6"
                fillOpacity="0.2"
                stroke="#3b82f6"
                strokeWidth="2"
              />
            </g>

            {/* Bedroom Area */}
            <g transform="translate(700, 150)">
              <rect
                x="50"
                y="50"
                width="300"
                height="200"
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
              />
              <line
                x1="50"
                y1="50"
                x2="0"
                y2="0"
                stroke="#475569"
                strokeWidth="2"
              />
              <line
                x1="350"
                y1="50"
                x2="400"
                y2="0"
                stroke="#475569"
                strokeWidth="2"
              />
              <text
                x="135"
                y="150"
                fill="#94a3b8"
                fontSize="22"
                fontFamily="serif"
                fontWeight="bold"
              >
                PHÒNG NGỦ 1
              </text>
              {/* Bed */}
              <rect
                x="100"
                y="120"
                width="200"
                height="120"
                rx="5"
                fill="#10b981"
                fillOpacity="0.2"
                stroke="#10b981"
                strokeWidth="2"
              />
            </g>

            {/* Kitchen Area */}
            <g transform="translate(1300, 150)">
              <rect
                x="50"
                y="50"
                width="300"
                height="200"
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
              />
              <line
                x1="50"
                y1="50"
                x2="0"
                y2="0"
                stroke="#475569"
                strokeWidth="2"
              />
              <line
                x1="350"
                y1="50"
                x2="400"
                y2="0"
                stroke="#475569"
                strokeWidth="2"
              />
              <text
                x="145"
                y="150"
                fill="#94a3b8"
                fontSize="22"
                fontFamily="serif"
                fontWeight="bold"
              >
                KHU BẾP
              </text>
              {/* Kitchen table */}
              <rect
                x="80"
                y="160"
                width="240"
                height="80"
                rx="4"
                fill="#f59e0b"
                fillOpacity="0.2"
                stroke="#f59e0b"
                strokeWidth="2"
              />
            </g>
          </svg>

          {/* Hotspots */}
          <div className="absolute left-[280px] top-[260px] flex flex-col items-center">
            <span className="h-6 w-6 rounded-full bg-accent-2/70 animate-ping absolute" />
            <span className="h-6 w-6 rounded-full bg-accent-2 flex items-center justify-center text-white text-[10px] font-bold relative border border-white shadow-md cursor-pointer">
              i
            </span>
            <span className="bg-black/80 text-white text-[10px] px-2 py-0.5 rounded mt-1.5 border border-white/10 font-body">
              Sofa da cao cấp
            </span>
          </div>

          <div className="absolute left-[880px] top-[220px] flex flex-col items-center">
            <span className="h-6 w-6 rounded-full bg-accent-2/70 animate-ping absolute" />
            <span className="h-6 w-6 rounded-full bg-accent-2 flex items-center justify-center text-white text-[10px] font-bold relative border border-white shadow-md cursor-pointer">
              i
            </span>
            <span className="bg-black/80 text-white text-[10px] px-2 py-0.5 rounded mt-1.5 border border-white/10 font-body">
              Giường ngủ King Size
            </span>
          </div>
        </div>
      </div>

      {/* VR Rotation controls bottom */}
      <div className="relative z-10 flex justify-between items-center bg-black/60 border border-white/10 p-2.5 rounded-lg">
        <span className="text-[10px] text-white/50 font-body">
          Kéo chuột hoặc nhấn các nút để xoay góc nhìn 360°
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setVrRotation(r => r + 80)}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded transition-colors"
          >
            &larr; Xoay trái
          </button>
          <button
            onClick={() => setVrRotation(r => r - 80)}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded transition-colors"
          >
            Xoay phải &rarr;
          </button>
        </div>
      </div>
    </div>
  )
}
