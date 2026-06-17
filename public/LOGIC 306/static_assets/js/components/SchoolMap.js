import FloatScreen from './FloatScreen.js'

export class SchoolMap extends HTMLElement {
  _data = {
    title: 'Cơ sở Nguyễn Văn Bảo',
    url: 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d979.7144404253413!2d106.6866912695347!3d10.822195316586118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDQ5JzE5LjkiTiAxMDbCsDQxJzE0LjQiRQ!5e0!3m2!1sen!2s!4v1734856809969!5m2!1sen!2s',
  }

  _floatScreen = null

  static instance = null

  constructor() {
    super()
    this._floatScreen = new FloatScreen()
    this._data.url = this.dataset.url || this._data.url
    this._data.title = this.dataset.title || this._data.title

    this._floatScreen.setAttribute('id', 'fs-map')
    this._floatScreen.setAttribute('data-title', this._data.title)
    this._floatScreen.setAttribute('data-is-open', 'false')

    const iFrame = document.createElement('iframe')
    iFrame.setAttribute('src', this._data.url)
    iFrame.className = 'w-full h-[70vh]'
    iFrame.style.border = '0'
    iFrame.setAttribute('allowfullscreen', '')
    iFrame.setAttribute('loading', 'lazy')
    iFrame.setAttribute('referrerpolicy', 'no-referrer-when-downgrade')
    this._floatScreen.appendChild(iFrame)
    this.appendChild(this._floatScreen)
    SchoolMap.instance = this
  }

  static observedAttributes = ['data-url', 'data-title', 'data-is-open']

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data-url') {
      this._data.url = newValue
      this._floatScreen.querySelector('iframe').setAttribute('src', newValue)
    } else if (name === 'data-title') {
      this._data.title = newValue
      this._floatScreen.updateTitle(newValue)
    } else if (name === 'data-is-open') {
      this._floatScreen.setAttribute('data-is-open', newValue)
    }
  }

  open() {
    this.setAttribute('data-is-open', 'true')
  }

  close() {
    this.setAttribute('data-is-open', 'false')
  }

  static setData({ title, url }) {
    const el = document.querySelector('school-map')
    if (el) {
      if (title) {
        el.setAttribute('data-title', title)
      }
      if (url) {
        if (!url.startsWith('http')) {
          ttbl_logger.error('[SchoolMap] Invalid URL:', url)
          return
        }
        if (url === el._data.url) {
          return // No change needed
        }
        el.setAttribute('data-url', url)
      }

      el._data.title = title || el._data.title
      el._data.url = url || el._data.url
    }
  }
}

customElements.define('school-map', SchoolMap)
