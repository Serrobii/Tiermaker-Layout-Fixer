(function() {
	'use strict';

	if (!/^https?:\/\/tiermaker\.com\/create\/.+$/.test(document.URL)) return;

	var $ID    = (target) => { return document.getElementById(target) };
	var $TAG   = (target) => { return document.getElementsByTagName(target) };
	var $CLASS = (target) => { return document.getElementsByClassName(target) };
	
	// Stylize the Necessary Shit
	var tierWidth = "55vw";
	var tierHeight = "calc(100% - 170px)";

	var header = $ID("header");
	header.css("position", "fixed")
		  .css("width",    "100%");

	var tiers = $ID("tier-wrap");
	tiers.addClass("do-not-delete");
	tiers.css("position",  "fixed")
		 .css("top",       "165px")
		 .css("left",      "5px")
		 .css("margin",    "0px calc(55% + 10px) 0px 0px")
		 .css("width",     tierWidth)
		 .css("height",    tierHeight)
		 .css("maxWidth",  "none")
		 .css("overflowY", "auto")
		 .css("overflowX", "clip");

	var list = $ID("char-tier-outer-container-scroll");
	list.addClass("do-not-delete");
	list.css("position", "absolute")
		.css("margin",   "0px 0px 0px 0px")
		.css("top",      "115px")
		.css("right",    "5px")
		.css("width",    `calc(100% - ${tierWidth} - 15px)`)
		.css("zIndex",   "-1");

	var saveButton = $ID("preview").parent();
	saveButton.addClass("do-not-delete");
	saveButton.css("position", "fixed")
			  .css("margin",   "0px 0px 0px 0px")
			  .css("top",      "115px")
			  .css("left",     "5px");
	saveButton.click(() => { tiers.css("height", "auto"); });

	var buttons = $ID("buttons");
	buttons.addClass("do-not-delete");
	buttons.css("position", "fixed")
		   .css("margin",   "0px 0px 0px 0px")
		   .css("right",    `calc(100% - ${tierWidth} - 5px)`)
		   .css("top",      "115px");
	buttons.childs()[0].childs()[2].remove();
	buttons.childs()[0].childs()[0].remove();
	var reset = buttons.childs()[0].childs()[0];
	reset.css("backgroundColor", "red")
		 .css("color",           "white")
		 .css("fontSize",        "18px");

	var title = $TAG("h1")[0];
	title.css("position", "fixed").css("margin", "0px 0px 0px 0px").css("top", "65px").css("left", "0px").css("width", "100%").css("height", "50px").css("textAlign", "center").css("backgroundColor", "white");
	title.text(title.text().substring(0, title.text().length - 16));
	
	var overlay = $ID("overlay");
	overlay.addClass("do-not-delete");
	$ID("export-container").click(() => { 
		tiers.css("height", "calc(100% - 170px)")
			 .css("width",  tierWidth);
	});

	var altButton = $CLASS("button-link alignment-chart-btn")[0].parent();
	altButton.id = "align-comm-button";
	altButton.addClass("do-not-delete");
	altButton.css("position",     "fixed")
			 .css("width",        `calc(${tierWidth} - ${$ID("preview").clientWidth + "px"} - ${$ID("reset").clientWidth + "px"})`)
			 .css("left",         "5px")
			 .css("top",          "115px")
			 .css("marginTop",    "0px")
			 .css("paddingLeft",  $ID("preview").clientWidth + "px")
			 .css("paddingRight", $ID("reset").clientWidth + "px");
	altButton.childs().forEach(element => element.css("height", "32px"));

	// Delete the Useless Shit
	var mainContainer = $ID("main-container");
	var toDelete = mainContainer.childs().filter(element => {
		if (element.hasClass("do-not-delete")) return false;
		if (["LINK", "H1", "STYLE", "SCRIPT"].includes(element.tagName)) return false;
		return true;
	});
	toDelete.forEach(element => element.remove());
})();