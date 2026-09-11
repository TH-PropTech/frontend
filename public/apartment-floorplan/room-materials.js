;(function () {
  'use strict'

  var L = THREE.MeshLambertMaterial
  var P = THREE.MeshPhongMaterial

  window.FloorplanMaterials = {
    floor: new L({ color: 0xe5d6c6 }),
    wall: new L({ color: 0xfaf7f2 }),
    divider: new L({ color: 0xcdb8a5 }),
    living: new L({ color: 0xe8d1be, transparent: true, opacity: 0.78 }),
    bedroom: new L({ color: 0xd6e0d3, transparent: true, opacity: 0.78 }),
    kitchen: new L({ color: 0xe7dfcf, transparent: true, opacity: 0.78 }),
    bathroom: new L({ color: 0xd5e3e6, transparent: true, opacity: 0.82 }),
    balcony: new L({ color: 0xdad3c7, transparent: true, opacity: 0.78 }),
    furniture: new L({ color: 0x8e6d56 }),
    textile: new L({ color: 0xc8a78d }),
    ceramic: new P({ color: 0xf7f4ef, shininess: 60 }),
    glass: new P({
      color: 0x9bcbd0,
      transparent: true,
      opacity: 0.34,
      shininess: 70,
    }),
    selected: new L({ color: 0xc65a3a, transparent: true, opacity: 0.9 }),
  }
})()
