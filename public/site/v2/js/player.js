// Usage:
// <TAG1 ln-player>
// 	<button ln-player-action="play">
// 	<button ln-player-action="pause">
// 	<div class="ln-viewport">
// 		<TAG2 ln-target>
// 			<TAG3>item 1</TAG3>
// 		</TAG2>
// 	</div>
// </TAG1>

(function () {
	const DOM_SELECTOR = "ln-player";
	const DOM_ATTRIBUTE = "lnPlayer";

	const events = {
		mute: {},
		unmute: {},
		play: {},
		stop: {},
		onScrollUpWhenMuted: {},
		volumeAboveHalf: {},
		volumeBelowHalf: {},
		volumeMuted: {},
	};

	// if lnDialog is already defined, return
	if (window.lnPlayer != undefined || window.lnPlayer != null) {
		return;
	}

	// This function is called first which instantiates the whole logic.
	function constructor(domRoot) {
		// this._event = null
		_findElements(domRoot);
	}

	// Finds all elements within 'domRoot' with 'DOM_SELECTOR' attribute and creates a new instance of the '_constructor' object
	function _findElements(domRoot) {
		let items = Array.from(domRoot.querySelectorAll(`[${DOM_SELECTOR}]`));
		if (domRoot.hasAttribute(DOM_SELECTOR)) {
			items.push(domRoot);
		}

		items.forEach(function (item) {
			if (!item[DOM_ATTRIBUTE]) {
				item[DOM_ATTRIBUTE] = new _constructor(item);
			}
		});
	}

	// Creates a new instance of this object with individual 'initiation', 'observer' for attribute changes, options and sets listeners
	function _constructor(dom) {
		this.dom = dom;
		// capture 'this'
		let thiz = this;

		_init.call(this);

		_setObserver.call(this);

		_getOptions.call(this);

		_setListeners.call(this);

		return this;
	}

	//Instantiates and saves the instanceName, audio element, volume, '_eventDetaild' on the 'this' object;
	function _init() {
		// If multiple players on page/domain, get intance name in order to use it in local storage
		this.instanceName = this.dom.getAttribute("ln-player") || "main";

		this.audio = this.dom.getElementsByTagName("audio")[0];
		// this.audio.load();
		// this.audio.play();

		this.ls = {};
		this.ls.volume = this.instanceName + ".volume";

		this._eventDetails = {
			player: this.instanceName,
		};

		return this;
	}

	//Listenes to attribute changes
	function _setObserver() {
		let thiz = this;
		var observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				if (mutation.type == "attributes") {
					_getOptions.apply(thiz);
				}
			});
		});

		observer.observe(this.dom, {
			attributes: true, //configure it to listen to attribute changes
		});
	}
	// Listenes to DOM changes in case an element is added with desired attribute name
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

	//Sets listeners  for buttons, volume slider, wheel
	function _setListeners() {
		var thiz = this;

		this.audio.addEventListener("volumechange", function (e) {
			// console.log(e);
		});

		// add event listeners for actions

		this.btn = this.dom.querySelectorAll("[ln-player-action]");
		this.btn.forEach(function (button) {
			// Buttons are changes with the "Material Icons" package. Either add the CDN at Head or install with npm
			// https://material.io/collections/get-started/#web
			button.addEventListener("click", function () {
				let action = button.getAttribute("ln-player-action");
				dispatchEvent.call(this, action);
				thiz[action].call(thiz, this);
			});
		});

		this.volumeSlider = this.dom.querySelectorAll("[ln-player-volume]")[0];
		this.volumeSlider.addEventListener("input", function () {
			thiz.setVolume(this.value / 100);
		});

		this.setVolume(localStorage.getItem(this.ls.volume) || 0.2);

		this.volumeControll = this.dom.addEventListener("wheel", function (x) {
			x.preventDefault();
			x.stopPropagation();
			x.stopImmediatePropagation();
			if (x.deltaY < 0) {
				if (
					thiz.audio.muted &&
					thiz.btn[1].getAttribute("ln-player-action") === "stop"
				) {
					dispatchEvent.call(thiz.btn[0], "onScrollUpWhenMuted");

					thiz.audio.muted = false;
				}
				thiz.setVolume(thiz.audio.volume + 0.05);
			} else {
				thiz.setVolume(thiz.audio.volume - 0.05);
			}
		});

		//Redundant code below

		// this.audio.addEventListener("volumechange", function (x) {
		// 	console.log(x);
		// });
	}

	// Sets options
	function _getOptions() {
		this.options = {};
		_init.apply(this);
	}

	// play function for element with 'ln-player-action' attribute
	function play() {
		this.audio.play();
	}

	function pause() {
		this.audio.pause();
	}

	// play function for element with 'ln-player-action' attribute

	function stop() {
		this.audio.pause();
	}

	// play function for element with 'ln-player-action' attribute

	function mute() {
		this.audio.muted = true;
		this.setVolume(0);
	}

	// play function for element with 'ln-player-action' attribute

	function unmute() {
		this.audio.muted = false;

		this.setVolume(localStorage.getItem(this.ls.volume));
	}

	// Volume setter based on events
	function setVolume(value) {
		const button =
			document.querySelector("[ln-player-action=mute]") ||
			document.querySelector("[ln-player-action=unmute]");
		// When scroller value goes below 0 debugger starts because it's out of bounds and stops program execution
		if (value <= 0) {
			this.audio.volume = 0;
			this.volumeSlider.value = 0;
			dispatchEvent.call(button, "volumeMuted");

			// When scroller value goes above 100 debugger starts because it's out of bounds and stops program execution
		} else if (value >= 1) {
			this.audio.volume = 1;
			this.volumeSlider.value = 100;
			// Normal execution
		} else {
			this.audio.volume = value;
			this.volumeSlider.value = value * 100;

			if (this.volumeSlider.value < 50) {
				dispatchEvent.call(button, "volumeBelowHalf");
			}
			if (this.volumeSlider.value > 50) {
				dispatchEvent.call(button, "volumeAboveHalf");
			}
			localStorage.setItem(this.ls.volume, value);
		}
	}

	function dispatchEvent(eventName) {
		let detail = {};

		detail[eventName] = events[eventName];

		let ev = new CustomEvent(eventName, {
			bubbles: true,
			detail,
		});
		this.dispatchEvent(ev);
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
	_constructor.prototype.play = play;
	_constructor.prototype.pause = pause;
	_constructor.prototype.stop = stop;
	_constructor.prototype.mute = mute;
	_constructor.prototype.unmute = unmute;
	_constructor.prototype.setVolume = setVolume;
})();
// Activates the 'constructor' function on the body of the document
window.lnPlayer(document.body);