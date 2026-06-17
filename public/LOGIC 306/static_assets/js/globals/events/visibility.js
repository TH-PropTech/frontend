function handlerVisibilityChange() {
  if (typeof document.visibilityState !== 'undefined') {
    ttbl_logger.log('[event:visibility] Page Visibility API được hỗ trợ')
  } else {
    ttbl_logger.log('[event:visibility] Page Visibility API không được hỗ trợ')
  }
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      if (PageController.settings.isAllowAudio) MediaController.audio.resume()
    } else if (document.visibilityState === 'hidden') {
      if (PageController.settings.isAllowAudio) {
        MediaController.audio.state.object &&
          MediaController.audio.state.object.pause()
        MediaController.audio.state.objectBackground &&
          MediaController.audio.state.objectBackground.pause()
      }
    }
  })
}
