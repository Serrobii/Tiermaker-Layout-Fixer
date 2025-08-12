(() => {
	'use strict';

	if (!/^https?:\/\/tiermaker\.com\/create\/.+$/.test(document.URL)) return;

	const $ = target => {
		var selectorType = target.startsWith("#") ? "getElementById" : target.startsWith(".") ? "getElementsByClassName" : "getElementsByTagName";
		return document[selectorType](target.replace(/^[#\.]/, ''))
	}
	const smoothResize = false;

	const list = "#char-tier-outer-container-scroll";

	const resizer = document.createElement("div");
	resizer.id = "resizer";
	$(list).parentNode.insertBefore(resizer, $(list));
	resizer.addEventListener("mousedown", () => {
		document.addEventListener("mousemove", resize, false);
		document.addEventListener("mouseup", () => {
			document.removeEventListener("mousemove", resize, false);
		}, false);
	});
	const resize = x => {
		var characterWidth = $("#1").clientWidth;
		var newListWidth =
			smoothResize ?
				window.innerWidth - (x.x + 10) :
				Math.round((window.innerWidth - (x.x + 10)) / characterWidth) * characterWidth;
			newListWidth =
			newListWidth < characterWidth ?
				characterWidth :
				newListWidth;
			newListWidth =
			newListWidth > window.innerWidth - (window.innerWidth % characterWidth) ?
				200 :
				newListWidth;
		var newRatio = newListWidth / window.innerWidth * 100;

		$("#char-tier-outer-container-scroll").css("width", newListWidth + "px");
		$("#tier-wrap").css("width", `calc(100% - ${newRatio}vw - 19px)`);
		resizer.css("left", `calc(100% - ${newRatio}vw - 12px)`);
	}
	window.addEventListener("resize", () => resize({ x: window.innerWidth - $("#char-tier-outer-container-scroll").getBoundingClientRect().width }));
	const resizeInitialize = setInterval(() => {
		if (!$("#1")) return;
		resize({ x: window.innerWidth / 2 + $("#1").clientWidth });
		clearInterval(resizeInitialize);
	}, 100);

	$("#preview").parent().id = "save-button";
	$("#preview").text("Save");
	$("#save-button").click(() => $("#tier-wrap").css("height", "auto"));

	$("#buttons").childs()[0].childs()[2].remove();
	$("#buttons").childs()[0].childs()[0].remove();
	$("#buttons").childs()[0].childs()[0].id = "reset";

	const tierlistTitle = $("title")[0].text;
	$("h1")[0].id = "title";
	$("#title").text(tierlistTitle.substring(9, tierlistTitle.length - 12));

	$("#export-container").click(() => $("#tier-wrap").css("height", "calc(100% - 165px)"));

	$(".button-link alignment-chart-btn")[0].parent().id = "alt-button";

	$("#main-container").childs().filter(element => {
		const keepElements = ["LINK", "H1", "STYLE", "SCRIPT"];
		const keepIDs = [
			"tier-wrap",
			"char-tier-outer-container-scroll",
			"comm-rank-button-container",
			"resizer",
			"buttons",
			"alt-button",
			"save-button",
			"overlay" ];

		if (keepElements.includes(element.tagName)) return false;
		if (keepIDs.includes(element.id))           return false;
		return true;
	}).forEach(element => element.remove());
})();