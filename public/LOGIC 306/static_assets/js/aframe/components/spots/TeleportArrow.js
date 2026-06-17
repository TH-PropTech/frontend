export default function TeleportArrow({
  id,
  title,
  type,
  position,
  rotation,
  url,
}) {
  const spotElement = document.createElement('a-image')

  // Đặt các thuộc tính `spot`
  const spotData = `linkto:${id};previewTitle:${title};type:${type};url:${url}`
  spotElement.setAttribute('spot', spotData)
  spotElement.setAttribute('id-object', id)

  spotElement.setAttribute(
    'position',
    position ? `${position.x} ${position.y} ${position.z}` : '0 0 0'
  )
  spotElement.setAttribute('src', '#af-arrow-teleport')

  spotElement.setAttribute(
    'rotation',
    rotation ? `${rotation.x} ${rotation.y} ${rotation.z}` : '0 0 0'
  )

  spotElement.setAttribute('material', 'side: double; transparent: true;')

  // animation
  spotElement.addEventListener('mouseenter', () => {
    spotElement.setAttribute(
      'animation',
      'property: scale; to: 1.2 1.2 1.2; dur: 300; easing: linear; loop: false'
    )
  })
  spotElement.addEventListener('mouseleave', () => {
    spotElement.setAttribute(
      'animation',
      'property: scale; from: 1 1 1; to: 1.3 1.3 1.3; dir: alternate; dur: 700; loop: true'
    )
  })

  spotElement.setAttribute(
    'animation',
    'property: scale; from: 1 1 1; to: 1.3 1.3 1.3; dir: alternate; dur: 700; loop: true'
  )

  ttbl_logger.log('[TeleportArrow] Created:', spotElement)
  return spotElement
}
