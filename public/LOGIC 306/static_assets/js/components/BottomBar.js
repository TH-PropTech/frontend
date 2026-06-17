import { Settings } from "../hook/useSettings.js";
import { LeftBar } from "./LeftBar.js";

function createButton({ iconClass, text, onClick, attributes = {}, id = "" }) {
	const button = document.createElement("button");
	button.title = text;
	button.setAttribute(
		"class",
		"w-6 h-6 md:w-8 md:h-8 border-2 border-white rounded-full text-[--color-quaternary] hover:border-[--color-secondary-light] hover:[--color-tertiary-light]"
	);

	Object.entries(attributes).forEach(([key, value]) => {
		button.setAttribute(key, value);
	});

	button.setAttribute("data-button-id", id);

	const icon = document.createElement("i");
	icon.setAttribute("class", iconClass);
	button.appendChild(icon);
	button.addEventListener("click", onClick);

	return button;
}

export class BottomBar extends HTMLElement {
	_menuItems = [
		// Group 1
		[
			{
				id: "btn-toogle-bottom-bar",
				iconClass: "fa-solid fa-chevron-down",
				title: "Ẩn/hiện thanh công cụ",
				onClick: () => {
					if (Settings.isButtonsDisabled) return;
					if (this.classList.contains("translate-y-20")) {
						BottomBar.show();
					} else {
						BottomBar.hide();
					}
				},
			},
			{
				id: "btn-open-left-bar",
				iconClass: "fa-solid fa-bars",
				title: "Mở bảng điều hướng",
				attributes: {
					"data-intro": "Mở menu truy cập nhanh các địa điểm",
					"data-step": "1",
				},
				onClick: () => {
					if (Settings.isButtonsDisabled) return;
					LeftBar.toggleMyBar();
				},
			},
		],
		// Group 2
		[
			{
				id: "btn-home",
				iconClass: "fa-solid fa-house",
				title: "Hình toàn cảnh",
				attributes: {
					"data-intro": "Hình toàn cảnh",
					"data-step": "2",
				},
			},
			{
				id: "btn-media-play",
				iconClass: "fa-solid fa-volume-high",
				title: "Bật/tắt âm thanh",
				attributes: {
					"data-intro": "Bật/tắt âm thanh",
					"data-step": "3",
					"data-button-id": "btn-media-play",
				},
			},
			{
				id: "btn-play-tour",
				iconClass: "fa-solid fa-person-walking",
				title: "Bắt đầu chuyến tham quan",
				attributes: {
					"data-intro": "Bắt đầu chuyến tham quan",
					"data-step": "4",
				},
			},
			{
				id: "btn-zoom-out",
				iconClass: "fa-solid fa-minus",
				title: "Thu nhỏ góc nhìn",
				attributes: {
					"data-intro": "Thu nhỏ góc nhìn",
					"data-step": "5",
				},
			},
			{
				id: "btn-zoom-in",
				iconClass: "fa-solid fa-plus",
				title: "Phóng to góc nhìn",
				attributes: {
					"data-intro": "Phóng to góc nhìn",
					"data-step": "6",
				},
			},
			{
				id: "btn-show-current-map",
				iconClass: "fa-solid fa-location-dot",
				title: "Xem thông tin trường trên Google Maps",
				attributes: {
					"data-intro": "Xem thông tin trường trên Google Maps",
					"data-step": "7",
				},
			},
			{
				id: "btn-auto-rotate",
				iconClass: "fa-solid fa-rotate",
				title: "Bật/tắt xoay tự động",
				attributes: {
					"data-intro": "Bật/tắt xoay tự động",
					"data-step": "8",
				},
			},
			{
				id: "btn-school-intro",
				iconClass: "fa-solid fa-info",
				title: "Hiển thị thông tin mô tả về trường",
				attributes: {
					"data-intro": "Hiển thị thông tin mô tả về trường",
					"data-step": "9",
				},
			},
		],
		// Group 3
		[
			{
				id: "btn-fullscreen",
				iconClass: "fa-solid fa-expand",
				title: "Bật/tắt toàn màn hình",
				attributes: {
					"data-intro": "Bật/tắt toàn màn hình",
					"data-step": "10",
				},
				onClick: () => {
					if (Settings.isButtonsDisabled) return;

					const button = document.querySelector("[data-button-id='btn-fullscreen']");
					const icon = button?.querySelector("i");
					const docEl = document.documentElement;
					if (!document.fullscreenElement) {
						docEl.requestFullscreen();
						icon.classList.toggle("fa-expand", false);
						icon.classList.toggle("fa-compress", true);
					} else {
						if (document.exitFullscreen) {
							document.exitFullscreen();
							icon.classList.toggle("fa-expand", true);
							icon.classList.toggle("fa-compress", false);
						}
					}
				},
			},
		],
	];

