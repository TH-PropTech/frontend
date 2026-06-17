export class NotificationPlugin {
	constructor({ title = "Thông báo", message = "Đây là thông báo mặc định.", needReload = false }) {
		this._needReload = needReload;
		this._message = message;
		this._title = title;
	}

	mount(overlay) {
		this.overlay = overlay;
		this.render();
	}

	render() {
		if (!this.overlay) {
			ttbl_logger.error("[NotificationPlugin] Không tìm thấy #plugin-overlay. Load notification failed.");
			return;
		}
		this.overlay.setContentAndOpen(`<div class="bg-white p-6 rounded shadow-lg max-w-md mx-auto text-center">
          <p class="font-bold text-xl">${this._title}</p>
          <p class="mt-4">${this._message}</p>
          ${
				this._needReload
					? `<button id="plugisns-1283219-7e8au" class="mt-8 px-6 py-2 bg-[--color-primary] text-white rounded transition hover:scale-105">Thử lại</button>`
					: ""
			}
        </div>`);
		this.overlay.setAttribute("data-is-active", "true");
		const btn = document.getElementById("plugisns-1283219-7e8au");
		if (btn) {
			btn.addEventListener("click", () => {
				window.location.reload();
				return;
			});
		}
	}

	updateVisibility(status) {
		if (status == "hidden")
			if (this._needReload) {
				window.location.href = "https://vr.iuh.edu.vn/?url-source=vr-tour";
			}
	}
}

window.ManagePlugins.addPlugin(NotificationPlugin);
