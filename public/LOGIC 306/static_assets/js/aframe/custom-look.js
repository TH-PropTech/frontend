import useCamera from '../hook/useCamera.js'
import { Settings } from '../hook/useSettings.js'
function debugCameraLookAt(cameraRig, targetEl) {
  if (!cameraRig || !targetEl) {
    ttbl_logger.warn('[debugCameraLookAt] Thiếu cameraRig hoặc targetEl')
    return
  }

  const comp = cameraRig.components['inertia-look-controls']
  if (!comp) {
    ttbl_logger.warn('[debugCameraLookAt] Camera chưa có inertia-look-controls')
    return
  }

  const yawObj = comp.yawObject
  const pitchObj = comp.pitchObject

  // 📍 Lấy vị trí trong world
  const camPos = new THREE.Vector3()
  cameraRig.object3D.getWorldPosition(camPos)

  const targetPos = new THREE.Vector3()
  targetEl.object3D.getWorldPosition(targetPos)

  // ➡️ Vector hướng tới target
  const dir = new THREE.Vector3().subVectors(targetPos, camPos).normalize()

  // 🎯 Tính yaw/pitch cần để nhìn thẳng
  const targetYaw = Math.atan2(dir.x, -dir.z)
  const targetPitch = Math.asin(THREE.MathUtils.clamp(dir.y, -1, 1))

  // ⚙️ Góc hiện tại
  const curYaw = yawObj.rotation.y
  const curPitch = pitchObj.rotation.x

  // 👀 Tạo line hiển thị hướng nhìn (nếu có scene)
  const scene = cameraRig.sceneEl.object3D
  if (scene) {
    const material = new THREE.LineBasicMaterial({ color: 0x00ff00 })
    const points = [camPos, targetPos]
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const line = new THREE.Line(geometry, material)
    scene.add(line)
    ttbl_logger.log(
      '[debugCameraLookAt] Đã vẽ line debug giữa camera và target'
    )
  }
}

