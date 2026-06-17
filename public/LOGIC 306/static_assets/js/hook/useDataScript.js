// import { menuMockup } from "../mockup/menu.js";

import { API_ENDPOINTS } from '../globals/consts/api.js'

function tourScriptAPI() {
  return new Promise(resolve => {
    fetch(API_ENDPOINTS.GET_TOUR_SCRIPT)
      .then(response => response.json())
      .then(data => {
        if (data?.data && data?.data?.metadata) {
          props.data = data.data.metadata
          resolve(data.data.metadata)
        }
      })
      .catch(error => {
        ttbl_logger.error('[DataScript] Error fetching location data:', error)
        resolve(null)
      })
  })
}

const props = {
  data: {},
}

const eventName = 'tourScriptDataLoaded'

tourScriptAPI()
  .then(apiData => {
    if (apiData) {
      props.data = apiData
      props.isLoaded = true
      ttbl_logger.log(
        '[DataScript] Tour script data loaded from API:',
        props.data
      )
    } else {
      props.isLoaded = true
    }
  })
  .catch(error => {
    ttbl_logger.error('[DataScript] Error loading tour script data:', error)
    props.isLoaded = true
  })
  .finally(() => {
    window.dispatchEvent(new CustomEvent(eventName, { detail: props.data }))
    window.events[eventName] = props.data
  })

export function useDataTourScript() {
  return { data: props.data }
}
