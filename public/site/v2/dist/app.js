/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@livenetworks/ln-obfuscator/ln-obfuscator.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@livenetworks/ln-obfuscator/ln-obfuscator.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Usage:
// Add the tag "ln-obfuscate" with the ROT number and all obfuscated HTML inside will be deobfuscated by the ROT amount

(function () {
  const DOM_SELECTOR = "ln-obfuscator";
  const DOM_ATTRIBUTE = "lnObfuscator";

  // if the component is already defined, return
  if (window[DOM_ATTRIBUTE] != undefined || window[DOM_ATTRIBUTE] != null) {
    return;
  }

  function constructor(domRoot) {
    _findElements(domRoot);
  }

  function _findElements(domRoot) {
    if(domRoot.TEXT_NODE && domRoot.childNodes.length == 0) {
      return;
    }
    let items =
      Array.from(domRoot.querySelectorAll("[" + DOM_SELECTOR + "]")) || [];

    if (domRoot.hasAttribute(DOM_SELECTOR)) {
      items.push(domRoot);
    }

    items.forEach(function (item) {
      if (!item[DOM_ATTRIBUTE]) {
        item[DOM_ATTRIBUTE] = new _constructor(item);
      }
    });
  }

  function _constructor(dom) {
    this.dom = dom;
    _init.call(this);
    return this;
  }

  // Listens for DOM changes
  function _domObserver() {
    let observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type == "childList") {
          mutation.addedNodes.forEach(function (item) {
            _findElements(item);
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
    });
  }

  _domObserver();

  function _init() {
    let obfuscationNum = _handleParam.call(this);
    this.dom.innerHTML = deObfuscate(obfuscationNum, this.dom.innerHTML);
  }

  // Retrieves the ROT number
  function _handleParam() {
    return Number(this.dom.getAttribute(DOM_SELECTOR));
  }

  // Obfuscate algorithm
  function obfuscate(obfuscationNum, sourceContent) {
    return sourceContent.replace(/[a-zA-Z]/g, function (c) {
      return String.fromCharCode(
        (c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + obfuscationNum)
          ? c
          : c - 26
      );
    });
  }
  // Deobfuscation algorithm
  function deObfuscate(obfuscationNum, sourceContent) {
    let result = "";
    obfuscationNum = (26 - obfuscationNum) % 26;
    result = obfuscate(obfuscationNum, sourceContent);
    return result;
  }

  // make lnObfuscate globaly avaliable
  window[DOM_ATTRIBUTE] = constructor;
  // Ads an obfuscate method to lnObfuscate
  window[DOM_ATTRIBUTE].obfuscate = obfuscate;
})();

window.lnObfuscator(document.body);


/***/ }),

