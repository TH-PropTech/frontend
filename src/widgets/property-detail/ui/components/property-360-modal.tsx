'use client'

import * as React from 'react'
import * as THREE from 'three'
import { X, RotateCw, Compass, Maximize2, Minimize2 } from 'lucide-react'
import { ROOM_LABELS, ROOM_HOTSPOTS } from './property-360-config'
import { use360Narrator } from './use-360-narrator'
import { Property360Robot } from './property-360-robot'

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
  const [currentRoomIndex, setCurrentRoomIndex] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [showLoadingOverlay, setShowLoadingOverlay] = React.useState(false)
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const [isAutoRotate, setIsAutoRotate] = React.useState(true)
  const isAutoRotateRef = React.useRef(true)

  React.useEffect(() => {
    isAutoRotateRef.current = isAutoRotate
  }, [isAutoRotate])

  const modalRef = React.useRef<HTMLDivElement>(null)
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
          // eslint-disable-next-line no-console
          console.error('Không thể bật toàn màn hình:', err)
        })
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(err => {
          // eslint-disable-next-line no-console
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

  // Update hotspot coordinates directly in the DOM for high performance (zero React re-renders)
  const updateHotspots2D = React.useCallback((): void => {
    if (!cameraRef.current || !containerRef.current) return

    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight
    const hotspots = ROOM_HOTSPOTS[currentRoomIndex] || []

    hotspots.forEach((spot, idx) => {
      const el = document.getElementById(`hotspot-${idx}`)
      if (!el) return

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

      const visible =
        dot > 0.35 && x >= 0 && x <= width && y >= 0 && y <= height

      if (visible) {
        el.style.left = `${x}px`
        el.style.top = `${y}px`
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    })
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

    // 2. Setup WebGL Renderer (optimized pixel ratio)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
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
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        texture.generateMipmaps = false
        texture.colorSpace = THREE.SRGBColorSpace
        const maxAnisotropy = renderer.capabilities.getMaxAnisotropy()
        texture.anisotropy = Math.min(maxAnisotropy, 8) // capped for performance

        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: 1.0,
        })
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
      if (!isUserInteracting.current && isAutoRotateRef.current) {
        lon.current += 0.05 // auto slow rotation when idle (slower and smoother)
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

      // Project hotspots directly in DOM (no React state updates in render loop)
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

    // Reset interaction state on open to ensure immediate rotation
    isUserInteracting.current = false
    lon.current = 0
    lat.current = 0

    const cleanup = initThree()
    return cleanup
  }, [isOpen, initThree])

  // Load a new room panorama texture
  const switchRoom = React.useCallback(
    (index: number, yaw?: number, pitch?: number): void => {
      if (
        index === currentRoomIndex ||
        loading ||
        !sphereRef.current ||
        !cameraRef.current
      )
        return

      setLoading(true)

      // Calculate direction vector if yaw and pitch are provided (simulate movement forward)
      let dir: THREE.Vector3 | null = null
      if (yaw !== undefined && pitch !== undefined) {
        const phiRad = THREE.MathUtils.degToRad(90 - pitch)
        const thetaRad = THREE.MathUtils.degToRad(yaw)
        dir = new THREE.Vector3(
          Math.sin(phiRad) * Math.cos(thetaRad),
          Math.cos(phiRad),
          Math.sin(phiRad) * Math.sin(thetaRad)
        ).normalize()
      }

      const textureLoader = new THREE.TextureLoader()
      textureLoader.load(
        images360[index] || '',
        texture => {
          texture.minFilter = THREE.LinearFilter
          texture.magFilter = THREE.LinearFilter
          texture.generateMipmaps = false
          texture.colorSpace = THREE.SRGBColorSpace
          if (rendererRef.current) {
            const maxAnisotropy =
              rendererRef.current.capabilities.getMaxAnisotropy()
            texture.anisotropy = Math.min(maxAnisotropy, 8)
            rendererRef.current.initTexture(texture)
          }

          const sphere = sphereRef.current
          const camera = cameraRef.current
          if (sphere && camera) {
            const material = sphere.material as THREE.MeshBasicMaterial
            material.transparent = true

            // Phase 1: Smooth Fade Out + Move Camera Forward + Zoom (FOV decrease)
            let step = 0
            const maxSteps = 12
            const initialFov = camera.fov

            const fadeOutInterval = setInterval(() => {
              step++
              const progress = step / maxSteps

              // Fade out material opacity
              material.opacity = Math.max(0, 1.0 - progress)

              if (dir) {
                // Translate camera forward along direction vector (up to 120 units)
                camera.position.copy(dir).multiplyScalar(progress * 120)
                // Zoom in (decrease FOV)
                camera.fov = initialFov - progress * 25
                camera.updateProjectionMatrix()
              }

              material.needsUpdate = true

              if (step >= maxSteps) {
                clearInterval(fadeOutInterval)

                // Phase 2: Swap texture & orientation when invisible
                const oldTexture = material.map
                material.map = texture
                material.needsUpdate = true
                if (oldTexture) oldTexture.dispose()

                setCurrentRoomIndex(index)
                lon.current = 0
                lat.current = 0

                // Phase 3: Arriving transition (Smooth Fade In + Move Camera to center + Reset FOV)
                let arriveStep = 0
                const maxArriveSteps = 12

                // Start camera slightly back on the opposite side to simulate arriving
                if (dir) {
                  camera.position.copy(dir).multiplyScalar(-60)
                  camera.fov = 95 // start wide-angle
                  camera.updateProjectionMatrix()
                } else {
                  camera.position.set(0, 0, 0)
                }

                const fadeInInterval = setInterval(() => {
                  arriveStep++
                  const arriveProgress = arriveStep / maxArriveSteps

                  // Fade in material opacity
                  material.opacity = Math.min(1.0, arriveProgress)

                  if (dir) {
                    // Smoothly slide camera back to (0, 0, 0)
                    camera.position
                      .copy(dir)
                      .multiplyScalar(-60 * (1.0 - arriveProgress))
                    // Restore FOV back to 70
                    camera.fov = 95 - arriveProgress * 25
                    camera.updateProjectionMatrix()
                  }

                  material.needsUpdate = true

                  if (arriveStep >= maxArriveSteps) {
                    clearInterval(fadeInInterval)

                    // Final reset
                    camera.position.set(0, 0, 0)
                    camera.fov = 70
                    camera.updateProjectionMatrix()

                    setLoading(false)
                  }
                }, 16)
              }
            }, 16)
          } else {
            setLoading(false)
          }
        },
        undefined,
        err => {
          // eslint-disable-next-line no-console
          console.error('Failed to load room texture:', err)
          setLoading(false)
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
