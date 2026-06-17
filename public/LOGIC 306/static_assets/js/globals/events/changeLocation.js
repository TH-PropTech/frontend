import { AFrameStage } from "../../components/AFrameStage.js";
import { LeftBar } from "../../components/LeftBar.js";
import TourScript from "../../components/plugins/TourScript.js";
import { useDataLocation } from "../../hook/useDataLocation.js";
import { loadDataScene } from "../../utils/load-scene.js";

// change-location
window.AFrameStage = AFrameStage; // Make it globally accessible
export default function handlerEventChangeLocation() {
	window.addEventListener("change-location", function (e) {
		ttbl_logger.log("[event:change-location] Received change-location event:", e.detail);
		const { linkto } = e.detail;
		const old = AFrameStage.currentSkyId || "unk-id";
		ttbl_logger.log("[event:change-location] Changing location from", old, "to", linkto);
		LeftBar.getInstance().close();
		loadDataScene(linkto);
		window._logger && window._logger.enterScene(linkto);
	});
}
