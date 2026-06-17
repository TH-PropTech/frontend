// ═══════════════════════════════════════════════════════════
// shared-materials.js — Premium Materials (Reference: Luxury Riverside Condo)
// ═══════════════════════════════════════════════════════════
;(function () {
  var L = THREE.MeshLambertMaterial
  var P = THREE.MeshPhongMaterial // only for shiny surfaces

  window.MAT = {
    // ── Building (premium warm concrete + sapphire glass) ──
    concrete: new L({ color: 0xc0b5a5 }), // warm sandstone concrete
    concDark: new L({ color: 0x8a7e6e }), // darker accent
    slab: new L({ color: 0xd4ccc0 }), // lighter warm slab
    frame: new P({ color: 0x4a4540, shininess: 40 }), // dark bronze frames
    glass: new P({
      color: 0x5ebed0,
      transparent: true,
      opacity: 0.28,
      shininess: 95,
    }), // premium sapphire glass
    glassDark: new P({
      color: 0x2a5a68,
      transparent: true,
      opacity: 0.5,
      shininess: 80,
    }), // deep tinted glass
    core: new L({ color: 0xe8e2d8 }),

    // ── Podium & Terraces (new) ──
    podiumConc: new L({ color: 0xd0c5b0 }), // warm cream podium
    podiumConcDk: new L({ color: 0xa09585 }), // rich dark podium accent
    terraceFloor: new L({ color: 0xddd5c5 }), // warm stone terrace
    archFrame: new P({ color: 0x6a6050, shininess: 30 }), // bronze arch

    // ── Dense Greenery (new) ──
    foliageDense: new L({ color: 0x1e6b22 }), // very dense dark green
    foliageMid: new L({ color: 0x35853a }), // mid green
    treeCrown: new L({ color: 0x2a7a2e }), // tree crown green
    hangingGreen: new L({ color: 0x3d9e42 }), // hanging/trailing plants

    // ── Pool ──
    pool: new P({
      color: 0x1ac5d4,
      transparent: true,
      opacity: 0.72,
      shininess: 95,
    }), // turquoise pool
    poolEdge: new L({ color: 0xd6cfc5 }), // pool edge stone

    // ── Villa (low-rise buildings) ──
    villaWall: new L({ color: 0xf2ece4 }), // cream white
    villaWallB: new L({ color: 0xe0d8cc }), // warm beige
    roofTile: new L({ color: 0xcc6633 }), // terracotta
    roofGray: new L({ color: 0x707878 }), // dark slate
    roofFlat: new L({ color: 0xd0c8be }), // flat roof

    // ── Landscape (lush green + warm tones) ──
    ground: new L({ color: 0x5dad3e }),
    groundDk: new L({ color: 0x3a7c20 }),
    lawn: new L({ color: 0x4aaa4a }), // vibrant lawn
    road: new L({ color: 0x585858 }), // darker asphalt
    sidewalk: new L({ color: 0xd0c8b8 }), // warm sidewalk
    pier: new L({ color: 0xa89880 }), // wooden pier
    foliage: new L({ color: 0x2d7a30 }), // dark green trees
    foliageLt: new L({ color: 0x48a84b }), // light green trees
    trunk: new L({ color: 0x5d4037 }),
    water: new P({
      color: 0x3a7a8a,
      transparent: true,
      opacity: 0.72,
      shininess: 90,
    }), // deep teal river
    waterDeep: new P({
      color: 0x1a5a6a,
      transparent: true,
      opacity: 0.82,
      shininess: 70,
    }), // darker depth

    // ── Skyline ──
    skyGlass: new P({
      color: 0x5eaec0,
      transparent: true,
      opacity: 0.5,
      shininess: 50,
    }),
    skyConc: new L({ color: 0xb0a898 }),
    skyConcDk: new L({ color: 0x807870 }),

    // ── Boat ──
    boatWhite: new L({ color: 0xf8f8f8 }),
    boatDeck: new L({ color: 0x8d6e53 }),
    boatHull: new L({ color: 0x2c3e50 }), // dark hull

    // ── Interior ──
    elevator: new P({ color: 0x909090, shininess: 45 }),
    elevDoor: new P({ color: 0xb8b8b8, shininess: 65 }),
    elevBtn: new P({ color: 0xe0c860, shininess: 50 }), // elevator button panel
    stairCase: new L({ color: 0x9e9e9e }),
    corridor: new L({ color: 0xe0d8cc }),
    wallInt: new L({ color: 0xf0ece8 }),
    wallDiv: new L({ color: 0xd8d0c5 }),
    bathroom: new P({ color: 0xd6eaf8, shininess: 50 }),
    kitchen: new L({ color: 0xd0c4b0 }),
    bedFloor: new L({ color: 0xc4a47a }), // warm wood
    balcFloor: new L({ color: 0xb8b0a0 }),

    // ── Lobby & Entrance ──
    lobbyMarble: new P({ color: 0xe8ddd0, shininess: 55 }), // marble floor
    canopyGlass: new P({
      color: 0x4488aa,
      transparent: true,
      opacity: 0.4,
      shininess: 85,
    }),
    signage: new P({
      color: 0x0f2a4c,
      shininess: 35,
      emissive: 0x0a1525,
      emissiveIntensity: 0.15,
    }), // subtle glow signage
    reception: new L({ color: 0x3d3028 }), // dark wood reception

    // ── Landscaping ──
    garden: new L({ color: 0x3a8a3a }), // garden hedge
    gardenFlower: new L({ color: 0xd45070 }), // flower accent
    lampPost: new P({ color: 0x404040, shininess: 40 }),
    lampLight: new P({
      color: 0xfff4d0,
      emissive: 0xfff4d0,
      emissiveIntensity: 0.3,
    }),
    bench: new L({ color: 0x8b7355 }), // park bench wood
    helipad: new L({ color: 0xd0c8b8 }), // helipad surface
    railing: new P({ color: 0x606060, shininess: 30 }), // roof railing

    // Highlight
    lineHL: new THREE.LineBasicMaterial({ color: 0x0284c7 }),
  }

  // Cached geometries
  window.GEO = {}
})()
