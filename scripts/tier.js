(function() {
	'use strict';

	if (!/^https?:\/\/tiermaker\.com\/create\/.+$/.test(document.URL)) return;

	const $ID    = (target) => { return document.getElementById(target) };
	const $TAG   = (target) => { return document.getElementsByTagName(target) };
	const $CLASS = (target) => { return document.getElementsByClassName(target) };
	
	// Stylize the Necessary Shit
	const defaultRatio = "55vw";
	const bannerHeight = "calc(100% - 170px)";

	const header = $ID("header");
	header.css("position", "fixed")
		  .css("width",    "100%");

	const tier = $ID("tier-wrap");
	tier.addClass("do-not-delete");
	tier.css("position",  "fixed")
		.css("top",       "165px")
		.css("left",      "5px")
		.css("margin",    "0px calc(55% + 10px) 0px 0px")
		.css("width",     defaultRatio)
		.css("height",    bannerHeight)
		.css("maxWidth",  "none")
		.css("overflowY", "auto")
		.css("overflowX", "clip");

	const list = $ID("char-tier-outer-container-scroll");
	list.addClass("do-not-delete");
	list.css("position",  "fixed")
		.css("margin",    "0px 0px 0px 0px")
		.css("top",       "165px")
		.css("right",     "5px")
		.css("width",     `calc(100% - ${defaultRatio} - 15px)`)
		.css("height",    bannerHeight)
		.css("overflowY", "auto")
		.css("overflowX", "clip");
	
	const div = document.createElement("div");
	div.id = "resizer";
	list.parentNode.insertBefore(div, list);
	const resizer = $ID("resizer");
	resizer.addClass("do-not-delete");
	resizer.css("position",     "absolute")
		   .css("zIndex",       "2")
		   .css("width",        "5px")
		   .css("height",       `calc(100vh - 170px)`)
		   .css("left",         `calc(${defaultRatio} + 5px)`)
		   .css("top",          "165px")
		   .css("cursor",       "col-resize")
		   .css("background",   "rgba(255, 255, 255, 0.4)")
		   .css("margin",       "0px")
		   .css("padding",      "0px")
		   .css("boxSizing",    "border-box")
		   .css("borderRadius", "5px");
	resizer.addEventListener("mousedown", event => {
		document.addEventListener("mousemove", resize, false);
		document.addEventListener("mouseup", () => {
			document.removeEventListener("mousemove", resize, false);
		}, false);
	});
	const resize = cursor => {
		const tierWidth = `calc(${cursor.x}px - 7.5px)`;
		const listWidth = `calc(100% - ${cursor.x}px - 7.5px)`;
		const rPosition = `calc(${cursor.x}px - 2.5px)`;
		tier.css("width", tierWidth);
		list.css("width", listWidth);
		resizer.css("left", rPosition);
	}

	const saveButton = $ID("preview").parent();
	saveButton.addClass("do-not-delete");
	saveButton.css("position", "fixed")
			  .css("margin",   "0px 0px 0px 0px")
			  .css("top",      "115px")
			  .css("left",     "5px");
	saveButton.click(() => { tier.css("height", "auto"); });

	const buttons = $ID("buttons");
	buttons.addClass("do-not-delete");
	buttons.css("position", "fixed")
		   .css("margin",   "0px 0px 0px 0px")
		   .css("right",    `5px`)
		   .css("top",      "115px");
	buttons.childs()[0].childs()[2].remove();
	buttons.childs()[0].childs()[0].remove();

	const resetButton = buttons.childs()[0].childs()[0];
	resetButton.css("backgroundColor", "red")
			   .css("color",           "white")
			   .css("fontSize",        "18px");

	const title = $TAG("h1")[0];
	title.css("position", "fixed")
		 .css("margin", "0px 0px 0px 0px")
		 .css("top", "65px")
		 .css("left", "0px")
		 .css("width", "100%")
		 .css("height", "50px")
		 .css("textAlign", "center");
		//  .css("backgroundColor", "white");
	title.text(title.text().substring(0, title.text().length - 16));
	
	const overlay = $ID("overlay");
	overlay.addClass("do-not-delete");
	$ID("export-container").click(() => { 
		tier.css("height", "calc(100% - 170px)")
			 .css("width",  defaultRatio);
	});

	const altButton = $CLASS("button-link alignment-chart-btn")[0].parent();
	altButton.id = "align-comm-button";
	altButton.addClass("do-not-delete");
	altButton.css("position",     "fixed")
			 .css("width",        `100%`)
			 .css("left",         "0px")
			 .css("top",          "115px")
			 .css("marginTop",    "0px")
			 .css("paddingLeft",  $ID("preview").clientWidth + "px")
			 .css("paddingRight", $ID("reset").clientWidth + "px");
	altButton.childs().forEach(element => element.css("height", "32px"));

	// Delete the Useless Shit
	const mainContainer = $ID("main-container");
	const toDelete = mainContainer.childs().filter(element => {
		if (element.hasClass("do-not-delete")) return false;
		if (["LINK", "H1", "STYLE", "SCRIPT"].includes(element.tagName)) return false;
		return true;
	});
	toDelete.forEach(element => element.remove());
})();