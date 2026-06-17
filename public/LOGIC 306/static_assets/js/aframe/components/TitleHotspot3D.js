function setScaleBasedOnTitleLength(
  element,
  title,
  baseScale = 1,
  scaleFactor = 5
) {
  const scale = Math.max(baseScale, title.length / scaleFactor)
  ttbl_logger.log('scale', scale)
  element.setAttribute('scale', `${scale} 0.6 0.1`)
}

/** Title Hotspot 3D Component
 * @deprecated This component is deprecated and will be removed in future versions. Please use alternative methods for displaying title hotspots in 3D environments.
 */
export function TitleHotspot3D({ id, title, type, position }) {
  const spotElement = document.createElement('a-image')
  const imgData = createImageCanvasWithFont({
    text: title,
    fontSize: 100,
    color: 'white',
    imageType: 'jpg',
  })
  spotElement.setAttribute('src', imgData)
  // Đặt kích thước cho `a-image`
  setScaleBasedOnTitleLength(spotElement, title)

  // Đặt các thuộc tính `spot`
  const spotData = `linkto:#${id};spotgroup:spotGroup-${id};previewTitle:${title};type:${type}`
  spotElement.setAttribute('spot', spotData)
  spotElement.setAttribute('look-at', '#af-camera')
  // Đặt thuộc tính `position`
  spotElement.setAttribute(
    'position',
    position ? `${position.x} ${position.y} ${position.z}` : '0 0 0'
  )

  return spotElement
}
