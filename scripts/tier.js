(function() {
	'use strict';

	if (!/^https?:\/\/tiermaker\.com\/create\/.+$/.test(document.URL)) return;

	const $ = target => {
		var selectorType = target.startsWith("#") ? "getElementById" : target.startsWith(".") ? "getElementsByClassName" : "getElementsByTagName";
		return document[selectorType](target.replace(/^[#\.]/, ''))
	}
	const smoothResize = false;

	const header = $("#header");
	header.css("position", "fixed")
		  .css("width",    "100%");

	const tier = $("#tier-wrap");
	tier.addClass("do-not-delete");
	tier.css("position",        "fixed")
		.css("top",             "165px")
		.css("left",            "5px")
		.css("height",          "calc(100% - 165px)")
        .css("margin",          "0px")
		.css("maxWidth",        "none")
		.css("scrollbar-width", "none")
		.css("overflowY",       "auto")
		.css("overflowX",       "clip");

	const list = $("#char-tier-outer-container-scroll");
	list.addClass("do-not-delete");
	list.css("position",        "fixed")
		.css("margin",          "0px 0px 0px 0px")
		.css("top",             "165px")
		.css("right",           "5px")
		.css("height",          "calc(100% - 165px)")
		.css("scrollbar-width", "none")
		.css("overflowY",       "auto")
		.css("overflowX",       "clip");

	const resizer = document.createElement("div");
	resizer.id = "resizer";
	list.parentNode.insertBefore(resizer, list);
	resizer.addClass("do-not-delete");
	resizer.css("position",     "absolute")
		   .css("zIndex",       "2")
		   .css("width",        "5px")
		   .css("height",       "calc(100% - 170px)")
		   .css("top",          "165px")
		   .css("cursor",       "col-resize")
		   .css("background",   "rgba(255, 255, 255, 0.4)")
		   .css("margin",       "0px")
		   .css("padding",      "0px")
		   .css("boxSizing",    "border-box")
		   .css("borderRadius", "5px")
           .css("-webkit-touch-callout", "none") // makes your cursor not select shit while resizing
           .css("-webkit-user-select",   "none")
           .css("-khtml-user-select",    "none")
           .css("-moz-user-select",      "none")
           .css("-ms-user-select",       "none")
           .css("user-select",           "none");
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
			newListWidth = newListWidth < characterWidth ? characterWidth : newListWidth;
		var newRatio = newListWidth / window.innerWidth * 100;

		list.css("width",   newListWidth + "px");
		tier.css("width",   `calc(100% - ${newRatio}vw - 19px)`);
		resizer.css("left", `calc(100% - ${newRatio}vw - 12px)`);
	}
	window.addEventListener("resize", () => resize({ x: window.innerWidth - $("#char-tier-outer-container-scroll").getBoundingClientRect().width }));
	const resizeInitialize = setInterval(() => {
        if (!$("#1")) return;
        resize({ x: window.innerWidth / 2 + $("#1").clientWidth });
        clearInterval(resizeInitialize);
    }, 100);

	const saveButton = $("#preview").parent();
	saveButton.addClass("do-not-delete");
	saveButton.css("position", "fixed")
			  .css("margin",   "0px 0px 0px 0px")
			  .css("top",      "115px")
			  .css("left",     "5px");
	saveButton.click(() => { tier.css("height", "auto"); });
	saveButton.childs()[0].text("Save");

	const buttons = $("#buttons");
	buttons.addClass("do-not-delete");
	buttons.css("position", "fixed")
		   .css("margin",   "0px 0px 0px 0px")
		   .css("right",    "5px")
		   .css("top",      "115px");
	buttons.childs()[0].childs()[2].remove();
	buttons.childs()[0].childs()[0].remove();

	const resetButton = buttons.childs()[0].childs()[0];
	resetButton.css("background", "#dd0000")
			   .css("color",      "#ffffff")
			   .css("fontSize",   "18px");

	const title = $("h1")[0];
	title.css("position",  "fixed")
		 .css("margin",    "0px 0px 0px 0px")
		 .css("top",       "65px")
		 .css("left",      "0px")
		 .css("width",     "100%")
		 .css("height",    "50px")
		 .css("textAlign", "center");
    const tierlistTitle = document.getElementsByTagName("title")[0].text;
	title.text(tierlistTitle.substring(9, tierlistTitle.length - 12));

	const overlay = $("#overlay");
	overlay.addClass("do-not-delete");
	$("#export-container").click(() => {
		tier.css("height", "calc(100% - 165px)");
	});

	const altButton = $(".button-link alignment-chart-btn")[0].parent();
	altButton.addClass("do-not-delete");
	altButton.css("position", "fixed")
			 .css("width",    "100%")
			 .css("left",     "0px")
			 .css("top",      "110px")
			 .css("margin",   "0px");
	altButton.childs().forEach(element => element.css("height", "32px"));

	const mainContainer = $("#main-container");
	const toDelete = mainContainer.childs().filter(element => {
		if (element.hasClass("do-not-delete")) return false;
		if (["LINK", "H1", "STYLE", "SCRIPT"].includes(element.tagName)) return false;
		return true;
	});
	toDelete.forEach(element => element.remove());

})();