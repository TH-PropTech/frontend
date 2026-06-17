// ═══════════════════════════════════════════════════════════
// app.js — Optimized Main Controller
// ═══════════════════════════════════════════════════════════

// ── Building Config ──
var BUILDINGS = [
  {
    id: 'M7',
    label: 'The Grand',
    floors: 10,
    pos: { x: 0, z: 0 },
    rot: 0,
    zone: 'Ven sông',
    icon: 'fa-city',
  },
]
var LH = 1.3,
  FH = 0.9

BUILDINGS.forEach(function (b) {
  b.floorData = {}
  for (var i = 1; i <= b.floors; i++) {
    b.floorData[i] = {
      vacant: Math.floor(Math.random() * 4),
      reserved: Math.floor(Math.random() * 3),
      sold: Math.floor(Math.random() * 6) + 1,
    }
  }
  b.group = null
  b.floorList = []
  b.hitbox = null
})

// ── State ──
var focusedBuilding = null,
  currentHoveredFloorNum = null
var cachedRayTargets = [] // cached raycast targets to avoid per-frame allocation

// ── Walk Mode State ──
var isWalkMode = false
var keysPressed = {}
var isMouseDragging = false
var prevMouseX = 0,
  prevMouseY = 0
var camRot = { yaw: 0, pitch: 0 }
var walkViewMode = 'thirdPerson' // 'thirdPerson' or 'firstPerson'
var avatar = null
var verticalVelocity = 0
var isJumping = false

// ── DOM ──
var container = document.getElementById('canvas-container')
var sidebarTitle = document.getElementById('sidebar-title')
var sidebarSub = document.getElementById('sidebar-subtitle')
var sidebarBadge = document.getElementById('sidebar-badge')
var overviewPanel = document.getElementById('overview-panel')
var floorPanel = document.getElementById('floor-panel')
var floorListEl = document.getElementById('floors-ledger-list')
var floorHeader = document.getElementById('floor-header')
var tooltipEl = document.getElementById('tooltip-3d')
var tooltipTitle = document.getElementById('tooltip-floor-title')
var tooltipVacant = document.getElementById('tooltip-vacant')
var tooltipRes = document.getElementById('tooltip-reserved')
var tooltipSold = document.getElementById('tooltip-sold')
var labelsCont = document.getElementById('building-labels')

// ── Scene ──
var scene = new THREE.Scene()

scene.background = new THREE.Color(0xc8dce8)
scene.fog = new THREE.Fog(0xc8dce8, 55, 110)

// ── Camera ──
var camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  150
)
camera.position.set(30, 25, 35)

// ── Renderer (optimized settings) ──
var renderer = new THREE.WebGLRenderer({
  antialias: false,
  powerPreference: 'high-performance',
})
renderer.setPixelRatio(1) // force 1x for GPU performance
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = false // shadows OFF for perf
renderer.toneMapping = THREE.NoToneMapping
container.appendChild(renderer.domElement)

// ── Controls ──
var controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.06
controls.maxPolarAngle = Math.PI / 2 - 0.05
controls.minDistance = 8
controls.maxDistance = 80
controls.target.set(0, 6, 5)

// ── Lighting (3 lights only) ──
scene.add(new THREE.HemisphereLight(0x87ceeb, 0x556b2f, 0.55))
scene.add(new THREE.AmbientLight(0xffffff, 0.3))

var sun = new THREE.DirectionalLight(0xfff4e0, 0.75)
sun.position.set(25, 40, 20)
sun.castShadow = false // shadows off
scene.add(sun)

// ── Build Scene ──
window.createLandscape(scene, BUILDINGS)

var allHitboxes = []
BUILDINGS.forEach(function (b) {
  var r = window.createDetailedBuilding(b.floors, b.id === 'M7', b.id)
  r.buildingGroup.position.set(b.pos.x, 0.2, b.pos.z)
  r.buildingGroup.rotation.y = b.rot
  scene.add(r.buildingGroup)
  b.group = r.buildingGroup
  b.floorList = r.floorList
  b.hitbox = r.hitbox
  allHitboxes.push(r.hitbox)
})

var selOutline = new THREE.Mesh(
  new THREE.BoxGeometry(6, 0.04, 4),
  new THREE.MeshBasicMaterial({
    color: 0x0284c7,
    wireframe: true,
    transparent: true,
    opacity: 0,
  })
)
scene.add(selOutline)

// ── Labels ──
BUILDINGS.forEach(function (b) {
  var el = document.createElement('div')
  el.id = 'label-' + b.id
  el.className = 'building-label'
  el.innerHTML =
    '<span class="label-id">' +
    b.id +
    '</span><span class="label-name">' +
    b.label +
    '</span>'
  el.addEventListener('click', function () {
    focusOnBuilding(b)
  })
  labelsCont.appendChild(el)
})

