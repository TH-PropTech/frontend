import { MediaController } from '../../hook/useAudio.js'
import useCamera from '../../hook/useCamera.js'
import { Settings } from '../../hook/useSettings.js'

const wait = ms => new Promise(r => setTimeout(r, ms))

const action = {
  async goTo(idObject) {
    const event = new CustomEvent('change-location', {
      detail: { linkto: idObject },
    })
    window.dispatchEvent(event)
  },

  async lookAtCoordinates(x, y) {
    const cam = useCamera().camera
    await wait(500)
    cam.emit('smooth-rotate', { x, y, duration: 1000 })
    await wait(1500)
  },

  async lookAtObject(objectId) {
    const cam = useCamera().camera
    const targetEl = document.querySelector(`[id-object="${objectId}"]`)
    if (!targetEl) {
      ttbl_logger.warn('[lookAtObject] Target element not found:', objectId)
      return
    }
    await wait(500)
    cam.emit('look-at-smooth', { target: targetEl, duration: 1000 })
    await wait(1200)
  },

  async clickObject(idObject) {
    const el = document.querySelector(`[id-object="${idObject}"]`)
    if (el) el.click()
    else
      ttbl_logger.error('[clickObject] Element to click not found:', idObject)
  },

  async playAudio(audioSrc) {
    return new Promise(resolve => {
      const audio = MediaController.play('tour-audio', audioSrc, {
        loop: false,
        volume: 1.0,
      })
      audio.onended = resolve
    })
  },
}

const selectAction = step => {
  if (step.goToIdObject)
    return async () => {
      await wait(step.duration || 0) // chờ trước khi chuyển
      action.goTo(step.goToIdObject)
      await wait(1000) // load cảnh
    }
  if (step.x !== undefined && step.y !== undefined)
    return async () => {
      action.lookAtCoordinates(step.x, step.y)
      await wait(step.duration || 0) // chờ trước khi nhìn
    }
  if (step.viewObjectId)
    return async () => {
      action.lookAtObject(step.viewObjectId)
      await wait(step.duration || 0) // chờ trước khi nhìn
    }
  if (step.clickIdObject)
    return async () => {
      action.clickObject(step.clickIdObject)
      await wait(step.duration || 0) // chờ sau khi click
    }
  if (step.audio) {
    return async () => {
      try {
        await action.playAudio(step.audio)
      } catch (err) {
        ttbl_logger.error(`[TourScript] Error playing audio:`, err)
      }
    }
  }
  return null
}

class TourScript {
  static instance = null

  _data = []

  constructor() {
    this._isTouring = false
    this._shouldBreak = false
    this.toggleTourButton()
  }

  toggleTourButton(display = false) {
    const tourButton = document.querySelector(
      "[data-button-id='btn-play-tour']"
    )
    if (tourButton) {
      tourButton.style.display = display ? 'block' : 'none'
    }
  }

  async startTour() {
    if (this._isTouring) {
      ttbl_logger.log('[TourScript] Tour is already in progress.')
      this.breakTour()
      return
    }
    this._isTouring = true
    this._shouldBreak = false

    Settings.isDisableInteraction = true
    Settings.isDisabledVoiceOver = true

    useCamera().pauseRotate()

    if (!MediaController.isAllowAudio) {
      window.dispatchEvent(
        new CustomEvent('action', { detail: { action: 'media-play' } })
      )
    }

    MediaController.pause('voice-over')

    ttbl_logger.log('[TourScript] Tour started.')

    for (let i = 0; i < this._data.length; i++) {
      if (this._shouldBreak) break

      const step = this._data[i]
      const act = selectAction(step)

      if (!act) {
        ttbl_logger.info(`[TourScript] No action for step ${i}`)
        continue
      }

      try {
        await act() // chờ action xong
      } catch (err) {
        ttbl_logger.error(`[TourScript] Error executing step ${i}:`, err)
      }
    }

    this._endTour()
  }

  _endTour() {
    this._isTouring = false
    this._shouldBreak = false
    Settings.isDisableInteraction = false
    Settings.isDisabledVoiceOver = false
    useCamera().resumeRotate()
    ttbl_logger.info('[TourScript] Tour completed.')
  }

  breakTour() {
    if (!this._isTouring) return
    MediaController.stop('tour-audio')
    this._shouldBreak = true
    this._endTour()
    ttbl_logger.warn('[TourScript] Tour interrupted.')
  }

  static getInstance() {
    if (!TourScript.instance) {
      TourScript.instance = new TourScript()
    }
    return TourScript.instance
  }

  changeData(newData) {
    this._data = newData
    if (this._data && this._data.length > 0) {
      this.toggleTourButton(true)
    } else {
      this.toggleTourButton(false)
    }
  }
}

export default TourScript
