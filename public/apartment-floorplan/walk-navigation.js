;(function () {
  'use strict'

  var RADIUS = 0.15
  var EPSILON = 1e-6
  var BLOCKING = { wall: true, railing: true, post: true }
  var SIDE_YAW = {
    front: Math.PI,
    back: 0,
    east: -Math.PI / 2,
    west: Math.PI / 2,
  }

  function toBounds(rect) {
    return {
      minX: rect.x - rect.width / 2,
      maxX: rect.x + rect.width / 2,
      minZ: rect.z - rect.depth / 2,
      maxZ: rect.z + rect.depth / 2,
    }
  }

  function create(template) {
    var colliders = []
    template.rooms.forEach(function (room) {
      window.FloorplanGeometry.wallPieces(room).forEach(function (item) {
        if (BLOCKING[item.kind]) colliders.push(toBounds(item))
      })
    })
    return {
      radius: RADIUS,
      colliders: colliders,
      floors: template.rooms.concat(template.circulation).map(toBounds),
    }
  }

  function onFloor(nav, x, z) {
    return nav.floors.some(function (bounds) {
      return (
        x >= bounds.minX - EPSILON &&
        x <= bounds.maxX + EPSILON &&
        z >= bounds.minZ - EPSILON &&
        z <= bounds.maxZ + EPSILON
      )
    })
  }

  function hitsCollider(nav, x, z) {
    var limit = nav.radius * nav.radius
    return nav.colliders.some(function (bounds) {
      var dx = x - Math.max(bounds.minX, Math.min(x, bounds.maxX))
      var dz = z - Math.max(bounds.minZ, Math.min(z, bounds.maxZ))
      return dx * dx + dz * dz < limit
    })
  }

  function canStand(nav, x, z) {
    return onFloor(nav, x, z) && !hitsCollider(nav, x, z)
  }

  function move(nav, position, delta) {
    var x = position.x
    var z = position.z
    if (canStand(nav, x + delta.x, z)) x += delta.x
    if (canStand(nav, x, z + delta.z)) z += delta.z
    return { x: x, z: z }
  }

  function findRoom(template, roomId) {
    return template.rooms.find(function (room) {
      return room.id === roomId
    })
  }

  function roomAt(template, x, z) {
    var room = template.rooms.find(function (item) {
      var bounds = toBounds(item)
      return (
        x > bounds.minX && x < bounds.maxX && z > bounds.minZ && z < bounds.maxZ
      )
    })
    return room ? room.id : null
  }

  function spawnPoint(template) {
    var corridor = template.circulation[0]
    var living = findRoom(template, 'living')
    return { x: living ? living.x : corridor.x, z: corridor.z, yaw: Math.PI }
  }

  function roomTarget(template, roomId) {
    var room = findRoom(template, roomId)
    if (!room) return null
    var yaw = SIDE_YAW[room.doors[0]]
    return { x: room.x, z: room.z, yaw: yaw === undefined ? 0 : yaw }
  }

  window.FloorplanWalkNavigation = {
    RADIUS: RADIUS,
    create: create,
    canStand: canStand,
    move: move,
    roomAt: roomAt,
    spawnPoint: spawnPoint,
    roomTarget: roomTarget,
  }
})()
