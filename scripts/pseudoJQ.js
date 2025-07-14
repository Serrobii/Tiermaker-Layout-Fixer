// this file HAS to run after the page finishes initializing.
// running it as a service_worker executes it too soon and
// it errors with "HTMLElement undefined"
// how in the hell can HTMLElement be undefined
Object.defineProperty(HTMLElement.prototype, 'css', {
	value: function(style, value) {
		if (this.toString().includes("Collection"))
		{
			this.children().forEach((child) => { child.style[style] = value; });
		}
		if (value)
		{
			this.style[style] = value;
			return this;
		}
		else
		{
			return this.style[style];
		}
	}
});

Object.defineProperty(HTMLElement.prototype, 'addClass', {
	value: function(className) {
		this.classList.add(className);
		return this;
	}
});

Object.defineProperty(HTMLElement.prototype, 'removeClass', {
	value: function(className) {
		this.classList.remove(className);
		return this;
	}
});

Object.defineProperty(HTMLElement.prototype, 'hasClass', {
	value: function(className) {
		return this.classList.contains(className)
	}
});

Object.defineProperty(HTMLElement.prototype, 'click', {
	value: function(funct) {
		return this.onclick = funct;
	}
});

Object.defineProperty(HTMLElement.prototype, 'childs', {
	value: function() {
		return [].slice.call(this.children);
	}
});

Object.defineProperty(HTMLElement.prototype, 'parent', {
	value: function() {
		return this.parentElement;
	}
});

Object.defineProperty(HTMLElement.prototype, 'text', {
	value: function(text) {
		if (text)
		{
			return this.innerText = text;
		}
		return this.innerText;
	}
});