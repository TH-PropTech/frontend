'use client'

import * as React from 'react'
import * as THREE from 'three'
import { X, RotateCw, Compass } from 'lucide-react'

interface Property360ModalProps {
  isOpen: boolean
  onClose: () => void
  images360: string[]
}

const ROOM_LABELS = [
  'Phòng khách',
  'Phòng ngủ',
  'Phòng vệ sinh',
  'Phòng bếp',
  'Ban công',
]

interface HotspotConfig {
  targetIndex: number
  label: string
  yaw: number
  pitch: number
}

// Hotspots mapping for each room index
const ROOM_HOTSPOTS: Record<number, HotspotConfig[]> = {
  0: [
    { targetIndex: 1, label: 'Đi tới Phòng ngủ', yaw: 45, pitch: -5 },
    { targetIndex: 3, label: 'Đi tới Phòng bếp', yaw: -60, pitch: -5 },
  ],
  1: [
    { targetIndex: 0, label: 'Đi tới Phòng khách', yaw: 230, pitch: -5 },
    { targetIndex: 2, label: 'Đi tới Phòng vệ sinh', yaw: 120, pitch: -10 },
  ],
  2: [{ targetIndex: 1, label: 'Đi tới Phòng ngủ', yaw: 300, pitch: -5 }],
  3: [
    { targetIndex: 0, label: 'Đi tới Phòng khách', yaw: 120, pitch: -5 },
    { targetIndex: 4, label: 'Đi ra Ban công', yaw: -80, pitch: -5 },
  ],
  4: [{ targetIndex: 3, label: 'Đi vào Phòng bếp', yaw: 100, pitch: -5 }],
}

