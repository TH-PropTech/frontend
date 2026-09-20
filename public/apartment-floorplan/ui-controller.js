;(function () {
  'use strict'

  function create(options) {
    var group = options.group
    var rooms = group.userData.rooms || []
    var list = document.getElementById('room-list')
    var markersContainer = document.getElementById('room-markers')
    var overviewButton = document.getElementById('overview-button')
    var selectedId = null
    var defaultMaterials = new Map()
    var selectableSurfaces = []
    var markerButtons = []
    var markersVisible = true
    var projVector = typeof THREE !== 'undefined' ? new THREE.Vector3() : null

    if (list) list.replaceChildren()
    if (markersContainer) markersContainer.replaceChildren()

    group.traverse(function (object) {
      if (
        object.userData &&
        object.userData.selectableSurface &&
        object.material
      ) {
        defaultMaterials.set(object.uuid, object.material)
        selectableSurfaces.push(object)
      }
    })

    function highlight(roomId) {
      selectedId = roomId
      selectableSurfaces.forEach(function (object) {
        var baseMaterial = defaultMaterials.get(object.uuid)
        object.material =
          object.userData.roomId === roomId
            ? window.FloorplanMaterials.selected
            : baseMaterial
      })
      if (list) {
        Array.prototype.forEach.call(
          list.querySelectorAll('button'),
          function (button) {
            button.classList.toggle('active', button.dataset.roomId === roomId)
          }
        )
      }
      markerButtons.forEach(function (btn) {
        btn.classList.toggle('active', btn.dataset.roomId === roomId)
      })

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
      if (list) {
        var button = document.createElement('button')
        button.type = 'button'
        button.className = 'room-button'
        button.dataset.roomId = room.id
        button.textContent = room.label
        button.addEventListener('click', function () {
          options.onRoomClick(room.id)
        })
        list.appendChild(button)
      }

      if (markersContainer) {
        var marker = document.createElement('button')
        marker.type = 'button'
        marker.className = 'room-marker'
        marker.dataset.roomId = room.id
        marker.setAttribute('aria-label', room.label)
        var span = document.createElement('span')
        span.textContent = room.label
        marker.appendChild(span)
        marker.addEventListener('click', function (e) {
          e.stopPropagation()
          options.onRoomClick(room.id)
        })
        markersContainer.appendChild(marker)
        markerButtons.push(marker)
      }
    })

    function setMarkersVisible(visible) {
      markersVisible = visible
      if (!markersVisible) {
        markerButtons.forEach(function (btn) {
          btn.style.display = 'none'
        })
      }
    }

    function updateMarkers(camera, width, height) {
      if (
        !markersVisible ||
        !camera ||
        !projVector ||
        markerButtons.length === 0
      )
        return
      var wallH =
        (window.FloorplanGeometry && window.FloorplanGeometry.WALL_HEIGHT) ||
        1.3
      var targetY = wallH + 0.35

      rooms.forEach(function (room, index) {
        var btn = markerButtons[index]
        if (!btn) return
        projVector.set(room.x, targetY, room.z)
        projVector.project(camera)

        // If behind camera or outside normalized view
        if (
          projVector.z > 1 ||
          projVector.x < -1.15 ||
          projVector.x > 1.15 ||
          projVector.y < -1.15 ||
          projVector.y > 1.15
        ) {
          btn.style.display = 'none'
        } else {
          var screenX = ((projVector.x + 1) * width) / 2
          var screenY = ((-projVector.y + 1) * height) / 2
          btn.style.display = 'inline-flex'
          btn.style.left = Math.round(screenX) + 'px'
          btn.style.top = Math.round(screenY) + 'px'
          btn.style.transform = 'translate(-50%, -50%)'
        }
      })
    }

    function setOverviewButtonVisible(visible) {
      if (overviewButton) {
        overviewButton.hidden = !visible
      }
    }

    return {
      getSelectedId: function () {
        return selectedId
      },
      highlight: highlight,
      setMarkersVisible: setMarkersVisible,
      updateMarkers: updateMarkers,
      setOverviewButtonVisible: setOverviewButtonVisible,
    }
  }

  window.FloorplanUi = { create: create }
})()
