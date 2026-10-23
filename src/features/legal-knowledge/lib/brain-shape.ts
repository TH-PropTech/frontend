/**
 * Procedural human brain for the 3D knowledge view: folded cortex, cerebellum, brain stem and a
 * sparse neuron network on top. Pure maths, no three.js, so it can be unit tested.
 *
 * Axes: +x front, +y up, +z towards the viewer's side (the two hemispheres sit at +z and -z).
 */

export const GROUP_CORTEX = 0
export const GROUP_CEREBELLUM = 1
export const GROUP_STEM = 2

/** Deepest groove the surface functions produce; used to normalise `groove` to 0..1. */
const MAX_DEPTH = 0.12
const NODE_LIFT = 0.045

const smooth = (from: number, to: number, value: number): number => {
  const t = Math.min(1, Math.max(0, (value - from) / (to - from)))
  return t * t * (3 - 2 * t)
}
const bell = (value: number, width: number): number =>
  Math.exp(-((value / width) ** 2))
const powSigned = (value: number, power: number): number =>
  Math.sign(value) * Math.abs(value) ** power

export function mulberry32(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface Surface {
  x: number
  y: number
  z: number
  /** How far the point was pushed into a groove (0 on a crest). */
  depth: number
}

/** Direction on the unit sphere for the i-th of n fibonacci points. */
function sphereDir(i: number, n: number): [number, number, number] {
  const y = 1 - ((i + 0.5) / n) * 2
  const radius = Math.sqrt(1 - y * y)
  const angle = i * 2.399963
  return [Math.cos(angle) * radius, y, Math.sin(angle) * radius]
}

/**
 * Cerebrum. A boxy ellipsoid with a narrower frontal lobe, tapered occipital pole, temporal lobe
 * bulging underneath, then carved by the longitudinal fissure, the Sylvian and central sulci and
 * winding gyri grooves.
 */
export function cortexSurface(dx: number, dy: number, dz: number): Surface {
  const x = 1.8 * powSigned(dx, 0.9)
  let y = dy >= 0 ? 1.12 * dy ** 0.88 : -0.62 * (-dy) ** 0.9
  let z = 1.38 * powSigned(dz, 0.9)

  z *= 1 - 0.12 * smooth(0.2, 1, dx) - 0.1 * smooth(-0.3, -1, dx)
  y -= 0.1 * smooth(-0.1, -1, dx)
  y += 0.06 * bell(dx + 0.1, 0.5) * Math.max(0, dy)
  const temporal = Math.exp(
    -(((dx - 0.3) / 0.5) ** 2 + ((dy + 0.5) / 0.3) ** 2)
  )
  z *= 1 + 0.14 * temporal
  y -= 0.14 * temporal

  const lateral = smooth(0.3, 0.7, Math.abs(dz))
  const sylvianLine = -0.08 + (0.32 * (0.6 - dx)) / 1.2
  const sylvianSpan = smooth(-0.75, -0.5, dx) * (1 - smooth(0.55, 0.8, dx))
  const sylvian = 0.12 * bell(dy - sylvianLine, 0.055) * lateral * sylvianSpan

  const centralLine = (0.9 - dy) * 0.45 + 0.03 * Math.sin(dy * 14)
  const central =
    0.085 *
    bell(dx - centralLine, 0.045) *
    smooth(0.05, 0.3, dy) *
    (1 + 0.3 * Math.sin(dy * 18))

  const fissure = 0.22 * bell(dz, 0.055) * smooth(-0.35, 0, dy)

  const f =
    Math.sin(4.6 * x + 1.8 * Math.sin(3.1 * y + 1.7 * z)) *
      Math.cos(5.3 * y + 2.9 * z) +
    0.6 * Math.sin(6.1 * z + 2.2 * x + 1.3 * Math.sin(4 * y))
  const gyri = 0.1 * (1 - smooth(0, 0.32, Math.abs(f)))

  const depth = gyri + fissure + sylvian + central
  const length = Math.hypot(x, y, z)
  const scale = (length - depth) / length
  return { x: x * scale, y: y * scale, z: z * scale, depth }
}

const CEREBELLUM_CENTER: [number, number, number] = [-1.02, -0.7, 0]

/** Cerebellum: a flattened lobe under the occipital pole with fine horizontal folia. */
export function cerebellumSurface(dx: number, dy: number, dz: number): Surface {
  const ox = 0.62 * dx
  const oy = 0.3 * dy
  const oz = 0.68 * dz
  const y = CEREBELLUM_CENTER[1] + oy
  const folia =
    1 - smooth(0, 0.35, Math.abs(Math.sin(y * 52 + 2 * Math.sin(oz * 3))))
  const depth = 0.05 * folia + 0.04 * bell(dz, 0.05)
  const length = Math.hypot(ox, oy, oz) || 1
  const scale = (length - depth) / length
  return {
    x: CEREBELLUM_CENTER[0] + ox * scale,
    y: CEREBELLUM_CENTER[1] + oy * scale,
    z: oz * scale,
    depth,
  }
}

function stemCenter(t: number): [number, number, number] {
  return [-0.3 - 0.3 * t - 0.05 * Math.sin(t * 3), -0.4 - 1.05 * t, 0]
}

const stemRadius = (t: number): number => 0.2 - 0.08 * t

export interface SurfaceMesh {
  positions: Float32Array
  /** 0 on a crest, 1 at the bottom of a groove; drives the shading. */
  groove: Float32Array
  indices: Uint32Array
}

function gridMesh(
  lon: number,
  lat: number,
  point: (dx: number, dy: number, dz: number) => Surface
): SurfaceMesh {
  const positions = new Float32Array((lat + 1) * (lon + 1) * 3)
  const groove = new Float32Array((lat + 1) * (lon + 1))
  let v = 0
  for (let i = 0; i <= lat; i += 1) {
    const theta = (Math.PI * i) / lat
    for (let j = 0; j <= lon; j += 1) {
      const phi = (2 * Math.PI * j) / lon
      const p = point(
        Math.sin(theta) * Math.cos(phi),
        Math.cos(theta),
        Math.sin(theta) * Math.sin(phi)
      )
      positions.set([p.x, p.y, p.z], v * 3)
      groove[v] = Math.min(1, p.depth / MAX_DEPTH)
      v += 1
    }
  }
  const indices = new Uint32Array(lat * lon * 6)
  let k = 0
  for (let i = 0; i < lat; i += 1) {
    for (let j = 0; j < lon; j += 1) {
      const a = i * (lon + 1) + j
      const b = a + lon + 1
      indices.set([a, a + 1, b, b, a + 1, b + 1], k)
      k += 6
    }
  }
  return { positions, groove, indices }
}

export function buildCortexMesh(lon = 220, lat = 150): SurfaceMesh {
  return gridMesh(lon, lat, cortexSurface)
}

export function buildCerebellumMesh(lon = 90, lat = 56): SurfaceMesh {
  return gridMesh(lon, lat, cerebellumSurface)
}

export function buildStemMesh(rings = 26, sides = 16): SurfaceMesh {
  const count = (rings + 1) * (sides + 1)
  const positions = new Float32Array(count * 3)
  const groove = new Float32Array(count)
  let v = 0
  for (let i = 0; i <= rings; i += 1) {
    const t = i / rings
    const [cx, cy, cz] = stemCenter(t)
    for (let j = 0; j <= sides; j += 1) {
      const angle = (2 * Math.PI * j) / sides
      positions.set(
        [
          cx + Math.cos(angle) * stemRadius(t),
          cy,
          cz + Math.sin(angle) * stemRadius(t) * 0.85,
        ],
        v * 3
      )
      v += 1
    }
  }
  const indices = new Uint32Array(rings * sides * 6)
  let k = 0
  for (let i = 0; i < rings; i += 1) {
    for (let j = 0; j < sides; j += 1) {
      const a = i * (sides + 1) + j
      const b = a + sides + 1
      indices.set([a, a + 1, b, b, a + 1, b + 1], k)
      k += 6
    }
  }
  return { positions, groove, indices }
}

export interface BrainNetwork {
  /** xyz triples of every neuron node: cortex first, then cerebellum, then stem. */
  positions: Float32Array
  groups: Uint8Array
  cortexCount: number
  /** Segment endpoints (6 numbers per link). */
  links: Float32Array
}

interface NodeSpec {
  group: number
  minDist: number
  candidates: number
  surface: (dx: number, dy: number, dz: number) => Surface
  /** Origin the radial lift is measured from. */
  origin: [number, number, number]
}

const NODE_SPECS: readonly NodeSpec[] = [
  {
    group: GROUP_CORTEX,
    minDist: 0.3,
    candidates: 14000,
    surface: cortexSurface,
    origin: [0, 0, 0],
  },
  {
    group: GROUP_CEREBELLUM,
    minDist: 0.2,
    candidates: 3200,
    surface: cerebellumSurface,
    origin: CEREBELLUM_CENTER,
  },
]

type Vec = [number, number, number]

function pickNodes(spec: NodeSpec, random: () => number): Vec[] {
  const order = Array.from({ length: spec.candidates }, (_, i) => i)
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    const swap = order[i] ?? 0
    order[i] = order[j] ?? 0
    order[j] = swap
  }
  const limit = spec.minDist * spec.minDist
  const nodes: Vec[] = []
  for (const index of order) {
    const [dx, dy, dz] = sphereDir(index, spec.candidates)
    const s = spec.surface(dx, dy, dz)
    if (s.depth > 0.03) continue
    const rx = s.x - spec.origin[0]
    const ry = s.y - spec.origin[1]
    const rz = s.z - spec.origin[2]
    const r = Math.hypot(rx, ry, rz) || 1
    const node: Vec = [
      s.x + (rx / r) * NODE_LIFT,
      s.y + (ry / r) * NODE_LIFT,
      s.z + (rz / r) * NODE_LIFT,
    ]
    const clear = nodes.every(other => {
      const a = node[0] - other[0]
      const b = node[1] - other[1]
      const c = node[2] - other[2]
      return a * a + b * b + c * c > limit
    })
    if (clear) nodes.push(node)
  }
  return nodes
}

