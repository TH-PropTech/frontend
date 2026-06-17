import useCamera from "../../hook/useCamera.js";
import { playMedia } from "../../utils/load-scene.js";

export function handleStartScreenClick(callback) {
	window.addEventListener("start-screen-click", function (e) {
		ttbl_logger.log("[event:start-screen-click] Start screen clicked", e);
		if (callback) callback(e);
	});

	window.addEventListener("guide-closed", function (e) {
		ttbl_logger.log("[event:guide-closed] Guide closed event received", e);
		playMedia();

		const cam = useCamera();
		cam.rotateCamera();
	});
}