	_bottomBarEl = null;
	_buttonShow = null;
	_isHidden = false;

	constructor() {
		super();
		this._bottomBarEl = document.createElement("div");

		this._isHidden = this.dataset.isHidden === "true";

		this._bottomBarEl.setAttribute("id", "bottom-bar");
		this._bottomBarEl.setAttribute(
			"class",
			"menu-bottom flex flex-row items-center justify-between px-5 py-2 md:px-6 md:py-2 bg-[--color-primary] opacity-80 text-xs md:textfixed bottom-4 left-1/2 -translate-x-1/2 z-[9] rounded-full shadow-lg gap-x-12 min-w-[40%]"
		);
		this.render();
		this.appendChild(this._bottomBarEl);

		this._buttonShow = document.createElement("button");
		this._buttonShow.setAttribute(
			"class",
			"fixed bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-[--color-primary] text-[--color-quaternary] rounded-full shadow-lg flex items-center justify-center z-[9] opacity-80 hover:opacity-100 translate-y-20"
		);
		this._buttonShow.setAttribute("title", "Hiện thanh công cụ");
		this._buttonShow.setAttribute("aria-label", "Hiện thanh công cụ");
		this._buttonShow.setAttribute("id", "button-show-bottom-bar");
		const iconShow = document.createElement("i");
		iconShow.setAttribute("class", "fa-solid fa-chevron-up");
		this._buttonShow.appendChild(iconShow);
		this.appendChild(this._buttonShow);

		this._buttonShow.addEventListener("click", () => {
			BottomBar.show();
		});

		return this;
	}

	render() {
		this._bottomBarEl.innerHTML = "";
		this._menuItems.forEach((group) => {
			const groupContainer = document.createElement("div");
			groupContainer.setAttribute("class", "flex flex-row items-center gap-x-2");
			group.forEach((item) => {
				const button = createButton({
					iconClass: item.iconClass,
					text: item.title,
					onClick: () => Reflect.apply(item.onClick || this.handleButtonClick, this, [item.id]),
					attributes: item.attributes,
					id: item.id,
				});
				groupContainer.appendChild(button);
			});
			this._bottomBarEl.appendChild(groupContainer);
		});
	}
	handleButtonClick(buttonId) {
		if (Settings.isButtonsDisabled) return;
		window.dispatchEvent(
			new CustomEvent("action", {
				detail: {
					id: buttonId,
					action: buttonId.replace("btn-", ""),
				},
				bubbles: true,
				composed: true,
				cancelable: true,
			})
		);
	}

	static hide() {
		const bottomBar = document.querySelector("bottom-bar");
		if (bottomBar) {
			bottomBar.setAttribute("data-is-hidden", "true");
		}
	}

	static show() {
		const bottomBar = document.querySelector("bottom-bar");
		if (bottomBar) {
			bottomBar.setAttribute("data-is-hidden", "false");
		}
	}

	static get observedAttributes() {
		return ["data-is-hidden"];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "data-is-hidden") {
			this._isHidden = newValue === "true";
			if (this._isHidden) {
				this._bottomBarEl.classList.add("translate-y-20");
				requestAnimationFrame(() => {
					setTimeout(() => {
						this._buttonShow.classList.remove("translate-y-20");
					}, 100);
				});
				ttbl_logger.log("[BottomBar] is hidden");
			} else {
				this._buttonShow.classList.add("translate-y-20");
				requestAnimationFrame(() => {
					setTimeout(() => {
						this._bottomBarEl.classList.remove("translate-y-20");
					}, 100);
				});
				ttbl_logger.log("[BottomBar] is shown");
			}
		}
	}

	connectedCallback() {
		requestAnimationFrame(() => {
			this._buttonShow.classList.add("transition-all", "duration-300", "ease-in-out");
			this._bottomBarEl.classList.add("transition-all", "duration-300", "ease-in-out");
		});
	}
}

customElements.define("bottom-bar", BottomBar);
