export default class GalleryPlugin {
	static _initialized = false;
	_data = {
		images: [],
		video: null,
		current: 0,
		title: "",
		description: "",
	};
	_current = 0;
	_key = "";

	constructor(data) {
		if (!data) return;

		this._data = data;
		this.overlay = null;
		this._key = window?.dataContentHashId(this._data) || new Date().getTime().toString();
	}

	mount(overlay) {
		this.overlay = overlay;
		ttbl_logger.log("[Gallery Plugin] initialized");
		const div = document.createElement("div");
		div.classList =
			"bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl border border-gray-100 h-[70vh] overflow-y-auto scroll-box pointer-events-auto";

		const descArea = this._descriptionArea();
		this.videoArea = this._createVideoArea();
		const galleryArea = this._createGallery();

		const divContent = document.createElement("div");
		divContent.classList = "relative w-full md:w-8/12 h-64 md:h-auto flex items-center justify-center bg-black";
		if (this.videoArea) divContent.appendChild(this.videoArea);
		if (galleryArea) {
			divContent.appendChild(galleryArea);
		}

		div.appendChild(divContent);
		if (descArea) div.appendChild(descArea);

		// add to plugin overlay
		if (this.overlay) {
			this.overlay.setContentAndOpen(div, this._key);
			this.overlay.setAttribute("data-is-active", "true");

			requestAnimationFrame(() => {
				if (this._data.images && this._data.images.length > 0) this._runScript();
			});
		}
	}

	_runScript() {
		const updateGallery = (imgEl, indicator) => {
			imgEl.src = this._data.images[this._current];
			indicator.textContent = `${this._current + 1} / ${this._data.images.length}`;
		};

		const imgEl = document.getElementById("galleryImage");
		const indicator = document.getElementById("galleryIndicator");
		const prevBtn = document.getElementById("pre-plugin-btn12981189");
		const nextBtn = document.getElementById("next-plugin-btn12981189");
		prevBtn.addEventListener("click", () => {
			this._current = (this._current - 1 + this._data.images.length) % this._data.images.length;
			updateGallery(imgEl, indicator);
		});
		nextBtn.addEventListener("click", () => {
			this._current = (this._current + 1) % this._data.images.length;
			updateGallery(imgEl, indicator);
		});
	}

	_descriptionArea() {
		const descDiv = document.createElement("div");
		descDiv.id = "areaDescription";
		descDiv.classList = "w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center text-gray-700 overflow-y-auto";
		const titleEl = document.createElement("h2");
		titleEl.classList = "text-lg font-bold mb-2";
		titleEl.textContent = this._data.title;
		descDiv.appendChild(titleEl);
		const descEl = document.createElement("p");
		descEl.classList = "text-sm text-gray-700";
		descEl.textContent = this._data.description;
		descDiv.appendChild(descEl);
		return descDiv;
	}

	_createVideoArea() {
		if (!this._data.video) return;

		const videoDiv = document.createElement("div");
		videoDiv.id = "areaVideo";
		videoDiv.classList = "w-full h-full object-cover";

		if (this._data.video.includes("youtube.com")) {
			const videoId = this._data.video.split("v=")[1];
			const iframe = document.createElement("iframe");
			iframe.src = `https://www.youtube.com/embed/${videoId}`;
			iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
			iframe.classList = "w-full h-full";
			videoDiv.appendChild(iframe);

			return videoDiv;
		}

		const videoEl = document.createElement("video");
		videoEl.src = this._data.video;
		videoEl.classList = "w-full h-full";
		videoEl.controls = true;

		videoDiv.appendChild(videoEl);
		return videoDiv;
	}

	_createGallery() {
		if (!this._data.images || this._data.images.length === 0) return;
		const galleryDiv = document.createElement("div");
		galleryDiv.id = "areaGallery";
		galleryDiv.classList = "relative w-full h-full";
		const imgEl = document.createElement("img");
		imgEl.id = "galleryImage";
		imgEl.src = this._data.images[0];
		imgEl.classList = "object-cover w-full h-full transition-all duration-500";
		galleryDiv.appendChild(imgEl);
		// Nút chuyển
		const prevBtn = document.createElement("button");
		prevBtn.id = "pre-plugin-btn12981189";
		prevBtn.classList =
			"absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full w-9 h-9 flex items-center justify-center shadow";
		prevBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    `;
		galleryDiv.appendChild(prevBtn);
		const nextBtn = document.createElement("button");
		nextBtn.id = "next-plugin-btn12981189";
		nextBtn.classList =
			"absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full w-9 h-9 flex items-center justify-center shadow";
		nextBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    `;
		galleryDiv.appendChild(nextBtn);

		// Chỉ số
		const indicator = document.createElement("div");
		indicator.id = "galleryIndicator";
		indicator.classList =
			"absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm";
		indicator.textContent = `1 / ${this._data.images.length}`;
		galleryDiv.appendChild(indicator);
		return galleryDiv;
	}

	updateVisibility(status) {
		console.log("[Gallery:updateVisibility] Updating visibility: ", status);
		switch (status) {
			case "visible":
				break;
			case "hidden":
				if (this.videoArea) {
					this.overlay.setContent("");
				}
				break;
		}
	}
}

window.ManagePlugins.addPlugin(GalleryPlugin);
