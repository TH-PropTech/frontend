import { Settings } from '../hook/useSettings.js'
import { BottomBar } from './BottomBar.js'

const levelIndent = 1.4 // rem
function createHeader() {
  const header = document.createElement('div')
  header.setAttribute('class', 'flex flex-row px-6 py-8')
  const logoWrapper = document.createElement('div')
  logoWrapper.setAttribute('class', 'w-32 md:w-48')
  const logo = document.createElement('img')
  logo.setAttribute('src', './static_assets/logo/full-color.png')
  logo.setAttribute('data-logo', 'logo')
  logo.setAttribute('class', 'w-fit')
  logoWrapper.appendChild(logo)
  header.appendChild(logoWrapper)
  return header
}

function createRedBar() {
  const redBar = document.createElement('div')
  redBar.setAttribute('class', 'w-full h-4 bg-red')
  return redBar
}

function createButton(item, level = 0, isParent = false) {
  const button = document.createElement('button')
  let classNames =
    'flex flex-row justify-between items-center text-left py-1 px-6 border-b border-t border-[--color-quaternary] text-[--color-quaternary] hover:opacity-90 '
  if (item.type === 'header') {
    classNames = classNames + 'bg-[--color-primary] uppercase'
  } else {
    classNames = classNames + 'bg-[--color-primary-light]'
  }
  button.setAttribute('data-item-nav', 'item')

  classNames += ` ps-[${level * levelIndent + levelIndent}rem]`
  button.setAttribute('class', classNames)
  button.innerHTML = `<span>${item.title}</span>${
    isParent
      ? '<i class="ms-4 fa-solid fa-caret-down transition-transform duration-300 -rotate-90"></i>'
      : ''
  }`

  switch (item.type) {
    case 'location':
      button.setAttribute('data-location', item.data.id)
      button.addEventListener('click', e => {
        if (Settings.isDisableInteraction || Settings.isButtonsDisabled) return
        const event = new CustomEvent('change-location', {
          detail: {
            linkto: item.data.id,
          },
        })
        window.dispatchEvent(event)
      })
      break
    case 'url':
      button.setAttribute('data-url', item.data.url)
      button.addEventListener('click', e => {
        if (Settings.isButtonsDisabled) return
        const url = e.currentTarget.getAttribute('data-url')
        if (url) {
          window.open(url, '_blank')
        }
      })
      break
    case 'plugin':
      button.setAttribute('data-plugin-id', item.data.id)
      button.addEventListener('click', e => {
        if (Settings.isButtonsDisabled) return
        window.pluginContentManager
          .loadFromId(item.data.id)
          .then(fetchedData => {
            const data = fetchedData
            window.ManagePlugins.actionOnPlugin(data.pluginName, data, 'mount')
          })
      })
      break
  }
  return button
}

function createMenu(level = 0, parent) {
  const children = parent.sub || []
  const main = createButton(parent, level, children.length > 0)
  if (children.length === 0) return main

  const container = document.createElement('div')
  container.setAttribute('class', 'flex flex-col')
  container.setAttribute('data-item-nav', 'sub-menu')
  container.appendChild(main)

  const containerSub = document.createElement('div')
  containerSub.className =
    'flex flex-col overflow-hidden transition-[max-height] duration-300 ease-in-out'
  containerSub.style.maxHeight = level > 0 ? '0px' : 'none'

  children.forEach(child => {
    containerSub.appendChild(createMenu(level + 1, child))
  })

  main.addEventListener('click', () => {
    const icon = main.querySelector('i')
    const isOpen = containerSub.style.maxHeight !== '0px'

    if (isOpen) {
      containerSub.style.maxHeight = containerSub.scrollHeight + 'px'
      icon.classList.add('-rotate-90')
      requestAnimationFrame(() => {
        containerSub.style.maxHeight = '0px'
      })
    } else {
      containerSub.style.maxHeight = containerSub.scrollHeight + 'px'
      icon.classList.remove('-rotate-90')
      setTimeout(() => {
        containerSub.style.maxHeight = 'none'
      }, 300)
    }
  })

  container.appendChild(containerSub)
  return container
}

