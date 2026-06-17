export function flyCameraFromAbove(cameraEl, targetRotation, duration = 6000) {
	const comp = cameraEl.components["inertia-look-controls"];
	if (!comp) return ttbl_logger.log("[flyCameraFromAbove] Camera chưa có inertia-look-controls!");

	const yawObj = comp.yawObject;
	const pitchObj = comp.pitchObject;
	const camObj = cameraEl.object3D;

	// 🎯 Góc đích của người xem
	const targetPitch = targetRotation.x; // ngẩng lên/xuống
	const targetYaw = targetRotation.y; // xoay ngang

	// 📍 Vị trí đích (tầm mắt người)
	const endPos = new THREE.Vector3(0, 0, 0);

	// 🚀 Vị trí bắt đầu (trên trời)
	const startPos = new THREE.Vector3(0, 3000, 0); // cao và xa
	const startPitch = -Math.PI / 2; // nhìn thẳng xuống
	const startYaw = targetYaw; // giữ hướng ngang cố định

	// Đặt vị trí ban đầu
	camObj.position.copy(startPos);
	pitchObj.rotation.x = startPitch;
	yawObj.rotation.y = startYaw;

	const startTime = performance.now();
	const phase1 = duration - 2000;
	const phase2 = 2000; // pha ngẩng đầu (2s cuối)

	function easeOutCubic(t) {
		return 1 - Math.pow(1 - t, 3);
	}

	function animate(time) {
		const elapsed = time - startTime;
		const t = Math.min(elapsed / duration, 1);

		// ✈️ Easing mượt
		const ease = easeOutCubic(t);

		// Bay xuống (position)
		camObj.position.lerpVectors(startPos, endPos, ease);

		// 🧠 Tách logic xoay theo 2 pha:
		if (elapsed < phase1) {
			// Pha 1: đâm xuống, giữ đầu nhìn xuống
			pitchObj.rotation.x = startPitch;
			yawObj.rotation.y = startYaw;
		} else {
			// Pha 2: ngẩng lên dần tới góc nhìn người xem
			const localT = (elapsed - phase1) / phase2; // từ 0 → 1 trong 2s cuối
			const smooth = localT * localT * (3 - 2 * localT); // smoothstep
			pitchObj.rotation.x = THREE.MathUtils.lerp(startPitch, targetPitch, smooth);
			yawObj.rotation.y = THREE.MathUtils.lerp(startYaw, targetYaw, smooth);
		}

		if (t < 1) requestAnimationFrame(animate);
	}

	requestAnimationFrame(animate);
}

export function initCameraAbove(cameraEl, targetRotation) {
	const comp = cameraEl.components["inertia-look-controls"];
	if (!comp) {
		ttbl_logger.log("[initCameraAbove] Camera chưa có inertia-look-controls! Fly cam failed");
		return false;
	}
	const yawObj = comp.yawObject;
	const pitchObj = comp.pitchObject;
	const camObj = cameraEl.object3D;
	// Đặt vị trí cao và xa
	camObj.position.set(0, 3000, 0);
	pitchObj.rotation.x = -Math.PI / 2; // nhìn thẳng xuống
	yawObj.rotation.y = targetRotation.y; // giữ hướng ngang cố định
	return true;
}
