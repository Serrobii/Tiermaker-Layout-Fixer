(() => {
	'use strict';

	const saving = !!(new URLSearchParams(document.location.search).get("showPreviewModal"));

	if (!/^https?:\/\/tiermaker\.com\/create-xy\/.+$/.test(document.URL)) return;

	const $ = target => {
		var selectorType = target.startsWith("#") ? "getElementById" : target.startsWith(".") ? "getElementsByClassName" : "getElementsByTagName";
		return document[selectorType](target.replace(/^[#\.]/, ''));
	}

	// if (saving) {
	// 	const reverseSweep = setInterval(() => {
	// 		if (!$("#1")) return;

	// 		var draggables = [].slice.call($(".draggable"));
	// 		draggables.forEach(draggable => {
	// 			if (draggable.css("position") == "absolute")
	// 				draggable.css("left", -Number(draggable.css("left").replace('%', '')));
	// 		});

	// 		clearInterval(reverseSweep);
	// 	}, 100);

	// 	return;
	// }

	const smoothResize = false;

	const resizer = document.createElement("div");
	resizer.id = "resizer";
	$("#drop").parentNode.insertBefore(resizer, $("#drop"));
	resizer.addEventListener("mousedown", () => {
		document.addEventListener("mousemove", resize, false);
		document.addEventListener("mouseup", () => {
			document.removeEventListener("mousemove", resize, false);
		}, false);
	});
	const resize = (x, init) => {
		var draggableWidth = $("#1").getBoundingClientRect().width;

		var oldDropWidth = $("#drop").getBoundingClientRect().width;
		var oldInnerWidth = $("#inner-draggables-container").getBoundingClientRect().width;

		var windowWidth = window.innerWidth
		var newListWidth =
			smoothResize ?
				windowWidth - (x.x + 10) :
				Math.round((windowWidth - (x.x + 10)) / draggableWidth) * draggableWidth;
			newListWidth =
			newListWidth < draggableWidth ?
				draggableWidth :
				newListWidth;
			newListWidth =
			newListWidth > windowWidth - (windowWidth % draggableWidth) ?
				windowWidth - (windowWidth % draggableWidth) - draggableWidth :
				newListWidth;
		var newRatio = newListWidth / windowWidth * 100;

		$("#inner-draggables-container").css("width", newListWidth + "px");
		$("#draggable-container").css("width", `calc(100% - ${newRatio}vw - 23px)`);
		$("#drop").css("width", `calc(100% - ${newRatio}vw - 23px)`);
		resizer.css("left", `calc(100% - ${newRatio}vw - 12px)`);

		var newDropWidth = $("#drop").getBoundingClientRect().width;
		var newInnerWidth = $("#inner-draggables-container").getBoundingClientRect().width;

		var draggables = [].slice.call($(".draggable"));
		if (init || oldDropWidth == newDropWidth) return;
		
		var dropRatio = newDropWidth / oldDropWidth;
		var innerRatio = oldInnerWidth / newInnerWidth;
		draggables.forEach((draggable) => {
			if (draggable.css("position") == "absolute")
			{
				var fullWidth = draggable.getBoundingClientRect().width
				var halfWidth = fullWidth / 2;
				var oldPosition = Number(draggable.css("left").replace('%', ''));
				var oldHalfRatio = halfWidth / (oldInnerWidth + 15) * 100;
				var newHalfRatio = halfWidth / (newInnerWidth + 15) * 100;
				var newPosition = (oldPosition + oldHalfRatio) * dropRatio * innerRatio - newHalfRatio;
				draggable.css("left", newPosition + '%');
			}
		});
	}
	const resizeInitialize = setInterval(() => {
		if (!$("#1")) return;

		if (saving)
		{
			var draggables = [].slice.call($(".draggable"));
			draggables.forEach(draggable => {
				if (draggable.css("position") == "absolute")
					draggable.css("left", -Number(draggable.css("left").replace('%', '')));
			});
		}

		resize({ x: window.innerWidth / 2 + (smoothResize ? 0 : $("#1").clientWidth) }, true);
		clearInterval(resizeInitialize);
	}, 100);
	window.addEventListener("resize", () => resize({ x: window.innerWidth - $("#inner-draggables-container").getBoundingClientRect().width }));

	$("#preview").parent().id = "save-button";
	$("#preview").text("Save");
	// $("#save-button").click(() => {
	// 	$("#draggable-container").css("width", "100%");
	// 	$("#inner-draggables-container").childs().forEach(child => {
	// 		if (child.css("display") == "inline-block")
	// 			child.css("visibility", "hidden");
	// 	});
	// });

	$("#reset").parent().id = "buttons";
	$("#buttons").childs()[1].remove();
	$("#buttons").childs()[0].remove();

	$(".alignment-chart-btn")[0].css("padding", "5px 15px 5px 15px");

	const tierlistTitle = $("title")[0].text;
	$("h1")[0].id = "title";
	$("#title").text(tierlistTitle.substring(9, tierlistTitle.length - 12));

	$("#close").click(() => $("#inner-draggables-container").childs().forEach(child => child.css("vilibility", "visible")));

	$(".alignment-chart-btn")[0].parent().id = "alt-button";

	$("#main-container").childs().filter(element => {
		const keepElements = ["LINK", "H1", "STYLE", "SCRIPT"];
		const keepIDs = [
			"draggable-container",
			"drop",
			"outer-draggables-container",
			"inner-draggables-container",
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