/***/ "./node_modules/@livenetworks/player/lnPlayer.js":
/*!*******************************************************!*\
  !*** ./node_modules/@livenetworks/player/lnPlayer.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Usage:
{/* <TAG1 ln-player>
        
            <TAG2>
                <button ln-player-action="mute" type="button">mute</button>
                <button ln-player-action="unmute" type="button">unmute</button>

                <input name="range" type="range" min="0" max="100" ln-player-volume value="50">
            </TAG2>
      
        <button ln-player-action="play" type="button">play</button>
        <button ln-player-action="pause" type="button">pause</button>
        <audio controls autoplay>
            <source src="https://15913.live.streamtheworld.com/AMAZING_80S_S01.mp3" />
        </audio>
    </TAG1> */}

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

		_init.call(thiz);

		_setObserver.call(thiz);

		_getOptions.call(thiz);

		_setListeners.call(thiz);

		return thiz;
	}

	//Instantiates and saves the instanceName, audio element, volume, '_eventDetaild' on the 'this' object;
	function _init() {
		// If multiple players on page/domain, get intance name in order to use it in local storage
		this.instanceName = this.dom.getAttribute("ln-player") || "main";

		this.audio = this.dom.getElementsByTagName("audio")[0];

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
		// add event listeners for actions

		this.btn = this.dom.querySelectorAll("[ln-player-action]");
		this.btn.forEach(function (button) {

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
		this.volumeSlider.addEventListener("volumechange", (e) => {
			console.log(e);
		})
		this.setVolume(localStorage.getItem(this.ls.volume) || 0.2);

		this.volumeControll = this.dom.addEventListener("wheel", function (x) {
			x.preventDefault();
			x.stopPropagation();
			x.stopImmediatePropagation();
			if (x.deltaY < 0) {
				if (
					thiz.audio.muted

				) {
					thiz.audio.muted = true;
				}
				thiz.setVolume(thiz.audio.volume + 0.05);
			} else {
				thiz.setVolume(thiz.audio.volume - 0.05);
			}
		});
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


/***/ }),

/***/ "./node_modules/@livenetworks/popup/ln-popup.js":
/*!******************************************************!*\
  !*** ./node_modules/@livenetworks/popup/ln-popup.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Usage:
//<a href="#"
//	ln-popup="POPUPOPTIONS"
//	ln-popup-center="true" //optional
//>
// POPUPOPTIONS = "width=300,height=300,scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no"
// (https://javascript.info/popup-windows)

(function(){ 
	const DOM_SELECTOR = 'ln-popup';
	const DOM_ATTRIBUTE = 'lnPopup';

	// if the component is already defined, return
	if (window[DOM_ATTRIBUTE] != undefined || window[DOM_ATTRIBUTE] != null) {
		return;
	}

	function constructor(domRoot) {
		_findElements(domRoot);
	}

	function _findElements(domRoot) {
		let items = domRoot.querySelectorAll('[' + DOM_SELECTOR + ']') || [];

		console.log(domRoot.querySelectorAll('[' + DOM_SELECTOR + ']'));

		if (domRoot.hasAttribute(DOM_SELECTOR)) {
			items.push(domRoot);
		}

		items.forEach(function(item) {
			if (!item[DOM_ATTRIBUTE]) {
				item[DOM_ATTRIBUTE] = new _constructor(item);
			}
		})
	}

	function _constructor(dom) {
		this.dom = dom;
		_init.call(this);
		return this;
	}

	function _domObserver() {
		let observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if (mutation.type == 'childList') {
					console.log(mutation.addedNodes);
					mutation.addedNodes.forEach(function(item) {
						_findElements(item);
					})
				}
			});
		});

		observer.observe(document.body, {
			childList: true
		});
	}

	_domObserver();


	// function _setObserver() {
	// 	let thiz = this;
	// 	// http://help.dottoro.com/ljdchxcl.php
	// 	// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Mutation_events

	// 	var observer = new MutationObserver(function(mutations) {
	// 		mutations.forEach(function(mutation) {
	// 			if (mutation.type == "attributes") {
	// 				console.log(mutation);
	// 				_getOptions.call(thiz, mutation);
	// 			}
	// 		});
	// 	});

	// 	observer.observe(this.dom, {
	// 		attributes: true //configure it to listen to attribute changes
	// 	});
	// }

	
	// Edit Below

	let _target = null;

	function _init() {
		this.dom.onclick = function(event) {
			event = event || window.event;
			event.preventDefault();
			
			_target = event.target;

			window.open(_target.href, _target.target, _handleParams.call(this));
			_target = null;
			return false;
		};
		return this;
	}

	function _handleParams() {
		if (!_shouldCenter.call(this)) {
			return _target.getAttribute('ln-popup');
		}

		options = _parseParams.call(this);

		options.left = Math.round((screen.width - options.width) / 2);
		options.top = Math.round((screen.height - options.height) / 2);

		return _joinToString(options)
	}

	function _shouldCenter() {
		return (_target.getAttribute('ln-popup-center') == "true" ? true : false);
	}
	function _parseParams() {
		let options = {};

		_target.getAttribute('ln-popup').split(',').forEach(function(item) {
			const values = item.split('=');
			options[values[0]] = values[1];
		})
		return options;
	}
	function _joinToString(options) {
		result = [];
		for(let item in options) {
			result.push(item + '=' + options[item]);
		}
		return result.join(',');
	}

	// make lnPopup globaly avaliable
	window[DOM_ATTRIBUTE] = constructor;
})();

window.lnPopup(document.body);


/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! @livenetworks/popup */ "./node_modules/@livenetworks/popup/ln-popup.js");

__webpack_require__(/*! @livenetworks/ln-obfuscator */ "./node_modules/@livenetworks/ln-obfuscator/ln-obfuscator.js");

__webpack_require__(/*! @livenetworks/player */ "./node_modules/@livenetworks/player/lnPlayer.js");

/***/ }),

/***/ 0:
/*!***********************************!*\
  !*** multi ./resources/js/app.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/martina/PRAKSA/Amazing/resources/js/app.js */"./resources/js/app.js");


/***/ })

/******/ });