function rotateCameraToLookAt(cameraRig, targetEl, duration = 1500) {
  const comp = cameraRig.components['inertia-look-controls']
  if (!comp)
    return ttbl_logger.warn(
      '[rotateCameraToLookAt] Camera rig chưa có inertia-look-controls'
    )

  const yawObj = comp.yawObject
  const pitchObj = comp.pitchObject

  const camPos = new THREE.Vector3()
  pitchObj.getWorldPosition(camPos) // vị trí mắt thật
  const targetPos = new THREE.Vector3()
  targetEl.object3D.getWorldPosition(targetPos)

  // Vector hướng từ camera đến target trong world
  const dir = new THREE.Vector3().subVectors(targetPos, camPos).normalize()

  // ✅ Tính yaw/pitch tuyệt đối theo trục thế giới
  const targetYaw = Math.atan2(dir.x, -dir.z)
  const targetPitch = Math.asin(THREE.MathUtils.clamp(dir.y, -1, 1))

  // ⛔ KHÔNG cộng thêm yaw/pitch cũ — reset tuyệt đối
  const startYaw = yawObj.rotation.y
  const startPitch = pitchObj.rotation.x
  const startTime = performance.now()

  function normalize(a) {
    return Math.atan2(Math.sin(a), Math.cos(a))
  }

  function animate() {
    const now = performance.now()
    const t = Math.min((now - startTime) / duration, 1)
    const ease = 0.5 - 0.5 * Math.cos(t * Math.PI)

    yawObj.rotation.y = THREE.MathUtils.lerp(
      normalize(startYaw),
      normalize(targetYaw),
      ease
    )
    pitchObj.rotation.x = THREE.MathUtils.lerp(startPitch, targetPitch, ease)

    if (t < 1) requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}

AFRAME.registerComponent('custom-look', {
  init: function () {
    let el = this.el
    el.addEventListener('update-xy', function (t) {
      let lookControls = el.components['inertia-look-controls']
      if (lookControls) {
        lookControls.pitchObject.rotation.x = t.detail.x
        lookControls.yawObject.rotation.y = t.detail.y
      }
    })

    el.addEventListener('smooth-rotate', e => {
      let { x: targetX = 0, y: targetY = 0, duration = 1000 } = e.detail
      let lookControls = el.components['inertia-look-controls']
      if (!lookControls) return

      let pitch = lookControls.pitchObject.rotation.x
      let yaw = lookControls.yawObject.rotation.y

      let startX = pitch
      let startY = yaw
      let startTime = null

      const tick = time => {
        if (!startTime) startTime = time
        let t = Math.min((time - startTime) / duration, 1)

        // smoothstep easing
        let ease = t * t * (3 - 2 * t)

        lookControls.pitchObject.rotation.x = THREE.MathUtils.lerp(
          startX,
          targetX,
          ease
        )
        lookControls.yawObject.rotation.y = THREE.MathUtils.lerp(
          startY,
          targetY,
          ease
        )

        if (t < 1) requestAnimationFrame(tick)
        else el.emit('rotate-finished')
      }
      requestAnimationFrame(tick)
    })

    el.addEventListener('look-at-smooth', e => {
      const targetEl = e.detail.target || this.data.target
      const duration = e.detail.duration || this.data.duration
      if (!targetEl || !targetEl.object3D) return

      const lookControls = el.components['inertia-look-controls']
      if (!lookControls)
        return ttbl_logger.warn('[look-at-smooth] Thiếu inertia-look-controls!')

      rotateCameraToLookAt(el, targetEl, duration)
    })
  },
  getCurrentRotation: function () {
    let lookControls = this.el.components['inertia-look-controls']
    if (lookControls) {
      return {
        x: lookControls.pitchObject.rotation.x,
        y: lookControls.yawObject.rotation.y,
      }
    }
  },
})

AFRAME.registerComponent('nohit', {
  init() {
    this.el.object3D.traverse(obj => {
      obj.raycast = () => {} // vô hiệu hoá va chạm raycaster
    })
  },
})

// Auto rotate after
let autoRotateTimeout = null

// Gọi mỗi khi user tương tác (move, click, drag...)
function onUserInteraction() {
  if (autoRotateTimeout) {
    clearTimeout(autoRotateTimeout)
    autoRotateTimeout = null
  }

  // ⏸️ Dừng xoay tạm thời
  useCamera().pauseRotate()

  // 🕐 Hẹn resume lại sau 5s
  autoRotateTimeout = setTimeout(() => {
    ttbl_logger.log(
      '[onUserInteraction] Resuming auto-rotate after user inactivity.'
    )
    useCamera().resumeRotate()
    autoRotateTimeout = null
  }, 5000)
}

AFRAME.registerComponent('inertia-look-controls', {
  schema: {
    sensitivity: { type: 'number', default: 0.002 },
    damping: { type: 'number', default: 0.92 },
  },
  init() {
    const el = this.el
    this.isDragging = false
    this.lastPos = { x: 0, y: 0 }
    this.velocity = { x: 0, y: 0 }

    // tạo cấu trúc yaw/pitch đúng chuẩn
    this.yawObject = new THREE.Object3D()
    this.pitchObject = new THREE.Object3D()
    this.yawObject.add(this.pitchObject)

    // gắn camera thật vào pitch
    this.pitchObject.add(el.getObject3D('camera'))
    el.object3D.add(this.yawObject)

    // bind input
    const canvas = el.sceneEl.canvas
    canvas.addEventListener('mousedown', e => {
      if (Settings.isDisableInteraction) return
      this.isDragging = true
      this.lastPos = { x: e.clientX, y: e.clientY }
    })
    window.addEventListener('mouseup', () => {
      this.isDragging = false
    })
    window.addEventListener('mousemove', e => this.onMove(e))

    // touch
    canvas.addEventListener('touchstart', e => {
      if (Settings.isDisableInteraction) return
      this.isDragging = true
      const t = e.touches[0]
      this.lastPos = { x: t.clientX, y: t.clientY }
    })
    canvas.addEventListener('touchend', () => {
      this.isDragging = false
    })
    canvas.addEventListener('touchmove', e => this.onMove(e.touches[0]))
  },
  onMove(e) {
    if (!this.isDragging) return
    onUserInteraction()
    const dx = e.clientX - this.lastPos.x
    const dy = e.clientY - this.lastPos.y
    this.lastPos = { x: e.clientX, y: e.clientY }

    this.velocity.x = dy * this.data.sensitivity
    this.velocity.y = dx * this.data.sensitivity
  },
  tick() {
    // cập nhật góc quay dựa trên velocity
    this.pitchObject.rotation.x += this.velocity.x
    this.yawObject.rotation.y += this.velocity.y

    // giới hạn pitch
    const maxPitch = Math.PI / 2
    this.pitchObject.rotation.x = Math.max(
      -maxPitch,
      Math.min(maxPitch, this.pitchObject.rotation.x)
    )

    // giảm dần vận tốc
    this.velocity.x *= this.data.damping
    this.velocity.y *= this.data.damping
  },
})
