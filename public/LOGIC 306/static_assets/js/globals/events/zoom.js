function handleZoomWheel() {
	document.getElementById("scene360").addEventListener("wheel", (event) => {
		// small increments for smoother zooming
		const delta = event.wheelDelta / 120 / 10;

		zoom(true, delta);
	});
}
