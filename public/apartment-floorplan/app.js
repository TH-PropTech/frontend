;(function () {
  'use strict'

  var MESSAGE_VERSION = 1
  var MODE_EXTERIOR_PREVIEW = 'EXTERIOR_PREVIEW'
  var MODE_INTERIOR_ORBIT = 'INTERIOR_ORBIT'
  var MODE_INTERIOR_WALK = 'INTERIOR_WALK'

  var currentMode = MODE_EXTERIOR_PREVIEW
  var scene
  var camera
  var renderer
  var controls
  var apartmentGroup
  var ui
  var walk
  var preview
  var currentConfig = null
  var animationFrame
  var running = false
  var lastFrameTime = null
  var expectedOrigin = window.location.origin
  var raycaster
  var pointer
  var canvas
  var resizeObserver
  var pointerStart = null
  var selectedRoomId = null

  var CONFIG_LIMITS = { bedrooms: 8, bathrooms: 8, areaM2: 1000 }
  var DRAG_THRESHOLD_PX = 5
  var CAMERA_FIT = 0.85
  var DEFAULT_LAYOUT_SIZE = 10
  var MIN_MAX_DISTANCE = 18
  var ORBIT_FOV = 42
  var WALK_FOV = 70

  function send(type, payload) {
    window.FloorplanHostBridge.post(
      { version: MESSAGE_VERSION, type: type, payload: payload },
      expectedOrigin
    )
  }

  function isBounded(value, maximum) {
    return Number.isFinite(value) && value >= 0 && value <= maximum
  }

  function parseConfig(value) {
    if (!value || typeof value !== 'object') return null
    if (
      value.version !== MESSAGE_VERSION ||
      typeof value.apartmentId !== 'string' ||
      !value.apartmentId
    )
      return null
    if (!isBounded(value.bedrooms, CONFIG_LIMITS.bedrooms)) return null
    if (!isBounded(value.bathrooms, CONFIG_LIMITS.bathrooms)) return null
    if (!isBounded(value.areaM2, CONFIG_LIMITS.areaM2) || value.areaM2 <= 0)
      return null
    if (['bare', 'partial', 'full'].indexOf(value.furnishing) < 0) return null
    return value
  }

  function geometry() {
    return window.FloorplanGeometry
  }

  function stopRendering() {
    running = false
    if (animationFrame) cancelAnimationFrame(animationFrame)
    animationFrame = null
  }

  function renderLoop(time) {
    if (!running) return
    animationFrame = requestAnimationFrame(renderLoop)
    var hasTime = typeof time === 'number'
    var dt =
      hasTime && lastFrameTime !== null ? (time - lastFrameTime) / 1000 : 0
    lastFrameTime = hasTime ? time : null

    if (walk && walk.isActive()) {
      walk.update(dt)
    } else if (currentMode === MODE_EXTERIOR_PREVIEW && preview) {
      preview.update(dt)
      controls.update()
      if (ui && canvas) {
        ui.updateMarkers(camera, canvas.clientWidth, canvas.clientHeight)
      }
    } else {
      controls.update()
    }
    renderer.render(scene, camera)
  }

  function startRendering() {
    if (running) return
    running = true
    lastFrameTime = null
    renderLoop()
  }

  function disposeGroup(group, disposeMaterials) {
    if (!group) return
    var materials = new Set()
    group.traverse(function (object) {
      if (object.geometry) object.geometry.dispose()
      if (disposeMaterials && object.material) {
        var objectMaterials = Array.isArray(object.material)
          ? object.material
          : [object.material]
        objectMaterials.forEach(function (material) {
          materials.add(material)
        })
      }
    })
    if (disposeMaterials)
      materials.forEach(function (material) {
        material.dispose()
      })
  }

  function disposeRenderer() {
    stopRendering()
    if (walk) walk.dispose()
    if (preview) preview.dispose()
    if (controls) controls.dispose()
    disposeGroup(apartmentGroup, true)
    if (renderer) renderer.dispose()
    if (canvas) {
      canvas.removeEventListener('pointerdown', handleCanvasPointerDown)
      canvas.removeEventListener('pointerup', handleCanvasPointer)
      canvas.removeEventListener('webglcontextlost', handleContextLost)
    }
    if (resizeObserver) resizeObserver.disconnect()
    var resetBtn = document.getElementById('reset-button')
    if (resetBtn) resetBtn.removeEventListener('click', handleResetClick)
    var walkBtn = document.getElementById('walk-button')
    if (walkBtn) walkBtn.removeEventListener('click', toggleWalk)
    var viewBtn = document.getElementById('view-button')
    if (viewBtn) viewBtn.removeEventListener('click', toggleView)
    var overviewBtn = document.getElementById('overview-button')
    if (overviewBtn) overviewBtn.removeEventListener('click', enterPreview)
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('resize', resize)
    window.removeEventListener('message', handleMessage)
  }

  function buildGroup(wallHeight) {
    disposeGroup(apartmentGroup, false)
    if (apartmentGroup) scene.remove(apartmentGroup)
    apartmentGroup = window.ApartmentGenerator.create(currentConfig, {
      wallHeight: wallHeight,
    })
    scene.add(apartmentGroup)
    ui = window.FloorplanUi.create({
      group: apartmentGroup,
      onRoomClick: handleRoomClick,
    })
  }

  function resetExteriorCamera() {
    if (!camera || !controls || !apartmentGroup) return
    var template = apartmentGroup.userData.template
    var size = apartmentGroup.userData.size || DEFAULT_LAYOUT_SIZE
    var bounds = preview ? preview.getBounds() : null
    var cx = bounds ? bounds.centerX : 0
    var cz = bounds ? bounds.centerZ : 0
    var distance = Math.max(size * 1.15, 12)

    camera.position.set(
      cx + distance * 0.72,
      distance * 0.9,
      cz + distance * 0.95
    )
    controls.enabled = true
    controls.maxDistance = Math.max(MIN_MAX_DISTANCE, size * 2.8)
    controls.target.set(cx, 0.3, cz)
    controls.update()
  }

  function enterPreview() {
    leaveWalk()
    currentMode = MODE_EXTERIOR_PREVIEW
    selectedRoomId = null

    if (apartmentGroup) {
      buildGroup(geometry().WALL_HEIGHT)
      if (preview) preview.enter(apartmentGroup.userData.template)
    }
    resetExteriorCamera()

    if (ui) {
      ui.setMarkersVisible(true)
      ui.setOverviewButtonVisible(false)
      ui.highlight(null)
    }
  }

  function enterInterior(roomId) {
    if (!apartmentGroup) return
    var rooms = apartmentGroup.userData.rooms || []
    var room = rooms.find(function (r) {
      return r.id === roomId
    })
    if (!room) return

    leaveWalk()
    currentMode = MODE_INTERIOR_ORBIT
    selectedRoomId = roomId

    if (preview) preview.exit()
    if (ui) {
      ui.setMarkersVisible(false)
      ui.setOverviewButtonVisible(true)
      ui.highlight(roomId)
    }

    // Focus camera on the selected room
    var targetX = room.x
    var targetZ = room.z
    var roomSize = Math.max(room.width || 3, room.depth || 3)
    var dist = Math.max(roomSize * 1.5, 4.8)

    camera.position.set(targetX + dist * 0.6, dist * 0.75, targetZ + dist * 0.8)
    controls.enabled = true
    controls.target.set(targetX, 0.4, targetZ)
    controls.update()
  }

  function resetScene(config) {
    currentConfig = config
    leaveWalk()
    buildGroup(geometry().WALL_HEIGHT)
    enterPreview()
  }

  function setFov(fov) {
    camera.fov = fov
    camera.updateProjectionMatrix()
  }

  function syncWalkUi() {
    var active = walk.isActive()
    var walkButton = document.getElementById('walk-button')
    var viewButton = document.getElementById('view-button')
    document.getElementById('viewer').classList.toggle('walking', active)
    walkButton.setAttribute('aria-pressed', String(active))
    walkButton.textContent = active ? 'Thoát đi bộ' : 'Đi bộ'
    viewButton.hidden = !active
    viewButton.textContent =
      walk.getView() === 'firstPerson' ? 'Góc nhìn thứ ba' : 'Góc nhìn thứ nhất'
  }

  function leaveWalk() {
    if (!walk || !walk.isActive()) return false
    walk.exit()
    controls.enabled = true
    setFov(ORBIT_FOV)
    syncWalkUi()
    if (currentMode === MODE_INTERIOR_WALK) {
      currentMode = MODE_INTERIOR_ORBIT
    }
    return true
  }

  function resetInteriorCamera() {
    if (!camera || !controls || !apartmentGroup) return
    var size = apartmentGroup.userData.size || DEFAULT_LAYOUT_SIZE
    var distance = size * CAMERA_FIT
    camera.position.set(distance, distance, distance * 1.1)
    controls.maxDistance = Math.max(MIN_MAX_DISTANCE, size * 2.5)
    controls.target.set(0, 0, 0)
    controls.update()
  }

  function handleResetClick() {
    if (currentMode === MODE_EXTERIOR_PREVIEW) {
      resetExteriorCamera()
      if (preview) preview.reset()
    } else {
      if (leaveWalk()) buildGroup(geometry().WALL_HEIGHT)
      if (selectedRoomId) enterInterior(selectedRoomId)
      else resetInteriorCamera()
    }
  }

  function enterWalk() {
    if (!currentConfig || walk.isActive()) return
    try {
      currentMode = MODE_INTERIOR_WALK
      if (preview) preview.exit()
      if (ui) {
        ui.setMarkersVisible(false)
        ui.setOverviewButtonVisible(false)
      }
      buildGroup(geometry().WALK_WALL_HEIGHT)
      controls.enabled = false
      setFov(WALK_FOV)
      walk.enter(apartmentGroup.userData.template)
      syncWalkUi()
    } catch (error) {
      walk.exit()
      controls.enabled = true
      setFov(ORBIT_FOV)
      buildGroup(geometry().WALL_HEIGHT)
      enterInterior(
        selectedRoomId ||
          (apartmentGroup.userData.rooms[0] &&
            apartmentGroup.userData.rooms[0].id)
      )
      syncWalkUi()
      send('FLOORPLAN_ERROR', { code: 'WALK_UNAVAILABLE' })
    }
  }

  function toggleWalk() {
    if (walk.isActive()) {
      leaveWalk()
      buildGroup(geometry().WALL_HEIGHT)
      if (selectedRoomId) enterInterior(selectedRoomId)
      else resetInteriorCamera()
    } else {
      enterWalk()
    }
  }

  function toggleView() {
    if (!walk.isActive()) return
    var next = walk.getView() === 'firstPerson' ? 'thirdPerson' : 'firstPerson'
    buildGroup(
      next === 'firstPerson'
        ? geometry().WALK_WALL_HEIGHT
        : geometry().WALL_HEIGHT
    )
    walk.setView(next)
    syncWalkUi()
  }

  function handleRoomClick(roomId) {
    if (walk && walk.isActive()) {
      walk.teleport(roomId)
    } else {
      enterInterior(roomId)
    }
  }

  function handleCanvasPointerDown(event) {
    if (walk && walk.isActive()) return
    pointerStart = { x: event.clientX, y: event.clientY }
  }

  function handleCanvasPointer(event) {
    var start = pointerStart
    pointerStart = null
    if (walk && walk.isActive()) return
    if (!apartmentGroup || !ui || event.button !== 0 || !start) return
    var moved = Math.hypot(event.clientX - start.x, event.clientY - start.y)
    if (moved > DRAG_THRESHOLD_PX) return
    var bounds = canvas.getBoundingClientRect()
    pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
    pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1
    raycaster.setFromCamera(pointer, camera)
    var intersections = raycaster.intersectObjects(
      apartmentGroup.children,
      true
    )
    var hit = intersections.find(function (intersection) {
      return Boolean(
        intersection.object.userData && intersection.object.userData.roomId
      )
    })
    if (hit) {
      handleRoomClick(hit.object.userData.roomId)
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      if (walk && walk.isActive()) {
        leaveWalk()
        buildGroup(geometry().WALL_HEIGHT)
        enterInterior(selectedRoomId)
      } else if (currentMode === MODE_INTERIOR_ORBIT) {
        enterPreview()
      }
    }
  }

  function handleContextLost(event) {
    event.preventDefault()
    fail('WEBGL_CONTEXT_LOST')
  }

  function setupScene() {
    canvas = document.getElementById('canvas')
    raycaster = new THREE.Raycaster()
    pointer = new THREE.Vector2()
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf5f1eb)
    camera = new THREE.PerspectiveCamera(ORBIT_FOV, 1, 0.1, 100)
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: false,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    controls = new THREE.OrbitControls(camera, renderer.domElement)
    controls.enableDamping = false
    controls.maxPolarAngle = Math.PI / 2 - 0.08
    controls.minDistance = 3
    controls.maxDistance = 18
    window.FloorplanMaterials.addLighting(scene)

    preview = window.FloorplanPreview.create({
      scene: scene,
      camera: camera,
    })

    walk = window.FloorplanWalk.create({
      camera: camera,
      scene: scene,
      canvas: canvas,
      root: document.getElementById('viewer'),
      hint: document.getElementById('walk-hint'),
      announcer: document.getElementById('room-announcer'),
      onRoomChange: function (roomId) {
        if (ui) ui.highlight(roomId)
      },
      onExit: function () {
        leaveWalk()
        buildGroup(geometry().WALL_HEIGHT)
        if (selectedRoomId) enterInterior(selectedRoomId)
        else resetInteriorCamera()
      },
    })

    resize()
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(document.getElementById('viewer'))
    } else {
      window.addEventListener('resize', resize)
    }
    window.addEventListener('beforeunload', disposeRenderer)
    window.addEventListener('keydown', handleKeyDown)
    canvas.addEventListener('pointerdown', handleCanvasPointerDown)
    canvas.addEventListener('pointerup', handleCanvasPointer)
    canvas.addEventListener('webglcontextlost', handleContextLost)

    var resetBtn = document.getElementById('reset-button')
    if (resetBtn) resetBtn.addEventListener('click', handleResetClick)
    var walkBtn = document.getElementById('walk-button')
    if (walkBtn) walkBtn.addEventListener('click', toggleWalk)
    var viewBtn = document.getElementById('view-button')
    if (viewBtn) viewBtn.addEventListener('click', toggleView)
    var overviewBtn = document.getElementById('overview-button')
    if (overviewBtn) overviewBtn.addEventListener('click', enterPreview)

    syncWalkUi()
    document.getElementById('loading').style.display = 'none'
  }

  function resize() {
    if (!renderer || !camera) return
    var width = document.getElementById('viewer').clientWidth
    var height = document.getElementById('viewer').clientHeight
    renderer.setSize(width, height, false)
    camera.aspect = width / Math.max(height, 1)
    camera.updateProjectionMatrix()
  }

  function handleMessage(event) {
    var isNativeMessage = Boolean(
      window.ReactNativeWebView && (!event.origin || event.origin === 'null')
    )
    if (
      !isNativeMessage &&
      (event.origin !== expectedOrigin || event.source !== window.parent)
    )
      return
    var data = event.data
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data)
      } catch {
        return
      }
    }
    if (!data || data.version !== MESSAGE_VERSION) return
    if (data.type === 'FLOORPLAN_INIT') {
      var config = parseConfig(data.payload)
      if (!config) {
        send('FLOORPLAN_ERROR', { code: 'INVALID_CONFIG' })
        return
      }
      resetScene(config)
      startRendering()
      return
    }
    if (data.type === 'FLOORPLAN_PAUSE') {
      stopRendering()
      if (walk) walk.pause()
      if (preview) preview.pause()
    }
    if (data.type === 'FLOORPLAN_RESUME') startRendering()
    if (data.type === 'FLOORPLAN_RESET') {
      if (currentMode === MODE_EXTERIOR_PREVIEW) {
        resetExteriorCamera()
        if (preview) preview.reset()
      } else {
        handleResetClick()
      }
    }
  }

  function fail(error) {
    stopRendering()
    document.getElementById('loading').style.display = 'none'
    document.getElementById('error').style.display = 'grid'
    send('FLOORPLAN_ERROR', { code: error })
  }

  try {
    setupScene()
    window.addEventListener('message', handleMessage)
    send('FLOORPLAN_READY')
  } catch (error) {
    fail(error instanceof Error ? error.name : 'WEBGL_INIT_FAILED')
  }
})()
