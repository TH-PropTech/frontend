;(function () {
  'use strict'

  var WALL_HEIGHT = 0.72
  var RAILING_HEIGHT = 0.42
  var WALL_THICKNESS = 0.08
  var FLOOR_THICKNESS = 0.04
  var MAX_DOOR_WIDTH = 0.85
  var DOOR_POST_HEIGHT = WALL_HEIGHT * 0.7
  var FURNITURE_HEIGHT = 0.24
  var SIDES = ['front', 'back', 'east', 'west']

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
    addMesh(group, floor, roomId)
  }

  function describeWall(room, side) {
    var alongX = side === 'front' || side === 'back'
    var inset = WALL_THICKNESS / 2
    var x = room.x
    var z = room.z
    if (side === 'front') z = room.z + room.depth / 2 - inset
    if (side === 'back') z = room.z - room.depth / 2 + inset
    if (side === 'east') x = room.x + room.width / 2 - inset
    if (side === 'west') x = room.x - room.width / 2 + inset
    return {
      alongX: alongX,
      x: x,
      z: z,
      length: alongX ? room.width : room.depth - WALL_THICKNESS * 2,
    }
  }

  function addWallPiece(group, roomId, wall, offset, length, height, material) {
    var mesh = wall.alongX
      ? createBox(length, height, WALL_THICKNESS, material)
      : createBox(WALL_THICKNESS, height, length, material)
    mesh.position.set(
      wall.alongX ? wall.x + offset : wall.x,
      height / 2,
      wall.alongX ? wall.z : wall.z + offset
    )
    addMesh(group, mesh, roomId)
  }

  function addDoorFrame(group, roomId, wall, doorWidth) {
    var material = palette().furniture
    var span = doorWidth + WALL_THICKNESS
    addWallPiece(
      group,
      roomId,
      wall,
      -doorWidth / 2,
      WALL_THICKNESS,
      DOOR_POST_HEIGHT,
      material
    )
    addWallPiece(
      group,
      roomId,
      wall,
      doorWidth / 2,
      WALL_THICKNESS,
      DOOR_POST_HEIGHT,
      material
    )
    var lintel = wall.alongX
      ? createBox(span, WALL_THICKNESS, WALL_THICKNESS, material)
      : createBox(WALL_THICKNESS, WALL_THICKNESS, span, material)
    lintel.position.set(wall.x, DOOR_POST_HEIGHT, wall.z)
    addMesh(group, lintel, roomId)
  }

  function addSide(group, room, side) {
    var wall = describeWall(room, side)
    var isRailing = room.kind === 'balcony' && side !== 'back'
    var material = isRailing ? palette().glass : palette().divider
    var height = isRailing ? RAILING_HEIGHT : WALL_HEIGHT
    if (room.doors.indexOf(side) < 0) {
      addWallPiece(group, room.id, wall, 0, wall.length, height, material)
      return
    }
    var doorWidth = Math.min(MAX_DOOR_WIDTH, wall.length * 0.35)
    var segment = (wall.length - doorWidth) / 2
    var offset = (doorWidth + segment) / 2
    addWallPiece(group, room.id, wall, -offset, segment, height, material)
    addWallPiece(group, room.id, wall, offset, segment, height, material)
    addDoorFrame(group, room.id, wall, doorWidth)
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

  function create(config) {
    var template = window.FloorplanTemplates.create(config)
    var group = new THREE.Group()
    group.userData.rooms = template.rooms
    group.userData.size = Math.max(template.width, template.depth)
    template.circulation.forEach(function (rect) {
      addFloor(group, rect, palette().floor, null)
    })
    template.rooms.forEach(function (room) {
      addFloor(group, room, palette()[room.kind] || palette().floor, room.id)
      SIDES.forEach(function (side) {
        addSide(group, room, side)
      })
      addFurniture(group, room, config.furnishing)
    })
    return group
  }

  window.ApartmentGenerator = { create: create }
})()
