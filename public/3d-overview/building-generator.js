// ═══════════════════════════════════════════════════════════
// building-generator.js — Premium Detailed Building (Reference: Luxury Riverside Condo)
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

  // Add trees and plants to terraces
  function createLushTree(g, x, y, z, scale) {
    scale = scale || 1.0
    var trunkH = 0.25 * scale
    var trunk = new THREE.Mesh(getCyl(0.02 * scale, trunkH, 5), M.trunk)
    trunk.position.set(x, y + trunkH / 2, z)
    g.add(trunk)

    var crownGeo = getBox(0.24 * scale, 0.24 * scale, 0.24 * scale)
    var crown = new THREE.Mesh(crownGeo, M.treeCrown)
    crown.position.set(x, y + trunkH + 0.1 * scale, z)
    g.add(crown)

    var crown2 = new THREE.Mesh(
      getBox(0.18 * scale, 0.18 * scale, 0.18 * scale),
      M.foliageLt
    )
    crown2.position.set(
      x + 0.04 * scale,
      y + trunkH + 0.2 * scale,
      z - 0.04 * scale
    )
    g.add(crown2)
  }

  // ── Add interior details to one wing of a floor ──
  function addInterior(fG, offX, wing, cH, ST, isLobby) {
    var tW = 2.0,
      tD = 2.8
    var wH = cH - ST - 0.04
    var wY = ST + wH / 2 + 0.02

    // 1. Elevator shaft
    var coreW = 0.5,
      coreD = 0.7
    var coreX = offX + wing * -0.4
    var core = new THREE.Mesh(getBox(coreW, wH, coreD), M.elevator)
    core.position.set(coreX, wY, 0)
    fG.add(core)

    // 2. Elevator doors
    var doorW = 0.09
    var doorH = wH * 0.78
    var doorY = ST + doorH * 0.5
    var doorZ = coreD / 2 + 0.01
    var doorL = new THREE.Mesh(getBox(doorW, doorH, 0.01), M.elevDoor)
    doorL.position.set(coreX - doorW * 0.55, doorY, doorZ)
    fG.add(doorL)
    var doorR = new THREE.Mesh(getBox(doorW, doorH, 0.01), M.elevDoor)
    doorR.position.set(coreX + doorW * 0.55, doorY, doorZ)
    fG.add(doorR)

    // 3. Button panel
    var btn = new THREE.Mesh(getBox(0.03, 0.08, 0.02), M.elevBtn)
    btn.position.set(coreX + coreW / 2 + 0.03, ST + wH * 0.45, doorZ)
    fG.add(btn)

    // 4. Apartment divider wall
    var divWall = new THREE.Mesh(getBox(tW - 0.6, wH * 0.7, 0.04), M.wallDiv)
    divWall.position.set(offX + wing * 0.2, ST + wH * 0.35, 0)
    fG.add(divWall)

    // 5. Interior floor plate (wood)
    var floorPlate = new THREE.Mesh(
      getBox(tW - 0.2, 0.01, tD - 0.2),
      M.bedFloor
    )
    floorPlate.position.set(offX, ST + 0.005, 0)
    fG.add(floorPlate)

    // Lobby extras
    if (isLobby) {
      var deskBase = new THREE.Mesh(getBox(0.8, 0.25, 0.25), M.reception)
      deskBase.position.set(offX, ST + 0.125, tD / 2 - 0.5)
      fG.add(deskBase)
      var deskTop = new THREE.Mesh(getBox(0.84, 0.02, 0.28), M.lobbyMarble)
      deskTop.position.set(offX, ST + 0.26, tD / 2 - 0.5)
      fG.add(deskTop)

      var lobbyFloor = new THREE.Mesh(
        getBox(tW - 0.1, 0.025, tD - 0.1),
        M.lobbyMarble
      )
      lobbyFloor.position.set(offX, ST + 0.013, 0)
      fG.add(lobbyFloor)

      var colH2 = wH * 0.9
      var pillar1 = new THREE.Mesh(getCyl(0.06, colH2, 6), M.concDark)
      pillar1.position.set(offX - tW / 3, ST + colH2 / 2, tD / 2 - 0.1)
      fG.add(pillar1)
      var pillar2 = new THREE.Mesh(getCyl(0.06, colH2, 6), M.concDark)
      pillar2.position.set(offX + tW / 3, ST + colH2 / 2, tD / 2 - 0.1)
      fG.add(pillar2)
    }
  }

  // ── Main Tower (Twin-tower with luxury terraced design for M7) ──
  window.createDetailedBuilding = function (floors, isDetailed, id) {
    floors = floors || 20
    id = id || 'B'

    var FH = 0.9,
      LH = 1.3,
      ST = 0.08
    var towerW = 2.0,
      towerD = 2.8,
      gap = 0.8
    var totalW = towerW * 2 + gap
    var bGroup = new THREE.Group()
    bGroup.name = 'Building_' + id
    var fList = []

    var colGeo = getBox(0.12, 1, 0.12)
    var mullGeo = getBox(0.02, 1, 0.04)

    // If NOT detailed, build standard twin towers (performance/original styling for M8/M9/M10)
    if (!isDetailed) {
      var bandGeo = getBox(towerW + 0.04, 0.06, towerD + 0.04)
      for (var i = 1; i <= floors; i++) {
        var fG = new THREE.Group()
        fG.name = 'Floor_' + i
        var isL = i === 1
        var cH = isL ? LH : FH
        var pY = isL ? 0 : LH + (i - 2) * FH
        fG.position.y = pY

        var gMat = M.glass.clone()
        var gMeshes = []
        var colH = cH - ST
        var gH = colH - 0.04,
          gY = ST + colH / 2

        for (var wing = -1; wing <= 1; wing += 2) {
          var offX = wing * (towerW / 2 + gap / 2)

          var slab = new THREE.Mesh(getBox(towerW, ST, towerD), M.slab)
          slab.position.set(offX, ST / 2, 0)
          slab.castShadow = true
          slab.receiveShadow = true
          fG.add(slab)

          var ceil = new THREE.Mesh(getBox(towerW, ST * 0.5, towerD), M.slab)
          ceil.position.set(offX, cH - ST * 0.25, 0)
          fG.add(ceil)

          var cx = [offX - towerW / 2 + 0.06, offX + towerW / 2 - 0.06]
          var cz = [towerD / 2 - 0.06, -towerD / 2 + 0.06]
          for (var ci = 0; ci < 2; ci++) {
            for (var cj = 0; cj < 2; cj++) {
              var col = new THREE.Mesh(colGeo, M.concrete)
              col.position.set(cx[ci], ST + colH / 2, cz[cj])
              col.scale.y = colH
              fG.add(col)
            }
          }

          var gFront = new THREE.Mesh(getBox(towerW - 0.24, gH, 0.03), gMat)
          gFront.position.set(offX, gY, towerD / 2 - 0.03)
          fG.add(gFront)
          gMeshes.push(gFront)

          var gBack = new THREE.Mesh(getBox(towerW - 0.24, gH, 0.03), gMat)
          gBack.position.set(offX, gY, -towerD / 2 + 0.03)
          fG.add(gBack)
          gMeshes.push(gBack)

          var gSide = new THREE.Mesh(getBox(0.03, gH, towerD - 0.24), gMat)
          gSide.position.set(offX + wing * (towerW / 2 - 0.03), gY, 0)
          fG.add(gSide)
          gMeshes.push(gSide)

          var band = new THREE.Mesh(bandGeo, M.concrete)
          band.position.set(offX, cH - 0.03, 0)
          fG.add(band)

          if (i > 1 && i % 2 === 0) {
            var bSlab = new THREE.Mesh(
              getBox(towerW * 0.5, 0.04, 0.4),
              M.balcFloor
            )
            bSlab.position.set(offX, ST + 0.02, towerD / 2 + 0.2)
            fG.add(bSlab)
            var green = new THREE.Mesh(
              getBox(towerW * 0.44, 0.15, 0.18),
              M.foliage
            )
            green.position.set(offX, ST + 0.11, towerD / 2 + 0.32)
            fG.add(green)
            var rail = new THREE.Mesh(
              getBox(towerW * 0.5, 0.25, 0.02),
              M.glassDark
            )
            rail.position.set(offX, ST + 0.14, towerD / 2 + 0.39)
            fG.add(rail)
          }
        }

        if (i > 1 && (i % 3 === 0 || i === floors)) {
          var br = new THREE.Mesh(
            getBox(gap + 0.2, cH * 0.5, towerD * 0.4),
            M.concrete
          )
          br.position.set(0, ST + cH * 0.25, 0)
          fG.add(br)
          var brG = new THREE.Mesh(getBox(gap + 0.18, cH * 0.4, 0.03), gMat)
          brG.position.set(0, ST + cH * 0.2, towerD * 0.2)
          fG.add(brG)
          gMeshes.push(brG)
        }

        bGroup.add(fG)
        fList.push({
          floorNum: i,
          group: fG,
          glassMeshes: gMeshes,
          outlineLines: [],
        })
      }

      // Simple Roof
      var roofY = LH + (floors - 1) * FH
      var pG = new THREE.Group()
      pG.position.y = roofY + ST
      var roofSlab = new THREE.Mesh(
        getBox(totalW + 0.2, 0.1, towerD + 0.2),
        M.slab
      )
      pG.add(roofSlab)
      var mech = new THREE.Mesh(
        getBox(totalW * 0.35, 0.5, towerD * 0.35),
        M.concrete
      )
      mech.position.y = 0.35
      pG.add(mech)
      bGroup.add(pG)

      var totalH = roofY + ST + 0.9
      var hitbox = new THREE.Mesh(
        getBox(totalW + 1, totalH, towerD + 1),
        new THREE.MeshBasicMaterial({ visible: false })
      )
      hitbox.position.y = totalH / 2
      hitbox.userData = { buildingId: id }
      bGroup.add(hitbox)
      bGroup.userData = {
        id: id,
        floors: floors,
        floorList: fList,
        hitbox: hitbox,
      }
      return bGroup
    }

    // ── DETAILED M7 (1:1 Replica of Q2 Thao Dien / Serenity style Luxury Condo) ──
    var leftX = -1.4
    var rightX = 1.4

    // Tree helper to add light, low-poly garden trees
    function addGardenTree(parent, tx, ty, tz) {
      var trunk = new THREE.Mesh(getCyl(0.02, 0.32, 4), M.trunk)
      trunk.position.set(tx, ty + 0.16, tz)
      parent.add(trunk)
      var leaf = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 4, 3),
        Math.random() > 0.5 ? M.foliageDense : M.foliageMid
      )
      leaf.position.set(tx, ty + 0.38, tz)
      parent.add(leaf)
    }

    for (var i = 1; i <= floors; i++) {
      var fG = new THREE.Group()
      fG.name = 'Floor_' + i
      var isL = i === 1
      var cH = isL ? LH : FH
      var pY = isL ? 0 : LH + (i - 2) * FH
      fG.position.y = pY

      var gMat = M.glass.clone()
      var gMeshes = []
      var colH = cH - ST
      var gH = colH - 0.04,
        gY = ST + colH / 2

      var lW = towerW,
        rW = towerW

      // 1. PODIUM (Floors 1-3) — Continuous commercial storefront
      if (i <= 3) {
        var podW = 7.8 // spans from left extension to right extension
        var podD = towerD + 0.6 // extra front/back depth for retail feel

        // Floor slab
        var pSlab = new THREE.Mesh(getBox(podW, ST, podD), M.podiumConc)
        pSlab.position.set(0, ST / 2, 0)
        fG.add(pSlab)

        // Ceiling slab
        var pCeil = new THREE.Mesh(getBox(podW, ST, podD), M.podiumConc)
        pCeil.position.set(0, cH - ST / 2, 0)
        fG.add(pCeil)

        // Glass storefront
        var storeG = new THREE.Mesh(
          getBox(podW - 0.1, cH - ST * 2, podD - 0.1),
          M.glassDark
        )
        storeG.position.set(0, cH / 2, 0)
        fG.add(storeG)
        gMeshes.push(storeG)

        // Commercial columns
        var colXs = [-3.6, -2.4, -1.2, -0.4, 0.4, 1.2, 2.4, 3.6]
        colXs.forEach(function (cx) {
          var colF = new THREE.Mesh(getCyl(0.08, colH, 8), M.podiumConcDk)
          colF.position.set(cx, gY, podD / 2 - 0.1)
          fG.add(colF)

          var colB = new THREE.Mesh(getCyl(0.08, colH, 8), M.podiumConcDk)
          colB.position.set(cx, gY, -podD / 2 + 0.1)
          fG.add(colB)
        })

        // Arched Canopy Entrance (Floor 1)
        if (i === 1) {
          var canopy = new THREE.Mesh(getBox(2.2, 0.04, 1.2), M.canopyGlass)
          canopy.position.set(0, colH - 0.1, podD / 2 + 0.4)
          fG.add(canopy)
          var arch = new THREE.Mesh(getBox(2.3, 0.35, 0.08), M.archFrame)
          arch.position.set(0, colH / 2, podD / 2 + 0.95)
          fG.add(arch)
        }

        // Podium roof gardens (visible above floor 3)
        if (i === 3) {
          // Left podium terrace
          var lDeck = new THREE.Mesh(
            getBox(1.4, 0.02, podD - 0.1),
            M.terraceFloor
          )
          lDeck.position.set(-3.1, cH + 0.01, 0)
          fG.add(lDeck)
          addGardenTree(fG, -3.1, cH, 0.4)
          addGardenTree(fG, -3.1, cH, -0.4)

          // Right podium terrace
          var rDeck = new THREE.Mesh(
            getBox(1.4, 0.02, podD - 0.1),
            M.terraceFloor
          )
          rDeck.position.set(3.1, cH + 0.01, 0)
          fG.add(rDeck)
          addGardenTree(fG, 3.1, cH, 0.4)
          addGardenTree(fG, 3.1, cH, -0.4)
        }
      }
      // 2. TOWERS & STEPPED VILLA TERRACES (Floors 4+)
      else {
        // ─── LEFT TOWER (Taller tower, X = -1.4) ───
        var ltG = new THREE.Group()

        // Main tower slab
        var lSlab = new THREE.Mesh(getBox(lW, ST, towerD), M.slab)
        lSlab.position.set(leftX, ST / 2, 0)
        ltG.add(lSlab)
        var lCeil = new THREE.Mesh(getBox(lW, ST, towerD), M.slab)
        lCeil.position.set(leftX, cH - ST / 2, 0)
        ltG.add(lCeil)

        // Glass walls
        var lgF = new THREE.Mesh(getBox(lW - 0.12, gH, 0.03), gMat)
        lgF.position.set(leftX, gY, towerD / 2 - 0.02)
        ltG.add(lgF)
        gMeshes.push(lgF)
        var lgB = new THREE.Mesh(getBox(lW - 0.12, gH, 0.03), gMat)
        lgB.position.set(leftX, gY, -towerD / 2 + 0.02)
        ltG.add(lgB)
        gMeshes.push(lgB)
        var lgS_O = new THREE.Mesh(getBox(0.03, gH, towerD - 0.12), gMat)
        lgS_O.position.set(leftX - lW / 2 + 0.02, gY, 0)
        ltG.add(lgS_O)
        gMeshes.push(lgS_O)
        var lgS_I = new THREE.Mesh(getBox(0.03, gH, towerD - 0.12), gMat)
        lgS_I.position.set(leftX + lW / 2 - 0.02, gY, 0)
        ltG.add(lgS_I)
        gMeshes.push(lgS_I)

        // Concrete corner columns
        var lCols = [
          [leftX - lW / 2 + 0.06, towerD / 2 - 0.06],
          [leftX + lW / 2 - 0.06, towerD / 2 - 0.06],
          [leftX - lW / 2 + 0.06, -towerD / 2 + 0.06],
          [leftX + lW / 2 - 0.06, -towerD / 2 + 0.06],
        ]
        lCols.forEach(function (pos) {
          var col = new THREE.Mesh(colGeo, M.concrete)
          col.position.set(pos[0], gY, pos[1])
          ltG.add(col)
        })

        // Vertical accent fins
        var finGeo = getBox(0.04, cH, 0.06)
        var lFin1 = new THREE.Mesh(finGeo, M.concrete)
        lFin1.position.set(leftX - lW / 4, cH / 2, towerD / 2 + 0.01)
        ltG.add(lFin1)
        var lFin2 = new THREE.Mesh(finGeo, M.concrete)
        lFin2.position.set(leftX + lW / 4, cH / 2, towerD / 2 + 0.01)
        ltG.add(lFin2)

        // Balcony
        var lBalcW = lW * 0.65
        var lbSlabF = new THREE.Mesh(getBox(lBalcW, 0.03, 0.35), M.balcFloor)
        lbSlabF.position.set(leftX, ST + 0.015, towerD / 2 + 0.17)
        ltG.add(lbSlabF)
        var lbGreenPl = new THREE.Mesh(
          getBox(lBalcW * 0.9, 0.1, 0.16),
          M.hangingGreen
        )
        lbGreenPl.position.set(leftX, ST + 0.07, towerD / 2 + 0.22)
        ltG.add(lbGreenPl)
        var lbRailF = new THREE.Mesh(getBox(lBalcW, 0.22, 0.01), M.glassDark)
        lbRailF.position.set(leftX, ST + 0.12, towerD / 2 + 0.34)
        ltG.add(lbRailF)

        // ── Left Stepped Block (Floors 4-7) ──
        if (i <= 7) {
          var extW = 1.4
          var extX = leftX - lW / 2 - extW / 2 // -3.1
          var extSlab = new THREE.Mesh(getBox(extW, ST, towerD), M.slab)
          extSlab.position.set(extX, ST / 2, 0)
          ltG.add(extSlab)
          var extCeil = new THREE.Mesh(getBox(extW, ST, towerD), M.slab)
          extCeil.position.set(extX, cH - ST / 2, 0)
          ltG.add(extCeil)

          var extGlass = new THREE.Mesh(
            getBox(extW - 0.08, gH, towerD - 0.08),
            M.glassDark
          )
          extGlass.position.set(extX, gY, 0)
          ltG.add(extGlass)
          gMeshes.push(extGlass)

          // Private pool and villa deck on floor 7 roof
          if (i === 7) {
            var tDeck = new THREE.Mesh(
              getBox(extW - 0.04, 0.02, towerD - 0.04),
              M.terraceFloor
            )
            tDeck.position.set(extX, cH + 0.01, 0)
            ltG.add(tDeck)

            var tPool = new THREE.Mesh(
              getBox(extW * 0.65, 0.06, towerD * 0.55),
              M.pool
            )
            tPool.position.set(extX - 0.1, cH + 0.04, 0.3)
            ltG.add(tPool)

            addGardenTree(ltG, extX + 0.35, cH, -0.6)

            var tRail = new THREE.Mesh(getBox(extW, 0.3, 0.02), M.glassDark)
            tRail.position.set(extX, cH + 0.15, towerD / 2 - 0.02)
            ltG.add(tRail)
          }
        }

        fG.add(ltG)

        // ─── RIGHT TOWER (Organic terraced tower, X = 1.4) ───
        var rtG = new THREE.Group()

        // Main tower slab
        var rSlab = new THREE.Mesh(getBox(rW, ST, towerD), M.slab)
        rSlab.position.set(rightX, ST / 2, 0)
        rtG.add(rSlab)
        var rCeil = new THREE.Mesh(getBox(rW, ST, towerD), M.slab)
        rCeil.position.set(rightX, cH - ST / 2, 0)
        rtG.add(rCeil)

        // Glass walls
        var rgF = new THREE.Mesh(getBox(rW - 0.12, gH, 0.03), gMat)
        rgF.position.set(rightX, gY, towerD / 2 - 0.02)
        rtG.add(rgF)
        gMeshes.push(rgF)
        var rgB = new THREE.Mesh(getBox(rW - 0.12, gH, 0.03), gMat)
        rgB.position.set(rightX, gY, -towerD / 2 + 0.02)
        rtG.add(rgB)
        gMeshes.push(rgB)
        var rgS_O = new THREE.Mesh(getBox(0.03, gH, towerD - 0.12), gMat)
        rgS_O.position.set(rightX + rW / 2 - 0.02, gY, 0)
        rtG.add(rgS_O)
        gMeshes.push(rgS_O)
        var rgS_I = new THREE.Mesh(getBox(0.03, gH, towerD - 0.12), gMat)
        rgS_I.position.set(rightX - rW / 2 + 0.02, gY, 0)
        rtG.add(rgS_I)
        gMeshes.push(rgS_I)

        // Concrete corner columns
        var rCols = [
          [rightX - rW / 2 + 0.06, towerD / 2 - 0.06],
          [rightX + rW / 2 - 0.06, towerD / 2 - 0.06],
          [rightX - rW / 2 + 0.06, -towerD / 2 + 0.06],
          [rightX + rW / 2 - 0.06, -towerD / 2 + 0.06],
        ]
        rCols.forEach(function (pos) {
          var col = new THREE.Mesh(colGeo, M.concrete)
          col.position.set(pos[0], gY, pos[1])
          rtG.add(col)
        })

        // Vertical accent fins
        var rFin1 = new THREE.Mesh(finGeo, M.concrete)
        rFin1.position.set(rightX - rW / 4, cH / 2, towerD / 2 + 0.01)
        rtG.add(rFin1)
        var rFin2 = new THREE.Mesh(finGeo, M.concrete)
        rFin2.position.set(rightX + rW / 4, cH / 2, towerD / 2 + 0.01)
        rtG.add(rFin2)

        // Balcony
        var rBalcW = rW * 0.65
        var rbSlabF = new THREE.Mesh(getBox(rBalcW, 0.03, 0.35), M.balcFloor)
        rbSlabF.position.set(rightX, ST + 0.015, towerD / 2 + 0.17)
        rtG.add(rbSlabF)
        var rbGreenPl = new THREE.Mesh(
          getBox(rBalcW * 0.9, 0.1, 0.16),
          M.hangingGreen
        )
        rbGreenPl.position.set(rightX, ST + 0.07, towerD / 2 + 0.22)
        rtG.add(rbGreenPl)
        var rbRailF = new THREE.Mesh(getBox(rBalcW, 0.22, 0.01), M.glassDark)
        rbRailF.position.set(rightX, ST + 0.12, towerD / 2 + 0.34)
        rtG.add(rbRailF)

        // ── Right Staggered Cantilever Gardens (Stepped terraces on the right) ──
        var extW = 0
        var isTerraceRoof = false

        if (i <= 7) {
          extW = 1.4
          isTerraceRoof = i === 7
        } else if (i <= 11) {
          extW = 1.0
          isTerraceRoof = i === 11
        } else if (i <= 15) {
          extW = 0.7
          isTerraceRoof = i === 15
        } else if (i <= 18) {
          extW = 0.4
          isTerraceRoof = i === 18
        }

        if (extW > 0) {
          var extX = rightX + rW / 2 + extW / 2
          var extSlab = new THREE.Mesh(getBox(extW, ST, towerD), M.slab)
          extSlab.position.set(extX, ST / 2, 0)
          rtG.add(extSlab)
          var extCeil = new THREE.Mesh(getBox(extW, ST, towerD), M.slab)
          extCeil.position.set(extX, cH - ST / 2, 0)
          rtG.add(extCeil)

          var extGlass = new THREE.Mesh(
            getBox(extW - 0.08, gH, towerD - 0.08),
            M.glassDark
          )
          extGlass.position.set(extX, gY, 0)
          rtG.add(extGlass)
          gMeshes.push(extGlass)

          if (isTerraceRoof) {
            var tLawn = new THREE.Mesh(
              getBox(extW - 0.04, 0.02, towerD - 0.04),
              M.lawn
            )
            tLawn.position.set(extX, cH + 0.01, 0)
            rtG.add(tLawn)

            var hedge = new THREE.Mesh(
              getBox(extW - 0.08, 0.15, 0.3),
              M.foliageDense
            )
            hedge.position.set(extX, cH + 0.075, towerD / 2 - 0.25)
            rtG.add(hedge)

            addGardenTree(rtG, extX, cH, 0.5)
            addGardenTree(rtG, extX, cH, -0.5)

            var tRail = new THREE.Mesh(getBox(extW, 0.3, 0.02), M.glassDark)
            tRail.position.set(extX, cH + 0.15, towerD / 2 - 0.02)
            rtG.add(tRail)
          }
        }

        fG.add(rtG)
      }

      // Skybridge connecting left and right towers (at floors 6, 12, 17, 21)
      if (i > 4 && (i === 6 || i === 12 || i === 17 || i === 21)) {
        var brW = gap
        var brX = 0
        var brD = towerD * 0.4

        var bridge = new THREE.Mesh(getBox(brW + 0.1, 0.08, brD), M.concrete)
        bridge.position.set(brX, ST + 0.04, 0)
        fG.add(bridge)

        var brCover = new THREE.Mesh(
          getBox(brW - 0.02, cH - ST * 2, brD - 0.04),
          M.glassDark
        )
        brCover.position.set(brX, cH / 2, 0)
        fG.add(brCover)
        gMeshes.push(brCover)

        var brCeil = new THREE.Mesh(getBox(brW + 0.1, 0.04, brD), M.concrete)
        brCeil.position.set(brX, cH - 0.02, 0)
        fG.add(brCeil)

        var brPl = new THREE.Mesh(getBox(brW - 0.1, 0.12, 0.2), M.foliageMid)
        brPl.position.set(brX, cH + 0.06, brD / 2 - 0.1)
        fG.add(brPl)
      }

      bGroup.add(fG)
      fList.push({
        floorNum: i,
        group: fG,
        glassMeshes: gMeshes,
        outlineLines: [],
      })
    }

    // ── Roof — Stepped Crowns ──
    var roofY = LH + (floors - 1) * FH

    // Left Tower Roof
    var lRoofG = new THREE.Group()
    lRoofG.position.set(0, roofY + ST, 0)
    var lRoofSlab = new THREE.Mesh(
      getBox(towerW + 0.1, 0.08, towerD + 0.1),
      M.slab
    )
    lRoofSlab.position.set(leftX, 0.04, 0)
    lRoofG.add(lRoofSlab)
    // Crown frame
    var lfL = new THREE.Mesh(getBox(0.08, 0.7, 0.15), M.concrete)
    lfL.position.set(leftX - towerW / 2 + 0.05, 0.4, towerD / 2 - 0.1)
    lRoofG.add(lfL)
    var lfR = new THREE.Mesh(getBox(0.08, 0.7, 0.15), M.concrete)
    lfR.position.set(leftX + towerW / 2 - 0.05, 0.4, towerD / 2 - 0.1)
    lRoofG.add(lfR)
    var lfBeam = new THREE.Mesh(getBox(towerW + 0.1, 0.06, 0.15), M.concrete)
    lfBeam.position.set(leftX, 0.78, towerD / 2 - 0.1)
    lRoofG.add(lfBeam)
    // Antenna
    var antenna = new THREE.Mesh(getCyl(0.015, 1.0, 4), M.railing)
    antenna.position.set(leftX, 0.55, 0)
    lRoofG.add(antenna)
    bGroup.add(lRoofG)

    // Right Tower Roof
    var rRoofG = new THREE.Group()
    rRoofG.position.set(0, roofY + ST, 0)
    var rRoofSlab = new THREE.Mesh(
      getBox(towerW + 0.1, 0.08, towerD + 0.1),
      M.slab
    )
    rRoofSlab.position.set(rightX, 0.04, 0)
    rRoofG.add(rRoofSlab)
    var rfL = new THREE.Mesh(getBox(0.08, 0.7, 0.15), M.concrete)
    rfL.position.set(rightX - towerW / 2 + 0.05, 0.4, towerD / 2 - 0.1)
    rRoofG.add(rfL)
    var rfR = new THREE.Mesh(getBox(0.08, 0.7, 0.15), M.concrete)
    rfR.position.set(rightX + towerW / 2 - 0.05, 0.4, towerD / 2 - 0.1)
    rRoofG.add(rfR)
    var rfBeam = new THREE.Mesh(getBox(towerW + 0.1, 0.06, 0.15), M.concrete)
    rfBeam.position.set(rightX, 0.78, towerD / 2 - 0.1)
    rRoofG.add(rfBeam)
    bGroup.add(rRoofG)

    // ── Grand Podium Stairs (Walkable!) ──
    var stairGroup = new THREE.Group()
    stairGroup.name = 'Podium_Stairs'
    var steps = 20
    var stepH = 3.1 / steps
    var stepD = 4.0 / steps
    var stepW = 0.6
    var startZ = 2.0
    var stairX = -4.2 // side of podium X range -3.9 to 3.9

    for (var step = 0; step < steps; step++) {
      var stepGeom = getBox(stepW, stepH * (step + 1), stepD)
      var stepMesh = new THREE.Mesh(stepGeom, M.concrete)
      var stepYPos = (stepH * (step + 1)) / 2
      var stepZPos = startZ - step * stepD - stepD / 2
      stepMesh.position.set(stairX, stepYPos, stepZPos)
      stepMesh.castShadow = true
      stepMesh.receiveShadow = true
      stairGroup.add(stepMesh)
    }

    // Add simple handrails
    var railL = new THREE.Mesh(getBox(0.02, 0.8, 4.3), M.concrete)
    railL.position.set(stairX - stepW / 2 - 0.02, 3.1 / 2 + 0.4, 0)
    railL.rotation.x = Math.atan2(3.1, 4.0)
    stairGroup.add(railL)
    var railR = new THREE.Mesh(getBox(0.02, 0.8, 4.3), M.concrete)
    railR.position.set(stairX + stepW / 2 + 0.02, 3.1 / 2 + 0.4, 0)
    railR.rotation.x = Math.atan2(3.1, 4.0)
    stairGroup.add(railR)
    bGroup.add(stairGroup)

    // ── Terrace Stairs (Walkable from Podium Roof to Floor 7 Pool Terrace) ──
    var terraceStairs = new THREE.Group()
    terraceStairs.name = 'Terrace_Stairs'
    var tSteps = 18
    var tStepH = 3.6 / tSteps
    var tStepD = 3.0 / tSteps
    var tStepW = 0.5
    var tStartZ = -1.5
    var tStartY = 3.1
    var tStairX = -3.1

    for (var step = 0; step < tSteps; step++) {
      var stepGeom = getBox(tStepW, tStepH * (step + 1), tStepD)
      var stepMesh = new THREE.Mesh(stepGeom, M.concrete)
      var stepYPos = tStartY + (tStepH * (step + 1)) / 2
      var stepZPos = tStartZ + step * tStepD + tStepD / 2
      stepMesh.position.set(tStairX, stepYPos, stepZPos)
      stepMesh.castShadow = true
      stepMesh.receiveShadow = true
      terraceStairs.add(stepMesh)
    }
    bGroup.add(terraceStairs)

    // ── Signage ──
    var sign = new THREE.Mesh(getBox(1.6, 0.28, 0.02), M.signage)
    sign.position.set(0, LH * 1.5, towerD / 2 + 0.5)
    bGroup.add(sign)

    // ── Hitbox (covers full layout) ──
    var totalH = roofY + ST + 1.0
    var hitbox = new THREE.Mesh(
      getBox(8.5, totalH, towerD + 1.5),
      new THREE.MeshBasicMaterial({ visible: false })
    )
    hitbox.position.y = totalH / 2
    hitbox.userData.buildingId = id
    bGroup.add(hitbox)

    return { buildingGroup: bGroup, floorList: fList, hitbox: hitbox }
  }

  // ── Villa (simplified) ──
  window.createVilla = function (w, d, h, roofType, mat) {
    mat = mat || M.villaWall
    var g = new THREE.Group()
    var body = new THREE.Mesh(getBox(w, h, d), mat)
    body.position.y = h / 2
    body.castShadow = true
    body.receiveShadow = true
    g.add(body)

    var winStrip = new THREE.Mesh(getBox(w * 0.7, h * 0.3, 0.02), M.glassDark)
    winStrip.position.set(0, h * 0.55, d / 2 + 0.01)
    g.add(winStrip)
    var winBack = winStrip.clone()
    winBack.position.z = -d / 2 - 0.01
    g.add(winBack)

    var roofMat =
      roofType === 'tile'
        ? M.roofTile
        : roofType === 'gray'
          ? M.roofGray
          : M.roofFlat
    var roof = new THREE.Mesh(getBox(w + 0.2, 0.1, d + 0.2), roofMat)
    roof.position.y = h + 0.05
    g.add(roof)

    var door = new THREE.Mesh(getBox(w * 0.15, h * 0.5, 0.02), M.reception)
    door.position.set(0, h * 0.25, d / 2 + 0.02)
    g.add(door)
    return g
  }

  // ── Skyline Building ──
  window.createSkylineBuilding = function (w, d, h, style) {
    var g = new THREE.Group()
    if (style === 'bitexco') {
      for (var s = 0; s < 5; s++) {
        var t = s / 5
        var sH = h / 5
        var sW = w * (1 - t * 0.35)
        var block = new THREE.Mesh(
          getBox(sW, sH, d * (1 - t * 0.25)),
          t < 4 ? M.skyGlass : M.skyConcDk
        )
        block.position.y = s * sH + sH / 2
        g.add(block)
      }
      var spire = new THREE.Mesh(getCyl(0.1, h * 0.12, 4), M.skyConcDk)
      spire.position.y = h + h * 0.06
      g.add(spire)
    } else if (style === 'gradient' || style === 'modern') {
      var mb = new THREE.Mesh(getBox(w, h, d), M.skyGlass)
      mb.position.set(0, h / 2, 0)
      g.add(mb)
    } else {
      var cb = new THREE.Mesh(getBox(w, h, d), M.skyConc)
      cb.position.set(0, h / 2, 0)
      g.add(cb)
    }
    return g
  }

  // ── Boat ──
  window.createBoat = function (len, w, type) {
    var g = new THREE.Group()
    var hull = new THREE.Mesh(getBox(w, 0.1, len), M.boatHull)
    hull.position.y = 0.05
    g.add(hull)
    var deck = new THREE.Mesh(getBox(w * 0.95, 0.06, len * 0.95), M.boatWhite)
    deck.position.y = 0.13
    g.add(deck)
    if (type === 'yacht') {
      var cabin = new THREE.Mesh(getBox(w * 0.6, 0.28, len * 0.35), M.boatWhite)
      cabin.position.set(0, 0.3, -len * 0.1)
      g.add(cabin)
      var cabWin = new THREE.Mesh(getBox(w * 0.55, 0.12, 0.01), M.glassDark)
      cabWin.position.set(0, 0.32, -len * 0.1 + len * 0.175 + 0.01)
      g.add(cabWin)
    }
    return g
  }
})()