// ── Sidebar: Overview ──
function renderOverviewCards() {
  overviewPanel.innerHTML = ''
  BUILDINGS.forEach(function (b) {
    var tv = 0
    for (var i = 1; i <= b.floors; i++) tv += b.floorData[i].vacant
    var c = document.createElement('div')
    c.className = 'building-card'
    c.innerHTML =
      '<div class="card-header"><div class="card-icon"><i class="fa-solid ' +
      b.icon +
      '"></i></div>' +
      '<div class="card-info"><div class="card-id">' +
      b.id +
      ' • ' +
      b.label +
      '</div>' +
      '<div class="card-meta">' +
      b.floors +
      ' Tầng • ' +
      b.zone +
      '</div></div></div>' +
      '<div class="card-stats"><span class="stat-vacant">' +
      tv +
      ' trống</span></div>'
    c.addEventListener('click', function () {
      focusOnBuilding(b)
    })
    overviewPanel.appendChild(c)
  })
}

// ── Sidebar: Floor List ──
function renderFloorList(b) {
  floorListEl.innerHTML = ''
  for (var i = b.floors; i >= 1; i--) {
    ;(function (fn) {
      var d = b.floorData[fn]
      var r = document.createElement('div')
      r.id = 'ledger-row-' + fn
      r.className = 'floor-row'
      r.innerHTML =
        '<div class="floor-num">T' +
        fn +
        '</div><div class="floor-vacant">' +
        d.vacant +
        '</div><div class="floor-reserved">' +
        d.reserved +
        '</div><div class="floor-sold">' +
        d.sold +
        '</div>' +
        '<div style="grid-column:1/-1;margin-top:2px"><button class="vr-tour-btn" style="width:100%;padding:3px 0;border-radius:6px;border:1px solid rgba(2,132,199,0.2);background:rgba(2,132,199,0.06);color:#0284c7;font-size:10px;font-weight:600;cursor:pointer;transition:all 0.15s;display:flex;align-items:center;justify-content:center;gap:4px;" onmouseover="this.style.background=\'rgba(2,132,199,0.15)\'" onmouseout="this.style.background=\'rgba(2,132,199,0.06)\'">' +
        '<i class="fa-solid fa-vr-cardboard" style="font-size:9px"></i> Xem 360°</button></div>'
      r.addEventListener('mouseenter', function () {
        highlightFloor(fn)
        showTooltip(fn)
      })
      r.addEventListener('mouseleave', function () {
        clearHighlight()
        hideTooltip()
      })
      // VR Tour button click
      r.querySelector('.vr-tour-btn').addEventListener('click', function (e) {
        e.stopPropagation()
        window.openVRTour(fn, b)
      })
      floorListEl.appendChild(r)
    })(i)
  }
}

// ── Sidebar Mode Switch ──
function showOverview() {
  focusedBuilding = null
  currentHoveredFloorNum = null
  sidebarTitle.textContent = 'KHU ĐÔ THỊ'
  sidebarSub.textContent = 'Vinhomes Grand Park'
  sidebarBadge.textContent = BUILDINGS.length + ' Tòa'
  overviewPanel.style.display = 'flex'
  floorPanel.style.display = 'none'
  floorHeader.style.display = 'none'
  renderOverviewCards()
  hideTooltip()
  selOutline.material.opacity = 0
}

function showBuildingDetail(b) {
  focusedBuilding = b
  currentHoveredFloorNum = null
  // Cache raycast targets once per building switch (avoid per-frame allocation)
  cachedRayTargets = []
  b.floorList.forEach(function (f) {
    cachedRayTargets = cachedRayTargets.concat(f.glassMeshes)
  })
  sidebarTitle.textContent = 'TÒA ' + b.id
  sidebarSub.textContent = b.label + ' • ' + b.zone
  sidebarBadge.textContent = b.floors + ' Tầng'
  overviewPanel.style.display = 'none'
  floorPanel.style.display = 'flex'
  floorHeader.style.display = 'grid'
  renderFloorList(b)
}

// ── Camera Controls ──
function focusOnBuilding(b) {
  showBuildingDetail(b)
  var tx = b.pos.x,
    tz = b.pos.z
  var th = LH + (b.floors - 1) * FH
  gsap.killTweensOf(camera.position)
  gsap.killTweensOf(controls.target)
  gsap.to(camera.position, {
    x: tx + 13,
    y: th * 0.5 + 6,
    z: tz + 18,
    duration: 1.6,
    ease: 'power3.inOut',
    onUpdate: function () {
      controls.update()
    },
  })
  gsap.to(controls.target, {
    x: tx,
    y: th * 0.4,
    z: tz,
    duration: 1.6,
    ease: 'power3.inOut',
  })
}

function showMasterPlan() {
  showOverview()
  gsap.killTweensOf(camera.position)
  gsap.killTweensOf(controls.target)
  gsap.to(camera.position, {
    x: 30,
    y: 25,
    z: 35,
    duration: 1.6,
    ease: 'power3.inOut',
    onUpdate: function () {
      controls.update()
    },
  })
  gsap.to(controls.target, {
    x: 0,
    y: 6,
    z: 5,
    duration: 1.6,
    ease: 'power3.inOut',
  })
}
window.showMasterPlan = showMasterPlan

