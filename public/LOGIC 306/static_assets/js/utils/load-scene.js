import { initCameraAbove } from '../aframe/animate-cinematic.js'
import { setZoom, updateCurrentRotation } from '../aframe/camera.js'
import GroupHotspot from '../aframe/components/GroupHotspot.js'
import { AFrameStage } from '../components/AFrameStage.js'
import { PopupInfoLocation } from '../components/InfoPopup.js'
import { SchoolIntro } from '../components/SchoolIntro.js'
import { SchoolMap } from '../components/SchoolMap.js'
import { MediaController } from '../hook/useAudio.js'
import useCamera from '../hook/useCamera.js'
import { useDataBranding } from '../hook/useDataBranding.js'
import { useDataLocation } from '../hook/useDataLocation.js'

export const sceneData = {
  location: null,
}

export async function firstLoadDataScene(locationId) {
  const { data } = useDataLocation()
  const location = data[locationId]
  if (!location) return

  const retryFlyId = setInterval(() => {
    const rs = initCameraAbove(
      useCamera().camera,
      useDataLocation().getDefaultLocation().rotation || { x: 0, y: 0, z: 0 }
    )
    if (rs) {
      clearInterval(retryFlyId)

      window.dispatchEvent(new CustomEvent('scene-ready'))
    }
  }, 100)

  sceneData.location = location

  PopupInfoLocation.setData({
    id: location.id || '',
    title: location.name || '',
    description: location.description || 'Hiện mô tả đang được cập nhật...',
  })

  AFrameStage.addObject(GroupHotspot(location))

  AFrameStage.changeSky({
    id: location.id || '',
    url: location.assets.images.highQuality || '',
  })

  updateCurrentRotation(location.rotation)

  if (location.title) {
    document
      .getElementById('container-label-current-location')
      .classList.toggle('hidden', false)
    document.getElementById('label-current-location').innerText = location.title
  } else {
    document
      .getElementById('container-label-current-location')
      .classList.toggle('hidden', true)
  }

  ttbl_logger.log('[Scene] Scene loaded:', locationId, {
    id: location.id || '',
    url: location.assets.images.highQuality || '',
  })
}

export async function loadDataScene(locationId, skipAnimation = false) {
  const { data } = useDataLocation()
  const location = data[locationId]
  if (!location) return

  MediaController.stop('voice-over')
  !skipAnimation && AFrameStage.animateTransition('fadein')
  await new Promise(resolve => setTimeout(resolve, 501))

  sceneData.location = location

  PopupInfoLocation.setData({
    id: location.id || '',
    title: location.name || '',
    description: location.description || 'Hiện mô tả đang được cập nhật...',
  })

  AFrameStage.addObject(GroupHotspot(location))

  AFrameStage.changeSky({
    id: location.id || '',
    url: location.assets.images.highQuality || '',
  })

  updateCurrentRotation(location.rotation)
  setZoom(1)
  !skipAnimation
    ? setTimeout(() => {
        AFrameStage.animateTransition('fadeout')
        requestAnimationFrame(() => {
          playMedia({ needCheckIfNotPlaying: true })
        })
      }, 200)
    : playMedia({ needCheckIfNotPlaying: true })

  if (location.title) {
    document
      .getElementById('container-label-current-location')
      .classList.toggle('hidden', false)
    document.getElementById('label-current-location').innerText = location.title
  } else {
    document
      .getElementById('container-label-current-location')
      .classList.toggle('hidden', true)
  }

  // Load data UI
  if (location?.facilityId) {
    const facility = useDataLocation().getFacilities()[location?.facilityId]
    if (facility) {
      SchoolIntro.instance &&
        SchoolIntro.setContent(
          facility?.description || '[fallback] Thông tin đang được cập nhật...'
        )

      SchoolMap.instance &&
        SchoolMap.setData({
          title: facility?.name || '[fallback-error]',
          url: facility?.iframeURL || '',
        })
    }
  } else {
    if (SchoolIntro.instance)
      SchoolIntro.setContent(
        useDataBranding().data.schoolInfo.description ||
          '[fallback] Thông tin đang được cập nhật...'
      )
  }
  ttbl_logger.log('[Scene] Scene loaded:', locationId, {
    id: location.id || '',
    url: location.assets.images.highQuality || '',
  })
}

export function playMedia(options = {}) {
  const {
    activate,
    needCheckIfNotPlaying = false,
    backgroundOnly = false,
  } = options
  if (needCheckIfNotPlaying) {
    if (MediaController.isAllowAudio === false) return
  }
  MediaController.toggleGlobalAudio(true)

  ttbl_logger.log('[Media] Play media for location:', sceneData.location.id)

  // Disabled background music to prevent lag as requested
  // MediaController.play("background", sceneData.location.assets.audios.background);

  if (backgroundOnly) return
  const descriptionAudio = sceneData.location.assets?.audios?.description
  if (!descriptionAudio) return

  if (!activate) {
    setTimeout(() => {
      MediaController.play('voice-over', descriptionAudio, { loop: false })
    }, 1500)
  } else {
    activate(() => {
      MediaController.play('voice-over', descriptionAudio, { loop: false })
    })
  }
}

export function stopMedia() {
  MediaController.toggleGlobalAudio(false)
}
