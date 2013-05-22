

(function() {

window.addEventListener("DOMContentLoaded", function() {

	setTimeout(function() { window.scrollTo(0,1); }, 100);

	console.log(document.getElementById("result").style.top);

	var touchHandler = getTouchHandler();
	document.getElementById("flick-to-history").addEventListener("touchmove", touchHandler, false);
	document.getElementById("flick-to-history").addEventListener("touchstart", touchHandler, false);
	document.getElementById("flick-to-history").addEventListener("touchend", touchHandler, false);
	document.getElementById("result").addEventListener("webkitTransitionEnd", function(e) {
	
		if(parseInt(e.target.getAttribute("data-layer")) === 1) { 
			e.target.style.top = 0 + "px";
			e.target.style.zIndex = 1;
			document.getElementById("history").style.zIndex = 2;
			document.getElementById("history").setAttribute("data-layer", "2");
		}

	}, false);

	document.getElementById("flick-to-result").addEventListener("touchmove", touchHandler, false);
	document.getElementById("flick-to-result").addEventListener("touchstart", touchHandler, false);
	document.getElementById("flick-to-result").addEventListener("touchend", touchHandler, false);
	document.getElementById("history").addEventListener("webkitTransitionEnd", function(e) {

		if(parseInt(e.target.getAttribute("data-layer")) === 1) {
			e.target.style.top = 0 + "px";
			e.target.style.zIndex = 1;
			document.getElementById("result").style.zIndex = 2;
			document.getElementById("result").setAttribute("data-layer", "2");
		}

	}, false);

}, false);
/*
function swap_index () {
	var elem1 = document.getElementById("history");
	var elem2 = document.getElementById("result");

	var tmp = elem1.style.zIndex;
	elem1.style.zIndex = elem2.style.zIndex;
	elem2.style.zIndex = tmp;

	console.log(elem1);
	console.log(elem2.style);
};
*/
function getTouchHandler() {
	var startY = 0;
	var diffY = 0;
	var sTime = 0;

	return function(e) {
		e.preventDefault();
		var touch = e.touches[0];
		if (e.type == "touchstart") {
			startY = touch.pageY;
			sTime = (new Date()).getTime();
			console.log("touchstart:" + startY);
		}

		else if (e.type == "touchmove") {
			diffY = touch.pageY - startY;
			e.target.parentNode.setAttribute("class", "moving");
			e.target.parentNode.style.top = diffY + "px";
		}

		else if (e.type == "touchend") {
			var t = (new Date()).getTime() - sTime;
			if (Math.abs(diffY) > 260 || (t < 300 && Math.abs(diffY) > 80)) {
				console.log(Math.abs(diffY) + " 秒数: " + t);

				e.target.parentNode.setAttribute("class", "moving_open");
				e.target.parentNode.style.top = - window.innerHeight + "px";
				e.target.parentNode.setAttribute("data-layer", "1");
			} else {
				console.log(Math.abs(diffY) + " 秒数: " + t);
				console.log("クローズ");

				e.target.parentNode.setAttribute("class", "moving_open");
				e.target.parentNode.style.top = 0 + "px";
				e.target.parentNode.setAttribute("data-layer", "2");
			}
			startY = 0;
		}

	}
}

	
})();