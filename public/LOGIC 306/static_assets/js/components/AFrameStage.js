import GroupHotspot from "../aframe/components/GroupHotspot.js";

export class AFrameResourceManager {
	_el = null;
	constructor() {
		const aAssets = document.createElement("a-assets");
		aAssets.setAttribute("id", "af-rsManager");
		this._el = aAssets;
	}

	addImage({ id, url }) {
		const aAssets = this._el;
		if (!id || !url || !aAssets) {
			ttbl_logger.error(`[AFrameResourceManager] Invalid asset parameters.`);
			return;
		}
		if (aAssets.querySelector("#af-" + id)) {
			ttbl_logger.warn(`[AFrameResourceManager] Asset with id ${id} already exists.`);
			return;
		}

		const asset = document.createElement("img");
		asset.setAttribute("id", "af-" + id);
		asset.setAttribute("crossorigin", "anonymous");
		asset.setAttribute("src", url);
		asset.style.display = "none";
		aAssets.appendChild(asset);
	}
	priorityLoadImage({ id, url, timeout = 15000 }) {
		return new Promise((resolve) => {
			const aAssets = this._el;

			if (!id || !url || !aAssets) {
				ttbl_logger.error(`[AFrameResourceManager] Invalid asset parameters.`);
				return resolve({ success: false, reason: "invalid_params" });
			}

			const existed = aAssets.querySelector("#af-" + id);
			if (existed) {
				ttbl_logger.warn(`[AFrameResourceManager] Asset with id ${id} already exists.`);
				// trả về success true luôn, ko tạo lại
				return resolve({ success: true, reason: "already_exists" });
			}

			// Tạo element trước
			const img = document.createElement("img");
			img.id = "af-" + id;
			img.crossOrigin = "anonymous";
			img.src = url;
			img.style.display = "none";

			let isCompleted = false;
			let timer = null;

			// timeout: chống treo load
			timer = setTimeout(() => {
				if (!isCompleted) {
					isCompleted = true;
					ttbl_logger.error(`[AFrameResourceManager] Timeout while loading image: ${url}`);
					resolve({ success: false, reason: "timeout" });
				}
			}, timeout);

			// success
			img.onload = () => {
				if (isCompleted) return;
				isCompleted = true;
				clearTimeout(timer);

				ttbl_logger.log(`[AFrameResourceManager] Loaded image: ${id}`);
				resolve({ success: true });
			};

			// fail
			img.onerror = () => {
				if (isCompleted) return;
				isCompleted = true;
				clearTimeout(timer);

				ttbl_logger.error(`[AFrameResourceManager] Failed to load image: ${url}`);
				resolve({ success: false, reason: "error" });
			};

			// append vào assets ngay để A-Frame quản lý
			aAssets.appendChild(img);
		});
	}
}

function Camera() {
	const aCamera = document.createElement("a-entity");
	aCamera.setAttribute("id", "af-camera");
	aCamera.setAttribute("camera", "");
	aCamera.setAttribute("position", "0 0 0");
	aCamera.setAttribute("custom-look", "");
	aCamera.setAttribute("inertia-look-controls", "");
	// aCamera.setAttribute("look-inertia", "");
	return aCamera;
}

function TransitionLocationObject() {
	const sphere = document.createElement("a-sphere");
	sphere.setAttribute("visible", "true");
	sphere.setAttribute("id", "af-transition-sphere");
	sphere.setAttribute("position", "0 0 0");
	sphere.setAttribute("radius", "1");
	sphere.setAttribute("color", "#1a1a1a");
	sphere.setAttribute("opacity", "0");
	sphere.setAttribute("visible", "false");
	sphere.setAttribute("material", "shader: flat; side: back; fog: false;");
	sphere.setAttribute("nohit");

	// Create animation for the sphere
	sphere.setAttribute("animation__fadein", {
		property: "material.opacity",
		from: 0,
		to: 1,
		dur: 500,
		easing: "easeInOutQuad",
		startEvents: "fadein",
		fill: "forwards",
	});

	sphere.setAttribute("animation__fadeout", {
		property: "material.opacity",
		from: 1,
		to: 0,
		dur: 500,
		easing: "easeInOutQuad",
		startEvents: "fadeout",
		fill: "forwards",
	});

	sphere.addEventListener("animationcomplete__fadein", () => {
		ttbl_logger.log("[TransitionLocationObject] Fade-in animation completed.");
	});

	sphere.addEventListener("animationcomplete__fadeout", () => {
		sphere.setAttribute("material", "opacity", 0);
		sphere.setAttribute("visible", "false");
	});

	return sphere;
}

