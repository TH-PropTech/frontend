;(function () {
  'use strict'

  var EYE_HEIGHT = 1.6
  var SPEED = 1.4
  var MAX_DT = 0.1
  var MAX_PITCH = Math.PI / 3
  var MAX_LOOK_STEP = Math.PI / 6
  var LOCK_SENSITIVITY = 0.0025
  var DRAG_SENSITIVITY = 0.005
  var THIRD_PERSON_BACK = 2.5
  var THIRD_PERSON_HEIGHT = 2.2
  var AVATAR_LOOK_HEIGHT = 1
  var AVATAR_COLOR = 0x2f6f73
  var KEY_ACTIONS = {
    w: 'forward',
    arrowup: 'forward',
    s: 'back',
    arrowdown: 'back',
    a: 'left',
    arrowleft: 'left',
    d: 'right',
    arrowright: 'right',
  }
  var PAD_RELEASE_EVENTS = ['pointerup', 'pointerleave', 'pointercancel']
  var HINT_UNLOCKED =
    'Kéo để nhìn • W A S D hoặc nút mũi tên để đi • Click để khoá chuột • Esc để thoát'
  var HINT_LOCKED = 'Di chuột để nhìn • W A S D để đi • Esc để mở khoá chuột'
  var HALLWAY_LABEL = 'Hành lang'

  function navigation() {
    return window.FloorplanWalkNavigation
  }

  function createAvatar() {
    var radius = navigation().RADIUS
    var material = new THREE.MeshLambertMaterial({ color: AVATAR_COLOR })
    var body = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, 1.2, 16),
      material
    )
    var head = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 12), material)
    var avatar = new THREE.Group()
    body.position.y = 0.6
    head.position.y = 1.38
    avatar.add(body)
    avatar.add(head)
    avatar.visible = false
    avatar.userData.walkAvatar = true
    return avatar
  }

  function keyAction(event) {
    return KEY_ACTIONS[String(event.key || '').toLowerCase()]
  }

  function create(options) {
    var camera = options.camera
    var canvas = options.canvas
    var avatar = createAvatar()
    var keyState = {}
    var padState = {}
    var drag = null
    var active = false
    var view = 'firstPerson'
    var template = null
    var nav = null
    var position = { x: 0, z: 0 }
    var yaw = 0
    var pitch = 0
    var pendingYaw = 0
    var pendingPitch = 0
    var roomId
    var lastPointerType = 'mouse'

    options.scene.add(avatar)

    function isLocked() {
      return document.pointerLockElement === canvas
    }

    function clearInput() {
      keyState = {}
      padState = {}
      drag = null
      pendingYaw = 0
      pendingPitch = 0
    }

    function releasePointer() {
      if (isLocked() && document.exitPointerLock) document.exitPointerLock()
    }

    function updateHint() {
      options.hint.textContent = isLocked() ? HINT_LOCKED : HINT_UNLOCKED
    }

    function queueLook(dx, dy, sensitivity) {
      pendingYaw -= dx * sensitivity
      pendingPitch -= dy * sensitivity
    }

    function applyLook() {
      var frameYaw = Math.max(
        -MAX_LOOK_STEP,
        Math.min(MAX_LOOK_STEP, pendingYaw)
      )
      var framePitch = Math.max(
        -MAX_LOOK_STEP,
        Math.min(MAX_LOOK_STEP, pendingPitch)
      )
      yaw += frameYaw
      pitch = Math.max(-MAX_PITCH, Math.min(MAX_PITCH, pitch + framePitch))
      pendingYaw = 0
      pendingPitch = 0
    }

    function axis(positive, negative) {
      var value = 0
      if (keyState[positive] || padState[positive]) value += 1
      if (keyState[negative] || padState[negative]) value -= 1
      return value
    }

    function syncRoom() {
      var next = navigation().roomAt(template, position.x, position.z)
      if (next === roomId) return
      roomId = next
      var room = template.rooms.find(function (item) {
        return item.id === next
      })
      options.announcer.textContent = room ? room.label : HALLWAY_LABEL
      options.onRoomChange(next)
    }

    function placeCamera() {
      var isFirstPerson = view === 'firstPerson'
      avatar.visible = !isFirstPerson
      avatar.position.set(position.x, 0, position.z)
      avatar.rotation.y = yaw
      if (isFirstPerson) {
        camera.position.set(position.x, EYE_HEIGHT, position.z)
        camera.rotation.set(pitch, yaw, 0, 'YXZ')
        return
      }
      camera.position.set(
        position.x + Math.sin(yaw) * THIRD_PERSON_BACK,
        THIRD_PERSON_HEIGHT,
        position.z + Math.cos(yaw) * THIRD_PERSON_BACK
      )
      camera.lookAt(position.x, AVATAR_LOOK_HEIGHT, position.z)
    }

    function setPose(pose) {
      position = { x: pose.x, z: pose.z }
      yaw = pose.yaw
      pitch = 0
      syncRoom()
      placeCamera()
    }

    function enter(nextTemplate) {
      template = nextTemplate
      nav = navigation().create(template)
      active = true
      view = 'firstPerson'
      roomId = undefined
      clearInput()
      updateHint()
      setPose(navigation().spawnPoint(template))
    }

    function exit() {
      if (!active) return
      active = false
      clearInput()
      releasePointer()
      avatar.visible = false
      camera.rotation.order = 'XYZ'
      options.announcer.textContent = ''
    }

    function setView(nextView) {
      if (!active) return
      view = nextView
      roomId = undefined
      syncRoom()
      placeCamera()
    }

    function teleport(targetRoomId) {
      if (!active) return
      var pose = navigation().roomTarget(template, targetRoomId)
      if (pose) setPose(pose)
    }

    function update(dt) {
      if (!active) return
      applyLook()
      var forward = axis('forward', 'back')
      var strafe = axis('right', 'left')
      var step = SPEED * Math.min(Math.max(dt, 0), MAX_DT)
      if ((forward || strafe) && step > 0) {
        var length = Math.sqrt(forward * forward + strafe * strafe)
        var sin = Math.sin(yaw)
        var cos = Math.cos(yaw)
        position = navigation().move(nav, position, {
          x: ((-sin * forward + cos * strafe) / length) * step,
          z: ((-cos * forward - sin * strafe) / length) * step,
        })
      }
      syncRoom()
      placeCamera()
    }

    function pause() {
      clearInput()
      releasePointer()
    }

    function handleKeyDown(event) {
      if (!active) return
      if (String(event.key || '').toLowerCase() === 'escape') {
        if (!isLocked()) options.onExit()
        return
      }
      var action = keyAction(event)
      if (!action) return
      event.preventDefault()
      keyState[action] = true
    }

    function handleKeyUp(event) {
      var action = keyAction(event)
      if (action) keyState[action] = false
    }

    function handleMouseMove(event) {
      if (!active || !isLocked()) return
      queueLook(event.movementX || 0, event.movementY || 0, LOCK_SENSITIVITY)
    }

    function handlePointerDown(event) {
      if (!active) return
      lastPointerType = event.pointerType || 'mouse'
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY }
    }

    function handlePointerMove(event) {
      if (!active || !drag || isLocked() || event.pointerId !== drag.id) return
      queueLook(
        event.clientX - drag.x,
        event.clientY - drag.y,
        DRAG_SENSITIVITY
      )
      drag = { id: drag.id, x: event.clientX, y: event.clientY }
    }

    function handlePointerUp() {
      drag = null
    }

    function handleCanvasClick() {
      if (!active || isLocked() || lastPointerType !== 'mouse') return
      if (!canvas.requestPointerLock) return
      try {
        var request = canvas.requestPointerLock()
        if (request && request.catch) request.catch(updateHint)
      } catch (error) {
        updateHint()
      }
    }

    var padHandlers = Array.prototype.map.call(
      options.root.querySelectorAll('[data-walk-move]'),
      function (button) {
        var action = button.getAttribute('data-walk-move')
        return {
          button: button,
          press: function (event) {
            if (!active) return
            event.preventDefault()
            padState[action] = true
          },
          release: function () {
            padState[action] = false
          },
        }
      }
    )

    function bindPad(method) {
      padHandlers.forEach(function (handler) {
        handler.button[method]('pointerdown', handler.press)
        PAD_RELEASE_EVENTS.forEach(function (type) {
          handler.button[method](type, handler.release)
        })
      })
    }

    function bind(method) {
      document[method]('keydown', handleKeyDown)
      document[method]('keyup', handleKeyUp)
      document[method]('mousemove', handleMouseMove)
      document[method]('pointerlockchange', updateHint)
      canvas[method]('pointerdown', handlePointerDown)
      canvas[method]('pointermove', handlePointerMove)
      canvas[method]('pointerup', handlePointerUp)
      canvas[method]('pointercancel', handlePointerUp)
      canvas[method]('click', handleCanvasClick)
      bindPad(method)
    }

    function dispose() {
      exit()
      bind('removeEventListener')
      options.scene.remove(avatar)
      avatar.traverse(function (object) {
        if (object.geometry) object.geometry.dispose()
        if (object.material) object.material.dispose()
      })
    }

    bind('addEventListener')

    return {
      enter: enter,
      exit: exit,
      setView: setView,
      getView: function () {
        return view
      },
      teleport: teleport,
      update: update,
      pause: pause,
      isActive: function () {
        return active
      },
      dispose: dispose,
    }
  }

  window.FloorplanWalk = { create: create }
})()
