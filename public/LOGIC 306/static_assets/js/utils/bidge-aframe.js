function backHome() {
	const sky = document.getElementById("skybox");
	const locationBefore = sky.getAttribute("src").split("#")[1];
	sky.setAttribute("src", "#Cs1-Sky-1224");
	var spotcomp = document.getElementById("spots");
	spotcomp.emit("reloadspots", {
		newspots: "spotGroup-Cs1-Sky-1224",
		currspots: "spotGroup-" + locationBefore,
	});
}

function toggleGyroSensor() {
	let lookControls = camera.getAttribute("look-controls");
	lookControls.magicWindowTrackingEnabled = !lookControls.magicWindowTrackingEnabled;
	camera.setAttribute("look-controls", lookControls);
	ttbl_logger.log("[Gyro] Toggle gyro sensor");
}

function switchLocation(e) {
	var location = e.getAttribute("data-location");
	var locationBefore = "";
	ttbl_logger.log("[Location] Switch location: " + location);
	//set the skybox source to the new image as per the spot
	turnRotate();
	var sky = document.getElementById("skybox");
	locationBefore = sky.getAttribute("src").split("#")[1];
	sky.setAttribute("src", "#" + location);

	var spotcomp = document.getElementById("spots");
	var currspots = location;
	//create event for spots component to change the spots data
	spotcomp.emit("reloadspots", {
		newspots: "spotGroup-" + currspots,
		currspots: "spotGroup-" + locationBefore,
	});

	turnRotate();
	openMenuLeft();

	// logger

	tracker.currentSceneId = location;
}

function handleClickForLocation() {
	var locations = document.querySelectorAll("[data-location]");
	locations.forEach((location) => {
		location.addEventListener("click", function () {
			if (!this.getAttribute("data-location")) {
				ttbl_logger.log("[Location] Location not found");
				return;
			}
			switchLocation(this);
			loadDataLocation(this.getAttribute("data-location"));
		});
	});
}

function loadDataLocation(id) {
	const locationText = document.getElementById("currentLocation");
	const dataDetails = document.querySelector("[data-detail-location='LocationDetail']");

	if (locationText) {
		locationText.textContent = dataLocation[id]
			? dataLocation[id].title || dataLocation["default"].title
			: dataLocation["default"].title;
	}

	if (dataDetails) {
		dataDetails.innerHTML = dataLocation[id]
			? dataLocation[id].description || dataLocation["default"].description
			: dataLocation["default"].description;
	}

	if (PageController.settings.isAllowAudio) {
		MediaController.audio.play("./static_assets/audio/" + id + ".mp3");
	} else {
		MediaController.audio.prepare("./static_assets/audio/" + id + ".mp3");
	}

	updateCurrentRotationXY(dataLocation[id].rotation.x, dataLocation[id].rotation.y);
}

function turnRotate(e) {
	const sky = document.getElementById("skybox");
	const spots = document.getElementById("spots");
	// nếu có animation thì remove đi
	if (sky.getAttribute("animation") == null && sky.getAttribute("animation") == undefined) {
		sky.setAttribute(
			"animation",
			"property: rotation; from: 0 0 0; to: 0 360 0; dur: 300000; easing: linear; loop: true"
		);
		// ant hotspots
		spots.setAttribute(
			"animation",
			"property: rotation; from: 0 0 0; to: 0 360 0; dur: 300000; easing: linear; loop: true"
		);
	} else {
		sky.removeAttribute("animation");
		spots.removeAttribute("animation");
	}
}

function resetZoom() {
	const cam = document.getElementById("cam");
	const cameraComponent = cam.getAttribute("camera");
	cameraComponent.zoom = 0.999999999;
	cam.setAttribute("camera", cameraComponent);
}

function updateCurrentRotationXY(x, y) {
	let cameraEl = document.querySelector("[camera]");

	// Phát sự kiện để xoay camera
	cameraEl.dispatchEvent(
		new CustomEvent("update-xy", {
			detail: { x, y },
		})
	);
	// { x: -0.6140000000000003, y: 1.504000000000001 },
}

function lookControlEnabler(state = true) {
	if (state) {
		camera.setAttribute(
			"look-controls",
			"enabled: true; reverseMouseDrag: true; magicWindowTrackingEnabled: true;"
		);
	} else {
		camera.setAttribute("look-controls", "enabled: false;");
	}
}
