import TourScript from '../../components/plugins/TourScript.js'
import { Settings } from '../../hook/useSettings.js'
import { getPointerXY } from '../../utils/helper.js'

ttbl_logger.log('[spot.js] loaded')

AFRAME.registerComponent('spot', {
  schema: {
    linkto: { type: 'string', default: '' },
    previewTitle: { type: 'string', default: 'Next to' },
    type: { type: 'string', default: 'goAHead' },
    url: { type: 'string', default: '#' },
  },

  init: function () {
    const el = this.el
    const data = this.data
    const infospot = document.getElementById('target-info')

    if (!infospot) {
      ttbl_logger.warn('[spot] Không tìm thấy #target-info')
      return
    }

    // === Handler update vị trí tooltip ===
    const mouseMoveHandler = e => {
      const { x, y } = getPointerXY(e)
      const infospotWidth = infospot.offsetWidth
      const infospotHeight = infospot.offsetHeight

      let infoPositionY =
        y - infospotHeight - 20 < 0 ? y + 20 : y - infospotHeight - 20
      let infoPositionX =
        x + infospotWidth + 30 > window.innerWidth ? x - infospotWidth - 20 : x

      infospot.style.left = `${infoPositionX}px`
      infospot.style.top = `${infoPositionY}px`

      infospot.querySelector('img').src = data.url
      infospot.querySelector('p').textContent = data.previewTitle
    }

    // === Khi hover vào ===
    const handleEnter = e => {
      if (Settings.isDisableInteraction) return
      infospot.classList.remove('hidden')
      e.target.sceneEl.canvas.addEventListener('mousemove', mouseMoveHandler)

      document.addEventListener('touchmove', mouseMoveHandler)
    }

    // === Khi rời chuột ra ===
    const handleLeave = e => {
      infospot.classList.add('hidden')
      e.target.sceneEl.canvas.removeEventListener('mousemove', mouseMoveHandler)

      document.removeEventListener('touchmove', mouseMoveHandler)
    }

    el.addEventListener('click', () => {
      infospot.classList.add('hidden')
      if (Settings.isDisableInteraction) return
      const event = new CustomEvent('change-location', {
        detail: {
          linkto: data.linkto,
        },
      })
      window.dispatchEvent(event)
    })

    // === Gắn event ===
    el.addEventListener('mouseenter', handleEnter)
    el.addEventListener('mouseleave', handleLeave)
  },
})
