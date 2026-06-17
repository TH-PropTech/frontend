import { AFrameStage } from '../components/AFrameStage.js'
import { LeftBar } from '../components/LeftBar.js'
import TourScript from '../components/plugins/TourScript.js'
import { useDataLocation } from './useDataLocation.js'
import { useDataMenu } from './useDataMenu.js'
import { useDataTourScript } from './useDataScript.js'

const isReady = false

export function useLoadAssets() {
  return {
    load3DAssets: async () => {
      const locations = useDataLocation().data
      // Add default sources
      AFrameStage.getResourceManager().addImage({
        id: 'arrow-teleport',
        url: './static_assets/img/go.png',
      })

      // load default assets first
      const defaultLocation = useDataLocation().getDefaultLocation()

      ttbl_logger.log(
        '[useLoadAssets: priority] Default location:',
        defaultLocation
      )

      let isLoadedDefault = false

      // Ưu tiên tải ảnh mặc định để tăng tốc load
      if (defaultLocation.assets) {
        if (defaultLocation.assets.images) {
          const result =
            await AFrameStage.getResourceManager().priorityLoadImage({
              id: defaultLocation.id || '',
              url:
                defaultLocation.assets.images.highQuality ||
                defaultLocation.assets.images.preview ||
                '',
              timeout: 80000,
            })

          if (!result.success) {
            console.warn('ảnh lỗi:', result.reason)
            isLoadedDefault = true
            // fallback
          } else {
            console.log('ảnh ok')
            isLoadedDefault = true
          }
        }
      }
      // load assets: tối ưu tải tuần tự
      const intervalCheck = async () => {
        if (isLoadedDefault) {
          clearInterval(intervalId)
          for (const locKey in locations) {
            const location = locations[locKey]
            if (location.assets && location.assets.images) {
              const result =
                await AFrameStage.getResourceManager().priorityLoadImage({
                  id: location.id || '',
                  url:
                    location.assets.images.highQuality ||
                    location.assets.images.preview ||
                    '',
                  timeout: 15000,
                })
              if (!result.success) {
                console.warn(
                  `[useLoadAssets] Failed to load image for location ${location.id}:`,
                  result.reason
                )
              }
            }
          }
          ttbl_logger.log(
            '[useLoadAssets] All location assets have been loaded.'
          )
        }
      }
      const intervalId = setInterval(intervalCheck, 100)
    },
    loadMenu: () => {
      const menu = useDataMenu().data
      // Load menu items
      LeftBar.setItems(menu)
    },
    loadTourScript: () => {
      const tourScript = useDataTourScript().data
      TourScript.getInstance().changeData(tourScript)
    },
  }
}
