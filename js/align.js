	(function() {
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
				window.innerWidth - (window.innerWidth % characterWidth) - characterWidth :
				newListWidth; 
		var newRatio = newListWidth / window.innerWidth * 100;

		$("#inner-draggables-container").css("width", newListWidth + "px");
		$("#draggable-container").css("width", `calc(100% - ${newRatio}vw - 23px)`);
		$("#drop").css("width", `calc(100% - ${newRatio}vw - 23px)`);
		resizer.css("left", `calc(100% - ${newRatio}vw - 12px)`);
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

	const overlay = $("#overlay");
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