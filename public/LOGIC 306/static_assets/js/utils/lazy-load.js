export function createAssetLazyLoad(data) {
  //         <meta data-id="Cs1-HallE-1224" pre-src="./static_assets/img/360/Cs1-HallE-1224.jpg"/>
  const metaElement = document.createElement('meta')
  metaElement.setAttribute('data-id', data.id)
  metaElement.setAttribute('pre-src', data.assets.images.highQuality)
  return metaElement
}

export function addAssetLazyLoad(asset) {
  const assetsManager = document.getElementById('assetsManagerLazy')
  const assetElement = createAssetLazyLoad(asset)
  assetsManager.appendChild(assetElement)
}

export function addAssetImage(id, url) {
  const img = document.createElement('img')
  img.src = url
  img.id = id

  document.getElementById('assetsManager').appendChild(img)
}

// Hàm tải tài nguyên tuần tự
export function loadAssetsSequentially(lazyAssets, assetsManager, index) {
  if (index >= lazyAssets.length) {
    return // Kết thúc khi đã tải hết tài nguyên
  }

  const asset = lazyAssets[index]
  const lazyData = asset.getAttribute('pre-src')
  const idData = asset.getAttribute('data-id')

  // Tạo một thẻ img tạm để kiểm tra khi nào hình tải xong
  const img = document.createElement('img')
  img.src = lazyData
  img.id = idData

  img.onload = () => {
    // Hình ảnh đã tải xong, thêm vào DOM
    assetsManager.appendChild(img)
    // Tiếp tục tải tài nguyên tiếp theo
    loadAssetsSequentially(lazyAssets, assetsManager, index + 1)
  }

  img.onerror = () => {
    ttbl_logger.error(`[LazyLoad] Hình ảnh với src: ${lazyData} không thể tải.`)
    // Tiếp tục tải tài nguyên tiếp theo ngay cả khi lỗi
    loadAssetsSequentially(lazyAssets, assetsManager, index + 1)
  }
}

// Thuật toán preload tài nguyên
export function loadLazyAssets() {
  // Lấy tất cả các tài nguyên có thuộc tính lazy-load
  const lazyAssets = document.querySelectorAll('[pre-src]')
  const assetsManager = document.getElementById('assetsManager')
  loadAssetsSequentially(lazyAssets, assetsManager, 0)
}
