import * as React from 'react'
import * as THREE from 'three'
import { ROOM_HOTSPOTS } from './property-360-config'

interface Use360ViewerProps {
  isOpen: boolean
  images360: string[]
}

export function use360Viewer({ isOpen, images360 }: Use360ViewerProps) {
  const [currentRoomIndex, setCurrentRoomIndex] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [showLoadingOverlay, setShowLoadingOverlay] = React.useState(false)
  const [isAutoRotate, setIsAutoRotate] = React.useState(true)

  const isAutoRotateRef = React.useRef(true)
  React.useEffect(() => {
    isAutoRotateRef.current = isAutoRotate
  }, [isAutoRotate])

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
        lon.current += 0.05
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

            let step = 0
            const maxSteps = 12
            const initialFov = camera.fov

            const fadeOutInterval = setInterval(() => {
              step++
              const progress = step / maxSteps

              material.opacity = Math.max(0, 1.0 - progress)

              if (dir) {
                camera.position.copy(dir).multiplyScalar(progress * 120)
                camera.fov = initialFov - progress * 25
                camera.updateProjectionMatrix()
              }

              material.needsUpdate = true

              if (step >= maxSteps) {
                clearInterval(fadeOutInterval)

                const oldTexture = material.map
                material.map = texture
                material.needsUpdate = true
                if (oldTexture) oldTexture.dispose()

                setCurrentRoomIndex(index)
                lon.current = 0
                lat.current = 0

                let arriveStep = 0
                const maxArriveSteps = 12

                if (dir) {
                  camera.position.copy(dir).multiplyScalar(-60)
                  camera.fov = 95
                  camera.updateProjectionMatrix()
                } else {
                  camera.position.set(0, 0, 0)
                }

                const fadeInInterval = setInterval(() => {
                  arriveStep++
                  const arriveProgress = arriveStep / maxArriveSteps

                  material.opacity = Math.min(1.0, arriveProgress)

                  if (dir) {
                    camera.position
                      .copy(dir)
                      .multiplyScalar(-60 * (1.0 - arriveProgress))
                    camera.fov = 95 - arriveProgress * 25
                    camera.updateProjectionMatrix()
                  }

                  material.needsUpdate = true

                  if (arriveStep >= maxArriveSteps) {
                    clearInterval(fadeInInterval)

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

  return {
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
  }
}
