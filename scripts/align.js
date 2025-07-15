	(function() {
	'use strict';

	if (!/^https?:\/\/tiermaker\.com\/create-xy\/.+$/.test(document.URL)) return;

	var $ID    = (target) => { return document.getElementById(target) };
	var $TAG   = (target) => { return document.getElementsByTagName(target) };
	var $CLASS = (target) => { return document.getElementsByClassName(target) };

	// Stylize the Necessary Shit
	var defaultRatio = "50vw";
	var bannerHeight = "170px";
	var chartHeight  = "600px";

	var header = $ID("header");
	header.css("position", "fixed")
		  .css("width",    "100%");

	var container = $ID("draggable-container");
	container.addClass("do-not-delete");
	container.css("position",  "fixed")
			 .css("top",       "165px")
			 .css("left",      "5px")
			 .css("width",     defaultRatio)
			 .css("height",    chartHeight)
			 .css("margin",    "0px")
			 .css("maxWidth",  "none")
			 .css("overflowY", "auto")
			 .css("overflowX", "clip");

	var drop = $ID("drop");
	drop.css("position", "relative")
		.css("right",    "2px")
		.css("bottom",   "2px")
		.css("height",   "100%");

	var drag = $ID("inner-draggables-container");
	drag.css("width", defaultRatio);

	const resizer = document.createElement("div");
	resizer.id = "resizer";
	container.parentNode.insertBefore(resizer, container);
	resizer.addClass("do-not-delete");
	resizer.css("position",     "absolute")
		   .css("zIndex",       "2")
		   .css("width",        "5px")
		   .css("height",       `calc(100vh - 170px)`)
		   .css("left",         `calc(${defaultRatio} + 7.5px)`)
		   .css("top",          "165px")
		   .css("cursor",       "col-resize")
		   .css("background",   "rgba(255, 255, 255, 0.4)")
		   .css("margin",       "0px")
		   .css("padding",      "0px")
		   .css("boxSizing",    "border-box")
		   .css("borderRadius", "5px")
           .css("-webkit-touch-callout", "none")
           .css("-webkit-user-select",   "none")
           .css("-khtml-user-select",    "none")
           .css("-moz-user-select",      "none")
           .css("-ms-user-select",       "none")
           .css("user-select",           "none");
	resizer.addEventListener("mousedown", event => {
		document.addEventListener("mousemove", resize, false);
		document.addEventListener("mouseup", () => {
			document.removeEventListener("mousemove", resize, false);
		}, false);
	});
	const resize = cursor => {
        var position = (cursor.x / window.innerWidth * 10000 | 0) / 100;
        if (position < 25) position = 25;
        if (position > 80) position = 80;

		const tierWidth = `calc(${position}vw - 10px)`;
		const listWidth = `calc(100% - ${position}vw - 10px)`;
		const rPosition = `calc(${position}vw - 2.5px)`;
		tier.css("width", tierWidth);
		container.css("width", listWidth);
		resizer.css("left", rPosition);
	}

	var saveButton = $ID("preview").parent();
	saveButton.addClass("do-not-delete");
	saveButton.css("position", "fixed")
			  .css("margin",   "0px 0px 0px 0px")
			  .css("top",      "115px")
			  .css("left",     "5px");
	saveButton.click(() => { container.style.height = "auto"; });

	var buttons = $ID("reset").parent();
	buttons.addClass("do-not-delete");
	buttons.css("position", "fixed")
		   .css("margin",   "0px 0px 0px 0px")
		   .css("right",    `calc(100% - ${defaultRatio} - 5px)`)
		   .css("top",      "115px");
	buttons.childs()[1].remove();
	buttons.childs()[0].remove();
	var reset = buttons.childs()[0];
	reset.css("backgroundColor", "red")
		 .css("color",           "white")
		 .css("fontSize",        "18px");

	var title = $TAG("h1")[0];
	title.css("position",        "fixed")
		 .css("margin",          "0px 0px 0px 0px")
		 .css("top",             "65px")
		 .css("left",            "0px")
		 .css("width",           "100%")
		 .css("height",          "50px")
		 .css("textAlign",       "center")
		 .css("backgroundColor", "white");
	title.text(title.text().substring(0, title.text().length - 16));

	var overlay = $ID("overlay");
	overlay.addClass("do-not-delete");
	$ID("export-container").click(() => {
		container.css("height", chartHeight);
	});

	var altButton = $CLASS("button-link alignment-chart-btn")[0].parent();
	altButton.id = "align-comm-button";
	altButton.addClass("do-not-delete");
	altButton.css("position",     "fixed")
			 .css("width",        `calc(${defaultRatio} - ${$ID("preview").clientWidth + "px"} - ${$ID("reset").clientWidth + "px"})`)
			 .css("left",         "5px")
			 .css("top",          "115px")
			 .css("marginTop",    "0px")
			 .css("paddingLeft",  $ID("preview").clientWidth + "px")
			 .css("paddingRight", $ID("reset").clientWidth + "px");
	altButton.childs().forEach(element => element.css("height", "32px"));

	var stillInLineStyle = document.createElement("style");
	stillInLineStyle.innerHTML = `.still-in-list { position: relative; left: calc(${defaultRatio} + 5px); bottom: 675px; }`;
	document.head.append(stillInLineStyle);

	setInterval(() => {
		var elements = [].slice.call($ID("inner-draggables-container").children);
		elements.forEach(element => {
			if (element.nodeType == 3)
				return;
			if (element.css("display") == "inline-block")
				element.addClass("still-in-list");
			if (element.css("display") == "block")
				element.removeClass("still-in-list");
		});
	}, 10);

	// Delete the Useless Shit
	var mainContainer = $ID("main-container");
	var toDelete = mainContainer.childs().filter(element => {
		if (element.hasClass("do-not-delete")) return false;
		if (["LINK", "H1", "STYLE", "SCRIPT"].includes(element.tagName)) return false;
		return true;
	});
	toDelete.forEach(element => element.remove());
})();