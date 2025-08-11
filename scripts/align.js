	(function() {
	'use strict';

	if (!/^https?:\/\/tiermaker\.com\/create-xy\/.+$/.test(document.URL)) return;

	const $ = target => {
		var selectorType = target.startsWith("#") ? "getElementById" : target.startsWith(".") ? "getElementsByClassName" : "getElementsByTagName";
		return document[selectorType](target.replace(/^[#\.]/, ''));
	}
	const smoothResize = false;

	const header = $("#header");
	header.css("position", "fixed")
		  .css("width",    "100%");

    const main = $("#main-container");
    main.addClass("do-not-delete");
    main.css("");

	const drag = $("#draggable-container");
	drag.addClass("do-not-delete");
	drag.css("position",        "fixed")
		.css("top",             "165px")
		.css("left",            "5px")
		.css("height",          "calc(100% - 170px)")
		.css("margin",          "0px")
        .css("scrollbar-width", "none")
		.css("overflowY",       "auto")
		.css("overflowX",       "clip");

	const drop = $("#drop");
	drop.addClass("do-not-delete");
	drop.css("position",  "absolute")
		.css("top",       "0px")
		.css("left",      "0px")
		.css("height",    "calc(100% - 4px)")
        .css("width",     "calc(100% - 4px)")
		.css("margin",    "0px")
		.css("overflowY", "auto")
		.css("overflowX", "clip");

	const inner = $("#inner-draggables-container");
	inner.addClass("do-not-delete");
	inner.css("position",        "fixed")
		 .css("margin",          "0px 0px 0px 0px")
		 .css("top",             "165px")
		 .css("right",           "5px")
		 .css("height",          "600px")
		 .css("scrollbar-width", "none");

	const resizer = document.createElement("div");
	resizer.id = "resizer";
	drop.parentNode.insertBefore(resizer, drop);
	resizer.addClass("do-not-delete");
	resizer.css("position",     "fixed")
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
           .css("-webkit-touch-callout", "none") // make your cursor not select shit while resizing
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
	const resize = (x, init) => {
        var oldDropWidth = drop.getBoundingClientRect().width;
        var oldInnerWidth = inner.getBoundingClientRect().width;

		var characterWidth = $("#1").clientWidth;
		var newInnerWidth =
			smoothResize ?
				window.innerWidth - (x.x + 10) :
				Math.round((window.innerWidth - (x.x + 10)) / characterWidth) * characterWidth;
			newInnerWidth = newInnerWidth < characterWidth ? characterWidth : newInnerWidth;
		var newRatio = newInnerWidth / window.innerWidth * 100;

		inner.css("width",  newInnerWidth + "px");
    	drag.css("width",   `calc(100% - ${newRatio}vw - 19px)`);
		resizer.css("left", `calc(100% - ${newRatio}vw - 12px)`);

        var newDropWidth = drop.getBoundingClientRect().width;
        var newInnerWidth = inner.getBoundingClientRect().width;

        var draggables = [].slice.call($(".draggable"));
        if (!init && oldDropWidth != newDropWidth)
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

                    console.log(dragRatio, innerRatio, oldPercent, newPercent);
                }
            });
        }
	}
	window.addEventListener("resize", () => resize({ x: window.innerWidth - $("#inner-draggables-container").getBoundingClientRect().width }));
	const resizeInitialize = setInterval(() => {
        if (!$("#1")) return;
        resize({ x: window.innerWidth / 2 + $("#1").clientWidth }, true);
        clearInterval(resizeInitialize);
    }, 100);

	const saveButton = $("#preview").parent();
	saveButton.addClass("do-not-delete");
	saveButton.css("position", "fixed")
			  .css("margin",   "0px 0px 0px 0px")
			  .css("top",      "115px")
			  .css("left",     "5px");
	saveButton.click(() => { drag.css("height", "auto") });
	saveButton.childs()[0].text("Save");

	const buttons = $("#reset").parent();
	buttons.addClass("do-not-delete");
	buttons.css("position", "fixed")
		   .css("margin",   "0px 0px 0px 0px")
		   .css("right",    "5px")
		   .css("top",      "115px");
	buttons.childs()[1].remove();
	buttons.childs()[0].remove();

	const resetButton = $("#reset");
	resetButton.css("background", "#dd0000")
			   .css("color",      "#ffffff")
			   .css("fontSize",   "18px");

	const title = $("h1")[0];
	title.css("position",        "fixed")
		 .css("margin",          "0px 0px 0px 0px")
		 .css("top",             "65px")
		 .css("left",            "0px")
		 .css("width",           "100%")
		 .css("height",          "50px")
		 .css("textAlign",       "center");
    const tierlistTitle = document.getElementsByTagName("title")[0].text;
	title.text(tierlistTitle.substring(9, tierlistTitle.length - 12));

	const overlay = $("#overlay");
	overlay.addClass("do-not-delete");
	$("#export-container").click(() => {
		drag.css("height", "calc(100% - 165px)");
	});

	const altButton = $(".button-link alignment-chart-btn")[0].parent();
	altButton.addClass("do-not-delete");
	altButton.css("position", "fixed")
			 .css("width",    "100%")
			 .css("left",     "0px")
			 .css("top",      "110px")
			 .css("margin",   "0px");
	altButton.childs().forEach(element => element.css("height", "32px"));

	// setInterval(() => {
	// 	const elements = [].slice.call($("#outer-draggables-container").children);
	// 	elements.forEach(element => {
	// 		if (element.nodeType == 3)
	// 			return;
	// 		if (element.css("display") == "inline-block")
	// 			element.addClass("still-in-list");
	// 		if (element.css("display") == "block")
	// 			element.removeClass("still-in-list");
	// 	});
	// }, 10);

	// Delete the Useless Shit
	const mainContainer = $("#main-container");
	const toDelete = mainContainer.childs().filter(element => {
		if (element.hasClass("do-not-delete")) return false;
		if (["LINK", "H1", "STYLE", "SCRIPT"].includes(element.tagName)) return false;
		return true;
	});
	toDelete.forEach(element => element.remove());
})();