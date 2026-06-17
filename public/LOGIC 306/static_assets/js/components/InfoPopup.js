import { Settings } from '../hook/useSettings.js'

/**
 * Component hiển thị popup thông tin mô tả về địa điểm
 * Sử dụng:
 * <popup-info-location data-popup-id="location-details"></popup-info-location>
 * data-popup-id: ID dùng để tham chiếu tới popup này - Có thể không cần truyền, nếu không truyền sẽ tự tạo ID ngẫu nhiên, chỉ nên sử dụng cho create bằng JS.
 * Nếu dùng trong HTML nên truyền ID để dễ quản lý (ID này sử dụng cho hàm setData)
 *
 * Sau đó sử dụng hàm tĩnh PopupInfoLocation.setData(popupId, data) để set data cho popup
 * Ví dụ:
 * PopupInfoLocation.setData("location-details", {
 *   id: "loc-001",
 *   title: "Địa điểm 1",
 *   description: "Mô tả cho địa điểm 1"
 * });
 */
class PopupInfoLocation extends HTMLElement {
  /** @type {{id: string, title: string, description: string}} */
  _data = {
    id: 'unk-id',
    title: 'Chưa xác định',
    description: 'Hiện đang cập nhật mô tả cho địa điểm này!',
  }
  _contentEl = null
  _infoDialogEl = null
  _isOpen = false
  _initState = false
  _wrapperEl = null
  static instance = null

  constructor() {
    super()

    const wrapper = document.createElement('div')
    wrapper.className =
      'fixed z-[10] bottom-16 right-8 flex flex-col-reverse gap-3 pointer-events-none'

    const buttonContainer = document.createElement('div')
    buttonContainer.className = 'flex flex-row justify-end'

    const button = document.createElement('button')
    button.className =
      'flex items-center justify-center w-8 h-8 border-2 border-white rounded-full text-[--color-quaternary] hover:border-[--color-secondary-light] bg-[--color-primary-light] hover:bg-[--color-primary] transition-all pointer-events-auto'
    button.title = 'Bật/tắt thông tin mô tả về địa điểm'

    const icon = document.createElement('i')
    icon.className = 'fa-solid fa-info'
    button.appendChild(icon)

    buttonContainer.appendChild(button)

    this._wrapperEl = wrapper
    wrapper.appendChild(buttonContainer)

    const infoDialog = document.createElement('div')
    infoDialog.className =
      'flex flex-col ps-8 pe-2 pt-7 pb-8 text-sm md:text-base w-[12rem] md:w-[20rem] max-h-[60vh] gap-4 bg-[--color-primary] rounded-lg text-white pointer-events-none popup-init opacity-80'
    infoDialog.id = 'info-dialog'

    this._infoDialogEl = infoDialog

    const scrollBox = document.createElement('div')
    scrollBox.className = 'menu-left-scroll scroll-box'

    const content = document.createElement('div')
    content.className = 'pe-6 select-text'
    content.setAttribute('data-detail-location', 'LocationDetail')
    content.innerHTML = this._data.description

    this._contentEl = content

    scrollBox.appendChild(content)
    infoDialog.appendChild(scrollBox)
    wrapper.appendChild(infoDialog)

    button.onclick = () => {
      if (Settings.isButtonsDisabled) return
      if (!this._initState) {
        this._infoDialogEl.classList.toggle('popup-init', false)
        this._wrapperEl.classList.toggle('pointer-events-none', false)
        this._initState = true
      }
      this._isOpen = !this._isOpen
      if (this._isOpen) {
        this._infoDialogEl.classList.toggle('popup-active', true)
        this._infoDialogEl.classList.toggle('popup-out', false)
      } else {
        this._infoDialogEl.classList.toggle('popup-active', false)
        this._infoDialogEl.classList.toggle('popup-out', true)
      }
    }
    this.appendChild(wrapper)

    PopupInfoLocation.instance = this
  }

  set data(value) {
    this._data = { ...this._data, ...value }
    this.render()
  }

  get data() {
    return this._data
  }

  render() {
    if (!this._contentEl) return
    this._contentEl.innerText = this._data.description
  }

  /**
   * Hàm sử dụng để set data cho popup
   */
  static setData(data) {
    if (!PopupInfoLocation.instance) {
      ttbl_logger.error(
        '[PopupInfoLocation] instance not found in the document.'
      )
      return false
    }
    PopupInfoLocation.instance.data = data
  }
}

customElements.define('popup-info-location', PopupInfoLocation)

export { PopupInfoLocation }
