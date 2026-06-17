import { zoom } from '../../aframe/camera.js'
import { LeftBar } from '../../components/LeftBar.js'
import { Settings } from '../../hook/useSettings.js'

export const handlerEventCanvas = () => {
  const canvas = document.querySelector('canvas')
  if (!canvas) return
  canvas.addEventListener('click', e => {
    const event = new CustomEvent('canvas-click', {
      detail: {
        originalEvent: e,
      },
    })
    window.dispatchEvent(event)
    LeftBar.getInstance().close()
  })

  canvas.addEventListener('wheel', e => {
    if (Settings.isDisableInteraction) return
    e.preventDefault()
    const delta =
      Math.sign(e.deltaY) * Math.min(0.1, Math.abs(e.deltaY) * 0.001)
    zoom(e.deltaY < 0, Math.abs(delta))
  })

  //  zoom in/out with pinch gesture
  let initialDistance = null
  canvas.addEventListener('touchstart', e => {
    if (e.touches.length === 2) {
      initialDistance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      )
    }
  })
  canvas.addEventListener('touchmove', e => {
    if (Settings.isDisableInteraction) return
    if (e.touches.length === 2 && initialDistance) {
      e.preventDefault()
      const currentDistance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      )
      const delta = (currentDistance - initialDistance) * 0.005
      zoom(currentDistance > initialDistance, Math.abs(delta))
      initialDistance = currentDistance
    }
  })
  canvas.addEventListener('touchend', e => {
    if (e.touches.length < 2) {
      initialDistance = null
    }
  })
}