function initMenu(items) {
  const menuExisting = document.querySelector("ul[menu-content='loaded']")
  if (menuExisting) {
    menuExisting.remove()
  }
  const menuList = document.createElement('ul')
  menuList.setAttribute('menu-content', 'loaded')
  menuList.setAttribute('class', 'flex flex-col menu-left-scroll scroll-box')
  items.forEach(item => {
    const menuItem = createMenu(0, item)
    if (menuItem) {
      if (menuItem.getAttribute('data-item-nav') == 'sub-menu') {
        const icon = menuItem.querySelector('i')
        icon.classList.remove('-rotate-90')
      }
    }
    menuList.appendChild(menuItem)
  })
  return menuList
}

export class LeftBar extends HTMLElement {
  _menuItems = []

  _menuEl = null

  _buttonShow = null

  _initAnimation = false

  constructor() {
    super()
    const container = document.createElement('div')
    container.setAttribute(
      'class',
      'menu-left flex flex-col -translate-x-full rounded-r-lg shadow-lg'
    )

    const header = createHeader()
    container.appendChild(header)

    const redBar = createRedBar()
    container.appendChild(redBar)

    this.appendChild(container)

    this._buttonShow = document.createElement('button')
    this._buttonShow.setAttribute(
      'class',
      'w-10 h-10 bg-[--color-primary] text-[--color-quaternary] rounded-full shadow-lg z-[9] opacity-80 hover:opacity-100 rotate-90'
    )
    this._buttonShow.setAttribute('title', 'Hiện thanh công cụ')
    this._buttonShow.setAttribute('aria-label', 'Hiện thanh công cụ')
    this._buttonShow.setAttribute('id', 'button-show-bottom-bar')
    const iconShow = document.createElement('i')
    iconShow.setAttribute('class', 'fa-solid fa-chevron-up')
    this._buttonShow.appendChild(iconShow)

    // Make button show anchor the left bar position

    this._buttonShow.addEventListener('click', () => {
      if (Settings.isButtonsDisabled) return
      this.toggle()
    })

    this._buttonShow.style.position = 'fixed'
    this.appendChild(this._buttonShow)

    this._menuEl = container

    this.render()
  }

  open() {
    if (!this._menuEl.classList.contains('-translate-x-full')) {
      return
    }
    this._menuEl.classList.remove('-translate-x-full')
    this._buttonShow.classList.remove('rotate-90')
    this._buttonShow.classList.add('-rotate-90')

    const rect = this._menuEl.getBoundingClientRect()
    requestAnimationFrame(() => {
      this._buttonShow.style.left = rect.width + 30 + 'px'
    })
    BottomBar.hide()
  }

  close() {
    if (this._menuEl.classList.contains('-translate-x-full')) {
      return
    }
    this._menuEl.classList.add('-translate-x-full')
    this._buttonShow.classList.add('rotate-90')
    this._buttonShow.classList.remove('-rotate-90')
    const rect = this._menuEl.getBoundingClientRect()
    requestAnimationFrame(() => {
      this._buttonShow.style.left = 15 + 'px'
    })
  }

  toggle() {
    if (!this._initAnimation) {
      this._initAnimation = true
      this._buttonShow.classList.add(
        'transition-all',
        'duration-300',
        'ease-in-out'
      )
      this._menuEl.classList.add(
        'transition-all',
        'duration-300',
        'ease-in-out'
      )
    }
    const isOpen = this._menuEl.classList.contains('-translate-x-full')
    if (isOpen) {
      this.open()
    } else {
      this.close()
    }
  }

  static toggleMyBar() {
    const instance = LeftBar.getInstance()
    instance.toggle()
    return instance
  }

  set items(value) {
    if (Array.isArray(value)) {
      this._menuItems = value
    }
    this.render()
  }

  render() {
    const menuList = initMenu(this._menuItems)
    this._menuEl.appendChild(menuList)
    if (this._menuEl.classList.contains('-translate-x-full')) {
      const rect = this._menuEl.getBoundingClientRect()
      this._buttonShow.style.left = 15 + 'px'
    } else {
      const rect = this._menuEl.getBoundingClientRect()
      this._buttonShow.style.left = rect.width + 30 + 'px'
    }
  }

  connectedCallback() {}

  static getInstance() {
    const instance = document.querySelector('left-bar')
    if (!instance) {
      document.body.appendChild(document.createElement('left-bar'))
      return document.querySelector('left-bar')
    }
    return instance
  }

  static setItems(items) {
    const instance = LeftBar.getInstance()
    instance.items = items
    return instance
  }
}

customElements.define('left-bar', LeftBar)
