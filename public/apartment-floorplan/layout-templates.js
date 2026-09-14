;(function () {
  'use strict'

  var LIMITS = { bedrooms: 8, bathrooms: 8 }
  var SCALE_MIN = 0.75
  var SCALE_MAX = 1.4
  var COLUMN_WIDTH = 3.4
  var SPINE_WIDTH = 1.2
  var HALF_WIDTH = COLUMN_WIDTH + SPINE_WIDTH / 2
  var CORRIDOR_DEPTH = 1.2
  var PUBLIC_DEPTH = 4
  var BALCONY_DEPTH = 1.2
  var LIVING_WIDTH = 4.8
  var BEDROOM_DEPTH = 3
  var BATHROOM_WIDTH = 2.2
  var BATHROOM_DEPTH = 2

  function clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value))
  }

  function fromEdges(minX, maxX, minZ, maxZ) {
    return {
      x: (minX + maxX) / 2,
      z: (minZ + maxZ) / 2,
      width: maxX - minX,
      depth: maxZ - minZ,
    }
  }

  function createRoom(id, label, kind, doors, edges) {
    return Object.assign(
      { id: id, label: label, kind: kind, doors: doors },
      fromEdges(edges[0], edges[1], edges[2], edges[3])
    )
  }

  function createPublicRooms(isStudio) {
    var livingMaxX = isStudio ? HALF_WIDTH : -HALF_WIDTH + LIVING_WIDTH
    var rooms = [
      createRoom(
        'living',
        isStudio ? 'Phòng khách & bếp' : 'Phòng khách',
        'living',
        isStudio ? ['front', 'back'] : ['front', 'back', 'east'],
        [-HALF_WIDTH, livingMaxX, 0, PUBLIC_DEPTH]
      ),
    ]
    if (!isStudio) {
      rooms.push(
        createRoom(
          'kitchen',
          'Bếp & ăn',
          'kitchen',
          ['back', 'west'],
          [livingMaxX, HALF_WIDTH, 0, PUBLIC_DEPTH]
        )
      )
    }
    rooms.push(
      createRoom(
        'balcony',
        'Ban công',
        'balcony',
        ['back'],
        [-HALF_WIDTH, livingMaxX, PUBLIC_DEPTH, PUBLIC_DEPTH + BALCONY_DEPTH]
      )
    )
    return rooms
  }

  function createPrivateRooms(bedrooms, bathrooms) {
    var specs = []
    for (var bedroom = 0; bedroom < bedrooms; bedroom += 1) {
      specs.push({
        id: 'bedroom-' + (bedroom + 1),
        label: 'Phòng ngủ ' + (bedroom + 1),
        kind: 'bedroom',
        width: COLUMN_WIDTH,
        depth: BEDROOM_DEPTH,
      })
    }
    for (var bathroom = 0; bathroom < bathrooms; bathroom += 1) {
      specs.push({
        id: 'bathroom-' + (bathroom + 1),
        label: 'WC ' + (bathroom + 1),
        kind: 'bathroom',
        width: BATHROOM_WIDTH,
        depth: BATHROOM_DEPTH,
      })
    }
    var cursors = [-CORRIDOR_DEPTH, -CORRIDOR_DEPTH]
    var inner = SPINE_WIDTH / 2
    return specs.map(function (spec, index) {
      var column = index % 2
      var maxZ = cursors[column]
      var minZ = maxZ - spec.depth
      cursors[column] = minZ
      var edges =
        column === 0
          ? [-inner - spec.width, -inner, minZ, maxZ]
          : [inner, inner + spec.width, minZ, maxZ]
      return createRoom(
        spec.id,
        spec.label,
        spec.kind,
        [column === 0 ? 'east' : 'west'],
        edges
      )
    })
  }

  function createCirculation(privateRooms) {
    var corridor = fromEdges(-HALF_WIDTH, HALF_WIDTH, -CORRIDOR_DEPTH, 0)
    if (!privateRooms.length) return [corridor]
    var bottom = Math.min.apply(
      null,
      privateRooms.map(function (room) {
        return room.z - room.depth / 2
      })
    )
    return [
      corridor,
      fromEdges(-SPINE_WIDTH / 2, SPINE_WIDTH / 2, bottom, -CORRIDOR_DEPTH),
    ]
  }

  function measure(rects) {
    return rects.reduce(
      function (result, rect) {
        return {
          minX: Math.min(result.minX, rect.x - rect.width / 2),
          maxX: Math.max(result.maxX, rect.x + rect.width / 2),
          minZ: Math.min(result.minZ, rect.z - rect.depth / 2),
          maxZ: Math.max(result.maxZ, rect.z + rect.depth / 2),
          area: result.area + rect.width * rect.depth,
        }
      },
      {
        minX: Infinity,
        maxX: -Infinity,
        minZ: Infinity,
        maxZ: -Infinity,
        area: 0,
      }
    )
  }

  function createTemplate(config) {
    var bedrooms = clamp(Math.floor(config.bedrooms), 0, LIMITS.bedrooms)
    var bathrooms = clamp(Math.floor(config.bathrooms), 0, LIMITS.bathrooms)
    var privateRooms = createPrivateRooms(bedrooms, bathrooms)
    var rooms = createPublicRooms(bedrooms === 0).concat(privateRooms)
    var circulation = createCirculation(privateRooms)
    var bounds = measure(rooms.concat(circulation))
    var scale = clamp(
      Math.sqrt(config.areaM2 / bounds.area),
      SCALE_MIN,
      SCALE_MAX
    )
    var centerX = (bounds.minX + bounds.maxX) / 2
    var centerZ = (bounds.minZ + bounds.maxZ) / 2

    function place(rect) {
      return Object.assign({}, rect, {
        x: (rect.x - centerX) * scale,
        z: (rect.z - centerZ) * scale,
        width: rect.width * scale,
        depth: rect.depth * scale,
      })
    }

    return {
      rooms: rooms.map(place),
      circulation: circulation.map(place),
      width: (bounds.maxX - bounds.minX) * scale,
      depth: (bounds.maxZ - bounds.minZ) * scale,
      scale: scale,
    }
  }

  window.FloorplanTemplates = { create: createTemplate }
})()
