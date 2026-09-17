;(function () {
  'use strict'

  var WALL_HEIGHT = 0.72
  var WALK_WALL_HEIGHT = 2.4
  var WALK_DOOR_HEIGHT = 2
  var RAILING_HEIGHT = 0.42
  var WALL_THICKNESS = 0.08
  var MAX_DOOR_WIDTH = 0.85
  var DOOR_RATIO = 0.35
  var POST_RATIO = 0.7
  var SIDES = ['front', 'back', 'east', 'west']

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

  function piece(wall, offset, length, height, y, kind, side) {
    return {
      kind: kind,
      side: side,
      x: wall.alongX ? wall.x + offset : wall.x,
      z: wall.alongX ? wall.z : wall.z + offset,
      width: wall.alongX ? length : WALL_THICKNESS,
      depth: wall.alongX ? WALL_THICKNESS : length,
      height: height,
      y: y,
    }
  }

  function doorHeightFor(wallHeight) {
    return wallHeight >= WALK_WALL_HEIGHT
      ? WALK_DOOR_HEIGHT
      : wallHeight * POST_RATIO
  }

  function sidePieces(room, side, wallHeight) {
    var wall = describeWall(room, side)
    var isRailing = room.kind === 'balcony' && side !== 'back'
    var kind = isRailing ? 'railing' : 'wall'
    var height = isRailing ? RAILING_HEIGHT : wallHeight
    if (room.doors.indexOf(side) < 0) {
      return [piece(wall, 0, wall.length, height, height / 2, kind, side)]
    }
    var doorWidth = Math.min(MAX_DOOR_WIDTH, wall.length * DOOR_RATIO)
    var frameWidth = doorWidth + WALL_THICKNESS
    var segment = (wall.length - frameWidth) / 2
    var offset = (frameWidth + segment) / 2
    var doorHeight = doorHeightFor(height)
    var pieces = [
      piece(wall, -offset, segment, height, height / 2, kind, side),
      piece(wall, offset, segment, height, height / 2, kind, side),
      piece(
        wall,
        -doorWidth / 2,
        WALL_THICKNESS,
        doorHeight,
        doorHeight / 2,
        'post',
        side
      ),
      piece(
        wall,
        doorWidth / 2,
        WALL_THICKNESS,
        doorHeight,
        doorHeight / 2,
        'post',
        side
      ),
      piece(
        wall,
        0,
        frameWidth,
        WALL_THICKNESS,
        doorHeight + WALL_THICKNESS / 2,
        'lintel',
        side
      ),
    ]
    if (height >= WALK_WALL_HEIGHT) {
      var headerBottom = doorHeight + WALL_THICKNESS
      var headerHeight = height - headerBottom
      pieces.push(
        piece(
          wall,
          0,
          frameWidth,
          headerHeight,
          headerBottom + headerHeight / 2,
          'header',
          side
        )
      )
    }
    return pieces
  }

  function wallPieces(room, options) {
    var wallHeight = (options && options.wallHeight) || WALL_HEIGHT
    return SIDES.reduce(function (result, side) {
      return result.concat(sidePieces(room, side, wallHeight))
    }, [])
  }

  window.FloorplanGeometry = {
    WALL_HEIGHT: WALL_HEIGHT,
    WALK_WALL_HEIGHT: WALK_WALL_HEIGHT,
    WALL_THICKNESS: WALL_THICKNESS,
    wallPieces: wallPieces,
  }
})()
