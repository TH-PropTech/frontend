;(function () {
  'use strict'

  var WALL_HEIGHT = 0.72
  var WALL_THICKNESS = 0.08

  function createBox(width, height, depth, material) {
    return new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material)
  }

  function addRoomFloor(group, room) {
    var material =
      window.FloorplanMaterials[room.kind] || window.FloorplanMaterials.floor
    var floor = createBox(room.width, 0.04, room.depth, material)
    floor.position.set(room.x, 0.04, room.z)
    floor.userData.roomId = room.id
    group.add(floor)
  }

  function addWalls(group, room) {
    var material = window.FloorplanMaterials.divider
    var doorwayWidth =
      room.kind === 'balcony' ? 0 : Math.min(0.85, room.width * 0.3)
    var segmentWidth = (room.width - doorwayWidth) / 2
    var vertical = createBox(WALL_THICKNESS, WALL_HEIGHT, room.depth, material)
    var walls = [
      [vertical, room.x - room.width / 2, room.z],
      [vertical.clone(), room.x + room.width / 2, room.z],
    ]
    walls.forEach(function (entry) {
      entry[0].position.set(entry[1], WALL_HEIGHT / 2, entry[2])
      entry[0].userData.roomId = room.id
      group.add(entry[0])
    })
    var backWall = createBox(room.width, WALL_HEIGHT, WALL_THICKNESS, material)
    backWall.position.set(room.x, WALL_HEIGHT / 2, room.z + room.depth / 2)
    backWall.userData.roomId = room.id
    group.add(backWall)
    if (doorwayWidth === 0) {
      var frontWall = createBox(
        room.width,
        WALL_HEIGHT,
        WALL_THICKNESS,
        material
      )
      frontWall.position.set(room.x, WALL_HEIGHT / 2, room.z - room.depth / 2)
      frontWall.userData.roomId = room.id
      group.add(frontWall)
      return
    }
    var frontZ = room.z - room.depth / 2
    var leftSegment = createBox(
      segmentWidth,
      WALL_HEIGHT,
      WALL_THICKNESS,
      material
    )
    leftSegment.position.set(
      room.x - (doorwayWidth + segmentWidth) / 2,
      WALL_HEIGHT / 2,
      frontZ
    )
    leftSegment.userData.roomId = room.id
    group.add(leftSegment)
    var rightSegment = leftSegment.clone()
    rightSegment.position.x = room.x + (doorwayWidth + segmentWidth) / 2
    rightSegment.userData.roomId = room.id
    group.add(rightSegment)
    var doorFrameMaterial = window.FloorplanMaterials.furniture
    var framePost = createBox(
      WALL_THICKNESS,
      WALL_HEIGHT * 0.7,
      WALL_THICKNESS,
      doorFrameMaterial
    )
    var frameLeft = framePost.clone()
    frameLeft.position.set(
      room.x - doorwayWidth / 2,
      WALL_HEIGHT * 0.35,
      frontZ
    )
    frameLeft.userData.roomId = room.id
    group.add(frameLeft)
    var frameRight = framePost.clone()
    frameRight.position.set(
      room.x + doorwayWidth / 2,
      WALL_HEIGHT * 0.35,
      frontZ
    )
    frameRight.userData.roomId = room.id
    group.add(frameRight)
    var lintel = createBox(
      doorwayWidth + WALL_THICKNESS,
      WALL_THICKNESS,
      WALL_THICKNESS,
      doorFrameMaterial
    )
    lintel.position.set(room.x, WALL_HEIGHT * 0.7, frontZ)
    lintel.userData.roomId = room.id
    group.add(lintel)
  }

  function addFurniture(group, room, furnishing) {
    if (furnishing === 'bare' && room.kind === 'living') return
    var material =
      room.kind === 'bedroom'
        ? window.FloorplanMaterials.textile
        : window.FloorplanMaterials.furniture
    var width = room.kind === 'bedroom' ? room.width * 0.55 : room.width * 0.38
    var depth = room.kind === 'bedroom' ? room.depth * 0.5 : room.depth * 0.32
    var item = createBox(width, 0.24, depth, material)
    item.position.set(room.x, 0.18, room.z)
    item.userData.roomId = room.id
    group.add(item)
    if (room.kind === 'bathroom') {
      var ceramic = createBox(
        0.35,
        0.22,
        0.35,
        window.FloorplanMaterials.ceramic
      )
      ceramic.position.set(room.x, 0.18, room.z)
      ceramic.userData.roomId = room.id
      group.add(ceramic)
    }
  }

  function create(config) {
    var template = window.FloorplanTemplates.create(config)
    var group = new THREE.Group()
    group.userData.rooms = template.rooms
    var base = createBox(
      template.width,
      0.08,
      template.depth,
      window.FloorplanMaterials.floor
    )
    base.position.y = -0.04
    group.add(base)
    template.rooms.forEach(function (room) {
      addRoomFloor(group, room)
      addWalls(group, room)
      addFurniture(group, room, config.furnishing)
    })
    return group
  }

  window.ApartmentGenerator = { create: create }
})()
