;(function () {
  const t = document.createElement('link').relList
  if (t && t.supports && t.supports('modulepreload')) return
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) i(s)
  new MutationObserver(s => {
    for (const r of s)
      if (r.type === 'childList')
        for (const a of r.addedNodes)
          a.tagName === 'LINK' && a.rel === 'modulepreload' && i(a)
  }).observe(document, { childList: !0, subtree: !0 })
  function e(s) {
    const r = {}
    return (
      s.integrity && (r.integrity = s.integrity),
      s.referrerPolicy && (r.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === 'use-credentials'
        ? (r.credentials = 'include')
        : s.crossOrigin === 'anonymous'
          ? (r.credentials = 'omit')
          : (r.credentials = 'same-origin'),
      r
    )
  }
  function i(s) {
    if (s.ep) return
    s.ep = !0
    const r = e(s)
    fetch(s.href, r)
  }
})()
const _o = '184',
  zn = { ROTATE: 0, DOLLY: 1, PAN: 2 },
  ri = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 },
  Ih = 0,
  nl = 1,
  Uh = 2,
  ds = 1,
  Nh = 2,
  cs = 3,
  oi = 0,
  qe = 1,
  On = 2,
  kn = 0,
  Vi = 1,
  il = 2,
  sl = 3,
  rl = 4,
  Fh = 5,
  mi = 100,
  Oh = 101,
  Bh = 102,
  zh = 103,
  kh = 104,
  Gh = 200,
  Hh = 201,
  Vh = 202,
  Wh = 203,
  Ma = 204,
  Sa = 205,
  Xh = 206,
  qh = 207,
  Yh = 208,
  jh = 209,
  Kh = 210,
  $h = 211,
  Zh = 212,
  Jh = 213,
  Qh = 214,
  ya = 0,
  ba = 1,
  Ea = 2,
  Xi = 3,
  Ta = 4,
  wa = 5,
  Aa = 6,
  Ra = 7,
  xo = 0,
  tu = 1,
  eu = 2,
  wn = 0,
  Cc = 1,
  Pc = 2,
  Lc = 3,
  Dc = 4,
  Ic = 5,
  Uc = 6,
  vo = 7,
  Nc = 300,
  vi = 301,
  qi = 302,
  Lr = 303,
  Dr = 304,
  Mr = 306,
  lr = 1e3,
  Bn = 1001,
  Ca = 1002,
  Fe = 1003,
  nu = 1004,
  ys = 1005,
  Ge = 1006,
  Ir = 1007,
  _i = 1008,
  an = 1009,
  Fc = 1010,
  Oc = 1011,
  ms = 1012,
  Mo = 1013,
  Rn = 1014,
  gn = 1015,
  Hn = 1016,
  So = 1017,
  yo = 1018,
  gs = 1020,
  Bc = 35902,
  zc = 35899,
  kc = 1021,
  Gc = 1022,
  _n = 1023,
  Vn = 1026,
  xi = 1027,
  bo = 1028,
  Eo = 1029,
  Mi = 1030,
  To = 1031,
  wo = 1033,
  tr = 33776,
  er = 33777,
  nr = 33778,
  ir = 33779,
  Pa = 35840,
  La = 35841,
  Da = 35842,
  Ia = 35843,
  Ua = 36196,
  Na = 37492,
  Fa = 37496,
  Oa = 37488,
  Ba = 37489,
  cr = 37490,
  za = 37491,
  ka = 37808,
  Ga = 37809,
  Ha = 37810,
  Va = 37811,
  Wa = 37812,
  Xa = 37813,
  qa = 37814,
  Ya = 37815,
  ja = 37816,
  Ka = 37817,
  $a = 37818,
  Za = 37819,
  Ja = 37820,
  Qa = 37821,
  to = 36492,
  eo = 36494,
  no = 36495,
  io = 36283,
  so = 36284,
  hr = 36285,
  ro = 36286,
  iu = 3200,
  ur = 0,
  su = 1,
  ni = '',
  Ke = 'srgb',
  dr = 'srgb-linear',
  fr = 'linear',
  ne = 'srgb',
  Ei = 7680,
  al = 519,
  ru = 512,
  au = 513,
  ou = 514,
  Ao = 515,
  lu = 516,
  cu = 517,
  Ro = 518,
  hu = 519,
  ol = 35044,
  ll = '300 es',
  Tn = 2e3,
  _s = 2001
function uu(n) {
  for (let t = n.length - 1; t >= 0; --t) if (n[t] >= 65535) return !0
  return !1
}
function pr(n) {
  return document.createElementNS('http://www.w3.org/1999/xhtml', n)
}
function du() {
  const n = pr('canvas')
  return ((n.style.display = 'block'), n)
}
const cl = {}
function hl(...n) {
  const t = 'THREE.' + n.shift()
  console.log(t, ...n)
}
function Hc(n) {
  const t = n[0]
  if (typeof t == 'string' && t.startsWith('TSL:')) {
    const e = n[1]
    e && e.isStackTrace
      ? (n[0] += ' ' + e.getLocation())
      : (n[1] =
          'Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.')
  }
  return n
}
function Dt(...n) {
  n = Hc(n)
  const t = 'THREE.' + n.shift()
  {
    const e = n[0]
    e && e.isStackTrace ? console.warn(e.getError(t)) : console.warn(t, ...n)
  }
}
function Zt(...n) {
  n = Hc(n)
  const t = 'THREE.' + n.shift()
  {
    const e = n[0]
    e && e.isStackTrace ? console.error(e.getError(t)) : console.error(t, ...n)
  }
}
function ao(...n) {
  const t = n.join(' ')
  t in cl || ((cl[t] = !0), Dt(...n))
}
function fu(n, t, e) {
  return new Promise(function (i, s) {
    function r() {
      switch (n.clientWaitSync(t, n.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case n.WAIT_FAILED:
          s()
          break
        case n.TIMEOUT_EXPIRED:
          setTimeout(r, e)
          break
        default:
          i()
      }
    }
    setTimeout(r, e)
  })
}
const pu = {
  [ya]: ba,
  [Ea]: Aa,
  [Ta]: Ra,
  [Xi]: wa,
  [ba]: ya,
  [Aa]: Ea,
  [Ra]: Ta,
  [wa]: Xi,
}
class li {
  addEventListener(t, e) {
    this._listeners === void 0 && (this._listeners = {})
    const i = this._listeners
    ;(i[t] === void 0 && (i[t] = []), i[t].indexOf(e) === -1 && i[t].push(e))
  }
  hasEventListener(t, e) {
    const i = this._listeners
    return i === void 0 ? !1 : i[t] !== void 0 && i[t].indexOf(e) !== -1
  }
  removeEventListener(t, e) {
    const i = this._listeners
    if (i === void 0) return
    const s = i[t]
    if (s !== void 0) {
      const r = s.indexOf(e)
      r !== -1 && s.splice(r, 1)
    }
  }
  dispatchEvent(t) {
    const e = this._listeners
    if (e === void 0) return
    const i = e[t.type]
    if (i !== void 0) {
      t.target = this
      const s = i.slice(0)
      for (let r = 0, a = s.length; r < a; r++) s[r].call(this, t)
      t.target = null
    }
  }
}
const ze = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '0a',
  '0b',
  '0c',
  '0d',
  '0e',
  '0f',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '1a',
  '1b',
  '1c',
  '1d',
  '1e',
  '1f',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '2a',
  '2b',
  '2c',
  '2d',
  '2e',
  '2f',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '3a',
  '3b',
  '3c',
  '3d',
  '3e',
  '3f',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
  '49',
  '4a',
  '4b',
  '4c',
  '4d',
  '4e',
  '4f',
  '50',
  '51',
  '52',
  '53',
  '54',
  '55',
  '56',
  '57',
  '58',
  '59',
  '5a',
  '5b',
  '5c',
  '5d',
  '5e',
  '5f',
  '60',
  '61',
  '62',
  '63',
  '64',
  '65',
  '66',
  '67',
  '68',
  '69',
  '6a',
  '6b',
  '6c',
  '6d',
  '6e',
  '6f',
  '70',
  '71',
  '72',
  '73',
  '74',
  '75',
  '76',
  '77',
  '78',
  '79',
  '7a',
  '7b',
  '7c',
  '7d',
  '7e',
  '7f',
  '80',
  '81',
  '82',
  '83',
  '84',
  '85',
  '86',
  '87',
  '88',
  '89',
  '8a',
  '8b',
  '8c',
  '8d',
  '8e',
  '8f',
  '90',
  '91',
  '92',
  '93',
  '94',
  '95',
  '96',
  '97',
  '98',
  '99',
  '9a',
  '9b',
  '9c',
  '9d',
  '9e',
  '9f',
  'a0',
  'a1',
  'a2',
  'a3',
  'a4',
  'a5',
  'a6',
  'a7',
  'a8',
  'a9',
  'aa',
  'ab',
  'ac',
  'ad',
  'ae',
  'af',
  'b0',
  'b1',
  'b2',
  'b3',
  'b4',
  'b5',
  'b6',
  'b7',
  'b8',
  'b9',
  'ba',
  'bb',
  'bc',
  'bd',
  'be',
  'bf',
  'c0',
  'c1',
  'c2',
  'c3',
  'c4',
  'c5',
  'c6',
  'c7',
  'c8',
  'c9',
  'ca',
  'cb',
  'cc',
  'cd',
  'ce',
  'cf',
  'd0',
  'd1',
  'd2',
  'd3',
  'd4',
  'd5',
  'd6',
  'd7',
  'd8',
  'd9',
  'da',
  'db',
  'dc',
  'dd',
  'de',
  'df',
  'e0',
  'e1',
  'e2',
  'e3',
  'e4',
  'e5',
  'e6',
  'e7',
  'e8',
  'e9',
  'ea',
  'eb',
  'ec',
  'ed',
  'ee',
  'ef',
  'f0',
  'f1',
  'f2',
  'f3',
  'f4',
  'f5',
  'f6',
  'f7',
  'f8',
  'f9',
  'fa',
  'fb',
  'fc',
  'fd',
  'fe',
  'ff',
]
let ul = 1234567
const fs = Math.PI / 180,
  xs = 180 / Math.PI
function $i() {
  const n = (Math.random() * 4294967295) | 0,
    t = (Math.random() * 4294967295) | 0,
    e = (Math.random() * 4294967295) | 0,
    i = (Math.random() * 4294967295) | 0
  return (
    ze[n & 255] +
    ze[(n >> 8) & 255] +
    ze[(n >> 16) & 255] +
    ze[(n >> 24) & 255] +
    '-' +
    ze[t & 255] +
    ze[(t >> 8) & 255] +
    '-' +
    ze[((t >> 16) & 15) | 64] +
    ze[(t >> 24) & 255] +
    '-' +
    ze[(e & 63) | 128] +
    ze[(e >> 8) & 255] +
    '-' +
    ze[(e >> 16) & 255] +
    ze[(e >> 24) & 255] +
    ze[i & 255] +
    ze[(i >> 8) & 255] +
    ze[(i >> 16) & 255] +
    ze[(i >> 24) & 255]
  ).toLowerCase()
}
function qt(n, t, e) {
  return Math.max(t, Math.min(e, n))
}
function Co(n, t) {
  return ((n % t) + t) % t
}
function mu(n, t, e, i, s) {
  return i + ((n - t) * (s - i)) / (e - t)
}
function gu(n, t, e) {
  return n !== t ? (e - n) / (t - n) : 0
}
function ps(n, t, e) {
  return (1 - e) * n + e * t
}
function _u(n, t, e, i) {
  return ps(n, t, 1 - Math.exp(-e * i))
}
function xu(n, t = 1) {
  return t - Math.abs(Co(n, t * 2) - t)
}
function vu(n, t, e) {
  return n <= t
    ? 0
    : n >= e
      ? 1
      : ((n = (n - t) / (e - t)), n * n * (3 - 2 * n))
}
function Mu(n, t, e) {
  return n <= t
    ? 0
    : n >= e
      ? 1
      : ((n = (n - t) / (e - t)), n * n * n * (n * (n * 6 - 15) + 10))
}
function Su(n, t) {
  return n + Math.floor(Math.random() * (t - n + 1))
}
function yu(n, t) {
  return n + Math.random() * (t - n)
}
function bu(n) {
  return n * (0.5 - Math.random())
}
function Eu(n) {
  n !== void 0 && (ul = n)
  let t = (ul += 1831565813)
  return (
    (t = Math.imul(t ^ (t >>> 15), t | 1)),
    (t ^= t + Math.imul(t ^ (t >>> 7), t | 61)),
    ((t ^ (t >>> 14)) >>> 0) / 4294967296
  )
}
function Tu(n) {
  return n * fs
}
function wu(n) {
  return n * xs
}
function Au(n) {
  return (n & (n - 1)) === 0 && n !== 0
}
function Ru(n) {
  return Math.pow(2, Math.ceil(Math.log(n) / Math.LN2))
}
function Cu(n) {
  return Math.pow(2, Math.floor(Math.log(n) / Math.LN2))
}
function Pu(n, t, e, i, s) {
  const r = Math.cos,
    a = Math.sin,
    o = r(e / 2),
    c = a(e / 2),
    l = r((t + i) / 2),
    u = a((t + i) / 2),
    p = r((t - i) / 2),
    h = a((t - i) / 2),
    m = r((i - t) / 2),
    g = a((i - t) / 2)
  switch (s) {
    case 'XYX':
      n.set(o * u, c * p, c * h, o * l)
      break
    case 'YZY':
      n.set(c * h, o * u, c * p, o * l)
      break
    case 'ZXZ':
      n.set(c * p, c * h, o * u, o * l)
      break
    case 'XZX':
      n.set(o * u, c * g, c * m, o * l)
      break
    case 'YXY':
      n.set(c * m, o * u, c * g, o * l)
      break
    case 'ZYZ':
      n.set(c * g, c * m, o * u, o * l)
      break
    default:
      Dt(
        'MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: ' +
          s
      )
  }
}
function Gi(n, t) {
  switch (t.constructor) {
    case Float32Array:
      return n
    case Uint32Array:
      return n / 4294967295
    case Uint16Array:
      return n / 65535
    case Uint8Array:
      return n / 255
    case Int32Array:
      return Math.max(n / 2147483647, -1)
    case Int16Array:
      return Math.max(n / 32767, -1)
    case Int8Array:
      return Math.max(n / 127, -1)
    default:
      throw new Error('Invalid component type.')
  }
}
function We(n, t) {
  switch (t.constructor) {
    case Float32Array:
      return n
    case Uint32Array:
      return Math.round(n * 4294967295)
    case Uint16Array:
      return Math.round(n * 65535)
    case Uint8Array:
      return Math.round(n * 255)
    case Int32Array:
      return Math.round(n * 2147483647)
    case Int16Array:
      return Math.round(n * 32767)
    case Int8Array:
      return Math.round(n * 127)
    default:
      throw new Error('Invalid component type.')
  }
}
const Ze = {
    DEG2RAD: fs,
    RAD2DEG: xs,
    generateUUID: $i,
    clamp: qt,
    euclideanModulo: Co,
    mapLinear: mu,
    inverseLerp: gu,
    lerp: ps,
    damp: _u,
    pingpong: xu,
    smoothstep: vu,
    smootherstep: Mu,
    randInt: Su,
    randFloat: yu,
    randFloatSpread: bu,
    seededRandom: Eu,
    degToRad: Tu,
    radToDeg: wu,
    isPowerOfTwo: Au,
    ceilPowerOfTwo: Ru,
    floorPowerOfTwo: Cu,
    setQuaternionFromProperEuler: Pu,
    normalize: We,
    denormalize: Gi,
  },
  Vo = class Vo {
    constructor(t = 0, e = 0) {
      ;((this.x = t), (this.y = e))
    }
    get width() {
      return this.x
    }
    set width(t) {
      this.x = t
    }
    get height() {
      return this.y
    }
    set height(t) {
      this.y = t
    }
    set(t, e) {
      return ((this.x = t), (this.y = e), this)
    }
    setScalar(t) {
      return ((this.x = t), (this.y = t), this)
    }
    setX(t) {
      return ((this.x = t), this)
    }
    setY(t) {
      return ((this.y = t), this)
    }
    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e
          break
        case 1:
          this.y = e
          break
        default:
          throw new Error('index is out of range: ' + t)
      }
      return this
    }
    getComponent(t) {
      switch (t) {
        case 0:
          return this.x
        case 1:
          return this.y
        default:
          throw new Error('index is out of range: ' + t)
      }
    }
    clone() {
      return new this.constructor(this.x, this.y)
    }
    copy(t) {
      return ((this.x = t.x), (this.y = t.y), this)
    }
    add(t) {
      return ((this.x += t.x), (this.y += t.y), this)
    }
    addScalar(t) {
      return ((this.x += t), (this.y += t), this)
    }
    addVectors(t, e) {
      return ((this.x = t.x + e.x), (this.y = t.y + e.y), this)
    }
    addScaledVector(t, e) {
      return ((this.x += t.x * e), (this.y += t.y * e), this)
    }
    sub(t) {
      return ((this.x -= t.x), (this.y -= t.y), this)
    }
    subScalar(t) {
      return ((this.x -= t), (this.y -= t), this)
    }
    subVectors(t, e) {
      return ((this.x = t.x - e.x), (this.y = t.y - e.y), this)
    }
    multiply(t) {
      return ((this.x *= t.x), (this.y *= t.y), this)
    }
    multiplyScalar(t) {
      return ((this.x *= t), (this.y *= t), this)
    }
    divide(t) {
      return ((this.x /= t.x), (this.y /= t.y), this)
    }
    divideScalar(t) {
      return this.multiplyScalar(1 / t)
    }
    applyMatrix3(t) {
      const e = this.x,
        i = this.y,
        s = t.elements
      return (
        (this.x = s[0] * e + s[3] * i + s[6]),
        (this.y = s[1] * e + s[4] * i + s[7]),
        this
      )
    }
    min(t) {
      return (
        (this.x = Math.min(this.x, t.x)),
        (this.y = Math.min(this.y, t.y)),
        this
      )
    }
    max(t) {
      return (
        (this.x = Math.max(this.x, t.x)),
        (this.y = Math.max(this.y, t.y)),
        this
      )
    }
    clamp(t, e) {
      return (
        (this.x = qt(this.x, t.x, e.x)),
        (this.y = qt(this.y, t.y, e.y)),
        this
      )
    }
    clampScalar(t, e) {
      return ((this.x = qt(this.x, t, e)), (this.y = qt(this.y, t, e)), this)
    }
    clampLength(t, e) {
      const i = this.length()
      return this.divideScalar(i || 1).multiplyScalar(qt(i, t, e))
    }
    floor() {
      return (
        (this.x = Math.floor(this.x)),
        (this.y = Math.floor(this.y)),
        this
      )
    }
    ceil() {
      return ((this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), this)
    }
    round() {
      return (
        (this.x = Math.round(this.x)),
        (this.y = Math.round(this.y)),
        this
      )
    }
    roundToZero() {
      return (
        (this.x = Math.trunc(this.x)),
        (this.y = Math.trunc(this.y)),
        this
      )
    }
    negate() {
      return ((this.x = -this.x), (this.y = -this.y), this)
    }
    dot(t) {
      return this.x * t.x + this.y * t.y
    }
    cross(t) {
      return this.x * t.y - this.y * t.x
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y)
    }
    normalize() {
      return this.divideScalar(this.length() || 1)
    }
    angle() {
      return Math.atan2(-this.y, -this.x) + Math.PI
    }
    angleTo(t) {
      const e = Math.sqrt(this.lengthSq() * t.lengthSq())
      if (e === 0) return Math.PI / 2
      const i = this.dot(t) / e
      return Math.acos(qt(i, -1, 1))
    }
    distanceTo(t) {
      return Math.sqrt(this.distanceToSquared(t))
    }
    distanceToSquared(t) {
      const e = this.x - t.x,
        i = this.y - t.y
      return e * e + i * i
    }
    manhattanDistanceTo(t) {
      return Math.abs(this.x - t.x) + Math.abs(this.y - t.y)
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t)
    }
    lerp(t, e) {
      return (
        (this.x += (t.x - this.x) * e),
        (this.y += (t.y - this.y) * e),
        this
      )
    }
    lerpVectors(t, e, i) {
      return (
        (this.x = t.x + (e.x - t.x) * i),
        (this.y = t.y + (e.y - t.y) * i),
        this
      )
    }
    equals(t) {
      return t.x === this.x && t.y === this.y
    }
    fromArray(t, e = 0) {
      return ((this.x = t[e]), (this.y = t[e + 1]), this)
    }
    toArray(t = [], e = 0) {
      return ((t[e] = this.x), (t[e + 1] = this.y), t)
    }
    fromBufferAttribute(t, e) {
      return ((this.x = t.getX(e)), (this.y = t.getY(e)), this)
    }
    rotateAround(t, e) {
      const i = Math.cos(e),
        s = Math.sin(e),
        r = this.x - t.x,
        a = this.y - t.y
      return (
        (this.x = r * i - a * s + t.x),
        (this.y = r * s + a * i + t.y),
        this
      )
    }
    random() {
      return ((this.x = Math.random()), (this.y = Math.random()), this)
    }
    *[Symbol.iterator]() {
      ;(yield this.x, yield this.y)
    }
  }
Vo.prototype.isVector2 = !0
let Nt = Vo
class Wn {
  constructor(t = 0, e = 0, i = 0, s = 1) {
    ;((this.isQuaternion = !0),
      (this._x = t),
      (this._y = e),
      (this._z = i),
      (this._w = s))
  }
  static slerpFlat(t, e, i, s, r, a, o) {
    let c = i[s + 0],
      l = i[s + 1],
      u = i[s + 2],
      p = i[s + 3],
      h = r[a + 0],
      m = r[a + 1],
      g = r[a + 2],
      v = r[a + 3]
    if (p !== v || c !== h || l !== m || u !== g) {
      let f = c * h + l * m + u * g + p * v
      f < 0 && ((h = -h), (m = -m), (g = -g), (v = -v), (f = -f))
      let d = 1 - o
      if (f < 0.9995) {
        const M = Math.acos(f),
          T = Math.sin(M)
        ;((d = Math.sin(d * M) / T),
          (o = Math.sin(o * M) / T),
          (c = c * d + h * o),
          (l = l * d + m * o),
          (u = u * d + g * o),
          (p = p * d + v * o))
      } else {
        ;((c = c * d + h * o),
          (l = l * d + m * o),
          (u = u * d + g * o),
          (p = p * d + v * o))
        const M = 1 / Math.sqrt(c * c + l * l + u * u + p * p)
        ;((c *= M), (l *= M), (u *= M), (p *= M))
      }
    }
    ;((t[e] = c), (t[e + 1] = l), (t[e + 2] = u), (t[e + 3] = p))
  }
  static multiplyQuaternionsFlat(t, e, i, s, r, a) {
    const o = i[s],
      c = i[s + 1],
      l = i[s + 2],
      u = i[s + 3],
      p = r[a],
      h = r[a + 1],
      m = r[a + 2],
      g = r[a + 3]
    return (
      (t[e] = o * g + u * p + c * m - l * h),
      (t[e + 1] = c * g + u * h + l * p - o * m),
      (t[e + 2] = l * g + u * m + o * h - c * p),
      (t[e + 3] = u * g - o * p - c * h - l * m),
      t
    )
  }
  get x() {
    return this._x
  }
  set x(t) {
    ;((this._x = t), this._onChangeCallback())
  }
  get y() {
    return this._y
  }
  set y(t) {
    ;((this._y = t), this._onChangeCallback())
  }
  get z() {
    return this._z
  }
  set z(t) {
    ;((this._z = t), this._onChangeCallback())
  }
  get w() {
    return this._w
  }
  set w(t) {
    ;((this._w = t), this._onChangeCallback())
  }
  set(t, e, i, s) {
    return (
      (this._x = t),
      (this._y = e),
      (this._z = i),
      (this._w = s),
      this._onChangeCallback(),
      this
    )
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w)
  }
  copy(t) {
    return (
      (this._x = t.x),
      (this._y = t.y),
      (this._z = t.z),
      (this._w = t.w),
      this._onChangeCallback(),
      this
    )
  }
  setFromEuler(t, e = !0) {
    const i = t._x,
      s = t._y,
      r = t._z,
      a = t._order,
      o = Math.cos,
      c = Math.sin,
      l = o(i / 2),
      u = o(s / 2),
      p = o(r / 2),
      h = c(i / 2),
      m = c(s / 2),
      g = c(r / 2)
    switch (a) {
      case 'XYZ':
        ;((this._x = h * u * p + l * m * g),
          (this._y = l * m * p - h * u * g),
          (this._z = l * u * g + h * m * p),
          (this._w = l * u * p - h * m * g))
        break
      case 'YXZ':
        ;((this._x = h * u * p + l * m * g),
          (this._y = l * m * p - h * u * g),
          (this._z = l * u * g - h * m * p),
          (this._w = l * u * p + h * m * g))
        break
      case 'ZXY':
        ;((this._x = h * u * p - l * m * g),
          (this._y = l * m * p + h * u * g),
          (this._z = l * u * g + h * m * p),
          (this._w = l * u * p - h * m * g))
        break
      case 'ZYX':
        ;((this._x = h * u * p - l * m * g),
          (this._y = l * m * p + h * u * g),
          (this._z = l * u * g - h * m * p),
          (this._w = l * u * p + h * m * g))
        break
      case 'YZX':
        ;((this._x = h * u * p + l * m * g),
          (this._y = l * m * p + h * u * g),
          (this._z = l * u * g - h * m * p),
          (this._w = l * u * p - h * m * g))
        break
      case 'XZY':
        ;((this._x = h * u * p - l * m * g),
          (this._y = l * m * p - h * u * g),
          (this._z = l * u * g + h * m * p),
          (this._w = l * u * p + h * m * g))
        break
      default:
        Dt('Quaternion: .setFromEuler() encountered an unknown order: ' + a)
    }
    return (e === !0 && this._onChangeCallback(), this)
  }
  setFromAxisAngle(t, e) {
    const i = e / 2,
      s = Math.sin(i)
    return (
      (this._x = t.x * s),
      (this._y = t.y * s),
      (this._z = t.z * s),
      (this._w = Math.cos(i)),
      this._onChangeCallback(),
      this
    )
  }
  setFromRotationMatrix(t) {
    const e = t.elements,
      i = e[0],
      s = e[4],
      r = e[8],
      a = e[1],
      o = e[5],
      c = e[9],
      l = e[2],
      u = e[6],
      p = e[10],
      h = i + o + p
    if (h > 0) {
      const m = 0.5 / Math.sqrt(h + 1)
      ;((this._w = 0.25 / m),
        (this._x = (u - c) * m),
        (this._y = (r - l) * m),
        (this._z = (a - s) * m))
    } else if (i > o && i > p) {
      const m = 2 * Math.sqrt(1 + i - o - p)
      ;((this._w = (u - c) / m),
        (this._x = 0.25 * m),
        (this._y = (s + a) / m),
        (this._z = (r + l) / m))
    } else if (o > p) {
      const m = 2 * Math.sqrt(1 + o - i - p)
      ;((this._w = (r - l) / m),
        (this._x = (s + a) / m),
        (this._y = 0.25 * m),
        (this._z = (c + u) / m))
    } else {
      const m = 2 * Math.sqrt(1 + p - i - o)
      ;((this._w = (a - s) / m),
        (this._x = (r + l) / m),
        (this._y = (c + u) / m),
        (this._z = 0.25 * m))
    }
    return (this._onChangeCallback(), this)
  }
  setFromUnitVectors(t, e) {
    let i = t.dot(e) + 1
    return (
      i < 1e-8
        ? ((i = 0),
          Math.abs(t.x) > Math.abs(t.z)
            ? ((this._x = -t.y), (this._y = t.x), (this._z = 0), (this._w = i))
            : ((this._x = 0), (this._y = -t.z), (this._z = t.y), (this._w = i)))
        : ((this._x = t.y * e.z - t.z * e.y),
          (this._y = t.z * e.x - t.x * e.z),
          (this._z = t.x * e.y - t.y * e.x),
          (this._w = i)),
      this.normalize()
    )
  }
  angleTo(t) {
    return 2 * Math.acos(Math.abs(qt(this.dot(t), -1, 1)))
  }
  rotateTowards(t, e) {
    const i = this.angleTo(t)
    if (i === 0) return this
    const s = Math.min(1, e / i)
    return (this.slerp(t, s), this)
  }
  identity() {
    return this.set(0, 0, 0, 1)
  }
  invert() {
    return this.conjugate()
  }
  conjugate() {
    return (
      (this._x *= -1),
      (this._y *= -1),
      (this._z *= -1),
      this._onChangeCallback(),
      this
    )
  }
  dot(t) {
    return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w
  }
  lengthSq() {
    return (
      this._x * this._x +
      this._y * this._y +
      this._z * this._z +
      this._w * this._w
    )
  }
  length() {
    return Math.sqrt(
      this._x * this._x +
        this._y * this._y +
        this._z * this._z +
        this._w * this._w
    )
  }
  normalize() {
    let t = this.length()
    return (
      t === 0
        ? ((this._x = 0), (this._y = 0), (this._z = 0), (this._w = 1))
        : ((t = 1 / t),
          (this._x = this._x * t),
          (this._y = this._y * t),
          (this._z = this._z * t),
          (this._w = this._w * t)),
      this._onChangeCallback(),
      this
    )
  }
  multiply(t) {
    return this.multiplyQuaternions(this, t)
  }
  premultiply(t) {
    return this.multiplyQuaternions(t, this)
  }
  multiplyQuaternions(t, e) {
    const i = t._x,
      s = t._y,
      r = t._z,
      a = t._w,
      o = e._x,
      c = e._y,
      l = e._z,
      u = e._w
    return (
      (this._x = i * u + a * o + s * l - r * c),
      (this._y = s * u + a * c + r * o - i * l),
      (this._z = r * u + a * l + i * c - s * o),
      (this._w = a * u - i * o - s * c - r * l),
      this._onChangeCallback(),
      this
    )
  }
  slerp(t, e) {
    let i = t._x,
      s = t._y,
      r = t._z,
      a = t._w,
      o = this.dot(t)
    o < 0 && ((i = -i), (s = -s), (r = -r), (a = -a), (o = -o))
    let c = 1 - e
    if (o < 0.9995) {
      const l = Math.acos(o),
        u = Math.sin(l)
      ;((c = Math.sin(c * l) / u),
        (e = Math.sin(e * l) / u),
        (this._x = this._x * c + i * e),
        (this._y = this._y * c + s * e),
        (this._z = this._z * c + r * e),
        (this._w = this._w * c + a * e),
        this._onChangeCallback())
    } else
      ((this._x = this._x * c + i * e),
        (this._y = this._y * c + s * e),
        (this._z = this._z * c + r * e),
        (this._w = this._w * c + a * e),
        this.normalize())
    return this
  }
  slerpQuaternions(t, e, i) {
    return this.copy(t).slerp(e, i)
  }
  random() {
    const t = 2 * Math.PI * Math.random(),
      e = 2 * Math.PI * Math.random(),
      i = Math.random(),
      s = Math.sqrt(1 - i),
      r = Math.sqrt(i)
    return this.set(
      s * Math.sin(t),
      s * Math.cos(t),
      r * Math.sin(e),
      r * Math.cos(e)
    )
  }
  equals(t) {
    return (
      t._x === this._x &&
      t._y === this._y &&
      t._z === this._z &&
      t._w === this._w
    )
  }
  fromArray(t, e = 0) {
    return (
      (this._x = t[e]),
      (this._y = t[e + 1]),
      (this._z = t[e + 2]),
      (this._w = t[e + 3]),
      this._onChangeCallback(),
      this
    )
  }
  toArray(t = [], e = 0) {
    return (
      (t[e] = this._x),
      (t[e + 1] = this._y),
      (t[e + 2] = this._z),
      (t[e + 3] = this._w),
      t
    )
  }
  fromBufferAttribute(t, e) {
    return (
      (this._x = t.getX(e)),
      (this._y = t.getY(e)),
      (this._z = t.getZ(e)),
      (this._w = t.getW(e)),
      this._onChangeCallback(),
      this
    )
  }
  toJSON() {
    return this.toArray()
  }
  _onChange(t) {
    return ((this._onChangeCallback = t), this)
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    ;(yield this._x, yield this._y, yield this._z, yield this._w)
  }
}
const Wo = class Wo {
  constructor(t = 0, e = 0, i = 0) {
    ;((this.x = t), (this.y = e), (this.z = i))
  }
  set(t, e, i) {
    return (
      i === void 0 && (i = this.z),
      (this.x = t),
      (this.y = e),
      (this.z = i),
      this
    )
  }
  setScalar(t) {
    return ((this.x = t), (this.y = t), (this.z = t), this)
  }
  setX(t) {
    return ((this.x = t), this)
  }
  setY(t) {
    return ((this.y = t), this)
  }
  setZ(t) {
    return ((this.z = t), this)
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e
        break
      case 1:
        this.y = e
        break
      case 2:
        this.z = e
        break
      default:
        throw new Error('index is out of range: ' + t)
    }
    return this
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x
      case 1:
        return this.y
      case 2:
        return this.z
      default:
        throw new Error('index is out of range: ' + t)
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z)
  }
  copy(t) {
    return ((this.x = t.x), (this.y = t.y), (this.z = t.z), this)
  }
  add(t) {
    return ((this.x += t.x), (this.y += t.y), (this.z += t.z), this)
  }
  addScalar(t) {
    return ((this.x += t), (this.y += t), (this.z += t), this)
  }
  addVectors(t, e) {
    return (
      (this.x = t.x + e.x),
      (this.y = t.y + e.y),
      (this.z = t.z + e.z),
      this
    )
  }
  addScaledVector(t, e) {
    return ((this.x += t.x * e), (this.y += t.y * e), (this.z += t.z * e), this)
  }
  sub(t) {
    return ((this.x -= t.x), (this.y -= t.y), (this.z -= t.z), this)
  }
  subScalar(t) {
    return ((this.x -= t), (this.y -= t), (this.z -= t), this)
  }
  subVectors(t, e) {
    return (
      (this.x = t.x - e.x),
      (this.y = t.y - e.y),
      (this.z = t.z - e.z),
      this
    )
  }
  multiply(t) {
    return ((this.x *= t.x), (this.y *= t.y), (this.z *= t.z), this)
  }
  multiplyScalar(t) {
    return ((this.x *= t), (this.y *= t), (this.z *= t), this)
  }
  multiplyVectors(t, e) {
    return (
      (this.x = t.x * e.x),
      (this.y = t.y * e.y),
      (this.z = t.z * e.z),
      this
    )
  }
  applyEuler(t) {
    return this.applyQuaternion(dl.setFromEuler(t))
  }
  applyAxisAngle(t, e) {
    return this.applyQuaternion(dl.setFromAxisAngle(t, e))
  }
  applyMatrix3(t) {
    const e = this.x,
      i = this.y,
      s = this.z,
      r = t.elements
    return (
      (this.x = r[0] * e + r[3] * i + r[6] * s),
      (this.y = r[1] * e + r[4] * i + r[7] * s),
      (this.z = r[2] * e + r[5] * i + r[8] * s),
      this
    )
  }
  applyNormalMatrix(t) {
    return this.applyMatrix3(t).normalize()
  }
  applyMatrix4(t) {
    const e = this.x,
      i = this.y,
      s = this.z,
      r = t.elements,
      a = 1 / (r[3] * e + r[7] * i + r[11] * s + r[15])
    return (
      (this.x = (r[0] * e + r[4] * i + r[8] * s + r[12]) * a),
      (this.y = (r[1] * e + r[5] * i + r[9] * s + r[13]) * a),
      (this.z = (r[2] * e + r[6] * i + r[10] * s + r[14]) * a),
      this
    )
  }
  applyQuaternion(t) {
    const e = this.x,
      i = this.y,
      s = this.z,
      r = t.x,
      a = t.y,
      o = t.z,
      c = t.w,
      l = 2 * (a * s - o * i),
      u = 2 * (o * e - r * s),
      p = 2 * (r * i - a * e)
    return (
      (this.x = e + c * l + a * p - o * u),
      (this.y = i + c * u + o * l - r * p),
      (this.z = s + c * p + r * u - a * l),
      this
    )
  }
  project(t) {
    return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(
      t.projectionMatrix
    )
  }
  unproject(t) {
    return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(
      t.matrixWorld
    )
  }
  transformDirection(t) {
    const e = this.x,
      i = this.y,
      s = this.z,
      r = t.elements
    return (
      (this.x = r[0] * e + r[4] * i + r[8] * s),
      (this.y = r[1] * e + r[5] * i + r[9] * s),
      (this.z = r[2] * e + r[6] * i + r[10] * s),
      this.normalize()
    )
  }
  divide(t) {
    return ((this.x /= t.x), (this.y /= t.y), (this.z /= t.z), this)
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t)
  }
  min(t) {
    return (
      (this.x = Math.min(this.x, t.x)),
      (this.y = Math.min(this.y, t.y)),
      (this.z = Math.min(this.z, t.z)),
      this
    )
  }
  max(t) {
    return (
      (this.x = Math.max(this.x, t.x)),
      (this.y = Math.max(this.y, t.y)),
      (this.z = Math.max(this.z, t.z)),
      this
    )
  }
  clamp(t, e) {
    return (
      (this.x = qt(this.x, t.x, e.x)),
      (this.y = qt(this.y, t.y, e.y)),
      (this.z = qt(this.z, t.z, e.z)),
      this
    )
  }
  clampScalar(t, e) {
    return (
      (this.x = qt(this.x, t, e)),
      (this.y = qt(this.y, t, e)),
      (this.z = qt(this.z, t, e)),
      this
    )
  }
  clampLength(t, e) {
    const i = this.length()
    return this.divideScalar(i || 1).multiplyScalar(qt(i, t, e))
  }
  floor() {
    return (
      (this.x = Math.floor(this.x)),
      (this.y = Math.floor(this.y)),
      (this.z = Math.floor(this.z)),
      this
    )
  }
  ceil() {
    return (
      (this.x = Math.ceil(this.x)),
      (this.y = Math.ceil(this.y)),
      (this.z = Math.ceil(this.z)),
      this
    )
  }
  round() {
    return (
      (this.x = Math.round(this.x)),
      (this.y = Math.round(this.y)),
      (this.z = Math.round(this.z)),
      this
    )
  }
  roundToZero() {
    return (
      (this.x = Math.trunc(this.x)),
      (this.y = Math.trunc(this.y)),
      (this.z = Math.trunc(this.z)),
      this
    )
  }
  negate() {
    return ((this.x = -this.x), (this.y = -this.y), (this.z = -this.z), this)
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
  }
  normalize() {
    return this.divideScalar(this.length() || 1)
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t)
  }
  lerp(t, e) {
    return (
      (this.x += (t.x - this.x) * e),
      (this.y += (t.y - this.y) * e),
      (this.z += (t.z - this.z) * e),
      this
    )
  }
  lerpVectors(t, e, i) {
    return (
      (this.x = t.x + (e.x - t.x) * i),
      (this.y = t.y + (e.y - t.y) * i),
      (this.z = t.z + (e.z - t.z) * i),
      this
    )
  }
  cross(t) {
    return this.crossVectors(this, t)
  }
  crossVectors(t, e) {
    const i = t.x,
      s = t.y,
      r = t.z,
      a = e.x,
      o = e.y,
      c = e.z
    return (
      (this.x = s * c - r * o),
      (this.y = r * a - i * c),
      (this.z = i * o - s * a),
      this
    )
  }
  projectOnVector(t) {
    const e = t.lengthSq()
    if (e === 0) return this.set(0, 0, 0)
    const i = t.dot(this) / e
    return this.copy(t).multiplyScalar(i)
  }
  projectOnPlane(t) {
    return (Ur.copy(this).projectOnVector(t), this.sub(Ur))
  }
  reflect(t) {
    return this.sub(Ur.copy(t).multiplyScalar(2 * this.dot(t)))
  }
  angleTo(t) {
    const e = Math.sqrt(this.lengthSq() * t.lengthSq())
    if (e === 0) return Math.PI / 2
    const i = this.dot(t) / e
    return Math.acos(qt(i, -1, 1))
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t))
  }
  distanceToSquared(t) {
    const e = this.x - t.x,
      i = this.y - t.y,
      s = this.z - t.z
    return e * e + i * i + s * s
  }
  manhattanDistanceTo(t) {
    return (
      Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z)
    )
  }
  setFromSpherical(t) {
    return this.setFromSphericalCoords(t.radius, t.phi, t.theta)
  }
  setFromSphericalCoords(t, e, i) {
    const s = Math.sin(e) * t
    return (
      (this.x = s * Math.sin(i)),
      (this.y = Math.cos(e) * t),
      (this.z = s * Math.cos(i)),
      this
    )
  }
  setFromCylindrical(t) {
    return this.setFromCylindricalCoords(t.radius, t.theta, t.y)
  }
  setFromCylindricalCoords(t, e, i) {
    return (
      (this.x = t * Math.sin(e)),
      (this.y = i),
      (this.z = t * Math.cos(e)),
      this
    )
  }
  setFromMatrixPosition(t) {
    const e = t.elements
    return ((this.x = e[12]), (this.y = e[13]), (this.z = e[14]), this)
  }
  setFromMatrixScale(t) {
    const e = this.setFromMatrixColumn(t, 0).length(),
      i = this.setFromMatrixColumn(t, 1).length(),
      s = this.setFromMatrixColumn(t, 2).length()
    return ((this.x = e), (this.y = i), (this.z = s), this)
  }
  setFromMatrixColumn(t, e) {
    return this.fromArray(t.elements, e * 4)
  }
  setFromMatrix3Column(t, e) {
    return this.fromArray(t.elements, e * 3)
  }
  setFromEuler(t) {
    return ((this.x = t._x), (this.y = t._y), (this.z = t._z), this)
  }
  setFromColor(t) {
    return ((this.x = t.r), (this.y = t.g), (this.z = t.b), this)
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z
  }
  fromArray(t, e = 0) {
    return ((this.x = t[e]), (this.y = t[e + 1]), (this.z = t[e + 2]), this)
  }
  toArray(t = [], e = 0) {
    return ((t[e] = this.x), (t[e + 1] = this.y), (t[e + 2] = this.z), t)
  }
  fromBufferAttribute(t, e) {
    return (
      (this.x = t.getX(e)),
      (this.y = t.getY(e)),
      (this.z = t.getZ(e)),
      this
    )
  }
  random() {
    return (
      (this.x = Math.random()),
      (this.y = Math.random()),
      (this.z = Math.random()),
      this
    )
  }
  randomDirection() {
    const t = Math.random() * Math.PI * 2,
      e = Math.random() * 2 - 1,
      i = Math.sqrt(1 - e * e)
    return (
      (this.x = i * Math.cos(t)),
      (this.y = e),
      (this.z = i * Math.sin(t)),
      this
    )
  }
  *[Symbol.iterator]() {
    ;(yield this.x, yield this.y, yield this.z)
  }
}
Wo.prototype.isVector3 = !0
let D = Wo
const Ur = new D(),
  dl = new Wn(),
  Xo = class Xo {
    constructor(t, e, i, s, r, a, o, c, l) {
      ;((this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]),
        t !== void 0 && this.set(t, e, i, s, r, a, o, c, l))
    }
    set(t, e, i, s, r, a, o, c, l) {
      const u = this.elements
      return (
        (u[0] = t),
        (u[1] = s),
        (u[2] = o),
        (u[3] = e),
        (u[4] = r),
        (u[5] = c),
        (u[6] = i),
        (u[7] = a),
        (u[8] = l),
        this
      )
    }
    identity() {
      return (this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this)
    }
    copy(t) {
      const e = this.elements,
        i = t.elements
      return (
        (e[0] = i[0]),
        (e[1] = i[1]),
        (e[2] = i[2]),
        (e[3] = i[3]),
        (e[4] = i[4]),
        (e[5] = i[5]),
        (e[6] = i[6]),
        (e[7] = i[7]),
        (e[8] = i[8]),
        this
      )
    }
    extractBasis(t, e, i) {
      return (
        t.setFromMatrix3Column(this, 0),
        e.setFromMatrix3Column(this, 1),
        i.setFromMatrix3Column(this, 2),
        this
      )
    }
    setFromMatrix4(t) {
      const e = t.elements
      return (
        this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]),
        this
      )
    }
    multiply(t) {
      return this.multiplyMatrices(this, t)
    }
    premultiply(t) {
      return this.multiplyMatrices(t, this)
    }
    multiplyMatrices(t, e) {
      const i = t.elements,
        s = e.elements,
        r = this.elements,
        a = i[0],
        o = i[3],
        c = i[6],
        l = i[1],
        u = i[4],
        p = i[7],
        h = i[2],
        m = i[5],
        g = i[8],
        v = s[0],
        f = s[3],
        d = s[6],
        M = s[1],
        T = s[4],
        w = s[7],
        C = s[2],
        A = s[5],
        y = s[8]
      return (
        (r[0] = a * v + o * M + c * C),
        (r[3] = a * f + o * T + c * A),
        (r[6] = a * d + o * w + c * y),
        (r[1] = l * v + u * M + p * C),
        (r[4] = l * f + u * T + p * A),
        (r[7] = l * d + u * w + p * y),
        (r[2] = h * v + m * M + g * C),
        (r[5] = h * f + m * T + g * A),
        (r[8] = h * d + m * w + g * y),
        this
      )
    }
    multiplyScalar(t) {
      const e = this.elements
      return (
        (e[0] *= t),
        (e[3] *= t),
        (e[6] *= t),
        (e[1] *= t),
        (e[4] *= t),
        (e[7] *= t),
        (e[2] *= t),
        (e[5] *= t),
        (e[8] *= t),
        this
      )
    }
    determinant() {
      const t = this.elements,
        e = t[0],
        i = t[1],
        s = t[2],
        r = t[3],
        a = t[4],
        o = t[5],
        c = t[6],
        l = t[7],
        u = t[8]
      return (
        e * a * u - e * o * l - i * r * u + i * o * c + s * r * l - s * a * c
      )
    }
    invert() {
      const t = this.elements,
        e = t[0],
        i = t[1],
        s = t[2],
        r = t[3],
        a = t[4],
        o = t[5],
        c = t[6],
        l = t[7],
        u = t[8],
        p = u * a - o * l,
        h = o * c - u * r,
        m = l * r - a * c,
        g = e * p + i * h + s * m
      if (g === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0)
      const v = 1 / g
      return (
        (t[0] = p * v),
        (t[1] = (s * l - u * i) * v),
        (t[2] = (o * i - s * a) * v),
        (t[3] = h * v),
        (t[4] = (u * e - s * c) * v),
        (t[5] = (s * r - o * e) * v),
        (t[6] = m * v),
        (t[7] = (i * c - l * e) * v),
        (t[8] = (a * e - i * r) * v),
        this
      )
    }
    transpose() {
      let t
      const e = this.elements
      return (
        (t = e[1]),
        (e[1] = e[3]),
        (e[3] = t),
        (t = e[2]),
        (e[2] = e[6]),
        (e[6] = t),
        (t = e[5]),
        (e[5] = e[7]),
        (e[7] = t),
        this
      )
    }
    getNormalMatrix(t) {
      return this.setFromMatrix4(t).invert().transpose()
    }
    transposeIntoArray(t) {
      const e = this.elements
      return (
        (t[0] = e[0]),
        (t[1] = e[3]),
        (t[2] = e[6]),
        (t[3] = e[1]),
        (t[4] = e[4]),
        (t[5] = e[7]),
        (t[6] = e[2]),
        (t[7] = e[5]),
        (t[8] = e[8]),
        this
      )
    }
    setUvTransform(t, e, i, s, r, a, o) {
      const c = Math.cos(r),
        l = Math.sin(r)
      return (
        this.set(
          i * c,
          i * l,
          -i * (c * a + l * o) + a + t,
          -s * l,
          s * c,
          -s * (-l * a + c * o) + o + e,
          0,
          0,
          1
        ),
        this
      )
    }
    scale(t, e) {
      return (this.premultiply(Nr.makeScale(t, e)), this)
    }
    rotate(t) {
      return (this.premultiply(Nr.makeRotation(-t)), this)
    }
    translate(t, e) {
      return (this.premultiply(Nr.makeTranslation(t, e)), this)
    }
    makeTranslation(t, e) {
      return (
        t.isVector2
          ? this.set(1, 0, t.x, 0, 1, t.y, 0, 0, 1)
          : this.set(1, 0, t, 0, 1, e, 0, 0, 1),
        this
      )
    }
    makeRotation(t) {
      const e = Math.cos(t),
        i = Math.sin(t)
      return (this.set(e, -i, 0, i, e, 0, 0, 0, 1), this)
    }
    makeScale(t, e) {
      return (this.set(t, 0, 0, 0, e, 0, 0, 0, 1), this)
    }
    equals(t) {
      const e = this.elements,
        i = t.elements
      for (let s = 0; s < 9; s++) if (e[s] !== i[s]) return !1
      return !0
    }
    fromArray(t, e = 0) {
      for (let i = 0; i < 9; i++) this.elements[i] = t[i + e]
      return this
    }
    toArray(t = [], e = 0) {
      const i = this.elements
      return (
        (t[e] = i[0]),
        (t[e + 1] = i[1]),
        (t[e + 2] = i[2]),
        (t[e + 3] = i[3]),
        (t[e + 4] = i[4]),
        (t[e + 5] = i[5]),
        (t[e + 6] = i[6]),
        (t[e + 7] = i[7]),
        (t[e + 8] = i[8]),
        t
      )
    }
    clone() {
      return new this.constructor().fromArray(this.elements)
    }
  }
Xo.prototype.isMatrix3 = !0
let zt = Xo
const Nr = new zt(),
  fl = new zt().set(
    0.4123908,
    0.3575843,
    0.1804808,
    0.212639,
    0.7151687,
    0.0721923,
    0.0193308,
    0.1191948,
    0.9505322
  ),
  pl = new zt().set(
    3.2409699,
    -1.5373832,
    -0.4986108,
    -0.9692436,
    1.8759675,
    0.0415551,
    0.0556301,
    -0.203977,
    1.0569715
  )
function Lu() {
  const n = {
      enabled: !0,
      workingColorSpace: dr,
      spaces: {},
      convert: function (s, r, a) {
        return (
          this.enabled === !1 ||
            r === a ||
            !r ||
            !a ||
            (this.spaces[r].transfer === ne &&
              ((s.r = Gn(s.r)), (s.g = Gn(s.g)), (s.b = Gn(s.b))),
            this.spaces[r].primaries !== this.spaces[a].primaries &&
              (s.applyMatrix3(this.spaces[r].toXYZ),
              s.applyMatrix3(this.spaces[a].fromXYZ)),
            this.spaces[a].transfer === ne &&
              ((s.r = Wi(s.r)), (s.g = Wi(s.g)), (s.b = Wi(s.b)))),
          s
        )
      },
      workingToColorSpace: function (s, r) {
        return this.convert(s, this.workingColorSpace, r)
      },
      colorSpaceToWorking: function (s, r) {
        return this.convert(s, r, this.workingColorSpace)
      },
      getPrimaries: function (s) {
        return this.spaces[s].primaries
      },
      getTransfer: function (s) {
        return s === ni ? fr : this.spaces[s].transfer
      },
      getToneMappingMode: function (s) {
        return (
          this.spaces[s].outputColorSpaceConfig.toneMappingMode || 'standard'
        )
      },
      getLuminanceCoefficients: function (s, r = this.workingColorSpace) {
        return s.fromArray(this.spaces[r].luminanceCoefficients)
      },
      define: function (s) {
        Object.assign(this.spaces, s)
      },
      _getMatrix: function (s, r, a) {
        return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)
      },
      _getDrawingBufferColorSpace: function (s) {
        return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace
      },
      _getUnpackColorSpace: function (s = this.workingColorSpace) {
        return this.spaces[s].workingColorSpaceConfig.unpackColorSpace
      },
      fromWorkingColorSpace: function (s, r) {
        return (
          ao(
            'ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().'
          ),
          n.workingToColorSpace(s, r)
        )
      },
      toWorkingColorSpace: function (s, r) {
        return (
          ao(
            'ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().'
          ),
          n.colorSpaceToWorking(s, r)
        )
      },
    },
    t = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06],
    e = [0.2126, 0.7152, 0.0722],
    i = [0.3127, 0.329]
  return (
    n.define({
      [dr]: {
        primaries: t,
        whitePoint: i,
        transfer: fr,
        toXYZ: fl,
        fromXYZ: pl,
        luminanceCoefficients: e,
        workingColorSpaceConfig: { unpackColorSpace: Ke },
        outputColorSpaceConfig: { drawingBufferColorSpace: Ke },
      },
      [Ke]: {
        primaries: t,
        whitePoint: i,
        transfer: ne,
        toXYZ: fl,
        fromXYZ: pl,
        luminanceCoefficients: e,
        outputColorSpaceConfig: { drawingBufferColorSpace: Ke },
      },
    }),
    n
  )
}
const $t = Lu()
function Gn(n) {
  return n < 0.04045
    ? n * 0.0773993808
    : Math.pow(n * 0.9478672986 + 0.0521327014, 2.4)
}
function Wi(n) {
  return n < 0.0031308 ? n * 12.92 : 1.055 * Math.pow(n, 0.41666) - 0.055
}
let Ti
class Du {
  static getDataURL(t, e = 'image/png') {
    if (/^data:/i.test(t.src) || typeof HTMLCanvasElement > 'u') return t.src
    let i
    if (t instanceof HTMLCanvasElement) i = t
    else {
      ;(Ti === void 0 && (Ti = pr('canvas')),
        (Ti.width = t.width),
        (Ti.height = t.height))
      const s = Ti.getContext('2d')
      ;(t instanceof ImageData
        ? s.putImageData(t, 0, 0)
        : s.drawImage(t, 0, 0, t.width, t.height),
        (i = Ti))
    }
    return i.toDataURL(e)
  }
  static sRGBToLinear(t) {
    if (
      (typeof HTMLImageElement < 'u' && t instanceof HTMLImageElement) ||
      (typeof HTMLCanvasElement < 'u' && t instanceof HTMLCanvasElement) ||
      (typeof ImageBitmap < 'u' && t instanceof ImageBitmap)
    ) {
      const e = pr('canvas')
      ;((e.width = t.width), (e.height = t.height))
      const i = e.getContext('2d')
      i.drawImage(t, 0, 0, t.width, t.height)
      const s = i.getImageData(0, 0, t.width, t.height),
        r = s.data
      for (let a = 0; a < r.length; a++) r[a] = Gn(r[a] / 255) * 255
      return (i.putImageData(s, 0, 0), e)
    } else if (t.data) {
      const e = t.data.slice(0)
      for (let i = 0; i < e.length; i++)
        e instanceof Uint8Array || e instanceof Uint8ClampedArray
          ? (e[i] = Math.floor(Gn(e[i] / 255) * 255))
          : (e[i] = Gn(e[i]))
      return { data: e, width: t.width, height: t.height }
    } else
      return (
        Dt(
          'ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.'
        ),
        t
      )
  }
}
let Iu = 0
class Po {
  constructor(t = null) {
    ;((this.isSource = !0),
      Object.defineProperty(this, 'id', { value: Iu++ }),
      (this.uuid = $i()),
      (this.data = t),
      (this.dataReady = !0),
      (this.version = 0))
  }
  getSize(t) {
    const e = this.data
    return (
      typeof HTMLVideoElement < 'u' && e instanceof HTMLVideoElement
        ? t.set(e.videoWidth, e.videoHeight, 0)
        : typeof VideoFrame < 'u' && e instanceof VideoFrame
          ? t.set(e.displayWidth, e.displayHeight, 0)
          : e !== null
            ? t.set(e.width, e.height, e.depth || 0)
            : t.set(0, 0, 0),
      t
    )
  }
  set needsUpdate(t) {
    t === !0 && this.version++
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == 'string'
    if (!e && t.images[this.uuid] !== void 0) return t.images[this.uuid]
    const i = { uuid: this.uuid, url: '' },
      s = this.data
    if (s !== null) {
      let r
      if (Array.isArray(s)) {
        r = []
        for (let a = 0, o = s.length; a < o; a++)
          s[a].isDataTexture ? r.push(Fr(s[a].image)) : r.push(Fr(s[a]))
      } else r = Fr(s)
      i.url = r
    }
    return (e || (t.images[this.uuid] = i), i)
  }
}
function Fr(n) {
  return (typeof HTMLImageElement < 'u' && n instanceof HTMLImageElement) ||
    (typeof HTMLCanvasElement < 'u' && n instanceof HTMLCanvasElement) ||
    (typeof ImageBitmap < 'u' && n instanceof ImageBitmap)
    ? Du.getDataURL(n)
    : n.data
      ? {
          data: Array.from(n.data),
          width: n.width,
          height: n.height,
          type: n.data.constructor.name,
        }
      : (Dt('Texture: Unable to serialize Texture.'), {})
}
let Uu = 0
const Or = new D()
class Ve extends li {
  constructor(
    t = Ve.DEFAULT_IMAGE,
    e = Ve.DEFAULT_MAPPING,
    i = Bn,
    s = Bn,
    r = Ge,
    a = _i,
    o = _n,
    c = an,
    l = Ve.DEFAULT_ANISOTROPY,
    u = ni
  ) {
    ;(super(),
      (this.isTexture = !0),
      Object.defineProperty(this, 'id', { value: Uu++ }),
      (this.uuid = $i()),
      (this.name = ''),
      (this.source = new Po(t)),
      (this.mipmaps = []),
      (this.mapping = e),
      (this.channel = 0),
      (this.wrapS = i),
      (this.wrapT = s),
      (this.magFilter = r),
      (this.minFilter = a),
      (this.anisotropy = l),
      (this.format = o),
      (this.internalFormat = null),
      (this.type = c),
      (this.offset = new Nt(0, 0)),
      (this.repeat = new Nt(1, 1)),
      (this.center = new Nt(0, 0)),
      (this.rotation = 0),
      (this.matrixAutoUpdate = !0),
      (this.matrix = new zt()),
      (this.generateMipmaps = !0),
      (this.premultiplyAlpha = !1),
      (this.flipY = !0),
      (this.unpackAlignment = 4),
      (this.colorSpace = u),
      (this.userData = {}),
      (this.updateRanges = []),
      (this.version = 0),
      (this.onUpdate = null),
      (this.renderTarget = null),
      (this.isRenderTargetTexture = !1),
      (this.isArrayTexture = !!(t && t.depth && t.depth > 1)),
      (this.pmremVersion = 0),
      (this.normalized = !1))
  }
  get width() {
    return this.source.getSize(Or).x
  }
  get height() {
    return this.source.getSize(Or).y
  }
  get depth() {
    return this.source.getSize(Or).z
  }
  get image() {
    return this.source.data
  }
  set image(t) {
    this.source.data = t
  }
  updateMatrix() {
    this.matrix.setUvTransform(
      this.offset.x,
      this.offset.y,
      this.repeat.x,
      this.repeat.y,
      this.rotation,
      this.center.x,
      this.center.y
    )
  }
  addUpdateRange(t, e) {
    this.updateRanges.push({ start: t, count: e })
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0
  }
  clone() {
    return new this.constructor().copy(this)
  }
  copy(t) {
    return (
      (this.name = t.name),
      (this.source = t.source),
      (this.mipmaps = t.mipmaps.slice(0)),
      (this.mapping = t.mapping),
      (this.channel = t.channel),
      (this.wrapS = t.wrapS),
      (this.wrapT = t.wrapT),
      (this.magFilter = t.magFilter),
      (this.minFilter = t.minFilter),
      (this.anisotropy = t.anisotropy),
      (this.format = t.format),
      (this.internalFormat = t.internalFormat),
      (this.type = t.type),
      (this.normalized = t.normalized),
      this.offset.copy(t.offset),
      this.repeat.copy(t.repeat),
      this.center.copy(t.center),
      (this.rotation = t.rotation),
      (this.matrixAutoUpdate = t.matrixAutoUpdate),
      this.matrix.copy(t.matrix),
      (this.generateMipmaps = t.generateMipmaps),
      (this.premultiplyAlpha = t.premultiplyAlpha),
      (this.flipY = t.flipY),
      (this.unpackAlignment = t.unpackAlignment),
      (this.colorSpace = t.colorSpace),
      (this.renderTarget = t.renderTarget),
      (this.isRenderTargetTexture = t.isRenderTargetTexture),
      (this.isArrayTexture = t.isArrayTexture),
      (this.userData = JSON.parse(JSON.stringify(t.userData))),
      (this.needsUpdate = !0),
      this
    )
  }
  setValues(t) {
    for (const e in t) {
      const i = t[e]
      if (i === void 0) {
        Dt(`Texture.setValues(): parameter '${e}' has value of undefined.`)
        continue
      }
      const s = this[e]
      if (s === void 0) {
        Dt(`Texture.setValues(): property '${e}' does not exist.`)
        continue
      }
      ;(s && i && s.isVector2 && i.isVector2) ||
      (s && i && s.isVector3 && i.isVector3) ||
      (s && i && s.isMatrix3 && i.isMatrix3)
        ? s.copy(i)
        : (this[e] = i)
    }
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == 'string'
    if (!e && t.textures[this.uuid] !== void 0) return t.textures[this.uuid]
    const i = {
      metadata: { version: 4.7, type: 'Texture', generator: 'Texture.toJSON' },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(t).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      normalized: this.normalized,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment,
    }
    return (
      Object.keys(this.userData).length > 0 && (i.userData = this.userData),
      e || (t.textures[this.uuid] = i),
      i
    )
  }
  dispose() {
    this.dispatchEvent({ type: 'dispose' })
  }
  transformUv(t) {
    if (this.mapping !== Nc) return t
    if ((t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1))
      switch (this.wrapS) {
        case lr:
          t.x = t.x - Math.floor(t.x)
          break
        case Bn:
          t.x = t.x < 0 ? 0 : 1
          break
        case Ca:
          Math.abs(Math.floor(t.x) % 2) === 1
            ? (t.x = Math.ceil(t.x) - t.x)
            : (t.x = t.x - Math.floor(t.x))
          break
      }
    if (t.y < 0 || t.y > 1)
      switch (this.wrapT) {
        case lr:
          t.y = t.y - Math.floor(t.y)
          break
        case Bn:
          t.y = t.y < 0 ? 0 : 1
          break
        case Ca:
          Math.abs(Math.floor(t.y) % 2) === 1
            ? (t.y = Math.ceil(t.y) - t.y)
            : (t.y = t.y - Math.floor(t.y))
          break
      }
    return (this.flipY && (t.y = 1 - t.y), t)
  }
  set needsUpdate(t) {
    t === !0 && (this.version++, (this.source.needsUpdate = !0))
  }
  set needsPMREMUpdate(t) {
    t === !0 && this.pmremVersion++
  }
}
Ve.DEFAULT_IMAGE = null
Ve.DEFAULT_MAPPING = Nc
Ve.DEFAULT_ANISOTROPY = 1
const qo = class qo {
  constructor(t = 0, e = 0, i = 0, s = 1) {
    ;((this.x = t), (this.y = e), (this.z = i), (this.w = s))
  }
  get width() {
    return this.z
  }
  set width(t) {
    this.z = t
  }
  get height() {
    return this.w
  }
  set height(t) {
    this.w = t
  }
  set(t, e, i, s) {
    return ((this.x = t), (this.y = e), (this.z = i), (this.w = s), this)
  }
  setScalar(t) {
    return ((this.x = t), (this.y = t), (this.z = t), (this.w = t), this)
  }
  setX(t) {
    return ((this.x = t), this)
  }
  setY(t) {
    return ((this.y = t), this)
  }
  setZ(t) {
    return ((this.z = t), this)
  }
  setW(t) {
    return ((this.w = t), this)
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e
        break
      case 1:
        this.y = e
        break
      case 2:
        this.z = e
        break
      case 3:
        this.w = e
        break
      default:
        throw new Error('index is out of range: ' + t)
    }
    return this
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x
      case 1:
        return this.y
      case 2:
        return this.z
      case 3:
        return this.w
      default:
        throw new Error('index is out of range: ' + t)
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w)
  }
  copy(t) {
    return (
      (this.x = t.x),
      (this.y = t.y),
      (this.z = t.z),
      (this.w = t.w !== void 0 ? t.w : 1),
      this
    )
  }
  add(t) {
    return (
      (this.x += t.x),
      (this.y += t.y),
      (this.z += t.z),
      (this.w += t.w),
      this
    )
  }
  addScalar(t) {
    return ((this.x += t), (this.y += t), (this.z += t), (this.w += t), this)
  }
  addVectors(t, e) {
    return (
      (this.x = t.x + e.x),
      (this.y = t.y + e.y),
      (this.z = t.z + e.z),
      (this.w = t.w + e.w),
      this
    )
  }
  addScaledVector(t, e) {
    return (
      (this.x += t.x * e),
      (this.y += t.y * e),
      (this.z += t.z * e),
      (this.w += t.w * e),
      this
    )
  }
  sub(t) {
    return (
      (this.x -= t.x),
      (this.y -= t.y),
      (this.z -= t.z),
      (this.w -= t.w),
      this
    )
  }
  subScalar(t) {
    return ((this.x -= t), (this.y -= t), (this.z -= t), (this.w -= t), this)
  }
  subVectors(t, e) {
    return (
      (this.x = t.x - e.x),
      (this.y = t.y - e.y),
      (this.z = t.z - e.z),
      (this.w = t.w - e.w),
      this
    )
  }
  multiply(t) {
    return (
      (this.x *= t.x),
      (this.y *= t.y),
      (this.z *= t.z),
      (this.w *= t.w),
      this
    )
  }
  multiplyScalar(t) {
    return ((this.x *= t), (this.y *= t), (this.z *= t), (this.w *= t), this)
  }
  applyMatrix4(t) {
    const e = this.x,
      i = this.y,
      s = this.z,
      r = this.w,
      a = t.elements
    return (
      (this.x = a[0] * e + a[4] * i + a[8] * s + a[12] * r),
      (this.y = a[1] * e + a[5] * i + a[9] * s + a[13] * r),
      (this.z = a[2] * e + a[6] * i + a[10] * s + a[14] * r),
      (this.w = a[3] * e + a[7] * i + a[11] * s + a[15] * r),
      this
    )
  }
  divide(t) {
    return (
      (this.x /= t.x),
      (this.y /= t.y),
      (this.z /= t.z),
      (this.w /= t.w),
      this
    )
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t)
  }
  setAxisAngleFromQuaternion(t) {
    this.w = 2 * Math.acos(t.w)
    const e = Math.sqrt(1 - t.w * t.w)
    return (
      e < 1e-4
        ? ((this.x = 1), (this.y = 0), (this.z = 0))
        : ((this.x = t.x / e), (this.y = t.y / e), (this.z = t.z / e)),
      this
    )
  }
  setAxisAngleFromRotationMatrix(t) {
    let e, i, s, r
    const c = t.elements,
      l = c[0],
      u = c[4],
      p = c[8],
      h = c[1],
      m = c[5],
      g = c[9],
      v = c[2],
      f = c[6],
      d = c[10]
    if (
      Math.abs(u - h) < 0.01 &&
      Math.abs(p - v) < 0.01 &&
      Math.abs(g - f) < 0.01
    ) {
      if (
        Math.abs(u + h) < 0.1 &&
        Math.abs(p + v) < 0.1 &&
        Math.abs(g + f) < 0.1 &&
        Math.abs(l + m + d - 3) < 0.1
      )
        return (this.set(1, 0, 0, 0), this)
      e = Math.PI
      const T = (l + 1) / 2,
        w = (m + 1) / 2,
        C = (d + 1) / 2,
        A = (u + h) / 4,
        y = (p + v) / 4,
        _ = (g + f) / 4
      return (
        T > w && T > C
          ? T < 0.01
            ? ((i = 0), (s = 0.707106781), (r = 0.707106781))
            : ((i = Math.sqrt(T)), (s = A / i), (r = y / i))
          : w > C
            ? w < 0.01
              ? ((i = 0.707106781), (s = 0), (r = 0.707106781))
              : ((s = Math.sqrt(w)), (i = A / s), (r = _ / s))
            : C < 0.01
              ? ((i = 0.707106781), (s = 0.707106781), (r = 0))
              : ((r = Math.sqrt(C)), (i = y / r), (s = _ / r)),
        this.set(i, s, r, e),
        this
      )
    }
    let M = Math.sqrt((f - g) * (f - g) + (p - v) * (p - v) + (h - u) * (h - u))
    return (
      Math.abs(M) < 0.001 && (M = 1),
      (this.x = (f - g) / M),
      (this.y = (p - v) / M),
      (this.z = (h - u) / M),
      (this.w = Math.acos((l + m + d - 1) / 2)),
      this
    )
  }
  setFromMatrixPosition(t) {
    const e = t.elements
    return (
      (this.x = e[12]),
      (this.y = e[13]),
      (this.z = e[14]),
      (this.w = e[15]),
      this
    )
  }
  min(t) {
    return (
      (this.x = Math.min(this.x, t.x)),
      (this.y = Math.min(this.y, t.y)),
      (this.z = Math.min(this.z, t.z)),
      (this.w = Math.min(this.w, t.w)),
      this
    )
  }
  max(t) {
    return (
      (this.x = Math.max(this.x, t.x)),
      (this.y = Math.max(this.y, t.y)),
      (this.z = Math.max(this.z, t.z)),
      (this.w = Math.max(this.w, t.w)),
      this
    )
  }
  clamp(t, e) {
    return (
      (this.x = qt(this.x, t.x, e.x)),
      (this.y = qt(this.y, t.y, e.y)),
      (this.z = qt(this.z, t.z, e.z)),
      (this.w = qt(this.w, t.w, e.w)),
      this
    )
  }
  clampScalar(t, e) {
    return (
      (this.x = qt(this.x, t, e)),
      (this.y = qt(this.y, t, e)),
      (this.z = qt(this.z, t, e)),
      (this.w = qt(this.w, t, e)),
      this
    )
  }
  clampLength(t, e) {
    const i = this.length()
    return this.divideScalar(i || 1).multiplyScalar(qt(i, t, e))
  }
  floor() {
    return (
      (this.x = Math.floor(this.x)),
      (this.y = Math.floor(this.y)),
      (this.z = Math.floor(this.z)),
      (this.w = Math.floor(this.w)),
      this
    )
  }
  ceil() {
    return (
      (this.x = Math.ceil(this.x)),
      (this.y = Math.ceil(this.y)),
      (this.z = Math.ceil(this.z)),
      (this.w = Math.ceil(this.w)),
      this
    )
  }
  round() {
    return (
      (this.x = Math.round(this.x)),
      (this.y = Math.round(this.y)),
      (this.z = Math.round(this.z)),
      (this.w = Math.round(this.w)),
      this
    )
  }
  roundToZero() {
    return (
      (this.x = Math.trunc(this.x)),
      (this.y = Math.trunc(this.y)),
      (this.z = Math.trunc(this.z)),
      (this.w = Math.trunc(this.w)),
      this
    )
  }
  negate() {
    return (
      (this.x = -this.x),
      (this.y = -this.y),
      (this.z = -this.z),
      (this.w = -this.w),
      this
    )
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
  }
  length() {
    return Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    )
  }
  manhattanLength() {
    return (
      Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
    )
  }
  normalize() {
    return this.divideScalar(this.length() || 1)
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t)
  }
  lerp(t, e) {
    return (
      (this.x += (t.x - this.x) * e),
      (this.y += (t.y - this.y) * e),
      (this.z += (t.z - this.z) * e),
      (this.w += (t.w - this.w) * e),
      this
    )
  }
  lerpVectors(t, e, i) {
    return (
      (this.x = t.x + (e.x - t.x) * i),
      (this.y = t.y + (e.y - t.y) * i),
      (this.z = t.z + (e.z - t.z) * i),
      (this.w = t.w + (e.w - t.w) * i),
      this
    )
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w
  }
  fromArray(t, e = 0) {
    return (
      (this.x = t[e]),
      (this.y = t[e + 1]),
      (this.z = t[e + 2]),
      (this.w = t[e + 3]),
      this
    )
  }
  toArray(t = [], e = 0) {
    return (
      (t[e] = this.x),
      (t[e + 1] = this.y),
      (t[e + 2] = this.z),
      (t[e + 3] = this.w),
      t
    )
  }
  fromBufferAttribute(t, e) {
    return (
      (this.x = t.getX(e)),
      (this.y = t.getY(e)),
      (this.z = t.getZ(e)),
      (this.w = t.getW(e)),
      this
    )
  }
  random() {
    return (
      (this.x = Math.random()),
      (this.y = Math.random()),
      (this.z = Math.random()),
      (this.w = Math.random()),
      this
    )
  }
  *[Symbol.iterator]() {
    ;(yield this.x, yield this.y, yield this.z, yield this.w)
  }
}
qo.prototype.isVector4 = !0
let xe = qo
class Nu extends li {
  constructor(t = 1, e = 1, i = {}) {
    ;(super(),
      (i = Object.assign(
        {
          generateMipmaps: !1,
          internalFormat: null,
          minFilter: Ge,
          depthBuffer: !0,
          stencilBuffer: !1,
          resolveDepthBuffer: !0,
          resolveStencilBuffer: !0,
          depthTexture: null,
          samples: 0,
          count: 1,
          depth: 1,
          multiview: !1,
        },
        i
      )),
      (this.isRenderTarget = !0),
      (this.width = t),
      (this.height = e),
      (this.depth = i.depth),
      (this.scissor = new xe(0, 0, t, e)),
      (this.scissorTest = !1),
      (this.viewport = new xe(0, 0, t, e)),
      (this.textures = []))
    const s = { width: t, height: e, depth: i.depth },
      r = new Ve(s),
      a = i.count
    for (let o = 0; o < a; o++)
      ((this.textures[o] = r.clone()),
        (this.textures[o].isRenderTargetTexture = !0),
        (this.textures[o].renderTarget = this))
    ;(this._setTextureOptions(i),
      (this.depthBuffer = i.depthBuffer),
      (this.stencilBuffer = i.stencilBuffer),
      (this.resolveDepthBuffer = i.resolveDepthBuffer),
      (this.resolveStencilBuffer = i.resolveStencilBuffer),
      (this._depthTexture = null),
      (this.depthTexture = i.depthTexture),
      (this.samples = i.samples),
      (this.multiview = i.multiview))
  }
  _setTextureOptions(t = {}) {
    const e = {
      minFilter: Ge,
      generateMipmaps: !1,
      flipY: !1,
      internalFormat: null,
    }
    ;(t.mapping !== void 0 && (e.mapping = t.mapping),
      t.wrapS !== void 0 && (e.wrapS = t.wrapS),
      t.wrapT !== void 0 && (e.wrapT = t.wrapT),
      t.wrapR !== void 0 && (e.wrapR = t.wrapR),
      t.magFilter !== void 0 && (e.magFilter = t.magFilter),
      t.minFilter !== void 0 && (e.minFilter = t.minFilter),
      t.format !== void 0 && (e.format = t.format),
      t.type !== void 0 && (e.type = t.type),
      t.anisotropy !== void 0 && (e.anisotropy = t.anisotropy),
      t.colorSpace !== void 0 && (e.colorSpace = t.colorSpace),
      t.flipY !== void 0 && (e.flipY = t.flipY),
      t.generateMipmaps !== void 0 && (e.generateMipmaps = t.generateMipmaps),
      t.internalFormat !== void 0 && (e.internalFormat = t.internalFormat))
    for (let i = 0; i < this.textures.length; i++) this.textures[i].setValues(e)
  }
  get texture() {
    return this.textures[0]
  }
  set texture(t) {
    this.textures[0] = t
  }
  set depthTexture(t) {
    ;(this._depthTexture !== null && (this._depthTexture.renderTarget = null),
      t !== null && (t.renderTarget = this),
      (this._depthTexture = t))
  }
  get depthTexture() {
    return this._depthTexture
  }
  setSize(t, e, i = 1) {
    if (this.width !== t || this.height !== e || this.depth !== i) {
      ;((this.width = t), (this.height = e), (this.depth = i))
      for (let s = 0, r = this.textures.length; s < r; s++)
        ((this.textures[s].image.width = t),
          (this.textures[s].image.height = e),
          (this.textures[s].image.depth = i),
          this.textures[s].isData3DTexture !== !0 &&
            (this.textures[s].isArrayTexture =
              this.textures[s].image.depth > 1))
      this.dispose()
    }
    ;(this.viewport.set(0, 0, t, e), this.scissor.set(0, 0, t, e))
  }
  clone() {
    return new this.constructor().copy(this)
  }
  copy(t) {
    ;((this.width = t.width),
      (this.height = t.height),
      (this.depth = t.depth),
      this.scissor.copy(t.scissor),
      (this.scissorTest = t.scissorTest),
      this.viewport.copy(t.viewport),
      (this.textures.length = 0))
    for (let e = 0, i = t.textures.length; e < i; e++) {
      ;((this.textures[e] = t.textures[e].clone()),
        (this.textures[e].isRenderTargetTexture = !0),
        (this.textures[e].renderTarget = this))
      const s = Object.assign({}, t.textures[e].image)
      this.textures[e].source = new Po(s)
    }
    return (
      (this.depthBuffer = t.depthBuffer),
      (this.stencilBuffer = t.stencilBuffer),
      (this.resolveDepthBuffer = t.resolveDepthBuffer),
      (this.resolveStencilBuffer = t.resolveStencilBuffer),
      t.depthTexture !== null && (this.depthTexture = t.depthTexture.clone()),
      (this.samples = t.samples),
      (this.multiview = t.multiview),
      this
    )
  }
  dispose() {
    this.dispatchEvent({ type: 'dispose' })
  }
}
class An extends Nu {
  constructor(t = 1, e = 1, i = {}) {
    ;(super(t, e, i), (this.isWebGLRenderTarget = !0))
  }
}
class Vc extends Ve {
  constructor(t = null, e = 1, i = 1, s = 1) {
    ;(super(null),
      (this.isDataArrayTexture = !0),
      (this.image = { data: t, width: e, height: i, depth: s }),
      (this.magFilter = Fe),
      (this.minFilter = Fe),
      (this.wrapR = Bn),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1),
      (this.layerUpdates = new Set()))
  }
  addLayerUpdate(t) {
    this.layerUpdates.add(t)
  }
  clearLayerUpdates() {
    this.layerUpdates.clear()
  }
}
class Fu extends Ve {
  constructor(t = null, e = 1, i = 1, s = 1) {
    ;(super(null),
      (this.isData3DTexture = !0),
      (this.image = { data: t, width: e, height: i, depth: s }),
      (this.magFilter = Fe),
      (this.minFilter = Fe),
      (this.wrapR = Bn),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1))
  }
}
const vr = class vr {
  constructor(t, e, i, s, r, a, o, c, l, u, p, h, m, g, v, f) {
    ;((this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
      t !== void 0 && this.set(t, e, i, s, r, a, o, c, l, u, p, h, m, g, v, f))
  }
  set(t, e, i, s, r, a, o, c, l, u, p, h, m, g, v, f) {
    const d = this.elements
    return (
      (d[0] = t),
      (d[4] = e),
      (d[8] = i),
      (d[12] = s),
      (d[1] = r),
      (d[5] = a),
      (d[9] = o),
      (d[13] = c),
      (d[2] = l),
      (d[6] = u),
      (d[10] = p),
      (d[14] = h),
      (d[3] = m),
      (d[7] = g),
      (d[11] = v),
      (d[15] = f),
      this
    )
  }
  identity() {
    return (this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this)
  }
  clone() {
    return new vr().fromArray(this.elements)
  }
  copy(t) {
    const e = this.elements,
      i = t.elements
    return (
      (e[0] = i[0]),
      (e[1] = i[1]),
      (e[2] = i[2]),
      (e[3] = i[3]),
      (e[4] = i[4]),
      (e[5] = i[5]),
      (e[6] = i[6]),
      (e[7] = i[7]),
      (e[8] = i[8]),
      (e[9] = i[9]),
      (e[10] = i[10]),
      (e[11] = i[11]),
      (e[12] = i[12]),
      (e[13] = i[13]),
      (e[14] = i[14]),
      (e[15] = i[15]),
      this
    )
  }
  copyPosition(t) {
    const e = this.elements,
      i = t.elements
    return ((e[12] = i[12]), (e[13] = i[13]), (e[14] = i[14]), this)
  }
  setFromMatrix3(t) {
    const e = t.elements
    return (
      this.set(
        e[0],
        e[3],
        e[6],
        0,
        e[1],
        e[4],
        e[7],
        0,
        e[2],
        e[5],
        e[8],
        0,
        0,
        0,
        0,
        1
      ),
      this
    )
  }
  extractBasis(t, e, i) {
    return this.determinant() === 0
      ? (t.set(1, 0, 0), e.set(0, 1, 0), i.set(0, 0, 1), this)
      : (t.setFromMatrixColumn(this, 0),
        e.setFromMatrixColumn(this, 1),
        i.setFromMatrixColumn(this, 2),
        this)
  }
  makeBasis(t, e, i) {
    return (
      this.set(
        t.x,
        e.x,
        i.x,
        0,
        t.y,
        e.y,
        i.y,
        0,
        t.z,
        e.z,
        i.z,
        0,
        0,
        0,
        0,
        1
      ),
      this
    )
  }
  extractRotation(t) {
    if (t.determinant() === 0) return this.identity()
    const e = this.elements,
      i = t.elements,
      s = 1 / wi.setFromMatrixColumn(t, 0).length(),
      r = 1 / wi.setFromMatrixColumn(t, 1).length(),
      a = 1 / wi.setFromMatrixColumn(t, 2).length()
    return (
      (e[0] = i[0] * s),
      (e[1] = i[1] * s),
      (e[2] = i[2] * s),
      (e[3] = 0),
      (e[4] = i[4] * r),
      (e[5] = i[5] * r),
      (e[6] = i[6] * r),
      (e[7] = 0),
      (e[8] = i[8] * a),
      (e[9] = i[9] * a),
      (e[10] = i[10] * a),
      (e[11] = 0),
      (e[12] = 0),
      (e[13] = 0),
      (e[14] = 0),
      (e[15] = 1),
      this
    )
  }
  makeRotationFromEuler(t) {
    const e = this.elements,
      i = t.x,
      s = t.y,
      r = t.z,
      a = Math.cos(i),
      o = Math.sin(i),
      c = Math.cos(s),
      l = Math.sin(s),
      u = Math.cos(r),
      p = Math.sin(r)
    if (t.order === 'XYZ') {
      const h = a * u,
        m = a * p,
        g = o * u,
        v = o * p
      ;((e[0] = c * u),
        (e[4] = -c * p),
        (e[8] = l),
        (e[1] = m + g * l),
        (e[5] = h - v * l),
        (e[9] = -o * c),
        (e[2] = v - h * l),
        (e[6] = g + m * l),
        (e[10] = a * c))
    } else if (t.order === 'YXZ') {
      const h = c * u,
        m = c * p,
        g = l * u,
        v = l * p
      ;((e[0] = h + v * o),
        (e[4] = g * o - m),
        (e[8] = a * l),
        (e[1] = a * p),
        (e[5] = a * u),
        (e[9] = -o),
        (e[2] = m * o - g),
        (e[6] = v + h * o),
        (e[10] = a * c))
    } else if (t.order === 'ZXY') {
      const h = c * u,
        m = c * p,
        g = l * u,
        v = l * p
      ;((e[0] = h - v * o),
        (e[4] = -a * p),
        (e[8] = g + m * o),
        (e[1] = m + g * o),
        (e[5] = a * u),
        (e[9] = v - h * o),
        (e[2] = -a * l),
        (e[6] = o),
        (e[10] = a * c))
    } else if (t.order === 'ZYX') {
      const h = a * u,
        m = a * p,
        g = o * u,
        v = o * p
      ;((e[0] = c * u),
        (e[4] = g * l - m),
        (e[8] = h * l + v),
        (e[1] = c * p),
        (e[5] = v * l + h),
        (e[9] = m * l - g),
        (e[2] = -l),
        (e[6] = o * c),
        (e[10] = a * c))
    } else if (t.order === 'YZX') {
      const h = a * c,
        m = a * l,
        g = o * c,
        v = o * l
      ;((e[0] = c * u),
        (e[4] = v - h * p),
        (e[8] = g * p + m),
        (e[1] = p),
        (e[5] = a * u),
        (e[9] = -o * u),
        (e[2] = -l * u),
        (e[6] = m * p + g),
        (e[10] = h - v * p))
    } else if (t.order === 'XZY') {
      const h = a * c,
        m = a * l,
        g = o * c,
        v = o * l
      ;((e[0] = c * u),
        (e[4] = -p),
        (e[8] = l * u),
        (e[1] = h * p + v),
        (e[5] = a * u),
        (e[9] = m * p - g),
        (e[2] = g * p - m),
        (e[6] = o * u),
        (e[10] = v * p + h))
    }
    return (
      (e[3] = 0),
      (e[7] = 0),
      (e[11] = 0),
      (e[12] = 0),
      (e[13] = 0),
      (e[14] = 0),
      (e[15] = 1),
      this
    )
  }
  makeRotationFromQuaternion(t) {
    return this.compose(Ou, t, Bu)
  }
  lookAt(t, e, i) {
    const s = this.elements
    return (
      tn.subVectors(t, e),
      tn.lengthSq() === 0 && (tn.z = 1),
      tn.normalize(),
      Kn.crossVectors(i, tn),
      Kn.lengthSq() === 0 &&
        (Math.abs(i.z) === 1 ? (tn.x += 1e-4) : (tn.z += 1e-4),
        tn.normalize(),
        Kn.crossVectors(i, tn)),
      Kn.normalize(),
      bs.crossVectors(tn, Kn),
      (s[0] = Kn.x),
      (s[4] = bs.x),
      (s[8] = tn.x),
      (s[1] = Kn.y),
      (s[5] = bs.y),
      (s[9] = tn.y),
      (s[2] = Kn.z),
      (s[6] = bs.z),
      (s[10] = tn.z),
      this
    )
  }
  multiply(t) {
    return this.multiplyMatrices(this, t)
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this)
  }
  multiplyMatrices(t, e) {
    const i = t.elements,
      s = e.elements,
      r = this.elements,
      a = i[0],
      o = i[4],
      c = i[8],
      l = i[12],
      u = i[1],
      p = i[5],
      h = i[9],
      m = i[13],
      g = i[2],
      v = i[6],
      f = i[10],
      d = i[14],
      M = i[3],
      T = i[7],
      w = i[11],
      C = i[15],
      A = s[0],
      y = s[4],
      _ = s[8],
      b = s[12],
      P = s[1],
      R = s[5],
      N = s[9],
      V = s[13],
      W = s[2],
      I = s[6],
      G = s[10],
      O = s[14],
      J = s[3],
      et = s[7],
      dt = s[11],
      Tt = s[15]
    return (
      (r[0] = a * A + o * P + c * W + l * J),
      (r[4] = a * y + o * R + c * I + l * et),
      (r[8] = a * _ + o * N + c * G + l * dt),
      (r[12] = a * b + o * V + c * O + l * Tt),
      (r[1] = u * A + p * P + h * W + m * J),
      (r[5] = u * y + p * R + h * I + m * et),
      (r[9] = u * _ + p * N + h * G + m * dt),
      (r[13] = u * b + p * V + h * O + m * Tt),
      (r[2] = g * A + v * P + f * W + d * J),
      (r[6] = g * y + v * R + f * I + d * et),
      (r[10] = g * _ + v * N + f * G + d * dt),
      (r[14] = g * b + v * V + f * O + d * Tt),
      (r[3] = M * A + T * P + w * W + C * J),
      (r[7] = M * y + T * R + w * I + C * et),
      (r[11] = M * _ + T * N + w * G + C * dt),
      (r[15] = M * b + T * V + w * O + C * Tt),
      this
    )
  }
  multiplyScalar(t) {
    const e = this.elements
    return (
      (e[0] *= t),
      (e[4] *= t),
      (e[8] *= t),
      (e[12] *= t),
      (e[1] *= t),
      (e[5] *= t),
      (e[9] *= t),
      (e[13] *= t),
      (e[2] *= t),
      (e[6] *= t),
      (e[10] *= t),
      (e[14] *= t),
      (e[3] *= t),
      (e[7] *= t),
      (e[11] *= t),
      (e[15] *= t),
      this
    )
  }
  determinant() {
    const t = this.elements,
      e = t[0],
      i = t[4],
      s = t[8],
      r = t[12],
      a = t[1],
      o = t[5],
      c = t[9],
      l = t[13],
      u = t[2],
      p = t[6],
      h = t[10],
      m = t[14],
      g = t[3],
      v = t[7],
      f = t[11],
      d = t[15],
      M = c * m - l * h,
      T = o * m - l * p,
      w = o * h - c * p,
      C = a * m - l * u,
      A = a * h - c * u,
      y = a * p - o * u
    return (
      e * (v * M - f * T + d * w) -
      i * (g * M - f * C + d * A) +
      s * (g * T - v * C + d * y) -
      r * (g * w - v * A + f * y)
    )
  }
  transpose() {
    const t = this.elements
    let e
    return (
      (e = t[1]),
      (t[1] = t[4]),
      (t[4] = e),
      (e = t[2]),
      (t[2] = t[8]),
      (t[8] = e),
      (e = t[6]),
      (t[6] = t[9]),
      (t[9] = e),
      (e = t[3]),
      (t[3] = t[12]),
      (t[12] = e),
      (e = t[7]),
      (t[7] = t[13]),
      (t[13] = e),
      (e = t[11]),
      (t[11] = t[14]),
      (t[14] = e),
      this
    )
  }
  setPosition(t, e, i) {
    const s = this.elements
    return (
      t.isVector3
        ? ((s[12] = t.x), (s[13] = t.y), (s[14] = t.z))
        : ((s[12] = t), (s[13] = e), (s[14] = i)),
      this
    )
  }
  invert() {
    const t = this.elements,
      e = t[0],
      i = t[1],
      s = t[2],
      r = t[3],
      a = t[4],
      o = t[5],
      c = t[6],
      l = t[7],
      u = t[8],
      p = t[9],
      h = t[10],
      m = t[11],
      g = t[12],
      v = t[13],
      f = t[14],
      d = t[15],
      M = e * o - i * a,
      T = e * c - s * a,
      w = e * l - r * a,
      C = i * c - s * o,
      A = i * l - r * o,
      y = s * l - r * c,
      _ = u * v - p * g,
      b = u * f - h * g,
      P = u * d - m * g,
      R = p * f - h * v,
      N = p * d - m * v,
      V = h * d - m * f,
      W = M * V - T * N + w * R + C * P - A * b + y * _
    if (W === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
    const I = 1 / W
    return (
      (t[0] = (o * V - c * N + l * R) * I),
      (t[1] = (s * N - i * V - r * R) * I),
      (t[2] = (v * y - f * A + d * C) * I),
      (t[3] = (h * A - p * y - m * C) * I),
      (t[4] = (c * P - a * V - l * b) * I),
      (t[5] = (e * V - s * P + r * b) * I),
      (t[6] = (f * w - g * y - d * T) * I),
      (t[7] = (u * y - h * w + m * T) * I),
      (t[8] = (a * N - o * P + l * _) * I),
      (t[9] = (i * P - e * N - r * _) * I),
      (t[10] = (g * A - v * w + d * M) * I),
      (t[11] = (p * w - u * A - m * M) * I),
      (t[12] = (o * b - a * R - c * _) * I),
      (t[13] = (e * R - i * b + s * _) * I),
      (t[14] = (v * T - g * C - f * M) * I),
      (t[15] = (u * C - p * T + h * M) * I),
      this
    )
  }
  scale(t) {
    const e = this.elements,
      i = t.x,
      s = t.y,
      r = t.z
    return (
      (e[0] *= i),
      (e[4] *= s),
      (e[8] *= r),
      (e[1] *= i),
      (e[5] *= s),
      (e[9] *= r),
      (e[2] *= i),
      (e[6] *= s),
      (e[10] *= r),
      (e[3] *= i),
      (e[7] *= s),
      (e[11] *= r),
      this
    )
  }
  getMaxScaleOnAxis() {
    const t = this.elements,
      e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2],
      i = t[4] * t[4] + t[5] * t[5] + t[6] * t[6],
      s = t[8] * t[8] + t[9] * t[9] + t[10] * t[10]
    return Math.sqrt(Math.max(e, i, s))
  }
  makeTranslation(t, e, i) {
    return (
      t.isVector3
        ? this.set(1, 0, 0, t.x, 0, 1, 0, t.y, 0, 0, 1, t.z, 0, 0, 0, 1)
        : this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, i, 0, 0, 0, 1),
      this
    )
  }
  makeRotationX(t) {
    const e = Math.cos(t),
      i = Math.sin(t)
    return (this.set(1, 0, 0, 0, 0, e, -i, 0, 0, i, e, 0, 0, 0, 0, 1), this)
  }
  makeRotationY(t) {
    const e = Math.cos(t),
      i = Math.sin(t)
    return (this.set(e, 0, i, 0, 0, 1, 0, 0, -i, 0, e, 0, 0, 0, 0, 1), this)
  }
  makeRotationZ(t) {
    const e = Math.cos(t),
      i = Math.sin(t)
    return (this.set(e, -i, 0, 0, i, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this)
  }
  makeRotationAxis(t, e) {
    const i = Math.cos(e),
      s = Math.sin(e),
      r = 1 - i,
      a = t.x,
      o = t.y,
      c = t.z,
      l = r * a,
      u = r * o
    return (
      this.set(
        l * a + i,
        l * o - s * c,
        l * c + s * o,
        0,
        l * o + s * c,
        u * o + i,
        u * c - s * a,
        0,
        l * c - s * o,
        u * c + s * a,
        r * c * c + i,
        0,
        0,
        0,
        0,
        1
      ),
      this
    )
  }
  makeScale(t, e, i) {
    return (this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, i, 0, 0, 0, 0, 1), this)
  }
  makeShear(t, e, i, s, r, a) {
    return (this.set(1, i, r, 0, t, 1, a, 0, e, s, 1, 0, 0, 0, 0, 1), this)
  }
  compose(t, e, i) {
    const s = this.elements,
      r = e._x,
      a = e._y,
      o = e._z,
      c = e._w,
      l = r + r,
      u = a + a,
      p = o + o,
      h = r * l,
      m = r * u,
      g = r * p,
      v = a * u,
      f = a * p,
      d = o * p,
      M = c * l,
      T = c * u,
      w = c * p,
      C = i.x,
      A = i.y,
      y = i.z
    return (
      (s[0] = (1 - (v + d)) * C),
      (s[1] = (m + w) * C),
      (s[2] = (g - T) * C),
      (s[3] = 0),
      (s[4] = (m - w) * A),
      (s[5] = (1 - (h + d)) * A),
      (s[6] = (f + M) * A),
      (s[7] = 0),
      (s[8] = (g + T) * y),
      (s[9] = (f - M) * y),
      (s[10] = (1 - (h + v)) * y),
      (s[11] = 0),
      (s[12] = t.x),
      (s[13] = t.y),
      (s[14] = t.z),
      (s[15] = 1),
      this
    )
  }
  decompose(t, e, i) {
    const s = this.elements
    ;((t.x = s[12]), (t.y = s[13]), (t.z = s[14]))
    const r = this.determinant()
    if (r === 0) return (i.set(1, 1, 1), e.identity(), this)
    let a = wi.set(s[0], s[1], s[2]).length()
    const o = wi.set(s[4], s[5], s[6]).length(),
      c = wi.set(s[8], s[9], s[10]).length()
    ;(r < 0 && (a = -a), dn.copy(this))
    const l = 1 / a,
      u = 1 / o,
      p = 1 / c
    return (
      (dn.elements[0] *= l),
      (dn.elements[1] *= l),
      (dn.elements[2] *= l),
      (dn.elements[4] *= u),
      (dn.elements[5] *= u),
      (dn.elements[6] *= u),
      (dn.elements[8] *= p),
      (dn.elements[9] *= p),
      (dn.elements[10] *= p),
      e.setFromRotationMatrix(dn),
      (i.x = a),
      (i.y = o),
      (i.z = c),
      this
    )
  }
  makePerspective(t, e, i, s, r, a, o = Tn, c = !1) {
    const l = this.elements,
      u = (2 * r) / (e - t),
      p = (2 * r) / (i - s),
      h = (e + t) / (e - t),
      m = (i + s) / (i - s)
    let g, v
    if (c) ((g = r / (a - r)), (v = (a * r) / (a - r)))
    else if (o === Tn) ((g = -(a + r) / (a - r)), (v = (-2 * a * r) / (a - r)))
    else if (o === _s) ((g = -a / (a - r)), (v = (-a * r) / (a - r)))
    else
      throw new Error(
        'THREE.Matrix4.makePerspective(): Invalid coordinate system: ' + o
      )
    return (
      (l[0] = u),
      (l[4] = 0),
      (l[8] = h),
      (l[12] = 0),
      (l[1] = 0),
      (l[5] = p),
      (l[9] = m),
      (l[13] = 0),
      (l[2] = 0),
      (l[6] = 0),
      (l[10] = g),
      (l[14] = v),
      (l[3] = 0),
      (l[7] = 0),
      (l[11] = -1),
      (l[15] = 0),
      this
    )
  }
  makeOrthographic(t, e, i, s, r, a, o = Tn, c = !1) {
    const l = this.elements,
      u = 2 / (e - t),
      p = 2 / (i - s),
      h = -(e + t) / (e - t),
      m = -(i + s) / (i - s)
    let g, v
    if (c) ((g = 1 / (a - r)), (v = a / (a - r)))
    else if (o === Tn) ((g = -2 / (a - r)), (v = -(a + r) / (a - r)))
    else if (o === _s) ((g = -1 / (a - r)), (v = -r / (a - r)))
    else
      throw new Error(
        'THREE.Matrix4.makeOrthographic(): Invalid coordinate system: ' + o
      )
    return (
      (l[0] = u),
      (l[4] = 0),
      (l[8] = 0),
      (l[12] = h),
      (l[1] = 0),
      (l[5] = p),
      (l[9] = 0),
      (l[13] = m),
      (l[2] = 0),
      (l[6] = 0),
      (l[10] = g),
      (l[14] = v),
      (l[3] = 0),
      (l[7] = 0),
      (l[11] = 0),
      (l[15] = 1),
      this
    )
  }
  equals(t) {
    const e = this.elements,
      i = t.elements
    for (let s = 0; s < 16; s++) if (e[s] !== i[s]) return !1
    return !0
  }
  fromArray(t, e = 0) {
    for (let i = 0; i < 16; i++) this.elements[i] = t[i + e]
    return this
  }
  toArray(t = [], e = 0) {
    const i = this.elements
    return (
      (t[e] = i[0]),
      (t[e + 1] = i[1]),
      (t[e + 2] = i[2]),
      (t[e + 3] = i[3]),
      (t[e + 4] = i[4]),
      (t[e + 5] = i[5]),
      (t[e + 6] = i[6]),
      (t[e + 7] = i[7]),
      (t[e + 8] = i[8]),
      (t[e + 9] = i[9]),
      (t[e + 10] = i[10]),
      (t[e + 11] = i[11]),
      (t[e + 12] = i[12]),
      (t[e + 13] = i[13]),
      (t[e + 14] = i[14]),
      (t[e + 15] = i[15]),
      t
    )
  }
}
vr.prototype.isMatrix4 = !0
let le = vr
const wi = new D(),
  dn = new le(),
  Ou = new D(0, 0, 0),
  Bu = new D(1, 1, 1),
  Kn = new D(),
  bs = new D(),
  tn = new D(),
  ml = new le(),
  gl = new Wn()
class Cn {
  constructor(t = 0, e = 0, i = 0, s = Cn.DEFAULT_ORDER) {
    ;((this.isEuler = !0),
      (this._x = t),
      (this._y = e),
      (this._z = i),
      (this._order = s))
  }
  get x() {
    return this._x
  }
  set x(t) {
    ;((this._x = t), this._onChangeCallback())
  }
  get y() {
    return this._y
  }
  set y(t) {
    ;((this._y = t), this._onChangeCallback())
  }
  get z() {
    return this._z
  }
  set z(t) {
    ;((this._z = t), this._onChangeCallback())
  }
  get order() {
    return this._order
  }
  set order(t) {
    ;((this._order = t), this._onChangeCallback())
  }
  set(t, e, i, s = this._order) {
    return (
      (this._x = t),
      (this._y = e),
      (this._z = i),
      (this._order = s),
      this._onChangeCallback(),
      this
    )
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order)
  }
  copy(t) {
    return (
      (this._x = t._x),
      (this._y = t._y),
      (this._z = t._z),
      (this._order = t._order),
      this._onChangeCallback(),
      this
    )
  }
  setFromRotationMatrix(t, e = this._order, i = !0) {
    const s = t.elements,
      r = s[0],
      a = s[4],
      o = s[8],
      c = s[1],
      l = s[5],
      u = s[9],
      p = s[2],
      h = s[6],
      m = s[10]
    switch (e) {
      case 'XYZ':
        ;((this._y = Math.asin(qt(o, -1, 1))),
          Math.abs(o) < 0.9999999
            ? ((this._x = Math.atan2(-u, m)), (this._z = Math.atan2(-a, r)))
            : ((this._x = Math.atan2(h, l)), (this._z = 0)))
        break
      case 'YXZ':
        ;((this._x = Math.asin(-qt(u, -1, 1))),
          Math.abs(u) < 0.9999999
            ? ((this._y = Math.atan2(o, m)), (this._z = Math.atan2(c, l)))
            : ((this._y = Math.atan2(-p, r)), (this._z = 0)))
        break
      case 'ZXY':
        ;((this._x = Math.asin(qt(h, -1, 1))),
          Math.abs(h) < 0.9999999
            ? ((this._y = Math.atan2(-p, m)), (this._z = Math.atan2(-a, l)))
            : ((this._y = 0), (this._z = Math.atan2(c, r))))
        break
      case 'ZYX':
        ;((this._y = Math.asin(-qt(p, -1, 1))),
          Math.abs(p) < 0.9999999
            ? ((this._x = Math.atan2(h, m)), (this._z = Math.atan2(c, r)))
            : ((this._x = 0), (this._z = Math.atan2(-a, l))))
        break
      case 'YZX':
        ;((this._z = Math.asin(qt(c, -1, 1))),
          Math.abs(c) < 0.9999999
            ? ((this._x = Math.atan2(-u, l)), (this._y = Math.atan2(-p, r)))
            : ((this._x = 0), (this._y = Math.atan2(o, m))))
        break
      case 'XZY':
        ;((this._z = Math.asin(-qt(a, -1, 1))),
          Math.abs(a) < 0.9999999
            ? ((this._x = Math.atan2(h, l)), (this._y = Math.atan2(o, r)))
            : ((this._x = Math.atan2(-u, m)), (this._y = 0)))
        break
      default:
        Dt('Euler: .setFromRotationMatrix() encountered an unknown order: ' + e)
    }
    return ((this._order = e), i === !0 && this._onChangeCallback(), this)
  }
  setFromQuaternion(t, e, i) {
    return (
      ml.makeRotationFromQuaternion(t),
      this.setFromRotationMatrix(ml, e, i)
    )
  }
  setFromVector3(t, e = this._order) {
    return this.set(t.x, t.y, t.z, e)
  }
  reorder(t) {
    return (gl.setFromEuler(this), this.setFromQuaternion(gl, t))
  }
  equals(t) {
    return (
      t._x === this._x &&
      t._y === this._y &&
      t._z === this._z &&
      t._order === this._order
    )
  }
  fromArray(t) {
    return (
      (this._x = t[0]),
      (this._y = t[1]),
      (this._z = t[2]),
      t[3] !== void 0 && (this._order = t[3]),
      this._onChangeCallback(),
      this
    )
  }
  toArray(t = [], e = 0) {
    return (
      (t[e] = this._x),
      (t[e + 1] = this._y),
      (t[e + 2] = this._z),
      (t[e + 3] = this._order),
      t
    )
  }
  _onChange(t) {
    return ((this._onChangeCallback = t), this)
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    ;(yield this._x, yield this._y, yield this._z, yield this._order)
  }
}
Cn.DEFAULT_ORDER = 'XYZ'
class Lo {
  constructor() {
    this.mask = 1
  }
  set(t) {
    this.mask = ((1 << t) | 0) >>> 0
  }
  enable(t) {
    this.mask |= (1 << t) | 0
  }
  enableAll() {
    this.mask = -1
  }
  toggle(t) {
    this.mask ^= (1 << t) | 0
  }
  disable(t) {
    this.mask &= ~((1 << t) | 0)
  }
  disableAll() {
    this.mask = 0
  }
  test(t) {
    return (this.mask & t.mask) !== 0
  }
  isEnabled(t) {
    return (this.mask & ((1 << t) | 0)) !== 0
  }
}
let zu = 0
const _l = new D(),
  Ai = new Wn(),
  Dn = new le(),
  Es = new D(),
  Qi = new D(),
  ku = new D(),
  Gu = new Wn(),
  xl = new D(1, 0, 0),
  vl = new D(0, 1, 0),
  Ml = new D(0, 0, 1),
  Sl = { type: 'added' },
  Hu = { type: 'removed' },
  Ri = { type: 'childadded', child: null },
  Br = { type: 'childremoved', child: null }
class ye extends li {
  constructor() {
    ;(super(),
      (this.isObject3D = !0),
      Object.defineProperty(this, 'id', { value: zu++ }),
      (this.uuid = $i()),
      (this.name = ''),
      (this.type = 'Object3D'),
      (this.parent = null),
      (this.children = []),
      (this.up = ye.DEFAULT_UP.clone()))
    const t = new D(),
      e = new Cn(),
      i = new Wn(),
      s = new D(1, 1, 1)
    function r() {
      i.setFromEuler(e, !1)
    }
    function a() {
      e.setFromQuaternion(i, void 0, !1)
    }
    ;(e._onChange(r),
      i._onChange(a),
      Object.defineProperties(this, {
        position: { configurable: !0, enumerable: !0, value: t },
        rotation: { configurable: !0, enumerable: !0, value: e },
        quaternion: { configurable: !0, enumerable: !0, value: i },
        scale: { configurable: !0, enumerable: !0, value: s },
        modelViewMatrix: { value: new le() },
        normalMatrix: { value: new zt() },
      }),
      (this.matrix = new le()),
      (this.matrixWorld = new le()),
      (this.matrixAutoUpdate = ye.DEFAULT_MATRIX_AUTO_UPDATE),
      (this.matrixWorldAutoUpdate = ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE),
      (this.matrixWorldNeedsUpdate = !1),
      (this.layers = new Lo()),
      (this.visible = !0),
      (this.castShadow = !1),
      (this.receiveShadow = !1),
      (this.frustumCulled = !0),
      (this.renderOrder = 0),
      (this.animations = []),
      (this.customDepthMaterial = void 0),
      (this.customDistanceMaterial = void 0),
      (this.static = !1),
      (this.userData = {}),
      (this.pivot = null))
  }
  onBeforeShadow() {}
  onAfterShadow() {}
  onBeforeRender() {}
  onAfterRender() {}
  applyMatrix4(t) {
    ;(this.matrixAutoUpdate && this.updateMatrix(),
      this.matrix.premultiply(t),
      this.matrix.decompose(this.position, this.quaternion, this.scale))
  }
  applyQuaternion(t) {
    return (this.quaternion.premultiply(t), this)
  }
  setRotationFromAxisAngle(t, e) {
    this.quaternion.setFromAxisAngle(t, e)
  }
  setRotationFromEuler(t) {
    this.quaternion.setFromEuler(t, !0)
  }
  setRotationFromMatrix(t) {
    this.quaternion.setFromRotationMatrix(t)
  }
  setRotationFromQuaternion(t) {
    this.quaternion.copy(t)
  }
  rotateOnAxis(t, e) {
    return (Ai.setFromAxisAngle(t, e), this.quaternion.multiply(Ai), this)
  }
  rotateOnWorldAxis(t, e) {
    return (Ai.setFromAxisAngle(t, e), this.quaternion.premultiply(Ai), this)
  }
  rotateX(t) {
    return this.rotateOnAxis(xl, t)
  }
  rotateY(t) {
    return this.rotateOnAxis(vl, t)
  }
  rotateZ(t) {
    return this.rotateOnAxis(Ml, t)
  }
  translateOnAxis(t, e) {
    return (
      _l.copy(t).applyQuaternion(this.quaternion),
      this.position.add(_l.multiplyScalar(e)),
      this
    )
  }
  translateX(t) {
    return this.translateOnAxis(xl, t)
  }
  translateY(t) {
    return this.translateOnAxis(vl, t)
  }
  translateZ(t) {
    return this.translateOnAxis(Ml, t)
  }
  localToWorld(t) {
    return (this.updateWorldMatrix(!0, !1), t.applyMatrix4(this.matrixWorld))
  }
  worldToLocal(t) {
    return (
      this.updateWorldMatrix(!0, !1),
      t.applyMatrix4(Dn.copy(this.matrixWorld).invert())
    )
  }
  lookAt(t, e, i) {
    t.isVector3 ? Es.copy(t) : Es.set(t, e, i)
    const s = this.parent
    ;(this.updateWorldMatrix(!0, !1),
      Qi.setFromMatrixPosition(this.matrixWorld),
      this.isCamera || this.isLight
        ? Dn.lookAt(Qi, Es, this.up)
        : Dn.lookAt(Es, Qi, this.up),
      this.quaternion.setFromRotationMatrix(Dn),
      s &&
        (Dn.extractRotation(s.matrixWorld),
        Ai.setFromRotationMatrix(Dn),
        this.quaternion.premultiply(Ai.invert())))
  }
  add(t) {
    if (arguments.length > 1) {
      for (let e = 0; e < arguments.length; e++) this.add(arguments[e])
      return this
    }
    return t === this
      ? (Zt("Object3D.add: object can't be added as a child of itself.", t),
        this)
      : (t && t.isObject3D
          ? (t.removeFromParent(),
            (t.parent = this),
            this.children.push(t),
            t.dispatchEvent(Sl),
            (Ri.child = t),
            this.dispatchEvent(Ri),
            (Ri.child = null))
          : Zt('Object3D.add: object not an instance of THREE.Object3D.', t),
        this)
  }
  remove(t) {
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++) this.remove(arguments[i])
      return this
    }
    const e = this.children.indexOf(t)
    return (
      e !== -1 &&
        ((t.parent = null),
        this.children.splice(e, 1),
        t.dispatchEvent(Hu),
        (Br.child = t),
        this.dispatchEvent(Br),
        (Br.child = null)),
      this
    )
  }
  removeFromParent() {
    const t = this.parent
    return (t !== null && t.remove(this), this)
  }
  clear() {
    return this.remove(...this.children)
  }
  attach(t) {
    return (
      this.updateWorldMatrix(!0, !1),
      Dn.copy(this.matrixWorld).invert(),
      t.parent !== null &&
        (t.parent.updateWorldMatrix(!0, !1), Dn.multiply(t.parent.matrixWorld)),
      t.applyMatrix4(Dn),
      t.removeFromParent(),
      (t.parent = this),
      this.children.push(t),
      t.updateWorldMatrix(!1, !0),
      t.dispatchEvent(Sl),
      (Ri.child = t),
      this.dispatchEvent(Ri),
      (Ri.child = null),
      this
    )
  }
  getObjectById(t) {
    return this.getObjectByProperty('id', t)
  }
  getObjectByName(t) {
    return this.getObjectByProperty('name', t)
  }
  getObjectByProperty(t, e) {
    if (this[t] === e) return this
    for (let i = 0, s = this.children.length; i < s; i++) {
      const a = this.children[i].getObjectByProperty(t, e)
      if (a !== void 0) return a
    }
  }
  getObjectsByProperty(t, e, i = []) {
    this[t] === e && i.push(this)
    const s = this.children
    for (let r = 0, a = s.length; r < a; r++) s[r].getObjectsByProperty(t, e, i)
    return i
  }
  getWorldPosition(t) {
    return (
      this.updateWorldMatrix(!0, !1),
      t.setFromMatrixPosition(this.matrixWorld)
    )
  }
  getWorldQuaternion(t) {
    return (
      this.updateWorldMatrix(!0, !1),
      this.matrixWorld.decompose(Qi, t, ku),
      t
    )
  }
  getWorldScale(t) {
    return (
      this.updateWorldMatrix(!0, !1),
      this.matrixWorld.decompose(Qi, Gu, t),
      t
    )
  }
  getWorldDirection(t) {
    this.updateWorldMatrix(!0, !1)
    const e = this.matrixWorld.elements
    return t.set(e[8], e[9], e[10]).normalize()
  }
  raycast() {}
  traverse(t) {
    t(this)
    const e = this.children
    for (let i = 0, s = e.length; i < s; i++) e[i].traverse(t)
  }
  traverseVisible(t) {
    if (this.visible === !1) return
    t(this)
    const e = this.children
    for (let i = 0, s = e.length; i < s; i++) e[i].traverseVisible(t)
  }
  traverseAncestors(t) {
    const e = this.parent
    e !== null && (t(e), e.traverseAncestors(t))
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale)
    const t = this.pivot
    if (t !== null) {
      const e = t.x,
        i = t.y,
        s = t.z,
        r = this.matrix.elements
      ;((r[12] += e - r[0] * e - r[4] * i - r[8] * s),
        (r[13] += i - r[1] * e - r[5] * i - r[9] * s),
        (r[14] += s - r[2] * e - r[6] * i - r[10] * s))
    }
    this.matrixWorldNeedsUpdate = !0
  }
  updateMatrixWorld(t) {
    ;(this.matrixAutoUpdate && this.updateMatrix(),
      (this.matrixWorldNeedsUpdate || t) &&
        (this.matrixWorldAutoUpdate === !0 &&
          (this.parent === null
            ? this.matrixWorld.copy(this.matrix)
            : this.matrixWorld.multiplyMatrices(
                this.parent.matrixWorld,
                this.matrix
              )),
        (this.matrixWorldNeedsUpdate = !1),
        (t = !0)))
    const e = this.children
    for (let i = 0, s = e.length; i < s; i++) e[i].updateMatrixWorld(t)
  }
  updateWorldMatrix(t, e) {
    const i = this.parent
    if (
      (t === !0 && i !== null && i.updateWorldMatrix(!0, !1),
      this.matrixAutoUpdate && this.updateMatrix(),
      this.matrixWorldAutoUpdate === !0 &&
        (this.parent === null
          ? this.matrixWorld.copy(this.matrix)
          : this.matrixWorld.multiplyMatrices(
              this.parent.matrixWorld,
              this.matrix
            )),
      e === !0)
    ) {
      const s = this.children
      for (let r = 0, a = s.length; r < a; r++) s[r].updateWorldMatrix(!1, !0)
    }
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == 'string',
      i = {}
    e &&
      ((t = {
        geometries: {},
        materials: {},
        textures: {},
        images: {},
        shapes: {},
        skeletons: {},
        animations: {},
        nodes: {},
      }),
      (i.metadata = {
        version: 4.7,
        type: 'Object',
        generator: 'Object3D.toJSON',
      }))
    const s = {}
    ;((s.uuid = this.uuid),
      (s.type = this.type),
      this.name !== '' && (s.name = this.name),
      this.castShadow === !0 && (s.castShadow = !0),
      this.receiveShadow === !0 && (s.receiveShadow = !0),
      this.visible === !1 && (s.visible = !1),
      this.frustumCulled === !1 && (s.frustumCulled = !1),
      this.renderOrder !== 0 && (s.renderOrder = this.renderOrder),
      this.static !== !1 && (s.static = this.static),
      Object.keys(this.userData).length > 0 && (s.userData = this.userData),
      (s.layers = this.layers.mask),
      (s.matrix = this.matrix.toArray()),
      (s.up = this.up.toArray()),
      this.pivot !== null && (s.pivot = this.pivot.toArray()),
      this.matrixAutoUpdate === !1 && (s.matrixAutoUpdate = !1),
      this.morphTargetDictionary !== void 0 &&
        (s.morphTargetDictionary = Object.assign(
          {},
          this.morphTargetDictionary
        )),
      this.morphTargetInfluences !== void 0 &&
        (s.morphTargetInfluences = this.morphTargetInfluences.slice()),
      this.isInstancedMesh &&
        ((s.type = 'InstancedMesh'),
        (s.count = this.count),
        (s.instanceMatrix = this.instanceMatrix.toJSON()),
        this.instanceColor !== null &&
          (s.instanceColor = this.instanceColor.toJSON())),
      this.isBatchedMesh &&
        ((s.type = 'BatchedMesh'),
        (s.perObjectFrustumCulled = this.perObjectFrustumCulled),
        (s.sortObjects = this.sortObjects),
        (s.drawRanges = this._drawRanges),
        (s.reservedRanges = this._reservedRanges),
        (s.geometryInfo = this._geometryInfo.map(o => ({
          ...o,
          boundingBox: o.boundingBox ? o.boundingBox.toJSON() : void 0,
          boundingSphere: o.boundingSphere ? o.boundingSphere.toJSON() : void 0,
        }))),
        (s.instanceInfo = this._instanceInfo.map(o => ({ ...o }))),
        (s.availableInstanceIds = this._availableInstanceIds.slice()),
        (s.availableGeometryIds = this._availableGeometryIds.slice()),
        (s.nextIndexStart = this._nextIndexStart),
        (s.nextVertexStart = this._nextVertexStart),
        (s.geometryCount = this._geometryCount),
        (s.maxInstanceCount = this._maxInstanceCount),
        (s.maxVertexCount = this._maxVertexCount),
        (s.maxIndexCount = this._maxIndexCount),
        (s.geometryInitialized = this._geometryInitialized),
        (s.matricesTexture = this._matricesTexture.toJSON(t)),
        (s.indirectTexture = this._indirectTexture.toJSON(t)),
        this._colorsTexture !== null &&
          (s.colorsTexture = this._colorsTexture.toJSON(t)),
        this.boundingSphere !== null &&
          (s.boundingSphere = this.boundingSphere.toJSON()),
        this.boundingBox !== null &&
          (s.boundingBox = this.boundingBox.toJSON())))
    function r(o, c) {
      return (o[c.uuid] === void 0 && (o[c.uuid] = c.toJSON(t)), c.uuid)
    }
    if (this.isScene)
      (this.background &&
        (this.background.isColor
          ? (s.background = this.background.toJSON())
          : this.background.isTexture &&
            (s.background = this.background.toJSON(t).uuid)),
        this.environment &&
          this.environment.isTexture &&
          this.environment.isRenderTargetTexture !== !0 &&
          (s.environment = this.environment.toJSON(t).uuid))
    else if (this.isMesh || this.isLine || this.isPoints) {
      s.geometry = r(t.geometries, this.geometry)
      const o = this.geometry.parameters
      if (o !== void 0 && o.shapes !== void 0) {
        const c = o.shapes
        if (Array.isArray(c))
          for (let l = 0, u = c.length; l < u; l++) {
            const p = c[l]
            r(t.shapes, p)
          }
        else r(t.shapes, c)
      }
    }
    if (
      (this.isSkinnedMesh &&
        ((s.bindMode = this.bindMode),
        (s.bindMatrix = this.bindMatrix.toArray()),
        this.skeleton !== void 0 &&
          (r(t.skeletons, this.skeleton), (s.skeleton = this.skeleton.uuid))),
      this.material !== void 0)
    )
      if (Array.isArray(this.material)) {
        const o = []
        for (let c = 0, l = this.material.length; c < l; c++)
          o.push(r(t.materials, this.material[c]))
        s.material = o
      } else s.material = r(t.materials, this.material)
    if (this.children.length > 0) {
      s.children = []
      for (let o = 0; o < this.children.length; o++)
        s.children.push(this.children[o].toJSON(t).object)
    }
    if (this.animations.length > 0) {
      s.animations = []
      for (let o = 0; o < this.animations.length; o++) {
        const c = this.animations[o]
        s.animations.push(r(t.animations, c))
      }
    }
    if (e) {
      const o = a(t.geometries),
        c = a(t.materials),
        l = a(t.textures),
        u = a(t.images),
        p = a(t.shapes),
        h = a(t.skeletons),
        m = a(t.animations),
        g = a(t.nodes)
      ;(o.length > 0 && (i.geometries = o),
        c.length > 0 && (i.materials = c),
        l.length > 0 && (i.textures = l),
        u.length > 0 && (i.images = u),
        p.length > 0 && (i.shapes = p),
        h.length > 0 && (i.skeletons = h),
        m.length > 0 && (i.animations = m),
        g.length > 0 && (i.nodes = g))
    }
    return ((i.object = s), i)
    function a(o) {
      const c = []
      for (const l in o) {
        const u = o[l]
        ;(delete u.metadata, c.push(u))
      }
      return c
    }
  }
  clone(t) {
    return new this.constructor().copy(this, t)
  }
  copy(t, e = !0) {
    if (
      ((this.name = t.name),
      this.up.copy(t.up),
      this.position.copy(t.position),
      (this.rotation.order = t.rotation.order),
      this.quaternion.copy(t.quaternion),
      this.scale.copy(t.scale),
      (this.pivot = t.pivot !== null ? t.pivot.clone() : null),
      this.matrix.copy(t.matrix),
      this.matrixWorld.copy(t.matrixWorld),
      (this.matrixAutoUpdate = t.matrixAutoUpdate),
      (this.matrixWorldAutoUpdate = t.matrixWorldAutoUpdate),
      (this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate),
      (this.layers.mask = t.layers.mask),
      (this.visible = t.visible),
      (this.castShadow = t.castShadow),
      (this.receiveShadow = t.receiveShadow),
      (this.frustumCulled = t.frustumCulled),
      (this.renderOrder = t.renderOrder),
      (this.static = t.static),
      (this.animations = t.animations.slice()),
      (this.userData = JSON.parse(JSON.stringify(t.userData))),
      e === !0)
    )
      for (let i = 0; i < t.children.length; i++) {
        const s = t.children[i]
        this.add(s.clone())
      }
    return this
  }
}
ye.DEFAULT_UP = new D(0, 1, 0)
ye.DEFAULT_MATRIX_AUTO_UPDATE = !0
ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0
class ie extends ye {
  constructor() {
    ;(super(), (this.isGroup = !0), (this.type = 'Group'))
  }
}
const Vu = { type: 'move' }
class zr {
  constructor() {
    ;((this._targetRay = null), (this._grip = null), (this._hand = null))
  }
  getHandSpace() {
    return (
      this._hand === null &&
        ((this._hand = new ie()),
        (this._hand.matrixAutoUpdate = !1),
        (this._hand.visible = !1),
        (this._hand.joints = {}),
        (this._hand.inputState = { pinching: !1 })),
      this._hand
    )
  }
  getTargetRaySpace() {
    return (
      this._targetRay === null &&
        ((this._targetRay = new ie()),
        (this._targetRay.matrixAutoUpdate = !1),
        (this._targetRay.visible = !1),
        (this._targetRay.hasLinearVelocity = !1),
        (this._targetRay.linearVelocity = new D()),
        (this._targetRay.hasAngularVelocity = !1),
        (this._targetRay.angularVelocity = new D())),
      this._targetRay
    )
  }
  getGripSpace() {
    return (
      this._grip === null &&
        ((this._grip = new ie()),
        (this._grip.matrixAutoUpdate = !1),
        (this._grip.visible = !1),
        (this._grip.hasLinearVelocity = !1),
        (this._grip.linearVelocity = new D()),
        (this._grip.hasAngularVelocity = !1),
        (this._grip.angularVelocity = new D()),
        (this._grip.eventsEnabled = !1)),
      this._grip
    )
  }
  dispatchEvent(t) {
    return (
      this._targetRay !== null && this._targetRay.dispatchEvent(t),
      this._grip !== null && this._grip.dispatchEvent(t),
      this._hand !== null && this._hand.dispatchEvent(t),
      this
    )
  }
  connect(t) {
    if (t && t.hand) {
      const e = this._hand
      if (e) for (const i of t.hand.values()) this._getHandJoint(e, i)
    }
    return (this.dispatchEvent({ type: 'connected', data: t }), this)
  }
  disconnect(t) {
    return (
      this.dispatchEvent({ type: 'disconnected', data: t }),
      this._targetRay !== null && (this._targetRay.visible = !1),
      this._grip !== null && (this._grip.visible = !1),
      this._hand !== null && (this._hand.visible = !1),
      this
    )
  }
  update(t, e, i) {
    let s = null,
      r = null,
      a = null
    const o = this._targetRay,
      c = this._grip,
      l = this._hand
    if (t && e.session.visibilityState !== 'visible-blurred') {
      if (l && t.hand) {
        a = !0
        for (const v of t.hand.values()) {
          const f = e.getJointPose(v, i),
            d = this._getHandJoint(l, v)
          ;(f !== null &&
            (d.matrix.fromArray(f.transform.matrix),
            d.matrix.decompose(d.position, d.rotation, d.scale),
            (d.matrixWorldNeedsUpdate = !0),
            (d.jointRadius = f.radius)),
            (d.visible = f !== null))
        }
        const u = l.joints['index-finger-tip'],
          p = l.joints['thumb-tip'],
          h = u.position.distanceTo(p.position),
          m = 0.02,
          g = 0.005
        l.inputState.pinching && h > m + g
          ? ((l.inputState.pinching = !1),
            this.dispatchEvent({
              type: 'pinchend',
              handedness: t.handedness,
              target: this,
            }))
          : !l.inputState.pinching &&
            h <= m - g &&
            ((l.inputState.pinching = !0),
            this.dispatchEvent({
              type: 'pinchstart',
              handedness: t.handedness,
              target: this,
            }))
      } else
        c !== null &&
          t.gripSpace &&
          ((r = e.getPose(t.gripSpace, i)),
          r !== null &&
            (c.matrix.fromArray(r.transform.matrix),
            c.matrix.decompose(c.position, c.rotation, c.scale),
            (c.matrixWorldNeedsUpdate = !0),
            r.linearVelocity
              ? ((c.hasLinearVelocity = !0),
                c.linearVelocity.copy(r.linearVelocity))
              : (c.hasLinearVelocity = !1),
            r.angularVelocity
              ? ((c.hasAngularVelocity = !0),
                c.angularVelocity.copy(r.angularVelocity))
              : (c.hasAngularVelocity = !1),
            c.eventsEnabled &&
              c.dispatchEvent({ type: 'gripUpdated', data: t, target: this })))
      o !== null &&
        ((s = e.getPose(t.targetRaySpace, i)),
        s === null && r !== null && (s = r),
        s !== null &&
          (o.matrix.fromArray(s.transform.matrix),
          o.matrix.decompose(o.position, o.rotation, o.scale),
          (o.matrixWorldNeedsUpdate = !0),
          s.linearVelocity
            ? ((o.hasLinearVelocity = !0),
              o.linearVelocity.copy(s.linearVelocity))
            : (o.hasLinearVelocity = !1),
          s.angularVelocity
            ? ((o.hasAngularVelocity = !0),
              o.angularVelocity.copy(s.angularVelocity))
            : (o.hasAngularVelocity = !1),
          this.dispatchEvent(Vu)))
    }
    return (
      o !== null && (o.visible = s !== null),
      c !== null && (c.visible = r !== null),
      l !== null && (l.visible = a !== null),
      this
    )
  }
  _getHandJoint(t, e) {
    if (t.joints[e.jointName] === void 0) {
      const i = new ie()
      ;((i.matrixAutoUpdate = !1),
        (i.visible = !1),
        (t.joints[e.jointName] = i),
        t.add(i))
    }
    return t.joints[e.jointName]
  }
}
const Wc = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  },
  $n = { h: 0, s: 0, l: 0 },
  Ts = { h: 0, s: 0, l: 0 }
function kr(n, t, e) {
  return (
    e < 0 && (e += 1),
    e > 1 && (e -= 1),
    e < 1 / 6
      ? n + (t - n) * 6 * e
      : e < 1 / 2
        ? t
        : e < 2 / 3
          ? n + (t - n) * 6 * (2 / 3 - e)
          : n
  )
}
class Ot {
  constructor(t, e, i) {
    return (
      (this.isColor = !0),
      (this.r = 1),
      (this.g = 1),
      (this.b = 1),
      this.set(t, e, i)
    )
  }
  set(t, e, i) {
    if (e === void 0 && i === void 0) {
      const s = t
      s && s.isColor
        ? this.copy(s)
        : typeof s == 'number'
          ? this.setHex(s)
          : typeof s == 'string' && this.setStyle(s)
    } else this.setRGB(t, e, i)
    return this
  }
  setScalar(t) {
    return ((this.r = t), (this.g = t), (this.b = t), this)
  }
  setHex(t, e = Ke) {
    return (
      (t = Math.floor(t)),
      (this.r = ((t >> 16) & 255) / 255),
      (this.g = ((t >> 8) & 255) / 255),
      (this.b = (t & 255) / 255),
      $t.colorSpaceToWorking(this, e),
      this
    )
  }
  setRGB(t, e, i, s = $t.workingColorSpace) {
    return (
      (this.r = t),
      (this.g = e),
      (this.b = i),
      $t.colorSpaceToWorking(this, s),
      this
    )
  }
  setHSL(t, e, i, s = $t.workingColorSpace) {
    if (((t = Co(t, 1)), (e = qt(e, 0, 1)), (i = qt(i, 0, 1)), e === 0))
      this.r = this.g = this.b = i
    else {
      const r = i <= 0.5 ? i * (1 + e) : i + e - i * e,
        a = 2 * i - r
      ;((this.r = kr(a, r, t + 1 / 3)),
        (this.g = kr(a, r, t)),
        (this.b = kr(a, r, t - 1 / 3)))
    }
    return ($t.colorSpaceToWorking(this, s), this)
  }
  setStyle(t, e = Ke) {
    function i(r) {
      r !== void 0 &&
        parseFloat(r) < 1 &&
        Dt('Color: Alpha component of ' + t + ' will be ignored.')
    }
    let s
    if ((s = /^(\w+)\(([^\)]*)\)/.exec(t))) {
      let r
      const a = s[1],
        o = s[2]
      switch (a) {
        case 'rgb':
        case 'rgba':
          if (
            (r =
              /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                o
              ))
          )
            return (
              i(r[4]),
              this.setRGB(
                Math.min(255, parseInt(r[1], 10)) / 255,
                Math.min(255, parseInt(r[2], 10)) / 255,
                Math.min(255, parseInt(r[3], 10)) / 255,
                e
              )
            )
          if (
            (r =
              /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                o
              ))
          )
            return (
              i(r[4]),
              this.setRGB(
                Math.min(100, parseInt(r[1], 10)) / 100,
                Math.min(100, parseInt(r[2], 10)) / 100,
                Math.min(100, parseInt(r[3], 10)) / 100,
                e
              )
            )
          break
        case 'hsl':
        case 'hsla':
          if (
            (r =
              /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                o
              ))
          )
            return (
              i(r[4]),
              this.setHSL(
                parseFloat(r[1]) / 360,
                parseFloat(r[2]) / 100,
                parseFloat(r[3]) / 100,
                e
              )
            )
          break
        default:
          Dt('Color: Unknown color model ' + t)
      }
    } else if ((s = /^\#([A-Fa-f\d]+)$/.exec(t))) {
      const r = s[1],
        a = r.length
      if (a === 3)
        return this.setRGB(
          parseInt(r.charAt(0), 16) / 15,
          parseInt(r.charAt(1), 16) / 15,
          parseInt(r.charAt(2), 16) / 15,
          e
        )
      if (a === 6) return this.setHex(parseInt(r, 16), e)
      Dt('Color: Invalid hex color ' + t)
    } else if (t && t.length > 0) return this.setColorName(t, e)
    return this
  }
  setColorName(t, e = Ke) {
    const i = Wc[t.toLowerCase()]
    return (
      i !== void 0 ? this.setHex(i, e) : Dt('Color: Unknown color ' + t),
      this
    )
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b)
  }
  copy(t) {
    return ((this.r = t.r), (this.g = t.g), (this.b = t.b), this)
  }
  copySRGBToLinear(t) {
    return ((this.r = Gn(t.r)), (this.g = Gn(t.g)), (this.b = Gn(t.b)), this)
  }
  copyLinearToSRGB(t) {
    return ((this.r = Wi(t.r)), (this.g = Wi(t.g)), (this.b = Wi(t.b)), this)
  }
  convertSRGBToLinear() {
    return (this.copySRGBToLinear(this), this)
  }
  convertLinearToSRGB() {
    return (this.copyLinearToSRGB(this), this)
  }
  getHex(t = Ke) {
    return (
      $t.workingToColorSpace(ke.copy(this), t),
      Math.round(qt(ke.r * 255, 0, 255)) * 65536 +
        Math.round(qt(ke.g * 255, 0, 255)) * 256 +
        Math.round(qt(ke.b * 255, 0, 255))
    )
  }
  getHexString(t = Ke) {
    return ('000000' + this.getHex(t).toString(16)).slice(-6)
  }
  getHSL(t, e = $t.workingColorSpace) {
    $t.workingToColorSpace(ke.copy(this), e)
    const i = ke.r,
      s = ke.g,
      r = ke.b,
      a = Math.max(i, s, r),
      o = Math.min(i, s, r)
    let c, l
    const u = (o + a) / 2
    if (o === a) ((c = 0), (l = 0))
    else {
      const p = a - o
      switch (((l = u <= 0.5 ? p / (a + o) : p / (2 - a - o)), a)) {
        case i:
          c = (s - r) / p + (s < r ? 6 : 0)
          break
        case s:
          c = (r - i) / p + 2
          break
        case r:
          c = (i - s) / p + 4
          break
      }
      c /= 6
    }
    return ((t.h = c), (t.s = l), (t.l = u), t)
  }
  getRGB(t, e = $t.workingColorSpace) {
    return (
      $t.workingToColorSpace(ke.copy(this), e),
      (t.r = ke.r),
      (t.g = ke.g),
      (t.b = ke.b),
      t
    )
  }
  getStyle(t = Ke) {
    $t.workingToColorSpace(ke.copy(this), t)
    const e = ke.r,
      i = ke.g,
      s = ke.b
    return t !== Ke
      ? `color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`
      : `rgb(${Math.round(e * 255)},${Math.round(i * 255)},${Math.round(s * 255)})`
  }
  offsetHSL(t, e, i) {
    return (this.getHSL($n), this.setHSL($n.h + t, $n.s + e, $n.l + i))
  }
  add(t) {
    return ((this.r += t.r), (this.g += t.g), (this.b += t.b), this)
  }
  addColors(t, e) {
    return (
      (this.r = t.r + e.r),
      (this.g = t.g + e.g),
      (this.b = t.b + e.b),
      this
    )
  }
  addScalar(t) {
    return ((this.r += t), (this.g += t), (this.b += t), this)
  }
  sub(t) {
    return (
      (this.r = Math.max(0, this.r - t.r)),
      (this.g = Math.max(0, this.g - t.g)),
      (this.b = Math.max(0, this.b - t.b)),
      this
    )
  }
  multiply(t) {
    return ((this.r *= t.r), (this.g *= t.g), (this.b *= t.b), this)
  }
  multiplyScalar(t) {
    return ((this.r *= t), (this.g *= t), (this.b *= t), this)
  }
  lerp(t, e) {
    return (
      (this.r += (t.r - this.r) * e),
      (this.g += (t.g - this.g) * e),
      (this.b += (t.b - this.b) * e),
      this
    )
  }
  lerpColors(t, e, i) {
    return (
      (this.r = t.r + (e.r - t.r) * i),
      (this.g = t.g + (e.g - t.g) * i),
      (this.b = t.b + (e.b - t.b) * i),
      this
    )
  }
  lerpHSL(t, e) {
    ;(this.getHSL($n), t.getHSL(Ts))
    const i = ps($n.h, Ts.h, e),
      s = ps($n.s, Ts.s, e),
      r = ps($n.l, Ts.l, e)
    return (this.setHSL(i, s, r), this)
  }
  setFromVector3(t) {
    return ((this.r = t.x), (this.g = t.y), (this.b = t.z), this)
  }
  applyMatrix3(t) {
    const e = this.r,
      i = this.g,
      s = this.b,
      r = t.elements
    return (
      (this.r = r[0] * e + r[3] * i + r[6] * s),
      (this.g = r[1] * e + r[4] * i + r[7] * s),
      (this.b = r[2] * e + r[5] * i + r[8] * s),
      this
    )
  }
  equals(t) {
    return t.r === this.r && t.g === this.g && t.b === this.b
  }
  fromArray(t, e = 0) {
    return ((this.r = t[e]), (this.g = t[e + 1]), (this.b = t[e + 2]), this)
  }
  toArray(t = [], e = 0) {
    return ((t[e] = this.r), (t[e + 1] = this.g), (t[e + 2] = this.b), t)
  }
  fromBufferAttribute(t, e) {
    return (
      (this.r = t.getX(e)),
      (this.g = t.getY(e)),
      (this.b = t.getZ(e)),
      this
    )
  }
  toJSON() {
    return this.getHex()
  }
  *[Symbol.iterator]() {
    ;(yield this.r, yield this.g, yield this.b)
  }
}
const ke = new Ot()
Ot.NAMES = Wc
class Do {
  constructor(t, e = 1, i = 1e3) {
    ;((this.isFog = !0),
      (this.name = ''),
      (this.color = new Ot(t)),
      (this.near = e),
      (this.far = i))
  }
  clone() {
    return new Do(this.color, this.near, this.far)
  }
  toJSON() {
    return {
      type: 'Fog',
      name: this.name,
      color: this.color.getHex(),
      near: this.near,
      far: this.far,
    }
  }
}
class Xc extends ye {
  constructor() {
    ;(super(),
      (this.isScene = !0),
      (this.type = 'Scene'),
      (this.background = null),
      (this.environment = null),
      (this.fog = null),
      (this.backgroundBlurriness = 0),
      (this.backgroundIntensity = 1),
      (this.backgroundRotation = new Cn()),
      (this.environmentIntensity = 1),
      (this.environmentRotation = new Cn()),
      (this.overrideMaterial = null),
      typeof __THREE_DEVTOOLS__ < 'u' &&
        __THREE_DEVTOOLS__.dispatchEvent(
          new CustomEvent('observe', { detail: this })
        ))
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      t.background !== null && (this.background = t.background.clone()),
      t.environment !== null && (this.environment = t.environment.clone()),
      t.fog !== null && (this.fog = t.fog.clone()),
      (this.backgroundBlurriness = t.backgroundBlurriness),
      (this.backgroundIntensity = t.backgroundIntensity),
      this.backgroundRotation.copy(t.backgroundRotation),
      (this.environmentIntensity = t.environmentIntensity),
      this.environmentRotation.copy(t.environmentRotation),
      t.overrideMaterial !== null &&
        (this.overrideMaterial = t.overrideMaterial.clone()),
      (this.matrixAutoUpdate = t.matrixAutoUpdate),
      this
    )
  }
  toJSON(t) {
    const e = super.toJSON(t)
    return (
      this.fog !== null && (e.object.fog = this.fog.toJSON()),
      this.backgroundBlurriness > 0 &&
        (e.object.backgroundBlurriness = this.backgroundBlurriness),
      this.backgroundIntensity !== 1 &&
        (e.object.backgroundIntensity = this.backgroundIntensity),
      (e.object.backgroundRotation = this.backgroundRotation.toArray()),
      this.environmentIntensity !== 1 &&
        (e.object.environmentIntensity = this.environmentIntensity),
      (e.object.environmentRotation = this.environmentRotation.toArray()),
      e
    )
  }
}
const fn = new D(),
  In = new D(),
  Gr = new D(),
  Un = new D(),
  Ci = new D(),
  Pi = new D(),
  yl = new D(),
  Hr = new D(),
  Vr = new D(),
  Wr = new D(),
  Xr = new xe(),
  qr = new xe(),
  Yr = new xe()
class mn {
  constructor(t = new D(), e = new D(), i = new D()) {
    ;((this.a = t), (this.b = e), (this.c = i))
  }
  static getNormal(t, e, i, s) {
    ;(s.subVectors(i, e), fn.subVectors(t, e), s.cross(fn))
    const r = s.lengthSq()
    return r > 0 ? s.multiplyScalar(1 / Math.sqrt(r)) : s.set(0, 0, 0)
  }
  static getBarycoord(t, e, i, s, r) {
    ;(fn.subVectors(s, e), In.subVectors(i, e), Gr.subVectors(t, e))
    const a = fn.dot(fn),
      o = fn.dot(In),
      c = fn.dot(Gr),
      l = In.dot(In),
      u = In.dot(Gr),
      p = a * l - o * o
    if (p === 0) return (r.set(0, 0, 0), null)
    const h = 1 / p,
      m = (l * c - o * u) * h,
      g = (a * u - o * c) * h
    return r.set(1 - m - g, g, m)
  }
  static containsPoint(t, e, i, s) {
    return this.getBarycoord(t, e, i, s, Un) === null
      ? !1
      : Un.x >= 0 && Un.y >= 0 && Un.x + Un.y <= 1
  }
  static getInterpolation(t, e, i, s, r, a, o, c) {
    return this.getBarycoord(t, e, i, s, Un) === null
      ? ((c.x = 0),
        (c.y = 0),
        'z' in c && (c.z = 0),
        'w' in c && (c.w = 0),
        null)
      : (c.setScalar(0),
        c.addScaledVector(r, Un.x),
        c.addScaledVector(a, Un.y),
        c.addScaledVector(o, Un.z),
        c)
  }
  static getInterpolatedAttribute(t, e, i, s, r, a) {
    return (
      Xr.setScalar(0),
      qr.setScalar(0),
      Yr.setScalar(0),
      Xr.fromBufferAttribute(t, e),
      qr.fromBufferAttribute(t, i),
      Yr.fromBufferAttribute(t, s),
      a.setScalar(0),
      a.addScaledVector(Xr, r.x),
      a.addScaledVector(qr, r.y),
      a.addScaledVector(Yr, r.z),
      a
    )
  }
  static isFrontFacing(t, e, i, s) {
    return (fn.subVectors(i, e), In.subVectors(t, e), fn.cross(In).dot(s) < 0)
  }
  set(t, e, i) {
    return (this.a.copy(t), this.b.copy(e), this.c.copy(i), this)
  }
  setFromPointsAndIndices(t, e, i, s) {
    return (this.a.copy(t[e]), this.b.copy(t[i]), this.c.copy(t[s]), this)
  }
  setFromAttributeAndIndices(t, e, i, s) {
    return (
      this.a.fromBufferAttribute(t, e),
      this.b.fromBufferAttribute(t, i),
      this.c.fromBufferAttribute(t, s),
      this
    )
  }
  clone() {
    return new this.constructor().copy(this)
  }
  copy(t) {
    return (this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this)
  }
  getArea() {
    return (
      fn.subVectors(this.c, this.b),
      In.subVectors(this.a, this.b),
      fn.cross(In).length() * 0.5
    )
  }
  getMidpoint(t) {
    return t
      .addVectors(this.a, this.b)
      .add(this.c)
      .multiplyScalar(1 / 3)
  }
  getNormal(t) {
    return mn.getNormal(this.a, this.b, this.c, t)
  }
  getPlane(t) {
    return t.setFromCoplanarPoints(this.a, this.b, this.c)
  }
  getBarycoord(t, e) {
    return mn.getBarycoord(t, this.a, this.b, this.c, e)
  }
  getInterpolation(t, e, i, s, r) {
    return mn.getInterpolation(t, this.a, this.b, this.c, e, i, s, r)
  }
  containsPoint(t) {
    return mn.containsPoint(t, this.a, this.b, this.c)
  }
  isFrontFacing(t) {
    return mn.isFrontFacing(this.a, this.b, this.c, t)
  }
  intersectsBox(t) {
    return t.intersectsTriangle(this)
  }
  closestPointToPoint(t, e) {
    const i = this.a,
      s = this.b,
      r = this.c
    let a, o
    ;(Ci.subVectors(s, i), Pi.subVectors(r, i), Hr.subVectors(t, i))
    const c = Ci.dot(Hr),
      l = Pi.dot(Hr)
    if (c <= 0 && l <= 0) return e.copy(i)
    Vr.subVectors(t, s)
    const u = Ci.dot(Vr),
      p = Pi.dot(Vr)
    if (u >= 0 && p <= u) return e.copy(s)
    const h = c * p - u * l
    if (h <= 0 && c >= 0 && u <= 0)
      return ((a = c / (c - u)), e.copy(i).addScaledVector(Ci, a))
    Wr.subVectors(t, r)
    const m = Ci.dot(Wr),
      g = Pi.dot(Wr)
    if (g >= 0 && m <= g) return e.copy(r)
    const v = m * l - c * g
    if (v <= 0 && l >= 0 && g <= 0)
      return ((o = l / (l - g)), e.copy(i).addScaledVector(Pi, o))
    const f = u * g - m * p
    if (f <= 0 && p - u >= 0 && m - g >= 0)
      return (
        yl.subVectors(r, s),
        (o = (p - u) / (p - u + (m - g))),
        e.copy(s).addScaledVector(yl, o)
      )
    const d = 1 / (f + v + h)
    return (
      (a = v * d),
      (o = h * d),
      e.copy(i).addScaledVector(Ci, a).addScaledVector(Pi, o)
    )
  }
  equals(t) {
    return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c)
  }
}
class xn {
  constructor(
    t = new D(1 / 0, 1 / 0, 1 / 0),
    e = new D(-1 / 0, -1 / 0, -1 / 0)
  ) {
    ;((this.isBox3 = !0), (this.min = t), (this.max = e))
  }
  set(t, e) {
    return (this.min.copy(t), this.max.copy(e), this)
  }
  setFromArray(t) {
    this.makeEmpty()
    for (let e = 0, i = t.length; e < i; e += 3)
      this.expandByPoint(pn.fromArray(t, e))
    return this
  }
  setFromBufferAttribute(t) {
    this.makeEmpty()
    for (let e = 0, i = t.count; e < i; e++)
      this.expandByPoint(pn.fromBufferAttribute(t, e))
    return this
  }
  setFromPoints(t) {
    this.makeEmpty()
    for (let e = 0, i = t.length; e < i; e++) this.expandByPoint(t[e])
    return this
  }
  setFromCenterAndSize(t, e) {
    const i = pn.copy(e).multiplyScalar(0.5)
    return (this.min.copy(t).sub(i), this.max.copy(t).add(i), this)
  }
  setFromObject(t, e = !1) {
    return (this.makeEmpty(), this.expandByObject(t, e))
  }
  clone() {
    return new this.constructor().copy(this)
  }
  copy(t) {
    return (this.min.copy(t.min), this.max.copy(t.max), this)
  }
  makeEmpty() {
    return (
      (this.min.x = this.min.y = this.min.z = 1 / 0),
      (this.max.x = this.max.y = this.max.z = -1 / 0),
      this
    )
  }
  isEmpty() {
    return (
      this.max.x < this.min.x ||
      this.max.y < this.min.y ||
      this.max.z < this.min.z
    )
  }
  getCenter(t) {
    return this.isEmpty()
      ? t.set(0, 0, 0)
      : t.addVectors(this.min, this.max).multiplyScalar(0.5)
  }
  getSize(t) {
    return this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min)
  }
  expandByPoint(t) {
    return (this.min.min(t), this.max.max(t), this)
  }
  expandByVector(t) {
    return (this.min.sub(t), this.max.add(t), this)
  }
  expandByScalar(t) {
    return (this.min.addScalar(-t), this.max.addScalar(t), this)
  }
  expandByObject(t, e = !1) {
    t.updateWorldMatrix(!1, !1)
    const i = t.geometry
    if (i !== void 0) {
      const r = i.getAttribute('position')
      if (e === !0 && r !== void 0 && t.isInstancedMesh !== !0)
        for (let a = 0, o = r.count; a < o; a++)
          (t.isMesh === !0
            ? t.getVertexPosition(a, pn)
            : pn.fromBufferAttribute(r, a),
            pn.applyMatrix4(t.matrixWorld),
            this.expandByPoint(pn))
      else
        (t.boundingBox !== void 0
          ? (t.boundingBox === null && t.computeBoundingBox(),
            ws.copy(t.boundingBox))
          : (i.boundingBox === null && i.computeBoundingBox(),
            ws.copy(i.boundingBox)),
          ws.applyMatrix4(t.matrixWorld),
          this.union(ws))
    }
    const s = t.children
    for (let r = 0, a = s.length; r < a; r++) this.expandByObject(s[r], e)
    return this
  }
  containsPoint(t) {
    return (
      t.x >= this.min.x &&
      t.x <= this.max.x &&
      t.y >= this.min.y &&
      t.y <= this.max.y &&
      t.z >= this.min.z &&
      t.z <= this.max.z
    )
  }
  containsBox(t) {
    return (
      this.min.x <= t.min.x &&
      t.max.x <= this.max.x &&
      this.min.y <= t.min.y &&
      t.max.y <= this.max.y &&
      this.min.z <= t.min.z &&
      t.max.z <= this.max.z
    )
  }
  getParameter(t, e) {
    return e.set(
      (t.x - this.min.x) / (this.max.x - this.min.x),
      (t.y - this.min.y) / (this.max.y - this.min.y),
      (t.z - this.min.z) / (this.max.z - this.min.z)
    )
  }
  intersectsBox(t) {
    return (
      t.max.x >= this.min.x &&
      t.min.x <= this.max.x &&
      t.max.y >= this.min.y &&
      t.min.y <= this.max.y &&
      t.max.z >= this.min.z &&
      t.min.z <= this.max.z
    )
  }
  intersectsSphere(t) {
    return (
      this.clampPoint(t.center, pn),
      pn.distanceToSquared(t.center) <= t.radius * t.radius
    )
  }
  intersectsPlane(t) {
    let e, i
    return (
      t.normal.x > 0
        ? ((e = t.normal.x * this.min.x), (i = t.normal.x * this.max.x))
        : ((e = t.normal.x * this.max.x), (i = t.normal.x * this.min.x)),
      t.normal.y > 0
        ? ((e += t.normal.y * this.min.y), (i += t.normal.y * this.max.y))
        : ((e += t.normal.y * this.max.y), (i += t.normal.y * this.min.y)),
      t.normal.z > 0
        ? ((e += t.normal.z * this.min.z), (i += t.normal.z * this.max.z))
        : ((e += t.normal.z * this.max.z), (i += t.normal.z * this.min.z)),
      e <= -t.constant && i >= -t.constant
    )
  }
  intersectsTriangle(t) {
    if (this.isEmpty()) return !1
    ;(this.getCenter(ts),
      As.subVectors(this.max, ts),
      Li.subVectors(t.a, ts),
      Di.subVectors(t.b, ts),
      Ii.subVectors(t.c, ts),
      Zn.subVectors(Di, Li),
      Jn.subVectors(Ii, Di),
      hi.subVectors(Li, Ii))
    let e = [
      0,
      -Zn.z,
      Zn.y,
      0,
      -Jn.z,
      Jn.y,
      0,
      -hi.z,
      hi.y,
      Zn.z,
      0,
      -Zn.x,
      Jn.z,
      0,
      -Jn.x,
      hi.z,
      0,
      -hi.x,
      -Zn.y,
      Zn.x,
      0,
      -Jn.y,
      Jn.x,
      0,
      -hi.y,
      hi.x,
      0,
    ]
    return !jr(e, Li, Di, Ii, As) ||
      ((e = [1, 0, 0, 0, 1, 0, 0, 0, 1]), !jr(e, Li, Di, Ii, As))
      ? !1
      : (Rs.crossVectors(Zn, Jn),
        (e = [Rs.x, Rs.y, Rs.z]),
        jr(e, Li, Di, Ii, As))
  }
  clampPoint(t, e) {
    return e.copy(t).clamp(this.min, this.max)
  }
  distanceToPoint(t) {
    return this.clampPoint(t, pn).distanceTo(t)
  }
  getBoundingSphere(t) {
    return (
      this.isEmpty()
        ? t.makeEmpty()
        : (this.getCenter(t.center),
          (t.radius = this.getSize(pn).length() * 0.5)),
      t
    )
  }
  intersect(t) {
    return (
      this.min.max(t.min),
      this.max.min(t.max),
      this.isEmpty() && this.makeEmpty(),
      this
    )
  }
  union(t) {
    return (this.min.min(t.min), this.max.max(t.max), this)
  }
  applyMatrix4(t) {
    return this.isEmpty()
      ? this
      : (Nn[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t),
        Nn[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t),
        Nn[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t),
        Nn[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t),
        Nn[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t),
        Nn[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t),
        Nn[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t),
        Nn[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t),
        this.setFromPoints(Nn),
        this)
  }
  translate(t) {
    return (this.min.add(t), this.max.add(t), this)
  }
  equals(t) {
    return t.min.equals(this.min) && t.max.equals(this.max)
  }
  toJSON() {
    return { min: this.min.toArray(), max: this.max.toArray() }
  }
  fromJSON(t) {
    return (this.min.fromArray(t.min), this.max.fromArray(t.max), this)
  }
}
const Nn = [
    new D(),
    new D(),
    new D(),
    new D(),
    new D(),
    new D(),
    new D(),
    new D(),
  ],
  pn = new D(),
  ws = new xn(),
  Li = new D(),
  Di = new D(),
  Ii = new D(),
  Zn = new D(),
  Jn = new D(),
  hi = new D(),
  ts = new D(),
  As = new D(),
  Rs = new D(),
  ui = new D()
function jr(n, t, e, i, s) {
  for (let r = 0, a = n.length - 3; r <= a; r += 3) {
    ui.fromArray(n, r)
    const o =
        s.x * Math.abs(ui.x) + s.y * Math.abs(ui.y) + s.z * Math.abs(ui.z),
      c = t.dot(ui),
      l = e.dot(ui),
      u = i.dot(ui)
    if (Math.max(-Math.max(c, l, u), Math.min(c, l, u)) > o) return !1
  }
  return !0
}
const Ee = new D(),
  Cs = new Nt()
let Wu = 0
class un extends li {
  constructor(t, e, i = !1) {
    if ((super(), Array.isArray(t)))
      throw new TypeError(
        'THREE.BufferAttribute: array should be a Typed Array.'
      )
    ;((this.isBufferAttribute = !0),
      Object.defineProperty(this, 'id', { value: Wu++ }),
      (this.name = ''),
      (this.array = t),
      (this.itemSize = e),
      (this.count = t !== void 0 ? t.length / e : 0),
      (this.normalized = i),
      (this.usage = ol),
      (this.updateRanges = []),
      (this.gpuType = gn),
      (this.version = 0))
  }
  onUploadCallback() {}
  set needsUpdate(t) {
    t === !0 && this.version++
  }
  setUsage(t) {
    return ((this.usage = t), this)
  }
  addUpdateRange(t, e) {
    this.updateRanges.push({ start: t, count: e })
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0
  }
  copy(t) {
    return (
      (this.name = t.name),
      (this.array = new t.array.constructor(t.array)),
      (this.itemSize = t.itemSize),
      (this.count = t.count),
      (this.normalized = t.normalized),
      (this.usage = t.usage),
      (this.gpuType = t.gpuType),
      this
    )
  }
  copyAt(t, e, i) {
    ;((t *= this.itemSize), (i *= e.itemSize))
    for (let s = 0, r = this.itemSize; s < r; s++)
      this.array[t + s] = e.array[i + s]
    return this
  }
  copyArray(t) {
    return (this.array.set(t), this)
  }
  applyMatrix3(t) {
    if (this.itemSize === 2)
      for (let e = 0, i = this.count; e < i; e++)
        (Cs.fromBufferAttribute(this, e),
          Cs.applyMatrix3(t),
          this.setXY(e, Cs.x, Cs.y))
    else if (this.itemSize === 3)
      for (let e = 0, i = this.count; e < i; e++)
        (Ee.fromBufferAttribute(this, e),
          Ee.applyMatrix3(t),
          this.setXYZ(e, Ee.x, Ee.y, Ee.z))
    return this
  }
  applyMatrix4(t) {
    for (let e = 0, i = this.count; e < i; e++)
      (Ee.fromBufferAttribute(this, e),
        Ee.applyMatrix4(t),
        this.setXYZ(e, Ee.x, Ee.y, Ee.z))
    return this
  }
  applyNormalMatrix(t) {
    for (let e = 0, i = this.count; e < i; e++)
      (Ee.fromBufferAttribute(this, e),
        Ee.applyNormalMatrix(t),
        this.setXYZ(e, Ee.x, Ee.y, Ee.z))
    return this
  }
  transformDirection(t) {
    for (let e = 0, i = this.count; e < i; e++)
      (Ee.fromBufferAttribute(this, e),
        Ee.transformDirection(t),
        this.setXYZ(e, Ee.x, Ee.y, Ee.z))
    return this
  }
  set(t, e = 0) {
    return (this.array.set(t, e), this)
  }
  getComponent(t, e) {
    let i = this.array[t * this.itemSize + e]
    return (this.normalized && (i = Gi(i, this.array)), i)
  }
  setComponent(t, e, i) {
    return (
      this.normalized && (i = We(i, this.array)),
      (this.array[t * this.itemSize + e] = i),
      this
    )
  }
  getX(t) {
    let e = this.array[t * this.itemSize]
    return (this.normalized && (e = Gi(e, this.array)), e)
  }
  setX(t, e) {
    return (
      this.normalized && (e = We(e, this.array)),
      (this.array[t * this.itemSize] = e),
      this
    )
  }
  getY(t) {
    let e = this.array[t * this.itemSize + 1]
    return (this.normalized && (e = Gi(e, this.array)), e)
  }
  setY(t, e) {
    return (
      this.normalized && (e = We(e, this.array)),
      (this.array[t * this.itemSize + 1] = e),
      this
    )
  }
  getZ(t) {
    let e = this.array[t * this.itemSize + 2]
    return (this.normalized && (e = Gi(e, this.array)), e)
  }
  setZ(t, e) {
    return (
      this.normalized && (e = We(e, this.array)),
      (this.array[t * this.itemSize + 2] = e),
      this
    )
  }
  getW(t) {
    let e = this.array[t * this.itemSize + 3]
    return (this.normalized && (e = Gi(e, this.array)), e)
  }
  setW(t, e) {
    return (
      this.normalized && (e = We(e, this.array)),
      (this.array[t * this.itemSize + 3] = e),
      this
    )
  }
  setXY(t, e, i) {
    return (
      (t *= this.itemSize),
      this.normalized && ((e = We(e, this.array)), (i = We(i, this.array))),
      (this.array[t + 0] = e),
      (this.array[t + 1] = i),
      this
    )
  }
  setXYZ(t, e, i, s) {
    return (
      (t *= this.itemSize),
      this.normalized &&
        ((e = We(e, this.array)),
        (i = We(i, this.array)),
        (s = We(s, this.array))),
      (this.array[t + 0] = e),
      (this.array[t + 1] = i),
      (this.array[t + 2] = s),
      this
    )
  }
  setXYZW(t, e, i, s, r) {
    return (
      (t *= this.itemSize),
      this.normalized &&
        ((e = We(e, this.array)),
        (i = We(i, this.array)),
        (s = We(s, this.array)),
        (r = We(r, this.array))),
      (this.array[t + 0] = e),
      (this.array[t + 1] = i),
      (this.array[t + 2] = s),
      (this.array[t + 3] = r),
      this
    )
  }
  onUpload(t) {
    return ((this.onUploadCallback = t), this)
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this)
  }
  toJSON() {
    const t = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized,
    }
    return (
      this.name !== '' && (t.name = this.name),
      this.usage !== ol && (t.usage = this.usage),
      t
    )
  }
  dispose() {
    this.dispatchEvent({ type: 'dispose' })
  }
}
class qc extends un {
  constructor(t, e, i) {
    super(new Uint16Array(t), e, i)
  }
}
class Yc extends un {
  constructor(t, e, i) {
    super(new Uint32Array(t), e, i)
  }
}
class be extends un {
  constructor(t, e, i) {
    super(new Float32Array(t), e, i)
  }
}
const Xu = new xn(),
  es = new D(),
  Kr = new D()
class Zi {
  constructor(t = new D(), e = -1) {
    ;((this.isSphere = !0), (this.center = t), (this.radius = e))
  }
  set(t, e) {
    return (this.center.copy(t), (this.radius = e), this)
  }
  setFromPoints(t, e) {
    const i = this.center
    e !== void 0 ? i.copy(e) : Xu.setFromPoints(t).getCenter(i)
    let s = 0
    for (let r = 0, a = t.length; r < a; r++)
      s = Math.max(s, i.distanceToSquared(t[r]))
    return ((this.radius = Math.sqrt(s)), this)
  }
  copy(t) {
    return (this.center.copy(t.center), (this.radius = t.radius), this)
  }
  isEmpty() {
    return this.radius < 0
  }
  makeEmpty() {
    return (this.center.set(0, 0, 0), (this.radius = -1), this)
  }
  containsPoint(t) {
    return t.distanceToSquared(this.center) <= this.radius * this.radius
  }
  distanceToPoint(t) {
    return t.distanceTo(this.center) - this.radius
  }
  intersectsSphere(t) {
    const e = this.radius + t.radius
    return t.center.distanceToSquared(this.center) <= e * e
  }
  intersectsBox(t) {
    return t.intersectsSphere(this)
  }
  intersectsPlane(t) {
    return Math.abs(t.distanceToPoint(this.center)) <= this.radius
  }
  clampPoint(t, e) {
    const i = this.center.distanceToSquared(t)
    return (
      e.copy(t),
      i > this.radius * this.radius &&
        (e.sub(this.center).normalize(),
        e.multiplyScalar(this.radius).add(this.center)),
      e
    )
  }
  getBoundingBox(t) {
    return this.isEmpty()
      ? (t.makeEmpty(), t)
      : (t.set(this.center, this.center), t.expandByScalar(this.radius), t)
  }
  applyMatrix4(t) {
    return (
      this.center.applyMatrix4(t),
      (this.radius = this.radius * t.getMaxScaleOnAxis()),
      this
    )
  }
  translate(t) {
    return (this.center.add(t), this)
  }
  expandByPoint(t) {
    if (this.isEmpty()) return (this.center.copy(t), (this.radius = 0), this)
    es.subVectors(t, this.center)
    const e = es.lengthSq()
    if (e > this.radius * this.radius) {
      const i = Math.sqrt(e),
        s = (i - this.radius) * 0.5
      ;(this.center.addScaledVector(es, s / i), (this.radius += s))
    }
    return this
  }
  union(t) {
    return t.isEmpty()
      ? this
      : this.isEmpty()
        ? (this.copy(t), this)
        : (this.center.equals(t.center) === !0
            ? (this.radius = Math.max(this.radius, t.radius))
            : (Kr.subVectors(t.center, this.center).setLength(t.radius),
              this.expandByPoint(es.copy(t.center).add(Kr)),
              this.expandByPoint(es.copy(t.center).sub(Kr))),
          this)
  }
  equals(t) {
    return t.center.equals(this.center) && t.radius === this.radius
  }
  clone() {
    return new this.constructor().copy(this)
  }
  toJSON() {
    return { radius: this.radius, center: this.center.toArray() }
  }
  fromJSON(t) {
    return ((this.radius = t.radius), this.center.fromArray(t.center), this)
  }
}
let qu = 0
const hn = new le(),
  $r = new ye(),
  Ui = new D(),
  en = new xn(),
  ns = new xn(),
  Ie = new D()
class Ye extends li {
  constructor() {
    ;(super(),
      (this.isBufferGeometry = !0),
      Object.defineProperty(this, 'id', { value: qu++ }),
      (this.uuid = $i()),
      (this.name = ''),
      (this.type = 'BufferGeometry'),
      (this.index = null),
      (this.indirect = null),
      (this.indirectOffset = 0),
      (this.attributes = {}),
      (this.morphAttributes = {}),
      (this.morphTargetsRelative = !1),
      (this.groups = []),
      (this.boundingBox = null),
      (this.boundingSphere = null),
      (this.drawRange = { start: 0, count: 1 / 0 }),
      (this.userData = {}))
  }
  getIndex() {
    return this.index
  }
  setIndex(t) {
    return (
      Array.isArray(t)
        ? (this.index = new (uu(t) ? Yc : qc)(t, 1))
        : (this.index = t),
      this
    )
  }
  setIndirect(t, e = 0) {
    return ((this.indirect = t), (this.indirectOffset = e), this)
  }
  getIndirect() {
    return this.indirect
  }
  getAttribute(t) {
    return this.attributes[t]
  }
  setAttribute(t, e) {
    return ((this.attributes[t] = e), this)
  }
  deleteAttribute(t) {
    return (delete this.attributes[t], this)
  }
  hasAttribute(t) {
    return this.attributes[t] !== void 0
  }
  addGroup(t, e, i = 0) {
    this.groups.push({ start: t, count: e, materialIndex: i })
  }
  clearGroups() {
    this.groups = []
  }
  setDrawRange(t, e) {
    ;((this.drawRange.start = t), (this.drawRange.count = e))
  }
  applyMatrix4(t) {
    const e = this.attributes.position
    e !== void 0 && (e.applyMatrix4(t), (e.needsUpdate = !0))
    const i = this.attributes.normal
    if (i !== void 0) {
      const r = new zt().getNormalMatrix(t)
      ;(i.applyNormalMatrix(r), (i.needsUpdate = !0))
    }
    const s = this.attributes.tangent
    return (
      s !== void 0 && (s.transformDirection(t), (s.needsUpdate = !0)),
      this.boundingBox !== null && this.computeBoundingBox(),
      this.boundingSphere !== null && this.computeBoundingSphere(),
      this
    )
  }
  applyQuaternion(t) {
    return (hn.makeRotationFromQuaternion(t), this.applyMatrix4(hn), this)
  }
  rotateX(t) {
    return (hn.makeRotationX(t), this.applyMatrix4(hn), this)
  }
  rotateY(t) {
    return (hn.makeRotationY(t), this.applyMatrix4(hn), this)
  }
  rotateZ(t) {
    return (hn.makeRotationZ(t), this.applyMatrix4(hn), this)
  }
  translate(t, e, i) {
    return (hn.makeTranslation(t, e, i), this.applyMatrix4(hn), this)
  }
  scale(t, e, i) {
    return (hn.makeScale(t, e, i), this.applyMatrix4(hn), this)
  }
  lookAt(t) {
    return ($r.lookAt(t), $r.updateMatrix(), this.applyMatrix4($r.matrix), this)
  }
  center() {
    return (
      this.computeBoundingBox(),
      this.boundingBox.getCenter(Ui).negate(),
      this.translate(Ui.x, Ui.y, Ui.z),
      this
    )
  }
  setFromPoints(t) {
    const e = this.getAttribute('position')
    if (e === void 0) {
      const i = []
      for (let s = 0, r = t.length; s < r; s++) {
        const a = t[s]
        i.push(a.x, a.y, a.z || 0)
      }
      this.setAttribute('position', new be(i, 3))
    } else {
      const i = Math.min(t.length, e.count)
      for (let s = 0; s < i; s++) {
        const r = t[s]
        e.setXYZ(s, r.x, r.y, r.z || 0)
      }
      ;(t.length > e.count &&
        Dt(
          'BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.'
        ),
        (e.needsUpdate = !0))
    }
    return this
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new xn())
    const t = this.attributes.position,
      e = this.morphAttributes.position
    if (t && t.isGLBufferAttribute) {
      ;(Zt(
        'BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.',
        this
      ),
        this.boundingBox.set(
          new D(-1 / 0, -1 / 0, -1 / 0),
          new D(1 / 0, 1 / 0, 1 / 0)
        ))
      return
    }
    if (t !== void 0) {
      if ((this.boundingBox.setFromBufferAttribute(t), e))
        for (let i = 0, s = e.length; i < s; i++) {
          const r = e[i]
          ;(en.setFromBufferAttribute(r),
            this.morphTargetsRelative
              ? (Ie.addVectors(this.boundingBox.min, en.min),
                this.boundingBox.expandByPoint(Ie),
                Ie.addVectors(this.boundingBox.max, en.max),
                this.boundingBox.expandByPoint(Ie))
              : (this.boundingBox.expandByPoint(en.min),
                this.boundingBox.expandByPoint(en.max)))
        }
    } else this.boundingBox.makeEmpty()
    ;(isNaN(this.boundingBox.min.x) ||
      isNaN(this.boundingBox.min.y) ||
      isNaN(this.boundingBox.min.z)) &&
      Zt(
        'BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',
        this
      )
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Zi())
    const t = this.attributes.position,
      e = this.morphAttributes.position
    if (t && t.isGLBufferAttribute) {
      ;(Zt(
        'BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.',
        this
      ),
        this.boundingSphere.set(new D(), 1 / 0))
      return
    }
    if (t) {
      const i = this.boundingSphere.center
      if ((en.setFromBufferAttribute(t), e))
        for (let r = 0, a = e.length; r < a; r++) {
          const o = e[r]
          ;(ns.setFromBufferAttribute(o),
            this.morphTargetsRelative
              ? (Ie.addVectors(en.min, ns.min),
                en.expandByPoint(Ie),
                Ie.addVectors(en.max, ns.max),
                en.expandByPoint(Ie))
              : (en.expandByPoint(ns.min), en.expandByPoint(ns.max)))
        }
      en.getCenter(i)
      let s = 0
      for (let r = 0, a = t.count; r < a; r++)
        (Ie.fromBufferAttribute(t, r),
          (s = Math.max(s, i.distanceToSquared(Ie))))
      if (e)
        for (let r = 0, a = e.length; r < a; r++) {
          const o = e[r],
            c = this.morphTargetsRelative
          for (let l = 0, u = o.count; l < u; l++)
            (Ie.fromBufferAttribute(o, l),
              c && (Ui.fromBufferAttribute(t, l), Ie.add(Ui)),
              (s = Math.max(s, i.distanceToSquared(Ie))))
        }
      ;((this.boundingSphere.radius = Math.sqrt(s)),
        isNaN(this.boundingSphere.radius) &&
          Zt(
            'BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',
            this
          ))
    }
  }
  computeTangents() {
    const t = this.index,
      e = this.attributes
    if (
      t === null ||
      e.position === void 0 ||
      e.normal === void 0 ||
      e.uv === void 0
    ) {
      Zt(
        'BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)'
      )
      return
    }
    const i = e.position,
      s = e.normal,
      r = e.uv
    this.hasAttribute('tangent') === !1 &&
      this.setAttribute('tangent', new un(new Float32Array(4 * i.count), 4))
    const a = this.getAttribute('tangent'),
      o = [],
      c = []
    for (let _ = 0; _ < i.count; _++) ((o[_] = new D()), (c[_] = new D()))
    const l = new D(),
      u = new D(),
      p = new D(),
      h = new Nt(),
      m = new Nt(),
      g = new Nt(),
      v = new D(),
      f = new D()
    function d(_, b, P) {
      ;(l.fromBufferAttribute(i, _),
        u.fromBufferAttribute(i, b),
        p.fromBufferAttribute(i, P),
        h.fromBufferAttribute(r, _),
        m.fromBufferAttribute(r, b),
        g.fromBufferAttribute(r, P),
        u.sub(l),
        p.sub(l),
        m.sub(h),
        g.sub(h))
      const R = 1 / (m.x * g.y - g.x * m.y)
      isFinite(R) &&
        (v
          .copy(u)
          .multiplyScalar(g.y)
          .addScaledVector(p, -m.y)
          .multiplyScalar(R),
        f
          .copy(p)
          .multiplyScalar(m.x)
          .addScaledVector(u, -g.x)
          .multiplyScalar(R),
        o[_].add(v),
        o[b].add(v),
        o[P].add(v),
        c[_].add(f),
        c[b].add(f),
        c[P].add(f))
    }
    let M = this.groups
    M.length === 0 && (M = [{ start: 0, count: t.count }])
    for (let _ = 0, b = M.length; _ < b; ++_) {
      const P = M[_],
        R = P.start,
        N = P.count
      for (let V = R, W = R + N; V < W; V += 3)
        d(t.getX(V + 0), t.getX(V + 1), t.getX(V + 2))
    }
    const T = new D(),
      w = new D(),
      C = new D(),
      A = new D()
    function y(_) {
      ;(C.fromBufferAttribute(s, _), A.copy(C))
      const b = o[_]
      ;(T.copy(b),
        T.sub(C.multiplyScalar(C.dot(b))).normalize(),
        w.crossVectors(A, b))
      const R = w.dot(c[_]) < 0 ? -1 : 1
      a.setXYZW(_, T.x, T.y, T.z, R)
    }
    for (let _ = 0, b = M.length; _ < b; ++_) {
      const P = M[_],
        R = P.start,
        N = P.count
      for (let V = R, W = R + N; V < W; V += 3)
        (y(t.getX(V + 0)), y(t.getX(V + 1)), y(t.getX(V + 2)))
    }
  }
  computeVertexNormals() {
    const t = this.index,
      e = this.getAttribute('position')
    if (e !== void 0) {
      let i = this.getAttribute('normal')
      if (i === void 0)
        ((i = new un(new Float32Array(e.count * 3), 3)),
          this.setAttribute('normal', i))
      else for (let h = 0, m = i.count; h < m; h++) i.setXYZ(h, 0, 0, 0)
      const s = new D(),
        r = new D(),
        a = new D(),
        o = new D(),
        c = new D(),
        l = new D(),
        u = new D(),
        p = new D()
      if (t)
        for (let h = 0, m = t.count; h < m; h += 3) {
          const g = t.getX(h + 0),
            v = t.getX(h + 1),
            f = t.getX(h + 2)
          ;(s.fromBufferAttribute(e, g),
            r.fromBufferAttribute(e, v),
            a.fromBufferAttribute(e, f),
            u.subVectors(a, r),
            p.subVectors(s, r),
            u.cross(p),
            o.fromBufferAttribute(i, g),
            c.fromBufferAttribute(i, v),
            l.fromBufferAttribute(i, f),
            o.add(u),
            c.add(u),
            l.add(u),
            i.setXYZ(g, o.x, o.y, o.z),
            i.setXYZ(v, c.x, c.y, c.z),
            i.setXYZ(f, l.x, l.y, l.z))
        }
      else
        for (let h = 0, m = e.count; h < m; h += 3)
          (s.fromBufferAttribute(e, h + 0),
            r.fromBufferAttribute(e, h + 1),
            a.fromBufferAttribute(e, h + 2),
            u.subVectors(a, r),
            p.subVectors(s, r),
            u.cross(p),
            i.setXYZ(h + 0, u.x, u.y, u.z),
            i.setXYZ(h + 1, u.x, u.y, u.z),
            i.setXYZ(h + 2, u.x, u.y, u.z))
      ;(this.normalizeNormals(), (i.needsUpdate = !0))
    }
  }
  normalizeNormals() {
    const t = this.attributes.normal
    for (let e = 0, i = t.count; e < i; e++)
      (Ie.fromBufferAttribute(t, e),
        Ie.normalize(),
        t.setXYZ(e, Ie.x, Ie.y, Ie.z))
  }
  toNonIndexed() {
    function t(o, c) {
      const l = o.array,
        u = o.itemSize,
        p = o.normalized,
        h = new l.constructor(c.length * u)
      let m = 0,
        g = 0
      for (let v = 0, f = c.length; v < f; v++) {
        o.isInterleavedBufferAttribute
          ? (m = c[v] * o.data.stride + o.offset)
          : (m = c[v] * u)
        for (let d = 0; d < u; d++) h[g++] = l[m++]
      }
      return new un(h, u, p)
    }
    if (this.index === null)
      return (
        Dt(
          'BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.'
        ),
        this
      )
    const e = new Ye(),
      i = this.index.array,
      s = this.attributes
    for (const o in s) {
      const c = s[o],
        l = t(c, i)
      e.setAttribute(o, l)
    }
    const r = this.morphAttributes
    for (const o in r) {
      const c = [],
        l = r[o]
      for (let u = 0, p = l.length; u < p; u++) {
        const h = l[u],
          m = t(h, i)
        c.push(m)
      }
      e.morphAttributes[o] = c
    }
    e.morphTargetsRelative = this.morphTargetsRelative
    const a = this.groups
    for (let o = 0, c = a.length; o < c; o++) {
      const l = a[o]
      e.addGroup(l.start, l.count, l.materialIndex)
    }
    return e
  }
  toJSON() {
    const t = {
      metadata: {
        version: 4.7,
        type: 'BufferGeometry',
        generator: 'BufferGeometry.toJSON',
      },
    }
    if (
      ((t.uuid = this.uuid),
      (t.type = this.type),
      this.name !== '' && (t.name = this.name),
      Object.keys(this.userData).length > 0 && (t.userData = this.userData),
      this.parameters !== void 0)
    ) {
      const c = this.parameters
      for (const l in c) c[l] !== void 0 && (t[l] = c[l])
      return t
    }
    t.data = { attributes: {} }
    const e = this.index
    e !== null &&
      (t.data.index = {
        type: e.array.constructor.name,
        array: Array.prototype.slice.call(e.array),
      })
    const i = this.attributes
    for (const c in i) {
      const l = i[c]
      t.data.attributes[c] = l.toJSON(t.data)
    }
    const s = {}
    let r = !1
    for (const c in this.morphAttributes) {
      const l = this.morphAttributes[c],
        u = []
      for (let p = 0, h = l.length; p < h; p++) {
        const m = l[p]
        u.push(m.toJSON(t.data))
      }
      u.length > 0 && ((s[c] = u), (r = !0))
    }
    r &&
      ((t.data.morphAttributes = s),
      (t.data.morphTargetsRelative = this.morphTargetsRelative))
    const a = this.groups
    a.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(a)))
    const o = this.boundingSphere
    return (o !== null && (t.data.boundingSphere = o.toJSON()), t)
  }
  clone() {
    return new this.constructor().copy(this)
  }
  copy(t) {
    ;((this.index = null),
      (this.attributes = {}),
      (this.morphAttributes = {}),
      (this.groups = []),
      (this.boundingBox = null),
      (this.boundingSphere = null))
    const e = {}
    this.name = t.name
    const i = t.index
    i !== null && this.setIndex(i.clone())
    const s = t.attributes
    for (const l in s) {
      const u = s[l]
      this.setAttribute(l, u.clone(e))
    }
    const r = t.morphAttributes
    for (const l in r) {
      const u = [],
        p = r[l]
      for (let h = 0, m = p.length; h < m; h++) u.push(p[h].clone(e))
      this.morphAttributes[l] = u
    }
    this.morphTargetsRelative = t.morphTargetsRelative
    const a = t.groups
    for (let l = 0, u = a.length; l < u; l++) {
      const p = a[l]
      this.addGroup(p.start, p.count, p.materialIndex)
    }
    const o = t.boundingBox
    o !== null && (this.boundingBox = o.clone())
    const c = t.boundingSphere
    return (
      c !== null && (this.boundingSphere = c.clone()),
      (this.drawRange.start = t.drawRange.start),
      (this.drawRange.count = t.drawRange.count),
      (this.userData = t.userData),
      this
    )
  }
  dispose() {
    this.dispatchEvent({ type: 'dispose' })
  }
}
let Yu = 0
class Si extends li {
  constructor() {
    ;(super(),
      (this.isMaterial = !0),
      Object.defineProperty(this, 'id', { value: Yu++ }),
      (this.uuid = $i()),
      (this.name = ''),
      (this.type = 'Material'),
      (this.blending = Vi),
      (this.side = oi),
      (this.vertexColors = !1),
      (this.opacity = 1),
      (this.transparent = !1),
      (this.alphaHash = !1),
      (this.blendSrc = Ma),
      (this.blendDst = Sa),
      (this.blendEquation = mi),
      (this.blendSrcAlpha = null),
      (this.blendDstAlpha = null),
      (this.blendEquationAlpha = null),
      (this.blendColor = new Ot(0, 0, 0)),
      (this.blendAlpha = 0),
      (this.depthFunc = Xi),
      (this.depthTest = !0),
      (this.depthWrite = !0),
      (this.stencilWriteMask = 255),
      (this.stencilFunc = al),
      (this.stencilRef = 0),
      (this.stencilFuncMask = 255),
      (this.stencilFail = Ei),
      (this.stencilZFail = Ei),
      (this.stencilZPass = Ei),
      (this.stencilWrite = !1),
      (this.clippingPlanes = null),
      (this.clipIntersection = !1),
      (this.clipShadows = !1),
      (this.shadowSide = null),
      (this.colorWrite = !0),
      (this.precision = null),
      (this.polygonOffset = !1),
      (this.polygonOffsetFactor = 0),
      (this.polygonOffsetUnits = 0),
      (this.dithering = !1),
      (this.alphaToCoverage = !1),
      (this.premultipliedAlpha = !1),
      (this.forceSinglePass = !1),
      (this.allowOverride = !0),
      (this.visible = !0),
      (this.toneMapped = !0),
      (this.userData = {}),
      (this.version = 0),
      (this._alphaTest = 0))
  }
  get alphaTest() {
    return this._alphaTest
  }
  set alphaTest(t) {
    ;(this._alphaTest > 0 != t > 0 && this.version++, (this._alphaTest = t))
  }
  onBeforeRender() {}
  onBeforeCompile() {}
  customProgramCacheKey() {
    return this.onBeforeCompile.toString()
  }
  setValues(t) {
    if (t !== void 0)
      for (const e in t) {
        const i = t[e]
        if (i === void 0) {
          Dt(`Material: parameter '${e}' has value of undefined.`)
          continue
        }
        const s = this[e]
        if (s === void 0) {
          Dt(`Material: '${e}' is not a property of THREE.${this.type}.`)
          continue
        }
        s && s.isColor
          ? s.set(i)
          : s && s.isVector3 && i && i.isVector3
            ? s.copy(i)
            : (this[e] = i)
      }
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == 'string'
    e && (t = { textures: {}, images: {} })
    const i = {
      metadata: {
        version: 4.7,
        type: 'Material',
        generator: 'Material.toJSON',
      },
    }
    ;((i.uuid = this.uuid),
      (i.type = this.type),
      this.name !== '' && (i.name = this.name),
      this.color && this.color.isColor && (i.color = this.color.getHex()),
      this.roughness !== void 0 && (i.roughness = this.roughness),
      this.metalness !== void 0 && (i.metalness = this.metalness),
      this.sheen !== void 0 && (i.sheen = this.sheen),
      this.sheenColor &&
        this.sheenColor.isColor &&
        (i.sheenColor = this.sheenColor.getHex()),
      this.sheenRoughness !== void 0 &&
        (i.sheenRoughness = this.sheenRoughness),
      this.emissive &&
        this.emissive.isColor &&
        (i.emissive = this.emissive.getHex()),
      this.emissiveIntensity !== void 0 &&
        this.emissiveIntensity !== 1 &&
        (i.emissiveIntensity = this.emissiveIntensity),
      this.specular &&
        this.specular.isColor &&
        (i.specular = this.specular.getHex()),
      this.specularIntensity !== void 0 &&
        (i.specularIntensity = this.specularIntensity),
      this.specularColor &&
        this.specularColor.isColor &&
        (i.specularColor = this.specularColor.getHex()),
      this.shininess !== void 0 && (i.shininess = this.shininess),
      this.clearcoat !== void 0 && (i.clearcoat = this.clearcoat),
      this.clearcoatRoughness !== void 0 &&
        (i.clearcoatRoughness = this.clearcoatRoughness),
      this.clearcoatMap &&
        this.clearcoatMap.isTexture &&
        (i.clearcoatMap = this.clearcoatMap.toJSON(t).uuid),
      this.clearcoatRoughnessMap &&
        this.clearcoatRoughnessMap.isTexture &&
        (i.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(t).uuid),
      this.clearcoatNormalMap &&
        this.clearcoatNormalMap.isTexture &&
        ((i.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid),
        (i.clearcoatNormalScale = this.clearcoatNormalScale.toArray())),
      this.sheenColorMap &&
        this.sheenColorMap.isTexture &&
        (i.sheenColorMap = this.sheenColorMap.toJSON(t).uuid),
      this.sheenRoughnessMap &&
        this.sheenRoughnessMap.isTexture &&
        (i.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(t).uuid),
      this.dispersion !== void 0 && (i.dispersion = this.dispersion),
      this.iridescence !== void 0 && (i.iridescence = this.iridescence),
      this.iridescenceIOR !== void 0 &&
        (i.iridescenceIOR = this.iridescenceIOR),
      this.iridescenceThicknessRange !== void 0 &&
        (i.iridescenceThicknessRange = this.iridescenceThicknessRange),
      this.iridescenceMap &&
        this.iridescenceMap.isTexture &&
        (i.iridescenceMap = this.iridescenceMap.toJSON(t).uuid),
      this.iridescenceThicknessMap &&
        this.iridescenceThicknessMap.isTexture &&
        (i.iridescenceThicknessMap =
          this.iridescenceThicknessMap.toJSON(t).uuid),
      this.anisotropy !== void 0 && (i.anisotropy = this.anisotropy),
      this.anisotropyRotation !== void 0 &&
        (i.anisotropyRotation = this.anisotropyRotation),
      this.anisotropyMap &&
        this.anisotropyMap.isTexture &&
        (i.anisotropyMap = this.anisotropyMap.toJSON(t).uuid),
      this.map && this.map.isTexture && (i.map = this.map.toJSON(t).uuid),
      this.matcap &&
        this.matcap.isTexture &&
        (i.matcap = this.matcap.toJSON(t).uuid),
      this.alphaMap &&
        this.alphaMap.isTexture &&
        (i.alphaMap = this.alphaMap.toJSON(t).uuid),
      this.lightMap &&
        this.lightMap.isTexture &&
        ((i.lightMap = this.lightMap.toJSON(t).uuid),
        (i.lightMapIntensity = this.lightMapIntensity)),
      this.aoMap &&
        this.aoMap.isTexture &&
        ((i.aoMap = this.aoMap.toJSON(t).uuid),
        (i.aoMapIntensity = this.aoMapIntensity)),
      this.bumpMap &&
        this.bumpMap.isTexture &&
        ((i.bumpMap = this.bumpMap.toJSON(t).uuid),
        (i.bumpScale = this.bumpScale)),
      this.normalMap &&
        this.normalMap.isTexture &&
        ((i.normalMap = this.normalMap.toJSON(t).uuid),
        (i.normalMapType = this.normalMapType),
        (i.normalScale = this.normalScale.toArray())),
      this.displacementMap &&
        this.displacementMap.isTexture &&
        ((i.displacementMap = this.displacementMap.toJSON(t).uuid),
        (i.displacementScale = this.displacementScale),
        (i.displacementBias = this.displacementBias)),
      this.roughnessMap &&
        this.roughnessMap.isTexture &&
        (i.roughnessMap = this.roughnessMap.toJSON(t).uuid),
      this.metalnessMap &&
        this.metalnessMap.isTexture &&
        (i.metalnessMap = this.metalnessMap.toJSON(t).uuid),
      this.emissiveMap &&
        this.emissiveMap.isTexture &&
        (i.emissiveMap = this.emissiveMap.toJSON(t).uuid),
      this.specularMap &&
        this.specularMap.isTexture &&
        (i.specularMap = this.specularMap.toJSON(t).uuid),
      this.specularIntensityMap &&
        this.specularIntensityMap.isTexture &&
        (i.specularIntensityMap = this.specularIntensityMap.toJSON(t).uuid),
      this.specularColorMap &&
        this.specularColorMap.isTexture &&
        (i.specularColorMap = this.specularColorMap.toJSON(t).uuid),
      this.envMap &&
        this.envMap.isTexture &&
        ((i.envMap = this.envMap.toJSON(t).uuid),
        this.combine !== void 0 && (i.combine = this.combine)),
      this.envMapRotation !== void 0 &&
        (i.envMapRotation = this.envMapRotation.toArray()),
      this.envMapIntensity !== void 0 &&
        (i.envMapIntensity = this.envMapIntensity),
      this.reflectivity !== void 0 && (i.reflectivity = this.reflectivity),
      this.refractionRatio !== void 0 &&
        (i.refractionRatio = this.refractionRatio),
      this.gradientMap &&
        this.gradientMap.isTexture &&
        (i.gradientMap = this.gradientMap.toJSON(t).uuid),
      this.transmission !== void 0 && (i.transmission = this.transmission),
      this.transmissionMap &&
        this.transmissionMap.isTexture &&
        (i.transmissionMap = this.transmissionMap.toJSON(t).uuid),
      this.thickness !== void 0 && (i.thickness = this.thickness),
      this.thicknessMap &&
        this.thicknessMap.isTexture &&
        (i.thicknessMap = this.thicknessMap.toJSON(t).uuid),
      this.attenuationDistance !== void 0 &&
        this.attenuationDistance !== 1 / 0 &&
        (i.attenuationDistance = this.attenuationDistance),
      this.attenuationColor !== void 0 &&
        (i.attenuationColor = this.attenuationColor.getHex()),
      this.size !== void 0 && (i.size = this.size),
      this.shadowSide !== null && (i.shadowSide = this.shadowSide),
      this.sizeAttenuation !== void 0 &&
        (i.sizeAttenuation = this.sizeAttenuation),
      this.blending !== Vi && (i.blending = this.blending),
      this.side !== oi && (i.side = this.side),
      this.vertexColors === !0 && (i.vertexColors = !0),
      this.opacity < 1 && (i.opacity = this.opacity),
      this.transparent === !0 && (i.transparent = !0),
      this.blendSrc !== Ma && (i.blendSrc = this.blendSrc),
      this.blendDst !== Sa && (i.blendDst = this.blendDst),
      this.blendEquation !== mi && (i.blendEquation = this.blendEquation),
      this.blendSrcAlpha !== null && (i.blendSrcAlpha = this.blendSrcAlpha),
      this.blendDstAlpha !== null && (i.blendDstAlpha = this.blendDstAlpha),
      this.blendEquationAlpha !== null &&
        (i.blendEquationAlpha = this.blendEquationAlpha),
      this.blendColor &&
        this.blendColor.isColor &&
        (i.blendColor = this.blendColor.getHex()),
      this.blendAlpha !== 0 && (i.blendAlpha = this.blendAlpha),
      this.depthFunc !== Xi && (i.depthFunc = this.depthFunc),
      this.depthTest === !1 && (i.depthTest = this.depthTest),
      this.depthWrite === !1 && (i.depthWrite = this.depthWrite),
      this.colorWrite === !1 && (i.colorWrite = this.colorWrite),
      this.stencilWriteMask !== 255 &&
        (i.stencilWriteMask = this.stencilWriteMask),
      this.stencilFunc !== al && (i.stencilFunc = this.stencilFunc),
      this.stencilRef !== 0 && (i.stencilRef = this.stencilRef),
      this.stencilFuncMask !== 255 &&
        (i.stencilFuncMask = this.stencilFuncMask),
      this.stencilFail !== Ei && (i.stencilFail = this.stencilFail),
      this.stencilZFail !== Ei && (i.stencilZFail = this.stencilZFail),
      this.stencilZPass !== Ei && (i.stencilZPass = this.stencilZPass),
      this.stencilWrite === !0 && (i.stencilWrite = this.stencilWrite),
      this.rotation !== void 0 &&
        this.rotation !== 0 &&
        (i.rotation = this.rotation),
      this.polygonOffset === !0 && (i.polygonOffset = !0),
      this.polygonOffsetFactor !== 0 &&
        (i.polygonOffsetFactor = this.polygonOffsetFactor),
      this.polygonOffsetUnits !== 0 &&
        (i.polygonOffsetUnits = this.polygonOffsetUnits),
      this.linewidth !== void 0 &&
        this.linewidth !== 1 &&
        (i.linewidth = this.linewidth),
      this.dashSize !== void 0 && (i.dashSize = this.dashSize),
      this.gapSize !== void 0 && (i.gapSize = this.gapSize),
      this.scale !== void 0 && (i.scale = this.scale),
      this.dithering === !0 && (i.dithering = !0),
      this.alphaTest > 0 && (i.alphaTest = this.alphaTest),
      this.alphaHash === !0 && (i.alphaHash = !0),
      this.alphaToCoverage === !0 && (i.alphaToCoverage = !0),
      this.premultipliedAlpha === !0 && (i.premultipliedAlpha = !0),
      this.forceSinglePass === !0 && (i.forceSinglePass = !0),
      this.allowOverride === !1 && (i.allowOverride = !1),
      this.wireframe === !0 && (i.wireframe = !0),
      this.wireframeLinewidth > 1 &&
        (i.wireframeLinewidth = this.wireframeLinewidth),
      this.wireframeLinecap !== 'round' &&
        (i.wireframeLinecap = this.wireframeLinecap),
      this.wireframeLinejoin !== 'round' &&
        (i.wireframeLinejoin = this.wireframeLinejoin),
      this.flatShading === !0 && (i.flatShading = !0),
      this.visible === !1 && (i.visible = !1),
      this.toneMapped === !1 && (i.toneMapped = !1),
      this.fog === !1 && (i.fog = !1),
      Object.keys(this.userData).length > 0 && (i.userData = this.userData))
    function s(r) {
      const a = []
      for (const o in r) {
        const c = r[o]
        ;(delete c.metadata, a.push(c))
      }
      return a
    }
    if (e) {
      const r = s(t.textures),
        a = s(t.images)
      ;(r.length > 0 && (i.textures = r), a.length > 0 && (i.images = a))
    }
    return i
  }
  clone() {
    return new this.constructor().copy(this)
  }
  copy(t) {
    ;((this.name = t.name),
      (this.blending = t.blending),
      (this.side = t.side),
      (this.vertexColors = t.vertexColors),
      (this.opacity = t.opacity),
      (this.transparent = t.transparent),
      (this.blendSrc = t.blendSrc),
      (this.blendDst = t.blendDst),
      (this.blendEquation = t.blendEquation),
      (this.blendSrcAlpha = t.blendSrcAlpha),
      (this.blendDstAlpha = t.blendDstAlpha),
      (this.blendEquationAlpha = t.blendEquationAlpha),
      this.blendColor.copy(t.blendColor),
      (this.blendAlpha = t.blendAlpha),
      (this.depthFunc = t.depthFunc),
      (this.depthTest = t.depthTest),
      (this.depthWrite = t.depthWrite),
      (this.stencilWriteMask = t.stencilWriteMask),
      (this.stencilFunc = t.stencilFunc),
      (this.stencilRef = t.stencilRef),
      (this.stencilFuncMask = t.stencilFuncMask),
      (this.stencilFail = t.stencilFail),
      (this.stencilZFail = t.stencilZFail),
      (this.stencilZPass = t.stencilZPass),
      (this.stencilWrite = t.stencilWrite))
    const e = t.clippingPlanes
    let i = null
    if (e !== null) {
      const s = e.length
      i = new Array(s)
      for (let r = 0; r !== s; ++r) i[r] = e[r].clone()
    }
    return (
      (this.clippingPlanes = i),
      (this.clipIntersection = t.clipIntersection),
      (this.clipShadows = t.clipShadows),
      (this.shadowSide = t.shadowSide),
      (this.colorWrite = t.colorWrite),
      (this.precision = t.precision),
      (this.polygonOffset = t.polygonOffset),
      (this.polygonOffsetFactor = t.polygonOffsetFactor),
      (this.polygonOffsetUnits = t.polygonOffsetUnits),
      (this.dithering = t.dithering),
      (this.alphaTest = t.alphaTest),
      (this.alphaHash = t.alphaHash),
      (this.alphaToCoverage = t.alphaToCoverage),
      (this.premultipliedAlpha = t.premultipliedAlpha),
      (this.forceSinglePass = t.forceSinglePass),
      (this.allowOverride = t.allowOverride),
      (this.visible = t.visible),
      (this.toneMapped = t.toneMapped),
      (this.userData = JSON.parse(JSON.stringify(t.userData))),
      this
    )
  }
  dispose() {
    this.dispatchEvent({ type: 'dispose' })
  }
  set needsUpdate(t) {
    t === !0 && this.version++
  }
}
const Fn = new D(),
  Zr = new D(),
  Ps = new D(),
  Qn = new D(),
  Jr = new D(),
  Ls = new D(),
  Qr = new D()
class Sr {
  constructor(t = new D(), e = new D(0, 0, -1)) {
    ;((this.origin = t), (this.direction = e))
  }
  set(t, e) {
    return (this.origin.copy(t), this.direction.copy(e), this)
  }
  copy(t) {
    return (this.origin.copy(t.origin), this.direction.copy(t.direction), this)
  }
  at(t, e) {
    return e.copy(this.origin).addScaledVector(this.direction, t)
  }
  lookAt(t) {
    return (this.direction.copy(t).sub(this.origin).normalize(), this)
  }
  recast(t) {
    return (this.origin.copy(this.at(t, Fn)), this)
  }
  closestPointToPoint(t, e) {
    e.subVectors(t, this.origin)
    const i = e.dot(this.direction)
    return i < 0
      ? e.copy(this.origin)
      : e.copy(this.origin).addScaledVector(this.direction, i)
  }
  distanceToPoint(t) {
    return Math.sqrt(this.distanceSqToPoint(t))
  }
  distanceSqToPoint(t) {
    const e = Fn.subVectors(t, this.origin).dot(this.direction)
    return e < 0
      ? this.origin.distanceToSquared(t)
      : (Fn.copy(this.origin).addScaledVector(this.direction, e),
        Fn.distanceToSquared(t))
  }
  distanceSqToSegment(t, e, i, s) {
    ;(Zr.copy(t).add(e).multiplyScalar(0.5),
      Ps.copy(e).sub(t).normalize(),
      Qn.copy(this.origin).sub(Zr))
    const r = t.distanceTo(e) * 0.5,
      a = -this.direction.dot(Ps),
      o = Qn.dot(this.direction),
      c = -Qn.dot(Ps),
      l = Qn.lengthSq(),
      u = Math.abs(1 - a * a)
    let p, h, m, g
    if (u > 0)
      if (((p = a * c - o), (h = a * o - c), (g = r * u), p >= 0))
        if (h >= -g)
          if (h <= g) {
            const v = 1 / u
            ;((p *= v),
              (h *= v),
              (m = p * (p + a * h + 2 * o) + h * (a * p + h + 2 * c) + l))
          } else
            ((h = r),
              (p = Math.max(0, -(a * h + o))),
              (m = -p * p + h * (h + 2 * c) + l))
        else
          ((h = -r),
            (p = Math.max(0, -(a * h + o))),
            (m = -p * p + h * (h + 2 * c) + l))
      else
        h <= -g
          ? ((p = Math.max(0, -(-a * r + o))),
            (h = p > 0 ? -r : Math.min(Math.max(-r, -c), r)),
            (m = -p * p + h * (h + 2 * c) + l))
          : h <= g
            ? ((p = 0),
              (h = Math.min(Math.max(-r, -c), r)),
              (m = h * (h + 2 * c) + l))
            : ((p = Math.max(0, -(a * r + o))),
              (h = p > 0 ? r : Math.min(Math.max(-r, -c), r)),
              (m = -p * p + h * (h + 2 * c) + l))
    else
      ((h = a > 0 ? -r : r),
        (p = Math.max(0, -(a * h + o))),
        (m = -p * p + h * (h + 2 * c) + l))
    return (
      i && i.copy(this.origin).addScaledVector(this.direction, p),
      s && s.copy(Zr).addScaledVector(Ps, h),
      m
    )
  }
  intersectSphere(t, e) {
    Fn.subVectors(t.center, this.origin)
    const i = Fn.dot(this.direction),
      s = Fn.dot(Fn) - i * i,
      r = t.radius * t.radius
    if (s > r) return null
    const a = Math.sqrt(r - s),
      o = i - a,
      c = i + a
    return c < 0 ? null : o < 0 ? this.at(c, e) : this.at(o, e)
  }
  intersectsSphere(t) {
    return t.radius < 0
      ? !1
      : this.distanceSqToPoint(t.center) <= t.radius * t.radius
  }
  distanceToPlane(t) {
    const e = t.normal.dot(this.direction)
    if (e === 0) return t.distanceToPoint(this.origin) === 0 ? 0 : null
    const i = -(this.origin.dot(t.normal) + t.constant) / e
    return i >= 0 ? i : null
  }
  intersectPlane(t, e) {
    const i = this.distanceToPlane(t)
    return i === null ? null : this.at(i, e)
  }
  intersectsPlane(t) {
    const e = t.distanceToPoint(this.origin)
    return e === 0 || t.normal.dot(this.direction) * e < 0
  }
  intersectBox(t, e) {
    let i, s, r, a, o, c
    const l = 1 / this.direction.x,
      u = 1 / this.direction.y,
      p = 1 / this.direction.z,
      h = this.origin
    return (
      l >= 0
        ? ((i = (t.min.x - h.x) * l), (s = (t.max.x - h.x) * l))
        : ((i = (t.max.x - h.x) * l), (s = (t.min.x - h.x) * l)),
      u >= 0
        ? ((r = (t.min.y - h.y) * u), (a = (t.max.y - h.y) * u))
        : ((r = (t.max.y - h.y) * u), (a = (t.min.y - h.y) * u)),
      i > a ||
      r > s ||
      ((r > i || isNaN(i)) && (i = r),
      (a < s || isNaN(s)) && (s = a),
      p >= 0
        ? ((o = (t.min.z - h.z) * p), (c = (t.max.z - h.z) * p))
        : ((o = (t.max.z - h.z) * p), (c = (t.min.z - h.z) * p)),
      i > c || o > s) ||
      ((o > i || i !== i) && (i = o), (c < s || s !== s) && (s = c), s < 0)
        ? null
        : this.at(i >= 0 ? i : s, e)
    )
  }
  intersectsBox(t) {
    return this.intersectBox(t, Fn) !== null
  }
  intersectTriangle(t, e, i, s, r) {
    ;(Jr.subVectors(e, t), Ls.subVectors(i, t), Qr.crossVectors(Jr, Ls))
    let a = this.direction.dot(Qr),
      o
    if (a > 0) {
      if (s) return null
      o = 1
    } else if (a < 0) ((o = -1), (a = -a))
    else return null
    Qn.subVectors(this.origin, t)
    const c = o * this.direction.dot(Ls.crossVectors(Qn, Ls))
    if (c < 0) return null
    const l = o * this.direction.dot(Jr.cross(Qn))
    if (l < 0 || c + l > a) return null
    const u = -o * Qn.dot(Qr)
    return u < 0 ? null : this.at(u / a, r)
  }
  applyMatrix4(t) {
    return (
      this.origin.applyMatrix4(t),
      this.direction.transformDirection(t),
      this
    )
  }
  equals(t) {
    return t.origin.equals(this.origin) && t.direction.equals(this.direction)
  }
  clone() {
    return new this.constructor().copy(this)
  }
}
class Io extends Si {
  constructor(t) {
    ;(super(),
      (this.isMeshBasicMaterial = !0),
      (this.type = 'MeshBasicMaterial'),
      (this.color = new Ot(16777215)),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.specularMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.envMapRotation = new Cn()),
      (this.combine = xo),
      (this.reflectivity = 1),
      (this.refractionRatio = 0.98),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = 'round'),
      (this.wireframeLinejoin = 'round'),
      (this.fog = !0),
      this.setValues(t))
  }
  copy(t) {
    return (
      super.copy(t),
      this.color.copy(t.color),
      (this.map = t.map),
      (this.lightMap = t.lightMap),
      (this.lightMapIntensity = t.lightMapIntensity),
      (this.aoMap = t.aoMap),
      (this.aoMapIntensity = t.aoMapIntensity),
      (this.specularMap = t.specularMap),
      (this.alphaMap = t.alphaMap),
      (this.envMap = t.envMap),
      this.envMapRotation.copy(t.envMapRotation),
      (this.combine = t.combine),
      (this.reflectivity = t.reflectivity),
      (this.refractionRatio = t.refractionRatio),
      (this.wireframe = t.wireframe),
      (this.wireframeLinewidth = t.wireframeLinewidth),
      (this.wireframeLinecap = t.wireframeLinecap),
      (this.wireframeLinejoin = t.wireframeLinejoin),
      (this.fog = t.fog),
      this
    )
  }
}
const bl = new le(),
  di = new Sr(),
  Ds = new Zi(),
  El = new D(),
  Is = new D(),
  Us = new D(),
  Ns = new D(),
  ta = new D(),
  Fs = new D(),
  Tl = new D(),
  Os = new D()
class Jt extends ye {
  constructor(t = new Ye(), e = new Io()) {
    ;(super(),
      (this.isMesh = !0),
      (this.type = 'Mesh'),
      (this.geometry = t),
      (this.material = e),
      (this.morphTargetDictionary = void 0),
      (this.morphTargetInfluences = void 0),
      (this.count = 1),
      this.updateMorphTargets())
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      t.morphTargetInfluences !== void 0 &&
        (this.morphTargetInfluences = t.morphTargetInfluences.slice()),
      t.morphTargetDictionary !== void 0 &&
        (this.morphTargetDictionary = Object.assign(
          {},
          t.morphTargetDictionary
        )),
      (this.material = Array.isArray(t.material)
        ? t.material.slice()
        : t.material),
      (this.geometry = t.geometry),
      this
    )
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes,
      i = Object.keys(e)
    if (i.length > 0) {
      const s = e[i[0]]
      if (s !== void 0) {
        ;((this.morphTargetInfluences = []), (this.morphTargetDictionary = {}))
        for (let r = 0, a = s.length; r < a; r++) {
          const o = s[r].name || String(r)
          ;(this.morphTargetInfluences.push(0),
            (this.morphTargetDictionary[o] = r))
        }
      }
    }
  }
  getVertexPosition(t, e) {
    const i = this.geometry,
      s = i.attributes.position,
      r = i.morphAttributes.position,
      a = i.morphTargetsRelative
    e.fromBufferAttribute(s, t)
    const o = this.morphTargetInfluences
    if (r && o) {
      Fs.set(0, 0, 0)
      for (let c = 0, l = r.length; c < l; c++) {
        const u = o[c],
          p = r[c]
        u !== 0 &&
          (ta.fromBufferAttribute(p, t),
          a ? Fs.addScaledVector(ta, u) : Fs.addScaledVector(ta.sub(e), u))
      }
      e.add(Fs)
    }
    return e
  }
  raycast(t, e) {
    const i = this.geometry,
      s = this.material,
      r = this.matrixWorld
    s !== void 0 &&
      (i.boundingSphere === null && i.computeBoundingSphere(),
      Ds.copy(i.boundingSphere),
      Ds.applyMatrix4(r),
      di.copy(t.ray).recast(t.near),
      !(
        Ds.containsPoint(di.origin) === !1 &&
        (di.intersectSphere(Ds, El) === null ||
          di.origin.distanceToSquared(El) > (t.far - t.near) ** 2)
      ) &&
        (bl.copy(r).invert(),
        di.copy(t.ray).applyMatrix4(bl),
        !(i.boundingBox !== null && di.intersectsBox(i.boundingBox) === !1) &&
          this._computeIntersections(t, e, di)))
  }
  _computeIntersections(t, e, i) {
    let s
    const r = this.geometry,
      a = this.material,
      o = r.index,
      c = r.attributes.position,
      l = r.attributes.uv,
      u = r.attributes.uv1,
      p = r.attributes.normal,
      h = r.groups,
      m = r.drawRange
    if (o !== null)
      if (Array.isArray(a))
        for (let g = 0, v = h.length; g < v; g++) {
          const f = h[g],
            d = a[f.materialIndex],
            M = Math.max(f.start, m.start),
            T = Math.min(
              o.count,
              Math.min(f.start + f.count, m.start + m.count)
            )
          for (let w = M, C = T; w < C; w += 3) {
            const A = o.getX(w),
              y = o.getX(w + 1),
              _ = o.getX(w + 2)
            ;((s = Bs(this, d, t, i, l, u, p, A, y, _)),
              s &&
                ((s.faceIndex = Math.floor(w / 3)),
                (s.face.materialIndex = f.materialIndex),
                e.push(s)))
          }
        }
      else {
        const g = Math.max(0, m.start),
          v = Math.min(o.count, m.start + m.count)
        for (let f = g, d = v; f < d; f += 3) {
          const M = o.getX(f),
            T = o.getX(f + 1),
            w = o.getX(f + 2)
          ;((s = Bs(this, a, t, i, l, u, p, M, T, w)),
            s && ((s.faceIndex = Math.floor(f / 3)), e.push(s)))
        }
      }
    else if (c !== void 0)
      if (Array.isArray(a))
        for (let g = 0, v = h.length; g < v; g++) {
          const f = h[g],
            d = a[f.materialIndex],
            M = Math.max(f.start, m.start),
            T = Math.min(
              c.count,
              Math.min(f.start + f.count, m.start + m.count)
            )
          for (let w = M, C = T; w < C; w += 3) {
            const A = w,
              y = w + 1,
              _ = w + 2
            ;((s = Bs(this, d, t, i, l, u, p, A, y, _)),
              s &&
                ((s.faceIndex = Math.floor(w / 3)),
                (s.face.materialIndex = f.materialIndex),
                e.push(s)))
          }
        }
      else {
        const g = Math.max(0, m.start),
          v = Math.min(c.count, m.start + m.count)
        for (let f = g, d = v; f < d; f += 3) {
          const M = f,
            T = f + 1,
            w = f + 2
          ;((s = Bs(this, a, t, i, l, u, p, M, T, w)),
            s && ((s.faceIndex = Math.floor(f / 3)), e.push(s)))
        }
      }
  }
}
function ju(n, t, e, i, s, r, a, o) {
  let c
  if (
    (t.side === qe
      ? (c = i.intersectTriangle(a, r, s, !0, o))
      : (c = i.intersectTriangle(s, r, a, t.side === oi, o)),
    c === null)
  )
    return null
  ;(Os.copy(o), Os.applyMatrix4(n.matrixWorld))
  const l = e.ray.origin.distanceTo(Os)
  return l < e.near || l > e.far
    ? null
    : { distance: l, point: Os.clone(), object: n }
}
function Bs(n, t, e, i, s, r, a, o, c, l) {
  ;(n.getVertexPosition(o, Is),
    n.getVertexPosition(c, Us),
    n.getVertexPosition(l, Ns))
  const u = ju(n, t, e, i, Is, Us, Ns, Tl)
  if (u) {
    const p = new D()
    ;(mn.getBarycoord(Tl, Is, Us, Ns, p),
      s && (u.uv = mn.getInterpolatedAttribute(s, o, c, l, p, new Nt())),
      r && (u.uv1 = mn.getInterpolatedAttribute(r, o, c, l, p, new Nt())),
      a &&
        ((u.normal = mn.getInterpolatedAttribute(a, o, c, l, p, new D())),
        u.normal.dot(i.direction) > 0 && u.normal.multiplyScalar(-1)))
    const h = { a: o, b: c, c: l, normal: new D(), materialIndex: 0 }
    ;(mn.getNormal(Is, Us, Ns, h.normal), (u.face = h), (u.barycoord = p))
  }
  return u
}
class jc extends Ve {
  constructor(t = null, e = 1, i = 1, s, r, a, o, c, l = Fe, u = Fe, p, h) {
    ;(super(null, a, o, c, l, u, s, r, p, h),
      (this.isDataTexture = !0),
      (this.image = { data: t, width: e, height: i }),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1))
  }
}
class wl extends un {
  constructor(t, e, i, s = 1) {
    ;(super(t, e, i),
      (this.isInstancedBufferAttribute = !0),
      (this.meshPerAttribute = s))
  }
  copy(t) {
    return (super.copy(t), (this.meshPerAttribute = t.meshPerAttribute), this)
  }
  toJSON() {
    const t = super.toJSON()
    return (
      (t.meshPerAttribute = this.meshPerAttribute),
      (t.isInstancedBufferAttribute = !0),
      t
    )
  }
}
const Ni = new le(),
  Al = new le(),
  zs = [],
  Rl = new xn(),
  Ku = new le(),
  is = new Jt(),
  ss = new Zi()
class $u extends Jt {
  constructor(t, e, i) {
    ;(super(t, e),
      (this.isInstancedMesh = !0),
      (this.instanceMatrix = new wl(new Float32Array(i * 16), 16)),
      (this.previousInstanceMatrix = null),
      (this.instanceColor = null),
      (this.morphTexture = null),
      (this.count = i),
      (this.boundingBox = null),
      (this.boundingSphere = null))
    for (let s = 0; s < i; s++) this.setMatrixAt(s, Ku)
  }
  computeBoundingBox() {
    const t = this.geometry,
      e = this.count
    ;(this.boundingBox === null && (this.boundingBox = new xn()),
      t.boundingBox === null && t.computeBoundingBox(),
      this.boundingBox.makeEmpty())
    for (let i = 0; i < e; i++)
      (this.getMatrixAt(i, Ni),
        Rl.copy(t.boundingBox).applyMatrix4(Ni),
        this.boundingBox.union(Rl))
  }
  computeBoundingSphere() {
    const t = this.geometry,
      e = this.count
    ;(this.boundingSphere === null && (this.boundingSphere = new Zi()),
      t.boundingSphere === null && t.computeBoundingSphere(),
      this.boundingSphere.makeEmpty())
    for (let i = 0; i < e; i++)
      (this.getMatrixAt(i, Ni),
        ss.copy(t.boundingSphere).applyMatrix4(Ni),
        this.boundingSphere.union(ss))
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      this.instanceMatrix.copy(t.instanceMatrix),
      t.previousInstanceMatrix !== null &&
        (this.previousInstanceMatrix = t.previousInstanceMatrix.clone()),
      t.morphTexture !== null && (this.morphTexture = t.morphTexture.clone()),
      t.instanceColor !== null &&
        (this.instanceColor = t.instanceColor.clone()),
      (this.count = t.count),
      t.boundingBox !== null && (this.boundingBox = t.boundingBox.clone()),
      t.boundingSphere !== null &&
        (this.boundingSphere = t.boundingSphere.clone()),
      this
    )
  }
  getColorAt(t, e) {
    return this.instanceColor === null
      ? e.setRGB(1, 1, 1)
      : e.fromArray(this.instanceColor.array, t * 3)
  }
  getMatrixAt(t, e) {
    return e.fromArray(this.instanceMatrix.array, t * 16)
  }
  getMorphAt(t, e) {
    const i = e.morphTargetInfluences,
      s = this.morphTexture.source.data.data,
      r = i.length + 1,
      a = t * r + 1
    for (let o = 0; o < i.length; o++) i[o] = s[a + o]
  }
  raycast(t, e) {
    const i = this.matrixWorld,
      s = this.count
    if (
      ((is.geometry = this.geometry),
      (is.material = this.material),
      is.material !== void 0 &&
        (this.boundingSphere === null && this.computeBoundingSphere(),
        ss.copy(this.boundingSphere),
        ss.applyMatrix4(i),
        t.ray.intersectsSphere(ss) !== !1))
    )
      for (let r = 0; r < s; r++) {
        ;(this.getMatrixAt(r, Ni),
          Al.multiplyMatrices(i, Ni),
          (is.matrixWorld = Al),
          is.raycast(t, zs))
        for (let a = 0, o = zs.length; a < o; a++) {
          const c = zs[a]
          ;((c.instanceId = r), (c.object = this), e.push(c))
        }
        zs.length = 0
      }
  }
  setColorAt(t, e) {
    return (
      this.instanceColor === null &&
        (this.instanceColor = new wl(
          new Float32Array(this.instanceMatrix.count * 3).fill(1),
          3
        )),
      e.toArray(this.instanceColor.array, t * 3),
      this
    )
  }
  setMatrixAt(t, e) {
    return (e.toArray(this.instanceMatrix.array, t * 16), this)
  }
  setMorphAt(t, e) {
    const i = e.morphTargetInfluences,
      s = i.length + 1
    this.morphTexture === null &&
      (this.morphTexture = new jc(
        new Float32Array(s * this.count),
        s,
        this.count,
        bo,
        gn
      ))
    const r = this.morphTexture.source.data.data
    let a = 0
    for (let l = 0; l < i.length; l++) a += i[l]
    const o = this.geometry.morphTargetsRelative ? 1 : 1 - a,
      c = s * t
    return ((r[c] = o), r.set(i, c + 1), this)
  }
  updateMorphTargets() {}
  dispose() {
    ;(this.dispatchEvent({ type: 'dispose' }),
      this.morphTexture !== null &&
        (this.morphTexture.dispose(), (this.morphTexture = null)))
  }
}
const ea = new D(),
  Zu = new D(),
  Ju = new zt()
class ei {
  constructor(t = new D(1, 0, 0), e = 0) {
    ;((this.isPlane = !0), (this.normal = t), (this.constant = e))
  }
  set(t, e) {
    return (this.normal.copy(t), (this.constant = e), this)
  }
  setComponents(t, e, i, s) {
    return (this.normal.set(t, e, i), (this.constant = s), this)
  }
  setFromNormalAndCoplanarPoint(t, e) {
    return (this.normal.copy(t), (this.constant = -e.dot(this.normal)), this)
  }
  setFromCoplanarPoints(t, e, i) {
    const s = ea.subVectors(i, e).cross(Zu.subVectors(t, e)).normalize()
    return (this.setFromNormalAndCoplanarPoint(s, t), this)
  }
  copy(t) {
    return (this.normal.copy(t.normal), (this.constant = t.constant), this)
  }
  normalize() {
    const t = 1 / this.normal.length()
    return (this.normal.multiplyScalar(t), (this.constant *= t), this)
  }
  negate() {
    return ((this.constant *= -1), this.normal.negate(), this)
  }
  distanceToPoint(t) {
    return this.normal.dot(t) + this.constant
  }
  distanceToSphere(t) {
    return this.distanceToPoint(t.center) - t.radius
  }
  projectPoint(t, e) {
    return e.copy(t).addScaledVector(this.normal, -this.distanceToPoint(t))
  }
  intersectLine(t, e, i = !0) {
    const s = t.delta(ea),
      r = this.normal.dot(s)
    if (r === 0)
      return this.distanceToPoint(t.start) === 0 ? e.copy(t.start) : null
    const a = -(t.start.dot(this.normal) + this.constant) / r
    return i === !0 && (a < 0 || a > 1)
      ? null
      : e.copy(t.start).addScaledVector(s, a)
  }
  intersectsLine(t) {
    const e = this.distanceToPoint(t.start),
      i = this.distanceToPoint(t.end)
    return (e < 0 && i > 0) || (i < 0 && e > 0)
  }
  intersectsBox(t) {
    return t.intersectsPlane(this)
  }
  intersectsSphere(t) {
    return t.intersectsPlane(this)
  }
  coplanarPoint(t) {
    return t.copy(this.normal).multiplyScalar(-this.constant)
  }
  applyMatrix4(t, e) {
    const i = e || Ju.getNormalMatrix(t),
      s = this.coplanarPoint(ea).applyMatrix4(t),
      r = this.normal.applyMatrix3(i).normalize()
    return ((this.constant = -s.dot(r)), this)
  }
  translate(t) {
    return ((this.constant -= t.dot(this.normal)), this)
  }
  equals(t) {
    return t.normal.equals(this.normal) && t.constant === this.constant
  }
  clone() {
    return new this.constructor().copy(this)
  }
}
const fi = new Zi(),
  Qu = new Nt(0.5, 0.5),
  ks = new D()
class Uo {
  constructor(
    t = new ei(),
    e = new ei(),
    i = new ei(),
    s = new ei(),
    r = new ei(),
    a = new ei()
  ) {
    this.planes = [t, e, i, s, r, a]
  }
  set(t, e, i, s, r, a) {
    const o = this.planes
    return (
      o[0].copy(t),
      o[1].copy(e),
      o[2].copy(i),
      o[3].copy(s),
      o[4].copy(r),
      o[5].copy(a),
      this
    )
  }
  copy(t) {
    const e = this.planes
    for (let i = 0; i < 6; i++) e[i].copy(t.planes[i])
    return this
  }
  setFromProjectionMatrix(t, e = Tn, i = !1) {
    const s = this.planes,
      r = t.elements,
      a = r[0],
      o = r[1],
      c = r[2],
      l = r[3],
      u = r[4],
      p = r[5],
      h = r[6],
      m = r[7],
      g = r[8],
      v = r[9],
      f = r[10],
      d = r[11],
      M = r[12],
      T = r[13],
      w = r[14],
      C = r[15]
    if (
      (s[0].setComponents(l - a, m - u, d - g, C - M).normalize(),
      s[1].setComponents(l + a, m + u, d + g, C + M).normalize(),
      s[2].setComponents(l + o, m + p, d + v, C + T).normalize(),
      s[3].setComponents(l - o, m - p, d - v, C - T).normalize(),
      i)
    )
      (s[4].setComponents(c, h, f, w).normalize(),
        s[5].setComponents(l - c, m - h, d - f, C - w).normalize())
    else if (
      (s[4].setComponents(l - c, m - h, d - f, C - w).normalize(), e === Tn)
    )
      s[5].setComponents(l + c, m + h, d + f, C + w).normalize()
    else if (e === _s) s[5].setComponents(c, h, f, w).normalize()
    else
      throw new Error(
        'THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: ' +
          e
      )
    return this
  }
  intersectsObject(t) {
    if (t.boundingSphere !== void 0)
      (t.boundingSphere === null && t.computeBoundingSphere(),
        fi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld))
    else {
      const e = t.geometry
      ;(e.boundingSphere === null && e.computeBoundingSphere(),
        fi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld))
    }
    return this.intersectsSphere(fi)
  }
  intersectsSprite(t) {
    fi.center.set(0, 0, 0)
    const e = Qu.distanceTo(t.center)
    return (
      (fi.radius = 0.7071067811865476 + e),
      fi.applyMatrix4(t.matrixWorld),
      this.intersectsSphere(fi)
    )
  }
  intersectsSphere(t) {
    const e = this.planes,
      i = t.center,
      s = -t.radius
    for (let r = 0; r < 6; r++) if (e[r].distanceToPoint(i) < s) return !1
    return !0
  }
  intersectsBox(t) {
    const e = this.planes
    for (let i = 0; i < 6; i++) {
      const s = e[i]
      if (
        ((ks.x = s.normal.x > 0 ? t.max.x : t.min.x),
        (ks.y = s.normal.y > 0 ? t.max.y : t.min.y),
        (ks.z = s.normal.z > 0 ? t.max.z : t.min.z),
        s.distanceToPoint(ks) < 0)
      )
        return !1
    }
    return !0
  }
  containsPoint(t) {
    const e = this.planes
    for (let i = 0; i < 6; i++) if (e[i].distanceToPoint(t) < 0) return !1
    return !0
  }
  clone() {
    return new this.constructor().copy(this)
  }
}
class Kc extends Si {
  constructor(t) {
    ;(super(),
      (this.isLineBasicMaterial = !0),
      (this.type = 'LineBasicMaterial'),
      (this.color = new Ot(16777215)),
      (this.map = null),
      (this.linewidth = 1),
      (this.linecap = 'round'),
      (this.linejoin = 'round'),
      (this.fog = !0),
      this.setValues(t))
  }
  copy(t) {
    return (
      super.copy(t),
      this.color.copy(t.color),
      (this.map = t.map),
      (this.linewidth = t.linewidth),
      (this.linecap = t.linecap),
      (this.linejoin = t.linejoin),
      (this.fog = t.fog),
      this
    )
  }
}
const mr = new D(),
  gr = new D(),
  Cl = new le(),
  rs = new Sr(),
  Gs = new Zi(),
  na = new D(),
  Pl = new D()
class td extends ye {
  constructor(t = new Ye(), e = new Kc()) {
    ;(super(),
      (this.isLine = !0),
      (this.type = 'Line'),
      (this.geometry = t),
      (this.material = e),
      (this.morphTargetDictionary = void 0),
      (this.morphTargetInfluences = void 0),
      this.updateMorphTargets())
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      (this.material = Array.isArray(t.material)
        ? t.material.slice()
        : t.material),
      (this.geometry = t.geometry),
      this
    )
  }
  computeLineDistances() {
    const t = this.geometry
    if (t.index === null) {
      const e = t.attributes.position,
        i = [0]
      for (let s = 1, r = e.count; s < r; s++)
        (mr.fromBufferAttribute(e, s - 1),
          gr.fromBufferAttribute(e, s),
          (i[s] = i[s - 1]),
          (i[s] += mr.distanceTo(gr)))
      t.setAttribute('lineDistance', new be(i, 1))
    } else
      Dt(
        'Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.'
      )
    return this
  }
  raycast(t, e) {
    const i = this.geometry,
      s = this.matrixWorld,
      r = t.params.Line.threshold,
      a = i.drawRange
    if (
      (i.boundingSphere === null && i.computeBoundingSphere(),
      Gs.copy(i.boundingSphere),
      Gs.applyMatrix4(s),
      (Gs.radius += r),
      t.ray.intersectsSphere(Gs) === !1)
    )
      return
    ;(Cl.copy(s).invert(), rs.copy(t.ray).applyMatrix4(Cl))
    const o = r / ((this.scale.x + this.scale.y + this.scale.z) / 3),
      c = o * o,
      l = this.isLineSegments ? 2 : 1,
      u = i.index,
      h = i.attributes.position
    if (u !== null) {
      const m = Math.max(0, a.start),
        g = Math.min(u.count, a.start + a.count)
      for (let v = m, f = g - 1; v < f; v += l) {
        const d = u.getX(v),
          M = u.getX(v + 1),
          T = Hs(this, t, rs, c, d, M, v)
        T && e.push(T)
      }
      if (this.isLineLoop) {
        const v = u.getX(g - 1),
          f = u.getX(m),
          d = Hs(this, t, rs, c, v, f, g - 1)
        d && e.push(d)
      }
    } else {
      const m = Math.max(0, a.start),
        g = Math.min(h.count, a.start + a.count)
      for (let v = m, f = g - 1; v < f; v += l) {
        const d = Hs(this, t, rs, c, v, v + 1, v)
        d && e.push(d)
      }
      if (this.isLineLoop) {
        const v = Hs(this, t, rs, c, g - 1, m, g - 1)
        v && e.push(v)
      }
    }
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes,
      i = Object.keys(e)
    if (i.length > 0) {
      const s = e[i[0]]
      if (s !== void 0) {
        ;((this.morphTargetInfluences = []), (this.morphTargetDictionary = {}))
        for (let r = 0, a = s.length; r < a; r++) {
          const o = s[r].name || String(r)
          ;(this.morphTargetInfluences.push(0),
            (this.morphTargetDictionary[o] = r))
        }
      }
    }
  }
}
function Hs(n, t, e, i, s, r, a) {
  const o = n.geometry.attributes.position
  if (
    (mr.fromBufferAttribute(o, s),
    gr.fromBufferAttribute(o, r),
    e.distanceSqToSegment(mr, gr, na, Pl) > i)
  )
    return
  na.applyMatrix4(n.matrixWorld)
  const l = t.ray.origin.distanceTo(na)
  if (!(l < t.near || l > t.far))
    return {
      distance: l,
      point: Pl.clone().applyMatrix4(n.matrixWorld),
      index: a,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: n,
    }
}
const Ll = new D(),
  Dl = new D()
class ed extends td {
  constructor(t, e) {
    ;(super(t, e), (this.isLineSegments = !0), (this.type = 'LineSegments'))
  }
  computeLineDistances() {
    const t = this.geometry
    if (t.index === null) {
      const e = t.attributes.position,
        i = []
      for (let s = 0, r = e.count; s < r; s += 2)
        (Ll.fromBufferAttribute(e, s),
          Dl.fromBufferAttribute(e, s + 1),
          (i[s] = s === 0 ? 0 : i[s - 1]),
          (i[s + 1] = i[s] + Ll.distanceTo(Dl)))
      t.setAttribute('lineDistance', new be(i, 1))
    } else
      Dt(
        'LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.'
      )
    return this
  }
}
class $c extends Ve {
  constructor(t = [], e = vi, i, s, r, a, o, c, l, u) {
    ;(super(t, e, i, s, r, a, o, c, l, u),
      (this.isCubeTexture = !0),
      (this.flipY = !1))
  }
  get images() {
    return this.image
  }
  set images(t) {
    this.image = t
  }
}
class nd extends Ve {
  constructor(t, e, i, s, r, a, o, c, l) {
    ;(super(t, e, i, s, r, a, o, c, l),
      (this.isCanvasTexture = !0),
      (this.needsUpdate = !0))
  }
}
class Yi extends Ve {
  constructor(t, e, i = Rn, s, r, a, o = Fe, c = Fe, l, u = Vn, p = 1) {
    if (u !== Vn && u !== xi)
      throw new Error(
        'DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat'
      )
    const h = { width: t, height: e, depth: p }
    ;(super(h, s, r, a, o, c, u, i, l),
      (this.isDepthTexture = !0),
      (this.flipY = !1),
      (this.generateMipmaps = !1),
      (this.compareFunction = null))
  }
  copy(t) {
    return (
      super.copy(t),
      (this.source = new Po(Object.assign({}, t.image))),
      (this.compareFunction = t.compareFunction),
      this
    )
  }
  toJSON(t) {
    const e = super.toJSON(t)
    return (
      this.compareFunction !== null &&
        (e.compareFunction = this.compareFunction),
      e
    )
  }
}
class id extends Yi {
  constructor(t, e = Rn, i = vi, s, r, a = Fe, o = Fe, c, l = Vn) {
    const u = { width: t, height: t, depth: 1 },
      p = [u, u, u, u, u, u]
    ;(super(t, t, e, i, s, r, a, o, c, l),
      (this.image = p),
      (this.isCubeDepthTexture = !0),
      (this.isCubeTexture = !0))
  }
  get images() {
    return this.image
  }
  set images(t) {
    this.image = t
  }
}
class Zc extends Ve {
  constructor(t = null) {
    ;(super(), (this.sourceTexture = t), (this.isExternalTexture = !0))
  }
  copy(t) {
    return (super.copy(t), (this.sourceTexture = t.sourceTexture), this)
  }
}
class Ue extends Ye {
  constructor(t = 1, e = 1, i = 1, s = 1, r = 1, a = 1) {
    ;(super(),
      (this.type = 'BoxGeometry'),
      (this.parameters = {
        width: t,
        height: e,
        depth: i,
        widthSegments: s,
        heightSegments: r,
        depthSegments: a,
      }))
    const o = this
    ;((s = Math.floor(s)), (r = Math.floor(r)), (a = Math.floor(a)))
    const c = [],
      l = [],
      u = [],
      p = []
    let h = 0,
      m = 0
    ;(g('z', 'y', 'x', -1, -1, i, e, t, a, r, 0),
      g('z', 'y', 'x', 1, -1, i, e, -t, a, r, 1),
      g('x', 'z', 'y', 1, 1, t, i, e, s, a, 2),
      g('x', 'z', 'y', 1, -1, t, i, -e, s, a, 3),
      g('x', 'y', 'z', 1, -1, t, e, i, s, r, 4),
      g('x', 'y', 'z', -1, -1, t, e, -i, s, r, 5),
      this.setIndex(c),
      this.setAttribute('position', new be(l, 3)),
      this.setAttribute('normal', new be(u, 3)),
      this.setAttribute('uv', new be(p, 2)))
    function g(v, f, d, M, T, w, C, A, y, _, b) {
      const P = w / y,
        R = C / _,
        N = w / 2,
        V = C / 2,
        W = A / 2,
        I = y + 1,
        G = _ + 1
      let O = 0,
        J = 0
      const et = new D()
      for (let dt = 0; dt < G; dt++) {
        const Tt = dt * R - V
        for (let Rt = 0; Rt < I; Rt++) {
          const nt = Rt * P - N
          ;((et[v] = nt * M),
            (et[f] = Tt * T),
            (et[d] = W),
            l.push(et.x, et.y, et.z),
            (et[v] = 0),
            (et[f] = 0),
            (et[d] = A > 0 ? 1 : -1),
            u.push(et.x, et.y, et.z),
            p.push(Rt / y),
            p.push(1 - dt / _),
            (O += 1))
        }
      }
      for (let dt = 0; dt < _; dt++)
        for (let Tt = 0; Tt < y; Tt++) {
          const Rt = h + Tt + I * dt,
            nt = h + Tt + I * (dt + 1),
            vt = h + (Tt + 1) + I * (dt + 1),
            _t = h + (Tt + 1) + I * dt
          ;(c.push(Rt, nt, _t), c.push(nt, vt, _t), (J += 6))
        }
      ;(o.addGroup(m, J, b), (m += J), (h += O))
    }
  }
  copy(t) {
    return (
      super.copy(t),
      (this.parameters = Object.assign({}, t.parameters)),
      this
    )
  }
  static fromJSON(t) {
    return new Ue(
      t.width,
      t.height,
      t.depth,
      t.widthSegments,
      t.heightSegments,
      t.depthSegments
    )
  }
}
class No extends Ye {
  constructor(t = 1, e = 32, i = 0, s = Math.PI * 2) {
    ;(super(),
      (this.type = 'CircleGeometry'),
      (this.parameters = {
        radius: t,
        segments: e,
        thetaStart: i,
        thetaLength: s,
      }),
      (e = Math.max(3, e)))
    const r = [],
      a = [],
      o = [],
      c = [],
      l = new D(),
      u = new Nt()
    ;(a.push(0, 0, 0), o.push(0, 0, 1), c.push(0.5, 0.5))
    for (let p = 0, h = 3; p <= e; p++, h += 3) {
      const m = i + (p / e) * s
      ;((l.x = t * Math.cos(m)),
        (l.y = t * Math.sin(m)),
        a.push(l.x, l.y, l.z),
        o.push(0, 0, 1),
        (u.x = (a[h] / t + 1) / 2),
        (u.y = (a[h + 1] / t + 1) / 2),
        c.push(u.x, u.y))
    }
    for (let p = 1; p <= e; p++) r.push(p, p + 1, 0)
    ;(this.setIndex(r),
      this.setAttribute('position', new be(a, 3)),
      this.setAttribute('normal', new be(o, 3)),
      this.setAttribute('uv', new be(c, 2)))
  }
  copy(t) {
    return (
      super.copy(t),
      (this.parameters = Object.assign({}, t.parameters)),
      this
    )
  }
  static fromJSON(t) {
    return new No(t.radius, t.segments, t.thetaStart, t.thetaLength)
  }
}
class Fo extends Ye {
  constructor(
    t = 1,
    e = 1,
    i = 1,
    s = 32,
    r = 1,
    a = !1,
    o = 0,
    c = Math.PI * 2
  ) {
    ;(super(),
      (this.type = 'CylinderGeometry'),
      (this.parameters = {
        radiusTop: t,
        radiusBottom: e,
        height: i,
        radialSegments: s,
        heightSegments: r,
        openEnded: a,
        thetaStart: o,
        thetaLength: c,
      }))
    const l = this
    ;((s = Math.floor(s)), (r = Math.floor(r)))
    const u = [],
      p = [],
      h = [],
      m = []
    let g = 0
    const v = [],
      f = i / 2
    let d = 0
    ;(M(),
      a === !1 && (t > 0 && T(!0), e > 0 && T(!1)),
      this.setIndex(u),
      this.setAttribute('position', new be(p, 3)),
      this.setAttribute('normal', new be(h, 3)),
      this.setAttribute('uv', new be(m, 2)))
    function M() {
      const w = new D(),
        C = new D()
      let A = 0
      const y = (e - t) / i
      for (let _ = 0; _ <= r; _++) {
        const b = [],
          P = _ / r,
          R = P * (e - t) + t
        for (let N = 0; N <= s; N++) {
          const V = N / s,
            W = V * c + o,
            I = Math.sin(W),
            G = Math.cos(W)
          ;((C.x = R * I),
            (C.y = -P * i + f),
            (C.z = R * G),
            p.push(C.x, C.y, C.z),
            w.set(I, y, G).normalize(),
            h.push(w.x, w.y, w.z),
            m.push(V, 1 - P),
            b.push(g++))
        }
        v.push(b)
      }
      for (let _ = 0; _ < s; _++)
        for (let b = 0; b < r; b++) {
          const P = v[b][_],
            R = v[b + 1][_],
            N = v[b + 1][_ + 1],
            V = v[b][_ + 1]
          ;((t > 0 || b !== 0) && (u.push(P, R, V), (A += 3)),
            (e > 0 || b !== r - 1) && (u.push(R, N, V), (A += 3)))
        }
      ;(l.addGroup(d, A, 0), (d += A))
    }
    function T(w) {
      const C = g,
        A = new Nt(),
        y = new D()
      let _ = 0
      const b = w === !0 ? t : e,
        P = w === !0 ? 1 : -1
      for (let N = 1; N <= s; N++)
        (p.push(0, f * P, 0), h.push(0, P, 0), m.push(0.5, 0.5), g++)
      const R = g
      for (let N = 0; N <= s; N++) {
        const W = (N / s) * c + o,
          I = Math.cos(W),
          G = Math.sin(W)
        ;((y.x = b * G),
          (y.y = f * P),
          (y.z = b * I),
          p.push(y.x, y.y, y.z),
          h.push(0, P, 0),
          (A.x = I * 0.5 + 0.5),
          (A.y = G * 0.5 * P + 0.5),
          m.push(A.x, A.y),
          g++)
      }
      for (let N = 0; N < s; N++) {
        const V = C + N,
          W = R + N
        ;(w === !0 ? u.push(W, W + 1, V) : u.push(W + 1, W, V), (_ += 3))
      }
      ;(l.addGroup(d, _, w === !0 ? 1 : 2), (d += _))
    }
  }
  copy(t) {
    return (
      super.copy(t),
      (this.parameters = Object.assign({}, t.parameters)),
      this
    )
  }
  static fromJSON(t) {
    return new Fo(
      t.radiusTop,
      t.radiusBottom,
      t.height,
      t.radialSegments,
      t.heightSegments,
      t.openEnded,
      t.thetaStart,
      t.thetaLength
    )
  }
}
class yr extends Ye {
  constructor(t = 1, e = 1, i = 1, s = 1) {
    ;(super(),
      (this.type = 'PlaneGeometry'),
      (this.parameters = {
        width: t,
        height: e,
        widthSegments: i,
        heightSegments: s,
      }))
    const r = t / 2,
      a = e / 2,
      o = Math.floor(i),
      c = Math.floor(s),
      l = o + 1,
      u = c + 1,
      p = t / o,
      h = e / c,
      m = [],
      g = [],
      v = [],
      f = []
    for (let d = 0; d < u; d++) {
      const M = d * h - a
      for (let T = 0; T < l; T++) {
        const w = T * p - r
        ;(g.push(w, -M, 0), v.push(0, 0, 1), f.push(T / o), f.push(1 - d / c))
      }
    }
    for (let d = 0; d < c; d++)
      for (let M = 0; M < o; M++) {
        const T = M + l * d,
          w = M + l * (d + 1),
          C = M + 1 + l * (d + 1),
          A = M + 1 + l * d
        ;(m.push(T, w, A), m.push(w, C, A))
      }
    ;(this.setIndex(m),
      this.setAttribute('position', new be(g, 3)),
      this.setAttribute('normal', new be(v, 3)),
      this.setAttribute('uv', new be(f, 2)))
  }
  copy(t) {
    return (
      super.copy(t),
      (this.parameters = Object.assign({}, t.parameters)),
      this
    )
  }
  static fromJSON(t) {
    return new yr(t.width, t.height, t.widthSegments, t.heightSegments)
  }
}
class Oo extends Ye {
  constructor(
    t = 1,
    e = 32,
    i = 16,
    s = 0,
    r = Math.PI * 2,
    a = 0,
    o = Math.PI
  ) {
    ;(super(),
      (this.type = 'SphereGeometry'),
      (this.parameters = {
        radius: t,
        widthSegments: e,
        heightSegments: i,
        phiStart: s,
        phiLength: r,
        thetaStart: a,
        thetaLength: o,
      }),
      (e = Math.max(3, Math.floor(e))),
      (i = Math.max(2, Math.floor(i))))
    const c = Math.min(a + o, Math.PI)
    let l = 0
    const u = [],
      p = new D(),
      h = new D(),
      m = [],
      g = [],
      v = [],
      f = []
    for (let d = 0; d <= i; d++) {
      const M = [],
        T = d / i
      let w = 0
      d === 0 && a === 0
        ? (w = 0.5 / e)
        : d === i && c === Math.PI && (w = -0.5 / e)
      for (let C = 0; C <= e; C++) {
        const A = C / e
        ;((p.x = -t * Math.cos(s + A * r) * Math.sin(a + T * o)),
          (p.y = t * Math.cos(a + T * o)),
          (p.z = t * Math.sin(s + A * r) * Math.sin(a + T * o)),
          g.push(p.x, p.y, p.z),
          h.copy(p).normalize(),
          v.push(h.x, h.y, h.z),
          f.push(A + w, 1 - T),
          M.push(l++))
      }
      u.push(M)
    }
    for (let d = 0; d < i; d++)
      for (let M = 0; M < e; M++) {
        const T = u[d][M + 1],
          w = u[d][M],
          C = u[d + 1][M],
          A = u[d + 1][M + 1]
        ;((d !== 0 || a > 0) && m.push(T, w, A),
          (d !== i - 1 || c < Math.PI) && m.push(w, C, A))
      }
    ;(this.setIndex(m),
      this.setAttribute('position', new be(g, 3)),
      this.setAttribute('normal', new be(v, 3)),
      this.setAttribute('uv', new be(f, 2)))
  }
  copy(t) {
    return (
      super.copy(t),
      (this.parameters = Object.assign({}, t.parameters)),
      this
    )
  }
  static fromJSON(t) {
    return new Oo(
      t.radius,
      t.widthSegments,
      t.heightSegments,
      t.phiStart,
      t.phiLength,
      t.thetaStart,
      t.thetaLength
    )
  }
}
function ji(n) {
  const t = {}
  for (const e in n) {
    t[e] = {}
    for (const i in n[e]) {
      const s = n[e][i]
      if (Il(s))
        s.isRenderTargetTexture
          ? (Dt(
              'UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().'
            ),
            (t[e][i] = null))
          : (t[e][i] = s.clone())
      else if (Array.isArray(s))
        if (Il(s[0])) {
          const r = []
          for (let a = 0, o = s.length; a < o; a++) r[a] = s[a].clone()
          t[e][i] = r
        } else t[e][i] = s.slice()
      else t[e][i] = s
    }
  }
  return t
}
function Xe(n) {
  const t = {}
  for (let e = 0; e < n.length; e++) {
    const i = ji(n[e])
    for (const s in i) t[s] = i[s]
  }
  return t
}
function Il(n) {
  return (
    n &&
    (n.isColor ||
      n.isMatrix3 ||
      n.isMatrix4 ||
      n.isVector2 ||
      n.isVector3 ||
      n.isVector4 ||
      n.isTexture ||
      n.isQuaternion)
  )
}
function sd(n) {
  const t = []
  for (let e = 0; e < n.length; e++) t.push(n[e].clone())
  return t
}
function Jc(n) {
  const t = n.getRenderTarget()
  return t === null
    ? n.outputColorSpace
    : t.isXRRenderTarget === !0
      ? t.texture.colorSpace
      : $t.workingColorSpace
}
const rd = { clone: ji, merge: Xe }
var ad = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,
  od = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`
class Pn extends Si {
  constructor(t) {
    ;(super(),
      (this.isShaderMaterial = !0),
      (this.type = 'ShaderMaterial'),
      (this.defines = {}),
      (this.uniforms = {}),
      (this.uniformsGroups = []),
      (this.vertexShader = ad),
      (this.fragmentShader = od),
      (this.linewidth = 1),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.fog = !1),
      (this.lights = !1),
      (this.clipping = !1),
      (this.forceSinglePass = !0),
      (this.extensions = { clipCullDistance: !1, multiDraw: !1 }),
      (this.defaultAttributeValues = {
        color: [1, 1, 1],
        uv: [0, 0],
        uv1: [0, 0],
      }),
      (this.index0AttributeName = void 0),
      (this.uniformsNeedUpdate = !1),
      (this.glslVersion = null),
      t !== void 0 && this.setValues(t))
  }
  copy(t) {
    return (
      super.copy(t),
      (this.fragmentShader = t.fragmentShader),
      (this.vertexShader = t.vertexShader),
      (this.uniforms = ji(t.uniforms)),
      (this.uniformsGroups = sd(t.uniformsGroups)),
      (this.defines = Object.assign({}, t.defines)),
      (this.wireframe = t.wireframe),
      (this.wireframeLinewidth = t.wireframeLinewidth),
      (this.fog = t.fog),
      (this.lights = t.lights),
      (this.clipping = t.clipping),
      (this.extensions = Object.assign({}, t.extensions)),
      (this.glslVersion = t.glslVersion),
      (this.defaultAttributeValues = Object.assign(
        {},
        t.defaultAttributeValues
      )),
      (this.index0AttributeName = t.index0AttributeName),
      (this.uniformsNeedUpdate = t.uniformsNeedUpdate),
      this
    )
  }
  toJSON(t) {
    const e = super.toJSON(t)
    ;((e.glslVersion = this.glslVersion), (e.uniforms = {}))
    for (const s in this.uniforms) {
      const a = this.uniforms[s].value
      a && a.isTexture
        ? (e.uniforms[s] = { type: 't', value: a.toJSON(t).uuid })
        : a && a.isColor
          ? (e.uniforms[s] = { type: 'c', value: a.getHex() })
          : a && a.isVector2
            ? (e.uniforms[s] = { type: 'v2', value: a.toArray() })
            : a && a.isVector3
              ? (e.uniforms[s] = { type: 'v3', value: a.toArray() })
              : a && a.isVector4
                ? (e.uniforms[s] = { type: 'v4', value: a.toArray() })
                : a && a.isMatrix3
                  ? (e.uniforms[s] = { type: 'm3', value: a.toArray() })
                  : a && a.isMatrix4
                    ? (e.uniforms[s] = { type: 'm4', value: a.toArray() })
                    : (e.uniforms[s] = { value: a })
    }
    ;(Object.keys(this.defines).length > 0 && (e.defines = this.defines),
      (e.vertexShader = this.vertexShader),
      (e.fragmentShader = this.fragmentShader),
      (e.lights = this.lights),
      (e.clipping = this.clipping))
    const i = {}
    for (const s in this.extensions) this.extensions[s] === !0 && (i[s] = !0)
    return (Object.keys(i).length > 0 && (e.extensions = i), e)
  }
}
class ld extends Pn {
  constructor(t) {
    ;(super(t),
      (this.isRawShaderMaterial = !0),
      (this.type = 'RawShaderMaterial'))
  }
}
class _r extends Si {
  constructor(t) {
    ;(super(),
      (this.isMeshStandardMaterial = !0),
      (this.type = 'MeshStandardMaterial'),
      (this.defines = { STANDARD: '' }),
      (this.color = new Ot(16777215)),
      (this.roughness = 1),
      (this.metalness = 0),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.emissive = new Ot(0)),
      (this.emissiveIntensity = 1),
      (this.emissiveMap = null),
      (this.bumpMap = null),
      (this.bumpScale = 1),
      (this.normalMap = null),
      (this.normalMapType = ur),
      (this.normalScale = new Nt(1, 1)),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.roughnessMap = null),
      (this.metalnessMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.envMapRotation = new Cn()),
      (this.envMapIntensity = 1),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = 'round'),
      (this.wireframeLinejoin = 'round'),
      (this.flatShading = !1),
      (this.fog = !0),
      this.setValues(t))
  }
  copy(t) {
    return (
      super.copy(t),
      (this.defines = { STANDARD: '' }),
      this.color.copy(t.color),
      (this.roughness = t.roughness),
      (this.metalness = t.metalness),
      (this.map = t.map),
      (this.lightMap = t.lightMap),
      (this.lightMapIntensity = t.lightMapIntensity),
      (this.aoMap = t.aoMap),
      (this.aoMapIntensity = t.aoMapIntensity),
      this.emissive.copy(t.emissive),
      (this.emissiveMap = t.emissiveMap),
      (this.emissiveIntensity = t.emissiveIntensity),
      (this.bumpMap = t.bumpMap),
      (this.bumpScale = t.bumpScale),
      (this.normalMap = t.normalMap),
      (this.normalMapType = t.normalMapType),
      this.normalScale.copy(t.normalScale),
      (this.displacementMap = t.displacementMap),
      (this.displacementScale = t.displacementScale),
      (this.displacementBias = t.displacementBias),
      (this.roughnessMap = t.roughnessMap),
      (this.metalnessMap = t.metalnessMap),
      (this.alphaMap = t.alphaMap),
      (this.envMap = t.envMap),
      this.envMapRotation.copy(t.envMapRotation),
      (this.envMapIntensity = t.envMapIntensity),
      (this.wireframe = t.wireframe),
      (this.wireframeLinewidth = t.wireframeLinewidth),
      (this.wireframeLinecap = t.wireframeLinecap),
      (this.wireframeLinejoin = t.wireframeLinejoin),
      (this.flatShading = t.flatShading),
      (this.fog = t.fog),
      this
    )
  }
}
class cd extends Si {
  constructor(t) {
    ;(super(),
      (this.isMeshLambertMaterial = !0),
      (this.type = 'MeshLambertMaterial'),
      (this.color = new Ot(16777215)),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.emissive = new Ot(0)),
      (this.emissiveIntensity = 1),
      (this.emissiveMap = null),
      (this.bumpMap = null),
      (this.bumpScale = 1),
      (this.normalMap = null),
      (this.normalMapType = ur),
      (this.normalScale = new Nt(1, 1)),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.specularMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.envMapRotation = new Cn()),
      (this.combine = xo),
      (this.reflectivity = 1),
      (this.envMapIntensity = 1),
      (this.refractionRatio = 0.98),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = 'round'),
      (this.wireframeLinejoin = 'round'),
      (this.flatShading = !1),
      (this.fog = !0),
      this.setValues(t))
  }
  copy(t) {
    return (
      super.copy(t),
      this.color.copy(t.color),
      (this.map = t.map),
      (this.lightMap = t.lightMap),
      (this.lightMapIntensity = t.lightMapIntensity),
      (this.aoMap = t.aoMap),
      (this.aoMapIntensity = t.aoMapIntensity),
      this.emissive.copy(t.emissive),
      (this.emissiveMap = t.emissiveMap),
      (this.emissiveIntensity = t.emissiveIntensity),
      (this.bumpMap = t.bumpMap),
      (this.bumpScale = t.bumpScale),
      (this.normalMap = t.normalMap),
      (this.normalMapType = t.normalMapType),
      this.normalScale.copy(t.normalScale),
      (this.displacementMap = t.displacementMap),
      (this.displacementScale = t.displacementScale),
      (this.displacementBias = t.displacementBias),
      (this.specularMap = t.specularMap),
      (this.alphaMap = t.alphaMap),
      (this.envMap = t.envMap),
      this.envMapRotation.copy(t.envMapRotation),
      (this.combine = t.combine),
      (this.reflectivity = t.reflectivity),
      (this.envMapIntensity = t.envMapIntensity),
      (this.refractionRatio = t.refractionRatio),
      (this.wireframe = t.wireframe),
      (this.wireframeLinewidth = t.wireframeLinewidth),
      (this.wireframeLinecap = t.wireframeLinecap),
      (this.wireframeLinejoin = t.wireframeLinejoin),
      (this.flatShading = t.flatShading),
      (this.fog = t.fog),
      this
    )
  }
}
class hd extends Si {
  constructor(t) {
    ;(super(),
      (this.isMeshDepthMaterial = !0),
      (this.type = 'MeshDepthMaterial'),
      (this.depthPacking = iu),
      (this.map = null),
      (this.alphaMap = null),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      this.setValues(t))
  }
  copy(t) {
    return (
      super.copy(t),
      (this.depthPacking = t.depthPacking),
      (this.map = t.map),
      (this.alphaMap = t.alphaMap),
      (this.displacementMap = t.displacementMap),
      (this.displacementScale = t.displacementScale),
      (this.displacementBias = t.displacementBias),
      (this.wireframe = t.wireframe),
      (this.wireframeLinewidth = t.wireframeLinewidth),
      this
    )
  }
}
class ud extends Si {
  constructor(t) {
    ;(super(),
      (this.isMeshDistanceMaterial = !0),
      (this.type = 'MeshDistanceMaterial'),
      (this.map = null),
      (this.alphaMap = null),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      this.setValues(t))
  }
  copy(t) {
    return (
      super.copy(t),
      (this.map = t.map),
      (this.alphaMap = t.alphaMap),
      (this.displacementMap = t.displacementMap),
      (this.displacementScale = t.displacementScale),
      (this.displacementBias = t.displacementBias),
      this
    )
  }
}
class Bo extends ye {
  constructor(t, e = 1) {
    ;(super(),
      (this.isLight = !0),
      (this.type = 'Light'),
      (this.color = new Ot(t)),
      (this.intensity = e))
  }
  dispose() {
    this.dispatchEvent({ type: 'dispose' })
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      this.color.copy(t.color),
      (this.intensity = t.intensity),
      this
    )
  }
  toJSON(t) {
    const e = super.toJSON(t)
    return (
      (e.object.color = this.color.getHex()),
      (e.object.intensity = this.intensity),
      e
    )
  }
}
class dd extends Bo {
  constructor(t, e, i) {
    ;(super(t, i),
      (this.isHemisphereLight = !0),
      (this.type = 'HemisphereLight'),
      this.position.copy(ye.DEFAULT_UP),
      this.updateMatrix(),
      (this.groundColor = new Ot(e)))
  }
  copy(t, e) {
    return (super.copy(t, e), this.groundColor.copy(t.groundColor), this)
  }
  toJSON(t) {
    const e = super.toJSON(t)
    return ((e.object.groundColor = this.groundColor.getHex()), e)
  }
}
const ia = new le(),
  Ul = new D(),
  Nl = new D()
class Qc {
  constructor(t) {
    ;((this.camera = t),
      (this.intensity = 1),
      (this.bias = 0),
      (this.biasNode = null),
      (this.normalBias = 0),
      (this.radius = 1),
      (this.blurSamples = 8),
      (this.mapSize = new Nt(512, 512)),
      (this.mapType = an),
      (this.map = null),
      (this.mapPass = null),
      (this.matrix = new le()),
      (this.autoUpdate = !0),
      (this.needsUpdate = !1),
      (this._frustum = new Uo()),
      (this._frameExtents = new Nt(1, 1)),
      (this._viewportCount = 1),
      (this._viewports = [new xe(0, 0, 1, 1)]))
  }
  getViewportCount() {
    return this._viewportCount
  }
  getFrustum() {
    return this._frustum
  }
  updateMatrices(t) {
    const e = this.camera,
      i = this.matrix
    ;(Ul.setFromMatrixPosition(t.matrixWorld),
      e.position.copy(Ul),
      Nl.setFromMatrixPosition(t.target.matrixWorld),
      e.lookAt(Nl),
      e.updateMatrixWorld(),
      ia.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse),
      this._frustum.setFromProjectionMatrix(
        ia,
        e.coordinateSystem,
        e.reversedDepth
      ),
      e.coordinateSystem === _s || e.reversedDepth
        ? i.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 1, 0, 0, 0, 0, 1)
        : i.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1),
      i.multiply(ia))
  }
  getViewport(t) {
    return this._viewports[t]
  }
  getFrameExtents() {
    return this._frameExtents
  }
  dispose() {
    ;(this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose())
  }
  copy(t) {
    return (
      (this.camera = t.camera.clone()),
      (this.intensity = t.intensity),
      (this.bias = t.bias),
      (this.radius = t.radius),
      (this.autoUpdate = t.autoUpdate),
      (this.needsUpdate = t.needsUpdate),
      (this.normalBias = t.normalBias),
      (this.blurSamples = t.blurSamples),
      this.mapSize.copy(t.mapSize),
      (this.biasNode = t.biasNode),
      this
    )
  }
  clone() {
    return new this.constructor().copy(this)
  }
  toJSON() {
    const t = {}
    return (
      this.intensity !== 1 && (t.intensity = this.intensity),
      this.bias !== 0 && (t.bias = this.bias),
      this.normalBias !== 0 && (t.normalBias = this.normalBias),
      this.radius !== 1 && (t.radius = this.radius),
      (this.mapSize.x !== 512 || this.mapSize.y !== 512) &&
        (t.mapSize = this.mapSize.toArray()),
      (t.camera = this.camera.toJSON(!1).object),
      delete t.camera.matrix,
      t
    )
  }
}
const Vs = new D(),
  Ws = new Wn(),
  yn = new D()
class th extends ye {
  constructor() {
    ;(super(),
      (this.isCamera = !0),
      (this.type = 'Camera'),
      (this.matrixWorldInverse = new le()),
      (this.projectionMatrix = new le()),
      (this.projectionMatrixInverse = new le()),
      (this.coordinateSystem = Tn),
      (this._reversedDepth = !1))
  }
  get reversedDepth() {
    return this._reversedDepth
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      this.matrixWorldInverse.copy(t.matrixWorldInverse),
      this.projectionMatrix.copy(t.projectionMatrix),
      this.projectionMatrixInverse.copy(t.projectionMatrixInverse),
      (this.coordinateSystem = t.coordinateSystem),
      this
    )
  }
  getWorldDirection(t) {
    return super.getWorldDirection(t).negate()
  }
  updateMatrixWorld(t) {
    ;(super.updateMatrixWorld(t),
      this.matrixWorld.decompose(Vs, Ws, yn),
      yn.x === 1 && yn.y === 1 && yn.z === 1
        ? this.matrixWorldInverse.copy(this.matrixWorld).invert()
        : this.matrixWorldInverse.compose(Vs, Ws, yn.set(1, 1, 1)).invert())
  }
  updateWorldMatrix(t, e) {
    ;(super.updateWorldMatrix(t, e),
      this.matrixWorld.decompose(Vs, Ws, yn),
      yn.x === 1 && yn.y === 1 && yn.z === 1
        ? this.matrixWorldInverse.copy(this.matrixWorld).invert()
        : this.matrixWorldInverse.compose(Vs, Ws, yn.set(1, 1, 1)).invert())
  }
  clone() {
    return new this.constructor().copy(this)
  }
}
const ti = new D(),
  Fl = new Nt(),
  Ol = new Nt()
class sn extends th {
  constructor(t = 50, e = 1, i = 0.1, s = 2e3) {
    ;(super(),
      (this.isPerspectiveCamera = !0),
      (this.type = 'PerspectiveCamera'),
      (this.fov = t),
      (this.zoom = 1),
      (this.near = i),
      (this.far = s),
      (this.focus = 10),
      (this.aspect = e),
      (this.view = null),
      (this.filmGauge = 35),
      (this.filmOffset = 0),
      this.updateProjectionMatrix())
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      (this.fov = t.fov),
      (this.zoom = t.zoom),
      (this.near = t.near),
      (this.far = t.far),
      (this.focus = t.focus),
      (this.aspect = t.aspect),
      (this.view = t.view === null ? null : Object.assign({}, t.view)),
      (this.filmGauge = t.filmGauge),
      (this.filmOffset = t.filmOffset),
      this
    )
  }
  setFocalLength(t) {
    const e = (0.5 * this.getFilmHeight()) / t
    ;((this.fov = xs * 2 * Math.atan(e)), this.updateProjectionMatrix())
  }
  getFocalLength() {
    const t = Math.tan(fs * 0.5 * this.fov)
    return (0.5 * this.getFilmHeight()) / t
  }
  getEffectiveFOV() {
    return xs * 2 * Math.atan(Math.tan(fs * 0.5 * this.fov) / this.zoom)
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1)
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1)
  }
  getViewBounds(t, e, i) {
    ;(ti.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse),
      e.set(ti.x, ti.y).multiplyScalar(-t / ti.z),
      ti.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse),
      i.set(ti.x, ti.y).multiplyScalar(-t / ti.z))
  }
  getViewSize(t, e) {
    return (this.getViewBounds(t, Fl, Ol), e.subVectors(Ol, Fl))
  }
  setViewOffset(t, e, i, s, r, a) {
    ;((this.aspect = t / e),
      this.view === null &&
        (this.view = {
          enabled: !0,
          fullWidth: 1,
          fullHeight: 1,
          offsetX: 0,
          offsetY: 0,
          width: 1,
          height: 1,
        }),
      (this.view.enabled = !0),
      (this.view.fullWidth = t),
      (this.view.fullHeight = e),
      (this.view.offsetX = i),
      (this.view.offsetY = s),
      (this.view.width = r),
      (this.view.height = a),
      this.updateProjectionMatrix())
  }
  clearViewOffset() {
    ;(this.view !== null && (this.view.enabled = !1),
      this.updateProjectionMatrix())
  }
  updateProjectionMatrix() {
    const t = this.near
    let e = (t * Math.tan(fs * 0.5 * this.fov)) / this.zoom,
      i = 2 * e,
      s = this.aspect * i,
      r = -0.5 * s
    const a = this.view
    if (this.view !== null && this.view.enabled) {
      const c = a.fullWidth,
        l = a.fullHeight
      ;((r += (a.offsetX * s) / c),
        (e -= (a.offsetY * i) / l),
        (s *= a.width / c),
        (i *= a.height / l))
    }
    const o = this.filmOffset
    ;(o !== 0 && (r += (t * o) / this.getFilmWidth()),
      this.projectionMatrix.makePerspective(
        r,
        r + s,
        e,
        e - i,
        t,
        this.far,
        this.coordinateSystem,
        this.reversedDepth
      ),
      this.projectionMatrixInverse.copy(this.projectionMatrix).invert())
  }
  toJSON(t) {
    const e = super.toJSON(t)
    return (
      (e.object.fov = this.fov),
      (e.object.zoom = this.zoom),
      (e.object.near = this.near),
      (e.object.far = this.far),
      (e.object.focus = this.focus),
      (e.object.aspect = this.aspect),
      this.view !== null && (e.object.view = Object.assign({}, this.view)),
      (e.object.filmGauge = this.filmGauge),
      (e.object.filmOffset = this.filmOffset),
      e
    )
  }
}
class fd extends Qc {
  constructor() {
    ;(super(new sn(90, 1, 0.5, 500)), (this.isPointLightShadow = !0))
  }
}
class eh extends Bo {
  constructor(t, e, i = 0, s = 2) {
    ;(super(t, e),
      (this.isPointLight = !0),
      (this.type = 'PointLight'),
      (this.distance = i),
      (this.decay = s),
      (this.shadow = new fd()))
  }
  get power() {
    return this.intensity * 4 * Math.PI
  }
  set power(t) {
    this.intensity = t / (4 * Math.PI)
  }
  dispose() {
    ;(super.dispose(), this.shadow.dispose())
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      (this.distance = t.distance),
      (this.decay = t.decay),
      (this.shadow = t.shadow.clone()),
      this
    )
  }
  toJSON(t) {
    const e = super.toJSON(t)
    return (
      (e.object.distance = this.distance),
      (e.object.decay = this.decay),
      (e.object.shadow = this.shadow.toJSON()),
      e
    )
  }
}
class zo extends th {
  constructor(t = -1, e = 1, i = 1, s = -1, r = 0.1, a = 2e3) {
    ;(super(),
      (this.isOrthographicCamera = !0),
      (this.type = 'OrthographicCamera'),
      (this.zoom = 1),
      (this.view = null),
      (this.left = t),
      (this.right = e),
      (this.top = i),
      (this.bottom = s),
      (this.near = r),
      (this.far = a),
      this.updateProjectionMatrix())
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      (this.left = t.left),
      (this.right = t.right),
      (this.top = t.top),
      (this.bottom = t.bottom),
      (this.near = t.near),
      (this.far = t.far),
      (this.zoom = t.zoom),
      (this.view = t.view === null ? null : Object.assign({}, t.view)),
      this
    )
  }
  setViewOffset(t, e, i, s, r, a) {
    ;(this.view === null &&
      (this.view = {
        enabled: !0,
        fullWidth: 1,
        fullHeight: 1,
        offsetX: 0,
        offsetY: 0,
        width: 1,
        height: 1,
      }),
      (this.view.enabled = !0),
      (this.view.fullWidth = t),
      (this.view.fullHeight = e),
      (this.view.offsetX = i),
      (this.view.offsetY = s),
      (this.view.width = r),
      (this.view.height = a),
      this.updateProjectionMatrix())
  }
  clearViewOffset() {
    ;(this.view !== null && (this.view.enabled = !1),
      this.updateProjectionMatrix())
  }
  updateProjectionMatrix() {
    const t = (this.right - this.left) / (2 * this.zoom),
      e = (this.top - this.bottom) / (2 * this.zoom),
      i = (this.right + this.left) / 2,
      s = (this.top + this.bottom) / 2
    let r = i - t,
      a = i + t,
      o = s + e,
      c = s - e
    if (this.view !== null && this.view.enabled) {
      const l = (this.right - this.left) / this.view.fullWidth / this.zoom,
        u = (this.top - this.bottom) / this.view.fullHeight / this.zoom
      ;((r += l * this.view.offsetX),
        (a = r + l * this.view.width),
        (o -= u * this.view.offsetY),
        (c = o - u * this.view.height))
    }
    ;(this.projectionMatrix.makeOrthographic(
      r,
      a,
      o,
      c,
      this.near,
      this.far,
      this.coordinateSystem,
      this.reversedDepth
    ),
      this.projectionMatrixInverse.copy(this.projectionMatrix).invert())
  }
  toJSON(t) {
    const e = super.toJSON(t)
    return (
      (e.object.zoom = this.zoom),
      (e.object.left = this.left),
      (e.object.right = this.right),
      (e.object.top = this.top),
      (e.object.bottom = this.bottom),
      (e.object.near = this.near),
      (e.object.far = this.far),
      this.view !== null && (e.object.view = Object.assign({}, this.view)),
      e
    )
  }
}
class pd extends Qc {
  constructor() {
    ;(super(new zo(-5, 5, 5, -5, 0.5, 500)),
      (this.isDirectionalLightShadow = !0))
  }
}
class md extends Bo {
  constructor(t, e) {
    ;(super(t, e),
      (this.isDirectionalLight = !0),
      (this.type = 'DirectionalLight'),
      this.position.copy(ye.DEFAULT_UP),
      this.updateMatrix(),
      (this.target = new ye()),
      (this.shadow = new pd()))
  }
  dispose() {
    ;(super.dispose(), this.shadow.dispose())
  }
  copy(t) {
    return (
      super.copy(t),
      (this.target = t.target.clone()),
      (this.shadow = t.shadow.clone()),
      this
    )
  }
  toJSON(t) {
    const e = super.toJSON(t)
    return (
      (e.object.shadow = this.shadow.toJSON()),
      (e.object.target = this.target.uuid),
      e
    )
  }
}
const Fi = -90,
  Oi = 1
class gd extends ye {
  constructor(t, e, i) {
    ;(super(),
      (this.type = 'CubeCamera'),
      (this.renderTarget = i),
      (this.coordinateSystem = null),
      (this.activeMipmapLevel = 0))
    const s = new sn(Fi, Oi, t, e)
    ;((s.layers = this.layers), this.add(s))
    const r = new sn(Fi, Oi, t, e)
    ;((r.layers = this.layers), this.add(r))
    const a = new sn(Fi, Oi, t, e)
    ;((a.layers = this.layers), this.add(a))
    const o = new sn(Fi, Oi, t, e)
    ;((o.layers = this.layers), this.add(o))
    const c = new sn(Fi, Oi, t, e)
    ;((c.layers = this.layers), this.add(c))
    const l = new sn(Fi, Oi, t, e)
    ;((l.layers = this.layers), this.add(l))
  }
  updateCoordinateSystem() {
    const t = this.coordinateSystem,
      e = this.children.concat(),
      [i, s, r, a, o, c] = e
    for (const l of e) this.remove(l)
    if (t === Tn)
      (i.up.set(0, 1, 0),
        i.lookAt(1, 0, 0),
        s.up.set(0, 1, 0),
        s.lookAt(-1, 0, 0),
        r.up.set(0, 0, -1),
        r.lookAt(0, 1, 0),
        a.up.set(0, 0, 1),
        a.lookAt(0, -1, 0),
        o.up.set(0, 1, 0),
        o.lookAt(0, 0, 1),
        c.up.set(0, 1, 0),
        c.lookAt(0, 0, -1))
    else if (t === _s)
      (i.up.set(0, -1, 0),
        i.lookAt(-1, 0, 0),
        s.up.set(0, -1, 0),
        s.lookAt(1, 0, 0),
        r.up.set(0, 0, 1),
        r.lookAt(0, 1, 0),
        a.up.set(0, 0, -1),
        a.lookAt(0, -1, 0),
        o.up.set(0, -1, 0),
        o.lookAt(0, 0, 1),
        c.up.set(0, -1, 0),
        c.lookAt(0, 0, -1))
    else
      throw new Error(
        'THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: ' +
          t
      )
    for (const l of e) (this.add(l), l.updateMatrixWorld())
  }
  update(t, e) {
    this.parent === null && this.updateMatrixWorld()
    const { renderTarget: i, activeMipmapLevel: s } = this
    this.coordinateSystem !== t.coordinateSystem &&
      ((this.coordinateSystem = t.coordinateSystem),
      this.updateCoordinateSystem())
    const [r, a, o, c, l, u] = this.children,
      p = t.getRenderTarget(),
      h = t.getActiveCubeFace(),
      m = t.getActiveMipmapLevel(),
      g = t.xr.enabled
    t.xr.enabled = !1
    const v = i.texture.generateMipmaps
    i.texture.generateMipmaps = !1
    let f = !1
    ;(t.isWebGLRenderer === !0
      ? (f = t.state.buffers.depth.getReversed())
      : (f = t.reversedDepthBuffer),
      t.setRenderTarget(i, 0, s),
      f && t.autoClear === !1 && t.clearDepth(),
      t.render(e, r),
      t.setRenderTarget(i, 1, s),
      f && t.autoClear === !1 && t.clearDepth(),
      t.render(e, a),
      t.setRenderTarget(i, 2, s),
      f && t.autoClear === !1 && t.clearDepth(),
      t.render(e, o),
      t.setRenderTarget(i, 3, s),
      f && t.autoClear === !1 && t.clearDepth(),
      t.render(e, c),
      t.setRenderTarget(i, 4, s),
      f && t.autoClear === !1 && t.clearDepth(),
      t.render(e, l),
      (i.texture.generateMipmaps = v),
      t.setRenderTarget(i, 5, s),
      f && t.autoClear === !1 && t.clearDepth(),
      t.render(e, u),
      t.setRenderTarget(p, h, m),
      (t.xr.enabled = g),
      (i.texture.needsPMREMUpdate = !0))
  }
}
class _d extends sn {
  constructor(t = []) {
    ;(super(),
      (this.isArrayCamera = !0),
      (this.isMultiViewCamera = !1),
      (this.cameras = t))
  }
}
const Bl = new le()
class xd {
  constructor(t, e, i = 0, s = 1 / 0) {
    ;((this.ray = new Sr(t, e)),
      (this.near = i),
      (this.far = s),
      (this.camera = null),
      (this.layers = new Lo()),
      (this.params = {
        Mesh: {},
        Line: { threshold: 1 },
        LOD: {},
        Points: { threshold: 1 },
        Sprite: {},
      }))
  }
  set(t, e) {
    this.ray.set(t, e)
  }
  setFromCamera(t, e) {
    e.isPerspectiveCamera
      ? (this.ray.origin.setFromMatrixPosition(e.matrixWorld),
        this.ray.direction
          .set(t.x, t.y, 0.5)
          .unproject(e)
          .sub(this.ray.origin)
          .normalize(),
        (this.camera = e))
      : e.isOrthographicCamera
        ? (this.ray.origin
            .set(t.x, t.y, (e.near + e.far) / (e.near - e.far))
            .unproject(e),
          this.ray.direction.set(0, 0, -1).transformDirection(e.matrixWorld),
          (this.camera = e))
        : Zt('Raycaster: Unsupported camera type: ' + e.type)
  }
  setFromXRController(t) {
    return (
      Bl.identity().extractRotation(t.matrixWorld),
      this.ray.origin.setFromMatrixPosition(t.matrixWorld),
      this.ray.direction.set(0, 0, -1).applyMatrix4(Bl),
      this
    )
  }
  intersectObject(t, e = !0, i = []) {
    return (oo(t, this, i, e), i.sort(zl), i)
  }
  intersectObjects(t, e = !0, i = []) {
    for (let s = 0, r = t.length; s < r; s++) oo(t[s], this, i, e)
    return (i.sort(zl), i)
  }
}
function zl(n, t) {
  return n.distance - t.distance
}
function oo(n, t, e, i) {
  let s = !0
  if (
    (n.layers.test(t.layers) && n.raycast(t, e) === !1 && (s = !1),
    s === !0 && i === !0)
  ) {
    const r = n.children
    for (let a = 0, o = r.length; a < o; a++) oo(r[a], t, e, !0)
  }
}
class vd {
  constructor(t = !0) {
    ;((this.autoStart = t),
      (this.startTime = 0),
      (this.oldTime = 0),
      (this.elapsedTime = 0),
      (this.running = !1),
      Dt(
        'Clock: This module has been deprecated. Please use THREE.Timer instead.'
      ))
  }
  start() {
    ;((this.startTime = performance.now()),
      (this.oldTime = this.startTime),
      (this.elapsedTime = 0),
      (this.running = !0))
  }
  stop() {
    ;(this.getElapsedTime(), (this.running = !1), (this.autoStart = !1))
  }
  getElapsedTime() {
    return (this.getDelta(), this.elapsedTime)
  }
  getDelta() {
    let t = 0
    if (this.autoStart && !this.running) return (this.start(), 0)
    if (this.running) {
      const e = performance.now()
      ;((t = (e - this.oldTime) / 1e3),
        (this.oldTime = e),
        (this.elapsedTime += t))
    }
    return t
  }
}
class lo {
  constructor(t = 1, e = 0, i = 0) {
    ;((this.radius = t), (this.phi = e), (this.theta = i))
  }
  set(t, e, i) {
    return ((this.radius = t), (this.phi = e), (this.theta = i), this)
  }
  copy(t) {
    return (
      (this.radius = t.radius),
      (this.phi = t.phi),
      (this.theta = t.theta),
      this
    )
  }
  makeSafe() {
    return ((this.phi = qt(this.phi, 1e-6, Math.PI - 1e-6)), this)
  }
  setFromVector3(t) {
    return this.setFromCartesianCoords(t.x, t.y, t.z)
  }
  setFromCartesianCoords(t, e, i) {
    return (
      (this.radius = Math.sqrt(t * t + e * e + i * i)),
      this.radius === 0
        ? ((this.theta = 0), (this.phi = 0))
        : ((this.theta = Math.atan2(t, i)),
          (this.phi = Math.acos(qt(e / this.radius, -1, 1)))),
      this
    )
  }
  clone() {
    return new this.constructor().copy(this)
  }
}
const Yo = class Yo {
  constructor(t, e, i, s) {
    ;((this.elements = [1, 0, 0, 1]), t !== void 0 && this.set(t, e, i, s))
  }
  identity() {
    return (this.set(1, 0, 0, 1), this)
  }
  fromArray(t, e = 0) {
    for (let i = 0; i < 4; i++) this.elements[i] = t[i + e]
    return this
  }
  set(t, e, i, s) {
    const r = this.elements
    return ((r[0] = t), (r[2] = e), (r[1] = i), (r[3] = s), this)
  }
}
Yo.prototype.isMatrix2 = !0
let kl = Yo
class Md extends li {
  constructor(t, e = null) {
    ;(super(),
      (this.object = t),
      (this.domElement = e),
      (this.enabled = !0),
      (this.state = -1),
      (this.keys = {}),
      (this.mouseButtons = { LEFT: null, MIDDLE: null, RIGHT: null }),
      (this.touches = { ONE: null, TWO: null }))
  }
  connect(t) {
    if (t === void 0) {
      Dt('Controls: connect() now requires an element.')
      return
    }
    ;(this.domElement !== null && this.disconnect(), (this.domElement = t))
  }
  disconnect() {}
  dispose() {}
  update() {}
}
function Gl(n, t, e, i) {
  const s = Sd(i)
  switch (e) {
    case kc:
      return n * t
    case bo:
      return ((n * t) / s.components) * s.byteLength
    case Eo:
      return ((n * t) / s.components) * s.byteLength
    case Mi:
      return ((n * t * 2) / s.components) * s.byteLength
    case To:
      return ((n * t * 2) / s.components) * s.byteLength
    case Gc:
      return ((n * t * 3) / s.components) * s.byteLength
    case _n:
      return ((n * t * 4) / s.components) * s.byteLength
    case wo:
      return ((n * t * 4) / s.components) * s.byteLength
    case tr:
    case er:
      return Math.floor((n + 3) / 4) * Math.floor((t + 3) / 4) * 8
    case nr:
    case ir:
      return Math.floor((n + 3) / 4) * Math.floor((t + 3) / 4) * 16
    case La:
    case Ia:
      return (Math.max(n, 16) * Math.max(t, 8)) / 4
    case Pa:
    case Da:
      return (Math.max(n, 8) * Math.max(t, 8)) / 2
    case Ua:
    case Na:
    case Oa:
    case Ba:
      return Math.floor((n + 3) / 4) * Math.floor((t + 3) / 4) * 8
    case Fa:
    case cr:
    case za:
      return Math.floor((n + 3) / 4) * Math.floor((t + 3) / 4) * 16
    case ka:
      return Math.floor((n + 3) / 4) * Math.floor((t + 3) / 4) * 16
    case Ga:
      return Math.floor((n + 4) / 5) * Math.floor((t + 3) / 4) * 16
    case Ha:
      return Math.floor((n + 4) / 5) * Math.floor((t + 4) / 5) * 16
    case Va:
      return Math.floor((n + 5) / 6) * Math.floor((t + 4) / 5) * 16
    case Wa:
      return Math.floor((n + 5) / 6) * Math.floor((t + 5) / 6) * 16
    case Xa:
      return Math.floor((n + 7) / 8) * Math.floor((t + 4) / 5) * 16
    case qa:
      return Math.floor((n + 7) / 8) * Math.floor((t + 5) / 6) * 16
    case Ya:
      return Math.floor((n + 7) / 8) * Math.floor((t + 7) / 8) * 16
    case ja:
      return Math.floor((n + 9) / 10) * Math.floor((t + 4) / 5) * 16
    case Ka:
      return Math.floor((n + 9) / 10) * Math.floor((t + 5) / 6) * 16
    case $a:
      return Math.floor((n + 9) / 10) * Math.floor((t + 7) / 8) * 16
    case Za:
      return Math.floor((n + 9) / 10) * Math.floor((t + 9) / 10) * 16
    case Ja:
      return Math.floor((n + 11) / 12) * Math.floor((t + 9) / 10) * 16
    case Qa:
      return Math.floor((n + 11) / 12) * Math.floor((t + 11) / 12) * 16
    case to:
    case eo:
    case no:
      return Math.ceil(n / 4) * Math.ceil(t / 4) * 16
    case io:
    case so:
      return Math.ceil(n / 4) * Math.ceil(t / 4) * 8
    case hr:
    case ro:
      return Math.ceil(n / 4) * Math.ceil(t / 4) * 16
  }
  throw new Error(`Unable to determine texture byte length for ${e} format.`)
}
function Sd(n) {
  switch (n) {
    case an:
    case Fc:
      return { byteLength: 1, components: 1 }
    case ms:
    case Oc:
    case Hn:
      return { byteLength: 2, components: 1 }
    case So:
    case yo:
      return { byteLength: 2, components: 4 }
    case Rn:
    case Mo:
    case gn:
      return { byteLength: 4, components: 1 }
    case Bc:
    case zc:
      return { byteLength: 4, components: 3 }
  }
  throw new Error(`Unknown texture type ${n}.`)
}
typeof __THREE_DEVTOOLS__ < 'u' &&
  __THREE_DEVTOOLS__.dispatchEvent(
    new CustomEvent('register', { detail: { revision: _o } })
  )
typeof window < 'u' &&
  (window.__THREE__
    ? Dt('WARNING: Multiple instances of Three.js being imported.')
    : (window.__THREE__ = _o))
function nh() {
  let n = null,
    t = !1,
    e = null,
    i = null
  function s(r, a) {
    ;(e(r, a), (i = n.requestAnimationFrame(s)))
  }
  return {
    start: function () {
      t !== !0 &&
        e !== null &&
        n !== null &&
        ((i = n.requestAnimationFrame(s)), (t = !0))
    },
    stop: function () {
      ;(n !== null && n.cancelAnimationFrame(i), (t = !1))
    },
    setAnimationLoop: function (r) {
      e = r
    },
    setContext: function (r) {
      n = r
    },
  }
}
function yd(n) {
  const t = new WeakMap()
  function e(o, c) {
    const l = o.array,
      u = o.usage,
      p = l.byteLength,
      h = n.createBuffer()
    ;(n.bindBuffer(c, h), n.bufferData(c, l, u), o.onUploadCallback())
    let m
    if (l instanceof Float32Array) m = n.FLOAT
    else if (typeof Float16Array < 'u' && l instanceof Float16Array)
      m = n.HALF_FLOAT
    else if (l instanceof Uint16Array)
      o.isFloat16BufferAttribute ? (m = n.HALF_FLOAT) : (m = n.UNSIGNED_SHORT)
    else if (l instanceof Int16Array) m = n.SHORT
    else if (l instanceof Uint32Array) m = n.UNSIGNED_INT
    else if (l instanceof Int32Array) m = n.INT
    else if (l instanceof Int8Array) m = n.BYTE
    else if (l instanceof Uint8Array) m = n.UNSIGNED_BYTE
    else if (l instanceof Uint8ClampedArray) m = n.UNSIGNED_BYTE
    else
      throw new Error(
        'THREE.WebGLAttributes: Unsupported buffer data format: ' + l
      )
    return {
      buffer: h,
      type: m,
      bytesPerElement: l.BYTES_PER_ELEMENT,
      version: o.version,
      size: p,
    }
  }
  function i(o, c, l) {
    const u = c.array,
      p = c.updateRanges
    if ((n.bindBuffer(l, o), p.length === 0)) n.bufferSubData(l, 0, u)
    else {
      p.sort((m, g) => m.start - g.start)
      let h = 0
      for (let m = 1; m < p.length; m++) {
        const g = p[h],
          v = p[m]
        v.start <= g.start + g.count + 1
          ? (g.count = Math.max(g.count, v.start + v.count - g.start))
          : (++h, (p[h] = v))
      }
      p.length = h + 1
      for (let m = 0, g = p.length; m < g; m++) {
        const v = p[m]
        n.bufferSubData(l, v.start * u.BYTES_PER_ELEMENT, u, v.start, v.count)
      }
      c.clearUpdateRanges()
    }
    c.onUploadCallback()
  }
  function s(o) {
    return (o.isInterleavedBufferAttribute && (o = o.data), t.get(o))
  }
  function r(o) {
    o.isInterleavedBufferAttribute && (o = o.data)
    const c = t.get(o)
    c && (n.deleteBuffer(c.buffer), t.delete(o))
  }
  function a(o, c) {
    if (
      (o.isInterleavedBufferAttribute && (o = o.data), o.isGLBufferAttribute)
    ) {
      const u = t.get(o)
      ;(!u || u.version < o.version) &&
        t.set(o, {
          buffer: o.buffer,
          type: o.type,
          bytesPerElement: o.elementSize,
          version: o.version,
        })
      return
    }
    const l = t.get(o)
    if (l === void 0) t.set(o, e(o, c))
    else if (l.version < o.version) {
      if (l.size !== o.array.byteLength)
        throw new Error(
          "THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported."
        )
      ;(i(l.buffer, o, c), (l.version = o.version))
    }
  }
  return { get: s, remove: r, update: a }
}
var bd = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,
  Ed = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,
  Td = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,
  wd = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
  Ad = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,
  Rd = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,
  Cd = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,
  Pd = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,
  Ld = `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,
  Dd = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,
  Id = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,
  Ud = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,
  Nd = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,
  Fd = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,
  Od = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,
  Bd = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,
  zd = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,
  kd = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,
  Gd = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,
  Hd = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,
  Vd = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,
  Wd = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,
  Xd = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,
  qd = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,
  Yd = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,
  jd = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,
  Kd = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,
  $d = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,
  Zd = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,
  Jd = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,
  Qd = 'gl_FragColor = linearToOutputTexel( gl_FragColor );',
  tf = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,
  ef = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,
  nf = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,
  sf = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,
  rf = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,
  af = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,
  of = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,
  lf = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`,
  cf = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,
  hf = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,
  uf = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,
  df = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,
  ff = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,
  pf = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,
  mf = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,
  gf = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,
  _f = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,
  xf = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,
  vf = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,
  Mf = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,
  Sf = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,
  yf = `uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,
  bf = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,
  Ef = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,
  Tf = `#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,
  wf = `#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,
  Af = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,
  Rf = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,
  Cf = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,
  Pf = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,
  Lf = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,
  Df = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`,
  If = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,
  Uf = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
  Nf = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,
  Ff = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,
  Of = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,
  Bf = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,
  zf = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,
  kf = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,
  Gf = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,
  Hf = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,
  Vf = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,
  Wf = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
  Xf = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
  qf = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,
  Yf = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,
  jf = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,
  Kf = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,
  $f = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,
  Zf = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,
  Jf = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
  Qf = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,
  tp = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,
  ep = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,
  np = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,
  ip = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,
  sp = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,
  rp = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,
  ap = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,
  op = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,
  lp = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,
  cp = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,
  hp = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,
  up = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,
  dp = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,
  fp = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,
  pp = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,
  mp = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,
  gp = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,
  _p = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,
  xp = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,
  vp = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,
  Mp = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,
  Sp = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,
  yp = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,
  bp = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`
const Ep = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,
  Tp = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  wp = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
  Ap = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  Rp = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
  Cp = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  Pp = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,
  Lp = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,
  Dp = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,
  Ip = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,
  Up = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,
  Np = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  Fp = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
  Op = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
  Bp = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,
  zp = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  kp = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  Gp = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  Hp = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,
  Vp = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  Wp = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,
  Xp = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,
  qp = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  Yp = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  jp = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,
  Kp = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  $p = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  Zp = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  Jp = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,
  Qp = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
  tm = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  em = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
  nm = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
  im = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,
  Vt = {
    alphahash_fragment: bd,
    alphahash_pars_fragment: Ed,
    alphamap_fragment: Td,
    alphamap_pars_fragment: wd,
    alphatest_fragment: Ad,
    alphatest_pars_fragment: Rd,
    aomap_fragment: Cd,
    aomap_pars_fragment: Pd,
    batching_pars_vertex: Ld,
    batching_vertex: Dd,
    begin_vertex: Id,
    beginnormal_vertex: Ud,
    bsdfs: Nd,
    iridescence_fragment: Fd,
    bumpmap_pars_fragment: Od,
    clipping_planes_fragment: Bd,
    clipping_planes_pars_fragment: zd,
    clipping_planes_pars_vertex: kd,
    clipping_planes_vertex: Gd,
    color_fragment: Hd,
    color_pars_fragment: Vd,
    color_pars_vertex: Wd,
    color_vertex: Xd,
    common: qd,
    cube_uv_reflection_fragment: Yd,
    defaultnormal_vertex: jd,
    displacementmap_pars_vertex: Kd,
    displacementmap_vertex: $d,
    emissivemap_fragment: Zd,
    emissivemap_pars_fragment: Jd,
    colorspace_fragment: Qd,
    colorspace_pars_fragment: tf,
    envmap_fragment: ef,
    envmap_common_pars_fragment: nf,
    envmap_pars_fragment: sf,
    envmap_pars_vertex: rf,
    envmap_physical_pars_fragment: gf,
    envmap_vertex: af,
    fog_vertex: of,
    fog_pars_vertex: lf,
    fog_fragment: cf,
    fog_pars_fragment: hf,
    gradientmap_pars_fragment: uf,
    lightmap_pars_fragment: df,
    lights_lambert_fragment: ff,
    lights_lambert_pars_fragment: pf,
    lights_pars_begin: mf,
    lights_toon_fragment: _f,
    lights_toon_pars_fragment: xf,
    lights_phong_fragment: vf,
    lights_phong_pars_fragment: Mf,
    lights_physical_fragment: Sf,
    lights_physical_pars_fragment: yf,
    lights_fragment_begin: bf,
    lights_fragment_maps: Ef,
    lights_fragment_end: Tf,
    lightprobes_pars_fragment: wf,
    logdepthbuf_fragment: Af,
    logdepthbuf_pars_fragment: Rf,
    logdepthbuf_pars_vertex: Cf,
    logdepthbuf_vertex: Pf,
    map_fragment: Lf,
    map_pars_fragment: Df,
    map_particle_fragment: If,
    map_particle_pars_fragment: Uf,
    metalnessmap_fragment: Nf,
    metalnessmap_pars_fragment: Ff,
    morphinstance_vertex: Of,
    morphcolor_vertex: Bf,
    morphnormal_vertex: zf,
    morphtarget_pars_vertex: kf,
    morphtarget_vertex: Gf,
    normal_fragment_begin: Hf,
    normal_fragment_maps: Vf,
    normal_pars_fragment: Wf,
    normal_pars_vertex: Xf,
    normal_vertex: qf,
    normalmap_pars_fragment: Yf,
    clearcoat_normal_fragment_begin: jf,
    clearcoat_normal_fragment_maps: Kf,
    clearcoat_pars_fragment: $f,
    iridescence_pars_fragment: Zf,
    opaque_fragment: Jf,
    packing: Qf,
    premultiplied_alpha_fragment: tp,
    project_vertex: ep,
    dithering_fragment: np,
    dithering_pars_fragment: ip,
    roughnessmap_fragment: sp,
    roughnessmap_pars_fragment: rp,
    shadowmap_pars_fragment: ap,
    shadowmap_pars_vertex: op,
    shadowmap_vertex: lp,
    shadowmask_pars_fragment: cp,
    skinbase_vertex: hp,
    skinning_pars_vertex: up,
    skinning_vertex: dp,
    skinnormal_vertex: fp,
    specularmap_fragment: pp,
    specularmap_pars_fragment: mp,
    tonemapping_fragment: gp,
    tonemapping_pars_fragment: _p,
    transmission_fragment: xp,
    transmission_pars_fragment: vp,
    uv_pars_fragment: Mp,
    uv_pars_vertex: Sp,
    uv_vertex: yp,
    worldpos_vertex: bp,
    background_vert: Ep,
    background_frag: Tp,
    backgroundCube_vert: wp,
    backgroundCube_frag: Ap,
    cube_vert: Rp,
    cube_frag: Cp,
    depth_vert: Pp,
    depth_frag: Lp,
    distance_vert: Dp,
    distance_frag: Ip,
    equirect_vert: Up,
    equirect_frag: Np,
    linedashed_vert: Fp,
    linedashed_frag: Op,
    meshbasic_vert: Bp,
    meshbasic_frag: zp,
    meshlambert_vert: kp,
    meshlambert_frag: Gp,
    meshmatcap_vert: Hp,
    meshmatcap_frag: Vp,
    meshnormal_vert: Wp,
    meshnormal_frag: Xp,
    meshphong_vert: qp,
    meshphong_frag: Yp,
    meshphysical_vert: jp,
    meshphysical_frag: Kp,
    meshtoon_vert: $p,
    meshtoon_frag: Zp,
    points_vert: Jp,
    points_frag: Qp,
    shadow_vert: tm,
    shadow_frag: em,
    sprite_vert: nm,
    sprite_frag: im,
  },
  pt = {
    common: {
      diffuse: { value: new Ot(16777215) },
      opacity: { value: 1 },
      map: { value: null },
      mapTransform: { value: new zt() },
      alphaMap: { value: null },
      alphaMapTransform: { value: new zt() },
      alphaTest: { value: 0 },
    },
    specularmap: {
      specularMap: { value: null },
      specularMapTransform: { value: new zt() },
    },
    envmap: {
      envMap: { value: null },
      envMapRotation: { value: new zt() },
      reflectivity: { value: 1 },
      ior: { value: 1.5 },
      refractionRatio: { value: 0.98 },
      dfgLUT: { value: null },
    },
    aomap: {
      aoMap: { value: null },
      aoMapIntensity: { value: 1 },
      aoMapTransform: { value: new zt() },
    },
    lightmap: {
      lightMap: { value: null },
      lightMapIntensity: { value: 1 },
      lightMapTransform: { value: new zt() },
    },
    bumpmap: {
      bumpMap: { value: null },
      bumpMapTransform: { value: new zt() },
      bumpScale: { value: 1 },
    },
    normalmap: {
      normalMap: { value: null },
      normalMapTransform: { value: new zt() },
      normalScale: { value: new Nt(1, 1) },
    },
    displacementmap: {
      displacementMap: { value: null },
      displacementMapTransform: { value: new zt() },
      displacementScale: { value: 1 },
      displacementBias: { value: 0 },
    },
    emissivemap: {
      emissiveMap: { value: null },
      emissiveMapTransform: { value: new zt() },
    },
    metalnessmap: {
      metalnessMap: { value: null },
      metalnessMapTransform: { value: new zt() },
    },
    roughnessmap: {
      roughnessMap: { value: null },
      roughnessMapTransform: { value: new zt() },
    },
    gradientmap: { gradientMap: { value: null } },
    fog: {
      fogDensity: { value: 25e-5 },
      fogNear: { value: 1 },
      fogFar: { value: 2e3 },
      fogColor: { value: new Ot(16777215) },
    },
    lights: {
      ambientLightColor: { value: [] },
      lightProbe: { value: [] },
      directionalLights: {
        value: [],
        properties: { direction: {}, color: {} },
      },
      directionalLightShadows: {
        value: [],
        properties: {
          shadowIntensity: 1,
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
        },
      },
      directionalShadowMatrix: { value: [] },
      spotLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          direction: {},
          distance: {},
          coneCos: {},
          penumbraCos: {},
          decay: {},
        },
      },
      spotLightShadows: {
        value: [],
        properties: {
          shadowIntensity: 1,
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
        },
      },
      spotLightMap: { value: [] },
      spotLightMatrix: { value: [] },
      pointLights: {
        value: [],
        properties: { color: {}, position: {}, decay: {}, distance: {} },
      },
      pointLightShadows: {
        value: [],
        properties: {
          shadowIntensity: 1,
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
          shadowCameraNear: {},
          shadowCameraFar: {},
        },
      },
      pointShadowMatrix: { value: [] },
      hemisphereLights: {
        value: [],
        properties: { direction: {}, skyColor: {}, groundColor: {} },
      },
      rectAreaLights: {
        value: [],
        properties: { color: {}, position: {}, width: {}, height: {} },
      },
      ltc_1: { value: null },
      ltc_2: { value: null },
      probesSH: { value: null },
      probesMin: { value: new D() },
      probesMax: { value: new D() },
      probesResolution: { value: new D() },
    },
    points: {
      diffuse: { value: new Ot(16777215) },
      opacity: { value: 1 },
      size: { value: 1 },
      scale: { value: 1 },
      map: { value: null },
      alphaMap: { value: null },
      alphaMapTransform: { value: new zt() },
      alphaTest: { value: 0 },
      uvTransform: { value: new zt() },
    },
    sprite: {
      diffuse: { value: new Ot(16777215) },
      opacity: { value: 1 },
      center: { value: new Nt(0.5, 0.5) },
      rotation: { value: 0 },
      map: { value: null },
      mapTransform: { value: new zt() },
      alphaMap: { value: null },
      alphaMapTransform: { value: new zt() },
      alphaTest: { value: 0 },
    },
  },
  En = {
    basic: {
      uniforms: Xe([
        pt.common,
        pt.specularmap,
        pt.envmap,
        pt.aomap,
        pt.lightmap,
        pt.fog,
      ]),
      vertexShader: Vt.meshbasic_vert,
      fragmentShader: Vt.meshbasic_frag,
    },
    lambert: {
      uniforms: Xe([
        pt.common,
        pt.specularmap,
        pt.envmap,
        pt.aomap,
        pt.lightmap,
        pt.emissivemap,
        pt.bumpmap,
        pt.normalmap,
        pt.displacementmap,
        pt.fog,
        pt.lights,
        { emissive: { value: new Ot(0) }, envMapIntensity: { value: 1 } },
      ]),
      vertexShader: Vt.meshlambert_vert,
      fragmentShader: Vt.meshlambert_frag,
    },
    phong: {
      uniforms: Xe([
        pt.common,
        pt.specularmap,
        pt.envmap,
        pt.aomap,
        pt.lightmap,
        pt.emissivemap,
        pt.bumpmap,
        pt.normalmap,
        pt.displacementmap,
        pt.fog,
        pt.lights,
        {
          emissive: { value: new Ot(0) },
          specular: { value: new Ot(1118481) },
          shininess: { value: 30 },
          envMapIntensity: { value: 1 },
        },
      ]),
      vertexShader: Vt.meshphong_vert,
      fragmentShader: Vt.meshphong_frag,
    },
    standard: {
      uniforms: Xe([
        pt.common,
        pt.envmap,
        pt.aomap,
        pt.lightmap,
        pt.emissivemap,
        pt.bumpmap,
        pt.normalmap,
        pt.displacementmap,
        pt.roughnessmap,
        pt.metalnessmap,
        pt.fog,
        pt.lights,
        {
          emissive: { value: new Ot(0) },
          roughness: { value: 1 },
          metalness: { value: 0 },
          envMapIntensity: { value: 1 },
        },
      ]),
      vertexShader: Vt.meshphysical_vert,
      fragmentShader: Vt.meshphysical_frag,
    },
    toon: {
      uniforms: Xe([
        pt.common,
        pt.aomap,
        pt.lightmap,
        pt.emissivemap,
        pt.bumpmap,
        pt.normalmap,
        pt.displacementmap,
        pt.gradientmap,
        pt.fog,
        pt.lights,
        { emissive: { value: new Ot(0) } },
      ]),
      vertexShader: Vt.meshtoon_vert,
      fragmentShader: Vt.meshtoon_frag,
    },
    matcap: {
      uniforms: Xe([
        pt.common,
        pt.bumpmap,
        pt.normalmap,
        pt.displacementmap,
        pt.fog,
        { matcap: { value: null } },
      ]),
      vertexShader: Vt.meshmatcap_vert,
      fragmentShader: Vt.meshmatcap_frag,
    },
    points: {
      uniforms: Xe([pt.points, pt.fog]),
      vertexShader: Vt.points_vert,
      fragmentShader: Vt.points_frag,
    },
    dashed: {
      uniforms: Xe([
        pt.common,
        pt.fog,
        {
          scale: { value: 1 },
          dashSize: { value: 1 },
          totalSize: { value: 2 },
        },
      ]),
      vertexShader: Vt.linedashed_vert,
      fragmentShader: Vt.linedashed_frag,
    },
    depth: {
      uniforms: Xe([pt.common, pt.displacementmap]),
      vertexShader: Vt.depth_vert,
      fragmentShader: Vt.depth_frag,
    },
    normal: {
      uniforms: Xe([
        pt.common,
        pt.bumpmap,
        pt.normalmap,
        pt.displacementmap,
        { opacity: { value: 1 } },
      ]),
      vertexShader: Vt.meshnormal_vert,
      fragmentShader: Vt.meshnormal_frag,
    },
    sprite: {
      uniforms: Xe([pt.sprite, pt.fog]),
      vertexShader: Vt.sprite_vert,
      fragmentShader: Vt.sprite_frag,
    },
    background: {
      uniforms: {
        uvTransform: { value: new zt() },
        t2D: { value: null },
        backgroundIntensity: { value: 1 },
      },
      vertexShader: Vt.background_vert,
      fragmentShader: Vt.background_frag,
    },
    backgroundCube: {
      uniforms: {
        envMap: { value: null },
        backgroundBlurriness: { value: 0 },
        backgroundIntensity: { value: 1 },
        backgroundRotation: { value: new zt() },
      },
      vertexShader: Vt.backgroundCube_vert,
      fragmentShader: Vt.backgroundCube_frag,
    },
    cube: {
      uniforms: {
        tCube: { value: null },
        tFlip: { value: -1 },
        opacity: { value: 1 },
      },
      vertexShader: Vt.cube_vert,
      fragmentShader: Vt.cube_frag,
    },
    equirect: {
      uniforms: { tEquirect: { value: null } },
      vertexShader: Vt.equirect_vert,
      fragmentShader: Vt.equirect_frag,
    },
    distance: {
      uniforms: Xe([
        pt.common,
        pt.displacementmap,
        {
          referencePosition: { value: new D() },
          nearDistance: { value: 1 },
          farDistance: { value: 1e3 },
        },
      ]),
      vertexShader: Vt.distance_vert,
      fragmentShader: Vt.distance_frag,
    },
    shadow: {
      uniforms: Xe([
        pt.lights,
        pt.fog,
        { color: { value: new Ot(0) }, opacity: { value: 1 } },
      ]),
      vertexShader: Vt.shadow_vert,
      fragmentShader: Vt.shadow_frag,
    },
  }
En.physical = {
  uniforms: Xe([
    En.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: new zt() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: new zt() },
      clearcoatNormalScale: { value: new Nt(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: new zt() },
      dispersion: { value: 0 },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: new zt() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: new zt() },
      sheen: { value: 0 },
      sheenColor: { value: new Ot(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: new zt() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: new zt() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: new zt() },
      transmissionSamplerSize: { value: new Nt() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: new zt() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: new Ot(0) },
      specularColor: { value: new Ot(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: new zt() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: new zt() },
      anisotropyVector: { value: new Nt() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: new zt() },
    },
  ]),
  vertexShader: Vt.meshphysical_vert,
  fragmentShader: Vt.meshphysical_frag,
}
const Xs = { r: 0, b: 0, g: 0 },
  sm = new le(),
  ih = new zt()
ih.set(-1, 0, 0, 0, 1, 0, 0, 0, 1)
function rm(n, t, e, i, s, r) {
  const a = new Ot(0)
  let o = s === !0 ? 0 : 1,
    c,
    l,
    u = null,
    p = 0,
    h = null
  function m(M) {
    let T = M.isScene === !0 ? M.background : null
    if (T && T.isTexture) {
      const w = M.backgroundBlurriness > 0
      T = t.get(T, w)
    }
    return T
  }
  function g(M) {
    let T = !1
    const w = m(M)
    w === null ? f(a, o) : w && w.isColor && (f(w, 1), (T = !0))
    const C = n.xr.getEnvironmentBlendMode()
    ;(C === 'additive'
      ? e.buffers.color.setClear(0, 0, 0, 1, r)
      : C === 'alpha-blend' && e.buffers.color.setClear(0, 0, 0, 0, r),
      (n.autoClear || T) &&
        (e.buffers.depth.setTest(!0),
        e.buffers.depth.setMask(!0),
        e.buffers.color.setMask(!0),
        n.clear(n.autoClearColor, n.autoClearDepth, n.autoClearStencil)))
  }
  function v(M, T) {
    const w = m(T)
    w && (w.isCubeTexture || w.mapping === Mr)
      ? (l === void 0 &&
          ((l = new Jt(
            new Ue(1, 1, 1),
            new Pn({
              name: 'BackgroundCubeMaterial',
              uniforms: ji(En.backgroundCube.uniforms),
              vertexShader: En.backgroundCube.vertexShader,
              fragmentShader: En.backgroundCube.fragmentShader,
              side: qe,
              depthTest: !1,
              depthWrite: !1,
              fog: !1,
              allowOverride: !1,
            })
          )),
          l.geometry.deleteAttribute('normal'),
          l.geometry.deleteAttribute('uv'),
          (l.onBeforeRender = function (C, A, y) {
            this.matrixWorld.copyPosition(y.matrixWorld)
          }),
          Object.defineProperty(l.material, 'envMap', {
            get: function () {
              return this.uniforms.envMap.value
            },
          }),
          i.update(l)),
        (l.material.uniforms.envMap.value = w),
        (l.material.uniforms.backgroundBlurriness.value =
          T.backgroundBlurriness),
        (l.material.uniforms.backgroundIntensity.value = T.backgroundIntensity),
        l.material.uniforms.backgroundRotation.value
          .setFromMatrix4(sm.makeRotationFromEuler(T.backgroundRotation))
          .transpose(),
        w.isCubeTexture &&
          w.isRenderTargetTexture === !1 &&
          l.material.uniforms.backgroundRotation.value.premultiply(ih),
        (l.material.toneMapped = $t.getTransfer(w.colorSpace) !== ne),
        (u !== w || p !== w.version || h !== n.toneMapping) &&
          ((l.material.needsUpdate = !0),
          (u = w),
          (p = w.version),
          (h = n.toneMapping)),
        l.layers.enableAll(),
        M.unshift(l, l.geometry, l.material, 0, 0, null))
      : w &&
        w.isTexture &&
        (c === void 0 &&
          ((c = new Jt(
            new yr(2, 2),
            new Pn({
              name: 'BackgroundMaterial',
              uniforms: ji(En.background.uniforms),
              vertexShader: En.background.vertexShader,
              fragmentShader: En.background.fragmentShader,
              side: oi,
              depthTest: !1,
              depthWrite: !1,
              fog: !1,
              allowOverride: !1,
            })
          )),
          c.geometry.deleteAttribute('normal'),
          Object.defineProperty(c.material, 'map', {
            get: function () {
              return this.uniforms.t2D.value
            },
          }),
          i.update(c)),
        (c.material.uniforms.t2D.value = w),
        (c.material.uniforms.backgroundIntensity.value = T.backgroundIntensity),
        (c.material.toneMapped = $t.getTransfer(w.colorSpace) !== ne),
        w.matrixAutoUpdate === !0 && w.updateMatrix(),
        c.material.uniforms.uvTransform.value.copy(w.matrix),
        (u !== w || p !== w.version || h !== n.toneMapping) &&
          ((c.material.needsUpdate = !0),
          (u = w),
          (p = w.version),
          (h = n.toneMapping)),
        c.layers.enableAll(),
        M.unshift(c, c.geometry, c.material, 0, 0, null))
  }
  function f(M, T) {
    ;(M.getRGB(Xs, Jc(n)), e.buffers.color.setClear(Xs.r, Xs.g, Xs.b, T, r))
  }
  function d() {
    ;(l !== void 0 &&
      (l.geometry.dispose(), l.material.dispose(), (l = void 0)),
      c !== void 0 &&
        (c.geometry.dispose(), c.material.dispose(), (c = void 0)))
  }
  return {
    getClearColor: function () {
      return a
    },
    setClearColor: function (M, T = 1) {
      ;(a.set(M), (o = T), f(a, o))
    },
    getClearAlpha: function () {
      return o
    },
    setClearAlpha: function (M) {
      ;((o = M), f(a, o))
    },
    render: g,
    addToRenderList: v,
    dispose: d,
  }
}
function am(n, t) {
  const e = n.getParameter(n.MAX_VERTEX_ATTRIBS),
    i = {},
    s = h(null)
  let r = s,
    a = !1
  function o(R, N, V, W, I) {
    let G = !1
    const O = p(R, W, V, N)
    ;(r !== O && ((r = O), l(r.object)),
      (G = m(R, W, V, I)),
      G && g(R, W, V, I),
      I !== null && t.update(I, n.ELEMENT_ARRAY_BUFFER),
      (G || a) &&
        ((a = !1),
        w(R, N, V, W),
        I !== null && n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, t.get(I).buffer)))
  }
  function c() {
    return n.createVertexArray()
  }
  function l(R) {
    return n.bindVertexArray(R)
  }
  function u(R) {
    return n.deleteVertexArray(R)
  }
  function p(R, N, V, W) {
    const I = W.wireframe === !0
    let G = i[N.id]
    G === void 0 && ((G = {}), (i[N.id] = G))
    const O = R.isInstancedMesh === !0 ? R.id : 0
    let J = G[O]
    J === void 0 && ((J = {}), (G[O] = J))
    let et = J[V.id]
    et === void 0 && ((et = {}), (J[V.id] = et))
    let dt = et[I]
    return (dt === void 0 && ((dt = h(c())), (et[I] = dt)), dt)
  }
  function h(R) {
    const N = [],
      V = [],
      W = []
    for (let I = 0; I < e; I++) ((N[I] = 0), (V[I] = 0), (W[I] = 0))
    return {
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: N,
      enabledAttributes: V,
      attributeDivisors: W,
      object: R,
      attributes: {},
      index: null,
    }
  }
  function m(R, N, V, W) {
    const I = r.attributes,
      G = N.attributes
    let O = 0
    const J = V.getAttributes()
    for (const et in J)
      if (J[et].location >= 0) {
        const Tt = I[et]
        let Rt = G[et]
        if (
          (Rt === void 0 &&
            (et === 'instanceMatrix' &&
              R.instanceMatrix &&
              (Rt = R.instanceMatrix),
            et === 'instanceColor' &&
              R.instanceColor &&
              (Rt = R.instanceColor)),
          Tt === void 0 || Tt.attribute !== Rt || (Rt && Tt.data !== Rt.data))
        )
          return !0
        O++
      }
    return r.attributesNum !== O || r.index !== W
  }
  function g(R, N, V, W) {
    const I = {},
      G = N.attributes
    let O = 0
    const J = V.getAttributes()
    for (const et in J)
      if (J[et].location >= 0) {
        let Tt = G[et]
        Tt === void 0 &&
          (et === 'instanceMatrix' &&
            R.instanceMatrix &&
            (Tt = R.instanceMatrix),
          et === 'instanceColor' && R.instanceColor && (Tt = R.instanceColor))
        const Rt = {}
        ;((Rt.attribute = Tt),
          Tt && Tt.data && (Rt.data = Tt.data),
          (I[et] = Rt),
          O++)
      }
    ;((r.attributes = I), (r.attributesNum = O), (r.index = W))
  }
  function v() {
    const R = r.newAttributes
    for (let N = 0, V = R.length; N < V; N++) R[N] = 0
  }
  function f(R) {
    d(R, 0)
  }
  function d(R, N) {
    const V = r.newAttributes,
      W = r.enabledAttributes,
      I = r.attributeDivisors
    ;((V[R] = 1),
      W[R] === 0 && (n.enableVertexAttribArray(R), (W[R] = 1)),
      I[R] !== N && (n.vertexAttribDivisor(R, N), (I[R] = N)))
  }
  function M() {
    const R = r.newAttributes,
      N = r.enabledAttributes
    for (let V = 0, W = N.length; V < W; V++)
      N[V] !== R[V] && (n.disableVertexAttribArray(V), (N[V] = 0))
  }
  function T(R, N, V, W, I, G, O) {
    O === !0
      ? n.vertexAttribIPointer(R, N, V, I, G)
      : n.vertexAttribPointer(R, N, V, W, I, G)
  }
  function w(R, N, V, W) {
    v()
    const I = W.attributes,
      G = V.getAttributes(),
      O = N.defaultAttributeValues
    for (const J in G) {
      const et = G[J]
      if (et.location >= 0) {
        let dt = I[J]
        if (
          (dt === void 0 &&
            (J === 'instanceMatrix' &&
              R.instanceMatrix &&
              (dt = R.instanceMatrix),
            J === 'instanceColor' && R.instanceColor && (dt = R.instanceColor)),
          dt !== void 0)
        ) {
          const Tt = dt.normalized,
            Rt = dt.itemSize,
            nt = t.get(dt)
          if (nt === void 0) continue
          const vt = nt.buffer,
            _t = nt.type,
            X = nt.bytesPerElement,
            mt = _t === n.INT || _t === n.UNSIGNED_INT || dt.gpuType === Mo
          if (dt.isInterleavedBufferAttribute) {
            const at = dt.data,
              It = at.stride,
              Bt = dt.offset
            if (at.isInstancedInterleavedBuffer) {
              for (let Ut = 0; Ut < et.locationSize; Ut++)
                d(et.location + Ut, at.meshPerAttribute)
              R.isInstancedMesh !== !0 &&
                W._maxInstanceCount === void 0 &&
                (W._maxInstanceCount = at.meshPerAttribute * at.count)
            } else
              for (let Ut = 0; Ut < et.locationSize; Ut++) f(et.location + Ut)
            n.bindBuffer(n.ARRAY_BUFFER, vt)
            for (let Ut = 0; Ut < et.locationSize; Ut++)
              T(
                et.location + Ut,
                Rt / et.locationSize,
                _t,
                Tt,
                It * X,
                (Bt + (Rt / et.locationSize) * Ut) * X,
                mt
              )
          } else {
            if (dt.isInstancedBufferAttribute) {
              for (let at = 0; at < et.locationSize; at++)
                d(et.location + at, dt.meshPerAttribute)
              R.isInstancedMesh !== !0 &&
                W._maxInstanceCount === void 0 &&
                (W._maxInstanceCount = dt.meshPerAttribute * dt.count)
            } else
              for (let at = 0; at < et.locationSize; at++) f(et.location + at)
            n.bindBuffer(n.ARRAY_BUFFER, vt)
            for (let at = 0; at < et.locationSize; at++)
              T(
                et.location + at,
                Rt / et.locationSize,
                _t,
                Tt,
                Rt * X,
                (Rt / et.locationSize) * at * X,
                mt
              )
          }
        } else if (O !== void 0) {
          const Tt = O[J]
          if (Tt !== void 0)
            switch (Tt.length) {
              case 2:
                n.vertexAttrib2fv(et.location, Tt)
                break
              case 3:
                n.vertexAttrib3fv(et.location, Tt)
                break
              case 4:
                n.vertexAttrib4fv(et.location, Tt)
                break
              default:
                n.vertexAttrib1fv(et.location, Tt)
            }
        }
      }
    }
    M()
  }
  function C() {
    b()
    for (const R in i) {
      const N = i[R]
      for (const V in N) {
        const W = N[V]
        for (const I in W) {
          const G = W[I]
          for (const O in G) (u(G[O].object), delete G[O])
          delete W[I]
        }
      }
      delete i[R]
    }
  }
  function A(R) {
    if (i[R.id] === void 0) return
    const N = i[R.id]
    for (const V in N) {
      const W = N[V]
      for (const I in W) {
        const G = W[I]
        for (const O in G) (u(G[O].object), delete G[O])
        delete W[I]
      }
    }
    delete i[R.id]
  }
  function y(R) {
    for (const N in i) {
      const V = i[N]
      for (const W in V) {
        const I = V[W]
        if (I[R.id] === void 0) continue
        const G = I[R.id]
        for (const O in G) (u(G[O].object), delete G[O])
        delete I[R.id]
      }
    }
  }
  function _(R) {
    for (const N in i) {
      const V = i[N],
        W = R.isInstancedMesh === !0 ? R.id : 0,
        I = V[W]
      if (I !== void 0) {
        for (const G in I) {
          const O = I[G]
          for (const J in O) (u(O[J].object), delete O[J])
          delete I[G]
        }
        ;(delete V[W], Object.keys(V).length === 0 && delete i[N])
      }
    }
  }
  function b() {
    ;(P(), (a = !0), r !== s && ((r = s), l(r.object)))
  }
  function P() {
    ;((s.geometry = null), (s.program = null), (s.wireframe = !1))
  }
  return {
    setup: o,
    reset: b,
    resetDefaultState: P,
    dispose: C,
    releaseStatesOfGeometry: A,
    releaseStatesOfObject: _,
    releaseStatesOfProgram: y,
    initAttributes: v,
    enableAttribute: f,
    disableUnusedAttributes: M,
  }
}
function om(n, t, e) {
  let i
  function s(c) {
    i = c
  }
  function r(c, l) {
    ;(n.drawArrays(i, c, l), e.update(l, i, 1))
  }
  function a(c, l, u) {
    u !== 0 && (n.drawArraysInstanced(i, c, l, u), e.update(l, i, u))
  }
  function o(c, l, u) {
    if (u === 0) return
    t.get('WEBGL_multi_draw').multiDrawArraysWEBGL(i, c, 0, l, 0, u)
    let h = 0
    for (let m = 0; m < u; m++) h += l[m]
    e.update(h, i, 1)
  }
  ;((this.setMode = s),
    (this.render = r),
    (this.renderInstances = a),
    (this.renderMultiDraw = o))
}
function lm(n, t, e, i) {
  let s
  function r() {
    if (s !== void 0) return s
    if (t.has('EXT_texture_filter_anisotropic') === !0) {
      const y = t.get('EXT_texture_filter_anisotropic')
      s = n.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
    } else s = 0
    return s
  }
  function a(y) {
    return !(
      y !== _n &&
      i.convert(y) !== n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT)
    )
  }
  function o(y) {
    const _ =
      y === Hn &&
      (t.has('EXT_color_buffer_half_float') || t.has('EXT_color_buffer_float'))
    return !(
      y !== an &&
      i.convert(y) !== n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE) &&
      y !== gn &&
      !_
    )
  }
  function c(y) {
    if (y === 'highp') {
      if (
        n.getShaderPrecisionFormat(n.VERTEX_SHADER, n.HIGH_FLOAT).precision >
          0 &&
        n.getShaderPrecisionFormat(n.FRAGMENT_SHADER, n.HIGH_FLOAT).precision >
          0
      )
        return 'highp'
      y = 'mediump'
    }
    return y === 'mediump' &&
      n.getShaderPrecisionFormat(n.VERTEX_SHADER, n.MEDIUM_FLOAT).precision >
        0 &&
      n.getShaderPrecisionFormat(n.FRAGMENT_SHADER, n.MEDIUM_FLOAT).precision >
        0
      ? 'mediump'
      : 'lowp'
  }
  let l = e.precision !== void 0 ? e.precision : 'highp'
  const u = c(l)
  u !== l &&
    (Dt('WebGLRenderer:', l, 'not supported, using', u, 'instead.'), (l = u))
  const p = e.logarithmicDepthBuffer === !0,
    h = e.reversedDepthBuffer === !0 && t.has('EXT_clip_control')
  e.reversedDepthBuffer === !0 &&
    h === !1 &&
    Dt(
      'WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.'
    )
  const m = n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),
    g = n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
    v = n.getParameter(n.MAX_TEXTURE_SIZE),
    f = n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),
    d = n.getParameter(n.MAX_VERTEX_ATTRIBS),
    M = n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),
    T = n.getParameter(n.MAX_VARYING_VECTORS),
    w = n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),
    C = n.getParameter(n.MAX_SAMPLES),
    A = n.getParameter(n.SAMPLES)
  return {
    isWebGL2: !0,
    getMaxAnisotropy: r,
    getMaxPrecision: c,
    textureFormatReadable: a,
    textureTypeReadable: o,
    precision: l,
    logarithmicDepthBuffer: p,
    reversedDepthBuffer: h,
    maxTextures: m,
    maxVertexTextures: g,
    maxTextureSize: v,
    maxCubemapSize: f,
    maxAttributes: d,
    maxVertexUniforms: M,
    maxVaryings: T,
    maxFragmentUniforms: w,
    maxSamples: C,
    samples: A,
  }
}
function cm(n) {
  const t = this
  let e = null,
    i = 0,
    s = !1,
    r = !1
  const a = new ei(),
    o = new zt(),
    c = { value: null, needsUpdate: !1 }
  ;((this.uniform = c),
    (this.numPlanes = 0),
    (this.numIntersection = 0),
    (this.init = function (p, h) {
      const m = p.length !== 0 || h || i !== 0 || s
      return ((s = h), (i = p.length), m)
    }),
    (this.beginShadows = function () {
      ;((r = !0), u(null))
    }),
    (this.endShadows = function () {
      r = !1
    }),
    (this.setGlobalState = function (p, h) {
      e = u(p, h, 0)
    }),
    (this.setState = function (p, h, m) {
      const g = p.clippingPlanes,
        v = p.clipIntersection,
        f = p.clipShadows,
        d = n.get(p)
      if (!s || g === null || g.length === 0 || (r && !f)) r ? u(null) : l()
      else {
        const M = r ? 0 : i,
          T = M * 4
        let w = d.clippingState || null
        ;((c.value = w), (w = u(g, h, T, m)))
        for (let C = 0; C !== T; ++C) w[C] = e[C]
        ;((d.clippingState = w),
          (this.numIntersection = v ? this.numPlanes : 0),
          (this.numPlanes += M))
      }
    }))
  function l() {
    ;(c.value !== e && ((c.value = e), (c.needsUpdate = i > 0)),
      (t.numPlanes = i),
      (t.numIntersection = 0))
  }
  function u(p, h, m, g) {
    const v = p !== null ? p.length : 0
    let f = null
    if (v !== 0) {
      if (((f = c.value), g !== !0 || f === null)) {
        const d = m + v * 4,
          M = h.matrixWorldInverse
        ;(o.getNormalMatrix(M),
          (f === null || f.length < d) && (f = new Float32Array(d)))
        for (let T = 0, w = m; T !== v; ++T, w += 4)
          (a.copy(p[T]).applyMatrix4(M, o),
            a.normal.toArray(f, w),
            (f[w + 3] = a.constant))
      }
      ;((c.value = f), (c.needsUpdate = !0))
    }
    return ((t.numPlanes = v), (t.numIntersection = 0), f)
  }
}
const ai = 4,
  Hl = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582],
  gi = 20,
  hm = 256,
  as = new zo(),
  Vl = new Ot()
let sa = null,
  ra = 0,
  aa = 0,
  oa = !1
const um = new D()
class co {
  constructor(t) {
    ;((this._renderer = t),
      (this._pingPongRenderTarget = null),
      (this._lodMax = 0),
      (this._cubeSize = 0),
      (this._sizeLods = []),
      (this._sigmas = []),
      (this._lodMeshes = []),
      (this._backgroundBox = null),
      (this._cubemapMaterial = null),
      (this._equirectMaterial = null),
      (this._blurMaterial = null),
      (this._ggxMaterial = null))
  }
  fromScene(t, e = 0, i = 0.1, s = 100, r = {}) {
    const { size: a = 256, position: o = um } = r
    ;((sa = this._renderer.getRenderTarget()),
      (ra = this._renderer.getActiveCubeFace()),
      (aa = this._renderer.getActiveMipmapLevel()),
      (oa = this._renderer.xr.enabled),
      (this._renderer.xr.enabled = !1),
      this._setSize(a))
    const c = this._allocateTargets()
    return (
      (c.depthBuffer = !0),
      this._sceneToCubeUV(t, i, s, c, o),
      e > 0 && this._blur(c, 0, 0, e),
      this._applyPMREM(c),
      this._cleanup(c),
      c
    )
  }
  fromEquirectangular(t, e = null) {
    return this._fromTexture(t, e)
  }
  fromCubemap(t, e = null) {
    return this._fromTexture(t, e)
  }
  compileCubemapShader() {
    this._cubemapMaterial === null &&
      ((this._cubemapMaterial = ql()),
      this._compileMaterial(this._cubemapMaterial))
  }
  compileEquirectangularShader() {
    this._equirectMaterial === null &&
      ((this._equirectMaterial = Xl()),
      this._compileMaterial(this._equirectMaterial))
  }
  dispose() {
    ;(this._dispose(),
      this._cubemapMaterial !== null && this._cubemapMaterial.dispose(),
      this._equirectMaterial !== null && this._equirectMaterial.dispose(),
      this._backgroundBox !== null &&
        (this._backgroundBox.geometry.dispose(),
        this._backgroundBox.material.dispose()))
  }
  _setSize(t) {
    ;((this._lodMax = Math.floor(Math.log2(t))),
      (this._cubeSize = Math.pow(2, this._lodMax)))
  }
  _dispose() {
    ;(this._blurMaterial !== null && this._blurMaterial.dispose(),
      this._ggxMaterial !== null && this._ggxMaterial.dispose(),
      this._pingPongRenderTarget !== null &&
        this._pingPongRenderTarget.dispose())
    for (let t = 0; t < this._lodMeshes.length; t++)
      this._lodMeshes[t].geometry.dispose()
  }
  _cleanup(t) {
    ;(this._renderer.setRenderTarget(sa, ra, aa),
      (this._renderer.xr.enabled = oa),
      (t.scissorTest = !1),
      Bi(t, 0, 0, t.width, t.height))
  }
  _fromTexture(t, e) {
    ;(t.mapping === vi || t.mapping === qi
      ? this._setSize(
          t.image.length === 0 ? 16 : t.image[0].width || t.image[0].image.width
        )
      : this._setSize(t.image.width / 4),
      (sa = this._renderer.getRenderTarget()),
      (ra = this._renderer.getActiveCubeFace()),
      (aa = this._renderer.getActiveMipmapLevel()),
      (oa = this._renderer.xr.enabled),
      (this._renderer.xr.enabled = !1))
    const i = e || this._allocateTargets()
    return (
      this._textureToCubeUV(t, i),
      this._applyPMREM(i),
      this._cleanup(i),
      i
    )
  }
  _allocateTargets() {
    const t = 3 * Math.max(this._cubeSize, 112),
      e = 4 * this._cubeSize,
      i = {
        magFilter: Ge,
        minFilter: Ge,
        generateMipmaps: !1,
        type: Hn,
        format: _n,
        colorSpace: dr,
        depthBuffer: !1,
      },
      s = Wl(t, e, i)
    if (
      this._pingPongRenderTarget === null ||
      this._pingPongRenderTarget.width !== t ||
      this._pingPongRenderTarget.height !== e
    ) {
      ;(this._pingPongRenderTarget !== null && this._dispose(),
        (this._pingPongRenderTarget = Wl(t, e, i)))
      const { _lodMax: r } = this
      ;(({
        lodMeshes: this._lodMeshes,
        sizeLods: this._sizeLods,
        sigmas: this._sigmas,
      } = dm(r)),
        (this._blurMaterial = pm(r, t, e)),
        (this._ggxMaterial = fm(r, t, e)))
    }
    return s
  }
  _compileMaterial(t) {
    const e = new Jt(new Ye(), t)
    this._renderer.compile(e, as)
  }
  _sceneToCubeUV(t, e, i, s, r) {
    const c = new sn(90, 1, e, i),
      l = [1, -1, 1, 1, 1, 1],
      u = [1, 1, 1, -1, -1, -1],
      p = this._renderer,
      h = p.autoClear,
      m = p.toneMapping
    ;(p.getClearColor(Vl),
      (p.toneMapping = wn),
      (p.autoClear = !1),
      p.state.buffers.depth.getReversed() &&
        (p.setRenderTarget(s), p.clearDepth(), p.setRenderTarget(null)),
      this._backgroundBox === null &&
        (this._backgroundBox = new Jt(
          new Ue(),
          new Io({
            name: 'PMREM.Background',
            side: qe,
            depthWrite: !1,
            depthTest: !1,
          })
        )))
    const v = this._backgroundBox,
      f = v.material
    let d = !1
    const M = t.background
    M
      ? M.isColor && (f.color.copy(M), (t.background = null), (d = !0))
      : (f.color.copy(Vl), (d = !0))
    for (let T = 0; T < 6; T++) {
      const w = T % 3
      w === 0
        ? (c.up.set(0, l[T], 0),
          c.position.set(r.x, r.y, r.z),
          c.lookAt(r.x + u[T], r.y, r.z))
        : w === 1
          ? (c.up.set(0, 0, l[T]),
            c.position.set(r.x, r.y, r.z),
            c.lookAt(r.x, r.y + u[T], r.z))
          : (c.up.set(0, l[T], 0),
            c.position.set(r.x, r.y, r.z),
            c.lookAt(r.x, r.y, r.z + u[T]))
      const C = this._cubeSize
      ;(Bi(s, w * C, T > 2 ? C : 0, C, C),
        p.setRenderTarget(s),
        d && p.render(v, c),
        p.render(t, c))
    }
    ;((p.toneMapping = m), (p.autoClear = h), (t.background = M))
  }
  _textureToCubeUV(t, e) {
    const i = this._renderer,
      s = t.mapping === vi || t.mapping === qi
    s
      ? (this._cubemapMaterial === null && (this._cubemapMaterial = ql()),
        (this._cubemapMaterial.uniforms.flipEnvMap.value =
          t.isRenderTargetTexture === !1 ? -1 : 1))
      : this._equirectMaterial === null && (this._equirectMaterial = Xl())
    const r = s ? this._cubemapMaterial : this._equirectMaterial,
      a = this._lodMeshes[0]
    a.material = r
    const o = r.uniforms
    o.envMap.value = t
    const c = this._cubeSize
    ;(Bi(e, 0, 0, 3 * c, 2 * c), i.setRenderTarget(e), i.render(a, as))
  }
  _applyPMREM(t) {
    const e = this._renderer,
      i = e.autoClear
    e.autoClear = !1
    const s = this._lodMeshes.length
    for (let r = 1; r < s; r++) this._applyGGXFilter(t, r - 1, r)
    e.autoClear = i
  }
  _applyGGXFilter(t, e, i) {
    const s = this._renderer,
      r = this._pingPongRenderTarget,
      a = this._ggxMaterial,
      o = this._lodMeshes[i]
    o.material = a
    const c = a.uniforms,
      l = i / (this._lodMeshes.length - 1),
      u = e / (this._lodMeshes.length - 1),
      p = Math.sqrt(l * l - u * u),
      h = 0 + l * 1.25,
      m = p * h,
      { _lodMax: g } = this,
      v = this._sizeLods[i],
      f = 3 * v * (i > g - ai ? i - g + ai : 0),
      d = 4 * (this._cubeSize - v)
    ;((c.envMap.value = t.texture),
      (c.roughness.value = m),
      (c.mipInt.value = g - e),
      Bi(r, f, d, 3 * v, 2 * v),
      s.setRenderTarget(r),
      s.render(o, as),
      (c.envMap.value = r.texture),
      (c.roughness.value = 0),
      (c.mipInt.value = g - i),
      Bi(t, f, d, 3 * v, 2 * v),
      s.setRenderTarget(t),
      s.render(o, as))
  }
  _blur(t, e, i, s, r) {
    const a = this._pingPongRenderTarget
    ;(this._halfBlur(t, a, e, i, s, 'latitudinal', r),
      this._halfBlur(a, t, i, i, s, 'longitudinal', r))
  }
  _halfBlur(t, e, i, s, r, a, o) {
    const c = this._renderer,
      l = this._blurMaterial
    a !== 'latitudinal' &&
      a !== 'longitudinal' &&
      Zt('blur direction must be either latitudinal or longitudinal!')
    const u = 3,
      p = this._lodMeshes[s]
    p.material = l
    const h = l.uniforms,
      m = this._sizeLods[i] - 1,
      g = isFinite(r) ? Math.PI / (2 * m) : (2 * Math.PI) / (2 * gi - 1),
      v = r / g,
      f = isFinite(r) ? 1 + Math.floor(u * v) : gi
    f > gi &&
      Dt(
        `sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${gi}`
      )
    const d = []
    let M = 0
    for (let y = 0; y < gi; ++y) {
      const _ = y / v,
        b = Math.exp((-_ * _) / 2)
      ;(d.push(b), y === 0 ? (M += b) : y < f && (M += 2 * b))
    }
    for (let y = 0; y < d.length; y++) d[y] = d[y] / M
    ;((h.envMap.value = t.texture),
      (h.samples.value = f),
      (h.weights.value = d),
      (h.latitudinal.value = a === 'latitudinal'),
      o && (h.poleAxis.value = o))
    const { _lodMax: T } = this
    ;((h.dTheta.value = g), (h.mipInt.value = T - i))
    const w = this._sizeLods[s],
      C = 3 * w * (s > T - ai ? s - T + ai : 0),
      A = 4 * (this._cubeSize - w)
    ;(Bi(e, C, A, 3 * w, 2 * w), c.setRenderTarget(e), c.render(p, as))
  }
}
function dm(n) {
  const t = [],
    e = [],
    i = []
  let s = n
  const r = n - ai + 1 + Hl.length
  for (let a = 0; a < r; a++) {
    const o = Math.pow(2, s)
    t.push(o)
    let c = 1 / o
    ;(a > n - ai ? (c = Hl[a - n + ai - 1]) : a === 0 && (c = 0), e.push(c))
    const l = 1 / (o - 2),
      u = -l,
      p = 1 + l,
      h = [u, u, p, u, p, p, u, u, p, p, u, p],
      m = 6,
      g = 6,
      v = 3,
      f = 2,
      d = 1,
      M = new Float32Array(v * g * m),
      T = new Float32Array(f * g * m),
      w = new Float32Array(d * g * m)
    for (let A = 0; A < m; A++) {
      const y = ((A % 3) * 2) / 3 - 1,
        _ = A > 2 ? 0 : -1,
        b = [
          y,
          _,
          0,
          y + 2 / 3,
          _,
          0,
          y + 2 / 3,
          _ + 1,
          0,
          y,
          _,
          0,
          y + 2 / 3,
          _ + 1,
          0,
          y,
          _ + 1,
          0,
        ]
      ;(M.set(b, v * g * A), T.set(h, f * g * A))
      const P = [A, A, A, A, A, A]
      w.set(P, d * g * A)
    }
    const C = new Ye()
    ;(C.setAttribute('position', new un(M, v)),
      C.setAttribute('uv', new un(T, f)),
      C.setAttribute('faceIndex', new un(w, d)),
      i.push(new Jt(C, null)),
      s > ai && s--)
  }
  return { lodMeshes: i, sizeLods: t, sigmas: e }
}
function Wl(n, t, e) {
  const i = new An(n, t, e)
  return (
    (i.texture.mapping = Mr),
    (i.texture.name = 'PMREM.cubeUv'),
    (i.scissorTest = !0),
    i
  )
}
function Bi(n, t, e, i, s) {
  ;(n.viewport.set(t, e, i, s), n.scissor.set(t, e, i, s))
}
function fm(n, t, e) {
  return new Pn({
    name: 'PMREMGGXConvolution',
    defines: {
      GGX_SAMPLES: hm,
      CUBEUV_TEXEL_WIDTH: 1 / t,
      CUBEUV_TEXEL_HEIGHT: 1 / e,
      CUBEUV_MAX_MIP: `${n}.0`,
    },
    uniforms: {
      envMap: { value: null },
      roughness: { value: 0 },
      mipInt: { value: 0 },
    },
    vertexShader: br(),
    fragmentShader: `

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,
    blending: kn,
    depthTest: !1,
    depthWrite: !1,
  })
}
function pm(n, t, e) {
  const i = new Float32Array(gi),
    s = new D(0, 1, 0)
  return new Pn({
    name: 'SphericalGaussianBlur',
    defines: {
      n: gi,
      CUBEUV_TEXEL_WIDTH: 1 / t,
      CUBEUV_TEXEL_HEIGHT: 1 / e,
      CUBEUV_MAX_MIP: `${n}.0`,
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: i },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: s },
    },
    vertexShader: br(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,
    blending: kn,
    depthTest: !1,
    depthWrite: !1,
  })
}
function Xl() {
  return new Pn({
    name: 'EquirectangularToCubeUV',
    uniforms: { envMap: { value: null } },
    vertexShader: br(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,
    blending: kn,
    depthTest: !1,
    depthWrite: !1,
  })
}
function ql() {
  return new Pn({
    name: 'CubemapToCubeUV',
    uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 } },
    vertexShader: br(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,
    blending: kn,
    depthTest: !1,
    depthWrite: !1,
  })
}
function br() {
  return `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`
}
class sh extends An {
  constructor(t = 1, e = {}) {
    ;(super(t, t, e), (this.isWebGLCubeRenderTarget = !0))
    const i = { width: t, height: t, depth: 1 },
      s = [i, i, i, i, i, i]
    ;((this.texture = new $c(s)),
      this._setTextureOptions(e),
      (this.texture.isRenderTargetTexture = !0))
  }
  fromEquirectangularTexture(t, e) {
    ;((this.texture.type = e.type),
      (this.texture.colorSpace = e.colorSpace),
      (this.texture.generateMipmaps = e.generateMipmaps),
      (this.texture.minFilter = e.minFilter),
      (this.texture.magFilter = e.magFilter))
    const i = {
        uniforms: { tEquirect: { value: null } },
        vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,
        fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`,
      },
      s = new Ue(5, 5, 5),
      r = new Pn({
        name: 'CubemapFromEquirect',
        uniforms: ji(i.uniforms),
        vertexShader: i.vertexShader,
        fragmentShader: i.fragmentShader,
        side: qe,
        blending: kn,
      })
    r.uniforms.tEquirect.value = e
    const a = new Jt(s, r),
      o = e.minFilter
    return (
      e.minFilter === _i && (e.minFilter = Ge),
      new gd(1, 10, this).update(t, a),
      (e.minFilter = o),
      a.geometry.dispose(),
      a.material.dispose(),
      this
    )
  }
  clear(t, e = !0, i = !0, s = !0) {
    const r = t.getRenderTarget()
    for (let a = 0; a < 6; a++) (t.setRenderTarget(this, a), t.clear(e, i, s))
    t.setRenderTarget(r)
  }
}
function mm(n) {
  let t = new WeakMap(),
    e = new WeakMap(),
    i = null
  function s(h, m = !1) {
    return h == null ? null : m ? a(h) : r(h)
  }
  function r(h) {
    if (h && h.isTexture) {
      const m = h.mapping
      if (m === Lr || m === Dr)
        if (t.has(h)) {
          const g = t.get(h).texture
          return o(g, h.mapping)
        } else {
          const g = h.image
          if (g && g.height > 0) {
            const v = new sh(g.height)
            return (
              v.fromEquirectangularTexture(n, h),
              t.set(h, v),
              h.addEventListener('dispose', l),
              o(v.texture, h.mapping)
            )
          } else return null
        }
    }
    return h
  }
  function a(h) {
    if (h && h.isTexture) {
      const m = h.mapping,
        g = m === Lr || m === Dr,
        v = m === vi || m === qi
      if (g || v) {
        let f = e.get(h)
        const d = f !== void 0 ? f.texture.pmremVersion : 0
        if (h.isRenderTargetTexture && h.pmremVersion !== d)
          return (
            i === null && (i = new co(n)),
            (f = g ? i.fromEquirectangular(h, f) : i.fromCubemap(h, f)),
            (f.texture.pmremVersion = h.pmremVersion),
            e.set(h, f),
            f.texture
          )
        if (f !== void 0) return f.texture
        {
          const M = h.image
          return (g && M && M.height > 0) || (v && M && c(M))
            ? (i === null && (i = new co(n)),
              (f = g ? i.fromEquirectangular(h) : i.fromCubemap(h)),
              (f.texture.pmremVersion = h.pmremVersion),
              e.set(h, f),
              h.addEventListener('dispose', u),
              f.texture)
            : null
        }
      }
    }
    return h
  }
  function o(h, m) {
    return (m === Lr ? (h.mapping = vi) : m === Dr && (h.mapping = qi), h)
  }
  function c(h) {
    let m = 0
    const g = 6
    for (let v = 0; v < g; v++) h[v] !== void 0 && m++
    return m === g
  }
  function l(h) {
    const m = h.target
    m.removeEventListener('dispose', l)
    const g = t.get(m)
    g !== void 0 && (t.delete(m), g.dispose())
  }
  function u(h) {
    const m = h.target
    m.removeEventListener('dispose', u)
    const g = e.get(m)
    g !== void 0 && (e.delete(m), g.dispose())
  }
  function p() {
    ;((t = new WeakMap()),
      (e = new WeakMap()),
      i !== null && (i.dispose(), (i = null)))
  }
  return { get: s, dispose: p }
}
function gm(n) {
  const t = {}
  function e(i) {
    if (t[i] !== void 0) return t[i]
    const s = n.getExtension(i)
    return ((t[i] = s), s)
  }
  return {
    has: function (i) {
      return e(i) !== null
    },
    init: function () {
      ;(e('EXT_color_buffer_float'),
        e('WEBGL_clip_cull_distance'),
        e('OES_texture_float_linear'),
        e('EXT_color_buffer_half_float'),
        e('WEBGL_multisampled_render_to_texture'),
        e('WEBGL_render_shared_exponent'))
    },
    get: function (i) {
      const s = e(i)
      return (
        s === null && ao('WebGLRenderer: ' + i + ' extension not supported.'),
        s
      )
    },
  }
}
function _m(n, t, e, i) {
  const s = {},
    r = new WeakMap()
  function a(p) {
    const h = p.target
    h.index !== null && t.remove(h.index)
    for (const g in h.attributes) t.remove(h.attributes[g])
    ;(h.removeEventListener('dispose', a), delete s[h.id])
    const m = r.get(h)
    ;(m && (t.remove(m), r.delete(h)),
      i.releaseStatesOfGeometry(h),
      h.isInstancedBufferGeometry === !0 && delete h._maxInstanceCount,
      e.memory.geometries--)
  }
  function o(p, h) {
    return (
      s[h.id] === !0 ||
        (h.addEventListener('dispose', a),
        (s[h.id] = !0),
        e.memory.geometries++),
      h
    )
  }
  function c(p) {
    const h = p.attributes
    for (const m in h) t.update(h[m], n.ARRAY_BUFFER)
  }
  function l(p) {
    const h = [],
      m = p.index,
      g = p.attributes.position
    let v = 0
    if (g === void 0) return
    if (m !== null) {
      const M = m.array
      v = m.version
      for (let T = 0, w = M.length; T < w; T += 3) {
        const C = M[T + 0],
          A = M[T + 1],
          y = M[T + 2]
        h.push(C, A, A, y, y, C)
      }
    } else {
      const M = g.array
      v = g.version
      for (let T = 0, w = M.length / 3 - 1; T < w; T += 3) {
        const C = T + 0,
          A = T + 1,
          y = T + 2
        h.push(C, A, A, y, y, C)
      }
    }
    const f = new (g.count >= 65535 ? Yc : qc)(h, 1)
    f.version = v
    const d = r.get(p)
    ;(d && t.remove(d), r.set(p, f))
  }
  function u(p) {
    const h = r.get(p)
    if (h) {
      const m = p.index
      m !== null && h.version < m.version && l(p)
    } else l(p)
    return r.get(p)
  }
  return { get: o, update: c, getWireframeAttribute: u }
}
function xm(n, t, e) {
  let i
  function s(p) {
    i = p
  }
  let r, a
  function o(p) {
    ;((r = p.type), (a = p.bytesPerElement))
  }
  function c(p, h) {
    ;(n.drawElements(i, h, r, p * a), e.update(h, i, 1))
  }
  function l(p, h, m) {
    m !== 0 && (n.drawElementsInstanced(i, h, r, p * a, m), e.update(h, i, m))
  }
  function u(p, h, m) {
    if (m === 0) return
    t.get('WEBGL_multi_draw').multiDrawElementsWEBGL(i, h, 0, r, p, 0, m)
    let v = 0
    for (let f = 0; f < m; f++) v += h[f]
    e.update(v, i, 1)
  }
  ;((this.setMode = s),
    (this.setIndex = o),
    (this.render = c),
    (this.renderInstances = l),
    (this.renderMultiDraw = u))
}
function vm(n) {
  const t = { geometries: 0, textures: 0 },
    e = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 }
  function i(r, a, o) {
    switch ((e.calls++, a)) {
      case n.TRIANGLES:
        e.triangles += o * (r / 3)
        break
      case n.LINES:
        e.lines += o * (r / 2)
        break
      case n.LINE_STRIP:
        e.lines += o * (r - 1)
        break
      case n.LINE_LOOP:
        e.lines += o * r
        break
      case n.POINTS:
        e.points += o * r
        break
      default:
        Zt('WebGLInfo: Unknown draw mode:', a)
        break
    }
  }
  function s() {
    ;((e.calls = 0), (e.triangles = 0), (e.points = 0), (e.lines = 0))
  }
  return {
    memory: t,
    render: e,
    programs: null,
    autoReset: !0,
    reset: s,
    update: i,
  }
}
function Mm(n, t, e) {
  const i = new WeakMap(),
    s = new xe()
  function r(a, o, c) {
    const l = a.morphTargetInfluences,
      u =
        o.morphAttributes.position ||
        o.morphAttributes.normal ||
        o.morphAttributes.color,
      p = u !== void 0 ? u.length : 0
    let h = i.get(o)
    if (h === void 0 || h.count !== p) {
      let P = function () {
        ;(_.dispose(), i.delete(o), o.removeEventListener('dispose', P))
      }
      var m = P
      h !== void 0 && h.texture.dispose()
      const g = o.morphAttributes.position !== void 0,
        v = o.morphAttributes.normal !== void 0,
        f = o.morphAttributes.color !== void 0,
        d = o.morphAttributes.position || [],
        M = o.morphAttributes.normal || [],
        T = o.morphAttributes.color || []
      let w = 0
      ;(g === !0 && (w = 1), v === !0 && (w = 2), f === !0 && (w = 3))
      let C = o.attributes.position.count * w,
        A = 1
      C > t.maxTextureSize &&
        ((A = Math.ceil(C / t.maxTextureSize)), (C = t.maxTextureSize))
      const y = new Float32Array(C * A * 4 * p),
        _ = new Vc(y, C, A, p)
      ;((_.type = gn), (_.needsUpdate = !0))
      const b = w * 4
      for (let R = 0; R < p; R++) {
        const N = d[R],
          V = M[R],
          W = T[R],
          I = C * A * 4 * R
        for (let G = 0; G < N.count; G++) {
          const O = G * b
          ;(g === !0 &&
            (s.fromBufferAttribute(N, G),
            (y[I + O + 0] = s.x),
            (y[I + O + 1] = s.y),
            (y[I + O + 2] = s.z),
            (y[I + O + 3] = 0)),
            v === !0 &&
              (s.fromBufferAttribute(V, G),
              (y[I + O + 4] = s.x),
              (y[I + O + 5] = s.y),
              (y[I + O + 6] = s.z),
              (y[I + O + 7] = 0)),
            f === !0 &&
              (s.fromBufferAttribute(W, G),
              (y[I + O + 8] = s.x),
              (y[I + O + 9] = s.y),
              (y[I + O + 10] = s.z),
              (y[I + O + 11] = W.itemSize === 4 ? s.w : 1)))
        }
      }
      ;((h = { count: p, texture: _, size: new Nt(C, A) }),
        i.set(o, h),
        o.addEventListener('dispose', P))
    }
    if (a.isInstancedMesh === !0 && a.morphTexture !== null)
      c.getUniforms().setValue(n, 'morphTexture', a.morphTexture, e)
    else {
      let g = 0
      for (let f = 0; f < l.length; f++) g += l[f]
      const v = o.morphTargetsRelative ? 1 : 1 - g
      ;(c.getUniforms().setValue(n, 'morphTargetBaseInfluence', v),
        c.getUniforms().setValue(n, 'morphTargetInfluences', l))
    }
    ;(c.getUniforms().setValue(n, 'morphTargetsTexture', h.texture, e),
      c.getUniforms().setValue(n, 'morphTargetsTextureSize', h.size))
  }
  return { update: r }
}
function Sm(n, t, e, i, s) {
  let r = new WeakMap()
  function a(l) {
    const u = s.render.frame,
      p = l.geometry,
      h = t.get(l, p)
    if (
      (r.get(h) !== u && (t.update(h), r.set(h, u)),
      l.isInstancedMesh &&
        (l.hasEventListener('dispose', c) === !1 &&
          l.addEventListener('dispose', c),
        r.get(l) !== u &&
          (e.update(l.instanceMatrix, n.ARRAY_BUFFER),
          l.instanceColor !== null && e.update(l.instanceColor, n.ARRAY_BUFFER),
          r.set(l, u))),
      l.isSkinnedMesh)
    ) {
      const m = l.skeleton
      r.get(m) !== u && (m.update(), r.set(m, u))
    }
    return h
  }
  function o() {
    r = new WeakMap()
  }
  function c(l) {
    const u = l.target
    ;(u.removeEventListener('dispose', c),
      i.releaseStatesOfObject(u),
      e.remove(u.instanceMatrix),
      u.instanceColor !== null && e.remove(u.instanceColor))
  }
  return { update: a, dispose: o }
}
const ym = {
  [Cc]: 'LINEAR_TONE_MAPPING',
  [Pc]: 'REINHARD_TONE_MAPPING',
  [Lc]: 'CINEON_TONE_MAPPING',
  [Dc]: 'ACES_FILMIC_TONE_MAPPING',
  [Uc]: 'AGX_TONE_MAPPING',
  [vo]: 'NEUTRAL_TONE_MAPPING',
  [Ic]: 'CUSTOM_TONE_MAPPING',
}
function bm(n, t, e, i, s) {
  const r = new An(t, e, {
      type: n,
      depthBuffer: i,
      stencilBuffer: s,
      depthTexture: i ? new Yi(t, e) : void 0,
    }),
    a = new An(t, e, { type: Hn, depthBuffer: !1, stencilBuffer: !1 }),
    o = new Ye()
  ;(o.setAttribute('position', new be([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)),
    o.setAttribute('uv', new be([0, 2, 0, 0, 2, 0], 2)))
  const c = new ld({
      uniforms: { tDiffuse: { value: null } },
      vertexShader: `
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,
      fragmentShader: `
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,
      depthTest: !1,
      depthWrite: !1,
    }),
    l = new Jt(o, c),
    u = new zo(-1, 1, 1, -1, 0, 1)
  let p = null,
    h = null,
    m = !1,
    g,
    v = null,
    f = [],
    d = !1
  ;((this.setSize = function (M, T) {
    ;(r.setSize(M, T), a.setSize(M, T))
    for (let w = 0; w < f.length; w++) {
      const C = f[w]
      C.setSize && C.setSize(M, T)
    }
  }),
    (this.setEffects = function (M) {
      ;((f = M), (d = f.length > 0 && f[0].isRenderPass === !0))
      const T = r.width,
        w = r.height
      for (let C = 0; C < f.length; C++) {
        const A = f[C]
        A.setSize && A.setSize(T, w)
      }
    }),
    (this.begin = function (M, T) {
      if (m || (M.toneMapping === wn && f.length === 0)) return !1
      if (((v = T), T !== null)) {
        const w = T.width,
          C = T.height
        ;(r.width !== w || r.height !== C) && this.setSize(w, C)
      }
      return (
        d === !1 && M.setRenderTarget(r),
        (g = M.toneMapping),
        (M.toneMapping = wn),
        !0
      )
    }),
    (this.hasRenderPass = function () {
      return d
    }),
    (this.end = function (M, T) {
      ;((M.toneMapping = g), (m = !0))
      let w = r,
        C = a
      for (let A = 0; A < f.length; A++) {
        const y = f[A]
        if (y.enabled !== !1 && (y.render(M, C, w, T), y.needsSwap !== !1)) {
          const _ = w
          ;((w = C), (C = _))
        }
      }
      if (p !== M.outputColorSpace || h !== M.toneMapping) {
        ;((p = M.outputColorSpace),
          (h = M.toneMapping),
          (c.defines = {}),
          $t.getTransfer(p) === ne && (c.defines.SRGB_TRANSFER = ''))
        const A = ym[h]
        ;(A && (c.defines[A] = ''), (c.needsUpdate = !0))
      }
      ;((c.uniforms.tDiffuse.value = w.texture),
        M.setRenderTarget(v),
        M.render(l, u),
        (v = null),
        (m = !1))
    }),
    (this.isCompositing = function () {
      return m
    }),
    (this.dispose = function () {
      ;(r.depthTexture && r.depthTexture.dispose(),
        r.dispose(),
        a.dispose(),
        o.dispose(),
        c.dispose())
    }))
}
const rh = new Ve(),
  ho = new Yi(1, 1),
  ah = new Vc(),
  oh = new Fu(),
  lh = new $c(),
  Yl = [],
  jl = [],
  Kl = new Float32Array(16),
  $l = new Float32Array(9),
  Zl = new Float32Array(4)
function Ji(n, t, e) {
  const i = n[0]
  if (i <= 0 || i > 0) return n
  const s = t * e
  let r = Yl[s]
  if ((r === void 0 && ((r = new Float32Array(s)), (Yl[s] = r)), t !== 0)) {
    i.toArray(r, 0)
    for (let a = 1, o = 0; a !== t; ++a) ((o += e), n[a].toArray(r, o))
  }
  return r
}
function Pe(n, t) {
  if (n.length !== t.length) return !1
  for (let e = 0, i = n.length; e < i; e++) if (n[e] !== t[e]) return !1
  return !0
}
function Le(n, t) {
  for (let e = 0, i = t.length; e < i; e++) n[e] = t[e]
}
function Er(n, t) {
  let e = jl[t]
  e === void 0 && ((e = new Int32Array(t)), (jl[t] = e))
  for (let i = 0; i !== t; ++i) e[i] = n.allocateTextureUnit()
  return e
}
function Em(n, t) {
  const e = this.cache
  e[0] !== t && (n.uniform1f(this.addr, t), (e[0] = t))
}
function Tm(n, t) {
  const e = this.cache
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) &&
      (n.uniform2f(this.addr, t.x, t.y), (e[0] = t.x), (e[1] = t.y))
  else {
    if (Pe(e, t)) return
    ;(n.uniform2fv(this.addr, t), Le(e, t))
  }
}
function wm(n, t) {
  const e = this.cache
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) &&
      (n.uniform3f(this.addr, t.x, t.y, t.z),
      (e[0] = t.x),
      (e[1] = t.y),
      (e[2] = t.z))
  else if (t.r !== void 0)
    (e[0] !== t.r || e[1] !== t.g || e[2] !== t.b) &&
      (n.uniform3f(this.addr, t.r, t.g, t.b),
      (e[0] = t.r),
      (e[1] = t.g),
      (e[2] = t.b))
  else {
    if (Pe(e, t)) return
    ;(n.uniform3fv(this.addr, t), Le(e, t))
  }
}
function Am(n, t) {
  const e = this.cache
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) &&
      (n.uniform4f(this.addr, t.x, t.y, t.z, t.w),
      (e[0] = t.x),
      (e[1] = t.y),
      (e[2] = t.z),
      (e[3] = t.w))
  else {
    if (Pe(e, t)) return
    ;(n.uniform4fv(this.addr, t), Le(e, t))
  }
}
function Rm(n, t) {
  const e = this.cache,
    i = t.elements
  if (i === void 0) {
    if (Pe(e, t)) return
    ;(n.uniformMatrix2fv(this.addr, !1, t), Le(e, t))
  } else {
    if (Pe(e, i)) return
    ;(Zl.set(i), n.uniformMatrix2fv(this.addr, !1, Zl), Le(e, i))
  }
}
function Cm(n, t) {
  const e = this.cache,
    i = t.elements
  if (i === void 0) {
    if (Pe(e, t)) return
    ;(n.uniformMatrix3fv(this.addr, !1, t), Le(e, t))
  } else {
    if (Pe(e, i)) return
    ;($l.set(i), n.uniformMatrix3fv(this.addr, !1, $l), Le(e, i))
  }
}
function Pm(n, t) {
  const e = this.cache,
    i = t.elements
  if (i === void 0) {
    if (Pe(e, t)) return
    ;(n.uniformMatrix4fv(this.addr, !1, t), Le(e, t))
  } else {
    if (Pe(e, i)) return
    ;(Kl.set(i), n.uniformMatrix4fv(this.addr, !1, Kl), Le(e, i))
  }
}
function Lm(n, t) {
  const e = this.cache
  e[0] !== t && (n.uniform1i(this.addr, t), (e[0] = t))
}
function Dm(n, t) {
  const e = this.cache
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) &&
      (n.uniform2i(this.addr, t.x, t.y), (e[0] = t.x), (e[1] = t.y))
  else {
    if (Pe(e, t)) return
    ;(n.uniform2iv(this.addr, t), Le(e, t))
  }
}
function Im(n, t) {
  const e = this.cache
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) &&
      (n.uniform3i(this.addr, t.x, t.y, t.z),
      (e[0] = t.x),
      (e[1] = t.y),
      (e[2] = t.z))
  else {
    if (Pe(e, t)) return
    ;(n.uniform3iv(this.addr, t), Le(e, t))
  }
}
function Um(n, t) {
  const e = this.cache
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) &&
      (n.uniform4i(this.addr, t.x, t.y, t.z, t.w),
      (e[0] = t.x),
      (e[1] = t.y),
      (e[2] = t.z),
      (e[3] = t.w))
  else {
    if (Pe(e, t)) return
    ;(n.uniform4iv(this.addr, t), Le(e, t))
  }
}
function Nm(n, t) {
  const e = this.cache
  e[0] !== t && (n.uniform1ui(this.addr, t), (e[0] = t))
}
function Fm(n, t) {
  const e = this.cache
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) &&
      (n.uniform2ui(this.addr, t.x, t.y), (e[0] = t.x), (e[1] = t.y))
  else {
    if (Pe(e, t)) return
    ;(n.uniform2uiv(this.addr, t), Le(e, t))
  }
}
function Om(n, t) {
  const e = this.cache
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) &&
      (n.uniform3ui(this.addr, t.x, t.y, t.z),
      (e[0] = t.x),
      (e[1] = t.y),
      (e[2] = t.z))
  else {
    if (Pe(e, t)) return
    ;(n.uniform3uiv(this.addr, t), Le(e, t))
  }
}
function Bm(n, t) {
  const e = this.cache
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) &&
      (n.uniform4ui(this.addr, t.x, t.y, t.z, t.w),
      (e[0] = t.x),
      (e[1] = t.y),
      (e[2] = t.z),
      (e[3] = t.w))
  else {
    if (Pe(e, t)) return
    ;(n.uniform4uiv(this.addr, t), Le(e, t))
  }
}
function zm(n, t, e) {
  const i = this.cache,
    s = e.allocateTextureUnit()
  i[0] !== s && (n.uniform1i(this.addr, s), (i[0] = s))
  let r
  ;(this.type === n.SAMPLER_2D_SHADOW
    ? ((ho.compareFunction = e.isReversedDepthBuffer() ? Ro : Ao), (r = ho))
    : (r = rh),
    e.setTexture2D(t || r, s))
}
function km(n, t, e) {
  const i = this.cache,
    s = e.allocateTextureUnit()
  ;(i[0] !== s && (n.uniform1i(this.addr, s), (i[0] = s)),
    e.setTexture3D(t || oh, s))
}
function Gm(n, t, e) {
  const i = this.cache,
    s = e.allocateTextureUnit()
  ;(i[0] !== s && (n.uniform1i(this.addr, s), (i[0] = s)),
    e.setTextureCube(t || lh, s))
}
function Hm(n, t, e) {
  const i = this.cache,
    s = e.allocateTextureUnit()
  ;(i[0] !== s && (n.uniform1i(this.addr, s), (i[0] = s)),
    e.setTexture2DArray(t || ah, s))
}
function Vm(n) {
  switch (n) {
    case 5126:
      return Em
    case 35664:
      return Tm
    case 35665:
      return wm
    case 35666:
      return Am
    case 35674:
      return Rm
    case 35675:
      return Cm
    case 35676:
      return Pm
    case 5124:
    case 35670:
      return Lm
    case 35667:
    case 35671:
      return Dm
    case 35668:
    case 35672:
      return Im
    case 35669:
    case 35673:
      return Um
    case 5125:
      return Nm
    case 36294:
      return Fm
    case 36295:
      return Om
    case 36296:
      return Bm
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return zm
    case 35679:
    case 36299:
    case 36307:
      return km
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return Gm
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return Hm
  }
}
function Wm(n, t) {
  n.uniform1fv(this.addr, t)
}
function Xm(n, t) {
  const e = Ji(t, this.size, 2)
  n.uniform2fv(this.addr, e)
}
function qm(n, t) {
  const e = Ji(t, this.size, 3)
  n.uniform3fv(this.addr, e)
}
function Ym(n, t) {
  const e = Ji(t, this.size, 4)
  n.uniform4fv(this.addr, e)
}
function jm(n, t) {
  const e = Ji(t, this.size, 4)
  n.uniformMatrix2fv(this.addr, !1, e)
}
function Km(n, t) {
  const e = Ji(t, this.size, 9)
  n.uniformMatrix3fv(this.addr, !1, e)
}
function $m(n, t) {
  const e = Ji(t, this.size, 16)
  n.uniformMatrix4fv(this.addr, !1, e)
}
function Zm(n, t) {
  n.uniform1iv(this.addr, t)
}
function Jm(n, t) {
  n.uniform2iv(this.addr, t)
}
function Qm(n, t) {
  n.uniform3iv(this.addr, t)
}
function t0(n, t) {
  n.uniform4iv(this.addr, t)
}
function e0(n, t) {
  n.uniform1uiv(this.addr, t)
}
function n0(n, t) {
  n.uniform2uiv(this.addr, t)
}
function i0(n, t) {
  n.uniform3uiv(this.addr, t)
}
function s0(n, t) {
  n.uniform4uiv(this.addr, t)
}
function r0(n, t, e) {
  const i = this.cache,
    s = t.length,
    r = Er(e, s)
  Pe(i, r) || (n.uniform1iv(this.addr, r), Le(i, r))
  let a
  this.type === n.SAMPLER_2D_SHADOW ? (a = ho) : (a = rh)
  for (let o = 0; o !== s; ++o) e.setTexture2D(t[o] || a, r[o])
}
function a0(n, t, e) {
  const i = this.cache,
    s = t.length,
    r = Er(e, s)
  Pe(i, r) || (n.uniform1iv(this.addr, r), Le(i, r))
  for (let a = 0; a !== s; ++a) e.setTexture3D(t[a] || oh, r[a])
}
function o0(n, t, e) {
  const i = this.cache,
    s = t.length,
    r = Er(e, s)
  Pe(i, r) || (n.uniform1iv(this.addr, r), Le(i, r))
  for (let a = 0; a !== s; ++a) e.setTextureCube(t[a] || lh, r[a])
}
function l0(n, t, e) {
  const i = this.cache,
    s = t.length,
    r = Er(e, s)
  Pe(i, r) || (n.uniform1iv(this.addr, r), Le(i, r))
  for (let a = 0; a !== s; ++a) e.setTexture2DArray(t[a] || ah, r[a])
}
function c0(n) {
  switch (n) {
    case 5126:
      return Wm
    case 35664:
      return Xm
    case 35665:
      return qm
    case 35666:
      return Ym
    case 35674:
      return jm
    case 35675:
      return Km
    case 35676:
      return $m
    case 5124:
    case 35670:
      return Zm
    case 35667:
    case 35671:
      return Jm
    case 35668:
    case 35672:
      return Qm
    case 35669:
    case 35673:
      return t0
    case 5125:
      return e0
    case 36294:
      return n0
    case 36295:
      return i0
    case 36296:
      return s0
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return r0
    case 35679:
    case 36299:
    case 36307:
      return a0
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return o0
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return l0
  }
}
class h0 {
  constructor(t, e, i) {
    ;((this.id = t),
      (this.addr = i),
      (this.cache = []),
      (this.type = e.type),
      (this.setValue = Vm(e.type)))
  }
}
class u0 {
  constructor(t, e, i) {
    ;((this.id = t),
      (this.addr = i),
      (this.cache = []),
      (this.type = e.type),
      (this.size = e.size),
      (this.setValue = c0(e.type)))
  }
}
class d0 {
  constructor(t) {
    ;((this.id = t), (this.seq = []), (this.map = {}))
  }
  setValue(t, e, i) {
    const s = this.seq
    for (let r = 0, a = s.length; r !== a; ++r) {
      const o = s[r]
      o.setValue(t, e[o.id], i)
    }
  }
}
const la = /(\w+)(\])?(\[|\.)?/g
function Jl(n, t) {
  ;(n.seq.push(t), (n.map[t.id] = t))
}
function f0(n, t, e) {
  const i = n.name,
    s = i.length
  for (la.lastIndex = 0; ; ) {
    const r = la.exec(i),
      a = la.lastIndex
    let o = r[1]
    const c = r[2] === ']',
      l = r[3]
    if ((c && (o = o | 0), l === void 0 || (l === '[' && a + 2 === s))) {
      Jl(e, l === void 0 ? new h0(o, n, t) : new u0(o, n, t))
      break
    } else {
      let p = e.map[o]
      ;(p === void 0 && ((p = new d0(o)), Jl(e, p)), (e = p))
    }
  }
}
class sr {
  constructor(t, e) {
    ;((this.seq = []), (this.map = {}))
    const i = t.getProgramParameter(e, t.ACTIVE_UNIFORMS)
    for (let a = 0; a < i; ++a) {
      const o = t.getActiveUniform(e, a),
        c = t.getUniformLocation(e, o.name)
      f0(o, c, this)
    }
    const s = [],
      r = []
    for (const a of this.seq)
      a.type === t.SAMPLER_2D_SHADOW ||
      a.type === t.SAMPLER_CUBE_SHADOW ||
      a.type === t.SAMPLER_2D_ARRAY_SHADOW
        ? s.push(a)
        : r.push(a)
    s.length > 0 && (this.seq = s.concat(r))
  }
  setValue(t, e, i, s) {
    const r = this.map[e]
    r !== void 0 && r.setValue(t, i, s)
  }
  setOptional(t, e, i) {
    const s = e[i]
    s !== void 0 && this.setValue(t, i, s)
  }
  static upload(t, e, i, s) {
    for (let r = 0, a = e.length; r !== a; ++r) {
      const o = e[r],
        c = i[o.id]
      c.needsUpdate !== !1 && o.setValue(t, c.value, s)
    }
  }
  static seqWithValue(t, e) {
    const i = []
    for (let s = 0, r = t.length; s !== r; ++s) {
      const a = t[s]
      a.id in e && i.push(a)
    }
    return i
  }
}
function Ql(n, t, e) {
  const i = n.createShader(t)
  return (n.shaderSource(i, e), n.compileShader(i), i)
}
const p0 = 37297
let m0 = 0
function g0(n, t) {
  const e = n.split(`
`),
    i = [],
    s = Math.max(t - 6, 0),
    r = Math.min(t + 6, e.length)
  for (let a = s; a < r; a++) {
    const o = a + 1
    i.push(`${o === t ? '>' : ' '} ${o}: ${e[a]}`)
  }
  return i.join(`
`)
}
const tc = new zt()
function _0(n) {
  $t._getMatrix(tc, $t.workingColorSpace, n)
  const t = `mat3( ${tc.elements.map(e => e.toFixed(4))} )`
  switch ($t.getTransfer(n)) {
    case fr:
      return [t, 'LinearTransferOETF']
    case ne:
      return [t, 'sRGBTransferOETF']
    default:
      return (
        Dt('WebGLProgram: Unsupported color space: ', n),
        [t, 'LinearTransferOETF']
      )
  }
}
function ec(n, t, e) {
  const i = n.getShaderParameter(t, n.COMPILE_STATUS),
    r = (n.getShaderInfoLog(t) || '').trim()
  if (i && r === '') return ''
  const a = /ERROR: 0:(\d+)/.exec(r)
  if (a) {
    const o = parseInt(a[1])
    return (
      e.toUpperCase() +
      `

` +
      r +
      `

` +
      g0(n.getShaderSource(t), o)
    )
  } else return r
}
function x0(n, t) {
  const e = _0(t)
  return [
    `vec4 ${n}( vec4 value ) {`,
    `	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,
    '}',
  ].join(`
`)
}
const v0 = {
  [Cc]: 'Linear',
  [Pc]: 'Reinhard',
  [Lc]: 'Cineon',
  [Dc]: 'ACESFilmic',
  [Uc]: 'AgX',
  [vo]: 'Neutral',
  [Ic]: 'Custom',
}
function M0(n, t) {
  const e = v0[t]
  return e === void 0
    ? (Dt('WebGLProgram: Unsupported toneMapping:', t),
      'vec3 ' + n + '( vec3 color ) { return LinearToneMapping( color ); }')
    : 'vec3 ' + n + '( vec3 color ) { return ' + e + 'ToneMapping( color ); }'
}
const qs = new D()
function S0() {
  $t.getLuminanceCoefficients(qs)
  const n = qs.x.toFixed(4),
    t = qs.y.toFixed(4),
    e = qs.z.toFixed(4)
  return [
    'float luminance( const in vec3 rgb ) {',
    `	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,
    '	return dot( weights, rgb );',
    '}',
  ].join(`
`)
}
function y0(n) {
  return [
    n.extensionClipCullDistance
      ? '#extension GL_ANGLE_clip_cull_distance : require'
      : '',
    n.extensionMultiDraw ? '#extension GL_ANGLE_multi_draw : require' : '',
  ].filter(hs).join(`
`)
}
function b0(n) {
  const t = []
  for (const e in n) {
    const i = n[e]
    i !== !1 && t.push('#define ' + e + ' ' + i)
  }
  return t.join(`
`)
}
function E0(n, t) {
  const e = {},
    i = n.getProgramParameter(t, n.ACTIVE_ATTRIBUTES)
  for (let s = 0; s < i; s++) {
    const r = n.getActiveAttrib(t, s),
      a = r.name
    let o = 1
    ;(r.type === n.FLOAT_MAT2 && (o = 2),
      r.type === n.FLOAT_MAT3 && (o = 3),
      r.type === n.FLOAT_MAT4 && (o = 4),
      (e[a] = {
        type: r.type,
        location: n.getAttribLocation(t, a),
        locationSize: o,
      }))
  }
  return e
}
function hs(n) {
  return n !== ''
}
function nc(n, t) {
  const e =
    t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps
  return n
    .replace(/NUM_DIR_LIGHTS/g, t.numDirLights)
    .replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights)
    .replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps)
    .replace(/NUM_SPOT_LIGHT_COORDS/g, e)
    .replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights)
    .replace(/NUM_POINT_LIGHTS/g, t.numPointLights)
    .replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights)
    .replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows)
    .replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps)
    .replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows)
    .replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows)
}
function ic(n, t) {
  return n
    .replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes)
    .replace(
      /UNION_CLIPPING_PLANES/g,
      t.numClippingPlanes - t.numClipIntersection
    )
}
const T0 = /^[ \t]*#include +<([\w\d./]+)>/gm
function uo(n) {
  return n.replace(T0, A0)
}
const w0 = new Map()
function A0(n, t) {
  let e = Vt[t]
  if (e === void 0) {
    const i = w0.get(t)
    if (i !== void 0)
      ((e = Vt[i]),
        Dt(
          'WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',
          t,
          i
        ))
    else throw new Error('Can not resolve #include <' + t + '>')
  }
  return uo(e)
}
const R0 =
  /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g
function sc(n) {
  return n.replace(R0, C0)
}
function C0(n, t, e, i) {
  let s = ''
  for (let r = parseInt(t); r < parseInt(e); r++)
    s += i
      .replace(/\[\s*i\s*\]/g, '[ ' + r + ' ]')
      .replace(/UNROLLED_LOOP_INDEX/g, r)
  return s
}
function rc(n) {
  let t = `precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`
  return (
    n.precision === 'highp'
      ? (t += `
#define HIGH_PRECISION`)
      : n.precision === 'mediump'
        ? (t += `
#define MEDIUM_PRECISION`)
        : n.precision === 'lowp' &&
          (t += `
#define LOW_PRECISION`),
    t
  )
}
const P0 = { [ds]: 'SHADOWMAP_TYPE_PCF', [cs]: 'SHADOWMAP_TYPE_VSM' }
function L0(n) {
  return P0[n.shadowMapType] || 'SHADOWMAP_TYPE_BASIC'
}
const D0 = {
  [vi]: 'ENVMAP_TYPE_CUBE',
  [qi]: 'ENVMAP_TYPE_CUBE',
  [Mr]: 'ENVMAP_TYPE_CUBE_UV',
}
function I0(n) {
  return n.envMap === !1
    ? 'ENVMAP_TYPE_CUBE'
    : D0[n.envMapMode] || 'ENVMAP_TYPE_CUBE'
}
const U0 = { [qi]: 'ENVMAP_MODE_REFRACTION' }
function N0(n) {
  return n.envMap === !1
    ? 'ENVMAP_MODE_REFLECTION'
    : U0[n.envMapMode] || 'ENVMAP_MODE_REFLECTION'
}
const F0 = {
  [xo]: 'ENVMAP_BLENDING_MULTIPLY',
  [tu]: 'ENVMAP_BLENDING_MIX',
  [eu]: 'ENVMAP_BLENDING_ADD',
}
function O0(n) {
  return n.envMap === !1
    ? 'ENVMAP_BLENDING_NONE'
    : F0[n.combine] || 'ENVMAP_BLENDING_NONE'
}
function B0(n) {
  const t = n.envMapCubeUVHeight
  if (t === null) return null
  const e = Math.log2(t) - 2,
    i = 1 / t
  return {
    texelWidth: 1 / (3 * Math.max(Math.pow(2, e), 112)),
    texelHeight: i,
    maxMip: e,
  }
}
function z0(n, t, e, i) {
  const s = n.getContext(),
    r = e.defines
  let a = e.vertexShader,
    o = e.fragmentShader
  const c = L0(e),
    l = I0(e),
    u = N0(e),
    p = O0(e),
    h = B0(e),
    m = y0(e),
    g = b0(r),
    v = s.createProgram()
  let f,
    d,
    M = e.glslVersion
      ? '#version ' +
        e.glslVersion +
        `
`
      : ''
  ;(e.isRawShaderMaterial
    ? ((f = [
        '#define SHADER_TYPE ' + e.shaderType,
        '#define SHADER_NAME ' + e.shaderName,
        g,
      ].filter(hs).join(`
`)),
      f.length > 0 &&
        (f += `
`),
      (d = [
        '#define SHADER_TYPE ' + e.shaderType,
        '#define SHADER_NAME ' + e.shaderName,
        g,
      ].filter(hs).join(`
`)),
      d.length > 0 &&
        (d += `
`))
    : ((f = [
        rc(e),
        '#define SHADER_TYPE ' + e.shaderType,
        '#define SHADER_NAME ' + e.shaderName,
        g,
        e.extensionClipCullDistance ? '#define USE_CLIP_DISTANCE' : '',
        e.batching ? '#define USE_BATCHING' : '',
        e.batchingColor ? '#define USE_BATCHING_COLOR' : '',
        e.instancing ? '#define USE_INSTANCING' : '',
        e.instancingColor ? '#define USE_INSTANCING_COLOR' : '',
        e.instancingMorph ? '#define USE_INSTANCING_MORPH' : '',
        e.useFog && e.fog ? '#define USE_FOG' : '',
        e.useFog && e.fogExp2 ? '#define FOG_EXP2' : '',
        e.map ? '#define USE_MAP' : '',
        e.envMap ? '#define USE_ENVMAP' : '',
        e.envMap ? '#define ' + u : '',
        e.lightMap ? '#define USE_LIGHTMAP' : '',
        e.aoMap ? '#define USE_AOMAP' : '',
        e.bumpMap ? '#define USE_BUMPMAP' : '',
        e.normalMap ? '#define USE_NORMALMAP' : '',
        e.normalMapObjectSpace ? '#define USE_NORMALMAP_OBJECTSPACE' : '',
        e.normalMapTangentSpace ? '#define USE_NORMALMAP_TANGENTSPACE' : '',
        e.displacementMap ? '#define USE_DISPLACEMENTMAP' : '',
        e.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
        e.anisotropy ? '#define USE_ANISOTROPY' : '',
        e.anisotropyMap ? '#define USE_ANISOTROPYMAP' : '',
        e.clearcoatMap ? '#define USE_CLEARCOATMAP' : '',
        e.clearcoatRoughnessMap ? '#define USE_CLEARCOAT_ROUGHNESSMAP' : '',
        e.clearcoatNormalMap ? '#define USE_CLEARCOAT_NORMALMAP' : '',
        e.iridescenceMap ? '#define USE_IRIDESCENCEMAP' : '',
        e.iridescenceThicknessMap ? '#define USE_IRIDESCENCE_THICKNESSMAP' : '',
        e.specularMap ? '#define USE_SPECULARMAP' : '',
        e.specularColorMap ? '#define USE_SPECULAR_COLORMAP' : '',
        e.specularIntensityMap ? '#define USE_SPECULAR_INTENSITYMAP' : '',
        e.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
        e.metalnessMap ? '#define USE_METALNESSMAP' : '',
        e.alphaMap ? '#define USE_ALPHAMAP' : '',
        e.alphaHash ? '#define USE_ALPHAHASH' : '',
        e.transmission ? '#define USE_TRANSMISSION' : '',
        e.transmissionMap ? '#define USE_TRANSMISSIONMAP' : '',
        e.thicknessMap ? '#define USE_THICKNESSMAP' : '',
        e.sheenColorMap ? '#define USE_SHEEN_COLORMAP' : '',
        e.sheenRoughnessMap ? '#define USE_SHEEN_ROUGHNESSMAP' : '',
        e.mapUv ? '#define MAP_UV ' + e.mapUv : '',
        e.alphaMapUv ? '#define ALPHAMAP_UV ' + e.alphaMapUv : '',
        e.lightMapUv ? '#define LIGHTMAP_UV ' + e.lightMapUv : '',
        e.aoMapUv ? '#define AOMAP_UV ' + e.aoMapUv : '',
        e.emissiveMapUv ? '#define EMISSIVEMAP_UV ' + e.emissiveMapUv : '',
        e.bumpMapUv ? '#define BUMPMAP_UV ' + e.bumpMapUv : '',
        e.normalMapUv ? '#define NORMALMAP_UV ' + e.normalMapUv : '',
        e.displacementMapUv
          ? '#define DISPLACEMENTMAP_UV ' + e.displacementMapUv
          : '',
        e.metalnessMapUv ? '#define METALNESSMAP_UV ' + e.metalnessMapUv : '',
        e.roughnessMapUv ? '#define ROUGHNESSMAP_UV ' + e.roughnessMapUv : '',
        e.anisotropyMapUv
          ? '#define ANISOTROPYMAP_UV ' + e.anisotropyMapUv
          : '',
        e.clearcoatMapUv ? '#define CLEARCOATMAP_UV ' + e.clearcoatMapUv : '',
        e.clearcoatNormalMapUv
          ? '#define CLEARCOAT_NORMALMAP_UV ' + e.clearcoatNormalMapUv
          : '',
        e.clearcoatRoughnessMapUv
          ? '#define CLEARCOAT_ROUGHNESSMAP_UV ' + e.clearcoatRoughnessMapUv
          : '',
        e.iridescenceMapUv
          ? '#define IRIDESCENCEMAP_UV ' + e.iridescenceMapUv
          : '',
        e.iridescenceThicknessMapUv
          ? '#define IRIDESCENCE_THICKNESSMAP_UV ' + e.iridescenceThicknessMapUv
          : '',
        e.sheenColorMapUv
          ? '#define SHEEN_COLORMAP_UV ' + e.sheenColorMapUv
          : '',
        e.sheenRoughnessMapUv
          ? '#define SHEEN_ROUGHNESSMAP_UV ' + e.sheenRoughnessMapUv
          : '',
        e.specularMapUv ? '#define SPECULARMAP_UV ' + e.specularMapUv : '',
        e.specularColorMapUv
          ? '#define SPECULAR_COLORMAP_UV ' + e.specularColorMapUv
          : '',
        e.specularIntensityMapUv
          ? '#define SPECULAR_INTENSITYMAP_UV ' + e.specularIntensityMapUv
          : '',
        e.transmissionMapUv
          ? '#define TRANSMISSIONMAP_UV ' + e.transmissionMapUv
          : '',
        e.thicknessMapUv ? '#define THICKNESSMAP_UV ' + e.thicknessMapUv : '',
        e.vertexTangents && e.flatShading === !1 ? '#define USE_TANGENT' : '',
        e.vertexNormals ? '#define HAS_NORMAL' : '',
        e.vertexColors ? '#define USE_COLOR' : '',
        e.vertexAlphas ? '#define USE_COLOR_ALPHA' : '',
        e.vertexUv1s ? '#define USE_UV1' : '',
        e.vertexUv2s ? '#define USE_UV2' : '',
        e.vertexUv3s ? '#define USE_UV3' : '',
        e.pointsUvs ? '#define USE_POINTS_UV' : '',
        e.flatShading ? '#define FLAT_SHADED' : '',
        e.skinning ? '#define USE_SKINNING' : '',
        e.morphTargets ? '#define USE_MORPHTARGETS' : '',
        e.morphNormals && e.flatShading === !1
          ? '#define USE_MORPHNORMALS'
          : '',
        e.morphColors ? '#define USE_MORPHCOLORS' : '',
        e.morphTargetsCount > 0
          ? '#define MORPHTARGETS_TEXTURE_STRIDE ' + e.morphTextureStride
          : '',
        e.morphTargetsCount > 0
          ? '#define MORPHTARGETS_COUNT ' + e.morphTargetsCount
          : '',
        e.doubleSided ? '#define DOUBLE_SIDED' : '',
        e.flipSided ? '#define FLIP_SIDED' : '',
        e.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
        e.shadowMapEnabled ? '#define ' + c : '',
        e.sizeAttenuation ? '#define USE_SIZEATTENUATION' : '',
        e.numLightProbes > 0 ? '#define USE_LIGHT_PROBES' : '',
        e.logarithmicDepthBuffer ? '#define USE_LOGARITHMIC_DEPTH_BUFFER' : '',
        e.reversedDepthBuffer ? '#define USE_REVERSED_DEPTH_BUFFER' : '',
        'uniform mat4 modelMatrix;',
        'uniform mat4 modelViewMatrix;',
        'uniform mat4 projectionMatrix;',
        'uniform mat4 viewMatrix;',
        'uniform mat3 normalMatrix;',
        'uniform vec3 cameraPosition;',
        'uniform bool isOrthographic;',
        '#ifdef USE_INSTANCING',
        '	attribute mat4 instanceMatrix;',
        '#endif',
        '#ifdef USE_INSTANCING_COLOR',
        '	attribute vec3 instanceColor;',
        '#endif',
        '#ifdef USE_INSTANCING_MORPH',
        '	uniform sampler2D morphTexture;',
        '#endif',
        'attribute vec3 position;',
        'attribute vec3 normal;',
        'attribute vec2 uv;',
        '#ifdef USE_UV1',
        '	attribute vec2 uv1;',
        '#endif',
        '#ifdef USE_UV2',
        '	attribute vec2 uv2;',
        '#endif',
        '#ifdef USE_UV3',
        '	attribute vec2 uv3;',
        '#endif',
        '#ifdef USE_TANGENT',
        '	attribute vec4 tangent;',
        '#endif',
        '#if defined( USE_COLOR_ALPHA )',
        '	attribute vec4 color;',
        '#elif defined( USE_COLOR )',
        '	attribute vec3 color;',
        '#endif',
        '#ifdef USE_SKINNING',
        '	attribute vec4 skinIndex;',
        '	attribute vec4 skinWeight;',
        '#endif',
        `
`,
      ].filter(hs).join(`
`)),
      (d = [
        rc(e),
        '#define SHADER_TYPE ' + e.shaderType,
        '#define SHADER_NAME ' + e.shaderName,
        g,
        e.useFog && e.fog ? '#define USE_FOG' : '',
        e.useFog && e.fogExp2 ? '#define FOG_EXP2' : '',
        e.alphaToCoverage ? '#define ALPHA_TO_COVERAGE' : '',
        e.map ? '#define USE_MAP' : '',
        e.matcap ? '#define USE_MATCAP' : '',
        e.envMap ? '#define USE_ENVMAP' : '',
        e.envMap ? '#define ' + l : '',
        e.envMap ? '#define ' + u : '',
        e.envMap ? '#define ' + p : '',
        h ? '#define CUBEUV_TEXEL_WIDTH ' + h.texelWidth : '',
        h ? '#define CUBEUV_TEXEL_HEIGHT ' + h.texelHeight : '',
        h ? '#define CUBEUV_MAX_MIP ' + h.maxMip + '.0' : '',
        e.lightMap ? '#define USE_LIGHTMAP' : '',
        e.aoMap ? '#define USE_AOMAP' : '',
        e.bumpMap ? '#define USE_BUMPMAP' : '',
        e.normalMap ? '#define USE_NORMALMAP' : '',
        e.normalMapObjectSpace ? '#define USE_NORMALMAP_OBJECTSPACE' : '',
        e.normalMapTangentSpace ? '#define USE_NORMALMAP_TANGENTSPACE' : '',
        e.packedNormalMap ? '#define USE_PACKED_NORMALMAP' : '',
        e.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
        e.anisotropy ? '#define USE_ANISOTROPY' : '',
        e.anisotropyMap ? '#define USE_ANISOTROPYMAP' : '',
        e.clearcoat ? '#define USE_CLEARCOAT' : '',
        e.clearcoatMap ? '#define USE_CLEARCOATMAP' : '',
        e.clearcoatRoughnessMap ? '#define USE_CLEARCOAT_ROUGHNESSMAP' : '',
        e.clearcoatNormalMap ? '#define USE_CLEARCOAT_NORMALMAP' : '',
        e.dispersion ? '#define USE_DISPERSION' : '',
        e.iridescence ? '#define USE_IRIDESCENCE' : '',
        e.iridescenceMap ? '#define USE_IRIDESCENCEMAP' : '',
        e.iridescenceThicknessMap ? '#define USE_IRIDESCENCE_THICKNESSMAP' : '',
        e.specularMap ? '#define USE_SPECULARMAP' : '',
        e.specularColorMap ? '#define USE_SPECULAR_COLORMAP' : '',
        e.specularIntensityMap ? '#define USE_SPECULAR_INTENSITYMAP' : '',
        e.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
        e.metalnessMap ? '#define USE_METALNESSMAP' : '',
        e.alphaMap ? '#define USE_ALPHAMAP' : '',
        e.alphaTest ? '#define USE_ALPHATEST' : '',
        e.alphaHash ? '#define USE_ALPHAHASH' : '',
        e.sheen ? '#define USE_SHEEN' : '',
        e.sheenColorMap ? '#define USE_SHEEN_COLORMAP' : '',
        e.sheenRoughnessMap ? '#define USE_SHEEN_ROUGHNESSMAP' : '',
        e.transmission ? '#define USE_TRANSMISSION' : '',
        e.transmissionMap ? '#define USE_TRANSMISSIONMAP' : '',
        e.thicknessMap ? '#define USE_THICKNESSMAP' : '',
        e.vertexTangents && e.flatShading === !1 ? '#define USE_TANGENT' : '',
        e.vertexColors || e.instancingColor ? '#define USE_COLOR' : '',
        e.vertexAlphas || e.batchingColor ? '#define USE_COLOR_ALPHA' : '',
        e.vertexUv1s ? '#define USE_UV1' : '',
        e.vertexUv2s ? '#define USE_UV2' : '',
        e.vertexUv3s ? '#define USE_UV3' : '',
        e.pointsUvs ? '#define USE_POINTS_UV' : '',
        e.gradientMap ? '#define USE_GRADIENTMAP' : '',
        e.flatShading ? '#define FLAT_SHADED' : '',
        e.doubleSided ? '#define DOUBLE_SIDED' : '',
        e.flipSided ? '#define FLIP_SIDED' : '',
        e.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
        e.shadowMapEnabled ? '#define ' + c : '',
        e.premultipliedAlpha ? '#define PREMULTIPLIED_ALPHA' : '',
        e.numLightProbes > 0 ? '#define USE_LIGHT_PROBES' : '',
        e.numLightProbeGrids > 0 ? '#define USE_LIGHT_PROBES_GRID' : '',
        e.decodeVideoTexture ? '#define DECODE_VIDEO_TEXTURE' : '',
        e.decodeVideoTextureEmissive
          ? '#define DECODE_VIDEO_TEXTURE_EMISSIVE'
          : '',
        e.logarithmicDepthBuffer ? '#define USE_LOGARITHMIC_DEPTH_BUFFER' : '',
        e.reversedDepthBuffer ? '#define USE_REVERSED_DEPTH_BUFFER' : '',
        'uniform mat4 viewMatrix;',
        'uniform vec3 cameraPosition;',
        'uniform bool isOrthographic;',
        e.toneMapping !== wn ? '#define TONE_MAPPING' : '',
        e.toneMapping !== wn ? Vt.tonemapping_pars_fragment : '',
        e.toneMapping !== wn ? M0('toneMapping', e.toneMapping) : '',
        e.dithering ? '#define DITHERING' : '',
        e.opaque ? '#define OPAQUE' : '',
        Vt.colorspace_pars_fragment,
        x0('linearToOutputTexel', e.outputColorSpace),
        S0(),
        e.useDepthPacking ? '#define DEPTH_PACKING ' + e.depthPacking : '',
        `
`,
      ].filter(hs).join(`
`))),
    (a = uo(a)),
    (a = nc(a, e)),
    (a = ic(a, e)),
    (o = uo(o)),
    (o = nc(o, e)),
    (o = ic(o, e)),
    (a = sc(a)),
    (o = sc(o)),
    e.isRawShaderMaterial !== !0 &&
      ((M = `#version 300 es
`),
      (f =
        [
          m,
          '#define attribute in',
          '#define varying out',
          '#define texture2D texture',
        ].join(`
`) +
        `
` +
        f),
      (d =
        [
          '#define varying in',
          e.glslVersion === ll
            ? ''
            : 'layout(location = 0) out highp vec4 pc_fragColor;',
          e.glslVersion === ll ? '' : '#define gl_FragColor pc_fragColor',
          '#define gl_FragDepthEXT gl_FragDepth',
          '#define texture2D texture',
          '#define textureCube texture',
          '#define texture2DProj textureProj',
          '#define texture2DLodEXT textureLod',
          '#define texture2DProjLodEXT textureProjLod',
          '#define textureCubeLodEXT textureLod',
          '#define texture2DGradEXT textureGrad',
          '#define texture2DProjGradEXT textureProjGrad',
          '#define textureCubeGradEXT textureGrad',
        ].join(`
`) +
        `
` +
        d)))
  const T = M + f + a,
    w = M + d + o,
    C = Ql(s, s.VERTEX_SHADER, T),
    A = Ql(s, s.FRAGMENT_SHADER, w)
  ;(s.attachShader(v, C),
    s.attachShader(v, A),
    e.index0AttributeName !== void 0
      ? s.bindAttribLocation(v, 0, e.index0AttributeName)
      : e.morphTargets === !0 && s.bindAttribLocation(v, 0, 'position'),
    s.linkProgram(v))
  function y(R) {
    if (n.debug.checkShaderErrors) {
      const N = s.getProgramInfoLog(v) || '',
        V = s.getShaderInfoLog(C) || '',
        W = s.getShaderInfoLog(A) || '',
        I = N.trim(),
        G = V.trim(),
        O = W.trim()
      let J = !0,
        et = !0
      if (s.getProgramParameter(v, s.LINK_STATUS) === !1)
        if (((J = !1), typeof n.debug.onShaderError == 'function'))
          n.debug.onShaderError(s, v, C, A)
        else {
          const dt = ec(s, C, 'vertex'),
            Tt = ec(s, A, 'fragment')
          Zt(
            'THREE.WebGLProgram: Shader Error ' +
              s.getError() +
              ' - VALIDATE_STATUS ' +
              s.getProgramParameter(v, s.VALIDATE_STATUS) +
              `

Material Name: ` +
              R.name +
              `
Material Type: ` +
              R.type +
              `

Program Info Log: ` +
              I +
              `
` +
              dt +
              `
` +
              Tt
          )
        }
      else
        I !== ''
          ? Dt('WebGLProgram: Program Info Log:', I)
          : (G === '' || O === '') && (et = !1)
      et &&
        (R.diagnostics = {
          runnable: J,
          programLog: I,
          vertexShader: { log: G, prefix: f },
          fragmentShader: { log: O, prefix: d },
        })
    }
    ;(s.deleteShader(C), s.deleteShader(A), (_ = new sr(s, v)), (b = E0(s, v)))
  }
  let _
  this.getUniforms = function () {
    return (_ === void 0 && y(this), _)
  }
  let b
  this.getAttributes = function () {
    return (b === void 0 && y(this), b)
  }
  let P = e.rendererExtensionParallelShaderCompile === !1
  return (
    (this.isReady = function () {
      return (P === !1 && (P = s.getProgramParameter(v, p0)), P)
    }),
    (this.destroy = function () {
      ;(i.releaseStatesOfProgram(this),
        s.deleteProgram(v),
        (this.program = void 0))
    }),
    (this.type = e.shaderType),
    (this.name = e.shaderName),
    (this.id = m0++),
    (this.cacheKey = t),
    (this.usedTimes = 1),
    (this.program = v),
    (this.vertexShader = C),
    (this.fragmentShader = A),
    this
  )
}
let k0 = 0
class G0 {
  constructor() {
    ;((this.shaderCache = new Map()), (this.materialCache = new Map()))
  }
  update(t) {
    const e = t.vertexShader,
      i = t.fragmentShader,
      s = this._getShaderStage(e),
      r = this._getShaderStage(i),
      a = this._getShaderCacheForMaterial(t)
    return (
      a.has(s) === !1 && (a.add(s), s.usedTimes++),
      a.has(r) === !1 && (a.add(r), r.usedTimes++),
      this
    )
  }
  remove(t) {
    const e = this.materialCache.get(t)
    for (const i of e)
      (i.usedTimes--, i.usedTimes === 0 && this.shaderCache.delete(i.code))
    return (this.materialCache.delete(t), this)
  }
  getVertexShaderID(t) {
    return this._getShaderStage(t.vertexShader).id
  }
  getFragmentShaderID(t) {
    return this._getShaderStage(t.fragmentShader).id
  }
  dispose() {
    ;(this.shaderCache.clear(), this.materialCache.clear())
  }
  _getShaderCacheForMaterial(t) {
    const e = this.materialCache
    let i = e.get(t)
    return (i === void 0 && ((i = new Set()), e.set(t, i)), i)
  }
  _getShaderStage(t) {
    const e = this.shaderCache
    let i = e.get(t)
    return (i === void 0 && ((i = new H0(t)), e.set(t, i)), i)
  }
}
class H0 {
  constructor(t) {
    ;((this.id = k0++), (this.code = t), (this.usedTimes = 0))
  }
}
function V0(n) {
  return n === Mi || n === cr || n === hr
}
function W0(n, t, e, i, s, r) {
  const a = new Lo(),
    o = new G0(),
    c = new Set(),
    l = [],
    u = new Map(),
    p = i.logarithmicDepthBuffer
  let h = i.precision
  const m = {
    MeshDepthMaterial: 'depth',
    MeshDistanceMaterial: 'distance',
    MeshNormalMaterial: 'normal',
    MeshBasicMaterial: 'basic',
    MeshLambertMaterial: 'lambert',
    MeshPhongMaterial: 'phong',
    MeshToonMaterial: 'toon',
    MeshStandardMaterial: 'physical',
    MeshPhysicalMaterial: 'physical',
    MeshMatcapMaterial: 'matcap',
    LineBasicMaterial: 'basic',
    LineDashedMaterial: 'dashed',
    PointsMaterial: 'points',
    ShadowMaterial: 'shadow',
    SpriteMaterial: 'sprite',
  }
  function g(_) {
    return (c.add(_), _ === 0 ? 'uv' : `uv${_}`)
  }
  function v(_, b, P, R, N, V) {
    const W = R.fog,
      I = N.geometry,
      G =
        _.isMeshStandardMaterial ||
        _.isMeshLambertMaterial ||
        _.isMeshPhongMaterial
          ? R.environment
          : null,
      O =
        _.isMeshStandardMaterial ||
        (_.isMeshLambertMaterial && !_.envMap) ||
        (_.isMeshPhongMaterial && !_.envMap),
      J = t.get(_.envMap || G, O),
      et = J && J.mapping === Mr ? J.image.height : null,
      dt = m[_.type]
    _.precision !== null &&
      ((h = i.getMaxPrecision(_.precision)),
      h !== _.precision &&
        Dt(
          'WebGLProgram.getParameters:',
          _.precision,
          'not supported, using',
          h,
          'instead.'
        ))
    const Tt =
        I.morphAttributes.position ||
        I.morphAttributes.normal ||
        I.morphAttributes.color,
      Rt = Tt !== void 0 ? Tt.length : 0
    let nt = 0
    ;(I.morphAttributes.position !== void 0 && (nt = 1),
      I.morphAttributes.normal !== void 0 && (nt = 2),
      I.morphAttributes.color !== void 0 && (nt = 3))
    let vt, _t, X, mt
    if (dt) {
      const kt = En[dt]
      ;((vt = kt.vertexShader), (_t = kt.fragmentShader))
    } else
      ((vt = _.vertexShader),
        (_t = _.fragmentShader),
        o.update(_),
        (X = o.getVertexShaderID(_)),
        (mt = o.getFragmentShaderID(_)))
    const at = n.getRenderTarget(),
      It = n.state.buffers.depth.getReversed(),
      Bt = N.isInstancedMesh === !0,
      Ut = N.isBatchedMesh === !0,
      pe = !!_.map,
      jt = !!_.matcap,
      se = !!J,
      fe = !!_.aoMap,
      Yt = !!_.lightMap,
      we = !!_.bumpMap,
      me = !!_.normalMap,
      Je = !!_.displacementMap,
      U = !!_.emissiveMap,
      Ae = !!_.metalnessMap,
      Kt = !!_.roughnessMap,
      ue = _.anisotropy > 0,
      ft = _.clearcoat > 0,
      ge = _.dispersion > 0,
      E = _.iridescence > 0,
      x = _.sheen > 0,
      B = _.transmission > 0,
      j = ue && !!_.anisotropyMap,
      tt = ft && !!_.clearcoatMap,
      it = ft && !!_.clearcoatNormalMap,
      ct = ft && !!_.clearcoatRoughnessMap,
      q = E && !!_.iridescenceMap,
      K = E && !!_.iridescenceThicknessMap,
      Mt = x && !!_.sheenColorMap,
      bt = x && !!_.sheenRoughnessMap,
      ot = !!_.specularMap,
      st = !!_.specularColorMap,
      Ft = !!_.specularIntensityMap,
      Ht = B && !!_.transmissionMap,
      ee = B && !!_.thicknessMap,
      L = !!_.gradientMap,
      rt = !!_.alphaMap,
      Y = _.alphaTest > 0,
      St = !!_.alphaHash,
      lt = !!_.extensions
    let Q = wn
    _.toneMapped &&
      (at === null || at.isXRRenderTarget === !0) &&
      (Q = n.toneMapping)
    const Ct = {
      shaderID: dt,
      shaderType: _.type,
      shaderName: _.name,
      vertexShader: vt,
      fragmentShader: _t,
      defines: _.defines,
      customVertexShaderID: X,
      customFragmentShaderID: mt,
      isRawShaderMaterial: _.isRawShaderMaterial === !0,
      glslVersion: _.glslVersion,
      precision: h,
      batching: Ut,
      batchingColor: Ut && N._colorsTexture !== null,
      instancing: Bt,
      instancingColor: Bt && N.instanceColor !== null,
      instancingMorph: Bt && N.morphTexture !== null,
      outputColorSpace:
        at === null
          ? n.outputColorSpace
          : at.isXRRenderTarget === !0
            ? at.texture.colorSpace
            : $t.workingColorSpace,
      alphaToCoverage: !!_.alphaToCoverage,
      map: pe,
      matcap: jt,
      envMap: se,
      envMapMode: se && J.mapping,
      envMapCubeUVHeight: et,
      aoMap: fe,
      lightMap: Yt,
      bumpMap: we,
      normalMap: me,
      displacementMap: Je,
      emissiveMap: U,
      normalMapObjectSpace: me && _.normalMapType === su,
      normalMapTangentSpace: me && _.normalMapType === ur,
      packedNormalMap: me && _.normalMapType === ur && V0(_.normalMap.format),
      metalnessMap: Ae,
      roughnessMap: Kt,
      anisotropy: ue,
      anisotropyMap: j,
      clearcoat: ft,
      clearcoatMap: tt,
      clearcoatNormalMap: it,
      clearcoatRoughnessMap: ct,
      dispersion: ge,
      iridescence: E,
      iridescenceMap: q,
      iridescenceThicknessMap: K,
      sheen: x,
      sheenColorMap: Mt,
      sheenRoughnessMap: bt,
      specularMap: ot,
      specularColorMap: st,
      specularIntensityMap: Ft,
      transmission: B,
      transmissionMap: Ht,
      thicknessMap: ee,
      gradientMap: L,
      opaque:
        _.transparent === !1 && _.blending === Vi && _.alphaToCoverage === !1,
      alphaMap: rt,
      alphaTest: Y,
      alphaHash: St,
      combine: _.combine,
      mapUv: pe && g(_.map.channel),
      aoMapUv: fe && g(_.aoMap.channel),
      lightMapUv: Yt && g(_.lightMap.channel),
      bumpMapUv: we && g(_.bumpMap.channel),
      normalMapUv: me && g(_.normalMap.channel),
      displacementMapUv: Je && g(_.displacementMap.channel),
      emissiveMapUv: U && g(_.emissiveMap.channel),
      metalnessMapUv: Ae && g(_.metalnessMap.channel),
      roughnessMapUv: Kt && g(_.roughnessMap.channel),
      anisotropyMapUv: j && g(_.anisotropyMap.channel),
      clearcoatMapUv: tt && g(_.clearcoatMap.channel),
      clearcoatNormalMapUv: it && g(_.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: ct && g(_.clearcoatRoughnessMap.channel),
      iridescenceMapUv: q && g(_.iridescenceMap.channel),
      iridescenceThicknessMapUv: K && g(_.iridescenceThicknessMap.channel),
      sheenColorMapUv: Mt && g(_.sheenColorMap.channel),
      sheenRoughnessMapUv: bt && g(_.sheenRoughnessMap.channel),
      specularMapUv: ot && g(_.specularMap.channel),
      specularColorMapUv: st && g(_.specularColorMap.channel),
      specularIntensityMapUv: Ft && g(_.specularIntensityMap.channel),
      transmissionMapUv: Ht && g(_.transmissionMap.channel),
      thicknessMapUv: ee && g(_.thicknessMap.channel),
      alphaMapUv: rt && g(_.alphaMap.channel),
      vertexTangents: !!I.attributes.tangent && (me || ue),
      vertexNormals: !!I.attributes.normal,
      vertexColors: _.vertexColors,
      vertexAlphas:
        _.vertexColors === !0 &&
        !!I.attributes.color &&
        I.attributes.color.itemSize === 4,
      pointsUvs: N.isPoints === !0 && !!I.attributes.uv && (pe || rt),
      fog: !!W,
      useFog: _.fog === !0,
      fogExp2: !!W && W.isFogExp2,
      flatShading:
        _.wireframe === !1 &&
        (_.flatShading === !0 ||
          (I.attributes.normal === void 0 &&
            me === !1 &&
            (_.isMeshLambertMaterial ||
              _.isMeshPhongMaterial ||
              _.isMeshStandardMaterial ||
              _.isMeshPhysicalMaterial))),
      sizeAttenuation: _.sizeAttenuation === !0,
      logarithmicDepthBuffer: p,
      reversedDepthBuffer: It,
      skinning: N.isSkinnedMesh === !0,
      morphTargets: I.morphAttributes.position !== void 0,
      morphNormals: I.morphAttributes.normal !== void 0,
      morphColors: I.morphAttributes.color !== void 0,
      morphTargetsCount: Rt,
      morphTextureStride: nt,
      numDirLights: b.directional.length,
      numPointLights: b.point.length,
      numSpotLights: b.spot.length,
      numSpotLightMaps: b.spotLightMap.length,
      numRectAreaLights: b.rectArea.length,
      numHemiLights: b.hemi.length,
      numDirLightShadows: b.directionalShadowMap.length,
      numPointLightShadows: b.pointShadowMap.length,
      numSpotLightShadows: b.spotShadowMap.length,
      numSpotLightShadowsWithMaps: b.numSpotLightShadowsWithMaps,
      numLightProbes: b.numLightProbes,
      numLightProbeGrids: V.length,
      numClippingPlanes: r.numPlanes,
      numClipIntersection: r.numIntersection,
      dithering: _.dithering,
      shadowMapEnabled: n.shadowMap.enabled && P.length > 0,
      shadowMapType: n.shadowMap.type,
      toneMapping: Q,
      decodeVideoTexture:
        pe &&
        _.map.isVideoTexture === !0 &&
        $t.getTransfer(_.map.colorSpace) === ne,
      decodeVideoTextureEmissive:
        U &&
        _.emissiveMap.isVideoTexture === !0 &&
        $t.getTransfer(_.emissiveMap.colorSpace) === ne,
      premultipliedAlpha: _.premultipliedAlpha,
      doubleSided: _.side === On,
      flipSided: _.side === qe,
      useDepthPacking: _.depthPacking >= 0,
      depthPacking: _.depthPacking || 0,
      index0AttributeName: _.index0AttributeName,
      extensionClipCullDistance:
        lt &&
        _.extensions.clipCullDistance === !0 &&
        e.has('WEBGL_clip_cull_distance'),
      extensionMultiDraw:
        ((lt && _.extensions.multiDraw === !0) || Ut) &&
        e.has('WEBGL_multi_draw'),
      rendererExtensionParallelShaderCompile: e.has(
        'KHR_parallel_shader_compile'
      ),
      customProgramCacheKey: _.customProgramCacheKey(),
    }
    return (
      (Ct.vertexUv1s = c.has(1)),
      (Ct.vertexUv2s = c.has(2)),
      (Ct.vertexUv3s = c.has(3)),
      c.clear(),
      Ct
    )
  }
  function f(_) {
    const b = []
    if (
      (_.shaderID
        ? b.push(_.shaderID)
        : (b.push(_.customVertexShaderID), b.push(_.customFragmentShaderID)),
      _.defines !== void 0)
    )
      for (const P in _.defines) (b.push(P), b.push(_.defines[P]))
    return (
      _.isRawShaderMaterial === !1 &&
        (d(b, _), M(b, _), b.push(n.outputColorSpace)),
      b.push(_.customProgramCacheKey),
      b.join()
    )
  }
  function d(_, b) {
    ;(_.push(b.precision),
      _.push(b.outputColorSpace),
      _.push(b.envMapMode),
      _.push(b.envMapCubeUVHeight),
      _.push(b.mapUv),
      _.push(b.alphaMapUv),
      _.push(b.lightMapUv),
      _.push(b.aoMapUv),
      _.push(b.bumpMapUv),
      _.push(b.normalMapUv),
      _.push(b.displacementMapUv),
      _.push(b.emissiveMapUv),
      _.push(b.metalnessMapUv),
      _.push(b.roughnessMapUv),
      _.push(b.anisotropyMapUv),
      _.push(b.clearcoatMapUv),
      _.push(b.clearcoatNormalMapUv),
      _.push(b.clearcoatRoughnessMapUv),
      _.push(b.iridescenceMapUv),
      _.push(b.iridescenceThicknessMapUv),
      _.push(b.sheenColorMapUv),
      _.push(b.sheenRoughnessMapUv),
      _.push(b.specularMapUv),
      _.push(b.specularColorMapUv),
      _.push(b.specularIntensityMapUv),
      _.push(b.transmissionMapUv),
      _.push(b.thicknessMapUv),
      _.push(b.combine),
      _.push(b.fogExp2),
      _.push(b.sizeAttenuation),
      _.push(b.morphTargetsCount),
      _.push(b.morphAttributeCount),
      _.push(b.numDirLights),
      _.push(b.numPointLights),
      _.push(b.numSpotLights),
      _.push(b.numSpotLightMaps),
      _.push(b.numHemiLights),
      _.push(b.numRectAreaLights),
      _.push(b.numDirLightShadows),
      _.push(b.numPointLightShadows),
      _.push(b.numSpotLightShadows),
      _.push(b.numSpotLightShadowsWithMaps),
      _.push(b.numLightProbes),
      _.push(b.shadowMapType),
      _.push(b.toneMapping),
      _.push(b.numClippingPlanes),
      _.push(b.numClipIntersection),
      _.push(b.depthPacking))
  }
  function M(_, b) {
    ;(a.disableAll(),
      b.instancing && a.enable(0),
      b.instancingColor && a.enable(1),
      b.instancingMorph && a.enable(2),
      b.matcap && a.enable(3),
      b.envMap && a.enable(4),
      b.normalMapObjectSpace && a.enable(5),
      b.normalMapTangentSpace && a.enable(6),
      b.clearcoat && a.enable(7),
      b.iridescence && a.enable(8),
      b.alphaTest && a.enable(9),
      b.vertexColors && a.enable(10),
      b.vertexAlphas && a.enable(11),
      b.vertexUv1s && a.enable(12),
      b.vertexUv2s && a.enable(13),
      b.vertexUv3s && a.enable(14),
      b.vertexTangents && a.enable(15),
      b.anisotropy && a.enable(16),
      b.alphaHash && a.enable(17),
      b.batching && a.enable(18),
      b.dispersion && a.enable(19),
      b.batchingColor && a.enable(20),
      b.gradientMap && a.enable(21),
      b.packedNormalMap && a.enable(22),
      b.vertexNormals && a.enable(23),
      _.push(a.mask),
      a.disableAll(),
      b.fog && a.enable(0),
      b.useFog && a.enable(1),
      b.flatShading && a.enable(2),
      b.logarithmicDepthBuffer && a.enable(3),
      b.reversedDepthBuffer && a.enable(4),
      b.skinning && a.enable(5),
      b.morphTargets && a.enable(6),
      b.morphNormals && a.enable(7),
      b.morphColors && a.enable(8),
      b.premultipliedAlpha && a.enable(9),
      b.shadowMapEnabled && a.enable(10),
      b.doubleSided && a.enable(11),
      b.flipSided && a.enable(12),
      b.useDepthPacking && a.enable(13),
      b.dithering && a.enable(14),
      b.transmission && a.enable(15),
      b.sheen && a.enable(16),
      b.opaque && a.enable(17),
      b.pointsUvs && a.enable(18),
      b.decodeVideoTexture && a.enable(19),
      b.decodeVideoTextureEmissive && a.enable(20),
      b.alphaToCoverage && a.enable(21),
      b.numLightProbeGrids > 0 && a.enable(22),
      _.push(a.mask))
  }
  function T(_) {
    const b = m[_.type]
    let P
    if (b) {
      const R = En[b]
      P = rd.clone(R.uniforms)
    } else P = _.uniforms
    return P
  }
  function w(_, b) {
    let P = u.get(b)
    return (
      P !== void 0
        ? ++P.usedTimes
        : ((P = new z0(n, b, _, s)), l.push(P), u.set(b, P)),
      P
    )
  }
  function C(_) {
    if (--_.usedTimes === 0) {
      const b = l.indexOf(_)
      ;((l[b] = l[l.length - 1]), l.pop(), u.delete(_.cacheKey), _.destroy())
    }
  }
  function A(_) {
    o.remove(_)
  }
  function y() {
    o.dispose()
  }
  return {
    getParameters: v,
    getProgramCacheKey: f,
    getUniforms: T,
    acquireProgram: w,
    releaseProgram: C,
    releaseShaderCache: A,
    programs: l,
    dispose: y,
  }
}
function X0() {
  let n = new WeakMap()
  function t(a) {
    return n.has(a)
  }
  function e(a) {
    let o = n.get(a)
    return (o === void 0 && ((o = {}), n.set(a, o)), o)
  }
  function i(a) {
    n.delete(a)
  }
  function s(a, o, c) {
    n.get(a)[o] = c
  }
  function r() {
    n = new WeakMap()
  }
  return { has: t, get: e, remove: i, update: s, dispose: r }
}
function q0(n, t) {
  return n.groupOrder !== t.groupOrder
    ? n.groupOrder - t.groupOrder
    : n.renderOrder !== t.renderOrder
      ? n.renderOrder - t.renderOrder
      : n.material.id !== t.material.id
        ? n.material.id - t.material.id
        : n.materialVariant !== t.materialVariant
          ? n.materialVariant - t.materialVariant
          : n.z !== t.z
            ? n.z - t.z
            : n.id - t.id
}
function ac(n, t) {
  return n.groupOrder !== t.groupOrder
    ? n.groupOrder - t.groupOrder
    : n.renderOrder !== t.renderOrder
      ? n.renderOrder - t.renderOrder
      : n.z !== t.z
        ? t.z - n.z
        : n.id - t.id
}
function oc() {
  const n = []
  let t = 0
  const e = [],
    i = [],
    s = []
  function r() {
    ;((t = 0), (e.length = 0), (i.length = 0), (s.length = 0))
  }
  function a(h) {
    let m = 0
    return (h.isInstancedMesh && (m += 2), h.isSkinnedMesh && (m += 1), m)
  }
  function o(h, m, g, v, f, d) {
    let M = n[t]
    return (
      M === void 0
        ? ((M = {
            id: h.id,
            object: h,
            geometry: m,
            material: g,
            materialVariant: a(h),
            groupOrder: v,
            renderOrder: h.renderOrder,
            z: f,
            group: d,
          }),
          (n[t] = M))
        : ((M.id = h.id),
          (M.object = h),
          (M.geometry = m),
          (M.material = g),
          (M.materialVariant = a(h)),
          (M.groupOrder = v),
          (M.renderOrder = h.renderOrder),
          (M.z = f),
          (M.group = d)),
      t++,
      M
    )
  }
  function c(h, m, g, v, f, d) {
    const M = o(h, m, g, v, f, d)
    g.transmission > 0
      ? i.push(M)
      : g.transparent === !0
        ? s.push(M)
        : e.push(M)
  }
  function l(h, m, g, v, f, d) {
    const M = o(h, m, g, v, f, d)
    g.transmission > 0
      ? i.unshift(M)
      : g.transparent === !0
        ? s.unshift(M)
        : e.unshift(M)
  }
  function u(h, m) {
    ;(e.length > 1 && e.sort(h || q0),
      i.length > 1 && i.sort(m || ac),
      s.length > 1 && s.sort(m || ac))
  }
  function p() {
    for (let h = t, m = n.length; h < m; h++) {
      const g = n[h]
      if (g.id === null) break
      ;((g.id = null),
        (g.object = null),
        (g.geometry = null),
        (g.material = null),
        (g.group = null))
    }
  }
  return {
    opaque: e,
    transmissive: i,
    transparent: s,
    init: r,
    push: c,
    unshift: l,
    finish: p,
    sort: u,
  }
}
function Y0() {
  let n = new WeakMap()
  function t(i, s) {
    const r = n.get(i)
    let a
    return (
      r === void 0
        ? ((a = new oc()), n.set(i, [a]))
        : s >= r.length
          ? ((a = new oc()), r.push(a))
          : (a = r[s]),
      a
    )
  }
  function e() {
    n = new WeakMap()
  }
  return { get: t, dispose: e }
}
function j0() {
  const n = {}
  return {
    get: function (t) {
      if (n[t.id] !== void 0) return n[t.id]
      let e
      switch (t.type) {
        case 'DirectionalLight':
          e = { direction: new D(), color: new Ot() }
          break
        case 'SpotLight':
          e = {
            position: new D(),
            direction: new D(),
            color: new Ot(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0,
          }
          break
        case 'PointLight':
          e = { position: new D(), color: new Ot(), distance: 0, decay: 0 }
          break
        case 'HemisphereLight':
          e = { direction: new D(), skyColor: new Ot(), groundColor: new Ot() }
          break
        case 'RectAreaLight':
          e = {
            color: new Ot(),
            position: new D(),
            halfWidth: new D(),
            halfHeight: new D(),
          }
          break
      }
      return ((n[t.id] = e), e)
    },
  }
}
function K0() {
  const n = {}
  return {
    get: function (t) {
      if (n[t.id] !== void 0) return n[t.id]
      let e
      switch (t.type) {
        case 'DirectionalLight':
          e = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Nt(),
          }
          break
        case 'SpotLight':
          e = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Nt(),
          }
          break
        case 'PointLight':
          e = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Nt(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3,
          }
          break
      }
      return ((n[t.id] = e), e)
    },
  }
}
let $0 = 0
function Z0(n, t) {
  return (
    (t.castShadow ? 2 : 0) -
    (n.castShadow ? 2 : 0) +
    (t.map ? 1 : 0) -
    (n.map ? 1 : 0)
  )
}
function J0(n) {
  const t = new j0(),
    e = K0(),
    i = {
      version: 0,
      hash: {
        directionalLength: -1,
        pointLength: -1,
        spotLength: -1,
        rectAreaLength: -1,
        hemiLength: -1,
        numDirectionalShadows: -1,
        numPointShadows: -1,
        numSpotShadows: -1,
        numSpotMaps: -1,
        numLightProbes: -1,
      },
      ambient: [0, 0, 0],
      probe: [],
      directional: [],
      directionalShadow: [],
      directionalShadowMap: [],
      directionalShadowMatrix: [],
      spot: [],
      spotLightMap: [],
      spotShadow: [],
      spotShadowMap: [],
      spotLightMatrix: [],
      rectArea: [],
      rectAreaLTC1: null,
      rectAreaLTC2: null,
      point: [],
      pointShadow: [],
      pointShadowMap: [],
      pointShadowMatrix: [],
      hemi: [],
      numSpotLightShadowsWithMaps: 0,
      numLightProbes: 0,
    }
  for (let l = 0; l < 9; l++) i.probe.push(new D())
  const s = new D(),
    r = new le(),
    a = new le()
  function o(l) {
    let u = 0,
      p = 0,
      h = 0
    for (let b = 0; b < 9; b++) i.probe[b].set(0, 0, 0)
    let m = 0,
      g = 0,
      v = 0,
      f = 0,
      d = 0,
      M = 0,
      T = 0,
      w = 0,
      C = 0,
      A = 0,
      y = 0
    l.sort(Z0)
    for (let b = 0, P = l.length; b < P; b++) {
      const R = l[b],
        N = R.color,
        V = R.intensity,
        W = R.distance
      let I = null
      if (
        (R.shadow &&
          R.shadow.map &&
          (R.shadow.map.texture.format === Mi
            ? (I = R.shadow.map.texture)
            : (I = R.shadow.map.depthTexture || R.shadow.map.texture)),
        R.isAmbientLight)
      )
        ((u += N.r * V), (p += N.g * V), (h += N.b * V))
      else if (R.isLightProbe) {
        for (let G = 0; G < 9; G++)
          i.probe[G].addScaledVector(R.sh.coefficients[G], V)
        y++
      } else if (R.isDirectionalLight) {
        const G = t.get(R)
        if ((G.color.copy(R.color).multiplyScalar(R.intensity), R.castShadow)) {
          const O = R.shadow,
            J = e.get(R)
          ;((J.shadowIntensity = O.intensity),
            (J.shadowBias = O.bias),
            (J.shadowNormalBias = O.normalBias),
            (J.shadowRadius = O.radius),
            (J.shadowMapSize = O.mapSize),
            (i.directionalShadow[m] = J),
            (i.directionalShadowMap[m] = I),
            (i.directionalShadowMatrix[m] = R.shadow.matrix),
            M++)
        }
        ;((i.directional[m] = G), m++)
      } else if (R.isSpotLight) {
        const G = t.get(R)
        ;(G.position.setFromMatrixPosition(R.matrixWorld),
          G.color.copy(N).multiplyScalar(V),
          (G.distance = W),
          (G.coneCos = Math.cos(R.angle)),
          (G.penumbraCos = Math.cos(R.angle * (1 - R.penumbra))),
          (G.decay = R.decay),
          (i.spot[v] = G))
        const O = R.shadow
        if (
          (R.map &&
            ((i.spotLightMap[C] = R.map),
            C++,
            O.updateMatrices(R),
            R.castShadow && A++),
          (i.spotLightMatrix[v] = O.matrix),
          R.castShadow)
        ) {
          const J = e.get(R)
          ;((J.shadowIntensity = O.intensity),
            (J.shadowBias = O.bias),
            (J.shadowNormalBias = O.normalBias),
            (J.shadowRadius = O.radius),
            (J.shadowMapSize = O.mapSize),
            (i.spotShadow[v] = J),
            (i.spotShadowMap[v] = I),
            w++)
        }
        v++
      } else if (R.isRectAreaLight) {
        const G = t.get(R)
        ;(G.color.copy(N).multiplyScalar(V),
          G.halfWidth.set(R.width * 0.5, 0, 0),
          G.halfHeight.set(0, R.height * 0.5, 0),
          (i.rectArea[f] = G),
          f++)
      } else if (R.isPointLight) {
        const G = t.get(R)
        if (
          (G.color.copy(R.color).multiplyScalar(R.intensity),
          (G.distance = R.distance),
          (G.decay = R.decay),
          R.castShadow)
        ) {
          const O = R.shadow,
            J = e.get(R)
          ;((J.shadowIntensity = O.intensity),
            (J.shadowBias = O.bias),
            (J.shadowNormalBias = O.normalBias),
            (J.shadowRadius = O.radius),
            (J.shadowMapSize = O.mapSize),
            (J.shadowCameraNear = O.camera.near),
            (J.shadowCameraFar = O.camera.far),
            (i.pointShadow[g] = J),
            (i.pointShadowMap[g] = I),
            (i.pointShadowMatrix[g] = R.shadow.matrix),
            T++)
        }
        ;((i.point[g] = G), g++)
      } else if (R.isHemisphereLight) {
        const G = t.get(R)
        ;(G.skyColor.copy(R.color).multiplyScalar(V),
          G.groundColor.copy(R.groundColor).multiplyScalar(V),
          (i.hemi[d] = G),
          d++)
      }
    }
    ;(f > 0 &&
      (n.has('OES_texture_float_linear') === !0
        ? ((i.rectAreaLTC1 = pt.LTC_FLOAT_1), (i.rectAreaLTC2 = pt.LTC_FLOAT_2))
        : ((i.rectAreaLTC1 = pt.LTC_HALF_1), (i.rectAreaLTC2 = pt.LTC_HALF_2))),
      (i.ambient[0] = u),
      (i.ambient[1] = p),
      (i.ambient[2] = h))
    const _ = i.hash
    ;(_.directionalLength !== m ||
      _.pointLength !== g ||
      _.spotLength !== v ||
      _.rectAreaLength !== f ||
      _.hemiLength !== d ||
      _.numDirectionalShadows !== M ||
      _.numPointShadows !== T ||
      _.numSpotShadows !== w ||
      _.numSpotMaps !== C ||
      _.numLightProbes !== y) &&
      ((i.directional.length = m),
      (i.spot.length = v),
      (i.rectArea.length = f),
      (i.point.length = g),
      (i.hemi.length = d),
      (i.directionalShadow.length = M),
      (i.directionalShadowMap.length = M),
      (i.pointShadow.length = T),
      (i.pointShadowMap.length = T),
      (i.spotShadow.length = w),
      (i.spotShadowMap.length = w),
      (i.directionalShadowMatrix.length = M),
      (i.pointShadowMatrix.length = T),
      (i.spotLightMatrix.length = w + C - A),
      (i.spotLightMap.length = C),
      (i.numSpotLightShadowsWithMaps = A),
      (i.numLightProbes = y),
      (_.directionalLength = m),
      (_.pointLength = g),
      (_.spotLength = v),
      (_.rectAreaLength = f),
      (_.hemiLength = d),
      (_.numDirectionalShadows = M),
      (_.numPointShadows = T),
      (_.numSpotShadows = w),
      (_.numSpotMaps = C),
      (_.numLightProbes = y),
      (i.version = $0++))
  }
  function c(l, u) {
    let p = 0,
      h = 0,
      m = 0,
      g = 0,
      v = 0
    const f = u.matrixWorldInverse
    for (let d = 0, M = l.length; d < M; d++) {
      const T = l[d]
      if (T.isDirectionalLight) {
        const w = i.directional[p]
        ;(w.direction.setFromMatrixPosition(T.matrixWorld),
          s.setFromMatrixPosition(T.target.matrixWorld),
          w.direction.sub(s),
          w.direction.transformDirection(f),
          p++)
      } else if (T.isSpotLight) {
        const w = i.spot[m]
        ;(w.position.setFromMatrixPosition(T.matrixWorld),
          w.position.applyMatrix4(f),
          w.direction.setFromMatrixPosition(T.matrixWorld),
          s.setFromMatrixPosition(T.target.matrixWorld),
          w.direction.sub(s),
          w.direction.transformDirection(f),
          m++)
      } else if (T.isRectAreaLight) {
        const w = i.rectArea[g]
        ;(w.position.setFromMatrixPosition(T.matrixWorld),
          w.position.applyMatrix4(f),
          a.identity(),
          r.copy(T.matrixWorld),
          r.premultiply(f),
          a.extractRotation(r),
          w.halfWidth.set(T.width * 0.5, 0, 0),
          w.halfHeight.set(0, T.height * 0.5, 0),
          w.halfWidth.applyMatrix4(a),
          w.halfHeight.applyMatrix4(a),
          g++)
      } else if (T.isPointLight) {
        const w = i.point[h]
        ;(w.position.setFromMatrixPosition(T.matrixWorld),
          w.position.applyMatrix4(f),
          h++)
      } else if (T.isHemisphereLight) {
        const w = i.hemi[v]
        ;(w.direction.setFromMatrixPosition(T.matrixWorld),
          w.direction.transformDirection(f),
          v++)
      }
    }
  }
  return { setup: o, setupView: c, state: i }
}
function lc(n) {
  const t = new J0(n),
    e = [],
    i = [],
    s = []
  function r(h) {
    ;((p.camera = h), (e.length = 0), (i.length = 0), (s.length = 0))
  }
  function a(h) {
    e.push(h)
  }
  function o(h) {
    i.push(h)
  }
  function c(h) {
    s.push(h)
  }
  function l() {
    t.setup(e)
  }
  function u(h) {
    t.setupView(e, h)
  }
  const p = {
    lightsArray: e,
    shadowsArray: i,
    lightProbeGridArray: s,
    camera: null,
    lights: t,
    transmissionRenderTarget: {},
    textureUnits: 0,
  }
  return {
    init: r,
    state: p,
    setupLights: l,
    setupLightsView: u,
    pushLight: a,
    pushShadow: o,
    pushLightProbeGrid: c,
  }
}
function Q0(n) {
  let t = new WeakMap()
  function e(s, r = 0) {
    const a = t.get(s)
    let o
    return (
      a === void 0
        ? ((o = new lc(n)), t.set(s, [o]))
        : r >= a.length
          ? ((o = new lc(n)), a.push(o))
          : (o = a[r]),
      o
    )
  }
  function i() {
    t = new WeakMap()
  }
  return { get: e, dispose: i }
}
const tg = `void main() {
	gl_Position = vec4( position, 1.0 );
}`,
  eg = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,
  ng = [
    new D(1, 0, 0),
    new D(-1, 0, 0),
    new D(0, 1, 0),
    new D(0, -1, 0),
    new D(0, 0, 1),
    new D(0, 0, -1),
  ],
  ig = [
    new D(0, -1, 0),
    new D(0, -1, 0),
    new D(0, 0, 1),
    new D(0, 0, -1),
    new D(0, -1, 0),
    new D(0, -1, 0),
  ],
  cc = new le(),
  os = new D(),
  ca = new D()
function sg(n, t, e) {
  let i = new Uo()
  const s = new Nt(),
    r = new Nt(),
    a = new xe(),
    o = new hd(),
    c = new ud(),
    l = {},
    u = e.maxTextureSize,
    p = { [oi]: qe, [qe]: oi, [On]: On },
    h = new Pn({
      defines: { VSM_SAMPLES: 8 },
      uniforms: {
        shadow_pass: { value: null },
        resolution: { value: new Nt() },
        radius: { value: 4 },
      },
      vertexShader: tg,
      fragmentShader: eg,
    }),
    m = h.clone()
  m.defines.HORIZONTAL_PASS = 1
  const g = new Ye()
  g.setAttribute(
    'position',
    new un(new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]), 3)
  )
  const v = new Jt(g, h),
    f = this
  ;((this.enabled = !1),
    (this.autoUpdate = !0),
    (this.needsUpdate = !1),
    (this.type = ds))
  let d = this.type
  this.render = function (A, y, _) {
    if (
      f.enabled === !1 ||
      (f.autoUpdate === !1 && f.needsUpdate === !1) ||
      A.length === 0
    )
      return
    this.type === Nh &&
      (Dt(
        'WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead.'
      ),
      (this.type = ds))
    const b = n.getRenderTarget(),
      P = n.getActiveCubeFace(),
      R = n.getActiveMipmapLevel(),
      N = n.state
    ;(N.setBlending(kn),
      N.buffers.depth.getReversed() === !0
        ? N.buffers.color.setClear(0, 0, 0, 0)
        : N.buffers.color.setClear(1, 1, 1, 1),
      N.buffers.depth.setTest(!0),
      N.setScissorTest(!1))
    const V = d !== this.type
    V &&
      y.traverse(function (W) {
        W.material &&
          (Array.isArray(W.material)
            ? W.material.forEach(I => (I.needsUpdate = !0))
            : (W.material.needsUpdate = !0))
      })
    for (let W = 0, I = A.length; W < I; W++) {
      const G = A[W],
        O = G.shadow
      if (O === void 0) {
        Dt('WebGLShadowMap:', G, 'has no shadow.')
        continue
      }
      if (O.autoUpdate === !1 && O.needsUpdate === !1) continue
      s.copy(O.mapSize)
      const J = O.getFrameExtents()
      ;(s.multiply(J),
        r.copy(O.mapSize),
        (s.x > u || s.y > u) &&
          (s.x > u &&
            ((r.x = Math.floor(u / J.x)),
            (s.x = r.x * J.x),
            (O.mapSize.x = r.x)),
          s.y > u &&
            ((r.y = Math.floor(u / J.y)),
            (s.y = r.y * J.y),
            (O.mapSize.y = r.y))))
      const et = n.state.buffers.depth.getReversed()
      if (((O.camera._reversedDepth = et), O.map === null || V === !0)) {
        if (
          (O.map !== null &&
            (O.map.depthTexture !== null &&
              (O.map.depthTexture.dispose(), (O.map.depthTexture = null)),
            O.map.dispose()),
          this.type === cs)
        ) {
          if (G.isPointLight) {
            Dt(
              'WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.'
            )
            continue
          }
          ;((O.map = new An(s.x, s.y, {
            format: Mi,
            type: Hn,
            minFilter: Ge,
            magFilter: Ge,
            generateMipmaps: !1,
          })),
            (O.map.texture.name = G.name + '.shadowMap'),
            (O.map.depthTexture = new Yi(s.x, s.y, gn)),
            (O.map.depthTexture.name = G.name + '.shadowMapDepth'),
            (O.map.depthTexture.format = Vn),
            (O.map.depthTexture.compareFunction = null),
            (O.map.depthTexture.minFilter = Fe),
            (O.map.depthTexture.magFilter = Fe))
        } else
          (G.isPointLight
            ? ((O.map = new sh(s.x)), (O.map.depthTexture = new id(s.x, Rn)))
            : ((O.map = new An(s.x, s.y)),
              (O.map.depthTexture = new Yi(s.x, s.y, Rn))),
            (O.map.depthTexture.name = G.name + '.shadowMap'),
            (O.map.depthTexture.format = Vn),
            this.type === ds
              ? ((O.map.depthTexture.compareFunction = et ? Ro : Ao),
                (O.map.depthTexture.minFilter = Ge),
                (O.map.depthTexture.magFilter = Ge))
              : ((O.map.depthTexture.compareFunction = null),
                (O.map.depthTexture.minFilter = Fe),
                (O.map.depthTexture.magFilter = Fe)))
        O.camera.updateProjectionMatrix()
      }
      const dt = O.map.isWebGLCubeRenderTarget ? 6 : 1
      for (let Tt = 0; Tt < dt; Tt++) {
        if (O.map.isWebGLCubeRenderTarget)
          (n.setRenderTarget(O.map, Tt), n.clear())
        else {
          Tt === 0 && (n.setRenderTarget(O.map), n.clear())
          const Rt = O.getViewport(Tt)
          ;(a.set(r.x * Rt.x, r.y * Rt.y, r.x * Rt.z, r.y * Rt.w),
            N.viewport(a))
        }
        if (G.isPointLight) {
          const Rt = O.camera,
            nt = O.matrix,
            vt = G.distance || Rt.far
          ;(vt !== Rt.far && ((Rt.far = vt), Rt.updateProjectionMatrix()),
            os.setFromMatrixPosition(G.matrixWorld),
            Rt.position.copy(os),
            ca.copy(Rt.position),
            ca.add(ng[Tt]),
            Rt.up.copy(ig[Tt]),
            Rt.lookAt(ca),
            Rt.updateMatrixWorld(),
            nt.makeTranslation(-os.x, -os.y, -os.z),
            cc.multiplyMatrices(Rt.projectionMatrix, Rt.matrixWorldInverse),
            O._frustum.setFromProjectionMatrix(
              cc,
              Rt.coordinateSystem,
              Rt.reversedDepth
            ))
        } else O.updateMatrices(G)
        ;((i = O.getFrustum()), w(y, _, O.camera, G, this.type))
      }
      ;(O.isPointLightShadow !== !0 && this.type === cs && M(O, _),
        (O.needsUpdate = !1))
    }
    ;((d = this.type), (f.needsUpdate = !1), n.setRenderTarget(b, P, R))
  }
  function M(A, y) {
    const _ = t.update(v)
    ;(h.defines.VSM_SAMPLES !== A.blurSamples &&
      ((h.defines.VSM_SAMPLES = A.blurSamples),
      (m.defines.VSM_SAMPLES = A.blurSamples),
      (h.needsUpdate = !0),
      (m.needsUpdate = !0)),
      A.mapPass === null &&
        (A.mapPass = new An(s.x, s.y, { format: Mi, type: Hn })),
      (h.uniforms.shadow_pass.value = A.map.depthTexture),
      (h.uniforms.resolution.value = A.mapSize),
      (h.uniforms.radius.value = A.radius),
      n.setRenderTarget(A.mapPass),
      n.clear(),
      n.renderBufferDirect(y, null, _, h, v, null),
      (m.uniforms.shadow_pass.value = A.mapPass.texture),
      (m.uniforms.resolution.value = A.mapSize),
      (m.uniforms.radius.value = A.radius),
      n.setRenderTarget(A.map),
      n.clear(),
      n.renderBufferDirect(y, null, _, m, v, null))
  }
  function T(A, y, _, b) {
    let P = null
    const R =
      _.isPointLight === !0 ? A.customDistanceMaterial : A.customDepthMaterial
    if (R !== void 0) P = R
    else if (
      ((P = _.isPointLight === !0 ? c : o),
      (n.localClippingEnabled &&
        y.clipShadows === !0 &&
        Array.isArray(y.clippingPlanes) &&
        y.clippingPlanes.length !== 0) ||
        (y.displacementMap && y.displacementScale !== 0) ||
        (y.alphaMap && y.alphaTest > 0) ||
        (y.map && y.alphaTest > 0) ||
        y.alphaToCoverage === !0)
    ) {
      const N = P.uuid,
        V = y.uuid
      let W = l[N]
      W === void 0 && ((W = {}), (l[N] = W))
      let I = W[V]
      ;(I === void 0 &&
        ((I = P.clone()), (W[V] = I), y.addEventListener('dispose', C)),
        (P = I))
    }
    if (
      ((P.visible = y.visible),
      (P.wireframe = y.wireframe),
      b === cs
        ? (P.side = y.shadowSide !== null ? y.shadowSide : y.side)
        : (P.side = y.shadowSide !== null ? y.shadowSide : p[y.side]),
      (P.alphaMap = y.alphaMap),
      (P.alphaTest = y.alphaToCoverage === !0 ? 0.5 : y.alphaTest),
      (P.map = y.map),
      (P.clipShadows = y.clipShadows),
      (P.clippingPlanes = y.clippingPlanes),
      (P.clipIntersection = y.clipIntersection),
      (P.displacementMap = y.displacementMap),
      (P.displacementScale = y.displacementScale),
      (P.displacementBias = y.displacementBias),
      (P.wireframeLinewidth = y.wireframeLinewidth),
      (P.linewidth = y.linewidth),
      _.isPointLight === !0 && P.isMeshDistanceMaterial === !0)
    ) {
      const N = n.properties.get(P)
      N.light = _
    }
    return P
  }
  function w(A, y, _, b, P) {
    if (A.visible === !1) return
    if (
      A.layers.test(y.layers) &&
      (A.isMesh || A.isLine || A.isPoints) &&
      (A.castShadow || (A.receiveShadow && P === cs)) &&
      (!A.frustumCulled || i.intersectsObject(A))
    ) {
      A.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse, A.matrixWorld)
      const V = t.update(A),
        W = A.material
      if (Array.isArray(W)) {
        const I = V.groups
        for (let G = 0, O = I.length; G < O; G++) {
          const J = I[G],
            et = W[J.materialIndex]
          if (et && et.visible) {
            const dt = T(A, et, b, P)
            ;(A.onBeforeShadow(n, A, y, _, V, dt, J),
              n.renderBufferDirect(_, null, V, dt, A, J),
              A.onAfterShadow(n, A, y, _, V, dt, J))
          }
        }
      } else if (W.visible) {
        const I = T(A, W, b, P)
        ;(A.onBeforeShadow(n, A, y, _, V, I, null),
          n.renderBufferDirect(_, null, V, I, A, null),
          A.onAfterShadow(n, A, y, _, V, I, null))
      }
    }
    const N = A.children
    for (let V = 0, W = N.length; V < W; V++) w(N[V], y, _, b, P)
  }
  function C(A) {
    A.target.removeEventListener('dispose', C)
    for (const _ in l) {
      const b = l[_],
        P = A.target.uuid
      P in b && (b[P].dispose(), delete b[P])
    }
  }
}
function rg(n, t) {
  function e() {
    let L = !1
    const rt = new xe()
    let Y = null
    const St = new xe(0, 0, 0, 0)
    return {
      setMask: function (lt) {
        Y !== lt && !L && (n.colorMask(lt, lt, lt, lt), (Y = lt))
      },
      setLocked: function (lt) {
        L = lt
      },
      setClear: function (lt, Q, Ct, kt, ve) {
        ;(ve === !0 && ((lt *= kt), (Q *= kt), (Ct *= kt)),
          rt.set(lt, Q, Ct, kt),
          St.equals(rt) === !1 && (n.clearColor(lt, Q, Ct, kt), St.copy(rt)))
      },
      reset: function () {
        ;((L = !1), (Y = null), St.set(-1, 0, 0, 0))
      },
    }
  }
  function i() {
    let L = !1,
      rt = !1,
      Y = null,
      St = null,
      lt = null
    return {
      setReversed: function (Q) {
        if (rt !== Q) {
          const Ct = t.get('EXT_clip_control')
          ;(Q
            ? Ct.clipControlEXT(Ct.LOWER_LEFT_EXT, Ct.ZERO_TO_ONE_EXT)
            : Ct.clipControlEXT(Ct.LOWER_LEFT_EXT, Ct.NEGATIVE_ONE_TO_ONE_EXT),
            (rt = Q))
          const kt = lt
          ;((lt = null), this.setClear(kt))
        }
      },
      getReversed: function () {
        return rt
      },
      setTest: function (Q) {
        Q ? at(n.DEPTH_TEST) : It(n.DEPTH_TEST)
      },
      setMask: function (Q) {
        Y !== Q && !L && (n.depthMask(Q), (Y = Q))
      },
      setFunc: function (Q) {
        if ((rt && (Q = pu[Q]), St !== Q)) {
          switch (Q) {
            case ya:
              n.depthFunc(n.NEVER)
              break
            case ba:
              n.depthFunc(n.ALWAYS)
              break
            case Ea:
              n.depthFunc(n.LESS)
              break
            case Xi:
              n.depthFunc(n.LEQUAL)
              break
            case Ta:
              n.depthFunc(n.EQUAL)
              break
            case wa:
              n.depthFunc(n.GEQUAL)
              break
            case Aa:
              n.depthFunc(n.GREATER)
              break
            case Ra:
              n.depthFunc(n.NOTEQUAL)
              break
            default:
              n.depthFunc(n.LEQUAL)
          }
          St = Q
        }
      },
      setLocked: function (Q) {
        L = Q
      },
      setClear: function (Q) {
        lt !== Q && ((lt = Q), rt && (Q = 1 - Q), n.clearDepth(Q))
      },
      reset: function () {
        ;((L = !1), (Y = null), (St = null), (lt = null), (rt = !1))
      },
    }
  }
  function s() {
    let L = !1,
      rt = null,
      Y = null,
      St = null,
      lt = null,
      Q = null,
      Ct = null,
      kt = null,
      ve = null
    return {
      setTest: function (re) {
        L || (re ? at(n.STENCIL_TEST) : It(n.STENCIL_TEST))
      },
      setMask: function (re) {
        rt !== re && !L && (n.stencilMask(re), (rt = re))
      },
      setFunc: function (re, Ln, Mn) {
        ;(Y !== re || St !== Ln || lt !== Mn) &&
          (n.stencilFunc(re, Ln, Mn), (Y = re), (St = Ln), (lt = Mn))
      },
      setOp: function (re, Ln, Mn) {
        ;(Q !== re || Ct !== Ln || kt !== Mn) &&
          (n.stencilOp(re, Ln, Mn), (Q = re), (Ct = Ln), (kt = Mn))
      },
      setLocked: function (re) {
        L = re
      },
      setClear: function (re) {
        ve !== re && (n.clearStencil(re), (ve = re))
      },
      reset: function () {
        ;((L = !1),
          (rt = null),
          (Y = null),
          (St = null),
          (lt = null),
          (Q = null),
          (Ct = null),
          (kt = null),
          (ve = null))
      },
    }
  }
  const r = new e(),
    a = new i(),
    o = new s(),
    c = new WeakMap(),
    l = new WeakMap()
  let u = {},
    p = {},
    h = {},
    m = new WeakMap(),
    g = [],
    v = null,
    f = !1,
    d = null,
    M = null,
    T = null,
    w = null,
    C = null,
    A = null,
    y = null,
    _ = new Ot(0, 0, 0),
    b = 0,
    P = !1,
    R = null,
    N = null,
    V = null,
    W = null,
    I = null
  const G = n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS)
  let O = !1,
    J = 0
  const et = n.getParameter(n.VERSION)
  et.indexOf('WebGL') !== -1
    ? ((J = parseFloat(/^WebGL (\d)/.exec(et)[1])), (O = J >= 1))
    : et.indexOf('OpenGL ES') !== -1 &&
      ((J = parseFloat(/^OpenGL ES (\d)/.exec(et)[1])), (O = J >= 2))
  let dt = null,
    Tt = {}
  const Rt = n.getParameter(n.SCISSOR_BOX),
    nt = n.getParameter(n.VIEWPORT),
    vt = new xe().fromArray(Rt),
    _t = new xe().fromArray(nt)
  function X(L, rt, Y, St) {
    const lt = new Uint8Array(4),
      Q = n.createTexture()
    ;(n.bindTexture(L, Q),
      n.texParameteri(L, n.TEXTURE_MIN_FILTER, n.NEAREST),
      n.texParameteri(L, n.TEXTURE_MAG_FILTER, n.NEAREST))
    for (let Ct = 0; Ct < Y; Ct++)
      L === n.TEXTURE_3D || L === n.TEXTURE_2D_ARRAY
        ? n.texImage3D(rt, 0, n.RGBA, 1, 1, St, 0, n.RGBA, n.UNSIGNED_BYTE, lt)
        : n.texImage2D(rt + Ct, 0, n.RGBA, 1, 1, 0, n.RGBA, n.UNSIGNED_BYTE, lt)
    return Q
  }
  const mt = {}
  ;((mt[n.TEXTURE_2D] = X(n.TEXTURE_2D, n.TEXTURE_2D, 1)),
    (mt[n.TEXTURE_CUBE_MAP] = X(
      n.TEXTURE_CUBE_MAP,
      n.TEXTURE_CUBE_MAP_POSITIVE_X,
      6
    )),
    (mt[n.TEXTURE_2D_ARRAY] = X(n.TEXTURE_2D_ARRAY, n.TEXTURE_2D_ARRAY, 1, 1)),
    (mt[n.TEXTURE_3D] = X(n.TEXTURE_3D, n.TEXTURE_3D, 1, 1)),
    r.setClear(0, 0, 0, 1),
    a.setClear(1),
    o.setClear(0),
    at(n.DEPTH_TEST),
    a.setFunc(Xi),
    we(!1),
    me(nl),
    at(n.CULL_FACE),
    fe(kn))
  function at(L) {
    u[L] !== !0 && (n.enable(L), (u[L] = !0))
  }
  function It(L) {
    u[L] !== !1 && (n.disable(L), (u[L] = !1))
  }
  function Bt(L, rt) {
    return h[L] !== rt
      ? (n.bindFramebuffer(L, rt),
        (h[L] = rt),
        L === n.DRAW_FRAMEBUFFER && (h[n.FRAMEBUFFER] = rt),
        L === n.FRAMEBUFFER && (h[n.DRAW_FRAMEBUFFER] = rt),
        !0)
      : !1
  }
  function Ut(L, rt) {
    let Y = g,
      St = !1
    if (L) {
      ;((Y = m.get(rt)), Y === void 0 && ((Y = []), m.set(rt, Y)))
      const lt = L.textures
      if (Y.length !== lt.length || Y[0] !== n.COLOR_ATTACHMENT0) {
        for (let Q = 0, Ct = lt.length; Q < Ct; Q++)
          Y[Q] = n.COLOR_ATTACHMENT0 + Q
        ;((Y.length = lt.length), (St = !0))
      }
    } else Y[0] !== n.BACK && ((Y[0] = n.BACK), (St = !0))
    St && n.drawBuffers(Y)
  }
  function pe(L) {
    return v !== L ? (n.useProgram(L), (v = L), !0) : !1
  }
  const jt = {
    [mi]: n.FUNC_ADD,
    [Oh]: n.FUNC_SUBTRACT,
    [Bh]: n.FUNC_REVERSE_SUBTRACT,
  }
  ;((jt[zh] = n.MIN), (jt[kh] = n.MAX))
  const se = {
    [Gh]: n.ZERO,
    [Hh]: n.ONE,
    [Vh]: n.SRC_COLOR,
    [Ma]: n.SRC_ALPHA,
    [Kh]: n.SRC_ALPHA_SATURATE,
    [Yh]: n.DST_COLOR,
    [Xh]: n.DST_ALPHA,
    [Wh]: n.ONE_MINUS_SRC_COLOR,
    [Sa]: n.ONE_MINUS_SRC_ALPHA,
    [jh]: n.ONE_MINUS_DST_COLOR,
    [qh]: n.ONE_MINUS_DST_ALPHA,
    [$h]: n.CONSTANT_COLOR,
    [Zh]: n.ONE_MINUS_CONSTANT_COLOR,
    [Jh]: n.CONSTANT_ALPHA,
    [Qh]: n.ONE_MINUS_CONSTANT_ALPHA,
  }
  function fe(L, rt, Y, St, lt, Q, Ct, kt, ve, re) {
    if (L === kn) {
      f === !0 && (It(n.BLEND), (f = !1))
      return
    }
    if ((f === !1 && (at(n.BLEND), (f = !0)), L !== Fh)) {
      if (L !== d || re !== P) {
        if (
          ((M !== mi || C !== mi) &&
            (n.blendEquation(n.FUNC_ADD), (M = mi), (C = mi)),
          re)
        )
          switch (L) {
            case Vi:
              n.blendFuncSeparate(
                n.ONE,
                n.ONE_MINUS_SRC_ALPHA,
                n.ONE,
                n.ONE_MINUS_SRC_ALPHA
              )
              break
            case il:
              n.blendFunc(n.ONE, n.ONE)
              break
            case sl:
              n.blendFuncSeparate(n.ZERO, n.ONE_MINUS_SRC_COLOR, n.ZERO, n.ONE)
              break
            case rl:
              n.blendFuncSeparate(
                n.DST_COLOR,
                n.ONE_MINUS_SRC_ALPHA,
                n.ZERO,
                n.ONE
              )
              break
            default:
              Zt('WebGLState: Invalid blending: ', L)
              break
          }
        else
          switch (L) {
            case Vi:
              n.blendFuncSeparate(
                n.SRC_ALPHA,
                n.ONE_MINUS_SRC_ALPHA,
                n.ONE,
                n.ONE_MINUS_SRC_ALPHA
              )
              break
            case il:
              n.blendFuncSeparate(n.SRC_ALPHA, n.ONE, n.ONE, n.ONE)
              break
            case sl:
              Zt(
                'WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true'
              )
              break
            case rl:
              Zt(
                'WebGLState: MultiplyBlending requires material.premultipliedAlpha = true'
              )
              break
            default:
              Zt('WebGLState: Invalid blending: ', L)
              break
          }
        ;((T = null),
          (w = null),
          (A = null),
          (y = null),
          _.set(0, 0, 0),
          (b = 0),
          (d = L),
          (P = re))
      }
      return
    }
    ;((lt = lt || rt),
      (Q = Q || Y),
      (Ct = Ct || St),
      (rt !== M || lt !== C) &&
        (n.blendEquationSeparate(jt[rt], jt[lt]), (M = rt), (C = lt)),
      (Y !== T || St !== w || Q !== A || Ct !== y) &&
        (n.blendFuncSeparate(se[Y], se[St], se[Q], se[Ct]),
        (T = Y),
        (w = St),
        (A = Q),
        (y = Ct)),
      (kt.equals(_) === !1 || ve !== b) &&
        (n.blendColor(kt.r, kt.g, kt.b, ve), _.copy(kt), (b = ve)),
      (d = L),
      (P = !1))
  }
  function Yt(L, rt) {
    L.side === On ? It(n.CULL_FACE) : at(n.CULL_FACE)
    let Y = L.side === qe
    ;(rt && (Y = !Y),
      we(Y),
      L.blending === Vi && L.transparent === !1
        ? fe(kn)
        : fe(
            L.blending,
            L.blendEquation,
            L.blendSrc,
            L.blendDst,
            L.blendEquationAlpha,
            L.blendSrcAlpha,
            L.blendDstAlpha,
            L.blendColor,
            L.blendAlpha,
            L.premultipliedAlpha
          ),
      a.setFunc(L.depthFunc),
      a.setTest(L.depthTest),
      a.setMask(L.depthWrite),
      r.setMask(L.colorWrite))
    const St = L.stencilWrite
    ;(o.setTest(St),
      St &&
        (o.setMask(L.stencilWriteMask),
        o.setFunc(L.stencilFunc, L.stencilRef, L.stencilFuncMask),
        o.setOp(L.stencilFail, L.stencilZFail, L.stencilZPass)),
      U(L.polygonOffset, L.polygonOffsetFactor, L.polygonOffsetUnits),
      L.alphaToCoverage === !0
        ? at(n.SAMPLE_ALPHA_TO_COVERAGE)
        : It(n.SAMPLE_ALPHA_TO_COVERAGE))
  }
  function we(L) {
    R !== L && (L ? n.frontFace(n.CW) : n.frontFace(n.CCW), (R = L))
  }
  function me(L) {
    ;(L !== Ih
      ? (at(n.CULL_FACE),
        L !== N &&
          (L === nl
            ? n.cullFace(n.BACK)
            : L === Uh
              ? n.cullFace(n.FRONT)
              : n.cullFace(n.FRONT_AND_BACK)))
      : It(n.CULL_FACE),
      (N = L))
  }
  function Je(L) {
    L !== V && (O && n.lineWidth(L), (V = L))
  }
  function U(L, rt, Y) {
    L
      ? (at(n.POLYGON_OFFSET_FILL),
        (W !== rt || I !== Y) &&
          ((W = rt),
          (I = Y),
          a.getReversed() && (rt = -rt),
          n.polygonOffset(rt, Y)))
      : It(n.POLYGON_OFFSET_FILL)
  }
  function Ae(L) {
    L ? at(n.SCISSOR_TEST) : It(n.SCISSOR_TEST)
  }
  function Kt(L) {
    ;(L === void 0 && (L = n.TEXTURE0 + G - 1),
      dt !== L && (n.activeTexture(L), (dt = L)))
  }
  function ue(L, rt, Y) {
    Y === void 0 && (dt === null ? (Y = n.TEXTURE0 + G - 1) : (Y = dt))
    let St = Tt[Y]
    ;(St === void 0 && ((St = { type: void 0, texture: void 0 }), (Tt[Y] = St)),
      (St.type !== L || St.texture !== rt) &&
        (dt !== Y && (n.activeTexture(Y), (dt = Y)),
        n.bindTexture(L, rt || mt[L]),
        (St.type = L),
        (St.texture = rt)))
  }
  function ft() {
    const L = Tt[dt]
    L !== void 0 &&
      L.type !== void 0 &&
      (n.bindTexture(L.type, null), (L.type = void 0), (L.texture = void 0))
  }
  function ge() {
    try {
      n.compressedTexImage2D(...arguments)
    } catch (L) {
      Zt('WebGLState:', L)
    }
  }
  function E() {
    try {
      n.compressedTexImage3D(...arguments)
    } catch (L) {
      Zt('WebGLState:', L)
    }
  }
  function x() {
    try {
      n.texSubImage2D(...arguments)
    } catch (L) {
      Zt('WebGLState:', L)
    }
  }
  function B() {
    try {
      n.texSubImage3D(...arguments)
    } catch (L) {
      Zt('WebGLState:', L)
    }
  }
  function j() {
    try {
      n.compressedTexSubImage2D(...arguments)
    } catch (L) {
      Zt('WebGLState:', L)
    }
  }
  function tt() {
    try {
      n.compressedTexSubImage3D(...arguments)
    } catch (L) {
      Zt('WebGLState:', L)
    }
  }
  function it() {
    try {
      n.texStorage2D(...arguments)
    } catch (L) {
      Zt('WebGLState:', L)
    }
  }
  function ct() {
    try {
      n.texStorage3D(...arguments)
    } catch (L) {
      Zt('WebGLState:', L)
    }
  }
  function q() {
    try {
      n.texImage2D(...arguments)
    } catch (L) {
      Zt('WebGLState:', L)
    }
  }
  function K() {
    try {
      n.texImage3D(...arguments)
    } catch (L) {
      Zt('WebGLState:', L)
    }
  }
  function Mt(L) {
    return p[L] !== void 0 ? p[L] : n.getParameter(L)
  }
  function bt(L, rt) {
    p[L] !== rt && (n.pixelStorei(L, rt), (p[L] = rt))
  }
  function ot(L) {
    vt.equals(L) === !1 && (n.scissor(L.x, L.y, L.z, L.w), vt.copy(L))
  }
  function st(L) {
    _t.equals(L) === !1 && (n.viewport(L.x, L.y, L.z, L.w), _t.copy(L))
  }
  function Ft(L, rt) {
    let Y = l.get(rt)
    Y === void 0 && ((Y = new WeakMap()), l.set(rt, Y))
    let St = Y.get(L)
    St === void 0 && ((St = n.getUniformBlockIndex(rt, L.name)), Y.set(L, St))
  }
  function Ht(L, rt) {
    const St = l.get(rt).get(L)
    c.get(rt) !== St &&
      (n.uniformBlockBinding(rt, St, L.__bindingPointIndex), c.set(rt, St))
  }
  function ee() {
    ;(n.disable(n.BLEND),
      n.disable(n.CULL_FACE),
      n.disable(n.DEPTH_TEST),
      n.disable(n.POLYGON_OFFSET_FILL),
      n.disable(n.SCISSOR_TEST),
      n.disable(n.STENCIL_TEST),
      n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),
      n.blendEquation(n.FUNC_ADD),
      n.blendFunc(n.ONE, n.ZERO),
      n.blendFuncSeparate(n.ONE, n.ZERO, n.ONE, n.ZERO),
      n.blendColor(0, 0, 0, 0),
      n.colorMask(!0, !0, !0, !0),
      n.clearColor(0, 0, 0, 0),
      n.depthMask(!0),
      n.depthFunc(n.LESS),
      a.setReversed(!1),
      n.clearDepth(1),
      n.stencilMask(4294967295),
      n.stencilFunc(n.ALWAYS, 0, 4294967295),
      n.stencilOp(n.KEEP, n.KEEP, n.KEEP),
      n.clearStencil(0),
      n.cullFace(n.BACK),
      n.frontFace(n.CCW),
      n.polygonOffset(0, 0),
      n.activeTexture(n.TEXTURE0),
      n.bindFramebuffer(n.FRAMEBUFFER, null),
      n.bindFramebuffer(n.DRAW_FRAMEBUFFER, null),
      n.bindFramebuffer(n.READ_FRAMEBUFFER, null),
      n.useProgram(null),
      n.lineWidth(1),
      n.scissor(0, 0, n.canvas.width, n.canvas.height),
      n.viewport(0, 0, n.canvas.width, n.canvas.height),
      n.pixelStorei(n.PACK_ALIGNMENT, 4),
      n.pixelStorei(n.UNPACK_ALIGNMENT, 4),
      n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, !1),
      n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1),
      n.pixelStorei(
        n.UNPACK_COLORSPACE_CONVERSION_WEBGL,
        n.BROWSER_DEFAULT_WEBGL
      ),
      n.pixelStorei(n.PACK_ROW_LENGTH, 0),
      n.pixelStorei(n.PACK_SKIP_PIXELS, 0),
      n.pixelStorei(n.PACK_SKIP_ROWS, 0),
      n.pixelStorei(n.UNPACK_ROW_LENGTH, 0),
      n.pixelStorei(n.UNPACK_IMAGE_HEIGHT, 0),
      n.pixelStorei(n.UNPACK_SKIP_PIXELS, 0),
      n.pixelStorei(n.UNPACK_SKIP_ROWS, 0),
      n.pixelStorei(n.UNPACK_SKIP_IMAGES, 0),
      (u = {}),
      (p = {}),
      (dt = null),
      (Tt = {}),
      (h = {}),
      (m = new WeakMap()),
      (g = []),
      (v = null),
      (f = !1),
      (d = null),
      (M = null),
      (T = null),
      (w = null),
      (C = null),
      (A = null),
      (y = null),
      (_ = new Ot(0, 0, 0)),
      (b = 0),
      (P = !1),
      (R = null),
      (N = null),
      (V = null),
      (W = null),
      (I = null),
      vt.set(0, 0, n.canvas.width, n.canvas.height),
      _t.set(0, 0, n.canvas.width, n.canvas.height),
      r.reset(),
      a.reset(),
      o.reset())
  }
  return {
    buffers: { color: r, depth: a, stencil: o },
    enable: at,
    disable: It,
    bindFramebuffer: Bt,
    drawBuffers: Ut,
    useProgram: pe,
    setBlending: fe,
    setMaterial: Yt,
    setFlipSided: we,
    setCullFace: me,
    setLineWidth: Je,
    setPolygonOffset: U,
    setScissorTest: Ae,
    activeTexture: Kt,
    bindTexture: ue,
    unbindTexture: ft,
    compressedTexImage2D: ge,
    compressedTexImage3D: E,
    texImage2D: q,
    texImage3D: K,
    pixelStorei: bt,
    getParameter: Mt,
    updateUBOMapping: Ft,
    uniformBlockBinding: Ht,
    texStorage2D: it,
    texStorage3D: ct,
    texSubImage2D: x,
    texSubImage3D: B,
    compressedTexSubImage2D: j,
    compressedTexSubImage3D: tt,
    scissor: ot,
    viewport: st,
    reset: ee,
  }
}
function ag(n, t, e, i, s, r, a) {
  const o = t.has('WEBGL_multisampled_render_to_texture')
      ? t.get('WEBGL_multisampled_render_to_texture')
      : null,
    c =
      typeof navigator > 'u' ? !1 : /OculusBrowser/g.test(navigator.userAgent),
    l = new Nt(),
    u = new WeakMap(),
    p = new Set()
  let h
  const m = new WeakMap()
  let g = !1
  try {
    g =
      typeof OffscreenCanvas < 'u' &&
      new OffscreenCanvas(1, 1).getContext('2d') !== null
  } catch {}
  function v(E, x) {
    return g ? new OffscreenCanvas(E, x) : pr('canvas')
  }
  function f(E, x, B) {
    let j = 1
    const tt = ge(E)
    if (
      ((tt.width > B || tt.height > B) &&
        (j = B / Math.max(tt.width, tt.height)),
      j < 1)
    )
      if (
        (typeof HTMLImageElement < 'u' && E instanceof HTMLImageElement) ||
        (typeof HTMLCanvasElement < 'u' && E instanceof HTMLCanvasElement) ||
        (typeof ImageBitmap < 'u' && E instanceof ImageBitmap) ||
        (typeof VideoFrame < 'u' && E instanceof VideoFrame)
      ) {
        const it = Math.floor(j * tt.width),
          ct = Math.floor(j * tt.height)
        h === void 0 && (h = v(it, ct))
        const q = x ? v(it, ct) : h
        return (
          (q.width = it),
          (q.height = ct),
          q.getContext('2d').drawImage(E, 0, 0, it, ct),
          Dt(
            'WebGLRenderer: Texture has been resized from (' +
              tt.width +
              'x' +
              tt.height +
              ') to (' +
              it +
              'x' +
              ct +
              ').'
          ),
          q
        )
      } else
        return (
          'data' in E &&
            Dt(
              'WebGLRenderer: Image in DataTexture is too big (' +
                tt.width +
                'x' +
                tt.height +
                ').'
            ),
          E
        )
    return E
  }
  function d(E) {
    return E.generateMipmaps
  }
  function M(E) {
    n.generateMipmap(E)
  }
  function T(E) {
    return E.isWebGLCubeRenderTarget
      ? n.TEXTURE_CUBE_MAP
      : E.isWebGL3DRenderTarget
        ? n.TEXTURE_3D
        : E.isWebGLArrayRenderTarget || E.isCompressedArrayTexture
          ? n.TEXTURE_2D_ARRAY
          : n.TEXTURE_2D
  }
  function w(E, x, B, j, tt, it = !1) {
    if (E !== null) {
      if (n[E] !== void 0) return n[E]
      Dt(
        "WebGLRenderer: Attempt to use non-existing WebGL internal format '" +
          E +
          "'"
      )
    }
    let ct
    j &&
      ((ct = t.get('EXT_texture_norm16')),
      ct ||
        Dt(
          'WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension'
        ))
    let q = x
    if (
      (x === n.RED &&
        (B === n.FLOAT && (q = n.R32F),
        B === n.HALF_FLOAT && (q = n.R16F),
        B === n.UNSIGNED_BYTE && (q = n.R8),
        B === n.UNSIGNED_SHORT && ct && (q = ct.R16_EXT),
        B === n.SHORT && ct && (q = ct.R16_SNORM_EXT)),
      x === n.RED_INTEGER &&
        (B === n.UNSIGNED_BYTE && (q = n.R8UI),
        B === n.UNSIGNED_SHORT && (q = n.R16UI),
        B === n.UNSIGNED_INT && (q = n.R32UI),
        B === n.BYTE && (q = n.R8I),
        B === n.SHORT && (q = n.R16I),
        B === n.INT && (q = n.R32I)),
      x === n.RG &&
        (B === n.FLOAT && (q = n.RG32F),
        B === n.HALF_FLOAT && (q = n.RG16F),
        B === n.UNSIGNED_BYTE && (q = n.RG8),
        B === n.UNSIGNED_SHORT && ct && (q = ct.RG16_EXT),
        B === n.SHORT && ct && (q = ct.RG16_SNORM_EXT)),
      x === n.RG_INTEGER &&
        (B === n.UNSIGNED_BYTE && (q = n.RG8UI),
        B === n.UNSIGNED_SHORT && (q = n.RG16UI),
        B === n.UNSIGNED_INT && (q = n.RG32UI),
        B === n.BYTE && (q = n.RG8I),
        B === n.SHORT && (q = n.RG16I),
        B === n.INT && (q = n.RG32I)),
      x === n.RGB_INTEGER &&
        (B === n.UNSIGNED_BYTE && (q = n.RGB8UI),
        B === n.UNSIGNED_SHORT && (q = n.RGB16UI),
        B === n.UNSIGNED_INT && (q = n.RGB32UI),
        B === n.BYTE && (q = n.RGB8I),
        B === n.SHORT && (q = n.RGB16I),
        B === n.INT && (q = n.RGB32I)),
      x === n.RGBA_INTEGER &&
        (B === n.UNSIGNED_BYTE && (q = n.RGBA8UI),
        B === n.UNSIGNED_SHORT && (q = n.RGBA16UI),
        B === n.UNSIGNED_INT && (q = n.RGBA32UI),
        B === n.BYTE && (q = n.RGBA8I),
        B === n.SHORT && (q = n.RGBA16I),
        B === n.INT && (q = n.RGBA32I)),
      x === n.RGB &&
        (B === n.UNSIGNED_SHORT && ct && (q = ct.RGB16_EXT),
        B === n.SHORT && ct && (q = ct.RGB16_SNORM_EXT),
        B === n.UNSIGNED_INT_5_9_9_9_REV && (q = n.RGB9_E5),
        B === n.UNSIGNED_INT_10F_11F_11F_REV && (q = n.R11F_G11F_B10F)),
      x === n.RGBA)
    ) {
      const K = it ? fr : $t.getTransfer(tt)
      ;(B === n.FLOAT && (q = n.RGBA32F),
        B === n.HALF_FLOAT && (q = n.RGBA16F),
        B === n.UNSIGNED_BYTE && (q = K === ne ? n.SRGB8_ALPHA8 : n.RGBA8),
        B === n.UNSIGNED_SHORT && ct && (q = ct.RGBA16_EXT),
        B === n.SHORT && ct && (q = ct.RGBA16_SNORM_EXT),
        B === n.UNSIGNED_SHORT_4_4_4_4 && (q = n.RGBA4),
        B === n.UNSIGNED_SHORT_5_5_5_1 && (q = n.RGB5_A1))
    }
    return (
      (q === n.R16F ||
        q === n.R32F ||
        q === n.RG16F ||
        q === n.RG32F ||
        q === n.RGBA16F ||
        q === n.RGBA32F) &&
        t.get('EXT_color_buffer_float'),
      q
    )
  }
  function C(E, x) {
    let B
    return (
      E
        ? x === null || x === Rn || x === gs
          ? (B = n.DEPTH24_STENCIL8)
          : x === gn
            ? (B = n.DEPTH32F_STENCIL8)
            : x === ms &&
              ((B = n.DEPTH24_STENCIL8),
              Dt(
                'DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.'
              ))
        : x === null || x === Rn || x === gs
          ? (B = n.DEPTH_COMPONENT24)
          : x === gn
            ? (B = n.DEPTH_COMPONENT32F)
            : x === ms && (B = n.DEPTH_COMPONENT16),
      B
    )
  }
  function A(E, x) {
    return d(E) === !0 ||
      (E.isFramebufferTexture && E.minFilter !== Fe && E.minFilter !== Ge)
      ? Math.log2(Math.max(x.width, x.height)) + 1
      : E.mipmaps !== void 0 && E.mipmaps.length > 0
        ? E.mipmaps.length
        : E.isCompressedTexture && Array.isArray(E.image)
          ? x.mipmaps.length
          : 1
  }
  function y(E) {
    const x = E.target
    ;(x.removeEventListener('dispose', y),
      b(x),
      x.isVideoTexture && u.delete(x),
      x.isHTMLTexture && p.delete(x))
  }
  function _(E) {
    const x = E.target
    ;(x.removeEventListener('dispose', _), R(x))
  }
  function b(E) {
    const x = i.get(E)
    if (x.__webglInit === void 0) return
    const B = E.source,
      j = m.get(B)
    if (j) {
      const tt = j[x.__cacheKey]
      ;(tt.usedTimes--,
        tt.usedTimes === 0 && P(E),
        Object.keys(j).length === 0 && m.delete(B))
    }
    i.remove(E)
  }
  function P(E) {
    const x = i.get(E)
    n.deleteTexture(x.__webglTexture)
    const B = E.source,
      j = m.get(B)
    ;(delete j[x.__cacheKey], a.memory.textures--)
  }
  function R(E) {
    const x = i.get(E)
    if (
      (E.depthTexture && (E.depthTexture.dispose(), i.remove(E.depthTexture)),
      E.isWebGLCubeRenderTarget)
    )
      for (let j = 0; j < 6; j++) {
        if (Array.isArray(x.__webglFramebuffer[j]))
          for (let tt = 0; tt < x.__webglFramebuffer[j].length; tt++)
            n.deleteFramebuffer(x.__webglFramebuffer[j][tt])
        else n.deleteFramebuffer(x.__webglFramebuffer[j])
        x.__webglDepthbuffer && n.deleteRenderbuffer(x.__webglDepthbuffer[j])
      }
    else {
      if (Array.isArray(x.__webglFramebuffer))
        for (let j = 0; j < x.__webglFramebuffer.length; j++)
          n.deleteFramebuffer(x.__webglFramebuffer[j])
      else n.deleteFramebuffer(x.__webglFramebuffer)
      if (
        (x.__webglDepthbuffer && n.deleteRenderbuffer(x.__webglDepthbuffer),
        x.__webglMultisampledFramebuffer &&
          n.deleteFramebuffer(x.__webglMultisampledFramebuffer),
        x.__webglColorRenderbuffer)
      )
        for (let j = 0; j < x.__webglColorRenderbuffer.length; j++)
          x.__webglColorRenderbuffer[j] &&
            n.deleteRenderbuffer(x.__webglColorRenderbuffer[j])
      x.__webglDepthRenderbuffer &&
        n.deleteRenderbuffer(x.__webglDepthRenderbuffer)
    }
    const B = E.textures
    for (let j = 0, tt = B.length; j < tt; j++) {
      const it = i.get(B[j])
      ;(it.__webglTexture &&
        (n.deleteTexture(it.__webglTexture), a.memory.textures--),
        i.remove(B[j]))
    }
    i.remove(E)
  }
  let N = 0
  function V() {
    N = 0
  }
  function W() {
    return N
  }
  function I(E) {
    N = E
  }
  function G() {
    const E = N
    return (
      E >= s.maxTextures &&
        Dt(
          'WebGLTextures: Trying to use ' +
            E +
            ' texture units while this GPU supports only ' +
            s.maxTextures
        ),
      (N += 1),
      E
    )
  }
  function O(E) {
    const x = []
    return (
      x.push(E.wrapS),
      x.push(E.wrapT),
      x.push(E.wrapR || 0),
      x.push(E.magFilter),
      x.push(E.minFilter),
      x.push(E.anisotropy),
      x.push(E.internalFormat),
      x.push(E.format),
      x.push(E.type),
      x.push(E.generateMipmaps),
      x.push(E.premultiplyAlpha),
      x.push(E.flipY),
      x.push(E.unpackAlignment),
      x.push(E.colorSpace),
      x.join()
    )
  }
  function J(E, x) {
    const B = i.get(E)
    if (
      (E.isVideoTexture && ue(E),
      E.isRenderTargetTexture === !1 &&
        E.isExternalTexture !== !0 &&
        E.version > 0 &&
        B.__version !== E.version)
    ) {
      const j = E.image
      if (j === null)
        Dt('WebGLRenderer: Texture marked for update but no image data found.')
      else if (j.complete === !1)
        Dt('WebGLRenderer: Texture marked for update but image is incomplete')
      else {
        It(B, E, x)
        return
      }
    } else
      E.isExternalTexture &&
        (B.__webglTexture = E.sourceTexture ? E.sourceTexture : null)
    e.bindTexture(n.TEXTURE_2D, B.__webglTexture, n.TEXTURE0 + x)
  }
  function et(E, x) {
    const B = i.get(E)
    if (
      E.isRenderTargetTexture === !1 &&
      E.version > 0 &&
      B.__version !== E.version
    ) {
      It(B, E, x)
      return
    } else
      E.isExternalTexture &&
        (B.__webglTexture = E.sourceTexture ? E.sourceTexture : null)
    e.bindTexture(n.TEXTURE_2D_ARRAY, B.__webglTexture, n.TEXTURE0 + x)
  }
  function dt(E, x) {
    const B = i.get(E)
    if (
      E.isRenderTargetTexture === !1 &&
      E.version > 0 &&
      B.__version !== E.version
    ) {
      It(B, E, x)
      return
    }
    e.bindTexture(n.TEXTURE_3D, B.__webglTexture, n.TEXTURE0 + x)
  }
  function Tt(E, x) {
    const B = i.get(E)
    if (
      E.isCubeDepthTexture !== !0 &&
      E.version > 0 &&
      B.__version !== E.version
    ) {
      Bt(B, E, x)
      return
    }
    e.bindTexture(n.TEXTURE_CUBE_MAP, B.__webglTexture, n.TEXTURE0 + x)
  }
  const Rt = { [lr]: n.REPEAT, [Bn]: n.CLAMP_TO_EDGE, [Ca]: n.MIRRORED_REPEAT },
    nt = {
      [Fe]: n.NEAREST,
      [nu]: n.NEAREST_MIPMAP_NEAREST,
      [ys]: n.NEAREST_MIPMAP_LINEAR,
      [Ge]: n.LINEAR,
      [Ir]: n.LINEAR_MIPMAP_NEAREST,
      [_i]: n.LINEAR_MIPMAP_LINEAR,
    },
    vt = {
      [ru]: n.NEVER,
      [hu]: n.ALWAYS,
      [au]: n.LESS,
      [Ao]: n.LEQUAL,
      [ou]: n.EQUAL,
      [Ro]: n.GEQUAL,
      [lu]: n.GREATER,
      [cu]: n.NOTEQUAL,
    }
  function _t(E, x) {
    if (
      (x.type === gn &&
        t.has('OES_texture_float_linear') === !1 &&
        (x.magFilter === Ge ||
          x.magFilter === Ir ||
          x.magFilter === ys ||
          x.magFilter === _i ||
          x.minFilter === Ge ||
          x.minFilter === Ir ||
          x.minFilter === ys ||
          x.minFilter === _i) &&
        Dt(
          'WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.'
        ),
      n.texParameteri(E, n.TEXTURE_WRAP_S, Rt[x.wrapS]),
      n.texParameteri(E, n.TEXTURE_WRAP_T, Rt[x.wrapT]),
      (E === n.TEXTURE_3D || E === n.TEXTURE_2D_ARRAY) &&
        n.texParameteri(E, n.TEXTURE_WRAP_R, Rt[x.wrapR]),
      n.texParameteri(E, n.TEXTURE_MAG_FILTER, nt[x.magFilter]),
      n.texParameteri(E, n.TEXTURE_MIN_FILTER, nt[x.minFilter]),
      x.compareFunction &&
        (n.texParameteri(E, n.TEXTURE_COMPARE_MODE, n.COMPARE_REF_TO_TEXTURE),
        n.texParameteri(E, n.TEXTURE_COMPARE_FUNC, vt[x.compareFunction])),
      t.has('EXT_texture_filter_anisotropic') === !0)
    ) {
      if (
        x.magFilter === Fe ||
        (x.minFilter !== ys && x.minFilter !== _i) ||
        (x.type === gn && t.has('OES_texture_float_linear') === !1)
      )
        return
      if (x.anisotropy > 1 || i.get(x).__currentAnisotropy) {
        const B = t.get('EXT_texture_filter_anisotropic')
        ;(n.texParameterf(
          E,
          B.TEXTURE_MAX_ANISOTROPY_EXT,
          Math.min(x.anisotropy, s.getMaxAnisotropy())
        ),
          (i.get(x).__currentAnisotropy = x.anisotropy))
      }
    }
  }
  function X(E, x) {
    let B = !1
    E.__webglInit === void 0 &&
      ((E.__webglInit = !0), x.addEventListener('dispose', y))
    const j = x.source
    let tt = m.get(j)
    tt === void 0 && ((tt = {}), m.set(j, tt))
    const it = O(x)
    if (it !== E.__cacheKey) {
      ;(tt[it] === void 0 &&
        ((tt[it] = { texture: n.createTexture(), usedTimes: 0 }),
        a.memory.textures++,
        (B = !0)),
        tt[it].usedTimes++)
      const ct = tt[E.__cacheKey]
      ;(ct !== void 0 &&
        (tt[E.__cacheKey].usedTimes--, ct.usedTimes === 0 && P(x)),
        (E.__cacheKey = it),
        (E.__webglTexture = tt[it].texture))
    }
    return B
  }
  function mt(E, x, B) {
    return Math.floor(Math.floor(E / B) / x)
  }
  function at(E, x, B, j) {
    const it = E.updateRanges
    if (it.length === 0)
      e.texSubImage2D(n.TEXTURE_2D, 0, 0, 0, x.width, x.height, B, j, x.data)
    else {
      it.sort((bt, ot) => bt.start - ot.start)
      let ct = 0
      for (let bt = 1; bt < it.length; bt++) {
        const ot = it[ct],
          st = it[bt],
          Ft = ot.start + ot.count,
          Ht = mt(st.start, x.width, 4),
          ee = mt(ot.start, x.width, 4)
        st.start <= Ft + 1 &&
        Ht === ee &&
        mt(st.start + st.count - 1, x.width, 4) === Ht
          ? (ot.count = Math.max(ot.count, st.start + st.count - ot.start))
          : (++ct, (it[ct] = st))
      }
      it.length = ct + 1
      const q = e.getParameter(n.UNPACK_ROW_LENGTH),
        K = e.getParameter(n.UNPACK_SKIP_PIXELS),
        Mt = e.getParameter(n.UNPACK_SKIP_ROWS)
      e.pixelStorei(n.UNPACK_ROW_LENGTH, x.width)
      for (let bt = 0, ot = it.length; bt < ot; bt++) {
        const st = it[bt],
          Ft = Math.floor(st.start / 4),
          Ht = Math.ceil(st.count / 4),
          ee = Ft % x.width,
          L = Math.floor(Ft / x.width),
          rt = Ht,
          Y = 1
        ;(e.pixelStorei(n.UNPACK_SKIP_PIXELS, ee),
          e.pixelStorei(n.UNPACK_SKIP_ROWS, L),
          e.texSubImage2D(n.TEXTURE_2D, 0, ee, L, rt, Y, B, j, x.data))
      }
      ;(E.clearUpdateRanges(),
        e.pixelStorei(n.UNPACK_ROW_LENGTH, q),
        e.pixelStorei(n.UNPACK_SKIP_PIXELS, K),
        e.pixelStorei(n.UNPACK_SKIP_ROWS, Mt))
    }
  }
  function It(E, x, B) {
    let j = n.TEXTURE_2D
    ;((x.isDataArrayTexture || x.isCompressedArrayTexture) &&
      (j = n.TEXTURE_2D_ARRAY),
      x.isData3DTexture && (j = n.TEXTURE_3D))
    const tt = X(E, x),
      it = x.source
    e.bindTexture(j, E.__webglTexture, n.TEXTURE0 + B)
    const ct = i.get(it)
    if (it.version !== ct.__version || tt === !0) {
      if (
        (e.activeTexture(n.TEXTURE0 + B),
        (typeof ImageBitmap < 'u' && x.image instanceof ImageBitmap) === !1)
      ) {
        const Y = $t.getPrimaries($t.workingColorSpace),
          St = x.colorSpace === ni ? null : $t.getPrimaries(x.colorSpace),
          lt =
            x.colorSpace === ni || Y === St ? n.NONE : n.BROWSER_DEFAULT_WEBGL
        ;(e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, x.flipY),
          e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, x.premultiplyAlpha),
          e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL, lt))
      }
      e.pixelStorei(n.UNPACK_ALIGNMENT, x.unpackAlignment)
      let K = f(x.image, !1, s.maxTextureSize)
      K = ft(x, K)
      const Mt = r.convert(x.format, x.colorSpace),
        bt = r.convert(x.type)
      let ot = w(
        x.internalFormat,
        Mt,
        bt,
        x.normalized,
        x.colorSpace,
        x.isVideoTexture
      )
      _t(j, x)
      let st
      const Ft = x.mipmaps,
        Ht = x.isVideoTexture !== !0,
        ee = ct.__version === void 0 || tt === !0,
        L = it.dataReady,
        rt = A(x, K)
      if (x.isDepthTexture)
        ((ot = C(x.format === xi, x.type)),
          ee &&
            (Ht
              ? e.texStorage2D(n.TEXTURE_2D, 1, ot, K.width, K.height)
              : e.texImage2D(
                  n.TEXTURE_2D,
                  0,
                  ot,
                  K.width,
                  K.height,
                  0,
                  Mt,
                  bt,
                  null
                )))
      else if (x.isDataTexture)
        if (Ft.length > 0) {
          Ht &&
            ee &&
            e.texStorage2D(n.TEXTURE_2D, rt, ot, Ft[0].width, Ft[0].height)
          for (let Y = 0, St = Ft.length; Y < St; Y++)
            ((st = Ft[Y]),
              Ht
                ? L &&
                  e.texSubImage2D(
                    n.TEXTURE_2D,
                    Y,
                    0,
                    0,
                    st.width,
                    st.height,
                    Mt,
                    bt,
                    st.data
                  )
                : e.texImage2D(
                    n.TEXTURE_2D,
                    Y,
                    ot,
                    st.width,
                    st.height,
                    0,
                    Mt,
                    bt,
                    st.data
                  ))
          x.generateMipmaps = !1
        } else
          Ht
            ? (ee && e.texStorage2D(n.TEXTURE_2D, rt, ot, K.width, K.height),
              L && at(x, K, Mt, bt))
            : e.texImage2D(
                n.TEXTURE_2D,
                0,
                ot,
                K.width,
                K.height,
                0,
                Mt,
                bt,
                K.data
              )
      else if (x.isCompressedTexture)
        if (x.isCompressedArrayTexture) {
          Ht &&
            ee &&
            e.texStorage3D(
              n.TEXTURE_2D_ARRAY,
              rt,
              ot,
              Ft[0].width,
              Ft[0].height,
              K.depth
            )
          for (let Y = 0, St = Ft.length; Y < St; Y++)
            if (((st = Ft[Y]), x.format !== _n))
              if (Mt !== null)
                if (Ht) {
                  if (L)
                    if (x.layerUpdates.size > 0) {
                      const lt = Gl(st.width, st.height, x.format, x.type)
                      for (const Q of x.layerUpdates) {
                        const Ct = st.data.subarray(
                          (Q * lt) / st.data.BYTES_PER_ELEMENT,
                          ((Q + 1) * lt) / st.data.BYTES_PER_ELEMENT
                        )
                        e.compressedTexSubImage3D(
                          n.TEXTURE_2D_ARRAY,
                          Y,
                          0,
                          0,
                          Q,
                          st.width,
                          st.height,
                          1,
                          Mt,
                          Ct
                        )
                      }
                      x.clearLayerUpdates()
                    } else
                      e.compressedTexSubImage3D(
                        n.TEXTURE_2D_ARRAY,
                        Y,
                        0,
                        0,
                        0,
                        st.width,
                        st.height,
                        K.depth,
                        Mt,
                        st.data
                      )
                } else
                  e.compressedTexImage3D(
                    n.TEXTURE_2D_ARRAY,
                    Y,
                    ot,
                    st.width,
                    st.height,
                    K.depth,
                    0,
                    st.data,
                    0,
                    0
                  )
              else
                Dt(
                  'WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()'
                )
            else
              Ht
                ? L &&
                  e.texSubImage3D(
                    n.TEXTURE_2D_ARRAY,
                    Y,
                    0,
                    0,
                    0,
                    st.width,
                    st.height,
                    K.depth,
                    Mt,
                    bt,
                    st.data
                  )
                : e.texImage3D(
                    n.TEXTURE_2D_ARRAY,
                    Y,
                    ot,
                    st.width,
                    st.height,
                    K.depth,
                    0,
                    Mt,
                    bt,
                    st.data
                  )
        } else {
          Ht &&
            ee &&
            e.texStorage2D(n.TEXTURE_2D, rt, ot, Ft[0].width, Ft[0].height)
          for (let Y = 0, St = Ft.length; Y < St; Y++)
            ((st = Ft[Y]),
              x.format !== _n
                ? Mt !== null
                  ? Ht
                    ? L &&
                      e.compressedTexSubImage2D(
                        n.TEXTURE_2D,
                        Y,
                        0,
                        0,
                        st.width,
                        st.height,
                        Mt,
                        st.data
                      )
                    : e.compressedTexImage2D(
                        n.TEXTURE_2D,
                        Y,
                        ot,
                        st.width,
                        st.height,
                        0,
                        st.data
                      )
                  : Dt(
                      'WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()'
                    )
                : Ht
                  ? L &&
                    e.texSubImage2D(
                      n.TEXTURE_2D,
                      Y,
                      0,
                      0,
                      st.width,
                      st.height,
                      Mt,
                      bt,
                      st.data
                    )
                  : e.texImage2D(
                      n.TEXTURE_2D,
                      Y,
                      ot,
                      st.width,
                      st.height,
                      0,
                      Mt,
                      bt,
                      st.data
                    ))
        }
      else if (x.isDataArrayTexture)
        if (Ht) {
          if (
            (ee &&
              e.texStorage3D(
                n.TEXTURE_2D_ARRAY,
                rt,
                ot,
                K.width,
                K.height,
                K.depth
              ),
            L)
          )
            if (x.layerUpdates.size > 0) {
              const Y = Gl(K.width, K.height, x.format, x.type)
              for (const St of x.layerUpdates) {
                const lt = K.data.subarray(
                  (St * Y) / K.data.BYTES_PER_ELEMENT,
                  ((St + 1) * Y) / K.data.BYTES_PER_ELEMENT
                )
                e.texSubImage3D(
                  n.TEXTURE_2D_ARRAY,
                  0,
                  0,
                  0,
                  St,
                  K.width,
                  K.height,
                  1,
                  Mt,
                  bt,
                  lt
                )
              }
              x.clearLayerUpdates()
            } else
              e.texSubImage3D(
                n.TEXTURE_2D_ARRAY,
                0,
                0,
                0,
                0,
                K.width,
                K.height,
                K.depth,
                Mt,
                bt,
                K.data
              )
        } else
          e.texImage3D(
            n.TEXTURE_2D_ARRAY,
            0,
            ot,
            K.width,
            K.height,
            K.depth,
            0,
            Mt,
            bt,
            K.data
          )
      else if (x.isData3DTexture)
        Ht
          ? (ee &&
              e.texStorage3D(n.TEXTURE_3D, rt, ot, K.width, K.height, K.depth),
            L &&
              e.texSubImage3D(
                n.TEXTURE_3D,
                0,
                0,
                0,
                0,
                K.width,
                K.height,
                K.depth,
                Mt,
                bt,
                K.data
              ))
          : e.texImage3D(
              n.TEXTURE_3D,
              0,
              ot,
              K.width,
              K.height,
              K.depth,
              0,
              Mt,
              bt,
              K.data
            )
      else if (x.isFramebufferTexture) {
        if (ee)
          if (Ht) e.texStorage2D(n.TEXTURE_2D, rt, ot, K.width, K.height)
          else {
            let Y = K.width,
              St = K.height
            for (let lt = 0; lt < rt; lt++)
              (e.texImage2D(n.TEXTURE_2D, lt, ot, Y, St, 0, Mt, bt, null),
                (Y >>= 1),
                (St >>= 1))
          }
      } else if (x.isHTMLTexture) {
        if ('texElementImage2D' in n) {
          const Y = n.canvas
          if (
            (Y.hasAttribute('layoutsubtree') ||
              Y.setAttribute('layoutsubtree', 'true'),
            K.parentNode !== Y)
          ) {
            ;(Y.appendChild(K),
              p.add(x),
              (Y.onpaint = kt => {
                const ve = kt.changedElements
                for (const re of p)
                  ve.includes(re.image) && (re.needsUpdate = !0)
              }),
              Y.requestPaint())
            return
          }
          const St = 0,
            lt = n.RGBA,
            Q = n.RGBA,
            Ct = n.UNSIGNED_BYTE
          ;(n.texElementImage2D(n.TEXTURE_2D, St, lt, Q, Ct, K),
            n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.LINEAR),
            n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE),
            n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE))
        }
      } else if (Ft.length > 0) {
        if (Ht && ee) {
          const Y = ge(Ft[0])
          e.texStorage2D(n.TEXTURE_2D, rt, ot, Y.width, Y.height)
        }
        for (let Y = 0, St = Ft.length; Y < St; Y++)
          ((st = Ft[Y]),
            Ht
              ? L && e.texSubImage2D(n.TEXTURE_2D, Y, 0, 0, Mt, bt, st)
              : e.texImage2D(n.TEXTURE_2D, Y, ot, Mt, bt, st))
        x.generateMipmaps = !1
      } else if (Ht) {
        if (ee) {
          const Y = ge(K)
          e.texStorage2D(n.TEXTURE_2D, rt, ot, Y.width, Y.height)
        }
        L && e.texSubImage2D(n.TEXTURE_2D, 0, 0, 0, Mt, bt, K)
      } else e.texImage2D(n.TEXTURE_2D, 0, ot, Mt, bt, K)
      ;(d(x) && M(j), (ct.__version = it.version), x.onUpdate && x.onUpdate(x))
    }
    E.__version = x.version
  }
  function Bt(E, x, B) {
    if (x.image.length !== 6) return
    const j = X(E, x),
      tt = x.source
    e.bindTexture(n.TEXTURE_CUBE_MAP, E.__webglTexture, n.TEXTURE0 + B)
    const it = i.get(tt)
    if (tt.version !== it.__version || j === !0) {
      e.activeTexture(n.TEXTURE0 + B)
      const ct = $t.getPrimaries($t.workingColorSpace),
        q = x.colorSpace === ni ? null : $t.getPrimaries(x.colorSpace),
        K = x.colorSpace === ni || ct === q ? n.NONE : n.BROWSER_DEFAULT_WEBGL
      ;(e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, x.flipY),
        e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, x.premultiplyAlpha),
        e.pixelStorei(n.UNPACK_ALIGNMENT, x.unpackAlignment),
        e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL, K))
      const Mt = x.isCompressedTexture || x.image[0].isCompressedTexture,
        bt = x.image[0] && x.image[0].isDataTexture,
        ot = []
      for (let Q = 0; Q < 6; Q++)
        (!Mt && !bt
          ? (ot[Q] = f(x.image[Q], !0, s.maxCubemapSize))
          : (ot[Q] = bt ? x.image[Q].image : x.image[Q]),
          (ot[Q] = ft(x, ot[Q])))
      const st = ot[0],
        Ft = r.convert(x.format, x.colorSpace),
        Ht = r.convert(x.type),
        ee = w(x.internalFormat, Ft, Ht, x.normalized, x.colorSpace),
        L = x.isVideoTexture !== !0,
        rt = it.__version === void 0 || j === !0,
        Y = tt.dataReady
      let St = A(x, st)
      _t(n.TEXTURE_CUBE_MAP, x)
      let lt
      if (Mt) {
        L &&
          rt &&
          e.texStorage2D(n.TEXTURE_CUBE_MAP, St, ee, st.width, st.height)
        for (let Q = 0; Q < 6; Q++) {
          lt = ot[Q].mipmaps
          for (let Ct = 0; Ct < lt.length; Ct++) {
            const kt = lt[Ct]
            x.format !== _n
              ? Ft !== null
                ? L
                  ? Y &&
                    e.compressedTexSubImage2D(
                      n.TEXTURE_CUBE_MAP_POSITIVE_X + Q,
                      Ct,
                      0,
                      0,
                      kt.width,
                      kt.height,
                      Ft,
                      kt.data
                    )
                  : e.compressedTexImage2D(
                      n.TEXTURE_CUBE_MAP_POSITIVE_X + Q,
                      Ct,
                      ee,
                      kt.width,
                      kt.height,
                      0,
                      kt.data
                    )
                : Dt(
                    'WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()'
                  )
              : L
                ? Y &&
                  e.texSubImage2D(
                    n.TEXTURE_CUBE_MAP_POSITIVE_X + Q,
                    Ct,
                    0,
                    0,
                    kt.width,
                    kt.height,
                    Ft,
                    Ht,
                    kt.data
                  )
                : e.texImage2D(
                    n.TEXTURE_CUBE_MAP_POSITIVE_X + Q,
                    Ct,
                    ee,
                    kt.width,
                    kt.height,
                    0,
                    Ft,
                    Ht,
                    kt.data
                  )
          }
        }
      } else {
        if (((lt = x.mipmaps), L && rt)) {
          lt.length > 0 && St++
          const Q = ge(ot[0])
          e.texStorage2D(n.TEXTURE_CUBE_MAP, St, ee, Q.width, Q.height)
        }
        for (let Q = 0; Q < 6; Q++)
          if (bt) {
            L
              ? Y &&
                e.texSubImage2D(
                  n.TEXTURE_CUBE_MAP_POSITIVE_X + Q,
                  0,
                  0,
                  0,
                  ot[Q].width,
                  ot[Q].height,
                  Ft,
                  Ht,
                  ot[Q].data
                )
              : e.texImage2D(
                  n.TEXTURE_CUBE_MAP_POSITIVE_X + Q,
                  0,
                  ee,
                  ot[Q].width,
                  ot[Q].height,
                  0,
                  Ft,
                  Ht,
                  ot[Q].data
                )
            for (let Ct = 0; Ct < lt.length; Ct++) {
              const ve = lt[Ct].image[Q].image
              L
                ? Y &&
                  e.texSubImage2D(
                    n.TEXTURE_CUBE_MAP_POSITIVE_X + Q,
                    Ct + 1,
                    0,
                    0,
                    ve.width,
                    ve.height,
                    Ft,
                    Ht,
                    ve.data
                  )
                : e.texImage2D(
                    n.TEXTURE_CUBE_MAP_POSITIVE_X + Q,
                    Ct + 1,
                    ee,
                    ve.width,
                    ve.height,
                    0,
                    Ft,
                    Ht,
                    ve.data
                  )
            }
          } else {
            L
              ? Y &&
                e.texSubImage2D(
                  n.TEXTURE_CUBE_MAP_POSITIVE_X + Q,
                  0,
                  0,
                  0,
                  Ft,
                  Ht,
                  ot[Q]
                )
              : e.texImage2D(
                  n.TEXTURE_CUBE_MAP_POSITIVE_X + Q,
                  0,
                  ee,
                  Ft,
                  Ht,
                  ot[Q]
                )
            for (let Ct = 0; Ct < lt.length; Ct++) {
              const kt = lt[Ct]
              L
                ? Y &&
                  e.texSubImage2D(
                    n.TEXTURE_CUBE_MAP_POSITIVE_X + Q,
                    Ct + 1,
                    0,
                    0,
                    Ft,
                    Ht,
                    kt.image[Q]
                  )
                : e.texImage2D(
                    n.TEXTURE_CUBE_MAP_POSITIVE_X + Q,
                    Ct + 1,
                    ee,
                    Ft,
                    Ht,
                    kt.image[Q]
                  )
            }
          }
      }
      ;(d(x) && M(n.TEXTURE_CUBE_MAP),
        (it.__version = tt.version),
        x.onUpdate && x.onUpdate(x))
    }
    E.__version = x.version
  }
  function Ut(E, x, B, j, tt, it) {
    const ct = r.convert(B.format, B.colorSpace),
      q = r.convert(B.type),
      K = w(B.internalFormat, ct, q, B.normalized, B.colorSpace),
      Mt = i.get(x),
      bt = i.get(B)
    if (((bt.__renderTarget = x), !Mt.__hasExternalTextures)) {
      const ot = Math.max(1, x.width >> it),
        st = Math.max(1, x.height >> it)
      tt === n.TEXTURE_3D || tt === n.TEXTURE_2D_ARRAY
        ? e.texImage3D(tt, it, K, ot, st, x.depth, 0, ct, q, null)
        : e.texImage2D(tt, it, K, ot, st, 0, ct, q, null)
    }
    ;(e.bindFramebuffer(n.FRAMEBUFFER, E),
      Kt(x)
        ? o.framebufferTexture2DMultisampleEXT(
            n.FRAMEBUFFER,
            j,
            tt,
            bt.__webglTexture,
            0,
            Ae(x)
          )
        : (tt === n.TEXTURE_2D ||
            (tt >= n.TEXTURE_CUBE_MAP_POSITIVE_X &&
              tt <= n.TEXTURE_CUBE_MAP_NEGATIVE_Z)) &&
          n.framebufferTexture2D(n.FRAMEBUFFER, j, tt, bt.__webglTexture, it),
      e.bindFramebuffer(n.FRAMEBUFFER, null))
  }
  function pe(E, x, B) {
    if ((n.bindRenderbuffer(n.RENDERBUFFER, E), x.depthBuffer)) {
      const j = x.depthTexture,
        tt = j && j.isDepthTexture ? j.type : null,
        it = C(x.stencilBuffer, tt),
        ct = x.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT
      ;(Kt(x)
        ? o.renderbufferStorageMultisampleEXT(
            n.RENDERBUFFER,
            Ae(x),
            it,
            x.width,
            x.height
          )
        : B
          ? n.renderbufferStorageMultisample(
              n.RENDERBUFFER,
              Ae(x),
              it,
              x.width,
              x.height
            )
          : n.renderbufferStorage(n.RENDERBUFFER, it, x.width, x.height),
        n.framebufferRenderbuffer(n.FRAMEBUFFER, ct, n.RENDERBUFFER, E))
    } else {
      const j = x.textures
      for (let tt = 0; tt < j.length; tt++) {
        const it = j[tt],
          ct = r.convert(it.format, it.colorSpace),
          q = r.convert(it.type),
          K = w(it.internalFormat, ct, q, it.normalized, it.colorSpace)
        Kt(x)
          ? o.renderbufferStorageMultisampleEXT(
              n.RENDERBUFFER,
              Ae(x),
              K,
              x.width,
              x.height
            )
          : B
            ? n.renderbufferStorageMultisample(
                n.RENDERBUFFER,
                Ae(x),
                K,
                x.width,
                x.height
              )
            : n.renderbufferStorage(n.RENDERBUFFER, K, x.width, x.height)
      }
    }
    n.bindRenderbuffer(n.RENDERBUFFER, null)
  }
  function jt(E, x, B) {
    const j = x.isWebGLCubeRenderTarget === !0
    if (
      (e.bindFramebuffer(n.FRAMEBUFFER, E),
      !(x.depthTexture && x.depthTexture.isDepthTexture))
    )
      throw new Error(
        'renderTarget.depthTexture must be an instance of THREE.DepthTexture'
      )
    const tt = i.get(x.depthTexture)
    if (
      ((tt.__renderTarget = x),
      (!tt.__webglTexture ||
        x.depthTexture.image.width !== x.width ||
        x.depthTexture.image.height !== x.height) &&
        ((x.depthTexture.image.width = x.width),
        (x.depthTexture.image.height = x.height),
        (x.depthTexture.needsUpdate = !0)),
      j)
    ) {
      if (
        (tt.__webglInit === void 0 &&
          ((tt.__webglInit = !0),
          x.depthTexture.addEventListener('dispose', y)),
        tt.__webglTexture === void 0)
      ) {
        ;((tt.__webglTexture = n.createTexture()),
          e.bindTexture(n.TEXTURE_CUBE_MAP, tt.__webglTexture),
          _t(n.TEXTURE_CUBE_MAP, x.depthTexture))
        const Mt = r.convert(x.depthTexture.format),
          bt = r.convert(x.depthTexture.type)
        let ot
        x.depthTexture.format === Vn
          ? (ot = n.DEPTH_COMPONENT24)
          : x.depthTexture.format === xi && (ot = n.DEPTH24_STENCIL8)
        for (let st = 0; st < 6; st++)
          n.texImage2D(
            n.TEXTURE_CUBE_MAP_POSITIVE_X + st,
            0,
            ot,
            x.width,
            x.height,
            0,
            Mt,
            bt,
            null
          )
      }
    } else J(x.depthTexture, 0)
    const it = tt.__webglTexture,
      ct = Ae(x),
      q = j ? n.TEXTURE_CUBE_MAP_POSITIVE_X + B : n.TEXTURE_2D,
      K =
        x.depthTexture.format === xi
          ? n.DEPTH_STENCIL_ATTACHMENT
          : n.DEPTH_ATTACHMENT
    if (x.depthTexture.format === Vn)
      Kt(x)
        ? o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER, K, q, it, 0, ct)
        : n.framebufferTexture2D(n.FRAMEBUFFER, K, q, it, 0)
    else if (x.depthTexture.format === xi)
      Kt(x)
        ? o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER, K, q, it, 0, ct)
        : n.framebufferTexture2D(n.FRAMEBUFFER, K, q, it, 0)
    else throw new Error('Unknown depthTexture format')
  }
  function se(E) {
    const x = i.get(E),
      B = E.isWebGLCubeRenderTarget === !0
    if (x.__boundDepthTexture !== E.depthTexture) {
      const j = E.depthTexture
      if ((x.__depthDisposeCallback && x.__depthDisposeCallback(), j)) {
        const tt = () => {
          ;(delete x.__boundDepthTexture,
            delete x.__depthDisposeCallback,
            j.removeEventListener('dispose', tt))
        }
        ;(j.addEventListener('dispose', tt), (x.__depthDisposeCallback = tt))
      }
      x.__boundDepthTexture = j
    }
    if (E.depthTexture && !x.__autoAllocateDepthBuffer)
      if (B) for (let j = 0; j < 6; j++) jt(x.__webglFramebuffer[j], E, j)
      else {
        const j = E.texture.mipmaps
        j && j.length > 0
          ? jt(x.__webglFramebuffer[0], E, 0)
          : jt(x.__webglFramebuffer, E, 0)
      }
    else if (B) {
      x.__webglDepthbuffer = []
      for (let j = 0; j < 6; j++)
        if (
          (e.bindFramebuffer(n.FRAMEBUFFER, x.__webglFramebuffer[j]),
          x.__webglDepthbuffer[j] === void 0)
        )
          ((x.__webglDepthbuffer[j] = n.createRenderbuffer()),
            pe(x.__webglDepthbuffer[j], E, !1))
        else {
          const tt = E.stencilBuffer
              ? n.DEPTH_STENCIL_ATTACHMENT
              : n.DEPTH_ATTACHMENT,
            it = x.__webglDepthbuffer[j]
          ;(n.bindRenderbuffer(n.RENDERBUFFER, it),
            n.framebufferRenderbuffer(n.FRAMEBUFFER, tt, n.RENDERBUFFER, it))
        }
    } else {
      const j = E.texture.mipmaps
      if (
        (j && j.length > 0
          ? e.bindFramebuffer(n.FRAMEBUFFER, x.__webglFramebuffer[0])
          : e.bindFramebuffer(n.FRAMEBUFFER, x.__webglFramebuffer),
        x.__webglDepthbuffer === void 0)
      )
        ((x.__webglDepthbuffer = n.createRenderbuffer()),
          pe(x.__webglDepthbuffer, E, !1))
      else {
        const tt = E.stencilBuffer
            ? n.DEPTH_STENCIL_ATTACHMENT
            : n.DEPTH_ATTACHMENT,
          it = x.__webglDepthbuffer
        ;(n.bindRenderbuffer(n.RENDERBUFFER, it),
          n.framebufferRenderbuffer(n.FRAMEBUFFER, tt, n.RENDERBUFFER, it))
      }
    }
    e.bindFramebuffer(n.FRAMEBUFFER, null)
  }
  function fe(E, x, B) {
    const j = i.get(E)
    ;(x !== void 0 &&
      Ut(
        j.__webglFramebuffer,
        E,
        E.texture,
        n.COLOR_ATTACHMENT0,
        n.TEXTURE_2D,
        0
      ),
      B !== void 0 && se(E))
  }
  function Yt(E) {
    const x = E.texture,
      B = i.get(E),
      j = i.get(x)
    E.addEventListener('dispose', _)
    const tt = E.textures,
      it = E.isWebGLCubeRenderTarget === !0,
      ct = tt.length > 1
    if (
      (ct ||
        (j.__webglTexture === void 0 && (j.__webglTexture = n.createTexture()),
        (j.__version = x.version),
        a.memory.textures++),
      it)
    ) {
      B.__webglFramebuffer = []
      for (let q = 0; q < 6; q++)
        if (x.mipmaps && x.mipmaps.length > 0) {
          B.__webglFramebuffer[q] = []
          for (let K = 0; K < x.mipmaps.length; K++)
            B.__webglFramebuffer[q][K] = n.createFramebuffer()
        } else B.__webglFramebuffer[q] = n.createFramebuffer()
    } else {
      if (x.mipmaps && x.mipmaps.length > 0) {
        B.__webglFramebuffer = []
        for (let q = 0; q < x.mipmaps.length; q++)
          B.__webglFramebuffer[q] = n.createFramebuffer()
      } else B.__webglFramebuffer = n.createFramebuffer()
      if (ct)
        for (let q = 0, K = tt.length; q < K; q++) {
          const Mt = i.get(tt[q])
          Mt.__webglTexture === void 0 &&
            ((Mt.__webglTexture = n.createTexture()), a.memory.textures++)
        }
      if (E.samples > 0 && Kt(E) === !1) {
        ;((B.__webglMultisampledFramebuffer = n.createFramebuffer()),
          (B.__webglColorRenderbuffer = []),
          e.bindFramebuffer(n.FRAMEBUFFER, B.__webglMultisampledFramebuffer))
        for (let q = 0; q < tt.length; q++) {
          const K = tt[q]
          ;((B.__webglColorRenderbuffer[q] = n.createRenderbuffer()),
            n.bindRenderbuffer(n.RENDERBUFFER, B.__webglColorRenderbuffer[q]))
          const Mt = r.convert(K.format, K.colorSpace),
            bt = r.convert(K.type),
            ot = w(
              K.internalFormat,
              Mt,
              bt,
              K.normalized,
              K.colorSpace,
              E.isXRRenderTarget === !0
            ),
            st = Ae(E)
          ;(n.renderbufferStorageMultisample(
            n.RENDERBUFFER,
            st,
            ot,
            E.width,
            E.height
          ),
            n.framebufferRenderbuffer(
              n.FRAMEBUFFER,
              n.COLOR_ATTACHMENT0 + q,
              n.RENDERBUFFER,
              B.__webglColorRenderbuffer[q]
            ))
        }
        ;(n.bindRenderbuffer(n.RENDERBUFFER, null),
          E.depthBuffer &&
            ((B.__webglDepthRenderbuffer = n.createRenderbuffer()),
            pe(B.__webglDepthRenderbuffer, E, !0)),
          e.bindFramebuffer(n.FRAMEBUFFER, null))
      }
    }
    if (it) {
      ;(e.bindTexture(n.TEXTURE_CUBE_MAP, j.__webglTexture),
        _t(n.TEXTURE_CUBE_MAP, x))
      for (let q = 0; q < 6; q++)
        if (x.mipmaps && x.mipmaps.length > 0)
          for (let K = 0; K < x.mipmaps.length; K++)
            Ut(
              B.__webglFramebuffer[q][K],
              E,
              x,
              n.COLOR_ATTACHMENT0,
              n.TEXTURE_CUBE_MAP_POSITIVE_X + q,
              K
            )
        else
          Ut(
            B.__webglFramebuffer[q],
            E,
            x,
            n.COLOR_ATTACHMENT0,
            n.TEXTURE_CUBE_MAP_POSITIVE_X + q,
            0
          )
      ;(d(x) && M(n.TEXTURE_CUBE_MAP), e.unbindTexture())
    } else if (ct) {
      for (let q = 0, K = tt.length; q < K; q++) {
        const Mt = tt[q],
          bt = i.get(Mt)
        let ot = n.TEXTURE_2D
        ;((E.isWebGL3DRenderTarget || E.isWebGLArrayRenderTarget) &&
          (ot = E.isWebGL3DRenderTarget ? n.TEXTURE_3D : n.TEXTURE_2D_ARRAY),
          e.bindTexture(ot, bt.__webglTexture),
          _t(ot, Mt),
          Ut(B.__webglFramebuffer, E, Mt, n.COLOR_ATTACHMENT0 + q, ot, 0),
          d(Mt) && M(ot))
      }
      e.unbindTexture()
    } else {
      let q = n.TEXTURE_2D
      if (
        ((E.isWebGL3DRenderTarget || E.isWebGLArrayRenderTarget) &&
          (q = E.isWebGL3DRenderTarget ? n.TEXTURE_3D : n.TEXTURE_2D_ARRAY),
        e.bindTexture(q, j.__webglTexture),
        _t(q, x),
        x.mipmaps && x.mipmaps.length > 0)
      )
        for (let K = 0; K < x.mipmaps.length; K++)
          Ut(B.__webglFramebuffer[K], E, x, n.COLOR_ATTACHMENT0, q, K)
      else Ut(B.__webglFramebuffer, E, x, n.COLOR_ATTACHMENT0, q, 0)
      ;(d(x) && M(q), e.unbindTexture())
    }
    E.depthBuffer && se(E)
  }
  function we(E) {
    const x = E.textures
    for (let B = 0, j = x.length; B < j; B++) {
      const tt = x[B]
      if (d(tt)) {
        const it = T(E),
          ct = i.get(tt).__webglTexture
        ;(e.bindTexture(it, ct), M(it), e.unbindTexture())
      }
    }
  }
  const me = [],
    Je = []
  function U(E) {
    if (E.samples > 0) {
      if (Kt(E) === !1) {
        const x = E.textures,
          B = E.width,
          j = E.height
        let tt = n.COLOR_BUFFER_BIT
        const it = E.stencilBuffer
            ? n.DEPTH_STENCIL_ATTACHMENT
            : n.DEPTH_ATTACHMENT,
          ct = i.get(E),
          q = x.length > 1
        if (q)
          for (let Mt = 0; Mt < x.length; Mt++)
            (e.bindFramebuffer(
              n.FRAMEBUFFER,
              ct.__webglMultisampledFramebuffer
            ),
              n.framebufferRenderbuffer(
                n.FRAMEBUFFER,
                n.COLOR_ATTACHMENT0 + Mt,
                n.RENDERBUFFER,
                null
              ),
              e.bindFramebuffer(n.FRAMEBUFFER, ct.__webglFramebuffer),
              n.framebufferTexture2D(
                n.DRAW_FRAMEBUFFER,
                n.COLOR_ATTACHMENT0 + Mt,
                n.TEXTURE_2D,
                null,
                0
              ))
        e.bindFramebuffer(n.READ_FRAMEBUFFER, ct.__webglMultisampledFramebuffer)
        const K = E.texture.mipmaps
        K && K.length > 0
          ? e.bindFramebuffer(n.DRAW_FRAMEBUFFER, ct.__webglFramebuffer[0])
          : e.bindFramebuffer(n.DRAW_FRAMEBUFFER, ct.__webglFramebuffer)
        for (let Mt = 0; Mt < x.length; Mt++) {
          if (
            (E.resolveDepthBuffer &&
              (E.depthBuffer && (tt |= n.DEPTH_BUFFER_BIT),
              E.stencilBuffer &&
                E.resolveStencilBuffer &&
                (tt |= n.STENCIL_BUFFER_BIT)),
            q)
          ) {
            n.framebufferRenderbuffer(
              n.READ_FRAMEBUFFER,
              n.COLOR_ATTACHMENT0,
              n.RENDERBUFFER,
              ct.__webglColorRenderbuffer[Mt]
            )
            const bt = i.get(x[Mt]).__webglTexture
            n.framebufferTexture2D(
              n.DRAW_FRAMEBUFFER,
              n.COLOR_ATTACHMENT0,
              n.TEXTURE_2D,
              bt,
              0
            )
          }
          ;(n.blitFramebuffer(0, 0, B, j, 0, 0, B, j, tt, n.NEAREST),
            c === !0 &&
              ((me.length = 0),
              (Je.length = 0),
              me.push(n.COLOR_ATTACHMENT0 + Mt),
              E.depthBuffer &&
                E.resolveDepthBuffer === !1 &&
                (me.push(it),
                Je.push(it),
                n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER, Je)),
              n.invalidateFramebuffer(n.READ_FRAMEBUFFER, me)))
        }
        if (
          (e.bindFramebuffer(n.READ_FRAMEBUFFER, null),
          e.bindFramebuffer(n.DRAW_FRAMEBUFFER, null),
          q)
        )
          for (let Mt = 0; Mt < x.length; Mt++) {
            ;(e.bindFramebuffer(
              n.FRAMEBUFFER,
              ct.__webglMultisampledFramebuffer
            ),
              n.framebufferRenderbuffer(
                n.FRAMEBUFFER,
                n.COLOR_ATTACHMENT0 + Mt,
                n.RENDERBUFFER,
                ct.__webglColorRenderbuffer[Mt]
              ))
            const bt = i.get(x[Mt]).__webglTexture
            ;(e.bindFramebuffer(n.FRAMEBUFFER, ct.__webglFramebuffer),
              n.framebufferTexture2D(
                n.DRAW_FRAMEBUFFER,
                n.COLOR_ATTACHMENT0 + Mt,
                n.TEXTURE_2D,
                bt,
                0
              ))
          }
        e.bindFramebuffer(n.DRAW_FRAMEBUFFER, ct.__webglMultisampledFramebuffer)
      } else if (E.depthBuffer && E.resolveDepthBuffer === !1 && c) {
        const x = E.stencilBuffer
          ? n.DEPTH_STENCIL_ATTACHMENT
          : n.DEPTH_ATTACHMENT
        n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER, [x])
      }
    }
  }
  function Ae(E) {
    return Math.min(s.maxSamples, E.samples)
  }
  function Kt(E) {
    const x = i.get(E)
    return (
      E.samples > 0 &&
      t.has('WEBGL_multisampled_render_to_texture') === !0 &&
      x.__useRenderToTexture !== !1
    )
  }
  function ue(E) {
    const x = a.render.frame
    u.get(E) !== x && (u.set(E, x), E.update())
  }
  function ft(E, x) {
    const B = E.colorSpace,
      j = E.format,
      tt = E.type
    return (
      E.isCompressedTexture === !0 ||
        E.isVideoTexture === !0 ||
        (B !== dr &&
          B !== ni &&
          ($t.getTransfer(B) === ne
            ? (j !== _n || tt !== an) &&
              Dt(
                'WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.'
              )
            : Zt('WebGLTextures: Unsupported texture color space:', B))),
      x
    )
  }
  function ge(E) {
    return (
      typeof HTMLImageElement < 'u' && E instanceof HTMLImageElement
        ? ((l.width = E.naturalWidth || E.width),
          (l.height = E.naturalHeight || E.height))
        : typeof VideoFrame < 'u' && E instanceof VideoFrame
          ? ((l.width = E.displayWidth), (l.height = E.displayHeight))
          : ((l.width = E.width), (l.height = E.height)),
      l
    )
  }
  ;((this.allocateTextureUnit = G),
    (this.resetTextureUnits = V),
    (this.getTextureUnits = W),
    (this.setTextureUnits = I),
    (this.setTexture2D = J),
    (this.setTexture2DArray = et),
    (this.setTexture3D = dt),
    (this.setTextureCube = Tt),
    (this.rebindTextures = fe),
    (this.setupRenderTarget = Yt),
    (this.updateRenderTargetMipmap = we),
    (this.updateMultisampleRenderTarget = U),
    (this.setupDepthRenderbuffer = se),
    (this.setupFrameBufferTexture = Ut),
    (this.useMultisampledRTT = Kt),
    (this.isReversedDepthBuffer = function () {
      return e.buffers.depth.getReversed()
    }))
}
function og(n, t) {
  function e(i, s = ni) {
    let r
    const a = $t.getTransfer(s)
    if (i === an) return n.UNSIGNED_BYTE
    if (i === So) return n.UNSIGNED_SHORT_4_4_4_4
    if (i === yo) return n.UNSIGNED_SHORT_5_5_5_1
    if (i === Bc) return n.UNSIGNED_INT_5_9_9_9_REV
    if (i === zc) return n.UNSIGNED_INT_10F_11F_11F_REV
    if (i === Fc) return n.BYTE
    if (i === Oc) return n.SHORT
    if (i === ms) return n.UNSIGNED_SHORT
    if (i === Mo) return n.INT
    if (i === Rn) return n.UNSIGNED_INT
    if (i === gn) return n.FLOAT
    if (i === Hn) return n.HALF_FLOAT
    if (i === kc) return n.ALPHA
    if (i === Gc) return n.RGB
    if (i === _n) return n.RGBA
    if (i === Vn) return n.DEPTH_COMPONENT
    if (i === xi) return n.DEPTH_STENCIL
    if (i === bo) return n.RED
    if (i === Eo) return n.RED_INTEGER
    if (i === Mi) return n.RG
    if (i === To) return n.RG_INTEGER
    if (i === wo) return n.RGBA_INTEGER
    if (i === tr || i === er || i === nr || i === ir)
      if (a === ne)
        if (((r = t.get('WEBGL_compressed_texture_s3tc_srgb')), r !== null)) {
          if (i === tr) return r.COMPRESSED_SRGB_S3TC_DXT1_EXT
          if (i === er) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT
          if (i === nr) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT
          if (i === ir) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT
        } else return null
      else if (((r = t.get('WEBGL_compressed_texture_s3tc')), r !== null)) {
        if (i === tr) return r.COMPRESSED_RGB_S3TC_DXT1_EXT
        if (i === er) return r.COMPRESSED_RGBA_S3TC_DXT1_EXT
        if (i === nr) return r.COMPRESSED_RGBA_S3TC_DXT3_EXT
        if (i === ir) return r.COMPRESSED_RGBA_S3TC_DXT5_EXT
      } else return null
    if (i === Pa || i === La || i === Da || i === Ia)
      if (((r = t.get('WEBGL_compressed_texture_pvrtc')), r !== null)) {
        if (i === Pa) return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG
        if (i === La) return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG
        if (i === Da) return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG
        if (i === Ia) return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
      } else return null
    if (
      i === Ua ||
      i === Na ||
      i === Fa ||
      i === Oa ||
      i === Ba ||
      i === cr ||
      i === za
    )
      if (((r = t.get('WEBGL_compressed_texture_etc')), r !== null)) {
        if (i === Ua || i === Na)
          return a === ne ? r.COMPRESSED_SRGB8_ETC2 : r.COMPRESSED_RGB8_ETC2
        if (i === Fa)
          return a === ne
            ? r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC
            : r.COMPRESSED_RGBA8_ETC2_EAC
        if (i === Oa) return r.COMPRESSED_R11_EAC
        if (i === Ba) return r.COMPRESSED_SIGNED_R11_EAC
        if (i === cr) return r.COMPRESSED_RG11_EAC
        if (i === za) return r.COMPRESSED_SIGNED_RG11_EAC
      } else return null
    if (
      i === ka ||
      i === Ga ||
      i === Ha ||
      i === Va ||
      i === Wa ||
      i === Xa ||
      i === qa ||
      i === Ya ||
      i === ja ||
      i === Ka ||
      i === $a ||
      i === Za ||
      i === Ja ||
      i === Qa
    )
      if (((r = t.get('WEBGL_compressed_texture_astc')), r !== null)) {
        if (i === ka)
          return a === ne
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR
            : r.COMPRESSED_RGBA_ASTC_4x4_KHR
        if (i === Ga)
          return a === ne
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR
            : r.COMPRESSED_RGBA_ASTC_5x4_KHR
        if (i === Ha)
          return a === ne
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR
            : r.COMPRESSED_RGBA_ASTC_5x5_KHR
        if (i === Va)
          return a === ne
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR
            : r.COMPRESSED_RGBA_ASTC_6x5_KHR
        if (i === Wa)
          return a === ne
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR
            : r.COMPRESSED_RGBA_ASTC_6x6_KHR
        if (i === Xa)
          return a === ne
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR
            : r.COMPRESSED_RGBA_ASTC_8x5_KHR
        if (i === qa)
          return a === ne
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR
            : r.COMPRESSED_RGBA_ASTC_8x6_KHR
        if (i === Ya)
          return a === ne
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR
            : r.COMPRESSED_RGBA_ASTC_8x8_KHR
        if (i === ja)
          return a === ne
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR
            : r.COMPRESSED_RGBA_ASTC_10x5_KHR
        if (i === Ka)
          return a === ne
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR
            : r.COMPRESSED_RGBA_ASTC_10x6_KHR
        if (i === $a)
          return a === ne
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR
            : r.COMPRESSED_RGBA_ASTC_10x8_KHR
        if (i === Za)
          return a === ne
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR
            : r.COMPRESSED_RGBA_ASTC_10x10_KHR
        if (i === Ja)
          return a === ne
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR
            : r.COMPRESSED_RGBA_ASTC_12x10_KHR
        if (i === Qa)
          return a === ne
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR
            : r.COMPRESSED_RGBA_ASTC_12x12_KHR
      } else return null
    if (i === to || i === eo || i === no)
      if (((r = t.get('EXT_texture_compression_bptc')), r !== null)) {
        if (i === to)
          return a === ne
            ? r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT
            : r.COMPRESSED_RGBA_BPTC_UNORM_EXT
        if (i === eo) return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT
        if (i === no) return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT
      } else return null
    if (i === io || i === so || i === hr || i === ro)
      if (((r = t.get('EXT_texture_compression_rgtc')), r !== null)) {
        if (i === io) return r.COMPRESSED_RED_RGTC1_EXT
        if (i === so) return r.COMPRESSED_SIGNED_RED_RGTC1_EXT
        if (i === hr) return r.COMPRESSED_RED_GREEN_RGTC2_EXT
        if (i === ro) return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT
      } else return null
    return i === gs ? n.UNSIGNED_INT_24_8 : n[i] !== void 0 ? n[i] : null
  }
  return { convert: e }
}
const lg = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`,
  cg = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`
class hg {
  constructor() {
    ;((this.texture = null),
      (this.mesh = null),
      (this.depthNear = 0),
      (this.depthFar = 0))
  }
  init(t, e) {
    if (this.texture === null) {
      const i = new Zc(t.texture)
      ;((t.depthNear !== e.depthNear || t.depthFar !== e.depthFar) &&
        ((this.depthNear = t.depthNear), (this.depthFar = t.depthFar)),
        (this.texture = i))
    }
  }
  getMesh(t) {
    if (this.texture !== null && this.mesh === null) {
      const e = t.cameras[0].viewport,
        i = new Pn({
          vertexShader: lg,
          fragmentShader: cg,
          uniforms: {
            depthColor: { value: this.texture },
            depthWidth: { value: e.z },
            depthHeight: { value: e.w },
          },
        })
      this.mesh = new Jt(new yr(20, 20), i)
    }
    return this.mesh
  }
  reset() {
    ;((this.texture = null), (this.mesh = null))
  }
  getDepthTexture() {
    return this.texture
  }
}
class ug extends li {
  constructor(t, e) {
    super()
    const i = this
    let s = null,
      r = 1,
      a = null,
      o = 'local-floor',
      c = 1,
      l = null,
      u = null,
      p = null,
      h = null,
      m = null,
      g = null
    const v = typeof XRWebGLBinding < 'u',
      f = new hg(),
      d = {},
      M = e.getContextAttributes()
    let T = null,
      w = null
    const C = [],
      A = [],
      y = new Nt()
    let _ = null
    const b = new sn()
    b.viewport = new xe()
    const P = new sn()
    P.viewport = new xe()
    const R = [b, P],
      N = new _d()
    let V = null,
      W = null
    ;((this.cameraAutoUpdate = !0),
      (this.enabled = !1),
      (this.isPresenting = !1),
      (this.getController = function (X) {
        let mt = C[X]
        return (
          mt === void 0 && ((mt = new zr()), (C[X] = mt)),
          mt.getTargetRaySpace()
        )
      }),
      (this.getControllerGrip = function (X) {
        let mt = C[X]
        return (
          mt === void 0 && ((mt = new zr()), (C[X] = mt)),
          mt.getGripSpace()
        )
      }),
      (this.getHand = function (X) {
        let mt = C[X]
        return (
          mt === void 0 && ((mt = new zr()), (C[X] = mt)),
          mt.getHandSpace()
        )
      }))
    function I(X) {
      const mt = A.indexOf(X.inputSource)
      if (mt === -1) return
      const at = C[mt]
      at !== void 0 &&
        (at.update(X.inputSource, X.frame, l || a),
        at.dispatchEvent({ type: X.type, data: X.inputSource }))
    }
    function G() {
      ;(s.removeEventListener('select', I),
        s.removeEventListener('selectstart', I),
        s.removeEventListener('selectend', I),
        s.removeEventListener('squeeze', I),
        s.removeEventListener('squeezestart', I),
        s.removeEventListener('squeezeend', I),
        s.removeEventListener('end', G),
        s.removeEventListener('inputsourceschange', O))
      for (let X = 0; X < C.length; X++) {
        const mt = A[X]
        mt !== null && ((A[X] = null), C[X].disconnect(mt))
      }
      ;((V = null), (W = null), f.reset())
      for (const X in d) delete d[X]
      ;(t.setRenderTarget(T),
        (m = null),
        (h = null),
        (p = null),
        (s = null),
        (w = null),
        _t.stop(),
        (i.isPresenting = !1),
        t.setPixelRatio(_),
        t.setSize(y.width, y.height, !1),
        i.dispatchEvent({ type: 'sessionend' }))
    }
    ;((this.setFramebufferScaleFactor = function (X) {
      ;((r = X),
        i.isPresenting === !0 &&
          Dt('WebXRManager: Cannot change framebuffer scale while presenting.'))
    }),
      (this.setReferenceSpaceType = function (X) {
        ;((o = X),
          i.isPresenting === !0 &&
            Dt(
              'WebXRManager: Cannot change reference space type while presenting.'
            ))
      }),
      (this.getReferenceSpace = function () {
        return l || a
      }),
      (this.setReferenceSpace = function (X) {
        l = X
      }),
      (this.getBaseLayer = function () {
        return h !== null ? h : m
      }),
      (this.getBinding = function () {
        return (p === null && v && (p = new XRWebGLBinding(s, e)), p)
      }),
      (this.getFrame = function () {
        return g
      }),
      (this.getSession = function () {
        return s
      }),
      (this.setSession = async function (X) {
        if (((s = X), s !== null)) {
          if (
            ((T = t.getRenderTarget()),
            s.addEventListener('select', I),
            s.addEventListener('selectstart', I),
            s.addEventListener('selectend', I),
            s.addEventListener('squeeze', I),
            s.addEventListener('squeezestart', I),
            s.addEventListener('squeezeend', I),
            s.addEventListener('end', G),
            s.addEventListener('inputsourceschange', O),
            M.xrCompatible !== !0 && (await e.makeXRCompatible()),
            (_ = t.getPixelRatio()),
            t.getSize(y),
            v && 'createProjectionLayer' in XRWebGLBinding.prototype)
          ) {
            let at = null,
              It = null,
              Bt = null
            M.depth &&
              ((Bt = M.stencil ? e.DEPTH24_STENCIL8 : e.DEPTH_COMPONENT24),
              (at = M.stencil ? xi : Vn),
              (It = M.stencil ? gs : Rn))
            const Ut = { colorFormat: e.RGBA8, depthFormat: Bt, scaleFactor: r }
            ;((p = this.getBinding()),
              (h = p.createProjectionLayer(Ut)),
              s.updateRenderState({ layers: [h] }),
              t.setPixelRatio(1),
              t.setSize(h.textureWidth, h.textureHeight, !1),
              (w = new An(h.textureWidth, h.textureHeight, {
                format: _n,
                type: an,
                depthTexture: new Yi(
                  h.textureWidth,
                  h.textureHeight,
                  It,
                  void 0,
                  void 0,
                  void 0,
                  void 0,
                  void 0,
                  void 0,
                  at
                ),
                stencilBuffer: M.stencil,
                colorSpace: t.outputColorSpace,
                samples: M.antialias ? 4 : 0,
                resolveDepthBuffer: h.ignoreDepthValues === !1,
                resolveStencilBuffer: h.ignoreDepthValues === !1,
              })))
          } else {
            const at = {
              antialias: M.antialias,
              alpha: !0,
              depth: M.depth,
              stencil: M.stencil,
              framebufferScaleFactor: r,
            }
            ;((m = new XRWebGLLayer(s, e, at)),
              s.updateRenderState({ baseLayer: m }),
              t.setPixelRatio(1),
              t.setSize(m.framebufferWidth, m.framebufferHeight, !1),
              (w = new An(m.framebufferWidth, m.framebufferHeight, {
                format: _n,
                type: an,
                colorSpace: t.outputColorSpace,
                stencilBuffer: M.stencil,
                resolveDepthBuffer: m.ignoreDepthValues === !1,
                resolveStencilBuffer: m.ignoreDepthValues === !1,
              })))
          }
          ;((w.isXRRenderTarget = !0),
            this.setFoveation(c),
            (l = null),
            (a = await s.requestReferenceSpace(o)),
            _t.setContext(s),
            _t.start(),
            (i.isPresenting = !0),
            i.dispatchEvent({ type: 'sessionstart' }))
        }
      }),
      (this.getEnvironmentBlendMode = function () {
        if (s !== null) return s.environmentBlendMode
      }),
      (this.getDepthTexture = function () {
        return f.getDepthTexture()
      }))
    function O(X) {
      for (let mt = 0; mt < X.removed.length; mt++) {
        const at = X.removed[mt],
          It = A.indexOf(at)
        It >= 0 && ((A[It] = null), C[It].disconnect(at))
      }
      for (let mt = 0; mt < X.added.length; mt++) {
        const at = X.added[mt]
        let It = A.indexOf(at)
        if (It === -1) {
          for (let Ut = 0; Ut < C.length; Ut++)
            if (Ut >= A.length) {
              ;(A.push(at), (It = Ut))
              break
            } else if (A[Ut] === null) {
              ;((A[Ut] = at), (It = Ut))
              break
            }
          if (It === -1) break
        }
        const Bt = C[It]
        Bt && Bt.connect(at)
      }
    }
    const J = new D(),
      et = new D()
    function dt(X, mt, at) {
      ;(J.setFromMatrixPosition(mt.matrixWorld),
        et.setFromMatrixPosition(at.matrixWorld))
      const It = J.distanceTo(et),
        Bt = mt.projectionMatrix.elements,
        Ut = at.projectionMatrix.elements,
        pe = Bt[14] / (Bt[10] - 1),
        jt = Bt[14] / (Bt[10] + 1),
        se = (Bt[9] + 1) / Bt[5],
        fe = (Bt[9] - 1) / Bt[5],
        Yt = (Bt[8] - 1) / Bt[0],
        we = (Ut[8] + 1) / Ut[0],
        me = pe * Yt,
        Je = pe * we,
        U = It / (-Yt + we),
        Ae = U * -Yt
      if (
        (mt.matrixWorld.decompose(X.position, X.quaternion, X.scale),
        X.translateX(Ae),
        X.translateZ(U),
        X.matrixWorld.compose(X.position, X.quaternion, X.scale),
        X.matrixWorldInverse.copy(X.matrixWorld).invert(),
        Bt[10] === -1)
      )
        (X.projectionMatrix.copy(mt.projectionMatrix),
          X.projectionMatrixInverse.copy(mt.projectionMatrixInverse))
      else {
        const Kt = pe + U,
          ue = jt + U,
          ft = me - Ae,
          ge = Je + (It - Ae),
          E = ((se * jt) / ue) * Kt,
          x = ((fe * jt) / ue) * Kt
        ;(X.projectionMatrix.makePerspective(ft, ge, E, x, Kt, ue),
          X.projectionMatrixInverse.copy(X.projectionMatrix).invert())
      }
    }
    function Tt(X, mt) {
      ;(mt === null
        ? X.matrixWorld.copy(X.matrix)
        : X.matrixWorld.multiplyMatrices(mt.matrixWorld, X.matrix),
        X.matrixWorldInverse.copy(X.matrixWorld).invert())
    }
    this.updateCamera = function (X) {
      if (s === null) return
      let mt = X.near,
        at = X.far
      ;(f.texture !== null &&
        (f.depthNear > 0 && (mt = f.depthNear),
        f.depthFar > 0 && (at = f.depthFar)),
        (N.near = P.near = b.near = mt),
        (N.far = P.far = b.far = at),
        (V !== N.near || W !== N.far) &&
          (s.updateRenderState({ depthNear: N.near, depthFar: N.far }),
          (V = N.near),
          (W = N.far)),
        (N.layers.mask = X.layers.mask | 6),
        (b.layers.mask = N.layers.mask & -5),
        (P.layers.mask = N.layers.mask & -3))
      const It = X.parent,
        Bt = N.cameras
      Tt(N, It)
      for (let Ut = 0; Ut < Bt.length; Ut++) Tt(Bt[Ut], It)
      ;(Bt.length === 2
        ? dt(N, b, P)
        : N.projectionMatrix.copy(b.projectionMatrix),
        Rt(X, N, It))
    }
    function Rt(X, mt, at) {
      ;(at === null
        ? X.matrix.copy(mt.matrixWorld)
        : (X.matrix.copy(at.matrixWorld),
          X.matrix.invert(),
          X.matrix.multiply(mt.matrixWorld)),
        X.matrix.decompose(X.position, X.quaternion, X.scale),
        X.updateMatrixWorld(!0),
        X.projectionMatrix.copy(mt.projectionMatrix),
        X.projectionMatrixInverse.copy(mt.projectionMatrixInverse),
        X.isPerspectiveCamera &&
          ((X.fov = xs * 2 * Math.atan(1 / X.projectionMatrix.elements[5])),
          (X.zoom = 1)))
    }
    ;((this.getCamera = function () {
      return N
    }),
      (this.getFoveation = function () {
        if (!(h === null && m === null)) return c
      }),
      (this.setFoveation = function (X) {
        ;((c = X),
          h !== null && (h.fixedFoveation = X),
          m !== null && m.fixedFoveation !== void 0 && (m.fixedFoveation = X))
      }),
      (this.hasDepthSensing = function () {
        return f.texture !== null
      }),
      (this.getDepthSensingMesh = function () {
        return f.getMesh(N)
      }),
      (this.getCameraTexture = function (X) {
        return d[X]
      }))
    let nt = null
    function vt(X, mt) {
      if (((u = mt.getViewerPose(l || a)), (g = mt), u !== null)) {
        const at = u.views
        m !== null &&
          (t.setRenderTargetFramebuffer(w, m.framebuffer), t.setRenderTarget(w))
        let It = !1
        at.length !== N.cameras.length && ((N.cameras.length = 0), (It = !0))
        for (let jt = 0; jt < at.length; jt++) {
          const se = at[jt]
          let fe = null
          if (m !== null) fe = m.getViewport(se)
          else {
            const we = p.getViewSubImage(h, se)
            ;((fe = we.viewport),
              jt === 0 &&
                (t.setRenderTargetTextures(
                  w,
                  we.colorTexture,
                  we.depthStencilTexture
                ),
                t.setRenderTarget(w)))
          }
          let Yt = R[jt]
          ;(Yt === void 0 &&
            ((Yt = new sn()),
            Yt.layers.enable(jt),
            (Yt.viewport = new xe()),
            (R[jt] = Yt)),
            Yt.matrix.fromArray(se.transform.matrix),
            Yt.matrix.decompose(Yt.position, Yt.quaternion, Yt.scale),
            Yt.projectionMatrix.fromArray(se.projectionMatrix),
            Yt.projectionMatrixInverse.copy(Yt.projectionMatrix).invert(),
            Yt.viewport.set(fe.x, fe.y, fe.width, fe.height),
            jt === 0 &&
              (N.matrix.copy(Yt.matrix),
              N.matrix.decompose(N.position, N.quaternion, N.scale)),
            It === !0 && N.cameras.push(Yt))
        }
        const Bt = s.enabledFeatures
        if (
          Bt &&
          Bt.includes('depth-sensing') &&
          s.depthUsage == 'gpu-optimized' &&
          v
        ) {
          p = i.getBinding()
          const jt = p.getDepthInformation(at[0])
          jt && jt.isValid && jt.texture && f.init(jt, s.renderState)
        }
        if (Bt && Bt.includes('camera-access') && v) {
          ;(t.state.unbindTexture(), (p = i.getBinding()))
          for (let jt = 0; jt < at.length; jt++) {
            const se = at[jt].camera
            if (se) {
              let fe = d[se]
              fe || ((fe = new Zc()), (d[se] = fe))
              const Yt = p.getCameraImage(se)
              fe.sourceTexture = Yt
            }
          }
        }
      }
      for (let at = 0; at < C.length; at++) {
        const It = A[at],
          Bt = C[at]
        It !== null && Bt !== void 0 && Bt.update(It, mt, l || a)
      }
      ;(nt && nt(X, mt),
        mt.detectedPlanes &&
          i.dispatchEvent({ type: 'planesdetected', data: mt }),
        (g = null))
    }
    const _t = new nh()
    ;(_t.setAnimationLoop(vt),
      (this.setAnimationLoop = function (X) {
        nt = X
      }),
      (this.dispose = function () {}))
  }
}
const dg = new le(),
  ch = new zt()
ch.set(-1, 0, 0, 0, 1, 0, 0, 0, 1)
function fg(n, t) {
  function e(f, d) {
    ;(f.matrixAutoUpdate === !0 && f.updateMatrix(), d.value.copy(f.matrix))
  }
  function i(f, d) {
    ;(d.color.getRGB(f.fogColor.value, Jc(n)),
      d.isFog
        ? ((f.fogNear.value = d.near), (f.fogFar.value = d.far))
        : d.isFogExp2 && (f.fogDensity.value = d.density))
  }
  function s(f, d, M, T, w) {
    d.isNodeMaterial
      ? (d.uniformsNeedUpdate = !1)
      : d.isMeshBasicMaterial
        ? r(f, d)
        : d.isMeshLambertMaterial
          ? (r(f, d), d.envMap && (f.envMapIntensity.value = d.envMapIntensity))
          : d.isMeshToonMaterial
            ? (r(f, d), p(f, d))
            : d.isMeshPhongMaterial
              ? (r(f, d),
                u(f, d),
                d.envMap && (f.envMapIntensity.value = d.envMapIntensity))
              : d.isMeshStandardMaterial
                ? (r(f, d), h(f, d), d.isMeshPhysicalMaterial && m(f, d, w))
                : d.isMeshMatcapMaterial
                  ? (r(f, d), g(f, d))
                  : d.isMeshDepthMaterial
                    ? r(f, d)
                    : d.isMeshDistanceMaterial
                      ? (r(f, d), v(f, d))
                      : d.isMeshNormalMaterial
                        ? r(f, d)
                        : d.isLineBasicMaterial
                          ? (a(f, d), d.isLineDashedMaterial && o(f, d))
                          : d.isPointsMaterial
                            ? c(f, d, M, T)
                            : d.isSpriteMaterial
                              ? l(f, d)
                              : d.isShadowMaterial
                                ? (f.color.value.copy(d.color),
                                  (f.opacity.value = d.opacity))
                                : d.isShaderMaterial &&
                                  (d.uniformsNeedUpdate = !1)
  }
  function r(f, d) {
    ;((f.opacity.value = d.opacity),
      d.color && f.diffuse.value.copy(d.color),
      d.emissive &&
        f.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),
      d.map && ((f.map.value = d.map), e(d.map, f.mapTransform)),
      d.alphaMap &&
        ((f.alphaMap.value = d.alphaMap), e(d.alphaMap, f.alphaMapTransform)),
      d.bumpMap &&
        ((f.bumpMap.value = d.bumpMap),
        e(d.bumpMap, f.bumpMapTransform),
        (f.bumpScale.value = d.bumpScale),
        d.side === qe && (f.bumpScale.value *= -1)),
      d.normalMap &&
        ((f.normalMap.value = d.normalMap),
        e(d.normalMap, f.normalMapTransform),
        f.normalScale.value.copy(d.normalScale),
        d.side === qe && f.normalScale.value.negate()),
      d.displacementMap &&
        ((f.displacementMap.value = d.displacementMap),
        e(d.displacementMap, f.displacementMapTransform),
        (f.displacementScale.value = d.displacementScale),
        (f.displacementBias.value = d.displacementBias)),
      d.emissiveMap &&
        ((f.emissiveMap.value = d.emissiveMap),
        e(d.emissiveMap, f.emissiveMapTransform)),
      d.specularMap &&
        ((f.specularMap.value = d.specularMap),
        e(d.specularMap, f.specularMapTransform)),
      d.alphaTest > 0 && (f.alphaTest.value = d.alphaTest))
    const M = t.get(d),
      T = M.envMap,
      w = M.envMapRotation
    ;(T &&
      ((f.envMap.value = T),
      f.envMapRotation.value
        .setFromMatrix4(dg.makeRotationFromEuler(w))
        .transpose(),
      T.isCubeTexture &&
        T.isRenderTargetTexture === !1 &&
        f.envMapRotation.value.premultiply(ch),
      (f.reflectivity.value = d.reflectivity),
      (f.ior.value = d.ior),
      (f.refractionRatio.value = d.refractionRatio)),
      d.lightMap &&
        ((f.lightMap.value = d.lightMap),
        (f.lightMapIntensity.value = d.lightMapIntensity),
        e(d.lightMap, f.lightMapTransform)),
      d.aoMap &&
        ((f.aoMap.value = d.aoMap),
        (f.aoMapIntensity.value = d.aoMapIntensity),
        e(d.aoMap, f.aoMapTransform)))
  }
  function a(f, d) {
    ;(f.diffuse.value.copy(d.color),
      (f.opacity.value = d.opacity),
      d.map && ((f.map.value = d.map), e(d.map, f.mapTransform)))
  }
  function o(f, d) {
    ;((f.dashSize.value = d.dashSize),
      (f.totalSize.value = d.dashSize + d.gapSize),
      (f.scale.value = d.scale))
  }
  function c(f, d, M, T) {
    ;(f.diffuse.value.copy(d.color),
      (f.opacity.value = d.opacity),
      (f.size.value = d.size * M),
      (f.scale.value = T * 0.5),
      d.map && ((f.map.value = d.map), e(d.map, f.uvTransform)),
      d.alphaMap &&
        ((f.alphaMap.value = d.alphaMap), e(d.alphaMap, f.alphaMapTransform)),
      d.alphaTest > 0 && (f.alphaTest.value = d.alphaTest))
  }
  function l(f, d) {
    ;(f.diffuse.value.copy(d.color),
      (f.opacity.value = d.opacity),
      (f.rotation.value = d.rotation),
      d.map && ((f.map.value = d.map), e(d.map, f.mapTransform)),
      d.alphaMap &&
        ((f.alphaMap.value = d.alphaMap), e(d.alphaMap, f.alphaMapTransform)),
      d.alphaTest > 0 && (f.alphaTest.value = d.alphaTest))
  }
  function u(f, d) {
    ;(f.specular.value.copy(d.specular),
      (f.shininess.value = Math.max(d.shininess, 1e-4)))
  }
  function p(f, d) {
    d.gradientMap && (f.gradientMap.value = d.gradientMap)
  }
  function h(f, d) {
    ;((f.metalness.value = d.metalness),
      d.metalnessMap &&
        ((f.metalnessMap.value = d.metalnessMap),
        e(d.metalnessMap, f.metalnessMapTransform)),
      (f.roughness.value = d.roughness),
      d.roughnessMap &&
        ((f.roughnessMap.value = d.roughnessMap),
        e(d.roughnessMap, f.roughnessMapTransform)),
      d.envMap && (f.envMapIntensity.value = d.envMapIntensity))
  }
  function m(f, d, M) {
    ;((f.ior.value = d.ior),
      d.sheen > 0 &&
        (f.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),
        (f.sheenRoughness.value = d.sheenRoughness),
        d.sheenColorMap &&
          ((f.sheenColorMap.value = d.sheenColorMap),
          e(d.sheenColorMap, f.sheenColorMapTransform)),
        d.sheenRoughnessMap &&
          ((f.sheenRoughnessMap.value = d.sheenRoughnessMap),
          e(d.sheenRoughnessMap, f.sheenRoughnessMapTransform))),
      d.clearcoat > 0 &&
        ((f.clearcoat.value = d.clearcoat),
        (f.clearcoatRoughness.value = d.clearcoatRoughness),
        d.clearcoatMap &&
          ((f.clearcoatMap.value = d.clearcoatMap),
          e(d.clearcoatMap, f.clearcoatMapTransform)),
        d.clearcoatRoughnessMap &&
          ((f.clearcoatRoughnessMap.value = d.clearcoatRoughnessMap),
          e(d.clearcoatRoughnessMap, f.clearcoatRoughnessMapTransform)),
        d.clearcoatNormalMap &&
          ((f.clearcoatNormalMap.value = d.clearcoatNormalMap),
          e(d.clearcoatNormalMap, f.clearcoatNormalMapTransform),
          f.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),
          d.side === qe && f.clearcoatNormalScale.value.negate())),
      d.dispersion > 0 && (f.dispersion.value = d.dispersion),
      d.iridescence > 0 &&
        ((f.iridescence.value = d.iridescence),
        (f.iridescenceIOR.value = d.iridescenceIOR),
        (f.iridescenceThicknessMinimum.value = d.iridescenceThicknessRange[0]),
        (f.iridescenceThicknessMaximum.value = d.iridescenceThicknessRange[1]),
        d.iridescenceMap &&
          ((f.iridescenceMap.value = d.iridescenceMap),
          e(d.iridescenceMap, f.iridescenceMapTransform)),
        d.iridescenceThicknessMap &&
          ((f.iridescenceThicknessMap.value = d.iridescenceThicknessMap),
          e(d.iridescenceThicknessMap, f.iridescenceThicknessMapTransform))),
      d.transmission > 0 &&
        ((f.transmission.value = d.transmission),
        (f.transmissionSamplerMap.value = M.texture),
        f.transmissionSamplerSize.value.set(M.width, M.height),
        d.transmissionMap &&
          ((f.transmissionMap.value = d.transmissionMap),
          e(d.transmissionMap, f.transmissionMapTransform)),
        (f.thickness.value = d.thickness),
        d.thicknessMap &&
          ((f.thicknessMap.value = d.thicknessMap),
          e(d.thicknessMap, f.thicknessMapTransform)),
        (f.attenuationDistance.value = d.attenuationDistance),
        f.attenuationColor.value.copy(d.attenuationColor)),
      d.anisotropy > 0 &&
        (f.anisotropyVector.value.set(
          d.anisotropy * Math.cos(d.anisotropyRotation),
          d.anisotropy * Math.sin(d.anisotropyRotation)
        ),
        d.anisotropyMap &&
          ((f.anisotropyMap.value = d.anisotropyMap),
          e(d.anisotropyMap, f.anisotropyMapTransform))),
      (f.specularIntensity.value = d.specularIntensity),
      f.specularColor.value.copy(d.specularColor),
      d.specularColorMap &&
        ((f.specularColorMap.value = d.specularColorMap),
        e(d.specularColorMap, f.specularColorMapTransform)),
      d.specularIntensityMap &&
        ((f.specularIntensityMap.value = d.specularIntensityMap),
        e(d.specularIntensityMap, f.specularIntensityMapTransform)))
  }
  function g(f, d) {
    d.matcap && (f.matcap.value = d.matcap)
  }
  function v(f, d) {
    const M = t.get(d).light
    ;(f.referencePosition.value.setFromMatrixPosition(M.matrixWorld),
      (f.nearDistance.value = M.shadow.camera.near),
      (f.farDistance.value = M.shadow.camera.far))
  }
  return { refreshFogUniforms: i, refreshMaterialUniforms: s }
}
function pg(n, t, e, i) {
  let s = {},
    r = {},
    a = []
  const o = n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS)
  function c(M, T) {
    const w = T.program
    i.uniformBlockBinding(M, w)
  }
  function l(M, T) {
    let w = s[M.id]
    w === void 0 &&
      (g(M), (w = u(M)), (s[M.id] = w), M.addEventListener('dispose', f))
    const C = T.program
    i.updateUBOMapping(M, C)
    const A = t.render.frame
    r[M.id] !== A && (h(M), (r[M.id] = A))
  }
  function u(M) {
    const T = p()
    M.__bindingPointIndex = T
    const w = n.createBuffer(),
      C = M.__size,
      A = M.usage
    return (
      n.bindBuffer(n.UNIFORM_BUFFER, w),
      n.bufferData(n.UNIFORM_BUFFER, C, A),
      n.bindBuffer(n.UNIFORM_BUFFER, null),
      n.bindBufferBase(n.UNIFORM_BUFFER, T, w),
      w
    )
  }
  function p() {
    for (let M = 0; M < o; M++) if (a.indexOf(M) === -1) return (a.push(M), M)
    return (
      Zt(
        'WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.'
      ),
      0
    )
  }
  function h(M) {
    const T = s[M.id],
      w = M.uniforms,
      C = M.__cache
    n.bindBuffer(n.UNIFORM_BUFFER, T)
    for (let A = 0, y = w.length; A < y; A++) {
      const _ = Array.isArray(w[A]) ? w[A] : [w[A]]
      for (let b = 0, P = _.length; b < P; b++) {
        const R = _[b]
        if (m(R, A, b, C) === !0) {
          const N = R.__offset,
            V = Array.isArray(R.value) ? R.value : [R.value]
          let W = 0
          for (let I = 0; I < V.length; I++) {
            const G = V[I],
              O = v(G)
            typeof G == 'number' || typeof G == 'boolean'
              ? ((R.__data[0] = G),
                n.bufferSubData(n.UNIFORM_BUFFER, N + W, R.__data))
              : G.isMatrix3
                ? ((R.__data[0] = G.elements[0]),
                  (R.__data[1] = G.elements[1]),
                  (R.__data[2] = G.elements[2]),
                  (R.__data[3] = 0),
                  (R.__data[4] = G.elements[3]),
                  (R.__data[5] = G.elements[4]),
                  (R.__data[6] = G.elements[5]),
                  (R.__data[7] = 0),
                  (R.__data[8] = G.elements[6]),
                  (R.__data[9] = G.elements[7]),
                  (R.__data[10] = G.elements[8]),
                  (R.__data[11] = 0))
                : ArrayBuffer.isView(G)
                  ? R.__data.set(
                      new G.constructor(G.buffer, G.byteOffset, R.__data.length)
                    )
                  : (G.toArray(R.__data, W),
                    (W += O.storage / Float32Array.BYTES_PER_ELEMENT))
          }
          n.bufferSubData(n.UNIFORM_BUFFER, N, R.__data)
        }
      }
    }
    n.bindBuffer(n.UNIFORM_BUFFER, null)
  }
  function m(M, T, w, C) {
    const A = M.value,
      y = T + '_' + w
    if (C[y] === void 0)
      return (
        typeof A == 'number' || typeof A == 'boolean'
          ? (C[y] = A)
          : ArrayBuffer.isView(A)
            ? (C[y] = A.slice())
            : (C[y] = A.clone()),
        !0
      )
    {
      const _ = C[y]
      if (typeof A == 'number' || typeof A == 'boolean') {
        if (_ !== A) return ((C[y] = A), !0)
      } else {
        if (ArrayBuffer.isView(A)) return !0
        if (_.equals(A) === !1) return (_.copy(A), !0)
      }
    }
    return !1
  }
  function g(M) {
    const T = M.uniforms
    let w = 0
    const C = 16
    for (let y = 0, _ = T.length; y < _; y++) {
      const b = Array.isArray(T[y]) ? T[y] : [T[y]]
      for (let P = 0, R = b.length; P < R; P++) {
        const N = b[P],
          V = Array.isArray(N.value) ? N.value : [N.value]
        for (let W = 0, I = V.length; W < I; W++) {
          const G = V[W],
            O = v(G),
            J = w % C,
            et = J % O.boundary,
            dt = J + et
          ;((w += et),
            dt !== 0 && C - dt < O.storage && (w += C - dt),
            (N.__data = new Float32Array(
              O.storage / Float32Array.BYTES_PER_ELEMENT
            )),
            (N.__offset = w),
            (w += O.storage))
        }
      }
    }
    const A = w % C
    return (A > 0 && (w += C - A), (M.__size = w), (M.__cache = {}), this)
  }
  function v(M) {
    const T = { boundary: 0, storage: 0 }
    return (
      typeof M == 'number' || typeof M == 'boolean'
        ? ((T.boundary = 4), (T.storage = 4))
        : M.isVector2
          ? ((T.boundary = 8), (T.storage = 8))
          : M.isVector3 || M.isColor
            ? ((T.boundary = 16), (T.storage = 12))
            : M.isVector4
              ? ((T.boundary = 16), (T.storage = 16))
              : M.isMatrix3
                ? ((T.boundary = 48), (T.storage = 48))
                : M.isMatrix4
                  ? ((T.boundary = 64), (T.storage = 64))
                  : M.isTexture
                    ? Dt(
                        'WebGLRenderer: Texture samplers can not be part of an uniforms group.'
                      )
                    : ArrayBuffer.isView(M)
                      ? ((T.boundary = 16), (T.storage = M.byteLength))
                      : Dt('WebGLRenderer: Unsupported uniform value type.', M),
      T
    )
  }
  function f(M) {
    const T = M.target
    T.removeEventListener('dispose', f)
    const w = a.indexOf(T.__bindingPointIndex)
    ;(a.splice(w, 1), n.deleteBuffer(s[T.id]), delete s[T.id], delete r[T.id])
  }
  function d() {
    for (const M in s) n.deleteBuffer(s[M])
    ;((a = []), (s = {}), (r = {}))
  }
  return { bind: c, update: l, dispose: d }
}
const mg = new Uint16Array([
  12469, 15057, 12620, 14925, 13266, 14620, 13807, 14376, 14323, 13990, 14545,
  13625, 14713, 13328, 14840, 12882, 14931, 12528, 14996, 12233, 15039, 11829,
  15066, 11525, 15080, 11295, 15085, 10976, 15082, 10705, 15073, 10495, 13880,
  14564, 13898, 14542, 13977, 14430, 14158, 14124, 14393, 13732, 14556, 13410,
  14702, 12996, 14814, 12596, 14891, 12291, 14937, 11834, 14957, 11489, 14958,
  11194, 14943, 10803, 14921, 10506, 14893, 10278, 14858, 9960, 14484, 14039,
  14487, 14025, 14499, 13941, 14524, 13740, 14574, 13468, 14654, 13106, 14743,
  12678, 14818, 12344, 14867, 11893, 14889, 11509, 14893, 11180, 14881, 10751,
  14852, 10428, 14812, 10128, 14765, 9754, 14712, 9466, 14764, 13480, 14764,
  13475, 14766, 13440, 14766, 13347, 14769, 13070, 14786, 12713, 14816, 12387,
  14844, 11957, 14860, 11549, 14868, 11215, 14855, 10751, 14825, 10403, 14782,
  10044, 14729, 9651, 14666, 9352, 14599, 9029, 14967, 12835, 14966, 12831,
  14963, 12804, 14954, 12723, 14936, 12564, 14917, 12347, 14900, 11958, 14886,
  11569, 14878, 11247, 14859, 10765, 14828, 10401, 14784, 10011, 14727, 9600,
  14660, 9289, 14586, 8893, 14508, 8533, 15111, 12234, 15110, 12234, 15104,
  12216, 15092, 12156, 15067, 12010, 15028, 11776, 14981, 11500, 14942, 11205,
  14902, 10752, 14861, 10393, 14812, 9991, 14752, 9570, 14682, 9252, 14603,
  8808, 14519, 8445, 14431, 8145, 15209, 11449, 15208, 11451, 15202, 11451,
  15190, 11438, 15163, 11384, 15117, 11274, 15055, 10979, 14994, 10648, 14932,
  10343, 14871, 9936, 14803, 9532, 14729, 9218, 14645, 8742, 14556, 8381, 14461,
  8020, 14365, 7603, 15273, 10603, 15272, 10607, 15267, 10619, 15256, 10631,
  15231, 10614, 15182, 10535, 15118, 10389, 15042, 10167, 14963, 9787, 14883,
  9447, 14800, 9115, 14710, 8665, 14615, 8318, 14514, 7911, 14411, 7507, 14279,
  7198, 15314, 9675, 15313, 9683, 15309, 9712, 15298, 9759, 15277, 9797, 15229,
  9773, 15166, 9668, 15084, 9487, 14995, 9274, 14898, 8910, 14800, 8539, 14697,
  8234, 14590, 7790, 14479, 7409, 14367, 7067, 14178, 6621, 15337, 8619, 15337,
  8631, 15333, 8677, 15325, 8769, 15305, 8871, 15264, 8940, 15202, 8909, 15119,
  8775, 15022, 8565, 14916, 8328, 14804, 8009, 14688, 7614, 14569, 7287, 14448,
  6888, 14321, 6483, 14088, 6171, 15350, 7402, 15350, 7419, 15347, 7480, 15340,
  7613, 15322, 7804, 15287, 7973, 15229, 8057, 15148, 8012, 15046, 7846, 14933,
  7611, 14810, 7357, 14682, 7069, 14552, 6656, 14421, 6316, 14251, 5948, 14007,
  5528, 15356, 5942, 15356, 5977, 15353, 6119, 15348, 6294, 15332, 6551, 15302,
  6824, 15249, 7044, 15171, 7122, 15070, 7050, 14949, 6861, 14818, 6611, 14679,
  6349, 14538, 6067, 14398, 5651, 14189, 5311, 13935, 4958, 15359, 4123, 15359,
  4153, 15356, 4296, 15353, 4646, 15338, 5160, 15311, 5508, 15263, 5829, 15188,
  6042, 15088, 6094, 14966, 6001, 14826, 5796, 14678, 5543, 14527, 5287, 14377,
  4985, 14133, 4586, 13869, 4257, 15360, 1563, 15360, 1642, 15358, 2076, 15354,
  2636, 15341, 3350, 15317, 4019, 15273, 4429, 15203, 4732, 15105, 4911, 14981,
  4932, 14836, 4818, 14679, 4621, 14517, 4386, 14359, 4156, 14083, 3795, 13808,
  3437, 15360, 122, 15360, 137, 15358, 285, 15355, 636, 15344, 1274, 15322,
  2177, 15281, 2765, 15215, 3223, 15120, 3451, 14995, 3569, 14846, 3567, 14681,
  3466, 14511, 3305, 14344, 3121, 14037, 2800, 13753, 2467, 15360, 0, 15360, 1,
  15359, 21, 15355, 89, 15346, 253, 15325, 479, 15287, 796, 15225, 1148, 15133,
  1492, 15008, 1749, 14856, 1882, 14685, 1886, 14506, 1783, 14324, 1608, 13996,
  1398, 13702, 1183,
])
let bn = null
function gg() {
  return (
    bn === null &&
      ((bn = new jc(mg, 16, 16, Mi, Hn)),
      (bn.name = 'DFG_LUT'),
      (bn.minFilter = Ge),
      (bn.magFilter = Ge),
      (bn.wrapS = Bn),
      (bn.wrapT = Bn),
      (bn.generateMipmaps = !1),
      (bn.needsUpdate = !0)),
    bn
  )
}
class _g {
  constructor(t = {}) {
    const {
      canvas: e = du(),
      context: i = null,
      depth: s = !0,
      stencil: r = !1,
      alpha: a = !1,
      antialias: o = !1,
      premultipliedAlpha: c = !0,
      preserveDrawingBuffer: l = !1,
      powerPreference: u = 'default',
      failIfMajorPerformanceCaveat: p = !1,
      reversedDepthBuffer: h = !1,
      outputBufferType: m = an,
    } = t
    this.isWebGLRenderer = !0
    let g
    if (i !== null) {
      if (
        typeof WebGLRenderingContext < 'u' &&
        i instanceof WebGLRenderingContext
      )
        throw new Error(
          'THREE.WebGLRenderer: WebGL 1 is not supported since r163.'
        )
      g = i.getContextAttributes().alpha
    } else g = a
    const v = m,
      f = new Set([wo, To, Eo]),
      d = new Set([an, Rn, ms, gs, So, yo]),
      M = new Uint32Array(4),
      T = new Int32Array(4),
      w = new D()
    let C = null,
      A = null
    const y = [],
      _ = []
    let b = null
    ;((this.domElement = e),
      (this.debug = { checkShaderErrors: !0, onShaderError: null }),
      (this.autoClear = !0),
      (this.autoClearColor = !0),
      (this.autoClearDepth = !0),
      (this.autoClearStencil = !0),
      (this.sortObjects = !0),
      (this.clippingPlanes = []),
      (this.localClippingEnabled = !1),
      (this.toneMapping = wn),
      (this.toneMappingExposure = 1),
      (this.transmissionResolutionScale = 1))
    const P = this
    let R = !1,
      N = null
    this._outputColorSpace = Ke
    let V = 0,
      W = 0,
      I = null,
      G = -1,
      O = null
    const J = new xe(),
      et = new xe()
    let dt = null
    const Tt = new Ot(0)
    let Rt = 0,
      nt = e.width,
      vt = e.height,
      _t = 1,
      X = null,
      mt = null
    const at = new xe(0, 0, nt, vt),
      It = new xe(0, 0, nt, vt)
    let Bt = !1
    const Ut = new Uo()
    let pe = !1,
      jt = !1
    const se = new le(),
      fe = new D(),
      Yt = new xe(),
      we = {
        background: null,
        fog: null,
        environment: null,
        overrideMaterial: null,
        isScene: !0,
      }
    let me = !1
    function Je() {
      return I === null ? _t : 1
    }
    let U = i
    function Ae(S, F) {
      return e.getContext(S, F)
    }
    try {
      const S = {
        alpha: !0,
        depth: s,
        stencil: r,
        antialias: o,
        premultipliedAlpha: c,
        preserveDrawingBuffer: l,
        powerPreference: u,
        failIfMajorPerformanceCaveat: p,
      }
      if (
        ('setAttribute' in e &&
          e.setAttribute('data-engine', `three.js r${_o}`),
        e.addEventListener('webglcontextlost', Q, !1),
        e.addEventListener('webglcontextrestored', Ct, !1),
        e.addEventListener('webglcontextcreationerror', kt, !1),
        U === null)
      ) {
        const F = 'webgl2'
        if (((U = Ae(F, S)), U === null))
          throw Ae(F)
            ? new Error(
                'Error creating WebGL context with your selected attributes.'
              )
            : new Error('Error creating WebGL context.')
      }
    } catch (S) {
      throw (Zt('WebGLRenderer: ' + S.message), S)
    }
    let Kt,
      ue,
      ft,
      ge,
      E,
      x,
      B,
      j,
      tt,
      it,
      ct,
      q,
      K,
      Mt,
      bt,
      ot,
      st,
      Ft,
      Ht,
      ee,
      L,
      rt,
      Y
    function St() {
      ;((Kt = new gm(U)),
        Kt.init(),
        (L = new og(U, Kt)),
        (ue = new lm(U, Kt, t, L)),
        (ft = new rg(U, Kt)),
        ue.reversedDepthBuffer && h && ft.buffers.depth.setReversed(!0),
        (ge = new vm(U)),
        (E = new X0()),
        (x = new ag(U, Kt, ft, E, ue, L, ge)),
        (B = new mm(P)),
        (j = new yd(U)),
        (rt = new am(U, j)),
        (tt = new _m(U, j, ge, rt)),
        (it = new Sm(U, tt, j, rt, ge)),
        (Ft = new Mm(U, ue, x)),
        (bt = new cm(E)),
        (ct = new W0(P, B, Kt, ue, rt, bt)),
        (q = new fg(P, E)),
        (K = new Y0()),
        (Mt = new Q0(Kt)),
        (st = new rm(P, B, ft, it, g, c)),
        (ot = new sg(P, it, ue)),
        (Y = new pg(U, ge, ue, ft)),
        (Ht = new om(U, Kt, ge)),
        (ee = new xm(U, Kt, ge)),
        (ge.programs = ct.programs),
        (P.capabilities = ue),
        (P.extensions = Kt),
        (P.properties = E),
        (P.renderLists = K),
        (P.shadowMap = ot),
        (P.state = ft),
        (P.info = ge))
    }
    ;(St(), v !== an && (b = new bm(v, e.width, e.height, s, r)))
    const lt = new ug(P, U)
    ;((this.xr = lt),
      (this.getContext = function () {
        return U
      }),
      (this.getContextAttributes = function () {
        return U.getContextAttributes()
      }),
      (this.forceContextLoss = function () {
        const S = Kt.get('WEBGL_lose_context')
        S && S.loseContext()
      }),
      (this.forceContextRestore = function () {
        const S = Kt.get('WEBGL_lose_context')
        S && S.restoreContext()
      }),
      (this.getPixelRatio = function () {
        return _t
      }),
      (this.setPixelRatio = function (S) {
        S !== void 0 && ((_t = S), this.setSize(nt, vt, !1))
      }),
      (this.getSize = function (S) {
        return S.set(nt, vt)
      }),
      (this.setSize = function (S, F, H = !0) {
        if (lt.isPresenting) {
          Dt("WebGLRenderer: Can't change size while VR device is presenting.")
          return
        }
        ;((nt = S),
          (vt = F),
          (e.width = Math.floor(S * _t)),
          (e.height = Math.floor(F * _t)),
          H === !0 && ((e.style.width = S + 'px'), (e.style.height = F + 'px')),
          b !== null && b.setSize(e.width, e.height),
          this.setViewport(0, 0, S, F))
      }),
      (this.getDrawingBufferSize = function (S) {
        return S.set(nt * _t, vt * _t).floor()
      }),
      (this.setDrawingBufferSize = function (S, F, H) {
        ;((nt = S),
          (vt = F),
          (_t = H),
          (e.width = Math.floor(S * H)),
          (e.height = Math.floor(F * H)),
          this.setViewport(0, 0, S, F))
      }),
      (this.setEffects = function (S) {
        if (v === an) {
          Zt(
            'THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.'
          )
          return
        }
        if (S) {
          for (let F = 0; F < S.length; F++)
            if (S[F].isOutputPass === !0) {
              Dt(
                'THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.'
              )
              break
            }
        }
        b.setEffects(S || [])
      }),
      (this.getCurrentViewport = function (S) {
        return S.copy(J)
      }),
      (this.getViewport = function (S) {
        return S.copy(at)
      }),
      (this.setViewport = function (S, F, H, z) {
        ;(S.isVector4 ? at.set(S.x, S.y, S.z, S.w) : at.set(S, F, H, z),
          ft.viewport(J.copy(at).multiplyScalar(_t).round()))
      }),
      (this.getScissor = function (S) {
        return S.copy(It)
      }),
      (this.setScissor = function (S, F, H, z) {
        ;(S.isVector4 ? It.set(S.x, S.y, S.z, S.w) : It.set(S, F, H, z),
          ft.scissor(et.copy(It).multiplyScalar(_t).round()))
      }),
      (this.getScissorTest = function () {
        return Bt
      }),
      (this.setScissorTest = function (S) {
        ft.setScissorTest((Bt = S))
      }),
      (this.setOpaqueSort = function (S) {
        X = S
      }),
      (this.setTransparentSort = function (S) {
        mt = S
      }),
      (this.getClearColor = function (S) {
        return S.copy(st.getClearColor())
      }),
      (this.setClearColor = function () {
        st.setClearColor(...arguments)
      }),
      (this.getClearAlpha = function () {
        return st.getClearAlpha()
      }),
      (this.setClearAlpha = function () {
        st.setClearAlpha(...arguments)
      }),
      (this.clear = function (S = !0, F = !0, H = !0) {
        let z = 0
        if (S) {
          let k = !1
          if (I !== null) {
            const xt = I.texture.format
            k = f.has(xt)
          }
          if (k) {
            const xt = I.texture.type,
              Et = d.has(xt),
              gt = st.getClearColor(),
              At = st.getClearAlpha(),
              Pt = gt.r,
              Gt = gt.g,
              Xt = gt.b
            Et
              ? ((M[0] = Pt),
                (M[1] = Gt),
                (M[2] = Xt),
                (M[3] = At),
                U.clearBufferuiv(U.COLOR, 0, M))
              : ((T[0] = Pt),
                (T[1] = Gt),
                (T[2] = Xt),
                (T[3] = At),
                U.clearBufferiv(U.COLOR, 0, T))
          } else z |= U.COLOR_BUFFER_BIT
        }
        ;(F &&
          ((z |= U.DEPTH_BUFFER_BIT), this.state.buffers.depth.setMask(!0)),
          H &&
            ((z |= U.STENCIL_BUFFER_BIT),
            this.state.buffers.stencil.setMask(4294967295)),
          z !== 0 && U.clear(z))
      }),
      (this.clearColor = function () {
        this.clear(!0, !1, !1)
      }),
      (this.clearDepth = function () {
        this.clear(!1, !0, !1)
      }),
      (this.clearStencil = function () {
        this.clear(!1, !1, !0)
      }),
      (this.setNodesHandler = function (S) {
        ;(S.setRenderer(this), (N = S))
      }),
      (this.dispose = function () {
        ;(e.removeEventListener('webglcontextlost', Q, !1),
          e.removeEventListener('webglcontextrestored', Ct, !1),
          e.removeEventListener('webglcontextcreationerror', kt, !1),
          st.dispose(),
          K.dispose(),
          Mt.dispose(),
          E.dispose(),
          B.dispose(),
          it.dispose(),
          rt.dispose(),
          Y.dispose(),
          ct.dispose(),
          lt.dispose(),
          lt.removeEventListener('sessionstart', jo),
          lt.removeEventListener('sessionend', Ko),
          ci.stop())
      }))
    function Q(S) {
      ;(S.preventDefault(), hl('WebGLRenderer: Context Lost.'), (R = !0))
    }
    function Ct() {
      ;(hl('WebGLRenderer: Context Restored.'), (R = !1))
      const S = ge.autoReset,
        F = ot.enabled,
        H = ot.autoUpdate,
        z = ot.needsUpdate,
        k = ot.type
      ;(St(),
        (ge.autoReset = S),
        (ot.enabled = F),
        (ot.autoUpdate = H),
        (ot.needsUpdate = z),
        (ot.type = k))
    }
    function kt(S) {
      Zt(
        'WebGLRenderer: A WebGL context could not be created. Reason: ',
        S.statusMessage
      )
    }
    function ve(S) {
      const F = S.target
      ;(F.removeEventListener('dispose', ve), re(F))
    }
    function re(S) {
      ;(Ln(S), E.remove(S))
    }
    function Ln(S) {
      const F = E.get(S).programs
      F !== void 0 &&
        (F.forEach(function (H) {
          ct.releaseProgram(H)
        }),
        S.isShaderMaterial && ct.releaseShaderCache(S))
    }
    this.renderBufferDirect = function (S, F, H, z, k, xt) {
      F === null && (F = we)
      const Et = k.isMesh && k.matrixWorld.determinant() < 0,
        gt = Ah(S, F, H, z, k)
      ft.setMaterial(z, Et)
      let At = H.index,
        Pt = 1
      if (z.wireframe === !0) {
        if (((At = tt.getWireframeAttribute(H)), At === void 0)) return
        Pt = 2
      }
      const Gt = H.drawRange,
        Xt = H.attributes.position
      let Lt = Gt.start * Pt,
        ae = (Gt.start + Gt.count) * Pt
      ;(xt !== null &&
        ((Lt = Math.max(Lt, xt.start * Pt)),
        (ae = Math.min(ae, (xt.start + xt.count) * Pt))),
        At !== null
          ? ((Lt = Math.max(Lt, 0)), (ae = Math.min(ae, At.count)))
          : Xt != null &&
            ((Lt = Math.max(Lt, 0)), (ae = Math.min(ae, Xt.count))))
      const Me = ae - Lt
      if (Me < 0 || Me === 1 / 0) return
      rt.setup(k, z, gt, H, At)
      let _e,
        ce = Ht
      if (
        (At !== null && ((_e = j.get(At)), (ce = ee), ce.setIndex(_e)),
        k.isMesh)
      )
        z.wireframe === !0
          ? (ft.setLineWidth(z.wireframeLinewidth * Je()), ce.setMode(U.LINES))
          : ce.setMode(U.TRIANGLES)
      else if (k.isLine) {
        let Be = z.linewidth
        ;(Be === void 0 && (Be = 1),
          ft.setLineWidth(Be * Je()),
          k.isLineSegments
            ? ce.setMode(U.LINES)
            : k.isLineLoop
              ? ce.setMode(U.LINE_LOOP)
              : ce.setMode(U.LINE_STRIP))
      } else
        k.isPoints
          ? ce.setMode(U.POINTS)
          : k.isSprite && ce.setMode(U.TRIANGLES)
      if (k.isBatchedMesh)
        if (Kt.get('WEBGL_multi_draw'))
          ce.renderMultiDraw(
            k._multiDrawStarts,
            k._multiDrawCounts,
            k._multiDrawCount
          )
        else {
          const Be = k._multiDrawStarts,
            yt = k._multiDrawCounts,
            Qe = k._multiDrawCount,
            Qt = At ? j.get(At).bytesPerElement : 1,
            cn = E.get(z).currentProgram.getUniforms()
          for (let Sn = 0; Sn < Qe; Sn++)
            (cn.setValue(U, '_gl_DrawID', Sn), ce.render(Be[Sn] / Qt, yt[Sn]))
        }
      else if (k.isInstancedMesh) ce.renderInstances(Lt, Me, k.count)
      else if (H.isInstancedBufferGeometry) {
        const Be = H._maxInstanceCount !== void 0 ? H._maxInstanceCount : 1 / 0,
          yt = Math.min(H.instanceCount, Be)
        ce.renderInstances(Lt, Me, yt)
      } else ce.render(Lt, Me)
    }
    function Mn(S, F, H) {
      S.transparent === !0 && S.side === On && S.forceSinglePass === !1
        ? ((S.side = qe),
          (S.needsUpdate = !0),
          Ss(S, F, H),
          (S.side = oi),
          (S.needsUpdate = !0),
          Ss(S, F, H),
          (S.side = On))
        : Ss(S, F, H)
    }
    ;((this.compile = function (S, F, H = null) {
      ;(H === null && (H = S),
        (A = Mt.get(H)),
        A.init(F),
        _.push(A),
        H.traverseVisible(function (k) {
          k.isLight &&
            k.layers.test(F.layers) &&
            (A.pushLight(k), k.castShadow && A.pushShadow(k))
        }),
        S !== H &&
          S.traverseVisible(function (k) {
            k.isLight &&
              k.layers.test(F.layers) &&
              (A.pushLight(k), k.castShadow && A.pushShadow(k))
          }),
        A.setupLights())
      const z = new Set()
      return (
        S.traverse(function (k) {
          if (!(k.isMesh || k.isPoints || k.isLine || k.isSprite)) return
          const xt = k.material
          if (xt)
            if (Array.isArray(xt))
              for (let Et = 0; Et < xt.length; Et++) {
                const gt = xt[Et]
                ;(Mn(gt, H, k), z.add(gt))
              }
            else (Mn(xt, H, k), z.add(xt))
        }),
        (A = _.pop()),
        z
      )
    }),
      (this.compileAsync = function (S, F, H = null) {
        const z = this.compile(S, F, H)
        return new Promise(k => {
          function xt() {
            if (
              (z.forEach(function (Et) {
                E.get(Et).currentProgram.isReady() && z.delete(Et)
              }),
              z.size === 0)
            ) {
              k(S)
              return
            }
            setTimeout(xt, 10)
          }
          Kt.get('KHR_parallel_shader_compile') !== null
            ? xt()
            : setTimeout(xt, 10)
        })
      }))
    let Cr = null
    function Th(S) {
      Cr && Cr(S)
    }
    function jo() {
      ci.stop()
    }
    function Ko() {
      ci.start()
    }
    const ci = new nh()
    ;(ci.setAnimationLoop(Th),
      typeof self < 'u' && ci.setContext(self),
      (this.setAnimationLoop = function (S) {
        ;((Cr = S), lt.setAnimationLoop(S), S === null ? ci.stop() : ci.start())
      }),
      lt.addEventListener('sessionstart', jo),
      lt.addEventListener('sessionend', Ko),
      (this.render = function (S, F) {
        if (F !== void 0 && F.isCamera !== !0) {
          Zt('WebGLRenderer.render: camera is not an instance of THREE.Camera.')
          return
        }
        if (R === !0) return
        N !== null && N.renderStart(S, F)
        const H = lt.enabled === !0 && lt.isPresenting === !0,
          z = b !== null && (I === null || H) && b.begin(P, I)
        if (
          (S.matrixWorldAutoUpdate === !0 && S.updateMatrixWorld(),
          F.parent === null &&
            F.matrixWorldAutoUpdate === !0 &&
            F.updateMatrixWorld(),
          lt.enabled === !0 &&
            lt.isPresenting === !0 &&
            (b === null || b.isCompositing() === !1) &&
            (lt.cameraAutoUpdate === !0 && lt.updateCamera(F),
            (F = lt.getCamera())),
          S.isScene === !0 && S.onBeforeRender(P, S, F, I),
          (A = Mt.get(S, _.length)),
          A.init(F),
          (A.state.textureUnits = x.getTextureUnits()),
          _.push(A),
          se.multiplyMatrices(F.projectionMatrix, F.matrixWorldInverse),
          Ut.setFromProjectionMatrix(se, Tn, F.reversedDepth),
          (jt = this.localClippingEnabled),
          (pe = bt.init(this.clippingPlanes, jt)),
          (C = K.get(S, y.length)),
          C.init(),
          y.push(C),
          lt.enabled === !0 && lt.isPresenting === !0)
        ) {
          const Et = P.xr.getDepthSensingMesh()
          Et !== null && Pr(Et, F, -1 / 0, P.sortObjects)
        }
        ;(Pr(S, F, 0, P.sortObjects),
          C.finish(),
          P.sortObjects === !0 && C.sort(X, mt),
          (me =
            lt.enabled === !1 ||
            lt.isPresenting === !1 ||
            lt.hasDepthSensing() === !1),
          me && st.addToRenderList(C, S),
          this.info.render.frame++,
          pe === !0 && bt.beginShadows())
        const k = A.state.shadowsArray
        if (
          (ot.render(k, S, F),
          pe === !0 && bt.endShadows(),
          this.info.autoReset === !0 && this.info.reset(),
          (z && b.hasRenderPass()) === !1)
        ) {
          const Et = C.opaque,
            gt = C.transmissive
          if ((A.setupLights(), F.isArrayCamera)) {
            const At = F.cameras
            if (gt.length > 0)
              for (let Pt = 0, Gt = At.length; Pt < Gt; Pt++) {
                const Xt = At[Pt]
                Zo(Et, gt, S, Xt)
              }
            me && st.render(S)
            for (let Pt = 0, Gt = At.length; Pt < Gt; Pt++) {
              const Xt = At[Pt]
              $o(C, S, Xt, Xt.viewport)
            }
          } else
            (gt.length > 0 && Zo(Et, gt, S, F), me && st.render(S), $o(C, S, F))
        }
        ;(I !== null &&
          W === 0 &&
          (x.updateMultisampleRenderTarget(I), x.updateRenderTargetMipmap(I)),
          z && b.end(P),
          S.isScene === !0 && S.onAfterRender(P, S, F),
          rt.resetDefaultState(),
          (G = -1),
          (O = null),
          _.pop(),
          _.length > 0
            ? ((A = _[_.length - 1]),
              x.setTextureUnits(A.state.textureUnits),
              pe === !0 && bt.setGlobalState(P.clippingPlanes, A.state.camera))
            : (A = null),
          y.pop(),
          y.length > 0 ? (C = y[y.length - 1]) : (C = null),
          N !== null && N.renderEnd())
      }))
    function Pr(S, F, H, z) {
      if (S.visible === !1) return
      if (S.layers.test(F.layers)) {
        if (S.isGroup) H = S.renderOrder
        else if (S.isLOD) S.autoUpdate === !0 && S.update(F)
        else if (S.isLightProbeGrid) A.pushLightProbeGrid(S)
        else if (S.isLight) (A.pushLight(S), S.castShadow && A.pushShadow(S))
        else if (S.isSprite) {
          if (!S.frustumCulled || Ut.intersectsSprite(S)) {
            z && Yt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(se)
            const Et = it.update(S),
              gt = S.material
            gt.visible && C.push(S, Et, gt, H, Yt.z, null)
          }
        } else if (
          (S.isMesh || S.isLine || S.isPoints) &&
          (!S.frustumCulled || Ut.intersectsObject(S))
        ) {
          const Et = it.update(S),
            gt = S.material
          if (
            (z &&
              (S.boundingSphere !== void 0
                ? (S.boundingSphere === null && S.computeBoundingSphere(),
                  Yt.copy(S.boundingSphere.center))
                : (Et.boundingSphere === null && Et.computeBoundingSphere(),
                  Yt.copy(Et.boundingSphere.center)),
              Yt.applyMatrix4(S.matrixWorld).applyMatrix4(se)),
            Array.isArray(gt))
          ) {
            const At = Et.groups
            for (let Pt = 0, Gt = At.length; Pt < Gt; Pt++) {
              const Xt = At[Pt],
                Lt = gt[Xt.materialIndex]
              Lt && Lt.visible && C.push(S, Et, Lt, H, Yt.z, Xt)
            }
          } else gt.visible && C.push(S, Et, gt, H, Yt.z, null)
        }
      }
      const xt = S.children
      for (let Et = 0, gt = xt.length; Et < gt; Et++) Pr(xt[Et], F, H, z)
    }
    function $o(S, F, H, z) {
      const { opaque: k, transmissive: xt, transparent: Et } = S
      ;(A.setupLightsView(H),
        pe === !0 && bt.setGlobalState(P.clippingPlanes, H),
        z && ft.viewport(J.copy(z)),
        k.length > 0 && Ms(k, F, H),
        xt.length > 0 && Ms(xt, F, H),
        Et.length > 0 && Ms(Et, F, H),
        ft.buffers.depth.setTest(!0),
        ft.buffers.depth.setMask(!0),
        ft.buffers.color.setMask(!0),
        ft.setPolygonOffset(!1))
    }
    function Zo(S, F, H, z) {
      if ((H.isScene === !0 ? H.overrideMaterial : null) !== null) return
      if (A.state.transmissionRenderTarget[z.id] === void 0) {
        const Lt =
          Kt.has('EXT_color_buffer_half_float') ||
          Kt.has('EXT_color_buffer_float')
        A.state.transmissionRenderTarget[z.id] = new An(1, 1, {
          generateMipmaps: !0,
          type: Lt ? Hn : an,
          minFilter: _i,
          samples: Math.max(4, ue.samples),
          stencilBuffer: r,
          resolveDepthBuffer: !1,
          resolveStencilBuffer: !1,
          colorSpace: $t.workingColorSpace,
        })
      }
      const xt = A.state.transmissionRenderTarget[z.id],
        Et = z.viewport || J
      xt.setSize(
        Et.z * P.transmissionResolutionScale,
        Et.w * P.transmissionResolutionScale
      )
      const gt = P.getRenderTarget(),
        At = P.getActiveCubeFace(),
        Pt = P.getActiveMipmapLevel()
      ;(P.setRenderTarget(xt),
        P.getClearColor(Tt),
        (Rt = P.getClearAlpha()),
        Rt < 1 && P.setClearColor(16777215, 0.5),
        P.clear(),
        me && st.render(H))
      const Gt = P.toneMapping
      P.toneMapping = wn
      const Xt = z.viewport
      if (
        (z.viewport !== void 0 && (z.viewport = void 0),
        A.setupLightsView(z),
        pe === !0 && bt.setGlobalState(P.clippingPlanes, z),
        Ms(S, H, z),
        x.updateMultisampleRenderTarget(xt),
        x.updateRenderTargetMipmap(xt),
        Kt.has('WEBGL_multisampled_render_to_texture') === !1)
      ) {
        let Lt = !1
        for (let ae = 0, Me = F.length; ae < Me; ae++) {
          const _e = F[ae],
            { object: ce, geometry: Be, material: yt, group: Qe } = _e
          if (yt.side === On && ce.layers.test(z.layers)) {
            const Qt = yt.side
            ;((yt.side = qe),
              (yt.needsUpdate = !0),
              Jo(ce, H, z, Be, yt, Qe),
              (yt.side = Qt),
              (yt.needsUpdate = !0),
              (Lt = !0))
          }
        }
        Lt === !0 &&
          (x.updateMultisampleRenderTarget(xt), x.updateRenderTargetMipmap(xt))
      }
      ;(P.setRenderTarget(gt, At, Pt),
        P.setClearColor(Tt, Rt),
        Xt !== void 0 && (z.viewport = Xt),
        (P.toneMapping = Gt))
    }
    function Ms(S, F, H) {
      const z = F.isScene === !0 ? F.overrideMaterial : null
      for (let k = 0, xt = S.length; k < xt; k++) {
        const Et = S[k],
          { object: gt, geometry: At, group: Pt } = Et
        let Gt = Et.material
        ;(Gt.allowOverride === !0 && z !== null && (Gt = z),
          gt.layers.test(H.layers) && Jo(gt, F, H, At, Gt, Pt))
      }
    }
    function Jo(S, F, H, z, k, xt) {
      ;(S.onBeforeRender(P, F, H, z, k, xt),
        S.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse, S.matrixWorld),
        S.normalMatrix.getNormalMatrix(S.modelViewMatrix),
        k.onBeforeRender(P, F, H, z, S, xt),
        k.transparent === !0 && k.side === On && k.forceSinglePass === !1
          ? ((k.side = qe),
            (k.needsUpdate = !0),
            P.renderBufferDirect(H, F, z, k, S, xt),
            (k.side = oi),
            (k.needsUpdate = !0),
            P.renderBufferDirect(H, F, z, k, S, xt),
            (k.side = On))
          : P.renderBufferDirect(H, F, z, k, S, xt),
        S.onAfterRender(P, F, H, z, k, xt))
    }
    function Ss(S, F, H) {
      F.isScene !== !0 && (F = we)
      const z = E.get(S),
        k = A.state.lights,
        xt = A.state.shadowsArray,
        Et = k.state.version,
        gt = ct.getParameters(
          S,
          k.state,
          xt,
          F,
          H,
          A.state.lightProbeGridArray
        ),
        At = ct.getProgramCacheKey(gt)
      let Pt = z.programs
      ;((z.environment =
        S.isMeshStandardMaterial ||
        S.isMeshLambertMaterial ||
        S.isMeshPhongMaterial
          ? F.environment
          : null),
        (z.fog = F.fog))
      const Gt =
        S.isMeshStandardMaterial ||
        (S.isMeshLambertMaterial && !S.envMap) ||
        (S.isMeshPhongMaterial && !S.envMap)
      ;((z.envMap = B.get(S.envMap || z.environment, Gt)),
        (z.envMapRotation =
          z.environment !== null && S.envMap === null
            ? F.environmentRotation
            : S.envMapRotation),
        Pt === void 0 &&
          (S.addEventListener('dispose', ve),
          (Pt = new Map()),
          (z.programs = Pt)))
      let Xt = Pt.get(At)
      if (Xt !== void 0) {
        if (z.currentProgram === Xt && z.lightsStateVersion === Et)
          return (tl(S, gt), Xt)
      } else
        ((gt.uniforms = ct.getUniforms(S)),
          N !== null && S.isNodeMaterial && N.build(S, H, gt),
          S.onBeforeCompile(gt, P),
          (Xt = ct.acquireProgram(gt, At)),
          Pt.set(At, Xt),
          (z.uniforms = gt.uniforms))
      const Lt = z.uniforms
      return (
        ((!S.isShaderMaterial && !S.isRawShaderMaterial) ||
          S.clipping === !0) &&
          (Lt.clippingPlanes = bt.uniform),
        tl(S, gt),
        (z.needsLights = Ch(S)),
        (z.lightsStateVersion = Et),
        z.needsLights &&
          ((Lt.ambientLightColor.value = k.state.ambient),
          (Lt.lightProbe.value = k.state.probe),
          (Lt.directionalLights.value = k.state.directional),
          (Lt.directionalLightShadows.value = k.state.directionalShadow),
          (Lt.spotLights.value = k.state.spot),
          (Lt.spotLightShadows.value = k.state.spotShadow),
          (Lt.rectAreaLights.value = k.state.rectArea),
          (Lt.ltc_1.value = k.state.rectAreaLTC1),
          (Lt.ltc_2.value = k.state.rectAreaLTC2),
          (Lt.pointLights.value = k.state.point),
          (Lt.pointLightShadows.value = k.state.pointShadow),
          (Lt.hemisphereLights.value = k.state.hemi),
          (Lt.directionalShadowMatrix.value = k.state.directionalShadowMatrix),
          (Lt.spotLightMatrix.value = k.state.spotLightMatrix),
          (Lt.spotLightMap.value = k.state.spotLightMap),
          (Lt.pointShadowMatrix.value = k.state.pointShadowMatrix)),
        (z.lightProbeGrid = A.state.lightProbeGridArray.length > 0),
        (z.currentProgram = Xt),
        (z.uniformsList = null),
        Xt
      )
    }
    function Qo(S) {
      if (S.uniformsList === null) {
        const F = S.currentProgram.getUniforms()
        S.uniformsList = sr.seqWithValue(F.seq, S.uniforms)
      }
      return S.uniformsList
    }
    function tl(S, F) {
      const H = E.get(S)
      ;((H.outputColorSpace = F.outputColorSpace),
        (H.batching = F.batching),
        (H.batchingColor = F.batchingColor),
        (H.instancing = F.instancing),
        (H.instancingColor = F.instancingColor),
        (H.instancingMorph = F.instancingMorph),
        (H.skinning = F.skinning),
        (H.morphTargets = F.morphTargets),
        (H.morphNormals = F.morphNormals),
        (H.morphColors = F.morphColors),
        (H.morphTargetsCount = F.morphTargetsCount),
        (H.numClippingPlanes = F.numClippingPlanes),
        (H.numIntersection = F.numClipIntersection),
        (H.vertexAlphas = F.vertexAlphas),
        (H.vertexTangents = F.vertexTangents),
        (H.toneMapping = F.toneMapping))
    }
    function wh(S, F) {
      if (S.length === 0) return null
      if (S.length === 1) return S[0].texture !== null ? S[0] : null
      w.setFromMatrixPosition(F.matrixWorld)
      for (let H = 0, z = S.length; H < z; H++) {
        const k = S[H]
        if (k.texture !== null && k.boundingBox.containsPoint(w)) return k
      }
      return null
    }
    function Ah(S, F, H, z, k) {
      ;(F.isScene !== !0 && (F = we), x.resetTextureUnits())
      const xt = F.fog,
        Et =
          z.isMeshStandardMaterial ||
          z.isMeshLambertMaterial ||
          z.isMeshPhongMaterial
            ? F.environment
            : null,
        gt =
          I === null
            ? P.outputColorSpace
            : I.isXRRenderTarget === !0
              ? I.texture.colorSpace
              : $t.workingColorSpace,
        At =
          z.isMeshStandardMaterial ||
          (z.isMeshLambertMaterial && !z.envMap) ||
          (z.isMeshPhongMaterial && !z.envMap),
        Pt = B.get(z.envMap || Et, At),
        Gt =
          z.vertexColors === !0 &&
          !!H.attributes.color &&
          H.attributes.color.itemSize === 4,
        Xt = !!H.attributes.tangent && (!!z.normalMap || z.anisotropy > 0),
        Lt = !!H.morphAttributes.position,
        ae = !!H.morphAttributes.normal,
        Me = !!H.morphAttributes.color
      let _e = wn
      z.toneMapped &&
        (I === null || I.isXRRenderTarget === !0) &&
        (_e = P.toneMapping)
      const ce =
          H.morphAttributes.position ||
          H.morphAttributes.normal ||
          H.morphAttributes.color,
        Be = ce !== void 0 ? ce.length : 0,
        yt = E.get(z),
        Qe = A.state.lights
      if (pe === !0 && (jt === !0 || S !== O)) {
        const de = S === O && z.id === G
        bt.setState(z, S, de)
      }
      let Qt = !1
      z.version === yt.__version
        ? ((yt.needsLights && yt.lightsStateVersion !== Qe.state.version) ||
            yt.outputColorSpace !== gt ||
            (k.isBatchedMesh && yt.batching === !1) ||
            (!k.isBatchedMesh && yt.batching === !0) ||
            (k.isBatchedMesh &&
              yt.batchingColor === !0 &&
              k.colorTexture === null) ||
            (k.isBatchedMesh &&
              yt.batchingColor === !1 &&
              k.colorTexture !== null) ||
            (k.isInstancedMesh && yt.instancing === !1) ||
            (!k.isInstancedMesh && yt.instancing === !0) ||
            (k.isSkinnedMesh && yt.skinning === !1) ||
            (!k.isSkinnedMesh && yt.skinning === !0) ||
            (k.isInstancedMesh &&
              yt.instancingColor === !0 &&
              k.instanceColor === null) ||
            (k.isInstancedMesh &&
              yt.instancingColor === !1 &&
              k.instanceColor !== null) ||
            (k.isInstancedMesh &&
              yt.instancingMorph === !0 &&
              k.morphTexture === null) ||
            (k.isInstancedMesh &&
              yt.instancingMorph === !1 &&
              k.morphTexture !== null) ||
            yt.envMap !== Pt ||
            (z.fog === !0 && yt.fog !== xt) ||
            (yt.numClippingPlanes !== void 0 &&
              (yt.numClippingPlanes !== bt.numPlanes ||
                yt.numIntersection !== bt.numIntersection)) ||
            yt.vertexAlphas !== Gt ||
            yt.vertexTangents !== Xt ||
            yt.morphTargets !== Lt ||
            yt.morphNormals !== ae ||
            yt.morphColors !== Me ||
            yt.toneMapping !== _e ||
            yt.morphTargetsCount !== Be ||
            !!yt.lightProbeGrid != A.state.lightProbeGridArray.length > 0) &&
          (Qt = !0)
        : ((Qt = !0), (yt.__version = z.version))
      let cn = yt.currentProgram
      Qt === !0 &&
        ((cn = Ss(z, F, k)),
        N && z.isNodeMaterial && N.onUpdateProgram(z, cn, yt))
      let Sn = !1,
        qn = !1,
        yi = !1
      const he = cn.getUniforms(),
        Se = yt.uniforms
      if (
        (ft.useProgram(cn.program) && ((Sn = !0), (qn = !0), (yi = !0)),
        z.id !== G && ((G = z.id), (qn = !0)),
        yt.needsLights)
      ) {
        const de = wh(A.state.lightProbeGridArray, k)
        yt.lightProbeGrid !== de && ((yt.lightProbeGrid = de), (qn = !0))
      }
      if (Sn || O !== S) {
        ;(ft.buffers.depth.getReversed() &&
          S.reversedDepth !== !0 &&
          ((S._reversedDepth = !0), S.updateProjectionMatrix()),
          he.setValue(U, 'projectionMatrix', S.projectionMatrix),
          he.setValue(U, 'viewMatrix', S.matrixWorldInverse))
        const jn = he.map.cameraPosition
        ;(jn !== void 0 &&
          jn.setValue(U, fe.setFromMatrixPosition(S.matrixWorld)),
          ue.logarithmicDepthBuffer &&
            he.setValue(
              U,
              'logDepthBufFC',
              2 / (Math.log(S.far + 1) / Math.LN2)
            ),
          (z.isMeshPhongMaterial ||
            z.isMeshToonMaterial ||
            z.isMeshLambertMaterial ||
            z.isMeshBasicMaterial ||
            z.isMeshStandardMaterial ||
            z.isShaderMaterial) &&
            he.setValue(U, 'isOrthographic', S.isOrthographicCamera === !0),
          O !== S && ((O = S), (qn = !0), (yi = !0)))
      }
      if (
        (yt.needsLights &&
          (Qe.state.directionalShadowMap.length > 0 &&
            he.setValue(
              U,
              'directionalShadowMap',
              Qe.state.directionalShadowMap,
              x
            ),
          Qe.state.spotShadowMap.length > 0 &&
            he.setValue(U, 'spotShadowMap', Qe.state.spotShadowMap, x),
          Qe.state.pointShadowMap.length > 0 &&
            he.setValue(U, 'pointShadowMap', Qe.state.pointShadowMap, x)),
        k.isSkinnedMesh)
      ) {
        ;(he.setOptional(U, k, 'bindMatrix'),
          he.setOptional(U, k, 'bindMatrixInverse'))
        const de = k.skeleton
        de &&
          (de.boneTexture === null && de.computeBoneTexture(),
          he.setValue(U, 'boneTexture', de.boneTexture, x))
      }
      k.isBatchedMesh &&
        (he.setOptional(U, k, 'batchingTexture'),
        he.setValue(U, 'batchingTexture', k._matricesTexture, x),
        he.setOptional(U, k, 'batchingIdTexture'),
        he.setValue(U, 'batchingIdTexture', k._indirectTexture, x),
        he.setOptional(U, k, 'batchingColorTexture'),
        k._colorsTexture !== null &&
          he.setValue(U, 'batchingColorTexture', k._colorsTexture, x))
      const Yn = H.morphAttributes
      if (
        ((Yn.position !== void 0 ||
          Yn.normal !== void 0 ||
          Yn.color !== void 0) &&
          Ft.update(k, H, cn),
        (qn || yt.receiveShadow !== k.receiveShadow) &&
          ((yt.receiveShadow = k.receiveShadow),
          he.setValue(U, 'receiveShadow', k.receiveShadow)),
        (z.isMeshStandardMaterial ||
          z.isMeshLambertMaterial ||
          z.isMeshPhongMaterial) &&
          z.envMap === null &&
          F.environment !== null &&
          (Se.envMapIntensity.value = F.environmentIntensity),
        Se.dfgLUT !== void 0 && (Se.dfgLUT.value = gg()),
        qn)
      ) {
        if (
          (he.setValue(U, 'toneMappingExposure', P.toneMappingExposure),
          yt.needsLights && Rh(Se, yi),
          xt && z.fog === !0 && q.refreshFogUniforms(Se, xt),
          q.refreshMaterialUniforms(
            Se,
            z,
            _t,
            vt,
            A.state.transmissionRenderTarget[S.id]
          ),
          yt.needsLights && yt.lightProbeGrid)
        ) {
          const de = yt.lightProbeGrid
          ;((Se.probesSH.value = de.texture),
            Se.probesMin.value.copy(de.boundingBox.min),
            Se.probesMax.value.copy(de.boundingBox.max),
            Se.probesResolution.value.copy(de.resolution))
        }
        sr.upload(U, Qo(yt), Se, x)
      }
      if (
        (z.isShaderMaterial &&
          z.uniformsNeedUpdate === !0 &&
          (sr.upload(U, Qo(yt), Se, x), (z.uniformsNeedUpdate = !1)),
        z.isSpriteMaterial && he.setValue(U, 'center', k.center),
        he.setValue(U, 'modelViewMatrix', k.modelViewMatrix),
        he.setValue(U, 'normalMatrix', k.normalMatrix),
        he.setValue(U, 'modelMatrix', k.matrixWorld),
        z.uniformsGroups !== void 0)
      ) {
        const de = z.uniformsGroups
        for (let jn = 0, bi = de.length; jn < bi; jn++) {
          const el = de[jn]
          ;(Y.update(el, cn), Y.bind(el, cn))
        }
      }
      return cn
    }
    function Rh(S, F) {
      ;((S.ambientLightColor.needsUpdate = F),
        (S.lightProbe.needsUpdate = F),
        (S.directionalLights.needsUpdate = F),
        (S.directionalLightShadows.needsUpdate = F),
        (S.pointLights.needsUpdate = F),
        (S.pointLightShadows.needsUpdate = F),
        (S.spotLights.needsUpdate = F),
        (S.spotLightShadows.needsUpdate = F),
        (S.rectAreaLights.needsUpdate = F),
        (S.hemisphereLights.needsUpdate = F))
    }
    function Ch(S) {
      return (
        S.isMeshLambertMaterial ||
        S.isMeshToonMaterial ||
        S.isMeshPhongMaterial ||
        S.isMeshStandardMaterial ||
        S.isShadowMaterial ||
        (S.isShaderMaterial && S.lights === !0)
      )
    }
    ;((this.getActiveCubeFace = function () {
      return V
    }),
      (this.getActiveMipmapLevel = function () {
        return W
      }),
      (this.getRenderTarget = function () {
        return I
      }),
      (this.setRenderTargetTextures = function (S, F, H) {
        const z = E.get(S)
        ;((z.__autoAllocateDepthBuffer = S.resolveDepthBuffer === !1),
          z.__autoAllocateDepthBuffer === !1 && (z.__useRenderToTexture = !1),
          (E.get(S.texture).__webglTexture = F),
          (E.get(S.depthTexture).__webglTexture = z.__autoAllocateDepthBuffer
            ? void 0
            : H),
          (z.__hasExternalTextures = !0))
      }),
      (this.setRenderTargetFramebuffer = function (S, F) {
        const H = E.get(S)
        ;((H.__webglFramebuffer = F),
          (H.__useDefaultFramebuffer = F === void 0))
      }))
    const Ph = U.createFramebuffer()
    ;((this.setRenderTarget = function (S, F = 0, H = 0) {
      ;((I = S), (V = F), (W = H))
      let z = null,
        k = !1,
        xt = !1
      if (S) {
        const gt = E.get(S)
        if (gt.__useDefaultFramebuffer !== void 0) {
          ;(ft.bindFramebuffer(U.FRAMEBUFFER, gt.__webglFramebuffer),
            J.copy(S.viewport),
            et.copy(S.scissor),
            (dt = S.scissorTest),
            ft.viewport(J),
            ft.scissor(et),
            ft.setScissorTest(dt),
            (G = -1))
          return
        } else if (gt.__webglFramebuffer === void 0) x.setupRenderTarget(S)
        else if (gt.__hasExternalTextures)
          x.rebindTextures(
            S,
            E.get(S.texture).__webglTexture,
            E.get(S.depthTexture).__webglTexture
          )
        else if (S.depthBuffer) {
          const Gt = S.depthTexture
          if (gt.__boundDepthTexture !== Gt) {
            if (
              Gt !== null &&
              E.has(Gt) &&
              (S.width !== Gt.image.width || S.height !== Gt.image.height)
            )
              throw new Error(
                'WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.'
              )
            x.setupDepthRenderbuffer(S)
          }
        }
        const At = S.texture
        ;(At.isData3DTexture ||
          At.isDataArrayTexture ||
          At.isCompressedArrayTexture) &&
          (xt = !0)
        const Pt = E.get(S).__webglFramebuffer
        ;(S.isWebGLCubeRenderTarget
          ? (Array.isArray(Pt[F]) ? (z = Pt[F][H]) : (z = Pt[F]), (k = !0))
          : S.samples > 0 && x.useMultisampledRTT(S) === !1
            ? (z = E.get(S).__webglMultisampledFramebuffer)
            : Array.isArray(Pt)
              ? (z = Pt[H])
              : (z = Pt),
          J.copy(S.viewport),
          et.copy(S.scissor),
          (dt = S.scissorTest))
      } else
        (J.copy(at).multiplyScalar(_t).floor(),
          et.copy(It).multiplyScalar(_t).floor(),
          (dt = Bt))
      if (
        (H !== 0 && (z = Ph),
        ft.bindFramebuffer(U.FRAMEBUFFER, z) && ft.drawBuffers(S, z),
        ft.viewport(J),
        ft.scissor(et),
        ft.setScissorTest(dt),
        k)
      ) {
        const gt = E.get(S.texture)
        U.framebufferTexture2D(
          U.FRAMEBUFFER,
          U.COLOR_ATTACHMENT0,
          U.TEXTURE_CUBE_MAP_POSITIVE_X + F,
          gt.__webglTexture,
          H
        )
      } else if (xt) {
        const gt = F
        for (let At = 0; At < S.textures.length; At++) {
          const Pt = E.get(S.textures[At])
          U.framebufferTextureLayer(
            U.FRAMEBUFFER,
            U.COLOR_ATTACHMENT0 + At,
            Pt.__webglTexture,
            H,
            gt
          )
        }
      } else if (S !== null && H !== 0) {
        const gt = E.get(S.texture)
        U.framebufferTexture2D(
          U.FRAMEBUFFER,
          U.COLOR_ATTACHMENT0,
          U.TEXTURE_2D,
          gt.__webglTexture,
          H
        )
      }
      G = -1
    }),
      (this.readRenderTargetPixels = function (S, F, H, z, k, xt, Et, gt = 0) {
        if (!(S && S.isWebGLRenderTarget)) {
          Zt(
            'WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.'
          )
          return
        }
        let At = E.get(S).__webglFramebuffer
        if ((S.isWebGLCubeRenderTarget && Et !== void 0 && (At = At[Et]), At)) {
          ft.bindFramebuffer(U.FRAMEBUFFER, At)
          try {
            const Pt = S.textures[gt],
              Gt = Pt.format,
              Xt = Pt.type
            if (
              (S.textures.length > 1 && U.readBuffer(U.COLOR_ATTACHMENT0 + gt),
              !ue.textureFormatReadable(Gt))
            ) {
              Zt(
                'WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.'
              )
              return
            }
            if (!ue.textureTypeReadable(Xt)) {
              Zt(
                'WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.'
              )
              return
            }
            F >= 0 &&
              F <= S.width - z &&
              H >= 0 &&
              H <= S.height - k &&
              U.readPixels(F, H, z, k, L.convert(Gt), L.convert(Xt), xt)
          } finally {
            const Pt = I !== null ? E.get(I).__webglFramebuffer : null
            ft.bindFramebuffer(U.FRAMEBUFFER, Pt)
          }
        }
      }),
      (this.readRenderTargetPixelsAsync = async function (
        S,
        F,
        H,
        z,
        k,
        xt,
        Et,
        gt = 0
      ) {
        if (!(S && S.isWebGLRenderTarget))
          throw new Error(
            'THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.'
          )
        let At = E.get(S).__webglFramebuffer
        if ((S.isWebGLCubeRenderTarget && Et !== void 0 && (At = At[Et]), At))
          if (F >= 0 && F <= S.width - z && H >= 0 && H <= S.height - k) {
            ft.bindFramebuffer(U.FRAMEBUFFER, At)
            const Pt = S.textures[gt],
              Gt = Pt.format,
              Xt = Pt.type
            if (
              (S.textures.length > 1 && U.readBuffer(U.COLOR_ATTACHMENT0 + gt),
              !ue.textureFormatReadable(Gt))
            )
              throw new Error(
                'THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.'
              )
            if (!ue.textureTypeReadable(Xt))
              throw new Error(
                'THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.'
              )
            const Lt = U.createBuffer()
            ;(U.bindBuffer(U.PIXEL_PACK_BUFFER, Lt),
              U.bufferData(U.PIXEL_PACK_BUFFER, xt.byteLength, U.STREAM_READ),
              U.readPixels(F, H, z, k, L.convert(Gt), L.convert(Xt), 0))
            const ae = I !== null ? E.get(I).__webglFramebuffer : null
            ft.bindFramebuffer(U.FRAMEBUFFER, ae)
            const Me = U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE, 0)
            return (
              U.flush(),
              await fu(U, Me, 4),
              U.bindBuffer(U.PIXEL_PACK_BUFFER, Lt),
              U.getBufferSubData(U.PIXEL_PACK_BUFFER, 0, xt),
              U.deleteBuffer(Lt),
              U.deleteSync(Me),
              xt
            )
          } else
            throw new Error(
              'THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.'
            )
      }),
      (this.copyFramebufferToTexture = function (S, F = null, H = 0) {
        const z = Math.pow(2, -H),
          k = Math.floor(S.image.width * z),
          xt = Math.floor(S.image.height * z),
          Et = F !== null ? F.x : 0,
          gt = F !== null ? F.y : 0
        ;(x.setTexture2D(S, 0),
          U.copyTexSubImage2D(U.TEXTURE_2D, H, 0, 0, Et, gt, k, xt),
          ft.unbindTexture())
      }))
    const Lh = U.createFramebuffer(),
      Dh = U.createFramebuffer()
    ;((this.copyTextureToTexture = function (
      S,
      F,
      H = null,
      z = null,
      k = 0,
      xt = 0
    ) {
      let Et, gt, At, Pt, Gt, Xt, Lt, ae, Me
      const _e = S.isCompressedTexture ? S.mipmaps[xt] : S.image
      if (H !== null)
        ((Et = H.max.x - H.min.x),
          (gt = H.max.y - H.min.y),
          (At = H.isBox3 ? H.max.z - H.min.z : 1),
          (Pt = H.min.x),
          (Gt = H.min.y),
          (Xt = H.isBox3 ? H.min.z : 0))
      else {
        const Se = Math.pow(2, -k)
        ;((Et = Math.floor(_e.width * Se)),
          (gt = Math.floor(_e.height * Se)),
          S.isDataArrayTexture
            ? (At = _e.depth)
            : S.isData3DTexture
              ? (At = Math.floor(_e.depth * Se))
              : (At = 1),
          (Pt = 0),
          (Gt = 0),
          (Xt = 0))
      }
      z !== null
        ? ((Lt = z.x), (ae = z.y), (Me = z.z))
        : ((Lt = 0), (ae = 0), (Me = 0))
      const ce = L.convert(F.format),
        Be = L.convert(F.type)
      let yt
      ;(F.isData3DTexture
        ? (x.setTexture3D(F, 0), (yt = U.TEXTURE_3D))
        : F.isDataArrayTexture || F.isCompressedArrayTexture
          ? (x.setTexture2DArray(F, 0), (yt = U.TEXTURE_2D_ARRAY))
          : (x.setTexture2D(F, 0), (yt = U.TEXTURE_2D)),
        ft.activeTexture(U.TEXTURE0),
        ft.pixelStorei(U.UNPACK_FLIP_Y_WEBGL, F.flipY),
        ft.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL, F.premultiplyAlpha),
        ft.pixelStorei(U.UNPACK_ALIGNMENT, F.unpackAlignment))
      const Qe = ft.getParameter(U.UNPACK_ROW_LENGTH),
        Qt = ft.getParameter(U.UNPACK_IMAGE_HEIGHT),
        cn = ft.getParameter(U.UNPACK_SKIP_PIXELS),
        Sn = ft.getParameter(U.UNPACK_SKIP_ROWS),
        qn = ft.getParameter(U.UNPACK_SKIP_IMAGES)
      ;(ft.pixelStorei(U.UNPACK_ROW_LENGTH, _e.width),
        ft.pixelStorei(U.UNPACK_IMAGE_HEIGHT, _e.height),
        ft.pixelStorei(U.UNPACK_SKIP_PIXELS, Pt),
        ft.pixelStorei(U.UNPACK_SKIP_ROWS, Gt),
        ft.pixelStorei(U.UNPACK_SKIP_IMAGES, Xt))
      const yi = S.isDataArrayTexture || S.isData3DTexture,
        he = F.isDataArrayTexture || F.isData3DTexture
      if (S.isDepthTexture) {
        const Se = E.get(S),
          Yn = E.get(F),
          de = E.get(Se.__renderTarget),
          jn = E.get(Yn.__renderTarget)
        ;(ft.bindFramebuffer(U.READ_FRAMEBUFFER, de.__webglFramebuffer),
          ft.bindFramebuffer(U.DRAW_FRAMEBUFFER, jn.__webglFramebuffer))
        for (let bi = 0; bi < At; bi++)
          (yi &&
            (U.framebufferTextureLayer(
              U.READ_FRAMEBUFFER,
              U.COLOR_ATTACHMENT0,
              E.get(S).__webglTexture,
              k,
              Xt + bi
            ),
            U.framebufferTextureLayer(
              U.DRAW_FRAMEBUFFER,
              U.COLOR_ATTACHMENT0,
              E.get(F).__webglTexture,
              xt,
              Me + bi
            )),
            U.blitFramebuffer(
              Pt,
              Gt,
              Et,
              gt,
              Lt,
              ae,
              Et,
              gt,
              U.DEPTH_BUFFER_BIT,
              U.NEAREST
            ))
        ;(ft.bindFramebuffer(U.READ_FRAMEBUFFER, null),
          ft.bindFramebuffer(U.DRAW_FRAMEBUFFER, null))
      } else if (k !== 0 || S.isRenderTargetTexture || E.has(S)) {
        const Se = E.get(S),
          Yn = E.get(F)
        ;(ft.bindFramebuffer(U.READ_FRAMEBUFFER, Lh),
          ft.bindFramebuffer(U.DRAW_FRAMEBUFFER, Dh))
        for (let de = 0; de < At; de++)
          (yi
            ? U.framebufferTextureLayer(
                U.READ_FRAMEBUFFER,
                U.COLOR_ATTACHMENT0,
                Se.__webglTexture,
                k,
                Xt + de
              )
            : U.framebufferTexture2D(
                U.READ_FRAMEBUFFER,
                U.COLOR_ATTACHMENT0,
                U.TEXTURE_2D,
                Se.__webglTexture,
                k
              ),
            he
              ? U.framebufferTextureLayer(
                  U.DRAW_FRAMEBUFFER,
                  U.COLOR_ATTACHMENT0,
                  Yn.__webglTexture,
                  xt,
                  Me + de
                )
              : U.framebufferTexture2D(
                  U.DRAW_FRAMEBUFFER,
                  U.COLOR_ATTACHMENT0,
                  U.TEXTURE_2D,
                  Yn.__webglTexture,
                  xt
                ),
            k !== 0
              ? U.blitFramebuffer(
                  Pt,
                  Gt,
                  Et,
                  gt,
                  Lt,
                  ae,
                  Et,
                  gt,
                  U.COLOR_BUFFER_BIT,
                  U.NEAREST
                )
              : he
                ? U.copyTexSubImage3D(yt, xt, Lt, ae, Me + de, Pt, Gt, Et, gt)
                : U.copyTexSubImage2D(yt, xt, Lt, ae, Pt, Gt, Et, gt))
        ;(ft.bindFramebuffer(U.READ_FRAMEBUFFER, null),
          ft.bindFramebuffer(U.DRAW_FRAMEBUFFER, null))
      } else
        he
          ? S.isDataTexture || S.isData3DTexture
            ? U.texSubImage3D(yt, xt, Lt, ae, Me, Et, gt, At, ce, Be, _e.data)
            : F.isCompressedArrayTexture
              ? U.compressedTexSubImage3D(
                  yt,
                  xt,
                  Lt,
                  ae,
                  Me,
                  Et,
                  gt,
                  At,
                  ce,
                  _e.data
                )
              : U.texSubImage3D(yt, xt, Lt, ae, Me, Et, gt, At, ce, Be, _e)
          : S.isDataTexture
            ? U.texSubImage2D(U.TEXTURE_2D, xt, Lt, ae, Et, gt, ce, Be, _e.data)
            : S.isCompressedTexture
              ? U.compressedTexSubImage2D(
                  U.TEXTURE_2D,
                  xt,
                  Lt,
                  ae,
                  _e.width,
                  _e.height,
                  ce,
                  _e.data
                )
              : U.texSubImage2D(U.TEXTURE_2D, xt, Lt, ae, Et, gt, ce, Be, _e)
      ;(ft.pixelStorei(U.UNPACK_ROW_LENGTH, Qe),
        ft.pixelStorei(U.UNPACK_IMAGE_HEIGHT, Qt),
        ft.pixelStorei(U.UNPACK_SKIP_PIXELS, cn),
        ft.pixelStorei(U.UNPACK_SKIP_ROWS, Sn),
        ft.pixelStorei(U.UNPACK_SKIP_IMAGES, qn),
        xt === 0 && F.generateMipmaps && U.generateMipmap(yt),
        ft.unbindTexture())
    }),
      (this.initRenderTarget = function (S) {
        E.get(S).__webglFramebuffer === void 0 && x.setupRenderTarget(S)
      }),
      (this.initTexture = function (S) {
        ;(S.isCubeTexture
          ? x.setTextureCube(S, 0)
          : S.isData3DTexture
            ? x.setTexture3D(S, 0)
            : S.isDataArrayTexture || S.isCompressedArrayTexture
              ? x.setTexture2DArray(S, 0)
              : x.setTexture2D(S, 0),
          ft.unbindTexture())
      }),
      (this.resetState = function () {
        ;((V = 0), (W = 0), (I = null), ft.reset(), rt.reset())
      }),
      typeof __THREE_DEVTOOLS__ < 'u' &&
        __THREE_DEVTOOLS__.dispatchEvent(
          new CustomEvent('observe', { detail: this })
        ))
  }
  get coordinateSystem() {
    return Tn
  }
  get outputColorSpace() {
    return this._outputColorSpace
  }
  set outputColorSpace(t) {
    this._outputColorSpace = t
    const e = this.getContext()
    ;((e.drawingBufferColorSpace = $t._getDrawingBufferColorSpace(t)),
      (e.unpackColorSpace = $t._getUnpackColorSpace()))
  }
}
const hc = { type: 'change' },
  ko = { type: 'start' },
  hh = { type: 'end' },
  Ys = new Sr(),
  uc = new ei(),
  xg = Math.cos(70 * Ze.DEG2RAD),
  Re = new D(),
  je = 2 * Math.PI,
  oe = {
    NONE: -1,
    ROTATE: 0,
    DOLLY: 1,
    PAN: 2,
    TOUCH_ROTATE: 3,
    TOUCH_PAN: 4,
    TOUCH_DOLLY_PAN: 5,
    TOUCH_DOLLY_ROTATE: 6,
  },
  ha = 1e-6
class vg extends Md {
  constructor(t, e = null) {
    ;(super(t, e),
      (this.state = oe.NONE),
      (this.target = new D()),
      (this.cursor = new D()),
      (this.minDistance = 0),
      (this.maxDistance = 1 / 0),
      (this.minZoom = 0),
      (this.maxZoom = 1 / 0),
      (this.minTargetRadius = 0),
      (this.maxTargetRadius = 1 / 0),
      (this.minPolarAngle = 0),
      (this.maxPolarAngle = Math.PI),
      (this.minAzimuthAngle = -1 / 0),
      (this.maxAzimuthAngle = 1 / 0),
      (this.enableDamping = !1),
      (this.dampingFactor = 0.05),
      (this.enableZoom = !0),
      (this.zoomSpeed = 1),
      (this.enableRotate = !0),
      (this.rotateSpeed = 1),
      (this.keyRotateSpeed = 1),
      (this.enablePan = !0),
      (this.panSpeed = 1),
      (this.screenSpacePanning = !0),
      (this.keyPanSpeed = 7),
      (this.zoomToCursor = !1),
      (this.autoRotate = !1),
      (this.autoRotateSpeed = 2),
      (this.keys = {
        LEFT: 'ArrowLeft',
        UP: 'ArrowUp',
        RIGHT: 'ArrowRight',
        BOTTOM: 'ArrowDown',
      }),
      (this.mouseButtons = {
        LEFT: zn.ROTATE,
        MIDDLE: zn.DOLLY,
        RIGHT: zn.PAN,
      }),
      (this.touches = { ONE: ri.ROTATE, TWO: ri.DOLLY_PAN }),
      (this.target0 = this.target.clone()),
      (this.position0 = this.object.position.clone()),
      (this.zoom0 = this.object.zoom),
      (this._cursorStyle = 'auto'),
      (this._domElementKeyEvents = null),
      (this._lastPosition = new D()),
      (this._lastQuaternion = new Wn()),
      (this._lastTargetPosition = new D()),
      (this._quat = new Wn().setFromUnitVectors(t.up, new D(0, 1, 0))),
      (this._quatInverse = this._quat.clone().invert()),
      (this._spherical = new lo()),
      (this._sphericalDelta = new lo()),
      (this._scale = 1),
      (this._panOffset = new D()),
      (this._rotateStart = new Nt()),
      (this._rotateEnd = new Nt()),
      (this._rotateDelta = new Nt()),
      (this._panStart = new Nt()),
      (this._panEnd = new Nt()),
      (this._panDelta = new Nt()),
      (this._dollyStart = new Nt()),
      (this._dollyEnd = new Nt()),
      (this._dollyDelta = new Nt()),
      (this._dollyDirection = new D()),
      (this._mouse = new Nt()),
      (this._performCursorZoom = !1),
      (this._pointers = []),
      (this._pointerPositions = {}),
      (this._controlActive = !1),
      (this._onPointerMove = Sg.bind(this)),
      (this._onPointerDown = Mg.bind(this)),
      (this._onPointerUp = yg.bind(this)),
      (this._onContextMenu = Cg.bind(this)),
      (this._onMouseWheel = Tg.bind(this)),
      (this._onKeyDown = wg.bind(this)),
      (this._onTouchStart = Ag.bind(this)),
      (this._onTouchMove = Rg.bind(this)),
      (this._onMouseDown = bg.bind(this)),
      (this._onMouseMove = Eg.bind(this)),
      (this._interceptControlDown = Pg.bind(this)),
      (this._interceptControlUp = Lg.bind(this)),
      this.domElement !== null && this.connect(this.domElement),
      this.update())
  }
  set cursorStyle(t) {
    ;((this._cursorStyle = t),
      t === 'grab'
        ? (this.domElement.style.cursor = 'grab')
        : (this.domElement.style.cursor = 'auto'))
  }
  get cursorStyle() {
    return this._cursorStyle
  }
  connect(t) {
    ;(super.connect(t),
      this.domElement.addEventListener('pointerdown', this._onPointerDown),
      this.domElement.addEventListener('pointercancel', this._onPointerUp),
      this.domElement.addEventListener('contextmenu', this._onContextMenu),
      this.domElement.addEventListener('wheel', this._onMouseWheel, {
        passive: !1,
      }),
      this.domElement
        .getRootNode()
        .addEventListener('keydown', this._interceptControlDown, {
          passive: !0,
          capture: !0,
        }),
      (this.domElement.style.touchAction = 'none'))
  }
  disconnect() {
    ;(this.domElement.removeEventListener('pointerdown', this._onPointerDown),
      this.domElement.ownerDocument.removeEventListener(
        'pointermove',
        this._onPointerMove
      ),
      this.domElement.ownerDocument.removeEventListener(
        'pointerup',
        this._onPointerUp
      ),
      this.domElement.removeEventListener('pointercancel', this._onPointerUp),
      this.domElement.removeEventListener('wheel', this._onMouseWheel),
      this.domElement.removeEventListener('contextmenu', this._onContextMenu),
      this.stopListenToKeyEvents(),
      this.domElement
        .getRootNode()
        .removeEventListener('keydown', this._interceptControlDown, {
          capture: !0,
        }),
      (this.domElement.style.touchAction = ''))
  }
  dispose() {
    this.disconnect()
  }
  getPolarAngle() {
    return this._spherical.phi
  }
  getAzimuthalAngle() {
    return this._spherical.theta
  }
  getDistance() {
    return this.object.position.distanceTo(this.target)
  }
  listenToKeyEvents(t) {
    ;(t.addEventListener('keydown', this._onKeyDown),
      (this._domElementKeyEvents = t))
  }
  stopListenToKeyEvents() {
    this._domElementKeyEvents !== null &&
      (this._domElementKeyEvents.removeEventListener(
        'keydown',
        this._onKeyDown
      ),
      (this._domElementKeyEvents = null))
  }
  saveState() {
    ;(this.target0.copy(this.target),
      this.position0.copy(this.object.position),
      (this.zoom0 = this.object.zoom))
  }
  reset() {
    ;(this.target.copy(this.target0),
      this.object.position.copy(this.position0),
      (this.object.zoom = this.zoom0),
      this.object.updateProjectionMatrix(),
      this.dispatchEvent(hc),
      this.update(),
      (this.state = oe.NONE))
  }
  pan(t, e) {
    ;(this._pan(t, e), this.update())
  }
  dollyIn(t) {
    ;(this._dollyIn(t), this.update())
  }
  dollyOut(t) {
    ;(this._dollyOut(t), this.update())
  }
  rotateLeft(t) {
    ;(this._rotateLeft(t), this.update())
  }
  rotateUp(t) {
    ;(this._rotateUp(t), this.update())
  }
  update(t = null) {
    const e = this.object.position
    ;(Re.copy(e).sub(this.target),
      Re.applyQuaternion(this._quat),
      this._spherical.setFromVector3(Re),
      this.autoRotate &&
        this.state === oe.NONE &&
        this._rotateLeft(this._getAutoRotationAngle(t)),
      this.enableDamping
        ? ((this._spherical.theta +=
            this._sphericalDelta.theta * this.dampingFactor),
          (this._spherical.phi +=
            this._sphericalDelta.phi * this.dampingFactor))
        : ((this._spherical.theta += this._sphericalDelta.theta),
          (this._spherical.phi += this._sphericalDelta.phi)))
    let i = this.minAzimuthAngle,
      s = this.maxAzimuthAngle
    ;(isFinite(i) &&
      isFinite(s) &&
      (i < -Math.PI ? (i += je) : i > Math.PI && (i -= je),
      s < -Math.PI ? (s += je) : s > Math.PI && (s -= je),
      i <= s
        ? (this._spherical.theta = Math.max(
            i,
            Math.min(s, this._spherical.theta)
          ))
        : (this._spherical.theta =
            this._spherical.theta > (i + s) / 2
              ? Math.max(i, this._spherical.theta)
              : Math.min(s, this._spherical.theta))),
      (this._spherical.phi = Math.max(
        this.minPolarAngle,
        Math.min(this.maxPolarAngle, this._spherical.phi)
      )),
      this._spherical.makeSafe(),
      this.enableDamping === !0
        ? this.target.addScaledVector(this._panOffset, this.dampingFactor)
        : this.target.add(this._panOffset),
      this.target.sub(this.cursor),
      this.target.clampLength(this.minTargetRadius, this.maxTargetRadius),
      this.target.add(this.cursor))
    let r = !1
    if (
      (this.zoomToCursor && this._performCursorZoom) ||
      this.object.isOrthographicCamera
    )
      this._spherical.radius = this._clampDistance(this._spherical.radius)
    else {
      const a = this._spherical.radius
      ;((this._spherical.radius = this._clampDistance(
        this._spherical.radius * this._scale
      )),
        (r = a != this._spherical.radius))
    }
    if (
      (Re.setFromSpherical(this._spherical),
      Re.applyQuaternion(this._quatInverse),
      e.copy(this.target).add(Re),
      this.object.lookAt(this.target),
      this.enableDamping === !0
        ? ((this._sphericalDelta.theta *= 1 - this.dampingFactor),
          (this._sphericalDelta.phi *= 1 - this.dampingFactor),
          this._panOffset.multiplyScalar(1 - this.dampingFactor))
        : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)),
      this.zoomToCursor && this._performCursorZoom)
    ) {
      let a = null
      if (this.object.isPerspectiveCamera) {
        const o = Re.length()
        a = this._clampDistance(o * this._scale)
        const c = o - a
        ;(this.object.position.addScaledVector(this._dollyDirection, c),
          this.object.updateMatrixWorld(),
          (r = !!c))
      } else if (this.object.isOrthographicCamera) {
        const o = new D(this._mouse.x, this._mouse.y, 0)
        o.unproject(this.object)
        const c = this.object.zoom
        ;((this.object.zoom = Math.max(
          this.minZoom,
          Math.min(this.maxZoom, this.object.zoom / this._scale)
        )),
          this.object.updateProjectionMatrix(),
          (r = c !== this.object.zoom))
        const l = new D(this._mouse.x, this._mouse.y, 0)
        ;(l.unproject(this.object),
          this.object.position.sub(l).add(o),
          this.object.updateMatrixWorld(),
          (a = Re.length()))
      } else
        (console.warn(
          'WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.'
        ),
          (this.zoomToCursor = !1))
      a !== null &&
        (this.screenSpacePanning
          ? this.target
              .set(0, 0, -1)
              .transformDirection(this.object.matrix)
              .multiplyScalar(a)
              .add(this.object.position)
          : (Ys.origin.copy(this.object.position),
            Ys.direction.set(0, 0, -1).transformDirection(this.object.matrix),
            Math.abs(this.object.up.dot(Ys.direction)) < xg
              ? this.object.lookAt(this.target)
              : (uc.setFromNormalAndCoplanarPoint(this.object.up, this.target),
                Ys.intersectPlane(uc, this.target))))
    } else if (this.object.isOrthographicCamera) {
      const a = this.object.zoom
      ;((this.object.zoom = Math.max(
        this.minZoom,
        Math.min(this.maxZoom, this.object.zoom / this._scale)
      )),
        a !== this.object.zoom &&
          (this.object.updateProjectionMatrix(), (r = !0)))
    }
    return (
      (this._scale = 1),
      (this._performCursorZoom = !1),
      r ||
      this._lastPosition.distanceToSquared(this.object.position) > ha ||
      8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > ha ||
      this._lastTargetPosition.distanceToSquared(this.target) > ha
        ? (this.dispatchEvent(hc),
          this._lastPosition.copy(this.object.position),
          this._lastQuaternion.copy(this.object.quaternion),
          this._lastTargetPosition.copy(this.target),
          !0)
        : !1
    )
  }
  _getAutoRotationAngle(t) {
    return t !== null
      ? (je / 60) * this.autoRotateSpeed * t
      : (je / 60 / 60) * this.autoRotateSpeed
  }
  _getZoomScale(t) {
    const e = Math.abs(t * 0.01)
    return Math.pow(0.95, this.zoomSpeed * e)
  }
  _rotateLeft(t) {
    this._sphericalDelta.theta -= t
  }
  _rotateUp(t) {
    this._sphericalDelta.phi -= t
  }
  _panLeft(t, e) {
    ;(Re.setFromMatrixColumn(e, 0),
      Re.multiplyScalar(-t),
      this._panOffset.add(Re))
  }
  _panUp(t, e) {
    ;(this.screenSpacePanning === !0
      ? Re.setFromMatrixColumn(e, 1)
      : (Re.setFromMatrixColumn(e, 0), Re.crossVectors(this.object.up, Re)),
      Re.multiplyScalar(t),
      this._panOffset.add(Re))
  }
  _pan(t, e) {
    const i = this.domElement
    if (this.object.isPerspectiveCamera) {
      const s = this.object.position
      Re.copy(s).sub(this.target)
      let r = Re.length()
      ;((r *= Math.tan(((this.object.fov / 2) * Math.PI) / 180)),
        this._panLeft((2 * t * r) / i.clientHeight, this.object.matrix),
        this._panUp((2 * e * r) / i.clientHeight, this.object.matrix))
    } else
      this.object.isOrthographicCamera
        ? (this._panLeft(
            (t * (this.object.right - this.object.left)) /
              this.object.zoom /
              i.clientWidth,
            this.object.matrix
          ),
          this._panUp(
            (e * (this.object.top - this.object.bottom)) /
              this.object.zoom /
              i.clientHeight,
            this.object.matrix
          ))
        : (console.warn(
            'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.'
          ),
          (this.enablePan = !1))
  }
  _dollyOut(t) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera
      ? (this._scale /= t)
      : (console.warn(
          'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.'
        ),
        (this.enableZoom = !1))
  }
  _dollyIn(t) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera
      ? (this._scale *= t)
      : (console.warn(
          'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.'
        ),
        (this.enableZoom = !1))
  }
  _updateZoomParameters(t, e) {
    if (!this.zoomToCursor) return
    this._performCursorZoom = !0
    const i = this.domElement.getBoundingClientRect(),
      s = t - i.left,
      r = e - i.top,
      a = i.width,
      o = i.height
    ;((this._mouse.x = (s / a) * 2 - 1),
      (this._mouse.y = -(r / o) * 2 + 1),
      this._dollyDirection
        .set(this._mouse.x, this._mouse.y, 1)
        .unproject(this.object)
        .sub(this.object.position)
        .normalize())
  }
  _clampDistance(t) {
    return Math.max(this.minDistance, Math.min(this.maxDistance, t))
  }
  _handleMouseDownRotate(t) {
    this._rotateStart.set(t.clientX, t.clientY)
  }
  _handleMouseDownDolly(t) {
    ;(this._updateZoomParameters(t.clientX, t.clientX),
      this._dollyStart.set(t.clientX, t.clientY))
  }
  _handleMouseDownPan(t) {
    this._panStart.set(t.clientX, t.clientY)
  }
  _handleMouseMoveRotate(t) {
    ;(this._rotateEnd.set(t.clientX, t.clientY),
      this._rotateDelta
        .subVectors(this._rotateEnd, this._rotateStart)
        .multiplyScalar(this.rotateSpeed))
    const e = this.domElement
    ;(this._rotateLeft((je * this._rotateDelta.x) / e.clientHeight),
      this._rotateUp((je * this._rotateDelta.y) / e.clientHeight),
      this._rotateStart.copy(this._rotateEnd),
      this.update())
  }
  _handleMouseMoveDolly(t) {
    ;(this._dollyEnd.set(t.clientX, t.clientY),
      this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart),
      this._dollyDelta.y > 0
        ? this._dollyOut(this._getZoomScale(this._dollyDelta.y))
        : this._dollyDelta.y < 0 &&
          this._dollyIn(this._getZoomScale(this._dollyDelta.y)),
      this._dollyStart.copy(this._dollyEnd),
      this.update())
  }
  _handleMouseMovePan(t) {
    ;(this._panEnd.set(t.clientX, t.clientY),
      this._panDelta
        .subVectors(this._panEnd, this._panStart)
        .multiplyScalar(this.panSpeed),
      this._pan(this._panDelta.x, this._panDelta.y),
      this._panStart.copy(this._panEnd),
      this.update())
  }
  _handleMouseWheel(t) {
    ;(this._updateZoomParameters(t.clientX, t.clientY),
      t.deltaY < 0
        ? this._dollyIn(this._getZoomScale(t.deltaY))
        : t.deltaY > 0 && this._dollyOut(this._getZoomScale(t.deltaY)),
      this.update())
  }
  _handleKeyDown(t) {
    let e = !1
    switch (t.code) {
      case this.keys.UP:
        ;(t.ctrlKey || t.metaKey || t.shiftKey
          ? this.enableRotate &&
            this._rotateUp(
              (je * this.keyRotateSpeed) / this.domElement.clientHeight
            )
          : this.enablePan && this._pan(0, this.keyPanSpeed),
          (e = !0))
        break
      case this.keys.BOTTOM:
        ;(t.ctrlKey || t.metaKey || t.shiftKey
          ? this.enableRotate &&
            this._rotateUp(
              (-je * this.keyRotateSpeed) / this.domElement.clientHeight
            )
          : this.enablePan && this._pan(0, -this.keyPanSpeed),
          (e = !0))
        break
      case this.keys.LEFT:
        ;(t.ctrlKey || t.metaKey || t.shiftKey
          ? this.enableRotate &&
            this._rotateLeft(
              (je * this.keyRotateSpeed) / this.domElement.clientHeight
            )
          : this.enablePan && this._pan(this.keyPanSpeed, 0),
          (e = !0))
        break
      case this.keys.RIGHT:
        ;(t.ctrlKey || t.metaKey || t.shiftKey
          ? this.enableRotate &&
            this._rotateLeft(
              (-je * this.keyRotateSpeed) / this.domElement.clientHeight
            )
          : this.enablePan && this._pan(-this.keyPanSpeed, 0),
          (e = !0))
        break
    }
    e && (t.preventDefault(), this.update())
  }
  _handleTouchStartRotate(t) {
    if (this._pointers.length === 1) this._rotateStart.set(t.pageX, t.pageY)
    else {
      const e = this._getSecondPointerPosition(t),
        i = 0.5 * (t.pageX + e.x),
        s = 0.5 * (t.pageY + e.y)
      this._rotateStart.set(i, s)
    }
  }
  _handleTouchStartPan(t) {
    if (this._pointers.length === 1) this._panStart.set(t.pageX, t.pageY)
    else {
      const e = this._getSecondPointerPosition(t),
        i = 0.5 * (t.pageX + e.x),
        s = 0.5 * (t.pageY + e.y)
      this._panStart.set(i, s)
    }
  }
  _handleTouchStartDolly(t) {
    const e = this._getSecondPointerPosition(t),
      i = t.pageX - e.x,
      s = t.pageY - e.y,
      r = Math.sqrt(i * i + s * s)
    this._dollyStart.set(0, r)
  }
  _handleTouchStartDollyPan(t) {
    ;(this.enableZoom && this._handleTouchStartDolly(t),
      this.enablePan && this._handleTouchStartPan(t))
  }
  _handleTouchStartDollyRotate(t) {
    ;(this.enableZoom && this._handleTouchStartDolly(t),
      this.enableRotate && this._handleTouchStartRotate(t))
  }
  _handleTouchMoveRotate(t) {
    if (this._pointers.length == 1) this._rotateEnd.set(t.pageX, t.pageY)
    else {
      const i = this._getSecondPointerPosition(t),
        s = 0.5 * (t.pageX + i.x),
        r = 0.5 * (t.pageY + i.y)
      this._rotateEnd.set(s, r)
    }
    this._rotateDelta
      .subVectors(this._rotateEnd, this._rotateStart)
      .multiplyScalar(this.rotateSpeed)
    const e = this.domElement
    ;(this._rotateLeft((je * this._rotateDelta.x) / e.clientHeight),
      this._rotateUp((je * this._rotateDelta.y) / e.clientHeight),
      this._rotateStart.copy(this._rotateEnd))
  }
  _handleTouchMovePan(t) {
    if (this._pointers.length === 1) this._panEnd.set(t.pageX, t.pageY)
    else {
      const e = this._getSecondPointerPosition(t),
        i = 0.5 * (t.pageX + e.x),
        s = 0.5 * (t.pageY + e.y)
      this._panEnd.set(i, s)
    }
    ;(this._panDelta
      .subVectors(this._panEnd, this._panStart)
      .multiplyScalar(this.panSpeed),
      this._pan(this._panDelta.x, this._panDelta.y),
      this._panStart.copy(this._panEnd))
  }
  _handleTouchMoveDolly(t) {
    const e = this._getSecondPointerPosition(t),
      i = t.pageX - e.x,
      s = t.pageY - e.y,
      r = Math.sqrt(i * i + s * s)
    ;(this._dollyEnd.set(0, r),
      this._dollyDelta.set(
        0,
        Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed)
      ),
      this._dollyOut(this._dollyDelta.y),
      this._dollyStart.copy(this._dollyEnd))
    const a = (t.pageX + e.x) * 0.5,
      o = (t.pageY + e.y) * 0.5
    this._updateZoomParameters(a, o)
  }
  _handleTouchMoveDollyPan(t) {
    ;(this.enableZoom && this._handleTouchMoveDolly(t),
      this.enablePan && this._handleTouchMovePan(t))
  }
  _handleTouchMoveDollyRotate(t) {
    ;(this.enableZoom && this._handleTouchMoveDolly(t),
      this.enableRotate && this._handleTouchMoveRotate(t))
  }
  _addPointer(t) {
    this._pointers.push(t.pointerId)
  }
  _removePointer(t) {
    delete this._pointerPositions[t.pointerId]
    for (let e = 0; e < this._pointers.length; e++)
      if (this._pointers[e] == t.pointerId) {
        this._pointers.splice(e, 1)
        return
      }
  }
  _isTrackingPointer(t) {
    for (let e = 0; e < this._pointers.length; e++)
      if (this._pointers[e] == t.pointerId) return !0
    return !1
  }
  _trackPointer(t) {
    let e = this._pointerPositions[t.pointerId]
    ;(e === void 0 &&
      ((e = new Nt()), (this._pointerPositions[t.pointerId] = e)),
      e.set(t.pageX, t.pageY))
  }
  _getSecondPointerPosition(t) {
    const e =
      t.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0]
    return this._pointerPositions[e]
  }
  _customWheelEvent(t) {
    const e = t.deltaMode,
      i = { clientX: t.clientX, clientY: t.clientY, deltaY: t.deltaY }
    switch (e) {
      case 1:
        i.deltaY *= 16
        break
      case 2:
        i.deltaY *= 100
        break
    }
    return (t.ctrlKey && !this._controlActive && (i.deltaY *= 10), i)
  }
}
function Mg(n) {
  this.enabled !== !1 &&
    (this._pointers.length === 0 &&
      (this.domElement.setPointerCapture(n.pointerId),
      this.domElement.ownerDocument.addEventListener(
        'pointermove',
        this._onPointerMove
      ),
      this.domElement.ownerDocument.addEventListener(
        'pointerup',
        this._onPointerUp
      )),
    !this._isTrackingPointer(n) &&
      (this._addPointer(n),
      n.pointerType === 'touch' ? this._onTouchStart(n) : this._onMouseDown(n),
      this._cursorStyle === 'grab' &&
        (this.domElement.style.cursor = 'grabbing')))
}
function Sg(n) {
  this.enabled !== !1 &&
    (n.pointerType === 'touch' ? this._onTouchMove(n) : this._onMouseMove(n))
}
function yg(n) {
  switch ((this._removePointer(n), this._pointers.length)) {
    case 0:
      ;(this.domElement.releasePointerCapture(n.pointerId),
        this.domElement.ownerDocument.removeEventListener(
          'pointermove',
          this._onPointerMove
        ),
        this.domElement.ownerDocument.removeEventListener(
          'pointerup',
          this._onPointerUp
        ),
        this.dispatchEvent(hh),
        (this.state = oe.NONE),
        this._cursorStyle === 'grab' && (this.domElement.style.cursor = 'grab'))
      break
    case 1:
      const t = this._pointers[0],
        e = this._pointerPositions[t]
      this._onTouchStart({ pointerId: t, pageX: e.x, pageY: e.y })
      break
  }
}
function bg(n) {
  let t
  switch (n.button) {
    case 0:
      t = this.mouseButtons.LEFT
      break
    case 1:
      t = this.mouseButtons.MIDDLE
      break
    case 2:
      t = this.mouseButtons.RIGHT
      break
    default:
      t = -1
  }
  switch (t) {
    case zn.DOLLY:
      if (this.enableZoom === !1) return
      ;(this._handleMouseDownDolly(n), (this.state = oe.DOLLY))
      break
    case zn.ROTATE:
      if (n.ctrlKey || n.metaKey || n.shiftKey) {
        if (this.enablePan === !1) return
        ;(this._handleMouseDownPan(n), (this.state = oe.PAN))
      } else {
        if (this.enableRotate === !1) return
        ;(this._handleMouseDownRotate(n), (this.state = oe.ROTATE))
      }
      break
    case zn.PAN:
      if (n.ctrlKey || n.metaKey || n.shiftKey) {
        if (this.enableRotate === !1) return
        ;(this._handleMouseDownRotate(n), (this.state = oe.ROTATE))
      } else {
        if (this.enablePan === !1) return
        ;(this._handleMouseDownPan(n), (this.state = oe.PAN))
      }
      break
    default:
      this.state = oe.NONE
  }
  this.state !== oe.NONE && this.dispatchEvent(ko)
}
function Eg(n) {
  switch (this.state) {
    case oe.ROTATE:
      if (this.enableRotate === !1) return
      this._handleMouseMoveRotate(n)
      break
    case oe.DOLLY:
      if (this.enableZoom === !1) return
      this._handleMouseMoveDolly(n)
      break
    case oe.PAN:
      if (this.enablePan === !1) return
      this._handleMouseMovePan(n)
      break
  }
}
function Tg(n) {
  this.enabled === !1 ||
    this.enableZoom === !1 ||
    this.state !== oe.NONE ||
    (n.preventDefault(),
    this.dispatchEvent(ko),
    this._handleMouseWheel(this._customWheelEvent(n)),
    this.dispatchEvent(hh))
}
function wg(n) {
  this.enabled !== !1 && this._handleKeyDown(n)
}
function Ag(n) {
  switch ((this._trackPointer(n), this._pointers.length)) {
    case 1:
      switch (this.touches.ONE) {
        case ri.ROTATE:
          if (this.enableRotate === !1) return
          ;(this._handleTouchStartRotate(n), (this.state = oe.TOUCH_ROTATE))
          break
        case ri.PAN:
          if (this.enablePan === !1) return
          ;(this._handleTouchStartPan(n), (this.state = oe.TOUCH_PAN))
          break
        default:
          this.state = oe.NONE
      }
      break
    case 2:
      switch (this.touches.TWO) {
        case ri.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return
          ;(this._handleTouchStartDollyPan(n),
            (this.state = oe.TOUCH_DOLLY_PAN))
          break
        case ri.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1) return
          ;(this._handleTouchStartDollyRotate(n),
            (this.state = oe.TOUCH_DOLLY_ROTATE))
          break
        default:
          this.state = oe.NONE
      }
      break
    default:
      this.state = oe.NONE
  }
  this.state !== oe.NONE && this.dispatchEvent(ko)
}
function Rg(n) {
  switch ((this._trackPointer(n), this.state)) {
    case oe.TOUCH_ROTATE:
      if (this.enableRotate === !1) return
      ;(this._handleTouchMoveRotate(n), this.update())
      break
    case oe.TOUCH_PAN:
      if (this.enablePan === !1) return
      ;(this._handleTouchMovePan(n), this.update())
      break
    case oe.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1) return
      ;(this._handleTouchMoveDollyPan(n), this.update())
      break
    case oe.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1) return
      ;(this._handleTouchMoveDollyRotate(n), this.update())
      break
    default:
      this.state = oe.NONE
  }
}
function Cg(n) {
  this.enabled !== !1 && n.preventDefault()
}
function Pg(n) {
  n.key === 'Control' &&
    ((this._controlActive = !0),
    this.domElement
      .getRootNode()
      .addEventListener('keyup', this._interceptControlUp, {
        passive: !0,
        capture: !0,
      }))
}
function Lg(n) {
  n.key === 'Control' &&
    ((this._controlActive = !1),
    this.domElement
      .getRootNode()
      .removeEventListener('keyup', this._interceptControlUp, {
        passive: !0,
        capture: !0,
      }))
}
class uh extends ye {
  constructor(t = document.createElement('div')) {
    ;(super(),
      (this.isCSS2DObject = !0),
      (this.element = t),
      (this.element.style.position = 'absolute'),
      (this.element.style.userSelect = 'none'),
      this.element.setAttribute('draggable', !1),
      (this.center = new Nt(0.5, 0.5)),
      this.addEventListener('removed', function () {
        this.traverse(function (e) {
          e.element &&
            e.element instanceof e.element.ownerDocument.defaultView.Element &&
            e.element.parentNode !== null &&
            e.element.remove()
        })
      }))
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      (this.element = t.element.cloneNode(!0)),
      (this.center = t.center),
      this
    )
  }
}
const zi = new D(),
  dc = new le(),
  fc = new le(),
  pc = new D(),
  mc = new D()
class Dg {
  constructor(t = {}) {
    const e = this
    let i, s, r, a
    const o = { objects: new WeakMap() },
      c = t.element !== void 0 ? t.element : document.createElement('div')
    ;((c.style.overflow = 'hidden'),
      (this.domElement = c),
      (this.sortObjects = !0),
      (this.getSize = function () {
        return { width: i, height: s }
      }),
      (this.render = function (g, v) {
        ;(g.matrixWorldAutoUpdate === !0 && g.updateMatrixWorld(),
          v.parent === null &&
            v.matrixWorldAutoUpdate === !0 &&
            v.updateMatrixWorld(),
          dc.copy(v.matrixWorldInverse),
          fc.multiplyMatrices(v.projectionMatrix, dc),
          u(g, g, v),
          this.sortObjects && m(g))
      }),
      (this.setSize = function (g, v) {
        ;((i = g),
          (s = v),
          (r = i / 2),
          (a = s / 2),
          (c.style.width = g + 'px'),
          (c.style.height = v + 'px'))
      }))
    function l(g) {
      g.isCSS2DObject && (g.element.style.display = 'none')
      for (let v = 0, f = g.children.length; v < f; v++) l(g.children[v])
    }
    function u(g, v, f) {
      if (g.visible === !1) {
        l(g)
        return
      }
      if (g.isCSS2DObject) {
        ;(zi.setFromMatrixPosition(g.matrixWorld), zi.applyMatrix4(fc))
        const d = zi.z >= -1 && zi.z <= 1 && g.layers.test(f.layers) === !0,
          M = g.element
        ;((M.style.display = d === !0 ? '' : 'none'),
          d === !0 &&
            (g.onBeforeRender(e, v, f),
            (M.style.transform =
              'translate(' +
              -100 * g.center.x +
              '%,' +
              -100 * g.center.y +
              '%)translate(' +
              (zi.x * r + r) +
              'px,' +
              (-zi.y * a + a) +
              'px)'),
            M.parentNode !== c && c.appendChild(M),
            g.onAfterRender(e, v, f)))
        const T = { distanceToCameraSquared: p(f, g) }
        o.objects.set(g, T)
      }
      for (let d = 0, M = g.children.length; d < M; d++) u(g.children[d], v, f)
    }
    function p(g, v) {
      return (
        pc.setFromMatrixPosition(g.matrixWorld),
        mc.setFromMatrixPosition(v.matrixWorld),
        pc.distanceToSquared(mc)
      )
    }
    function h(g) {
      const v = []
      return (
        g.traverseVisible(function (f) {
          f.isCSS2DObject && v.push(f)
        }),
        v
      )
    }
    function m(g) {
      const v = h(g).sort(function (d, M) {
          if (d.renderOrder !== M.renderOrder)
            return M.renderOrder - d.renderOrder
          const T = o.objects.get(d).distanceToCameraSquared,
            w = o.objects.get(M).distanceToCameraSquared
          return T - w
        }),
        f = v.length
      for (let d = 0, M = v.length; d < M; d++)
        v[d].element.style.zIndex = f - d
    }
  }
}
class Ig extends Xc {
  constructor() {
    ;(super(), (this.name = 'RoomEnvironment'), (this.position.y = -3.5))
    const t = new Ue()
    t.deleteAttribute('uv')
    const e = new _r({ side: qe }),
      i = new _r(),
      s = new eh(16777215, 900, 28, 2)
    ;(s.position.set(0.418, 16.199, 0.3), this.add(s))
    const r = new Jt(t, e)
    ;(r.position.set(-0.757, 13.219, 0.717),
      r.scale.set(31.713, 28.305, 28.591),
      this.add(r))
    const a = new $u(t, i, 6),
      o = new ye()
    ;(o.position.set(-10.906, 2.009, 1.846),
      o.rotation.set(0, -0.195, 0),
      o.scale.set(2.328, 7.905, 4.651),
      o.updateMatrix(),
      a.setMatrixAt(0, o.matrix),
      o.position.set(-5.607, -0.754, -0.758),
      o.rotation.set(0, 0.994, 0),
      o.scale.set(1.97, 1.534, 3.955),
      o.updateMatrix(),
      a.setMatrixAt(1, o.matrix),
      o.position.set(6.167, 0.857, 7.803),
      o.rotation.set(0, 0.561, 0),
      o.scale.set(3.927, 6.285, 3.687),
      o.updateMatrix(),
      a.setMatrixAt(2, o.matrix),
      o.position.set(-2.017, 0.018, 6.124),
      o.rotation.set(0, 0.333, 0),
      o.scale.set(2.002, 4.566, 2.064),
      o.updateMatrix(),
      a.setMatrixAt(3, o.matrix),
      o.position.set(2.291, -0.756, -2.621),
      o.rotation.set(0, -0.286, 0),
      o.scale.set(1.546, 1.552, 1.496),
      o.updateMatrix(),
      a.setMatrixAt(4, o.matrix),
      o.position.set(-2.193, -0.369, -5.547),
      o.rotation.set(0, 0.516, 0),
      o.scale.set(3.875, 3.487, 2.986),
      o.updateMatrix(),
      a.setMatrixAt(5, o.matrix),
      this.add(a))
    const c = new Jt(t, ki(50))
    ;(c.position.set(-16.116, 14.37, 8.208),
      c.scale.set(0.1, 2.428, 2.739),
      this.add(c))
    const l = new Jt(t, ki(50))
    ;(l.position.set(-16.109, 18.021, -8.207),
      l.scale.set(0.1, 2.425, 2.751),
      this.add(l))
    const u = new Jt(t, ki(17))
    ;(u.position.set(14.904, 12.198, -1.832),
      u.scale.set(0.15, 4.265, 6.331),
      this.add(u))
    const p = new Jt(t, ki(43))
    ;(p.position.set(-0.462, 8.89, 14.52),
      p.scale.set(4.38, 5.441, 0.088),
      this.add(p))
    const h = new Jt(t, ki(20))
    ;(h.position.set(3.235, 11.486, -12.541),
      h.scale.set(2.5, 2, 0.1),
      this.add(h))
    const m = new Jt(t, ki(100))
    ;(m.position.set(0, 20, 0), m.scale.set(1, 0.1, 1), this.add(m))
  }
  dispose() {
    const t = new Set()
    this.traverse(e => {
      e.isMesh && (t.add(e.geometry), t.add(e.material))
    })
    for (const e of t) e.dispose()
  }
}
function ki(n) {
  return new cd({ color: 0, emissive: 16777215, emissiveIntensity: n })
}
const Z = {
    sky: 14674679,
    ground: 15133683,
    wall: 16052714,
    wallExt: 15526628,
    trim: 16777215,
    doorLeaf: 13215612,
    doorEntrance: 3494010,
    glass: 11130101,
    frame: 4871528,
    floorWood: 13608570,
    woodLight: 14201994,
    woodMid: 12159838,
    woodDark: 8017462,
    tileFloor: 15331058,
    tileGrout: 13489886,
    sofa: 6258598,
    sofaDark: 4612223,
    fabricBeige: 14931392,
    fabricGrey: 11844806,
    bedding: 16118766,
    blanket: 8298639,
    rug: 14272942,
    black: 2303533,
    steel: 12831443,
    white: 16448250,
    counter: 15856372,
    cabinet: 14341062,
    cabinetDark: 7174792,
    leaf: 5810286,
    leafDark: 4163670,
    pot: 13616307,
    accent: 15246141,
    label: 3103722,
  },
  ua = { ...Z },
  pi = (n, t, e) => new Ot(n).lerp(new Ot(t), e).getHex()
function Ug(n) {
  ;(Object.assign(Z, ua),
    (Z.floorWood = n.floor),
    (Z.wall = n.wall),
    (Z.wallExt = pi(n.wall, 0, 0.04)),
    (Z.woodMid = n.wood),
    (Z.woodLight = pi(n.wood, 16777215, 0.22)),
    (Z.woodDark = pi(n.wood, 0, 0.35)),
    (Z.cabinet = pi(ua.cabinet, n.wood, 0.18)),
    (Z.sofa = n.sofa),
    (Z.sofaDark = pi(n.sofa, 0, 0.25)),
    (Z.accent = n.accent),
    (Z.blanket = pi(n.accent, 16777215, 0.3)),
    (Z.rug = pi(ua.rug, n.floor, 0.25)))
}
const da = new Map()
function vn(n, t = {}) {
  const e = `${n}|${JSON.stringify(t)}`
  return (
    da.has(e) ||
      da.set(e, new _r({ color: n, roughness: 0.78, metalness: 0, ...t })),
    da.get(e)
  )
}
function fo() {
  return vn(Z.glass, {
    transparent: !0,
    opacity: 0.28,
    roughness: 0.05,
    depthWrite: !1,
  })
}
const po = 30,
  gc = 72,
  fa = [4.5, 34],
  pa = [0.15, 1.35],
  ma = new D(5, 0, 3.5),
  _c = Math.PI * 2,
  Ng = n => (n < 0.5 ? 4 * n * n * n : 1 - (-2 * n + 2) ** 3 / 2)
function Fg() {
  const n =
    window.matchMedia?.('(pointer: coarse)').matches ||
    Math.min(window.innerWidth, window.innerHeight) < 640
  return {
    coarse: n,
    maxDpr: n ? 1.5 : 2,
    shadowSize: n ? 1024 : 2048,
    pointLights: !n,
  }
}
function Og(n, t = Fg()) {
  const e = new _g({
    antialias: !0,
    powerPreference: 'high-performance',
    stencil: !1,
  })
  let i = Math.min(window.devicePixelRatio || 1, t.maxDpr)
  ;(e.setPixelRatio(i),
    (e.outputColorSpace = Ke),
    (e.toneMapping = vo),
    (e.toneMappingExposure = 1),
    (e.shadowMap.enabled = !0),
    (e.shadowMap.type = ds),
    (e.shadowMap.autoUpdate = !1),
    (e.shadowMap.needsUpdate = !0),
    Object.assign(e.domElement.style, {
      display: 'block',
      width: '100%',
      height: '100%',
      touchAction: 'none',
      outline: 'none',
    }))
  const s = new Xc()
  ;((s.background = new Ot(Z.sky)), (s.fog = new Do(Z.sky, 40, 120)))
  const r = new sn(po, 1, 0.05, 300)
  r.rotation.order = 'YXZ'
  const a = new Dg()
  ;(Object.assign(a.domElement.style, {
    position: 'absolute',
    left: '0',
    top: '0',
    pointerEvents: 'none',
    overflow: 'hidden',
  }),
    getComputedStyle(n).position === 'static' &&
      (n.style.position = 'relative'),
    n.append(e.domElement, a.domElement))
  const o = new vg(r, e.domElement)
  ;((o.enableDamping = !0),
    (o.dampingFactor = 0.1),
    (o.rotateSpeed = 0.6),
    (o.zoomSpeed = 0.9),
    (o.minDistance = fa[0]),
    (o.maxDistance = fa[1]),
    (o.minPolarAngle = pa[0]),
    (o.maxPolarAngle = pa[1]),
    (o.screenSpacePanning = !1),
    (o.touches = { ONE: ri.ROTATE, TWO: ri.DOLLY_PAN }),
    (o.mouseButtons = { LEFT: zn.ROTATE, MIDDLE: zn.DOLLY, RIGHT: zn.PAN }),
    o.target.copy(ma))
  const c = new dd(14478591, 15787736, 1.1)
  s.add(c)
  const l = new md(16777215, 2.4)
  ;((l.castShadow = !0),
    l.shadow.mapSize.set(t.shadowSize, t.shadowSize),
    (l.shadow.bias = -5e-4),
    (l.shadow.normalBias = 0.03),
    (l.shadow.radius = 4))
  const u = l.shadow.camera
  ;((u.left = -9),
    (u.right = 9),
    (u.top = 9),
    (u.bottom = -9),
    (u.near = 1),
    (u.far = 60),
    l.target.position.copy(ma),
    s.add(l, l.target))
  const p = new co(e),
    h = new Ig()
  ;((s.environment = p.fromScene(h, 0.04).texture),
    (s.environmentIntensity = 0.25),
    h.dispose(),
    p.dispose())
  const m = { left: 0, right: 0, top: 0, bottom: 0 },
    g = { ...m }
  let v = { w: 1, h: 1 }
  function f() {
    const nt = (g.left - g.right) / 2,
      vt = (g.top - g.bottom) / 2
    ;(Math.abs(nt) < 0.5 && Math.abs(vt) < 0.5
      ? r.clearViewOffset()
      : r.setViewOffset(v.w, v.h, -nt, -vt, v.w, v.h),
      r.updateProjectionMatrix())
  }
  const d = new Set(),
    M = new vd()
  let T = 3,
    w = !1,
    C = 0,
    A = 0
  function y(nt = 2) {
    nt > T && (T = nt)
  }
  const _ = () => {
    const nt = n.clientWidth || window.innerWidth,
      vt = n.clientHeight || window.innerHeight
    ;((v = { w: nt, h: vt }),
      e.setSize(nt, vt, !1),
      a.setSize(nt, vt),
      (r.aspect = nt / vt),
      f(),
      y())
  }
  function b(nt) {
    if (!w) {
      ;((A = 0), (C = 0))
      return
    }
    ;(A++,
      nt > 0.03 && C++,
      A >= 40 &&
        (C > 28 &&
          i > 0.9 &&
          ((i = Math.max(0.9, i - 0.25)),
          e.setPixelRatio(i),
          e.setSize(v.w, v.h, !1)),
        (A = 0),
        (C = 0)))
  }
  function P() {
    const nt = Math.min(0.1, M.getDelta())
    for (const _t of d) _t(nt)
    let vt = !1
    for (const _t of ['left', 'right', 'top', 'bottom']) {
      const X = m[_t] - g[_t]
      Math.abs(X) > 0.4
        ? ((g[_t] += X * Math.min(1, nt * 10)), (vt = !0))
        : (g[_t] = m[_t])
    }
    ;(vt && (f(), y()),
      T > 0 ? (T--, e.render(s, r), a.render(s, r), b(nt), (w = !0)) : (w = !1))
  }
  o.addEventListener('change', () => y())
  const R = new D(),
    N = new lo()
  function V() {
    return (
      N.setFromVector3(R.copy(r.position).sub(o.target)),
      {
        target: o.target.clone(),
        distance: N.radius,
        azimuth: N.theta,
        polar: N.phi,
      }
    )
  }
  function W({ target: nt, distance: vt, azimuth: _t, polar: X }) {
    ;(o.target.set(nt.x, nt.y ?? 0, nt.z),
      r.position.copy(o.target).add(R.setFromSphericalCoords(vt, X, _t)),
      r.lookAt(o.target))
  }
  const I = nt => nt - _c * Math.floor((nt + Math.PI) / _c)
  function G(nt) {
    const vt = new D(nt.target.x, nt.target.y ?? 0, nt.target.z),
      _t = new D()
        .setFromSphericalCoords(nt.distance, nt.polar, nt.azimuth)
        .add(vt),
      X = new ye()
    return (
      X.position.copy(_t),
      X.lookAt(vt),
      { pos: _t, quat: X.quaternion.clone(), fov: po }
    )
  }
  let O = null
  function J() {
    ;(o._sphericalDelta?.set(0, 0, 0),
      o._panOffset?.set(0, 0, 0),
      '_scale' in o && (o._scale = 1))
  }
  function et() {
    if (!O) return
    const nt = O
    ;((O = null), J(), nt.resolve(!1))
  }
  o.addEventListener('start', et)
  function dt(nt, { duration: vt = 1.1 } = {}) {
    et()
    const _t = V(),
      X = {
        target: new D(
          nt.target?.x ?? _t.target.x,
          nt.target?.y ?? 0,
          nt.target?.z ?? _t.target.z
        ),
        distance: Ze.clamp(nt.distance ?? _t.distance, ...fa),
        azimuth: nt.azimuth ?? _t.azimuth,
        polar: Ze.clamp(nt.polar ?? _t.polar, ...pa),
      }
    return vt > 0
      ? new Promise(mt => {
          ;((O = {
            kind: 'view',
            from: _t,
            to: X,
            duration: vt,
            resolve: mt,
            t: 0,
            dAz: I(X.azimuth - _t.azimuth),
            d0: Math.log(_t.distance),
            d1: Math.log(X.distance),
          }),
            y(3))
        })
      : (W(X), J(), y(), Promise.resolve(!0))
  }
  function Tt(nt, { duration: vt = 1.2 } = {}) {
    return (
      et(),
      vt > 0
        ? new Promise(_t => {
            ;((O = {
              kind: 'pose',
              pose: nt,
              duration: vt,
              resolve: _t,
              t: 0,
              fromPos: r.position.clone(),
              fromQuat: r.quaternion.clone(),
              fromFov: r.fov,
            }),
              y(3))
          })
        : (r.position.copy(nt.pos),
          r.quaternion.copy(nt.quat),
          (r.fov = nt.fov),
          r.updateProjectionMatrix(),
          y(),
          Promise.resolve(!0))
    )
  }
  function Rt(nt) {
    if (!O) return
    const vt = O
    vt.t = Math.min(1, vt.t + nt / vt.duration)
    const _t = Ng(vt.t)
    if (vt.kind === 'view')
      (R.lerpVectors(vt.from.target, vt.to.target, _t),
        W({
          target: R.clone(),
          distance: Math.exp(Ze.lerp(vt.d0, vt.d1, _t)),
          azimuth: vt.from.azimuth + vt.dAz * _t,
          polar: Ze.lerp(vt.from.polar, vt.to.polar, _t),
        }))
    else {
      ;(r.position.lerpVectors(vt.fromPos, vt.pose.pos, _t),
        r.quaternion.slerpQuaternions(vt.fromQuat, vt.pose.quat, _t))
      const X = Ze.lerp(vt.fromFov, vt.pose.fov, _t)
      X !== r.fov && ((r.fov = X), r.updateProjectionMatrix())
    }
    ;(y(), vt.t >= 1 && ((O = null), J(), vt.resolve(!0)))
  }
  return (
    d.add(Rt),
    _(),
    new ResizeObserver(_).observe(n),
    document.addEventListener('visibilitychange', () => y(3)),
    {
      renderer: e,
      scene: s,
      camera: r,
      controls: o,
      labelRenderer: a,
      hemi: c,
      sun: l,
      center: ma,
      quality: t,
      insets: m,
      invalidate: y,
      invalidateShadows() {
        ;((e.shadowMap.needsUpdate = !0), y())
      },
      onFrame(nt) {
        return (d.add(nt), () => d.delete(nt))
      },
      flyView: dt,
      flyPose: Tt,
      viewPose: G,
      cancelFlight: et,
      getView: V,
      get flying() {
        return !!O
      },
      setInsets(nt) {
        ;(Object.assign(m, nt), y())
      },
      start() {
        e.setAnimationLoop(P)
      },
      pause() {
        e.setAnimationLoop(null)
      },
      resume() {
        ;(M.getDelta(), e.setAnimationLoop(P), y(3))
      },
    }
  )
}
function dh(n, t = !1) {
  const e = n[0].index !== null,
    i = new Set(Object.keys(n[0].attributes)),
    s = new Set(Object.keys(n[0].morphAttributes)),
    r = {},
    a = {},
    o = n[0].morphTargetsRelative,
    c = new Ye()
  let l = 0
  for (let u = 0; u < n.length; ++u) {
    const p = n[u]
    let h = 0
    if (e !== (p.index !== null))
      return (
        console.error(
          'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' +
            u +
            '. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.'
        ),
        null
      )
    for (const m in p.attributes) {
      if (!i.has(m))
        return (
          console.error(
            'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' +
              u +
              '. All geometries must have compatible attributes; make sure "' +
              m +
              '" attribute exists among all geometries, or in none of them.'
          ),
          null
        )
      ;(r[m] === void 0 && (r[m] = []), r[m].push(p.attributes[m]), h++)
    }
    if (h !== i.size)
      return (
        console.error(
          'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' +
            u +
            '. Make sure all geometries have the same number of attributes.'
        ),
        null
      )
    if (o !== p.morphTargetsRelative)
      return (
        console.error(
          'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' +
            u +
            '. .morphTargetsRelative must be consistent throughout all geometries.'
        ),
        null
      )
    for (const m in p.morphAttributes) {
      if (!s.has(m))
        return (
          console.error(
            'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' +
              u +
              '.  .morphAttributes must be consistent throughout all geometries.'
          ),
          null
        )
      ;(a[m] === void 0 && (a[m] = []), a[m].push(p.morphAttributes[m]))
    }
    if (t) {
      let m
      if (e) m = p.index.count
      else if (p.attributes.position !== void 0) m = p.attributes.position.count
      else
        return (
          console.error(
            'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' +
              u +
              '. The geometry must have either an index or a position attribute'
          ),
          null
        )
      ;(c.addGroup(l, m, u), (l += m))
    }
  }
  if (e) {
    let u = 0
    const p = []
    for (let h = 0; h < n.length; ++h) {
      const m = n[h].index
      for (let g = 0; g < m.count; ++g) p.push(m.getX(g) + u)
      u += n[h].attributes.position.count
    }
    c.setIndex(p)
  }
  for (const u in r) {
    const p = xc(r[u])
    if (!p)
      return (
        console.error(
          'THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the ' +
            u +
            ' attribute.'
        ),
        null
      )
    c.setAttribute(u, p)
  }
  for (const u in a) {
    const p = a[u][0].length
    if (p !== 0) {
      ;((c.morphAttributes = c.morphAttributes || {}),
        (c.morphAttributes[u] = []))
      for (let h = 0; h < p; ++h) {
        const m = []
        for (let v = 0; v < a[u].length; ++v) m.push(a[u][v][h])
        const g = xc(m)
        if (!g)
          return (
            console.error(
              'THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the ' +
                u +
                ' morphAttribute.'
            ),
            null
          )
        c.morphAttributes[u].push(g)
      }
    }
  }
  return c
}
function xc(n) {
  let t,
    e,
    i,
    s = -1,
    r = 0
  for (let l = 0; l < n.length; ++l) {
    const u = n[l]
    if ((t === void 0 && (t = u.array.constructor), t !== u.array.constructor))
      return (
        console.error(
          'THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.'
        ),
        null
      )
    if ((e === void 0 && (e = u.itemSize), e !== u.itemSize))
      return (
        console.error(
          'THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.'
        ),
        null
      )
    if ((i === void 0 && (i = u.normalized), i !== u.normalized))
      return (
        console.error(
          'THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.'
        ),
        null
      )
    if ((s === -1 && (s = u.gpuType), s !== u.gpuType))
      return (
        console.error(
          'THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.'
        ),
        null
      )
    r += u.count * e
  }
  const a = new t(r),
    o = new un(a, e, i)
  let c = 0
  for (let l = 0; l < n.length; ++l) {
    const u = n[l]
    if (u.isInterleavedBufferAttribute) {
      const p = c / e
      for (let h = 0, m = u.count; h < m; h++)
        for (let g = 0; g < e; g++) {
          const v = u.getComponent(h, g)
          o.setComponent(h + p, g, v)
        }
    } else a.set(u.array, c)
    c += u.count * e
  }
  return (s !== void 0 && (o.gpuType = s), o)
}
const ii = 2.7,
  Bg = 0.2,
  zg = 0.12,
  Tr = n => (n.x1 - n.x0) * (n.z1 - n.z0),
  Wt = {
    templateId: '',
    bedrooms: 2,
    size: { w: 10, d: 7 },
    rooms: [],
    walls: [],
    placements: [],
    area: 0,
  }
function fh(n) {
  ;((Wt.templateId = n.templateId),
    (Wt.bedrooms = n.bedrooms),
    (Wt.size = n.size),
    (Wt.rooms = n.rooms),
    (Wt.walls = n.walls),
    (Wt.placements = n.placements),
    (Wt.area = n.rooms.reduce((t, e) => t + Tr(e), 0)))
}
const mo = 2.1,
  kg = 0.9,
  ph = 2.1,
  Gg = 2.3
function mh(n, t = 256) {
  const e = document.createElement('canvas')
  ;((e.width = e.height = t), n(e.getContext('2d'), t))
  const i = new nd(e)
  return ((i.wrapS = i.wrapT = lr), (i.colorSpace = Ke), (i.anisotropy = 8), i)
}
const Hg = () => {
    const n = { h: 0, s: 0, l: 0 }
    return (
      new Ot(Z.floorWood).getHSL(n),
      mh((t, e) => {
        const s = e / 8
        for (let r = 0; r < 8; r++) {
          const a = Math.round(n.l * 100) - 3 + ((r * 37) % 7)
          ;((t.fillStyle = `hsl(${Math.round(n.h * 360)} ${Math.round(n.s * 100)}% ${a}%)`),
            t.fillRect(0, r * s, e, s),
            (t.fillStyle = 'rgba(60,35,15,0.07)'))
          for (let o = 0; o < 14; o++)
            t.fillRect(
              (r * 53 + o * 37) % e,
              r * s + ((o * 29) % s),
              30 + ((o * 17) % 60),
              1
            )
          ;((t.fillStyle = 'rgba(60,35,15,0.30)'),
            t.fillRect(0, r * s, e, 1.5),
            t.fillRect((r * 97) % e, r * s, 1.5, s))
        }
      })
    )
  },
  Vg = () =>
    mh((n, t) => {
      ;((n.fillStyle = '#e9eef2'),
        n.fillRect(0, 0, t, t),
        (n.strokeStyle = '#c8d1da'),
        (n.lineWidth = 3),
        n.strokeRect(0, 0, t, t),
        n.strokeRect(t / 2, 0, 0.1, t),
        n.strokeRect(0, t / 2, t, 0.1))
    })
function Wg(n) {
  const t = n.floor === 'wood' ? Hg() : Vg(),
    e = n.floor === 'wood' ? 2.2 : 1.2
  return (
    t.repeat.set((n.x1 - n.x0) / e, (n.z1 - n.z0) / e),
    new _r({ map: t, roughness: n.floor === 'wood' ? 0.55 : 0.3 })
  )
}
const rr = []
function vc(n, t, e, i, s, r, a, o, c, l) {
  if (i - e < 1e-4 || r - s < 1e-4 || o - a < 1e-4) return
  const u = new Ue(i - e, r - s, o - a)
  ;(u.translate((e + i) / 2, (s + r) / 2, (a + o) / 2),
    rr.push({ material: c, geo: u }),
    l && t.push({ x0: e, x1: i, z0: a, z1: o }))
}
function Xg(n) {
  const t = vn(Z.frame)
  for (const i of [...n.children])
    if (i.isMesh && i.material === t) {
      i.updateMatrix()
      const s = i.geometry.clone().applyMatrix4(i.matrix)
      ;(rr.push({ material: t, geo: s }), i.geometry.dispose(), n.remove(i))
    }
  const e = new Map()
  for (const { material: i, geo: s } of rr)
    (e.has(i) || e.set(i, []), e.get(i).push(s))
  for (const [i, s] of e) {
    const r = new Jt(dh(s, !1), i)
    ;((r.castShadow = !0),
      (r.receiveShadow = !0),
      (r.userData.blocker = !0),
      n.add(r))
    for (const a of s) a.dispose()
  }
  rr.length = 0
}
function qg(n, t, e) {
  const { dir: i, at: s, t: r } = n,
    a = r / 2,
    o = n.from - a,
    c = n.to + a,
    l = r >= 0.2,
    u = vn(l ? Z.wallExt : Z.wall),
    p = [...n.openings]
      .map(g => ({ ...g, s: g.c - g.w / 2, e: g.c + g.w / 2 }))
      .sort((g, v) => g.s - v.s),
    h = (g, v, f, d, M) => {
      i === 'x'
        ? vc(t, e, g, v, f, d, s - a, s + a, u, M)
        : vc(t, e, s - a, s + a, f, d, g, v, u, M)
    }
  let m = o
  for (const g of p) {
    if ((h(m, g.s, 0, ii, !0), g.type === 'window')) {
      const v = g.sill ?? kg
      ;(h(g.s, g.e, 0, v, !0), h(g.s, g.e, ph, ii, !1), Yg(t, i, s, g, v))
    } else
      g.type === 'door'
        ? (h(g.s, g.e, mo, ii, !1), jg(t, i, s, g, l))
        : h(g.s, g.e, Gg, ii, !1)
    m = g.e
  }
  h(m, c, 0, ii, !0)
}
function Yg(n, t, e, i, s) {
  const r = ph - s,
    a = t === 'x' ? [i.w, r, 0.03] : [0.03, r, i.w],
    o = new Jt(new Ue(...a), fo()),
    c = s + r / 2
  ;(t === 'x' ? o.position.set(i.c, c, e) : o.position.set(e, c, i.c), n.add(o))
  const l = i.w > 1.1 ? 1 : 0,
    u = vn(Z.frame)
  for (let h = -1; h <= l; h += 2) {
    const m = l ? 0 : h < 0 ? -i.w / 2 : i.w / 2,
      g = new Jt(new Ue(...(t === 'x' ? [0.04, r, 0.06] : [0.06, r, 0.04])), u)
    ;(t === 'x' ? g.position.set(i.c + m, c, e) : g.position.set(e, c, i.c + m),
      n.add(g))
  }
  const p = new Jt(
    new Ue(...(t === 'x' ? [i.w, 0.04, 0.08] : [0.08, 0.04, i.w])),
    u
  )
  ;(t === 'x'
    ? p.position.set(i.c, s + 0.02, e)
    : p.position.set(e, s + 0.02, i.c),
    n.add(p))
}
function jg(n, t, e, i, s) {
  const r = i.w - 0.04,
    a = new Jt(
      new Ue(r, mo - 0.03, 0.045),
      vn(s ? Z.doorEntrance : Z.doorLeaf, { roughness: 0.5 })
    )
  ;(a.position.set(r / 2, (mo - 0.03) / 2, 0), (a.castShadow = !0))
  const o = new ie()
  ;(o.add(a),
    t === 'x'
      ? (o.position.set(i.s + 0.02, 0, e), (o.rotation.y = s ? 0 : -1.3))
      : (o.position.set(e, 0, i.s + 0.02),
        (o.rotation.y = -Math.PI / 2 + (s ? 0 : 1.3))),
    n.add(o))
}
function Kg(n) {
  const t = document.createElement('button')
  ;((t.type = 'button'),
    (t.className = 'room-label'),
    (t.dataset.room = n.id),
    (t.innerHTML = `<b>${n.name}</b><span>${Tr(n).toFixed(0)} m²</span>`))
  const e = new uh(t)
  return (e.position.set((n.x0 + n.x1) / 2, 0.5, (n.z0 + n.z1) / 2), e)
}
function $g() {
  const n = new ie(),
    t = new ie(),
    e = [],
    i = new Jt(new No(60, 48), vn(Z.ground, { roughness: 1 }))
  ;((i.rotation.x = -Math.PI / 2),
    i.position.set(Wt.size.w / 2, -0.21, Wt.size.d / 2),
    (i.receiveShadow = !0),
    n.add(i))
  const s = new Jt(new Ue(Wt.size.w + 0.9, 0.2, Wt.size.d + 0.9), vn(14278116))
  ;(s.position.set(Wt.size.w / 2, -0.1, Wt.size.d / 2),
    (s.receiveShadow = !0),
    (s.castShadow = !0),
    n.add(s))
  const r = [],
    a = new Map()
  for (const l of Wt.rooms) {
    const u = new Jt(new Ue(l.x1 - l.x0, 0.04, l.z1 - l.z0), Wg(l))
    ;(u.position.set((l.x0 + l.x1) / 2, 0.02, (l.z0 + l.z1) / 2),
      (u.receiveShadow = !0),
      (u.userData.ref = { type: 'room', id: l.id }),
      a.set(l.id, u),
      n.add(u))
    const p = Kg(l)
    ;(n.add(p), r.push(p))
  }
  for (const l of Wt.walls) qg(l, t, e)
  ;(Xg(t), n.add(t))
  const o = new Jt(
    new Ue(Wt.size.w + 0.2, 0.1, Wt.size.d + 0.2),
    vn(Z.trim, { roughness: 0.95 })
  )
  ;(o.position.set(Wt.size.w / 2, ii + 0.05, Wt.size.d / 2),
    (o.castShadow = !0),
    (o.receiveShadow = !0),
    (o.visible = !1),
    n.add(o))
  const c = Wt.rooms.map(l => {
    const u = new eh(16773336, 7, 8, 2)
    return (
      u.position.set((l.x0 + l.x1) / 2, ii - 0.3, (l.z0 + l.z1) / 2),
      n.add(u),
      u
    )
  })
  return {
    root: n,
    walls: t,
    ceiling: o,
    labels: r,
    lamps: c,
    colliders: e,
    floors: a,
  }
}
function wt(n, t, e, i, s, r, a, o, c) {
  const l = new Jt(new Ue(t, e, i), typeof s == 'object' ? s : vn(s, c))
  return (
    l.position.set(r, a + e / 2, o),
    (l.castShadow = !0),
    (l.receiveShadow = !0),
    n.add(l),
    l
  )
}
function on(n, t, e, i, s, r, a, o, c, l = 24) {
  const u = new Jt(new Fo(t, e, i, l), vn(s, c))
  return (
    u.position.set(r, a + i / 2, o),
    (u.castShadow = !0),
    (u.receiveShadow = !0),
    n.add(u),
    u
  )
}
function ar(n, t, e, i, s, r, a = 1, o = 1, c = 1) {
  const l = new Jt(new Oo(t, 16, 12), vn(e))
  return (
    l.position.set(i, s, r),
    l.scale.set(a, o, c),
    (l.castShadow = !0),
    n.add(l),
    l
  )
}
const De = (n, t, e, i = {}) => ({ group: n, w: t, d: e, ...i })
function Zg(n = 2.4) {
  const t = new ie(),
    e = 0.95
  wt(t, n, 0.16, e, Z.sofaDark, 0, 0.08, 0)
  const i = 3,
    s = (n - 0.3) / i
  for (let r = 0; r < i; r++)
    wt(t, s - 0.02, 0.2, 0.68, Z.sofa, -n / 2 + 0.15 + s * (r + 0.5), 0.24, 0.1)
  wt(t, n, 0.5, 0.22, Z.sofa, 0, 0.24, -e / 2 + 0.11)
  for (const r of [-1, 1])
    wt(t, 0.15, 0.36, e, Z.sofa, r * (n / 2 - 0.075), 0.24, 0)
  return (
    wt(t, 0.45, 0.4, 0.12, Z.accent, -n / 2 + 0.55, 0.44, -0.2),
    wt(t, 0.45, 0.4, 0.12, Z.fabricBeige, n / 2 - 0.55, 0.44, -0.2),
    De(t, n, e)
  )
}
function Jg() {
  const n = new ie()
  ;(wt(n, 0.85, 0.16, 0.85, Z.sofaDark, 0, 0.08, 0),
    wt(n, 0.6, 0.18, 0.6, Z.fabricBeige, 0, 0.24, 0.07),
    wt(n, 0.85, 0.5, 0.2, Z.fabricBeige, 0, 0.24, -0.325))
  for (const t of [-1, 1])
    wt(n, 0.13, 0.34, 0.85, Z.fabricBeige, t * 0.36, 0.24, 0)
  return De(n, 0.85, 0.85)
}
function Qg() {
  const n = new ie()
  wt(n, 1.1, 0.04, 0.6, Z.woodLight, 0, 0.38, 0)
  for (const t of [-1, 1])
    for (const e of [-1, 1])
      wt(n, 0.05, 0.38, 0.05, Z.woodDark, t * 0.5, 0, e * 0.25)
  return (
    wt(n, 0.3, 0.05, 0.2, Z.white, -0.2, 0.42, 0),
    on(n, 0.06, 0.05, 0.1, Z.accent, 0.25, 0.42, 0.05),
    De(n, 1.1, 0.6)
  )
}
function t_(n = 1.8) {
  const t = new ie()
  return (
    wt(t, n, 0.45, 0.4, Z.woodMid, 0, 0, 0),
    wt(t, n - 0.1, 0.02, 0.38, Z.woodDark, 0, 0.22, 0.01),
    wt(t, 1.35, 0.78, 0.05, Z.black, 0, 0.55, 0),
    wt(t, 0.25, 0.1, 0.12, Z.black, 0, 0.45, 0),
    De(t, n, 0.4)
  )
}
function e_(n, t, e = Z.rug) {
  e === 'beige' && (e = Z.fabricBeige)
  const i = new ie()
  return (
    wt(i, n, 0.015, t, e, 0, 0.04, 0),
    wt(i, n - 0.3, 0.017, t - 0.3, Z.fabricGrey, 0, 0.04, 0),
    De(i, n, t, { solid: !1 })
  )
}
function n_(n = 1) {
  const t = new ie()
  return (
    on(t, 0.18 * n, 0.13 * n, 0.32 * n, Z.pot, 0, 0, 0),
    ar(t, 0.3 * n, Z.leaf, 0, 0.62 * n, 0, 1, 1.2, 1),
    ar(t, 0.2 * n, Z.leafDark, 0.12 * n, 0.85 * n, 0.05 * n),
    ar(t, 0.18 * n, Z.leaf, -0.1 * n, 0.95 * n, -0.05 * n),
    De(t, 0.4 * n, 0.4 * n)
  )
}
function i_() {
  const n = new ie()
  ;(on(n, 0.12, 0.12, 0.03, Z.black, 0, 0, 0),
    on(n, 0.012, 0.012, 1.5, Z.black, 0, 0.03, 0))
  const t = on(n, 0.15, 0.22, 0.28, 16773590, 0, 1.45, 0, {
    emissive: 16769704,
    emissiveIntensity: 0.6,
  })
  return ((t.castShadow = !1), De(n, 0.3, 0.3))
}
function s_(n = 1) {
  const t = new ie()
  ;(wt(t, n, 0.04, 0.3, Z.woodMid, 0, 0.78, 0),
    wt(t, n - 0.04, 0.5, 0.28, Z.cabinet, 0, 0.28, 0))
  for (const e of [-1, 1])
    wt(t, 0.04, 0.28, 0.04, Z.woodDark, e * (n / 2 - 0.05), 0, 0)
  return (
    on(t, 0.07, 0.05, 0.16, Z.pot, -0.25, 0.82, 0),
    wt(t, 0.22, 0.02, 0.15, Z.accent, 0.2, 0.82, 0),
    De(t, n, 0.3)
  )
}
function r_(n = 1.6, t = 2) {
  const e = new ie()
  ;(wt(e, n + 0.1, 0.25, t + 0.05, Z.woodDark, 0, 0, 0),
    wt(e, n, 0.22, t, Z.bedding, 0, 0.25, 0.02),
    wt(e, n, 0.04, t * 0.55, Z.blanket, 0, 0.46, t * 0.2),
    wt(e, n + 0.1, 0.95, 0.08, Z.woodMid, 0, 0, -t / 2 - 0))
  for (const i of [-1, 1])
    wt(e, 0.55, 0.12, 0.35, Z.white, i * n * 0.25, 0.47, -t / 2 + 0.3)
  return De(e, n + 0.1, t + 0.05)
}
function a_() {
  const n = new ie()
  ;(wt(n, 0.45, 0.5, 0.4, Z.woodLight, 0, 0, 0),
    wt(n, 0.4, 0.01, 0.01, Z.woodDark, 0, 0.3, 0.2))
  const t = on(n, 0.09, 0.12, 0.16, 16773590, 0, 0.5, 0, {
    emissive: 16769704,
    emissiveIntensity: 0.5,
  })
  return ((t.castShadow = !1), De(n, 0.45, 0.4))
}
function o_(n = 1.4, t = 2.2) {
  const e = new ie()
  wt(e, n, t, 0.6, Z.cabinet, 0, 0, 0)
  const i = Math.max(2, Math.round(n / 0.7))
  for (let s = 1; s < i; s++)
    wt(
      e,
      0.012,
      t - 0.1,
      0.01,
      Z.cabinetDark,
      -n / 2 + (n / i) * s,
      0.05,
      0.305
    )
  for (let s = 0; s < i; s++) {
    const r = -n / 2 + (n / i) * (s + 0.5)
    wt(e, 0.025, 0.28, 0.02, Z.steel, r + (s % 2 ? -0.1 : 0.1), 1, 0.31)
  }
  return De(e, n, 0.6)
}
function l_() {
  const n = new ie()
  wt(n, 1.2, 0.04, 0.6, Z.woodLight, 0, 0.72, 0)
  for (const t of [-1, 1]) wt(n, 0.04, 0.72, 0.55, Z.woodDark, t * 0.56, 0, 0)
  return (
    wt(n, 0.5, 0.3, 0.03, Z.black, 0, 0.9, -0.12),
    wt(n, 0.06, 0.18, 0.06, Z.black, 0, 0.76, -0.12),
    wt(n, 0.4, 0.015, 0.14, Z.white, 0, 0.76, 0.1),
    De(n, 1.2, 0.6)
  )
}
function c_() {
  const n = new ie()
  wt(n, 0.42, 0.04, 0.42, Z.woodLight, 0, 0.44, 0)
  for (const t of [-1, 1])
    for (const e of [-1, 1])
      wt(n, 0.035, 0.44, 0.035, Z.woodDark, t * 0.18, 0, e * 0.18)
  return (
    wt(n, 0.42, 0.42, 0.04, Z.woodLight, 0, 0.48, -0.19),
    De(n, 0.42, 0.42)
  )
}
function h_() {
  const n = new ie()
  wt(n, 1.4, 0.05, 0.8, Z.woodLight, 0, 0.72, 0)
  for (const t of [-1, 1])
    for (const e of [-1, 1])
      wt(n, 0.06, 0.72, 0.06, Z.woodDark, t * 0.64, 0, e * 0.34)
  return (
    on(n, 0.11, 0.08, 0.16, Z.white, 0, 0.77, 0),
    ar(n, 0.1, Z.accent, 0, 1, 0),
    De(n, 1.4, 0.8)
  )
}
function u_(n = 3, t = !0) {
  const e = new ie(),
    i = 0.6
  ;(wt(e, n, 0.86, i, Z.cabinet, 0, 0, 0),
    wt(e, n + 0.02, 0.04, i + 0.04, Z.counter, 0, 0.86, 0.02))
  for (let s = 1; s < Math.round(n / 0.6); s++)
    wt(e, 0.01, 0.8, 0.01, Z.cabinetDark, -n / 2 + s * 0.6, 0.03, i / 2 + 0.005)
  ;(wt(e, 0.7, 0.012, 0.42, Z.steel, -n * 0.25, 0.9, 0.02),
    on(e, 0.015, 0.015, 0.28, Z.steel, -n * 0.25, 0.9, -0.2),
    wt(e, 0.012, 0.012, 0.14, Z.steel, -n * 0.25, 1.17, -0.13),
    wt(e, 0.6, 0.012, 0.5, Z.black, n * 0.2, 0.9, 0.02))
  for (const [s, r] of [
    [-0.14, -0.1],
    [0.14, -0.1],
    [-0.14, 0.12],
    [0.14, 0.12],
  ])
    on(e, 0.08, 0.08, 0.008, Z.cabinetDark, n * 0.2 + s, 0.9, 0.02 + r, {}, 20)
  return (
    wt(e, n, 0.7, 0.35, Z.cabinet, 0, 1.5, -0.125),
    wt(e, 0.75, 0.12, 0.4, Z.steel, n * 0.2, 1.38, -0.1),
    De(e, n, i)
  )
}
function d_() {
  const n = new ie()
  return (
    wt(n, 0.7, 1.85, 0.7, Z.steel, 0, 0, 0, {
      metalness: 0.35,
      roughness: 0.4,
    }),
    wt(n, 0.68, 0.012, 0.01, Z.cabinetDark, 0, 0.62, 0.355),
    wt(n, 0.025, 0.5, 0.03, Z.cabinetDark, 0.28, 1.1, 0.36),
    wt(n, 0.025, 0.3, 0.03, Z.cabinetDark, 0.28, 0.25, 0.36),
    De(n, 0.7, 0.7)
  )
}
function f_() {
  const n = new ie()
  return (
    wt(n, 0.38, 0.4, 0.2, Z.white, 0, 0.35, -0.2),
    wt(n, 0.36, 0.38, 0.5, Z.white, 0, 0, 0),
    wt(n, 0.36, 0.04, 0.4, Z.white, 0, 0.38, 0.05),
    De(n, 0.4, 0.62)
  )
}
function p_() {
  const n = new ie()
  return (
    wt(n, 0.6, 0.78, 0.5, Z.cabinet, 0, 0, 0),
    wt(n, 0.64, 0.04, 0.54, Z.counter, 0, 0.78, 0),
    wt(n, 0.34, 0.01, 0.28, Z.white, 0, 0.82, 0.02),
    on(n, 0.012, 0.012, 0.16, Z.steel, 0, 0.82, -0.18),
    wt(n, 0.5, 0.7, 0.02, Z.glass, 0, 1.15, -0.24, {
      transparent: !0,
      opacity: 0.55,
      metalness: 0.8,
      roughness: 0.05,
    }),
    De(n, 0.64, 0.54)
  )
}
function m_() {
  const n = new ie()
  wt(n, 0.9, 0.06, 0.9, Z.white, 0, 0, 0)
  const t = new Jt(new Ue(0.9, 1.95, 0.025), fo())
  ;(t.position.set(0, 0.06 + 0.975, 0.45), n.add(t))
  const e = new Jt(new Ue(0.025, 1.95, 0.9), fo())
  return (
    e.position.set(0.45, 0.06 + 0.975, 0),
    n.add(e),
    on(n, 0.012, 0.012, 1.1, Z.steel, -0.38, 1, -0.38),
    on(n, 0.09, 0.09, 0.015, Z.steel, -0.3, 2.05, -0.38),
    De(n, 0.9, 0.9)
  )
}
function g_(n, t, e, i, s, r = 0) {
  if (
    (e.group.position.set(i, 0, s),
    (e.group.rotation.y = r),
    n.add(e.group),
    e.solid === !1)
  )
    return e.group
  const a = Math.abs(Math.sin(r)) > 0.5,
    o = a ? e.d : e.w,
    c = a ? e.w : e.d
  return (
    t.push({ x0: i - o / 2, x1: i + o / 2, z0: s - c / 2, z1: s + c / 2 }),
    e.group
  )
}
const __ = {
  sofa: Zg,
  armchair: Jg,
  coffeeTable: Qg,
  tvUnit: t_,
  rug: e_,
  plant: n_,
  floorLamp: i_,
  console: s_,
  bed: r_,
  nightstand: a_,
  wardrobe: o_,
  desk: l_,
  chair: c_,
  diningTable: h_,
  kitchenRun: u_,
  fridge: d_,
  toilet: f_,
  vanity: p_,
  shower: m_,
}
function x_(n) {
  n.updateMatrixWorld(!0)
  const t = new Map()
  for (const e of [...n.children]) {
    if (!e.isMesh) continue
    const i = e.material.uuid + (e.castShadow ? 'c' : 'n')
    t.has(i) || t.set(i, { material: e.material, cast: e.castShadow, geos: [] })
    const s = e.geometry.clone()
    ;(s.applyMatrix4(e.matrix),
      t.get(i).geos.push(s),
      e.geometry.dispose(),
      n.remove(e))
  }
  for (const e of t.values()) {
    const i = e.geos.length > 1 ? dh(e.geos, !1) : e.geos[0]
    if (e.geos.length > 1) for (const r of e.geos) r.dispose()
    const s = new Jt(i, e.material)
    ;((s.castShadow = e.cast), (s.receiveShadow = !0), n.add(s))
  }
}
function v_() {
  const n = new ie(),
    t = [],
    e = new Map()
  for (const i of Wt.placements) {
    const s = __[i.kind]
    if (!s) throw new Error('Thiếu builder nội thất: ' + i.kind)
    const r = s(...(i.args ?? []))
    ;(i.pick === !1 && (r.solid = !1), x_(r.group))
    const a = g_(n, t, r, i.x, i.z, i.rot ?? 0)
    ;((a.name = i.id), e.set(i.id, a))
  }
  return { root: n, colliders: t, groups: e }
}
const Hi = { room: new Map(), item: new Map() }
function gh(n, t) {
  return (
    Wt.rooms.find(e => n >= e.x0 && n <= e.x1 && t >= e.z0 && t <= e.z1) ?? null
  )
}
function _h() {
  ;((Hi.room = new Map(
    Wt.rooms.map(n => [n.id, { ...n, type: 'room', area: Tr(n) }])
  )),
    (Hi.item = new Map(
      Wt.placements
        .filter(n => n.pick)
        .map(n => [
          n.id,
          { ...n, type: 'item', roomId: gh(n.x, n.z)?.id ?? null, dims: null },
        ])
    )))
}
const Ce = {
    get: (n, t) => Hi[n]?.get(t) ?? null,
    list: n => [...(Hi[n]?.values() ?? [])],
    itemsIn: n => [...Hi.item.values()].filter(t => t.roomId === n),
    room: n => Hi.room.get(n) ?? null,
  },
  js = 0.14,
  M_ = new Ot(14674679),
  S_ = new Ot(16177600),
  y_ = new Ot(16758904),
  b_ = new Ot(16775406)
function E_(n) {
  n.traverse(t => {
    t.isMesh &&
      (t.geometry?.dispose(),
      t.material?.map && (t.material.map.dispose(), t.material.dispose()))
  })
}
function T_(n) {
  const { scene: t, sun: e, hemi: i, quality: s } = n
  let r = null,
    a = null,
    o = []
  const c = new Map(),
    l = new Map(),
    u = [],
    p = [],
    h = [],
    m = (y, _) => `${y}:${_}`
  let g = js,
    v = js,
    f = 1.5,
    d = !1,
    M = 10
  function T() {
    for (const y of [r?.root, a?.root]) y && (t.remove(y), E_(y))
    ;((r = a = null),
      (o = []),
      c.clear(),
      l.clear(),
      (u.length = 0),
      (p.length = 0),
      (h.length = 0))
  }
  function w() {
    const y = Wt.size.w,
      _ = Wt.size.d
    ;(n.center.set(y / 2, 0, _ / 2), e.target.position.copy(n.center))
    const b = Math.max(y, _) * 0.9,
      P = e.shadow.camera
    ;((P.left = -b),
      (P.right = b),
      (P.top = b),
      (P.bottom = -b),
      P.updateProjectionMatrix())
  }
  function C() {
    if (((r = $g()), (a = v_()), t.add(r.root, a.root), !s.pointLights))
      for (const _ of r.lamps) r.root.remove(_)
    o = s.pointLights ? r.lamps : []
    for (const _ of Ce.list('room')) {
      const b = r.floors.get(_.id)
      ;(c.set(m('room', _.id), b),
        u.push(b),
        l.set(
          m('room', _.id),
          new xn(new D(_.x0, 0, _.z0), new D(_.x1, 0.08, _.z1))
        ))
    }
    const y = new D()
    for (const _ of Ce.list('item')) {
      const b = a.groups.get(_.id)
      if (!b) continue
      ;((b.userData.ref = { type: 'item', id: _.id }),
        c.set(m('item', _.id), b),
        u.push(b))
      const P = new xn().setFromObject(b)
      ;(l.set(m('item', _.id), P),
        P.getSize(y),
        (_.dims = { w: y.x, d: y.z, h: y.y }))
    }
    ;(p.push(...r.walls.children.filter(_ => _.isMesh)),
      h.push(...r.colliders, ...a.colliders),
      w(),
      A.snapWalking(d),
      A.setHour(M))
  }
  const A = {
    pickables: u,
    blockers: p,
    colliders: h,
    get walls() {
      return r?.walls
    },
    get ceiling() {
      return r?.ceiling
    },
    get labels() {
      return r?.labels ?? []
    },
    getObject: (y, _) => c.get(m(y, _)) ?? null,
    getBox: (y, _ = new xn()) => {
      const b = l.get(m(y.type, y.id))
      return b ? _.copy(b) : null
    },
    getEntityPosition(y, _, b = new D()) {
      const P = l.get(m(y, _))
      return P ? P.getCenter(b) : null
    },
    rebuild() {
      ;(T(), C(), n.invalidateShadows())
    },
    setWalking(y) {
      ;((d = y),
        (g = y ? 1 : js),
        (f = y ? 16 : 1.5),
        (t.environmentIntensity = y ? 0.8 : 0.25),
        !y && r && (r.ceiling.visible = !1),
        n.invalidate(3))
    },
    setCeiling(y) {
      ;(r && (r.ceiling.visible = y), n.invalidateShadows())
    },
    setHour(y) {
      M = y
      const b = Ze.clamp((y - 6) / 12, 0, 1) * Math.PI,
        P = Math.sin(b),
        R = n.center
      ;(e.position.set(R.x - Math.cos(b) * 16, 3 + P * 15, R.z + 8),
        (e.intensity = 0.7 + 2.3 * P),
        e.color.lerpColors(y_, b_, Math.min(1, P * 1.6)),
        (i.intensity = 0.7 + 0.6 * P),
        t.background.lerpColors(S_, M_, Math.min(1, P * 1.6)),
        t.fog.color.copy(t.background),
        n.invalidateShadows())
    },
    update(y) {
      r &&
        v !== g &&
        ((v += (g - v) * Math.min(1, y * 5)),
        Math.abs(g - v) < 0.002 && (v = g),
        (r.walls.scale.y = v),
        n.invalidateShadows())
      for (const _ of o)
        _.intensity !== f &&
          ((_.intensity += (f - _.intensity) * Math.min(1, y * 4)),
          Math.abs(f - _.intensity) < 0.02 && (_.intensity = f),
          n.invalidate())
    },
    snapWalking(y) {
      ;((d = y),
        (v = g = y ? 1 : js),
        (f = y ? 16 : 1.5),
        (t.environmentIntensity = y ? 0.8 : 0.25),
        r && ((r.walls.scale.y = v), (r.ceiling.visible = y)))
      for (const _ of o) _.intensity = f
      n.invalidateShadows()
    },
    wallHeight: ii,
  }
  return (C(), A)
}
const xh = 1.62,
  Mc = 0.28,
  w_ = 1.9,
  A_ = 3.4,
  Sc = 0.0036,
  Ks = 0.3,
  yc = {
    KeyW: [0, -1],
    ArrowUp: [0, -1],
    KeyS: [0, 1],
    ArrowDown: [0, 1],
    KeyA: [-1, 0],
    KeyD: [1, 0],
  },
  ga = { ArrowLeft: 1, ArrowRight: -1, KeyQ: 1, KeyE: -1 }
function _a(n, t, e) {
  for (const i of n) {
    const s = Math.max(i.x0, Math.min(t, i.x1)),
      r = Math.max(i.z0, Math.min(e, i.z1)),
      a = t - s,
      o = e - r
    if (a * a + o * o < Mc * Mc) return !0
  }
  return !1
}
function R_({ camera: n, dom: t, colliders: e }) {
  const i = { x: 5, z: 0.7, yaw: Math.PI, pitch: 0, enabled: !1 },
    s = new Set()
  let r = null
  const a = { x: 0, z: 0 },
    o = h => {
      !i.enabled ||
        /^(INPUT|TEXTAREA|SELECT)$/.test(h.target?.tagName ?? '') ||
        ((yc[h.code] || ga[h.code] || h.code === 'ShiftLeft') &&
          (s.add(h.code), h.preventDefault()))
    },
    c = h => s.delete(h.code),
    l = () => s.clear()
  ;(window.addEventListener('keydown', o),
    window.addEventListener('keyup', c),
    window.addEventListener('blur', l),
    t.addEventListener('pointerdown', h => {
      i.enabled &&
        ((r = { id: h.pointerId, x: h.clientX, y: h.clientY }),
        t.setPointerCapture(h.pointerId))
    }),
    t.addEventListener('pointermove', h => {
      !r ||
        h.pointerId !== r.id ||
        ((i.yaw -= (h.clientX - r.x) * Sc),
        (i.pitch = Ze.clamp(i.pitch - (h.clientY - r.y) * Sc, -1.25, 1.25)),
        (r.x = h.clientX),
        (r.y = h.clientY))
    }))
  const u = h => {
    r && h.pointerId === r.id && (r = null)
  }
  ;(t.addEventListener('pointerup', u), t.addEventListener('pointercancel', u))
  function p() {
    ;(n.position.set(i.x, xh, i.z), n.rotation.set(i.pitch, i.yaw, 0, 'YXZ'))
  }
  return {
    state: i,
    set(h, m, g, v = 0) {
      ;((i.x = h), (i.z = m), (i.yaw = g), (i.pitch = v))
    },
    setEnabled(h) {
      ;((i.enabled = h), h || (s.clear(), (r = null), (a.x = a.z = 0)))
    },
    setAxis(h, m) {
      ;((a.x = h), (a.z = m))
    },
    press(h, m) {
      m ? s.add(h) : s.delete(h)
    },
    update(h) {
      if (!i.enabled) return !1
      const m = i.x + i.z * 31 + i.yaw * 57 + i.pitch * 91
      for (const f of s) ga[f] && (i.yaw += ga[f] * 1.8 * h)
      let g = a.x,
        v = a.z
      for (const f of s) {
        const d = yc[f]
        d && ((g += d[0]), (v += d[1]))
      }
      if (g || v) {
        const f = Math.max(1, Math.hypot(g, v))
        ;((g /= f), (v /= f))
        const d = (s.has('ShiftLeft') ? A_ : w_) * h,
          M = Math.sin(i.yaw),
          T = Math.cos(i.yaw),
          w = (g * T + v * M) * d,
          C = (-g * M + v * T) * d,
          A = Ze.clamp(i.x + w, Ks, Wt.size.w - Ks),
          y = Ze.clamp(i.z + C, Ks, Wt.size.d - Ks),
          _ = _a(e, i.x, i.z)
        ;((_ || !_a(e, A, i.z)) && (i.x = A),
          (_ || !_a(e, i.x, y)) && (i.z = y))
      }
      return (p(), i.x + i.z * 31 + i.yaw * 57 + i.pitch * 91 !== m)
    },
    applyToCamera: p,
    dispose() {
      ;(window.removeEventListener('keydown', o),
        window.removeEventListener('keyup', c),
        window.removeEventListener('blur', l))
    },
  }
}
const C_ = {
  mode: 'overview',
  roomId: null,
  selection: null,
  hover: null,
  hour: 10,
  playing: !1,
  menu: null,
  searchQuery: '',
  designs: [],
  designId: null,
}
function P_(n) {
  let t = { ...n }
  const e = new Set()
  return {
    get state() {
      return t
    },
    set(i) {
      const s = t,
        r = Object.keys(i).filter(a => !Object.is(s[a], i[a]))
      if (r.length) {
        t = { ...s, ...i }
        for (const a of [...e]) a(t, s, r)
      }
    },
    subscribe(i) {
      return (e.add(i), () => e.delete(i))
    },
  }
}
const ut = P_(C_)
ut.select = function (t) {
  if (!t) return ut.set({ selection: null })
  const e = Ce.get(t.type, t.id)
  e &&
    ut.set({
      selection: { type: t.type, id: t.id },
      roomId: e.roomId ?? e.id,
      menu: null,
    })
}
function L_() {
  const n = new Map()
  return {
    on(t, e) {
      return (
        n.has(t) || n.set(t, new Set()),
        n.get(t).add(e),
        () => n.get(t)?.delete(e)
      )
    },
    emit(t, e) {
      for (const i of [...(n.get(t) ?? [])]) i(e)
    },
  }
}
const Oe = L_()
function $s() {
  const { w: n, d: t } = Wt.size
  return {
    target: { x: n / 2, y: 0, z: t / 2 },
    distance: Math.max(n, t) * 1.1 + 7.5,
    azimuth: Math.PI - 0.5,
    polar: 0.95,
  }
}
function D_() {
  for (const n of Wt.walls) {
    const t = n.openings.find(e => e.entrance)
    if (t)
      return n.dir === 'x'
        ? { x: t.c, z: n.at + 0.75, yaw: n.at === 0 ? Math.PI : 0 }
        : {
            x: n.at + 0.75,
            z: t.c,
            yaw: n.at === 0 ? -Math.PI / 2 : Math.PI / 2,
          }
  }
  return { x: Wt.size.w / 2, z: Wt.size.d / 2, yaw: Math.PI }
}
const I_ = { zoomIn: 0.75, zoomOut: 1.33 },
  Zs = Math.PI / 6,
  Js = 0.12
function U_(n, t, e) {
  const { camera: i, controls: s } = n,
    r = new D()
  let a = !1,
    o = null
  const c = () => o ?? n.getView()
  function l(y, _) {
    const b = { ...n.getView(), ...y, target: y.target ?? s.target.clone() }
    ;((o = b),
      n.flyView(y, _).then(() => {
        o === b && (o = null)
      }))
  }
  function u(y) {
    const _ = c(),
      b = y.x1 - y.x0,
      P = y.z1 - y.z0
    return {
      target: { x: (y.x0 + y.x1) / 2, y: 0, z: (y.z0 + y.z1) / 2 },
      distance: Math.max(b, P) * 1.45 + 3.5,
      azimuth: _.azimuth,
      polar: Ze.clamp(_.polar, 0.7, 1.1),
    }
  }
  function p(y, _ = 8) {
    const b = t.getEntityPosition(y.type, y.id, new D())
    if (!b) return null
    const P = c()
    return {
      target: { x: b.x, y: 0, z: b.z },
      distance: _,
      azimuth: P.azimuth,
      polar: Ze.clamp(P.polar, 0.7, 1.1),
    }
  }
  function h({ x: y, z: _, yaw: b, pitch: P = 0 }) {
    const R = new Wn().setFromEuler(new Cn(P, b, 0, 'YXZ'))
    return { pos: new D(y, xh, _), quat: R, fov: gc }
  }
  async function m(y, _ = 1.4) {
    ;((s.enabled = !1),
      e.setEnabled(!1),
      t.setWalking(!0),
      e.set(y.x, y.z, y.yaw, 0),
      !(
        !(await n.flyPose(h(y), { duration: _ })) || ut.state.mode !== 'walk'
      ) && (t.setCeiling(!0), e.setEnabled(!0), n.invalidate()))
  }
  async function g(y = $s(), _ = 1.4) {
    ;(e.setEnabled(!1), t.setWalking(!1))
    const b = n.viewPose({ ...y, target: y.target })
    !(await n.flyPose(b, { duration: _ })) ||
      ut.state.mode !== 'overview' ||
      ((n.camera.fov = b.fov),
      n.camera.updateProjectionMatrix(),
      s.target.set(y.target.x, 0, y.target.z),
      (s.enabled = !0),
      s.update(),
      n.invalidate())
  }
  function v(y) {
    return y?.stand ?? D_()
  }
  function f(y) {
    const _ = Ce.room(ut.state.roomId)
    y === 'walk' ? m(v(_)) : g(_ ? u(_) : $s())
  }
  function d(y) {
    const _ = Ce.room(y)
    if (_)
      if ((ut.set({ roomId: y }), ut.state.mode === 'walk')) {
        e.setEnabled(!1)
        const b = v(_)
        ;(e.set(b.x, b.z, b.yaw, 0),
          n.flyPose(h(b), { duration: 1 }).then(P => {
            P && ut.state.mode === 'walk' && e.setEnabled(!0)
          }))
      } else l(u(_), { duration: 1.1 })
  }
  function M(y) {
    if ((i.updateMatrixWorld(), r.copy(y).project(i), r.z > 1)) return null
    const _ = n.renderer.domElement.clientWidth,
      b = n.renderer.domElement.clientHeight,
      { left: P, right: R, top: N, bottom: V } = n.insets,
      W = ((r.x + 1) / 2) * _,
      I = ((1 - r.y) / 2) * b,
      G = Math.max(1, _ - P - R),
      O = Math.max(1, b - N - V)
    return { fx: (W - P) / G, fy: (I - N) / O }
  }
  function T(y) {
    if (ut.state.mode !== 'overview' || n.flying) return
    const _ = t.getEntityPosition(y.type, y.id, new D())
    if (!_) return
    const b = n.getView(),
      P = M(_.clone().setY(0.4))
    if (
      P &&
      P.fx > Js &&
      P.fx < 1 - Js &&
      P.fy > Js &&
      P.fy < 1 - Js &&
      b.distance < 22
    )
      return
    const N = p(y, Math.min(b.distance, 9))
    N && l(N, { duration: 0.9 })
  }
  function w(y) {
    const _ = t.getEntityPosition(y.type, y.id, new D())
    if (_)
      if (ut.state.mode === 'walk') {
        const b = Ce.room(ut.state.roomId) ?? Ce.room(gh(_.x, _.z)?.id),
          P = b ? (b.x0 + b.x1) / 2 : _.x,
          R = b ? (b.z0 + b.z1) / 2 : _.z,
          N = new Nt(P - _.x, R - _.z)
        ;(N.lengthSq() < 1e-4 && N.set(0, 1), N.normalize())
        const V = {
            x: Ze.clamp(_.x + N.x * 1.9, 0.35, 9.65),
            z: Ze.clamp(_.z + N.y * 1.9, 0.35, 6.65),
          },
          W = Math.atan2(-(_.x - V.x), -(_.z - V.z))
        ;(e.setEnabled(!1),
          e.set(V.x, V.z, W, -0.12),
          n
            .flyPose(h({ ...V, yaw: W, pitch: -0.12 }), { duration: 0.9 })
            .then(I => {
              I && ut.state.mode === 'walk' && e.setEnabled(!0)
            }))
      } else {
        const b = p(y, y.type === 'room' ? 12 : 6.5)
        b && l(b, { duration: 1 })
      }
  }
  function C({ cmd: y } = {}) {
    if (ut.state.mode === 'walk') {
      y === 'rotateLeft' || y === 'rotateRight'
        ? ((e.state.yaw += y === 'rotateLeft' ? Zs : -Zs), n.invalidate())
        : y === 'home' && d(ut.state.roomId ?? 'living')
      return
    }
    const _ = c(),
      b = {
        target: _.target,
        distance: _.distance,
        azimuth: _.azimuth,
        polar: _.polar,
      }
    switch (y) {
      case 'zoomIn':
      case 'zoomOut':
        return l({ ...b, distance: _.distance * I_[y] }, { duration: 0.45 })
      case 'rotateLeft':
      case 'rotateRight':
        return l(
          { ...b, azimuth: _.azimuth + (y === 'rotateLeft' ? -Zs : Zs) },
          { duration: 0.6 }
        )
      case 'home':
        return l($s(), { duration: 1.1 })
    }
  }
  const A = [
    ut.subscribe((y, _, b) => {
      ;(n.invalidate(),
        b.includes('mode') && !a
          ? f(y.mode)
          : b.includes('selection') &&
            y.selection &&
            y.selection.type === 'item' &&
            T(y.selection))
    }),
    Oe.on('room:go', ({ id: y }) => d(y)),
    Oe.on('camera:locate', y => (y.type === 'room' ? d(y.id) : w(y))),
    Oe.on('camera:cmd', C),
  ]
  return {
    start({ walk: y = !1, room: _ = null } = {}) {
      o = null
      const b = _ ? Ce.room(_) : null
      if ((b && ut.set({ roomId: b.id }), y)) {
        ;((a = !0), ut.set({ mode: 'walk' }), (a = !1), (s.enabled = !1))
        const P = v(b)
        ;(e.set(P.x, P.z, P.yaw, 0),
          e.applyToCamera(),
          (i.fov = gc),
          i.updateProjectionMatrix(),
          t.snapWalking(!0),
          e.setEnabled(!0))
      } else
        ((a = !0),
          ut.set({ mode: 'overview' }),
          (a = !1),
          e.setEnabled(!1),
          (i.fov = po),
          i.updateProjectionMatrix(),
          t.snapWalking(!1),
          (s.enabled = !0),
          n.flyView(b ? u(b) : $s(), { duration: 0 }))
    },
    update() {
      ut.state.mode === 'overview' && s.enabled && !n.flying && s.update()
    },
    dispose() {
      A.forEach(y => y())
    },
  }
}
const bc = 6,
  N_ = 0.12,
  F_ = 0.05,
  vh = (n, t) => n === t || (!!n && !!t && n.type === t.type && n.id === t.id)
function O_(n, t) {
  const e = new ie()
  ;((e.name = 'interaction-overlay'), n.scene.add(e))
  const i = B_(n, t),
    s = Ec(e, 'selected'),
    r = Ec(e, 'hover'),
    a = () => {
      const { hover: c, selection: l } = ut.state
      ;(s.show(l, t), r.show(vh(c, l) ? null : c, t), n.invalidate())
    },
    o = ut.subscribe((c, l, u) => {
      ;(u.includes('selection') || u.includes('hover')) && a()
    })
  return {
    update(c) {
      i.update(c)
    },
    dispose() {
      ;(o(), i.dispose(), n.scene.remove(e))
    },
  }
}
function B_(n, t) {
  const e = n.renderer.domElement,
    i = new xd(),
    s = new Nt()
  let r = null,
    a = null,
    o = !1,
    c = 0
  function l(d, M) {
    const T = e.getBoundingClientRect()
    ;(s.set(
      ((d - T.left) / T.width) * 2 - 1,
      -((M - T.top) / T.height) * 2 + 1
    ),
      i.setFromCamera(s, n.camera))
    const w = i.intersectObjects([...t.pickables, ...t.blockers], !0)
    for (const C of w) {
      if (C.object.userData.blocker) return null
      const A = z_(C.object)
      if (A) return A
    }
    return null
  }
  function u(d) {
    vh(d, ut.state.hover) ||
      ut.set({ hover: d ? { type: d.type, id: d.id } : null })
  }
  const p = d => {
      d.pointerType === 'mouse' &&
        ((r = { x: d.clientX, y: d.clientY }),
        (o = !0),
        a &&
          !a.dragging &&
          Math.hypot(d.clientX - a.x, d.clientY - a.y) > bc &&
          ((a.dragging = !0), u(null)))
    },
    h = d => {
      a = {
        id: d.pointerId,
        x: d.clientX,
        y: d.clientY,
        button: d.button,
        dragging: !1,
      }
    },
    m = d => {
      const M = a
      if (
        ((a = null),
        !M ||
          M.id !== d.pointerId ||
          M.dragging ||
          M.button !== 0 ||
          Math.hypot(d.clientX - M.x, d.clientY - M.y) > bc)
      )
        return
      const T = l(d.clientX, d.clientY)
      T ? ut.select(T) : d.pointerType !== 'mouse' && ut.select(null)
    },
    g = () => {
      a = null
    },
    v = () => {
      ;((r = null), a || u(null))
    },
    f = d => {
      d.key !== 'Escape' ||
        /^(INPUT|TEXTAREA|SELECT)$/.test(d.target?.tagName ?? '') ||
        (ut.state.selection && ut.select(null))
    }
  return (
    e.addEventListener('pointermove', p),
    e.addEventListener('pointerdown', h),
    e.addEventListener('pointerup', m),
    e.addEventListener('pointercancel', g),
    e.addEventListener('pointerleave', v),
    window.addEventListener('keydown', f),
    {
      update(d) {
        if (((c += d), !r || a?.dragging || !o || c < N_ || n.flying)) return
        ;((o = !1), (c = 0))
        const M = l(r.x, r.y)
        ;(u(M), a || (e.style.cursor = M ? 'pointer' : ''))
      },
      dispose() {
        ;(e.removeEventListener('pointermove', p),
          e.removeEventListener('pointerdown', h),
          e.removeEventListener('pointerup', m),
          e.removeEventListener('pointercancel', g),
          e.removeEventListener('pointerleave', v),
          window.removeEventListener('keydown', f))
      },
    }
  )
}
function z_(n) {
  for (let t = n; t; t = t.parent) {
    if (t.visible === !1) return null
    if (t.userData?.ref && Ce.get(t.userData.ref.type, t.userData.ref.id))
      return t.userData.ref
  }
  return null
}
function k_(n = 0.22) {
  const t = []
  for (const i of [-0.5, 0.5])
    for (const s of [-0.5, 0.5])
      for (const r of [-0.5, 0.5])
        (t.push(i, s, r, i - Math.sign(i) * n, s, r),
          t.push(i, s, r, i, s - Math.sign(s) * n, r),
          t.push(i, s, r, i, s, r - Math.sign(r) * n))
  const e = new Ye()
  return (e.setAttribute('position', new be(t, 3)), e)
}
const G_ = k_(),
  H_ = new Ue(1, 1, 1),
  V_ = {
    hover: { color: 9347566, opacity: 0.6, fill: 0.06 },
    selected: { color: 3103722, opacity: 1, fill: 0.14 },
  }
function Ec(n, t) {
  const e = V_[t],
    i = new ie()
  i.visible = !1
  const s = new ed(
    G_,
    new Kc({
      color: e.color,
      transparent: !0,
      opacity: e.opacity,
      depthTest: !1,
      toneMapped: !1,
    })
  )
  s.renderOrder = 20
  const r = new Jt(
    H_,
    new Io({
      color: e.color,
      transparent: !0,
      opacity: e.fill,
      depthWrite: !1,
      toneMapped: !1,
    })
  )
  ;((r.renderOrder = 19), i.add(r, s), n.add(i))
  const a = document.createElement('div')
  a.className = `pill pill--${t}`
  const o = new uh(a)
  ;((o.visible = !1), n.add(o))
  const c = new xn(),
    l = new D(),
    u = new D()
  let p = null
  return {
    show(h, m) {
      if (!h || !m.getBox(h, c)) {
        ;((p = null), (i.visible = !1), (o.visible = !1))
        return
      }
      ;((p = h),
        c.getSize(l).addScalar(F_ * 2),
        c.getCenter(u),
        i.position.copy(u),
        i.scale.copy(l),
        (i.visible = !0))
      const g = Ce.get(h.type, h.id)
      ;((a.textContent = g?.name ?? ''),
        (o.visible = h.type === 'item'),
        o.position.set(u.x, c.max.y + 0.18, u.z))
    },
    get current() {
      return p
    },
  }
}
const xa = n =>
  String(n ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
function W_(n, t = 8) {
  const e = xa(n).trim()
  if (!e) return []
  const i = []
  for (const s of Ce.list('room'))
    xa(s.name).includes(e) &&
      i.push({
        type: 'room',
        id: s.id,
        title: s.name,
        sub: `${s.area.toFixed(0)} m²`,
      })
  for (const s of Ce.list('item')) {
    const r = Ce.room(s.roomId)
    if (
      (xa(
        `${s.name} ${s.category} ${r?.name ?? ''} ${s.material ?? ''}`
      ).includes(e) &&
        i.push({
          type: 'item',
          id: s.id,
          title: s.name,
          sub: `${s.category} · ${r?.name ?? ''}`,
        }),
      i.length >= t)
    )
      break
  }
  return i.slice(0, t)
}
const X_ = n =>
    n ? `${n.w.toFixed(2)} × ${n.d.toFixed(2)} × ${n.h.toFixed(2)} m` : '',
  Ki = {
    modern: {
      label: 'Hiện đại',
      palette: {
        floor: 13608570,
        wall: 16052714,
        wood: 12159838,
        sofa: 6258598,
        accent: 15246141,
      },
    },
    nordic: {
      label: 'Bắc Âu',
      palette: {
        floor: 14929832,
        wall: 16316662,
        wood: 13808780,
        sofa: 9414844,
        accent: 7317664,
      },
    },
    warm: {
      label: 'Ấm cúng',
      palette: {
        floor: 12158040,
        wall: 15918287,
        wood: 10251075,
        sofa: 12874842,
        accent: 14254635,
      },
    },
    luxury: {
      label: 'Sang trọng',
      palette: {
        floor: 9069892,
        wall: 15262422,
        wood: 7031344,
        sofa: 3096149,
        accent: 13214282,
      },
    },
    industrial: {
      label: 'Công nghiệp',
      palette: {
        floor: 9271911,
        wall: 13817305,
        wood: 8216387,
        sofa: 4869975,
        accent: 14250795,
      },
    },
  },
  xr = Object.keys(Ki),
  q_ = ['floor', 'wall', 'wood', 'sofa', 'accent'],
  Y_ = /^#?([0-9a-f]{6})$/i
function j_(n) {
  if (typeof n == 'number' && Number.isInteger(n) && n >= 0 && n <= 16777215)
    return n
  if (typeof n != 'string') return null
  const t = Y_.exec(n.trim())
  return t ? parseInt(t[1], 16) : null
}
function Go(n) {
  if (!n || typeof n != 'object') return null
  const t = typeof n.id == 'string' ? n.id.trim() : '',
    e = typeof n.name == 'string' ? n.name.trim().slice(0, 60) : ''
  if (!t || !e) return null
  const i = {}
  if (n.palette && typeof n.palette == 'object')
    for (const r of q_) {
      const a = j_(n.palette[r])
      a !== null && (i[r] = a)
    }
  const s = Number(n.defaultHour)
  return {
    id: t,
    name: e,
    description:
      typeof n.description == 'string' ? n.description.slice(0, 200) : '',
    theme: xr.includes(n.theme) ? n.theme : 'modern',
    palette: i,
    furnishing: ['bare', 'partial', 'full'].includes(n.furnishing)
      ? n.furnishing
      : null,
    defaultHour: Number.isFinite(s) ? Math.min(18, Math.max(6, s)) : 10,
  }
}
function Mh(n) {
  return {
    ...(Ki[n?.theme]?.palette ?? Ki.modern.palette),
    ...(n?.palette ?? {}),
  }
}
function K_(n) {
  let t = 0
  for (const i of String(n)) t = (t * 31 + i.charCodeAt(0)) >>> 0
  const e = xr[t % xr.length]
  return Go({ id: 'default', name: `Phong cách ${Ki[e].label}`, theme: e })
}
const $_ = {
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  rotateLeft: 'M3 12a9 9 0 1 0 3-6.7M3 4v5h5',
  rotateRight: 'M21 12a9 9 0 1 1-3-6.7M21 4v5h-5',
  home: 'M4 11 12 4l8 7M6 10v10h12V10',
  close: 'M6 6l12 12M18 6 6 18',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4',
  sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4 12H2M22 12h-2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4',
  play: 'M7 5v14l11-7z',
  pause: 'M8 5v14M16 5v14',
  walk: 'M13 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM10 21l2-6-3-2 1-5 3 2 2 3M12 15l3 6',
  cube: 'M12 3 4 7.5v9L12 21l8-4.5v-9zM4 7.5 12 12l8-4.5M12 12v9',
  pin: 'M12 21s-6-5.4-6-10a6 6 0 1 1 12 0c0 4.6-6 10-6 10zM12 8.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z',
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
}
function nn(n, t = 18, e = 1.8) {
  return `<svg class="ico" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${$_[n] ?? ''}"/></svg>`
}
const Te = n =>
    String(n ?? '').replace(/[&<>"']/g, t => `&#${t.charCodeAt(0)};`),
  Z_ = n => {
    const t = Math.floor(n),
      e = Math.round((n - t) * 60)
    return `${String(t).padStart(2, '0')}:${String(e).padStart(2, '0')}`
  }
function J_(n) {
  n.innerHTML = `
    <div class="brand">
      <span class="brand__mark">${nn('cube', 18, 2)}</span>
      <div class="brand__text"><b id="brand-title"></b><small id="brand-sub"></small></div>
    </div>

    <div class="search">
      <span class="search__icon">${nn('search', 16)}</span>
      <input id="q" type="search" placeholder="Tìm phòng, sofa, giường..." autocomplete="off" aria-label="Tìm trong căn hộ" />
      <ul class="search__menu card" role="listbox" hidden></ul>
    </div>

    <div class="designwrap" id="design-wrap" hidden>
      <button class="iconbtn" id="design-btn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Chọn thiết kế">
        <span class="swatches" id="design-swatch"></span><span id="design-name"></span>
      </button>
      <ul class="designpop card" id="design-pop" role="listbox" hidden></ul>
    </div>

    <div class="sunwrap">
      <button class="iconbtn" id="sun-btn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Giờ trong ngày">
        ${nn('sun', 18)}<span id="hour-text"></span>
      </button>
      <div class="sunpop card" id="sun-pop" hidden>
        <label for="hour">Giờ trong ngày</label>
        <input id="hour" type="range" min="6" max="18" step="0.25" />
        <button class="chipbtn" id="play" type="button"></button>
      </div>
    </div>

    <div class="seg" role="tablist" aria-label="Chế độ xem">
      <button role="tab" data-mode="overview" type="button">${nn('cube', 15)}<span>Tổng quan</span></button>
      <button role="tab" data-mode="walk" type="button">${nn('walk', 15)}<span>Đi vào</span></button>
    </div>`
  const t = n.querySelector('#q'),
    e = n.querySelector('.search__menu'),
    i = n.querySelector('#hour'),
    s = n.querySelector('#sun-pop'),
    r = n.querySelector('#sun-btn'),
    a = n.querySelector('#play')
  function o() {
    const f = ut.state.searchQuery,
      d = W_(f)
    ;((e.hidden = !f.trim()),
      (e.innerHTML = d.length
        ? d
            .map(
              M => `
        <li><button type="button" data-type="${M.type}" data-id="${Te(M.id)}">
          <span class="res__ico">${nn(M.type === 'room' ? 'home' : 'pin', 15)}</span>
          <span class="res__txt"><b>${Te(M.title)}</b><small>${Te(M.sub)}</small></span>
        </button></li>`
            )
            .join('')
        : '<li class="res__empty">Không tìm thấy</li>'))
  }
  ;(t.addEventListener('input', () => {
    ;(ut.set({ searchQuery: t.value }), o())
  }),
    t.addEventListener('focus', o),
    t.addEventListener('keydown', f => {
      ;(f.key === 'Escape' &&
        ((t.value = ''),
        ut.set({ searchQuery: '' }),
        (e.hidden = !0),
        t.blur()),
        f.key === 'Enter' && e.querySelector('button')?.click())
    }),
    e.addEventListener('click', f => {
      const d = f.target.closest('button[data-id]')
      if (!d) return
      const M = { type: d.dataset.type, id: d.dataset.id }
      ;((t.value = ''),
        ut.set({ searchQuery: '' }),
        (e.hidden = !0),
        t.blur(),
        M.type === 'room' && Oe.emit('room:go', { id: M.id }),
        ut.select(M),
        M.type === 'item' && Oe.emit('camera:locate', M))
    }),
    document.addEventListener('pointerdown', f => {
      ;(n.querySelector('.search').contains(f.target) || (e.hidden = !0),
        n.querySelector('.sunwrap').contains(f.target) ||
          n.querySelector('#design-wrap').contains(f.target) ||
          ut.set({ menu: null }))
    }),
    r.addEventListener('click', () =>
      ut.set({ menu: ut.state.menu === 'sun' ? null : 'sun' })
    ),
    i.addEventListener('input', () =>
      ut.set({ hour: Number(i.value), playing: !1 })
    ),
    a.addEventListener('click', () => ut.set({ playing: !ut.state.playing })),
    n.querySelector('.seg').addEventListener('click', f => {
      const d = f.target.closest('[data-mode]')
      d && d.dataset.mode !== ut.state.mode && ut.set({ mode: d.dataset.mode })
    }))
  const c = n.querySelector('#design-wrap'),
    l = n.querySelector('#design-btn'),
    u = n.querySelector('#design-pop')
  let p = ''
  function h(f) {
    const d = Mh(f)
    return [d.floor, d.wall, d.sofa, d.accent]
      .map(
        M => `<i style="background:#${M.toString(16).padStart(6, '0')}"></i>`
      )
      .join('')
  }
  function m(f) {
    const { designs: d, designId: M } = f
    c.hidden = d.length < 2
    const T = d.find(C => C.id === M) ?? d[0]
    ;((n.querySelector('#design-name').textContent = T?.name ?? ''),
      (n.querySelector('#design-swatch').innerHTML = T ? h(T) : ''),
      l.setAttribute('aria-expanded', String(f.menu === 'designs')),
      (u.hidden = f.menu !== 'designs'))
    const w = d.map(C => C.id + C.name).join('|') + '#' + M
    w !== p &&
      ((p = w),
      (u.innerHTML = d
        .map(
          C => `<li><button type="button" role="option" data-design="${Te(C.id)}" aria-selected="${C.id === M}" class="${C.id === M ? 'active' : ''}">
          <span class="swatches">${h(C)}</span>
          <span class="res__txt"><b>${Te(C.name)}</b><small>${Te(C.description || Ki[C.theme]?.label || '')}</small></span>
        </button></li>`
        )
        .join('')))
  }
  ;(l.addEventListener('click', () =>
    ut.set({ menu: ut.state.menu === 'designs' ? null : 'designs' })
  ),
    u.addEventListener('click', f => {
      const d = f.target.closest('[data-design]')
      d &&
        (ut.set({ menu: null }),
        Oe.emit('design:select', { id: d.dataset.design }))
    }))
  function g() {
    ;((n.querySelector('#brand-title').textContent =
      Wt.bedrooms === 0 ? 'Căn hộ studio' : `Căn hộ ${Wt.bedrooms} phòng ngủ`),
      (n.querySelector('#brand-sub').textContent =
        `${Wt.area.toFixed(0)} m² · Bố cục minh hoạ`))
  }
  ;(Oe.on('plan:loaded', g), g())
  function v(f) {
    m(f)
    for (const d of n.querySelectorAll('[data-mode]')) {
      const M = d.dataset.mode === f.mode
      ;(d.classList.toggle('active', M),
        d.setAttribute('aria-selected', String(M)))
    }
    ;((n.querySelector('#hour-text').textContent = Z_(f.hour)),
      document.activeElement !== i && (i.value = String(f.hour)),
      (s.hidden = f.menu !== 'sun'),
      r.setAttribute('aria-expanded', String(f.menu === 'sun')),
      (a.innerHTML = `${nn(f.playing ? 'pause' : 'play', 14)}<span>${f.playing ? 'Dừng' : 'Tua ngày'}</span>`))
  }
  ;(ut.subscribe(f => v(f)), v(ut.state))
}
function Q_(n) {
  n.innerHTML = `
    <div class="card rooms" data-inset="rooms">
      <h2 class="rooms__title">Các phòng</h2>
      <ul class="rooms__list" role="list"></ul>
    </div>`
  const t = n.querySelector('.rooms__list')
  function e() {
    ;((t.innerHTML = Ce.list('room')
      .map(
        s => `
          <li><button type="button" class="room" data-room="${Te(s.id)}">
            <span class="room__row"><b>${Te(s.name)}</b><span>${s.area.toFixed(0)} m²</span></span>
            <small>${Te(s.note)}</small>
          </button></li>`
      )
      .join('')),
      i(ut.state))
  }
  n.addEventListener('click', s => {
    const r = s.target.closest('[data-room]')
    r &&
      (ut.set({ selection: null }), Oe.emit('room:go', { id: r.dataset.room }))
  })
  function i(s) {
    for (const r of n.querySelectorAll('[data-room]')) {
      const a = r.dataset.room === s.roomId
      ;(r.classList.toggle('active', a),
        a &&
          window.matchMedia('(max-width: 899px)').matches &&
          r.scrollIntoView({
            inline: 'center',
            block: 'nearest',
            behavior: 'smooth',
          }))
    }
  }
  ;(ut.subscribe((s, r, a) => a.includes('roomId') && i(s)),
    Oe.on('plan:loaded', e),
    e())
}
const Tc = (n, t) =>
  t ? `<div class="kv"><dt>${n}</dt><dd>${Te(t)}</dd></div>` : ''
function tx(n) {
  const t = Ce.room(n.roomId)
  return `
    <header class="detail__head">
      <div>
        <span class="tag">${Te(n.category)}</span>
        <h2>${Te(n.name)}</h2>
        ${t ? `<button type="button" class="link" data-go-room="${Te(t.id)}">${nn('pin', 13)} ${Te(t.name)}</button>` : ''}
      </div>
      <button type="button" class="iconbtn" data-close aria-label="Đóng">${nn('close', 18)}</button>
    </header>
    <dl class="kvs">
      ${Tc('Kích thước', X_(n.dims))}
      ${Tc('Chất liệu', n.material)}
    </dl>
    ${n.note ? `<p class="detail__note">${Te(n.note)}</p>` : ''}
    <div class="detail__actions">
      <button type="button" class="btn btn--primary" data-locate>${nn('eye', 16)} Xem gần</button>
    </div>`
}
function ex(n) {
  const t = Ce.itemsIn(n.id)
  return `
    <header class="detail__head">
      <div>
        <span class="tag">Phòng</span>
        <h2>${Te(n.name)}</h2>
        <small class="muted">${n.area.toFixed(0)} m² · ${t.length} món nội thất</small>
      </div>
      <button type="button" class="iconbtn" data-close aria-label="Đóng">${nn('close', 18)}</button>
    </header>
    <p class="detail__note">${Te(n.note)}</p>
    <ul class="chips" role="list">
      ${t.map(e => `<li><button type="button" class="chip" data-item="${Te(e.id)}">${Te(e.name)}</button></li>`).join('')}
    </ul>
    <div class="detail__actions">
      <button type="button" class="btn btn--primary" data-go-room="${Te(n.id)}">${nn('eye', 16)} Đến phòng này</button>
    </div>`
}
function nx(n) {
  n.innerHTML =
    '<aside class="card detail" data-inset="detail" hidden aria-live="polite"></aside>'
  const t = n.firstElementChild
  t.addEventListener('click', i => {
    if (i.target.closest('[data-close]')) return ut.select(null)
    const s = i.target.closest('[data-go-room]')
    if (s) return Oe.emit('room:go', { id: s.dataset.goRoom })
    const r = i.target.closest('[data-item]')
    if (r) {
      const a = { type: 'item', id: r.dataset.item }
      return (ut.select(a), Oe.emit('camera:locate', a))
    }
    i.target.closest('[data-locate]') &&
      ut.state.selection &&
      Oe.emit('camera:locate', ut.state.selection)
  })
  function e(i) {
    const s = i.selection,
      r = s && Ce.get(s.type, s.id)
    if (!r) {
      ;((t.hidden = !0), (t.innerHTML = ''))
      return
    }
    ;((t.innerHTML = r.type === 'room' ? ex(r) : tx(r)), (t.hidden = !1))
  }
  ;(ut.subscribe((i, s, r) => r.includes('selection') && e(i)), e(ut.state))
}
const ix = [
  [
    { cmd: 'zoomIn', icon: 'plus', label: 'Phóng to' },
    { cmd: 'zoomOut', icon: 'minus', label: 'Thu nhỏ' },
  ],
  [
    { cmd: 'rotateLeft', icon: 'rotateLeft', label: 'Xoay trái' },
    { cmd: 'rotateRight', icon: 'rotateRight', label: 'Xoay phải' },
  ],
  [{ cmd: 'home', icon: 'home', label: 'Về góc nhìn ban đầu' }],
]
function sx(n) {
  ;((n.innerHTML = `<nav class="card mapctl" aria-label="Điều khiển camera">${ix.map(t => t.map(e => `<button class="mapctl__btn" type="button" data-cmd="${e.cmd}" title="${e.label}" aria-label="${e.label}">${nn(e.icon, 17)}</button>`).join('')).join('<span class="mapctl__sep" aria-hidden="true"></span>')}</nav>`),
    n.addEventListener('click', t => {
      const e = t.target.closest('[data-cmd]')
      e && Oe.emit('camera:cmd', { cmd: e.dataset.cmd })
    }))
}
const ls = 46
function rx(n, t) {
  n.innerHTML = `
    <canvas class="minimap card" width="220" height="154" aria-label="Sơ đồ vị trí"></canvas>
    <div class="joy" aria-hidden="true"><div class="joy__knob"></div></div>
    <p class="toast" role="status" hidden></p>`
  const e = n.querySelector('.minimap'),
    i = e.getContext('2d'),
    s = n.querySelector('.joy'),
    r = n.querySelector('.joy__knob'),
    a = n.querySelector('.toast')
  let o = null
  const c = (v, f) => {
    r.style.transform = `translate(${v}px, ${f}px)`
  }
  function l(v) {
    const f = s.getBoundingClientRect()
    let d = v.clientX - (f.left + f.width / 2),
      M = v.clientY - (f.top + f.height / 2)
    const T = Math.hypot(d, M)
    ;(T > ls && ((d = (d / T) * ls), (M = (M / T) * ls)),
      c(d, M),
      t.setAxis(d / ls, M / ls))
  }
  ;(s.addEventListener('pointerdown', v => {
    ;((o = v.pointerId), s.setPointerCapture(o), l(v))
  }),
    s.addEventListener('pointermove', v => v.pointerId === o && l(v)))
  const u = v => {
    v.pointerId === o && ((o = null), c(0, 0), t.setAxis(0, 0))
  }
  ;(s.addEventListener('pointerup', u), s.addEventListener('pointercancel', u))
  function p() {
    const { width: v, height: f } = e,
      d = 12,
      M = Math.min((v - d * 2) / Wt.size.w, (f - d * 2) / Wt.size.d),
      T = (v - Wt.size.w * M) / 2,
      w = (f - Wt.size.d * M) / 2
    ;(i.clearRect(0, 0, v, f),
      (i.font = '11px system-ui, sans-serif'),
      (i.textAlign = 'center'))
    for (const R of Wt.rooms) {
      const N = R.id === ut.state.roomId
      ;((i.fillStyle = N ? '#dfe8ff' : '#f5f7fb'),
        (i.strokeStyle = '#9aa7c2'),
        (i.lineWidth = 1.5),
        i.fillRect(
          T + R.x0 * M,
          w + R.z0 * M,
          (R.x1 - R.x0) * M,
          (R.z1 - R.z0) * M
        ),
        i.strokeRect(
          T + R.x0 * M,
          w + R.z0 * M,
          (R.x1 - R.x0) * M,
          (R.z1 - R.z0) * M
        ),
        (i.fillStyle = '#667085'),
        i.fillText(
          R.name,
          T + ((R.x0 + R.x1) / 2) * M,
          w + ((R.z0 + R.z1) / 2) * M + 4
        ))
    }
    const { x: C, z: A, yaw: y } = t.state,
      _ = T + C * M,
      b = w + A * M,
      P = Math.atan2(-Math.cos(y), -Math.sin(y))
    ;((i.fillStyle = 'rgba(47,91,234,0.25)'),
      i.beginPath(),
      i.moveTo(_, b),
      i.arc(_, b, 26, P - 0.6, P + 0.6),
      i.closePath(),
      i.fill(),
      (i.fillStyle = '#2f5bea'),
      i.beginPath(),
      i.arc(_, b, 5, 0, Math.PI * 2),
      i.fill())
  }
  let h = 0
  function m(v) {
    ;((a.textContent = v),
      (a.hidden = !1),
      clearTimeout(h),
      (h = setTimeout(() => {
        a.hidden = !0
      }, 5e3)))
  }
  function g(v) {
    const f = v.mode === 'walk'
    if (((n.hidden = !f), document.body.classList.toggle('walking', f), f)) {
      const d = window.matchMedia('(pointer: coarse)').matches
      m(
        d
          ? 'Dùng cần bên trái để đi, kéo màn hình để nhìn quanh.'
          : 'WASD hoặc phím mũi tên để đi, Shift để chạy, kéo chuột để nhìn quanh.'
      )
    }
  }
  return (
    ut.subscribe((v, f, d) => d.includes('mode') && g(v)),
    g(ut.state),
    { draw: p }
  )
}
const ax = [
  ['header', 'ui-topbar'],
  ['nav', 'ui-rooms'],
  ['div', 'ui-detail'],
  ['div', 'ui-mapctl'],
  ['div', 'ui-hud'],
]
function ox(n, { app: t, walker: e }) {
  const i = {}
  for (const [c, l] of ax) {
    const u = document.createElement(c)
    ;((u.id = l), (u.className = 'region'), n.append(u), (i[l] = u))
  }
  ;(J_(i['ui-topbar']),
    Q_(i['ui-rooms']),
    nx(i['ui-detail']),
    sx(i['ui-mapctl']))
  const s = rx(i['ui-hud'], e)
  let r = 0
  function a() {
    r = 0
    const c = window.innerWidth,
      l = window.innerHeight,
      u = { left: 0, right: 0, top: 0, bottom: 0 },
      p = c >= 900,
      h = i['ui-topbar'].getBoundingClientRect()
    u.top = Math.max(0, h.bottom)
    const m = n.querySelector('[data-inset="rooms"]')?.getBoundingClientRect()
    m &&
      m.width &&
      (p ? (u.left = m.right) : (u.bottom = Math.max(u.bottom, l - m.top)))
    const g = n.querySelector('[data-inset="detail"]')
    if (g && !g.hidden) {
      const v = g.getBoundingClientRect()
      p ? (u.right = c - v.left) : (u.bottom = Math.max(u.bottom, l - v.top))
    }
    t.setInsets(u)
  }
  const o = () => {
    r || (r = requestAnimationFrame(a))
  }
  return (
    window.addEventListener('resize', o),
    ut.subscribe((c, l, u) => {
      ;(u.includes('selection') || u.includes('mode')) &&
        (o(), setTimeout(o, 320))
    }),
    o(),
    setTimeout(o, 400),
    { hud: s, els: i }
  )
}
const ht = Math.PI,
  te = (n, t, e) => ({ c: n, w: t, type: 'window', ...(e ? { sill: e } : {}) }),
  rn = (n, t = 0.9) => ({ c: n, w: t, type: 'door' }),
  wr = (n, t = 1) => ({ c: n, w: t, type: 'door', entrance: !0 }),
  Ar = (n, t) => ({ c: n, w: t, type: 'open' }),
  $ = (n, t, e, i = 0, s, r) => ({
    kind: n,
    x: t,
    z: e,
    rot: i,
    ...(s ? { args: s } : {}),
    ...(r ? { name: r } : {}),
  }),
  He = (n, t, e, i, s) => ({
    dir: n,
    at: t,
    from: e,
    to: i,
    t: Bg,
    openings: s,
  }),
  Ne = (n, t, e, i, s = []) => ({
    dir: n,
    at: t,
    from: e,
    to: i,
    t: zg,
    openings: s,
  }),
  lx = {
    id: 'studio',
    bedrooms: 0,
    bathrooms: 1,
    size: { w: 7, d: 5.5 },
    rooms: [
      {
        id: 'living',
        name: 'Phòng ở & ngủ',
        x0: 0,
        x1: 7,
        z0: 0,
        z1: 3.5,
        floor: 'wood',
        stand: { x: 3.4, z: 0.7, yaw: ht },
        note: 'Khu ngủ và tiếp khách chung một không gian',
      },
      {
        id: 'kitchen',
        name: 'Bếp',
        x0: 0,
        x1: 4,
        z0: 3.5,
        z1: 5.5,
        floor: 'tile',
        stand: { x: 2.2, z: 4.3, yaw: ht / 2 + 0.5 },
        note: 'Bếp một dãy, lối vào căn hộ',
      },
      {
        id: 'bath',
        name: 'Vệ sinh',
        x0: 4,
        x1: 7,
        z0: 3.5,
        z1: 5.5,
        floor: 'tile',
        stand: { x: 5.5, z: 4, yaw: ht },
        note: 'Buồng tắm kính, bồn rửa, bệ xí',
      },
    ],
    walls: [
      He('x', 0, 0, 7, [te(2.2, 2.4)]),
      He('x', 5.5, 0, 7, [te(5.5, 0.6, 1.5)]),
      He('z', 0, 0, 5.5, [te(1.75, 1.6), wr(4.5)]),
      He('z', 7, 0, 5.5, [te(1.75, 1.6)]),
      Ne('x', 3.5, 0, 7, [Ar(1.3, 2), rn(5.5)]),
      Ne('z', 4, 3.5, 5.5),
    ],
    placements: [
      $('rug', 3.05, 2, 0, [2.6, 1.8]),
      $('sofa', 3.05, 1.5, 0, [2.2]),
      $('coffeeTable', 3.05, 2.5),
      $('tvUnit', 3.05, 3.24, ht, [1.2]),
      $('bed', 5.6, 1.17, 0),
      $('nightstand', 4.4, 0.35, 0),
      $('wardrobe', 6.64, 2.8, -ht / 2, [1.2, 2.3]),
      $('plant', 0.5, 0.5, 0, [1]),
      $('floorLamp', 0.5, 3),
      $('kitchenRun', 1.9, 5.1, ht, [2.6]),
      $('fridge', 3.55, 5.06, ht),
      $('shower', 6.4, 5, 0),
      $('toilet', 4.8, 5.08, ht),
      $('vanity', 4.33, 4.2, ht / 2),
    ],
  },
  cx = {
    id: '1pn',
    bedrooms: 1,
    bathrooms: 1,
    size: { w: 8, d: 6.5 },
    rooms: [
      {
        id: 'living',
        name: 'Phòng khách',
        x0: 0,
        x1: 5,
        z0: 0,
        z1: 4,
        floor: 'wood',
        stand: { x: 3.4, z: 0.7, yaw: ht },
        note: 'Sofa, TV, cửa sổ đón sáng',
      },
      {
        id: 'kitchen',
        name: 'Bếp & ăn',
        x0: 5,
        x1: 8,
        z0: 0,
        z1: 3,
        floor: 'tile',
        stand: { x: 5.8, z: 0.9, yaw: -ht / 2 - 0.4 },
        note: 'Bếp chữ I, bàn ăn 4 chỗ',
      },
      {
        id: 'study',
        name: 'Góc làm việc',
        x0: 5,
        x1: 8,
        z0: 3,
        z1: 6.5,
        floor: 'wood',
        stand: { x: 5.7, z: 3.6, yaw: -ht / 2 + 0.3 },
        note: 'Bàn làm việc, tủ sách',
      },
      {
        id: 'bed1',
        name: 'Phòng ngủ',
        x0: 0,
        x1: 3.4,
        z0: 4,
        z1: 6.5,
        floor: 'wood',
        stand: { x: 2.6, z: 4.5, yaw: ht / 2 + 0.3 },
        note: 'Giường đôi, tủ áo',
      },
      {
        id: 'bath',
        name: 'Vệ sinh',
        x0: 3.4,
        x1: 5,
        z0: 4,
        z1: 6.5,
        floor: 'tile',
        stand: { x: 4.2, z: 4.6, yaw: ht },
        note: 'Buồng tắm kính, bồn rửa, bệ xí',
      },
    ],
    walls: [
      He('x', 0, 0, 8, [te(1.6, 2.2), wr(4.2), te(6.5, 1.6)]),
      He('x', 6.5, 0, 8, [te(1.7, 1.4), te(4.2, 0.6, 1.5), te(6.5, 1.8)]),
      He('z', 0, 0, 6.5, [te(2, 1.8), te(5.25, 1.4)]),
      He('z', 8, 0, 6.5, [te(1.5, 1.2), te(4.75, 1.6)]),
      Ne('z', 5, 0, 6.5, [Ar(1.5, 2), rn(3.5)]),
      Ne('x', 3, 5, 8),
      Ne('x', 4, 0, 5, [rn(1.7), rn(3.95)]),
      Ne('z', 3.4, 4, 6.5),
    ],
    placements: [
      $('rug', 2.8, 2.7, 0, [3, 2]),
      $('sofa', 2.8, 1.6, 0, [2.2]),
      $('coffeeTable', 2.8, 2.8),
      $('tvUnit', 2.8, 3.74, ht, [1.2]),
      $('armchair', 0.9, 2.75, ht / 2),
      $('plant', 0.4, 3.7, 0, [1.1]),
      $('floorLamp', 4.55, 3.1),
      $('console', 1.5, 0.28, 0, [1]),
      $('plant', 0.45, 0.45, 0, [0.8], 'Cây lối vào'),
      $('kitchenRun', 6.2, 2.64, ht, [1.9]),
      $('fridge', 7.55, 2.58, ht),
      $('diningTable', 6.8, 1),
      $('chair', 6.35, 0.4, 0),
      $('chair', 7.25, 0.4, 0),
      $('chair', 6.35, 1.6, ht),
      $('chair', 7.25, 1.6, ht),
      $('rug', 1.7, 5.5, ht / 2, [2.2, 1.6, 'beige']),
      $('bed', 1.17, 5.5, ht / 2),
      $('nightstand', 0.33, 4.42, ht / 2),
      $('wardrobe', 3.04, 5.5, -ht / 2, [1.4, 2.3]),
      $('toilet', 3.8, 6.09, ht),
      $('shower', 4.47, 5.6, 0),
      $('vanity', 4.66, 4.6, -ht / 2),
      $('desk', 7.6, 4.75, -ht / 2),
      $('chair', 7.1, 4.75, ht / 2, void 0, 'Ghế làm việc'),
      $('wardrobe', 6.4, 6.1, ht, [1.2, 2.2], 'Tủ sách / tủ đồ'),
      $('plant', 5.45, 6, 0, [1]),
    ],
  },
  hx = {
    id: '2pn',
    bedrooms: 2,
    bathrooms: 1,
    size: { w: 10, d: 7 },
    rooms: [
      {
        id: 'living',
        name: 'Phòng khách',
        x0: 0,
        x1: 6,
        z0: 0,
        z1: 4.5,
        floor: 'wood',
        stand: { x: 3.4, z: 0.7, yaw: ht },
        note: 'Sofa, TV, cửa sổ đón sáng hướng Nam',
      },
      {
        id: 'kitchen',
        name: 'Bếp & ăn',
        x0: 6,
        x1: 10,
        z0: 0,
        z1: 3,
        floor: 'tile',
        stand: { x: 6.8, z: 0.9, yaw: -ht / 2 - 0.4 },
        note: 'Bếp chữ I, bàn ăn 4 chỗ',
      },
      {
        id: 'bed2',
        name: 'Phòng ngủ 2',
        x0: 6,
        x1: 10,
        z0: 3,
        z1: 7,
        floor: 'wood',
        stand: { x: 6.9, z: 3.9, yaw: -ht / 2 + 0.2 },
        note: 'Giường đôi, tủ áo, bàn làm việc',
      },
      {
        id: 'bed1',
        name: 'Phòng ngủ 1',
        x0: 0,
        x1: 4,
        z0: 4.5,
        z1: 7,
        floor: 'wood',
        stand: { x: 2.8, z: 5.1, yaw: ht / 2 + 0.3 },
        note: 'Giường đôi, tủ áo âm tường',
      },
      {
        id: 'bath',
        name: 'Vệ sinh',
        x0: 4,
        x1: 6,
        z0: 4.5,
        z1: 7,
        floor: 'tile',
        stand: { x: 5, z: 5.2, yaw: ht },
        note: 'Buồng tắm kính, bồn rửa, bệ xí',
      },
    ],
    walls: [
      He('x', 0, 0, 10, [te(2.2, 2.4), wr(5), te(8, 1.6)]),
      He('x', 7, 0, 10, [te(2, 1.4), te(5, 0.6, 1.5), te(8, 2)]),
      He('z', 0, 0, 7, [te(2.5, 1.8), te(5.75, 1.4)]),
      He('z', 10, 0, 7, [te(1.5, 1.2), te(5, 1.6)]),
      Ne('z', 6, 0, 7, [Ar(1.5, 2), rn(3.9)]),
      Ne('x', 3, 6, 10),
      Ne('x', 4.5, 0, 6, [rn(2), rn(5)]),
      Ne('z', 4, 4.5, 7),
    ],
    placements: [
      $('rug', 3.5, 2.7, 0, [3, 2]),
      $('sofa', 3.5, 1.6, 0, [2.4]),
      $('coffeeTable', 3.5, 2.9),
      $('tvUnit', 3.5, 4.24, ht, [1.8]),
      $('armchair', 1, 3.3, ht / 2),
      $('plant', 0.5, 4, 0, [1.1]),
      $('floorLamp', 5.5, 3.3),
      $('console', 3.9, 0.3, 0, [1]),
      $('plant', 5.55, 0.45, 0, [0.8], 'Cây lối vào'),
      $('kitchenRun', 7.63, 2.64, ht, [2.95]),
      $('fridge', 9.5, 2.58, ht),
      $('diningTable', 8, 1.1),
      $('chair', 7.55, 0.5, 0),
      $('chair', 8.45, 0.5, 0),
      $('chair', 7.55, 1.7, ht),
      $('chair', 8.45, 1.7, ht),
      $('rug', 1.7, 6.05, ht / 2, [2.2, 1.6, 'beige']),
      $('bed', 1.17, 6.05, ht / 2),
      $('nightstand', 0.33, 5, ht / 2),
      $('wardrobe', 3.64, 5.75, -ht / 2, [1.4, 2.3]),
      $('shower', 4.55, 6.5, 0),
      $('toilet', 5.5, 6.62, ht),
      $('vanity', 5.69, 5.3, -ht / 2),
      $('rug', 8, 4.4, 0, [2.4, 1.6, 'beige']),
      $('bed', 8, 4.1, 0),
      $('nightstand', 6.95, 3.35, 0),
      $('nightstand', 9.05, 3.35, 0),
      $('wardrobe', 6.36, 6, ht / 2, [1.4, 2.3]),
      $('desk', 9.6, 5, -ht / 2),
      $('chair', 9.1, 5, ht / 2, void 0, 'Ghế làm việc'),
    ],
  },
  ux = {
    id: '3pn',
    bedrooms: 3,
    bathrooms: 2,
    size: { w: 13, d: 8 },
    rooms: [
      {
        id: 'living',
        name: 'Phòng khách',
        x0: 0,
        x1: 7,
        z0: 0,
        z1: 5,
        floor: 'wood',
        stand: { x: 5.8, z: 0.8, yaw: ht - 0.5 },
        note: 'Phòng khách rộng, kết hợp bàn ăn',
      },
      {
        id: 'kitchen',
        name: 'Bếp',
        x0: 7,
        x1: 13,
        z0: 0,
        z1: 3.5,
        floor: 'tile',
        stand: { x: 7.9, z: 0.9, yaw: -ht / 2 - 0.4 },
        note: 'Bếp chữ I, bàn ăn',
      },
      {
        id: 'hall',
        name: 'Sảnh',
        x0: 7,
        x1: 9,
        z0: 3.5,
        z1: 5.5,
        floor: 'wood',
        stand: { x: 7.6, z: 4, yaw: -ht / 2 },
        note: 'Sảnh trung tâm dẫn tới phòng ngủ chính',
      },
      {
        id: 'master',
        name: 'Phòng ngủ chính',
        x0: 9,
        x1: 13,
        z0: 3.5,
        z1: 8,
        floor: 'wood',
        stand: { x: 9.7, z: 4.4, yaw: -ht / 2 - 0.2 },
        note: 'Giường đôi, tủ áo lớn',
      },
      {
        id: 'bath2',
        name: 'Vệ sinh chung',
        x0: 7,
        x1: 9,
        z0: 5.5,
        z1: 8,
        floor: 'tile',
        stand: { x: 8, z: 6, yaw: ht },
        note: 'Buồng tắm kính, bồn rửa',
      },
      {
        id: 'bed2',
        name: 'Phòng ngủ 2',
        x0: 0,
        x1: 3.5,
        z0: 5,
        z1: 8,
        floor: 'wood',
        stand: { x: 2.7, z: 5.5, yaw: ht / 2 + 0.3 },
        note: 'Giường đôi, tủ áo',
      },
      {
        id: 'bed3',
        name: 'Phòng ngủ 3',
        x0: 3.5,
        x1: 5.6,
        z0: 5,
        z1: 8,
        floor: 'wood',
        stand: { x: 4.55, z: 5.5, yaw: ht },
        note: 'Phòng ngủ nhỏ cho con / khách',
      },
      {
        id: 'bath1',
        name: 'Vệ sinh 2',
        x0: 5.6,
        x1: 7,
        z0: 5,
        z1: 8,
        floor: 'tile',
        stand: { x: 6.3, z: 5.5, yaw: ht },
        note: 'Vệ sinh gần phòng khách',
      },
    ],
    walls: [
      He('x', 0, 0, 13, [te(2.5, 2.6), wr(5.8), te(10, 2)]),
      He('x', 8, 0, 13, [
        te(1.75, 1.6),
        te(4.5, 1.2),
        te(6.3, 0.6, 1.5),
        te(8, 0.6, 1.5),
        te(11.6, 1.6),
      ]),
      He('z', 0, 0, 8, [te(2.5, 2), te(6.5, 1.6)]),
      He('z', 13, 0, 8, [te(1.75, 1.4), te(5.75, 1.6)]),
      Ne('z', 7, 0, 8, [Ar(1.75, 2.2), rn(4.2)]),
      Ne('x', 3.5, 7, 13),
      Ne('z', 9, 3.5, 8, [rn(4.4)]),
      Ne('x', 5.5, 7, 9, [rn(8)]),
      Ne('x', 5, 0, 7, [rn(1.6), rn(4.55), rn(6.3)]),
      Ne('z', 3.5, 5, 8),
      Ne('z', 5.6, 5, 8),
    ],
    placements: [
      $('rug', 3.1, 3, 0, [3, 2]),
      $('sofa', 3.1, 1.9, 0, [2.4]),
      $('coffeeTable', 3.1, 3.1),
      $('tvUnit', 3.1, 4.74, ht, [1.8]),
      $('armchair', 1, 3.6, ht / 2),
      $('armchair', 5.3, 3.6, -ht / 2),
      $('plant', 0.5, 4.5, 0, [1.1]),
      $('floorLamp', 5.9, 4.4),
      $('console', 4.3, 0.3, 0, [1]),
      $('plant', 6.6, 0.5, 0, [0.8], 'Cây lối vào'),
      $('diningTable', 5.2, 1.9),
      $('chair', 4.75, 1.3, 0),
      $('chair', 5.65, 1.3, 0),
      $('chair', 4.75, 2.5, ht),
      $('chair', 5.65, 2.5, ht),
      $('kitchenRun', 9.6, 3.14, ht, [3.6]),
      $('fridge', 11.85, 3.08, ht),
      $('diningTable', 9.8, 1.3),
      $('chair', 9.35, 0.7, 0),
      $('chair', 10.25, 0.7, 0),
      $('chair', 9.35, 1.9, ht),
      $('chair', 10.25, 1.9, ht),
      $('plant', 8.6, 3.9, 0, [0.9]),
      $('rug', 11.9, 5.75, -ht / 2, [2.4, 1.6, 'beige']),
      $('bed', 11.87, 5.75, -ht / 2),
      $('nightstand', 12.7, 4.7, -ht / 2),
      $('nightstand', 12.7, 6.8, -ht / 2),
      $('wardrobe', 9.8, 7.65, ht, [1.4, 2.3]),
      $('plant', 12.55, 7.5, 0, [1]),
      $('toilet', 7.5, 7.6, ht),
      $('shower', 8.45, 7.45, 0),
      $('vanity', 7.33, 6.4, ht / 2),
      $('rug', 1.8, 6.5, ht / 2, [2.2, 1.6, 'beige']),
      $('bed', 1.17, 6.5, ht / 2),
      $('nightstand', 0.33, 5.35, ht / 2),
      $('wardrobe', 3.14, 6.5, -ht / 2, [1.2, 2.3]),
      $('bed', 4.55, 6.85, ht),
      $('toilet', 5.97, 6.4, ht / 2),
      $('vanity', 6.67, 6.6, -ht / 2),
      $('shower', 6.4, 7.4, 0),
    ],
  },
  wc = [lx, cx, hx, ux],
  Ac = { bare: 0, partial: 1, full: 2 },
  dx = {
    sofa: {
      name: 'Sofa 3 chỗ',
      category: 'Sofa & ghế',
      material: 'Vải bọc, khung gỗ',
      note: 'Đệm dày, hai gối tựa kèm theo.',
      tier: 1,
    },
    armchair: {
      name: 'Ghế bành',
      category: 'Sofa & ghế',
      material: 'Vải bọc',
      note: 'Góc thư giãn trong phòng khách.',
      tier: 2,
    },
    coffeeTable: {
      name: 'Bàn trà',
      category: 'Bàn',
      material: 'Gỗ sồi',
      note: 'Đặt giữa sofa và kệ TV.',
      tier: 1,
    },
    tvUnit: {
      name: 'Kệ TV + TV 55"',
      category: 'Điện tử',
      material: 'Gỗ công nghiệp',
      note: 'TV đặt trên kệ thấp, đối diện sofa.',
      tier: 1,
    },
    rug: {
      name: 'Thảm',
      category: 'Trang trí',
      material: 'Sợi dệt',
      note: '',
      tier: 2,
      pick: !1,
    },
    plant: {
      name: 'Cây trong nhà',
      category: 'Trang trí',
      material: 'Chậu gốm',
      note: 'Cây lá lớn tạo điểm nhấn xanh.',
      tier: 2,
    },
    floorLamp: {
      name: 'Đèn cây',
      category: 'Chiếu sáng',
      material: 'Kim loại đen',
      note: 'Ánh sáng vàng ấm buổi tối.',
      tier: 2,
    },
    console: {
      name: 'Bàn console',
      category: 'Bàn',
      material: 'Gỗ + tủ thấp',
      note: 'Để chìa khoá, thư từ ở lối vào.',
      tier: 2,
    },
    bed: {
      name: 'Giường đôi 1m6',
      category: 'Giường',
      material: 'Khung gỗ, nệm bông ép',
      note: 'Kèm ga gối và chăn.',
      tier: 1,
    },
    nightstand: {
      name: 'Tab đầu giường',
      category: 'Tủ',
      material: 'Gỗ sồi',
      note: 'Kèm đèn ngủ.',
      tier: 2,
    },
    wardrobe: {
      name: 'Tủ quần áo',
      category: 'Tủ',
      material: 'Gỗ công nghiệp',
      note: 'Tủ cao sát trần, nhiều ngăn.',
      tier: 0,
    },
    desk: {
      name: 'Bàn làm việc',
      category: 'Bàn',
      material: 'Gỗ sồi',
      note: 'Kèm màn hình.',
      tier: 2,
    },
    chair: {
      name: 'Ghế',
      category: 'Sofa & ghế',
      material: 'Gỗ sồi',
      note: '',
      tier: 1,
    },
    diningTable: {
      name: 'Bàn ăn 4 chỗ',
      category: 'Bàn',
      material: 'Gỗ sồi',
      note: 'Gần cửa sổ, đón sáng buổi sáng.',
      tier: 1,
    },
    kitchenRun: {
      name: 'Bộ bếp',
      category: 'Bếp',
      material: 'Tủ gỗ + mặt đá',
      note: 'Bồn rửa inox, bếp từ, tủ treo phía trên.',
      tier: 0,
    },
    fridge: {
      name: 'Tủ lạnh',
      category: 'Bếp',
      material: 'Inox',
      note: 'Tủ lạnh hai cánh đặt cuối dãy bếp.',
      tier: 1,
    },
    toilet: {
      name: 'Bệ xí',
      category: 'Vệ sinh',
      material: 'Sứ',
      note: 'Két nước liền khối.',
      tier: 0,
    },
    vanity: {
      name: 'Tủ lavabo + gương',
      category: 'Vệ sinh',
      material: 'Tủ gỗ + mặt đá',
      note: 'Gương treo trên lavabo.',
      tier: 0,
    },
    shower: {
      name: 'Buồng tắm kính',
      category: 'Vệ sinh',
      material: 'Kính cường lực',
      note: 'Vòi sen cây, khay đáy thấp.',
      tier: 0,
    },
  },
  fx = 0.9,
  px = 1.3
function mx(n) {
  const t = Math.max(0, Math.min(3, Math.floor(n)))
  return wc.find(e => e.bedrooms === t) ?? wc[2]
}
const $e = (n, t) => Math.round(n * t * 1e3) / 1e3
function gx(n, t) {
  return n.map(e => ({
    ...e,
    at: $e(e.at, t),
    from: $e(e.from, t),
    to: $e(e.to, t),
    openings: e.openings.map(i => ({ ...i, c: $e(i.c, t) })),
  }))
}
function _x(n, t) {
  return n.map(e => ({
    ...e,
    x0: $e(e.x0, t),
    x1: $e(e.x1, t),
    z0: $e(e.z0, t),
    z1: $e(e.z1, t),
    stand: { ...e.stand, x: $e(e.stand.x, t), z: $e(e.stand.z, t) },
  }))
}
function xx(n, t) {
  const e = mx(n.bedrooms),
    i = e.rooms.reduce((l, u) => l + Tr(u), 0),
    s = Math.sqrt(Math.max(1, n.areaM2) / i),
    r = Math.min(px, Math.max(fx, s)),
    a = Ac[t?.furnishing ?? n.furnishing] ?? Ac.full,
    o = new Map(),
    c = []
  for (const l of e.placements) {
    const u = dx[l.kind]
    if (!u || u.tier > a) continue
    const p = (o.get(l.kind) ?? 0) + 1
    ;(o.set(l.kind, p),
      c.push({
        id: `${l.kind}-${p}`,
        kind: l.kind,
        args: l.args,
        x: $e(l.x, r),
        z: $e(l.z, r),
        rot: l.rot,
        name: l.name ?? u.name,
        category: u.category,
        material: u.material,
        note: u.note,
        pick: u.pick !== !1,
      }))
  }
  return {
    templateId: e.id,
    bedrooms: e.bedrooms,
    size: { w: $e(e.size.w, r), d: $e(e.size.d, r) },
    rooms: _x(e.rooms, r),
    walls: gx(e.walls, r),
    placements: c,
    scale: r,
  }
}
const go = 1,
  Rc = 8,
  vx = 1e3,
  Mx = 20,
  Sx = () => !!window.ReactNativeWebView,
  yx = () => Sx() || window.parent !== window
function vs(n, t) {
  const e =
    t === void 0
      ? { version: go, type: n }
      : { version: go, type: n, payload: t }
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify(e))
    return
  }
  window.parent !== window &&
    window.parent.postMessage(e, window.location.origin)
}
function Sh(n) {
  if (!n || typeof n != 'object') return null
  const t = typeof n.apartmentId == 'string' ? n.apartmentId.trim() : '',
    e = Number(n.bedrooms),
    i = Number(n.bathrooms),
    s = Number(n.areaM2)
  if (
    !t ||
    !Number.isFinite(e) ||
    e < 0 ||
    e > Rc ||
    !Number.isFinite(i) ||
    i < 0 ||
    i > Rc ||
    !Number.isFinite(s) ||
    s <= 0 ||
    s > vx ||
    !['bare', 'partial', 'full'].includes(n.furnishing)
  )
    return null
  const r = Array.isArray(n.designs)
    ? n.designs.slice(0, Mx).map(Go).filter(Boolean)
    : []
  return {
    apartmentId: t,
    bedrooms: Math.floor(e),
    bathrooms: Math.floor(i),
    areaM2: s,
    furnishing: n.furnishing,
    designs: r,
    designId: typeof n.designId == 'string' ? n.designId : null,
  }
}
function bx(n) {
  const t = window.location.origin,
    e = i => {
      if (
        !(!!window.ReactNativeWebView && (!i.origin || i.origin === 'null')) &&
        (i.origin !== t || i.source !== window.parent)
      )
        return
      let r = i.data
      if (typeof r == 'string')
        try {
          r = JSON.parse(r)
        } catch {
          return
        }
      if (!(!r || r.version !== go))
        if (r.type === 'FLOORPLAN_INIT') {
          const a = Sh(r.payload)
          a ? n.init(a) : vs('FLOORPLAN_ERROR', { code: 'INVALID_CONFIG' })
        } else
          r.type === 'FLOORPLAN_PAUSE'
            ? n.pause()
            : r.type === 'FLOORPLAN_RESUME'
              ? n.resume()
              : r.type === 'FLOORPLAN_RESET' && n.reset()
    }
  return (
    window.addEventListener('message', e),
    document.addEventListener('message', e),
    () => {
      ;(window.removeEventListener('message', e),
        document.removeEventListener('message', e))
    }
  )
}
function Ex(n, t) {
  const e = (s, r) => (n.has(s) ? Number(n.get(s)) : r),
    i = ['bare', 'partial', 'full'].includes(n.get('furnishing'))
      ? n.get('furnishing')
      : 'full'
  return Sh({
    apartmentId: n.get('id') ?? 'demo',
    bedrooms: e('bedrooms', 2),
    bathrooms: e('bathrooms', 1),
    areaM2: e('area', 70),
    furnishing: i,
    designs: t,
    designId: n.get('design'),
  })
}
const us = new URLSearchParams(location.search),
  ln = Og(document.getElementById('viewport'))
fh({
  templateId: '',
  bedrooms: 2,
  size: { w: 10, d: 7 },
  rooms: [],
  walls: [],
  placements: [],
})
_h()
const Xn = T_(ln),
  si = R_({
    camera: ln.camera,
    dom: ln.renderer.domElement,
    colliders: Xn.colliders,
  }),
  Rr = U_(ln, Xn, si),
  Tx = O_(ln, Xn),
  Ho = ox(document.getElementById('ui'), { app: ln, walker: si })
let yh = null,
  or = [],
  va = ''
function bh(n, { keepView: t = !1 } = {}) {
  const e = or.find(r => r.id === n) ?? or[0],
    i = xx(yh, e)
  ;(Ug(Mh(e)), fh(i), _h(), Xn.rebuild())
  const s = ut.state.mode === 'walk'
  return (
    ut.set({
      designs: or,
      designId: e.id,
      selection: null,
      hover: null,
      roomId: null,
      menu: null,
    }),
    Oe.emit('plan:loaded'),
    t || ut.set({ hour: e.defaultHour }),
    Xn.setHour(ut.state.hour),
    Rr.start({ walk: s }),
    ln.invalidateShadows(),
    Ho.hud.draw(),
    e
  )
}
function Eh(n) {
  const t = n.designs.length ? n.designs : [K_(n.apartmentId)],
    e = JSON.stringify([n, t])
  if (e === va) return
  const i = !va
  ;((va = e), (yh = n), (or = t))
  const s = !i && ut.state.designs.some(r => r.id === ut.state.designId)
  ;(bh(n.designId ?? (s ? ut.state.designId : null), { keepView: !i }),
    i && wx())
}
function wx() {
  const n = Number(us.get('hour'))
  ;(n >= 6 && n <= 18 && ut.set({ hour: n }), Xn.setHour(ut.state.hour))
  const t = us.get('room'),
    e = us.get('mode') === 'walk'
  ;(e || t) && Rr.start({ walk: e, room: t })
  const i = us.get('select')
  i && Ce.get('item', i) && ut.select({ type: 'item', id: i })
}
Oe.on('design:select', ({ id: n }) => {
  const t = bh(n, { keepView: !1 })
  vs('FLOORPLAN_DESIGN_SELECTED', { designId: t.id })
})
ut.subscribe((n, t, e) => {
  ;(e.includes('hour') && Xn.setHour(n.hour),
    (e.includes('mode') || e.includes('roomId')) && Ho.hud.draw(),
    e.includes('selection') &&
      n.selection?.type === 'room' &&
      vs('FLOORPLAN_ROOM_SELECTED', { roomId: n.selection.id }))
})
document.addEventListener('click', n => {
  const t = n.target.closest?.('.room-label')
  t &&
    (Oe.emit('room:go', { id: t.dataset.room }),
    ut.select({ type: 'room', id: t.dataset.room }))
})
let Qs = 0
ln.onFrame(n => {
  if (
    (Xn.update(n),
    Tx.update(n),
    Rr.update(n),
    ut.state.playing && ((Qs += n), Qs > 0.05))
  ) {
    let t = ut.state.hour + Qs * 0.75
    ;(t > 18 && (t = 6), (Qs = 0), ut.set({ hour: Math.round(t * 100) / 100 }))
  }
  if (ut.state.mode === 'walk' && si.update(n)) {
    ;(ln.invalidate(), Ho.hud.draw())
    const t = Ce.list('room').find(
      e =>
        si.state.x >= e.x0 &&
        si.state.x <= e.x1 &&
        si.state.z >= e.z0 &&
        si.state.z <= e.z1
    )
    t && t.id !== ut.state.roomId && ut.set({ roomId: t.id })
  }
})
bx({
  init: Eh,
  pause: () => ln.pause(),
  resume: () => ln.resume(),
  reset: () => Oe.emit('camera:cmd', { cmd: 'home' }),
})
ln.start()
try {
  vs('FLOORPLAN_READY')
} catch {
  vs('FLOORPLAN_ERROR', { code: 'WEBGL_INIT_FAILED' })
}
if (!yx()) {
  const n = xr.map(e => Go({ id: e, name: Ki[e].label, theme: e })),
    t = Ex(us, n)
  t && Eh(t)
}
window.__apt = { app: ln, world: Xn, walker: si, director: Rr, store: ut }
