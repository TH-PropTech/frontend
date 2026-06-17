// user-logger-client.js
window.UserLoggerClient = class UserLoggerClient {
	isHovering = false;
	recentlyHovered = Date.now();

	constructor(socketURL, isFirstTime = true) {
		this.socket = io(socketURL);
		this.currentScene = null;
		this.startedAt = Date.now();
		this.isFirstTime = isFirstTime;
		this.device = this.detectDevice();

		this.socket.on("connect", () => {
			ttbl_logger.log("[Socket] Connected to server", this.socket.id);
			this.sendSessionInfo();
		});
	}

	detectDevice() {
		const ua = navigator.userAgent.toLowerCase();
		if (/mobile|android|iphone/.test(ua)) return "mobile";
		return "desktop";
	}

	sendSessionInfo() {
		if (!this.socket.connected) {
			ttbl_logger.warn("[Socket] Not connected, cannot send session info.");
			return;
		}
		this.socket.emit("user:session-device", {
			device: this.device,
			startedAt: this.startedAt,
			isFirstTime: this.isFirstTime,
		});
	}

	sendLog(action, sceneId) {
		if (!this.socket.connected) {
			ttbl_logger.warn("[Socket] Not connected, cannot send log.");
			return;
		}
		this.socket.emit("user:action", {
			action,
			sceneId,
			device: this.device,
		});
	}

	enterScene(sceneId) {
		if (this.currentScene === sceneId) {
			ttbl_logger.warn("[Socket] Already in scene:", sceneId);
			return;
		}
		if (this.currentScene) {
			this.sendLog("EXIT", this.currentScene);
			ttbl_logger.log("[Socket] Exiting scene:", this.currentScene);
		}
		this.sendLog("ENTER", sceneId);
		this.currentScene = sceneId;
		ttbl_logger.log("[Socket] Entered scene:", sceneId);
	}

	zoomIn() {
		this.sendLog("ZOOM-IN", this.currentScene);
	}

	zoomOut() {
		this.sendLog("ZOOM-OUT", this.currentScene);
	}

	hoverHotspot(sceneId) {
		this.recentlyHovered = Date.now();

		if (this.isHovering) {
			return;
		}

		this.isHovering = true;
		this.sendLog("HOVER", sceneId);
		const inId = setInterval(() => {
			if (this.recentlyHovered > Date.now() - 500) {
				return;
			}
			clearInterval(inId);
			this.isHovering = false; // Reset hover state after a short delay
			this.sendLog("HOVER-END", sceneId);
		}, 500); // Adjust the delay as needed
	}

	leaveHotspot(sceneId) {
		if (!this.isHovering) {
			ttbl_logger.warn("[Socket] Not hovering any hotspot, ignoring leave action.");
			return;
		}
		this.sendLog("LEAVE", sceneId);
		this.isHovering = false;
	}

	customAction(action, sceneId) {
		this.sendLog(action, sceneId);
	}
};
