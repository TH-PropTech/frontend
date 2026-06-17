import { useDataBranding } from "../../../hook/useDataBranding.js";

export default function TeleportPoint_Plugin(raw) {
	const { id, title, position, rotation, url, data } = raw;
	// Điểm click thực tế
	const planeElement = document.createElement("a-plane");
	planeElement.setAttribute("opacity", "0");
	planeElement.setAttribute("width", "1");
	planeElement.setAttribute("height", "1");
	planeElement.setAttribute("look-at", "#af-camera");
	planeElement.setAttribute("id-object", id);

	// Đặt các thuộc tính `spot`
	const spotData = `previewTitle:${title};url:${url};`;
	planeElement.setAttribute("plugin-spot", spotData);

	// update data for plugin spots
	if (data) {
		planeElement.__pluginData = data;
	}

	planeElement.setAttribute("position", position ? `${position.x} ${position.y} ${position.z}` : "0 0 0");

	const ringElement = document.createElement("a-ring");
	ringElement.setAttribute("radius-inner", "0.02");
	ringElement.setAttribute("radius-outer", "0.07");
	ringElement.setAttribute("look-at", "#af-camera");
	ringElement.setAttribute("color", "#FFFFFF");
	ringElement.setAttribute("nohit", "");

	ringElement.setAttribute(
		"animation__scale",
		"property: scale; from: 0 0 0; to: 3 3 3; dur: 1500; easing: easeOutQuad; loop: true"
	);
	ringElement.setAttribute(
		"animation__opacity",
		"property: opacity; from: 1; to: 0; dur: 1500; easing: easeOutQuad; loop: true"
	);

	const ringElement2 = document.createElement("a-ring");
	ringElement2.setAttribute("radius-inner", "0.00");
	ringElement2.setAttribute("radius-outer", "0.05");
	ringElement2.setAttribute("look-at", "#af-camera");
	ringElement2.setAttribute("color", useDataBranding()?.data?.colors?.secondary || "#FF6B6B");
	ringElement2.setAttribute("nohit", "");

	ringElement2.setAttribute(
		"animation__scale",
		"property: scale; from: 0 0 0; to: 3 3 3; dur: 1500; easing: easeInOutSine; loop: true"
	);
	ringElement2.setAttribute(
		"animation__opacity",
		"property: opacity; from: 1; to: 0; dur: 1500; easing: easeInOutSine; loop: true"
	);

	const ringElement3 = document.createElement("a-ring");
	ringElement3.setAttribute("radius-inner", "0.07");
	ringElement3.setAttribute("radius-outer", "0.09");
	ringElement3.setAttribute("look-at", "#af-camera");
	ringElement3.setAttribute("color", useDataBranding()?.data?.colors?.primary || "#262261");
	ringElement3.setAttribute("nohit", "");

	ringElement3.setAttribute(
		"animation__scale",
		"property: scale; from: 0 0 0; to: 3 3 3; dur: 1500; easing: easeInOutSine; loop: true"
	);
	ringElement3.setAttribute(
		"animation__opacity",
		"property: opacity; from: 1; to: 0; dur: 1500; easing: easeInOutSine; loop: true"
	);

	// const colors = ["#EEDF7A", "#FF6B6B", "#6BCB77", "#4D96FF", "#C780FA"];
	// let currentColorIndex = 0;

	// const intervalId = setInterval(() => {
	// 	currentColorIndex = (currentColorIndex + 1) % colors.length;
	// 	ringElement.setAttribute("color", colors[currentColorIndex]);
	// 	ttbl_logger.log("Change color to", colors[currentColorIndex]);
	// }, 500); // đổi màu mỗi 0.5s

	// 262261

	// Thêm `a-ring` vào mặt phẳng click
	planeElement.appendChild(ringElement);
	planeElement.appendChild(ringElement2);
	planeElement.appendChild(ringElement3);

	return planeElement;
}
