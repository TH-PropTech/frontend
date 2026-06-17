// AFRAME.components["look-controls"].Component.prototype.onTouchMove = function (
// 	t
// ) {
// 	if (this.touchStarted && this.data.touchEnabled) {
//         this.pitchObject.rotation.x +=
//             ((Math.PI * (t.touches[0].pageY - this.touchStart.y)) /
//                 this.el.sceneEl.canvas.clientHeight) *
//             0.5;

//         this.yawObject.rotation.y +=
//             ((Math.PI * (t.touches[0].pageX - this.touchStart.x)) /
//                 this.el.sceneEl.canvas.clientWidth) *
//             0.3;

//         // Chống vượt quá 90 độ
//         this.pitchObject.rotation.x = Math.max(
//             Math.PI / -2,
//             Math.min(Math.PI / 2, this.pitchObject.rotation.x)
//         );
//         this.touchStart = {
//             x: t.touches[0].pageX,
//             y: t.touches[0].pageY,
//         };
// 	}
// };
