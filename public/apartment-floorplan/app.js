;(function () {
  'use strict'

  var MESSAGE_VERSION = 1
  var scene
  var camera
  var renderer
  var controls
  var apartmentGroup
  var ui
  var walk
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
    if (walk && walk.isActive()) walk.update(dt)
    else controls.update()
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
    if (controls) controls.dispose()
    disposeGroup(apartmentGroup, true)
    if (renderer) renderer.dispose()
    if (canvas)
      canvas.removeEventListener('pointerdown', handleCanvasPointerDown)
    if (canvas) canvas.removeEventListener('pointerup', handleCanvasPointer)
    if (canvas)
      canvas.removeEventListener('webglcontextlost', handleContextLost)
    if (resizeObserver) resizeObserver.disconnect()
    document
      .getElementById('reset-button')
      .removeEventListener('click', resetView)
    document
      .getElementById('walk-button')
      .removeEventListener('click', toggleWalk)
    document
      .getElementById('view-button')
      .removeEventListener('click', toggleView)
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

  function resetScene(config) {
    currentConfig = config
    leaveWalk()
    buildGroup(geometry().WALL_HEIGHT)
    resetCamera()
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
    return true
  }

  function resetView() {
    if (leaveWalk()) buildGroup(geometry().WALL_HEIGHT)
    resetCamera()
  }

  function enterWalk() {
    if (!currentConfig || walk.isActive()) return
    try {
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
      resetCamera()
      syncWalkUi()
      send('FLOORPLAN_ERROR', { code: 'WALK_UNAVAILABLE' })
    }
  }

  function toggleWalk() {
    if (walk.isActive()) resetView()
    else enterWalk()
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
    if (walk && walk.isActive()) walk.teleport(roomId)
    else if (ui) ui.highlight(roomId)
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
    if (hit) ui.highlight(hit.object.userData.roomId)
  }

  function handleContextLost(event) {
    event.preventDefault()
    fail('WEBGL_CONTEXT_LOST')
  }

  function resetCamera() {
    if (!camera || !controls) return
    var size =
      (apartmentGroup && apartmentGroup.userData.size) || DEFAULT_LAYOUT_SIZE
    var distance = size * CAMERA_FIT
    camera.position.set(distance, distance, distance * 1.1)
    controls.maxDistance = Math.max(MIN_MAX_DISTANCE, size * 2.5)
    controls.target.set(0, 0, 0)
    controls.update()
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
    scene.add(new THREE.AmbientLight(0xfff8ef, 1.8))
    var keyLight = new THREE.DirectionalLight(0xfff4df, 1.2)
    keyLight.position.set(5, 10, 6)
    scene.add(keyLight)
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
      onExit: resetView,
    })
    resize()
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(document.getElementById('viewer'))
    } else {
      window.addEventListener('resize', resize)
    }
    window.addEventListener('beforeunload', disposeRenderer)
    canvas.addEventListener('pointerdown', handleCanvasPointerDown)
    canvas.addEventListener('pointerup', handleCanvasPointer)
    canvas.addEventListener('webglcontextlost', handleContextLost)
    document.getElementById('reset-button').addEventListener('click', resetView)
    document.getElementById('walk-button').addEventListener('click', toggleWalk)
    document.getElementById('view-button').addEventListener('click', toggleView)
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
    }
    if (data.type === 'FLOORPLAN_RESUME') startRendering()
    if (data.type === 'FLOORPLAN_RESET') resetView()
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
