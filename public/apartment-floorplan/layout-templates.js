;(function () {
  'use strict'

  var TEMPLATE_LIMITS = { bedrooms: 4, bathrooms: 3 }

  function clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value))
  }

  function addRoom(rooms, id, label, kind, x, z, width, depth) {
    rooms.push({
      id: id,
      label: label,
      kind: kind,
      x: x,
      z: z,
      width: width,
      depth: depth,
    })
  }

  function createTemplate(config) {
    var bedrooms = clamp(
      Math.floor(config.bedrooms),
      0,
      TEMPLATE_LIMITS.bedrooms
    )
    var bathrooms = clamp(
      Math.floor(config.bathrooms),
      1,
      TEMPLATE_LIMITS.bathrooms
    )
    var scale = clamp(Math.sqrt(config.areaM2 / 70), 0.82, 1.35)
    var rooms = []

    addRoom(rooms, 'living', 'Phòng khách', 'living', -2.2, 1.35, 4.4, 2.7)
    addRoom(rooms, 'kitchen', 'Bếp & ăn', 'kitchen', 2.1, 1.35, 3.8, 2.7)
    addRoom(rooms, 'balcony', 'Ban công', 'balcony', 0, 3.35, 6, 0.8)
    for (var index = 0; index < bedrooms; index += 1) {
      var column = index % 2
      var row = Math.floor(index / 2)
      addRoom(
        rooms,
        'bedroom-' + (index + 1),
        'Phòng ngủ ' + (index + 1),
        'bedroom',
        -2.1 + column * 4.2,
        -1.25 - row * 2.35,
        3.8,
        2.1
      )
    }
    for (var bathroomIndex = 0; bathroomIndex < bathrooms; bathroomIndex += 1) {
      addRoom(
        rooms,
        'bathroom-' + (bathroomIndex + 1),
        'WC ' + (bathroomIndex + 1),
        'bathroom',
        3.2,
        -1.05 - bathroomIndex * 1.65,
        1.45,
        1.35
      )
    }
    rooms.forEach(function (room) {
      room.x *= scale
      room.z *= scale
      room.width *= scale
      room.depth *= scale
    })
    var bounds = rooms.reduce(
      function (result, room) {
        return {
          minX: Math.min(result.minX, room.x - room.width / 2),
          maxX: Math.max(result.maxX, room.x + room.width / 2),
          minZ: Math.min(result.minZ, room.z - room.depth / 2),
          maxZ: Math.max(result.maxZ, room.z + room.depth / 2),
        }
      },
      { minX: 0, maxX: 0, minZ: 0, maxZ: 0 }
    )
    return {
      rooms: rooms,
      width: bounds.maxX - bounds.minX + 0.6,
      depth: bounds.maxZ - bounds.minZ + 0.6,
    }
  }

  window.FloorplanTemplates = { create: createTemplate }
})()