window.setCameraView = function (view) {
  var tx = 0,
    tz = 5,
    th = 15
  if (focusedBuilding) {
    var b = focusedBuilding
    tx = b.pos.x
    tz = b.pos.z
    th = LH + (b.floors - 1) * FH
  }
  var cp,
    la = { x: tx, y: th * 0.4, z: tz }
  switch (view) {
    case 'front':
      cp = { x: tx, y: th * 0.5 + 3, z: tz + 24 }
      break
    case 'back':
      cp = { x: tx, y: th * 0.5 + 3, z: tz - 24 }
      break
    case 'side':
      cp = { x: tx + 24, y: th * 0.5 + 3, z: tz }
      break
    case 'top':
      cp = { x: tx + 0.1, y: th + 25, z: tz + 0.1 }
      break
    default:
      cp = { x: tx + 14, y: th * 0.5 + 5, z: tz + 18 }
  }

  if (!focusedBuilding) {
    la = { x: 0, y: 4, z: 5 }
    switch (view) {
      case 'front':
        cp = { x: 0, y: 20, z: 45 }
        break
      case 'back':
        cp = { x: 0, y: 20, z: -35 }
        break
      case 'side':
        cp = { x: 40, y: 20, z: 5 }
        break
      case 'top':
        cp = { x: 0.1, y: 55, z: 5.1 }
        break
      default:
        cp = { x: 30, y: 25, z: 35 }
    }
  }

  document.querySelectorAll('.camera-btn').forEach(function (btn) {
    btn.classList.remove('active-view')
  })
  var ab = document.getElementById('btn-' + view)
  if (ab) ab.classList.add('active-view')
  gsap.killTweensOf(camera.position)
  gsap.killTweensOf(controls.target)
  gsap.to(camera.position, {
    x: cp.x,
    y: cp.y,
    z: cp.z,
    duration: 1.2,
    ease: 'power3.inOut',
    onUpdate: function () {
      controls.update()
    },
  })
  gsap.to(controls.target, {
    x: la.x,
    y: la.y,
    z: la.z,
    duration: 1.2,
    ease: 'power3.inOut',
  })
}

window.createAvatarMesh = function () {
  var g = new THREE.Group()

  // Body (torso)
  var bodyGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.38, 12)
  var bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    roughness: 0.1,
    metalness: 0.1,
  })
  var body = new THREE.Mesh(bodyGeom, bodyMat)
  body.position.y = 0.19
  g.add(body)

  // Head
  var headGeom = new THREE.SphereGeometry(0.14, 12, 12)
  var head = new THREE.Mesh(headGeom, bodyMat)
  head.position.y = 0.46
  g.add(head)

  // Visor
  var visorGeom = new THREE.BoxGeometry(0.16, 0.05, 0.06)
  var visorMat = new THREE.MeshBasicMaterial({ color: 0x0ea5e9 }) // Glowing sky blue
  var visor = new THREE.Mesh(visorGeom, visorMat)
  visor.position.set(0, 0.46, 0.11)
  g.add(visor)

  // Hover ring at bottom
  var ringGeom = new THREE.RingGeometry(0.14, 0.18, 16)
  ringGeom.rotateX(-Math.PI / 2)
  var ringMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8,
  })
  var ring = new THREE.Mesh(ringGeom, ringMat)
  ring.position.y = -0.05
  g.add(ring)

  // Tiny floating hands
  var handGeom = new THREE.SphereGeometry(0.04, 8, 8)
  var handMat = new THREE.MeshStandardMaterial({ color: 0x475569 })
  var handL = new THREE.Mesh(handGeom, handMat)
  handL.position.set(-0.24, 0.22, 0)
  g.add(handL)
  var handR = new THREE.Mesh(handGeom, handMat)
  handR.position.set(0.24, 0.22, 0)
  g.add(handR)

  // References
  g.userData = {
    head: head,
    visor: visor,
    ring: ring,
    handL: handL,
    handR: handR,
  }
  return g
}

