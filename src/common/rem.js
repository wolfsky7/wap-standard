(function () {
	if (typeof process !== "undefined" && !process.browser) {
		return;
	}
	const win = window;
	var rem, dpr, scale, doc = win.document,
		html = doc.documentElement,
		metaEl = document.querySelector("meta[name=\"viewport\"]"),
		baseWidth = html.getAttribute("data-use-rem") || 20;// 就是 屏幕宽度的rem  网易的是7.5  微信小程序20

	// defaut baseWidth : 20rem
	baseWidth = +baseWidth;
	const designWidth = 375;// iPhone6

	function setRem() {

		// return setRemWithNoScale();

		let dpr = html.getAttribute("data-dpr");
		if (dpr) {
			return;
		}
		const clientWidth = html.clientWidth * window.devicePixelRatio;

		// retain 高清屏幕修正
		dpr = parseInt(window.devicePixelRatio || 1);
		// rem = (clientWidth || 375) * dpr / baseWidth;
		rem = (clientWidth / designWidth) * baseWidth;
		scale = 1 / dpr;

		// set rem first
		// html.style.fontSize = rem + "px !important";
		html.setAttribute("style", "font-size:" + rem + "px !important");

		// 设置viewport，进行缩放，达到高清效果
		// 反而会模糊
		metaEl.setAttribute("content", "initial-scale=" + scale + ",maximum-scale=" + scale + ", minimum-scale=" + scale + ",user-scalable=no");


		// 设置data-dpr属性，留作的css hack之用
		html.setAttribute("data-dpr", dpr);
	}

	function setRemWithNoScale() {
		let dpr = html.getAttribute("data-dpr");
		if (dpr) {
			return;
		}
		const clientWidth = html.clientWidth;


		rem = (clientWidth || 375) / baseWidth;

		// set rem first
		// html.style.fontSize = rem + "px !important";
		html.setAttribute("style", "font-size:" + rem + "px !important");

		// 设置viewport，进行缩放，达到高清效果
		// 反而会模糊
		// metaEl.setAttribute("content", "initial-scale=" + scale + ",maximum-scale=" + scale + ", minimum-scale=" + scale + ",user-scalable=no");

		dpr = parseInt(window.devicePixelRatio || 1);
		// 设置data-dpr属性，留作的css hack之用
		html.setAttribute("data-dpr", dpr);
	}


	setRem();

	// Abort if browser does not support addEventListener
	if (!doc.addEventListener) {
		return;
	}

	var resizeEvt = "orientationchange" in win ? "orientationchange" : "resize";

	win.addEventListener(resizeEvt, setRem, false);
	// detect clientWidth is changed ?
	doc.addEventListener("DOMContentLoaded", setRem, false);

})();

export default () => { };