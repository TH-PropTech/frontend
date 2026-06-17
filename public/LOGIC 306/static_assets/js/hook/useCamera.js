import TourScript from '../components/plugins/TourScript.js'

const props = {
  camera: null,
  listeners: [],
  currentRotate: null,
  isPausedRotate: false,
  autoRotateCamera(duration = 150000, reverse = false, loop = true) {
    const comp = props.camera.components['inertia-look-controls']
    if (!comp)
      return ttbl_logger.error(
        '[Camera:autoRotate] Camera rig chưa có inertia-look-controls'
      )

    const yawObj = comp.yawObject
    const startYaw = yawObj.rotation.y

    let startTime = null
    let stopped = false

    function animate(time) {
      if (!startTime) startTime = time
      if (
        stopped ||
        props.isPausedRotate ||
        TourScript.getInstance()?._isTouring
      ) {
        props.currentRotate = null
        return
      }

      const elapsed = time - startTime
      const progress = (elapsed % duration) / duration

      // 🔁 Xoay tuyến tính (không đảo hướng)
      const t = progress // từ 0 -> 1

      // hướng xoay (reverse = true → quay ngược)
      const dir = reverse ? 1 : -1

      // Quay 0 -> 360 độ đều tay
      const angle = THREE.MathUtils.degToRad(360 * t * dir)

      yawObj.rotation.y = startYaw + angle

      // nếu loop = true => lặp vô hạn
      if (loop || elapsed < duration) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)

    // Cho phép dừng giữa chừng
    return {
      stop() {
        stopped = true
      },
    }
  },
}

export default function useCamera() {
  if (!props.camera) {
    props.camera = document.querySelector('[camera]')
  }

  return {
    camera: props.camera,
    setCamera: newCamera => {
      props.camera = newCamera
      props.listeners.forEach(fn => fn(props.camera))
    },
    pauseRotate: () => {
      if (props.currentRotate) {
        props.isPausedRotate = true
      }
    },
    resumeRotate: () => {
      if (props.isPausedRotate) {
        props.isPausedRotate = false
        props.currentRotate = props.autoRotateCamera()
      }
    },
    isRotating: () => {
      return props.currentRotate !== null
    },
    rotateCamera: (duration, reverse, loop) => {
      if (props.currentRotate) {
        props.currentRotate.stop()
      }
      props.currentRotate = props.autoRotateCamera(duration, reverse, loop)
    },
    stopRotate: () => {
      if (props.currentRotate) {
        props.currentRotate.stop()
        props.currentRotate = null
      }
    },
    subscribe: fn => props.listeners.push(fn),
  }
}
