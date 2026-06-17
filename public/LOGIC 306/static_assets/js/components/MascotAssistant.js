class MascotAssistant extends HTMLElement {
	constructor() {
		super();
		this.isOpen = false;
		this.isSpeaking = true; // Voice narration audio enabled by default
		this.autoPlayEnabled = localStorage.getItem("tour_guide_autoplay") !== "false"; // Saved autoplay setting
		this.currentLocationId = "demo-room-01";
		this.currentLocationName = "Phòng khách";
		
		// Room specific guides (Written in a natural, hospitable tour-guide voice)
		this.roomGuides = {
			"demo-room-01": "Chào mừng bạn đến với căn hộ! 🛋️ Hiện tại chúng ta đang ở **Phòng khách** - một không gian mở ngập tràn ánh sáng tự nhiên từ ban công. Với thiết kế tối giản, tông màu gỗ ấm áp kết hợp với các mảng tường sáng màu tạo nên cảm giác vô cùng rộng rãi và thư thái.",
			"demo-room-02": "Bên ngoài đây là khu vực **Ban công** lộng gió! 🍃 Nơi lý tưởng để đón nắng sớm, hít thở không khí trong lành hoặc ngắm hoàng hôn thành phố. Bạn có thể nhìn thấy dòng sông yên bình ở phía xa.",
			"demo-room-03": "Chào mừng bạn đến với **Nhà bếp** tiện nghi! 🍳 Gian bếp được thiết kế theo phong cách hiện đại với hệ thống tủ bếp kịch trần tối ưu diện tích, kết hợp các trang thiết bị thông minh giúp việc nấu nướng trở nên đầy cảm hứng.",
			"demo-room-04": "Đây là không gian **Phòng ngủ** ấm cúng và riêng tư! 🛏️ Cách bài trí ánh sáng gián tiếp dịu nhẹ cùng chiếc giường lớn êm ái sẽ mang lại cho bạn những giấc ngủ ngon và những giờ phút nghỉ ngơi trọn vẹn nhất.",
			"demo-room-05": "Cuối cùng là **Nhà vệ sinh** sạch sẽ, tinh tế! 🚿 Được lát gạch men sang trọng toàn bộ bề mặt và trang bị các thiết bị vệ sinh cao cấp, kết hợp vách kính tắm hiện đại giúp tối ưu không gian sử dụng."
		};

		this.innerHTML = `
			<!-- Sleek, capsule-shaped white glass audio guide bar at the bottom -->
			<div id="narrative-dialog" class="fixed bottom-24 left-1/2 -translate-x-1/2 z-[95] w-[90%] max-w-3xl rounded-full bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-2xl px-6 py-3 flex items-center justify-between gap-4 text-slate-800 transition-all duration-300 scale-95 opacity-0 pointer-events-none font-bai-jamjuree select-none">
				
				<!-- Left: Glowing Headphone Icon & Room title -->
				<div class="flex items-center gap-3 shrink-0">
					<div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-600 relative">
						<span class="absolute inset-0 rounded-full bg-blue-400/20 animate-ping opacity-60"></span>
						<i class="fa-solid fa-headphones text-sm"></i>
					</div>
					<div class="hidden sm:block">
						<div class="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Thuyết Minh</div>
						<div class="text-xs font-semibold text-blue-600" id="room-title">Phòng khách</div>
					</div>
				</div>

				<!-- Center: Typewriter Text (slim, centered, elegant) -->
				<div class="flex-1 text-xs md:text-sm text-slate-700 font-medium leading-relaxed max-h-[50px] overflow-y-auto px-2" id="dialogue-text">
					<!-- Typing text goes here -->
				</div>

				<!-- Right: Action Buttons (Autoplay, Mute, Close) -->
				<div class="flex items-center gap-2 shrink-0">
					<!-- Autoplay toggle -->
					<button id="autoplay-btn" class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[10px] font-bold text-slate-600 transition-all" title="Tự động phát thuyết minh khi đổi phòng">
						<span class="w-1.5 h-1.5 rounded-full bg-emerald-500" id="autoplay-indicator"></span>
						<span id="autoplay-text">Tự động: BẬT</span>
					</button>

					<!-- Speaker volume toggle -->
					<button id="speaker-btn" class="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-600 hover:text-slate-800 transition-colors" title="Bật/Tắt âm thanh">
						<i class="fa-solid fa-volume-high text-xs text-blue-600" id="speaker-icon"></i>
					</button>

					<!-- Close button -->
					<button id="close-dialog-btn" class="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors" title="Đóng thuyết minh">
						<i class="fa-solid fa-xmark text-xs"></i>
					</button>
				</div>
			</div>
		`;
		
		this.setupEventListeners();
		this.updateAutoplayUI();
	}

	updateAutoplayUI() {
		const indicator = this.querySelector("#autoplay-indicator");
		const text = this.querySelector("#autoplay-text");
		if (this.autoPlayEnabled) {
			indicator.className = "w-1.5 h-1.5 rounded-full bg-emerald-500";
			if (text) text.innerText = "Tự động: BẬT";
		} else {
			indicator.className = "w-1.5 h-1.5 rounded-full bg-slate-400";
			if (text) text.innerText = "Tự động: TẮT";
		}
	}

	setupEventListeners() {
		const dialogBox = this.querySelector("#narrative-dialog");
		const closeBtn = this.querySelector("#close-dialog-btn");
		const speakerBtn = this.querySelector("#speaker-btn");
		const autoplayBtn = this.querySelector("#autoplay-btn");
		const dialogueText = this.querySelector("#dialogue-text");
		const roomTitle = this.querySelector("#room-title");

		// Open narrative guide
		const openDialog = (text) => {
			this.isOpen = true;
			if (roomTitle) roomTitle.innerText = this.currentLocationName;
			
			dialogBox.classList.remove("hidden");
			dialogBox.classList.remove("pointer-events-none");
			setTimeout(() => {
				dialogBox.classList.remove("scale-95", "opacity-0");
			}, 10);
			this.typeResponse(text);
		};

		// Close narrative guide
		const closeDialog = () => {
			this.isOpen = false;
			if (window.speechSynthesis) window.speechSynthesis.cancel();
			dialogBox.classList.add("scale-95", "opacity-0");
			dialogBox.classList.add("pointer-events-none");
			setTimeout(() => {
				if (!this.isOpen) dialogBox.classList.add("hidden");
			}, 300);
		};

		closeBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			closeDialog();
		});

		// Toggle Autoplay setting
		autoplayBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			this.autoPlayEnabled = !this.autoPlayEnabled;
			localStorage.setItem("tour_guide_autoplay", this.autoPlayEnabled);
			this.updateAutoplayUI();
		});

		// Toggle voice speaker
		speakerBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			this.isSpeaking = !this.isSpeaking;
			const icon = this.querySelector("#speaker-icon");
			if (this.isSpeaking) {
				icon.className = "fa-solid fa-volume-high text-xs text-blue-600";
				const currentRoomText = this.roomGuides[this.currentLocationId];
				if (currentRoomText) this.typeResponse(currentRoomText);
			} else {
				icon.className = "fa-solid fa-volume-xmark text-xs text-slate-400";
				if (window.speechSynthesis) window.speechSynthesis.cancel();
			}
		});

		// Listen to click on 3D Mascot in VR scene (Always triggers manual play!)
		window.addEventListener("open-mascot-chat", (e) => {
			// Use location from event detail if available, fallback to tracked state
			const locId = e.detail?.locationId || this.currentLocationId;
			const locName = e.detail?.locationName || this.currentLocationName;
			// Sync state in case it was stale
			this.currentLocationId = locId;
			this.currentLocationName = locName;
			const text = this.roomGuides[locId] || `Bạn đang ở khu vực ${locName}.`;
			openDialog(text);
		});

		// Track location change via global window event
		window.addEventListener("change-location", (e) => {
			if (e.detail && e.detail.linkto) {
				this.currentLocationId = e.detail.linkto;
				
				const nameMap = {
					"demo-room-01": "Phòng khách",
					"demo-room-02": "Ban công",
					"demo-room-03": "Nhà bếp",
					"demo-room-04": "Phòng ngủ",
					"demo-room-05": "Nhà vệ sinh"
				};
				this.currentLocationName = nameMap[this.currentLocationId] || "Không gian mới";
				
				// Only auto-open on room change if autoplay is enabled!
				if (this.autoPlayEnabled) {
					setTimeout(() => {
						const text = this.roomGuides[this.currentLocationId];
						if (text) {
							openDialog(text);
						}
					}, 1200);
				} else {
					// Make sure to silence any previous narration running
					if (window.speechSynthesis) window.speechSynthesis.cancel();
				}
			}
		});

		// Auto trigger once the scene is loaded!
		window.addEventListener("scene-ready", () => {
			if (this.autoPlayEnabled) {
				setTimeout(() => {
					const text = this.roomGuides[this.currentLocationId];
					if (text) {
						openDialog(text);
					}
				}, 2500);
			}
		});
	}

	typeResponse(text) {
		const dialogueText = this.querySelector("#dialogue-text");
		if (!dialogueText) return;

		// Cancel any existing typewriter or speech
		if (this._typeInterval) clearInterval(this._typeInterval);
		if (window.speechSynthesis) window.speechSynthesis.cancel();

		// Voice Synthesis (Vietnamese Speech)
		if (this.isSpeaking) {
			this.speak(text);
		}

		// Typewriter Animation
		let index = 0;
		const speed = 35; // ms per char (optimized from 15ms to reduce DOM thrashing on weak devices)
		this._typeInterval = setInterval(() => {
			if (index < text.length) {
				dialogueText.innerHTML = this.formatMarkdown(text.slice(0, index + 1));
				index++;
			} else {
				clearInterval(this._typeInterval);
			}
		}, speed);
	}

	formatMarkdown(text) {
		return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
	}

	speak(text) {
		if (!window.speechSynthesis) return;
		window.speechSynthesis.cancel();
		const cleanText = text.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, "").replace(/\*\*/g, "");
		const utterance = new SpeechSynthesisUtterance(cleanText);
		const voices = window.speechSynthesis.getVoices();
		const viVoice = voices.find(v => v.lang.includes("vi"));
		if (viVoice) utterance.voice = viVoice;
		
		utterance.rate = 1.22; 
		window.speechSynthesis.speak(utterance);
	}
}

customElements.define("mascot-assistant", MascotAssistant);
