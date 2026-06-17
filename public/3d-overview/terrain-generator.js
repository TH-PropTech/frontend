// ═══════════════════════════════════════════════════════════
// terrain-generator.js — Premium Landscape (Reference: Luxury Riverside Condo)
// ═══════════════════════════════════════════════════════════
;(function () {
  var M = window.MAT
  var G = window.GEO

  function getBox(w, h, d) {
    var k = 'b' + w + '_' + h + '_' + d
    if (!G[k]) G[k] = new THREE.BoxGeometry(w, h, d)
    return G[k]
  }
  function getCyl(r, h, seg) {
    seg = seg || 4
    var k = 'c' + r + '_' + h + '_' + seg
    if (!G[k]) G[k] = new THREE.CylinderGeometry(r, r, h, seg)
    return G[k]
  }

  // ── Tree (2 meshes, shared geo) ──
  var trunkGeo = new THREE.CylinderGeometry(0.04, 0.06, 0.7, 4)
  var leafGeo = new THREE.SphereGeometry(0.28, 5, 4)
  var leafMats = [M.foliage, M.foliageLt]

  function createTree(x, y, z, s) {
    s = s || 1
    var g = new THREE.Group()
    g.position.set(x, y, z)
    g.scale.set(s, s, s)

    var trunk = new THREE.Mesh(trunkGeo, M.trunk)
    trunk.position.y = 0.35
    trunk.castShadow = true
    g.add(trunk)

    var leaf = new THREE.Mesh(leafGeo, leafMats[Math.random() > 0.5 ? 0 : 1])
    leaf.position.y = 0.85
    leaf.castShadow = true
    g.add(leaf)

    return g
  }

  // ── Garden hedge ──
  function createHedge(x, z, w, d) {
    var g = new THREE.Mesh(getBox(w, 0.15, d), M.garden)
    g.position.set(x, 0.12, z)
    return g
  }

  // ── Lamp post ──
  function createLamp(x, z) {
    var g = new THREE.Group()
    g.position.set(x, 0, z)
    var pole = new THREE.Mesh(getCyl(0.02, 1.2, 4), M.lampPost)
    pole.position.y = 0.6
    g.add(pole)
    var light = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 4, 3),
      M.lampLight
    )
    light.position.y = 1.25
    g.add(light)
    return g
  }

  // ── Park bench ──
  function createBench(x, z, rot) {
    var g = new THREE.Group()
    g.position.set(x, 0, z)
    g.rotation.y = rot || 0
    var seat = new THREE.Mesh(getBox(0.6, 0.04, 0.2), M.bench)
    seat.position.y = 0.2
    g.add(seat)
    var back = new THREE.Mesh(getBox(0.6, 0.15, 0.02), M.bench)
    back.position.set(0, 0.3, -0.09)
    g.add(back)
    // Legs
    var legGeo = getBox(0.03, 0.2, 0.18)
    var l1 = new THREE.Mesh(legGeo, M.lampPost)
    l1.position.set(-0.25, 0.1, 0)
    g.add(l1)
    var l2 = new THREE.Mesh(legGeo, M.lampPost)
    l2.position.set(0.25, 0.1, 0)
    g.add(l2)
    return g
  }

  window.createLandscape = function (scene, buildings) {
    // ── 1. Ground ──
    var ground = new THREE.Mesh(getBox(200, 0.5, 200), M.ground)
    ground.position.y = -0.25
    ground.receiveShadow = true
    scene.add(ground)

    // Lawn patch (y=0.03, height=0.06 — top=0.06)
    var lawn = new THREE.Mesh(getBox(55, 0.06, 38), M.lawn)
    lawn.position.set(0, 0.03, -2)
    lawn.receiveShadow = true
    scene.add(lawn)

    // ── 2. Building plinths (y=0.10, height=0.20 — top=0.20)
    var plinthGeo = getBox(8, 0.2, 7)
    buildings.forEach(function (b) {
      var p = new THREE.Mesh(plinthGeo, M.sidewalk)
      p.position.set(b.pos.x, 0.1, b.pos.z)
      p.receiveShadow = true
      scene.add(p)
    })

    // ── 3. Roads ──
    // Horizontal roads (top=0.15) and Vertical roads (top=0.17) to prevent intersection z-fighting
    function addRoad(x1, z1, x2, z2, w, isVertical) {
      var isH = Math.abs(z1 - z2) < 0.01
      var len = isH ? Math.abs(x2 - x1) : Math.abs(z2 - z1)
      var rd = new THREE.Mesh(
        isH ? getBox(len, 0.1, w) : getBox(w, 0.1, len),
        M.road
      )
      // Vertical roads sit 0.02 units higher to avoid flickering at crossings
      var yPos = isVertical ? 0.12 : 0.1
      rd.position.set(isH ? (x1 + x2) / 2 : x1, yPos, isH ? z1 : (z1 + z2) / 2)
      rd.receiveShadow = true
      scene.add(rd)
    }
    addRoad(-40, -4, 40, -4, 2.0, false)
    addRoad(-30, 4, 35, 4, 1.5, false)
    addRoad(0, -20, 0, 4, 1.4, true)
    addRoad(-14, -4, -14, 6, 1.2, true)
    addRoad(22, -4, 22, 8, 1.2, true)

    // Sidewalks (y=0.08, height=0.08 — top=0.12)
    var swGeo = getBox(80, 0.08, 0.6)
    var sw1 = new THREE.Mesh(swGeo, M.sidewalk)
    sw1.position.set(0, 0.08, -2.7)
    scene.add(sw1)
    var sw2 = new THREE.Mesh(swGeo, M.sidewalk)
    sw2.position.set(0, 0.08, -5.3)
    scene.add(sw2)

    // ── 4. Shoreline / Promenade (Premium riverside) ──
    // Stone pier wall
    var pierM = new THREE.Mesh(getBox(60, 0.35, 0.8), M.pier)
    pierM.position.set(0, 0.175, 8)
    scene.add(pierM)

    // Wide promenade walkway (y=0.07, height=0.1 — top=0.12)
    var prom = new THREE.Mesh(getBox(60, 0.1, 3.0), M.sidewalk)
    prom.position.set(0, 0.07, 6.3)
    prom.receiveShadow = true
    scene.add(prom)

    // Promenade railing
    var promRail = new THREE.Mesh(getBox(60, 0.15, 0.03), M.railing)
    promRail.position.set(0, 0.2, 7.8)
    scene.add(promRail)

    // ── 5. River ──
    var river = new THREE.Mesh(getBox(120, 0.08, 45), M.water)
    river.position.set(0, 0.04, 32)
    scene.add(river)

    var deep = new THREE.Mesh(getBox(140, 0.06, 30), M.waterDeep)
    deep.position.set(0, 0.03, 50)
    scene.add(deep)

    // ── 6-7. Marina / Boats — REMOVED for GPU performance ──

    // ── 8. Luxury Resort Pool ──
    // Wood deck base
    var deck = new THREE.Mesh(getBox(15, 0.04, 7), M.pier)
    deck.position.set(7.5, 0.08, 3.5)
    scene.add(deck)

    // Pool border
    var poolBorder = new THREE.Mesh(getBox(12, 0.12, 4.5), M.poolEdge)
    poolBorder.position.set(7.5, 0.14, 3.5)
    scene.add(poolBorder)

    // Pool water
    var poolW = new THREE.Mesh(getBox(11.4, 0.06, 3.9), M.pool)
    poolW.position.set(7.5, 0.18, 3.5)
    scene.add(poolW)

    // Low-poly pool loungers
    for (var lx = 3.5; lx <= 11.5; lx += 2.0) {
      var lounger = new THREE.Mesh(getBox(0.4, 0.06, 0.85), M.boatWhite)
      lounger.position.set(lx, 0.18, 0.5) // align on the wood deck
      scene.add(lounger)
    }

    // ── 9. Villas — REMOVED for GPU performance ──

    // ── 10. Skyline — REMOVED for GPU performance ──

    // Far bank (city side)
    var farBank = new THREE.Mesh(getBox(80, 0.1, 8), M.groundDk)
    farBank.position.set(0, 0.08, 38)
    scene.add(farBank)

    // ── 11. Trees (minimal — only near M7) ──
    var trees = [
      [-3, 0.05, 3, 1.0],
      [3, 0.05, 3, 0.9],
      [-3, 0.05, -3, 0.9],
      [3, 0.05, -3, 0.8],
      [-4, 0.05, 5.5, 0.8],
      [0, 0.05, 5.8, 0.7],
      [4, 0.05, 5.5, 0.8],
      [0, 0.05, 37, 1.0],
    ]
    trees.forEach(function (t) {
      scene.add(createTree(t[0], t[1], t[2], t[3]))
    })

    // ── 12. Garden hedges (minimal) ──
    scene.add(createHedge(-5, 4.5, 3, 0.3))
    scene.add(createHedge(5, 4.5, 3, 0.3))

    // ── 13. Flower beds — REMOVED ──

    // ── 14. Lamp posts (minimal) ──
    ;[-4, 4].forEach(function (x) {
      scene.add(createLamp(x, 5.2))
    })
    ;[-6, 6].forEach(function (x) {
      scene.add(createLamp(x, -3.2))
    })

    // ── 15. Benches ──
    scene.add(createBench(0, 6, 0))
    scene.add(createBench(5, 6, 0))
  }
})()
