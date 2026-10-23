'use client'

import * as React from 'react'
import * as THREE from 'three'
import {
  CATEGORY_COLORS,
  allocateSlots,
  buildDocEdges,
} from '../lib/brain-graph'
import { buildCloud, buildNetwork, pickSlots } from '../lib/brain-shape'
import {
  LEGAL_DOC_CATEGORY_LABELS,
  type LegalDocCategory,
  type LegalDocItem,
} from '../model/legal-knowledge.types'

const CARD_COUNT = 5
const HOVER_RADIUS = 18
const INGEST_MS = 1700

export interface LegalBrain3DProps {
  /** Documents shown as nodes (not archived). */
  docs: readonly LegalDocItem[]
  selectedId: string | null
  /** Drafts ticked in the tray, waiting to be loaded into the brain. */
  markedIds: ReadonlySet<string>
  onSelect: (id: string | null) => void
  autoRotate: boolean
  /** When set, nodes of other categories fade out. */
  focusCategory: LegalDocCategory | null
}

interface Hub {
  id: string
  doc: LegalDocItem
  slot: number
  local: THREE.Vector3
  /** Outward unit vector, used to tell whether the node faces the viewer. */
  normal: THREE.Vector3
  edge: THREE.Sprite
  fill: THREE.Sprite
  ring: THREE.Sprite
  grow: number
  dying: boolean
  phase: number
  sx: number
  sy: number
  facing: boolean
}

function cssColor(name: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
  return value || fallback
}

function circleTexture(ring: boolean): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 64
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.fillStyle = '#fff'
    ctx.strokeStyle = '#fff'
    ctx.beginPath()
    if (ring) {
      ctx.lineWidth = 5
      ctx.arc(32, 32, 27, 0, Math.PI * 2)
      ctx.stroke()
    } else {
      ctx.arc(32, 32, 29, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  return new THREE.CanvasTexture(canvas)
}

type Point = [number, number]

function pointAlong(path: Point[], t: number): Point {
  const lengths: number[] = []
  let total = 0
  for (let i = 1; i < path.length; i += 1) {
    const a = path[i - 1]
    const b = path[i]
    const length = a && b ? Math.hypot(b[0] - a[0], b[1] - a[1]) : 0
    lengths.push(length)
    total += length
  }
  let rest = (((t % 1) + 1) % 1) * total
  for (let i = 0; i < lengths.length; i += 1) {
    const length = lengths[i] ?? 0
    const a = path[i]
    const b = path[i + 1]
    if (a && b && rest <= length) {
      const k = length === 0 ? 0 : rest / length
      return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]
    }
    rest -= length
  }
  return path[path.length - 1] ?? [0, 0]
}