// Check solid boundaries collision
window.getTerrainHeight = function (x, z, currentY) {
  var baseH = 0.2
  if (x >= 5.0 && x <= 11.0 && z >= -2.25 && z <= 2.25) {
    return baseH + 0.05
  }

  var inPodium = x >= -3.9 && x <= 3.9 && z >= -2.05 && z <= 2.05
  var inLeftExt = x >= -4.1 && x <= -2.1 && z >= -2.05 && z <= 2.05

  var inRightExt7 = x >= 2.1 && x <= 3.5 && z >= -2.05 && z <= 2.05
  var inRightExt11 = x >= 2.1 && x <= 3.1 && z >= -2.05 && z <= 2.05
  var inRightExt15 = x >= 2.1 && x <= 2.8 && z >= -2.05 && z <= 2.05
  var inRightExt18 = x >= 2.1 && x <= 2.5 && z >= -2.05 && z <= 2.05

  var lvlPodium = 0.2 + 1.3 + 2 * 0.9
  var lvlLeftExt = 0.2 + 1.3 + 6 * 0.9
  var lvlRight7 = 0.2 + 1.3 + 6 * 0.9
  var lvlRight11 = 0.2 + 1.3 + 10 * 0.9
  var lvlRight15 = 0.2 + 1.3 + 14 * 0.9
  var lvlRight18 = 0.2 + 1.3 + 17 * 0.9
  var lvlRoof = 0.2 + 1.3 + (BUILDINGS[0].floors - 1) * 0.9

  var validHeights = [baseH]

  // Check grand podium stairs linear height
  if (x >= -4.6 && x <= -3.8 && z >= -2.1 && z <= 2.1) {
    var t = (2.0 - z) / 4.0
    t = Math.max(0, Math.min(1, t))
    var stairH = 0.2 + t * 3.1
    validHeights.push(stairH)
  }

  // Check Floor 3-to-7 terrace stairs linear height
  if (x >= -3.5 && x <= -2.7 && z >= -1.6 && z <= 1.6) {
    var t = (z - -1.5) / 3.0
    t = Math.max(0, Math.min(1, t))
    var stairH = 3.3 + t * 3.6
    validHeights.push(stairH)
  }

  if (inPodium) {
    validHeights.push(lvlPodium)
    if (x >= -2.4 && x <= -0.4 && z >= -2.05 && z <= 2.05)
      validHeights.push(lvlRoof)
    if (x >= 0.4 && x <= 2.4 && z >= -2.05 && z <= 2.05)
      validHeights.push(lvlRoof)
  }
  if (inLeftExt) validHeights.push(lvlLeftExt)
  if (inRightExt7) validHeights.push(lvlRight7)
  if (inRightExt11) validHeights.push(lvlRight11)
  if (inRightExt15) validHeights.push(lvlRight15)
  if (inRightExt18) validHeights.push(lvlRight18)

  if (x >= -0.4 && x <= 0.4 && z >= -0.5 && z <= 0.5) {
    validHeights.push(0.2 + 1.3 + 5 * 0.9)
    validHeights.push(0.2 + 1.3 + 11 * 0.9)
    validHeights.push(0.2 + 1.3 + 16 * 0.9)
    validHeights.push(0.2 + 1.3 + 20 * 0.9)
  }

  var bestH = baseH
  var minDist = 999999
  for (var i = 0; i < validHeights.length; i++) {
    var d = Math.abs(currentY - validHeights[i])
    if (d < minDist) {
      minDist = d
      bestH = validHeights[i]
    }
  }
  return bestH
}

window.checkBuildingCollision = function (x, z, currentH) {
  // Exclude stairs from collision repeller
  if (x >= -4.6 && x <= -3.8 && z >= -2.1 && z <= 2.1) return false
  if (x >= -3.5 && x <= -2.7 && z >= -1.6 && z <= 1.6) return false

  var inLeftTowerCore = x >= -2.4 && x <= -0.4 && z >= -2.05 && z <= 2.05
  var inRightTowerCore = x >= 0.4 && x <= 2.4 && z >= -2.05 && z <= 2.05
  var inPodiumCore =
    x >= -3.9 && x <= 3.9 && z >= -2.05 && z <= 2.05 && currentH < 3.0

  var roofHeight = 0.2 + 1.3 + (BUILDINGS[0].floors - 1) * 0.9
  if (
    inLeftTowerCore &&
    Math.abs(currentH - roofHeight) > 0.5 &&
    Math.abs(currentH - 6.0) > 0.5
  ) {
    return true
  }
  if (
    inRightTowerCore &&
    Math.abs(currentH - roofHeight) > 0.5 &&
    Math.abs(currentH - 6.0) > 0.5 &&
    Math.abs(currentH - 6.9) > 0.5
  ) {
    return true
  }
  if (inPodiumCore && Math.abs(currentH - 3.3) > 0.5) {
    return true
  }
  return false
}

window.toggleWalkMode = function () {
  isWalkMode = !isWalkMode
  var btn = document.getElementById('toggle-walk-btn')
  var hud = document.getElementById('tour-hud')
  var hintText = document.getElementById('hint-text')
  var hintBox = document.getElementById('hint-box')
  var camControls = document.getElementById('camera-controls-box')

  if (isWalkMode) {
    btn.classList.add('bg-sky-500/20', 'text-sky-600')
    controls.enabled = false

    // Hide hint box and bottom camera controls in Walk Mode
    if (hintBox) hintBox.style.display = 'none'
    if (camControls) camControls.style.display = 'none'

    // Create avatar model
    avatar = window.createAvatarMesh()
    avatar.position.set(0, 0.2, 12)
    scene.add(avatar)

    // Reset camera rotations
    camRot.yaw = Math.PI
    camRot.pitch = -0.1

    // Hide building labels to save CPU
    if (labelsCont) labelsCont.style.display = 'none'

    // Show HUD
    if (hud) {
      hud.classList.remove('hud-collapsed')
      var hudContent = document.getElementById('hud-content')
      var hudToggleIcon = document.getElementById('hud-toggle-icon')
      if (hudContent) hudContent.style.display = 'flex'
      if (hudToggleIcon) hudToggleIcon.className = 'fa-solid fa-chevron-down'

      hud.style.display = 'flex'
      requestAnimationFrame(function () {
        hud.style.opacity = '1'
        hud.style.pointerEvents = 'auto'
        hud.style.transform = 'translateY(0)'
      })
    }
    if (hintText) {
      hintText.innerHTML =
        '<span class="text-sky-600 font-semibold">THAM QUAN 3D:</span> Click vào màn hình để khóa chuột & di chuyển nhìn xung quanh • WASD di chuyển'
    }

    // Request pointer lock automatically after a short delay
    setTimeout(function () {
      if (isWalkMode && document.pointerLockElement !== renderer.domElement) {
        renderer.domElement.requestPointerLock()
      }
    }, 150)
  } else {
    btn.classList.remove('bg-sky-500/20', 'text-sky-600')
    controls.enabled = true
    keysPressed = {}

    // Show hint box and bottom camera controls again
    if (hintBox) hintBox.style.display = ''
    if (camControls) camControls.style.display = ''

    // Clean up avatar
    if (avatar) {
      scene.remove(avatar)
      avatar = null
    }

    // Exit pointer lock if active
    if (document.pointerLockElement === renderer.domElement) {
      document.exitPointerLock()
    }

    // Show building labels again
    if (labelsCont) labelsCont.style.display = 'block'

    // Hide HUD
    if (hud) {
      hud.style.opacity = '0'
      hud.style.pointerEvents = 'none'
      hud.style.transform = 'translateY(8px)'
      setTimeout(function () {
        if (!isWalkMode) hud.style.display = 'none'
      }, 300)
    }

    showMasterPlan()
    if (hintText) {
      hintText.textContent =
        'Click chọn tòa nhà • Cuộn để thu phóng • Kéo để xoay • Click tầng để xem 360°'
    }
  }
}

