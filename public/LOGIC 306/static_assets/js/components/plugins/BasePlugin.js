/**
 * BasePlugin - Mẫu để phát triển plugin cho VR Tour
 *
 * Implement:
 * - constructor(payload)
 * - mount(overlayEl)  render UI
 * - update(payload) cập nhật UI
 * - unmount() cleanup hoàn chỉnh (thường chạy khi trùng pluginname chạy)
 * - updateVisibility(status) - hidden/visible -> Cập nhật trạng thái nếu bị đóng layout
 *
 * Properties:
 * - this.overlay: element để render nội dung (Không inner trực tiếp tránh thiếu trigger sự kiện, dùng hàm setContent)
 * - this.overlay.setContent(html, key: optional) - data load trực tiếp
 * - this.overlay.setContentAndOpen(html, key: optional) - load data và mở model lên
 * - this.overlay.setAttribute("data-is-active", "true") -> lưu ý: data kiểu string ("true"/"false"), set true mở modal
 *     html: nội dung được render
 *     key: dùng để không render lại nếu trùng nội dung cũ (có thể dùng hàm window.dataContentHashId(string | objectJson))
 * 
 * Trong trường hợp cần sử dụng plugin nhưng content chưa được load, chỉ có đúng ID??
 * Đừng lo, tôi có giải pháp cho bạn đây:
 * window.pluginContentManager.loadFromId(replaceId_HERE).then((fetchedData) => {
      const data = fetchedData;
      window.ManagePlugins.actionOnPlugin(data.pluginName, data, "mount");
    });
 */

class BasePlugin {
	// Payload sẽ truyền khi plugin được gọi
	payload = null;
	// Overlay: Element để nội dung hiển thị (Đọc property ở trên)
	overlay = null;

	constructor(payload = {}) {
		this.payload = payload; // tuỳ ý
	}

	/**
	 * Được gọi khi plugin được mount.
	 * Plugin khi được giao diện gọi sẽ vào đây
	 */
	mount(overlay) {
		// Dòng này để giữ overlay khi cần!!!!!!
		this.overlay = overlay;
		// Your logic here
	}

	// Default
	render(htmlOrString) {
		try {
			// Tự động mở model khi render
			this.overlay?.setContentAndOpen(htmlOrString);
		} catch (e) {
			ttbl_logger.error(`[${this.name}] Fail to render`);
		}
	}

	updateVisibility(status) {
		// Plugin sẽ trả trạng thái hidden/visible khi đóng - nếu cần xử lý khi modal được đóng thì thêm cái này
		if (status === "hidden") {
			// Tắt nhạc, reset modal hay gì đó tuỳ!!
		}
	}
	/**
	 * Update plugin với payload mới.
	 * Optional
	 */
	update(payload) {
		// Nếu có trigger update plugin, cái này plugin tự xử
		// Gọi trigger update: window.ManagePlugins.actionOnPlugin("BasePlugin", payload, "update");
	}

	/**
	 * Cleanup plugin.
	 * Optional
	 */
	unmount() {
		// Your logic here
		// Event này chỉ chạy khi bị ghi đè lên instance (Ví dụ 2 lần gọi plugin gallery cùng lúc)
		// Không hoạt động nếu chỉ bị ẩn hoặc gỡ khỏi DOM thông thường, chỉ hoạt động khi được gọi event
		// Trigger nếu muốn: window.ManagePlugins.actionOnPlugin("BasePlugin", payload, "unmount");
	}
}

// Bắt buộc
window.ManagePlugins.addPlugin(BasePlugin);
