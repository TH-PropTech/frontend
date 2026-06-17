import { API_ENDPOINTS } from '../globals/consts/api.js'

const demoViews = [
  {
    id: 'demo-room-01',
    title: 'Phòng khách',
    file: 'khach.webp',
    rotation: { x: 0, y: 0, z: 0 },
  },
  {
    id: 'demo-room-02',
    title: 'Ban công',
    file: 'bancong.webp',
    rotation: { x: 0, y: 1.25, z: 0 },
  },
  {
    id: 'demo-room-03',
    title: 'Nhà bếp',
    file: 'Bep.webp',
    rotation: { x: 0, y: 2.5, z: 0 },
  },
  {
    id: 'demo-room-04',
    title: 'Phòng ngủ',
    file: 'ngu.webp',
    rotation: { x: 0, y: 3.75, z: 0 },
  },
  {
    id: 'demo-room-05',
    title: 'Nhà vệ sinh',
    file: 'wc.webp',
    rotation: { x: 0, y: 5, z: 0 },
  },
]

function createDemoSpots(currentIndex) {
  const total = demoViews.length
  const next = demoViews[(currentIndex + 1) % total]
  const previous = demoViews[(currentIndex - 1 + total) % total]

  // Rotate hotspot positions based on room camera rotation
  // so navigation arrows always appear in front/behind the viewer's facing direction
  const roomYaw = demoViews[currentIndex].rotation.y || 0
  const dist = 4
  // Forward spot: in front of where camera faces
  const fwdX = -dist * Math.sin(roomYaw)
  const fwdZ = -dist * Math.cos(roomYaw)
  // Backward spot: behind where camera faces
  const bwdX = dist * Math.sin(roomYaw)
  const bwdZ = dist * Math.cos(roomYaw)

  return [
    {
      id: next.id,
      type: 'markPoint',
      title: 'Sang goc tiep theo',
      position: { x: fwdX, y: -1.2, z: fwdZ },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
    },
    {
      id: previous.id,
      type: 'markPoint',
      title: 'Quay lai goc truoc',
      position: { x: bwdX, y: -1.2, z: bwdZ },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
    },
  ]
}

const demoLocations = Object.fromEntries(
  demoViews.map((view, index) => [
    view.id,
    {
      id: view.id,
      title: view.title,
      name: view.title,
      isHighlight: index === 0,
      facilityId: 'default',
      rotation: view.rotation,
      description: 'Anh demo 360 trong folder ./360.',
      assets: {
        audios: {
          background: './static_assets/audio/background.mp3',
          description: '',
        },
        images: {
          type: 'IMAGE_360',
          preview: `./360/${view.file}`,
          highQuality: `./360/${view.file}`,
        },
      },
      spots: createDemoSpots(index),
      plugins: [],
    },
  ])
)

const defaultLocation = demoLocations[demoViews[0].id]

const props = {
  isLoaded: false,
  data: demoLocations,
  facilities: {
    default: {
      id: 'default',
      name: 'Phong demo',
      description: 'Demo 5 goc cua mot phong, dung anh trong folder ./360.',
      iframeURL: '',
    },
  },
  defaultLocation,
}

const eventName = 'locationDataLoaded'

function getLocationAPI() {
  return new Promise(resolve => {
    fetch(API_ENDPOINTS.GET_LOCATIONS)
      .then(response => response.json())
      .then(data => {
        if (
          data?.data?.locations &&
          Object.keys(data.data.locations).length > 0
        ) {
          props.data = data.data.locations
          props.defaultLocation = data.data.default
          resolve(data.data.locations)
        } else {
          resolve(null)
        }
      })
      .catch(error => {
        ttbl_logger.error('[DataLocation] Error fetching location data:', error)
        resolve(null)
      })
  })
}

function getFacilities() {
  return new Promise(resolve => {
    fetch(API_ENDPOINTS.GET_FACILITIES)
      .then(response => response.json())
      .then(data => {
        if (data?.data && Object.keys(data.data).length > 0) {
          props.facilities = data.data
          resolve(data.data)
        } else {
          resolve(null)
        }
      })
      .catch(error => {
        ttbl_logger.error(
          '[DataLocation] Error fetching facilities data:',
          error
        )
        resolve(null)
      })
  })
}

getLocationAPI()
  .then(apiData => {
    if (apiData && Object.keys(apiData).length > 0) {
      props.data = apiData
      props.isLoaded = true
      ttbl_logger.log(
        '[DataLocation] Location data loaded from API:',
        props.data
      )
    } else {
      props.data = demoLocations
      props.defaultLocation = defaultLocation
      props.isLoaded = true
      ttbl_logger.log(
        '[DataLocation] Location data loaded from local demo folder ./360:',
        props.data
      )
    }
  })
  .catch(error => {
    ttbl_logger.error('[DataLocation] Error loading location data:', error)
  })
  .finally(() => {
    window.dispatchEvent(new CustomEvent(eventName, { detail: props.data }))
    window.events[eventName] = props.data
  })

getFacilities()
  .then(apiData => {
    if (apiData && Object.keys(apiData).length > 0) {
      props.facilities = apiData
      ttbl_logger.log(
        '[DataLocation] Facilities data loaded from API:',
        props.facilities
      )
    } else {
      ttbl_logger.log('[DataLocation] Using local demo facilities.')
    }
  })
  .catch(error => {
    ttbl_logger.error('[DataLocation] Error loading facilities data:', error)
  })

export function useDataLocation() {
  return {
    data: props.data,
    getFacilities: () => props.facilities,
    getDefaultLocation: () => {
      if (props.defaultLocation) {
        return props.defaultLocation
      }
      const data = Object.values(props.data).find(loc => loc.isHighlight)
      return data || defaultLocation
    },
    isLoaded: true,
  }
}