window.toggleWalkViewMode = function () {
  var btnText = document.getElementById('view-mode-text')
  if (walkViewMode === 'thirdPerson') {
    walkViewMode = 'firstPerson'
    if (btnText) btnText.textContent = 'Góc nhìn: T1'
  } else {
    walkViewMode = 'thirdPerson'
    if (btnText) btnText.textContent = 'Góc nhìn: T3'
  }
}

window.teleportAvatar = function () {
  var select = document.getElementById('teleport-floor-select')
  if (!select || !avatar) return
  var val = select.value

  var x = 0,
    y = 0.2,
    z = 12
  var yaw = Math.PI
  var roofHeight = 0.2 + 1.3 + (BUILDINGS[0].floors - 1) * 0.9

  switch (val) {
    case 'ground':
      x = 0
      y = 0.2
      z = 12
      yaw = Math.PI // Look at entrance (-z)
      break
    case 'podium':
      x = -2.8
      y = 3.3
      z = 0.8
      yaw = Math.PI / 3 // Look at garden terrace (+x / -z)
      break
    case 'bridge6':
      x = -1.1
      y = 6.0
      z = 0
      yaw = Math.PI / 2 // Look straight across bridge (+x)
      break
    case 'pool7':
      x = -3.1
      y = 6.9
      z = 1.2
      yaw = Math.PI // Look at pool deck (-z)
      break
    case 'roof':
      x = -1.4
      y = roofHeight
      z = 0.8
      yaw = 0 // Look at river view (+z)
      break
  }

  avatar.position.set(x, y + 0.1, z)
  verticalVelocity = 0
  isJumping = false

  camRot.yaw = yaw
  camRot.pitch = -0.1
}

// Pointer lock event listeners
document.addEventListener('pointerlockchange', function () {
  var canvas = renderer.domElement
  var hintText = document.getElementById('hint-text')
  if (document.pointerLockElement === canvas) {
    if (hintText) {
      hintText.innerHTML =
        '<span class="text-sky-600 font-semibold">THAM QUAN 3D:</span> Di chuột tự do để nhìn xung quanh • Nhấn ESC để mở khóa chuột'
    }
  } else {
    if (isWalkMode && hintText) {
      hintText.innerHTML =
        '<span class="text-sky-600 font-semibold">THAM QUAN 3D:</span> Click vào màn hình để khóa chuột & di chuyển nhìn xung quanh • WASD di chuyển'
    }
  }
})

// Canvas click to re-lock pointer
renderer.domElement.addEventListener('click', function () {
  if (isWalkMode && document.pointerLockElement !== renderer.domElement) {
    renderer.domElement.requestPointerLock()
  }
})

// Keyboard listeners
window.addEventListener('keydown', function (e) {
  if (!isWalkMode) return
  keysPressed[e.key.toLowerCase()] = true
  if (
    [
      'w',
      'a',
      's',
      'd',
      'arrowup',
      'arrowdown',
      'arrowleft',
      'arrowright',
      ' ',
    ].indexOf(e.key.toLowerCase()) > -1
  ) {
    e.preventDefault()
  }
})

window.addEventListener('keyup', function (e) {
  if (!isWalkMode) return
  keysPressed[e.key.toLowerCase()] = false
})

// Drag to look around (when not locked)
window.addEventListener('mousedown', function (e) {
  if (isWalkMode && !isUI(e)) {
    isMouseDragging = true
    prevMouseX = e.clientX
    prevMouseY = e.clientY
  }
})

window.addEventListener('mousemove', function (e) {
  if (!isWalkMode) return

  if (document.pointerLockElement === renderer.domElement) {
    var movementX = e.movementX || 0
    var movementY = e.movementY || 0

    camRot.yaw -= movementX * 0.0025
    camRot.pitch -= movementY * 0.0025
    camRot.pitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, camRot.pitch))
  } else if (isMouseDragging) {
    var deltaX = e.clientX - prevMouseX
    var deltaY = e.clientY - prevMouseY

    camRot.yaw -= deltaX * 0.003
    camRot.pitch -= deltaY * 0.003
    camRot.pitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, camRot.pitch))

    prevMouseX = e.clientX
    prevMouseY = e.clientY
  }
})

