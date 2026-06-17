import { Settings } from './useSettings.js'

class AudioManager {
  constructor() {
    this.audios = new Map() // lưu { id: { audio, status } }
    this.isAllowAudio = true
  }

  _createOrGetAudio(id, uri, loop = false, volume = 1) {
    // check if uri have underfined, null
    if (!uri) {
      ttbl_logger.warn(`[AudioManager] Audio URI is invalid for id: ${id}`)
      // if exists, stop and remove existing audio
      if (this.audios.has(id)) {
        this.stop(id)
        this.audios.delete(id)
      }
      return null
    }
    if (id == 'voice-over' && Settings.isDisabledVoiceOver) {
      return null
    }
    if (this.audios.has(id)) {
      // stop existing audio before create new
      if (this.audios.get(id)?.uri == uri) return this.audios.get(id)
      else {
        this.stop(id)
      }
    }
    const audio = new Audio(uri)
    audio.loop = loop
    audio.volume = volume
    this.audios.set(id, {
      audio,
      status: 'STOPPED',
      uri: uri,
    })
    return this.audios.get(id)
  }

  _control(id, action) {
    const data = this.audios.get(id)
    if (!data) return

    const { audio } = data

    switch (action) {
      case 'play':
        audio
          .play()
          .then(() => (data.status = 'PLAYING'))
          .catch(err =>
            ttbl_logger.error('[AudioManager] Cannot play audio:', err)
          )
        break
      case 'pause':
        audio.pause()
        data.status = 'PAUSED'
        break
      case 'stop':
        audio.pause()
        audio.currentTime = 0
        data.status = 'STOPPED'
        break
    }
  }

  /** Tạo và phát audio mới (nếu chưa tồn tại) */
  play(id, uri, options = {}) {
    if (!uri) {
      ttbl_logger.error(`[AudioManager] Audio URI is invalid for id: ${id}`)
      // if exists, stop and remove existing audio
      if (this.audios.has(id)) {
        this.stop(id)
        this.audios.delete(id)
      }
      return null
    }
    const { loop = false, volume = 1 } = options

    if (!this.isAllowAudio) return
    if (id == 'voice-over' && Settings.isDisabledVoiceOver) return
    const data = this._createOrGetAudio(id, uri, loop, volume)
    this._control(id, 'play')
    return data.audio
  }

  /** Tạm dừng 1 audio cụ thể */
  pause(id) {
    this._control(id, 'pause')
  }

  /** Dừng 1 audio cụ thể */
  stop(id) {
    this._control(id, 'stop')
  }

  /** Phát lại 1 audio đã tạm dừng */
  resume(id) {
    if (!this.isAllowAudio) return
    this._control(id, 'play')
  }

  /** Tắt toàn bộ audio */
  stopAll() {
    for (const [id] of this.audios) this._control(id, 'stop')
  }

  /** Tạm dừng toàn bộ */
  pauseAll() {
    for (const [id] of this.audios) this._control(id, 'pause')
  }

  /** Phát lại toàn bộ (nếu được phép) */
  resumeAll() {
    if (!this.isAllowAudio) return
    for (const [id, data] of this.audios)
      if (data.status === 'PAUSED') this._control(id, 'play')
  }

  /** Bật/tắt âm thanh toàn cục */
  toggleGlobalAudio(enable) {
    this.isAllowAudio = enable
    if (!enable) this.pauseAll()
    else this.resumeAll()
  }

  setIsAllowAudio(enable) {
    this.isAllowAudio = enable
  }

  /** Xoá audio không còn dùng */
  remove(id) {
    const data = this.audios.get(id)
    if (data) {
      this._control(id, 'stop')
      this.audios.delete(id)
    }
  }
}

export const MediaController = new AudioManager()
window.MediaController = MediaController