export default function LegalBrain3D({
  docs,
  selectedId,
  markedIds,
  onSelect,
  autoRotate,
  focusCategory,
}: LegalBrain3DProps): React.ReactElement {
  const boxRef = React.useRef<HTMLDivElement>(null)
  const glRef = React.useRef<HTMLCanvasElement>(null)
  const overlayRef = React.useRef<HTMLCanvasElement>(null)
  const tipRef = React.useRef<HTMLDivElement>(null)
  const cardEls = React.useRef(new Map<string, HTMLButtonElement>())
  const cardHover = React.useRef<string | null>(null)
  const syncRef = React.useRef<(list: readonly LegalDocItem[]) => void>(
    () => undefined
  )
  const live = React.useRef({
    selectedId,
    markedIds,
    autoRotate,
    focusCategory,
    onSelect,
  })
  const [failed, setFailed] = React.useState(false)

  React.useEffect(() => {
    live.current = {
      selectedId,
      markedIds,
      autoRotate,
      focusCategory,
      onSelect,
    }
  })

  const recent = React.useMemo(
    () =>
      [...docs]
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
        .slice(0, CARD_COUNT),
    [docs]
  )
  const recentRef = React.useRef(recent)
  React.useEffect(() => {
    recentRef.current = recent
  }, [recent])

  React.useEffect(() => {
    const box = boxRef.current
    const glCanvas = glRef.current
    const overlay = overlayRef.current
    const octx = overlay?.getContext('2d')
    if (!box || !glCanvas || !overlay || !octx) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: glCanvas,
        antialias: true,
        alpha: true,
      })
    } catch {
      queueMicrotask(() => setFailed(true))
      return
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    renderer.setPixelRatio(dpr)

    const surface = cssColor('--surface', '#fffdf9')
    const primary = cssColor('--primary', '#c65a3a')
    const gridColor = new THREE.Color(cssColor('--border-strong', '#c9b8ae'))
    const dotA = new THREE.Color(cssColor('--subtle', '#a49389'))
    const dotB = new THREE.Color(cssColor('--muted', '#7a6a61'))
    const lineColor = new THREE.Color(cssColor('--border-strong', '#c9b8ae'))

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(surface, 5.6, 11)
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 1.3, 5.6)
    camera.lookAt(0, -0.1, 0)
    const brain = new THREE.Group()
    scene.add(brain)

    const dotTex = circleTexture(false)
    const ringTex = circleTexture(true)

    const cloud = buildCloud()
    const network = buildNetwork()
    const cloudCount = cloud.positions.length / 3
    const shades = new Float32Array(cloudCount * 3)
    const tmp = new THREE.Color()
    for (let i = 0; i < cloudCount; i += 1) {
      tmp.copy(dotA).lerp(dotB, Math.random())
      shades.set([tmp.r, tmp.g, tmp.b], i * 3)
    }
    const cloudGeo = new THREE.BufferGeometry()
    cloudGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(cloud.positions, 3)
    )
    cloudGeo.setAttribute('color', new THREE.BufferAttribute(shades, 3))
    const cloudMat = new THREE.PointsMaterial({
      size: 0.05,
      map: dotTex,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      alphaTest: 0.2,
    })
    brain.add(new THREE.Points(cloudGeo, cloudMat))

    const linkGeo = new THREE.BufferGeometry()
    linkGeo.setAttribute('position', new THREE.BufferAttribute(cloud.links, 3))
    const linkMat = new THREE.LineBasicMaterial({
      color: lineColor,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    })
    brain.add(new THREE.LineSegments(linkGeo, linkMat))

    const grid = new THREE.GridHelper(12, 30, gridColor, gridColor)
    grid.position.y = -1.75
    const gridMat = grid.material as THREE.Material
    gridMat.transparent = true
    gridMat.opacity = 0.35
    scene.add(grid)

    const relationMat = new THREE.LineBasicMaterial({
      color: primary,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
    })
    const relationLines = new THREE.LineSegments(
      new THREE.BufferGeometry(),
      relationMat
    )
    relationLines.renderOrder = 3
    brain.add(relationLines)

    const slotNodes = pickSlots(network, network.cortexCount)
    const hubs = new Map<string, Hub>()
    let slots = new Map<string, number>()
    let firstSync = true
    let ingestAt = -1

    const nodeVector = (index: number): THREE.Vector3 =>
      new THREE.Vector3(
        network.positions[index * 3] ?? 0,
        network.positions[index * 3 + 1] ?? 0,
        network.positions[index * 3 + 2] ?? 0
      )

    const tint = (hub: Hub): void => {
      const color = new THREE.Color(CATEGORY_COLORS[hub.doc.category])
      // The edge sprite stays hidden; drafts are told apart by being faded (see the frame loop).
      hub.fill.material.color.set(color)
      hub.edge.material.color.set(color)
    }

    const makeHub = (doc: LegalDocItem, slot: number): Hub => {
      const index = slotNodes[slot % Math.max(slotNodes.length, 1)] ?? 0
      const local = nodeVector(index)
      const sprite = (map: THREE.Texture, order: number): THREE.Sprite => {
        const item = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map,
            transparent: true,
            depthWrite: false,
            fog: false,
          })
        )
        item.position.copy(local)
        item.scale.setScalar(0.001)
        item.renderOrder = order
        return item
      }
      const edge = sprite(dotTex, 4)
      const fill = sprite(dotTex, 5)
      const ring = sprite(ringTex, 6)
      ring.material.color.set(primary)
      ring.visible = false
      brain.add(edge, fill, ring)
      const hub: Hub = {
        id: doc._id,
        doc,
        slot,
        local,
        normal: local.clone().normalize(),
        edge,
        fill,
        ring,
        grow: 0,
        dying: false,
        phase: Math.random() * 6,
        sx: 0,
        sy: 0,
        facing: true,
      }
      tint(hub)
      return hub
    }

    const disposeHub = (hub: Hub): void => {
      brain.remove(hub.edge, hub.fill, hub.ring)
      hub.edge.material.dispose()
      hub.fill.material.dispose()
      hub.ring.material.dispose()
    }

    const rebuildRelations = (list: readonly LegalDocItem[]): void => {
      const verts: number[] = []
      for (const [a, b] of buildDocEdges(list)) {
        const ha = hubs.get(a)
        const hb = hubs.get(b)
        if (!ha || !hb) continue
        const mid = ha.local.clone().add(hb.local).multiplyScalar(0.5)
        const span = ha.local.distanceTo(hb.local)
        const control = mid.add(
          mid
            .clone()
            .normalize()
            .multiplyScalar(0.35 * span)
        )
        const points = new THREE.QuadraticBezierCurve3(
          ha.local,
          control,
          hb.local
        ).getPoints(14)
        for (let i = 1; i < points.length; i += 1) {
          const p = points[i - 1]
          const q = points[i]
          if (p && q) verts.push(...p.toArray(), ...q.toArray())
        }
      }
      relationLines.geometry.dispose()
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
      relationLines.geometry = geo
    }

    syncRef.current = list => {
      slots = allocateSlots(
        list.map(doc => doc._id),
        slots,
        Math.max(slotNodes.length, 1)
      )
      const wanted = new Set(list.map(doc => doc._id))
      for (const hub of hubs.values()) {
        if (!wanted.has(hub.id)) hub.dying = true
      }
      let arrived = 0
      for (const doc of list) {
        const slot = slots.get(doc._id) ?? 0
        const existing = hubs.get(doc._id)
        if (existing && !existing.dying) {
          if (existing.doc.status === 'draft' && doc.status === 'published') {
            arrived += 1
          }
          existing.doc = doc
          tint(existing)
          continue
        }
        if (existing) disposeHub(existing)
        hubs.set(doc._id, makeHub(doc, slot))
        if (doc.status === 'published') arrived += 1
      }
      rebuildRelations(list)
      if (!firstSync && arrived > 0) ingestAt = performance.now()
      firstSync = false
    }

    let width = 0
    let height = 0
    const resize = (): void => {
      width = box.clientWidth
      height = box.clientHeight
      renderer.setSize(width, height, false)
      overlay.width = Math.round(width * dpr)
      overlay.height = Math.round(height * dpr)
      camera.aspect = width / Math.max(height, 1)
      camera.updateProjectionMatrix()
      brain.position.x = width < 640 ? -0.2 : -0.7
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(box)

    let dragging = false
    let moved = 0
    let lastX = 0
    let lastY = 0
    let rotY = 0
    let tilt = 0
    let center = 0
    let phase = 0
    let wasAuto = false
    let mouseX = -999
    let mouseY = -999
    let hoverId: string | null = null

    const onDown = (event: PointerEvent): void => {
      dragging = true
      moved = 0
      lastX = event.clientX
      lastY = event.clientY
      glCanvas.setPointerCapture(event.pointerId)
    }
    const onUp = (): void => {
      dragging = false
      if (moved < 4) live.current.onSelect(hoverId)
    }
    const onMove = (event: PointerEvent): void => {
      const rect = glCanvas.getBoundingClientRect()
      mouseX = event.clientX - rect.left
      mouseY = event.clientY - rect.top
      if (!dragging) return
      const dx = event.clientX - lastX
      const dy = event.clientY - lastY
      moved += Math.abs(dx) + Math.abs(dy)
      rotY += dx * 0.006
      tilt = Math.max(-0.6, Math.min(0.6, tilt + dy * 0.003))
      center = rotY - 0.6 * Math.sin(phase)
      lastX = event.clientX
      lastY = event.clientY
    }
    const onLeave = (): void => {
      mouseX = mouseY = -999
    }
    glCanvas.addEventListener('pointerdown', onDown)
    glCanvas.addEventListener('pointerup', onUp)
    glCanvas.addEventListener('pointermove', onMove)
    glCanvas.addEventListener('pointerleave', onLeave)

    const v = new THREE.Vector3()
    const toCamera = new THREE.Vector3()
    const worldNormal = new THREE.Vector3()
    const project = (local: THREE.Vector3): Point => {
      v.copy(local).applyMatrix4(brain.matrixWorld).project(camera)
      return [((v.x + 1) / 2) * width, ((1 - v.y) / 2) * height]
    }
    const stroke = (path: Point[], alpha: number, w: number): void => {
      octx.beginPath()
      path.forEach((p, i) =>
        i ? octx.lineTo(p[0], p[1]) : octx.moveTo(p[0], p[1])
      )
      octx.strokeStyle = primary
      octx.globalAlpha = alpha
      octx.lineWidth = w
      octx.stroke()
      octx.globalAlpha = 1
    }
    const dot = (p: Point, radius: number): void => {
      octx.beginPath()
      octx.arc(p[0], p[1], radius, 0, Math.PI * 2)
      octx.fillStyle = primary
      octx.fill()
    }
    const stemTip = new THREE.Vector3(-0.5, -1.0, 0)

    let frame = 0
    const loop = (): void => {
      frame = requestAnimationFrame(loop)
      const now = performance.now()
      const t = now / 1000
      const state = live.current

      if (state.autoRotate && !dragging) {
        if (!wasAuto) center = rotY - 0.6 * Math.sin(phase)
        phase += 0.0035
        rotY = center + 0.6 * Math.sin(phase)
      }
      wasAuto = state.autoRotate && !dragging
      brain.rotation.y = rotY
      brain.rotation.x = tilt
      brain.updateMatrixWorld(true)

      octx.setTransform(dpr, 0, 0, dpr, 0, 0)
      octx.clearRect(0, 0, width, height)

      let nearest: string | null = null
      let best = HOVER_RADIUS
      for (const hub of hubs.values()) {
        const [sx, sy] = project(hub.local)
        hub.sx = sx
        hub.sy = sy
        worldNormal.copy(hub.normal).applyQuaternion(brain.quaternion)
        toCamera
          .copy(hub.local)
          .applyMatrix4(brain.matrixWorld)
          .sub(camera.position)
          .negate()
          .normalize()
        hub.facing = worldNormal.dot(toCamera) > 0.12
        if (hub.dying || !hub.facing) continue
        const d = Math.hypot(sx - mouseX, sy - mouseY)
        if (d < best) {
          best = d
          nearest = hub.id
        }
      }
      const pinned = cardHover.current
      hoverId = pinned ?? nearest
      glCanvas.style.cursor = hoverId
        ? 'pointer'
        : dragging
          ? 'grabbing'
          : 'grab'

      for (const [id, hub] of hubs) {
        hub.grow = hub.dying
          ? Math.max(0, hub.grow - 0.05)
          : Math.min(1, hub.grow + 0.035)
        if (hub.dying && hub.grow === 0) {
          disposeHub(hub)
          hubs.delete(id)
          continue
        }
        const picked = id === state.selectedId
        const marked = state.markedIds.has(id)
        const active = id === hoverId || picked
        const dimmed =
          state.focusCategory !== null &&
          hub.doc.category !== state.focusCategory
        const base = 0.2 + (Math.min(hub.doc.chunkCount, 30) / 30) * 0.12
        const pulse = 1 + 0.1 * Math.sin(t * 2.2 + hub.phase)
        const size = base * hub.grow * (active ? 1.5 : 1) * pulse
        hub.fill.scale.setScalar(size)
        hub.edge.scale.setScalar(0.001)
        const opacity = dimmed ? 0.15 : hub.doc.status === 'draft' ? 0.55 : 1
        hub.fill.material.opacity = opacity
        hub.edge.material.opacity = opacity
        hub.ring.visible = picked || marked
        hub.ring.material.opacity = picked ? 1 : 0.7
        hub.ring.scale.setScalar(
          base * 2.4 * hub.grow * (1 + 0.08 * Math.sin(t * 3))
        )
      }

      const [tipX, tipY] = project(stemTip)
      const ingesting = ingestAt > 0 && now - ingestAt < INGEST_MS
      for (let i = 0; i < 3; i += 1) {
        const sy = height - 30 - i * 20
        const ex = tipX + (i - 1) * 9
        const path: Point[] = [
          [0, sy],
          [ex - 70 + i * 8, sy],
          [ex - 70 + i * 8, sy - 28 - i * 6],
          [ex, tipY + 8],
          [ex, tipY],
        ]
        stroke(path, ingesting ? 0.6 : 0.28, 1.2)
        const dots = ingesting ? 3 : 1
        const speed = ingesting ? 0.7 : 0.16
        for (let k = 0; k < dots; k += 1) {
          dot(pointAlong(path, t * speed + i * 0.23 + k / dots), 2.4)
        }
      }

      const wrapRect = box.getBoundingClientRect()
      recentRef.current.forEach((doc, index) => {
        const hub = hubs.get(doc._id)
        const el = cardEls.current.get(doc._id)
        if (!hub || !el || hub.dying) return
        const rect = el.getBoundingClientRect()
        const cx = rect.left - wrapRect.left
        const cy = rect.top - wrapRect.top + rect.height / 2
        const elbow = cx - 24 - index * 7
        const path: Point[] = [
          [hub.sx, hub.sy],
          [elbow, hub.sy],
          [elbow, cy],
          [cx, cy],
        ]
        const active = doc._id === hoverId || doc._id === state.selectedId
        const alpha = active ? 0.9 : hub.facing ? 0.4 : 0.15
        stroke(path, alpha, active ? 1.8 : 1.1)
        dot(pointAlong(path, t * 0.2 + index * 0.21), 2.4)
      })

      const tip = tipRef.current
      if (tip) {
        const hub = hoverId ? hubs.get(hoverId) : undefined
        if (hub && !hub.dying) {
          tip.style.display = 'block'
          tip.style.left = `${Math.min(hub.sx + 14, width - 190)}px`
          tip.style.top = `${Math.max(hub.sy - 38, 6)}px`
          const status = hub.doc.status === 'draft' ? 'chờ nạp' : 'đã nạp'
          tip.textContent = `${hub.doc.title} · ${LEGAL_DOC_CATEGORY_LABELS[hub.doc.category]} · ${status}`
        } else {
          tip.style.display = 'none'
        }
      }

      renderer.render(scene, camera)
    }
    loop()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      glCanvas.removeEventListener('pointerdown', onDown)
      glCanvas.removeEventListener('pointerup', onUp)
      glCanvas.removeEventListener('pointermove', onMove)
      glCanvas.removeEventListener('pointerleave', onLeave)
      syncRef.current = () => undefined
      for (const hub of hubs.values()) disposeHub(hub)
      hubs.clear()
      cloudGeo.dispose()
      cloudMat.dispose()
      linkGeo.dispose()
      linkMat.dispose()
      relationLines.geometry.dispose()
      relationMat.dispose()
      grid.geometry.dispose()
      gridMat.dispose()
      dotTex.dispose()
      ringTex.dispose()
      renderer.dispose()
    }
  }, [])

  React.useEffect(() => {
    syncRef.current(docs)
  }, [docs])

  if (failed) {
    return (
      <div
        role="alert"
        className="flex h-[520px] items-center justify-center bg-surface-muted/40 px-6 text-center text-sm text-muted"
      >
        Trình duyệt không hỗ trợ WebGL nên không vẽ được bộ não 3D. Dùng tab
        “Danh sách tài liệu” để quản lý.
      </div>
    )
  }

  return (
    <div ref={boxRef} className="relative h-[520px] overflow-hidden bg-surface">
      <canvas
        ref={glRef}
        aria-label="Bộ não tri thức 3D: mỗi nút lớn là một tài liệu, nút đậm đã nạp, nút mờ chờ nạp"
        role="img"
        className="absolute inset-0 h-full w-full touch-none"
      />
      <canvas
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      <div
        ref={tipRef}
        className="pointer-events-none absolute hidden max-w-[260px] rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs font-semibold text-fg shadow-md"
      />
      <div className="pointer-events-none absolute inset-y-4 right-4 flex w-40 flex-col justify-between sm:w-48">
        {recent.map(doc => (
          <button
            key={doc._id}
            type="button"
            ref={element => {
              if (element) cardEls.current.set(doc._id, element)
              else cardEls.current.delete(doc._id)
            }}
            onClick={() => onSelect(doc._id)}
            onMouseEnter={() => {
              cardHover.current = doc._id
            }}
            onMouseLeave={() => {
              cardHover.current = null
            }}
            className={`pointer-events-auto cursor-pointer rounded-lg border bg-surface/90 px-2.5 py-2 text-left transition-colors hover:border-primary ${
              selectedId === doc._id
                ? 'border-primary bg-primary-soft'
                : 'border-border'
            }`}
          >
            <span className="float-right ml-1 rounded border border-border px-1 text-[10px] font-semibold text-muted">
              .md
            </span>
            <span className="block text-xs font-bold leading-snug text-fg line-clamp-2">
              {doc.title}
            </span>
            <span className="mt-0.5 flex items-center gap-1 text-[11px] text-muted">
              <i
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: CATEGORY_COLORS[doc.category] }}
              />
              {LEGAL_DOC_CATEGORY_LABELS[doc.category]} ·{' '}
              {doc.status === 'draft' ? 'chờ nạp' : `${doc.chunkCount} đoạn`}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
