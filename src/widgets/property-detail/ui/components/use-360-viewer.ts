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

  // Texture preload cache
  const preloadCacheRef = React.useRef<Map<number, THREE.Texture>>(new Map())

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

  const updateHotspots2D = React.useCallback((): void => {
    if (!cameraRef.current || !containerRef.current) return

    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight
    const hotspots = ROOM_HOTSPOTS[currentRoomIndex] || []

    hotspots.forEach((spot, idx) => {
      const el = document.getElementById(`hotspot-${idx}`)
      if (!el) return

      const phiRad = THREE.MathUtils.degToRad(90 - spot.pitch)
      const thetaRad = THREE.MathUtils.degToRad(spot.yaw)

      const target = new THREE.Vector3()
      target.x = 200 * Math.sin(phiRad) * Math.cos(thetaRad)
      target.y = 200 * Math.cos(phiRad)
      target.z = 200 * Math.sin(phiRad) * Math.sin(thetaRad)

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

  const getOrLoadTexture = React.useCallback(
    (index: number): Promise<THREE.Texture> => {
      const cached = preloadCacheRef.current.get(index)
      if (cached) return Promise.resolve(cached)

      return new Promise((resolve, reject) => {
        new THREE.TextureLoader().load(
          images360[index] || '',
          texture => {
            texture.minFilter = THREE.LinearFilter
            texture.magFilter = THREE.LinearFilter
            texture.generateMipmaps = false
            texture.colorSpace = THREE.SRGBColorSpace
            if (rendererRef.current) {
              const max = rendererRef.current.capabilities.getMaxAnisotropy()
              texture.anisotropy = Math.min(max, 8)
              rendererRef.current.initTexture(texture)
            }
            preloadCacheRef.current.set(index, texture)
            resolve(texture)
          },
          undefined,
          reject
        )
      })
    },
    [images360]
  )

  const preloadAdjacentRooms = React.useCallback(
    (centerIndex: number): void => {
      ;[centerIndex - 1, centerIndex + 1].forEach(idx => {
        if (idx >= 0 && idx < images360.length) {
          getOrLoadTexture(idx).catch(() => {})
        }
      })
    },
    [images360, getOrLoadTexture]
  )

  const runFadeTransition = React.useCallback(
    (
      texture: THREE.Texture,
      targetIndex: number,
      dir: THREE.Vector3 | null
    ): void => {
      const sphere = sphereRef.current
      const camera = cameraRef.current
      if (!sphere || !camera) {
        setLoading(false)
        return
      }

      const material = sphere.material as THREE.MeshBasicMaterial
      material.transparent = true

      const STEPS = 12
      let step = 0
      const initialFov = camera.fov

      const fadeOut = (): void => {
        step++
        const p = step / STEPS
        material.opacity = Math.max(0, 1 - p)
        material.needsUpdate = true
        if (dir) {
          camera.position.copy(dir).multiplyScalar(p * 120)
          camera.fov = initialFov - p * 25
          camera.updateProjectionMatrix()
        }

        if (step < STEPS) {
          requestAnimationFrame(fadeOut)
          return
        }

        const oldTex = material.map
        material.map = texture
        material.needsUpdate = true
        if (oldTex && oldTex !== texture) oldTex.dispose()

        setCurrentRoomIndex(targetIndex)
        lon.current = 0
        lat.current = 0

        if (dir) {
          camera.position.copy(dir).multiplyScalar(-60)
          camera.fov = 95
          camera.updateProjectionMatrix()
        } else {
          camera.position.set(0, 0, 0)
        }

        let arriveStep = 0
        const fadeIn = (): void => {
          arriveStep++
          const ap = arriveStep / STEPS
          material.opacity = Math.min(1, ap)
          material.needsUpdate = true
          if (dir) {
            camera.position.copy(dir).multiplyScalar(-60 * (1 - ap))
            camera.fov = 95 - ap * 25
            camera.updateProjectionMatrix()
          }

          if (arriveStep < STEPS) {
            requestAnimationFrame(fadeIn)
            return
          }

          camera.position.set(0, 0, 0)
          camera.fov = 70
          camera.updateProjectionMatrix()
          setLoading(false)
          preloadAdjacentRooms(targetIndex)
        }
        requestAnimationFrame(fadeIn)
      }

      requestAnimationFrame(fadeOut)
    },
    [preloadAdjacentRooms]
  )

  const initThree = React.useCallback(() => {
    if (!containerRef.current || !isOpen || images360.length === 0)
      return () => {}

    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(70, width / height, 1, 1100)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    containerRef.current.innerHTML = ''
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const geometry = new THREE.SphereGeometry(500, 60, 32)
    geometry.scale(-1, 1, 1)

    setLoading(true)
    setShowLoadingOverlay(true)

    getOrLoadTexture(currentRoomIndex)
      .then(texture => {
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
        preloadAdjacentRooms(currentRoomIndex)
      })
      .catch(err => {
        console.error('Failed to load initial 360 texture:', err)
        setLoading(false)
        setShowLoadingOverlay(false)
      })

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

    let rafId: number
    const animate = (): void => {
      rafId = requestAnimationFrame(animate)
      if (!cameraRef.current || !rendererRef.current || !sceneRef.current)
        return

      if (!isUserInteracting.current && isAutoRotateRef.current) {
        lon.current += 0.05
      }

      lat.current = Math.max(-85, Math.min(85, lat.current))
      phi.current = THREE.MathUtils.degToRad(90 - lat.current)
      theta.current = THREE.MathUtils.degToRad(lon.current)

      const target = new THREE.Vector3(
        500 * Math.sin(phi.current) * Math.cos(theta.current),
        500 * Math.cos(phi.current),
        500 * Math.sin(phi.current) * Math.sin(theta.current)
      )
      cameraRef.current.lookAt(target)
      rendererRef.current.render(sceneRef.current, cameraRef.current)
      updateHotspots2D()
    }
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(rafId)
    }
  }, [
    isOpen,
    images360,
    currentRoomIndex,
    updateHotspots2D,
    getOrLoadTexture,
    preloadAdjacentRooms,
  ])

  React.useEffect(() => {
    if (!isOpen) return
    isUserInteracting.current = false
    lon.current = 0
    lat.current = 0
    const cleanup = initThree()
    return cleanup
  }, [isOpen, initThree])

  React.useEffect(() => {
    const cache = preloadCacheRef.current
    return () => {
      cache.forEach(tex => tex.dispose())
      cache.clear()
    }
  }, [])

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

      getOrLoadTexture(index)
        .then(texture => runFadeTransition(texture, index, dir))
        .catch(err => {
          console.error('Failed to load room texture:', err)
          setLoading(false)
        })
    },
    [currentRoomIndex, loading, getOrLoadTexture, runFadeTransition]
  )

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
    lon.current =
      onPointerDownLon.current -
      (e.clientX - onPointerDownPointerX.current) * 0.15
    lat.current =
      onPointerDownLat.current +
      (e.clientY - onPointerDownPointerY.current) * 0.15
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
    lonRef: lon,
    latRef: lat,
    isUserInteractingRef: isUserInteracting,
  }
}