window.addEventListener('mouseup', function () {
  isMouseDragging = false
})

// Touch support for mobile
window.addEventListener('touchstart', function (e) {
  if (isWalkMode && !isUI(e) && e.touches.length === 1) {
    isMouseDragging = true
    prevMouseX = e.touches[0].clientX
    prevMouseY = e.touches[0].clientY
  }
})

window.addEventListener('touchmove', function (e) {
  if (!isWalkMode || !isMouseDragging || e.touches.length !== 1) return
  var deltaX = e.touches[0].clientX - prevMouseX
  var deltaY = e.touches[0].clientY - prevMouseY

  camRot.yaw -= deltaX * 0.005
  camRot.pitch -= deltaY * 0.005
  camRot.pitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, camRot.pitch))

  prevMouseX = e.touches[0].clientX
  prevMouseY = e.touches[0].clientY
})

window.addEventListener('touchend', function () {
  isMouseDragging = false
})

// ── Raycasting (throttled) ──
var raycaster = new THREE.Raycaster()
var mouse = new THREE.Vector2()
var lastRay = 0

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

function isUI(e) {
  return (
    e.target.closest('.glass-panel') ||
    e.target.closest('button') ||
    e.target.closest('.building-card') ||
    e.target.closest('.building-label')
  )
}

window.addEventListener('mousemove', function (e) {
  if (isWalkMode) return
  if (performance.now() - lastRay < 50) return // ~20fps raycast
  lastRay = performance.now()
  if (isUI(e) || !focusedBuilding) return

  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
  raycaster.setFromCamera(mouse, camera)

  var hits = raycaster.intersectObjects(cachedRayTargets)

  if (hits.length > 0) {
    var matched = focusedBuilding.floorList.find(function (f) {
      return f.glassMeshes.indexOf(hits[0].object) >= 0
    })
    if (matched && currentHoveredFloorNum !== matched.floorNum) {
      highlightFloor(matched.floorNum)
      showTooltip(matched.floorNum)
    }
  } else if (currentHoveredFloorNum !== null) {
    clearHighlight()
    hideTooltip()
  }
})

window.addEventListener('click', function (e) {
  if (isWalkMode) return
  if (isUI(e)) return
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
  raycaster.setFromCamera(mouse, camera)
  var hits = raycaster.intersectObjects(allHitboxes)
  if (hits.length > 0) {
    var b = BUILDINGS.find(function (b) {
      return b.id === hits[0].object.userData.buildingId
    })
    if (b) focusOnBuilding(b)
  }
})

// ── Floor Highlight ──
function highlightFloor(fn) {
  clearHighlight()
  if (!focusedBuilding) return
  currentHoveredFloorNum = fn
  var item = focusedBuilding.floorList.find(function (f) {
    return f.floorNum === fn
  })
  if (item) {
    item.glassMeshes.forEach(function (m) {
      m.material.color.setHex(0x0284c7)
      m.material.opacity = 0.45
    })
    var isL = fn === 1,
      cH = isL ? LH : FH
    var pY = isL ? 0.2 : 0.2 + LH + (fn - 2) * FH
    selOutline.position.set(
      focusedBuilding.pos.x,
      pY + cH - 0.02,
      focusedBuilding.pos.z
    )
    selOutline.rotation.y = focusedBuilding.rot
    selOutline.material.opacity = 1
  }
  var row = document.getElementById('ledger-row-' + fn)
  if (row) {
    row.classList.add('row-active')
    row.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }
}

function clearHighlight() {
  if (currentHoveredFloorNum !== null && focusedBuilding) {
    var item = focusedBuilding.floorList.find(function (f) {
      return f.floorNum === currentHoveredFloorNum
    })
    if (item) {
      item.glassMeshes.forEach(function (m) {
        m.material.color.setHex(0x7ec8e3)
        m.material.opacity = 0.22
      })
      selOutline.material.opacity = 0
    }
    var row = document.getElementById('ledger-row-' + currentHoveredFloorNum)
    if (row) row.classList.remove('row-active')
    currentHoveredFloorNum = null
  }
}

// ── Tooltip ──
var tempV = new THREE.Vector3()

function showTooltip(fn) {
  if (!focusedBuilding) return
  var d = focusedBuilding.floorData[fn]
  if (!d) return
  tooltipTitle.textContent = 'TẦNG ' + fn
  tooltipVacant.textContent = d.vacant
  tooltipRes.textContent = d.reserved
  tooltipSold.textContent = d.sold
  tooltipEl.style.display = 'flex'
  requestAnimationFrame(function () {
    tooltipEl.style.opacity = '1'
    tooltipEl.classList.add('active')
  })
  updateTooltipPos(fn)
}

function updateTooltipPos(fn) {
  if (!focusedBuilding || currentHoveredFloorNum === null) return
  var isL = fn === 1,
    cH = isL ? LH : FH
  var pY = isL ? 0.2 : 0.2 + LH + (fn - 2) * FH
  tempV.set(focusedBuilding.pos.x, pY + cH / 2, focusedBuilding.pos.z)
  tempV.project(camera)
  // Use transform instead of left/top to avoid layout reflow
  var tx = (tempV.x * 0.5 + 0.5) * window.innerWidth
  var ty = (tempV.y * -0.5 + 0.5) * window.innerHeight - 50
  tooltipEl.style.transform =
    'translate(' +
    tx +
    'px,' +
    ty +
    'px) translate(-50%,-100%) scale(' +
    (tooltipEl.classList.contains('active') ? '1' : '0.95') +
    ')'
}

