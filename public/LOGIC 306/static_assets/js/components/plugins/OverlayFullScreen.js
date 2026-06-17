export class OverlayFullScreen extends HTMLElement {
  _container = null
  _key = null
  _dom = null

  constructor() {
    super()
    this._initialized = false
  }

  static observedAttributes = ['data-is-active']

  connectedCallback() {
    if (this._initialized) return
    this._initialized = true
    this.classList.add('hidden')

    const originalChildren = Array.from(this.childNodes)

    const wrapper = document.createElement('div')
    wrapper.classList.add('relative', 'z-[100]')

    // --- Overlay background ---
    const bg = document.createElement('div')
    bg.classList.add('fixed', 'inset-0', 'bg-black', 'z-[99]')
    bg.style.opacity = 0.8

    // --- Nút close ---
    const btn = document.createElement('button')
    btn.classList.add(
      'fixed',
      'top-4',
      'right-4',
      'z-[101]',
      'bg-[--color-primary]',
      'text-white',
      'text-lg',
      'p-2',
      'rounded-full',
      'font-bold',
      'h-10',
      'w-10',
      'flex',
      'items-center',
      'justify-center',
      'cursor-pointer',
      'hover:bg-[--color-primary-light]',
      'focus:outline-none'
    )
    btn.innerHTML = '&#10005;'

    btn.addEventListener('click', () => {
      this.setAttribute('data-is-active', 'false')
    })

    bg.addEventListener('click', () => {
      this.setAttribute('data-is-active', 'false')
    })

    const container = document.createElement('div')
    container.classList.add(
      'fixed',
      'inset-0',
      'z-[100]',
      'flex',
      'items-center',
      'justify-center',
      'p-4',
      'pointer-events-none'
    )

    container.append(...originalChildren)

    this._container = container
    wrapper.append(bg, btn, container)

    super.appendChild(wrapper)

    this._wrapper = wrapper
    this._updateVisibility()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data-is-active') this._updateVisibility()
  }

  _updateVisibility() {
    const isActive = this.getAttribute('data-is-active') === 'true'
    if (isActive) {
      this.classList.toggle('hidden', false)
      window.dispatchEvent(
        new CustomEvent('plugins-overlay', {
          detail: {
            status: 'visible',
          },
        })
      )
      window.MediaController.pauseAll()
    } else {
      this.classList.toggle('hidden', true)
      window.dispatchEvent(
        new CustomEvent('plugins-overlay', {
          detail: {
            status: 'hidden',
          },
        })
      )
      window.MediaController.resumeAll()
    }
  }

  setContent(newContent, key = '') {
    if (this._key !== key) {
      this._key = key
      // Xoá nội dung cũ
      this._container.innerHTML = ''
      // Thêm nội dung mới
      if (typeof newContent === 'string') {
        this._container.innerHTML = newContent
      } else if (newContent instanceof HTMLElement) {
        this._container.appendChild(newContent)
      } else if (Array.isArray(newContent)) {
        this._container.append(...newContent)
      }
    } else {
      ttbl_logger.info('[OverlayFullScreen] Same content key, not updating.')
    }

    // get first node and set event pointer-events-auto
    if (this._container.firstChild) {
      this._container.firstChild.classList.add('pointer-events-auto')
    }
  }

  setContentAndOpen(newContent, key = '') {
    this.setAttribute('data-is-active', 'true')
    if (this._key !== key) {
      this._key = key
      // Xoá nội dung cũ
      this._container.innerHTML = ''
      // Thêm nội dung mới
      if (typeof newContent === 'string') {
        this._container.innerHTML = newContent
      } else if (newContent instanceof HTMLElement) {
        this._container.appendChild(newContent)
      } else if (Array.isArray(newContent)) {
        this._container.append(...newContent)
      }
    } else {
      ttbl_logger.info('[OverlayFullScreen] Same content key, not updating.')
    }

    // get first node and set event pointer-events-auto
    if (this._container.firstChild) {
      this._container.firstChild.classList.add('pointer-events-auto')
    }
  }

  static getById(id) {
    return document.getElementById(id)
  }
}

customElements.define('overlay-fullscreen', OverlayFullScreen)
