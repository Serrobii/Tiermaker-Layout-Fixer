(() => {
	'use strict';

	if (!/^https?:\/\/tiermaker\.com\/create-xy\/.+$/.test(document.URL)) return;

	const $ = target => {
		var selectorType = target.startsWith("#") ? "getElementById" : target.startsWith(".") ? "getElementsByClassName" : "getElementsByTagName";
		return document[selectorType](target.replace(/^[#\.]/, ''));
	}
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
	const resize = x => {
		var draggableWidth = $("#1").getBoundingClientRect().width;

		var oldDropWidth = $("#drop").getBoundingClientRect().width - draggableWidth;
		var oldInnerWidth = $("#inner-draggables-container").getBoundingClientRect().width + draggableWidth;

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

		var newDropWidth = $("#drop").getBoundingClientRect().width - draggableWidth;
		var newInnerWidth = $("#inner-draggables-container").getBoundingClientRect().width + draggableWidth;

		var draggables = [].slice.call($(".draggable"));
		if (oldDropWidth != newDropWidth)
		{
			var dragRatio = newDropWidth / oldDropWidth;
			var innerRatio = oldInnerWidth / newInnerWidth;
			draggables.forEach((draggable) => {
				if (draggable.style.position == "absolute")
				{
					var oldPercent = Number(draggable.css("left").replace('%', ''));
					var totalAdjustment = dragRatio * innerRatio;
					var newPercent = oldPercent * totalAdjustment
					draggable.css("left", newPercent + '%');
				}
			});
		}
	}
	window.addEventListener("resize", () => resize({ x: window.innerWidth - $("#inner-draggables-container").getBoundingClientRect().width }));
	const resizeInitialize = setInterval(() => {
		if (!$("#1")) return;
		resize({ x: window.innerWidth / 2 + $("#1").clientWidth });
		clearInterval(resizeInitialize);
	}, 100);

	$("#preview").parent().id = "save-button";
	$("#preview").text("Save");
	$("#save-button").click(() => {
		$("#draggable-container").css("width", "100%");
		$("#inner-draggables-container").childs().forEach(child => {
			if (child.css("display") == "inline-block")
				child.css("visibility", "hidden");
		});
	});

	$("#reset").parent().id = "buttons";
	$("#buttons").childs()[1].remove();
	$("#buttons").childs()[0].remove();

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