export function buildNetwork(): BrainNetwork {
  const random = mulberry32(20240607)
  const nodes: Vec[] = []
  const groups: number[] = []
  let cortexCount = 0
  for (const spec of NODE_SPECS) {
    const picked = pickNodes(spec, random)
    if (spec.group === GROUP_CORTEX) cortexCount = picked.length
    for (const node of picked) {
      nodes.push(node)
      groups.push(spec.group)
    }
  }
  for (let i = 0; i < 9; i += 1) {
    const t = i / 8
    const [cx, cy, cz] = stemCenter(0.1 + t * 0.85)
    nodes.push([cx + stemRadius(t) * 0.7, cy, cz + 0.05])
    groups.push(GROUP_STEM)
  }

  const reach = (a: number, b: number): number => {
    const ga = groups[a]
    return ga === groups[b]
      ? ga === GROUP_CORTEX
        ? 0.3 * 1.75
        : 0.2 * 1.9
      : 0.45
  }
  const seen = new Set<string>()
  const links: number[] = []
  for (let i = 0; i < nodes.length; i += 1) {
    const from = nodes[i] ?? [0, 0, 0]
    const near: Array<[number, number]> = []
    for (let j = 0; j < nodes.length; j += 1) {
      if (i === j) continue
      const to = nodes[j] ?? [0, 0, 0]
      const d = Math.hypot(from[0] - to[0], from[1] - to[1], from[2] - to[2])
      if (d < reach(i, j)) near.push([d, j])
    }
    near.sort((a, b) => a[0] - b[0])
    for (const [, j] of near.slice(0, 4)) {
      const key = i < j ? `${i}|${j}` : `${j}|${i}`
      if (seen.has(key)) continue
      seen.add(key)
      const to = nodes[j] ?? [0, 0, 0]
      links.push(...from, ...to)
    }
  }

  const positions = new Float32Array(nodes.length * 3)
  nodes.forEach((node, i) => positions.set(node, i * 3))
  return {
    positions,
    groups: Uint8Array.from(groups),
    cortexCount,
    links: new Float32Array(links),
  }
}

