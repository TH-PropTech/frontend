;(function () {
  'use strict'

  var L = THREE.MeshLambertMaterial
  var P = THREE.MeshPhongMaterial
  var lighting = {
    ambient: { color: 0xfff8ef, intensity: 0.85 },
    directional: { color: 0xfff4df, intensity: 0.65 },
  }

  function addLighting(scene) {
    scene.add(
      new THREE.AmbientLight(lighting.ambient.color, lighting.ambient.intensity)
    )
    var keyLight = new THREE.DirectionalLight(
      lighting.directional.color,
      lighting.directional.intensity
    )
    keyLight.position.set(5, 10, 6)
    scene.add(keyLight)
  }

  window.FloorplanMaterials = {
    floor: new L({ color: 0xcdbba9 }),
    wall: new L({ color: 0xeee5da }),
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
    lighting: lighting,
    addLighting: addLighting,
  }
})()
