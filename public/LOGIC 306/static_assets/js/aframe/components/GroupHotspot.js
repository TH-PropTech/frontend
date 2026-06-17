import { useDataLocation } from '../../hook/useDataLocation.js'
import TeleportArrow_Plugin from './plugins/TeleportArrow.js'
import TeleportPoint_Plugin from './plugins/TeleportPoint.js'
import TeleportArrow from './spots/TeleportArrow.js'
import TeleportPoint from './spots/TeleportPoint.js'

// Mascot positions in each room (optimized to be closer and next to furniture)
const mascotPositions = {
  'demo-room-01': { x: 1.6, y: -0.7, z: -3.0 }, // Phòng khách - near the TV shelf
  'demo-room-02': { x: 1.2, y: -0.8, z: -2.2 }, // Ban công - corner
  'demo-room-03': { x: -1.7, y: -0.7, z: -2.3 }, // Nhà bếp - near counter
  'demo-room-04': { x: 1.8, y: -0.8, z: -2.5 }, // Phòng ngủ - wall side
  'demo-room-05': { x: 1.1, y: -0.8, z: -1.7 }, // Nhà vệ sinh - corner
}

export default function GroupHotspot(location) {
  const oldSpotGroup = document.querySelector('.spotGroup')
  if (oldSpotGroup) {
    oldSpotGroup.parentNode.removeChild(oldSpotGroup)
  }

  const spotGroup = document.createElement('a-entity')
  spotGroup.className = 'spotGroup'
  spotGroup.id = 'spotGroup'

  spotGroup.setAttribute('scale', '1 1 1')

  // Add 3D Glowing Holographic Guide Point
  const mascotPos = mascotPositions[location.id]
  if (mascotPos) {
    const mascotEntity = document.createElement('a-entity')
    mascotEntity.setAttribute(
      'position',
      `${mascotPos.x} ${mascotPos.y} ${mascotPos.z}`
    )
    mascotEntity.setAttribute('id', 'af-3d-mascot')

    // 1. Glowing outer floor ring
    const baseRing = document.createElement('a-ring')
    baseRing.setAttribute('rotation', '-90 0 0')
    baseRing.setAttribute('radius-inner', '0')
    baseRing.setAttribute('radius-outer', '0.4')
    baseRing.setAttribute('color', '#22d3ee')
    baseRing.setAttribute('opacity', '0.35')
    baseRing.setAttribute('position', '0 0 0')
    baseRing.setAttribute('nohit', '')
    baseRing.setAttribute(
      'animation__scale',
      'property: scale; from: 0.85 0.85 0.85; to: 1.15 1.15 1.15; dur: 2200; easing: easeInOutSine; loop: true'
    )
    baseRing.setAttribute(
      'animation__opacity',
      'property: opacity; from: 0.45; to: 0.08; dur: 2200; easing: easeInOutSine; loop: true'
    )

    // 2. Solid inner floor ring
    const baseRing2 = document.createElement('a-ring')
    baseRing2.setAttribute('rotation', '-90 0 0')
    baseRing2.setAttribute('radius-inner', '0.26')
    baseRing2.setAttribute('radius-outer', '0.29')
    baseRing2.setAttribute('color', '#ffffff')
    baseRing2.setAttribute('opacity', '0.7')
    baseRing2.setAttribute('position', '0 0.01 0')
    baseRing2.setAttribute('nohit', '')

    // 3. Glowing Glass Sphere (Interactive guide point)
    const guideSphere = document.createElement('a-sphere')
    guideSphere.setAttribute('radius', '0.18')
    guideSphere.setAttribute('color', '#21409A')
    guideSphere.setAttribute('opacity', '0.9')
    guideSphere.setAttribute('transparent', 'true')
    guideSphere.setAttribute('class', 'clickable')
    guideSphere.setAttribute(
      'material',
      'roughness: 0.1; metalness: 0.9; emissive: #0891b2; emissiveIntensity: 0.6;'
    )
    // Float animation
    guideSphere.setAttribute(
      'animation__float',
      'property: position; from: 0 0.55 0; to: 0 0.65 0; dur: 2200; dir: alternate; easing: easeInOutQuad; loop: true'
    )

    // 4. Rotating Outer HUD Ring
    const hudRing = document.createElement('a-ring')
    hudRing.setAttribute('radius-inner', '0.24')
    hudRing.setAttribute('radius-outer', '0.27')
    hudRing.setAttribute('color', '#FDB924')
    hudRing.setAttribute('opacity', '0.8')
    hudRing.setAttribute('nohit', '')
    hudRing.setAttribute('position', '0 0.6 0')
    // Rotate & float animation
    hudRing.setAttribute(
      'animation__rotate',
      'property: rotation; to: 360 360 0; dur: 8000; easing: linear; loop: true'
    )
    hudRing.setAttribute(
      'animation__float',
      'property: position; from: 0 0.55 0; to: 0 0.65 0; dur: 2200; dir: alternate; easing: easeInOutQuad; loop: true'
    )

    // 5. Digital HUD label above
    const mascotLabel = document.createElement('a-text')
    mascotLabel.setAttribute('value', 'THUYET MINH')
    mascotLabel.setAttribute('align', 'center')
    mascotLabel.setAttribute('color', '#22d3ee')
    mascotLabel.setAttribute('scale', '0.85 0.85 0.85')
    mascotLabel.setAttribute('position', '0 1.15 0')
    mascotLabel.setAttribute('look-at', '#af-camera')
    mascotLabel.setAttribute('font', 'mozillavr')

    guideSphere.addEventListener('click', () => {
      window.dispatchEvent(
        new CustomEvent('open-mascot-chat', {
          detail: {
            locationId: location.id,
            locationName: location.title || location.name,
          },
        })
      )
    })

    mascotEntity.appendChild(baseRing)
    mascotEntity.appendChild(baseRing2)
    mascotEntity.appendChild(guideSphere)
    mascotEntity.appendChild(hudRing)
    mascotEntity.appendChild(mascotLabel)
    spotGroup.appendChild(mascotEntity)
  }

  if (location.spots)
    location.spots.forEach(spot => {
      const urlPreview =
        useDataLocation().data[spot.id].assets.images.preview ||
        useDataLocation().data[spot.id].assets.images.highQuality ||
        '#'
      if (spot.type == 'highLight') {
        // API Deprecated
      } else if (spot.type == 'markPoint') {
        const spotElement = TeleportPoint({
          ...spot,
          url: urlPreview,
          title: useDataLocation().data[spot.id].title,
        })
        spotGroup.appendChild(spotElement)
      } else {
        {
          const spotElement = TeleportArrow({
            ...spot,
            url: urlPreview,
            title: useDataLocation().data[spot.id].title,
          })
          spotGroup.appendChild(spotElement)
        }
      }
    })

  if (location.plugins)
    location.plugins.forEach(plugin => {
      window.pluginContentManager.loadFromId(plugin.id).then(fetchedData => {
        plugin.data = fetchedData
        const titlePreview = plugin.data.title || '#'
        const urlPreview = plugin.data.preview || '#'
        if (plugin.type == 'markPoint') {
          const spotElement = TeleportPoint_Plugin({
            ...plugin,
            url: urlPreview,
            title: titlePreview,
          })
          spotGroup.appendChild(spotElement)
        } else {
          {
            const spotElement = TeleportArrow_Plugin({
              ...plugin,
              url: urlPreview,
              title: titlePreview,
            })
            spotGroup.appendChild(spotElement)
          }
        }
      })
    })

  return spotGroup
}
