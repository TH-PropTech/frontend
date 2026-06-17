import { PageController } from "../hook/useSettings";

function previewOpenInspector() {
	try {
		setTimeout(() => {
			if (AFRAME.INSPECTOR == null) {
				window.location.href = "https://iuh.edu.vn/";
			}
			if (AFRAME && AFRAME.INSPECTOR) {
				ttbl_logger.log("[Inspector] AFRAME.INSPECTOR is now available.");

				AFRAME.INSPECTOR.close();
				const inspector = document.getElementById("aframeInspector");
				if (inspector) {
					inspector.innerHTML = "";
					//   Create a popup html warning and hide after 5s using absolute
					popupInfo("Cannot use AFRAME.INSPECTOR in production mode!", 5000);

					ttbl_logger.error("[Inspector] Cannot use AFRAME.INSPECTOR in production mode!");
				}

				AFRAME.INSPECTOR = null;
			}
		}, 300);
	} catch (e) {
		ttbl_logger.error("[Inspector] Cannot open inspector", e);
	}
}

export function popupInfo(e, timeout = 5000) {
	document.body.insertAdjacentHTML(
		"beforeend",
		"<div id='devlog' style='position: absolute; z-index: 9999; top: 10px; left: 10px; background-color: #92374D; color: #fff; padding: 5px 15px; border-radius: 5px;'>" +
			(PageController.settings.developmentMode ? "[Dev] " : "") +
			e +
			"</div>"
	);
	setTimeout(() => {
		document.getElementById("devlog").style.display = "none";
	}, timeout);
}

export function registerDeveloperMode() {
	window.addEventListener("keydown", function (event) {
		if (event.ctrlKey && event.key === "d") {
			event.preventDefault();
			if (PageController.settings.developmentSettings.hiddenCount < 7) {
				PageController.settings.developmentSettings.hiddenCount++;
				return;
			}

			PageController.settings.developmentMode = !PageController.settings.developmentMode;
			popupInfo("Developer mode is " + (PageController.settings.developmentMode ? "ON" : "OFF"), 2000);
			return;
		}

		if (!PageController.settings.developmentMode) {
			if (event.ctrlKey && event.altKey && event.key === "i") previewOpenInspector();
			return;
		}

		// Prevent go a head for debugging
		if (event.ctrlKey && event.key === "a") {
			event.preventDefault();
			PageController.settings.developmentSettings.stopGoAhead =
				!PageController.settings.developmentSettings.stopGoAhead;
			popupInfo("Go A head " + (PageController.settings.developmentSettings.stopGoAhead ? "ON" : "OFF"), 2000);
			return;
		}

		// Clear cache
		if (event.ctrlKey && event.key === "o") {
			event.preventDefault();
			popupInfo("Clearing cache...", 2000);
			setTimeout(() => {
				location.reload(true); // reload trang và bỏ qua cache
			}, 1000);
			return;
		}
	});
}