export class AFrameStage extends HTMLElement {
	_el = null;
	_resourceManager = null;

	static instance = null;
	constructor() {
		super();
		const aScene = document.createElement("a-scene");
		aScene.setAttribute("background", "color: #FFFFFF");
		aScene.setAttribute("cursor", "rayOrigin:mouse");
		aScene.setAttribute("id", "af-scene");
		aScene.setAttribute("loading-screen", "enabled: false");
		aScene.setAttribute("renderer", "antialias: true; powerPreference: high-performance; precision: medium; colorManagement: true;");

		aScene.setAttribute("cursor", "rayOrigin: mouse");

		// Add resource manager
		const resourceManager = new AFrameResourceManager();
		aScene.appendChild(resourceManager._el);

		// Add camera
		const camera = Camera();
		aScene.appendChild(camera);

		// Add sky
		const sky = document.createElement("a-sky");
		sky.setAttribute("id", "af-sky");
		sky.setAttribute("crossorigin", "anonymous");
		sky.setAttribute("location-sky", "");
		sky.setAttribute("position", "0 0 0");
		sky.setAttribute("rotation", "0 0 0");
		aScene.appendChild(sky);

		// Add a sphere to serve change sky
		const sphere = TransitionLocationObject();
		aScene.appendChild(sphere);

		this.appendChild(aScene);
		this._el = aScene;

		this._resourceManager = resourceManager;

		// Lưu instance toàn cục
		AFrameStage.instance = this;
	}

	static addObject(obj) {
		const stage = this.getScene();
		stage && stage.appendChild(obj);
	}

	static removeObject(obj) {
		const stage = this.getScene();
		stage && stage.removeChild(obj);
	}

	static currentSkyId = null;

	static changeSky({ id = "", url = "" }) {
		if (!id && !url) {
			ttbl_logger.error("[AFrameStage] Either id or url must be provided to change the sky.");
			return;
		}

		const stage = this.getScene();
		if (!stage) return;

		let sky = stage.querySelector("a-sky");
		if (sky) {
			sky.parentNode.removeChild(sky);
		}
		sky = document.createElement("a-sky");
		sky.setAttribute("id", "af-sky");
		sky.setAttribute("location-sky", id || "");
		sky.setAttribute("position", "0 0 0");
		sky.setAttribute("rotation", "0 0 0");
		sky.setAttribute("src", id ? `#af-${id}` : url);
		stage.appendChild(sky);

		AFrameStage.currentSkyId = id || url;
	}

	static getScene() {
		const stage = AFrameStage.instance;
		if (!stage) {
			ttbl_logger.error("[AFrameStage.getScene] A-Frame stage not found in the document.");
			return null;
		}
		return stage._el;
	}

	static getResourceManager() {
		const stage = AFrameStage.instance;
		if (!stage) {
			ttbl_logger.error("[AFrameStage.getResourceManager] A-Frame stage not found in the document.");
			return null;
		}
		return stage._resourceManager;
	}

	static animateTransition(event) {
		const stage = this.getScene();
		if (!stage) return;
		const sphere = stage.querySelector("#af-transition-sphere");
		if (!sphere) return;
		if (event === "fadein") {
			sphere.setAttribute("opacity", "0");
			sphere.setAttribute("visible", "true");
			requestAnimationFrame(() => {
				sphere.emit("fadein");
			});
		} else if (event === "fadeout") {
			sphere.setAttribute("opacity", "1");
			requestAnimationFrame(() => {
				sphere.emit("fadeout");
			});
		}
	}
}
customElements.define("a-frame-stage", AFrameStage);
