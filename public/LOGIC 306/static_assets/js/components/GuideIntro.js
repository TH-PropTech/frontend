import FloatScreen from "./FloatScreen.js";

export class GuideIntro extends HTMLElement {
	constructor() {
		super();
		const floatScreen = new FloatScreen();
		floatScreen.setAttribute("id", "fs-guide");
		floatScreen.setAttribute("data-title", "Hướng dẫn sử dụng");
		floatScreen.setAttribute("data-is-open", "false");

		const guideSteps = [
			{
				icon: "mouse.png",
				text: "Di chuyển con trỏ đến điểm có đánh dấu để xem trước hình ảnh tại khu vực",
			},
			{
				icon: "mouse-click.png",
				text: "Nhấp chuột trái vào điểm được đánh dấu để di chuyển sang địa điểm mong muốn",
			},
		];

		const actions = ["phóng to/thu nhỏ", "nhìn xung quanh", "mở menu truy cập các địa điểm"];

		const divGuideContent = document.createElement("div");
		divGuideContent.className =
			"flex flex-col border-2 border-white rounded-lg gap-8 px-6 py-6 menu-left-scroll scroll-box max-h-[60vh]";

		// Phần hướng dẫn cơ bản
		divGuideContent.innerHTML = guideSteps
			.map(
				(step) => `
			<div class="flex flex-col gap-4 text-center md:flex-row md:gap-6 items-center">
				<div class="w-12 h-12 md:w-8 md:h-8">
					<img src="./static_assets/img/${step.icon}" class="w-12 h-12 md:w-8 md:h-8 object-contain">
				</div>
				<p class="text-white md:text-lg">${step.text}</p>
			</div>`
			)
			.join("");

		// Phần thao tác nâng cao
		divGuideContent.innerHTML += `
		<div class="flex flex-col md:flex-row gap-6 items-center">
			${actions
				.map(
					(action) => `
				<div class="flex flex-col items-center gap-4 text-center md:w-1/3 md:gap-3">
					<div class="w-16 h-16">
						<img src="./static_assets/img/mouse-rotate.png" class="w-16 h-16 object-contain">
					</div>
					<p class="text-white md:text-lg text-center">
						${
							action === "mở menu truy cập các địa điểm"
								? 'Nhấn nút <i class="fa-solid fa-bars px-1"></i> bên dưới để ' + action
								: "Sử dụng con lăn chuột để " + action
						}
					</p>
				</div>`
				)
				.join("")}
		</div>`;

		floatScreen.appendToBody(divGuideContent);
		this.appendChild(floatScreen);
	}

	connectedCallback() {
		const floatScreen = this.querySelector("#fs-guide");
		if (floatScreen) {
			floatScreen.onClose(() => {
				ttbl_logger.log("[GuideIntro] closed");
				const event = new CustomEvent("guide-closed", {});
				window.dispatchEvent(event);
			});
		}
	}

	onClose(callback) {
		const floatScreen = this.querySelector("#fs-guide");
		if (floatScreen) {
			floatScreen.onClose(callback);
		}
	}

	static observedAttributes = ["data-is-open"];

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "data-is-open") {
			const floatScreen = this.querySelector("#fs-guide");
			if (floatScreen) {
				floatScreen.setAttribute("data-is-open", newValue);
			}
		}
	}

	static getInstance() {
		return document.querySelector("guide-intro");
	}
}

customElements.define("guide-intro", GuideIntro);
