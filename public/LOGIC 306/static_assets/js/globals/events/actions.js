import { zoom } from "../../aframe/camera.js";
import { AFrameStage } from "../../components/AFrameStage.js";
import TourScript from "../../components/plugins/TourScript.js";
import { SchoolIntro } from "../../components/SchoolIntro.js";
import { SchoolMap } from "../../components/SchoolMap.js";
import { MediaController } from "../../hook/useAudio.js";
import useCamera from "../../hook/useCamera.js";
import { useDataLocation } from "../../hook/useDataLocation.js";
import { Settings } from "../../hook/useSettings.js";
import { playMedia, stopMedia } from "../../utils/load-scene.js";

const actions = {
	home: (e) => {
		const locationId = useDataLocation().getDefaultLocation().id;
		if (!locationId) {
			ttbl_logger.error("[actions:home-event] No default location found.");
			return;
		}
		if (AFrameStage.currentSkyId === locationId) {
			ttbl_logger.log("[actions:home-event] Already at the default location:", locationId);
			return;
		}
		const event = new CustomEvent("change-location", {
			detail: {
				linkto: useDataLocation().getDefaultLocation().id,
			},
		});
		window.dispatchEvent(event);
	},
	"play-tour": (e) => {
		TourScript.getInstance()?.startTour();
	},
	"show-current-map": (e) => {
		SchoolMap.instance?.open();
	},
	"school-intro": (e) => {
		SchoolIntro.instance?.open();
	},
	"zoom-in": (e) => {
		zoom(true);
		window._logger && window._logger.zoomIn();
	},
	"zoom-out": (e) => {
		zoom(false);
		window._logger && window._logger.zoomOut();
	},
	"auto-rotate": (e) => {
		if (TourScript.getInstance()?._isTouring) return; // đang trong tour thì không auto rotate
		const cam = useCamera();
		if (cam.isRotating()) {
			cam.stopRotate();
		} else {
			cam.rotateCamera();
		}
	},
	"media-play": (e) => {
		const button = document.querySelector("[data-button-id='btn-media-play']");
		const icon = button?.querySelector("i");
		if (icon.classList.contains("fa-volume-high")) {
			icon?.classList.toggle("fa-volume-high", false);
			icon?.classList.toggle("fa-volume-xmark", true);
			stopMedia();
		} else {
			icon?.classList.toggle("fa-volume-high", true);
			icon?.classList.toggle("fa-volume-xmark", false);
			playMedia();
		}
	},
};

export const handlerActionEvent = () => {
	window.addEventListener("action", function (e) {
		const { id, action, payload } = e.detail;
		if (actions[action]) {
			actions[action](e);
		}
	});
};
