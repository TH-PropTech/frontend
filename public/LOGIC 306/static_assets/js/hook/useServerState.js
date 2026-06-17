// import { menuMockup } from "../mockup/menu.js";

import { API_ENDPOINTS } from '../globals/consts/api.js'

function getServerState() {
  return new Promise(resolve => {
    fetch(API_ENDPOINTS.GET_SERVER_STATE)
      .then(response => response.json())
      .then(data => {
        if (data?.data && data?.data?.metadata) {
          props.data = data.data.metadata
          resolve(data.data.metadata)
        }
      })
      .catch(error => {
        ttbl_logger.error('[DataMenu] Error fetching location data:', error)
        resolve(null)
      })
  })
}

const props = {
  data: {
    isOpen: true,
  },
}

const eventName = 'serverStateLoaded'

getServerState()
  .then(apiData => {
    if (apiData) {
      props.data = apiData
      window.dispatchEvent(new CustomEvent(eventName, { detail: props.data }))
      ttbl_logger.log(
        '[DataServerState] Server state data loaded from API:',
        props.data
      )

      if (props.data.isOpen === false) {
        ttbl_logger.warn(
          '[DataServerState] Server indicates the virtual tour is closed.'
        )
        window.ManagePlugins.actionOnPlugin('NotificationPlugin', {
          title: 'Đội ngũ đang bảo trì ứng dụng',
          message: 'Xin hãy quay lại sau!',
        })
      }
    } else {
      window.dispatchEvent(new CustomEvent(eventName, { detail: props.data }))
    }
  })
  .catch(error => {
    ttbl_logger.error(
      '[DataServerState] Error loading server state data:',
      error
    )
    window.dispatchEvent(new CustomEvent(eventName, { detail: props.data }))
  })
  .finally(() => {
    props.isLoaded = true
  })

export function useDataServerState() {
  return {
    getData: () => props.data,
    isLoaded: () => props.isLoaded,
    eventName,
  }
}