/**
 * Network node indices where documents can sit. Seeded shuffle for an even spread, with the
 * viewer-facing hemisphere first so the first documents are visible without rotating.
 */
export function pickSlots(network: BrainNetwork, count: number): number[] {
  const random = mulberry32(777)
  const order = Array.from({ length: network.cortexCount }, (_, i) => i)
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    const swap = order[i] ?? 0
    order[i] = order[j] ?? 0
    order[j] = swap
  }
  const facing = (index: number): boolean =>
    (network.positions[index * 3 + 2] ?? 0) > 0.15
  const slots = [...order.filter(facing), ...order.filter(i => !facing(i))]
  return slots.slice(0, count)
}

export interface BrainCloud {
  /** xyz triples. */
  positions: Float32Array
  /** Segment endpoints (6 numbers per link). */
  links: Float32Array
}

/** Dense point cloud of the folded brain plus links to each point's nearest neighbours: the "digital" look. */
export function buildCloud(): BrainCloud {
  const pts: Vec[] = []
  const grp: number[] = []
  const add = (p: Surface, group: number): void => {
    pts.push([p.x, p.y, p.z])
    grp.push(group)
  }
  const cortexN = 2600
  for (let i = 0; i < cortexN; i += 1) {
    const [dx, dy, dz] = sphereDir(i, cortexN)
    add(cortexSurface(dx, dy, dz), GROUP_CORTEX)
  }
  const cerebellumN = 420
  for (let i = 0; i < cerebellumN; i += 1) {
    const [dx, dy, dz] = sphereDir(i, cerebellumN)
    add(cerebellumSurface(dx, dy, dz), GROUP_CEREBELLUM)
  }
  for (let i = 0; i < 90; i += 1) {
    const t = i / 89
    const [cx, cy, cz] = stemCenter(t)
    const a = i * 2.4
    add(
      {
        x: cx + Math.cos(a) * stemRadius(t),
        y: cy,
        z: cz + Math.sin(a) * stemRadius(t) * 0.85,
        depth: 0,
      },
      GROUP_STEM
    )
  }
  const seen = new Set<string>()
  const links: number[] = []
  for (let i = 0; i < pts.length; i += 1) {
    const a = pts[i] ?? [0, 0, 0]
    const near: Array<[number, number]> = []
    for (let j = 0; j < pts.length; j += 1) {
      if (i === j || grp[i] !== grp[j]) continue
      const b = pts[j] ?? [0, 0, 0]
      const d = (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2
      if (d < 0.05) near.push([d, j])
    }
    near.sort((p, q) => p[0] - q[0])
    for (const [, j] of near.slice(0, 3)) {
      const key = i < j ? `${i}|${j}` : `${j}|${i}`
      if (seen.has(key)) continue
      seen.add(key)
      links.push(...a, ...(pts[j] ?? [0, 0, 0]))
    }
  }
  const positions = new Float32Array(pts.length * 3)
  pts.forEach((p, i) => positions.set(p, i * 3))
  return { positions, links: new Float32Array(links) }
}
