;(function () {
  'use strict'

  var FLOOR_THICKNESS = 0.04
  var FURNITURE_HEIGHT = 0.24
  var EDGE_EPSILON = 0.0001
  var OPPOSITE_SIDE = {
    front: 'back',
    back: 'front',
    east: 'west',
    west: 'east',
  }
  var PIECE_MATERIALS = {
    wall: 'divider',
    header: 'divider',
    railing: 'glass',
    post: 'furniture',
    lintel: 'furniture',
  }

  function palette() {
    return window.FloorplanMaterials
  }

  function createBox(width, height, depth, material) {
    return new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material)
  }

  function addMesh(group, mesh, roomId) {
    if (roomId) mesh.userData.roomId = roomId
    group.add(mesh)
  }

  function addFloor(group, rect, material, roomId) {
    var floor = createBox(rect.width, FLOOR_THICKNESS, rect.depth, material)
    floor.position.set(rect.x, FLOOR_THICKNESS, rect.z)
    floor.userData.selectableSurface = Boolean(roomId)
    addMesh(group, floor, roomId)
  }

  function addPiece(group, room, item) {
    var mesh = createBox(
      item.width,
      item.height,
      item.depth,
      palette()[PIECE_MATERIALS[item.kind]]
    )
    mesh.position.set(item.x, item.y, item.z)
    mesh.userData.piece = item.kind
    mesh.userData.side = item.side
    addMesh(group, mesh, room.id)
  }

  function edge(room, side) {
    var alongX = side === 'front' || side === 'back'
    return {
      axis: alongX ? 'z' : 'x',
      boundary: alongX
        ? room.z + (side === 'front' ? room.depth / 2 : -room.depth / 2)
        : room.x + (side === 'east' ? room.width / 2 : -room.width / 2),
      start: alongX ? room.x - room.width / 2 : room.z - room.depth / 2,
      end: alongX ? room.x + room.width / 2 : room.z + room.depth / 2,
      hasDoor: room.doors.indexOf(side) >= 0,
    }
  }

  function closeTo(a, b) {
    return Math.abs(a - b) <= EDGE_EPSILON
  }

  function sameEdge(a, b) {
    return (
      a.axis === b.axis &&
      closeTo(a.boundary, b.boundary) &&
      closeTo(a.start, b.start) &&
      closeTo(a.end, b.end) &&
      a.hasDoor === b.hasDoor
    )
  }

  function ownedByEarlierRoom(rooms, roomIndex, room, side) {
    var current = edge(room, side)
    var opposite = OPPOSITE_SIDE[side]
    return rooms.slice(0, roomIndex).some(function (other) {
      return sameEdge(current, edge(other, opposite))
    })
  }

  function addFurniture(group, room, furnishing) {
    if (furnishing === 'bare' && room.kind === 'living') return
    var isBedroom = room.kind === 'bedroom'
    var item = createBox(
      room.width * (isBedroom ? 0.55 : 0.38),
      FURNITURE_HEIGHT,
      room.depth * (isBedroom ? 0.5 : 0.32),
      isBedroom ? palette().textile : palette().furniture
    )
    item.position.set(room.x, 0.18, room.z)
    addMesh(group, item, room.id)
    if (room.kind !== 'bathroom') return
    var awayFromDoor = room.doors.indexOf('east') >= 0 ? -1 : 1
    var ceramic = createBox(0.35, 0.22, 0.35, palette().ceramic)
    ceramic.position.set(
      room.x + awayFromDoor * room.width * 0.32,
      0.18,
      room.z
    )
    addMesh(group, ceramic, room.id)
  }

  function create(config, options) {
    var template = window.FloorplanTemplates.create(config)
    var group = new THREE.Group()
    group.userData.rooms = template.rooms
    group.userData.template = template
    group.userData.size = Math.max(template.width, template.depth)
    template.circulation.forEach(function (rect) {
      addFloor(group, rect, palette().floor, null)
    })
    template.rooms.forEach(function (room, roomIndex) {
      addFloor(group, room, palette()[room.kind] || palette().floor, room.id)
      window.FloorplanGeometry.wallPieces(room, options).forEach(
        function (item) {
          if (!ownedByEarlierRoom(template.rooms, roomIndex, room, item.side)) {
            addPiece(group, room, item)
          }
        }
      )
      addFurniture(group, room, config.furnishing)
    })
    return group
  }

  window.ApartmentGenerator = { create: create }
})()
