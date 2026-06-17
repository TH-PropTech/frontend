import FloatScreen from './FloatScreen.js'

export class SchoolIntro extends HTMLElement {
  _data = {
    content: `Nội dung đang được tải xuống...`,
  }
  _contentEl = null

  static instance = null

  static get observedAttributes() {
    return ['data-is-open']
  }
  constructor() {
    super()

    const fs = new FloatScreen()

    fs.setAttribute('id', 'fs-intro')
    fs.setAttribute('data-title', 'Giới thiệu về trường')
    fs.setAttribute('data-is-open', 'false')
    this._data = {
      content: this.dataset.content || this._data.content,
    }
    const divIntro = document.createElement('div')
    divIntro.setAttribute(
      'class',
      'flex flex-col border-2 border-white rounded-lg  px-6 py-6 gap-2 menu-left-scroll scroll-box text-lg text-white max-h-[60vh]'
    )
    divIntro.setAttribute('infodev', 'false')
    divIntro.innerText = `${this._data.content}`

    this._contentEl = divIntro
    fs.appendChild(divIntro)

    this.appendChild(fs)

    SchoolIntro.instance = this
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data-is-open') {
      const fs = this.querySelector('#fs-intro')
      if (newValue === 'true') {
        fs.setAttribute('data-is-open', 'true')
      } else {
        fs.setAttribute('data-is-open', 'false')
      }
    }
  }

  set content(val) {
    this._data.content = val
    if (this._contentEl) {
      this._contentEl.innerText = val
    }
  }

  static setContent(val) {
    const el = document.querySelector('school-intro')
    if (el) {
      el.content = val
    }
  }

  open() {
    this.setAttribute('data-is-open', 'true')
  }

  close() {
    this.setAttribute('data-is-open', 'false')
  }
}
customElements.define('school-intro', SchoolIntro)