function hideTooltip() {
  tooltipEl.style.opacity = '0'
  tooltipEl.classList.remove('active')
  setTimeout(function () {
    if (currentHoveredFloorNum === null) tooltipEl.style.display = 'none'
  }, 150)
}

// ── Labels ──
var labelV = new THREE.Vector3()
function updateLabels() {
  BUILDINGS.forEach(function (b) {
    var el = document.getElementById('label-' + b.id)
    if (!el) return
    labelV.set(b.pos.x, LH + (b.floors - 1) * FH + 1.5, b.pos.z)
    labelV.project(camera)
    if (labelV.z > 1) {
      el.style.display = 'none'
      return
    }
    el.style.display = 'flex'
    // Use transform instead of left/top to avoid layout reflow
    var lx = (labelV.x * 0.5 + 0.5) * window.innerWidth
    var ly = (labelV.y * -0.5 + 0.5) * window.innerHeight
    el.style.transform =
      'translate(' + lx + 'px,' + ly + 'px) translate(-50%,-100%)'
  })
}

// ── Render Loop ──
var wt = 0,
  frameCount = 0
function animate() {
  requestAnimationFrame(animate)

  if (isWalkMode && avatar) {
    // Compute movement vector relative to camera yaw
    var camDir = new THREE.Vector3()
    // Camera direction on X-Z plane
    camDir.set(Math.sin(camRot.yaw), 0, Math.cos(camRot.yaw)).normalize()

    var camRight = new THREE.Vector3()
    camRight.crossVectors(camDir, new THREE.Vector3(0, 1, 0)).normalize()

    var moveVec = new THREE.Vector3(0, 0, 0)
    if (keysPressed['w'] || keysPressed['arrowup']) moveVec.add(camDir)
    if (keysPressed['s'] || keysPressed['arrowdown'])
      moveVec.addScaledVector(camDir, -1)
    if (keysPressed['a'] || keysPressed['arrowleft'])
      moveVec.addScaledVector(camRight, -1)
    if (keysPressed['d'] || keysPressed['arrowright'])
      moveVec.addScaledVector(camRight, 1)

    var isMoving = moveVec.lengthSq() > 0.001

    // Speed
    var currentSpeed = keysPressed['shift'] ? 0.065 : 0.032

    if (isMoving) {
      moveVec.normalize()
      var targetX = avatar.position.x + moveVec.x * currentSpeed
      var targetZ = avatar.position.z + moveVec.z * currentSpeed

      // Boundary constraints so player doesn't fall off map
      targetX = Math.max(-50, Math.min(50, targetX))
      targetZ = Math.max(-45, Math.min(35, targetZ))

      // Check building wall collision
      var targetFloorH = window.getTerrainHeight(
        targetX,
        targetZ,
        avatar.position.y
      )
      var collision = window.checkBuildingCollision(
        targetX,
        targetZ,
        targetFloorH
      )

      if (!collision) {
        avatar.position.x = targetX
        avatar.position.z = targetZ
      }

      // Rotate avatar body smoothly to face movement direction
      var targetAngle = Math.atan2(moveVec.x, moveVec.z)
      avatar.rotation.y = targetAngle
    }

    // Vertical movement / Gravity & Jump
    var floorH = window.getTerrainHeight(
      avatar.position.x,
      avatar.position.z,
      avatar.position.y
    )

    if (keysPressed[' '] && !isJumping) {
      verticalVelocity = 0.11
      isJumping = true
    }

    if (isJumping) {
      verticalVelocity -= 0.007 // gravity
      avatar.position.y += verticalVelocity
      if (avatar.position.y <= floorH) {
        avatar.position.y = floorH
        verticalVelocity = 0
        isJumping = false
      }
    } else {
      // Smoothly snap to floor height (allows climbing up steps/ramps)
      avatar.position.y += (floorH - avatar.position.y) * 0.15
    }

    // Bobbing & floating visual animation for hover bot
    var time = performance.now() * 0.004
    if (avatar.userData.head) {
      avatar.userData.head.position.y = 0.46 + Math.sin(time) * 0.012
      avatar.userData.visor.position.y = avatar.userData.head.position.y
      avatar.userData.handL.position.y = 0.22 + Math.cos(time * 0.8) * 0.015
      avatar.userData.handR.position.y = 0.22 + Math.sin(time * 0.8) * 0.015
      avatar.userData.ring.material.opacity = 0.5 + Math.sin(time * 2) * 0.25
    }

    // Camera Placement
    if (walkViewMode === 'firstPerson') {
      // Hide avatar model components so they don't clip the camera
      avatar.children.forEach(function (child) {
        if (child !== avatar.userData.ring) child.visible = false
      })

      camera.position.set(
        avatar.position.x,
        avatar.position.y + 0.65,
        avatar.position.z
      )

      var lookTarget = new THREE.Vector3()
      lookTarget.x =
        camera.position.x + Math.sin(camRot.yaw) * Math.cos(camRot.pitch)
      lookTarget.y = camera.position.y + Math.sin(camRot.pitch)
      lookTarget.z =
        camera.position.z + Math.cos(camRot.yaw) * Math.cos(camRot.pitch)
      camera.lookAt(lookTarget)
    } else {
      // Third Person (T3)
      avatar.children.forEach(function (child) {
        child.visible = true
      })

      // Target Camera Position (behind avatar look yaw/pitch)
      var followDist = 2.2
      var camTargetOffset = new THREE.Vector3(
        -Math.sin(camRot.yaw) * Math.cos(camRot.pitch) * followDist,
        -Math.sin(camRot.pitch) * followDist + 0.5,
        -Math.cos(camRot.yaw) * Math.cos(camRot.pitch) * followDist
      )

      var targetCamPos = avatar.position.clone().add(camTargetOffset)

      // Prevent camera from going under ground level
      if (targetCamPos.y < 0.8) targetCamPos.y = 0.8

      // Lerp camera to target position for smooth motion
      camera.position.lerp(targetCamPos, 0.08)

      // Camera looks at avatar chest/head
      var lookAtPos = avatar.position.clone().add(new THREE.Vector3(0, 0.38, 0))
      camera.lookAt(lookAtPos)
    }
  } else {
    controls.update()
  }

  frameCount++
  // Throttle water animation to every 3rd frame (saves material updates)
  if (frameCount % 3 === 0) {
    wt += 0.012
    window.MAT.water.opacity = 0.65 + Math.sin(wt) * 0.05
  }
  if (!isWalkMode) {
    if (currentHoveredFloorNum !== null)
      updateTooltipPos(currentHoveredFloorNum)
    updateLabels()
  }
  renderer.render(scene, camera)
}

