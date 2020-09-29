// Usage:
// <TAG1 ln-scroller>
// 	<button ln-prev>
// 	<button ln-next>
// 	<div class="ln-viewport">
// 		<TAG2 ln-target>
// 			<TAG3>item 1</TAG3>
// 		</TAG2>
// 	</div>
// </TAG1>

(function () {
	const DOM_SELECTOR = "ln-scroller";
	const DOM_ATTRIBUTE = "lnScroller";

	// if lnDialog is already defined, return
	if (window[DOM_ATTRIBUTE] != undefined || window[DOM_ATTRIBUTE] != null) {
		return;
	}

	function constructor(domRoot) {
		_findElements(domRoot);
	}

	function _findElements(domRoot) {
		let items =
			Array.from(domRoot.querySelectorAll(`[${DOM_SELECTOR}]`)) || [];

		if (domRoot.hasAttribute[DOM_SELECTOR]) {
			items.push(domRoot);
		}

		items.forEach(function (item) {
			if (!item[DOM_ATTRIBUTE]) {
				item[DOM_ATTRIBUTE] = new _constructor(item);
			}
		});
	}

	function _setObserver() {
		let thiz = this;
		var observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				if (mutation.type == "attributes") {
					_getOptions.call(thiz);
				}
			});
		});

		observer.observe(this.dom, {
			attributes: true, //configure it to listen to attribute changes
		});
	}

	function _constructor(dom) {
		this.dom = dom;
		// capture 'this'
		let thiz = this;

		_setObserver.apply(this);

		this.currentItem = 0;
		this.target = this.dom.querySelectorAll("[ln-scroller-target]")[0];
		this.btn = {};
		this.btn.next = this.dom.querySelectorAll("[ln-scroller-next]");
		this.btn.prev = this.dom.querySelectorAll("[ln-scroller-prev]");

		this.lnViewport = this.dom.querySelector(".ln-viewport");
		this.lnScrollerTarget = this.dom.querySelector("[ln-scroller-target]");

		window.addEventListener("resize", function () {
			thiz.onViewChange();
		});
		_getOptions.call(this);

		_setListeners.call(this);

		return this;
	}
	function _domObserver() {
		let observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				if (mutation.type == "childList") {
					mutation.addedNodes.forEach(function (item) {
						if (item.nodeType !== item.TEXT_NODE) {
							_findElements(item);
						}
					});
				}
			});
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}

	_domObserver();

	function _setListeners() {
		var thiz = this;

		// add event listeners for next

		this.btn.next.forEach(function (button) {
			button.addEventListener("click", function () {
				thiz.next();
			});
		});

		// add event listeners for prev
		this.btn.prev.forEach(function (button) {
			button.addEventListener("click", function () {
				thiz.prev();
			});
		});

		// add event listeners for wheel

		var clientY, clientX;

		this.dom.addEventListener(
			"touchstart",
			function (e) {
				clientX = e.touches[0].clientX;
				clientY = e.touches[0].clientY;
			},
			false
		);

		this.dom.addEventListener(
			"touchend",
			function (e) {
				var deltaY, deltaX;
				deltaX = e.changedTouches[0].clientX - clientX;
				deltaY = e.changedTouches[0].clientY - clientY;
				if (deltaY < 0) {
					thiz.next();
				}
				if (deltaY > 0) {
					thiz.prev();
				}
				if (deltaX < 0) {
					thiz.next();
				}
				if (deltaY > 0) {
					thiz.prev();
				}
			},
			false
		);

		this.dom.addEventListener("wheel", function (x) {
			if (x.deltaY > 0) {
				thiz.next();
			} else {
				thiz.prev();
			}
		});
	}

	function _createSteps() {
		this._margin =
			this.orientation === "horizontal" ? "marginLeft" : "marginTop";
		this._childOffset =
			this.orientation === "horizontal" ? "offsetLeft" : "offsetTop";
		this._selfOffset =
			this.orientation === "horizontal" ? "offsetLeft" : "offsetTop";
		this._parentOffset =
			this.orientation === "horizontal" ? "offsetWidth" : "offsetHeight";
		this._scrollOffset =
			this.orientation === "horizontal" ? "scrollWidth" : "scrollHeight";
		this._clientDimension =
			this.orientation === "horizontal" ? "clientWidth" : "clientHeight";

		this.step = [];
		for (let item of this.target.children) {
			if (this.step.indexOf(item[this._childOffset]) === -1) {
				this.step.push(item[this._childOffset]);
			}
		}

		let scrollOffset =
			this.step[this.step.length - 1] +
			this.target.firstElementChild[this._clientDimension];

		let parentOffset = this.lnViewport[this._parentOffset];
		// if (this.currentItem !== 0) {
		// 	scrollOffset += this.step[this.currentItem];
		// }
		const firstOffset = this.target.firstElementChild[this._selfOffset];

		const lastStep = scrollOffset - parentOffset;

		for (let i = 0; i < this.step.length - 1; i += 1) {
			if (i === 0) {
				this.step[0] = 0;
			}
			if (this.step[i] < lastStep && this.step[i + 1] > lastStep) {
				this.step.splice(i + 1, this.step.length, lastStep);
			}
		}
		// this.step[0] = 0;
	}

	function _getOptions() {
		this.options = {};
		this.options.speed = this.dom.getAttribute("ln-scroller-speed") || 500;
		this.options.interval =
			this.dom.getAttribute("ln-scroller-interval") || 5000;

		_init.apply(this);
		return this;
	}

	function _init() {
		setScrollerDirection.apply(this);
		this.target.style.transitionProperty = "margin";
		this.target.style.transitionDuration = this.options.speed + "ms";

		this.maxItems = this.target.childElementCount / 2;

		// set moving direction based on orientation in variables, so you will skip "if" statements later

		if (!this.disableRecalculation) {
			_createSteps.apply(this);
		}
		return this;
	}

	function next() {
		this.currentItem === this.step.length
			? (this.currentItem = this.step.length - 1)
			: this.currentItem++;
		if (this.currentItem === this.step.length) {
			this.currentItem--;
		}

		_scroll.apply(this);
	}
	function prev() {
		this.currentItem === 0 ? (this.currentItem = 0) : this.currentItem--;

		_scroll.apply(this);
	}

	function _scroll() {
		this.target.style[this._margin] =
			this.step[this.currentItem] * -1 + "px";
	}

	function onViewChange() {
		_getOptions.apply(this);
	}

	function setScrollerDirection() {
		if (this.lnViewport.offsetWidth < this.lnScrollerTarget.scrollWidth) {
			if (this.orientation === "vertical") {
				this.lnScrollerTarget.style.marginTop = "0";
				this.lnScrollerTarget.style.marginLeft = "0";
				// _createSteps.apply(this);
				this.currentItem = 0;

				// _scroll.apply(this);
			}
			this.orientation = "horizontal";
		}
		if (this.lnViewport.offsetHeight < this.lnScrollerTarget.scrollHeight) {
			if (this.orientation === "horizontal") {
				("WORKING!!");

				this.lnScrollerTarget.style.marginTop = "0";
				this.lnScrollerTarget.style.marginLeft = "0";
				// _createSteps.apply(this);
			}
			if (this.orientation === "vertical") {
				this.disableRecalculation = true;
			}
			this.orientation = "vertical";
		}
		return this;
	}

	// https://stackoverflow.com/questions/5999998/check-if-a-variable-is-of-function-type
	function isFunction(functionToCheck) {
		return (
			functionToCheck &&
			{}.toString.call(functionToCheck) === "[object Function]"
		);
	}

	// make lnScroller globaly avaliable
	window[DOM_ATTRIBUTE] = constructor;
	_constructor.prototype.next = next;
	_constructor.prototype.prev = prev;
	_constructor.prototype.onViewChange = onViewChange;
})();
window.lnScroller(document.body);