;(function () {
  'use strict'

  var MESSAGE_VERSION = 1
  var scene
  var camera
  var renderer
  var controls
  var apartmentGroup
  var ui
  var animationFrame
  var running = false
  var expectedOrigin = window.location.origin
  var raycaster
  var pointer
  var canvas
  var resizeObserver

  function send(type, payload) {
    window.FloorplanHostBridge.post(
      { version: MESSAGE_VERSION, type: type, payload: payload },
      expectedOrigin
    )
  }

  function parseConfig(value) {
    if (!value || typeof value !== 'object') return null
    if (
      value.version !== MESSAGE_VERSION ||
      typeof value.apartmentId !== 'string' ||
      !value.apartmentId
    )
      return null
    if (!Number.isFinite(value.bedrooms) || value.bedrooms < 0) return null
    if (!Number.isFinite(value.bathrooms) || value.bathrooms < 0) return null
    if (!Number.isFinite(value.areaM2) || value.areaM2 <= 0) return null
    if (['bare', 'partial', 'full'].indexOf(value.furnishing) < 0) return null
    return value
  }

  function stopRendering() {
    running = false
    if (animationFrame) cancelAnimationFrame(animationFrame)
    animationFrame = null
  }

  function renderLoop() {
    if (!running) return
    animationFrame = requestAnimationFrame(renderLoop)
    controls.update()
    renderer.render(scene, camera)
  }

  function startRendering() {
    if (running) return
    running = true
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
    if (controls) controls.dispose()
    disposeGroup(apartmentGroup, true)
    if (renderer) renderer.dispose()
    if (canvas) canvas.removeEventListener('pointerup', handleCanvasPointer)
    if (canvas)
      canvas.removeEventListener('webglcontextlost', handleContextLost)
    if (resizeObserver) resizeObserver.disconnect()
    window.removeEventListener('resize', resize)
    window.removeEventListener('message', handleMessage)
  }

  function resetScene(config) {
    disposeGroup(apartmentGroup, false)
    if (apartmentGroup) scene.remove(apartmentGroup)
    apartmentGroup = window.ApartmentGenerator.create(config)
    scene.add(apartmentGroup)
    ui = window.FloorplanUi.create({
      group: apartmentGroup,
      onReset: resetCamera,
    })
    resetCamera()
  }

  function handleCanvasPointer(event) {
    if (!apartmentGroup || !ui || event.button !== 0) return
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
    camera.position.set(8, 8, 9)
    controls.target.set(0, 0, 0)
    controls.update()
  }

  function setupScene() {
    canvas = document.getElementById('canvas')
    raycaster = new THREE.Raycaster()
    pointer = new THREE.Vector2()
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf5f1eb)
    camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
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
    resize()
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(document.getElementById('viewer'))
    } else {
      window.addEventListener('resize', resize)
    }
    window.addEventListener('beforeunload', disposeRenderer)
    canvas.addEventListener('pointerup', handleCanvasPointer)
    canvas.addEventListener('webglcontextlost', handleContextLost)
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
    if (data.type === 'FLOORPLAN_PAUSE') stopRendering()
    if (data.type === 'FLOORPLAN_RESUME') startRendering()
    if (data.type === 'FLOORPLAN_RESET') resetCamera()
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
