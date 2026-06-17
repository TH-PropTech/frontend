const messageLoadings = [
	"Tải hình ảnh 3D chất lượng cao",
	"Khởi tạo môi trường ảo",
	"Đang nạp bản đồ",
	"Đồng bộ kịch bản tham quan",
	"Kết nối âm thanh & hiệu ứng",
	"Đang tối ưu trải nghiệm người dùng",
	"Chuẩn bị cho chuyến tham quan, sẵn sàng cất cánh",
	"Gần xong rồi, vui lòng chờ chút nhé",
];

export class LoadingScreen extends HTMLElement {
	constructor() {
		super();
		this.dataset.loadingScreen = "";
		this.className = `
			fixed inset-0 z-[999] flex flex-col justify-center items-center
			bg-black bg-opacity-90 text-white transition-opacity duration-500
		`;

		this.innerHTML = `
			<div class="flex flex-col items-center gap-6">
				<div class="w-64 h-4 bg-white bg-opacity-20 rounded-full overflow-hidden mt-4">
					<div id="loading-bar" class="h-full w-0 bg-[--color-secondary-light] transition-all duration-300"></div>
				</div>
				<p class="text-xl md:text-2xl font-bai-jamjuree mt-4" id="loading-text">${messageLoadings[0]}</p>
			</div>
		`;

		// init state
		this.loadingText = this.querySelector("#loading-text");
		this.loadingBar = this.querySelector("#loading-bar");
		this.progress = 0;
		this.dotCount = 0;
		this.msgIndex = 0;

		this._startTextAnimation();
		this._startFakeProgress();

		// fail-safe: nếu loading quá 1 phút thì tự tắt loading screen
		this.timeout = setTimeout(() => {
			console.warn("[LoadingScreen] Loading quá lâu, tự tắt hoặc reload");

			LoadingScreen.hide();
		}, 80000); // 80s
	}

	_startTextAnimation() {
		// dấu chấm nhảy + message cycling
		this.textInterval = setInterval(() => {
			this.dotCount = (this.dotCount + 1) % 4;
			let text = messageLoadings[this.msgIndex] + ".".repeat(this.dotCount);
			this.loadingText.textContent = text;
		}, 500);

		this.msgInterval = setInterval(() => {
			if (this.msgIndex < messageLoadings.length - 1) this.msgIndex++;
		}, 2500);
	}

	_startFakeProgress() {
		this.fakeInterval = setInterval(() => {
			if (this.progress < 90) {
				this.progress += Math.random() * 5;
				if (this.progress > 90) this.progress = 90;
				this.loadingBar.style.width = this.progress + "%";
			}
		}, 300);
	}

	_clearIntervals() {
		clearInterval(this.textInterval);
		clearInterval(this.msgInterval);
		clearInterval(this.fakeInterval);
		clearTimeout(this.timeout);
	}

	static show() {
		let loadingScreen = document.querySelector("loading-screen");
		if (!loadingScreen) {
			loadingScreen = document.createElement("loading-screen");
			document.body.appendChild(loadingScreen);
		}
	}

	static hide() {
		const loadingScreen = document.querySelector("loading-screen");
		if (!loadingScreen) return;

		loadingScreen._clearIntervals();
		loadingScreen.loadingBar.style.width = "100%";
		loadingScreen.classList.add("opacity-0");
		setTimeout(() => loadingScreen.remove(), 500);
	}

	static updateProgress(value) {
		const loadingScreen = document.querySelector("loading-screen");
		if (!loadingScreen) return;
		loadingScreen.progress = value;
		loadingScreen.loadingBar.style.width = value + "%";
	}
}

customElements.define("loading-screen", LoadingScreen);
