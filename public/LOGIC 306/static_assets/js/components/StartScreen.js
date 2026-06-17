export class StartScreen extends HTMLElement {
	constructor() {
		super();

		this.dataset.startScreen = "";
		this.className =
			"fixed inset-0 background-start-screen z-[99] flex flex-row justify-center items-center text-white transition-opacity duration-500";
		this.innerHTML = `
            <div class="flex flex-col justify-center items-center pb-12">
                <div id="img_logo">
                    <img data-logo='secondaryLogo' src="./static_assets/logo/full-white.png" alt="" style="height: 150px; width: 300px; object-fit: contain;" />
                </div>
                <div class="text-center text-white mb-12">
                    <P class="uppercase font-bold text-xl md:text-3xl font-bai-jamjuree">CHUYẾN THAM QUAN THỰC TẾ ẢO</P>
                    <p class="text-xl md:text-3xl university uppercase font-bai-jamjuree">Đại học Công nghiệp <span class="hidden md:inline">Thành phố</span><span class="md:hidden">TP.</span> Hồ Chí Minh</p>
                </div>
                <div class="flex flex-col justify-center items-center gap-6">
                    <button data-controller="startButton" class="w-32 h-32 rounded-full bg-[--color-secondary-light] hover:bg-[--color-secondary] hover:opacity-[0.8] transition-colors duration-300">KHỞI HÀNH</button>
                    <p class="text description">Nhấn chuột trái vào nút khởi hành để bắt đầu </p>
                </div>
            </div>
        `;

		this.querySelector("[data-controller='startButton']").addEventListener("click", () => {
			const event = new CustomEvent("start-screen-click", { bubbles: true, composed: true });
			this.dispatchEvent(event);
			this.classList.toggle("opacity-0", true);
			setTimeout(() => {
				this.remove();
			}, 501);
		});
	}

	static show() {
		const startScreen = document.querySelector("start-screen");
		if (!startScreen) {
			const newStartScreen = document.createElement("start-screen");
			document.body.appendChild(newStartScreen);
		}
	}

	static remove() {
		const startScreen = document.querySelector("start-screen");
		if (startScreen) {
			startScreen.remove();
		}
	}
}

customElements.define("start-screen", StartScreen);
