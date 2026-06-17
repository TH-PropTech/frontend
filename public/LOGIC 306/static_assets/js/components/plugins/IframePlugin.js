class IFramePlugin {
  payload = null
  overlay = null

  constructor(payload) {
    this.payload = payload
  }

  mount(overlay) {
    this.overlay = overlay
    if (!this.overlay) {
      ttbl_logger.error('[IFramePlugin] overlay not found.')
      return
    }

    if (!this.payload.data && !this.payload.url) {
      ttbl_logger.error(
        "[IFramePlugin] Either 'data' or 'url' must be provided."
      )
      return
    }

    this.render()
  }

  // Default
  render() {
    try {
      // wrapper
      const wrapper = document.createElement('div')
      wrapper.classList.add('relative', 'w-full', 'h-full')

      this.overlay.setContentAndOpen(wrapper)

      // loading
      const loading = document.createElement('div')
      loading.classList.add(
        'absolute',
        'inset-0',
        'flex',
        'items-center',
        'justify-center',
        'text-white',
        'text-lg',
        'font-medium',
        'animate-pulse',
        'bg-black/40',
        'rounded-3xl'
      )
      loading.textContent = 'Đang tải nội dung...'

      // iframe
      const iframe = document.createElement('iframe')
      iframe.allow = 'fullscreen'
      iframe.classList.add(
        'w-full',
        'h-full',
        'border-0',
        'rounded-2xl',
        'opacity-0',
        'transition-opacity',
        'duration-300'
      )

      if (this?.payload?.data) iframe.srcdoc = this.payload.data
      else iframe.src = this.payload.url
      // append DOM
      wrapper.appendChild(iframe)
      wrapper.appendChild(loading)

      iframe.onload = () => {
        ttbl_logger.log('[IFramePlugin] content loaded successfully.')
        loading.remove()
        iframe.classList.remove('opacity-0')
        iframe.classList.add('opacity-100')
      }

      iframe.onerror = e => {
        ttbl_logger.error('[IFramePlugin] failed to load content:', e)
        loading.textContent = 'Không thể tải nội dung. Vui lòng thử lại.'
      }
      // Render to element

      ttbl_logger.log('[IFramePlugin] loading:', this.payload.src || '[srcdoc]')
    } catch (e) {
      ttbl_logger.warn(`[IFramePlugin] Fail to render`)
    }
  }
}

// Bắt buộc
window.ManagePlugins.addPlugin(IFramePlugin)
