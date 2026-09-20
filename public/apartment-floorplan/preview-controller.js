;(function () {
  'use strict'

  function calculateBounds(template) {
    if (
      template &&
      typeof template.width === 'number' &&
      typeof template.depth === 'number' &&
      template.width > 0 &&
      template.depth > 0
    ) {
      var hw = template.width / 2
      var hd = template.depth / 2
      return {
        minX: -hw,
        maxX: hw,
        minZ: -hd,
        maxZ: hd,
        width: template.width,
        depth: template.depth,
        centerX: 0,
        centerZ: 0,
      }
    }

    var minX = Infinity
    var maxX = -Infinity
    var minZ = Infinity
    var maxZ = -Infinity

    var items = [].concat(
      (template && template.rooms) || [],
      (template && template.circulation) || []
    )

    items.forEach(function (item) {
      var w = item.width || 0
      var d = item.depth || 0
      minX = Math.min(minX, item.x - w / 2)
      maxX = Math.max(maxX, item.x + w / 2)
      minZ = Math.min(minZ, item.z - d / 2)
      maxZ = Math.max(maxZ, item.z + d / 2)
    })

    if (!Number.isFinite(minX) || minX === Infinity) {
      minX = -5
      maxX = 5
      minZ = -5
      maxZ = 5
    }

    return {
      minX: minX,
      maxX: maxX,
      minZ: minZ,
      maxZ: maxZ,
      width: maxX - minX,
      depth: maxZ - minZ,
      centerX: (minX + maxX) / 2,
      centerZ: (minZ + maxZ) / 2,
    }
  }

  function createAvatarMesh() {
    var group = new THREE.Group()

    // Body (torso) - Earthy cream
    var bodyGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.36, 16)
    var bodyMat = new THREE.MeshLambertMaterial({ color: 0xf5ede4 })
    var body = new THREE.Mesh(bodyGeom, bodyMat)
    body.position.y = 0.22
    group.add(body)

    // Head
    var headGeom = new THREE.SphereGeometry(0.14, 16, 16)
    var head = new THREE.Mesh(headGeom, bodyMat)
    head.position.y = 0.48
    group.add(head)

    // Visor - Earthy terracotta primary (#c65a3a)
    var visorGeom = new THREE.BoxGeometry(0.16, 0.05, 0.07)
    var visorMat = new THREE.MeshBasicMaterial({ color: 0xc65a3a })
    var visor = new THREE.Mesh(visorGeom, visorMat)
    visor.position.set(0, 0.48, 0.11)
    group.add(visor)

    // Hover ring at bottom - soft terracotta glow (#e88a6d)
    var ringGeom = new THREE.RingGeometry(0.14, 0.2, 16)
    ringGeom.rotateX(-Math.PI / 2)
    var ringMat = new THREE.MeshBasicMaterial({
      color: 0xe88a6d,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    })
    var ring = new THREE.Mesh(ringGeom, ringMat)
    ring.position.y = 0.02
    group.add(ring)

    // Floating hands - Muted warm stone (#756960)
    var handGeom = new THREE.SphereGeometry(0.045, 8, 8)
    var handMat = new THREE.MeshLambertMaterial({ color: 0x756960 })
    var handL = new THREE.Mesh(handGeom, handMat)
    handL.position.set(-0.25, 0.24, 0)
    group.add(handL)

    var handR = new THREE.Mesh(handGeom, handMat)
    handR.position.set(0.25, 0.24, 0)
    group.add(handR)

    group.userData.hoverRing = ring
    group.userData.initialY = 0.1
    return group
  }

  function createPlatformMesh(bounds) {
    var margin = Math.max(3, Math.max(bounds.width, bounds.depth) * 0.18)
    var pWidth = bounds.width + margin * 2
    var pDepth = bounds.depth + margin * 2
    var geom = new THREE.PlaneGeometry(pWidth, pDepth)
    geom.rotateX(-Math.PI / 2)

    var mat = new THREE.MeshLambertMaterial({
      color: 0xeee8df,
      side: THREE.DoubleSide,
    })
    var platform = new THREE.Mesh(geom, mat)
    platform.position.set(bounds.centerX, -0.02, bounds.centerZ)
    return platform
  }

  function create(options) {
    var scene = options.scene
    var active = false
    var elapsedTime = 0
    var previewGroup = new THREE.Group()
    previewGroup.name = 'previewGroup'
    scene.add(previewGroup)

    var platform = null
    var avatar = null
    var currentBounds = null

    function enter(template) {
      active = true
      elapsedTime = 0
      previewGroup.clear()

      currentBounds = calculateBounds(template)
      platform = createPlatformMesh(currentBounds)
      previewGroup.add(platform)

      avatar = createAvatarMesh()
      // Position bot at the front entrance edge of the apartment
      var botX = currentBounds.centerX
      var botZ = currentBounds.maxZ + 1.2
      avatar.position.set(botX, avatar.userData.initialY, botZ)
      // Face inward toward the apartment
      avatar.rotation.y = Math.PI
      previewGroup.add(avatar)

      previewGroup.visible = true
    }

    function exit() {
      active = false
      previewGroup.visible = false
    }

    function update(deltaTime) {
      if (!active || !avatar) return
      elapsedTime += deltaTime || 0.016
      // Gentle hovering animation
      avatar.position.y =
        avatar.userData.initialY + Math.sin(elapsedTime * 2.6) * 0.035
      if (avatar.userData.hoverRing) {
        avatar.userData.hoverRing.rotation.z += 0.03
      }
    }

    function pause() {
      // Pause animations if needed
    }

    function reset() {
      if (avatar && currentBounds) {
        avatar.position.set(
          currentBounds.centerX,
          avatar.userData.initialY,
          currentBounds.maxZ + 1.2
        )
        avatar.rotation.y = Math.PI
      }
    }

    function dispose() {
      exit()
      if (previewGroup) {
        previewGroup.traverse(function (obj) {
          if (obj.geometry) obj.geometry.dispose()
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach(function (m) {
                m.dispose()
              })
            } else {
              obj.material.dispose()
            }
          }
        })
        scene.remove(previewGroup)
      }
    }

    return {
      enter: enter,
      exit: exit,
      update: update,
      pause: pause,
      reset: reset,
      isActive: function () {
        return active
      },
      getGroup: function () {
        return previewGroup
      },
      getBounds: function () {
        return currentBounds
      },
      dispose: dispose,
    }
  }

  window.FloorplanPreview = {
    create: create,
    createAvatarMesh: createAvatarMesh,
    createPlatformMesh: createPlatformMesh,
    calculateBounds: calculateBounds,
  }
})()
