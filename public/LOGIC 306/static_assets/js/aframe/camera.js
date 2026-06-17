import useCamera from "../hook/useCamera.js";
import { Settings } from "../hook/useSettings.js";

export function zoom(isIn = false, delta = 0.1) {
	const { camera } = useCamera();
	const mycam = camera.getAttribute("camera");
	const finalZoom = isIn ? mycam.zoom + delta : mycam.zoom - delta;
	mycam.zoom = Math.min(Math.max(finalZoom, Settings.zoom.min), Settings.zoom.max);
	camera.setAttribute("camera", mycam);
}

export function setZoom(zoomLevel = 1) {
	const { camera } = useCamera();
	const mycam = camera.getAttribute("camera");
	mycam.zoom = Math.min(Math.max(zoomLevel, Settings.zoom.min), Settings.zoom.max);
	camera.setAttribute("camera", mycam);
}

export function updateCurrentRotation(rotation = { x: 0, y: 0 }) {
	const { camera } = useCamera();

	// Phát sự kiện để xoay camera
	camera.dispatchEvent(
		new CustomEvent("update-xy", {
			detail: { x: rotation.x || 0, y: rotation.y || 0 },
		})
	);
}
