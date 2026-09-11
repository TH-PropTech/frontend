;(function () {
  'use strict'

  function create(options) {
    var group = options.group
    var rooms = group.userData.rooms || []
    var list = document.getElementById('room-list')
    var selectedId = null
    var defaultMaterials = new Map()

    list.replaceChildren()

    group.traverse(function (object) {
      if (object.userData && object.userData.roomId && object.material) {
        defaultMaterials.set(object.uuid, object.material)
      }
    })

    function highlight(roomId) {
      selectedId = roomId
      group.traverse(function (object) {
        var baseMaterial = defaultMaterials.get(object.uuid)
        if (!baseMaterial) return
        object.material =
          object.userData.roomId === roomId
            ? window.FloorplanMaterials.selected
            : baseMaterial
      })
      Array.prototype.forEach.call(
        list.querySelectorAll('button'),
        function (button) {
          button.classList.toggle('active', button.dataset.roomId === roomId)
        }
      )
      if (roomId) {
        window.FloorplanHostBridge.post(
          {
            version: 1,
            type: 'FLOORPLAN_ROOM_SELECTED',
            payload: { roomId: roomId },
          },
          window.location.origin
        )
      }
    }

    rooms.forEach(function (room) {
      var button = document.createElement('button')
      button.type = 'button'
      button.className = 'room-button'
      button.dataset.roomId = room.id
      button.textContent = room.label
      button.addEventListener('click', function () {
        highlight(room.id)
      })
      list.appendChild(button)
    })

    document
      .getElementById('reset-button')
      .addEventListener('click', options.onReset)
    return {
      getSelectedId: function () {
        return selectedId
      },
      highlight: highlight,
    }
  }

  window.FloorplanUi = { create: create }
})()
