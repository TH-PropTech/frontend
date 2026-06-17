window.events = {};

import "./components/LoadingScreen.js";
import "./utils/logger.js";
import "./libs/aframe/aframe-1.4.2.min.js";
import "./libs/aframe/aframe-look-at-component.1.0.0.min.js";
import "./components/AFrameStage.js";

import "./components/plugins/PluginContent.js";
import { pluginListener } from "./components/plugins/PluginListener.js";
import { useDataBranding } from "./hook/useDataBranding.js";
import handlerEventChangeLocation from "./globals/events/changeLocation.js";
// hotspots
import "./aframe/hotspots/spot.js";
import "./aframe/hotspots/plugin-spot.js";

import { AFrameStage } from "./components/AFrameStage.js";
import { firstLoadDataScene, loadDataScene, playMedia } from "./utils/load-scene.js";
import "./aframe/custom-look.js";
import "./aframe/look-control.js";
import { handlerActionEvent } from "./globals/events/actions.js";
import "./components/InfoPopup.js";
import "./components/BackgroudDim.js";
import "./components/StartScreen.js";
import "./components/FloatScreen.js";
import "./components/GuideIntro.js";
import "./components/SchoolMap.js";
import "./components/SchoolIntro.js";
import "./components/LeftBar.js";
import "./components/BottomBar.js";
import "./components/MascotAssistant.js";
import "./components/plugins/OverlayFullScreen.js";

import { handleStartScreenClick } from "./globals/events/start-screen.js";
import { useLoadAssets } from "./hook/useLoadAssets.js";
import { useDataLocation } from "./hook/useDataLocation.js";
import { LeftBar } from "./components/LeftBar.js";

import "./legacy/logs.js";
import { flyCameraFromAbove } from "./aframe/animate-cinematic.js";
import { GuideIntro } from "./components/GuideIntro.js";
import useCamera from "./hook/useCamera.js";
import { Settings } from "./hook/useSettings.js";
import { MediaController } from "./hook/useAudio.js";
import { useDataTourScript } from "./hook/useDataScript.js";
import TourScript from "./components/plugins/TourScript.js";

import "./utils/helper.js";

// Plugins
import { API_BASE_URL } from "./globals/consts/api.js";
import "./components/plugins/Notification.js";
import { useDataPlugins } from "./hook/usePlugins.js";
import { handlerEventCanvas } from "./globals/events/canvas.js";
import { LoadingScreen } from "./components/LoadingScreen.js";

window.addEventListener("scene-ready", (e) => {
	console.log("[Event: scene-ready] Scene is ready, hiding loading screen...");
	LoadingScreen.hide();
});

window.addEventListener("DOMContentLoaded", () => {
	// Event này start đầu tiên =)) Đứa nào cố chấp đổi sau DOM ready thì bug start screen à nha =))

	Settings.isButtonsDisabled = true;
	Settings.isDisableInteraction = true;

	handleStartScreenClick(() => {
		if (!useDataPlugins().isPluginsLoaded) {
			useDataPlugins().reloadPlugins();
		}
		setTimeout(() => {
			firstLoad(0);
			handlerEventCanvas();
		}, 100);
	});

	if (window.events["locationDataLoaded"] !== undefined) {
		ttbl_logger.log(
			"[DOMContentLoaded] locationDataLoaded event already fired, initializing app...",
			window.events["locationDataLoaded"]
		);
		initApp(window.events["locationDataLoaded"]);
		const isFirstTime = localStorage.getItem("guide-dialog") ? false : true;
		window._logger = new window.UserLoggerClient(API_BASE_URL, isFirstTime);
	} else {
		window.addEventListener("locationDataLoaded", (e) => {
			ttbl_logger.log("[Event: locationDataLoaded] Location data loaded, initializing app...", e.detail);
			initApp(e.detail);
			// Start logger
			const isFirstTime = localStorage.getItem("guide-dialog") ? false : true;
			window._logger = new window.UserLoggerClient(API_BASE_URL, isFirstTime);
		});
	}

	if (window.events["menuDataLoaded"] !== undefined) {
		ttbl_logger.log(
			"[DOMContentLoaded] menuDataLoaded event already fired, setting left bar items...",
			window.events["menuDataLoaded"]
		);
		LeftBar.setItems(window.events["menuDataLoaded"] || []);
	} else {
		window.addEventListener("menuDataLoaded", (e) => {
			LeftBar.setItems(e.detail || []);
		});
	}

	if (window.events["tourScriptDataLoaded"] !== undefined) {
		ttbl_logger.log(
			"[DOMContentLoaded] tourScriptDataLoaded event already fired, setting tour script data...",
			window.events["tourScriptDataLoaded"]
		);
		TourScript.getInstance().changeData(window.events["tourScriptDataLoaded"] || []);
	} else {
		window.addEventListener("tourScriptDataLoaded", (e) => {
			TourScript.getInstance().changeData(e.detail || []);
		});
	}

	pluginListener();
});

function firstLoad(retry = 0) {
	const aSky = document.querySelector("a-sky");

	ttbl_logger.log("[firstLoad] Bắt đầu firstLoad, thử lần thứ:", retry);

	if (retry > 5) {
		ttbl_logger.error("[firstLoad] Không tìm thấy <a-sky>... Ứng dụng không thể khởi động được.");
		window.ManagePlugins.actionOnPlugin("NotificationPlugin", {
			title: "Ứng dụng gặp sự cố khi khởi động",
			message: "(999,0,999) Mạng bất ổn. Vui lòng kiểm tra kết nối mạng và thử tải lại trang.",
			needReload: true,
		});
		return;
	}

	if (!aSky) {
		ttbl_logger.log("[firstLoad] Chưa thấy a-sky, đợi thêm...");
		setTimeout(() => firstLoad(retry + 1), 1000);
		return;
	}

	const mesh = aSky.getObject3D("mesh");
	if (!mesh || !mesh.material || !mesh.material.map) {
		if (retry % 10 === 0) ttbl_logger.log("[firstLoad] Sky chưa load...");
		setTimeout(() => firstLoad(retry + 1), 1000);
		return;
	}

	// check if asky texture is fully loaded

	playMedia({ backgroundOnly: true, needCheckIfNotPlaying: false });

	setTimeout(() => {
		flyCameraFromAbove(
			useCamera().camera,
			useDataLocation().getDefaultLocation().rotation || { x: 0, y: 0, z: 0 },
			4000
		);

		setTimeout(() => {
			Settings.isButtonsDisabled = false;
			Settings.isDisableInteraction = false;
			GuideIntro.getInstance().setAttribute("data-is-open", "true");
		}, 4200);
	}, 1500);
}

function initApp(locationData) {
	useLoadAssets().load3DAssets();

	useLoadAssets().loadMenu();

	useLoadAssets().loadTourScript();

	handlerEventChangeLocation();

	handlerActionEvent();

	firstLoadDataScene(useDataLocation().getDefaultLocation().id, true);

	const targetInfo = document.getElementById("target-info");

	if (targetInfo) {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.attributeName === "class" && !targetInfo.classList.contains("hidden")) {
					const img = targetInfo.querySelector("img");

					if (!img || !img.src) {
						targetInfo.classList.add("hidden");
						return;
					}

					if (img.complete && img.naturalHeight !== 0) {
					} else {
						targetInfo.classList.add("hidden");
					}
				}
			});
		});

		observer.observe(targetInfo, {
			attributes: true,
			attributeFilter: ["class"],
		});
	}
}