export function Property360Modal({
  isOpen,
  onClose,
  images360,
}: Property360ModalProps): React.ReactElement | null {
  const [currentRoomIndex, setCurrentRoomIndex] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [showLoadingOverlay, setShowLoadingOverlay] = React.useState(false)
  const [hotspotPositions, setHotspotPositions] = React.useState<
    {
      targetIndex: number
      label: string
      x: number
      y: number
      visible: boolean
    }[]
  >([])

  const containerRef = React.useRef<HTMLDivElement>(null)
  const sceneRef = React.useRef<THREE.Scene | null>(null)
  const cameraRef = React.useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = React.useRef<THREE.WebGLRenderer | null>(null)
  const sphereRef = React.useRef<THREE.Mesh | null>(null)

  // Camera control values
  const isUserInteracting = React.useRef(false)
  const onPointerDownPointerX = React.useRef(0)
  const onPointerDownPointerY = React.useRef(0)
  const onPointerDownLon = React.useRef(0)
  const onPointerDownLat = React.useRef(0)
  const lon = React.useRef(0)
  const lat = React.useRef(0)
  const phi = React.useRef(0)
  const theta = React.useRef(0)

  // Cleanup effect
  React.useEffect(() => {
    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
      if (sphereRef.current) {
        const mat = sphereRef.current.material as THREE.MeshBasicMaterial
        if (mat.map) mat.map.dispose()
        mat.dispose()
        sphereRef.current.geometry.dispose()
      }
    }
  }, [])

  // Update hotspot coordinates on the HTML overlay
  const updateHotspots2D = React.useCallback((): void => {
    if (!cameraRef.current || !containerRef.current) return

    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight
    const hotspots = ROOM_HOTSPOTS[currentRoomIndex] || []

    const coords = hotspots.map(spot => {
      // Calculate 3D position from yaw and pitch
      const phiRad = THREE.MathUtils.degToRad(90 - spot.pitch)
      const thetaRad = THREE.MathUtils.degToRad(spot.yaw)

      const target = new THREE.Vector3()
      target.x = 200 * Math.sin(phiRad) * Math.cos(thetaRad)
      target.y = 200 * Math.cos(phiRad)
      target.z = 200 * Math.sin(phiRad) * Math.sin(thetaRad)

      // Project to 2D screen coordinate
      const vector = target.clone().project(cameraRef.current!)

      const cameraDir = new THREE.Vector3()
      cameraRef.current!.getWorldDirection(cameraDir)
      const toTarget = target.clone().normalize()
      const dot = cameraDir.dot(toTarget)

      const x = (vector.x * 0.5 + 0.5) * width
      const y = (-vector.y * 0.5 + 0.5) * height

      return {
        targetIndex: spot.targetIndex,
        label: spot.label,
        x,
        y,
        visible: dot > 0.35 && x >= 0 && x <= width && y >= 0 && y <= height,
      }
    })

    setHotspotPositions(coords)
  }, [currentRoomIndex])

  // Initializing Three.js Scene
  const initThree = React.useCallback(() => {
    if (!containerRef.current || !isOpen || images360.length === 0)
      return () => {}

    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight

    // 1. Setup Scene & Camera
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(70, width / height, 1, 1100)
    cameraRef.current = camera

    // 2. Setup WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    containerRef.current.innerHTML = ''
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // 3. Setup Sphere Geometry (inverted)
    const geometry = new THREE.SphereGeometry(500, 60, 40)
    geometry.scale(-1, 1, 1)

    // Load initial texture
    setLoading(true)
    setShowLoadingOverlay(true)
    const textureLoader = new THREE.TextureLoader()
    textureLoader.load(
      images360[currentRoomIndex] || '',
      texture => {
        // Quality settings to make image look less blurry
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        texture.generateMipmaps = false
        texture.colorSpace = THREE.SRGBColorSpace
        const maxAnisotropy = renderer.capabilities.getMaxAnisotropy()
        texture.anisotropy = Math.min(maxAnisotropy, 16)

        const material = new THREE.MeshBasicMaterial({ map: texture })
        const sphere = new THREE.Mesh(geometry, material)
        scene.add(sphere)
        sphereRef.current = sphere

        setLoading(false)
        setShowLoadingOverlay(false)
      },
      undefined,
      err => {
        // eslint-disable-next-line no-console
        console.error('Failed to load initial 360 texture:', err)
        setLoading(false)
        setShowLoadingOverlay(false)
      }
    )

    // Event listeners for resize
    const handleResize = (): void => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current)
        return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      cameraRef.current.aspect = w / h
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    // Animation Loop
    let animationFrameId: number
    const animate = (): void => {
      animationFrameId = requestAnimationFrame(animate)

      if (!cameraRef.current || !rendererRef.current || !sceneRef.current)
        return

      // Smooth camera rotation
      if (!isUserInteracting.current) {
        lon.current += 0.05 // auto slow rotation when idle
      }

      lat.current = Math.max(-85, Math.min(85, lat.current))
      phi.current = THREE.MathUtils.degToRad(90 - lat.current)
      theta.current = THREE.MathUtils.degToRad(lon.current)

      const target = new THREE.Vector3()
      target.x = 500 * Math.sin(phi.current) * Math.cos(theta.current)
      target.y = 500 * Math.cos(phi.current)
      target.z = 500 * Math.sin(phi.current) * Math.sin(theta.current)
      cameraRef.current.lookAt(target)

      rendererRef.current.render(sceneRef.current, cameraRef.current)

      // Project hotspots from 3D to 2D
      updateHotspots2D()
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isOpen, images360, currentRoomIndex, updateHotspots2D])

  React.useEffect(() => {
    if (!isOpen) return
    const cleanup = initThree()
    return cleanup
  }, [isOpen, initThree])

  // Load a new room panorama texture
  const switchRoom = React.useCallback(
    (index: number): void => {
      if (index === currentRoomIndex || loading || !sphereRef.current) return

      setLoading(true)
      setShowLoadingOverlay(true)
      const startTime = Date.now()

      const textureLoader = new THREE.TextureLoader()
      textureLoader.load(
        images360[index] || '',
        texture => {
          // Quality settings to make image look less blurry
          texture.minFilter = THREE.LinearFilter
          texture.magFilter = THREE.LinearFilter
          texture.generateMipmaps = false
          texture.colorSpace = THREE.SRGBColorSpace
          if (rendererRef.current) {
            const maxAnisotropy =
              rendererRef.current.capabilities.getMaxAnisotropy()
            texture.anisotropy = Math.min(maxAnisotropy, 16)
            rendererRef.current.initTexture(texture)
          }

          const sphere = sphereRef.current
          if (sphere) {
            const material = sphere.material as THREE.MeshBasicMaterial
            const oldTexture = material.map
            material.map = texture
            material.needsUpdate = true
            if (oldTexture) oldTexture.dispose()
          }

          setCurrentRoomIndex(index)
          // Reset camera orientation slightly towards center
          lon.current = 0
          lat.current = 0

          // Keep loading screen for at least 2.5s to fully mask the shader bind/compilation
          const elapsed = Date.now() - startTime
          const delay = Math.max(0, 2500 - elapsed)
          setTimeout(() => {
            setLoading(false)
            setShowLoadingOverlay(false)
          }, delay)
        },
        undefined,
        err => {
          // eslint-disable-next-line no-console
          console.error('Failed to load room texture:', err)
          setLoading(false)
          setShowLoadingOverlay(false)
        }
      )
    },
    [currentRoomIndex, loading, images360]
  )

  // Interactivity handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (loading) return
    isUserInteracting.current = true
    onPointerDownPointerX.current = e.clientX
    onPointerDownPointerY.current = e.clientY
    onPointerDownLon.current = lon.current
    onPointerDownLat.current = lat.current
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (!isUserInteracting.current) return
    const deltaX = e.clientX - onPointerDownPointerX.current
    const deltaY = e.clientY - onPointerDownPointerY.current
    lon.current = onPointerDownLon.current - deltaX * 0.15
    lat.current = onPointerDownLat.current + deltaY * 0.15
  }

  const handlePointerUp = (): void => {
    isUserInteracting.current = false
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black select-none flex flex-col font-sans">
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
        {hotspotPositions.map((hotspot, idx) => {
          if (!hotspot.visible) return null
          return (
            <div
              key={idx}
              className="absolute pointer-events-auto"
              style={{
                left: `${hotspot.x}px`,
                top: `${hotspot.y}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Tooltip on top */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-black/80 text-white text-[10px] font-bold py-1 px-2.5 rounded-lg whitespace-nowrap border border-white/10 shadow-lg pointer-events-none transition-all duration-200">
                {hotspot.label}
              </div>

              {/* Glowing Pulse Circle */}
              <button
                onClick={() => switchRoom(hotspot.targetIndex)}
                className="h-10 w-10 flex items-center justify-center relative group active:scale-90 transition-transform duration-150"
              >
                <div className="absolute inset-0 rounded-full bg-[#c65a3a]/40 animate-ping" />
                <div className="h-6 w-6 rounded-full bg-[#c65a3a] border-2 border-white flex items-center justify-center shadow-lg group-hover:bg-[#c65a3a]/90 transition-colors">
                  <Compass className="h-3.5 w-3.5 text-white animate-spin-[20s]" />
                </div>
              </button>
            </div>
          )
        })}
      </div>

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

        <button
          onClick={onClose}
          className="pointer-events-auto h-11 w-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all duration-200 active:scale-95 shadow-md"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Center Loader Overlay */}
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