// ── VR Tour 360° Integration ──
// Path to LOGIC 306 (relative from building-demo)
var VR_TOUR_PATH = '../LOGIC 306/index.dev.html'

window.openVRTour = function (floorNum, building) {
  var bId = building ? building.id : 'M7'

  // Post message to parent page or React Native webview
  var messagePayload = JSON.stringify({
    action: 'openVRTour',
    floor: floorNum,
    building: bId,
  })
  if (window.parent && window.parent !== window) {
    window.parent.postMessage(messagePayload, '*')
  }
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(messagePayload)
  }

  var url = VR_TOUR_PATH + '?floor=' + floorNum + '&building=' + bId
  var vrOverlay = document.getElementById('vr-overlay')
  var vrIframe = document.getElementById('vr-iframe')
  var vrTitle = document.getElementById('vr-title')
  var vrSubtitle = document.getElementById('vr-subtitle')
  var vrFloorBadge = document.getElementById('vr-floor-badge')
  if (vrOverlay && vrIframe) {
    vrIframe.src = url
    if (vrTitle) vrTitle.textContent = 'VR TOUR 360° - TÒA ' + bId
    if (vrSubtitle)
      vrSubtitle.textContent = 'Tầng ' + floorNum + ' • Tòa ' + bId
    if (vrFloorBadge) vrFloorBadge.textContent = 'Tầng ' + floorNum
    vrOverlay.style.display = 'flex'
  } else {
    window.open(url, '_blank')
  }
}

window.closeVRTour = function () {
  var vrOverlay = document.getElementById('vr-overlay')
  var vrIframe = document.getElementById('vr-iframe')
  if (vrOverlay) vrOverlay.style.display = 'none'
  if (vrIframe) vrIframe.src = ''
}

// ── Fullscreen Support ──
window.toggleFullscreen = function () {
  var btn = document.getElementById('fullscreen-btn')
  if (!document.fullscreenElement) {
    document.documentElement
      .requestFullscreen()
      .then(function () {
        if (btn) btn.innerHTML = '<i class="fa-solid fa-compress text-sm"></i>'
      })
      .catch(function (err) {
        console.error('Lỗi khi bật toàn màn hình:', err)
      })
  } else {
    document.exitFullscreen().then(function () {
      if (btn) btn.innerHTML = '<i class="fa-solid fa-expand text-sm"></i>'
    })
  }
}

// ── Sidebar and HUD Toggle (Minimize/Maximize) ──
window.toggleSidebar = function () {
  var container = document.getElementById('sidebar-container')
  var icon = document.getElementById('sidebar-toggle-icon')
  if (!container || !icon) return

  var isCollapsed = container.classList.toggle('sidebar-collapsed')
  if (isCollapsed) {
    icon.className = 'fa-solid fa-chevron-left'
  } else {
    icon.className = 'fa-solid fa-chevron-right'
  }
}

window.toggleHUD = function () {
  var hud = document.getElementById('tour-hud')
  var content = document.getElementById('hud-content')
  var icon = document.getElementById('hud-toggle-icon')
  if (!hud || !content || !icon) return

  var isCollapsed = hud.classList.toggle('hud-collapsed')
  if (isCollapsed) {
    content.style.display = 'none'
    icon.className = 'fa-solid fa-chevron-up'
  } else {
    content.style.display = 'flex'
    icon.className = 'fa-solid fa-chevron-down'
  }
}

// ── Init ──
showOverview()
animate()
